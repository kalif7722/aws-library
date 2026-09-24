"use client";

import { useState } from "react";
import { findGuide } from "./CertificationCourse";
import "./AwsSecurityCourseGuide.css";
import "./AwsExamTaskGuide.css";

export type ExamTask = { id: string; title: string; ask: string; focus: [string, string]; services: string[]; flow: [string, string, string, string] };
export type ExamDomain = { title: string; weight: number; tasks: ExamTask[] };
export type ExamGuide = { code: string; examCode: string; title: string; headline: string; intro: string; domains: ExamDomain[] };

const r2 = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs";

function TaskVisuals({ code, task }: { code: string; task: ExamTask }) {
  const [full, setFull] = useState<string | null>(null);
  const [missing, setMissing] = useState<Record<string, boolean>>({});
  const prefix = `${r2}/${code.toLowerCase()}-tasks/${code.toLowerCase()}-task-${task.id}`;
  return <div className="aws-security-walkthrough" aria-label={`${task.title} walkthrough images`}>
    <div className="aws-security-walkthrough-head"><b>WALKTHROUGH · {task.id.replace("-", ".")}</b><span>Open a board to view it full screen</span></div>
    <div className="aws-security-walkthrough-grid">{(["primary", "companion"] as const).map(kind => <figure key={kind}>
      <figcaption>{kind === "primary" ? "PRIMARY WALKTHROUGH" : "COMPANION COVERAGE"}</figcaption>
      {missing[kind] ? <div className="aws-exam-image-pending">{kind === "primary" ? "Primary" : "Companion"} visual pending</div> : <button type="button" onClick={event => { const img = event.currentTarget.querySelector("img"); if (img) setFull(img.currentSrc); }}>
        <img src={`${prefix}-${kind}.png`} alt={`${task.title} ${kind} visual`} loading="lazy" onError={event => { const img = event.currentTarget; if (!img.dataset.fallback) { img.dataset.fallback = "webp"; img.src = `${prefix}-${kind}.webp`; } else setMissing(previous => ({ ...previous, [kind]: true })); }} />
        <span>Open full screen</span>
      </button>}
    </figure>)}</div>
    {full && <div className="aws-security-lightbox" role="dialog" aria-modal="true" aria-label="Walkthrough image" onClick={() => setFull(null)}><button type="button" aria-label="Close full-screen walkthrough" onClick={() => setFull(null)}>×</button><img src={full} alt={`${task.title} full-screen visual`} onClick={event => event.stopPropagation()} /></div>}
  </div>;
}

export default function AwsExamTaskGuide({ guide, scopeServices }: { guide: ExamGuide; scopeServices: string[] }) {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const domain = guide.domains[domainIndex];
  const task = domain.tasks[taskIndex];
  const selectable = task.services.filter(service => scopeServices.includes(service) && !!findGuide(service));
  const openService = (name: string) => window.dispatchEvent(new CustomEvent("aws-course-service", { detail: { name, courseCode: guide.code } }));
  return <section className="aws-security-course aws-exam-course" id={`${guide.code.toLowerCase()}-exam-guide`} data-course-layout="shared-task-shell-v2">
    <div className="aws-security-course-header"><div className="aws-security-course-header-main">
      <p className="aws-security-kicker">{guide.title.toUpperCase()} · {guide.examCode} · TASK-FIRST COURSE</p><h1>{guide.headline}</h1><p>{guide.intro}</p>
    </div><div className="aws-security-course-stats"><strong>{String(guide.domains.length).padStart(2, "0")}</strong><span>exam domains</span><strong>{guide.domains.reduce((sum, item) => sum + item.tasks.length, 0)}</strong><span>official tasks</span><strong>100%</strong><span>domain coverage</span></div></div>
    <div className="aws-security-domain-tabs" role="tablist" aria-label="Exam domains">{guide.domains.map((item, index) => <button type="button" role="tab" aria-selected={index === domainIndex} key={item.title} className={index === domainIndex ? "active" : ""} onClick={() => { setDomainIndex(index); setTaskIndex(0); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><em>{item.weight}%</em></button>)}</div>
    <div className="aws-security-layout"><aside className="aws-security-task-list" aria-label="Tasks in selected domain"><div className="aws-security-task-list-title">TASKS · {domain.title}</div>{domain.tasks.map((item, index) => <button type="button" key={item.id} className={`aws-aif-task ${index === taskIndex ? "active" : ""}`} aria-current={index === taskIndex ? "step" : undefined} onClick={() => setTaskIndex(index)}><span>{item.id.replace("-", ".")}</span><strong>{item.title}</strong></button>)}</aside>
      <main className="aws-security-main" id={`${guide.code.toLowerCase()}-task-content`}><p className="aws-security-kicker">DOMAIN {String(domainIndex + 1).padStart(2, "0")} · {domain.weight}% · OFFICIAL OBJECTIVE</p><h2>{task.title}</h2><p className="aws-security-breadcrumb">{domain.title} → Task {task.id.replace("-", ".")}</p>
        <div className="aws-security-ask"><b>WHAT THIS TASK ASKS</b><span>{task.ask}</span></div>
        <div className="aws-security-content-grid"><div className="aws-security-visual-card"><p className="aws-security-label">VISUAL EXPLAINER · {guide.examCode}</p><h3>{task.title}</h3><p>{task.ask}</p><div className="aws-security-flow">{task.flow.map((step, index) => <span key={step}>{step}{index < 3 && <i>→</i>}</span>)}</div><p className="aws-security-explanation">{task.focus[0]}</p></div>
          <div className="aws-security-focus-card"><p className="aws-security-label">GUIDE-ALIGNED FOCUS</p>{task.focus.map(item => <p key={item}>{item}</p>)}<p className="aws-security-label">RELATED {guide.examCode} SERVICES</p><div className="aws-security-services">{selectable.map(service => <button type="button" key={service} onClick={() => openService(service)}>{service} ↗</button>)}</div></div></div>
        <div className="aws-security-flow-card"><p className="aws-security-label">TASK-TO-DESIGN FLOW</p><div>{task.flow.map((step, index) => <article key={step}><b>0{index + 1}</b><span>{step}</span></article>)}</div></div>
        <TaskVisuals key={task.id} code={guide.examCode} task={task} /><div className="aws-security-memory"><b>EXAM MEMORY HOOK</b><span>{task.focus[1]}</span></div>
      </main></div>
  </section>;
}
