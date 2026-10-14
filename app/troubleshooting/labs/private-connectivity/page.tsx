"use client";

import { useMemo, useState } from "react";
import "./lab.css";

type Provider = "AWS" | "Azure" | "Google Cloud";
type Row = Record<string, string>;
type Screen = {
  service: string;
  path: string;
  resource: string;
  kind: "details" | "rules" | "routes" | "test";
  columns?: string[];
  rows: Row[];
};
type Choice = { label: string; correct: boolean; feedback: string };
type Step = {
  title: string;
  objective: string;
  question: string;
  choices: Choice[];
  command: string;
  output: string;
};

const providers: Provider[] = ["AWS", "Azure", "Google Cloud"];

const steps: Record<Provider, Step[]> = {
  AWS: [
    { title: "Confirm the database endpoint", objective: "Check database state, endpoint, port, VPC, and attached security groups before changing network policy.", question: "What should you verify before troubleshooting the path?", choices: [
      { label: "Confirm the DB is available and record its private endpoint, port, VPC, and security groups", correct: true, feedback: "Correct. Confirm the exact endpoint and port first; a healthy database can still be unreachable from the application subnet." },
      { label: "Change the database to a public endpoint", correct: false, feedback: "That expands exposure and is not needed to diagnose private connectivity." },
      { label: "Restart the database immediately", correct: false, feedback: "The database is available in this scenario; a restart is unsupported by the evidence." }
    ], command: "aws rds describe-db-instances --db-instance-identifier checkout-db-prod", output: "DBInstanceStatus: available\nEndpoint: checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com\nPort: 5432\nPubliclyAccessible: false" },
    { title: "Inspect the database security group", objective: "Compare the configured inbound rules with the app security group and database listener port.", question: "Which finding explains the timeout at the database security-group boundary?", choices: [
      { label: "The DB security group has no inbound PostgreSQL 5432 rule from sg-app-prod", correct: true, feedback: "Correct. Security groups are stateful, but the database still needs an inbound allow from the intended app identity. Infer the gap from the listed rules; do not add a fake missing-rule row." },
      { label: "The monitoring security group can reach TCP/5432", correct: false, feedback: "That rule grants access to a different source identity and does not permit the application workload." },
      { label: "The database security group has an outbound rule", correct: false, feedback: "Outbound access does not create the missing inbound permission on the database security group." }
    ], command: "aws ec2 describe-security-groups --filters Name=group-name,Values=sg-db-prod", output: "Configured inbound rule: PostgreSQL TCP/5432 from sg-monitoring\nNo inbound rule from sg-app-prod is configured" },
    { title: "Validate route and name resolution", objective: "Rule out a wrong endpoint, DNS failure, or missing private route before editing the database security group.", question: "What does the path evidence support?", choices: [
      { label: "DNS resolves to the private DB address and the VPC route is active; keep routing unchanged", correct: true, feedback: "Correct. The private route and endpoint are consistent. The database security-group rule remains the supported cause." },
      { label: "Add a default route to the internet", correct: false, feedback: "The database uses a private endpoint; a broad internet route is not justified." },
      { label: "Move the database into a public subnet", correct: false, feedback: "This would increase exposure and does not address the missing security-group rule." }
    ], command: "getent hosts checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com; nc -vz checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com 5432", output: "DNS: 10.20.3.10\nTCP/5432: timeout from app subnet\nVPC local route: active" },
    { title: "Apply the narrow fix and verify", objective: "Add only the required database ingress rule from the application security group, then test the real app-to-database path.", question: "Which remediation follows least privilege and the evidence?", choices: [
      { label: "Add PostgreSQL TCP/5432 to sg-db-prod from sg-app-prod only, through change control", correct: true, feedback: "Correct. The source is the application security group, not the whole internet or an unnecessarily broad CIDR. Re-test from the application and inspect database/application logs." },
      { label: "Allow TCP/5432 from 0.0.0.0/0", correct: false, feedback: "This exposes the database port broadly and is not required." },
      { label: "Replace all DB security-group rules with unrestricted access", correct: false, feedback: "This destroys least-privilege boundaries and introduces unrelated risk." }
    ], command: "nc -vz checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com 5432 && pg_isready -h checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com -p 5432", output: "Expected simulated post-change result: TCP/5432 reachable; database readiness succeeds; application errors return to baseline." }
  ],
  Azure: [
    { title: "Confirm the private database endpoint", objective: "Verify the Azure Database for PostgreSQL server state, private FQDN, port, and virtual-network placement.", question: "Which baseline check is appropriate?", choices: [
      { label: "Confirm the server is Ready and record its private FQDN, port 5432, and VNet/subnet", correct: true, feedback: "Correct. Establish the endpoint and network placement before inspecting the path." },
      { label: "Enable public network access for all networks", correct: false, feedback: "That broadens exposure and is not a safe first diagnostic step." },
      { label: "Recreate the database server", correct: false, feedback: "The server is Ready; recreation is unsupported and high impact." }
    ], command: "az postgres flexible-server show --resource-group rg-prod-data --name checkout-db-prod", output: "State: Ready\nFQDN: checkout-db-prod.postgres.database.azure.com\nPort: 5432\nPrivate access: enabled" },
    { title: "Inspect the database subnet NSG", objective: "Read the configured rule priorities, source, destination, port, and action. Azure evaluates lower numeric priorities first.", question: "Which configured rule explains the failed app-to-database flow?", choices: [
      { label: "Deny-AppSubnet-DB-5432 at priority 200 matches the app subnet and database port", correct: true, feedback: "Correct. The explicit deny has a higher precedence than the default AllowVnetInBound rule at 65000. The fix must be a reviewed, narrower allow with a lower numeric priority." },
      { label: "AllowVnetInBound at priority 65000 permits all traffic before custom rules", correct: false, feedback: "Azure evaluates the lower numeric priority first; the custom deny at 200 takes precedence." },
      { label: "The NSG contains a default deny rule", correct: false, feedback: "The default deny is not the first matching rule here; the explicit priority-200 deny is the evidence." }
    ], command: "az network nic list-effective-nsg --resource-group rg-prod-data --name nic-db-prod", output: "200 Deny-AppSubnet-DB-5432  Source: 10.20.1.0/24  Destination: 10.20.3.10  TCP/5432  Deny\n65000 AllowVnetInBound  Allow\n65500 DenyAllInBound  Deny" },
    { title: "Confirm the path with Network Watcher", objective: "Correlate the NSG finding with the route and a specific source/destination/port test.", question: "What should the diagnostic result lead you to do?", choices: [
      { label: "Keep the healthy route and correct the matching NSG policy after review", correct: true, feedback: "Correct. Network Watcher identifies the explicit NSG deny. Confirm whether the intended design is an allow before that deny or a revised deny scope." },
      { label: "Add a 0.0.0.0/0 route to the database subnet", correct: false, feedback: "The failure is explained by an NSG rule, not a missing default route." },
      { label: "Disable every NSG attached to the VNet", correct: false, feedback: "This is an unsafe, broad change and removes unrelated controls." }
    ], command: "az network watcher test-connectivity --source-resource <app-vm-resource-id> --dest-address 10.20.3.10 --dest-port 5432", output: "Simulated result: Unreachable\nBlocking component: Deny-AppSubnet-DB-5432 (priority 200)" },
    { title: "Correct the NSG rule and verify", objective: "Use a reviewed allow for the required app subnet and database port, with priority that precedes the matching deny.", question: "Which remediation is correctly scoped and ordered?", choices: [
      { label: "Add Allow-App-PostgreSQL at priority 150 for TCP/5432 from 10.20.1.0/24 to 10.20.3.10", correct: true, feedback: "Correct. Priority 150 is evaluated before the matching deny at 200. Confirm the change owner, rule scope, and return path, then rerun Network Watcher and the application test." },
      { label: "Add an allow at priority 300", correct: false, feedback: "Priority 300 is evaluated after the matching deny at 200, so the deny would still win." },
      { label: "Allow database traffic from Any source", correct: false, feedback: "That is broader than the required application subnet." }
    ], command: "Test-NetConnection 10.20.3.10 -Port 5432", output: "Expected simulated post-change result: TCP test succeeds; application DB connection succeeds; database and app health remain normal." }
  ],
  "Google Cloud": [
    { title: "Confirm the database VM and private endpoint", objective: "Verify the database VM state, internal IP, zone, VPC, and network tag before checking firewall policy.", question: "What is the correct baseline conclusion?", choices: [
      { label: "The VM is RUNNING and has the expected internal IP and db-prod network tag", correct: true, feedback: "Correct. Record the database VM's internal IP and target tag, then inspect the VPC firewall rules that apply to the VM." },
      { label: "Enable a public IP and authorize all networks", correct: false, feedback: "That weakens the intended private architecture and is not required for diagnosis." },
      { label: "Delete and recreate the database VM", correct: false, feedback: "The instance is RUNNABLE; there is no evidence that recreation is necessary." }
    ], command: "gcloud compute instances describe db-prod --zone=europe-west1-b --format='yaml(status,networkInterfaces.networkIP,tags.items)'", output: "status: RUNNING\ninternal IP: 10.20.3.10\nnetwork tag: db-prod\nnetwork: vpc-prod" },
    { title: "Inspect configured VPC firewall rules", objective: "Check direction, priority, source ranges, target tags/service accounts, and TCP/5432.", question: "What explains the failed flow in the configured rule list?", choices: [
      { label: "No configured ingress allow matches the app subnet, db-prod target, and TCP/5432", correct: true, feedback: "Correct. Infer the missing allow from the actual list and the required flow. Google Cloud's implied ingress deny is behavior, not a listed firewall rule." },
      { label: "The existing HTTPS rule allows TCP/5432 automatically", correct: false, feedback: "A TCP/443 rule does not allow TCP/5432." },
      { label: "The VM's network tag is irrelevant to firewall targeting", correct: false, feedback: "Target tags or service accounts can determine which instances a VPC firewall rule applies to." }
    ], command: "gcloud compute firewall-rules list --filter='network:vpc-prod AND direction=INGRESS'", output: "Configured ingress rules: allow-app-https (tcp:443, target app-prod); allow-iap-admin (tcp:22, target admin)\nNo matching app-subnet → db-prod TCP/5432 allow is configured" },
    { title: "Run Connectivity Tests", objective: "Use the configured path trace to separate routing from firewall policy.", question: "What does a successful route stage and blocked firewall stage indicate?", choices: [
      { label: "The route exists; review VPC and hierarchical firewall policies for the missing allow", correct: true, feedback: "Correct. Connectivity Tests can trace the configured path and identify firewall behavior. It does not test the database authentication layer." },
      { label: "Replace the route table even though the route stage succeeds", correct: false, feedback: "Changing a working route is not supported by the trace." },
      { label: "Open TCP/5432 to all source ranges", correct: false, feedback: "The source should be restricted to the application subnet or approved workload identity." }
    ], command: "gcloud network-management connectivity-tests describe app-to-checkout-db --location=global", output: "Simulated trace: route resolved\nFirewall stage: blocked by implied ingress deny\nDestination: 10.20.3.10:5432" },
    { title: "Add a scoped ingress rule and verify", objective: "Create a narrowly scoped allow for the app subnet and database target, after reviewing hierarchical policies.", question: "Which correction follows least privilege?", choices: [
      { label: "Allow ingress TCP/5432 from 10.20.1.0/24 to the db-prod target only", correct: true, feedback: "Correct. Check organization/folder/network firewall policies and the target identity first. Then add only the required allow and rerun Connectivity Tests plus a real database connection." },
      { label: "Allow all protocols from 0.0.0.0/0 to every instance", correct: false, feedback: "This is dangerously broad and exposes unrelated workloads." },
      { label: "Change the DB machine type to increase capacity", correct: false, feedback: "The evidence points to network policy, not database capacity." }
    ], command: "nc -vz 10.20.3.10 5432 && pg_isready -h 10.20.3.10 -p 5432", output: "Expected simulated post-change result: Connectivity Tests shows the firewall stage allowed; TCP/5432 and database readiness succeed." }
  ]
};

