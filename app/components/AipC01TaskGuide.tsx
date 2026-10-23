"use client";

import { useEffect, useMemo, useState } from "react";
import { aipC01Domains, aipC01TaskCount, type AipC01Task } from "../aip-c01-data";
import { assetUrl } from "../../lib/asset-url";

const R2_PREFIX = "aws-certification-walkthroughs/aip-c01-tasks";
const R2_PUBLIC_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const openAipCourseService = (name: string) => { window.dispatchEvent(new CustomEvent("aws-course-service", { detail: { name, courseCode: "AIP" } })); };

function VisualSlot({ task, kind, onOpen }: { task: AipC01Task; kind: "primary" | "companion"; onOpen: (src: string, alt: string) => void }) {
  const [failed, setFailed] = useState(false);
  const file = `aip-c01-task-${task.id}-${kind}.png`;
  const src = assetUrl(`${R2_PREFIX}/${file}`).startsWith("/") ? `${R2_PUBLIC_BASE}/${R2_PREFIX}/${file}` : assetUrl(`${R2_PREFIX}/${file}`);
  return <button className={`aip-c01-visual-slot${failed ? " is-pending" : ""}`} type="button" onClick={() => !failed && onOpen(src, `${task.title} ${kind} walkthrough`)}>
    <img src={src} alt={`${task.title} ${kind} walkthrough`} onError={(event) => { event.currentTarget.style.display = "none"; setFailed(true); }} />
    {failed && <span className="aip-c01-pending-copy"><strong>{kind === "primary" ? "Primary walkthrough" : "Companion coverage"}</strong><small>Upload {file} to {R2_PREFIX}/</small></span>}
  </button>;
}

export default function AipC01TaskGuide() {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskId, setTaskId] = useState(aipC01Domains[0].tasks[0].id);
  const [expanded, setExpanded] = useState<{ src: string; alt: string } | null>(null);
  const domain = aipC01Domains[domainIndex];
  const task = useMemo(() => domain.tasks.find((item) => item.id === taskId) || domain.tasks[0], [domain, taskId]);
  useEffect(() => {
    const requestedTask = new URLSearchParams(window.location.search).get("task");
    if (!requestedTask) return;
    const requestedDomainIndex = aipC01Domains.findIndex((item) => item.tasks.some((task) => task.id === requestedTask));
    if (requestedDomainIndex >= 0) {
      setDomainIndex(requestedDomainIndex);
      setTaskId(requestedTask);
    }
  }, []);
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(null); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  return <section className="aip-c01-guide" id="aip-c01-objectives">
    <div className="aip-c01-hero"><div><p className="aip-c01-kicker">YOUR EXAM STUDY MAP</p><h2>Learn the exam, one task at a time</h2><p>Choose a domain to see its official tasks. Each task brings the key decisions, course services, and two visual walkthroughs together.</p></div><div className="aip-c01-stats"><div><strong>5</strong><span>domains</span></div><div><strong>{aipC01TaskCount}</strong><span>official tasks</span></div><div><strong>98</strong><span>skill areas</span></div></div></div>
    <div className="aip-c01-domain-tabs">{aipC01Domains.map((item, index) => <button key={item.id} className={index === domainIndex ? "active" : ""} onClick={() => { setDomainIndex(index); setTaskId(item.tasks[0].id); }}><b>{item.number}</b><span>{item.title}</span><small>{item.weight} · {item.tasks.length} tasks</small></button>)}</div>
    <div className="aip-c01-workspace"><aside className="aip-c01-task-tabs"><p>{domain.title}</p>{domain.tasks.map((item) => <button key={item.id} className={item.id === task.id ? "active" : ""} onClick={() => setTaskId(item.id)}><b>Task {item.id}</b><span>{item.title}</span></button>)}</aside><article className="aip-c01-task-card"><header><p>{domain.weight} · DOMAIN {domain.number} · OFFICIAL TASK {task.id}</p><h3>{task.title}</h3><div className="aip-c01-ask"><strong>WHAT THIS TASK ASKS</strong><span>{task.focus[0]}. Use the visuals and related services below to explore the supporting design choices.</span></div></header><div className="aip-c01-task-grid"><section className="aip-c01-flow"><p className="aip-c01-section-label">KEY DECISIONS</p><div className="aip-c01-flow-track">{task.focus.slice(0, 4).map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span>{index < Math.min(task.focus.length, 4) - 1 && <i>→</i>}</div>)}</div><div className="aip-c01-coverage"><strong>WHAT TO PRACTISE</strong><ul>{task.focus.map((item) => <li key={item}>{item}</li>)}</ul></div></section><section className="aip-c01-services"><p className="aip-c01-section-label">RELATED SERVICES IN THIS COURSE</p><div>{task.services.map((service) => <button type="button" key={service} onClick={() => openAipCourseService(service)}>{service}<span>↗</span></button>)}</div><p className="aip-c01-service-note">Open a service in this course to study its role, then return to this task.</p></section></div>{["5-1","5-2","4-3","2-5"].includes(task.id) && <a className="aip-c01-troubleshooting-link" href="/courses/aws-generative-ai-developer-professional/visual/module-19">Explore practical GenAI troubleshooting cases →</a>}<div className="aip-c01-visuals"><div><p className="aip-c01-section-label">01 · PRIMARY WALKTHROUGH</p><VisualSlot task={task} kind="primary" onOpen={(src, alt) => setExpanded({ src, alt })} /></div><div><p className="aip-c01-section-label">02 · COMPANION WALKTHROUGH</p><VisualSlot task={task} kind="companion" onOpen={(src, alt) => setExpanded({ src, alt })} /></div></div></article></div>
    {expanded && <div className="aip-c01-modal" role="dialog" aria-modal="true" onClick={() => setExpanded(null)}><button type="button" onClick={() => setExpanded(null)}>Close ×</button><img src={expanded.src} alt={expanded.alt} onClick={(event) => event.stopPropagation()} /></div>}
  </section>;
}
