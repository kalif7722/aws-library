"use client";

import { useEffect, useMemo, useState } from "react";
import type { AzureCourse, AzureCourseService, AzureCourseScope } from "../azure-course-data";
import { azureOfficialExamDomains, type AzureExamDomain } from "../azure-exam-objectives";
import "./AzureCourseTaskWalkthrough.css";

const r2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";
const slugify = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/formerly azure ad/g, "entra id").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const courseFolder = (code: string) => code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const taskFilenameAliases: Record<string, string> = {
  "API Management": "api-management", "App Service": "app-service", "Event Hubs": "event-hubs", "Logic Apps": "logic-apps",
  "Service Bus": "service-bus", "Microsoft Entra ID (formerly Azure AD)": "microsoft-entra-id",
  "Microsoft Entra External ID": "microsoft-entra-external-id", "Azure Database for PostgreSQL": "azure-database-for-postgresql",
  "Azure Database for PostgreSQL Flexible Server": "azure-database-for-postgresql-flexible-server",
};

const objectiveAssetAliases: Record<string, string> = {
  "Describe Microsoft Entra Conditional Access": "microsoft-entra-id",
  "Describe Microsoft Entra roles and role-based access control (RBAC)": "microsoft-entra-id",
  "Describe access reviews": "microsoft-entra-id",
  "Describe the capabilities of Microsoft Entra Privileged Identity Management": "microsoft-entra-id",
  "Describe Microsoft Entra ID Protection": "microsoft-entra-id",
  "Describe Azure Key Vault": "azure-key-vault",
  "Describe Microsoft Defender for Cloud": "microsoft-defender-for-cloud",
  "Describe capabilities of Microsoft Sentinel": "microsoft-sentinel",
  "Describe the Microsoft Defender portal": "microsoft-defender-for-cloud",
  "Describe the Microsoft Purview portal": "microsoft-purview",
  "Describe Compliance Manager": "microsoft-purview",
  "Describe sensitivity labels and sensitivity label policies": "microsoft-purview",
  "Describe data loss prevention (DLP)": "microsoft-purview",
  "Describe eDiscovery solutions in Microsoft Purview": "microsoft-purview",
  "Describe audit solutions in Microsoft Purview": "microsoft-purview",
  "Investigate incidents by using agentic AI, including embedded Microsoft Security Copilot": "microsoft-security-copilot",
  "Investigate and remediate threats or compromised entities identified by Microsoft Purview": "microsoft-purview",
  "Investigate and remediate alerts and incidents identified by Microsoft Sentinel": "microsoft-sentinel",
  "Investigate and remediate alerts and incidents identified by Microsoft Defender for Cloud workload protections": "microsoft-defender-for-cloud",
  "Investigate and remediate compromised identities that are identified by Microsoft Entra ID": "microsoft-entra-id",
  "Create and configure Microsoft Sentinel playbooks": "logic-apps",
};

type Task = {
  name: string;
  slug: string;
  category: string;
  classification: string;
  ask: string;
  steps: string[];
  consolePath: string;
  verify: string;
  assetSlug?: string;
  serviceName?: string;
  mode?: "concept" | "console";
  visualTitle?: string;
  visualSummary?: string;
  visual?: ObjectiveVisualSpec;
};

type ObjectiveVisualSpec = {
  kind: "layers" | "split" | "flow" | "decision" | "cycle" | "tree" | "matrix" | "timeline" | "pipeline" | "hub";
  title: string;
  subtitle: string;
  nodes: string[];
  detail: string;
  cue: string;
};

const visual = (kind: ObjectiveVisualSpec["kind"], title: string, subtitle: string, nodes: string[], detail: string, cue: string): ObjectiveVisualSpec => ({ kind, title, subtitle, nodes, detail, cue });

type DomainBucket = { meta: { name: string; weight: string }; scopes: AzureCourseScope[]; tasks: Task[] };

const makeObjectiveTask = (task: string, group: string, domain: AzureExamDomain): Task => ({
  name: task,
  slug: slugify(task),
  category: group,
  classification: "Official objective",
  ask: task,
  consolePath: `${domain.name} → ${group}`,
  steps: [
    `Open the relevant Azure, Microsoft security, or management experience for ${group}.`,
    `Practice the objective: ${task}.`,
    "Review the resulting configuration, decision, alert, or evidence and record why it meets the requirement.",
  ],
  verify: "Explain the selected option, its scope, and the signal or result that proves the objective is complete.",
  assetSlug: objectiveAssetAliases[task],
});

