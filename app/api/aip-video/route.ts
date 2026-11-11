import { NextRequest } from "next/server";

const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aip";
const CONFIG: Record<string, {
  prefix: string;
  revision: string;
  firstSlide: number;
  count: number;
  firstTitle: string;
  title: string;
}> = {
  "00": {
    prefix: "module-00/aip-module-00",
    revision: "2026-11-11-visual-aligned-v2",
    firstSlide: 1,
    count: 12,
    firstTitle: "Course Opening",
    title: "Course Introduction — Visual Lecture",
  },
  "01-01": {
    prefix: "module-01/part-01/aip-module-01-part-01",
    revision: "2026-11-11-m01-p01-visual-aligned-v1",
    firstSlide: 1,
    count: 9,
    firstTitle: "Generative AI Fundamentals and Amazon Bedrock",
    title: "Foundation Models, Amazon Bedrock and API Fundamentals",
  },
  "01-02": {
    prefix: "module-01/part-02/aip-module-01-part-02",
    revision: "2026-11-11-m01-p02-visual-aligned-v1",
    firstSlide: 10,
    count: 4,
    firstTitle: "Fine-Tuning: Adapt an Existing Model",
    title: "Fine-Tuning, Continued Pre-Training and LoRA",
  },
  "01-03": {
    prefix: "module-01/part-03/aip-module-01-part-03",
    revision: "2026-11-11-m01-p03-visual-aligned-v1",
    firstSlide: 14,
    count: 11,
    firstTitle: "Retrieval-Augmented Generation",
    title: "RAG, Vector Search and Bedrock Knowledge Bases",
  },
  "01-04": {
    prefix: "module-01/part-04/aip-module-01-part-04",
    revision: "2026-11-11-m01-p04-visual-aligned-v1",
    firstSlide: 25,
    count: 10,
    firstTitle: "Pre-Retrieval: Choose the Right Chunk",
    title: "Chunking, Embeddings, Metadata and RAG Quality",
  },
  "01-05": {
    prefix: "module-01/part-05/aip-module-01-part-05",
    revision: "2026-11-11-m01-p05-visual-aligned-v1",
    firstSlide: 35,
    count: 9,
    firstTitle: "RAG Evaluation with Ground Truth",
    title: "RAG Evaluation, Multimodal AI, Guardrails and Prompt Management",
  },
  "01-06": {
    prefix: "module-01/part-06/aip-module-01-part-06",
    revision: "2026-11-11-m01-p06-50-slides-v2",
    firstSlide: 44,
    count: 7,
    firstTitle: "Amazon Bedrock Flows",
    title: "Bedrock Flows, Structured Responses and Effective Prompting",
  },
  "02-01": {
    prefix: "module-02/part-01/aip-module-02-part-01",
    revision: "2026-11-11-m02-p01-visual-aligned-v1",
    firstSlide: 1,
    count: 7,
    firstTitle: "Managing Data for Generative AI",
    title: "Structured Inputs, JSON, Unstructured Text and Conversations",
  },
  "02-02": {
    prefix: "module-02/part-02/aip-module-02-part-02",
    revision: "2026-11-11-m02-p02-visual-aligned-v1",
    firstSlide: 8,
    count: 8,
    firstTitle: "Amazon Bedrock Data Automation",
    title: "Bedrock Data Automation and Multimodal Extraction",
  },
};

type Scene = { slide?: number; title?: string; start_seconds?: number; duration_seconds?: number };
type Manifest = {
  script_revision?: string;
  scenes?: Scene[];
  duration_seconds?: number;
};

const response = (status: "ready" | "processing", details?: Record<string, unknown>) =>
  Response.json({ status, ...details }, { headers: { "Cache-Control": "no-store, max-age=0" } });

export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module") ?? "";
  const part = request.nextUrl.searchParams.get("part");
  const key = part ? `${module}-${part}` : module;
  const config = CONFIG[key];
  if (!config) {
    return Response.json({ error: "Video not published for this part." }, { status: 404 });
  }

  const url = `${ROOT}/${config.prefix}`;
  try {
    const manifestResult = await fetch(`${url}-manifest.json`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    if (!manifestResult.ok) return response("processing");

    const manifest = await manifestResult.json() as Manifest;
    const scenes = manifest.scenes ?? [];
    if (
      manifest.script_revision !== config.revision ||
      scenes.length !== config.count ||
      scenes[0]?.title !== config.firstTitle ||
      scenes.some((scene, i) =>
        scene.slide !== config.firstSlide + i ||
        !Number.isFinite(scene.start_seconds) ||
        !Number.isFinite(scene.duration_seconds))
    ) return response("processing");

    const mp4Url = `${url}.mp4`;
    const videoCheck = await fetch(mp4Url, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    await videoCheck.body?.cancel();
    if (!videoCheck.ok) {
      // R2 gateways may fail HEAD while allowing a byte-range GET.
      const rangeCheck = await fetch(mp4Url, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        cache: "no-store",
        signal: AbortSignal.timeout(6500),
      });
      await rangeCheck.body?.cancel();
      if (!rangeCheck.ok) return response("processing");
    }

    return response("ready", {
      module, part,
      title: config.title,
      revision: config.revision,
      videoUrl: mp4Url,
      captionsUrl: `/api/aip-video-captions?module=${module}${part ? `&part=${part}` : ""}`,
      transcriptUrl: `${url}-transcript.txt`,
      durationSeconds: manifest.duration_seconds,
      chapters: scenes.map((scene) => ({
        slide: scene.slide,
        title: scene.title,
        startSeconds: scene.start_seconds,
        durationSeconds: scene.duration_seconds,
      })),
    });
  } catch {
    return response("processing");
  }
}
