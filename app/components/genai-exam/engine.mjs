export const EXAM_DURATION_MS=180*60*1000;
export function startAttempt(bank,mode,now=Date.now()){
 if(!['practice','exam'].includes(mode))throw Error('Invalid mode');
 if(!Array.isArray(bank)||!bank.length||new Set(bank.map(q=>q.id)).size!==bank.length)throw Error('Invalid question bank');
 if(mode==='exam'&&bank.length!==75)throw Error('A full exam requires 75 questions');
 for(const q of bank){if(!q.id||!Array.isArray(q.options)||!Array.isArray(q.correct)||!q.correct.length||new Set(q.correct).size!==q.correct.length||q.correct.some(i=>!Number.isInteger(i)||i<0||i>=q.options.length)||!q.explanation||!q.image)throw Error('Incomplete question or image mapping');}
 return {schema:1,mode,questionIds:bank.map(q=>q.id),startedAt:now,deadline:mode==='exam'?now+EXAM_DURATION_MS:null,answers:{},checked:[],flagged:[],submittedAt:null,submissionReason:null};
}
export function remainingMs(a,now=Date.now()){return a.deadline===null?null:Math.max(0,a.deadline-now)}
export function elapsedMs(a,now=Date.now()){return Math.max(0,(a.submittedAt??now)-a.startedAt)}
export function advanceTime(a,now=Date.now()){return !a.submittedAt&&a.deadline!==null&&now>=a.deadline?{...a,submittedAt:a.deadline,submissionReason:'expired'}:a}
function editable(a,id,now){const next=advanceTime(a,now);if(next.submittedAt!==null)throw Error('Attempt submitted or expired');if(!next.questionIds.includes(id))throw Error('Unknown question');return next}
export function answer(a,id,indices,bank,now=Date.now()){
 const next=editable(a,id,now),q=bank.find(q=>q.id===id);if(!q||!Array.isArray(indices)||new Set(indices).size!==indices.length||indices.some(i=>!Number.isInteger(i)||i<0||i>=q.options.length)||indices.length>q.correct.length)throw Error('Invalid selection');
 if(next.mode==='practice'&&next.checked.includes(id))throw Error('Checked answer is locked');
 return {...next,answers:{...next.answers,[id]:[...indices]}};
}
export function checkAnswer(a,id,bank,now=Date.now()){const next=editable(a,id,now);if(next.mode!=='practice')throw Error('Explanations are hidden during exam');const q=bank.find(q=>q.id===id);if(!q||(next.answers[id]??[]).length!==q.correct.length)throw Error('Select the required number of answers');return {...next,checked:[...new Set([...next.checked,id])]}}
export function canReview(a,id){return a.submittedAt!==null||a.mode==='practice'&&a.checked.includes(id)}
export function flag(a,id,now=Date.now()){const next=editable(a,id,now);return {...next,flagged:next.flagged.includes(id)?next.flagged.filter(x=>x!==id):[...next.flagged,id]}}
export function submit(a,now=Date.now()){const next=advanceTime(a,now);return next.submittedAt!==null?next:{...next,submittedAt:now,submissionReason:'manual'}}
export function score(a,bank){if(a.submittedAt===null)throw Error('Submit before scoring');let correct=0;const domains={};const results=bank.filter(q=>a.questionIds.includes(q.id)).map(q=>{const selected=a.answers[q.id]??[],ok=selected.length===q.correct.length&&selected.every(i=>q.correct.includes(i));if(ok)correct++;const domain=q.domain??'Unassigned';domains[domain]??={correct:0,total:0};domains[domain].total++;if(ok)domains[domain].correct++;return {id:q.id,correct:ok,answered:selected.length>0}});return {correct,total:results.length,unanswered:results.filter(r=>!r.answered).length,percentage:results.length?correct/results.length*100:0,domains,results}}
