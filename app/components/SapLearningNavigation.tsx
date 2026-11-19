'use client';
import {useEffect,useId,useMemo,useState} from 'react';
import Link from 'next/link';
import plan from '../courses/aws-solutions-architect-professional/visual-lesson-map.json';
import {publishedModuleLessons} from './SapPublishedLessons';
import './SapLearningNavigation.css';

const base='/courses/aws-solutions-architect-professional';
const videoModules=new Set(['00','01','02','03','04','05','06','07','08','09','10','15']);
const moduleHref=(id:string)=>`${base}/visual/module-${id}`;

/** Navigation only: keeps the existing viewer, media player and progress writes intact. */
export default function SapLearningNavigation({moduleId}:{moduleId:string}){
 const inputId=useId();
 const [query,setQuery]=useState('');
 const [completed,setCompleted]=useState<string[]|null>(null);
 const modules=plan.modules.filter(m=>m.id!=='26'&&m.id!=='27');
 const index=modules.findIndex(m=>m.id===moduleId);
 const previous=modules[index-1],next=modules[index+1];
 const lessons=useMemo(()=>publishedModuleLessons(moduleId).filter(l=>l.asset&&l.status==='qa-passed'),[moduleId]);
 const matches=useMemo(()=>{const term=query.trim().toLocaleLowerCase();return term?lessons.filter(l=>`${l.title} ${l.learningNotes?.join(' ')??''}`.toLocaleLowerCase().includes(term)):[]},[query,lessons]);
 useEffect(()=>{
  const sync=()=>{try{const value=JSON.parse(localStorage.getItem('study-progress:v1:sap')||'[]');setCompleted(Array.isArray(value)?value.filter((v:unknown):v is string=>typeof v==='string'):[])}catch{setCompleted([])}};
  sync();window.addEventListener('storage',sync);window.addEventListener('study-progress-change',sync);
  return()=>{window.removeEventListener('storage',sync);window.removeEventListener('study-progress-change',sync)};
 },[]);
 useEffect(()=>setQuery(''),[moduleId]);
 const done=completed===null?0:lessons.filter(l=>completed.includes(l.id)).length;
 const resume=completed===null?undefined:lessons.find(l=>!completed.includes(l.id));
 return <section className="sap-learning-nav" aria-label="Module learning navigation">
  <div className="sap-learning-nav-top">
   <Link href={base}>← Course overview</Link>
   <nav aria-label="Module content"><a href="#visual-lessons">Slides</a>{videoModules.has(moduleId)&&<a href="#video-lectures">Videos</a>}</nav>
   {completed!==null&&lessons.length>0&&<span className="sap-learning-progress">{done} of {lessons.length} slides studied</span>}
  </div>
  <div className="sap-learning-neighbors" aria-label="Adjacent learning modules">
   <span>{previous&&<Link href={moduleHref(previous.id)}>← {previous.title}</Link>}</span>
   <span>{next&&<Link href={moduleHref(next.id)}>{next.title} →</Link>}</span>
  </div>
  <details className="sap-learning-outline">
   <summary>Browse modules <span>Current: Module {moduleId}</span></summary>
   <nav aria-label="Course module outline"><ol>{modules.map(m=><li key={m.id}><Link href={moduleHref(m.id)} aria-current={m.id===moduleId?'page':undefined}><span>{m.id}</span>{m.title}</Link></li>)}</ol></nav>
  </details>
  <div className="sap-learning-find">
   <div><label htmlFor={inputId}>Find a slide in this module</label><input id={inputId} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a topic or service"/></div>
   {resume&&<a className="sap-learning-resume" href={`${moduleHref(moduleId)}?lesson=${encodeURIComponent(resume.id)}`}>{done?'Continue with next unstudied slide':'Start visual lessons'}<small>{resume.title}</small></a>}
   {completed!==null&&done===lessons.length&&lessons.length>0&&<span className="sap-learning-progress">All available slides studied. Select any slide to review.</span>}
  </div>
  {query.trim()&&<div className="sap-learning-results"><p role="status">{matches.length} matching {matches.length===1?'slide':'slides'}</p><ul>{matches.map(l=><li key={l.id}><a href={`${moduleHref(moduleId)}?lesson=${encodeURIComponent(l.id)}`}>{l.title}</a></li>)}</ul></div>}
 </section>;
}
