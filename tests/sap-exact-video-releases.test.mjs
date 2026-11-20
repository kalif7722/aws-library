import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {stripTypeScriptTypes} from "node:module";
import {join} from "node:path";
import test from "node:test";

const getSource=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const asModule=source=>"data:text/javascript;base64,"+Buffer.from(stripTypeScriptTypes(source)).toString("base64");
const catalog=asModule(getSource("app/lib/sap-exact-video-releases.ts"));
const loadRoute=name=>import(asModule(getSource(`app/api/${name}/route.ts`).replace('"../../lib/sap-exact-video-releases"',JSON.stringify(catalog))));
const [{GET:video},{GET:captions}]=await Promise.all([loadRoute("sap-video"),loadRoute("course-video-captions")]);
const origin="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const root=origin+"/aws-course-videos/previews/sap";
const rows=[
  ["02","05","2026-11-20-m02p05-fresh-animation-v1",17,22,440.7916666666667],
  ["03","01","2026-11-20-m03p01-approved-animation-v1",1,3,165.75],
  ["03","04","2026-11-20-m03p04-approved-animation-v1",9,11,172.5],
  ["03","06","2026-11-20-m03p06-approved-animation-v1",15,17,196.04166666666669],
];
const fixtureDir=process.env.SAP_RELEASE_FIXTURE_DIR;
const vttFixture=s=>fixtureDir?readFileSync(join(fixtureDir,`${s}.vtt`),"utf8"):"WEBVTT\n\n00:00:00.000 --> 00:00:03.000\nSpoken cue\n";
const manifestFixture=([module,part,script_revision,first,last,duration_seconds])=>fixtureDir
  ?JSON.parse(readFileSync(join(fixtureDir,`sap-module-${module}-part-${part}-manifest.json`),"utf8"))
  :{module,part,script_revision,duration_seconds,scenes:Array.from({length:last-first+1},(_,i)=>({slide:first+i,title:`Slide ${first+i}`,start_seconds:i*duration_seconds/(last-first+1),duration_seconds:duration_seconds/(last-first+1)}))};
const request=(route,p)=>({nextUrl:new URL(`https://learner.test/api/${route}?${new URLSearchParams(p)}`)});
const prefix=([m,p,r])=>`${root}/module-${m}/releases/${r}/part-${p}/sap-module-${m}-part-${p}`;
const legacy=([m,p])=>`${root}/module-${m}/part-${p}/sap-module-${m}-part-${p}`;

test("exact immutable SAP revisions resolve with independently checked metadata and caption URLs",async t=>{
  for(const row of rows){
    const [module,part,revision,first,last,duration]=row;
    const p=prefix(row);
    const fetch=t.mock.method(globalThis,"fetch",async (raw,init)=>{
      const url=new URL(raw);
      if(url.pathname.endsWith("-manifest.json")) {
        assert.equal(url.href.split("?")[0],p+"-manifest.json");
        return Response.json(manifestFixture(row));
      }
      assert.equal(raw,`${p}.mp4?v=${revision}`);
      assert.equal(init.method,"HEAD");
      return new Response(null,{status:200});
    });
    const r=await video(request("sap-video",{module,part}));
    const result=await r.json();
    assert.equal(fetch.mock.callCount(),2);
    fetch.mock.restore();
    assert.equal(result.status,"ready");
    assert.equal(result.revision,revision);
    assert.equal(result.videoUrl,`${p}.mp4?v=${revision}`);
    assert.equal(result.captionsUrl,`${p}.vtt?v=${revision}`);
    assert.equal(result.durationSeconds,duration);
    assert.deepEqual(result.chapters.map(s=>s.slide),Array.from({length:last-first+1},(_,i)=>first+i));
  }
});

test("an incorrect staged revision falls back to legacy without reading staged media",async t=>{
  const row=rows[0], [module,part]=row;
  const fetch=t.mock.method(globalThis,"fetch",async (raw,init)=>{
    if(raw.startsWith(prefix(row)+"-manifest.json")) return Response.json({...manifestFixture(row),script_revision:"unexpected"});
    if(raw.startsWith(legacy(row)+"-manifest.json")) return Response.json({...manifestFixture(row),script_revision:"legacy-v1"});
    assert.equal(raw,legacy(row)+".mp4?v=legacy-v1"); assert.equal(init.method,"HEAD");
    return new Response(null,{status:200});
  });
  const result=await (await video(request("sap-video",{module,part}))).json();
  assert.equal(fetch.mock.callCount(),3);
  assert.equal(result.revision,"legacy-v1");
  assert.equal(result.videoUrl,legacy(row)+".mp4?v=legacy-v1");
});

