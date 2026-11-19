'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {assessFullMock,scoreForm,type FormMode,type FormQuestion,type SapDomain} from './forms.mjs';
import {actFullMock,beginFullMock,canReviewFullMock,encodeFullMock,FULL_MOCK_STORAGE,restoreFullMock,tickFullMock,type FullEvent,type FullSession} from './full-mock-attempt.mjs';
import raw from './full-mock-bank.json';
import './sap-full-mock.css';

type Reference={label:string;href:string;asset:string};
type MockQuestion=FormQuestion&{optionReasons:string[];sources:string[];visualLabel:string;references:Reference[]};
const safeLesson=(url:string)=>/^\/courses\/aws-solutions-architect-professional\/visual\/module-\d{2}\?lesson=sap-[\w-]+$/.test(url);
const safeAsset=(url:string)=>/^\/course-visuals\/sap-c03\/[\w./-]+\.webp$/i.test(url)&&!url.includes('..');
const safeAWS=(url:string)=>/^https:\/\/(?:docs\.aws\.amazon\.com|aws\.amazon\.com)\//i.test(url);
const hasText=(value:unknown)=>typeof value==='string'&&!!value.trim();
const bank=(raw as unknown as MockQuestion[]).filter(q=>q&&typeof q==='object'&&safeAsset(q.image)&&hasText(q.visualLabel)&&
 Array.isArray(q.optionReasons)&&Array.isArray(q.options)&&q.optionReasons.length===q.options.length&&q.optionReasons.every(hasText)&&
 Array.isArray(q.sources)&&q.sources.length>0&&q.sources.every(safeAWS)&&
 Array.isArray(q.references)&&q.references.length>0&&q.references.every(r=>r&&hasText(r.label)&&safeLesson(r.href)&&safeAsset(r.asset)));
const readiness=assessFullMock(bank);
const domain:Record<SapDomain,string>={'1':'Cloud architecture','2':'Security and governance','3':'Cost optimization','4':'Resilience and migration','5':'Operational excellence'};
const letter=(n:number)=>String.fromCharCode(65+n);
function clock(ms:number){const s=Math.max(0,Math.ceil(ms/1000));return [Math.floor(s/3600),Math.floor(s/60)%60,s%60].map(n=>String(n).padStart(2,'0')).join(':');}