const sc900ConsoleObjectives = new Set([
  "Describe Microsoft Entra Conditional Access",
  "Describe Microsoft Entra roles and role-based access control (RBAC)",
  "Describe access reviews",
  "Describe the capabilities of Microsoft Entra Privileged Identity Management",
  "Describe Microsoft Entra ID Protection",
  "Describe Azure Key Vault",
  "Describe Microsoft Defender for Cloud",
  "Describe capabilities of Microsoft Sentinel",
  "Describe the Microsoft Defender portal",
  "Describe the Microsoft Purview portal",
  "Describe Compliance Manager",
  "Describe sensitivity labels and sensitivity label policies",
  "Describe data loss prevention (DLP)",
  "Describe eDiscovery solutions in Microsoft Purview",
  "Describe audit solutions in Microsoft Purview",
]);

const sc900Visual = (task: string): ObjectiveVisualSpec => {
  const t = task.toLowerCase();
  if (t.includes("shared responsibility")) return visual("split", "Who secures what?", "The cloud contract has two owners", ["Microsoft: physical facilities\nmanaged platform\ncore infrastructure", "Customer: data\nidentities\nconfiguration\nendpoints"], "Responsibility moves as you select IaaS, PaaS, or SaaS. The customer always owns data and access decisions.", "Exam questions often test which control remains yours after moving up the service model.");
  if (t.includes("defense-in-depth")) return visual("layers", "A breach must cross several controls", "No single control is the whole defense", ["Data", "Application", "Compute", "Network", "Perimeter"], "Layer controls so a failure at the perimeter does not expose the data directly. Logging and identity cross every layer.", "Defense-in-depth is layered protection, not simply adding more firewalls.");
  if (t.includes("zero trust")) return visual("decision", "Never trust · always verify", "Every request is evaluated continuously", ["Request", "Verify identity + device", "Check least privilege", "Evaluate signal", "Allow / block / challenge"], "Zero Trust replaces an implicit network boundary with a repeated decision at the resource boundary.", "Remember the three pillars: verify explicitly, use least privilege, assume breach.");
  if (t.includes("encryption") || t.includes("hashing")) return visual("split", "Confidentiality and integrity are different", "Choose the primitive for the question", ["Encryption\nplaintext → ciphertext\nreversible with key", "Hashing\ninput → digest\none-way comparison"], "Encryption protects secrecy during storage or transit. Hashing detects change or stores a verifier; it is not a way to recover the original value.", "If the question asks to retrieve the original, think encryption—not hashing.");
  if (t.includes("governance, risk") || t.includes("grc")) return visual("hub", "GRC connects intent to evidence", "Policy becomes measurable control", ["Governance\nwhat must be done", "Risk\nwhat can go wrong", "Compliance\nprove the obligation", "Evidence\nlogs · reports · attestations"], "Governance sets direction, risk prioritizes exposure, and compliance checks evidence against a requirement. They reinforce one another.", "Separate the rule, the risk, the control owner, and the evidence.");
  if (t.includes("primary security perimeter")) return visual("hub", "Identity is the new perimeter", "Access follows the subject, not the network", ["Person", "Workload", "Device", "Data", "Policy"], "A user, workload, and device bring context to every access decision. Network location alone is not sufficient proof of trust.", "The perimeter moves to identity plus context around the requested resource.");
  if (t.includes("define authentication")) return visual("flow", "Authentication answers: who are you?", "Proof precedes access", ["Claim identity", "Present factor", "Validate proof", "Issue session"], "Authentication establishes a subject identity using something known, possessed, inherent, or trusted through a federation.", "Authentication is not permission; it happens before authorization.");
  if (t.includes("define authorization")) return visual("decision", "Authorization answers: what may you do?", "A valid identity still needs permission", ["Authenticated subject", "Requested action", "Resource scope", "Policy / role", "Permit or deny"], "Authorization evaluates the subject, action, resource, and policy. The same identity can be allowed for one resource and denied for another.", "Do not confuse a successful sign-in with access to the resource.");
  if (t.includes("identity providers")) return visual("hub", "One identity, many relying services", "The provider establishes identity claims", ["User", "Identity provider", "Token / claim", "Application", "Resource"], "An identity provider authenticates the subject and issues claims that a relying application can use instead of collecting a separate password.", "Know the provider, the relying party, and the claim carried between them.");
  if (t.includes("directory services")) return visual("tree", "A directory organizes identity objects", "Objects become searchable and governable", ["Directory", "Users · groups", "Devices · applications", "Attributes · relationships"], "Directory services provide a structured identity store and lookup layer. Active Directory concepts include objects, attributes, groups, and domain relationships.", "A directory is the organized identity data plane—not the same thing as authentication itself.");
  if (t.includes("federation")) return visual("flow", "Trust crosses a boundary", "The home provider authenticates; the service consumes trust", ["User at home tenant", "Redirect", "Home identity provider", "Signed assertion", "Target application"], "Federation avoids duplicating credentials by exchanging a trusted assertion between an identity provider and a relying party.", "Track where authentication occurs and who accepts the resulting assertion.");
  if (t === "describe microsoft entra id") return visual("hub", "Microsoft Entra ID is the cloud identity plane", "Identity objects, authentication, and access policies meet here", ["Identities", "Authentication", "Groups + roles", "Conditional Access", "Applications + resources"], "Entra ID stores identities, authenticates them, evaluates access conditions, and issues tokens for cloud applications and resources.", "Know Entra ID as the directory and identity control plane, not merely a user list.");
  if (t.includes("types of identities")) return visual("matrix", "Different identities need different controls", "Human and non-human access are not interchangeable", ["Human\nuser · guest", "Workload\nservice principal · managed identity", "Agent\nagent identity + delegated scope", "Device\nregistered / joined context"], "Identify the actor first. Then choose credentials, lifecycle, permissions, and monitoring appropriate to that actor.", "An agent identity must be governed like a workload, with explicit scope and traceability.");
  if (t.includes("hybrid identity")) return visual("pipeline", "One identity across on-premises and cloud", "Synchronization connects, but does not erase boundaries", ["Active Directory", "Connect / sync", "Microsoft Entra ID", "Cloud apps + Azure", "Lifecycle + monitoring"], "Hybrid identity synchronizes selected identity data and can extend authentication, while authority and operational dependencies remain important.", "Distinguish synchronization, authentication, and authorization in a hybrid design.");
  if (t.includes("authentication methods")) return visual("matrix", "Match the method to the risk", "Authentication strength is a design choice", ["Password", "FIDO2 / passkey", "Authenticator", "Certificate", "Temporary access pass"], "Methods differ in phishing resistance, recovery, user experience, and deployment requirements. Policies can require a stronger method for sensitive actions.", "The strongest method is not automatically the right answer; match method to scenario and policy.");
  if (t.includes("multifactor authentication")) return visual("flow", "MFA adds an independent proof", "A stolen password is not enough", ["Password", "+", "Second factor", "Risk / policy check", "Token"], "MFA combines independent evidence such as knowledge, possession, or inherence. It reduces—but does not eliminate—identity risk.", "Two passwords are not two factors; factors must come from independent categories.");
  if (t.includes("password protection")) return visual("decision", "Bad passwords are stopped before reuse", "Protection acts at creation and sign-in", ["New password", "Banned list + smart lockout", "User risk signal", "Allow / block / challenge"], "Password protection compares choices against banned patterns and can use smart lockout to slow guessing while preserving legitimate access.", "Separate password policy, protection, and lockout behavior.");
  if (t.includes("identity governance")) return visual("cycle", "Governance controls the identity lifecycle", "Access should expire or be reviewed", ["Join", "Request", "Approve", "Use", "Review / expire"], "Identity Governance applies lifecycle controls such as access packages, entitlement management, and reviews so access does not persist indefinitely.", "The exam focus is lifecycle and accountability, not simply creating a user.");
  if (t.includes("access reviews")) return visual("cycle", "Access reviews turn stale access into a decision", "A reviewer confirms who still needs access", ["Scope members", "Ask reviewer", "Review evidence", "Keep / remove", "Apply result"], "Reviews target group, application, or privileged access and produce an auditable decision rather than relying on permanent membership.", "Look for review scope, reviewer, recurrence, and what happens to denied access.");
  if (t.includes("privileged identity management")) return visual("timeline", "Privilege is temporary and justified", "JIT elevation reduces standing access", ["Eligible", "Request", "MFA + reason", "Time-limited role", "Expire + audit"], "PIM separates eligibility from activation. Approval, MFA, duration, and audit evidence constrain privileged operations.", "Eligible is not active; activation creates the temporary privilege window.");
  if (t.includes("id protection")) return visual("pipeline", "Risk signals drive identity protection", "Detection becomes remediation", ["Signals\nleak · travel · anomaly", "Risk detection", "Risk level", "Policy response", "User remediates"], "Identity Protection combines signals into user or sign-in risk and can trigger MFA, password reset, or blocking through policy.", "Connect the signal, risk state, policy action, and remediation evidence.");
  if (t.includes("ddos")) return visual("layers", "DDoS absorbs volumetric pressure", "Protect the service before the request reaches it", ["Internet traffic", "DDoS detection", "Scrubbing / mitigation", "Public endpoint", "Application"], "DDoS protection identifies abnormal volume and mitigates it close to the network edge so legitimate traffic can reach the workload.", "DDoS protection is not a replacement for WAF or application authorization.");
  if (t.includes("azure firewall")) return visual("pipeline", "Azure Firewall centralizes network inspection", "Routes are evaluated against policy", ["Source network", "Firewall policy", "DNAT / network / application rule", "Threat intelligence", "Destination"], "Firewall evaluates network and application traffic using ordered policy controls and can log the decision for investigation.", "Separate Azure Firewall from NSGs: centralized stateful inspection versus subnet/NIC filtering.");
  if (t.includes("web application firewall")) return visual("pipeline", "WAF understands HTTP", "Application attacks are filtered at the edge", ["Client", "Application Gateway / Front Door", "WAF rules", "Allow / block", "Web app"], "WAF inspects HTTP requests for common web exploits such as injection and cross-site scripting before they reach the application.", "WAF protects web traffic; it is not a generic network firewall.");
  if (t.includes("network segmentation")) return visual("tree", "A virtual network creates trust zones", "Subnets separate workloads and routes", ["Virtual network", "Web subnet", "App subnet", "Data subnet", "Controlled paths"], "Segmentation limits east-west movement and lets you apply different routes, NSGs, private endpoints, and inspection paths to each zone.", "The design goal is constrained communication, not merely multiple subnets.");
  if (t.includes("network security groups")) return visual("decision", "NSGs evaluate the five-tuple", "The first matching rule decides", ["Source", "Destination", "Port / protocol", "Priority", "Allow or deny"], "NSGs filter inbound and outbound traffic at subnet or NIC scope. Rule priority determines which matching rule wins.", "Always inspect direction, priority, source, destination, port, and protocol.");
  if (t.includes("azure bastion")) return visual("flow", "Bastion keeps RDP/SSH off the public internet", "The browser connects through Azure", ["Administrator browser", "Azure Bastion", "Private IP", "VM"], "Bastion provides managed browser-based access to a VM over its private IP, avoiding public IP exposure for administrative protocols.", "Bastion is the secure access path; it does not replace VM identity or OS hardening.");
  if (t.includes("key vault")) return visual("flow", "Applications retrieve secrets without embedding them", "Identity replaces hard-coded credentials", ["Application identity", "Managed identity token", "Key Vault access policy / RBAC", "Secret / key / certificate", "Application uses value"], "The workload authenticates with an identity, Key Vault authorizes the operation, and the secret remains outside source code and configuration files.", "Trace identity, authorization, secret object, and audit trail.");
  if (t.includes("defender for cloud")) return visual("cycle", "Defender for Cloud closes the posture loop", "Findings become prioritized actions", ["Connect resources", "Assess posture", "Prioritize recommendation", "Remediate", "Reassess"], "Defender for Cloud combines posture management and workload protection so teams can reduce exposure and validate improvement.", "CSPM is posture visibility; workload protection adds runtime protection for supported workloads.");
  if (t.includes("cspm")) return visual("matrix", "CSPM measures cloud posture", "Configuration evidence becomes a security score", ["Inventory", "Policy baseline", "Finding", "Risk priority", "Recommendation"], "CSPM continuously compares cloud resources with standards and policies, then presents actionable gaps rather than only raw alerts.", "CSPM focuses on posture and prevention, not only active threat detection.");
  if (t.includes("security policies") || t.includes("recommendations improve")) return visual("pipeline", "Policy turns expectation into measurable state", "Assignment → evaluation → evidence", ["Policy definition", "Assignment scope", "Resource evaluation", "Compliance state", "Remediation / exception"], "A policy defines the desired state, evaluates resources at a scope, and creates evidence that can drive remediation or an approved exception.", "Know the difference between a policy definition, assignment, compliance result, and remediation task.");
  if (t.includes("workload protection")) return visual("matrix", "Workload protection is specialized", "The control follows the workload", ["Servers\nEDR / hardening", "Containers\nimage + runtime", "Storage\ndata threats", "Databases\naccess + threat", "AI / services\nservice controls"], "Enhanced protections add workload-aware signals and controls beyond baseline posture assessment.", "Choose the protection by workload type and threat surface.");
  if (t.includes("siem") || t.includes("soar")) return visual("pipeline", "SIEM detects; SOAR orchestrates", "Signals become coordinated response", ["Logs + alerts", "Normalize / correlate", "Incident", "Playbook", "Response actions"], "SIEM centralizes and correlates security telemetry. SOAR automates repeatable response actions through playbooks and connectors.", "SIEM is detection and investigation; SOAR is orchestration and response.");
  if (t.includes("sentinel")) return visual("cycle", "Sentinel turns telemetry into incidents", "The analyst loop starts with connected data", ["Connect data", "Analytics rule", "Incident", "Investigate", "Hunt / respond"], "Microsoft Sentinel ingests data, detects patterns with analytics, groups evidence into incidents, and supports investigation and response.", "Follow data connector → rule → incident → investigation → response.");
  if (t.includes("defender xdr services")) return visual("hub", "Defender XDR connects attack signals", "One incident can span several planes", ["Endpoint", "Identity", "Email", "Cloud apps", "Unified incident"], "XDR correlates signals across Microsoft Defender services so analysts can see related entities and a broader attack chain.", "XDR is cross-domain correlation, not just another endpoint product.");
  if (t.includes("defender for office")) return visual("pipeline", "Protect the message before the user acts", "Email signals are inspected in stages", ["Message", "Anti-malware / anti-phishing", "Safe Links / Attachments", "User", "Incident / investigation"], "Defender for Office 365 combines message protection, link and attachment detonation, policy, and investigation capabilities.", "Differentiate mail-flow protection from endpoint or identity protection.");
  if (t.includes("defender for endpoint")) return visual("cycle", "Endpoint protection is continuous", "Prevent → detect → investigate → respond", ["Device telemetry", "Attack surface reduction", "Detection", "Investigation", "Contain / remediate"], "Defender for Endpoint combines prevention, endpoint detection and response, vulnerability visibility, and automated remediation.", "Endpoint protection includes both prevention policy and post-detection response.");
  if (t.includes("cloud apps")) return visual("hub", "Cloud Apps reveals SaaS control gaps", "Usage becomes governance evidence", ["Cloud discovery", "App risk", "Session / access policy", "Data control", "Alert"], "Defender for Cloud Apps discovers and governs cloud application use, including risky apps, sessions, and data movement.", "Think SaaS visibility and control, not Azure infrastructure posture.");
  if (t.includes("defender for identity")) return visual("pipeline", "Identity sensors expose lateral movement", "Directory signals become identity detections", ["Domain controller signals", "Identity analytics", "Suspicious behavior", "Investigation", "Remediation"], "Defender for Identity analyzes directory and authentication behavior to identify reconnaissance, credential theft, and lateral movement.", "The protected signal source is identity infrastructure, not the endpoint alone.");
  if (t.includes("vulnerability management")) return visual("cycle", "Prioritize weaknesses by exposure", "A list of CVEs is not a remediation plan", ["Discover software", "Assess vulnerability", "Prioritize exposure", "Remediate", "Verify"], "Vulnerability Management combines asset inventory, weakness severity, exposure context, and remediation recommendations.", "Severity alone is not priority; exposure and affected assets matter.");
  if (t.includes("threat intelligence")) return visual("hub", "Threat intelligence adds adversary context", "Indicators become meaningful when enriched", ["Indicator", "Threat actor", "Campaign", "Related devices", "Defender action"], "Defender TI connects indicators to actors, campaigns, and observed context so analysts can make a better decision.", "Intelligence explains who or what is behind a signal; it is not just a blocklist.");
  if (t.includes("service trust portal")) return visual("hub", "Trust evidence comes from the provider", "Compliance documentation is discoverable", ["Microsoft service", "Audit reports", "Certifications", "Privacy / security docs", "Customer evidence"], "The Service Trust Portal provides Microsoft compliance and trust documentation customers can use for assurance and assessments.", "Know where to obtain independent audit and compliance evidence for Microsoft services.");
  if (t.includes("privacy principles")) return visual("layers", "Privacy follows the data lifecycle", "Principles guide every handling decision", ["Collect", "Use", "Store", "Share", "Delete"], "Privacy principles shape purpose limitation, transparency, control, security, and responsible retention throughout the data lifecycle.", "Map the principle to the data action being described.");
  if (t.includes("purview portal")) return visual("hub", "Purview is the compliance control plane", "Solutions meet around data and risk", ["Information protection", "Data lifecycle", "Insider risk", "eDiscovery", "Audit"], "The Purview portal brings compliance, information protection, governance, and investigation capabilities into one control plane.", "Choose the Purview solution based on the question: classify, protect, retain, investigate, or audit.");
  if (t.includes("compliance manager")) return visual("cycle", "Compliance Manager turns requirements into actions", "Assessment → improvement → evidence", ["Regulation / template", "Assessment", "Improvement action", "Owner + evidence", "Score / review"], "Compliance Manager maps requirements to controls, assigns improvement actions, and tracks evidence and progress.", "It helps manage compliance; it does not certify the organization automatically.");
  if (t.includes("compliance score")) return visual("matrix", "A score is a prioritization signal", "Improvement actions show the path forward", ["Current posture", "Action value", "Implementation", "Evidence", "Updated score"], "Compliance score summarizes progress against improvement actions. It supports prioritization but is not proof of compliance by itself.", "Score is an indicator; evidence and control effectiveness still matter.");
  if (t.includes("data classification")) return visual("pipeline", "Classification gives data a label", "Discover → classify → protect", ["Data source", "Scan / inspect", "Sensitive info type", "Label", "Policy action"], "Classification identifies sensitive data and creates the signal that labels, DLP, retention, or investigation policies can use.", "Classification is the detection layer; protection is the policy action built on it.");
  if (t.includes("content explorer") || t.includes("activity explorer")) return visual("decision", "Explorers answer different questions", "Content explains what; activity explains who did what", ["Select data scope", "Content explorer\nwhat is present", "Activity explorer\nwhat happened", "Filter evidence", "Investigate"], "Content Explorer shows classified content. Activity Explorer shows actions and events associated with that data.", "Use content for inventory and activity for behavior/evidence.");
  if (t.includes("sensitivity labels")) return visual("pipeline", "Labels travel with the data", "Classification drives protection", ["User / auto-label", "Sensitivity label", "Encryption / markings", "Policy enforcement", "Protected sharing"], "Sensitivity labels classify and can protect content with encryption, markings, and access controls that follow the file or message.", "A label is more than a visual tag when protection settings are attached.");
  if (t.includes("data loss prevention")) return visual("decision", "DLP evaluates data movement", "The same data can be safe in one context and risky in another", ["Sensitive data", "Location / channel", "User + action", "DLP policy", "Allow / warn / block"], "DLP evaluates sensitive information, location, user action, and policy conditions before applying a response.", "DLP is context-aware data movement control, not only discovery.");
  if (t.includes("records management")) return visual("timeline", "A record has a declared lifecycle", "Keep the evidence, then dispose correctly", ["Declare record", "Retention period", "Disposition review", "Dispose / extend", "Audit trail"], "Records management applies retention and disposition rules to business records with accountability and evidence.", "Retention is not deletion on day one; disposition and review are part of the lifecycle.");
  if (t.includes("retention policies")) return visual("timeline", "Retention controls time, not just location", "Keep, retain, and dispose are separate decisions", ["Create content", "Retention label / policy", "Retain or delete", "Exception / record", "Disposition"], "Retention policies and labels govern how long content is kept and what happens when the period ends, across supported locations.", "Distinguish a policy, a label, a label policy, and the final disposition action.");
  if (t.includes("insider risk")) return visual("pipeline", "Insider risk requires signals plus context", "Risk becomes a protected case", ["User activity", "Risk indicators", "Policy threshold", "Investigation case", "Remediation"], "Insider Risk Management uses signals and policy indicators to help authorized analysts investigate risky behavior while protecting privacy.", "Look for privacy controls, role separation, indicators, and case workflow.");
  if (t.includes("ediscovery")) return visual("pipeline", "eDiscovery follows a legal investigation", "Preserve → collect → review → export", ["Case", "Hold data", "Search / collect", "Review", "Export evidence"], "eDiscovery manages legal cases, preserves relevant content, searches across sources, reviews results, and exports evidence.", "Legal hold and case scope come before collection and review.");
  if (t.includes("audit solutions")) return visual("flow", "Audit answers: what happened?", "Searchable activity becomes evidence", ["User / workload action", "Audit record", "Search + filter", "Retention", "Investigation report"], "Audit solutions record activity and allow authorized users to search, retain, and investigate events across Microsoft services.", "Know the actor, action, timestamp, target, and retention of the audit record.");
  return visual("flow", task, "Understand the service relationship before memorizing the name", ["Capability", "Control boundary", "Cloud scenario", "Result"], `Connect ${task.toLowerCase()} to the control it provides, the boundary where it operates, and the evidence that proves the expected result.`, "State the capability, scope, and reason it is the correct exam answer.");
};

