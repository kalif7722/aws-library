import {reviewedM02Caption} from "../../components/reviewed-m02-captions.mjs";
import {NextRequest} from "next/server";
const ROOT="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap";
// Exact approved M10 releases only; delete this map to roll back.
const M10_RELEASES:Record<string,{release:string;revision:string}>={
  "01": {
    "release": "2026-11-19-approved-direct-v1",
    "revision": "2026-11-19-approved-direct-v1"
  },
  "02": {
    "release": "2026-11-19-approved-p02-corrected-v4",
    "revision": "2026-11-19-approved-p02-corrected-v4"
  },
  "03": {
    "release": "2026-11-19-topic-led-p03-p06-v2",
    "revision": "2026-11-19-topic-led-p03-p06-v2"
  },
  "04": {
    "release": "2026-11-19-topic-led-p03-p06-v2",
    "revision": "2026-11-19-topic-led-p03-p06-v2"
  },
  "05": {
    "release": "2026-11-19-topic-led-p03-p06-v2",
    "revision": "2026-11-19-topic-led-p03-p06-v2"
  },
  "06": {
    "release": "2026-11-19-topic-led-p03-p06-v2",
    "revision": "2026-11-19-topic-led-p03-p06-v2"
  },
  "07": {"release": "2026-11-19-topic-led-p07-p11-v1", "revision": "2026-11-19-topic-led-p07-p11-v1"},
  "08": {"release": "2026-11-19-topic-led-p07-p11-v1", "revision": "2026-11-19-topic-led-p07-p11-v1"},
  "09": {"release": "2026-11-19-topic-led-p07-p11-v1", "revision": "2026-11-19-topic-led-p07-p11-v1"},
  "10": {"release": "2026-11-19-topic-led-p07-p11-v1", "revision": "2026-11-19-topic-led-p07-p11-v1"},
  "11": {"release": "2026-11-19-topic-led-p07-p11-v1", "revision": "2026-11-19-topic-led-p07-p11-v1"}
};
const M02_RELEASES:Record<string,{release:string;revision:string}>={
  "01": {release:"2026-11-20-approved-animation-v1",revision:"2026-11-20-approved-animation-v1"},
  "02": {release:"2026-11-20-approved-animation-v1",revision:"2026-11-20-approved-animation-v1"},
  "04": {release:"2026-11-20-approved-animation-v1",revision:"2026-11-20-approved-animation-v1"},
  "07": {release:"2026-11-20-approved-animation-v1",revision:"2026-11-20-approved-animation-v1"},
};
type Scene={slide:number;title:string;start_seconds:number;duration_seconds:number};
type Manifest={module?:string;part?:string;script_revision?:string;title?:string;duration_seconds?:number;scenes?:Scene[]};
const headers={"Cache-Control":"no-store, max-age=0"};
const pending=()=>Response.json({status:"processing"},{headers});
export async function GET(request:NextRequest){
 const module=request.nextUrl.searchParams.get("module")??"";
 const part=request.nextUrl.searchParams.get("part")??"01";
 if(!/^\d{2}$/.test(module)||!/^\d{2}$/.test(part))return Response.json({error:"Invalid module or part"},{status:400,headers});
 const stem=`sap-module-${module}-part-${part}`;
 const legacyPrefix=`${ROOT}/module-${module}/part-${part}/${stem}`;
 const approved=module==="10"?M10_RELEASES[part]:module==="02"?M02_RELEASES[part]:undefined;
 const candidates=approved?[{prefix:`${ROOT}/module-${module}/releases/${approved.release}/part-${part}/${stem}`,revision:approved.revision},{prefix:legacyPrefix,revision:undefined}]:[{prefix:legacyPrefix,revision:undefined}];
 for(const {prefix,revision} of candidates){
 try{
  const res=await fetch(`${prefix}-manifest.json?check=${Date.now()}`,{cache:"no-store",signal:AbortSignal.timeout(6500)});
  if(!res.ok)continue;
  const data=await res.json() as Manifest;
  if(revision && data.script_revision!==revision)continue;
  const scenes=data.scenes??[];
  // Module 00 must not show the retired four-slide video after the cover upgrade.
  if(module==="00"&&part==="01"&&data.script_revision!=="2026-11-16-sap-m00-p01-approved-cover-five-slides-v2")continue;

  if(data.module!==module||data.part!==part||!data.script_revision||!Number.isFinite(data.duration_seconds)||(data.duration_seconds??0)<=0||!scenes.length||
   scenes.some((x,i)=>!Number.isInteger(x.slide)||!x.title||!Number.isFinite(x.start_seconds)||!Number.isFinite(x.duration_seconds)||x.duration_seconds<=0||(i>0&&x.slide!==scenes[i-1].slide+1)))continue;
  const v=`?v=${encodeURIComponent(data.script_revision)}`;
  const videoUrl=`${prefix}.mp4${v}`;
  // Some public object/CDN configurations reject HEAD while allowing video playback.
  // Fall back to a one-kilobyte ranged GET before reporting a published lecture as processing.
  let accessible=false;
  try{
   const head=await fetch(videoUrl,{method:"HEAD",cache:"no-store",signal:AbortSignal.timeout(6500)});
   accessible=head.ok;
   await head.body?.cancel();
  }catch{/* Probe the actual media path below. */}
  if(!accessible){
   try{
    const probe=await fetch(videoUrl,{method:"GET",headers:{Range:"bytes=0-1023"},cache:"no-store",signal:AbortSignal.timeout(6500)});
    accessible=probe.status===200||probe.status===206;
    await probe.body?.cancel();
   }catch{/* Video is not publicly fetchable yet. */}
  }
  if(!accessible)continue;
  const approvedTopicTitle=module==="10"&&revision==="2026-11-19-topic-led-p07-p11-v1"&&typeof data.title==="string"?data.title.trim():"";
  return Response.json({status:"ready",module,part,revision:data.script_revision,title:module==="00"&&part==="01"?"SAP-C03 Introduction — Architecture Decisions and Learning Approach":module==="01"&&part==="01"?"AWS Request Principals, Credentials and Authorization":approvedTopicTitle||scenes[0].title,
   videoUrl,captionsUrl:reviewedM02Caption(module,part,revision,videoUrl)??`${prefix}.vtt${v}`,transcriptUrl:`${prefix}-transcript.txt${v}`,
   durationSeconds:data.duration_seconds,chapters:scenes.map(s=>({slide:s.slide,title:s.title,startSeconds:s.start_seconds,durationSeconds:s.duration_seconds}))},{headers});
 }catch{/* Try legacy only when an approved candidate is unavailable. */}
 }
 return pending();
}