test("unavailable staged and legacy manifests leave the lecture processing",async t=>{
  const [module,part]=rows[0];
  const mock=t.mock.method(globalThis,"fetch",async ()=>new Response(null,{status:404}));
  assert.deepEqual(await (await video(request("sap-video",{module,part}))).json(),{status:"processing"});
  assert.equal(mock.mock.callCount(),2);
});

test("M02 Part 06 keeps its prior single legacy route; M02 P01 and M10 P01 retain registered release prefixes",async t=>{
  const calls=[];
  t.mock.method(globalThis,"fetch",async raw=>{calls.push(raw);return new Response(null,{status:404});});
  for(const [module,part] of [["02","06"],["02","01"],["10","01"]])await video(request("sap-video",{module,part}));
  assert.equal(calls.length,5);
  assert.match(calls[0],/\/module-02\/part-06\/sap-module-02-part-06-manifest\.json/);
  assert.match(calls[1],/\/module-02\/releases\/2026-11-20-approved-animation-v1\/part-01\//);
  assert.match(calls[3],/\/module-10\/releases\/2026-11-19-approved-direct-v1\/part-01\//);
});

test("exact SAP tracks pass the proxy, with redirects disallowed and VTT returned",async t=>{
  for(const row of rows){
    const [module,part,revision]=row;
    const src=prefix(row)+".vtt?v="+revision;
    const vtt=vttFixture(`sap-module-${module}-part-${part}`);
    const fetch=t.mock.method(globalThis,"fetch",async (raw,init)=>{
      assert.equal(raw,src);assert.equal(init.redirect,"error");
      return new Response(vtt);
    });
    const response=await captions(request("course-video-captions",{src}));
    assert.equal(fetch.mock.callCount(),1);
    fetch.mock.restore();
    assert.equal(response.status,200);
    assert.equal(response.headers.get("content-type"),"text/vtt; charset=utf-8");
    assert.match(vtt,/-->[^\r\n]+[\r\n]+\S/);
    assert.equal(await response.text(),vtt);
  }
});

test("invalid SAP caption variations are not fetched",async t=>{
  const p=prefix(rows[0]), revision=rows[0][2];
  const src=p+".vtt?v="+revision;
  const fetch=t.mock.method(globalThis,"fetch",async ()=>assert.fail("invalid source reached fetch"));
  for(const bad of [p+".vtt",p+".vtt?v=old",p+".mp4?v="+revision,
    src.replace("part-05/","part-06/"),src.replace("module-02/","module-03/"),
    src.replace(revision,"other-release"),src.replace("https://","http://"),
    src.replace("https://","https://user:password@"),src.replace(".r2.dev",".r2.dev.example"),
    src+"&other=x",src+"#fragment",legacy(rows[0])+".vtt?v="+revision]){
    assert.equal((await captions(request("course-video-captions",{src:bad}))).status,400,bad);
  }
  assert.equal(fetch.mock.callCount(),0);
});

test("caption route keeps prior AIP/AIF support, rejects invalid payload and handles upstream redirect error",async t=>{
  const fetch=t.mock.method(globalThis,"fetch",async (raw,init)=>{
    if(raw.includes("/sap/")){
      assert.equal(init.redirect,"error");
      throw new TypeError("redirect not allowed");
    }
    assert.equal(init.redirect,undefined);
    return new Response(raw.includes("/aif/")?"Not WebVTT":"WEBVTT\n\n");
  });
  const call=src=>captions(request("course-video-captions",{src}));
  assert.equal((await call(origin+"/aws-course-videos/previews/aip/module-01/aip-module-01.vtt")).status,200);
  assert.equal((await call(origin+"/aws-course-videos/previews/aif/module-01/part-02/aif-module-01-part-02.vtt")).status,502);
  assert.equal((await call(prefix(rows[0])+".vtt?v="+rows[0][2])).status,502);
  assert.equal(fetch.mock.callCount(),3);
});
