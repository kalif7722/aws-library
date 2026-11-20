import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {reviewedSapCaption,servePinnedCaption} from '../app/api/course-video-captions/reviewed-sap-captions.mjs';
const url='https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap/module-10/releases/2026-11-19-approved-direct-v1/part-01/sap-module-10-part-01.vtt?v=2026-11-19-approved-direct-v1';
const fixture='WEBVTT\n\n1\n00:00:00.000 --> 00:00:01.000\nFixture caption.\n';
const entryFor=text=>({url,bytes:Buffer.byteLength(text),sha256:createHash('sha256').update(text).digest('hex'),duration:2});
test('only the exact reviewed key resolves; destination tricks and other releases fail closed',()=>{
 assert.equal(reviewedSapCaption(url).bytes,4651);
 for(const input of [undefined,null,'',url.split('?')[0],url+'&redirect=https://example.com',url+'#x',url.replace('module-10','module-02'),url.replace('part-01','part-02'),url.replace('https:','http:'),url.replace('pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev','example.com'),url.replace('https://','https://user:pass@'),'/api/sap-video?module=10&part=01','file:///etc/passwd','http://127.0.0.1',url.replace('/part-01/','/%70art-01/')])assert.equal(reviewedSapCaption(input),null,String(input));
});
test('valid pinned VTT is served with exact bytes and redirect refusal',async()=>{
 let calls=0;
 const response=await servePinnedCaption(entryFor(fixture),async(dest,options)=>{calls++;assert.equal(dest,url);assert.equal(options.redirect,'error');assert.equal(options.cache,'no-store');return new Response(fixture);});
 assert.equal(calls,1);assert.equal(response.status,200);assert.equal(await response.text(),fixture);assert.equal(response.headers.get('content-type'),'text/vtt; charset=utf-8');
});
test('a known production key cannot serve fixture or tampered bytes',async()=>{
 assert.equal((await servePinnedCaption(reviewedSapCaption(url),async()=>new Response(fixture))).status,502);
 assert.equal((await servePinnedCaption({...entryFor(fixture),sha256:'0'.repeat(64)},async()=>new Response(fixture))).status,502);
});
test('upstream denial, redirect, failure and invalid size are never served',async()=>{
 for(const response of [new Response('',{status:403}),new Response('',{status:302,headers:{location:'https://example.com'}}),new Response(fixture,{headers:{'content-length':'99999'}}),new Response(fixture+'x'),new Response('short')]){
  assert.equal((await servePinnedCaption(entryFor(fixture),async()=>response)).status,502);
 }
 assert.equal((await servePinnedCaption(entryFor(fixture),async()=>{throw Error('network');})).status,502);
});
test('hash-valid malformed, empty, overlapping, reversed and out-of-range VTT is rejected',async()=>{
 for(const text of ['not vtt','WEBVTT\n\n',fixture.replace('00:00:01.000','00:00:03.000'),fixture.replace('00:00:01.000','00:00:00.000'),fixture+fixture.split('WEBVTT\n\n')[1],fixture.replace('00:00:01.000','00:60:01.000')]){
  assert.equal((await servePinnedCaption(entryFor(text),async()=>new Response(text))).status,502);
 }
});
test('route integrates pinned lookup while preserving the legacy host/path boundary',()=>{
 const route=readFileSync(new URL('../app/api/course-video-captions/route.ts',import.meta.url),'utf8');
 assert.match(route,/const reviewed=reviewedSapCaption\(raw\)/);
 assert.match(route,/if\(reviewed\)return servePinnedCaption\(reviewed\)/);
 assert.match(route,/source.origin!==ROOT/);
 assert.ok(route.includes('(aip|aif)'));
 assert.ok(!route.includes('(aip|aif|sap)'));
});
