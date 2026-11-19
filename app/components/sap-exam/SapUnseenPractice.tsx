'use client';
import {useId,useState} from 'react';
import questions from '../../../docs/sap-c03/module-27-next/questions-draft.json';
import approvedVisuals from './unseen-visuals.json';

type Visual={path:string;alt:string};
const catalogue:Record<string,Visual>=approvedVisuals;
const cases=questions.flatMap(question=>{
  const visual=catalogue[question.id];
  return visual?[{question,visual}]:[];
});

export default function SapUnseenPractice(){
 const group=useId();
 const [index,setIndex]=useState(0);
 const [selection,setSelection]=useState<number[]>([]);
 const [checked,setChecked]=useState(false);
 const selectedCase=cases[index];
 if(!selectedCase)return null;
 const {question,visual}=selectedCase;
 const required=question.selectCount;
 const single=required===1;
 const correct=selection.length===required&&question.correct.every(i=>selection.includes(i));
 const reset=()=>{setSelection([]);setChecked(false);};
 const move=(next:number)=>{if(next>=0&&next<cases.length){setIndex(next);reset();}};
 const select=(choice:number)=>{
   if(checked)return;
   if(single){setSelection([choice]);return;}
   setSelection(previous=>previous.includes(choice)?previous.filter(i=>i!==choice):previous.length<required?[...previous,choice]:previous);
 };
 return <details className="sap27-unseen">
  <summary>Try additional architecture cases</summary>
  <p>Optional practice · not included in your diagnostic score.</p>
  <nav aria-label="Additional architecture cases" className="sap27-unseen-nav">
   <button type="button" onClick={()=>move(index-1)} disabled={index===0}>Previous case</button>
   <span aria-live="polite">Case {index+1} of {cases.length}</span>
   <button type="button" onClick={()=>move(index+1)} disabled={index===cases.length-1}>Next case</button>
  </nav>
  <h3>{question.stem}</h3>
  <fieldset disabled={checked}>
   <legend>{single?'Select one answer':`Select ${required} answers`}</legend>
   {question.options.map((option,i)=><label key={option} className="sap27-unseen-option"><input type={single?'radio':'checkbox'} name={group} checked={selection.includes(i)} disabled={!single&&selection.length===required&&!selection.includes(i)} onChange={()=>select(i)}/><span>{option}</span></label>)}
  </fieldset>
  <button className="aip-primary" type="button" disabled={selection.length!==required||checked} onClick={()=>setChecked(true)}>Check answer</button>
  <div role="status">{checked?(correct?'Correct.':'Not quite. Review the reasoning below.'):''}</div>
  {checked&&<section aria-label="Case explanation">
   <h4>Why the architecture works</h4><p>{question.explanation}</p>
   <p><a href={visual.path} target="_blank" rel="noopener noreferrer">Open the answer visual at full size</a></p>
   <img width={2048} height={1152} src={visual.path} loading="lazy" alt={visual.alt}/>
   <h4>Why each option fits or fails</h4>
   <ol type="A">{question.optionExplanations.map(option=><li key={option.index}><strong>{option.correct?'Fits:':'Doesn’t fit:'}</strong> {option.reason}</li>)}</ol>
   <h4>Go back to the SAP lessons</h4>
   <ul>{question.teachBack.map(lesson=><li key={lesson.id}><a href={lesson.href}>Module {lesson.module} · Slide {lesson.slide}: {lesson.title}</a></li>)}</ul>
   <details><summary>Official AWS references</summary><ul>{question.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.supports}</a></li>)}</ul></details>
   <button type="button" onClick={reset}>Try again</button>
   {index<cases.length-1&&<button type="button" onClick={()=>move(index+1)}>Continue to next case</button>}
  </section>}
 </details>;
}
