import { NextRequest } from "next/server";

// AIF has separate original visuals and media storage from the AIP course.
const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aif";
const MODULES: Record<string, { title: string; revision: string; count: number; firstTitle: string }> = {
  "00-01": { title: "Start Here — Your AI Practitioner Learning Journey",
    revision: "2026-11-13-aif-m00-p01-beginner-visual-v1",
    count: 4, firstTitle: "Your AI Practitioner learning path" },
  "02-05": { title: "AWS Console, Security Responsibilities and Safe Learning Costs",
    revision: "2026-11-13-aif-m02-p05-beginner-visual-v1",
    count: 4, firstTitle: "Finding services in the AWS Console" },
  "02-04": { title: "AWS History, Global Infrastructure and Regional Design",
    revision: "2026-11-13-aif-m02-p04-beginner-visual-v1",
    count: 8, firstTitle: "How AWS cloud services developed" },
  "02-03": { title: "Cloud Service Models, Responsibility and Pricing",
    revision: "2026-11-13-aif-m02-p03-beginner-visual-v1",
    count: 4, firstTitle: "IaaS, PaaS and SaaS" },
  "02-02": { title: "What Cloud Computing Is and Why Businesses Use It",
    revision: "2026-11-13-aif-m02-p02-beginner-visual-v1",
    count: 7, firstTitle: "What is cloud computing?" },
  "02-01": { title: "Cloud Foundations — How the Internet and Servers Work",
    revision: "2026-11-13-aif-m02-p01-beginner-visual-v1",
    count: 6, firstTitle: "How a website request reaches a server" },
  "01-01": { title: "AI Fundamentals — From Everyday Examples to Generative AI",
    revision: "2026-11-13-aif-m01-p01-beginner-visual-v1",
    count: 6, firstTitle: "What is artificial intelligence?" },
};
type Scene = {slide?: number; title?: string; start_seconds?: number; duration_seconds?: number};
type Manifest = {script_revision?: string; duration_seconds?: number; scenes?: Scene[]};
const processing = () => Response.json({status:"processing"}, {headers:{"Cache-Control":"no-store"}});
export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module") ?? "";
  const part = request.nextUrl.searchParams.get("part") ?? "01";
  const config = MODULES[`${module}-${part}`];
  if (!config) return Response.json({error:"No video lesson is mapped for this module."}, {status:404});
  const stem = `aif-module-${module}-part-${part}`;
  const prefix = `${ROOT}/module-${module}/part-${part}/${stem}`;
  const version = `?v=${encodeURIComponent(config.revision)}`;
  try {
    const result = await fetch(`${prefix}-manifest.json${version}`, {
      cache:"no-store", signal:AbortSignal.timeout(6500),
    });
    if (!result.ok) return processing();
    const manifest = await result.json() as Manifest;
    const scenes = manifest.scenes ?? [];
    if (manifest.script_revision !== config.revision ||
        scenes.length !== config.count || scenes[0]?.title !== config.firstTitle ||
        scenes.some((scene,i) => scene.slide !== i+1 ||
          !Number.isFinite(scene.start_seconds) ||
          !Number.isFinite(scene.duration_seconds))) return processing();
    const videoUrl = `${prefix}.mp4${version}`;
    let media = await fetch(videoUrl, {method:"HEAD", cache:"no-store",signal:AbortSignal.timeout(6500)});
    await media.body?.cancel();
    if (!media.ok) {
      media = await fetch(videoUrl,{method:"GET",headers:{Range:"bytes=0-0"},cache:"no-store",signal:AbortSignal.timeout(6500)});
      await media.body?.cancel();
      if (!media.ok) return processing();
    }
    return Response.json({
      status:"ready",module,part,title:config.title,videoUrl,
      captionsUrl:`${prefix}.vtt${version}`,
      transcriptUrl:`${prefix}-transcript.txt${version}`,
      durationSeconds:manifest.duration_seconds,
      chapters:scenes.map(scene=>({slide:scene.slide,title:scene.title,
        startSeconds:scene.start_seconds,durationSeconds:scene.duration_seconds}))
    },{headers:{"Cache-Control":"no-store"}});
  } catch {return processing();}
}
