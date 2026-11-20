// One reviewed release only. Provenance: staging commit 9518b083a7d0d5c4239973adc78fef34b5035eaa.
// Do not derive destinations from request input or follow redirects.
const record=Object.freeze({
  url:"https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap/module-10/releases/2026-11-19-approved-direct-v1/part-01/sap-module-10-part-01.vtt?v=2026-11-19-approved-direct-v1",
  bytes:4651,
  sha256:"3f6ec4842a5d9eec7cac95e38b92c160d20eb0c7e60c80df6bbbf06545088947",
  duration:306.291667
});
export function reviewedSapCaption(raw){return raw===record.url?record:null;}
const failure=()=>Response.json({error:"Reviewed caption track unavailable"},{status:502,headers:{"Cache-Control":"no-store"}});
export async function servePinnedCaption(entry,fetcher=fetch){
  try{
    const response=await fetcher(entry.url,{cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000)});
    if(!response.ok)return failure();
    const declared=response.headers.get("content-length");
    if(declared!==null&&Number(declared)!==entry.bytes){await response.body?.cancel();return failure();}
    if(!response.body)return failure();
    const reader=response.body.getReader();const chunks=[];let size=0;
    for(;;){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>entry.bytes){await reader.cancel();return failure();}chunks.push(value);}
    if(size!==entry.bytes)return failure();
    const data=new Uint8Array(size);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.length;}
    const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",data)),b=>b.toString(16).padStart(2,"0")).join("");
    if(hash!==entry.sha256)return failure();
    const text=new TextDecoder("utf-8",{fatal:true}).decode(data);
    if(!text.startsWith("WEBVTT\n")&&!text.startsWith("WEBVTT\r\n"))return failure();
    const times=[...text.matchAll(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})[^\r\n]*\r?\n([^\r\n]+)/gm)];
    if(!times.length||times.length!==(text.match(/-->/g)||[]).length)return failure();
    let lastEnd=0;
    for(const t of times){
      const start=Number(t[1])*3600+Number(t[2])*60+Number(t[3])+Number(t[4])/1000;
      const end=Number(t[5])*3600+Number(t[6])*60+Number(t[7])+Number(t[8])/1000;
      if([t[2],t[3],t[6],t[7]].some(v=>Number(v)>=60)||start<lastEnd||end<=start||end>entry.duration+0.05||!t[9].trim())return failure();
      lastEnd=end;
    }
    return new Response(data,{headers:{"Content-Type":"text/vtt; charset=utf-8","Cache-Control":"public, max-age=300","X-Content-Type-Options":"nosniff"}});
  }catch{return failure();}
}