function screenFor(provider: Provider, stage: number, fixed: boolean): Screen {
  if (provider === "AWS") {
    if (stage === 0) return { service: "Amazon RDS", path: "RDS › Databases › checkout-db-prod › Connectivity & security", resource: "checkout-db-prod", kind: "details", rows: [
      { Property: "DB instance status", Value: "Available" }, { Property: "Endpoint", Value: "checkout-db-prod.abc123.eu-west-1.rds.amazonaws.com" }, { Property: "Port", Value: "5432" }, { Property: "Publicly accessible", Value: "No" }, { Property: "VPC", Value: "vpc-prod" }, { Property: "VPC security groups", Value: "sg-db-prod" }
    ] };
    if (stage === 1) return { service: "EC2", path: "EC2 › Security Groups › sg-db-prod › Inbound rules", resource: "sg-db-prod · Inbound rules", kind: "rules", columns: ["Name", "Security group rule ID", "IP version", "Type", "Protocol", "Port range", "Source"], rows: [
      { Name: "—", "Security group rule ID": "sgr-0db123456789abcd1", "IP version": "IPv4", Type: "PostgreSQL", Protocol: "TCP", "Port range": "5432", Source: "sg-0c0ffee1234567890 (monitoring)" }
    ] };
    if (stage === 2) return { service: "Amazon VPC", path: "VPC › Route tables › rtb-0123abcd4567ef890 › Routes", resource: "rtb-0123abcd4567ef890 · Routes", kind: "routes", columns: ["Destination", "Target", "Status", "Propagated"], rows: [
      { Destination: "10.20.0.0/16", Target: "local", Status: "Active", Propagated: "No" }
    ] };
    return { service: "EC2", path: "EC2 › Security Groups › sg-db-prod › Inbound rules", resource: "sg-db-prod · Inbound rules" + (fixed ? " · simulated corrected state" : ""), kind: "rules", columns: ["Name", "Security group rule ID", "IP version", "Type", "Protocol", "Port range", "Source"], rows: [
      ...(fixed ? [{ Name: "—", "Security group rule ID": "sgr-0aa123456789abcd1", "IP version": "—", Type: "PostgreSQL", Protocol: "TCP", "Port range": "5432", Source: "sg-0a11ce55aa11ce55a (app-prod)" }] : []),
      { Name: "—", "Security group rule ID": "sgr-0db123456789abcd1", "IP version": "IPv4", Type: "PostgreSQL", Protocol: "TCP", "Port range": "5432", Source: "sg-0c0ffee1234567890 (monitoring)" }
    ] };
  }
  if (provider === "Azure") {
    if (stage === 0) return { service: "Azure Database for PostgreSQL", path: "Azure Database for PostgreSQL flexible servers › checkout-db-prod › Overview", resource: "checkout-db-prod · rg-prod-data", kind: "details", rows: [
      { Property: "Status", Value: "Ready" }, { Property: "Fully qualified domain name", Value: "checkout-db-prod.postgres.database.azure.com" }, { Property: "Port", Value: "5432" }, { Property: "Private access", Value: "Enabled" }, { Property: "Virtual network", Value: "vnet-prod" }, { Property: "Subnet", Value: "snet-db" }
    ] };
    if (stage === 1) return { service: "Network security groups", path: "Network security groups › nsg-db-subnet › Inbound security rules", resource: "nsg-db-subnet · Inbound security rules", kind: "rules", columns: ["Priority", "Name", "Port", "Protocol", "Source", "Destination", "Action"], rows: [
      { Priority: "200", Name: "Deny-AppSubnet-DB-5432", Port: "5432", Protocol: "TCP", Source: "10.20.1.0/24", Destination: "10.20.3.10", Action: "Deny" },
      { Priority: "65000", Name: "AllowVnetInBound", Port: "*", Protocol: "Any", Source: "VirtualNetwork", Destination: "VirtualNetwork", Action: "Allow" },
      { Priority: "65001", Name: "AllowAzureLoadBalancerInBound", Port: "*", Protocol: "Any", Source: "AzureLoadBalancer", Destination: "*", Action: "Allow" },
      { Priority: "65500", Name: "DenyAllInBound", Port: "*", Protocol: "Any", Source: "*", Destination: "*", Action: "Deny" }
    ] };
    if (stage === 2) return { service: "Network Watcher", path: "Network Watcher › Connection troubleshoot", resource: "app-vm-prod → 10.20.3.10:5432", kind: "test", columns: ["Check", "Result"], rows: [
      { Check: "Source", Result: "app-vm-prod · 10.20.1.12" }, { Check: "Destination", Result: "10.20.3.10 · TCP/5432" }, { Check: "Route", Result: "Available" }, { Check: "NSG evaluation", Result: "Denied by Deny-AppSubnet-DB-5432" }, { Check: "Connectivity", Result: "Unreachable" }
    ] };
    return { service: "Network security groups", path: "Network security groups › nsg-db-subnet › Inbound security rules", resource: "nsg-db-subnet · simulated corrected rules", kind: "rules", columns: ["Priority", "Name", "Port", "Protocol", "Source", "Destination", "Action"], rows: [
      ...(fixed ? [{ Priority: "150", Name: "Allow-App-PostgreSQL", Port: "5432", Protocol: "TCP", Source: "10.20.1.0/24", Destination: "10.20.3.10", Action: "Allow" }] : []),
      { Priority: "200", Name: "Deny-AppSubnet-DB-5432", Port: "5432", Protocol: "TCP", Source: "10.20.1.0/24", Destination: "10.20.3.10", Action: "Deny" },
      { Priority: "65000", Name: "AllowVnetInBound", Port: "*", Protocol: "Any", Source: "VirtualNetwork", Destination: "VirtualNetwork", Action: "Allow" },
      { Priority: "65001", Name: "AllowAzureLoadBalancerInBound", Port: "*", Protocol: "Any", Source: "AzureLoadBalancer", Destination: "*", Action: "Allow" },
      { Priority: "65500", Name: "DenyAllInBound", Port: "*", Protocol: "Any", Source: "*", Destination: "*", Action: "Deny" }
    ] };
  }
  if (stage === 0) return { service: "Compute Engine", path: "Compute Engine › VM instances › db-prod › Details", resource: "db-prod · prod-app", kind: "details", rows: [
    { Field: "Status", Value: "RUNNING" }, { Field: "Internal IP", Value: "10.20.3.10" }, { Field: "Zone", Value: "europe-west1-b" }, { Field: "Network", Value: "vpc-prod" }, { Field: "Network tags", Value: "db-prod" }, { Field: "Machine type", Value: "e2-standard-2" }
  ] };
  if (stage === 1) return { service: "VPC network", path: "VPC network › Firewall", resource: "vpc-prod · configured firewall rules", kind: "rules", columns: ["Name", "Network", "Direction", "Priority", "Action", "Targets", "Filters", "Protocols / ports"], rows: [
    { Name: "allow-app-https", Network: "vpc-prod", Direction: "INGRESS", Priority: "1000", Action: "ALLOW", Targets: "app-prod", "Filters": "Source IPv4 ranges: 10.20.1.0/24", "Protocols / ports": "tcp:443" },
    { Name: "allow-iap-admin", Network: "vpc-prod", Direction: "INGRESS", Priority: "1000", Action: "ALLOW", Targets: "admin", "Filters": "Source IPv4 ranges: 35.235.240.0/20", "Protocols / ports": "tcp:22" }
  ] };
  if (stage === 2) return { service: "Network Intelligence Center", path: "Network Intelligence Center › Connectivity Tests", resource: "app-to-checkout-db · test results", kind: "test", columns: ["Check", "Result"], rows: [
    { Check: "Source endpoint", Result: "10.20.1.12" }, { Check: "Destination endpoint", Result: "10.20.3.10:5432" }, { Check: "Route", Result: "Resolved" }, { Check: "Firewall stage", Result: "Blocked · implied ingress deny" }, { Check: "Trace result", Result: "Unreachable" }
  ] };
  return { service: "VPC network", path: "VPC network › Firewall", resource: "vpc-prod · configured firewall rules" + (fixed ? " · simulated corrected state" : ""), kind: "rules", columns: ["Name", "Network", "Direction", "Priority", "Action", "Targets", "Filters", "Protocols / ports"], rows: [
    ...(fixed ? [{ Name: "allow-app-to-db", Network: "vpc-prod", Direction: "INGRESS", Priority: "900", Action: "ALLOW", Targets: "db-prod", "Filters": "Source IPv4 ranges: 10.20.1.0/24", "Protocols / ports": "tcp:5432" }] : []),
    { Name: "allow-app-https", Network: "vpc-prod", Direction: "INGRESS", Priority: "1000", Action: "ALLOW", Targets: "app-prod", "Filters": "Source IPv4 ranges: 10.20.1.0/24", "Protocols / ports": "tcp:443" },
    { Name: "allow-iap-admin", Network: "vpc-prod", Direction: "INGRESS", Priority: "1000", Action: "ALLOW", Targets: "admin", "Filters": "Source IPv4 ranges: 35.235.240.0/20", "Protocols / ports": "tcp:22" }
  ] };
}

