"use client";

import { useMemo, useState } from "react";
import "./lab.css";

type Provider = "AWS" | "Azure" | "Google Cloud";
type Choice = { label: string; correct: boolean; feedback: string };
type LabStep = {
  title: string;
  objective: string;
  consolePath: string;
  resource: string;
  rows: { label: string; value: string; status: "good" | "bad" | "neutral" }[];
  clue: string;
  question: string;
  choices: Choice[];
  command: string;
  commandOutput: string;
};

const providerNames: Record<Provider, { short: string; product: string; accent: string }> = {
  AWS: { short: "AWS", product: "Amazon EC2", accent: "#ffb84d" },
  Azure: { short: "Azure", product: "Azure Virtual Machines", accent: "#54b9ff" },
  "Google Cloud": { short: "Google Cloud", product: "Compute Engine", accent: "#6ee7b7" },
};

const labSteps: Record<Provider, LabStep[]> = {
  AWS: [
    {
      title: "Confirm instance health", objective: "Rule out a stopped VM or failed platform check before investigating the network.",
      consolePath: "EC2 › Instances › i-0a12b345c678d9012 › Status checks",
      resource: "i-0a12b345c678d9012 · api-prod-01",
      rows: [{label:"Instance state",value:"Running",status:"good"},{label:"System status check",value:"Passed",status:"good"},{label:"Instance status check",value:"Passed",status:"good"},{label:"Availability Zone",value:"eu-west-1a",status:"neutral"}],
      clue: "Both status checks pass and the instance is running. This points away from a platform failure; continue to the access path.",
      question: "What should you conclude from these checks?",
      choices: [
        {label:"The instance is healthy enough to continue network diagnosis",correct:true,feedback:"Correct. Running plus both passed checks rules out the common EC2 platform/instance-health causes, but does not prove SSH is reachable."},
        {label:"Reboot the instance immediately",correct:false,feedback:"A reboot is not justified by healthy status checks and could disrupt service. Gather network evidence first."},
        {label:"Increase the instance size",correct:false,feedback:"Instance sizing does not explain a TCP/22 reachability failure by itself."},
      ],
      command:"aws ec2 describe-instance-status --instance-ids i-0a12b345c678d9012",
      commandOutput:"InstanceState: running\nSystemStatus: ok\nInstanceStatus: ok",
    },
    {
      title: "Inspect the security group", objective: "Check the effective ingress policy for TCP/22 and the expected administrator source.",
      consolePath: "EC2 › Security Groups › sg-0ab12cd34ef56ab78 › Inbound rules",
      resource: "sg-api-prod · attached to api-prod-01",
      rows: [{label:"TCP / 22",value:"No matching allow rule",status:"bad"},{label:"HTTPS / 443",value:"10.40.0.0/16 allowed",status:"good"},{label:"Expected admin source",value:"198.51.100.24/32",status:"neutral"},{label:"Network ACL",value:"No deny observed in sample",status:"good"}],
      clue: "The instance is healthy, but this security group has no inbound allow for SSH from the approved admin IP. Do not open port 22 to 0.0.0.0/0.",
      question: "Which finding best explains why the SSH connection is blocked at this layer?",
      choices: [
        {label:"No inbound TCP/22 allow rule for 198.51.100.24/32",correct:true,feedback:"Correct. The required source-to-port rule is missing. Verify the intended admin source with the owner before proposing a narrow rule."},
        {label:"HTTPS / 443 is allowed from the application CIDR",correct:false,feedback:"That rule applies to a different port and source range; it does not grant SSH access."},
        {label:"The instance is in eu-west-1a",correct:false,feedback:"An Availability Zone is not itself evidence of an SSH policy denial."},
      ],
      command:"aws ec2 describe-security-groups --group-ids sg-0ab12cd34ef56ab78",
      commandOutput:"Inbound permissions: TCP/443 from 10.40.0.0/16\nNo TCP/22 rule matches 198.51.100.24/32",
    },
    {
      title: "Validate the route and network path", objective: "Check that the subnet has a viable return path and no earlier network boundary explains the timeout.",
      consolePath: "VPC › Route tables › rtb-0123abcd4567ef890 › Routes",
      resource: "subnet-0123abcd4567ef890 · private-admin-subnet",
      rows: [{label:"Destination",value:"10.40.0.0/16",status:"good"},{label:"Target",value:"local",status:"good"},{label:"Admin path",value:"Via approved VPN / bastion",status:"good"},{label:"Network ACL",value:"Ephemeral return traffic allowed",status:"good"}],
      clue: "The route and return path are present in this simulation. The missing security-group ingress rule remains the strongest supported cause.",
      question: "Given the route evidence, what is the best next move?",
      choices: [
        {label:"Keep the route unchanged and verify the guest SSH service next",correct:true,feedback:"Correct. Do not modify a healthy route table without evidence. Check the guest service to rule out a second issue."},
        {label:"Add 0.0.0.0/0 to the route table",correct:false,feedback:"This is a broad, unjustified network change and does not fix a missing security-group ingress rule."},
        {label:"Replace the subnet",correct:false,feedback:"The observed route evidence does not justify replacing the subnet."},
      ],
      command:"aws ec2 describe-route-tables --route-table-ids rtb-0123abcd4567ef890",
      commandOutput:"10.40.0.0/16 → local\nApproved admin VPN route present\nNo route blackhole detected",
    },
    {
      title: "Check the guest SSH service", objective: "Confirm sshd is listening and the host firewall is not an additional blocker.",
      consolePath: "EC2 › Connect › Session Manager / Serial Console (authorized access)",
      resource: "api-prod-01 · guest OS diagnostics",
      rows: [{label:"sshd service",value:"active (running)",status:"good"},{label:"Listener",value:"0.0.0.0:22",status:"good"},{label:"Guest firewall",value:"TCP/22 allowed for admin interface",status:"good"},{label:"Authentication logs",value:"No matching attempt reached host",status:"neutral"}],
      clue: "The guest service is healthy and no matching SSH attempt reached the host. That is consistent with a network policy block before the packet reaches the VM.",
      question: "What does the missing host-side connection attempt suggest?",
      choices: [
        {label:"Investigate the network policy before changing sshd",correct:true,feedback:"Correct. A healthy listener plus no matching host log supports an upstream network block."},
        {label:"Disable the host firewall and SSH authentication",correct:false,feedback:"That would weaken security without evidence and does not address the missing ingress rule."},
        {label:"Rotate all user passwords immediately",correct:false,feedback:"There is no evidence of an authentication failure; the connection is not reaching the guest."},
      ],
      command:"systemctl is-active sshd && ss -lntp | grep ':22'",
      commandOutput:"active\nLISTEN 0 128 0.0.0.0:22",
    },
    {
      title: "Apply a narrow fix and prove recovery", objective: "Propose the smallest approved change, then test connectivity and verify the outcome.",
      consolePath: "EC2 › Security Groups › Inbound rules › Edit inbound rules",
      resource: "Change proposal · not applied to any real account",
      rows: [{label:"Protocol / port",value:"TCP / 22",status:"neutral"},{label:"Source",value:"198.51.100.24/32 (approved admin IP)",status:"good"},{label:"Public SSH exposure",value:"None proposed",status:"good"},{label:"Verification",value:"TCP connect + SSH auth log",status:"neutral"}],
      clue: "Keep the source scoped to the approved administrator IP or approved bastion security group. This is a proposed change only.",
      question: "Which remediation is safest and directly supported by the evidence?",
      choices: [
        {label:"Add TCP/22 only from the approved admin source, through change control",correct:true,feedback:"Correct. This addresses the proven gap with least privilege. After approval, test TCP/22 and a real SSH login, then check host logs and monitoring."},
        {label:"Allow TCP/22 from 0.0.0.0/0",correct:false,feedback:"This exposes SSH to the internet and is broader than the evidence requires."},
        {label:"Replace the entire security group with unrestricted access",correct:false,feedback:"This introduces unrelated exposure and makes the change hard to audit."},
      ],
      command:"nc -vz 203.0.113.42 22  # run only after approved change",
      commandOutput:"Expected post-change result: TCP connection succeeds; SSH authentication succeeds; host logs show the expected administrator.",
    },
  ],
  Azure: [
    {
      title:"Confirm VM health",objective:"Separate VM/platform health from a connectivity policy failure.",
      consolePath:"Virtual machines › api-prod-01 › Overview / Boot diagnostics",
      resource:"api-prod-01 · resource group rg-prod-app",
      rows:[{label:"Power state",value:"Running",status:"good"},{label:"VM agent",value:"Ready",status:"good"},{label:"Boot diagnostics",value:"No current boot failure",status:"good"},{label:"Region",value:"West Europe",status:"neutral"}],
      clue:"The VM is running and the agent is ready. Continue to effective network rules rather than restarting it.",
      question:"What is the supported conclusion?",
      choices:[{label:"VM health is not the current leading suspect",correct:true,feedback:"Correct. The health evidence supports checking the path and effective NSG rules next."},{label:"Resize the VM now",correct:false,feedback:"No CPU, memory, or capacity evidence supports resizing."},{label:"Recreate the VM",correct:false,feedback:"Recreation is high impact and unsupported by the evidence."}],
      command:"az vm get-instance-view --resource-group rg-prod-app --name api-prod-01",
      commandOutput:"PowerState/running · VM agent Ready · no boot diagnostic failure",
    },
    {
      title:"Inspect effective NSG rules",objective:"Read the effective rule order for inbound TCP/22 from the approved admin address.",
      consolePath:"Network interface › Effective security rules",
      resource:"nic-api-prod-01 · NSG nsg-prod-app",
      rows:[{label:"Rule priority 200",value:"Deny-SSH-External · TCP/22",status:"bad"},{label:"Approved admin source",value:"198.51.100.24/32",status:"neutral"},{label:"Rule evaluation",value:"Deny wins before later allow",status:"bad"},{label:"HTTPS / 443",value:"Allowed from app gateway",status:"good"}],
      clue:"The effective rule at priority 200 denies SSH from the administrator source before a later allow can match. NSG priority matters.",
      question:"Which setting is the blocking evidence?",
      choices:[{label:"Deny-SSH-External at priority 200 matches TCP/22",correct:true,feedback:"Correct. Confirm the intended access path and rule owner before proposing a narrowly scoped exception or approved bastion path."},{label:"HTTPS is allowed from the application gateway",correct:false,feedback:"That rule concerns HTTPS, not SSH."},{label:"The VM is in West Europe",correct:false,feedback:"Region does not explain this explicit rule match."}],
      command:"az network nic list-effective-nsg --resource-group rg-prod-app --name nic-api-prod-01",
      commandOutput:"Priority 200 Deny-SSH-External · Inbound TCP/22 · source 0.0.0.0/0",
    },
    {
      title:"Check Network Watcher path analysis",objective:"Correlate the policy finding with the network path before proposing a change.",
      consolePath:"Network Watcher › Connection troubleshoot",
      resource:"Source: approved admin path · Destination: api-prod-01:22",
      rows:[{label:"Destination",value:"VM private IP",status:"good"},{label:"Next hop",value:"Expected VPN / bastion route",status:"good"},{label:"NSG evaluation",value:"Blocked by Deny-SSH-External",status:"bad"},{label:"Route status",value:"Reachable",status:"good"}],
      clue:"Network Watcher confirms the route is viable but reports the NSG denial. The evidence converges on the same boundary.",
      question:"What does the combined evidence support?",
      choices:[{label:"Correct the narrow NSG rule or use the approved bastion path",correct:true,feedback:"Correct. The route is healthy; address the exact deny rule under change control."},{label:"Add a new default route to the internet",correct:false,feedback:"A route change is not supported and may increase exposure."},{label:"Disable all NSGs",correct:false,feedback:"Disabling network controls is unsafe and unnecessary."}],
      command:"az network watcher test-connectivity --source-resource <source-resource-id> --dest-address <vm-private-ip> --dest-port 22",
      commandOutput:"Connectivity check: failed · NSG rule Deny-SSH-External",
    },
    {
      title:"Verify guest SSH",objective:"Use authorized Run Command or Serial Console to check the guest listener without opening an unrelated access path.",
      consolePath:"Virtual machines › Run command / Serial Console",
      resource:"api-prod-01 · guest OS diagnostics",
      rows:[{label:"sshd",value:"active (running)",status:"good"},{label:"Port 22",value:"Listening",status:"good"},{label:"Host firewall",value:"Admin interface allowed",status:"good"},{label:"SSH attempt",value:"No matching host event",status:"neutral"}],
      clue:"The guest is listening and has no matching attempt. This supports the upstream NSG finding.",
      question:"What is the next logical step?",
      choices:[{label:"Keep guest settings unchanged and prepare the scoped NSG fix",correct:true,feedback:"Correct. Do not change a healthy guest service when the network rule already explains the failure."},{label:"Disable SSH authentication",correct:false,feedback:"That would weaken security and does not fix reachability."},{label:"Restart the VM repeatedly",correct:false,feedback:"Restarting does not resolve a matching NSG deny rule."}],
      command:"sudo systemctl is-active sshd; sudo ss -lntp | grep ':22'",
      commandOutput:"active · LISTEN 0 128 0.0.0.0:22",
    },
    {
      title:"Propose the safe fix and verify",objective:"Use a reviewed, source-scoped rule and confirm both network and SSH success.",
      consolePath:"Network security group › Inbound security rules",
      resource:"Change proposal · simulation only",
      rows:[{label:"Port",value:"TCP/22",status:"neutral"},{label:"Source",value:"Approved admin IP / bastion only",status:"good"},{label:"Rule scope",value:"Smallest required subnet/interface",status:"good"},{label:"Validation",value:"Connection troubleshoot + SSH logs",status:"neutral"}],
      clue:"Do not simply add an allow rule below a higher-priority deny. Adjust the conflicting rule safely or use the approved bastion design.",
      question:"Which action correctly addresses rule precedence and minimizes exposure?",
      choices:[{label:"Review the deny rule and add/adjust a scoped approved path with a valid priority",correct:true,feedback:"Correct. Verify priority order, run Connection troubleshoot, test an SSH session, and confirm monitoring remains healthy."},{label:"Add an allow rule at priority 500 below the deny",correct:false,feedback:"The deny at priority 200 would still win."},{label:"Allow SSH from Any source",correct:false,feedback:"This creates unnecessary exposure."}],
      command:"Test-NetConnection <vm-private-ip> -Port 22",
      commandOutput:"Expected after approved change: TcpTestSucceeded=True; SSH session and guest logs confirm recovery.",
    },
  ],
  "Google Cloud":[
    {
      title:"Confirm VM health",objective:"Rule out stopped instances and platform/guest health signals before changing networking.",
      consolePath:"Compute Engine › VM instances › api-prod-01 › Observability",
      resource:"api-prod-01 · project prod-app",
      rows:[{label:"VM status",value:"Running",status:"good"},{label:"Guest agent",value:"Responding",status:"good"},{label:"Boot / serial output",value:"No current boot error",status:"good"},{label:"Zone",value:"europe-west1-b",status:"neutral"}],
      clue:"The VM is running and guest signals are available. Continue to VPC firewall evaluation.",
      question:"What does this evidence tell you?",
      choices:[{label:"Continue with network policy checks; VM health is not the leading cause",correct:true,feedback:"Correct. The available health signals are normal; now inspect the matching firewall rule."},{label:"Delete and recreate the VM",correct:false,feedback:"This is high impact and unsupported by the health evidence."},{label:"Increase machine type immediately",correct:false,feedback:"There is no capacity evidence for a resize."}],
      command:"gcloud compute instances describe api-prod-01 --zone=europe-west1-b --format='get(status)'",
      commandOutput:"RUNNING · guest diagnostics show no boot error",
    },
    {
      title:"Inspect VPC firewall rules",objective:"Check ingress firewall priority, target, source range, and TCP/22.",
      consolePath:"VPC network › Firewall policies / Firewall rules",
      resource:"vpc-prod · target tag api-prod",
      rows:[{label:"Priority 900",value:"deny-ssh-external · ingress TCP/22",status:"bad"},{label:"Source range",value:"0.0.0.0/0",status:"bad"},{label:"Target",value:"api-prod instances",status:"neutral"},{label:"Rule outcome",value:"Deny applies before intended access",status:"bad"}],
      clue:"A deny rule targets this VM and matches SSH. Verify hierarchical firewall policies as well as VPC rules in a real environment.",
      question:"Which evidence identifies the network block?",
      choices:[{label:"The matching ingress deny rule for TCP/22 targets this VM",correct:true,feedback:"Correct. Confirm the hierarchy, target tags/service account, source, and approved access path before proposing a change."},{label:"The VM is in europe-west1-b",correct:false,feedback:"Zone is not evidence of an SSH deny."},{label:"The guest agent responds",correct:false,feedback:"That is positive health evidence, not the cause of the blocked connection."}],
      command:"gcloud compute firewall-rules list --filter='network:vpc-prod AND direction=INGRESS'",
      commandOutput:"deny-ssh-external · DENY tcp:22 · priority 900 · target tag api-prod",
    },
    {
      title:"Validate connectivity path",objective:"Check routes and Connectivity Tests to confirm the firewall rule is the blocking component.",
      consolePath:"Network Intelligence Center › Connectivity Tests",
      resource:"Source: approved admin path · Destination: VM TCP/22",
      rows:[{label:"Route",value:"Expected path found",status:"good"},{label:"Next hop",value:"Approved VPN / bastion",status:"good"},{label:"Firewall evaluation",value:"Blocked by deny-ssh-external",status:"bad"},{label:"Return path",value:"No route failure observed",status:"good"}],
      clue:"Connectivity Tests shows the route is viable and the firewall rule blocks the flow.",
      question:"What is the best next action?",
      choices:[{label:"Keep routes unchanged and review the specific firewall policy",correct:true,feedback:"Correct. The evidence identifies a firewall boundary, not a route issue."},{label:"Add a broad default route",correct:false,feedback:"This would be an unjustified and potentially unsafe change."},{label:"Delete all firewall rules",correct:false,feedback:"That removes essential security boundaries."}],
      command:"gcloud network-management connectivity-tests describe ssh-to-api-prod --location=global",
      commandOutput:"Trace: route resolved · firewall evaluation: DENY · TCP/22",
    },
    {
      title:"Check the guest SSH daemon",objective:"Confirm the guest service and host firewall are healthy through authorized serial or OS access.",
      consolePath:"Compute Engine › VM instances › Serial port / OS Login diagnostics",
      resource:"api-prod-01 · guest OS diagnostics",
      rows:[{label:"sshd",value:"active (running)",status:"good"},{label:"Listener",value:"0.0.0.0:22",status:"good"},{label:"Host firewall",value:"Approved interface allowed",status:"good"},{label:"Host logs",value:"No matching attempt reached VM",status:"neutral"}],
      clue:"The guest listener is healthy and no matching attempt reached the host. The upstream firewall deny remains the supported cause.",
      question:"Which conclusion follows?",
      choices:[{label:"Do not alter the guest; fix the proven network policy through review",correct:true,feedback:"Correct. Avoid changing sshd or authentication when evidence points to a VPC firewall deny."},{label:"Disable host firewall and authentication",correct:false,feedback:"This is unsafe and unrelated to the proven block."},{label:"Recreate the guest OS",correct:false,feedback:"No guest OS failure is shown."}],
      command:"sudo systemctl is-active sshd && sudo ss -lntp | grep ':22'",
      commandOutput:"active · LISTEN 0 128 0.0.0.0:22",
    },
    {
      title:"Propose a scoped firewall correction and verify",objective:"Review the deny rule and create a narrowly scoped approved path; verify with Connectivity Tests.",
      consolePath:"VPC network › Firewall rules › Review deny-ssh-external",
      resource:"Change proposal · simulation only",
      rows:[{label:"Protocol",value:"TCP/22",status:"neutral"},{label:"Source",value:"Approved admin IP / bastion only",status:"good"},{label:"Target",value:"Only required VM tag/service account",status:"good"},{label:"Validation",value:"Connectivity Tests + SSH logs",status:"neutral"}],
      clue:"The correct change depends on the intended policy. Modify the specific conflicting deny or approved access path; do not create unrestricted SSH access.",
      question:"Which fix is safe and consistent with the evidence?",
      choices:[{label:"Review the matching deny and allow only the approved source/target path",correct:true,feedback:"Correct. Re-run Connectivity Tests, connect through the approved path, confirm guest logs, and monitor for recurrence."},{label:"Add an allow rule for all sources and targets",correct:false,feedback:"This broadens access far beyond the requirement."},{label:"Change the route table despite the successful route trace",correct:false,feedback:"The route is healthy; changing it is unsupported."}],
      command:"gcloud network-management connectivity-tests describe ssh-to-api-prod --location=global",
      commandOutput:"Expected after approved change: trace shows firewall ALLOW; SSH test succeeds from approved source.",
    },
  ],
};

