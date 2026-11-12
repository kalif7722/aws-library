import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const file = (p) => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const expected = [[1,3],[4,6],[7,11],[12,16],[17,20],[21,24],[25,26]];
const api=file("app/api/aip-video/route.ts");
const catalog=file("app/components/aipVideoCatalog.ts");
const captions=file("app/api/aip-video-captions/route.ts");
const lessonMap=JSON.parse(file("app/courses/aws-generative-ai-developer-professional/visual-lesson-map.json"));

test("AIP Module 09 covers every original R2 slide once, by topic",()=>{
  const slides=[];
  assert.equal(lessonMap.lessonsByModule["09"].length,26);
  expected.forEach(([start,end],i)=>{
    const part=String(i+1).padStart(2,"0");
    const m=JSON.parse(file(`content/video-narration/aip-module-09-part-${part}.json`));
    const expectedSlides=Array.from({length:end-start+1},(_,offset)=>start+offset);
    assert.equal(m.module_id,"09");
    assert.equal(m.part_id,part);
    assert.deepEqual(m.scenes.map(scene=>scene.slide),expectedSlides);
    assert.match(api,new RegExp(`"09-${part}"\\s*:\\s*\\{`));
    assert.match(captions,new RegExp(`"09-${part}"\\s*:`));
    assert.match(catalog,new RegExp(`id:\\s*"${part}"[^\\n]*start:\\s*${start},\\s*end:\\s*${end}`));
    assert.ok(api.includes(m.script_revision));
    assert.ok(m.scenes.every(scene=>lessonMap.lessonsByModule["09"][scene.slide-1].title===scene.title));
    slides.push(...expectedSlides);
  });
  assert.deepEqual(slides,Array.from({length:26},(_,i)=>i+1));
});
