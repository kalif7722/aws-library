'use client';
import {Fragment,useEffect,useRef,useState} from 'react';
import plan from '../courses/aws-solutions-architect-professional/visual-lesson-map.json';
import './AifVisualCourse.css';
import './SapLessonEnhancement.css';
import './CourseStudyTools.css';
import {StudyStatus,useStudyProgress} from './StudyProgress';

type Lesson={id:string;moduleId:string;sequence:number;title:string;asset:string|null;status:string;learningNotes:string[];decisionCue:string;examSkills:string[]};
const lessonsByModule=plan.lessonsByModule as Record<string,Lesson[]>;
const M10_FOUNDATIONS:Lesson[]=[
 {id:'sap-10-foundation-ebs',moduleId:'10',sequence:0,title:'What Amazon EBS does',asset:'/course-visuals/sap-c03/module-10/foundation-ebs.webp',status:'qa-passed',learningNotes:['EBS provides persistent block storage for EC2 boot volumes and transactional data. A volume attaches within its Availability Zone; snapshots provide a recovery source.'],decisionCue:'Choose EBS for EC2 block storage, then plan performance and recovery.',examSkills:[]},
 {id:'sap-10-foundation-efs',moduleId:'10',sequence:10.5,title:'What Amazon EFS does',asset:'/course-visuals/sap-c03/module-10/foundation-efs.webp',status:'qa-passed',learningNotes:['EFS provides managed NFS file storage for concurrent Linux clients. Regional storage spans Availability Zones; One Zone stays within one AZ.'],decisionCue:'Choose EFS for shared POSIX files, while planning network and file permissions.',examSkills:[]},
 {id:'sap-10-foundation-fsx',moduleId:'10',sequence:16.5,title:'What Amazon FSx does',asset:'/course-visuals/sap-c03/module-10/foundation-fsx.webp',status:'qa-passed',learningNotes:['FSx offers managed file systems for Windows File Server, Lustre, NetApp ONTAP, and OpenZFS workloads.'],decisionCue:'Choose the FSx family by protocol, workload, deployment boundary, and recovery needs.',examSkills:[]}
];
// Safeguard for the six approved, uploaded SAP M02 visuals. This also keeps older
// cached course-map builds from silently hiding the newly published images.
const M02_ADDITIONS:Lesson[]=[
  {id:'sap-02-027',title:'AWS Control Tower — Drift Detection and Remediation'},
  {id:'sap-02-028',title:'CloudFormation StackSets Across Accounts and Regions'},
  {id:'sap-02-029',title:'AWS Budgets, Cost Categories and Cost Allocation'},
  {id:'sap-02-030',title:'AWS Account Lifecycle and Closure'},
  {id:'sap-02-031',title:'Control Tower — Landing-Zone Updates and Account Enrollment'},
  {id:'sap-02-032',title:'Multi-Account Governance — Troubleshooting Example'}
].map((x,i)=>({...x,moduleId:'02',sequence:i+27,asset:`/course-visuals/sap-c03/module-02/slide-${i+27}.webp`,status:'qa-passed',learningNotes:[],decisionCue:'Follow the pictured governance architecture and validate its effective controls.',examSkills:[]}));
function publishedModuleLessons(moduleId:string):Lesson[]{
 const existing=lessonsByModule[moduleId]||[];
 if(moduleId==='10')return [...existing,...M10_FOUNDATIONS].sort((a,b)=>a.sequence-b.sequence);
 if(moduleId!=='02')return existing;
 const bySequence=new Map(existing.map(l=>[l.sequence,l]));
 for(const addition of M02_ADDITIONS){
   const old=bySequence.get(addition.sequence);
   if(!old||!old.asset||old.status!=='qa-passed')bySequence.set(addition.sequence,addition);
 }
 return [...bySequence.values()].sort((a,b)=>a.sequence-b.sequence);
}

