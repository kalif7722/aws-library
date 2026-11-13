export const DURATION=90*60*1000;
export function correct(q, a=[]){return a.length===q.correct.length&&(q.type==='single'||q.type==='multiple'?a.every(i=>q.correct.includes(i))&&new Set(a).size===a.length:a.every((v,i)=>v===q.correct[i]));}
export function results(bank,answers){const domains={};let total=0;for(const q of bank){const ok=correct(q,answers[q.id]);domains[q.domain]??={correct:0,total:0};domains[q.domain].total++;if(ok){total++;domains[q.domain].correct++;}}return {correct:total,total:bank.length,domains};}
export function expired(deadline,now){return deadline!==null&&now>=deadline;}
