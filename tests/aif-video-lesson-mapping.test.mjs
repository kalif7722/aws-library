import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read = path => readFileSync(new URL("../"+path,import.meta.url),"utf8");
const page=read("app/courses/aws-ai-practitioner/visual/[moduleId]/page.tsx");
const catalog=read("app/components/AifVideoLectures.tsx");
const api=read("app/api/aif-video/route.ts");
const renderer=read("scripts/render_aip_course_video.py");
const audit=read("scripts/audit_aif_local_visuals.py");
const moduleMap=JSON.parse(read("app/courses/aws-ai-practitioner/visual-lesson-map.json"));
const lessonCounts={"00":4,"01":6,"02":29};
const videoSceneCounts={"00":4,"01":6,"02":6};

test("AIF module pages show original lessons and beginner-first video lectures",()=>{
  assert.match(page,/import AifVideoLectures/);
  assert.match(page,/\['00','01','02'\]\.includes\(id\)&&<AifVideoLectures moduleId=\{id\}\/>/);
  assert.ok(page.indexOf("<AifVideoLectures")<page.indexOf("<AifModuleLessons"));
  assert.match(page,/id!=='14'&&<AifModuleLessons/);
  assert.match(catalog,/id="video-lectures"/);
});

test("AIF local images, player and R2 paths are separate from AIP",()=>{
  assert.match(audit,/aif-course\/module-/);
  assert.match(renderer,/if course_slug == "aif":/);
  assert.match(renderer,/manifest\.get\("output_prefix"\)/);
  assert.match(catalog,/\/course-visuals\/aif-course\/module-/);
  assert.match(api,/aws-course-videos\/previews\/aif/);
  assert.match(api,/method:"HEAD"/);
  assert.match(api,/manifest\.script_revision !== config\.revision/);
});

for(const [module,count] of Object.entries(lessonCounts)){
  test("AIF Module "+module+" has a verified source-to-video map",()=>{
    const lessons=moduleMap.lessons.filter(item=>item.moduleId===module);
    assert.equal(lessons.length,count);
    for(let i=0;i<count;i++){
      assert.equal(lessons[i].sequence,i+1);
      assert.equal(lessons[i].asset,`/course-visuals/aif-course/module-${module}/slide-${String(i+1).padStart(2,"0")}.webp`);
    }
    assert.ok(api.includes('"'+module+'-01":'),"API missing video "+module);
    assert.ok(catalog.includes('"'+module+'":'),"player missing module "+module);
    const w=read(`.github/workflows/render-aif-m${module}-part-01.yml`);
    const manifest=JSON.parse(read(`content/video-narration/aif-module-${module}-part-01.json`));
    assert.equal(manifest.course_slug,"aif");
    assert.equal(manifest.module_id,module);
    assert.equal(manifest.scenes.length,videoSceneCounts[module]);
    assert.ok(w.includes('assert m["course_slug"]=="aif"'));
    assert.ok(w.includes('aws-course-videos/previews/aif/module-'+module));
    for(let i=0;i<videoSceneCounts[module];i++){
      assert.equal(manifest.scenes[i].slide,i+1);
      assert.ok(manifest.scenes[i].narration.split(/\s+/).length>=150);
    }
  });
}

test("All five AIF Module 02 lectures cover every slide without gaps and validate actual start",()=>{
  const intervals=[[1,6],[7,13],[14,17],[18,25],[26,29]];
  const spans=[...catalog.matchAll(/\{id:"(0[1-5])",title:"[^"]+",start:(\d+),end:(\d+)\}/g)]
    .map(m=>[Number(m[2]),Number(m[3])]);
  assert.deepEqual(spans.slice(-5),intervals);
  for(let i=0;i<intervals.length;i++){
    const part=String(i+1).padStart(2,"0");
    const [start,end]=intervals[i];
    const m=JSON.parse(read(`content/video-narration/aif-module-02-part-${part}.json`));
    const w=read(`.github/workflows/render-aif-m02-part-${part}.yml`);
    assert.deepEqual(m.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    assert.ok(m.scenes.every(s=>s.narration.trim().split(/\s+/).length>=100));
    assert.ok(w.includes(`- part: "${part}"`));
    assert.ok(w.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(w.includes(m.script_revision));
    assert.ok(api.includes(`"02-${part}":`));
    assert.ok(api.includes(`firstSlide: ${start}, firstTitle:`));
    assert.ok(w.includes("audit_aif_local_visuals.py --module 02"));
  }
  assert.ok(api.includes("scene.slide !== config.firstSlide+i"),
    "Media readiness must check actual chapter slide numbers, not assume every part starts at slide 1");
});