export default function SapFullMock(){
 type Session=FullSession<MockQuestion>;
 const [ready,setReady]=useState(false), [session,setSession]=useState<Session|null>(null), [now,setNow]=useState(0), [problem,setProblem]=useState(''), [invalid,setInvalid]=useState(false);
 const [dialog,setDialog]=useState<'submit'|'discard'|'visual'|null>(null), modal=useRef<HTMLDialogElement>(null), live=useRef<Session|null>(null), heading=useId(), confirmLabel=useId();
 const show=(s:Session|null)=>{live.current=s;setSession(s);};
 const save=(s:Session)=>{try{localStorage.setItem(FULL_MOCK_STORAGE,encodeFullMock(s));}catch{setProblem('This browser cannot save your full mock. Keep this tab open to preserve your progress.');}};
 useEffect(()=>{
   const restore=(value:string|null)=>{
     if(!value){show(null);setInvalid(false);setProblem('');return;}
     try{
       const s=restoreFullMock(value,bank);show(s);setInvalid(false);setProblem('');
       if(encodeFullMock(s)!==value&&s.attempt.submissionReason==='expired')save(s);
     }catch{show(null);setInvalid(true);setProblem('The saved full mock is not compatible with the current question bank. You can clear it and start a new attempt.');}
   };
   const listener=(e:StorageEvent)=>{if(e.key===FULL_MOCK_STORAGE){restore(e.newValue);setDialog(null);}};
   try{restore(localStorage.getItem(FULL_MOCK_STORAGE));}catch{setProblem('This browser cannot restore saved full mock progress.');}
   setNow(Date.now());setReady(true);window.addEventListener('storage',listener);
   const update=()=>{
     const n=Date.now(),current=live.current;setNow(n);
     if(current){const next=tickFullMock(current,n);if(next!==current){show(next);save(next);setDialog(d=>d==='submit'?null:d);}}
   };
   const timer=window.setInterval(update,1000);
   document.addEventListener('visibilitychange',update);
   return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',update);window.removeEventListener('storage',listener);};
 },[]);
 useEffect(()=>{
   const el=modal.current;
   if(dialog&&el&&!el.open)el.showModal();
   else if(!dialog&&el?.open)el.close();
 },[dialog]);
 function begin(mode:FormMode){
   if(!ready||live.current||invalid||!readiness.available)return;
   let stored:string|null=null;
   try{stored=localStorage.getItem(FULL_MOCK_STORAGE);}
   catch{ /* Browser storage can be disabled. In-memory mode still works. */ }
   if(stored){
     try{const s=restoreFullMock(stored,bank);show(s);if(s.attempt.submissionReason==='expired')save(s);}
     catch{setInvalid(true);setProblem('The saved full mock is not compatible with this question bank. Clear it before starting a new attempt.');}
     return;
   }
   const n=Date.now(), seed=typeof crypto.randomUUID==='function'?crypto.randomUUID():String(n)+Math.random();
   const s=beginFullMock(bank,seed,mode,n);setNow(n);setProblem('');show(s);save(s);
 }
 function act(action:FullEvent){
   const current=live.current;
   if(!current)return;
   const n=Date.now(),next=actFullMock(current,action,n);
   setNow(n);if(next!==current){show(next);save(next);}
 }
 function discard(){
   if(!invalid&&live.current?.attempt.submittedAt==null)return;
   try{localStorage.removeItem(FULL_MOCK_STORAGE);}catch{/* Progress was in memory only. */}
   show(null);setInvalid(false);setProblem('');setDialog(null);
 }
 const a=session?.attempt,q=session?.quiz.questions[session.index];
 const finished=a?.submittedAt!=null;
 const selected=q&&a?a.answers[q.id]??[]:[];
 const review=session&&q?canReviewFullMock(session,q.id):false;
 const result=finished&&session?scoreForm(session.attempt,session.quiz):null;
 const timed=a?.mode==='exam';
 return <section className="aip-prep sap27-exam sap27-full" aria-labelledby={heading}>
  <aside className="sap27-side"><strong>SAP-C03 · MODULE 27</strong><h2 id={heading}>75-question full mock</h2><p>Original exam preparation. Not the official AWS exam.</p>
  {session&&a&&<nav className="aip-qnav" aria-label="Full mock question navigation"><p>Questions</p><div>{session.quiz.questions.map((item,i)=>{
    const answered=!!a.answers[item.id]?.length, flag=a.flagged.includes(item.id), canReview=canReviewFullMock(session,item.id);
    const outcome=result&&canReview?(result.results[i].correct?'correct':'incorrect'):'';
    return <button type="button" key={item.id} aria-current={i===session.index?'step':undefined} aria-label={`Question ${i+1}${answered?', answered':''}${flag?', flagged':''}`} className={`${answered?'answered':''} ${flag?'flagged':''} ${outcome}`} onClick={()=>act({type:'navigate',index:i})}>{i+1}{flag?' ⚑':''}</button>;
  })}</div><small>Filled: answered · ⚑: flagged</small></nav>}</aside>
  <div className="sap27-main"><div className="aip-kicker">FULL MOCK · SAP-C03</div>
   {problem&&<p role="status">{problem}</p>}
   {!ready?<p>Restoring full mock…</p>:invalid?<button type="button" onClick={()=>setDialog('discard')}>Clear incompatible saved attempt</button>:
   !session||!a||!q?readiness.available?<><h3>Choose a mode</h3><p>Your mode and question order stay locked until you finish the attempt. Progress stays in this browser. Both modes use the same 75 scenarios, so choose Exam first for an unseen rehearsal.</p>
    <div className="aip-modes"><article><h4>Practice mode</h4><p>No time limit. Check answers individually to see the reasoning. A checked answer cannot be changed.</p><button className="aip-primary" type="button" onClick={()=>begin('practice')}>Start full practice</button></article>
    <article><h4>Exam mode</h4><p>180 minutes, even if you close this tab. Answers and explanations remain hidden until you submit or time expires.</p><button className="aip-primary" type="button" onClick={()=>begin('exam')}>Start timed full mock</button></article></div></>:<p>The 75-question mock is not available until there are enough reviewed questions. The diagnostic below is still available.</p>:
   <>
    <div className="aip-toolbar"><strong>{timed?'Exam mode':'Practice mode'} · {finished?'Results':'Locked for this attempt'}</strong>
      {!finished&&(timed?<span role="timer">Time remaining {clock((a.deadline??now)-now)}</span>:<span>Untimed</span>)}
      <button type="button" onClick={()=>setDialog(finished?'discard':'submit')}>{finished?'Start a new full mock':'Finish and submit'}</button></div>
    {result&&<section className="aip-results" role="status"><h3>{result.correct} / {result.total} scored questions correct · {Math.round(result.percentage)}%</h3>
      <p>{a.submissionReason==='expired'?'Time expired. ':''}{result.unansweredAll} of 75 questions unanswered. This is a raw practice score, not an AWS scaled score or certification prediction.</p>
      <div className="aip-domain-results">{(Object.entries(result.domains) as [SapDomain,{correct:number;total:number}][]).map(([d,v])=><span key={d}>{domain[d]}: {v.correct}/{v.total}</span>)}</div>
      {!timed&&<p>In practice mode, explanations are available for the questions you checked.</p>}
    </section>}
    <article className="aip-question">
      <div className="aip-question-top"><span>Question {session.index+1} of {session.quiz.questions.length}</span>
        {finished&&timed&&<span>{result?.results[session.index].scored?'Scored question':'Unscored question'}</span>}
        {!finished&&<button type="button" aria-pressed={a.flagged.includes(q.id)} onClick={()=>act({type:'flag'})}>{a.flagged.includes(q.id)?'Unflag question':'Flag for review'}</button>}</div>
      <h3>{q.stem}</h3>
      <fieldset disabled={finished||review}><legend>{q.correct.length===1?'Select one answer.':`Select ${q.correct.length} answers.`}</legend>
        {q.options.map((option,i)=><label key={`${q.id}-${i}`} className={'aip-option'+(review?(q.correct.includes(i)?' correct':selected.includes(i)?' incorrect':''):'')}>
          <input type={q.correct.length===1?'radio':'checkbox'} name={q.id} checked={selected.includes(i)} onChange={()=>act({type:'answer',values:q.correct.length===1?[i]:selected.includes(i)?selected.filter(n=>n!==i):[...selected,i]})} disabled={q.correct.length>1&&selected.length===q.correct.length&&!selected.includes(i)}/><b>{letter(i)}.</b><span>{option}</span></label>)}
      </fieldset>
      {!finished&&!timed&&!review&&<button className="aip-primary" type="button" disabled={selected.length!==q.correct.length} onClick={()=>act({type:'check'})}>Check this answer</button>}
      {review&&<section className="aip-explanation" aria-label="Answer explanation"><h4>Correct answer{q.correct.length===1?'':'s'}: {q.correct.map(letter).join(', ')}</h4><p>{q.explanation}</p>
        <h4>Why each option fits or fails</h4><ol type="A">{q.optionReasons.map((reason,i)=><li key={i}><strong>{q.correct.includes(i)?'Fits:':'Does not fit:'}</strong> {reason}</li>)}</ol>
        <figure><button className="aip-image-button" type="button" onClick={()=>setDialog('visual')} aria-label="Enlarge related course visual"><img loading="lazy" src={q.image} alt={q.visualLabel}/></button><figcaption>Related course visual: {q.visualLabel}</figcaption></figure>
        <nav aria-label="Related visual lessons"><h4>Revisit the exact lessons</h4><ul>{q.references.map(ref=><li key={ref.href}><a href={ref.href}>{ref.label}</a></li>)}</ul></nav>
        <details><summary>Official AWS references</summary><ul>{q.sources.map(source=><li key={source}><a href={source} target="_blank" rel="noopener noreferrer">{source.split('/').filter(Boolean).at(-1)?.replace(/\.html$/,'').replace(/[-_]/g,' ')||'AWS documentation'}</a></li>)}</ul></details>
      </section>}
      <div className="aip-pagination"><button type="button" disabled={session.index===0} onClick={()=>act({type:'navigate',index:session.index-1})}>← Previous</button><button type="button" disabled={session.index===session.quiz.questions.length-1} onClick={()=>act({type:'navigate',index:session.index+1})}>Next →</button></div>
    </article>
   </>}
  </div>
  <dialog className={'aip-dialog sap27-full-dialog'+(dialog==='visual'?' sap27-full-image':'')} ref={modal} aria-labelledby={confirmLabel} onCancel={()=>setDialog(null)} onClose={()=>setDialog(null)}>
    {dialog==='visual'&&review&&q?<><h3 id={confirmLabel}>{q.visualLabel}</h3><button type="button" onClick={()=>setDialog(null)}>Close visual</button><img src={q.image} alt={q.visualLabel}/></>:
    <><h3 id={confirmLabel}>{dialog==='discard'?'Clear this saved full mock?':'Submit this full mock?'}</h3>
    <p>{dialog==='discard'?'Your saved answers will be removed. You can then start a new attempt in either mode.':'This ends the attempt. Unanswered questions are counted as incorrect, and you cannot change your answers after submission.'}</p>
    <button type="button" onClick={()=>setDialog(null)}>Keep {dialog==='discard'?'saved progress':'working'}</button>
    <button className="aip-primary" type="button" onClick={()=>{if(dialog==='discard')discard();else {act({type:'submit'});setDialog(null);}}}>{dialog==='discard'?'Clear saved attempt':'Submit full mock'}</button></>}
  </dialog>
 </section>;
}
