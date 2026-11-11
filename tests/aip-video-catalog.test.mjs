import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

// Compile the same TypeScript catalog imported by the website rather than
// duplicating the business rules in a separate test implementation.
const source = readFileSync(new URL("../app/components/aipVideoCatalog.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exported = {};
runInNewContext(js, { exports: exported, module: { exports: exported } });
const { getAipVideoProgress, aipVideoId, aipVideoStartedId, aipVideoCompletionIds } = exported;

test("the published AIP playlist has consistent module totals", () => {
  assert.equal(getAipVideoProgress([]).total, 34);
  assert.equal(getAipVideoProgress([], "00").total, 1);
  assert.equal(getAipVideoProgress([], "01").total, 6);
  assert.equal(getAipVideoProgress([], "02").total, 19);
  assert.equal(getAipVideoProgress([], "03").total, 8);
});

test("watching a video briefly records seen without falsely completing it", () => {
  const result = getAipVideoProgress([aipVideoStartedId("01", "01")], "01");
  assert.equal(result.seen, 1);
  assert.equal(result.completed, 0);
  assert.equal(result.inProgress, 1);
});

test("studying one slide also counts the matching video as seen", () => {
  const result = getAipVideoProgress(["aip-02-29"], "02");
  assert.equal(result.seen, 1);
  assert.equal(result.completed, 0);
  assert.deepEqual(Array.from(result.seenIds), [aipVideoId("02", "05")]);
});

test("watching 85% of a video adds its completed ID without double counting", () => {
  const id = aipVideoId("02", "01");
  const result = getAipVideoProgress([aipVideoStartedId("02", "01"), id, "aip-02-1"], "02");
  assert.equal(result.seen, 1);
  assert.equal(result.completed, 1);
  assert.equal(result.inProgress, 0);
});

test("all matching slides complete a video, including older slide-only records", () => {
  const slides = [10,11,12,13].map(i => `aip-01-${i}`);
  const result = getAipVideoProgress(slides, "01");
  assert.equal(result.seen, 1);
  assert.equal(result.completed, 1);
  assert.deepEqual(Array.from(result.completedIds), [aipVideoId("01", "02")]);
});

test("a video viewed in one module never counts toward another", () => {
  const done = [aipVideoStartedId("01", "01"),"aip-01-3"];
  assert.equal(getAipVideoProgress(done, "02").seen, 0);
  assert.equal(getAipVideoProgress(done, "01").seen, 1);
});

test("fast-forwarding or explicitly marking video complete credits all chapter slides", () => {
  const ids = Array.from(aipVideoCompletionIds("01", "02", [10,11,12,13]));
  assert.equal(ids.length,5);
  assert.equal(ids[0],"aip-video-01-02");
  assert.equal(getAipVideoProgress(ids,"01").completed,1);
  assert.equal(getAipVideoProgress(ids,"01").inProgress,0);
  assert.ok(ids.includes("aip-01-13"));
});

test("completion IDs are unique even for repeated chapter metadata", () => {
  assert.deepEqual(Array.from(aipVideoCompletionIds("02","03",[16,17,17,18])),
    ["aip-video-02-03","aip-02-16","aip-02-17","aip-02-18"]);
});

test("new module 02 lecture parts count in course completion denominator", () => {
  const completed=aipVideoCompletionIds("02","12",[81,82,83,84,85,86,87,88,89,90]);
  const stats=getAipVideoProgress(completed,"02");
  assert.equal(stats.total,19);
  assert.equal(stats.completed,1);
  assert.equal(stats.seen,1);
});

test("Module 02 new video sections 13 through 15 align to real source slide ranges",()=>{
  const sections=[
    ["13",91,100],["14",101,110],["15",111,120],
  ];
  for(const [part,start,end] of sections){
    const entries=Array.from({length:end-start+1},(_,i)=>`aip-02-${start+i}`);
    const completed=getAipVideoProgress(entries,"02");
    assert.equal(completed.completed,1);
    assert.deepEqual(Array.from(completed.completedIds),[aipVideoId("02",part)]);
  }
});

test("last four Module 02 parts map every remaining published slide, 121–144",()=>{
  const sections=[["16",121,125],["17",126,134],["18",135,138],["19",139,144]];
  const coverage=[];
  for(const [part,start,end] of sections){
    const ids=Array.from({length:end-start+1},(_,i)=>`aip-02-${start+i}`);
    coverage.push(...Array.from({length:end-start+1},(_,i)=>start+i));
    const progress=getAipVideoProgress(ids,"02");
    assert.equal(progress.completed,1);
    assert.deepEqual(Array.from(progress.completedIds),[aipVideoId("02",part)]);
  }
  assert.deepEqual(coverage,Array.from({length:24},(_,i)=>i+121));
  assert.equal(getAipVideoProgress([],"02").total,19);
});

test("Module 03 first three lectures cover exactly slides 1 to 20",()=>{
  const parts=[["01",1,6],["02",7,14],["03",15,20]];
  const slides=[];
  for(const [part,start,end] of parts){
    const covered=Array.from({length:end-start+1},(_,i)=>start+i);
    slides.push(...covered);
    const completed=getAipVideoProgress(covered.map(n=>`aip-03-${n}`),"03");
    assert.deepEqual(Array.from(completed.completedIds),[aipVideoId("03",part)]);
  }
  assert.deepEqual(slides,Array.from({length:20},(_,i)=>i+1));
});

test("Module 03 eight visually matched lectures cover all 50 slides exactly once",()=>{
  const ranges=[["01",1,6],["02",7,14],["03",15,20],["04",21,27],["05",28,33],["06",34,40],["07",41,45],["08",46,50]];
  const all=[];
  for(const [part,start,end] of ranges){
    const slides=Array.from({length:end-start+1},(_,i)=>start+i);
    all.push(...slides);
    const d=getAipVideoProgress(slides.map(i=>`aip-03-${i}`),"03");
    assert.deepEqual(Array.from(d.completedIds),[aipVideoId("03",part)]);
  }
  assert.equal(getAipVideoProgress([],"03").total,8);
  assert.deepEqual(all,Array.from({length:50},(_,i)=>i+1));
});
