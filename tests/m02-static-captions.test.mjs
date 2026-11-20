import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {stripTypeScriptTypes} from 'node:module';
import {reviewedM02Caption,courseCaptionRequestUrl} from '../app/components/reviewed-m02-captions.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const inventory=JSON.parse(read('docs/video-review/sap/m02-approved-20261120/inventory.json'));
const rev=inventory.revision;
const root='https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/';
const video=r=>root+r.items.find(x=>x.key.endsWith('.mp4')).key+'?v='+rev;
const load=async source=>import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
const component=read('app/components/CourseVideoCaptions.tsx');
const parser=await load(component.slice(component.indexOf('type Cue='),component.indexOf('/** Synchronized')));
const routeText=read('app/api/sap-video/route.ts');
const route=await load(routeText.replace('import {NextRequest} from "next/server";','').replace('"../../components/reviewed-m02-captions.mjs"',JSON.stringify(new URL('../app/components/reviewed-m02-captions.mjs',import.meta.url).href)));
const proxy=await load(read('app/api/course-video-captions/route.ts').replace('import {NextRequest} from "next/server";',''));
const request=(module,part)=>({nextUrl:new URL(`https://lesson.test/api/sap-video?module=${module}&part=${part}`)});

test('all 165 exact approved cues pass hash, duration, ordering and player parser checks',()=>{
 let total=0;
 for(const r of inventory.records){
  const path=reviewedM02Caption('02',r.part,rev,video(r));assert.ok(path);
  const bytes=readFileSync(new URL('../public'+path,import.meta.url));
  const expected=r.items.find(x=>x.key.endsWith('.vtt'));
  assert.equal(bytes.length,expected.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),expected.sha256);
  const cues=parser.parseCourseVideoVtt(bytes.toString());assert.equal(cues.length,r.caption_count);total+=cues.length;
  for(let i=0;i<cues.length;i++){const c=cues[i];assert.ok(c.start>=0&&c.end<=r.duration_seconds+.05&&c.text);if(i)assert.ok(c.start>=cues[i-1].end);const active=cues.find(x=>(c.start+c.end)/2>=x.start&&(c.start+c.end)/2<x.end);assert.equal(active,c);}
  assert.equal(courseCaptionRequestUrl(path),path);
 }
 assert.equal(total,165);
});
test('only exact part/revision/video combinations select static captions',()=>{
 for(const r of inventory.records){
  for(const args of [['10',r.part,rev,video(r)],['02',r.part,undefined,video(r)],['02',r.part,'legacy',video(r)],['02','03',rev,video(r)],['02',r.part,rev,video(r).replace('/releases/'+rev,'')],['02',r.part,rev,video(r)+'&extra=1']])assert.equal(reviewedM02Caption(...args),null);
 }
 for(const src of ['https://evil.test/a.vtt','//evil.test/a.vtt','/course-captions/../secret','/course-captions/sap/module-02/'+rev+'/part-01.vtt?extra=1'])assert.equal(courseCaptionRequestUrl(src),'/api/course-video-captions?src='+encodeURIComponent(src));
});
test('real SAP resolver selects matching static tracks; fallback never inherits them',async()=>{
 const original=globalThis.fetch;
 try{for(const r of inventory.records){for(const fallback of [false,true]){
 globalThis.fetch=async(url,options)=>{if(String(url).includes('-manifest.json')){if(fallback&&String(url).includes('/releases/'))return new Response('',{status:404});return Response.json({module:'02',part:r.part,script_revision:rev,duration_seconds:r.duration_seconds,scenes:[{slide:r.slides[0],title:'Lesson',start_seconds:0,duration_seconds:r.duration_seconds}]});}assert.equal(options.method,'HEAD');return new Response(null,{status:200});};
 const data=await(await route.GET(request('02',r.part))).json();assert.equal(data.status,'ready');
 if(fallback){assert.ok(!data.videoUrl.includes('/releases/'));assert.ok(data.captionsUrl.startsWith(root));}else assert.equal(data.captionsUrl,reviewedM02Caption('02',r.part,rev,data.videoUrl));
 }} }finally{globalThis.fetch=original;}
});
test('AIP/AIF existing proxy behavior and destination rejection remain intact',async()=>{
 const original=globalThis.fetch;let calls=0;
 try{globalThis.fetch=async()=>{calls++;return new Response('WEBVTT\n\n00:00.000 --> 00:01.000\nOriginal captions\n');};
 for(const course of ['aip','aif']){const src=root+`aws-course-videos/previews/${course}/module-02/${course}-module-02.vtt?v=existing`;assert.equal(courseCaptionRequestUrl(src),'/api/course-video-captions?src='+encodeURIComponent(src));const res=await proxy.GET({nextUrl:new URL('https://lesson.test/api/course-video-captions?src='+encodeURIComponent(src))});assert.equal(res.status,200);}
 assert.equal(calls,2);
 for(const src of ['https://evil.test/a.vtt',root+'aws-course-videos/previews/sap/module-02/part-01/sap-module-02-part-01.vtt','/course-captions/unrecognized.vtt']){const res=await proxy.GET({nextUrl:new URL('https://lesson.test/api/course-video-captions?src='+encodeURIComponent(src))});assert.equal(res.status,400);}assert.equal(calls,2);
 }finally{globalThis.fetch=original;}
});
test('shared overlay and native SAP track consume the resolver-selected caption source',()=>{
 assert.ok(component.includes('fetch(courseCaptionRequestUrl(src),{signal:controller.signal})'));
 assert.ok(component.includes('return()=>controller.abort()'));
 assert.ok(component.includes('if(!enabled)return null'));
 const player=read('app/components/SapVideoLectures.tsx');assert.ok(player.includes('<track src={ready.captionsUrl}'));assert.ok(player.includes('<CourseVideoCaptions src={ready.captionsUrl}'));
});
