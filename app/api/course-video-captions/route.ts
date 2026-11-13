import {NextRequest} from "next/server";

// Same-origin proxy for the published AIP/AIF WebVTT tracks. No arbitrary URL fetching.
const ROOT="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const PATH=/^\/aws-course-videos\/previews\/(aip|aif)\/module-\d{2}(?:\/part-\d{2})?\/(?:aip|aif)-module-\d{2}(?:-part-\d{2})?\.vtt$/;

export async function GET(request:NextRequest){
  const raw=request.nextUrl.searchParams.get("src");
  if(!raw)return Response.json({error:"Missing caption source"},{status:400});
  let source:URL;
  try{source=new URL(raw);}catch{return Response.json({error:"Invalid caption URL"},{status:400});}
  if(source.origin!==ROOT||!PATH.test(source.pathname)||source.username||source.password)
    return Response.json({error:"Unsupported caption source"},{status:400});
  try{
    const response=await fetch(source.toString(),{cache:"no-store",signal:AbortSignal.timeout(8000)});
    if(!response.ok)return Response.json({error:"Caption track unavailable"},{status:response.status===404?404:502});
    const content=await response.text();
    if(!content.trimStart().startsWith("WEBVTT"))return Response.json({error:"Invalid caption track"},{status:502});
    return new Response(content,{headers:{"Content-Type":"text/vtt; charset=utf-8","Cache-Control":"public, max-age=300","X-Content-Type-Options":"nosniff"}});
  }catch{return Response.json({error:"Caption fetch failed"},{status:502});}
}
