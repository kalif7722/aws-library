import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {startAttempt, answer, checkAnswer, canReview, submit} from '../app/components/sap-exam/engine.mjs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const bank=read('app/components/sap-exam/questions.json').map(q=>({...q,image:'existing'}));
const links=read('app/components/sap-exam/remediations.json');
const map=read('app/courses/aws-solutions-architect-professional/visual-lesson-map.json');
const base='/courses/aws-solutions-architect-professional/visual/';
test('exam remediation links select existing published lessons',()=>{
  assert.equal(Object.keys(links).length,3);
  for(const [id,list] of Object.entries(links)){
    assert.ok(bank.some(q=>q.id===id),id);
    assert.equal(list.length,3);
    for(const {href,label} of list){
      assert.ok(href.startsWith(base));
      assert.ok(label.length>8);
      const m=href.match(/module-(\d+)\?lesson=(sap-\d+-\d+)/);
      if(m)assert.ok(map.lessonsByModule[m[1]]?.some(l=>l.id===m[2]&&l.status==='qa-passed'&&l.asset),href);
    }
  }
  assert.ok(links['sap27-14'].some(l=>l.href.endsWith('module-04?part=09#video-lectures')));
  assert.ok(links['sap27-15'].some(l=>l.href.endsWith('module-26?slide=23')));
  assert.match(read('app/components/sap-troubleshooting-slides.json')[22].title,/NAT cost spikes/i);
});
test('legacy diagnostic and practice mode preserve the review gate',()=>{
  const q=bank.find(q=>q.id==='sap27-12');
  const timed=startAttempt(bank,'exam',1000);
  assert.equal(timed.questionIds.length,28);
  assert.equal(timed.deadline-1000,90*60*1000);
  assert.equal(canReview(timed,q.id),false);
  assert.equal(canReview(submit(timed,2000),q.id),true);
  const practice=startAttempt(bank,'practice',1100);
  assert.equal(canReview(practice,q.id),false);
  assert.equal(canReview(checkAnswer(answer(practice,q.id,q.correct,bank,1900),q.id,bank,2000),q.id),true);
});
test('unseen scenario drafts cover all domains without altering the live bank',()=>{
  const draft=read('docs/sap-c03/module-27-next/questions-draft.json');
  assert.deepEqual(draft.map(q=>q.domain),['1','2','3','4','5']);
  assert.equal(draft.filter(q=>q.selectCount>1).length,2);
  for(const q of draft){
    assert.ok(!bank.some(old=>old.id===q.id||old.stem===q.stem));
    assert.equal(q.correct.length,q.selectCount);
    assert.equal(q.optionExplanations.length,q.options.length);
    assert.deepEqual(q.optionExplanations.filter(o=>o.correct).map(o=>o.index),q.correct);
    for(const l of q.teachBack)assert.ok(map.lessonsByModule[l.module]?.some(v=>v.id===l.id&&v.asset&&v.status==='qa-passed'),l.id);
    assert.ok(q.sources.length>0);
  }
});
