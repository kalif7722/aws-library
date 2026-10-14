"use client";

import { useMemo, useState } from "react";
import "./lab.css";

type Provider = "AWS" | "Azure" | "Google Cloud";
type Choice = { label: string; correct: boolean; feedback: string };
type ConsoleRule = { id: string; name: string; action: string; detail: string; priority?: string; source?: string; destination?: string; service?: string; protocol?: string; port?: string; target?: string; network?: string; direction?: string; ports?: string; };
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
      rows: [{label:"Existing inbound rule",value:"TCP 443 from 10.40.0.0/16",status:"good"},{label:"Existing inbound rule",value:"TCP 8443 from sg-0f55aa11bb22cc33",status:"good"},{label:"Security group",value:"sg-api-prod attached to api-prod-01",status:"neutral"},{label:"Expected admin source",value:"198.51.100.24/32",status:"neutral"}],
      clue: "Review the inbound rules that are actually listed. Compare their protocol, port, and source with the connection you are trying to make.",
      question: "Which finding best explains why the SSH connection is blocked at this layer?",
      choices: [
        {label:"No inbound TCP/22 allow rule for 198.51.100.24/32",correct:true,feedback:"Correct. The required source-to-port rule is missing. Verify the intended admin source with the owner before proposing a narrow rule."},
        {label:"HTTPS / 443 is allowed from the application CIDR",correct:false,feedback:"That rule applies to a different port and source range; it does not grant SSH access."},
        {label:"The instance is in eu-west-1a",correct:false,feedback:"An Availability Zone is not itself evidence of an SSH policy denial."},
      ],
      command:"aws ec2 describe-security-groups --group-ids sg-0ab12cd34ef56ab78",
      commandOutput:"SECURITY GROUP RULES\nTCP 443  10.40.0.0/16\nTCP 8443 sg-0f55aa11bb22cc33",
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
      consolePath:"Network security groups › nsg-prod-app › Inbound security rules",
      resource:"nsg-prod-app · resource group rg-prod-app",
      rows:[{label:"Priority 300",value:"Allow-AppGateway-HTTPS · TCP/443",status:"good"},{label:"Priority 65000",value:"AllowVnetInBound · Any",status:"neutral"},{label:"Priority 65001",value:"AllowAzureLoadBalancerInBound",status:"neutral"},{label:"Priority 65500",value:"DenyAllInBound · default rule",status:"neutral"}],
      clue:"Inspect the listed custom and default rules. Compare the source, destination, protocol, port, and priority with the requested connection.",
      question:"Which setting is the blocking evidence?",
      choices:[{label:"No earlier custom allow matches TCP/22 from the approved admin source, so DenyAllInBound applies",correct:true,feedback:"Correct. Confirm the intended access path and rule owner before proposing a narrowly scoped exception or approved bastion path."},{label:"HTTPS is allowed from the application gateway",correct:false,feedback:"That rule concerns HTTPS, not SSH."},{label:"The VM is in West Europe",correct:false,feedback:"Region does not explain this explicit rule match."}],
      command:"az network nic list-effective-nsg --resource-group rg-prod-app --name nic-api-prod-01",
      commandOutput:"Custom: Allow-AppGateway-HTTPS (priority 300, TCP/443)\\nDefault: AllowVnetInBound (65000), AllowAzureLoadBalancerInBound (65001), DenyAllInBound (65500)",
    },
    {
      title:"Check Network Watcher path analysis",objective:"Correlate the policy finding with the network path before proposing a change.",
      consolePath:"Network Watcher › Connection troubleshoot",
      resource:"Source: approved admin path · Destination: api-prod-01:22",
      rows:[{label:"Destination",value:"VM private IP",status:"good"},{label:"Next hop",value:"Expected VPN / bastion route",status:"good"},{label:"NSG evaluation",value:"Default DenyAllInBound applies",status:"neutral"},{label:"Route status",value:"Reachable",status:"good"}],
      clue:"Network Watcher confirms the route is viable. Compare the effective NSG rules with the requested source, destination, protocol, and port.",
      question:"What does the combined evidence support?",
      choices:[{label:"Use the approved bastion path or add a narrow, reviewed allow rule with a valid priority",correct:true,feedback:"Correct. The route is healthy. Confirm the intended access path, then add or adjust only the scoped rule needed before the default deny."},{label:"Add a new default route to the internet",correct:false,feedback:"A route change is not supported and may increase exposure."},{label:"Disable all NSGs",correct:false,feedback:"Disabling network controls is unsafe and unnecessary."}],
      command:"az network watcher test-connectivity --source-resource <source-resource-id> --dest-address <vm-private-ip> --dest-port 22",
      commandOutput:"Connectivity check: Failed\\nReason: NSG rule DenyAllInBound",
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
      clue:"Confirm the default deny behavior and intended access path. Add or adjust only a narrowly scoped allow with a valid priority, or use the approved bastion design.",
      question:"Which action correctly addresses rule precedence and minimizes exposure?",
      choices:[{label:"Review the deny rule and add/adjust a scoped approved path with a valid priority",correct:true,feedback:"Correct. Verify priority order, run Connection troubleshoot, test an SSH session, and confirm monitoring remains healthy."},{label:"Add a scoped allow rule at a valid priority before the default deny",correct:false,feedback:"Review NSG priority and scope; a narrow allow must be evaluated before the default deny."},{label:"Allow SSH from Any source",correct:false,feedback:"This creates unnecessary exposure."}],
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
      consolePath:"VPC network › Firewall",
      resource:"vpc-prod · project prod-app",
      rows:[{label:"Existing rule",value:"allow-internal · tcp/udp internal ranges",status:"good"},{label:"Existing rule",value:"allow-health-checks · TCP/80,443",status:"good"},{label:"Network",value:"vpc-prod",status:"neutral"},{label:"Target tag",value:"api-prod",status:"neutral"}],
      clue:"Inspect the existing VPC firewall rules and their target filters. A missing rule is inferred from the list and the required flow; it is not a rule row of its own.",
      question:"Which evidence identifies the network block?",
      choices:[{label:"The listed ingress rules do not allow this source-to-target TCP/22 flow; verify the implied ingress deny and policy hierarchy",correct:true,feedback:"Correct. The rule list shows only configured rules. Check target tags/service accounts and hierarchical firewall policies before proposing a narrow allow rule."},{label:"The VM is in europe-west1-b",correct:false,feedback:"Zone is not evidence of an SSH deny."},{label:"The guest agent responds",correct:false,feedback:"That is positive health evidence, not proof of network reachability."}],
      command:"gcloud compute firewall-rules list --filter='network:vpc-prod AND direction=INGRESS'",
      commandOutput:"allow-internal · INGRESS · priority 65534 · tcp:0-65535,udp:0-65535 · target api-prod\\nallow-health-checks · INGRESS · priority 1000 · tcp:80,443",
    },
    {
      title:"Validate connectivity path",objective:"Check routes and Connectivity Tests to confirm the firewall rule is the blocking component.",
      consolePath:"Network Intelligence Center › Connectivity Tests",
      resource:"Source: approved admin path · Destination: VM TCP/22",
      rows:[{label:"Route",value:"Expected path found",status:"good"},{label:"Next hop",value:"Approved VPN / bastion",status:"good"},{label:"Firewall evaluation",value:"Implied ingress deny",status:"neutral"},{label:"Return path",value:"No route failure observed",status:"good"}],
      clue:"Connectivity Tests can help isolate the firewall stage. Compare the trace with the configured rules and check hierarchical firewall policies.",
      question:"What is the best next action?",
      choices:[{label:"Keep routes unchanged and review the specific firewall policy",correct:true,feedback:"Correct. The evidence identifies a firewall boundary, not a route issue."},{label:"Add a broad default route",correct:false,feedback:"This would be an unjustified and potentially unsafe change."},{label:"Delete all firewall rules",correct:false,feedback:"That removes essential security boundaries."}],
      command:"gcloud network-management connectivity-tests describe ssh-to-api-prod --location=global",
      commandOutput:"Trace: route resolved\\nFirewall stage: blocked by implied ingress deny\\nProtocol/port: TCP/22",
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
      title:"Propose a scoped firewall correction and verify",objective:"Review the ingress policy and add a narrowly scoped approved path; verify with Connectivity Tests.",
      consolePath:"VPC network › Firewall rules › Review ingress rules",
      resource:"Change proposal · simulation only",
      rows:[{label:"Protocol",value:"TCP/22",status:"neutral"},{label:"Source",value:"Approved admin IP / bastion only",status:"good"},{label:"Target",value:"Only required VM tag/service account",status:"good"},{label:"Validation",value:"Connectivity Tests + SSH logs",status:"neutral"}],
      clue:"The correct change depends on the intended policy. Add a narrowly scoped ingress allow for the approved source and target, after checking higher-level firewall policies.",
      question:"Which fix is safe and consistent with the evidence?",
      choices:[{label:"Add a narrow ingress allow for the approved source, port, and target after policy review",correct:true,feedback:"Correct. Check hierarchical policies and rule targets, add only the required allow, then rerun Connectivity Tests and verify SSH from the approved source."},{label:"Add an allow rule for all sources and targets",correct:false,feedback:"This broadens access far beyond the requirement."},{label:"Change the route table despite the successful route trace",correct:false,feedback:"The route is healthy; changing it is unsupported."}],
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
  const [consoleTab, setConsoleTab] = useState("Overview");
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
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
  const reset = () => { setStep(0); setAnswers({}); setShowCommand(false); setConsoleTab("Overview"); setSelectedRule(null); };
  const tabOptions = step === 0
    ? (provider === "AWS" ? ["Details", "Status checks", "Monitoring", "System log"] : provider === "Azure" ? ["Overview", "Activity log", "Monitoring", "Boot diagnostics"] : ["Details", "Observability", "Serial port 1 output", "Logs Explorer"])
    : step === 1
      ? (provider === "AWS" ? ["Inbound rules", "Outbound rules", "Security group details"] : provider === "Azure" ? ["Effective security rules", "IP flow verify", "Network interface"] : ["Firewall rules", "Firewall policies", "Connectivity tests"])
      : step === 2
        ? (provider === "AWS" ? ["Routes", "Network ACLs", "Reachability Analyzer"] : provider === "Azure" ? ["Effective routes", "Connection troubleshoot"] : ["Routes", "Connectivity tests"])
        : step === 3
          ? (provider === "AWS" ? ["Systems Manager", "EC2 Serial Console", "System log"] : provider === "Azure" ? ["Run command", "Serial console", "Boot diagnostics"] : ["SSH troubleshooting", "Serial port 1 output", "Logs Explorer"])
          : (provider === "AWS" ? ["Security group rules", "Reachability Analyzer", "VPC Flow Logs"] : provider === "Azure" ? ["IP flow verify", "Effective security rules", "VNet flow logs"] : ["Firewall rules", "Connectivity tests", "VPC Flow Logs"]);
  // Keep the selected tab valid when the step/provider changes; never render stale content under a new tab label.
  const activeConsoleTab = tabOptions.includes(consoleTab) ? consoleTab : tabOptions[0];
  const ruleRows: ConsoleRule[] = provider === "AWS" ? [
    { id: "sgr-0123abcd4567ef890", name: "HTTPS", protocol: "TCP", port: "443", source: "10.40.0.0/16", target: "sg-api-prod", action: "Allow", detail: "Inbound TCP/443 from the internal application CIDR." },
    { id: "sgr-0f55aa11bb22cc33", name: "Custom TCP", protocol: "TCP", port: "8443", source: "sg-0f55aa11bb22cc33", target: "sg-api-prod", action: "Allow", detail: "Inbound TCP/8443 from the approved peer security group." }
  ] : provider === "Azure" ? [
    { id: "Allow-AppGateway-HTTPS", name: "Allow-AppGateway-HTTPS", priority: "300", source: "ApplicationGateway", destination: "*", service: "TCP/443", action: "Allow", detail: "Custom inbound rule for HTTPS from the ApplicationGateway service tag." },
    { id: "AllowVnetInBound", name: "AllowVnetInBound", priority: "65000", source: "VirtualNetwork", destination: "VirtualNetwork", service: "Any", action: "Allow", detail: "Azure default inbound rule allowing traffic from/to the virtual network service tag." },
    { id: "AllowAzureLoadBalancerInBound", name: "AllowAzureLoadBalancerInBound", priority: "65001", source: "AzureLoadBalancer", destination: "*", service: "Any", action: "Allow", detail: "Azure default inbound rule for Azure Load Balancer probes." },
    { id: "DenyAllInBound", name: "DenyAllInBound", priority: "65500", source: "*", destination: "*", service: "Any", action: "Deny", detail: "Azure default inbound catch-all deny rule, evaluated after higher-priority rules." }
  ] : [
    { id: "allow-health-checks", name: "allow-health-checks", network: "vpc-prod", direction: "INGRESS", priority: "1000", source: "130.211.0.0/22, 35.191.0.0/16", target: "api-prod", ports: "tcp:80,443", action: "ALLOW", detail: "Ingress health-check traffic to instances tagged api-prod." },
    { id: "allow-internal", name: "allow-internal", network: "vpc-prod", direction: "INGRESS", priority: "65534", source: "10.40.0.0/16", target: "api-prod", ports: "tcp:0-65535, udp:0-65535, icmp", action: "ALLOW", detail: "Internal VPC traffic for matching target instances." }
  ];
  const selectedRuleData = ruleRows.find((rule) => rule.id === selectedRule);

  const consoleScreen = useMemo(() => {
    const port = protocol === "SSH" ? "22" : "3389";
    const protoName = protocol === "SSH" ? "SSH" : "RDP";
    const source = "198.51.100.24";
    const healthyGuest = [
      { label: protocol === "SSH" ? "sshd" : "TermService", value: protocol === "SSH" ? "active (running)" : "Running", status: "good" as const },
      { label: "TCP listener", value: `0.0.0.0:${port} · LISTENING`, status: "good" as const },
      { label: "Host firewall", value: "Approved admin interface allowed", status: "good" as const },
      { label: "Inbound attempt", value: "No matching connection reached guest", status: "neutral" as const },
    ];
    const screen = (service: string, eyebrow: string, path: string, resource: string, rows: {label:string;value:string;status:"good"|"bad"|"neutral"}[], clue: string) => ({ service, eyebrow, path, resource, rows, clue });
    const key = `${provider}|${step}|${activeConsoleTab}`;
    const screens: Record<string, ReturnType<typeof screen>> = {
      "AWS|0|Details": screen("EC2", "INSTANCE DETAILS", "EC2 › Instances › i-0a12b345c678d9012 › Details", "i-0a12b345c678d9012 · api-prod-01", [{label:"Instance state",value:"Running",status:"good"},{label:"Instance type",value:"t3.medium",status:"neutral"},{label:"Private IPv4",value:"10.20.2.17",status:"neutral"},{label:"VPC / subnet",value:"vpc-prod / subnet-private-admin",status:"neutral"}], "The instance is running. This page shows instance configuration; it does not prove the requested TCP connection is allowed."),
      "AWS|0|Status checks": screen("EC2", "INSTANCE STATUS CHECKS", "EC2 › Instances › i-0a12b345c678d9012 › Status checks", "api-prod-01 · Status checks", [{label:"System reachability",value:"Passed",status:"good"},{label:"Instance reachability",value:"Passed",status:"good"},{label:"Last status check",value:"2 minutes ago",status:"neutral"},{label:"Action",value:"No recovery action indicated",status:"good"}], "Both EC2 status checks pass. Continue to network controls; a healthy instance can still be unreachable because of security policy or routing."),
      "AWS|0|Monitoring": screen("CloudWatch", "EC2 MONITORING", "EC2 › Instances › Monitoring", "api-prod-01 · CloudWatch metrics", [{label:"CPU utilization",value:"18.4%",status:"good"},{label:"Network in",value:"Recent baseline traffic",status:"neutral"},{label:"Network out",value:"Recent baseline traffic",status:"neutral"},{label:"Status-check failed",value:"0",status:"good"}], "Monitoring helps identify resource or platform symptoms, but low or normal metrics do not validate a TCP/22 path."),
      "AWS|0|System log": screen("EC2", "SYSTEM LOG", "EC2 › Instances › Actions › Monitor and troubleshoot › Get system log", "api-prod-01 · System log", [{label:"Boot sequence",value:"Completed",status:"good"},{label:"Kernel errors",value:"No current fatal error in sample",status:"good"},{label:"Network interface",value:"OS booted normally",status:"neutral"}], "The simulated boot log has no obvious startup failure. System log is not a substitute for testing the security group and route path."),
      "Azure|0|Overview": screen("Virtual machines", "VIRTUAL MACHINE OVERVIEW", "Virtual machines › api-prod-01 › Overview", "api-prod-01 · rg-prod-app", [{label:"Status",value:"Running",status:"good"},{label:"Location",value:"West Europe",status:"neutral"},{label:"Private IP address",value:"10.20.2.17",status:"neutral"},{label:"Public IP address",value:"Not assigned in this sample",status:"neutral"}], "The VM is running. Verify the actual intended access path and its network controls rather than assuming the overview proves reachability."),
      "Azure|0|Activity log": screen("Virtual machines", "ACTIVITY LOG", "Virtual machines › api-prod-01 › Activity log", "api-prod-01 · Activity log", [{label:"Recent operation",value:"Power on · Succeeded",status:"good"},{label:"Restart / redeploy",value:"No recent operation shown",status:"neutral"},{label:"Network configuration change",value:"No recent change shown in sample",status:"neutral"}], "The activity log is an audit trail of control-plane operations, not a packet-level diagnostic. No recent VM operation explains this timeout."),
      "Azure|0|Monitoring": screen("Azure Monitor", "METRICS", "Virtual machines › api-prod-01 › Monitoring", "api-prod-01 · Metrics", [{label:"Percentage CPU",value:"18.4%",status:"good"},{label:"Heartbeat",value:"Recent",status:"good"},{label:"Network in",value:"Baseline traffic present",status:"neutral"}], "Metrics can reveal VM or agent health symptoms. Use Network Watcher and effective network rules to identify a path-specific block."),
      "Azure|0|Boot diagnostics": screen("Boot diagnostics", "BOOT DIAGNOSTICS", "Virtual machines › api-prod-01 › Help › Boot diagnostics", "api-prod-01 · Boot diagnostics", [{label:"Boot status",value:"OS boot completed",status:"good"},{label:"Serial output",value:"No current boot failure in sample",status:"good"},{label:"Diagnostic screenshot",value:"Login prompt visible",status:"neutral"}], "Boot diagnostics supports OS startup troubleshooting. It does not establish that the requested source can reach TCP/" + port + "."),
      "Google Cloud|0|Details": screen("Compute Engine", "VM INSTANCE DETAILS", "Compute Engine › VM instances › api-prod-01 › Details", "api-prod-01 · prod-app", [{label:"Status",value:"RUNNING",status:"good"},{label:"Zone",value:"europe-west1-b",status:"neutral"},{label:"Internal IP",value:"10.20.2.17",status:"neutral"},{label:"Network tags",value:"api-prod",status:"neutral"}], "The VM is running and has the expected network tag. The tag is relevant because VPC firewall rules can target tags or service accounts."),
      "Google Cloud|0|Observability": screen("Cloud Monitoring", "OBSERVABILITY", "Compute Engine › VM instances › Observability", "api-prod-01 · Monitoring", [{label:"CPU utilization",value:"18.4%",status:"good"},{label:"VM uptime",value:"Stable",status:"good"},{label:"Guest agent",value:"Responding",status:"good"}], "Monitoring indicates no obvious VM-health issue. Move to VPC firewall and Connectivity Tests to inspect the network configuration."),
      "Google Cloud|0|Serial port 1 output": screen("Compute Engine", "SERIAL PORT 1 OUTPUT", "Compute Engine › VM instances › api-prod-01 › Logs › Serial port 1", "api-prod-01 · Serial port output", [{label:"Boot sequence",value:"Completed",status:"good"},{label:"Kernel / startup errors",value:"No current fatal error in sample",status:"good"},{label:"SSH login",value:"No matching attempt shown",status:"neutral"}], "Serial output helps diagnose boot and guest startup. Absence of an SSH login here is not proof by itself; compare with firewall and guest service evidence."),
      "Google Cloud|0|Logs Explorer": screen("Cloud Logging", "LOGS EXPLORER", "Logging › Logs Explorer", "Compute Engine logs · api-prod-01", [{label:"Resource",value:"gce_instance / api-prod-01",status:"neutral"},{label:"Startup messages",value:"Normal boot in sample",status:"good"},{label:"SSH daemon event",value:"No matching inbound attempt in sample",status:"neutral"}], "Logs Explorer only shows emitted logs that are enabled and available. Missing log entries alone are not definitive network evidence."),
      "AWS|1|Inbound rules": screen("EC2", "SECURITY GROUP INBOUND RULES", "EC2 › Security Groups › sg-0ab12cd34ef56ab78 › Inbound rules", "sg-api-prod · attached to api-prod-01", current.rows, "Inspect the configured inbound allow rules and compare protocol, destination port, source, and attached security groups. The missing allow is inferred from the absence of a matching configured rule."),
      "AWS|1|Outbound rules": screen("EC2", "SECURITY GROUP OUTBOUND RULES", "EC2 › Security Groups › sg-0ab12cd34ef56ab78 › Outbound rules", "sg-api-prod · Outbound rules", [{label:"Configured egress",value:"All traffic · 0.0.0.0/0 (sample default)",status:"neutral"},{label:"Security group behavior",value:"Stateful return traffic for allowed connections",status:"good"},{label:"Inbound TCP/" + port,value:"No matching inbound allow in listed rules",status:"bad"}], "Outbound rules are a separate view. Security groups are stateful, so return traffic for an allowed flow is handled automatically; the inbound initiation still needs a matching rule."),
      "AWS|1|Security group details": screen("EC2", "SECURITY GROUP DETAILS", "EC2 › Security Groups › sg-0ab12cd34ef56ab78 › Details", "sg-api-prod · Security group details", [{label:"VPC",value:"vpc-prod",status:"neutral"},{label:"Attached resource",value:"eni-0ab1… · api-prod-01",status:"neutral"},{label:"Inbound rules",value:"2 configured allow rules in sample",status:"neutral"},{label:"Requested flow",value:protoName + " TCP/" + port + " from " + source, status:"bad"}], "Confirm which security groups are attached to the instance's network interface. Inspect every attached group before concluding the flow is blocked."),
      "Azure|1|Effective security rules": screen("Network interface", "EFFECTIVE SECURITY RULES", "Virtual machines › api-prod-01 › Networking › Network interface › Effective security rules", "nic-api-prod-01 · combined NIC/subnet NSG rules", current.rows, "Effective security rules combine rules applied from the NIC and subnet. Compare the exact source, destination, protocol, port, and priority; IP flow verify can identify the matching decision."),
      "Azure|1|IP flow verify": screen("Network Watcher", "IP FLOW VERIFY", "Network Watcher › IP flow verify", "api-prod-01 · inbound TCP/" + port, [{label:"Direction",value:"Inbound",status:"neutral"},{label:"Protocol / local port",value:"TCP / " + port,status:"neutral"},{label:"Remote IP",value:source,status:"neutral"},{label:"Result",value:"Denied · DenyAllInBound (priority 65500)",status:"bad"}], "IP flow verify evaluates a specific five-tuple against effective NSG rules and identifies the rule responsible. This is a simulated result; the rule list itself should show only actual configured/default rules."),
      "Azure|1|Network interface": screen("Network interfaces", "NETWORK INTERFACE", "Virtual machines › api-prod-01 › Networking › Network interface", "nic-api-prod-01 · Network settings", [{label:"Private IP",value:"10.20.2.17",status:"neutral"},{label:"Subnet",value:"subnet-private-admin",status:"neutral"},{label:"NIC-level NSG",value:"nsg-prod-app",status:"neutral"},{label:"Subnet-level NSG",value:"nsg-subnet-prod",status:"neutral"}], "Azure effective security rules can aggregate subnet- and NIC-level NSGs. Check the NIC and subnet associations before proposing a rule change."),
      "Google Cloud|1|Firewall rules": screen("VPC network", "VPC FIREWALL RULES", "VPC network › Firewall", "vpc-prod · configured firewall rules", current.rows, "Only configured VPC firewall rules are listed. Check direction, priority, source ranges, target tags/service accounts, protocol and port; implied ingress deny is behavior, not a fabricated rule row."),
      "Google Cloud|1|Firewall policies": screen("VPC network", "FIREWALL POLICIES", "VPC network › Firewall policies", "prod-app · Applicable firewall policies", [{label:"Hierarchical policy",value:"No matching deny in this sample",status:"good"},{label:"Network firewall policy",value:"No matching deny in this sample",status:"good"},{label:"VPC ingress rules",value:"No configured allow matches source + target + TCP/" + port,status:"bad"}], "Check organization/folder/network firewall policies as well as VPC rules. A missing VPC allow does not by itself prove that no higher-level policy applies."),
      "Google Cloud|1|Connectivity tests": screen("Network Intelligence Center", "CONNECTIVITY TESTS", "Network Intelligence Center › Connectivity Tests", "ssh-to-api-prod · trace result", [{label:"Source endpoint",value:source,status:"neutral"},{label:"Destination endpoint",value:"10.20.2.17:" + port,status:"neutral"},{label:"VPC firewall",value:"Ingress blocked · no matching allow",status:"bad"},{label:"Route",value:"Applicable route found",status:"good"}], "Connectivity Tests analyzes the configured VPC path and identifies firewall or route issues. It does not test the guest OS firewall or whether the application is listening."),
      "AWS|2|Routes": screen("VPC", "ROUTE TABLE", "VPC › Route tables › rtb-0123abcd4567ef890 › Routes", "rtb-0123abcd4567ef890 · private-admin-subnet", [{label:"Destination",value:"10.40.0.0/16",status:"neutral"},{label:"Target",value:"local",status:"good"},{label:"State",value:"Active",status:"good"},{label:"Association",value:"subnet-private-admin",status:"neutral"}], "This route table is a separate VPC screen. Verify the source-to-destination route and return path; a route table does not replace security group evaluation."),
      "AWS|2|Network ACLs": screen("VPC", "NETWORK ACL", "VPC › Network ACLs › acl-0123abcd4567ef890 › Inbound / Outbound rules", "acl-prod-private · subnet association", [{label:"Inbound TCP/" + port,value:"Allow from approved admin CIDR in sample",status:"good"},{label:"Outbound ephemeral ports",value:"Return traffic permitted in sample",status:"good"},{label:"Subnet association",value:"subnet-private-admin",status:"neutral"},{label:"NACL behavior",value:"Stateless · check both directions",status:"neutral"}], "Network ACLs are stateless and evaluated at subnet boundaries. Inspect both inbound and outbound entries, including ephemeral return ports."),
      "AWS|2|Reachability Analyzer": screen("VPC Reachability Analyzer", "REACHABILITY ANALYZER", "VPC › Reachability Analyzer › Network insights", "admin-source → api-prod-01: " + port + "/TCP", [{label:"Analysis status",value:"Not reachable",status:"bad"},{label:"Blocking component",value:"sg-api-prod · no matching inbound allow",status:"bad"},{label:"Route table",value:"No route blocker identified",status:"good"},{label:"NACL",value:"No NACL blocker identified",status:"good"}], "Reachability Analyzer is a static configuration analysis. It can identify the blocking component but does not send real packets; run it with the correct source, destination, protocol, and port."),
      "Azure|2|Effective routes": screen("Network interface", "EFFECTIVE ROUTES", "Virtual machines › api-prod-01 › Networking › Network interface › Effective routes", "nic-api-prod-01 · Effective routes", [{label:"10.20.0.0/16",value:"Virtual network · Active",status:"good"},{label:"10.40.0.0/16",value:"Virtual network gateway · Active",status:"good"},{label:"0.0.0.0/0",value:"Internet · Active",status:"neutral"},{label:"Unexpected NVA next hop",value:"None in sample",status:"good"}], "Effective routes show the routes actually applied to the NIC. If NSG evaluation is the blocker, do not change a healthy route table."),
      "Azure|2|Connection troubleshoot": screen("Network Watcher", "CONNECTION TROUBLESHOOT", "Network Watcher › Connection troubleshoot", "admin-source → api-prod-01:" + port, [{label:"Destination",value:"10.20.2.17:" + port,status:"neutral"},{label:"Network path",value:"Route available",status:"good"},{label:"NSG evaluation",value:"Denied by DenyAllInBound",status:"bad"},{label:"End-to-end result",value:"Unreachable",status:"bad"}], "Connection troubleshoot evaluates the configured path and reports the component associated with failure. The result here is simulated, not a live probe."),
      "Google Cloud|2|Routes": screen("VPC network", "VPC ROUTES", "VPC network › Routes", "vpc-prod · Routes", [{label:"10.20.0.0/16",value:"Subnetwork route · Active",status:"good"},{label:"10.40.0.0/16",value:"Peering / VPN route · Active in sample",status:"good"},{label:"Route selection",value:"Longest-prefix match",status:"neutral"},{label:"Route blocker",value:"None identified in sample",status:"good"}], "Confirm that the destination has an applicable route and the return path exists. Firewall policy is evaluated separately from route selection."),
      "Google Cloud|2|Connectivity tests": screen("Network Intelligence Center", "CONNECTIVITY TESTS", "Network Intelligence Center › Connectivity Tests", "ssh-to-api-prod · trace details", [{label:"Trace",value:"Source → VPC → destination NIC",status:"neutral"},{label:"Route step",value:"Forwarding route found",status:"good"},{label:"Firewall step",value:"INGRESS blocked",status:"bad"},{label:"Guest OS",value:"Not evaluated by VPC configuration trace",status:"neutral"}], "Connectivity Tests checks the VPC configuration path and may perform dynamic tests, but it does not inspect the guest OS firewall or listening service."),
      "AWS|3|Systems Manager": screen("Systems Manager", "SESSION MANAGER / RUN COMMAND", "Systems Manager › Fleet Manager › Node actions", "api-prod-01 · authorized guest diagnostics", healthyGuest, "Use an approved management channel such as Session Manager to check the guest service without opening an additional public access path."),
      "AWS|3|EC2 Serial Console": screen("EC2 Serial Console", "SERIAL CONSOLE", "EC2 › Instances › Connect › EC2 Serial Console", "api-prod-01 · serial console", [{label:"Console access",value:"Authorized access required",status:"neutral"},{label:"Boot status",value:"Guest OS reached login prompt",status:"good"},{label:"Network reachability",value:"Serial console does not test TCP path",status:"neutral"}], "The serial console is an out-of-band recovery channel. It can help with guest issues but does not prove network reachability."),
      "AWS|3|System log": screen("CloudWatch", "SYSTEM LOG / GUEST EVIDENCE", "CloudWatch › Log groups › /var/log/auth.log (sample)", "api-prod-01 · guest SSH logs", [{label:"sshd listener",value:"Active on TCP/" + port,status:"good"},{label:"Matching connection",value:"No attempt observed in sample",status:"neutral"},{label:"Interpretation",value:"Consistent with an upstream block",status:"neutral"}], "Absence of a guest log entry is supporting evidence only. Correlate with Reachability Analyzer and flow logs; log collection may be incomplete."),
      "Azure|3|Run command": screen("Run command", "RUN COMMAND", "Virtual machines › api-prod-01 › Operations › Run command", "api-prod-01 · RunShellScript / RunPowerShellScript", healthyGuest, "Run Command is an authorized management channel for checking service state and listening ports without changing NSG rules."),
      "Azure|3|Serial console": screen("Serial console", "SERIAL CONSOLE", "Virtual machines › api-prod-01 › Help › Serial console", "api-prod-01 · serial console", [{label:"Boot output",value:"OS reached login prompt",status:"good"},{label:"Guest network service",value:"Not determined by serial output alone",status:"neutral"},{label:"Access",value:"Requires supported VM / boot diagnostics configuration",status:"neutral"}], "Serial console is useful for boot and guest recovery. Use Run Command or OS logs to verify the listening service."),
      "Azure|3|Boot diagnostics": screen("Boot diagnostics", "BOOT DIAGNOSTICS", "Virtual machines › api-prod-01 › Help › Boot diagnostics", "api-prod-01 · boot diagnostics", [{label:"Boot sequence",value:"Completed",status:"good"},{label:"Kernel panic",value:"Not present in sample",status:"good"},{label:"SSH/RDP listener",value:"Must be checked inside guest OS",status:"neutral"}], "Boot diagnostics helps rule out startup failure; it cannot validate a remote TCP connection."),
      "Google Cloud|3|SSH troubleshooting": screen("SSH troubleshooting", "SSH-IN-BROWSER / GUEST CHECKS", "Compute Engine › VM instances › api-prod-01 › SSH troubleshooting", "api-prod-01 · guest service check", healthyGuest, "Use supported SSH troubleshooting and guest logs to check the service. Connectivity Tests does not inspect OS-level firewall or application listeners."),
      "Google Cloud|3|Serial port 1 output": screen("Compute Engine", "SERIAL PORT 1 OUTPUT", "Compute Engine › VM instances › api-prod-01 › Logs › Serial port 1", "api-prod-01 · serial port output", [{label:"Boot",value:"Completed",status:"good"},{label:"Service listener",value:"Not shown by boot output",status:"neutral"},{label:"Login attempt",value:"No matching SSH attempt in sample",status:"neutral"}], "Serial port output is primarily boot and console evidence. Use guest OS commands/logs for the listener and host firewall."),
      "Google Cloud|3|Logs Explorer": screen("Cloud Logging", "LOGS EXPLORER", "Logging › Logs Explorer › Compute Engine instance logs", "api-prod-01 · guest and system logs", [{label:"Guest agent",value:"Responding",status:"good"},{label:"sshd / RDP service",value:"Active in simulated guest check",status:"good"},{label:"Connection attempt",value:"No matching host-side event",status:"neutral"}], "Log availability depends on which agents and log sources are enabled. Correlate logs with the VPC firewall evaluation."),
      "AWS|4|Security group rules": screen("EC2", "SECURITY GROUP CHANGE REVIEW", "EC2 › Security Groups › sg-api-prod › Inbound rules", "Proposed change · not applied", [{label:"Protocol / port",value:"TCP/" + port,status:"neutral"},{label:"Source",value:source + "/32 (approved admin source)",status:"good"},{label:"Target",value:"Only the intended instance security group",status:"good"},{label:"Change state",value:"Proposal only · approval required",status:"neutral"}], "The simulated proposal is least-privilege. Confirm the approved source and access design, then apply only through change control; do not open SSH/RDP to all sources."),
      "AWS|4|Reachability Analyzer": screen("VPC Reachability Analyzer", "POST-CHANGE VALIDATION PLAN", "VPC › Reachability Analyzer › Network insights", "admin-source → api-prod-01:" + port + "/TCP", [{label:"Before change",value:"Not reachable · security group blocker",status:"bad"},{label:"After approved change",value:"Expected reachable if no other blocker exists",status:"neutral"},{label:"Validation",value:"Re-run analysis and test actual session",status:"neutral"}], "Reachability Analyzer evaluates configuration, not real packets or application authentication. Pair it with an actual connection test and guest logs after the approved change."),
      "AWS|4|VPC Flow Logs": screen("VPC Flow Logs", "VPC FLOW LOGS", "VPC › Network interfaces › eni-api-prod › Flow logs / CloudWatch Logs", "eni-api-prod · sampled traffic records", [{label:"Log configuration",value:"Must be enabled and delivery healthy",status:"neutral"},{label:"Sample flow",value:"TCP " + source + " → 10.20.2.17:" + port,status:"neutral"},{label:"Action field",value:"REJECT can indicate SG/NACL filtering",status:"neutral"},{label:"Caveat",value:"No record is not proof of no traffic",status:"neutral"}], "Flow Logs are sampled metadata for traffic to/from the selected VPC, subnet, or ENI. Verify they were enabled and delivered before relying on absence of a record."),
      "Azure|4|IP flow verify": screen("Network Watcher", "IP FLOW VERIFY · RECHECK", "Network Watcher › IP flow verify", "api-prod-01 · inbound TCP/" + port, [{label:"Direction",value:"Inbound",status:"neutral"},{label:"Remote IP",value:source,status:"neutral"},{label:"Before change",value:"Denied by DenyAllInBound",status:"bad"},{label:"After approved change",value:"Expected Allowed by named custom rule",status:"neutral"}], "After the approved NSG change, rerun IP flow verify and confirm the named allow rule is the result. Then test the actual session."),
      "Azure|4|Effective security rules": screen("Network interface", "EFFECTIVE SECURITY RULES · REVIEW", "Virtual machines › api-prod-01 › Networking › Network interface › Effective security rules", "nic-api-prod-01 · proposed effective policy", [{label:"Proposed custom rule",value:"Allow TCP/" + port + " from " + source + "/32",status:"neutral"},{label:"Priority",value:"Lower numeric priority than applicable deny",status:"neutral"},{label:"Scope",value:"NIC or subnet NSG per design",status:"neutral"},{label:"Change state",value:"Not applied · requires approval",status:"neutral"}], "Azure combines subnet and NIC NSGs. Ensure the intended allow wins according to priority and that no other NSG or route blocks the path."),
      "Azure|4|VNet flow logs": screen("Network Watcher", "VNET FLOW LOGS", "Network Watcher › Flow logs › VNet flow logs", "vnet-prod · flow log analysis", [{label:"Recommended flow log type",value:"VNet flow logs",status:"neutral"},{label:"Traffic analytics",value:"Can surface blocked-flow patterns when configured",status:"neutral"},{label:"NSG flow logs",value:"Retiring; new creation unavailable since June 30, 2025",status:"neutral"},{label:"Evidence",value:"Check capture scope, time window, and destination",status:"neutral"}], "For new Azure troubleshooting, prefer VNet flow logs. Confirm the feature was configured before the incident; logs cannot be retroactively enabled for past traffic."),
      "Google Cloud|4|Firewall rules": screen("VPC network", "FIREWALL RULE CHANGE REVIEW", "VPC network › Firewall › Create firewall rule (preview)", "Proposed ingress allow · not created", [{label:"Direction",value:"INGRESS",status:"neutral"},{label:"Source range",value:source + "/32 (approved admin source)",status:"good"},{label:"Protocols / ports",value:"tcp:" + port,status:"neutral"},{label:"Target",value:"Only api-prod tag or approved service account",status:"good"},{label:"Change state",value:"Preview only · approval required",status:"neutral"}], "Check hierarchical and network firewall policies, target tags/service accounts, and rule priority before creating a scoped allow. This screen is a proposal, not a real resource."),
      "Google Cloud|4|Connectivity tests": screen("Network Intelligence Center", "CONNECTIVITY TESTS · RECHECK", "Network Intelligence Center › Connectivity Tests", "ssh-to-api-prod · post-change test plan", [{label:"Before change",value:"Ingress firewall block",status:"bad"},{label:"After approved change",value:"Expected configuration path allowed",status:"neutral"},{label:"Guest OS",value:"Still requires a real TCP/session test",status:"neutral"}], "Rerun Connectivity Tests after the approved firewall change, then perform a real connection test. A successful configuration trace does not prove the service accepts authentication."),
      "Google Cloud|4|VPC Flow Logs": screen("Cloud Logging", "VPC FLOW LOGS", "Logging › Logs Explorer › VPC Flow Logs", "vpc-prod · flow log query", [{label:"Log source",value:"networkmanagement.googleapis.com/vpc_flows",status:"neutral"},{label:"Filter",value:"Source " + source + " · destination port " + port,status:"neutral"},{label:"Reporter / direction",value:"Check SRC/DEST and INGRESS/EGRESS fields",status:"neutral"},{label:"Caveat",value:"Sampling and logging configuration affect evidence",status:"neutral"}], "VPC Flow Logs are sampled and aggregated. Verify subnet flow logging is enabled and query the correct time range; an absent record alone does not prove the packet was never sent."),
    };
    const generic = screen(provider === "AWS" ? "Amazon EC2" : provider === "Azure" ? "Azure Virtual Machines" : "Compute Engine", "DIAGNOSTIC EVIDENCE", current.consolePath, current.resource, current.rows, current.clue);
    return screens[key] || generic;
  }, [provider, step, activeConsoleTab, current, protocol]);

  const consoleHeader = useMemo(() => provider === "AWS"
    ? { logo: "aws", eyebrow: "Amazon Web Services", service: consoleScreen.service, path: consoleScreen.path }
    : provider === "Azure"
      ? { logo: "azure", eyebrow: "Microsoft Azure", service: consoleScreen.service, path: consoleScreen.path }
      : { logo: "gcp", eyebrow: "Google Cloud", service: consoleScreen.service, path: consoleScreen.path }, [provider, consoleScreen]);

  return <main className="vm-lab-shell">
    <header className="vm-lab-top"><a href="/troubleshooting">← Troubleshooting library</a><span>SIMULATED LAB · NO LIVE ACCOUNT</span></header>
    <section className="vm-lab-hero">
      <div><p className="vm-lab-kicker">NETWORK TROUBLESHOOTING · LAB 01</p><h1>VM unreachable over <em>{protocol}</em></h1><p>Follow the evidence through the cloud console. Inspect the resource, choose what the evidence proves, and unlock the next diagnostic step. No live cloud resources are accessed or changed.</p></div>
      <div className="vm-lab-score"><span>YOUR INVESTIGATION</span><strong>{progress}%</strong><div><i style={{width: progress + "%"}} /></div><small>{Object.keys(answers).filter(k=>k.startsWith(provider+":") && labSteps[provider][Number(k.split(":")[1])]?.choices[answers[k]]?.correct).length} of {steps.length} checks verified</small></div>
    </section>
    <section className="vm-lab-provider"><div><span className="vm-lab-section-label">01 / CHOOSE YOUR CLOUD</span><p>Same incident pattern. Vendor-specific console, rules, and diagnostics.</p><div className="vm-lab-protocol-switch" aria-label="Remote access protocol"><button className={protocol === "SSH" ? "active" : ""} onClick={() => { setProtocol("SSH"); setStep(0); setAnswers({}); setShowCommand(false); setConsoleTab("Overview"); setSelectedRule(null); }}>SSH · TCP/22</button><button className={protocol === "RDP" ? "active" : ""} onClick={() => { setProtocol("RDP"); setStep(0); setAnswers({}); setShowCommand(false); setConsoleTab("Overview"); setSelectedRule(null); }}>RDP · TCP/3389</button></div></div><div className="vm-lab-provider-buttons">{(["AWS","Azure","Google Cloud"] as Provider[]).map(p=><button key={p} className={provider===p?"active "+p.toLowerCase().replace(" ","-"):""} onClick={()=>{setProvider(p);setStep(0);setShowCommand(false);setConsoleTab("Overview");setSelectedRule(null);}}><span className={"vm-cloud-mark "+p.toLowerCase().replace(" ","-")}>{p==="AWS"?"aws":p==="Azure"?"Az":"G"}</span><strong>{p}</strong><small>{providerNames[p].product}</small></button>)}</div></section>
    <section className="vm-lab-workspace">
      <aside className="vm-lab-step-rail"><div className="vm-lab-rail-head"><span>DIAGNOSTIC PATH</span><strong>{step+1} / {steps.length}</strong></div>{steps.map((s,i)=><button key={s.title} className={i===step?"active":answers[provider+":"+i]!==undefined&&labSteps[provider][i].choices[answers[provider+":"+i]]?.correct?"complete":i>step?"locked":""} onClick={()=>{if(i<=step || (i>0 && labSteps[provider][i-1].choices[answers[provider+":"+(i-1)]]?.correct)){setStep(i);setShowCommand(false);setConsoleTab(i===1?"Inbound rules":i===2?(provider==="AWS"?"Routes":provider==="Azure"?"Effective routes":"Routes"):"Overview");setSelectedRule(null);}}} disabled={i>step && !(i>0 && labSteps[provider][i-1].choices[answers[provider+":"+(i-1)]]?.correct)}><span>{answers[provider+":"+i]!==undefined&&labSteps[provider][i].choices[answers[provider+":"+i]]?.correct?"✓":String(i+1).padStart(2,"0")}</span><strong>{s.title}</strong><small>{i===step?"Current check":i<step?"Reviewed":"Locked until verified"}</small></button>)}</aside>
      <div className="vm-lab-main">
        <div className="vm-lab-step-heading"><span>STEP {String(step+1).padStart(2,"0")} · {consoleHeader.service.toUpperCase()}</span><h2>{current.title}</h2><p>{current.objective}</p></div>
        <div className={"vm-cloud-console "+provider.toLowerCase().replace(" ","-")}>
          <div className="vm-console-chrome"><span className={"vm-console-brand "+consoleHeader.logo}>{consoleHeader.logo==="aws"?"aws":consoleHeader.logo==="azure"?"Microsoft Azure":"Google Cloud"}</span><span className="vm-console-global">Search resources, services, and docs <kbd>/</kbd></span><span className="vm-console-profile">demo-user ▾</span></div>
          <div className="vm-console-breadcrumb">{consoleHeader.eyebrow} <b>›</b> {consoleHeader.path}</div>
          <div className="vm-console-body"><aside><strong>{consoleScreen.service}</strong>{tabOptions.map(item=><button type="button" key={item} className={activeConsoleTab===item?"selected":""} onClick={()=>{setConsoleTab(item);setSelectedRule(null);}}>{item}</button>)}</aside><div className="vm-console-resource"><div className="vm-console-resource-title"><div><span>{consoleScreen.eyebrow} · SYNTHETIC SAMPLE</span><h3>{consoleScreen.resource}</h3></div><b className="vm-console-pill">SIMULATED</b></div><div className="vm-console-tabs">{tabOptions.map(item=><button type="button" key={item} className={activeConsoleTab===item?"active":""} onClick={()=>{setConsoleTab(item);setSelectedRule(null);}}>{item}</button>)}</div>{step===1&&((provider==="AWS"&&activeConsoleTab==="Inbound rules")||(provider==="Azure"&&activeConsoleTab==="Effective security rules")||(provider==="Google Cloud"&&activeConsoleTab==="Firewall rules"))?<div className="vm-console-rule-area"><p className="vm-console-rule-intro">{provider==="AWS"?"Inbound rules · only configured allow rules are listed. Security Groups do not have explicit deny rules.":provider==="Azure"?"Effective security rules · combined NIC/subnet NSG rules and defaults, ordered by priority.":"VPC firewall rules · only configured rules are listed here; implied behavior is not shown as a fabricated rule."} Select a row to inspect its details.</p><div className="vm-console-table-wrap"><table className={"vm-console-rule-table "+provider.toLowerCase().replace(" ","-")}><thead><tr>{(provider==="AWS"?["Rule ID","Type","Protocol","Port range","Source"]:provider==="Azure"?["Priority","Name","Source","Destination","Service","Action"]:["Name","Network","Direction","Priority","Source filters","Targets","Protocols / ports","Action"]).map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{ruleRows.map(rule=><tr key={rule.id} className={selectedRule===rule.id?"chosen":""} onClick={()=>setSelectedRule(rule.id)} tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedRule(rule.id);}}}>{provider==="AWS"?<><td>{rule.id}</td><td>{rule.name}</td><td>{rule.protocol}</td><td>{rule.port}</td><td>{rule.source}</td></>:provider==="Azure"?<><td>{rule.priority}</td><td>{rule.name}</td><td>{rule.source}</td><td>{rule.destination}</td><td>{rule.service}</td><td><span className={rule.action==="Deny"?"rule-deny":"rule-allow"}>{rule.action}</span></td></>:<><td>{rule.name}</td><td>{rule.network}</td><td>{rule.direction}</td><td>{rule.priority}</td><td>{rule.source}</td><td>{rule.target}</td><td>{rule.ports}</td><td><span className="rule-allow">{rule.action}</span></td></>}</tr>)}</tbody></table></div>{selectedRuleData&&<div className="vm-console-rule-detail"><strong>{selectedRuleData.name}</strong><span>{selectedRuleData.detail}</span><small>{provider==="AWS"?"Security Group action: Allow":provider==="Azure"?"NSG action: "+selectedRuleData.action:"VPC firewall action: "+selectedRuleData.action}</small></div>}</div>:<><div className="vm-console-evidence">{consoleScreen.rows.map((r,i)=><div key={r.label+i}><span>{r.label}</span><strong className={r.status}>{r.value}</strong><i className={r.status}>{r.status==="good"?"✓":r.status==="bad"?"!":"•"}</i></div>)}</div><div className="vm-console-clue"><span>{step===1?"INVESTIGATION NOTE":"EVIDENCE NOTE"}</span><p>{consoleScreen.clue}</p></div></>}</div></div>
          <div className="vm-console-foot"><span>● Synthetic lab data · not connected to a cloud account</span><span>{provider} · {step+1}/{steps.length}</span></div>
        </div>
        <div className="vm-lab-investigate"><div className="vm-lab-question"><span className="vm-lab-section-label">YOUR TURN · VERIFY BEFORE CONTINUING</span><h3>{current.question}</h3><p>Select the conclusion best supported by the console evidence. Incorrect choices explain why and can be retried.</p></div><div className="vm-lab-choices">{current.choices.map((c,i)=><button key={c.label} className={selected===i?(c.correct?"correct":"incorrect"):""} onClick={()=>setAnswers(prev=>({...prev,[answerKey]:i}))}><span>{String.fromCharCode(65+i)}</span><strong>{c.label}</strong><i>{selected===i?(c.correct?"✓":"↻"):"→"}</i></button>)}</div>
          {selected!==undefined&&<div className={"vm-lab-feedback "+(current.choices[selected].correct?"correct":"incorrect")}><strong>{current.choices[selected].correct?"Evidence verified":"Not quite — inspect the console again"}</strong><p>{current.choices[selected].feedback}</p>{!current.choices[selected].correct&&<button onClick={()=>setAnswers(prev=>{const next={...prev};delete next[answerKey];return next;})}>Try again</button>}</div>}
          <div className="vm-lab-actions"><button className="vm-lab-command-toggle" onClick={()=>setShowCommand(v=>!v)}>{showCommand?"Hide CLI / diagnostic example":"Show CLI / diagnostic example"} <span>{showCommand?"−":"+"}</span></button>{showCommand&&<div className="vm-lab-terminal"><span>{provider} · EXAMPLE ONLY</span><pre>{current.command}{"\n\n"}{current.commandOutput}</pre><small>Illustrative commands and outputs only. Check your account, region, resource IDs, permissions, and change approval before using commands in a real environment.</small></div>}<button className="vm-lab-next" disabled={!passed} onClick={()=>{setShowCommand(false);if(step<steps.length-1){const next=step+1;setStep(next);setConsoleTab(next===1?"Inbound rules":next===2?(provider==="AWS"?"Routes":provider==="Azure"?"Effective routes":"Routes"):"Overview");setSelectedRule(null);}}}>{step===steps.length-1?"Investigation complete":"Verify and continue"} <span>→</span></button></div>
          {step===steps.length-1&&passed&&<div className="vm-lab-complete"><span>✓</span><div><strong>Investigation complete</strong><p>The simulated evidence supports a missing or conflicting inbound SSH rule—not a VM health or route failure. In production, submit the narrowest approved change, validate reachability from the expected source, confirm successful SSH authentication, and check host/network logs. No changes were made in this lab.</p><button onClick={reset}>Restart this lab</button></div></div>}
        </div>
      </div>
    </section>
  </main>;
}