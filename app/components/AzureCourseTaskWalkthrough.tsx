"use client";

import { useEffect, useMemo, useState } from "react";
import type { AzureCourse, AzureCourseService, AzureCourseScope } from "../azure-course-data";
import "./AzureCourseTaskWalkthrough.css";

const r2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";
const slugify = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/formerly azure ad/g, "entra id").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const taskFilenameAliases: Record<string, string> = { "API Management": "api-management", "App Service": "app-service", "Event Hubs": "event-hubs", "Logic Apps": "logic-apps", "Service Bus": "service-bus", "Microsoft Entra ID (formerly Azure AD)": "microsoft-entra-id", "Microsoft Entra External ID": "microsoft-entra-external-id", "Azure Database for PostgreSQL": "azure-database-for-postgresql", "Azure Database for PostgreSQL Flexible Server": "azure-database-for-postgresql-flexible-server" };
const courseFolder = (code: string) => code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type ExamDomain = { name: string; weight: string };
const examDomains: Record<string, ExamDomain[]> = {
  "AZ-900": [
    { name: "Describe cloud concepts", weight: "25–30%" },
    { name: "Describe Azure architecture and services", weight: "35–40%" },
    { name: "Describe Azure management and governance", weight: "30–35%" },
  ],
  "AZ-305": [
    { name: "Design identity, governance, and monitoring solutions", weight: "25–30%" },
    { name: "Design data storage solutions", weight: "20–25%" },
    { name: "Design business continuity solutions", weight: "15–20%" },
    { name: "Design infrastructure solutions", weight: "30–35%" },
  ],
  "AZ-700": [
    { name: "Design and implement core networking infrastructure", weight: "25–30%" },
    { name: "Design, implement, and manage connectivity services", weight: "20–25%" },
    { name: "Design and implement application delivery services", weight: "15–20%" },
    { name: "Design and implement private access to Azure services", weight: "10–15%" },
    { name: "Design and implement Azure network security services", weight: "15–20%" },
  ],
  "AZ-400": [
    { name: "Design and implement processes and communications", weight: "10–15%" },
    { name: "Design and implement a source control strategy", weight: "10–15%" },
    { name: "Design and implement build and release pipelines", weight: "50–55%" },
    { name: "Develop a security and compliance plan", weight: "10–15%" },
    { name: "Implement an instrumentation strategy", weight: "5–10%" },
  ],
  "AI-901": [
    { name: "Identify AI concepts and capabilities", weight: "40–45%" },
    { name: "Implement AI solutions by using Microsoft Foundry", weight: "55–60%" },
  ],
  "AI-103": [
    { name: "Plan and manage an Azure AI solution", weight: "25–30%" },
    { name: "Implement generative AI and agentic solutions", weight: "30–35%" },
    { name: "Implement computer vision solutions", weight: "10–15%" },
    { name: "Implement text analysis solutions", weight: "10–15%" },
    { name: "Implement information extraction solutions", weight: "10–15%" },
  ],
  "DP-900": [
    { name: "Describe core data concepts", weight: "25–30%" },
    { name: "Identify considerations for relational data on Azure", weight: "20–25%" },
    { name: "Describe considerations for working with non-relational data on Azure", weight: "15–20%" },
    { name: "Describe an analytics workload on Azure", weight: "25–30%" },
  ],
  "DP-300": [
    { name: "Plan and implement data platform resources", weight: "15–20%" },
    { name: "Implement a secure environment", weight: "20–25%" },
    { name: "Monitor, configure, and optimize database resources", weight: "20–25%" },
    { name: "Configure and manage automation of tasks", weight: "15–20%" },
    { name: "Plan and configure a high availability and disaster recovery environment", weight: "20–25%" },
  ],
  "DP-600": [
    { name: "Maintain a data analytics solution", weight: "25–30%" },
    { name: "Prepare data", weight: "45–50%" },
    { name: "Implement and manage semantic models", weight: "25–30%" },
  ],
  "AZ-140": [
    { name: "Plan and implement an Azure Virtual Desktop infrastructure", weight: "40–45%" },
    { name: "Plan and implement identity and security", weight: "15–20%" },
    { name: "Plan and implement user environments and apps", weight: "20–25%" },
    { name: "Monitor and maintain an Azure Virtual Desktop infrastructure", weight: "10–15%" },
  ],
  "AZ-120": [
    { name: "Migrate SAP workloads to Azure", weight: "25–30%" },
    { name: "Design and implement an infrastructure to support SAP workloads on Azure", weight: "25–30%" },
    { name: "Design and implement high availability and disaster recovery", weight: "20–25%" },
    { name: "Maintain SAP workloads on Azure", weight: "20–25%" },
  ],
  "SC-900": [
    { name: "Describe the concepts of security, compliance, and identity", weight: "10–15%" },
    { name: "Describe the capabilities of Microsoft Entra", weight: "25–30%" },
    { name: "Describe the capabilities of Microsoft security solutions", weight: "35–40%" },
    { name: "Describe the capabilities of Microsoft compliance solutions", weight: "20–25%" },
  ],
  "SC-300": [
    { name: "Implement and manage user identities", weight: "20–25%" },
    { name: "Implement authentication and access management", weight: "20–25%" },
    { name: "Plan and implement workload identities", weight: "20–25%" },
    { name: "Plan and automate identity governance", weight: "20–25%" },
  ],
  "SC-200": [
    { name: "Manage a security operations environment", weight: "40–45%" },
    { name: "Respond to security incidents", weight: "35–40%" },
    { name: "Perform threat hunting", weight: "20–25%" },
  ],
};

