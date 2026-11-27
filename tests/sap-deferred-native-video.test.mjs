import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import test from 'node:test';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const mod=s=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(s)).toString('base64');
const lib=mod(read('app/lib/sap-exact-video-releases.ts').replace('import published from "./sap-verified-video-registry.json";','const published={};'));
const {M10_NATIVE_REVISION,sapVideoProjection,sapVideoReleasePrefix,isExactSapCaptionSource,deferredSapVideoRelease}=await import(lib);
const {GET}=await import(mod(read('app/api/sap-video/route.ts').replace('"../../lib/sap-exact-video-releases"',JSON.stringify(lib))));
const req=(m,p)=>({nextUrl:new URL('https://learner.test/api/sap-video?module='+m+'&part='+p)});
const prefix=sapVideoReleasePrefix('10','12',M10_NATIVE_REVISION);
const scene=(slide,start_seconds,duration_seconds)=>({slide,title:'Lesson '+slide,start_seconds,duration_seconds});
const manifest={module:'10',part:'12',script_revision:M10_NATIVE_REVISION,media_sha256:'a'.repeat(64),
 media_bytes:10240,vtt_bytes:500,transcript_bytes:360,video_width:2048,video_height:1152,
 title:'Native storage walkthrough',duration_seconds:50,scenes:[scene(29,0,23),scene(30,23,27)]};
const nativeBytes=new Uint8Array(1024);
nativeBytes.set([0,0,0,24,102,116,121,112]);
function replies(problem){
 return async (raw,opts)=>{
  const u=new URL(raw), p=u.origin+u.pathname;
  if(p===prefix+'-manifest.json'){
   if(problem==='missing')return new Response(null,{status:404});
   return Response.json({...manifest,...(problem==='wrong chapter'?{scenes:[scene(30,0,50)]}:problem==='720p'?{video_width:1280,video_height:720}:{})});
  }
  if(p===prefix+'.mp4'&&opts.method==='HEAD')return new Response(null,{headers:{'content-type':'video/mp4','content-length':'10240',etag:'"immutable"'}});
  if(p===prefix+'.mp4')return new Response(problem==='not mp4'?new Uint8Array(1024):nativeBytes,{status:206,headers:{'content-range':'bytes 0-1023/10240',etag:'"immutable"'}});
  if(p===prefix+'.vtt')return new Response(null,{status:problem==='missing captions'?404:200,headers:{'content-type':'text/vtt','content-length':'500'}});
  if(p===prefix+'-transcript.txt')return new Response(null,{headers:{'content-type':'text/plain','content-length':'360'}});
  if(p.endsWith('-manifest.json'))return Response.json({module:'10',part:'12',script_revision:'old',duration_seconds:50,scenes:[scene(29,0,23),scene(30,23,27)]});
  return new Response(null,{status:200});
 };
}
test('native ingest is restricted to the 19 numbered Module 10 parts and exact known fixes',()=>{
 const projection=sapVideoProjection('10');
 assert.equal(projection.parts.length,19);
 assert.deepEqual(projection.parts.slice(-2),['18','19']);
 assert.equal(deferredSapVideoRelease('10','20'),undefined);
 assert.equal(deferredSapVideoRelease('09','12'),undefined);
 assert.deepEqual([deferredSapVideoRelease('10','18').start,deferredSapVideoRelease('10','18').end],[41,44]);
 assert.ok(deferredSapVideoRelease('15','06').known);
 assert.ok(deferredSapVideoRelease('21','10').known);
 assert.equal(sapVideoProjection('27').hasVideos,false);
});
test('upload alone enables a correctly versioned native clip once all four objects exist and seek works',async t=>{
 const m=t.mock.method(globalThis,'fetch',replies('none'));
 const r=await (await GET(req('10','12'))).json();
 assert.equal(r.revision,M10_NATIVE_REVISION);
 assert.deepEqual(r.chapters.map(x=>x.slide),[29,30]);
 assert.equal(r.captionsUrl,prefix+'.vtt?v='+M10_NATIVE_REVISION);
 assert.equal(isExactSapCaptionSource(new URL(r.captionsUrl)),true);
 assert.equal(isExactSapCaptionSource(new URL(r.captionsUrl.replace('part-12','part-20'))),false);
 assert.equal(isExactSapCaptionSource(new URL(r.captionsUrl.replace(M10_NATIVE_REVISION,'unapproved'))),false);
 assert.equal(m.mock.callCount(),5);
});
test('partial, low-resolution or mis-mapped upload cannot replace existing playback',async t=>{
 for(const problem of ['missing','wrong chapter','720p','missing captions','not mp4']){
  const m=t.mock.method(globalThis,'fetch',replies(problem));
  const r=await (await GET(req('10','12'))).json();
  assert.equal(r.revision,'old',problem);
  m.mock.restore();
 }
});