export default function SapModuleLessons({moduleId}:{moduleId:string}){
 const own=publishedModuleLessons(moduleId);
 const [availableOnly,setAvailableOnly]=useState(false),[query,setQuery]=useState(''),[active,setActive]=useState<number|null>(null);
 const opener=useRef<HTMLElement|null>(null),dialog=useRef<HTMLDivElement|null>(null);
 const visuals=own.filter(l=>l.asset&&l.status==='qa-passed');const imageUrl=(asset:string)=>moduleId==='00'?`${asset}?v=sap-m00-cover-v2`:moduleId==='02'?`${asset}?v=sap-m02-approved-32`:asset;const study=useStudyProgress('sap',active===null?null:visuals[active]?.id||null);
 useEffect(()=>{const lesson=new URLSearchParams(window.location.search).get('lesson');const index=visuals.findIndex(l=>l.id===lesson);if(index>=0)setActive(index)},[moduleId]);
 useEffect(()=>{if(active===null)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);opener.current?.focus()}if(e.key==='ArrowRight'){e.preventDefault();setActive(n=>n===null?n:Math.min(visuals.length-1,n+1))}if(e.key==='ArrowLeft'){e.preventDefault();setActive(n=>n===null?n:Math.max(0,n-1))}if(e.key==='Tab'){const buttons=Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')??[]);const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',onKey)}},[active,visuals.length]);
 const shown=own.filter(l=>(!availableOnly||l.asset)&&`${l.title} ${(l.learningNotes||[]).join(' ')} ${l.decisionCue||''}`.toLowerCase().includes(query.toLowerCase()));
 const close=()=>{setActive(null);opener.current?.focus()};
 return <>{moduleId==='04'&&<section className="course-study-progress" id="network-security"><h2>Network and edge security</h2><p>Inspection VPC and symmetric routing → Gateway Load Balancer → AWS Network Firewall → AWS WAF → Shield Standard and Shield Advanced → layered segmentation. The detection and response path continues in Module 17.</p><a href="/courses/aws-solutions-architect-professional/visual/module-17">Continue to security visibility →</a></section>}<div className="aif-lesson-toolbar"><h2>Explore the topics</h2><input className="aif-lesson-search" aria-label="Search this module's topics" placeholder="Find a topic in this module…" value={query} onChange={e=>setQuery(e.target.value)}/><div><button aria-pressed={!availableOnly} onClick={()=>setAvailableOnly(false)}>All topics ({own.length})</button><button aria-pressed={availableOnly} onClick={()=>setAvailableOnly(true)}>Available visuals ({visuals.length})</button></div></div>
 <div className="aif-topics aif-glossy-topics sap-lesson-grid">{shown.map((l,i)=><Fragment key={l.id}>{moduleId==='04'&&l.sequence>=25&&(i===0||shown[i-1].sequence<25)&&<h2 className="sap-section-heading">Network and edge security · inspection, WAF and Shield</h2>}{moduleId==='04'&&l.sequence>=31&&(i===0||shown[i-1].sequence<31)&&<h2 className="sap-section-heading">IPv6 and architecture decisions</h2>}<article className="aif-topic sap-lesson-card">{l.asset&&l.status==='qa-passed'&&<button onClick={()=>{opener.current=document.activeElement as HTMLElement;setActive(visuals.findIndex(v=>v.id===l.id))}} aria-label={`Open ${l.title} fullscreen`}><img loading="lazy" src={imageUrl(l.asset)} alt={l.title}/></button>}<div className="aif-topic-body sap-lesson-body"><div className="sap-lesson-kicker"><span className="aif-topic-number">{l.id.startsWith('sap-10-foundation-')?'FOUNDATION':`LESSON ${String(l.sequence).padStart(2,'0')}`}</span><span className={`sap-lesson-status ${l.asset&&l.status==='qa-passed'?'ready':'pending'}`}>{l.asset&&l.status==='qa-passed'?(study.completed.includes(l.id)?'✓ Complete':'Visual ready'):'In preparation'}</span></div><h3>{l.title}</h3>{l.asset&&(l.learningNotes?.length>0||l.examSkills.length>0)&&<details className="sap-lesson-details"><summary><span>View lesson details <em>(optional)</em></span><span className="sap-details-chevron" aria-hidden="true">⌄</span></summary>{l.examSkills.length>0&&<p className="sap-lesson-skills">SAP-C03 exam skill {l.examSkills.join(' · ')}</p>}{l.learningNotes?.length>0&&<ul>{l.learningNotes.map((note,i)=><li key={i}>{note}</li>)}</ul>}{l.decisionCue&&<div className="sap-decision"><strong>Architecture decision</strong><p>{l.decisionCue}</p></div>}</details>}</div></article></Fragment>)}</div>
 {!shown.length&&<p className="aif-empty">{query?'No topics match your search.':'This module’s visuals are in preparation.'}</p>}
 {active!==null&&visuals[active]&&<div ref={dialog} className="aif-overlay" role="dialog" aria-modal="true" aria-label="SAP-C03 visual lesson fullscreen"><div className="aif-overlay-bar"><span>{visuals[active].title} · {active+1}/{visuals.length}</span><button autoFocus onClick={close}>Close ✕</button></div><button className="aif-prev" disabled={active===0} onClick={()=>setActive(active-1)} aria-label="Previous visual">❮</button><div className="aif-glossy-frame"><img src={imageUrl(visuals[active].asset!)} alt={visuals[active].title}/></div><button className="aif-next" disabled={active===visuals.length-1} onClick={()=>setActive(active+1)} aria-label="Next visual">❯</button><span className="aif-overlay-help">← → Navigate · Esc Close</span><StudyStatus completed={study.completed.includes(visuals[active].id)} seconds={study.seconds} onAcknowledge={study.acknowledge}/></div>}
 </>;
}
