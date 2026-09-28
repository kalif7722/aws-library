"use client";

import { useEffect, useMemo, useState } from "react";
import type { GcpCourse } from "../gcp-course-data";
import { gcpOfficialExamDomains } from "../gcp-exam-objectives";
import { gcpRelatedServicesForSkill } from "../gcp-course-services";
import "./Az900CourseGuide.css";
import "./AzureAdvancedCourseGuide.css";
import "./GcpProfessionalCourseGuide.css";

const R2_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/gcp-certification-walkthroughs";

function Board({ course, id, kind, title }: { course: GcpCourse; id: string; kind: "primary" | "companion"; title: string }) {
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const filename = `${course.assetPrefix}-task-${id}-${kind}.webp`;
  const sources = [
    `${R2_BASE}/${course.assetPrefix}/${filename}`,
    `${R2_BASE}/${course.assetPrefix}-tasks/${filename}`,
  ];
  const src = sources[sourceIndex];

  useEffect(() => {
    setMissing(false);
    setOpen(false);
    setSourceIndex(0);
  }, [course.code, id, kind]);

  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const handleMissing = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(sourceIndex + 1);
      return;
    }
    setMissing(true);
  };

  return <figure className="az900-board gcp-course-board">
    <figcaption>{kind === "primary" ? "PRIMARY WALKTHROUGH" : "COMPANION COVERAGE"}</figcaption>
    {missing ? <div className="az900-board-pending"><div><strong>{kind === "primary" ? "Primary" : "Companion"} walkthrough pending</strong><small>{filename}</small></div></div> :
      <button onClick={() => setOpen(true)} aria-label={`Open ${title} ${kind} full screen`} type="button">
        <img src={src} alt={`${title} ${kind} walkthrough`} loading="lazy" onError={handleMissing} />
        <span>Open full screen ↗</span>
      </button>}
    {open && <div className="az900-lightbox" role="dialog" aria-modal="true" aria-label={`${title} ${kind}`} onClick={() => setOpen(false)}>
      <button className="az900-lightbox-close" aria-label="Close walkthrough" onClick={() => setOpen(false)} type="button">×</button>
      <img src={src} alt={`${title} ${kind} full view`} onClick={event => event.stopPropagation()} />
    </div>}
  </figure>;
}

export default function GcpProfessionalCourseGuide({ course }: { course: GcpCourse }) {
  const domains = gcpOfficialExamDomains[course.code] || [];
  const [domainIndex, setDomainIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);
  const domain = domains[domainIndex];
  const group = domain?.groups[groupIndex];
  const related = useMemo(() => group ? gcpRelatedServicesForSkill(group) : [], [group]);
  const count = domains.reduce((sum, item) => sum + item.groups.length, 0);

  if (!domain || !group) return null;

  const selectService = (slug: string) => {
    window.dispatchEvent(new CustomEvent("gcp-course-service", { detail: { slug, courseCode: course.code } }));
  };

  return <section className="az900-guide azure-advanced-guide gcp-professional-guide" id={`${course.assetPrefix}-exam-guide`}>
    <header className="az900-hero gcp-course-hero">
      <div>
        <p>GOOGLE CLOUD CERTIFIED · {course.code} · OFFICIAL EXAM GUIDE</p>
        <h2>{course.title}, one skill area at a time</h2>
        <span>{domains.length} weighted domains · {count} skill areas · primary and companion walkthrough placements aligned with the supplied Google exam guide.</span>
      </div>
      <div className="az900-hero-stats"><strong>{domains.length}</strong><span>exam domains</span><strong>{count}</strong><span>skill areas</span></div>
    </header>

    {course.notes?.length ? <div className="gcp-course-notes">{course.notes.map(note => <div key={note}><b>GUIDE NOTE</b><span>{note}</span></div>)}</div> : null}

    <div className="az900-domain-tabs gcp-domain-tabs" role="tablist" aria-label={`${course.code} exam domains`}>
      {domains.map((item, index) => <button key={item.name} role="tab" aria-selected={index === domainIndex} className={index === domainIndex ? "active" : ""} onClick={() => { setDomainIndex(index); setGroupIndex(0); }} type="button">
        <b>{String(index + 1).padStart(2, "0")}</b><span>{item.name}</span><em>{item.weight}</em>
      </button>)}
    </div>

    <div className="az900-layout">
      <aside aria-label="Skill areas in selected domain">
        <strong>SKILL AREAS · {domain.name}</strong>
        {domain.groups.map((item, index) => <button key={item.id} className={index === groupIndex ? "active" : ""} aria-current={index === groupIndex ? "step" : undefined} onClick={() => setGroupIndex(index)} type="button">
          <b>{item.id.replace("-", ".")}</b><span>{item.name}</span>
        </button>)}
      </aside>

      <article className="az900-main">
        <p className="az900-kicker">DOMAIN {String(domainIndex + 1).padStart(2, "0")} · {domain.weight} · OFFICIAL EXAM GUIDE</p>
        <h3>{group.name}</h3>
        <p className="az900-breadcrumb">{domain.name} → Skill area {group.id.replace("-", ".")}</p>

        <div className="az900-ask"><b>WHAT THIS SKILL AREA ASKS</b><span>Apply the considerations below to select, design, implement, operate, or evaluate the appropriate Google Cloud approach for the scenario.</span></div>

        <div className="az900-summary">
          <div>
            <p className="az900-kicker">VISUAL EXPLAINER · {course.code}</p>
            <h4>{group.name}</h4>
            <div className="az900-flow"><span>Requirement</span><span>Choose GCP approach</span><span>Design / configure</span><span>Validate outcome</span></div>
            <p>Trace the requirement through the Google Cloud service or control named in the guide, then validate availability, security, operations, performance, or cost as the skill area requires.</p>
          </div>
          <div>
            <p className="az900-kicker">EXAM DECISION CUES</p>
            <p>Read the scenario for scope, responsibility, constraints, tradeoffs, failure behavior, security boundaries, and operational evidence before choosing an answer.</p>
            {related.length > 0 && <><p className="az900-kicker">RELATED GCP SERVICES</p><div className="az900-services">{related.map(service => <button key={service.slug} onClick={() => selectService(service.slug)} type="button">{service.displayName} ↗</button>)}</div></>}
          </div>
        </div>

        <div className="az900-objectives"><p className="az900-kicker">SKILLS MEASURED IN THIS AREA</p><ul>{group.tasks.map(task => <li key={task}>{task}</li>)}</ul></div>
        <div className="az900-boards"><Board course={course} id={group.id} kind="primary" title={group.name} /><Board course={course} id={group.id} kind="companion" title={group.name} /></div>
      </article>
    </div>
  </section>;
}
