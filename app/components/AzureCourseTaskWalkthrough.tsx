"use client";

import { useEffect, useMemo, useState } from "react";
import type { AzureCourse, AzureCourseService, AzureCourseScope } from "../azure-course-data";
import "./AzureCourseTaskWalkthrough.css";

const r2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";
const slugify = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/formerly azure ad/g, "entra id").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type Task = AzureCourseService & { slug: string; steps: string[]; consolePath: string; verify: string };
const makeTask = (entry: AzureCourseService, category: AzureCourseScope): Task => ({
  ...entry, slug: slugify(entry.name),
  consolePath: `Azure portal → ${entry.name} → review the ${category.title.toLowerCase()} setting`,
  steps: [`Open the Azure portal and locate ${entry.name}.`, `Open the target resource or configuration blade and apply the ${category.title.toLowerCase()} choice shown in the walkthrough.`, "Review the summary, save the change when required, and inspect the resulting state."],
  verify: `Confirm the expected ${category.title.toLowerCase()} outcome in the overview, activity log, or monitoring view.`,
});
const imageCandidates = (courseCode: string, task: Task) => { const folder = `${courseCode.toLowerCase()}-tasks`; return [`${r2Base}/${folder}/${task.slug}.webp`, `${r2Base}/${folder}/${task.slug}.png`, `${r2Base}/${folder}/${task.slug}/walkthrough.webp`]; };

function ConsoleImage({ courseCode, task }: { courseCode: string; task: Task }) {
  const sources = useMemo(() => imageCandidates(courseCode, task), [courseCode, task]);
  const [sourceIndex, setSourceIndex] = useState(0); const [expanded, setExpanded] = useState(false); const [available, setAvailable] = useState(true);
  useEffect(() => { setSourceIndex(0); setAvailable(true); setExpanded(false); }, [task.slug]);
  if (!available) return <div className="course-task-image-fallback"><strong>Console walkthrough pending</strong><span>Upload <code>{task.slug}.webp</code> to <code>azure-certification-walkthroughs/{courseCode.toLowerCase()}-tasks/</code>.</span></div>;
  const src = sources[sourceIndex];
  return <><button className="course-task-image-button" onClick={() => setExpanded(true)} aria-label={`Open ${task.name} console walkthrough full screen`}><img src={src} alt={`${task.name} Azure portal console walkthrough`} onError={() => sourceIndex < sources.length - 1 ? setSourceIndex((index) => index + 1) : setAvailable(false)} /><span>Open console walkthrough full screen ↗</span></button>{expanded && <div className="course-task-image-modal" role="dialog" aria-modal="true" onClick={() => setExpanded(false)}><button onClick={() => setExpanded(false)}>Close ×</button><img src={src} alt={`${task.name} Azure portal walkthrough full view`} onClick={(event) => event.stopPropagation()} /></div>}</>;
}

export default function AzureCourseTaskWalkthrough({ course }: { course: AzureCourse }) {
  const domains = course.scope; const [domainIndex, setDomainIndex] = useState(0); const [taskIndex, setTaskIndex] = useState(0);
  const activeDomain = domains[domainIndex] || domains[0]; const tasks = useMemo(() => activeDomain?.services.map((entry) => makeTask(entry, activeDomain)) || [], [activeDomain]); const activeTask = tasks[taskIndex] || tasks[0];
  useEffect(() => setTaskIndex(0), [domainIndex]);
  if (!activeDomain || !activeTask) return null;
  return <section className="course-task-guide" id="console-walkthroughs"><div className="course-task-guide-head"><div><p>CONSOLE PRACTICE LAB</p><h2>Learn each {course.code} scope area in the portal</h2><span>Upload one matching walkthrough image per task to R2. The page and tabs are already wired for every course.</span></div><div className="course-task-guide-badge"><strong>{domains.length}</strong><span>domains ready</span><strong>{course.scope.reduce((total, domain) => total + domain.services.length, 0)}</strong><span>image slots</span></div></div><div className="course-domain-tabs" role="tablist" aria-label={`${course.code} domains`}>{domains.map((domain, index) => <button key={domain.title} className={index === domainIndex ? "is-selected" : ""} onClick={() => setDomainIndex(index)} role="tab" aria-selected={index === domainIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{domain.title}</span><small>{domain.services.length} tasks</small></button>)}</div><div className="course-task-panel"><div className="course-task-tabs" role="tablist" aria-label={`${activeDomain.title} tasks`}>{tasks.map((task, index) => <button key={task.name} className={index === taskIndex ? "is-selected" : ""} onClick={() => setTaskIndex(index)} role="tab" aria-selected={index === taskIndex}><b>{String(index + 1).padStart(2, "0")}</b><span>{task.name}</span></button>)}</div><article className="course-task-selected"><header><div><p>{activeDomain.title} · {activeTask.classification} service</p><h3>{activeTask.name}</h3><span>{activeTask.consolePath}</span></div><a href={`/azure-services?service=${encodeURIComponent(slugify(activeTask.name))}`}>Open service page ↗</a></header><div className="course-task-selected-grid"><div><p className="course-task-label">SCREENSHOT WALKTHROUGH</p><ConsoleImage courseCode={course.code} task={activeTask} /></div><div className="course-task-instructions"><p className="course-task-label">FOLLOW THESE ACTIONS</p><ol>{activeTask.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="course-task-verify"><b>VERIFY</b><span>{activeTask.verify}</span></div></div></div></article></div></section>;
}
