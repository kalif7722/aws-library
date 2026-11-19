import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {startAttempt,answer,submit,score} from '../app/components/sap-exam/engine.mjs';
const read = p => JSON.parse(fs.readFileSync(new URL('../' + p,import.meta.url),'utf8'));
const dir='app/components/sap-exam/';
const revised=read(dir+'questions.json');
const legacy=read(dir+'questions-v1.json');
const map=read(dir+'revised-lessons.json');
const lessons=read('app/courses/aws-solutions-architect-professional/visual-lesson-map.json').lessonsByModule;
const course='/courses/aws-solutions-architect-professional/visual/';
const optional=read('docs/sap-c03/module-27-next/questions-draft.json');

test('all 28 diagnostics are genuinely revised, preserve layout and sample the current SAP-C03 domains',()=>{
  assert.equal(revised.length,28);
  assert.deepEqual(revised.map(q=>[q.id,q.domain,q.correct]),legacy.map(q=>[q.id,q.domain,q.correct]));
  assert.deepEqual(Object.values(revised.reduce((t,q)=>(t[q.domain]=(t[q.domain]||0)+1,t),{})),[7,7,4,4,6]);
  assert.ok(revised.every((q,i)=>q.stem!==legacy[i].stem&&q.explanation!==legacy[i].explanation));
  assert.equal(new Set([...revised,...optional].map(q=>q.stem)).size,33);
});

test('every item has valid AWS-style choices, decisive rationale and official documentation',()=>{
  for(const q of [...revised,...optional]){
    const rationale=q.optionReasons??q.optionExplanations?.map(e=>e.reason);
    const sources=q.sources.map(s=>typeof s==='string'?s:s.url??s.href);
    assert.ok(q.stem.split(/\s+/).length>=35,q.id);
    if(q.correct.length===1)assert.equal(q.options.length,4,q.id);
    else assert.ok(q.options.length>=5,q.id);
    assert.equal(rationale.length,q.options.length,q.id);
    assert.equal(new Set(q.options).size,q.options.length,q.id);
    assert.ok(rationale.every(r=>r.length>=30),q.id);
    assert.ok(sources.length>=2&&sources.every(x=>['docs.aws.amazon.com','aws.amazon.com','aws.github.io'].includes(new URL(x).hostname) && new URL(x).protocol==='https:'),q.id+': '+sources);
  }
});

test('revised diagnostic references exact published lessons and available visual assets',()=>{
  assert.deepEqual(Object.keys(map).sort(),revised.map(q=>q.id).sort());
  for(const q of revised)for(const link of map[q.id]){
    assert.ok(link.href.startsWith(course));
    const [,module,id]=link.href.match(/module-(\d+)\?lesson=(sap-\d+-\d+)$/);
    assert.ok(lessons[module].some(l=>l.id===id&&l.status==='qa-passed'&&l.asset===link.asset),link.href);
    assert.ok(fs.existsSync(new URL('../public'+link.asset.split('?')[0],import.meta.url)),link.asset);
  }
});

test('both editions support score calculation and stay 28 questions; keys are separate',()=>{
  for(const bank of [legacy,revised]){
    const q=bank[0],med=bank.map(x=>({...x,image:'verified'}));
    const a=startAttempt(med,'exam',1000);
    const completed=submit(answer(a,q.id,q.correct,med,2000),3000);
    assert.equal(score(completed,med).correct,1);
    assert.equal(score(completed,med).unanswered,27);
  }
  const view=fs.readFileSync(new URL('../'+dir+'SapPracticeExam.tsx',import.meta.url),'utf8');
  assert.match(view,/sap-c03-module27-attempt-v2/);
  assert.match(view,/sap-c03-module27-attempt-v1/);
  assert.match(view,/key===LEGACY_KEY/);
});
