"use client";
import {useEffect,useRef,useState} from "react";
import plan from "../courses/aws-security-specialty/visual-plan.json";
import "./SecurityVisualCourse.css";
export default function SecurityVisualCourse(){
 const slides=plan.modules.flatMap(m=>m.slides);
 const [active,setActive]=useState<number|null>(null);
 const [query,setQuery]=useState("");
 const closeRef=useRef<HTMLButtonElement>(null);
 const trigger=useRef<HTMLButtonElement|null>(null);
 const move=(delta:number)=>setActive(a=>a===null?null:(a+delta+slides.length)%slides.length);
 useEffect(()=>{if(active===null)return;const prior=document.body.style.overflow;document.body.style.overflow="hidden";closeRef.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null);if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1);if(e.key==="Tab"){e.preventDefault();const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>(".scs-viewer button"));const i=buttons.indexOf(document.activeElement as HTMLButtonElement);buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();}};window.addEventListener("keydown",key);return()=>{document.body.style.overflow=prior;window.removeEventListener("keydown",key);trigger.current?.focus();};},[active]);
 useEffect(()=>{const s=Number(new URLSearchParams(location.search).get("slide"));const i=slides.findIndex(v=>v.number===s);if(i>=0)setActive(i);},[]);
 const selected=active===null?null:slides[active];
 return <section className="scs-visual-course" id="security-visual-lessons"><h2>Security visual lessons</h2><p>Advanced IAM authorization and policy evaluation</p><label>Search lessons <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a topic"/></label><div className="scs-visual-grid">{slides.map((s,i)=>s.title.toLowerCase().includes(query.toLowerCase())&&<button type="button" key={s.number} onClick={e=>{trigger.current=e.currentTarget;setActive(i)}}><img src={s.src} alt={s.title} loading="lazy" width="2048" height="1152"/><span>Slide {s.number} · {s.title}</span></button>)}</div>{selected&&<div className="scs-viewer" role="dialog" aria-modal="true" aria-label={selected.title}><div className="scs-viewer-bar"><strong>Slide {selected.number} · {selected.title}</strong><div><button type="button" aria-label="Previous slide" onClick={()=>move(-1)}>←</button><button type="button" aria-label="Next slide" onClick={()=>move(1)}>→</button><button type="button" ref={closeRef} onClick={()=>setActive(null)} aria-label="Close viewer">✕</button></div></div><img src={selected.src} alt={selected.title}/></div>}</section>;
}