export default function PrivateConnectivityLab() {
  const [provider, setProvider] = useState<Provider>("AWS");
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showCommand, setShowCommand] = useState(false);
  const answerKey = provider + ":" + stage;
  const selected = answers[answerKey];
  const current = steps[provider][stage];
  const passed = selected !== undefined && current.choices[selected]?.correct === true;
  const fixed = stage === 3 && passed;
  const screen = useMemo(() => screenFor(provider, stage, fixed), [provider, stage, fixed]);
  const progress = Math.round((Object.keys(answers).filter(key => key.startsWith(provider + ":") && steps[provider][Number(key.split(":")[1])]?.choices[answers[key]]?.correct).length / 4) * 100);
  const reset = () => { setStage(0); setAnswers({}); setShowCommand(false); };

  return <main className="private-lab-shell">
    <header className="private-lab-top"><a href="/troubleshooting">← Troubleshooting library</a><span>SIMULATED LAB · NO LIVE ACCOUNT</span></header>
    <section className="private-lab-hero"><div><p className="private-lab-kicker">NETWORK TROUBLESHOOTING · LAB 02</p><h1>Private app cannot reach its database</h1><p>Follow the app-to-database path through provider-specific console screens. Identify the blocking rule, apply a narrow simulated fix, and verify the final state.</p></div><div className="private-lab-score"><span>INVESTIGATION</span><strong>{progress}%</strong><div><i style={{ width: progress + "%" }} /></div><small>{Object.keys(answers).filter(key => key.startsWith(provider + ":") && steps[provider][Number(key.split(":")[1])]?.choices[answers[key]]?.correct).length} of 4 checks verified</small></div></section>
    
    <section className="private-lab-path-overview" aria-label="Troubleshooting path overview">
      <div className="private-lab-path-title"><div><span>START HERE · CONNECTION SCOPE</span><h2>What exactly are we troubleshooting?</h2></div><p>Use these endpoints as the investigation boundary. Confirm DNS, routing, policy, and return traffic before changing access.</p></div>
      <div className="private-lab-path-grid">
        <div><span>01 · SOURCE</span><strong>Application workload · app-prod</strong><small>{provider==="AWS"?"Security identity: sg-app-prod":provider==="Azure"?"Source: approved application subnet / NSG":"Source: approved application subnet or network tag"}</small></div>
        <div className="path-arrow" aria-hidden="true">→</div>
        <div><span>02 · DESTINATION</span><strong>Private database · checkout-db-prod</strong><small>{provider==="AWS"?"RDS private endpoint in the app VPC":provider==="Azure"?"Azure Database for PostgreSQL private endpoint":"Cloud SQL private IP / private service path"}</small></div>
        <div className="path-arrow" aria-hidden="true">→</div>
        <div><span>03 · TRANSPORT</span><strong>TCP / 5432 (PostgreSQL)</strong><small>DNS → route → network policy → listener → database readiness</small></div>
      </div>
      <div className="private-lab-path-foot"><span><b>Failure symptom</b> Application-to-database connection timeout; app targets remain healthy</span><span><b>Expected result</b> TCP/5432 reachable only from the approved application source; database stays private</span></div>
    </section>
    <section className="private-lab-provider"><span>CHOOSE CLOUD</span><div>{providers.map(p => <button key={p} className={provider === p ? "active " + p.toLowerCase().replace(" ", "-") : ""} onClick={() => { setProvider(p); setStage(0); setAnswers({}); setShowCommand(false); }}><b>{p === "AWS" ? "aws" : p === "Azure" ? "Az" : "G"}</b><strong>{p}</strong><small>{p === "AWS" ? "Amazon RDS + VPC" : p === "Azure" ? "PostgreSQL + Network Watcher" : "Compute Engine + VPC"}</small></button>)}</div></section>
    <section className="private-lab-layout"><aside className="private-lab-steps"><span>DIAGNOSTIC PATH</span>{steps[provider].map((item, index) => <button key={item.title} className={stage === index ? "active" : index < stage ? "done" : ""} onClick={() => { if (index <= stage || steps[provider].slice(0,index).every((_, i) => answers[provider + ":" + i] !== undefined && steps[provider][i].choices[answers[provider + ":" + i]]?.correct)) { setStage(index); setShowCommand(false); } }}><b>{index < stage ? "✓" : String(index + 1).padStart(2,"0")}</b><span>{item.title}</span></button>)}</aside>
      <div className="private-lab-main"><div className="private-lab-objective"><span>STEP {stage + 1} OF 4</span><h2>{current.title}</h2><p>{current.objective}</p></div>
        <div className={"private-lab-console " + provider.toLowerCase().replace(" ","-")}><div className={"private-lab-console-global "+provider.toLowerCase().replace(" ","-")}><strong>{provider==="AWS"?"aws":provider==="Azure"?"Microsoft Azure":"Google Cloud"}</strong><span>{provider==="AWS"?"Search AWS services and features":provider==="Azure"?"Search resources, services, and docs":"Search (/) for resources, docs, products, and more"}</span><small>{provider==="AWS"?"123456789012 ▾":provider==="Azure"?"Directory ▾":"prod-app ▾"}</small></div><div className="private-lab-console-bar"><div className={"private-lab-mark " + provider.toLowerCase().replace(" ","-")}>{provider === "AWS" ? "aws" : provider === "Azure" ? "Az" : "G"}</div><div><strong>{screen.service}</strong><small>{screen.path}</small></div></div><div className="private-lab-console-tabs">{steps[provider].map((tab,i)=><button type="button" key={tab.title} className={stage===i?"active":""} onClick={()=>{setStage(i);setShowCommand(false);}}>{tab.title}</button>)}</div><div className="private-lab-console-workspace"><nav className="private-lab-console-nav">{(provider==="AWS"?["RDS","Databases","Security groups","Route tables"]:provider==="Azure"?["Azure Database for PostgreSQL","Networking","Private endpoints","Network Watcher"]:["Cloud SQL","Connections","VPC networks","Firewall"]).map((navItem,navIndex)=><button type="button" key={navItem} className={navIndex===stage?"selected":""} onClick={()=>{setStage(navIndex);setShowCommand(false);}}>{navItem}</button>)}</nav><div className="private-lab-console-resource"><h3>{screen.resource}</h3>{screen.kind === "rules" || screen.kind === "routes" || screen.kind === "test" ? <div className="private-lab-table-wrap"><table><thead><tr>{(screen.columns || ["Property","Value"]).map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{screen.rows.map((row,index) => <tr key={index}>{(screen.columns || Object.keys(row)).map(column => <td key={column}>{row[column] || "—"}</td>)}</tr>)}</tbody></table></div> : <div className="private-lab-detail-list">{screen.rows.map((row,index) => <div key={index}><span>{row.Property || row.Field}</span><strong>{row.Value}</strong></div>)}</div>}</div></div></div>
        {stage === 3 && fixed && <div className="private-lab-success"><strong>✓ Simulated fix visible in the console above</strong><p>The corrected allow rule is now listed with the narrow source and destination scope. The following is the expected verification result, not a live probe.</p><div><span>Route</span><b>Available</b><span>Firewall / NSG</span><b>Allowed</b><span>TCP/5432</span><b>Connected</b><span>Database readiness</span><b>Healthy</b></div></div>}
        <div className="private-lab-question"><span>VERIFY BEFORE CONTINUING</span><h3>{current.question}</h3><div>{current.choices.map((choice,index) => <button key={choice.label} className={selected === index ? choice.correct ? "correct" : "incorrect" : ""} onClick={() => setAnswers(prev => ({ ...prev, [answerKey]: index }))}><b>{String.fromCharCode(65 + index)}</b><span>{choice.label}</span><i>{selected === index ? choice.correct ? "✓" : "↻" : "→"}</i></button>)}</div>{selected !== undefined && <p className={"private-lab-feedback " + (current.choices[selected].correct ? "correct" : "incorrect")}>{current.choices[selected].feedback}</p>}</div>
        <div className="private-lab-actions"><button className="private-lab-command" onClick={() => setShowCommand(value => !value)}>{showCommand ? "Hide diagnostic command" : "Show diagnostic command"} <span>{showCommand ? "−" : "+"}</span></button>{showCommand && <div className="private-lab-terminal"><span>{provider} · EXAMPLE OUTPUT</span><pre>{current.command + "\n\n" + current.output}</pre><small>Illustrative commands and outputs. Check actual resource IDs, permissions, configuration, and change approval before using commands in a real environment.</small></div>}<button className="private-lab-next" disabled={!passed} onClick={() => { setShowCommand(false); if (stage < 3) setStage(stage + 1); }}>{stage === 3 ? "Investigation complete" : "Verify and continue"} <span>→</span></button></div>
        {stage === 3 && fixed && <div className="private-lab-resolution"><span>FINAL RESOLUTION</span><h3>Before → after → proof</h3><div><section><b>Before</b><p>{provider === "AWS" ? "No DB security-group ingress from sg-app-prod" : provider === "Azure" ? "Priority-200 NSG deny blocks the app subnet" : "No matching VPC ingress allow for TCP/5432"}</p></section><section><b>After · simulated</b><p>{provider === "AWS" ? "Allow PostgreSQL 5432 from sg-app-prod to sg-db-prod" : provider === "Azure" ? "Allow TCP/5432 from 10.20.1.0/24 at priority 150, before the deny at 200" : "Allow TCP/5432 from 10.20.1.0/24 to db-prod only"}</p></section></div><p>Validate with a real application connection, database readiness, application logs, and a negative test confirming unrelated sources remain blocked. No live cloud resources were changed.</p><button onClick={reset}>Restart lab</button></div>}
      </div></section>
  </main>;
}
