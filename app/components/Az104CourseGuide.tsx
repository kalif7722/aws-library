import type { CSSProperties } from "react";
import "./Az104CourseGuide.css";

type Lesson = {
  title: string;
  topics: string[];
  visual: string;
  services: { label: string; slug: string }[];
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
      { title: "01 · Users, groups, licenses, and external identities", topics: ["Create users and groups", "Manage user and group properties", "Assign and manage Microsoft Entra licenses", "Manage external users", "Configure self-service password reset (SSPR)"], visual: "Identity lifecycle", services: [{ label: "Microsoft Entra ID", slug: "microsoft-entra-id-formerly-azure-ad" }] },
      { title: "02 · Azure RBAC and access scope", topics: ["Use built-in Azure roles", "Assign roles at management-group, subscription, resource-group, and resource scopes", "Interpret inherited and direct access assignments", "Distinguish Entra roles from Azure resource roles"], visual: "Scope inheritance", services: [{ label: "Microsoft Entra ID", slug: "microsoft-entra-id-formerly-azure-ad" }, { label: "Azure Resource Manager", slug: "azure-resource-manager" }] },
      { title: "03 · Subscriptions, policy, locks, tags, and cost", topics: ["Manage resource groups and subscriptions", "Configure management groups", "Apply tags and resource locks", "Create and interpret Azure Policy assignments", "Use cost alerts, budgets, and Azure Advisor recommendations"], visual: "Governance hierarchy", services: [{ label: "Azure Policy", slug: "azure-policy" }, { label: "Azure Advisor", slug: "azure-advisor" }, { label: "Microsoft Cost Management", slug: "microsoft-cost-management" }] },
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
      { title: "01 · Storage access and network protection", topics: ["Configure storage firewalls and virtual networks", "Create and use SAS tokens", "Configure stored access policies", "Manage access keys", "Configure identity-based access for Azure Files"], visual: "Layered storage access", services: [{ label: "Azure Storage", slug: "azure-storage" }, { label: "Azure Files", slug: "azure-files" }] },
      { title: "02 · Storage accounts and data movement", topics: ["Create and configure storage accounts", "Select redundancy options", "Configure object replication", "Configure encryption", "Move and manage data with Storage Explorer and AzCopy"], visual: "Durability choices", services: [{ label: "Azure Storage", slug: "azure-storage" }, { label: "Azure Blob Storage", slug: "azure-blob-storage" }] },
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

const studyLoop = ["Learn the boundary", "Open the EL10 visual", "Trace the architecture", "Follow the walkthrough", "Answer the exam cue"];

export default function Az104CourseGuide() {
  return <section className="az104-guide" aria-labelledby="az104-guide-title">
    <div className="az104-guide-hero">
      <div className="az104-guide-hero-copy"><p className="az104-eyebrow">AZ-104 · VISUAL ADMINISTRATOR PATH</p><h2 id="az104-guide-title">Learn Azure administration as one connected environment.</h2><p>Move through identity, storage, compute, networking, and operations in the order an administrator actually designs and runs Azure. Every step connects the exam objective to a visual guide, architecture pattern, and practical walkthrough.</p><a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104" target="_blank" rel="noreferrer">Compare with the official Microsoft study guide ↗</a></div>
      <div className="az104-guide-stats"><div><strong>05</strong><span>exam domains</span></div><div><strong>100</strong><span>minutes</span></div><div><strong>700+</strong><span>passing score</span></div></div>
    </div>
    <div className="az104-study-loop" aria-label="Recommended study loop">{studyLoop.map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span>{index < studyLoop.length - 1 && <i>→</i>}</div>)}</div>
    <div className="az104-domain-roadmap">{domains.map((domain) => <a key={domain.number} href={`#az104-domain-${domain.number}`} style={{ "--domain-accent": domain.accent } as CSSProperties}><b>{domain.number}</b><span>{domain.title}</span><small>{domain.weight}</small></a>)}</div>
    <div className="az104-domain-list">{domains.map((domain) => <article className="az104-domain" id={`az104-domain-${domain.number}`} key={domain.number} style={{ "--domain-accent": domain.accent } as CSSProperties}>
      <div className="az104-domain-head"><div className="az104-domain-number">{domain.number}</div><div><p>{domain.weight} · EXAM DOMAIN</p><h3>{domain.title}</h3><span>{domain.outcome}</span></div></div>
      <div className="az104-flow" aria-label={`${domain.title} architecture flow`}>{domain.flow.map((node, index) => <div key={node}><strong>{node}</strong>{index < domain.flow.length - 1 && <i>→</i>}</div>)}</div>
      <div className="az104-lessons">{domain.lessons.map((lesson) => <details className="az104-lesson" key={lesson.title}><summary><span>{lesson.title}</span><b>Open step +</b></summary><div className="az104-lesson-body"><div className="az104-objectives"><p>What you must be able to do</p><ul>{lesson.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><div className="az104-lesson-visual"><p>VISUAL ROUTE</p><strong>{lesson.visual}</strong><div className="az104-mini-architecture"><span>Concept</span><i>→</i><span>Configure</span><i>→</i><span>Verify</span></div><div className="az104-service-links">{lesson.services.map((service) => <a key={service.slug} href={`/azure-services?service=${service.slug}`}>{service.label} <span>↗</span></a>)}</div></div></div></details>)}</div>
      <div className="az104-exam-hook"><b>EXAM MEMORY HOOK</b><span>{domain.examHook}</span></div>
    </article>)}</div>
    <div className="az104-final-check"><div><p className="az104-eyebrow">BEFORE YOU BOOK</p><h3>Can you explain the whole path without opening the portal?</h3></div><span>Use the five domain cards, then revisit every service link where your answer depends on a setting, scope, route, or recovery decision.</span></div>
  </section>;
}
