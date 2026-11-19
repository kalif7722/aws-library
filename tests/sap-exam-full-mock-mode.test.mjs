import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createFullMockForm,scoreForm} from '../app/components/sap-exam/forms.mjs';
import {actFullMock,beginFullMock,canReviewFullMock,encodeFullMock,restoreFullMock,tickFullMock} from '../app/components/sap-exam/full-mock-attempt.mjs';

const bank=Object.entries({1:18,2:18,3:12,4:12,5:15}).flatMap(([domain,n])=>Array.from({length:n},(_,i)=>{
 const id=`mock-${domain}-${i}`,options=i%2?['Plan Alpha','Plan Bravo','Plan Charlie','Plan Delta']:['Plan Alpha','Plan Bravo','Plan Charlie','Plan Delta','Plan Echo'];
 return {id,domain,stem:`Stated requirements for architecture ${id}`,explanation:`Scenario explanation ${id}`,image:'/fixtures/help.webp',reviewStatus:'reviewed',
 options,correct:i%2?[1]:[2,4],optionReasons:options.map((option,index)=>`${option} rationale ${index}`)};
}));
const now=100000, limit=180*60*1000, seed='mode-lock-test';

test('factory defaults to existing timed exam and also supports untimed practice',()=>{
 assert.deepEqual(createFullMockForm(bank,seed),createFullMockForm(bank,seed,'exam'));
 assert.throws(()=>createFullMockForm(bank,seed,'other'),/Invalid full mock mode/);
 const timed=beginFullMock(bank,seed,'exam',now),practice=beginFullMock(bank,seed,'practice',now);
 assert.equal(timed.attempt.deadline,now+limit);
 assert.equal(practice.attempt.deadline,null);
 assert.equal(practice.quiz.questions.length,75);
 assert.deepEqual(practice.quiz.descriptor.slots,timed.quiz.descriptor.slots);
});
test('schema-2 round-trip locks mode, choice order, flags, answers and position',()=>{
 let s=beginFullMock(bank,seed,'exam',now);
 const q=s.quiz.questions[0];
 s=actFullMock(s,{type:'answer',values:q.correct},now+1);
 s=actFullMock(s,{type:'flag'},now+2);
 s=actFullMock(s,{type:'navigate',index:3},now+3);
 assert.deepEqual(restoreFullMock(encodeFullMock(s),bank,now+4),s);
 for(const mutate of [
  a=>{a.mode='practice';},a=>{a.form.mode='practice';},a=>{a.deadline+=1;},
  a=>{a.form.slots[0].choiceOrder=[0,0,0,0];},a=>{a.checked.push(q.id);},
 ]){
  const bad=JSON.parse(encodeFullMock(s));mutate(bad.attempt);
  assert.throws(()=>restoreFullMock(JSON.stringify(bad),bank,now+4));
 }
 assert.equal(actFullMock(s,{type:'mode',mode:'practice'},now+5),s);
});
test('practice shows feedback only after individual check, locks that answer and stays untimed',()=>{
 let s=beginFullMock(bank,seed,'practice',now);
 const q=s.quiz.questions[0], other=s.quiz.questions[1].id;
 assert.equal(canReviewFullMock(s,q.id),false);
 assert.equal(actFullMock(s,{type:'check'},now+5),s);
 s=actFullMock(s,{type:'answer',values:q.correct},now+6);
 assert.equal(canReviewFullMock(s,q.id),false);
 s=actFullMock(s,{type:'check'},now+7);
 assert.equal(canReviewFullMock(s,q.id),true);
 assert.equal(actFullMock(s,{type:'answer',values:[]},now+8),s);
 assert.equal(tickFullMock(s,now+3*limit),s);
 s=restoreFullMock(encodeFullMock(s),bank,now+3*limit);
 s=actFullMock(s,{type:'submit'},now+3*limit);
 assert.equal(canReviewFullMock(s,q.id),true);
 assert.equal(canReviewFullMock(s,other),false);
 assert.equal(scoreForm(s.attempt,s.quiz).total,65);
});
test('timed exam reveals no answer before submission; expiry honors absolute clock and refuses late edits',()=>{
 let s=beginFullMock(bank,seed,'exam',now);
 const q=s.quiz.questions[0], no=s.quiz.questions[1];
 s=actFullMock(s,{type:'answer',values:q.correct},now+5);
 assert.equal(canReviewFullMock(s,q.id),false);
 assert.equal(actFullMock(s,{type:'check'},now+10),s);
 const submitted=actFullMock(s,{type:'submit'},now+100);
 assert.equal(canReviewFullMock(submitted,no.id),true);
 assert.equal(submitted.attempt.submissionReason,'submitted');
 assert.equal(tickFullMock(s,now+limit-1),s);
 const expired=restoreFullMock(encodeFullMock(s),bank,now+limit+10000);
 assert.equal(expired.attempt.submittedAt,now+limit);
 assert.equal(expired.attempt.submissionReason,'expired');
 assert.equal(expired.attempt.mode,'exam');
 assert.equal(canReviewFullMock(expired,q.id),true);
 assert.equal(canReviewFullMock(expired,no.id),true);
 assert.equal(actFullMock(expired,{type:'answer',values:[]},now+limit+1),expired);
 assert.equal(scoreForm(expired.attempt,expired.quiz).total,65);
 assert.equal(scoreForm(expired.attempt,expired.quiz).results.filter(q=>!q.scored).length,10);
 assert.equal(scoreForm(expired.attempt,expired.quiz).unansweredAll,74);
});
test('choice explanations are permuted with options and original bank is unchanged',()=>{
 const s=beginFullMock(bank,seed,'exam',now);
 for(const q of s.quiz.questions){
  const before=bank.find(b=>b.id===q.id);
  assert.deepEqual(q.optionReasons,q.options.map(x=>before.optionReasons[before.options.indexOf(x)]));
  assert.deepEqual(q.correct.map(i=>q.options[i]).sort(),before.correct.map(i=>before.options[i]).sort());
 }
 assert.ok(s.quiz.questions.some(q=>q.options.join(',')!==bank.find(b=>b.id===q.id).options.join(',')));
 const changed=structuredClone(bank), row=changed.find(b=>b.id===s.quiz.questions[0].id);
 row.optionReasons[0]+=' changes';
 assert.throws(()=>restoreFullMock(encodeFullMock(s),changed,now),/saved question was updated/);
});
