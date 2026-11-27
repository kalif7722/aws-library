import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';
import { discoveryPartIds, discoveredLectures, readyRequestedPart } from '../app/components/sap-video-discovery.mjs';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const toModule=code=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(code)).toString('base64');
const lib=read('app/lib/sap-exact-video-releases.ts');
const hash=value=>createHash('sha256').update(value).digest('hex');
const revision='2026-11-27-sap-m17-test-fixture-v1';
const manifest=JSON.stringify({module:'17',part:'13',script_revision:revision,title:'Learning the service before diving into architecture',duration_seconds:30,media_sha256:hash('mp4'),scenes:[
 {slide:4,title:'Foundation and baseline',start_seconds:0,duration_seconds:12},
 {slide:4.5,title:'Embedded optional primer',start_seconds:12,duration_seconds:6},
 {slide:5,title:'Advanced decision',start_seconds:18,duration_seconds:12},
]});
const pin={manifestSha:hash(manifest),manifestBytes:Buffer.byteLength(manifest),mediaSha:hash('mp4'),mediaBytes:4096,mediaETag:'"fixture"',vttSha:hash('vtt'),transcriptSha:hash('text')};
const buildCatalog=registry=>toModule(lib.replace('import published from "./sap-verified-video-registry.json";','const published='+JSON.stringify(registry)+';'));
const catalog=buildCatalog({'17/13':{revision,pin}});
const {sapVideoProjection,pinnedSapVideoRelease,pinnedSapCacheTag,sapVideoReleasePrefix,isExactSapCaptionSource}=await import(catalog);
const route=await import(toModule(read('app/api/sap-video/route.ts').replace('"../../lib/sap-exact-video-releases"',JSON.stringify(catalog))));
const url=sapVideoReleasePrefix('17','13',revision);
const request=(m,p)=>({nextUrl:new URL('https://learner.test/api/sap-video?module='+m+'&part='+p)});
const response=opts=>new Response(null,opts);

test('projection stays exact for newly mounted modules and keeps the legacy scope',()=>{
 const scope=sapVideoProjection('17');
 assert.deepEqual(scope.parts,['13']);
 assert.equal(scope.only,true);
 assert.equal(scope.hasVideos,true);
 assert.equal(scope.modules.includes('27'),false);
 assert.equal(sapVideoProjection('26').hasVideos,false);
 assert.equal(sapVideoProjection('10').only,false);
 assert.deepEqual(discoveryPartIds('17',[],'14',scope.parts,scope.only),['13']);
 assert.equal(pinnedSapVideoRelease('27','13'),undefined);
 assert.equal(pinnedSapVideoRelease('17','14'),undefined);
 assert.equal(readyRequestedPart('13',[],{'13':{status:'processing'}}),null);
});
test('verified version is selected; noninteger primer stays in video timeline without a standalone chapter',async t=>{
 const fetch=t.mock.method(globalThis,'fetch',async (src,opts)=>{
  assert.equal(opts.redirect,'manual');
  if(src.startsWith(url+'-manifest.json'))return new Response(manifest);
  assert.equal(src,url+'.mp4'+pinnedSapCacheTag(revision,pin.mediaSha));
  assert.equal(opts.method,'HEAD');
  return response({status:200,headers:{'content-length':String(pin.mediaBytes),etag:pin.mediaETag}});
 });
 const result=await (await route.GET(request('17','13'))).json();
 assert.equal(fetch.mock.callCount(),2);
 assert.equal(result.status,'ready');
 assert.equal(result.revision,revision);
 assert.equal(result.durationSeconds,30);
 assert.deepEqual(result.chapters.map(x=>[x.slide,x.startSeconds,x.durationSeconds]),[[4,0,12],[5,18,12]]);
 assert.equal(readyRequestedPart('13',discoveredLectures([],{'13':result}),{'13':result}),'13');
 assert.equal(isExactSapCaptionSource(new URL(result.captionsUrl)),true);
 assert.equal(isExactSapCaptionSource(new URL(result.captionsUrl.replace('&sha='+pin.vttSha,''))),false);
 assert.equal(isExactSapCaptionSource(new URL(result.captionsUrl.replace(pin.vttSha,pin.transcriptSha))),false);
});
test('stale media or bad manifest leaves the existing lesson fallback',async t=>{
 for(const badManifest of [true,false]){
  const calls=[];
  const mock=t.mock.method(globalThis,'fetch',async (src,opts)=>{
   calls.push(src);
   if(src.startsWith(url+'-manifest.json'))return new Response(badManifest?manifest+' ':manifest);
   if(src.startsWith(url+'.mp4'))return response({status:200,headers:{'content-length':String(pin.mediaBytes),etag:'"wrong"'}});
   if(src.includes('module-17/part-13/')&&src.includes('-manifest.json'))return Response.json({module:'17',part:'13',script_revision:'existing-v1',duration_seconds:12,scenes:[{slide:9,title:'Legacy',start_seconds:0,duration_seconds:12}]});
   assert.equal(opts.method,'HEAD');
   return response({status:200});
  });
  const old=await (await route.GET(request('17','13'))).json();
  assert.equal(old.revision,'existing-v1');
  assert.equal(calls.filter(x=>x.startsWith(url+'.mp4')).length,badManifest?0:2);
  mock.mock.restore();
 }
});
test('checked-in records use scoped immutable keys and isolate lesson resume by revision',()=>{
 const data=JSON.parse(read('app/lib/sap-verified-video-registry.json'));
 assert.ok(Object.keys(data).length>0);
 for(const [key,value] of Object.entries(data)){
  assert.match(key,/^(0[1-9]|1[0-9]|2[0-6])\/(0[1-9]|[1-9][0-9])$/);
  assert.match(value.revision,/^[0-9a-z-]+$/);
  for(const name of ['manifestSha','mediaSha','vttSha','transcriptSha'])assert.match(value.pin[name],/^[0-9a-f]{64}$/);
 }
 const player=read('app/components/SapVideoLectures.tsx');
 assert.match(player,/if\(!entries.length\)\{[\s\S]*?id="video-lectures"/);
 assert.match(player,/\$\{active\}\$\{revisionSuffix\}-position/);
 assert.match(player,/\$\{active\}\$\{revisionSuffix\}-complete/);
});
