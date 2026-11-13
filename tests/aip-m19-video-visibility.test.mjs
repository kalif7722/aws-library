import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../app/courses/aws-generative-ai-developer-professional/visual/[moduleId]/page.tsx", import.meta.url), "utf8");
const player = readFileSync(new URL("../app/components/AipVideoLectures.tsx", import.meta.url), "utf8");
const catalog = readFileSync(new URL("../app/components/aipVideoCatalog.ts", import.meta.url), "utf8");
const api = readFileSync(new URL("../app/api/aip-video/route.ts", import.meta.url), "utf8");
const captions = readFileSync(new URL("../app/api/aip-video-captions/route.ts", import.meta.url), "utf8");

test("Module 19 renders video lectures on its custom troubleshooting page", () => {
  const branch = page.slice(page.indexOf('if (id === "19")'), page.indexOf('const { id: num'));
  assert.match(branch, /<AipVideoLectures moduleId=\{id\} \/>/);
  assert.match(branch, /<GenAITroubleshootingModule \/>/);
  assert.ok(branch.indexOf("<AipVideoLectures") < branch.indexOf("<GenAITroubleshootingModule"));
  assert.match(branch, /id="visual-lessons"/);
});

test("Module 19 video posters and chapter source links use original local visuals", () => {
  assert.match(player, /moduleId === "19" \? `\/course-visuals\/genai-troubleshooting\/module19-slide-/);
  assert.match(player, /poster=\{slideBase\.startsWith\("\/"\)/);
  assert.match(player, /moduleId !== "00"/);
});

test("All 12 Module 19 videos are linked in the player and availability APIs", () => {
  const section = catalog.slice(catalog.indexOf('  "19": ['), catalog.indexOf('  "17": ['));
  let slides = 0;
  for (let i = 1; i <= 12; i++) {
    const p = String(i).padStart(2, "0");
    assert.match(section, new RegExp('id: "' + p + '"'), "missing catalog part " + p);
    assert.ok(api.includes('"19-' + p + '": {'), "missing availability part " + p);
    assert.ok(captions.includes('"19-' + p + '":'), "missing caption part " + p);
  }
  const ranges = [...section.matchAll(/start: (\d+), end: (\d+)/g)].map(m => [Number(m[1]),Number(m[2])]);
  assert.equal(ranges.length, 12);
  for (const [start,end] of ranges) {
    assert.equal(start,slides+1,"non-contiguous module 19 slide mapping");
    slides=end;
  }
  assert.equal(slides,74);
});
