"use client";

import { useEffect, useMemo, useState } from "react";
import { addSshIngressRule, createInitialAwsLabState, evaluateAwsSshReachability, type AwsLabState } from "./engine";
import { AWS_INCIDENTS, AWS_INCIDENT_BY_ID } from "./catalog";
import "./simulator.css";

type Screen = "EC2 Dashboard" | "Instances" | "Security Groups" | "Route Tables" | "Network ACLs" | "Reachability Analyzer";
const navigation: { section: string; items: Screen[] }[] = [
  { section: "COMPUTE", items: ["EC2 Dashboard", "Instances"] },
  { section: "NETWORK & SECURITY", items: ["Security Groups", "Route Tables", "Network ACLs", "Reachability Analyzer"] }
];

export default function AwsSimulatorPage() {
  const [state, setState] = useState<AwsLabState>(() => createInitialAwsLabState());
  const [incidentId, setIncidentId] = useState("vm-unreachable");
  const [completedChecks, setCompletedChecks] = useState<string[]>([]);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
  const incident = AWS_INCIDENT_BY_ID[incidentId] ?? AWS_INCIDENT_BY_ID["vm-unreachable"];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("incident");
    if (requested && AWS_INCIDENT_BY_ID[requested]) setIncidentId(requested);
  }, []);
  function chooseIncident(nextId: string) {
    setIncidentId(nextId);
    setCompletedChecks([]);
    setExpandedCheck(null);
    setAnalysis(null);
    setScreen("Instances");
  }
  const [screen, setScreen] = useState<Screen>("Instances");
  const [sourceType, setSourceType] = useState<"SecurityGroup" | "IPv4">("SecurityGroup");
  const [source, setSource] = useState("sg-bastion-prod");
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [analysis, setAnalysis] = useState<ReturnType<typeof evaluateAwsSshReachability> | null>(null);
  const result = useMemo(() => evaluateAwsSshReachability(state), [state]);
  const group = state.securityGroups[0];

  function addRule() {
    const trimmed = source.trim();
    if (!trimmed) return;
    if (group.ingress.some(rule => rule.protocol === "TCP" && rule.fromPort <= 22 && rule.toPort >= 22 && rule.source === trimmed)) {
      setAnalysis(evaluateAwsSshReachability(state));
      setShowRuleEditor(false);
      return;
    }
    setState(current => addSshIngressRule(current, trimmed, sourceType));
    setAnalysis(null);
    setShowRuleEditor(false);
  }
  function reset() {
    setState(createInitialAwsLabState());
    setAnalysis(null);
    setShowRuleEditor(false);
    setSourceType("SecurityGroup");
    setSource("sg-bastion-prod");
    setScreen("Instances");
  }

  return <main className="aws-sim">
    <header className="aws-sim-global">
      <a className="aws-sim-logo" href="/troubleshooting" aria-label="Back to troubleshooting">aws<span>›</span></a>
      <button className="aws-sim-menu" aria-label="Services menu">☰</button>
      <div className="aws-sim-search"><span>⌕</span><span>Search AWS services and features</span><kbd>Alt+S</kbd></div>
      <div className="aws-sim-region">Europe (Ireland) <b>⌄</b></div>
      <div className="aws-sim-account"><span>Training account</span><b>1234-5678-9012</b></div>
    </header>
    <div className="aws-sim-subbar"><span>SIMULATED CONSOLE</span><span>Region: eu-west-1</span><span>Account: 123456789012</span><button onClick={reset}>Reset scenario</button></div>
    <div className="aws-sim-layout">
      <aside className="aws-sim-sidebar">
        <a href="/troubleshooting">← Troubleshooting Hub</a><a href="/troubleshooting/labs/vm-unreachable">Open guided VM-unreachable lab ↗</a>
        {navigation.map(section => <section key={section.section}><h2>{section.section}</h2>{section.items.map(item => <button key={item} className={screen === item ? "selected" : ""} onClick={() => setScreen(item)}><span className="aws-sim-nav-icon">{item === "Instances" ? "▣" : item === "Security Groups" ? "◇" : item === "Route Tables" ? "⇄" : item === "Network ACLs" ? "▤" : item === "Reachability Analyzer" ? "⌁" : "⌂"}</span><span>{item}</span>{screen === item && <i />}</button>)}</section>)}
        <div className="aws-sim-sidebar-note"><b>Training environment</b><p>Changes affect this scenario only. No AWS API calls are made.</p></div>
      </aside>
      <section className="aws-sim-content">
        <div className="aws-sim-breadcrumb">{screen === "Security Groups" || screen === "Route Tables" || screen === "Network ACLs" || screen === "Reachability Analyzer" ? "VPC" : "EC2"} <span>›</span> {screen}</div>
        <div className="aws-sim-heading"><div><h1>{screen}</h1><p>{screen === "Instances" ? "View and manage the simulated EC2 instance for this incident." : screen === "Security Groups" ? "Inspect the security group attached to api-prod-01." : screen === "Route Tables" ? "Review the subnet route table and route targets." : screen === "Network ACLs" ? "Review stateless subnet boundary rules." : screen === "Reachability Analyzer" ? "Analyze the path from the approved bastion to the instance on TCP/22." : "EC2 resource summary for this simulated incident."}</p></div><span className="aws-sim-region-pill">eu-west-1</span></div>
        <div className="aws-sim-notice"><b>Learning simulation</b><span>One shared AWS troubleshooting workspace. Changes affect only local training state; no live AWS API calls are made.</span></div>
        <div className="aws-sim-incident-picker">
          <div><span className="aws-sim-eyebrow">SHARED INCIDENT WORKSPACE</span><h2>{incident.title}</h2><p>Choose any AWS issue from the hub or switch incidents here. The registry provides the resource map, evidence checklist, safe next steps, and recovery criteria.</p></div>
          <label>Incident<select value={incidentId} onChange={event => chooseIncident(event.target.value)}>{AWS_INCIDENTS.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <div className="aws-sim-incident-resources"><b>Resources in scope</b><div>{incident.resources.map(resource => <span key={resource}>{resource}</span>)}</div></div>
          {incidentId !== "vm-unreachable" && <div className="aws-sim-scope-note"><b>Scenario mode</b><span>This issue is loaded into the shared AWS diagnostic workspace. Its incident-specific checks are active below; the interactive resource editor currently covers the EC2 SSH network scenario. Service-specific editors will be added to this same console as the AWS coverage expands.</span></div>}
          <div className="aws-sim-incident-checks"><div className="aws-sim-incident-checks-head"><b>Diagnostic checklist</b><span>{completedChecks.filter(id => incident.checks.some(item => item.id === id)).length} / {incident.checks.length} verified</span></div>
            {incident.checks.map((item, index) => {
              const done = completedChecks.includes(item.id);
              const expanded = expandedCheck === item.id;
              return <article className={`aws-sim-diagnostic-card ${done ? "done" : ""}`} key={item.id}>
                <button className="aws-sim-diagnostic-toggle" onClick={() => setExpandedCheck(expanded ? null : item.id)}><span className="aws-sim-diagnostic-number">{done ? "✓" : String(index + 1).padStart(2, "0")}</span><span><b>{item.label}</b><small>{item.resourceArea} · {done ? "Marked verified" : "Evidence required"}</small></span><strong>{expanded ? "−" : "+"}</strong></button>
                {expanded && <div className="aws-sim-diagnostic-detail"><p><b>Inspect this evidence</b>{item.evidence}</p><p><b>What passing looks like</b>{item.passCondition}</p><p><b>Safe next step</b>{item.safeNextStep}</p><button className={done ? "" : "primary"} onClick={() => setCompletedChecks(current => done ? current.filter(id => id !== item.id) : [...current, item.id])}>{done ? "Undo verified" : "Mark check verified"}</button></div>}
              </article>;
            })}
          </div>
          {completedChecks.filter(id => incident.checks.some(item => item.id === id)).length === incident.checks.length && <div className="aws-sim-verified"><b>Diagnostic review complete</b><p>Complete the real service-level verification before declaring recovery. {incident.verification.join(" · ")}.</p></div>}
        </div>

        {incidentId === "vm-unreachable" && screen === "Instances" && <div className="aws-sim-panel">
          <div className="aws-sim-panel-title"><div><h2>Instances (1/1)</h2><p>Selected instance · {state.instance.id}</p></div><button onClick={() => setScreen("Reachability Analyzer")}>Troubleshoot connectivity</button></div>
          <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Instance ID</th><th>Instance state</th><th>Instance type</th><th>Status check</th><th>Availability Zone</th></tr></thead><tbody><tr><td><b>{state.instance.name}</b><small>Production API</small></td><td className="mono">{state.instance.id}</td><td><span className="aws-sim-status good">● Running</span></td><td>t3.medium</td><td><span className="aws-sim-status good">2/2 checks passed</span></td><td>eu-west-1a</td></tr></tbody></table></div>
          <div className="aws-sim-detail-grid"><div><span>Private IPv4 address</span><b>{state.instance.privateIp}</b></div><div><span>VPC ID</span><b>vpc-0123abcd4567ef890</b></div><div><span>Subnet ID</span><b>{state.instance.subnetId}</b></div><div><span>Security groups</span><b>sg-api-prod</b></div></div>
          <div className="aws-sim-tabs"><span className="active">Details</span><span>Status checks</span><span>Networking</span><span>Security</span><span>Monitoring</span></div>
          <div className="aws-sim-panel-title compact"><h3>Instance details</h3><span>Last refreshed just now · simulated</span></div>
          <div className="aws-sim-property-grid"><div><span>Platform details</span><b>Linux/UNIX</b></div><div><span>AMI ID</span><b>ami-0a1b2c3d4e5f67890</b></div><div><span>Key pair name</span><b>prod-admin-key</b></div><div><span>Monitoring</span><b>Detailed monitoring disabled</b></div></div>
        </div>}

        {incidentId === "vm-unreachable" && screen === "Security Groups" && <div className="aws-sim-panel">
          <div className="aws-sim-panel-title"><div><h2>Security groups</h2><p>1 selected security group attached to {state.instance.name}</p></div><button className="primary" onClick={() => setShowRuleEditor(value => !value)}>{showRuleEditor ? "Cancel" : "Edit inbound rules"}</button></div>
          <div className="aws-sim-resource-strip"><span><small>Security group ID</small><b>{group.id}</b></span><span><small>Security group name</small><b>{group.name}</b></span><span><small>VPC ID</small><b>{group.vpcId}</b></span><span><small>Inbound rules</small><b>{group.ingress.length}</b></span></div>
          {showRuleEditor && <div className="aws-sim-editor"><h3>Add inbound rule</h3><p>Use the approved administrator source. The lab intentionally avoids opening SSH to the internet.</p><div className="aws-sim-form-grid"><label>Type<select value={sourceType} onChange={event => { const next = event.target.value as "SecurityGroup" | "IPv4"; setSourceType(next); setSource(next === "SecurityGroup" ? "sg-bastion-prod" : "198.51.100.24/32"); }}><option value="SecurityGroup">Custom (security group)</option><option value="IPv4">Custom (IPv4)</option></select></label><label>Protocol<input value="TCP" readOnly /></label><label>Port range<input value="22" readOnly /></label><label>{sourceType === "SecurityGroup" ? "Source security group" : "Source IPv4 CIDR"}<input value={source} onChange={event => setSource(event.target.value)} placeholder={sourceType === "SecurityGroup" ? "sg-bastion-prod" : "198.51.100.24/32"} /></label><label className="wide">Description<input value="Approved administrator SSH access" readOnly /></label></div><div className="aws-sim-editor-actions"><button onClick={() => setShowRuleEditor(false)}>Cancel</button><button className="primary" onClick={addRule}>Save rule</button></div></div>}
          <div className="aws-sim-tabs"><span>Details</span><span className="active">Inbound rules</span><span>Outbound rules</span><span>Tags</span></div>
          <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Security group rule ID</th><th>IP version</th><th>Type</th><th>Protocol</th><th>Port range</th><th>Source</th><th>Description</th></tr></thead><tbody>{group.ingress.map(rule => <tr key={rule.id}><td>—</td><td className="mono">{rule.id}</td><td>{rule.sourceType === "IPv4" ? "IPv4" : "—"}</td><td>{rule.fromPort === 22 ? "SSH" : rule.fromPort === 443 ? "HTTPS" : "Custom TCP"}</td><td>{rule.protocol}</td><td>{rule.fromPort === rule.toPort ? rule.fromPort : String(rule.fromPort) + "-" + String(rule.toPort)}</td><td className="mono">{rule.source}</td><td>{rule.description}</td></tr>)}</tbody></table></div>
          <p className="aws-sim-footnote">Only configured rules appear above. The missing TCP/22 allow is inferred from the failed path; it is not displayed as an existing rule.</p>
        </div>}

        {incidentId === "vm-unreachable" && screen === "Route Tables" && <div className="aws-sim-panel"><div className="aws-sim-panel-title"><div><h2>Route tables</h2><p>Routes associated with {state.instance.subnetId}</p></div></div><div className="aws-sim-resource-strip"><span><small>Route table ID</small><b>rtb-0123abcd4567ef890</b></span><span><small>Subnet association</small><b>private-admin-subnet</b></span></div><div className="aws-sim-table-wrap"><table><thead><tr><th>Destination</th><th>Target</th><th>Status</th><th>Propagated</th></tr></thead><tbody>{state.routes.map(route => <tr key={route.destination}><td className="mono">{route.destination}</td><td className="mono">{route.target}</td><td><span className={"aws-sim-status " + (route.state === "active" ? "good" : "bad")}>{route.state}</span></td><td>No</td></tr>)}</tbody></table></div><div className="aws-sim-inline-info"><b>Interpretation</b><span>The VPC local route is active. The configured path does not show a blackhole route, so do not change routing without additional evidence.</span></div></div>}

        {incidentId === "vm-unreachable" && screen === "Network ACLs" && <div className="aws-sim-panel"><div className="aws-sim-panel-title"><div><h2>Network ACL: acl-0a123bc456de789fg</h2><p>Subnet boundary rules · evaluated in rule-number order in AWS</p></div></div><div className="aws-sim-table-wrap"><table><thead><tr><th>Direction</th><th>Rule</th><th>Protocol</th><th>Port range</th><th>Source / destination</th><th>Action</th></tr></thead><tbody>{state.networkAcl.map((rule, index) => <tr key={rule.direction + rule.ports + index}><td>{rule.direction}</td><td>{index === 0 ? 100 : index === 1 ? 110 : index === 2 ? 100 : 110}</td><td>{rule.protocol}</td><td>{rule.ports}</td><td className="mono">{rule.source}</td><td><span className="aws-sim-status good">{rule.action}</span></td></tr>)}</tbody></table></div><p className="aws-sim-footnote">Simplified scenario model: the NACL permits the required lab flow and return traffic. The engine focuses on the attached security-group ingress gap.</p></div>}

        {incidentId === "vm-unreachable" && screen === "Reachability Analyzer" && <div className="aws-sim-panel">
          <div className="aws-sim-panel-title"><div><h2>Reachability Analyzer</h2><p>Path analysis · source network interface to destination network interface</p></div><button className="primary" onClick={() => setAnalysis(evaluateAwsSshReachability(state))}>Analyze path</button></div>
          <div className="aws-sim-path"><div><small>Source network interface</small><b>eni-0bastion01</b><span>Approved bastion · sg-bastion-prod</span></div><i>→</i><div><small>Protocol</small><b>TCP / 22</b><span>SSH</span></div><i>→</i><div><small>Destination</small><b>{state.instance.privateIp}</b><span>{state.instance.name}</span></div></div>
          {!analysis && <div className="aws-sim-empty"><span>⌁</span><h3>Ready to analyze</h3><p>Run path analysis to evaluate the current simulated route, network ACL, security-group ingress, and guest listener.</p><button className="primary" onClick={() => setAnalysis(evaluateAwsSshReachability(state))}>Analyze path</button></div>}
          {analysis && <div className={"aws-sim-analysis " + (analysis.reachable ? "success" : "blocked")}><div className="aws-sim-analysis-title"><span>{analysis.reachable ? "✓" : "!"}</span><div><h3>{analysis.reachable ? "Path is reachable in the simulation" : "Path is not reachable"}</h3><p>{analysis.summary}</p></div></div><div className="aws-sim-checks">{analysis.checks.map(check => <div key={check.name}><span className={"aws-sim-status " + check.result}>{check.result === "passed" ? "✓ Passed" : "! Blocked"}</span><b>{check.name}</b><p>{check.detail}</p></div>)}</div>{!analysis.reachable && analysis.blockedAt === "security-group" && <div className="aws-sim-remediation"><b>Suggested next action</b><p>Open <button onClick={() => { setScreen("Security Groups"); setShowRuleEditor(true); }}>Security Groups → Edit inbound rules</button> and add TCP/22 from the approved bastion security group. Do not use 0.0.0.0/0.</p></div>}{analysis.reachable && <div className="aws-sim-verified"><b>Verification state: simulated pass</b><p>The engine recomputed the path from the updated configuration. In a real environment, separately verify SSH authentication, guest logs, and monitoring.</p></div>}</div>}
        </div>}

        {incidentId === "vm-unreachable" && screen === "EC2 Dashboard" && <div className="aws-sim-dashboard-grid"><button onClick={() => setScreen("Instances")}><span>▣</span><b>Instances</b><strong>1</strong><small>View instance health and networking</small></button><button onClick={() => setScreen("Security Groups")}><span>◇</span><b>Security Groups</b><strong>{state.securityGroups.length}</strong><small>Review attached access rules</small></button><button onClick={() => setScreen("Route Tables")}><span>⇄</span><b>Route Tables</b><strong>{state.routes.length}</strong><small>Inspect configured routes</small></button><button onClick={() => setScreen("Reachability Analyzer")}><span>⌁</span><b>Reachability Analyzer</b><strong>{analysis ? (analysis.reachable ? "Reachable" : "Blocked") : "Not run"}</strong><small>Run a simulated path analysis</small></button></div>}
        <footer className="aws-sim-footer"><span>Simulation state</span><b>{incidentId === "vm-unreachable" ? (result.reachable ? "SSH path allowed" : "SSH path blocked") : `${completedChecks.filter(id => incident.checks.some(item => item.id === id)).length}/${incident.checks.length} checks verified`}</b><span>Changes are local to this training scenario.</span></footer>
      </section>
    </div>
  </main>;
}