type Task = AzureCourseService & { slug: string; category: string; ask: string; steps: string[]; consolePath: string; verify: string };
const makeTask = (entry: AzureCourseService, category: AzureCourseScope): Task => ({
  ...entry, slug: slugify(entry.name), category: category.title,
  ask: `Understand where ${entry.name} fits in the ${category.title} scope and configure the portal setting shown in the walkthrough.`,
  consolePath: `Azure portal → ${entry.name} → review the ${category.title.toLowerCase()} setting`,
  steps: [`Open the Azure portal and locate ${entry.name}.`, `Open the target resource or configuration blade and apply the ${category.title.toLowerCase()} choice shown in the walkthrough.`, "Review the summary, save the change when required, and inspect the resulting state."],
  verify: `Confirm the expected ${category.title.toLowerCase()} outcome in the overview, activity log, or monitoring view.`,
});
const imageCandidates = (courseCode: string, task: Task, category: string) => { const filename = taskFilenameAliases[task.name] || task.slug; const folder = courseFolder(courseCode); const legacyFolder = `${courseCode.toLowerCase()}-tasks`; const commonFolder = category.toLowerCase().replace(/[^a-z0-9]+/g, "-"); return [`${r2Base}/${folder}/${filename}.webp`, `${r2Base}/common/${commonFolder}/${filename}.webp`, `${r2Base}/${legacyFolder}/${filename}.webp`, `${r2Base}/${legacyFolder}/${filename}.png`, `${r2Base}/${legacyFolder}/${filename}/walkthrough.webp`]; };

function ConsoleImage({ courseCode, category, task }: { courseCode: string; category: string; task: Task }) {
  const sources = useMemo(() => imageCandidates(courseCode, task, category), [courseCode, category, task]);
  const [sourceIndex, setSourceIndex] = useState(0); const [expanded, setExpanded] = useState(false); const [available, setAvailable] = useState(true);
  useEffect(() => { setSourceIndex(0); setAvailable(true); setExpanded(false); }, [task.slug]);
  if (!available) return <div className="course-task-image-fallback"><strong>Console walkthrough pending</strong><span>Upload <code>{taskFilenameAliases[task.name] || task.slug}.webp</code> to <code>azure-certification-walkthroughs/{courseFolder(courseCode)}/</code>.</span></div>;
  const src = sources[sourceIndex];
  return <><button className="course-task-image-button" onClick={() => setExpanded(true)} aria-label={`Open ${task.name} console walkthrough full screen`}><img src={src} alt={`${task.name} Azure portal console walkthrough`} onError={() => sourceIndex < sources.length - 1 ? setSourceIndex((index) => index + 1) : setAvailable(false)} /><span>Open console walkthrough full screen ↗</span></button>{expanded && <div className="course-task-image-modal" role="dialog" aria-modal="true" onClick={() => setExpanded(false)}><button onClick={() => setExpanded(false)}>Close ×</button><img src={src} alt={`${task.name} Azure portal walkthrough full view`} onClick={(event) => event.stopPropagation()} /></div>}</>;
}

