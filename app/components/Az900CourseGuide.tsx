"use client";

import { useEffect, useState } from "react";
import type { AzureCourse } from "../azure-course-data";
import { azureOfficialExamDomains } from "../azure-exam-objectives";
import "./Az900CourseGuide.css";

const base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";
const slug = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const guide = azureOfficialExamDomains["AZ-900"];

const details: Record<string, { ask: string; focus: [string, string]; flow: [string, string, string, string]; services: string[] }> = {
  "1-1": { ask: "Explain cloud computing, responsibility, public/private/hybrid models, consumption pricing, and serverless in realistic scenarios.", focus: ["Separate who manages infrastructure from who secures data and identities.", "Consumption pricing follows usage; serverless still runs on managed infrastructure."], flow: ["Define cloud", "Choose model", "Assign responsibility", "Compare cost"], services: [] },
  "1-2": { ask: "Connect availability, scalability, reliability, predictability, security, governance, and manageability to a business need.", focus: ["Availability keeps a service reachable; scalability handles changing demand.", "Reliability and predictability depend on architecture, monitoring, and service commitments."], flow: ["Name need", "Select benefit", "Choose design", "Check outcome"], services: ["Azure Monitor", "Azure Advisor"] },
  "1-3": { ask: "Compare IaaS, PaaS, and SaaS by control, operational responsibility, and suitable workload.", focus: ["IaaS leaves OS and application administration to the customer; PaaS abstracts more of the platform.", "SaaS provides the application, while customers still govern users and data."], flow: ["Set control", "Pick service type", "Assign operations", "Test example"], services: ["App Service", "Azure Virtual Desktop"] },
  "2-1": { ask: "Explain regions, region pairs, zones, datacenters, and the resource group → subscription → management group hierarchy.", focus: ["Availability zones are separate locations within a region; region pairs address a broader failure boundary.", "Resources belong to resource groups; resource groups belong to subscriptions; subscriptions sit under management groups."], flow: ["Choose region", "Plan zones", "Group resources", "Set scope"], services: ["Azure Resource Manager"] },
  "2-2": { ask: "Select compute and hosting options, then explain virtual networks, subnets, connectivity, DNS, and endpoints.", focus: ["Compare VMs, scale sets, containers, Functions, and App Service by management and scaling needs.", "VPN Gateway and ExpressRoute are different connectivity choices; public and private endpoints affect exposure."], flow: ["Select compute", "Choose hosting", "Connect network", "Set endpoint"], services: ["Virtual Machine Scale Sets", "Azure Functions", "App Service", "Azure Virtual Network", "Azure VPN Gateway", "Azure ExpressRoute", "Azure DNS"] },
  "2-3": { ask: "Compare storage services, access tiers, redundancy, account types, file movement, and migration options.", focus: ["Hot/cool/archive tiers concern access pattern and cost; LRS/ZRS/GRS concern copies and failure scope.", "AzCopy and Storage Explorer move files; Azure File Sync, Migrate, and Data Box solve different migration needs."], flow: ["Choose data type", "Choose tier", "Choose redundancy", "Plan movement"], services: ["Azure Blob Storage", "Azure Files", "Azure Data Box", "Azure Migrate"] },
  "2-4": { ask: "Explain Entra directory services, authentication and Conditional Access, RBAC, Zero Trust, defense in depth, and Defender for Cloud.", focus: ["Authentication establishes identity; Azure RBAC grants actions at a defined scope.", "Conditional Access evaluates sign-in conditions; Defender for Cloud assesses security posture and protections."], flow: ["Verify identity", "Apply condition", "Grant role", "Monitor posture"], services: ["Microsoft Entra ID (formerly Azure AD)", "Microsoft Entra Domain Services", "Microsoft Defender for Cloud"] },
  "3-1": { ask: "Estimate what drives Azure costs and use the pricing calculator, Cost Management, and tags appropriately.", focus: ["Pricing estimates are forecasts; Cost Management inspects actual usage and budgets.", "Tags help organize and attribute costs but do not change resource permissions."], flow: ["Estimate", "Deploy", "Measure", "Allocate"], services: ["Microsoft Cost Management"] },
  "3-2": { ask: "Distinguish Purview governance, Azure Policy compliance, and resource locks that guard against accidental changes.", focus: ["Azure Policy evaluates or enforces configured rules; locks restrict delete or write operations.", "Microsoft Purview addresses data governance and discovery, separate from resource policy."], flow: ["Discover data", "Set policy", "Apply lock", "Review compliance"], services: ["Microsoft Purview", "Azure Policy"] },
  "3-3": { ask: "Use the portal, Cloud Shell, CLI, PowerShell, Arc, and ARM templates to manage and deploy resources.", focus: ["ARM is the Azure control plane; templates declare resources for repeatable deployment.", "Azure Arc extends management to supported resources outside Azure; a portal session is not infrastructure as code."], flow: ["Choose interface", "Define template", "Deploy with ARM", "Inspect result"], services: ["Cloud Shell", "Azure Arc", "Azure Resource Manager"] },
  "3-4": { ask: "Choose Azure Advisor, Service Health, and Azure Monitor signals, including Logs, alerts, and Application Insights.", focus: ["Advisor recommends improvements; Service Health reports Azure service impact.", "Monitor collects telemetry; Log Analytics queries logs, alerts notify, and Application Insights traces application behavior."], flow: ["Find signal", "Check impact", "Investigate", "Take action"], services: ["Azure Advisor", "Azure Monitor"] },
};

