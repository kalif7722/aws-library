import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {startAttempt,answer,checkAnswer,canReview,submit,score} from '../app/components/genai-exam/engine.mjs';
const source=fs.readFileSync(new URL('../app/components/genai-exam/bank.ts',import.meta.url),'utf8').replace(/^import manifest.*$/m,'const manifest='+fs.readFileSync(new URL('../docs/aip-exam-question-manifest.json',import.meta.url),'utf8')+';');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {questions}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
test('75 authored questions have unique and valid image mappings',()=>{
 assert.equal(questions.length,75);assert.equal(new Set(questions.map(q=>q.id)).size,75);assert.equal(new Set(questions.map(q=>q.image)).size,75);
 const domains={};for(const q of questions){domains[q.domain]=(domains[q.domain]??0)+1;assert.ok(q.stem.length>70);assert.ok(q.explanation.length>100);assert.ok(q.options.length>=4);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.correct.every(n=>n>=0&&n<q.options.length));const bytes=fs.readFileSync(new URL('../public'+q.image,import.meta.url));assert.ok(bytes.length>20000);assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');}assert.deepEqual(domains,{'1':23,'2':20,'3':15,'4':9,'5':8});assert.equal(questions.filter(q=>q.correct.length>1).length,8);
});
test('all 38 revision WebP images exist',()=>{for(const m of [...Array.from({length:18},(_,i)=>i),19])for(const p of [1,2])assert.ok(fs.statSync(new URL(`../public/course-visuals/genai-exam-revision/revision-m${String(m).padStart(2,'0')}-0${p}.webp`,import.meta.url)).size>20000)});
test('real question bank runs in practice and exam modes with correct scoring',()=>{let a=startAttempt(questions,'practice',1000);a=answer(a,questions[0].id,questions[0].correct,questions,1100);assert.equal(canReview(a,questions[0].id),false);a=checkAnswer(a,questions[0].id,questions,1200);assert.equal(canReview(a,questions[0].id),true);let e=startAttempt(questions,'exam',1000);for(const q of questions)e=answer(e,q.id,q.correct,questions,2000);assert.equal(canReview(e,questions[0].id),false);assert.equal(score(submit(e,3000),questions).correct,75)});
