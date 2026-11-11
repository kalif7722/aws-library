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
const { getAipVideoProgress, aipVideoId, aipVideoStartedId } = exported;

test("the published AIP playlist has consistent module totals", () => {
  assert.equal(getAipVideoProgress([]).total, 15);
  assert.equal(getAipVideoProgress([], "00").total, 1);
  assert.equal(getAipVideoProgress([], "01").total, 6);
  assert.equal(getAipVideoProgress([], "02").total, 8);
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
