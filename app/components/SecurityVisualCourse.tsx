"use client";
import {useEffect,useRef,useState} from "react";
import rawPlan from "../courses/aws-security-specialty/visual-plan.json";
import "./SecurityVisualCourse.css";
type Slide={number:number;title:string;src:string};
type CourseModule={id:string;title:string;slides:Slide[]};
const modules=(rawPlan as {modules:CourseModule[]}).modules;
const moduleName=(id:string)=>id==="00"?"Course orientation":"IAM authorization";
const lessonGroup=(id:string,n:number)=>id==="00"?"Security foundations":n<=11?"Policy language":n<=22?"Request context & evaluation":n<=32?"Cross-account & application access":n<=39?"Least privilege & validation":"Applied policy cases";
export default function SecurityVisualCourse(){
 const [moduleId,setModuleId]=useState("00");
 const [focus,setFocus]=useState(0);
 const [active,setActive]=useState<number|null>(null);
 const [query,setQuery]=useState("");
 const [seen,setSeen]=useState<Record<string,boolean>>({});
 const currentModule=modules.find(m=>m.id===moduleId)??modules[0];
 const slides=currentModule.slides;
 const selected=slides[focus]??slides[0];
 const closeRef=useRef<HTMLButtonElement>(null);
 const trigger=useRef<HTMLButtonElement|null>(null);
 const keyFor=(m:string,n:number)=>`${m}:${n}`;
 const selectModule=(id:string)=>{setModuleId(id);setFocus(0);setActive(null);setQuery("");};
 const move=(delta:number)=>setActive(a=>a===null||!slides.length?null:(a+delta+slides.length)%slides.length);
 useEffect(()=>{
  const params=new URLSearchParams(location.search);
  const requested=modules.find(m=>m.id===params.get("module"))??modules.find(m=>m.id==="01")??modules[0];
  setModuleId(requested.id);
  const number=Number(params.get("slide"));
  const index=number>0?requested.slides.findIndex(s=>s.number===number):-1;
  if(index>=0){setFocus(index);setActive(index);}
  else if(!params.has("module"))setModuleId("00");
  try{const saved=JSON.parse(localStorage.getItem("scs-visual-seen-v1")||"{}");if(saved&&typeof saved==="object")setSeen(saved);}catch{}
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
 const open=(index:number,button:HTMLButtonElement)=>{trigger.current=button;setFocus(index);setActive(index);};
 const markSeen=()=>{const next={...seen,[keyFor(moduleId,selected.number)]:true};setSeen(next);try{localStorage.setItem("scs-visual-seen-v1",JSON.stringify(next));}catch{}};
 const learned=slides.filter(s=>seen[keyFor(moduleId,s.number)]).length;
 const visible=slides.map((s,i)=>({s,i})).filter(({s})=>s.title.toLowerCase().includes(query.trim().toLowerCase()));
 const viewerSlide=active===null?null:slides[active];
 return <section className="scs-course" id="security-visual-lessons" aria-label="Security visual lessons">
  <header className="scs-course-intro">
   <div><span className="scs-eyebrow">AWS SECURITY SPECIALTY · VISUAL COURSE</span><h2>Learn security by seeing how it works.</h2><p>Follow a real workload, trace each permission decision, and study the controls in context.</p></div>
   <div className="scs-course-count"><strong>{modules.reduce((n,m)=>n+m.slides.length,0)}</strong><span>visual lessons<br/>in this course</span></div>
  </header>
  <div className="scs-module-tabs" role="group" aria-label="Choose module">{modules.map(m=><button type="button" key={m.id} className={m.id===moduleId?"is-active":""} aria-pressed={m.id===moduleId} onClick={()=>selectModule(m.id)}><small>MODULE {m.id}</small><strong>{moduleName(m.id)}</strong><span>{m.slides.length} lessons</span></button>)}</div>
  <div className="scs-module-heading"><div><span className="scs-eyebrow">MODULE {moduleId} / {modules.length.toString().padStart(2,"0")}</span><h3>{currentModule.title}</h3></div><div className="scs-progress" aria-label={`${learned} of ${slides.length} lessons marked studied`}><span>{learned} / {slides.length} studied</span><div><i style={{width:`${slides.length?learned/slides.length*100:0}%`}}/></div></div></div>
  <div className="scs-lesson-layout">
   <div className="scs-featured"><div className="scs-featured-meta"><span>FEATURED LESSON</span><span>{String(focus+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span></div><h4>{selected.title}</h4><p>{lessonGroup(moduleId,selected.number)}</p><button type="button" className="scs-featured-image" onClick={e=>open(focus,e.currentTarget)} aria-label={`Open slide ${selected.number}: ${selected.title}`}><img src={selected.src} alt="" width="2048" height="1152"/><span>Open full slide <b aria-hidden="true">↗</b></span></button><div className="scs-featured-actions"><button type="button" onClick={markSeen} className={seen[keyFor(moduleId,selected.number)]?"studied":""}>{seen[keyFor(moduleId,selected.number)]?"✓ Studied":"Mark as studied"}</button><div><button type="button" disabled={focus===0} onClick={()=>setFocus(focus-1)} aria-label="Previous featured lesson">←</button><button type="button" disabled={focus===slides.length-1} onClick={()=>setFocus(focus+1)} aria-label="Next featured lesson">→</button></div></div></div>
   <aside className="scs-outline" aria-label="Lesson outline"><div className="scs-outline-top"><div><span className="scs-eyebrow">EXPLORE THE MODULE</span><h4>Lesson outline</h4></div><span>{slides.length} lessons</span></div><label className="scs-search"><span className="sr-only">Search lessons</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search these lessons…"/></label><div className="scs-outline-list">{visible.length?visible.map(({s,i})=><div key={s.number}>{(i===0||lessonGroup(moduleId,slides[i-1].number)!==lessonGroup(moduleId,s.number))&&<div className="scs-outline-group">{lessonGroup(moduleId,s.number)}</div>}<button type="button" className={focus===i?"is-current":""} onClick={()=>setFocus(i)} aria-current={focus===i?"true":undefined}><span className="scs-lesson-number">{String(s.number).padStart(2,"0")}</span><span className="scs-lesson-title">{s.title}</span>{seen[keyFor(moduleId,s.number)]&&<span className="scs-done" aria-label="Studied">✓</span>}</button></div>):<p className="scs-no-results">No lessons match your search.</p>}</div></aside>
  </div>
  {viewerSlide&&<div className="scs-viewer" role="dialog" aria-modal="true" aria-label={viewerSlide.title}><div className="scs-viewer-bar"><div><small>MODULE {moduleId} · SLIDE {viewerSlide.number} OF {slides.length}</small><strong>{viewerSlide.title}</strong></div><div className="scs-viewer-controls"><button type="button" aria-label="Previous slide" onClick={()=>move(-1)}>←</button><button type="button" aria-label="Next slide" onClick={()=>move(1)}>→</button><button type="button" ref={closeRef} onClick={()=>setActive(null)} aria-label="Close viewer">✕</button></div></div><img src={viewerSlide.src} alt={viewerSlide.title}/><div className="scs-viewer-hint">Use ← → to move between lessons · Esc to close</div></div>}
 </section>;
}