export default function AzureCourseTaskWalkthrough({ course }: { course: AzureCourse }) {
  const scopes = course.scope; const [domainIndex, setDomainIndex] = useState(0); const [taskIndex, setTaskIndex] = useState(0);
  const domainMeta = examDomains[course.code] || scopes.map((domain) => ({ name: domain.title, weight: "Exam scope" }));
  const domainBuckets = useMemo(() => domainMeta.map((meta, index) => ({ meta, scopes: scopes.filter((_, scopeIndex) => Math.floor(scopeIndex * domainMeta.length / Math.max(scopes.length, 1)) === index) })), [domainMeta, scopes]);
  const activeBucket = domainBuckets[domainIndex] || domainBuckets[0]; const activeMeta = activeBucket?.meta || { name: "Exam domain", weight: "Exam scope" };
  const activeDomain = activeBucket?.scopes[0] || scopes[0]; const tasks = useMemo(() => activeBucket?.scopes.flatMap((scope) => scope.services.map((entry) => makeTask(entry, scope))) || [], [activeBucket]); const activeTask = tasks[taskIndex] || tasks[0];
  useEffect(() => setTaskIndex(0), [domainIndex]);
  if (!activeDomain || !activeTask) return null;
  return <section className="course-task-guide" id="console-walkthroughs"><div className="course-task-guide-head"><div><p>CONSOLE PRACTICE LAB · {course.code}</p><h2>Follow the official exam domains one at a time</h2><span>Choose a weighted domain, then select one mapped service to see its ask, console path, walkthrough, steps, and verification.</span></div><div className="course-task-guide-badge"><strong>{domainMeta.length}</strong><span>exam domains</span><strong>{scopes.reduce((total, domain) => total + domain.services.length, 0)}</strong><span>mapped tasks</span></div></div><div className="course-domain-tabs" role="tablist" aria-label={`${course.code} exam domains`}>{domainBuckets.map((bucket, index) => <button key={`${bucket.meta.name}-${index}`} className={index === domainIndex ? "is-selected" : ""} onClick={() => setDomainIndex(index)} role="tab" aria-selected={index === domainIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{bucket.meta.name}</span><small>{bucket.meta.weight}</small><em>{bucket.scopes.reduce((total, scope) => total + scope.services.length, 0)} mapped tasks</em></button>)}</div><div className="course-task-panel"><div className="course-task-tabs" role="tablist" aria-label={`${activeMeta.name} tasks`}>{tasks.map((task, index) => <button key={`${task.category}-${task.name}`} className={index === taskIndex ? "is-selected" : ""} onClick={() => setTaskIndex(index)} role="tab" aria-selected={index === taskIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{task.name}</span></button>)}</div><article className="course-task-selected"><header><div><p>{activeMeta.name} · {activeMeta.weight} · {activeTask.classification} mapping</p><h3>{activeTask.name}</h3><span>{activeTask.consolePath}</span></div><a href={`/azure-services?service=${encodeURIComponent(slugify(activeTask.name))}`}>Open service page ↗</a></header><div className="course-task-ask"><b>WHAT THIS TASK ASKS</b><span>{activeTask.ask}</span></div><div className="course-task-selected-grid"><div><p className="course-task-label">SCREENSHOT WALKTHROUGH</p><ConsoleImage courseCode={course.code} category={activeTask.category} task={activeTask} /></div><div className="course-task-instructions"><p className="course-task-label">FOLLOW THESE ACTIONS</p><ol>{activeTask.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="course-task-verify"><b>VERIFY</b><span>{activeTask.verify}</span></div></div></div></article></div></section>;
}
