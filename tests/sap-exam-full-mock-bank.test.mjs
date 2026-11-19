import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {assessFullMock,createFullMockForm,FULL_MOCK_QUOTAS,scoreForm,startFormAttempt} from '../app/components/sap-exam/forms.mjs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const dir='app/components/sap-exam/';
const bank=read(dir+'full-mock-bank.json');
const prior=[...read(dir+'questions.json'),...read('docs/sap-c03/module-27-next/questions-draft.json')];
const lessons=read('app/courses/aws-solutions-architect-professional/visual-lesson-map.json').lessonsByModule;

test('one separate 75-question bank has all five domains and original stems',()=>{
  assert.equal(bank.length,75);
  assert.equal(assessFullMock(bank).available,true);
  assert.deepEqual(Object.values(assessFullMock(bank).byDomain),[18,18,12,12,15]);
  assert.equal(new Set([...bank,...prior].map(q=>q.stem.trim().toLowerCase())).size,108);
  assert.equal(new Set(bank.map(q=>q.scenarioFamily)).size,75);
  assert.equal(new Set(bank.map(q=>q.task)).size,21);
  for(const q of bank){
    assert.equal(q.options.length,q.optionReasons.length,q.id);
    assert.ok(q.correct.length===1?q.options.length===4:q.options.length>=5,q.id);
    assert.ok(q.references.length&&q.sources.length,q.id);
  }
});

test('actual 75-question form scores exactly the blueprint 65 and ignores 10 unscored',()=>{
  const form=createFullMockForm(bank,'actual-bank-probe');
  assert.equal(form.questions.length,75);
  assert.equal(form.descriptor.durationMs,180*60_000);
  const a=startFormAttempt(form,1000);
  const tally={1:0,2:0,3:0,4:0,5:0};
  for(const [i,q] of form.questions.entries())if(form.descriptor.slots[i].scored){
     tally[q.domain]++;
     a.answers[q.id]=q.correct;
  }
  assert.deepEqual(tally,FULL_MOCK_QUOTAS);
  const result=scoreForm({...a,submittedAt:2000},form);
  assert.deepEqual([result.correct,result.total,result.unansweredAll],[65,65,10]);
});

test('each support image and lesson link resolves to a shipped asset',()=>{
  for(const q of bank){
     assert.equal(q.image,q.references[0].asset,q.id);
     for(const link of q.references){
        const [,m,id]=link.href.match(/^\/courses\/aws-solutions-architect-professional\/visual\/module-(\d+)\?lesson=(sap-\d+-\d+)$/);
        assert.ok(lessons[m].some(l=>l.id===id&&l.status==='qa-passed'),id);
        const b=fs.readFileSync(new URL('../public'+link.asset,import.meta.url));
        assert.equal(b.toString('ascii',8,12),'WEBP',id);
     }
  }
});
