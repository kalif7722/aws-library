"use client";

import { useEffect, useMemo, useState } from "react";
import { addSshIngressRule, createInitialAwsLabState, evaluateAwsSshReachability, updateS3BucketSetting, type AwsLabState } from "./engine";
import "./simulator.css";

type Service = { name: string; category: string; icon: string; description: string; count: string; };
type Screen = "Console Home" | "EC2 Dashboard" | "Instances" | "Instance details" | "Security Groups" | "Route Tables" | "Network ACLs" | "VPCs" | "Load Balancers" | "Target Groups" | "S3" | "IAM" | "RDS" | "Lambda" | "CloudWatch" | "Route 53" | "DynamoDB" | "Cost Explorer" | "Reachability Analyzer";
const services: Service[] = [
  { name: "EC2", category: "Compute", icon: "▣", description: "Virtual servers in the cloud", count: "1 instance" },
  { name: "VPC", category: "Networking & Content Delivery", icon: "◇", description: "Isolated virtual networks and routing", count: "1 VPC" },
  { name: "Security Groups", category: "Networking & Security", icon: "⬡", description: "Stateful traffic controls for resources", count: "2 security groups" },
  { name: "Route Tables", category: "Networking & Security", icon: "⇄", description: "Subnet routing configuration", count: "3 route tables" },
  { name: "Network ACLs", category: "Networking & Security", icon: "▤", description: "Stateless subnet traffic controls", count: "2 network ACLs" },
  { name: "Load Balancers", category: "Networking & Content Delivery", icon: "⇋", description: "Distribute application traffic", count: "1 load balancer" },
  { name: "Target Groups", category: "Networking & Content Delivery", icon: "◎", description: "Register targets for load balancers", count: "2 target groups" },
  { name: "S3", category: "Storage", icon: "▰", description: "Object storage", count: "3 buckets" },
  { name: "IAM", category: "Security, Identity & Compliance", icon: "♙", description: "Users, roles, policies, and permissions", count: "4 roles · 3 policies" },
  { name: "RDS", category: "Database", icon: "▤", description: "Managed relational databases", count: "1 database" },
  { name: "Lambda", category: "Compute", icon: "λ", description: "Run code without managing servers", count: "3 functions" },
  { name: "CloudWatch", category: "Management & Governance", icon: "◷", description: "Metrics, logs, alarms, and events", count: "8 alarms" },
  { name: "Route 53", category: "Networking & Content Delivery", icon: "⌘", description: "DNS and health checks", count: "2 hosted zones" },
  { name: "DynamoDB", category: "Database", icon: "▦", description: "Managed NoSQL database", count: "2 tables" },
  { name: "Cost Explorer", category: "Cloud Financial Management", icon: "$", description: "Explore usage and spending", count: "Current month" },
  { name: "Reachability Analyzer", category: "Network & Security", icon: "⌁", description: "Analyze paths between network resources", count: "Available" }
];
const navGroups: { title: string; items: Screen[] }[] = [
  { title: "RECENTLY VISITED", items: ["Instances", "Security Groups", "Route Tables"] },
  { title: "COMPUTE", items: ["EC2 Dashboard", "Instances", "Lambda"] },
  { title: "NETWORKING & CONTENT DELIVERY", items: ["VPCs", "Security Groups", "Route Tables", "Network ACLs", "Load Balancers", "Target Groups", "Route 53", "Reachability Analyzer"] },
  { title: "STORAGE", items: ["S3"] },
  { title: "DATABASE", items: ["RDS", "DynamoDB"] },
  { title: "SECURITY, IDENTITY & COMPLIANCE", items: ["IAM"] },
  { title: "MANAGEMENT & GOVERNANCE", items: ["CloudWatch", "Cost Explorer"] }
];
const titleFor: Record<Screen, string> = {
  "Console Home":"Console Home", "EC2 Dashboard":"EC2", Instances:"Instances", "Instance details":"Instance details",
  "Security Groups":"Security Groups", "Route Tables":"Route tables", "Network ACLs":"Network ACLs", VPCs:"Your VPCs",
  "Load Balancers":"Load balancers", "Target Groups":"Target groups", S3:"Buckets", IAM:"IAM resources", RDS:"Databases",
  Lambda:"Functions", CloudWatch:"CloudWatch", "Route 53":"Hosted zones", DynamoDB:"Tables", "Cost Explorer":"Cost Explorer",
  "Reachability Analyzer":"Reachability Analyzer"
};
const serviceFor: Record<Screen, string> = {
  "Console Home":"AWS", "EC2 Dashboard":"EC2", Instances:"EC2", "Instance details":"EC2", "Security Groups":"VPC",
  "Route Tables":"VPC", "Network ACLs":"VPC", VPCs:"VPC", "Load Balancers":"EC2", "Target Groups":"EC2",
  S3:"S3", IAM:"IAM", RDS:"RDS", Lambda:"Lambda", CloudWatch:"CloudWatch", "Route 53":"Route 53",
  DynamoDB:"DynamoDB", "Cost Explorer":"Billing and Cost Management", "Reachability Analyzer":"VPC"
};

