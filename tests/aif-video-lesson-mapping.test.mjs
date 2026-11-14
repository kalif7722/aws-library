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
const lessonCounts={"00":4,"01":6,"02":29,"03":62,"04":20};
const videoSceneCounts={"00":4,"01":6,"02":6,"03":5,"04":3};

test("AIF module pages show original lessons and beginner-first video lectures",()=>{
  assert.match(page,/import AifVideoLectures/);
  assert.match(page,/id!=='14'&&<AifVideoLectures moduleId=\{id\}\/>/);
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
  assert.match(api,/!manifest\.script_revision/);
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
  assert.ok(api.includes("scene.slide !== (scenes[i-1].slide ?? 0)+1"),
    "Media readiness must check actual chapter slide numbers, not assume every part starts at slide 1");
});

test("AIF Module 03 teaching-unit boundaries use the correct original slide sequence",()=>{
  const manifest=JSON.parse(read("content/video-narration/aif-module-03-part-02.json"));
  const w=read(".github/workflows/render-aif-m03-part-02.yml");
  assert.deepEqual(manifest.scenes.map(scene=>scene.slide),[6,7,8]);
  assert.equal(manifest.script_revision,"2026-11-13-aif-m03-p02-beginner-visual-v1");
  assert.ok(manifest.scenes.every(scene=>scene.narration.trim().split(/\s+/).length>=100));
  assert.ok(w.includes("audit_aif_local_visuals.py --module 03"));
  assert.ok(w.includes('["verified_slides"]==62'));
  assert.ok(w.includes('start: 6\n            end: 8'));
  assert.ok(api.includes('"03-02":'));
  assert.ok(api.includes('count: 3, firstSlide: 6, firstTitle: "What is Deep Learning (DL)?"'));
  assert.ok(catalog.includes('title:"Deep Learning and Neural Networks Explained Visually",start:6,end:8'));
});

test("AIF Module 04 video section is mounted and maps real lecture parts",()=>{
  assert.match(page,/id!=='14'&&<AifVideoLectures moduleId=\{id\}\/>/);
  for(const [part,start,end] of [["01",1,3],["02",4,7],["03",8,11],["04",12,14],["05",15,16],["06",17,20]]){
    const manifest=JSON.parse(read(`content/video-narration/aif-module-04-part-${part}.json`));
    const workflow=read(`.github/workflows/render-aif-m04-part-${part}.yml`);
    assert.deepEqual(manifest.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,i)=>start+i));
    assert.ok(workflow.includes("audit_aif_local_visuals.py --module 04"));
    assert.ok(workflow.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(api.includes(`"04-${part}":`));
    assert.ok(catalog.includes(`id:"${part}"`));
  }
});

