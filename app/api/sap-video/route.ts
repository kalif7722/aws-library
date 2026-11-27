import type {NextRequest} from "next/server";
import {exactSapVideoRelease,sapVideoReleasePrefix,sapDirectPrefix,scopedDirectSapPart,directSapPin,directSapCacheTag,DIRECT_SAP_REVISION,type DirectSapPin,pinnedSapVideoRelease,pinnedSapCacheTag,deferredSapVideoRelease,deferredSapCaptionTag,type DeferredSapRelease} from "../../lib/sap-exact-video-releases";
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
type Manifest={media_bytes?:number;video_width?:number;video_height?:number;vtt_bytes?:number;transcript_bytes?:number;media_sha256?:string;poster_asset?:string;module?:string;part?:string;script_revision?:string;title?:string;duration_seconds?:number;scenes?:Scene[]};
const headers={"Cache-Control":"no-store, max-age=0"};
const pending=()=>Response.json({status:"processing"},{headers});
const APPROVED_M00_LEGACY="2026-11-16-sap-m00-p01-approved-cover-five-slides-v2";
async function matchesDirectManifest(input:Response,pin:Pick<DirectSapPin,"manifestSha"|"manifestBytes">):Promise<Manifest|null>{
 const length=input.headers.get("content-length");
 if(length!==null&&length!==String(pin.manifestBytes))return null;
 if(!input.body)return null;
 const reader=input.body.getReader(),bytes=new Uint8Array(pin.manifestBytes);
 let offset=0;
 try{
  for(;;){
   const {done,value}=await reader.read();
   if(done)break;
   if(offset+value.byteLength>bytes.byteLength){await reader.cancel();return null;}
   bytes.set(value,offset);offset+=value.byteLength;
  }
 }finally{reader.releaseLock();}
 if(offset!==bytes.byteLength)return null;
 const digest=new Uint8Array(await crypto.subtle.digest("SHA-256",bytes));
 if(Array.from(digest,x=>x.toString(16).padStart(2,"0")).join("")!==pin.manifestSha)return null;
 return JSON.parse(new TextDecoder().decode(bytes)) as Manifest;
}
function matchesDirectMedia(r:Response,pin:DirectSapPin):boolean{
 const etag=r.headers.get("etag");
 // Honor supplied validators strictly. A canonical public response can omit ETag;
 // accept that case only with correct MIME and full object length/range below.
 if(etag!==null&&etag!==pin.mediaETag)return false;
 if(etag===null&&r.headers.get("content-type")?.split(";")[0].trim().toLowerCase()!=="video/mp4")return false;
 if(r.status===200)return r.headers.get("content-length")===String(pin.mediaBytes);
 if(r.status!==206)return false;
 const end=Math.min(1023,pin.mediaBytes-1);
 return r.headers.get("content-range")===`bytes 0-${end}/${pin.mediaBytes}`;
}
function validAssetBytes(bytes:unknown,ceiling:number):bytes is number{
 return typeof bytes==="number"&&Number.isSafeInteger(bytes)&&bytes>0&&bytes<=ceiling;
}
async function deferredAssetsReady(prefix:string,url:string,entry:DeferredSapRelease,data:Manifest){
 const mediaBytes=entry.known?.mediaBytes??data.media_bytes;
 const vttBytes=entry.vttBytes??data.vtt_bytes;
 const transcriptBytes=entry.transcriptBytes??data.transcript_bytes;
 if(!validAssetBytes(mediaBytes,300*1024*1024)||mediaBytes<1024||!validAssetBytes(vttBytes,2*1024*1024)||!validAssetBytes(transcriptBytes,2*1024*1024))return false;
 if(!entry.known&&(data.video_width!==2048||data.video_height!==1152))return false;
 if(!/^[0-9a-f]{64}$/.test(data.media_sha256??"")||entry.known&&data.media_sha256!==entry.known.mediaSha)return false;
 const noRedirect={cache:"no-store",redirect:"error",signal:AbortSignal.timeout(5500)} as const;
 const v=`?v=${encodeURIComponent(entry.revision)}`;
 const t=entry.known?pinnedSapCacheTag(entry.revision,entry.known.transcriptSha):v;
 const [head, captions, transcript]=await Promise.all([
  fetch(url,{...noRedirect,method:"HEAD"}),
  fetch(`${prefix}.vtt${deferredSapCaptionTag(entry)}`,{...noRedirect,method:"HEAD"}),
  fetch(`${prefix}-transcript.txt${t}`,{...noRedirect,method:"HEAD"})
 ]);
 const typeOK=(r:Response,mimes:string[])=>mimes.includes((r.headers.get("content-type")??"").split(";")[0].trim().toLowerCase());
 const sameSize=(r:Response,size:number)=>r.status===200&&r.headers.get("content-length")===String(size);
 const tag=head.headers.get("etag");
 if(!tag||!sameSize(head,mediaBytes)||!typeOK(head,["video/mp4"])||
   !sameSize(captions,vttBytes)||!typeOK(captions,["text/vtt","text/plain","application/octet-stream"])||
   !sameSize(transcript,transcriptBytes)||!typeOK(transcript,["text/plain","application/octet-stream"]))return false;
 const range=await fetch(url,{...noRedirect,headers:{Range:"bytes=0-1023"}});
 if(range.status!==206||range.headers.get("content-range")!==`bytes 0-1023/${mediaBytes}`||range.headers.get("etag")!==tag){
  await range.body?.cancel();return false;
 }
 const sample=new Uint8Array(await range.arrayBuffer());
 if(sample.length!==1024)return false;
 // Media uploaded for these slots is an ordinary MP4, not an HTML error body.
 return new TextDecoder().decode(sample.subarray(4,8))==="ftyp";
}
export async function GET(request:NextRequest){
 const module=request.nextUrl.searchParams.get("module")??"";
 const part=request.nextUrl.searchParams.get("part")??"01";
 if(!/^\d{2}$/.test(module)||!/^\d{2}$/.test(part))return Response.json({error:"Invalid module or part"},{status:400,headers});
 const legacyPrefix=sapDirectPrefix(module,part);
 const direct=directSapPin(module,part);
 const approved=exactSapVideoRelease(module,part)??(module==="10"?M10_RELEASES[part]:module==="02"?M02_RELEASES[part]:undefined);
 const fresh=pinnedSapVideoRelease(module,part);
 const awaited=deferredSapVideoRelease(module,part);
 const candidates=[
  ...(fresh?[{prefix:sapVideoReleasePrefix(module,part,fresh.revision),revision:fresh.revision,pin:fresh.pin,fresh:true}]:[]),
  ...(!fresh&&awaited?[{prefix:sapVideoReleasePrefix(module,part,awaited.revision),revision:awaited.revision,pin:undefined,awaited}]:[]),
  ...(direct?[{prefix:legacyPrefix,revision:DIRECT_SAP_REVISION,pin:direct}]:[]),
  ...(approved?[{prefix:sapVideoReleasePrefix(module,part,approved.release),revision:approved.revision,pin:undefined}]:[]),
  ...(!direct||module==="00"&&part==="01"?[{prefix:legacyPrefix,revision:undefined,pin:undefined}]:[])
 ];
 for(const candidate of candidates){
 const {prefix,revision,pin}=candidate;
 const awaited="awaited" in candidate?candidate.awaited:undefined;
 const isFresh="fresh" in candidate||Boolean(awaited);
 const cacheTag=(hash:string)=>isFresh&&revision?pinnedSapCacheTag(revision,hash):directSapCacheTag(hash);
 try{
  const manifestQuery=pin?`${cacheTag(pin.manifestSha)}&check=${Date.now()}`:`?check=${Date.now()}`;
  const res=await fetch(`${prefix}-manifest.json${manifestQuery}`,{cache:"no-store",signal:AbortSignal.timeout(6500),...(pin||awaited?{redirect:"manual" as const}:{})});
  if(!res.ok)continue;
  const manifestPin=pin??awaited?.known;
  const data=manifestPin?await matchesDirectManifest(res,manifestPin):await res.json() as Manifest;
  if(!data)continue;
  if(!pin&&prefix===legacyPrefix&&scopedDirectSapPart(module,part)&&data.script_revision===DIRECT_SAP_REVISION)continue;
  if(revision && data.script_revision!==revision)continue;
  const allScenes=data.scenes??[];
  const scenes=isFresh?allScenes.filter(s=>Number.isInteger(s.slide)&&s.slide>0):allScenes;
  // Module 00 must not show the retired four-slide video after the cover upgrade.
  if(module==="00"&&part==="01"&&(scenes.length!==5||scenes[0]?.slide!==1||
   !pin&&data.script_revision!==APPROVED_M00_LEGACY))continue;

  if(data.module!==module||data.part!==part||!data.script_revision||!Number.isFinite(data.duration_seconds)||(data.duration_seconds??0)<=0||!scenes.length||
   scenes.some((x,i)=>!Number.isInteger(x.slide)||!x.title||!Number.isFinite(x.start_seconds)||!Number.isFinite(x.duration_seconds)||x.duration_seconds<=0||(i>0&&x.slide!==scenes[i-1].slide+1)))continue;
  if(isFresh&&allScenes.some((s,i)=>!Number.isFinite(s.slide)||s.slide<=0||!s.title||!Number.isFinite(s.start_seconds)||!Number.isFinite(s.duration_seconds)||s.duration_seconds<=0||s.start_seconds<0||s.start_seconds+s.duration_seconds>(data.duration_seconds??0)+0.001||i>0&&s.start_seconds<allScenes[i-1].start_seconds+allScenes[i-1].duration_seconds-0.001))continue;
  if(pin&&(data.media_sha256!==pin.mediaSha||(pin.posterUrl&&data.poster_asset!==pin.posterUrl)||
   scenes.some((s,i)=>s.start_seconds<0||s.start_seconds+s.duration_seconds>(data.duration_seconds??0)+0.001||
    i>0&&s.start_seconds<scenes[i-1].start_seconds+scenes[i-1].duration_seconds-0.001)))continue;
  const v=`?v=${encodeURIComponent(data.script_revision)}`;
  if(awaited&&(scenes[0].slide!==awaited.start||scenes[scenes.length-1].slide!==awaited.end))continue;
  const videoUrl=`${prefix}.mp4${pin?cacheTag(pin.mediaSha):awaited?.known?cacheTag(awaited.known.mediaSha):v}`;
  // Some public object/CDN configurations reject HEAD while allowing video playback.
  // Fall back to a one-kilobyte ranged GET before reporting a published lecture as processing.
  let accessible=awaited?await deferredAssetsReady(prefix,videoUrl,awaited,data):false;
  if(!awaited)try{
   const head=await fetch(videoUrl,{method:"HEAD",cache:"no-store",signal:AbortSignal.timeout(6500),...(pin||awaited?{redirect:"manual" as const}:{})});
   accessible=pin?head.status===200&&matchesDirectMedia(head,pin):head.ok;
   await head.body?.cancel();
  }catch{/* Probe the actual media path below. */}
  if(!accessible&&!awaited){
   try{
    const probe=await fetch(videoUrl,{method:"GET",headers:{Range:"bytes=0-1023"},cache:"no-store",signal:AbortSignal.timeout(6500),...(pin||awaited?{redirect:"manual" as const}:{})});
    accessible=pin?matchesDirectMedia(probe,pin):(probe.status===200||probe.status===206);
    await probe.body?.cancel();
   }catch{/* Video is not publicly fetchable yet. */}
  }
  if(!accessible)continue;
  const approvedTopicTitle=module==="10"&&revision==="2026-11-19-topic-led-p07-p11-v1"&&typeof data.title==="string"?data.title.trim():"";
  return Response.json({status:"ready",module,part,revision:data.script_revision,title:isFresh&&data.title?.trim()?data.title.trim():module==="00"&&part==="01"?"SAP-C03 Introduction — Architecture Decisions and Learning Approach":module==="01"&&part==="01"?"AWS Request Principals, Credentials and Authorization":approvedTopicTitle||scenes[0].title,
   ...(pin?.posterUrl?{posterUrl:pin.posterUrl}:{}),
   videoUrl,captionsUrl:`${prefix}.vtt${pin?cacheTag(pin.vttSha):awaited?deferredSapCaptionTag(awaited):v}`,transcriptUrl:`${prefix}-transcript.txt${pin?cacheTag(pin.transcriptSha):awaited?.known?cacheTag(awaited.known.transcriptSha):v}`,
   durationSeconds:data.duration_seconds,chapters:scenes.map(s=>({slide:s.slide,title:s.title,startSeconds:s.start_seconds,durationSeconds:s.duration_seconds}))},{headers});
 }catch{/* Try legacy only when an approved candidate is unavailable. */}
 }
 return pending();
}