const sc900TaskGuidance = (task: string): Pick<Task, "ask" | "steps" | "verify" | "mode" | "visualTitle" | "visualSummary" | "visual"> => {
  const console = sc900ConsoleObjectives.has(task);
  const lower = task.toLowerCase();
  if (console) {
    const product = lower.includes("entra") ? "the Microsoft Entra admin center" : lower.includes("sentinel") || lower.includes("defender") ? "the Microsoft security portal" : "the Microsoft Purview portal";
    return {
      mode: "console",
      ask: `Recognize the ${task.replace(/^Describe /, "")} capability, where it is configured, and what evidence proves it is working.`,
      steps: [
        `Open ${product} and locate the blade that represents ${task.replace(/^Describe /, "").toLowerCase()}.`,
        "Inspect the scope, policy, role, rule, incident, label, or evidence involved and identify the security or compliance decision it controls.",
        "Review the resulting status, recommendation, activity, report, or audit evidence and explain the operational trade-off."
      ],
      verify: `Explain what ${task.replace(/^Describe /, "").toLowerCase()} protects or governs, its scope, and the evidence an administrator should verify.`,
      visualTitle: task,
      visualSummary: `Portal orientation: locate the control, inspect its scope and configuration, then verify the resulting security or compliance signal.`
    };
  }
  let lens = "definition, purpose, boundaries, and a practical example";
  if (lower.includes("authentication") || lower.includes("authorization") || lower.includes("identity")) lens = "who the subject is, how trust is established, what access is granted, and where the control belongs";
  if (lower.includes("zero trust") || lower.includes("defense") || lower.includes("shared responsibility")) lens = "the control layers, the customer/provider boundary, and how the model changes a design decision";
  if (lower.includes("encryption") || lower.includes("hashing")) lens = "confidentiality versus integrity, reversibility, key handling, and the correct use case";
  if (lower.includes("compliance") || lower.includes("privacy") || lower.includes("governance")) lens = "the obligation, control owner, evidence, risk treatment, and accountability boundary";
  if (lower.includes("defender") || lower.includes("purview") || lower.includes("sentinel") || lower.includes("security")) lens = "the signal or data source, the protection capability, the analyst or compliance action, and the expected outcome";
  return {
    mode: "concept",
    ask: `Learn ${task.replace(/^Describe /, "").toLowerCase()} through ${lens}; connect the definition to an exam scenario rather than memorizing a product name.`,
    steps: [
      `Define ${task.replace(/^Describe /, "").toLowerCase()} in one sentence and identify the problem it solves.`,
      `Place it in the correct boundary: ${lens}.`,
      "Compare it with the closest alternative and choose it for one realistic Microsoft cloud scenario."
    ],
    verify: `You can define ${task.replace(/^Describe /, "").toLowerCase()}, identify its boundary, choose it in a scenario, and explain why the closest alternative is different.`,
    visualTitle: task,
    visualSummary: `Objective-specific visual explainer for ${task.replace(/^Describe /, "").toLowerCase()}.`,
    visual: sc900Visual(task)
  };
};

