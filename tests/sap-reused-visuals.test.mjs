import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {test,after} from 'node:test';
import {createServer} from 'vite';

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url),'utf8'));
const text = (path) => readFileSync(new URL(path, import.meta.url),'utf8');
const slugs = {saa:'aws-solutions-architect-associate',dva:'aws-developer-associate',scs:'aws-security-specialty'};
const plans = Object.fromEntries(Object.entries(slugs).map(([course,slug]) => [course,read(`../app/courses/${slug}/visual-plan.json`)]));
const links = read('../app/components/SapReuseSourceLinks.json');
const sapPrefix = '/course-visuals/sap-c03/';
const courses = Object.entries(plans).flatMap(([course,plan]) => plan.modules.map(module => ({
 course, id:module.id, visuals:course === 'scs'
  ? module.slides.map(slide => ({...slide,id:slide.lessonId ?? `scs-${module.id}-${slide.number}`,asset:slide.src}))
  : module.lessons ?? [],
})));
const vite = await createServer({configFile:false,server:{middlewareMode:true,hmr:false}});
after(() => vite.close());
const {resolveSapReuseAssets} = await vite.ssrLoadModule('/app/components/SapReuseAssets.ts');
const {publishedModuleLessons,publishedSapImageUrl} = await vite.ssrLoadModule('/app/components/SapPublishedLessons.ts');
const saaLinksById = new Map(Object.values(links.saa).flatMap(module => Object.entries(module)));
function expectedSource(lesson) {
 const declared = lesson.sourceLessonId;
 if (declared?.startsWith('sap-')) return [declared.split('-')[1], declared];
 if (declared && saaLinksById.has(declared)) return saaLinksById.get(declared);
 // Legacy consumers without source metadata retain their original numbered SAP
 // path as fallback. Read that consumer-side evidence, never the current
 // canonical filename. The stable SAP ID survives a descriptive rename.
 const slot = /^\/course-visuals\/sap-c03\/module-(\d{2})\/slide-(\d+)/.exec(lesson.asset);
 return slot && [slot[1], `sap-${slot[1]}-${slot[2].padStart(3,'0')}`];
}

test('every SAP reuse in effective learner maps links to exactly one published SAP lesson; native rows stay untouched', () => {
 for(const {course,id,visuals} of courses){
  const mapped = links[course][id] ?? {};
  const reused = visuals.filter(l => l.asset?.startsWith(sapPrefix));
  const resolved = resolveSapReuseAssets(course,id,visuals);
  assert.deepEqual(Object.keys(mapped).sort(),reused.map(l=>l.id).sort(),`${course} module ${id}`);
  assert.deepEqual(Object.keys(resolved).sort(),Object.keys(mapped).sort(),`${course} module ${id}`);
  for(const lesson of reused){
   const [module,sourceId] = mapped[lesson.id];
   const label = `${course}:${lesson.id}`;
   assert.deepEqual(mapped[lesson.id],expectedSource(lesson),`${label} has the wrong stable source ID`);
   const candidates = publishedModuleLessons(module).filter(l => l.id===sourceId && l.status==='qa-passed' && l.asset);
   assert.equal(candidates.length,1,label);
   const [source] = candidates;
   assert.equal(resolved[lesson.id],publishedSapImageUrl(module,source.asset));
  }
 }
});

test('one canonical asset correction propagates to all 763 linked placements without consumer edits', () => {
 const update = module => publishedModuleLessons(module).map(lesson => ({...lesson,asset:lesson.asset? `/sap-reuse-test/${lesson.id}/new-name.png` : null}));
 for (const {course,id,visuals} of courses) {
  const resolved = resolveSapReuseAssets(course,id,visuals,update);
  for (const [consumerId,[sourceModule,sourceId]] of Object.entries(links[course][id] ?? {})) {
   assert.equal(resolved[consumerId], publishedSapImageUrl(sourceModule,`/sap-reuse-test/${sourceId}/new-name.png`));
  }
 }
});

