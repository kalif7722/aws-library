import type {NextRequest} from "next/server";
import {COURSE_MEDIA_ORIGIN as ROOT,isExactSapCaptionSource} from "../../lib/sap-exact-video-releases";

// Same-origin proxy for AIP/AIF WebVTT tracks and exact approved SAP release tracks.
const PATH=/^\/aws-course-videos\/previews\/(aip|aif)\/module-\d{2}(?:\/part-\d{2})?\/(?:aip|aif)-module-\d{2}(?:-part-\d{2})?\.vtt$/;

export async function GET(request:NextRequest){
  const raw=request.nextUrl.searchParams.get("src");
  if(!raw)return Response.json({error:"Missing caption source"},{status:400});
  let source:URL;
  try{source=new URL(raw);}catch{return Response.json({error:"Invalid caption URL"},{status:400});}
  const exactSap=isExactSapCaptionSource(source);
  if(source.origin!==ROOT||(!PATH.test(source.pathname)&&!exactSap)||source.username||source.password)
    return Response.json({error:"Unsupported caption source"},{status:400});
  try{
    // Cloudflare Workers supports manual redirects, not Fetch redirect "error".
    // Keep SAP upstream redirects unfollowed and reject the response.
    const response=await fetch(source.toString(),{cache:"no-store",signal:AbortSignal.timeout(8000),...(exactSap?{redirect:"manual" as const}:{})});
    if(exactSap&&response.status>=300&&response.status<400){
      await response.body?.cancel();
      return Response.json({error:"Caption redirect not allowed"},{status:502});
    }
    if(!response.ok)return Response.json({error:"Caption track unavailable"},{status:response.status===404?404:502});
    const content=await response.text();
    if(!content.trimStart().startsWith("WEBVTT"))return Response.json({error:"Invalid caption track"},{status:502});
    return new Response(content,{headers:{"Content-Type":"text/vtt; charset=utf-8","Cache-Control":"public, max-age=300","X-Content-Type-Options":"nosniff"}});
  }catch{return Response.json({error:"Caption fetch failed"},{status:502});}
}