export default function AwsSimulatorPage() {
  const [state, setState] = useState<AwsLabState>(() => createInitialAwsLabState());
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<Screen>("Console Home");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [sourceType, setSourceType] = useState<"SecurityGroup" | "IPv4">("SecurityGroup");
  const [source, setSource] = useState("sg-bastion-prod");
  const [tab, setTab] = useState("Details");
  const [toast, setToast] = useState("");
  const [analysis, setAnalysis] = useState<{ ran: boolean; reachable: boolean; checks: { name: string; ok: boolean; detail: string }[] } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("aws-console-simulator-state-v2");
      if (saved) {
        const parsed = JSON.parse(saved) as { state?: AwsLabState; screen?: Screen };
        if (parsed.state?.instance && parsed.state.securityGroups && parsed.state.routes) { const baseline = createInitialAwsLabState(); setState({ ...baseline, ...parsed.state, s3Buckets: parsed.state.s3Buckets ?? baseline.s3Buckets }); }
        if (parsed.screen && parsed.screen !== "Instance details") setScreen(parsed.screen);
      }
    } catch { /* Start with the seeded training account if storage is unavailable. */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem("aws-console-simulator-state-v2", JSON.stringify({ state, screen })); } catch { /* Storage is optional. */ }
  }, [hydrated, state, screen]);

  const filteredServices = useMemo(() => services.filter(service => (service.name + " " + service.category + " " + service.description).toLowerCase().includes(search.toLowerCase())), [search]);
  const group = state.securityGroups[0];
  const instance = state.instance;
  const go = (next: Screen, resource?: string) => {
    setScreen(next);
    setSelectedResource(resource ?? null);
    setTab(next === "Security Groups" ? "Inbound rules" : next === "Route Tables" ? "Routes" : next === "Network ACLs" ? "Inbound rules" : next === "IAM" ? "Roles" : next === "CloudWatch" ? "Alarms" : "Details");
    setSearch("");
    setShowServices(false);
    setToast("");
  };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  function addRule() {
    const trimmed = source.trim();
    if (!trimmed) return;
    setState(current => addSshIngressRule(current, trimmed, sourceType));
    setShowRuleEditor(false);
    notify("Inbound rule saved in the simulated account.");
  }
  function resetAccount() {
    setState(createInitialAwsLabState());
    setScreen("Console Home");
    setSelectedResource(null);
    setShowRuleEditor(false);
    setAnalysis(null);
    setSourceType("SecurityGroup");
    setSource("sg-bastion-prod");
    try { window.localStorage.removeItem("aws-console-simulator-state-v2"); } catch { /* Storage is optional. */ }
    notify("Training account reset to its initial configuration.");
  }
  function openService(name: string) {
    const map: Record<string, Screen> = { EC2:"EC2 Dashboard", VPC:"VPCs", "Security Groups":"Security Groups", "Route Tables":"Route Tables", "Network ACLs":"Network ACLs", "Load Balancers":"Load Balancers", "Target Groups":"Target Groups", S3:"S3", IAM:"IAM", RDS:"RDS", Lambda:"Lambda", CloudWatch:"CloudWatch", "Route 53":"Route 53", DynamoDB:"DynamoDB", "Cost Explorer":"Cost Explorer", "Reachability Analyzer":"Reachability Analyzer" };
    go(map[name] ?? "Console Home");
  }
  const resourceCount = screen === "Instances" ? "1 instance" : screen === "Security Groups" ? "2 security groups" : screen === "Route Tables" ? "3 route tables" : screen === "Network ACLs" ? "2 network ACLs" : screen === "VPCs" ? "1 VPC" : screen === "S3" ? "3 buckets" : screen === "IAM" ? "7 resources" : screen === "RDS" ? "1 database" : screen === "Lambda" ? "3 functions" : screen === "CloudWatch" ? "8 alarms" : screen === "Route 53" ? "2 hosted zones" : screen === "DynamoDB" ? "2 tables" : screen === "Load Balancers" ? "1 load balancer" : screen === "Target Groups" ? "2 target groups" : "Resources";
  const screenDescription: Record<Screen, string> = {
    "Console Home":"Explore services and resources in this simulated AWS account.",
    "EC2 Dashboard":"Launch, connect to, and manage virtual servers.",
    Instances:"View and manage instances in the selected Region.",
    "Instance details":"Inspect instance configuration, networking, security, and monitoring.",
    "Security Groups":"Review the inbound and outbound rules attached to network interfaces.",
    "Route Tables":"Inspect routes and subnet associations in the selected VPC.",
    "Network ACLs":"Review stateless subnet-level inbound and outbound rules.",
    VPCs:"View virtual private clouds, subnets, gateways, and related network resources.",
    "Load Balancers":"View load balancers, listeners, schemes, and network mappings.",
    "Target Groups":"Inspect registered targets and health-check configuration.",
    S3:"Browse buckets and inspect access, properties, and object settings.",
    IAM:"Browse roles, policies, users, and permission relationships.",
    RDS:"Inspect database instances, connectivity, backups, and maintenance settings.",
    Lambda:"Browse functions, runtime settings, triggers, permissions, and logs.",
    CloudWatch:"Inspect alarms, metrics, dashboards, and log groups.",
    "Route 53":"Browse hosted zones, records, routing policies, and health checks.",
    DynamoDB:"Inspect tables, indexes, capacity, and monitoring.",
    "Cost Explorer":"Explore simulated usage and cost breakdowns.",
    "Reachability Analyzer":"Create a path analysis between supported network resources."
  };

  const navButton = (item: Screen) => <button key={item} className={screen === item ? "selected" : ""} onClick={() => go(item)}><span className="aws-sim-nav-icon">{item === "Instances" ? "▣" : item.includes("Group") ? "⬡" : item.includes("Route") ? "⇄" : item.includes("ACL") ? "▤" : item === "VPCs" ? "◇" : item === "Lambda" ? "λ" : item === "S3" ? "▰" : item === "IAM" ? "♙" : item === "CloudWatch" ? "◷" : "⌂"}</span><span>{item}</span>{screen === item && <i />}</button>;

  return <main className="aws-sim aws-console-sim">
    <header className="aws-sim-global">
      <button className="aws-sim-menu" aria-label="Open services menu" onClick={() => setShowServices(value => !value)}>☰</button>
      <button className="aws-sim-logo" onClick={() => go("Console Home")} aria-label="AWS Console Home">aws<span>›</span></button>
      <div className="aws-sim-search"><span>⌕</span><input aria-label="Search services and features" placeholder="Search services and features (Alt+S)" value={search} onChange={event => { setSearch(event.target.value); setShowServices(true); }} /><kbd>Alt+S</kbd></div>
      <button className="aws-sim-global-action" onClick={() => notify("CloudShell is represented as a training-only console panel in this environment.")}>CloudShell</button>
      <div className="aws-sim-region">Europe (Ireland) <b>⌄</b></div>
      <button className="aws-sim-account" onClick={() => notify("Training account · 123456789012 · no live AWS credentials are connected.")}><span>Training account</span><b>1234-5678-9012</b></button>
    </header>
    <div className="aws-sim-subbar"><span>SIMULATED AWS ACCOUNT</span><span>Region: eu-west-1</span><span>Account: 123456789012</span><span className="aws-sim-subbar-state">Local training environment</span><button onClick={resetAccount}>Reset account</button></div>
    {(showServices || search) && <div className="aws-sim-service-search">
      <div className="aws-sim-service-search-head"><b>{search ? "Search results" : "Services"}</b><button onClick={() => { setShowServices(false); setSearch(""); }}>Close ×</button></div>
      {filteredServices.length ? <div className="aws-sim-service-grid">{filteredServices.map(service => <button key={service.name} onClick={() => openService(service.name)}><span>{service.icon}</span><div><b>{service.name}</b><small>{service.description}</small></div><i>›</i></button>) : <p className="aws-sim-no-results">No matching services in this training console.</p>}
    </div>}
    <div className="aws-sim-layout">
      <aside className="aws-sim-sidebar">
        <button className="aws-sim-home-link" onClick={() => go("Console Home")}>⌂ <span>Console Home</span></button>
        {navGroups.map(section => <section key={section.title}><h2>{section.title}</h2>{section.items.map(navButton)}</section>)}
        <div className="aws-sim-sidebar-note"><b>Training environment</b><p>This is a local simulation. Configuration changes persist in this browser only. No AWS API calls are made.</p></div>
      </aside>
      <section className="aws-sim-content">
        <div className="aws-sim-breadcrumb"><button onClick={() => go("Console Home")}>Console Home</button>{screen !== "Console Home" && <><span>›</span><button onClick={() => go(screen === "Instance details" ? "Instances" : screen)}>{serviceFor[screen]}</button><span>›</span>{titleFor[screen]}</>}</div>
        <div className="aws-sim-heading"><div><h1>{titleFor[screen]}</h1><p>{screenDescription[screen]}</p></div><span className="aws-sim-region-pill">Europe (Ireland) · eu-west-1</span></div>
        <div className="aws-sim-notice"><b>Training simulation</b><span>Resource names and configurations are seeded examples. This interface imitates common AWS console workflows but is not the live AWS Management Console.</span></div>
        {toast && <div className="aws-sim-toast" role="status">{toast}</div>}

        {screen === "Console Home" && <>
          <div className="aws-sim-home-welcome"><div><span className="aws-sim-eyebrow">AWS MANAGEMENT CONSOLE</span><h2>Welcome to your training account</h2><p>Browse resources, follow relationships between services, and inspect the current configuration. Nothing is preselected as an incident.</p></div><div className="aws-sim-home-account"><small>Account ID</small><b>1234-5678-9012</b><small>Default Region</small><b>eu-west-1</b></div></div>
          <div className="aws-sim-section-heading"><h2>Recently visited</h2><span>Training account resources</span></div>
          <div className="aws-sim-recent-grid">{[{name:"Instances",icon:"▣",meta:"EC2 · eu-west-1"},{name:"Security Groups",icon:"⬡",meta:"VPC · eu-west-1"},{name:"Route Tables",icon:"⇄",meta:"VPC · eu-west-1"},{name:"CloudWatch",icon:"◷",meta:"Monitoring"}].map(item=><button key={item.name} onClick={() => go(item.name as Screen)}><span>{item.icon}</span><div><b>{item.name}</b><small>{item.meta}</small></div><i>›</i></button>)}</div>
          <div className="aws-sim-section-heading"><h2>All services</h2><span>{services.length} simulated service areas</span></div>
          <div className="aws-sim-service-grid aws-sim-home-services">{services.map(service=><button key={service.name} onClick={() => openService(service.name)}><span>{service.icon}</span><div><b>{service.name}</b><small>{service.description}</small><em>{service.count}</em></div><i>›</i></button>)}</div>
          <div className="aws-sim-panel aws-sim-resource-panel"><div className="aws-sim-panel-title"><div><h2>Resources in this account</h2><p>Example inventory across the selected Region</p></div></div><div className="aws-sim-resource-summary"><button onClick={() => go("Instances")}><b>1</b><span>EC2 instance</span></button><button onClick={() => go("VPCs")}><b>1</b><span>VPC</span></button><button onClick={() => go("S3")}><b>3</b><span>S3 buckets</span></button><button onClick={() => go("RDS")}><b>1</b><span>RDS database</span></button><button onClick={() => go("Lambda")}><b>3</b><span>Lambda functions</span></button></div></div>
        </>}

        {(screen === "EC2 Dashboard" || screen === "Instances" || screen === "Instance details") && <div className="aws-sim-panel">
          {screen !== "Instance details" ? <div className="aws-sim-panel-title"><div><h2>{screen === "Instances" ? "Instances (1)" : "EC2 resources"}</h2><p>{screen === "Instances" ? "Instances in eu-west-1" : "Compute resources in this account"}</p></div><button onClick={() => notify("Launch instance form is not yet implemented in this simulation.")}>Launch instances</button></div> : <div className="aws-sim-panel-title"><div><h2>{instance.name} <span className="aws-sim-status good">● Running</span></h2><p>{instance.id}</p></div><button onClick={() => notify("Instance actions are simulated; start/stop/reboot controls are not enabled yet.")}>Instance state ⌄</button></div>}
          {screen !== "Instance details" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Instance ID</th><th>Instance state</th><th>Instance type</th><th>Status check</th><th>Availability Zone</th><th>Private IPv4</th></tr></thead><tbody><tr className="aws-sim-click-row" onClick={() => go("Instance details", instance.id)}><td><button className="aws-sim-text-link" onClick={event => { event.stopPropagation(); go("Instance details", instance.id); }}>{instance.name}</button><small>Production API</small></td><td className="mono">{instance.id}</td><td><span className="aws-sim-status good">● {instance.state === "running" ? "Running" : "Stopped"}</span></td><td>t3.medium</td><td><span className="aws-sim-status good">2/2 checks passed</span></td><td>eu-west-1a</td><td className="mono">{instance.privateIp}</td></tr></tbody></table></div>}
          {screen === "EC2 Dashboard" && <div className="aws-sim-detail-grid"><div><span>Instances</span><button className="aws-sim-text-link" onClick={() => go("Instances")}>View instances (1)</button></div><div><span>Security groups</span><button className="aws-sim-text-link" onClick={() => go("Security Groups")}>View security groups (2)</button></div><div><span>Load balancers</span><button className="aws-sim-text-link" onClick={() => go("Load Balancers")}>View load balancers (1)</button></div><div><span>Target groups</span><button className="aws-sim-text-link" onClick={() => go("Target Groups")}>View target groups (2)</button></div></div>}
          {screen === "Instance details" && <>
            <div className="aws-sim-detail-grid"><div><span>Instance state</span><b>{instance.state}</b></div><div><span>Instance type</span><b>t3.medium</b></div><div><span>Availability Zone</span><b>eu-west-1a</b></div><div><span>Private IPv4 address</span><b>{instance.privateIp}</b></div><div><span>VPC ID</span><button className="aws-sim-text-link" onClick={() => go("VPCs","vpc-0123abcd4567ef890")}>vpc-0123abcd4567ef890</button></div><div><span>Subnet ID</span><button className="aws-sim-text-link" onClick={() => go("VPCs",instance.subnetId)}>{instance.subnetId}</button></div><div><span>Security groups</span><button className="aws-sim-text-link" onClick={() => go("Security Groups",group.id)}>{group.name}</button></div><div><span>IAM role</span><button className="aws-sim-text-link" onClick={() => go("IAM","EC2-Production-Role")}>EC2-Production-Role</button></div></div>
            <div className="aws-sim-tabs">{["Details","Security","Networking","Storage","Status checks","Monitoring","Tags"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>
            {tab === "Security" && <div className="aws-sim-panel-title compact"><h3>Security details</h3><button onClick={() => go("Security Groups",group.id)}>Open security group</button></div>}
            {tab === "Networking" && <div className="aws-sim-property-grid"><div><span>VPC</span><button className="aws-sim-text-link" onClick={()=>go("VPCs")}>vpc-0123abcd4567ef890</button></div><div><span>Subnet</span><button className="aws-sim-text-link" onClick={()=>go("VPCs",instance.subnetId)}>{instance.subnetId}</button></div><div><span>Primary private IPv4</span><b>{instance.privateIp}</b></div><div><span>Network ACL</span><button className="aws-sim-text-link" onClick={()=>go("Network ACLs")}>acl-0a123bc456de789fg</button></div></div>}
            {tab === "Storage" && <div className="aws-sim-property-grid"><div><span>Root device</span><b>/dev/xvda</b></div><div><span>Volume ID</span><b>vol-0a12bc34de56f7890</b></div><div><span>Volume type</span><b>gp3</b></div><div><span>Encrypted</span><b>Yes · simulated KMS key</b></div></div>}
            {tab === "Status checks" && <div className="aws-sim-property-grid"><div><span>System status check</span><b>2/2 checks passed</b></div><div><span>Instance reachability</span><b>Passed</b></div><div><span>Guest service</span><b>{instance.guestSsh === "listening" ? "SSH listener running" : "SSH listener stopped"}</b></div></div>}
            {tab === "Monitoring" && <div className="aws-sim-property-grid"><div><span>CPU utilization</span><b>18.4%</b></div><div><span>Network in</span><b>1.8 MB</b></div><div><span>Network out</span><b>2.2 MB</b></div><div><span>Detailed monitoring</span><b>Disabled</b></div></div>}
            {tab === "Tags" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td>Name</td><td>{instance.name}</td></tr><tr><td>Environment</td><td>production</td></tr><tr><td>Application</td><td>payments-api</td></tr><tr><td>Owner</td><td>platform-engineering</td></tr></tbody></table></div>}
            {tab === "Details" && <div className="aws-sim-property-grid"><div><span>AMI ID</span><b>ami-0a1b2c3d4e5f67890</b></div><div><span>Platform details</span><b>Linux/UNIX</b></div><div><span>Key pair name</span><b>prod-admin-key</b></div><div><span>Launch time</span><b>2026-10-12 09:24 UTC</b></div></div>}
          </>}
        </div>}

        {screen === "Security Groups" && <div className="aws-sim-panel">
          <div className="aws-sim-panel-title"><div><h2>Security groups (2)</h2><p>Security groups are stateful virtual firewalls for associated network interfaces.</p></div><button className="primary" onClick={() => setShowRuleEditor(value=>!value)}>{showRuleEditor ? "Cancel editing" : "Edit inbound rules"}</button></div>
          <div className="aws-sim-resource-strip"><span><small>Security group ID</small><b>{group.id}</b></span><span><small>Security group name</small><b>{group.name}</b></span><span><small>VPC ID</small><button className="aws-sim-text-link" onClick={()=>go("VPCs",group.vpcId)}>{group.vpcId}</button></span><span><small>Inbound rules</small><b>{group.ingress.length}</b></span></div>
          {showRuleEditor && <div className="aws-sim-editor"><h3>Edit inbound rules</h3><p>Changes apply only to this browser's training account.</p><div className="aws-sim-form-grid"><label>Type<select value={sourceType} onChange={event=>{const next=event.target.value as "SecurityGroup"|"IPv4";setSourceType(next);setSource(next==="SecurityGroup"?"sg-bastion-prod":"198.51.100.24/32");}}><option value="SecurityGroup">Custom (security group)</option><option value="IPv4">Custom (IPv4)</option></select></label><label>Protocol<input value="TCP" readOnly /></label><label>Port range<input value="22" readOnly /></label><label>{sourceType==="SecurityGroup"?"Source security group":"Source IPv4 CIDR"}<input value={source} onChange={event=>setSource(event.target.value)} placeholder="Approved source" /></label><label className="wide">Description<input value="Administrator SSH access" readOnly /></label></div><div className="aws-sim-editor-actions"><button onClick={()=>setShowRuleEditor(false)}>Cancel</button><button className="primary" onClick={addRule}>Save rules</button></div></div>}
          <div className="aws-sim-tabs">{["Details","Inbound rules","Outbound rules","Tags"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>
          {tab==="Outbound rules" ? <div className="aws-sim-table-wrap"><table><thead><tr><th>Type</th><th>Protocol</th><th>Port range</th><th>Destination</th><th>Description</th></tr></thead><tbody><tr><td>All traffic</td><td>All</td><td>All</td><td>0.0.0.0/0</td><td>Default egress rule</td></tr></tbody></table></div> : tab==="Tags" ? <div className="aws-sim-table-wrap"><table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td>Name</td><td>{group.name}</td></tr><tr><td>Environment</td><td>production</td></tr></tbody></table></div> : <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Security group rule ID</th><th>IP version</th><th>Type</th><th>Protocol</th><th>Port range</th><th>Source</th><th>Description</th></tr></thead><tbody>{group.ingress.map(rule=><tr key={rule.id}><td>—</td><td className="mono">{rule.id}</td><td>{rule.sourceType==="IPv4"?"IPv4":"—"}</td><td>{rule.fromPort===22?"SSH":rule.fromPort===443?"HTTPS":"Custom TCP"}</td><td>{rule.protocol}</td><td>{rule.fromPort===rule.toPort?rule.fromPort:rule.fromPort+"-"+rule.toPort}</td><td className="mono">{rule.source}</td><td>{rule.description}</td></tr>)}</tbody></table></div>}
          <div className="aws-sim-related"><b>Related resources</b><button onClick={()=>go("Instances",instance.id)}>EC2 instance: {instance.name} ↗</button><button onClick={()=>go("Route Tables")}>Route tables ↗</button><button onClick={()=>go("Network ACLs")}>Network ACLs ↗</button></div>
        </div>}

        {screen === "Route Tables" && <div className="aws-sim-panel"><div className="aws-sim-panel-title"><div><h2>Route tables (3)</h2><p>Routes are evaluated using longest-prefix match. Inspect associations before editing.</p></div><button onClick={()=>notify("Create route table is not yet implemented.")}>Create route table</button></div><div className="aws-sim-resource-strip"><span><small>Route table ID</small><b>rtb-0123abcd4567ef890</b></span><span><small>VPC</small><button className="aws-sim-text-link" onClick={()=>go("VPCs")}>vpc-0123abcd4567ef890</button></span><span><small>Subnet association</small><b>private-admin-subnet</b></span><span><small>Main</small><b>No</b></span></div><div className="aws-sim-tabs">{["Routes","Subnet associations","Edge associations","Tags"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>{tab==="Subnet associations"?<div className="aws-sim-table-wrap"><table><thead><tr><th>Subnet ID</th><th>Subnet name</th><th>Availability Zone</th></tr></thead><tbody><tr><td className="mono">{instance.subnetId}</td><td>private-admin-subnet</td><td>eu-west-1a</td></tr></tbody></table></div>:<div className="aws-sim-table-wrap"><table><thead><tr><th>Destination</th><th>Target</th><th>Status</th><th>Propagated</th></tr></thead><tbody>{state.routes.map(route=><tr key={route.destination}><td className="mono">{route.destination}</td><td className="mono">{route.target}</td><td><span className={"aws-sim-status "+(route.state==="active"?"good":"bad")}>● {route.state}</span><button className="aws-sim-text-link" onClick={()=>{setState(current=>({...current,routes:current.routes.map(item=>item.destination===route.destination?{...item,state:item.state==="active"?"blackhole" as const:"active" as const}:item)}));notify("Route state updated in the simulated account.");}}>Edit route</button></td><td>No</td></tr>)}</tbody></table></div>}<div className="aws-sim-related"><b>Related resources</b><button onClick={()=>go("VPCs")}>VPC details ↗</button><button onClick={()=>go("Instances",instance.id)}>Instance: {instance.name} ↗</button><button onClick={()=>go("Network ACLs")}>Network ACLs ↗</button></div></div>}

        {screen === "Network ACLs" && <div className="aws-sim-panel"><div className="aws-sim-panel-title"><div><h2>Network ACLs (2)</h2><p>Network ACLs are stateless. Inbound and outbound rules are evaluated independently in rule-number order.</p></div><button onClick={()=>notify("Create network ACL is not yet implemented.")}>Create network ACL</button></div><div className="aws-sim-resource-strip"><span><small>Network ACL ID</small><b>acl-0a123bc456de789fg</b></span><span><small>VPC</small><button className="aws-sim-text-link" onClick={()=>go("VPCs")}>vpc-0123abcd4567ef890</button></span><span><small>Subnet associations</small><b>2 subnets</b></span><span><small>Default</small><b>No</b></span></div><div className="aws-sim-tabs">{["Inbound rules","Outbound rules","Subnet associations","Tags"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>{tab==="Subnet associations"?<div className="aws-sim-table-wrap"><table><thead><tr><th>Subnet ID</th><th>Subnet name</th><th>VPC</th></tr></thead><tbody><tr><td className="mono">{instance.subnetId}</td><td>private-admin-subnet</td><td>vpc-0123abcd4567ef890</td></tr></tbody></table></div>:<div className="aws-sim-table-wrap"><table><thead><tr><th>Rule number</th><th>Type</th><th>Protocol</th><th>Port range</th><th>Source / destination</th><th>Allow / deny</th></tr></thead><tbody>{state.networkAcl.filter(rule=>tab==="Outbound rules"?rule.direction==="outbound":rule.direction==="inbound").map((rule,index)=><tr key={rule.direction+rule.ports+index}><td>{index===0?100:110}</td><td>{rule.ports==="22"?"SSH":rule.ports==="1024-65535"?"Ephemeral ports":"Custom TCP"}</td><td>{rule.protocol}</td><td>{rule.ports}</td><td className="mono">{rule.source}</td><td><span className={"aws-sim-status "+(rule.action==="allow"?"good":"bad")}>{rule.action}</span><button className="aws-sim-text-link" onClick={()=>{setState(current=>({...current,networkAcl:current.networkAcl.map((item,index2)=>item.direction===rule.direction&&item.ports===rule.ports&&current.networkAcl.filter(candidate=>candidate.direction===rule.direction).findIndex(candidate=>candidate===item)===index?{...item,action:item.action==="allow"?"deny" as const:"allow" as const}:item)}));notify("Network ACL action updated in the simulated account.");}}>Edit rule</button></td></tr>)}</tbody></table></div>}<div className="aws-sim-related"><b>Related resources</b><button onClick={()=>go("VPCs")}>VPC ↗</button><button onClick={()=>go("Route Tables")}>Route tables ↗</button><button onClick={()=>go("Instances",instance.id)}>Instance ↗</button></div></div>}

        {screen === "VPCs" && <div className="aws-sim-panel"><div className="aws-sim-panel-title"><div><h2>Your VPCs (1)</h2><p>Virtual private clouds in Europe (Ireland)</p></div><button onClick={()=>notify("Create VPC is not yet implemented.")}>Create VPC</button></div><div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>VPC ID</th><th>State</th><th>IPv4 CIDR</th><th>Tenancy</th><th>Default</th></tr></thead><tbody><tr><td><button className="aws-sim-text-link" onClick={()=>setSelectedResource("vpc-0123abcd4567ef890")}>production-vpc</button></td><td className="mono">vpc-0123abcd4567ef890</td><td><span className="aws-sim-status good">Available</span></td><td>10.20.0.0/16</td><td>default</td><td>No</td></tr></tbody></table></div><div className="aws-sim-section-heading inside"><h2>Resource map</h2><span>Selected VPC</span></div><div className="aws-sim-vpc-map"><button onClick={()=>go("VPCs","vpc-0123abcd4567ef890")}><b>production-vpc</b><small>10.20.0.0/16</small></button><span>→</span><button onClick={()=>go("VPCs",instance.subnetId)}><b>private-admin-subnet</b><small>10.20.2.0/24 · eu-west-1a</small></button><span>→</span><button onClick={()=>go("Instance details",instance.id)}><b>{instance.name}</b><small>{instance.privateIp}</small></button></div><div className="aws-sim-related"><b>Inspect VPC components</b><button onClick={()=>go("Route Tables")}>Route tables ↗</button><button onClick={()=>go("Network ACLs")}>Network ACLs ↗</button><button onClick={()=>go("Security Groups")}>Security groups ↗</button><button onClick={()=>go("Load Balancers")}>Load balancers ↗</button></div></div>}

        {["Load Balancers","Target Groups","S3","IAM","RDS","Lambda","CloudWatch","Route 53","DynamoDB","Cost Explorer","Reachability Analyzer"].includes(screen) && <div className="aws-sim-panel">
          <div className="aws-sim-panel-title"><div><h2>{titleFor[screen]} ({resourceCount})</h2><p>{screenDescription[screen]}</p></div><button onClick={()=>notify("This create workflow is not implemented in the current simulation.")}>{screen==="S3"?"Create bucket":screen==="IAM"?"Create role":screen==="Lambda"?"Create function":screen==="RDS"?"Create database":screen==="Reachability Analyzer"?"Create and analyze path":"Create resource"}</button></div>
          {screen==="Load Balancers" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Type</th><th>Scheme</th><th>State</th><th>VPC</th><th>Availability Zones</th><th>DNS name</th></tr></thead><tbody><tr><td><button className="aws-sim-text-link" onClick={()=>setSelectedResource("alb-payments-prod")}>alb-payments-prod</button></td><td>Application</td><td>Internal</td><td><span className="aws-sim-status good">Active</span></td><td>vpc-0123abcd4567ef890</td><td>eu-west-1a, 1b</td><td className="mono">internal-alb-payments…</td></tr></tbody></table></div>}
          {screen==="Target Groups" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Target type</th><th>Protocol:Port</th><th>Registered targets</th><th>Health</th><th>VPC</th></tr></thead><tbody><tr><td>tg-payments-api</td><td>Instance</td><td>HTTP:8080</td><td>2</td><td><span className="aws-sim-status good">2 healthy</span></td><td>vpc-0123abcd4567ef890</td></tr><tr><td>tg-payments-admin</td><td>Instance</td><td>HTTP:8443</td><td>1</td><td><span className="aws-sim-status good">1 healthy</span></td><td>vpc-0123abcd4567ef890</td></tr></tbody></table></div>}
          {screen==="S3" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>AWS Region</th><th>Creation date</th><th>Access</th><th>Versioning</th><th>Default encryption</th></tr></thead><tbody>{state.s3Buckets.map(bucket=><tr key={bucket.name}><td><button className="aws-sim-text-link" onClick={()=>setSelectedResource(bucket.name)}>{bucket.name}</button></td><td>{bucket.region}</td><td>{bucket.name==="data-lake-curated"?"2026-01-07":"2025-08-12"}</td><td><span className={"aws-sim-status "+(bucket.blockPublicAccess?"good":"bad")}>{bucket.blockPublicAccess?"Blocked":"Not blocked"}</span><button className="aws-sim-text-link" onClick={()=>{setState(current=>updateS3BucketSetting(current,bucket.name,"blockPublicAccess",!bucket.blockPublicAccess));notify("S3 public-access setting updated.");}}>{bucket.blockPublicAccess?"Disable block":"Enable block"}</button></td><td><span className={"aws-sim-status "+(bucket.versioningEnabled?"good":"bad")}>{bucket.versioningEnabled?"Enabled":"Disabled"}</span><button className="aws-sim-text-link" onClick={()=>{setState(current=>updateS3BucketSetting(current,bucket.name,"versioningEnabled",!bucket.versioningEnabled));notify("S3 versioning setting updated.");}}>{bucket.versioningEnabled?"Suspend":"Enable"} versioning</button></td><td>{bucket.encryption}</td></tr>)}</tbody></table></div>}
          {screen==="IAM" && <div className="aws-sim-tabs">{["Roles","Policies","Users","Groups"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>}
          {screen==="IAM" && <div className="aws-sim-table-wrap"><table><thead><tr><th>{tab==="Policies"?"Policy name":tab==="Users"?"User name":tab==="Groups"?"Group name":"Role name"}</th><th>Type</th><th>Last activity</th><th>Attached permissions</th></tr></thead><tbody>{(tab==="Policies"?[["PaymentsReadOnly","Customer managed","Today","s3:GetObject, rds:Describe*"],["CloudWatchAgentServerPolicy","AWS managed","Today","CloudWatch agent"]]:tab==="Users"?[["platform-admin","IAM user","Yesterday","AdministratorAccess"],["audit-reader","IAM user","Today","SecurityAudit"]]:tab==="Groups"?[["PlatformEngineers","IAM group","Today","PowerUserAccess"],["SecurityAudit","IAM group","Today","SecurityAudit"]]:[["EC2-Production-Role","Service role","Today","CloudWatchAgentServerPolicy"],["Lambda-Payments-Role","Service role","Today","PaymentsReadOnly"],["DataPipeline-Role","Service role","Yesterday","AmazonS3ReadOnlyAccess"]]).map(row=><tr key={row[0]}><td><button className="aws-sim-text-link" onClick={()=>setSelectedResource(row[0])}>{row[0]}</button></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div>}
          {screen==="RDS" && <div className="aws-sim-table-wrap"><table><thead><tr><th>DB identifier</th><th>Status</th><th>Engine</th><th>Class</th><th>Availability Zone</th><th>Public access</th><th>Endpoint</th></tr></thead><tbody><tr><td><button className="aws-sim-text-link" onClick={()=>setSelectedResource("orders-prod")}>orders-prod</button></td><td><span className="aws-sim-status good">Available</span></td><td>PostgreSQL 16.3</td><td>db.r6g.large</td><td>eu-west-1a</td><td>No</td><td className="mono">orders-prod.abc123.eu-west-1.rds.amazonaws.com</td></tr></tbody></table></div>}
          {screen==="Lambda" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Function name</th><th>Package type</th><th>Runtime</th><th>Architecture</th><th>Last modified</th></tr></thead><tbody><tr><td>payments-authorizer</td><td>Zip</td><td>Python 3.12</td><td>x86_64</td><td>2026-10-11</td></tr><tr><td>orders-event-handler</td><td>Zip</td><td>Node.js 22.x</td><td>arm64</td><td>2026-10-09</td></tr><tr><td>invoice-generator</td><td>Image</td><td>Container image</td><td>x86_64</td><td>2026-10-01</td></tr></tbody></table></div>}
          {screen==="CloudWatch" && <div className="aws-sim-tabs">{["Alarms","Metrics","Log groups","Dashboards"].map(item=><button key={item} className={tab===item?"active":""} onClick={()=>setTab(item)}>{item}</button>)}</div>}
          {screen==="CloudWatch" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>State</th><th>Metric / namespace</th><th>Condition</th><th>Last state update</th></tr></thead><tbody>{(tab==="Log groups"?[["/aws/ec2/api-prod-01","—","EC2 logs","Retention 30 days","Today"],["/aws/lambda/payments-authorizer","—","Lambda logs","Retention 14 days","Today"]]:tab==="Metrics"?[["CPUUtilization","Available","AWS/EC2","InstanceId = i-0a12…","1 minute"],["NetworkIn","Available","AWS/EC2","InstanceId = i-0a12…","1 minute"]]:tab==="Dashboards"?[["Production-Overview","Available","Dashboard","12 widgets","Today"]]:[["api-prod-cpu-high","OK","AWS/EC2 · CPUUtilization","> 80% for 5 minutes","Today"],["orders-db-connections","OK","AWS/RDS · DatabaseConnections","> 150 for 10 minutes","Today"],["payments-5xx-rate","ALARM","AWS/ApplicationELB · HTTPCode_Target_5XX_Count","> 20 for 3 minutes","12 minutes ago"]]).map(row=><tr key={row[0]}><td>{row[0]}</td><td><span className={"aws-sim-status "+(row[1]==="ALARM"?"bad":"good")}>{row[1]}</span></td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td></tr>)}</tbody></table></div>}
          {screen==="Route 53" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Hosted zone name</th><th>Type</th><th>Record count</th><th>Hosted zone ID</th><th>Description</th></tr></thead><tbody><tr><td>example.internal</td><td>Private hosted zone</td><td>12</td><td className="mono">Z0123EXAMPLEABC</td><td>Internal service discovery</td></tr><tr><td>example.com</td><td>Public hosted zone</td><td>8</td><td className="mono">Z0456EXAMPLEDEF</td><td>Public application DNS</td></tr></tbody></table></div>}
          {screen==="DynamoDB" && <div className="aws-sim-table-wrap"><table><thead><tr><th>Table name</th><th>Status</th><th>Partition key</th><th>Capacity mode</th><th>Encryption</th><th>Region</th></tr></thead><tbody><tr><td>Orders</td><td><span className="aws-sim-status good">Active</span></td><td>orderId (String)</td><td>On-demand</td><td>AWS owned key</td><td>eu-west-1</td></tr><tr><td>IdempotencyKeys</td><td><span className="aws-sim-status good">Active</span></td><td>key (String)</td><td>On-demand</td><td>KMS key</td><td>eu-west-1</td></tr></tbody></table></div>}
          {screen==="Cost Explorer" && <div className="aws-sim-cost-summary"><div><small>Month-to-date simulated cost</small><b>$4,286.17</b><span>Example training data · not billed</span></div><div><small>Forecasted month-end</small><b>$6,940.00</b><span>Based on seeded usage</span></div><div><small>Largest service</small><b>Amazon EC2</b><span>38% of simulated spend</span></div></div>}
          {screen==="Reachability Analyzer" && <><div className="aws-sim-editor"><h3>Path configuration</h3><p>Choose source and destination resources, then run an analysis. Results are calculated from the current simulated resource state.</p><div className="aws-sim-form-grid"><label>Source resource<select><option>eni-0bastion01 · bastion-admin</option><option>alb-payments-prod</option></select></label><label>Destination resource<select><option>{instance.id} · {instance.name}</option><option>orders-prod · RDS</option></select></label><label>Protocol<select><option>TCP</option><option>UDP</option></select></label><label>Destination port<input defaultValue="22" /></label></div><div className="aws-sim-editor-actions"><button className="primary" onClick={()=>{const result=evaluateAwsSshReachability(state);setAnalysis({ran:true,reachable:result.reachable,checks:result.checks.map(check=>({name:check.name,ok:check.result==="passed",detail:check.detail}))});}}>Analyze path</button></div></div>{analysis?.ran&&<div className={"aws-sim-analysis "+(analysis.reachable?"success":"blocked")}><div className="aws-sim-analysis-title"><span>{analysis.reachable?"✓":"!"}</span><div><h3>{analysis.reachable?"Path reachable in simulation":"Path not reachable"}</h3><p>Analysis result is based on the configuration shown in this training console.</p></div></div><div className="aws-sim-checks">{analysis.checks.map(check=><div key={check.name}><span className={"aws-sim-status "+(check.ok?"good":"bad")}>{check.ok?"Passed":"Blocked"}</span><b>{check.name}</b><p>{check.detail}</p></div>)}</div></div>}</>}
          {screen==="Load Balancers" && <div className="aws-sim-related"><b>Related resources</b><button onClick={()=>go("Target Groups")}>Target groups ↗</button><button onClick={()=>go("VPCs")}>VPC ↗</button><button onClick={()=>go("CloudWatch")}>CloudWatch metrics ↗</button></div>}
          {selectedResource && <div className="aws-sim-selected-resource"><b>{selectedResource}</b><span>Resource selected. Use the tabs and related links to inspect the simulated configuration.</span><button onClick={()=>setSelectedResource(null)}>Clear selection</button></div>}
        </div>}

        <footer className="aws-sim-footer"><span>Account</span><b>1234-5678-9012</b><span>Region: eu-west-1</span><span>All changes are local to this training simulation.</span></footer>
      </section>
    </div>
  </main>;
}
