"use client";
import { useEffect, useState } from "react";
import type { AzureCourse } from "../azure-course-data";
import { azureOfficialExamDomains } from "../azure-exam-objectives";
import "./Az900CourseGuide.css";
import "./AzureAdvancedCourseGuide.css";
const base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";
function Board({code,id,kind,title}:{code:string;id:string;kind:"primary"|"companion";title:string}) {
  const [missing,setMissing]=useState(false),[open,setOpen]=useState(false);
  useEffect(()=>{setMissing(false);setOpen(false)},[code,id,kind]);
  useEffect(()=>{if(!open)return;const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[open]);
  const src=`${base}/${code.toLowerCase()}-tasks/${code.toLowerCase()}-task-${id}-${kind}.webp`;
  return <figure className="az900-board"><figcaption>{kind==="primary"?"PRIMARY WALKTHROUGH":"COMPANION COVERAGE"}</figcaption>{missing?<div className="az900-board-pending">{kind} visual pending</div>:<button onClick={()=>setOpen(true)} aria-label={`Open ${title} ${kind} full screen`}><img src={src} alt={`${title} ${kind} walkthrough`} loading="lazy" onError={()=>setMissing(true)}/><span>Open full screen ↗</span></button>}{open&&<div className="az900-lightbox" role="dialog" aria-modal="true" aria-label={`${title} ${kind}`} onClick={()=>setOpen(false)}><button className="az900-lightbox-close" aria-label="Close walkthrough" onClick={()=>setOpen(false)}>×</button><img src={src} alt={`${title} ${kind} full view`} onClick={e=>e.stopPropagation()}/></div>}</figure>;
}
export default function AzureAdvancedCourseGuide({course}:{course:AzureCourse}) {
  const domains=azureOfficialExamDomains[course.code]||[];
  const [domainIndex,setDomainIndex]=useState(0),[groupIndex,setGroupIndex]=useState(0);
  const domain=domains[domainIndex],group=domain?.groups[groupIndex];if(!domain||!group)return null;
  const id=`${domainIndex+1}-${groupIndex+1}`;
  const scope=[...new Set(course.scope.flatMap(c=>c.services.map(s=>s.name)))];
  const words=`${group.name} ${group.tasks.join(" ")}`.toLowerCase();
  const related=scope.filter(name=>{const terms=name.toLowerCase().replace(/^(azure|microsoft)\s+/,"").replace(/\s*\([^)]*\)/g,"").split(/\s+/).filter(t=>t.length>3);return terms.length>0&&terms.every(t=>words.includes(t))}).slice(0,6);
  const selectService=(name:string)=>window.dispatchEvent(new CustomEvent("azure-course-service",{detail:{name,courseCode:course.code}}));
  const count=domains.reduce((n,d)=>n+d.groups.length,0);
  return <section className="az900-guide azure-advanced-guide" id={`${course.code.toLowerCase()}-exam-guide`}>
    <header className="az900-hero"><div><p>MICROSOFT CERTIFIED · {course.code} · OFFICIAL SKILLS</p><h2>{course.title}, one skill area at a time</h2><span>{domains.length} weighted domains · {count} skill areas · primary and companion walkthroughs aligned with the supplied study guide.</span></div><div className="az900-hero-stats"><strong>{domains.length}</strong><span>exam domains</span><strong>{count}</strong><span>skill areas</span></div></header>
    <div className="az900-domain-tabs" role="tablist" aria-label={`${course.code} exam domains`}>{domains.map((d,i)=><button key={d.name} role="tab" aria-selected={i===domainIndex} className={i===domainIndex?"active":""} onClick={()=>{setDomainIndex(i);setGroupIndex(0)}}><b>{String(i+1).padStart(2,"0")}</b><span>{d.name}</span><em>{d.weight}</em></button>)}</div>
    <div className="az900-layout"><aside aria-label="Skill areas in selected domain"><strong>SKILL AREAS · {domain.name}</strong>{domain.groups.map((g,i)=><button key={g.name} className={i===groupIndex?"active":""} aria-current={i===groupIndex?"step":undefined} onClick={()=>setGroupIndex(i)}><b>{domainIndex+1}.{i+1}</b><span>{g.name}</span></button>)}</aside><article className="az900-main"><p className="az900-kicker">DOMAIN {String(domainIndex+1).padStart(2,"0")} · {domain.weight} · OFFICIAL STUDY GUIDE</p><h3>{group.name}</h3><p className="az900-breadcrumb">{domain.name} → Skill area {id.replace("-",".")}</p><div className="az900-ask"><b>WHAT THIS SKILL AREA ASKS</b><span>Apply the skills below to select, implement, or evaluate the appropriate Azure solution for the scenario.</span></div><div className="az900-summary"><div><p className="az900-kicker">VISUAL EXPLAINER · {course.code}</p><h4>{group.name}</h4><div className="az900-flow"><span>Requirements</span><span>Choose approach</span><span>Implement or design</span><span>Validate outcome</span></div><p>Trace the decision from the stated requirement through the selected control or service to a verifiable outcome.</p></div><div><p className="az900-kicker">EXAM DECISION CUES</p><p>Identify scope, operational responsibility, constraints, and evidence before choosing a service or configuration.</p>{related.length>0&&<><p className="az900-kicker">RELATED {course.code} SERVICES</p><div className="az900-services">{related.map(name=><button key={name} onClick={()=>selectService(name)}>{name} ↗</button>)}</div></>}</div></div><div className="az900-objectives"><p className="az900-kicker">SKILLS MEASURED IN THIS AREA</p><ul>{group.tasks.map(t=><li key={t}>{t}</li>)}</ul></div><div className="az900-boards"><Board code={course.code} id={id} kind="primary" title={group.name}/><Board code={course.code} id={id} kind="companion" title={group.name}/></div></article></div>
  </section>;
}
