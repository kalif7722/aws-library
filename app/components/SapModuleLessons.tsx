'use client';
import {useEffect,useRef,useState} from 'react';
import plan from '../courses/aws-solutions-architect-professional/visual-lesson-map.json';
import './AifVisualCourse.css';

type Lesson={id:string;moduleId:string;sequence:number;title:string;asset:string|null;status:string;learningNotes:string[];decisionCue:string;examSkills:string[]};
const lessonsByModule=plan.lessonsByModule as Record<string,Lesson[]>;

export default function SapModuleLessons({moduleId}:{moduleId:string}){
 const own=lessonsByModule[moduleId]||[];
 const [availableOnly,setAvailableOnly]=useState(false),[query,setQuery]=useState(''),[active,setActive]=useState<number|null>(null);
 const opener=useRef<HTMLElement|null>(null),dialog=useRef<HTMLDivElement|null>(null);
 const visuals=own.filter(l=>l.asset&&l.status==='qa-passed');
 useEffect(()=>{if(active===null)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);opener.current?.focus()}if(e.key==='ArrowRight'){e.preventDefault();setActive(n=>n===null?n:Math.min(visuals.length-1,n+1))}if(e.key==='ArrowLeft'){e.preventDefault();setActive(n=>n===null?n:Math.max(0,n-1))}if(e.key==='Tab'){const buttons=Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')??[]);const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',onKey)}},[active,visuals.length]);
 const shown=own.filter(l=>(!availableOnly||l.asset)&&l.title.toLowerCase().includes(query.toLowerCase()));
 const close=()=>{setActive(null);opener.current?.focus()};
 return <><div className="aif-lesson-toolbar"><h2>Explore the topics</h2><input className="aif-lesson-search" aria-label="Search this module's topics" placeholder="Find a topic in this module…" value={query} onChange={e=>setQuery(e.target.value)}/><div><button aria-pressed={!availableOnly} onClick={()=>setAvailableOnly(false)}>All topics ({own.length})</button><button aria-pressed={availableOnly} onClick={()=>setAvailableOnly(true)}>Available visuals ({visuals.length})</button></div></div>
 <div className="aif-topics aif-glossy-topics">{shown.map(l=><article className="aif-topic" key={l.id}>{l.asset&&l.status==='qa-passed'&&<button onClick={()=>{opener.current=document.activeElement as HTMLElement;setActive(visuals.findIndex(v=>v.id===l.id))}} aria-label={`Open ${l.title} fullscreen`}><img loading="lazy" src={l.asset} alt={l.title}/></button>}<div className="aif-topic-body"><span className="aif-topic-number">LESSON {String(l.sequence).padStart(2,'0')}</span><h3>{l.title}</h3><small>{l.asset&&l.status==='qa-passed'?'Visual available':'Visual in preparation'}</small>{l.examSkills.length>0&&<small> · SAP-C03 skill {l.examSkills.join(' · ')}</small>}{l.asset&&l.learningNotes?.length>0&&<details><summary>Learn more · important details</summary>{l.learningNotes.map((note,i)=><p key={i}>{note}</p>)}<p><strong>Architecture decision:</strong> {l.decisionCue}</p></details>}</div></article>)}</div>
 {!shown.length&&<p className="aif-empty">{query?'No topics match your search.':'This module’s visuals are in preparation.'}</p>}
 {active!==null&&visuals[active]&&<div ref={dialog} className="aif-overlay" role="dialog" aria-modal="true" aria-label="SAP-C03 visual lesson fullscreen"><div className="aif-overlay-bar"><span>{visuals[active].title} · {active+1}/{visuals.length}</span><button autoFocus onClick={close}>Close ✕</button></div><button className="aif-prev" disabled={active===0} onClick={()=>setActive(active-1)} aria-label="Previous visual">❮</button><div className="aif-glossy-frame"><img src={visuals[active].asset!} alt={visuals[active].title}/></div><button className="aif-next" disabled={active===visuals.length-1} onClick={()=>setActive(active+1)} aria-label="Next visual">❯</button><span className="aif-overlay-help">← → Navigate · Esc Close</span></div>}
 </>;
}
