import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createState,applyConfig,serviceAction,evaluate,SOLUTIONS,DEFAULTS,fixtureCases} from "../app/components/genai-labs/engine.mjs";
const map=JSON.parse(readFileSync(new URL("../app/components/genai-labs/map.json",import.meta.url),"utf8"));
function solve(i){let state=applyConfig(createState(i),SOLUTIONS[i]);if(i===5)state=serviceAction(state,"sync");if(i===9)state=serviceAction(state,"prepare");if(i===10){state=serviceAction(state,"guardrail-edit");state=serviceAction(state,"guardrail-attack");state=serviceAction(state,"guardrail-publish")}return state}
for(let i=0;i<12;i++){
 test(`lab ${i+1}: seeded failure, full solution, independent fixtures, revert`,()=>{
  const initial=createState(i);assert.equal(evaluate(initial).ok,false);
  const solved=solve(i);const result=evaluate(solved);assert.equal(result.ok,true,JSON.stringify(result));assert.ok(result.tests.length>=2);assert.ok(result.tests.every(t=>t.expected===t.actual));
  const reverted=applyConfig(solved,DEFAULTS[i]);assert.equal(evaluate(reverted).ok,false);
  assert.deepEqual(initial.config,DEFAULTS[i]);assert.equal(createState(i).result,null);
 });
}
test("knowledge base: upload, ingestion and cache are separate",()=>{let s=createState(5);s=serviceAction(s,"sync");assert.equal(s.indexedVersion,18);assert.equal(evaluate(s).ok,false);s=applyConfig(s,SOLUTIONS[5]);assert.equal(evaluate(s).ok,true)});
test("agent: edits invalidate prepared draft and old test result",()=>{let s=solve(9);s.result=evaluate(s);s=applyConfig(s,SOLUTIONS[9]);assert.equal(s.result,null);assert.equal(s.prepared,false);assert.equal(evaluate(s).ok,false);assert.equal(evaluate(serviceAction(s,"prepare")).ok,true)});
test("guardrail: draft, immutable numeric version and application invocation",()=>{let s=createState(10);s=serviceAction(s,"guardrail-edit");s=serviceAction(s,"guardrail-publish");assert.deepEqual(s.guardrailVersions,["1"]);s=serviceAction(s,"guardrail-attack");s=serviceAction(s,"guardrail-publish");assert.equal(evaluate(s).ok,false);s=applyConfig(s,SOLUTIONS[10]);assert.equal(evaluate(s).ok,true);s=serviceAction(s,"guardrail-edit");assert.equal(evaluate(s).ok,true,"published version remains immutable after draft edit")});
test("JSON config validation cannot silently mutate state",()=>{const s=createState(0);for(const bad of [null,[],"text"]){assert.throws(()=>applyConfig(s,bad))}assert.deepEqual(s.config,DEFAULTS[0]);assert.throws(()=>applyConfig(s,{text:"x".repeat(21000)}))});
test("partial fixes stay failing",()=>{for(let i=0;i<12;i++){const s=createState(i);const key=Object.keys(SOLUTIONS[i])[0];s.config[key]=structuredClone(SOLUTIONS[i][key]);assert.equal(evaluate(s).ok,false,`lab ${i+1}`)}});
test("negative fixtures are independent of overall lab success",()=>{assert.ok(fixtureCases(createState(1)).some(t=>t.ok));assert.ok(fixtureCases(createState(10)).some(t=>t.ok));assert.ok(fixtureCases(createState(10)).some(t=>!t.ok))});
test("mapping has 12 labs and exactly 74 unique, contiguous visuals",()=>{const slides=map.flatMap(l=>l.steps.map(s=>s.slide));assert.equal(map.length,12);assert.deepEqual(slides,Array.from({length:74},(_,i)=>i+1));for(const l of map){assert.equal(l.steps.length,l.end-l.start+1);for(const s of l.steps)assert.ok(s.src.endsWith(`module19-slide-${String(s.slide).padStart(2,"0")}.webp`))}});
