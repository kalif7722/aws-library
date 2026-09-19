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
};

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

export default function AzureCourseTaskWalkthrough({ course }: { course: AzureCourse }) {
  const scopes = course.scope;
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const official = azureOfficialExamDomains[course.code];
  const domainBuckets = useMemo<DomainBucket[]>(() => official
    ? official.map((domain) => ({ meta: domain, scopes: [], tasks: domain.groups.flatMap((group) => group.tasks.map((task) => makeObjectiveTask(task, group.name, domain))) }))
    : scopes.map((scope) => ({ meta: { name: scope.title, weight: "Exam scope" }, scopes: [scope], tasks: scope.services.map((entry) => makeServiceTask(entry, scope)) })), [course.code, official, scopes]);
  const activeBucket = domainBuckets[domainIndex] || domainBuckets[0];
  const activeMeta = activeBucket?.meta || { name: "Exam domain", weight: "Exam scope" };
  const tasks = activeBucket?.tasks || [];
  const activeTask = tasks[taskIndex] || tasks[0];
  useEffect(() => setTaskIndex(0), [domainIndex]);
  if (!activeBucket || !activeTask) return null;
  const totalObjectives = domainBuckets.reduce((total, bucket) => total + bucket.tasks.length, 0);
  return <section className="course-task-guide" id="console-walkthroughs"><div className="course-task-guide-head"><div><p>CONSOLE PRACTICE LAB · {course.code}</p><h2>Follow every official exam objective</h2><span>Choose a weighted domain, then select the exact Microsoft objective to study its ask, practice path, walkthrough, steps, and verification.</span></div><div className="course-task-guide-badge"><strong>{domainBuckets.length}</strong><span>exam domains</span><strong>{totalObjectives}</strong><span>official objectives</span></div></div><div className="course-domain-tabs" role="tablist" aria-label={`${course.code} exam domains`}>{domainBuckets.map((bucket, index) => <button key={`${bucket.meta.name}-${index}`} className={index === domainIndex ? "is-selected" : ""} onClick={() => setDomainIndex(index)} role="tab" aria-selected={index === domainIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{bucket.meta.name}</span><small>{bucket.meta.weight}</small><em>{bucket.tasks.length} objectives</em></button>)}</div><div className="course-task-panel"><div className="course-task-tabs" role="tablist" aria-label={`${activeMeta.name} objectives`}>{tasks.map((task, index) => <button key={task.slug} className={index === taskIndex ? "is-selected" : ""} onClick={() => setTaskIndex(index)} role="tab" aria-selected={index === taskIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{task.name}</span></button>)}</div><article className="course-task-selected"><header><div><p>{activeMeta.name} · {activeMeta.weight} · {activeTask.classification}</p><h3>{activeTask.name}</h3><span>{activeTask.consolePath}</span></div>{activeTask.serviceName && <a href={`/azure-services?service=${encodeURIComponent(slugify(activeTask.serviceName))}`}>Open service page ↗</a>}</header><div className="course-task-ask"><b>WHAT THIS OBJECTIVE ASKS</b><span>{activeTask.ask}</span></div><div className="course-task-selected-grid"><div><p className="course-task-label">SCREENSHOT WALKTHROUGH</p><ConsoleImage courseCode={course.code} task={activeTask} /></div><div className="course-task-instructions"><p className="course-task-label">FOLLOW THESE ACTIONS</p><ol>{activeTask.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="course-task-verify"><b>VERIFY</b><span>{activeTask.verify}</span></div></div></div></article></div></section>;
}