test("AIF Module 05 published lectures mount automatically and cover all 28 slides",()=>{
  assert.match(page,/id!=='14'&&<AifVideoLectures moduleId=\{id\}\/>/);
  const intervals=[[1,3],[4,8],[9,14],[15,20],[21,24],[25,28]];
  let previous=0;
  for(let i=0;i<intervals.length;i++){
    const part=String(i+1).padStart(2,"0");
    const [start,end]=intervals[i];
    const manifest=JSON.parse(read(`content/video-narration/aif-module-05-part-${part}.json`));
    assert.equal(start,previous+1);
    assert.deepEqual(manifest.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    assert.ok(api.includes(`"05-${part}":`));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    previous=end;
  }
  assert.equal(previous,28);
  assert.match(read(".github/workflows/render-aif-m05-parts.yml"),/audit_aif_local_visuals.py --module 05/);
});

test("AIF Module 06 prompt-engineering video manifest coverage is contiguous and R2 gated",()=>{
  const intervals=[[1,4],[5,7],[8,11],[12,15]];
  const workflow=read(".github/workflows/render-aif-m06-parts.yml");
  const all=[];
  for(let i=0;i<intervals.length;i++){
    const part=String(i+1).padStart(2,"0");
    const [start,end]=intervals[i];
    const manifest=JSON.parse(read(`content/video-narration/aif-module-06-part-${part}.json`));
    assert.equal(manifest.course_slug,"aif");
    assert.equal(manifest.module_id,"06");
    assert.equal(manifest.part_id,part);
    assert.deepEqual(manifest.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    assert.ok(manifest.scenes.every(s=>s.narration.trim().split(/\s+/).length>=100));
    assert.ok(workflow.includes(`- part: "${part}"`));
    assert.ok(workflow.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(workflow.includes(manifest.script_revision));
    assert.ok(api.includes(`"06-${part}":`));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    all.push(...manifest.scenes.map(s=>s.slide));
  }
  assert.deepEqual(all,Array.from({length:15},(_,i)=>i+1));
  assert.ok(workflow.includes("audit_aif_local_visuals.py --module 06"));
  assert.ok(workflow.includes("Publish only verified files to Cloudflare R2"));
  assert.ok(api.includes("!manifest.script_revision"));
});

test("AIF Module 07 Q assistant lessons are mapped in sequence and R2 gated",()=>{
  const intervals=[[1,4],[5,6],[7,10],[11,14],[15,15]];
  const workflow=read(".github/workflows/render-aif-m07-parts.yml");
  const all=[];
  for(let i=0;i<intervals.length;i++){
    const part=String(i+1).padStart(2,"0");
    const [start,end]=intervals[i];
    const m=JSON.parse(read(`content/video-narration/aif-module-07-part-${part}.json`));
    assert.equal(m.module_id,"07");
    assert.equal(m.course_slug,"aif");
    assert.equal(m.part_id,part);
    assert.deepEqual(m.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    assert.ok(m.scenes.every(s=>s.narration.trim().split(/\s+/).length>=100));
    assert.ok(workflow.includes(`- part: "${part}"`));
    assert.ok(workflow.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(workflow.includes(m.script_revision));
    assert.ok(api.includes(`"07-${part}":`));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    all.push(...m.scenes.map(s=>s.slide));
  }
  assert.deepEqual(all,Array.from({length:15},(_,i)=>i+1));
  assert.ok(workflow.includes("audit_aif_local_visuals.py --module 07"));
  assert.ok(workflow.includes("Publish only verified files to Cloudflare R2"));
});

test("AIF Module 08 managed AI service lectures cover all original lesson slides",()=>{
  const ranges=[[1,5],[6,11],[12,15],[16,18],[19,23],[24,26],[27,29]];
  const workflow=read(".github/workflows/render-aif-m08-parts.yml");
  const all=[];
  for(let i=0;i<ranges.length;i++){
    const [start,end]=ranges[i];
    const part=String(i+1).padStart(2,"0");
    const m=JSON.parse(read(`content/video-narration/aif-module-08-part-${part}.json`));
    assert.equal(m.course_slug,"aif");
    assert.equal(m.module_id,"08");
    assert.equal(m.part_id,part);
    assert.deepEqual(m.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    assert.ok(m.scenes.every(s=>s.narration.trim().split(/\s+/).length>=100));
    assert.ok(workflow.includes(`- part: "${part}"`));
    assert.ok(workflow.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(api.includes(`"08-${part}":`));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    all.push(...m.scenes.map(s=>s.slide));
  }
  assert.deepEqual(all,Array.from({length:29},(_,i)=>i+1));
  assert.ok(workflow.includes("audit_aif_local_visuals.py --module 08"));
  assert.ok(workflow.includes('["verified_slides"]==29'));
  assert.ok(api.includes("!manifest.script_revision"));
});


test("AIF Module 11 image-reviewed governance and MLOps lectures cover all 23 original slides",()=>{
  const ranges=[[1,4],[5,9],[10,12],[13,14],[15,15],[16,17],[18,19],[20,23]];
  const workflow=read(".github/workflows/render-aif-m11-parts-01-08.yml");
  const lessons=moduleMap.lessons.filter(item=>item.moduleId==="11");
  assert.equal(lessons.length,23);
  const seen=[];
  for(let i=0;i<ranges.length;i++){
    const part=String(i+1).padStart(2,"0");
    const [start,end]=ranges[i];
    const manifest=JSON.parse(read(`content/video-narration/aif-module-11-part-${part}.json`));
    assert.equal(manifest.module_id,"11");
    assert.equal(manifest.course_slug,"aif");
    assert.equal(manifest.part_id,part);
    assert.equal(manifest.voice,"en-US-AndrewNeural");
    assert.equal(manifest.speech_rate,"-3%");
    assert.ok(manifest.scenes.every(scene=>scene.narration.trim().split(/\s+/).length>=90));
    assert.deepEqual(manifest.scenes.map(scene=>scene.slide),Array.from({length:end-start+1},(_,n)=>start+n));
    assert.ok(workflow.includes(`- part: "${part}"`));
    assert.ok(workflow.includes(`start: ${start}\n            end: ${end}`));
    assert.ok(workflow.includes(manifest.script_revision));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    assert.ok(api.includes(`"11-${part}":`));
    seen.push(...manifest.scenes.map(scene=>scene.slide));
  }
  assert.deepEqual(seen,Array.from({length:23},(_,i)=>i+1));
  assert.ok(workflow.includes("audit_aif_local_visuals.py --module 11"));
  assert.ok(workflow.includes('audit["module"]=="11"'));
  assert.ok(workflow.includes('m["module_id"]=="11"'));
  assert.ok(workflow.includes("python scripts/validate_aif_video_workflow.py --workflow .github/workflows/render-aif-m11-parts-01-08.yml"));
  assert.ok(!workflow.includes("audit_aif_local_visuals.py --module 10"));
  assert.ok(workflow.includes('["verified_slides"]==23'));
  assert.ok(workflow.includes("Publish only verified files to Cloudflare R2"));
  assert.ok(api.includes("const config = MODULES["));
  assert.ok(api.includes("!manifest.script_revision"));
});


test("AIF Module 12 VisualFirst narration follows reviewed slide structure for first 10 visuals",()=>{
  const workflow=read(".github/workflows/render-aif-m12-parts-01-02.yml");
  const ranges=[["01",1,5],["02",6,10]];
  const seen=[];
  assert.equal(moduleMap.lessons.filter(l=>l.moduleId==="12").length,52);
  assert.ok(workflow.includes("audit_aif_local_visuals.py --module 12"));
  assert.ok(workflow.includes('audit["module"]=="12"'));
  assert.ok(workflow.includes('m["module_id"]=="12"'));
  assert.ok(workflow.includes('audit["verified_slides"]==52'));
  assert.ok(workflow.includes('validate_aif_video_workflow.py --workflow .github/workflows/render-aif-m12-parts-01-02.yml'));
  assert.ok(!workflow.includes('m["module_id"]=="11"'));
  for(const [part,start,end] of ranges){
    const m=JSON.parse(read(`content/video-narration/aif-module-12-part-${part}.json`));
    assert.equal(m.module_id,"12");
    assert.equal(m.part_id,part);
    assert.deepEqual(m.scenes.map(s=>s.slide),Array.from({length:end-start+1},(_,i)=>start+i));
    assert.ok(m.scenes.every(s=>s.narration.split(/\s+/).length>=150));
    assert.ok(m.scenes.every(s=>s.visual_overview?.trim()));
    assert.ok(m.scenes.every(s=>s.visual_walkthrough?.length>=3));
    assert.ok(m.scenes.every(s=>typeof s.visual_example==="string"));
    assert.ok(m.scenes.every(s=>s.visual_synthesis?.trim()));
    assert.ok(workflow.includes(m.script_revision));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    assert.ok(api.includes(`"12-${part}":`));
    seen.push(...m.scenes.map(s=>s.slide));
  }
  assert.deepEqual(seen,Array.from({length:10},(_,i)=>i+1));
});


test("AIF Module 12 all 52 source images map to ten image-introduced lectures without gaps",()=>{
  const expected=[["01",1,5],["02",6,10],["03",11,13],["04",14,18],["05",19,22],
    ["06",23,28],["07",29,33],["08",34,40],["09",41,45],["10",46,52]];
  const w=read(".github/workflows/render-aif-m12-parts-03-10.yml");
  const old=read(".github/workflows/render-aif-m12-parts-01-02.yml");
  const all=[];
  assert.ok(w.includes("validate_aif_video_workflow.py --workflow .github/workflows/render-aif-m12-parts-03-10.yml"));
  assert.ok(w.includes("audit_aif_local_visuals.py --module 12"));
  assert.ok(w.includes('audit["module"]=="12"'));
  assert.ok(w.includes('m["module_id"]=="12"'));
  assert.ok(w.includes('audit["mapped_slides"]==52 and audit["verified_slides"]==52'));
  assert.ok(!w.includes("audit_aif_local_visuals.py --module 11"));
  assert.ok(!w.includes('m["module_id"]=="11"'));
  assert.ok(!old.includes('aif-module-12-part-*.json'),"Original two-lesson batch must not rerender on additional manifests");
  for (const [part,start,end] of expected){
    const m=JSON.parse(read(`content/video-narration/aif-module-12-part-${part}.json`));
    assert.equal(m.course_slug,"aif");
    assert.equal(m.module_id,"12");
    assert.equal(m.part_id,part);
    assert.equal(m.slide_local_dir,"public/course-visuals/aif-course/module-12");
    assert.deepEqual(m.scenes.map(v=>v.slide),Array.from({length:end-start+1},(_,j)=>start+j));
    for(const scene of m.scenes){
      assert.ok(scene.visual_overview?.trim(),`slide ${scene.slide} missing visual orientation`);
      assert.ok(scene.visual_walkthrough?.length>=3,`slide ${scene.slide} missing actual panel/arrow anchors`);
      assert.ok(scene.visual_example?.trim(),`slide ${scene.slide} missing worked-example reference`);
      assert.ok(scene.visual_synthesis?.trim(),`slide ${scene.slide} missing full-picture explanation`);
      assert.ok(scene.narration?.trim().split(/\\s+/).length>=90,`slide ${scene.slide} narration not substantial`);
    }
    const wf=Number(part)<=2?old:w;
    assert.ok(wf.includes(`- part: "${part}"\n            start: ${start}\n            end: ${end}`));
    assert.ok(wf.includes(m.script_revision));
    assert.ok(api.includes(`"12-${part}":`));
    assert.ok(catalog.includes(`id:"${part}",title:`));
    all.push(...m.scenes.map(v=>v.slide));
  }
  assert.deepEqual(all,Array.from({length:52},(_,j)=>j+1));
});
