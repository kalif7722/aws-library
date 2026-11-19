'use client';
import {useId,useState} from 'react';
import questions from '../../../docs/sap-c03/module-27-next/questions-draft.json';

const reviewedCase=questions[0];
const answerVisual='/course-visuals/sap-c03/module-27/help-private-access-overlapping-cidrs.webp';
export default function SapUnseenPractice(){
 const group=useId();
 const [selection,setSelection]=useState<number|null>(null);
 const [checked,setChecked]=useState(false);
 const correct=selection!==null&&reviewedCase.correct.includes(selection);
 return <details className="sap27-unseen">
  <summary>Try a new architecture case</summary>
  <p>Optional practice · not included in your diagnostic score.</p>
  <h3>{reviewedCase.stem}</h3>
  <fieldset disabled={checked}>
   <legend>Select one answer</legend>
   {reviewedCase.options.map((option,i)=><label key={option} className="sap27-unseen-option"><input type="radio" name={group} checked={selection===i} onChange={()=>setSelection(i)}/><span>{option}</span></label>)}
  </fieldset>
  <button className="aip-primary" type="button" disabled={selection===null||checked} onClick={()=>setChecked(true)}>Check new case</button>
  <div role="status">{checked?(correct?'Correct.':'Not quite. Review the reasoning below.'):''}</div>
  {checked&&<section aria-label="Case explanation">
   <h4>Why the architecture works</h4><p>{reviewedCase.explanation}</p>
   <p><a href={answerVisual} target="_blank" rel="noopener noreferrer">Open the answer visual at full size</a></p>
   <img width={2048} height={1152} src={answerVisual} loading="lazy"
     alt="Private HTTPS reaches an interface endpoint in the consumer VPC, crosses PrivateLink to an internal Network Load Balancer, and reaches the scoring service. The provider approves the endpoint connection. The two VPCs retain the same CIDR."/>
   <h4>Why each option fits or fails</h4>
   <ol type="A">{reviewedCase.optionExplanations.map(option=><li key={option.index}><strong>{option.correct?'Fits:':'Doesn’t fit:'}</strong> {option.reason}</li>)}</ol>
   <h4>Go back to the SAP lessons</h4>
   <ul>{reviewedCase.teachBack.map(lesson=><li key={lesson.id}><a href={lesson.href}>Module {lesson.module} · Slide {lesson.slide}: {lesson.title}</a></li>)}</ul>
   <button type="button" onClick={()=>{setChecked(false);setSelection(null);}}>Try again</button>
  </section>}
 </details>;
}