function Board({ id, kind, title }: { id: string; kind: "primary" | "companion"; title: string }) {
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMissing(false), [id, kind]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const src = `${base}/az-900-tasks/az-900-task-${id}-${kind}.webp`;
  return <figure className="az900-board"><figcaption>{kind === "primary" ? "PRIMARY WALKTHROUGH" : "COMPANION COVERAGE"}</figcaption>{missing ? <div className="az900-board-pending">{kind === "primary" ? "Primary" : "Companion"} visual pending</div> : <button onClick={() => setOpen(true)} aria-label={`Open ${title} ${kind} walkthrough full screen`}><img src={src} alt={`${title} ${kind} walkthrough`} loading="lazy" onError={() => setMissing(true)} /><span>Open full screen ↗</span></button>}{open && <div className="az900-lightbox" role="dialog" aria-modal="true" aria-label={`${title} ${kind} walkthrough`} onClick={() => setOpen(false)}><button className="az900-lightbox-close" onClick={() => setOpen(false)} aria-label="Close walkthrough">×</button><img src={src} alt={`${title} ${kind} full screen`} onClick={(event) => event.stopPropagation()} /></div>}</figure>;
}

function ExistingObjectiveVisual({ objective }: { objective: string }) {
  const [index, setIndex] = useState(0);
  const sources = [`${base}/az-900/${slug(objective)}.webp`, `${base}/az-900-tasks/${slug(objective)}.webp`, `${base}/az-900-tasks/${slug(objective)}.png`];
  if (index >= sources.length) return null;
  return <a href={sources[index]} target="_blank" rel="noreferrer" className="az900-existing-image"><img src={sources[index]} alt={`${objective} existing objective visual`} loading="lazy" onError={() => setIndex((value) => value + 1)} /><span>{objective} ↗</span></a>;
}

export default function Az900CourseGuide({ course }: { course: AzureCourse }) {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const domain = guide[domainIndex];
  const group = domain.groups[taskIndex];
  const id = `${domainIndex + 1}-${taskIndex + 1}`;
  const task = details[id];
  const scopedServices = new Set(course.scope.flatMap((category) => category.services.map((entry) => entry.name)));
  const relatedServices = task.services.filter((name) => scopedServices.has(name));
  const openService = (name: string) => window.dispatchEvent(new CustomEvent("azure-course-service", { detail: { name, courseCode: course.code } }));
  return <section className="az900-guide" id="az900-exam-guide" data-course-layout="shared-task-shell-v2">
    <header className="az900-hero"><div><p>MICROSOFT CERTIFIED · AZ-900 · OFFICIAL SKILLS</p><h2>Azure Fundamentals, one skill area at a time</h2><span>Three weighted domains · 11 skill areas · primary and companion walkthroughs grounded in the supplied July 2026 study guide.</span></div><div className="az900-hero-stats"><strong>03</strong><span>exam domains</span><strong>11</strong><span>skill areas</span></div></header>
    <div className="az900-domain-tabs" role="tablist" aria-label="AZ-900 domains">{guide.map((item, index) => <button key={item.name} role="tab" aria-selected={domainIndex === index} className={domainIndex === index ? "active" : ""} onClick={() => { setDomainIndex(index); setTaskIndex(0); }}><b>{String(index + 1).padStart(2, "0")}</b><span>{item.name}</span><em>{item.weight}</em></button>)}</div>
    <div className="az900-layout"><aside aria-label="Skill areas in selected domain"><strong>SKILL AREAS · {domain.name}</strong>{domain.groups.map((item, index) => <button key={item.name} className={index === taskIndex ? "active" : ""} aria-current={index === taskIndex ? "step" : undefined} onClick={() => setTaskIndex(index)}><b>{domainIndex + 1}.{index + 1}</b><span>{item.name}</span></button>)}</aside>
      <article className="az900-main"><p className="az900-kicker">DOMAIN {String(domainIndex + 1).padStart(2, "0")} · {domain.weight} · OFFICIAL STUDY GUIDE</p><h3>{group.name}</h3><p className="az900-breadcrumb">{domain.name} → Skill area {id.replace("-", ".")}</p><div className="az900-ask"><b>WHAT THIS SKILL AREA ASKS</b><span>{task.ask}</span></div>
        <div className="az900-summary"><div><p className="az900-kicker">VISUAL EXPLAINER · AZ-900</p><h4>{group.name}</h4><div className="az900-flow">{task.flow.map((step) => <span key={step}>{step}</span>)}</div><p>{task.focus[0]}</p></div><div><p className="az900-kicker">GUIDE-ALIGNED FOCUS</p>{task.focus.map((item) => <p key={item}>{item}</p>)}{relatedServices.length > 0 && <><p className="az900-kicker">RELATED AZ-900 SERVICES</p><div className="az900-services">{relatedServices.map((name) => <button key={name} onClick={() => openService(name)}>{name} ↗</button>)}</div></>}</div></div>
        <div className="az900-objectives"><p className="az900-kicker">SKILLS MEASURED IN THIS AREA</p><ul>{group.tasks.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="az900-boards"><Board key={`${id}-primary`} id={id} kind="primary" title={group.name} /><Board key={`${id}-companion`} id={id} kind="companion" title={group.name} /></div>
        <div className="az900-existing"><p className="az900-kicker">EXISTING OBJECTIVE VISUALS</p><span>Previously mapped images appear here only for the exact objective named below, when an image is available.</span><div>{group.tasks.map((item) => <ExistingObjectiveVisual key={item} objective={item} />)}</div></div>
      </article></div>
  </section>;
}
