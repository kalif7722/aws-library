"use client";
import {useEffect,useRef,useState} from "react";
import rawPlan from "../courses/aws-security-specialty/visual-plan.json";
import "./SecurityVisualCourse.css";
type Slide={number:number;title:string;src:string};
type CourseModule={id:string;title:string;slides:Slide[]};
const modules=(rawPlan as {modules:CourseModule[]}).modules;
export default function SecurityVisualCourse(){
 const [moduleId,setModuleId]=useState("01");
 const [active,setActive]=useState<number|null>(null);
 const [query,setQuery]=useState("");
 const currentModule=modules.find(m=>m.id===moduleId)??modules[0];
 const slides=currentModule.slides;
 const closeRef=useRef<HTMLButtonElement>(null);
 const trigger=useRef<HTMLButtonElement|null>(null);
 const move=(delta:number)=>setActive(a=>a===null||!slides.length?null:(a+delta+slides.length)%slides.length);
 useEffect(()=>{
  const params=new URLSearchParams(location.search);
  const requested=modules.find(m=>m.id===params.get("module"))??modules.find(m=>m.id==="01")??modules[0];
  setModuleId(requested.id);
  const number=Number(params.get("slide"));
  const index=number>0?requested.slides.findIndex(s=>s.number===number):-1;
  if(index>=0)setActive(index);
 },[]);
 useEffect(()=>{
  if(active===null)return;
  const prior=document.body.style.overflow;document.body.style.overflow="hidden";closeRef.current?.focus();
  const key=(e:KeyboardEvent)=>{
   if(e.key==="Escape")setActive(null);
   if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}
   if(e.key==="ArrowRight"){e.preventDefault();move(1);}
   if(e.key==="Tab"){
    e.preventDefault();
    const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>(".scs-viewer button"));
    const i=buttons.indexOf(document.activeElement as HTMLButtonElement);
    buttons[(i+(e.shiftKey?-1:1)+buttons.length)%buttons.length]?.focus();
   }
  };
  window.addEventListener("keydown",key);
  return()=>{document.body.style.overflow=prior;window.removeEventListener("keydown",key);trigger.current?.focus();};
 },[active,moduleId,slides.length]);
 const selected=active===null?null:slides[active];
 return <section className="scs-visual-course" id="security-visual-lessons">
  <h2>Security visual lessons</h2>
  <label>Module <select value={currentModule.id} onChange={e=>{setActive(null);setModuleId(e.target.value);setQuery("");}}>
   {modules.map(m=><option key={m.id} value={m.id}>{m.id} · {m.title}</option>)}
  </select></label>
  <p>{currentModule.title} · {slides.length} visual lessons</p>
  <label>Search lessons <input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a topic"/></label>
  <div className="scs-visual-grid">{slides.map((s,i)=>s.title.toLowerCase().includes(query.toLowerCase())&&
   <button type="button" key={currentModule.id+":"+s.number} onClick={e=>{trigger.current=e.currentTarget;setActive(i);}}>
    <img src={s.src} alt={s.title} loading="lazy" width="2048" height="1152"/>
    <span>Slide {s.number} · {s.title}</span>
   </button>
  )}</div>
  {selected&&<div className="scs-viewer" role="dialog" aria-modal="true" aria-label={selected.title}>
   <div className="scs-viewer-bar"><strong>Module {currentModule.id} · Slide {selected.number} · {selected.title}</strong>
    <div><button type="button" aria-label="Previous slide" onClick={()=>move(-1)}>←</button>
     <button type="button" aria-label="Next slide" onClick={()=>move(1)}>→</button>
     <button type="button" ref={closeRef} onClick={()=>setActive(null)} aria-label="Close viewer">✕</button></div>
   </div>
   <img src={selected.src} alt={selected.title}/>
  </div>}
 </section>;
}
