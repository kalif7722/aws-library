import {NextRequest} from "next/server";
const ROOT="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap";
type Scene={slide:number;title:string;start_seconds:number;duration_seconds:number};
type Manifest={module?:string;part?:string;script_revision?:string;duration_seconds?:number;scenes?:Scene[]};
const headers={"Cache-Control":"no-store, max-age=0"};
const pending=()=>Response.json({status:"processing"},{headers});
export async function GET(request:NextRequest){
 const module=request.nextUrl.searchParams.get("module")??"";
 const part=request.nextUrl.searchParams.get("part")??"01";
 if(!/^\d{2}$/.test(module)||!/^\d{2}$/.test(part))return Response.json({error:"Invalid module or part"},{status:400,headers});
 const stem=`sap-module-${module}-part-${part}`;
 const prefix=`${ROOT}/module-${module}/part-${part}/${stem}`;
 try{
  const res=await fetch(`${prefix}-manifest.json?check=${Date.now()}`,{cache:"no-store",signal:AbortSignal.timeout(6500)});
  if(!res.ok)return pending();
  const data=await res.json() as Manifest;
  const scenes=data.scenes??[];
  if(data.module!==module||data.part!==part||!data.script_revision||!Number.isFinite(data.duration_seconds)||(data.duration_seconds??0)<=0||!scenes.length||
   scenes.some((x,i)=>!Number.isInteger(x.slide)||!x.title||!Number.isFinite(x.start_seconds)||!Number.isFinite(x.duration_seconds)||x.duration_seconds<=0||(i>0&&x.slide!==scenes[i-1].slide+1)))return pending();
  const v=`?v=${encodeURIComponent(data.script_revision)}`;
  const videoUrl=`${prefix}.mp4${v}`;
  const head=await fetch(videoUrl,{method:"HEAD",cache:"no-store",signal:AbortSignal.timeout(6500)});
  await head.body?.cancel();
  if(!head.ok)return pending();
  return Response.json({status:"ready",module,part,revision:data.script_revision,title:module==="01"&&part==="01"?"AWS Request Principals, Credentials and Authorization":scenes[0].title,
   videoUrl,captionsUrl:`${prefix}.vtt${v}`,transcriptUrl:`${prefix}-transcript.txt${v}`,
   durationSeconds:data.duration_seconds,chapters:scenes.map(s=>({slide:s.slide,title:s.title,startSeconds:s.start_seconds,durationSeconds:s.duration_seconds}))},{headers});
 }catch{return pending();}
}