const makeSc900ObjectiveTask = (task: string, group: string, domain: AzureExamDomain): Task => ({
  ...makeObjectiveTask(task, group, domain),
  ...sc900TaskGuidance(task),
});

const makeServiceTask = (entry: AzureCourseService, category: AzureCourseScope): Task => ({
  name: entry.name,
  slug: slugify(entry.name),
  category: category.title,
  classification: entry.classification,
  ask: `Understand where ${entry.name} fits in the ${category.title} scope and configure the portal setting shown in the walkthrough.`,
  consolePath: `Azure portal → ${entry.name} → review the ${category.title.toLowerCase()} setting`,
  steps: [`Open the Azure portal and locate ${entry.name}.`, `Open the target resource or configuration blade and apply the ${category.title.toLowerCase()} choice shown in the walkthrough.`, "Review the summary, save the change when required, and inspect the resulting state."],
  verify: `Confirm the expected ${category.title.toLowerCase()} outcome in the overview, activity log, or monitoring view.`,
  serviceName: entry.name,
});

const imageCandidates = (courseCode: string, task: Task) => {
  const filename = task.assetSlug || taskFilenameAliases[task.name] || task.slug;
  const folder = courseFolder(courseCode);
  const legacyFolder = `${courseCode.toLowerCase()}-tasks`;
  return [`${r2Base}/${folder}/${filename}.webp`, `${r2Base}/common/${task.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${filename}.webp`, `${r2Base}/${legacyFolder}/${filename}.webp`, `${r2Base}/${legacyFolder}/${filename}.png`, `${r2Base}/${legacyFolder}/${filename}/walkthrough.webp`];
};

