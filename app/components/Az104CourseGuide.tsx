import { useState, type CSSProperties } from "react";
import "./Az104CourseGuide.css";

type Lesson = {
  title: string;
  topics: string[];
  visual: string;
  services: { label: string; slug: string }[];
  tasks?: Task[];
};

type Task = {
  title: string;
  service: { label: string; slug: string };
  steps: string[];
  consolePath?: string;
  verify?: string;
  examCue: string;
};

type Domain = {
  number: string;
  title: string;
  weight: string;
  accent: string;
  outcome: string;
  flow: string[];
  lessons: Lesson[];
  examHook: string;
};

const identityTasks: Task[] = [
  { title: "Create users and groups", service: { label: "Microsoft Entra ID", slug: "microsoft-entra-id" }, steps: ["Open Entra ID → Users or Groups.", "Create the identity and set the required properties.", "Assign group membership and verify the resulting object."], examCue: "Know when a group assignment is inherited and when a user has a direct assignment." },
  { title: "Manage user and group properties", service: { label: "Microsoft Entra ID", slug: "microsoft-entra-id" }, steps: ["Open the user or group overview.", "Change properties such as ownership, membership, usage location, or group type.", "Re-check licenses and access after the change."], examCue: "A property change can affect licensing, membership, or access without changing an Azure RBAC role." },
  { title: "Manage Microsoft Entra licenses", service: { label: "Microsoft Entra ID", slug: "microsoft-entra-id" }, steps: ["Select the license and assignment method.", "Assign directly or through a group.", "Review assignment state and resolve conflicts or usage-location requirements."], examCue: "Group-based licensing is different from assigning a license to one user." },
  { title: "Manage external users", service: { label: "Microsoft Entra ID", slug: "microsoft-entra-id" }, steps: ["Invite the external identity to the tenant.", "Set the required invitation and directory properties.", "Grant only the resource access required for collaboration."], examCue: "An external identity is still governed by tenant policies and resource-scope permissions." },
  { title: "Configure self-service password reset", service: { label: "Microsoft Entra ID", slug: "microsoft-entra-id" }, steps: ["Enable SSPR for the selected users or group.", "Configure authentication methods and registration requirements.", "Test the reset flow and review audit evidence."], examCue: "Separate who is enabled for SSPR from which authentication methods are allowed." },
  { title: "Use built-in Azure roles", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Identify the required action rather than the product name.", "Choose the least-privileged built-in role.", "Confirm the role does not grant unrelated control-plane actions."], examCue: "Owner, Contributor, and Reader differ mainly by management permissions; data-plane access may need separate roles." },
  { title: "Assign roles at different scopes", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Select the principal and role.", "Choose management group, subscription, resource group, or resource scope.", "Review inherited access before creating another assignment."], examCue: "A higher-scope assignment flows down; a lower-scope assignment cannot grant access above its scope." },
  { title: "Interpret access assignments", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Open Access control (IAM) and inspect role assignments.", "Trace direct, group, inherited, and deny assignments.", "Compare effective access with the task the identity must perform."], examCue: "Do not assume a visible role assignment is the only path to effective access." },
  { title: "Manage resource groups and subscriptions", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Create the management boundary and name it consistently.", "Place resources with a shared lifecycle together.", "Move or delete resources only after checking dependencies and locks."], examCue: "Resource groups are lifecycle boundaries; subscriptions are billing, quota, and isolation boundaries." },
  { title: "Configure management groups", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Create the management-group hierarchy.", "Place subscriptions under the correct group.", "Apply governance at the highest safe scope and verify inheritance."], examCue: "Management groups organize subscriptions and allow policy/RBAC inheritance across them." },
  { title: "Create and interpret Azure Policy assignments", service: { label: "Azure Policy", slug: "azure-policy" }, steps: ["Choose a built-in definition or create a policy initiative.", "Assign it at the required scope with parameters.", "Review compliance results and remediation behavior."], examCue: "Policy evaluates resource state; it is not the same as a user permission or a network firewall." },
  { title: "Configure resource locks", service: { label: "Azure Resource Manager", slug: "azure-resource-manager" }, steps: ["Choose ReadOnly or CanNotDelete.", "Apply the lock at the narrowest safe scope.", "Test the management operation and remove the lock only through an approved change."], examCue: "A lock can block deletion or updates even when the user has a powerful RBAC role." },
  { title: "Apply and manage resource tags", service: { label: "Azure Policy", slug: "azure-policy" }, steps: ["Define a consistent tag schema.", "Apply tags to resources or resource groups.", "Use policy to require, inherit, or remediate tags."], examCue: "Tags support organization and cost reporting; they do not provide authorization." },
  { title: "Manage cost alerts and budgets", service: { label: "Microsoft Cost Management", slug: "microsoft-cost-management" }, steps: ["Choose the billing scope and budget period.", "Set thresholds and notification recipients.", "Review actual versus forecast cost and connect the result to action."], examCue: "A budget or alert helps detect spend; it does not automatically stop every resource." },
  { title: "Use Azure Advisor recommendations", service: { label: "Azure Advisor", slug: "azure-advisor" }, steps: ["Filter recommendations by category and subscription.", "Validate the recommendation against workload requirements.", "Apply, defer, or dismiss it with an auditable reason."], examCue: "Advisor recommends improvements; it does not replace architecture, security, or change review." },
];

const consoleTaskGuidance: Record<string, Pick<Task, "consolePath" | "verify">> = {
  "Create users and groups": { consolePath: "Azure portal → Microsoft Entra ID → Users / Groups", verify: "The user or group appears in the directory with the expected type, owner, and membership." },
  "Manage user and group properties": { consolePath: "Azure portal → Microsoft Entra ID → Users or Groups → select object → Properties / Members", verify: "The changed property is visible and downstream membership, ownership, or access reflects the change." },
  "Manage Microsoft Entra licenses": { consolePath: "Azure portal → Microsoft Entra ID → Billing → Licenses → All products", verify: "The license shows a successful assignment for the user or group and no usage-location or conflict error." },
  "Manage external users": { consolePath: "Azure portal → Microsoft Entra ID → Users → New user → Invite external user", verify: "The guest appears with User type = Guest and the invitation/access path is recorded." },
  "Configure self-service password reset": { consolePath: "Azure portal → Microsoft Entra ID → Password reset → Properties / Authentication methods / Registration", verify: "The selected scope and authentication methods are enabled, then the reset flow completes for a test account." },
  "Use built-in Azure roles": { consolePath: "Azure portal → target scope → Access control (IAM) → Add → Add role assignment", verify: "The selected built-in role exposes the required action while avoiding unnecessary Owner or Contributor permissions." },
  "Assign roles at different scopes": { consolePath: "Azure portal → Management groups / Subscriptions / Resource groups / Resource → Access control (IAM)", verify: "The assignment appears at the intended scope and inherited access is visible at child resources." },
  "Interpret access assignments": { consolePath: "Azure portal → target resource → Access control (IAM) → Check access / Role assignments", verify: "Direct, group, inherited, and deny assignments are distinguished before changing permissions." },
  "Manage resource groups and subscriptions": { consolePath: "Azure portal → Resource groups / Subscriptions → Create or select boundary", verify: "Resources are grouped by lifecycle and the subscription, locks, quotas, and dependencies are confirmed before move/delete." },
  "Configure management groups": { consolePath: "Azure portal → Management groups → Create / move subscriptions", verify: "Subscriptions sit under the intended hierarchy and governance inheritance reaches the expected subscription." },
  "Create and interpret Azure Policy assignments": { consolePath: "Azure portal → Policy → Definitions / Assignments / Compliance", verify: "The assignment has the intended scope and parameters, and compliance or remediation results are understandable." },
  "Configure resource locks": { consolePath: "Azure portal → target scope → Settings → Locks → Add", verify: "ReadOnly or CanNotDelete blocks only the tested operation at the intended scope." },
  "Apply and manage resource tags": { consolePath: "Azure portal → target resource or resource group → Tags", verify: "Required key/value tags are present and policy remediation reports the expected compliance state." },
  "Manage cost alerts and budgets": { consolePath: "Azure portal → Cost Management → Budgets → Add", verify: "The budget scope, period, thresholds, and notification recipients are saved and the forecast/actual view is available." },
  "Use Azure Advisor recommendations": { consolePath: "Azure portal → Advisor → Recommendations → filter by subscription/category", verify: "The recommendation is applied, deferred, or dismissed with a reason and the updated recommendation state is visible." },
};

const consoleTasks = identityTasks.map((task) => ({ ...task, ...consoleTaskGuidance[task.title] }));

const domains: Domain[] = [
  {
    number: "01",
    title: "Manage identities and governance",
    weight: "20–25%",
    accent: "#8b5cf6",
    outcome: "Build the control plane first: who can act, what they can change, and how Azure keeps the environment compliant.",
    flow: ["Entra identity", "RBAC scope", "Policy + locks", "Cost guardrails"],
    examHook: "Separate authentication from authorization, then evaluate the scope where the role, policy, tag, lock, or budget is applied.",
    lessons: [
      { title: "01 · Users, groups, licenses, and external identities", topics: ["Create users and groups", "Manage user and group properties", "Assign and manage Microsoft Entra licenses", "Manage external users", "Configure self-service password reset (SSPR)"], visual: "Identity lifecycle", services: [{ label: "Microsoft Entra ID", slug: "microsoft-entra-id-formerly-azure-ad" }], tasks: consoleTasks.slice(0, 5) },
      { title: "02 · Azure RBAC and access scope", topics: ["Use built-in Azure roles", "Assign roles at management-group, subscription, resource-group, and resource scopes", "Interpret inherited and direct access assignments", "Distinguish Entra roles from Azure resource roles"], visual: "Scope inheritance", services: [{ label: "Microsoft Entra ID", slug: "microsoft-entra-id-formerly-azure-ad" }, { label: "Azure Resource Manager", slug: "azure-resource-manager" }], tasks: consoleTasks.slice(5, 8) },
      { title: "03 · Subscriptions, policy, locks, tags, and cost", topics: ["Manage resource groups and subscriptions", "Configure management groups", "Apply tags and resource locks", "Create and interpret Azure Policy assignments", "Use cost alerts, budgets, and Azure Advisor recommendations"], visual: "Governance hierarchy", services: [{ label: "Azure Policy", slug: "azure-policy" }, { label: "Azure Advisor", slug: "azure-advisor" }, { label: "Microsoft Cost Management", slug: "microsoft-cost-management" }], tasks: consoleTasks.slice(8) },
    ],
  },
  {
    number: "02",
    title: "Implement and manage storage",
    weight: "15–20%",
    accent: "#f59e0b",
    outcome: "Choose the right storage boundary, secure access without overexposure, and protect data against deletion, corruption, and regional failure.",
    flow: ["Account", "Access", "Blob / Files", "Lifecycle + recovery"],
    examHook: "Know the difference between keys, SAS, Entra authorization, firewall rules, redundancy, access tiers, and data-protection features.",
    lessons: [
      { title: "01 · Storage access and network protection", topics: ["Configure storage firewalls and virtual networks", "Create and use SAS tokens", "Configure stored access policies", "Manage access keys", "Configure identity-based access for Azure Files"], visual: "Layered storage access", services: [{ label: "Storage accounts", slug: "storage-accounts" }, { label: "Azure Files", slug: "azure-files" }] },
      { title: "02 · Storage accounts and data movement", topics: ["Create and configure storage accounts", "Select redundancy options", "Configure object replication", "Configure encryption", "Move and manage data with Storage Explorer and AzCopy"], visual: "Durability choices", services: [{ label: "Storage accounts", slug: "storage-accounts" }, { label: "Azure Blob Storage", slug: "azure-blob-storage" }] },
      { title: "03 · Azure Files and Blob Storage", topics: ["Create and configure file shares", "Create and configure blob containers", "Configure storage tiers", "Configure blob and container soft delete", "Configure Azure Files snapshots and soft delete", "Configure lifecycle management and blob versioning"], visual: "Hot-to-archive lifecycle", services: [{ label: "Azure Files", slug: "azure-files" }, { label: "Azure Blob Storage", slug: "azure-blob-storage" }] },
    ],
  },
  {
    number: "03",
    title: "Deploy and manage compute resources",
    weight: "20–25%",
    accent: "#06b6d4",
    outcome: "Automate repeatable infrastructure, select the right compute shape, and operate VMs, containers, and App Service safely.",
    flow: ["Bicep / ARM", "Compute", "Scale", "Release safely"],
    examHook: "Compare availability sets, availability zones, scale sets, containers, and App Service by operational boundary—not by product name alone.",
    lessons: [
      { title: "01 · ARM templates and Bicep", topics: ["Interpret an ARM template or Bicep file", "Modify existing infrastructure definitions", "Deploy resources with ARM or Bicep", "Export a deployment as ARM", "Convert an ARM template to Bicep"], visual: "Desired state to resources", services: [{ label: "Azure Resource Manager", slug: "azure-resource-manager" }] },
      { title: "02 · Virtual machines and scale sets", topics: ["Create and size virtual machines", "Configure encryption at host", "Move a VM across resource groups, subscriptions, or regions", "Manage disks and VM sizes", "Use availability zones and availability sets", "Deploy and configure VM Scale Sets"], visual: "Highly available compute", services: [{ label: "Virtual Machines", slug: "virtual-machines" }, { label: "Virtual Machine Scale Sets", slug: "virtual-machine-scale-sets" }] },
      { title: "03 · Containers in Azure", topics: ["Create and manage an Azure Container Registry", "Provision Azure Container Instances", "Provision Azure Container Apps", "Choose sizing and scaling behavior for ACI and Container Apps"], visual: "Image to running container", services: [{ label: "Azure Container Registry", slug: "azure-container-registry" }, { label: "Azure Container Instances", slug: "azure-container-instances" }, { label: "Azure Container Apps", slug: "azure-container-apps" }] },
      { title: "04 · App Service operations", topics: ["Provision an App Service plan and app", "Configure plan scaling", "Configure certificates, TLS, and custom DNS", "Configure backup and networking", "Use deployment slots for safer releases"], visual: "Slot-based deployment", services: [{ label: "App Service", slug: "app-service" }] },
    ],
  },
  {
    number: "04",
    title: "Implement and manage virtual networking",
    weight: "15–20%",
    accent: "#10b981",
    outcome: "Make traffic flow predictable: design address spaces, control paths, secure PaaS access, resolve names, and balance workloads.",
    flow: ["VNet + subnet", "Routes", "Security", "DNS + balance"],
    examHook: "Read the path in order: address space → route → NSG rule → service endpoint/private endpoint → name resolution → load-balancing decision.",
    lessons: [
      { title: "01 · VNets, subnets, peering, and routes", topics: ["Create and configure VNets and subnets", "Create virtual network peering", "Configure public IP addresses", "Configure user-defined routes", "Troubleshoot network connectivity"], visual: "Regional network foundation", services: [{ label: "Azure Virtual Network", slug: "azure-virtual-network" }, { label: "Azure VPN Gateway", slug: "azure-vpn-gateway" }] },
      { title: "02 · Secure access to VNets and PaaS", topics: ["Create NSGs and application security groups", "Evaluate effective NSG rules", "Implement Azure Bastion", "Configure service endpoints", "Configure private endpoints"], visual: "Private PaaS access", services: [{ label: "Azure Bastion", slug: "azure-bastion" }, { label: "Azure Key Vault", slug: "azure-key-vault" }] },
      { title: "03 · DNS and load balancing", topics: ["Configure Azure DNS", "Configure an internal load balancer", "Configure a public load balancer", "Troubleshoot load-balancing behavior"], visual: "Name to healthy backend", services: [{ label: "Azure DNS", slug: "azure-dns" }, { label: "Azure Load Balancer", slug: "azure-load-balancer" }, { label: "Azure Application Gateway", slug: "azure-application-gateway" }] },
    ],
  },
  {
    number: "05",
    title: "Monitor and maintain Azure resources",
    weight: "10–15%",
    accent: "#ef4444",
    outcome: "Turn telemetry into action, then recover services and data with tested backup and disaster-recovery procedures.",
    flow: ["Metrics + logs", "Alerts", "Backup", "Failover"],
    examHook: "Monitoring is a loop: collect → query → alert → act → verify. Recovery is a process: protect → test restore → fail over → report.",
    lessons: [
      { title: "01 · Azure Monitor and operational signals", topics: ["Interpret Azure Monitor metrics", "Configure diagnostic log settings", "Query and analyze logs", "Configure alert rules, action groups, and alert-processing rules", "Use VM, storage, and network Insights", "Use Network Watcher and Connection Monitor"], visual: "Signal-to-action loop", services: [{ label: "Azure Monitor", slug: "azure-monitor" }, { label: "Azure Network Watcher", slug: "azure-network-watcher" }] },
      { title: "02 · Backup and restore", topics: ["Create a Recovery Services vault", "Create an Azure Backup vault", "Create and configure a backup policy", "Perform backup and restore operations", "Configure backup reports and alerts"], visual: "Protected recovery path", services: [{ label: "Azure Backup", slug: "azure-backup" }] },
      { title: "03 · Site Recovery and regional failover", topics: ["Configure Azure Site Recovery for Azure resources", "Perform a failover to a secondary region", "Interpret recovery reports and alerts", "Validate dependencies and recovery readiness"], visual: "Primary-to-secondary recovery", services: [{ label: "Azure Site Recovery", slug: "azure-site-recovery" }] },
    ],
  },
];

const taskService = (topic: string, services: { label: string; slug: string }[]) => {
  const normalized = topic.toLowerCase();
  const match = services.find((service) => normalized.includes(service.label.toLowerCase().replace(/^azure /, "")) || service.label.toLowerCase().includes(normalized.split(" ")[0]));
  return match || services[0];
};

const topicTask = (topic: string, services: { label: string; slug: string }[]): Task => {
  const service = taskService(topic, services);
  return {
    title: topic,
    service,
    steps: [`Open Azure portal → ${service.label}.`, `Configure the setting required for “${topic}”.`, "Review the result, effective configuration, and related monitoring or security controls."],
    consolePath: `Azure portal → ${service.label}`,
    verify: `The ${topic.toLowerCase()} configuration is visible and the expected operational result is confirmed.`,
    examCue: `Identify the service boundary, configuration choice, scope, and verification signal for ${topic.toLowerCase()}.`,
  };
};

const courseDomains = domains.map((domain) => ({
  ...domain,
  lessons: domain.lessons.map((lesson) => ({
    ...lesson,
    tasks: lesson.tasks?.length ? lesson.tasks : lesson.topics.map((topic) => topicTask(topic, lesson.services)),
  })),
}));

const studyLoop = ["Learn the boundary", "Open the EL10 visual", "Trace the architecture", "Follow the walkthrough", "Answer the exam cue"];
const azureTaskScreenshotBases = [
  "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs/az-104",
  "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs/az104-tasks",
  "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs",
];
const taskScreenshotFiles: Record<string, string> = {
  "Create users and groups": "create-users-and-groups",
  "Manage user and group properties": "manage-user-and-group-properties",
  "Manage Microsoft Entra licenses": "manage-microsoft-entra-licenses",
  "Manage external users": "manage-external-users",
  "Configure self-service password reset": "configure-self-service-password-reset",
  "Use built-in Azure roles": "use-built-in-azure-roles",
  "Assign roles at different scopes": "assign-roles-at-different-scopes",
  "Interpret access assignments": "interpret-access-assignments",
  "Manage resource groups and subscriptions": "manage-resource-groups-and-subscriptions",
  "Configure management groups": "configure-management-groups",
  "Create and interpret Azure Policy assignments": "create-and-interpret-azure-policy-assignments",
  "Configure resource locks": "configure-resource-locks",
  "Apply and manage resource tags": "apply-and-manage-resource-tags",
  "Manage cost alerts and budgets": "manage-cost-alerts-and-budgets",
  "Use Azure Advisor recommendations": "use-azure-advisor-recommendations",
};
const taskScreenshotUrls = (task: Task) => {
  const slug = taskScreenshotFiles[task.title] || task.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return azureTaskScreenshotBases.flatMap((base) => [`${base}/${slug}.webp`, `${base}/${slug}/walkthrough.webp`]);
};

function TaskWalkthroughImage({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const sources = taskScreenshotUrls(task);
  const src = failed ? undefined : sources[sourceIndex];
  const available = Boolean(src);
  return <div className="az104-task-image-walkthrough" aria-label={`${task.title} console screenshot walkthrough`}>
    <p>CONSOLE SCREENSHOT WALKTHROUGH</p>
    {available ? <button type="button" className="az104-task-image-button" onClick={() => setOpen(true)} aria-label={`Open ${task.title} console screenshot full view`}><img src={src} alt={`${task.title} Azure console walkthrough`} loading="lazy" onError={() => { if (sourceIndex < sources.length - 1) setSourceIndex((index) => index + 1); else setFailed(true); }} /><span>Open compact full-screen walkthrough ↗</span></button> : <div className="az104-task-image-fallback"><strong>Task-specific console screenshots will appear here</strong><span>Upload the matching WebP under <code>azure-certification-walkthroughs/az-104/</code> to show it here.</span></div>}
    {open && <div className="az104-task-image-modal" role="dialog" aria-modal="true" aria-label={`${task.title} console walkthrough full view`} onClick={() => setOpen(false)}><button type="button" onClick={() => setOpen(false)}>Close ×</button><img src={src} alt={`${task.title} Azure console walkthrough full view`} onClick={(event) => event.stopPropagation()} /></div>}
  </div>;
}

function TaskTabs({ tasks }: { tasks: Task[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const task = tasks[selectedIndex];
  return <div className="az104-task-tabs-shell">
    <div className="az104-task-tabs" role="tablist" aria-label="Certification task walkthroughs">{tasks.map((item, index) => <button type="button" role="tab" aria-selected={selectedIndex === index} className={selectedIndex === index ? "is-selected" : ""} key={item.title} onClick={() => setSelectedIndex(index)}><b>{String(index + 1).padStart(2, "0")}</b><span>{item.title}</span></button>)}</div>
    <div className="az104-task-selected" role="tabpanel">
      <div className="az104-task-selected-head"><div><p>SELECTED CONSOLE WALKTHROUGH</p><h5>{task.title}</h5><span>{task.service.label}</span></div><a href={`/azure-services?service=${task.service.slug}`}>Open service page ↗</a></div>
      <div className="az104-task-selected-body"><TaskWalkthroughImage task={task} /><div className="az104-task-selected-instructions"><p className="az104-task-path"><b>Portal path</b>{task.consolePath}</p><ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="az104-task-cue"><b>Exam cue</b>{task.examCue}</p><p className="az104-task-verify"><b>Verify</b>{task.verify}</p></div></div>
    </div>
  </div>;
}

export default function Az104CourseGuide() {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const selectedDomain = courseDomains[selectedDomainIndex] ?? courseDomains[0];
  return <section className="az104-guide" aria-labelledby="az104-guide-title">
    <div className="az104-guide-hero">
      <div className="az104-guide-hero-copy"><p className="az104-eyebrow">AZ-104 · VISUAL ADMINISTRATOR PATH</p><h2 id="az104-guide-title">Learn Azure administration as one connected environment.</h2><p>Move through identity, storage, compute, networking, and operations in the order an administrator actually designs and runs Azure. Every step connects the exam objective to a visual guide, architecture pattern, and practical walkthrough.</p><a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104" target="_blank" rel="noreferrer">Compare with the official Microsoft study guide ↗</a></div>
      <div className="az104-guide-stats"><div><strong>05</strong><span>exam domains</span></div><div><strong>100</strong><span>minutes</span></div><div><strong>700+</strong><span>passing score</span></div></div>
    </div>
    <div className="az104-study-loop" aria-label="Recommended study loop">{studyLoop.map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span>{index < studyLoop.length - 1 && <i>→</i>}</div>)}</div>
    <div className="az104-domain-roadmap" role="tablist" aria-label="AZ-104 exam domains">{courseDomains.map((domain, index) => <button type="button" role="tab" aria-selected={selectedDomainIndex === index} className={selectedDomainIndex === index ? "is-selected" : ""} key={domain.number} onClick={() => setSelectedDomainIndex(index)} style={{ "--domain-accent": domain.accent } as CSSProperties}><b>{domain.number}</b><span>{domain.title}</span><small>{domain.weight}</small></button>)}</div>
    <div className="az104-domain-list"><article className="az104-domain" id={`az104-domain-${selectedDomain.number}`} key={selectedDomain.number} style={{ "--domain-accent": selectedDomain.accent } as CSSProperties}>
      {(() => { const domain = selectedDomain; return <>
      <div className="az104-domain-head"><div className="az104-domain-number">{domain.number}</div><div><p>{domain.weight} · EXAM DOMAIN</p><h3>{domain.title}</h3><span>{domain.outcome}</span></div></div>
      <div className="az104-flow" aria-label={`${domain.title} architecture flow`}>{domain.flow.map((node, index) => <div key={node}><strong>{node}</strong>{index < domain.flow.length - 1 && <i>→</i>}</div>)}</div>
      <div className="az104-lessons">{domain.lessons.map((lesson) => <details className="az104-lesson" key={lesson.title}><summary><span>{lesson.title}</span><b>Open step +</b></summary><div className="az104-lesson-body"><div className="az104-objectives"><p>What you must be able to do</p><ul>{lesson.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><div className="az104-lesson-visual"><p>VISUAL ROUTE</p><strong>{lesson.visual}</strong><div className="az104-mini-architecture"><span>Concept</span><i>→</i><span>Configure</span><i>→</i><span>Verify</span></div><div className="az104-service-links">{lesson.services.map((service) => <a key={service.slug} href={`/azure-services?service=${service.slug}`}>{service.label} <span>↗</span></a>)}</div></div></div>{lesson.tasks?.length ? <section className="az104-task-lab" aria-label={`${lesson.title} task walkthroughs`}><div className="az104-task-lab-head"><div><p>ADMIN TASK LAB</p><h4>Practise the exact exam actions</h4></div><span>Console path → action → verify</span></div><TaskTabs tasks={lesson.tasks} /></section> : null}</details>)}</div>
      <div className="az104-exam-hook"><b>EXAM MEMORY HOOK</b><span>{domain.examHook}</span></div>
      </>; })()}</article></div>
    <div className="az104-final-check"><div><p className="az104-eyebrow">BEFORE YOU BOOK</p><h3>Can you explain the whole path without opening the portal?</h3></div><span>Use the five domain cards, then revisit every service link where your answer depends on a setting, scope, route, or recovery decision.</span></div>
  </section>;
}
