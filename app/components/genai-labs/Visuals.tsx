"use client";
import { useEffect, useRef, useState } from "react";

export type VisualStep = { title: string; slide: number; src: string };
export default function Visuals({ steps, compact=false }: { steps: VisualStep[]; compact?: boolean }) {
 const [index,setIndex]=useState(0);const [expanded,setExpanded]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{setIndex(0);setExpanded(false)},[steps]);
 useEffect(()=>{const d=dialog.current;if(expanded&&!d?.open)d?.showModal();else if(!expanded&&d?.open)d?.close()},[expanded]);
 const current=steps[index]??steps[0];
 function keys(e:React.KeyboardEvent){if(e.key==="ArrowRight"){e.preventDefault();setIndex(i=>Math.min(steps.length-1,i+1))}if(e.key==="ArrowLeft"){e.preventDefault();setIndex(i=>Math.max(0,i-1))}}
 return <div className={compact?"gl-visual compact":"gl-visual"}>
  <p className="gl-subtle">Educational illustrations, not live AWS screenshots. Use the console and application workspace for the lab's supported actions.</p>
  <button className="gl-image-button" aria-label="Expand lab visual" onClick={()=>setExpanded(true)}><img src={current.src} alt={current.title} loading="lazy" /></button>
  <div className="gl-visual-controls"><button disabled={index===0} onClick={()=>setIndex(i=>i-1)} aria-label="Previous visual">←</button><span>Visual {index+1} of {steps.length}</span><button disabled={index===steps.length-1} onClick={()=>setIndex(i=>i+1)} aria-label="Next visual">→</button></div>
  {!compact&&<div className="gl-thumbnails">{steps.map((s,i)=><button key={s.slide} className={index===i?"active":""} onClick={()=>setIndex(i)} aria-label={s.title}><img src={s.src} alt="" loading="lazy" /><span>{i+1}</span></button>)}</div>}
  <dialog ref={dialog} className="gl-dialog" onClose={()=>setExpanded(false)} onCancel={()=>setExpanded(false)} onKeyDown={keys} aria-label="Lab visual viewer"><button className="gl-close" onClick={()=>setExpanded(false)}>Close ×</button><img src={current.src} alt={current.title}/><div className="gl-visual-controls"><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>← Previous</button><span>{index+1} / {steps.length}</span><button disabled={index===steps.length-1} onClick={()=>setIndex(i=>i+1)}>Next →</button></div></dialog>
 </div>;
}
