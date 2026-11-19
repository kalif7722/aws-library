import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  SAP_C03_WEIGHTS, FULL_MOCK_QUOTAS, FULL_MOCK_COUNT, FULL_MOCK_SCORED, FULL_MOCK_MINUTES,
  createDiagnosticForm, assessFullMock, createFullMockForm, hydrateForm, startFormAttempt, scoreForm,
} from '../app/components/sap-exam/forms.mjs';

const legacyPath = process.env.SAP_LEGACY_BANK_PATH ?? new URL('../app/components/sap-exam/questions.json', import.meta.url);
const legacy = JSON.parse(await readFile(legacyPath, 'utf8')).map((q,i)=>({
  ...q,image:`/course-visuals/sap-c03/module-27/question-${String(i+1).padStart(2,'0')}.webp`,
}));
const synthetic = (sizes={1:22,2:23,3:17,4:17,5:20}) => Object.entries(sizes).flatMap(
  ([domain,count])=>Array.from({length:count},(_,i)=>{
    const id=`synthetic-${domain}-${i}`;
    return {id,domain,image:`/fixtures/${id}.webp`,stem:`Original fixture for bank ${id}`,
      explanation:`Fixture explanation for ${id}`,reviewStatus:'reviewed',
      options:i%4===0?['First','Second','Third','Fourth','Fifth']:['Alpha','Bravo','Charlie','Delta'],
      correct:i%4===0?[1,3]:[2]};
  }),
);

test('official pacing and largest remainder use 65 scored, not 75 displayed', ()=>{
  assert.deepEqual(SAP_C03_WEIGHTS,{1:25,2:25,3:15,4:15,5:20});
  assert.deepEqual(FULL_MOCK_QUOTAS,{1:16,2:16,3:10,4:10,5:13});
  assert.equal(FULL_MOCK_COUNT,75); assert.equal(FULL_MOCK_SCORED,65); assert.equal(FULL_MOCK_MINUTES,180);
});

test('preserve original 28-question practice and timed diagnostic',()=>{
  const practice=createDiagnosticForm(legacy,'practice'), diagnostic=createDiagnosticForm(legacy,'exam');
  assert.deepEqual(practice.questions,legacy);
  assert.deepEqual(diagnostic.questions,legacy);
  assert.equal(startFormAttempt(practice,100).deadline,null);
  assert.equal(startFormAttempt(diagnostic,100).deadline,100+90*60_000);
  assert.equal(assessFullMock(legacy).available,false);
  assert.throws(()=>createFullMockForm(legacy,'legacy-only'),/more reviewed/);
});

test('quantity alone does not unlock a full mock without all scored quotas',()=>{
  const readiness=assessFullMock(synthetic({1:55,2:20,3:0,4:4,5:8}));
  assert.equal(readiness.eligible,87);
  assert.deepEqual(readiness.missingByDomain,{1:0,2:0,3:10,4:6,5:5});
  assert.equal(readiness.minimumAdditional,21);
  assert.equal(readiness.available,false);
});

test('protect availability against duplicate stem or ID, unreviewed status, malformed answers, or missing visual',()=>{
  const bank=synthetic({1:21,2:19,3:12,4:11,5:12});
  assert.equal(assessFullMock(bank).eligible,75);
  assert.equal(assessFullMock(bank).available,false); // Domain 5 is one short.
  const good=synthetic({1:20,2:17,3:12,4:11,5:15});
  assert.equal(assessFullMock(good).available,true);
  for(const mutate of [
    (rows)=>{rows[0].stem=rows[1].stem.toUpperCase()+'!?';},
    (rows)=>{rows[0].id=rows[1].id;},
    (rows)=>{rows[0].reviewStatus='draft';},
    (rows)=>{delete rows[0].reviewStatus;},
    (rows)=>{rows[0].options[1]=rows[0].options[0];},
    (rows)=>{rows[0].correct=[0,0];},
    (rows)=>{rows[0].image='';},
    (rows)=>{rows[1].options.push('Extra');},
  ]) {
    const candidate=structuredClone(good); mutate(candidate); assert.equal(assessFullMock(candidate).available,false);
  }
});

test('seeded forms and choice keys are reproducible and do not mutate content',()=>{
  const bank=synthetic(), baseline=structuredClone(bank), a=createFullMockForm(bank,'alpha'), b=createFullMockForm([...bank].reverse(),'alpha');
  const c=createFullMockForm(bank,'beta');
  assert.deepEqual(a,b);
  assert.notDeepEqual(a.descriptor.slots.map(s=>s.id),c.descriptor.slots.map(s=>s.id));
  assert.equal(new Set(a.questions.map(q=>q.id)).size,75);
  assert.equal(a.descriptor.slots.filter(s=>!s.scored).length,10);
  const tally={1:0,2:0,3:0,4:0,5:0};
  for(const [i,q] of a.questions.entries()){
    const authored=bank.find(x=>x.id===q.id);
    assert.deepEqual(q.correct.map(x=>q.options[x]).sort(),authored.correct.map(x=>authored.options[x]).sort());
    if(a.descriptor.slots[i].scored) tally[q.domain]++;
  }
  assert.deepEqual(tally,FULL_MOCK_QUOTAS);
  assert.deepEqual(bank,baseline);
  assert.equal(startFormAttempt(a,123).deadline,123+180*60_000);
});

test('resume after encoding and bank append, but refuse changed choice order or question material',()=>{
  const bank=synthetic(), form=createFullMockForm(bank,'resume');
  const a=startFormAttempt(form,1000), saved=JSON.parse(JSON.stringify(a));
  assert.deepEqual(hydrateForm(saved.form,[...bank,{...bank[0],id:'new-q',stem:'New question'}]),form);
  const changed=structuredClone(bank);
  changed.find(q=>q.id===saved.questionIds[0]).options[0]='Changed wording after attempt';
  assert.throws(()=>hydrateForm(saved.form,changed),/updated, removed/);
  saved.form.slots[0].choiceOrder[0]=saved.form.slots[0].choiceOrder[1];
  assert.throws(()=>hydrateForm(saved.form,bank),/Invalid saved choice order/);
});

test('score only after submission and do not count unscored answers or duplicate checkbox selections',()=>{
  const form=createFullMockForm(synthetic(),'score'), a=startFormAttempt(form,0);
  assert.throws(()=>scoreForm(a,form),/Submit before/);
  let marked=0; let dupId='';
  for(const [index,q] of form.questions.entries()){
    if(form.descriptor.slots[index].scored){
      if(q.correct.length>1&&!dupId){dupId=q.id; a.answers[q.id]=[q.correct[0],q.correct[0]];}
      else {a.answers[q.id]=q.correct; marked++;}
    }
  }
  a.submittedAt=2100;
  const score=scoreForm(a,form);
  assert.equal(score.correct,marked);
  assert.equal(score.total,65);
  assert.equal(score.unanswered,0);
  assert.equal(score.unansweredAll,10);
  assert.equal(score.results.length,75);
  assert.equal(score.results.find(q=>q.id===dupId).correct,false);
  assert.equal(Object.values(score.domains).reduce((sum,d)=>sum+d.total,0),65);
});
