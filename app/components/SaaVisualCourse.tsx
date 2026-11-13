'use client';
import {useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {ArrowRight,BookOpen,GraduationCap,Layers,ShieldCheck} from 'lucide-react';
import plan from '../courses/aws-solutions-architect-associate/visual-plan.json';
import SaaModuleReference from './SaaModuleReference';
import {architectureModuleTile} from './ArchitectureModuleTiles';
import './AifVisualCourse.css';
import './ArchitectureModuleTiles.css';
import './SaaVisualCourse.css';
import './CourseStudyTools.css';
import CourseSearch from './CourseSearch';
import {CourseProgress,StudyStatus,useStudyProgress} from './StudyProgress';

type Lesson={id:string;title:string;pdfPages:string;summary:string;asset:string;status:string};
type Module=(typeof plan.modules)[number] & {lessons?:Lesson[];pdfCoverageNote?:string};
const modules=plan.modules as Module[];
const base='/courses/aws-solutions-architect-associate/visual/module-';
const courseItems=modules.flatMap(m=>(m.lessons||[]).map(l=>({id:l.id,title:l.title,moduleTitle:`Module ${m.id} · ${m.title}`,href:`${base}${m.id}?lesson=${encodeURIComponent(l.id)}`,terms:`${l.summary} ${m.title}`})));
const progressItems=courseItems.map(x=>({id:x.id,moduleId:x.moduleTitle,title:x.title,href:x.href}));

export function SaaOverview(){
 const available=modules.reduce((n,m)=>n+(m.lessons?.length||0),0);
 return <main className="aif-course"><section className="aif-hero"><div><p className="aif-eyebrow">VISUAL LEARNING PATH · AWS SAA-C03</p><h1>See the architecture.<br/>Understand the choice.</h1><p className="aif-hero-copy">Follow a clear sequence of visual explanations, AWS service decisions and architecture walkthroughs.</p><a className="aif-hero-action" href={`${base}00`}>Explore the learning path <ArrowRight size={17}/></a></div><div><img className="aif-hero-badge" src="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-badges/solutions-architect-associate.png" alt="AWS Certified Solutions Architect Associate badge"/><div className="aif-hero-stats"><div><Layers/><strong>{modules.length}</strong><span>learning modules</span></div><div><BookOpen/><strong>{available}</strong><span>visual lessons available</span></div><div><ShieldCheck/><strong>SAA-C03</strong><span>exam objectives</span></div><div><GraduationCap/><strong>Study</strong><span>track each slide</span></div></div></div></section>
 <nav className="aif-quicknav" aria-label="Course navigation"><a href="#learning-path">Learning modules</a><a href="https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf" target="_blank" rel="noreferrer">Exam objectives & tasks ↗</a><a href="#service-reference">AWS services reference</a><a href="https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf" target="_blank" rel="noreferrer">Official exam guide ↗</a><CourseSearch items={courseItems}/><CourseProgress course="saa" lessons={progressItems}/></nav>
 <section className="aif-section-heading" id="learning-path"><div><p className="aif-eyebrow">ONE CONNECTED ARCHITECTURE JOURNEY</p><h2>Your learning path</h2><p>Start with AWS foundations, then connect security, networking, compute, data, resilience, performance, and cost decisions.</p></div><span className="aif-path-tag">Understand · Compare · Apply</span></section>
 <div className="aif-module-grid architecture-module-grid">{modules.map(m=>{const {Icon,accent}=architectureModuleTile('saa',m.id);return <a key={m.id} href={`${base}${m.id}`} className="aif-module-card" style={{'--aif-accent':accent} as CSSProperties}><div className="aif-card-top"><span className="aif-module-icon"><Icon size={27} strokeWidth={1.7}/></span><span>MODULE {m.id}</span></div><h3>{m.title}</h3><p>{m.scope}</p><div className="aif-card-meta"><span>{m.lessons?.length?`${m.lessons.length} available`:'In preparation'}</span></div><div className="aif-card-footer">Explore topics <ArrowRight size={16}/></div></a>})}</div>
 <section className="aif-coverage" id="service-reference"><div><p className="aif-eyebrow">AWS SERVICES REFERENCE</p><h2>Services in architecture context.</h2><p>Open a module to study its AWS services, access paths and design choices. IAM foundations begin in <a href={`${base}01`}>Module 01</a>.</p></div></section></main>;
}

export function SaaModule({id}:{id:string}){
 const m=modules.find(x=>x.id===id),index=modules.findIndex(x=>x.id===id);const lessons=m?.lessons||[];
 const [active,setActive]=useState<number|null>(null);const study=useStudyProgress('saa',active===null?null:lessons[active]?.id||null);const opener=useRef<HTMLElement|null>(null);
 useEffect(()=>{if(active===null)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);opener.current?.focus()}if(e.key==='ArrowLeft')setActive(n=>n===null?n:Math.max(0,n-1));if(e.key==='ArrowRight')setActive(n=>n===null?n:Math.min(lessons.length-1,n+1))};window.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',onKey)}},[active,lessons.length]);
 useEffect(()=>{const id=new URLSearchParams(window.location.search).get('lesson');const found=lessons.findIndex(l=>l.id===id);if(found>=0)setActive(found)},[id]);
 if(!m)return null;
 return <main className="aif-course saa-module"><section className="aif-hero aif-module-hero"><div><nav className="aif-breadcrumb"><a href="/courses/aws-solutions-architect-associate">SAA course</a> / Module {id}</nav><p className="aif-eyebrow">MODULE {id} · SAA-C03 VISUAL LEARNING</p><h1>{m.title}</h1><p className="aif-hero-copy">{m.scope}</p><div className="aif-module-facts"><span>{lessons.length} available visuals</span><span>{m.labs.length} related walkthroughs</span></div></div></section>
 {lessons.length?<section className="saa-path"><div className="saa-heading"><h2>Visual lessons</h2><p>Explore the architecture concepts and decisions in this module.</p></div><div className="saa-lesson-grid">{lessons.map((l,i)=><article key={l.id} className="saa-lesson"><button onClick={()=>{opener.current=document.activeElement as HTMLElement;setActive(i)}} aria-label={`Open ${l.title} fullscreen`}><img src={l.asset} alt={l.title} loading="lazy"/></button><div><small>LESSON {String(i+1).padStart(2,'0')} {study.completed.includes(l.id)?'· ✓ Complete':''}</small><h3>{l.title}</h3><p>{l.summary}</p></div></article>)}</div></section>:null}
 {m.labs.length>0&&<section className="saa-labs"><h2>Related console walkthroughs</h2><p>Explore related console walkthroughs for this topic.</p><div>{m.labs.map(l=><a key={l.id} href={`/troubleshooting/walkthroughs?lab=${l.id}`}>{l.title}<span>{l.priority} · View walkthrough ↗</span></a>)}</div></section>}
 <SaaModuleReference moduleId={id} topics={m.plannedTopics}/><CourseProgress course="saa" lessons={progressItems.filter(l=>l.href.includes(`/module-${id}`))}/>
 <nav className="saa-pager"><span>{index>0&&<a href={`${base}${modules[index-1].id}`}>← {modules[index-1].title}</a>}</span><span>{index<modules.length-1&&<a href={`${base}${modules[index+1].id}`}>{modules[index+1].title} →</a>}</span></nav>
 {active!==null&&lessons[active]&&<div className="saa-overlay" role="dialog" aria-modal="true" aria-label="SAA visual lesson fullscreen"><div className="saa-overlay-bar"><span>{lessons[active].title} · {active+1}/{lessons.length}</span><button autoFocus onClick={()=>{setActive(null);opener.current?.focus()}}>Close ✕</button></div><button disabled={active===0} onClick={()=>setActive(active-1)} aria-label="Previous slide">❮</button><img src={lessons[active].asset} alt={lessons[active].title}/><button disabled={active===lessons.length-1} onClick={()=>setActive(active+1)} aria-label="Next slide">❯</button><StudyStatus completed={study.completed.includes(lessons[active].id)} seconds={study.seconds} onAcknowledge={study.acknowledge}/></div>}</main>;
}