export default function VmUnreachableLab() {
  const [provider, setProvider] = useState<Provider>("AWS");
  const [protocol, setProtocol] = useState<"SSH" | "RDP">("SSH");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showCommand, setShowCommand] = useState(false);
  const steps = labSteps[provider];
  const baseStep = steps[step];
  const current = useMemo<LabStep>(() => {
    if (protocol === "SSH") return baseStep;
    const adapt = (value: string) => value
      .replaceAll("SSH", "RDP").replaceAll("ssh", "RDP")
      .replaceAll("TCP/22", "TCP/3389").replaceAll("TCP / 22", "TCP / 3389")
      .replaceAll("tcp:22", "tcp:3389").replaceAll(":22", ":3389")
      .replaceAll("port 22", "port 3389").replaceAll("sshd", "Remote Desktop Services (TermService)")
      .replaceAll("SSH authentication", "RDP session authentication").replaceAll("SSH session", "RDP session")
      .replaceAll("ssh login", "RDP login").replaceAll("SSH logs", "RDP / Security logs")
      .replaceAll("ssh-to-api-prod", "rdp-to-api-prod").replaceAll("SSH / RDP", "RDP");
    const mapped: LabStep = { ...baseStep, title: adapt(baseStep.title), objective: adapt(baseStep.objective), consolePath: adapt(baseStep.consolePath), resource: adapt(baseStep.resource), rows: baseStep.rows.map(row => ({ ...row, label: adapt(row.label), value: adapt(row.value) })), clue: adapt(baseStep.clue), question: adapt(baseStep.question), choices: baseStep.choices.map(choice => ({ ...choice, label: adapt(choice.label), feedback: adapt(choice.feedback) })), command: adapt(baseStep.command), commandOutput: adapt(baseStep.commandOutput) };
    if (step === 3) { mapped.command = "Get-Service TermService; Get-NetTCPConnection -LocalPort 3389 -State Listen"; mapped.commandOutput = "TermService: Running\\nLISTENING on TCP/3389\\nNo matching RDP attempt reached the guest"; }
    if (step === 4) { mapped.command = "Test-NetConnection <vm-address> -Port 3389  # after approved change"; mapped.commandOutput = "Expected post-change result: TCP connection succeeds; approved RDP session succeeds; guest Security logs confirm the expected administrator."; }
    return mapped;
  }, [baseStep, protocol, step]);
  const answerKey = provider + ":" + step;
  const selected = answers[answerKey];
  const passed = selected !== undefined && current.choices[selected]?.correct;
  const progress = Math.round((Object.keys(answers).filter(k => k.startsWith(provider + ":") && labSteps[provider][Number(k.split(":")[1])]?.choices[answers[k]]?.correct).length / steps.length) * 100);
  const reset = () => { setStep(0); setAnswers({}); setShowCommand(false); };

  const consoleHeader = useMemo(() => provider === "AWS"
    ? { logo: "aws", eyebrow: "Amazon Web Services", service: "EC2", path: current.consolePath }
    : provider === "Azure"
      ? { logo: "azure", eyebrow: "Microsoft Azure", service: "Virtual machines", path: current.consolePath }
      : { logo: "gcp", eyebrow: "Google Cloud", service: "Compute Engine", path: current.consolePath }, [provider, current]);

  return <main className="vm-lab-shell">
    <header className="vm-lab-top"><a href="/troubleshooting">← Troubleshooting library</a><span>SIMULATED LAB · NO LIVE ACCOUNT</span></header>
    <section className="vm-lab-hero">
      <div><p className="vm-lab-kicker">NETWORK TROUBLESHOOTING · LAB 01</p><h1>VM unreachable over <em>{protocol}</em></h1><p>Follow the evidence through the cloud console. Inspect the resource, choose what the evidence proves, and unlock the next diagnostic step. No live cloud resources are accessed or changed.</p></div>
      <div className="vm-lab-score"><span>YOUR INVESTIGATION</span><strong>{progress}%</strong><div><i style={{width: progress + "%"}} /></div><small>{Object.keys(answers).filter(k=>k.startsWith(provider+":") && labSteps[provider][Number(k.split(":")[1])]?.choices[answers[k]]?.correct).length} of {steps.length} checks verified</small></div>
    </section>
    <section className="vm-lab-provider"><div><span className="vm-lab-section-label">01 / CHOOSE YOUR CLOUD</span><p>Same incident pattern. Vendor-specific console, rules, and diagnostics.</p><div className="vm-lab-protocol-switch" aria-label="Remote access protocol"><button className={protocol === "SSH" ? "active" : ""} onClick={() => { setProtocol("SSH"); setStep(0); setAnswers({}); setShowCommand(false); }}>SSH · TCP/22</button><button className={protocol === "RDP" ? "active" : ""} onClick={() => { setProtocol("RDP"); setStep(0); setAnswers({}); setShowCommand(false); }}>RDP · TCP/3389</button></div></div><div className="vm-lab-provider-buttons">{(["AWS","Azure","Google Cloud"] as Provider[]).map(p=><button key={p} className={provider===p?"active "+p.toLowerCase().replace(" ","-"):""} onClick={()=>{setProvider(p);setStep(0);setShowCommand(false);}}><span className={"vm-cloud-mark "+p.toLowerCase().replace(" ","-")}>{p==="AWS"?"aws":p==="Azure"?"Az":"G"}</span><strong>{p}</strong><small>{providerNames[p].product}</small></button>)}</div></section>
    <section className="vm-lab-workspace">
      <aside className="vm-lab-step-rail"><div className="vm-lab-rail-head"><span>DIAGNOSTIC PATH</span><strong>{step+1} / {steps.length}</strong></div>{steps.map((s,i)=><button key={s.title} className={i===step?"active":answers[provider+":"+i]!==undefined&&labSteps[provider][i].choices[answers[provider+":"+i]]?.correct?"complete":i>step?"locked":""} onClick={()=>{if(i<=step || (i>0 && labSteps[provider][i-1].choices[answers[provider+":"+(i-1)]]?.correct)){setStep(i);setShowCommand(false);}}} disabled={i>step && !(i>0 && labSteps[provider][i-1].choices[answers[provider+":"+(i-1)]]?.correct)}><span>{answers[provider+":"+i]!==undefined&&labSteps[provider][i].choices[answers[provider+":"+i]]?.correct?"✓":String(i+1).padStart(2,"0")}</span><strong>{s.title}</strong><small>{i===step?"Current check":i<step?"Reviewed":"Locked until verified"}</small></button>)}</aside>
      <div className="vm-lab-main">
        <div className="vm-lab-step-heading"><span>STEP {String(step+1).padStart(2,"0")} · {consoleHeader.service.toUpperCase()}</span><h2>{current.title}</h2><p>{current.objective}</p></div>
        <div className={"vm-cloud-console "+provider.toLowerCase().replace(" ","-")}>
          <div className="vm-console-chrome"><span className={"vm-console-brand "+consoleHeader.logo}>{consoleHeader.logo==="aws"?"aws":consoleHeader.logo==="azure"?"Microsoft Azure":"Google Cloud"}</span><span className="vm-console-global">Search resources, services, and docs <kbd>/</kbd></span><span className="vm-console-profile">demo-user ▾</span></div>
          <div className="vm-console-breadcrumb">{consoleHeader.eyebrow} <b>›</b> {consoleHeader.path}</div>
          <div className="vm-console-body"><aside><strong>{consoleHeader.service}</strong><span>Overview</span><span className="selected">Networking</span><span>Monitoring</span><span>Connect</span><span>Activity / logs</span></aside><div className="vm-console-resource"><div className="vm-console-resource-title"><div><span>RESOURCE DETAILS · SAMPLE DATA</span><h3>{current.resource}</h3></div><b className="vm-console-pill">SIMULATED</b></div><div className="vm-console-tabs"><span className="active">Properties</span><span>Monitoring</span><span>Diagnostics</span><span>Activity log</span></div><div className="vm-console-evidence">{current.rows.map(r=><div key={r.label}><span>{r.label}</span><strong className={r.status}>{r.value}</strong><i className={r.status}>{r.status==="good"?"✓":r.status==="bad"?"!":"•"}</i></div>)}</div><div className="vm-console-clue"><span>WHAT THE EVIDENCE SAYS</span><p>{current.clue}</p></div></div></div>
          <div className="vm-console-foot"><span>● Synthetic lab data · not connected to a cloud account</span><span>{provider} · {step+1}/{steps.length}</span></div>
        </div>
        <div className="vm-lab-investigate"><div className="vm-lab-question"><span className="vm-lab-section-label">YOUR TURN · VERIFY BEFORE CONTINUING</span><h3>{current.question}</h3><p>Select the conclusion best supported by the console evidence. Incorrect choices explain why and can be retried.</p></div><div className="vm-lab-choices">{current.choices.map((c,i)=><button key={c.label} className={selected===i?(c.correct?"correct":"incorrect"):""} onClick={()=>setAnswers(prev=>({...prev,[answerKey]:i}))}><span>{String.fromCharCode(65+i)}</span><strong>{c.label}</strong><i>{selected===i?(c.correct?"✓":"↻"):"→"}</i></button>)}</div>
          {selected!==undefined&&<div className={"vm-lab-feedback "+(current.choices[selected].correct?"correct":"incorrect")}><strong>{current.choices[selected].correct?"Evidence verified":"Not quite — inspect the console again"}</strong><p>{current.choices[selected].feedback}</p>{!current.choices[selected].correct&&<button onClick={()=>setAnswers(prev=>{const next={...prev};delete next[answerKey];return next;})}>Try again</button>}</div>}
          <div className="vm-lab-actions"><button className="vm-lab-command-toggle" onClick={()=>setShowCommand(v=>!v)}>{showCommand?"Hide CLI / diagnostic example":"Show CLI / diagnostic example"} <span>{showCommand?"−":"+"}</span></button>{showCommand&&<div className="vm-lab-terminal"><span>{provider} · EXAMPLE ONLY</span><pre>{current.command}{"

"}{current.commandOutput}</pre><small>Illustrative commands and outputs only. Check your account, region, resource IDs, permissions, and change approval before using commands in a real environment.</small></div>}<button className="vm-lab-next" disabled={!passed} onClick={()=>{setShowCommand(false);if(step<steps.length-1)setStep(step+1);}}>{step===steps.length-1?"Investigation complete":"Verify and continue"} <span>→</span></button></div>
          {step===steps.length-1&&passed&&<div className="vm-lab-complete"><span>✓</span><div><strong>Investigation complete</strong><p>The simulated evidence supports a missing or conflicting inbound SSH rule—not a VM health or route failure. In production, submit the narrowest approved change, validate reachability from the expected source, confirm successful SSH authentication, and check host/network logs. No changes were made in this lab.</p><button onClick={reset}>Restart this lab</button></div></div>}
        </div>
      </div>
    </section>
  </main>;
}