test('renaming and changing the format of an actual SAP source changes only its linked placements', () => {
 const sourceModule='10', sourceId='sap-10-001';
 const oldAsset='/course-visuals/sap-c03/module-10/slide-01-fixture.webp';
 const newAsset='/course-visuals/sap-c03/module-10/ebs-volume-availability-zone-fixture.png';
 const withAsset = asset => module => publishedModuleLessons(module).map(l=>l.id===sourceId?{...l,asset}:l);
 const touchedCourses=new Set();
 for (const {course,id,visuals} of courses) {
  const before=resolveSapReuseAssets(course,id,visuals,withAsset(oldAsset));
  const after=resolveSapReuseAssets(course,id,visuals,withAsset(newAsset));
  assert.deepEqual(Object.keys(after),Object.keys(before));
  for (const [consumerId,[module,stableId]] of Object.entries(links[course][id] ?? {})) {
   if (module===sourceModule && stableId===sourceId) {
    touchedCourses.add(course);
    assert.notEqual(after[consumerId],before[consumerId]);
    assert.equal(after[consumerId],publishedSapImageUrl(sourceModule,newAsset));
   } else assert.equal(after[consumerId],before[consumerId]);
  }
 }
 assert.deepEqual([...touchedCourses].sort(),['dva','saa']);
});

test('native replacements, removed rows, and withdrawn SAP sources retain their existing behavior', () => {
 const saa = courses.find(l=>l.course==='saa'&&l.id==='01');
 const id='sap01-02', owned='/course-visuals/saa-c03/module-01/owned-replacement.webp';
 assert.ok(resolveSapReuseAssets('saa','01',saa.visuals)[id]);
 const replaced=saa.visuals.map(lesson=>lesson.id===id?{...lesson,asset:owned}:lesson);
 assert.equal(resolveSapReuseAssets('saa','01',replaced)[id],undefined);
 assert.equal(resolveSapReuseAssets('saa','01',saa.visuals.filter(lesson=>lesson.id!==id))[id],undefined);
 const withdrawn = module => publishedModuleLessons(module).map(l=>l.id==='sap-01-002'?{...l,status:'draft'}:l);
 assert.equal(resolveSapReuseAssets('saa','01',saa.visuals,withdrawn)[id],undefined);
});

test('course pages use resolved assets in lesson cards and full screen without changing lesson metadata', () => {
 for (const [course,comp] of Object.entries({saa:'SaaVisualCourse',dva:'DvaVisualCourse',scs:'SecurityCourse'})){
  const page=text(`../app/courses/${slugs[course]}/visual/[moduleId]/page.tsx`);
  const component=text(`../app/components/${comp}.tsx`);
  assert.ok(page.includes(`sapReuse={resolveSapReuseAssets('${course}', id,`));
  if (course==='dva') {
   assert.ok(component.includes('src={sapReuse[l.id]??saaReuse[l.id]??l.asset}'));
   assert.ok(component.includes('src={sapReuse[lessons[active].id]??saaReuse[lessons[active].id]??lessons[active].asset}'));
   assert.ok(component.includes("sapReuse[l.id]?' · Reused from SAP':saaReuse[l.id]?' · Reused from SAA':''"));
  } else {
   assert.ok(component.includes('src={sapReuse[l.id]??l.asset}'));
   assert.ok(component.includes('src={sapReuse[lessons[active].id]??lessons[active].asset}'));
   assert.ok(component.includes("sapReuse[l.id]?' · Reused from SAP':''"));
  }
 }
});

test('other provisioned course maps currently contain no effective SAP references', () => {
 const courseNames=readdirSync(new URL('../app/courses',import.meta.url),{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
 for (const slug of courseNames) {
  if ([...Object.values(slugs),'aws-solutions-architect-professional'].includes(slug)) continue;
  for (const file of ['visual-plan.json','visual-lesson-map.json']) {
   try { assert.doesNotMatch(text(`../app/courses/${slug}/${file}`), /\/course-visuals\/sap-c03\//,slug); }
   catch (error) { if (error.code!=='ENOENT') throw error; }
  }
 }
});

test('production-rendered course modules expose the expected image and note for each learner placement', async () => {
 const {default: worker} = await import('../dist/server/index.js');
 for (const {course,id,visuals} of courses) {
  if (visuals.length===0) continue;
  const path = `/courses/${slugs[course]}/visual/module-${id}`;
  const response = await worker.fetch(new Request('http://localhost'+path,{headers:{accept:'text/html'}}),
   {ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},
   {waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200,path);
  const html = await response.text();
  const articles = [...html.matchAll(/<article class="saa-lesson">[\s\S]*?<\/article>/g)].map(m=>m[0]);
  assert.equal(articles.length,visuals.length,path);
  const reused = resolveSapReuseAssets(course,id,visuals);
  for(const [index,lesson] of visuals.entries()){
   const label = `${path}:${lesson.id}`;
   const card = articles[index];
   const src = /<img\b[^>]*\bsrc="([^"]+)"/.exec(card)?.[1].replaceAll('&amp;','&');
   assert.equal(src,reused[lesson.id]??lesson.asset,label);
   assert.equal(card.includes('Reused from SAP'), Boolean(reused[lesson.id]),label);
  }
 }
});
