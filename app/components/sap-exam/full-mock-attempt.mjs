import {createFullMockForm,hydrateForm,startFormAttempt} from './forms.mjs';

export const FULL_MOCK_STORAGE='sap-c03-module27-full-mock-v1';
const indexOkay=(quiz,index)=>Number.isInteger(index)&&index>=0&&index<quiz.questions.length;
const isObject=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const validChoices=(q,a)=>Array.isArray(a)&&a.length<=q.correct.length&&new Set(a).size===a.length&&
 a.every(i=>Number.isInteger(i)&&i>=0&&i<q.options.length);

export function beginFullMock(bank,seed,mode,now=Date.now()){
 const quiz=createFullMockForm(bank,seed,mode);
 return {quiz,attempt:startFormAttempt(quiz,now),index:0};
}
export function encodeFullMock(session){
 return JSON.stringify({attempt:session.attempt,index:session.index});
}
export function restoreFullMock(payload,bank,now=Date.now()){
 const obj=JSON.parse(payload), a=obj?.attempt;
 if(!isObject(a)||a.schema!==2||a.form?.kind!=='full-mock')throw Error('Unrecognized full mock attempt.');
 const quiz=hydrateForm(a.form,bank);
 const expectedDeadline=a.form.durationMs===null?null:a.startedAt+a.form.durationMs;
 const ids=quiz.questions.map(q=>q.id);
 if(!Number.isFinite(a.startedAt)||a.mode!==a.form.mode||a.deadline!==expectedDeadline||
    !Array.isArray(a.questionIds)||a.questionIds.length!==ids.length||a.questionIds.some((id,i)=>id!==ids[i])||
    !isObject(a.answers)||!Array.isArray(a.checked)||!Array.isArray(a.flagged)||!indexOkay(quiz,obj.index)){
   throw Error('The saved full mock format is invalid.');
 }
 const qmap=new Map(quiz.questions.map(q=>[q.id,q]));
 if(Object.entries(a.answers).some(([id,values])=>!qmap.has(id)||!validChoices(qmap.get(id),values))||
    new Set(a.checked).size!==a.checked.length||new Set(a.flagged).size!==a.flagged.length||
    a.flagged.some(id=>!qmap.has(id))||a.checked.some(id=>!qmap.has(id)||a.answers[id]?.length!==qmap.get(id).correct.length)||
    a.mode==='exam'&&a.checked.length){
   throw Error('The saved full mock responses are invalid.');
 }
 if(a.submittedAt===null?a.submissionReason!==null:
    !Number.isFinite(a.submittedAt)||a.submittedAt<a.startedAt||
    !['submitted','expired'].includes(a.submissionReason)||
    (a.deadline!==null&&a.submittedAt>a.deadline)||
    (a.submissionReason==='expired'&&(a.deadline===null||a.deadline!==a.submittedAt))){
   throw Error('Invalid full mock submission.');
 }
 return tickFullMock({quiz,attempt:a,index:obj.index},now);
}
export function tickFullMock(s,now=Date.now()){
 const a=s.attempt;
 if(a.submittedAt!==null||a.deadline===null||now<a.deadline)return s;
 return {...s,attempt:{...a,submittedAt:a.deadline,submissionReason:'expired'}};
}
export function canReviewFullMock(s,id){
 return s.attempt.mode==='exam'?s.attempt.submittedAt!==null:s.attempt.checked.includes(id);
}
export function actFullMock(session,event,now=Date.now()){
 const s=tickFullMock(session,now), a=s.attempt;
 if(event.type==='navigate')return indexOkay(s.quiz,event.index)&&event.index!==s.index?{...s,index:event.index}:s;
 if(a.submittedAt!==null)return s;
 const q=s.quiz.questions[s.index];
 const values=a.answers[q.id]??[];
 let next=a;
 switch(event.type){
 case 'flag':
   next={...a,flagged:a.flagged.includes(q.id)?a.flagged.filter(id=>id!==q.id):[...a.flagged,q.id]}; break;
 case 'answer':
   if(!a.checked.includes(q.id)&&validChoices(q,event.values))next={...a,answers:{...a.answers,[q.id]:[...event.values]}};
   break;
 case 'check':
   if(a.mode==='practice'&&values.length===q.correct.length&&!a.checked.includes(q.id))next={...a,checked:[...a.checked,q.id]};
   break;
 case 'submit':
   next={...a,submittedAt:Math.max(a.startedAt,now),submissionReason:'submitted'}; break;
 }
 return next===a?s:{...s,attempt:next};
}