function ConsoleImage({ courseCode, task }: { courseCode: string; task: Task }) {
  const sources = useMemo(() => imageCandidates(courseCode, task), [courseCode, task]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [available, setAvailable] = useState(true);
  useEffect(() => { setSourceIndex(0); setAvailable(true); setExpanded(false); }, [task.slug]);
  if (!available) return <div className="course-task-image-fallback"><strong>Console walkthrough pending</strong><span>Upload <code>{task.assetSlug || taskFilenameAliases[task.name] || task.slug}.webp</code> to <code>azure-certification-walkthroughs/{courseFolder(courseCode)}/</code>.</span></div>;
  const src = sources[sourceIndex];
  return <><button className="course-task-image-button" onClick={() => setExpanded(true)} aria-label={`Open ${task.name} console walkthrough full screen`}><img src={src} alt={`${task.name} Azure console walkthrough`} onError={() => sourceIndex < sources.length - 1 ? setSourceIndex((index) => index + 1) : setAvailable(false)} /><span>Open console walkthrough full screen ↗</span></button>{expanded && <div className="course-task-image-modal" role="dialog" aria-modal="true" onClick={() => setExpanded(false)}><button onClick={() => setExpanded(false)}>Close ×</button><img src={src} alt={`${task.name} Azure console walkthrough full view`} onClick={(event) => event.stopPropagation()} /></div>}</>;
}

function ObjectiveVisual({ task }: { task: Task }) {
  if (task.mode === "console") return <ConsoleImage courseCode="SC-900" task={task} />;
  const spec = task.visual || sc900Visual(task.name);
  return <div className="course-task-concept-visual" role="img" aria-label={`${task.name} concept visual`}>
    <div className="concept-visual-kicker">OBJECTIVE VISUAL · {spec.kind.toUpperCase()}</div>
    <h4>{spec.title}</h4>
    <p className="concept-visual-subtitle">{spec.subtitle}</p>
    <div className={`concept-visual-diagram diagram-${spec.kind}`}>{spec.nodes.map((node, index) => <span key={`${node}-${index}`}>{node}</span>)}</div>
    <div className="concept-visual-detail"><b>HOW IT WORKS</b><p>{spec.detail}</p></div>
    <div className="concept-visual-cue"><b>EXAM CUE</b><p>{spec.cue}</p></div>
  </div>;
}

export default function AzureCourseTaskWalkthrough({ course }: { course: AzureCourse }) {
  const scopes = course.scope;
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const official = azureOfficialExamDomains[course.code];
  const domainBuckets = useMemo<DomainBucket[]>(() => official
    ? official.map((domain) => ({ meta: domain, scopes: [], tasks: domain.groups.flatMap((group) => group.tasks.map((task) => course.code === "SC-900" ? makeSc900ObjectiveTask(task, group.name, domain) : makeObjectiveTask(task, group.name, domain))) }))
    : scopes.map((scope) => ({ meta: { name: scope.title, weight: "Exam scope" }, scopes: [scope], tasks: scope.services.map((entry) => makeServiceTask(entry, scope)) })), [course.code, official, scopes]);
  const activeBucket = domainBuckets[domainIndex] || domainBuckets[0];
  const activeMeta = activeBucket?.meta || { name: "Exam domain", weight: "Exam scope" };
  const tasks = activeBucket?.tasks || [];
  const activeTask = tasks[taskIndex] || tasks[0];
  useEffect(() => setTaskIndex(0), [domainIndex]);
  if (!activeBucket || !activeTask) return null;
  const totalObjectives = domainBuckets.reduce((total, bucket) => total + bucket.tasks.length, 0);
  return <section className="course-task-guide" id="console-walkthroughs"><div className="course-task-guide-head"><div><p>{course.code === "SC-900" ? "EXAM OBJECTIVE PRACTICE · SC-900" : `CONSOLE PRACTICE LAB · ${course.code}`}</p><h2>Follow every official exam objective</h2><span>Choose a weighted domain, then select the exact Microsoft objective to study its ask, practice path, visual treatment, steps, and verification.</span></div><div className="course-task-guide-badge"><strong>{domainBuckets.length}</strong><span>exam domains</span><strong>{totalObjectives}</strong><span>official objectives</span></div></div><div className="course-domain-tabs" role="tablist" aria-label={`${course.code} exam domains`}>{domainBuckets.map((bucket, index) => <button key={`${bucket.meta.name}-${index}`} className={index === domainIndex ? "is-selected" : ""} onClick={() => setDomainIndex(index)} role="tab" aria-selected={index === domainIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{bucket.meta.name}</span><small>{bucket.meta.weight}</small><em>{bucket.tasks.length} objectives</em></button>)}</div><div className="course-task-panel"><div className="course-task-tabs" role="tablist" aria-label={`${activeMeta.name} objectives`}>{tasks.map((task, index) => <button key={task.slug} className={index === taskIndex ? "is-selected" : ""} onClick={() => setTaskIndex(index)} role="tab" aria-selected={index === taskIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{task.name}</span></button>)}</div><article className="course-task-selected"><header><div><p>{activeMeta.name} · {activeMeta.weight} · {activeTask.classification}</p><h3>{activeTask.name}</h3><span>{activeTask.consolePath}</span></div>{activeTask.serviceName && <a href={`/azure-services?service=${encodeURIComponent(slugify(activeTask.serviceName))}`}>Open service page ↗</a>}</header><div className="course-task-ask"><b>WHAT THIS OBJECTIVE ASKS</b><span>{activeTask.ask}</span></div><div className="course-task-selected-grid"><div><p className="course-task-label">{activeTask.mode === "concept" ? "VISUAL EXPLAINER" : "CONSOLE WALKTHROUGH"}</p><ObjectiveVisual task={activeTask} /></div><div className="course-task-instructions"><p className="course-task-label">FOLLOW THESE ACTIONS</p><ol>{activeTask.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="course-task-verify"><b>VERIFY</b><span>{activeTask.verify}</span></div></div></div></article></div></section>;
}
