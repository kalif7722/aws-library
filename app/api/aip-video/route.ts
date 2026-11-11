import { NextRequest } from "next/server";

const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aip";
const REVISION = "2026-11-11-visual-aligned-v2";
const PREFIX = "module-00/aip-module-00";

type Scene = { slide?: number; title?: string; start_seconds?: number; duration_seconds?: number };
type Manifest = {
  script_revision?: string;
  scenes?: Scene[];
  duration_seconds?: number;
  status?: string;
};

const response = (status: "ready" | "processing", details?: Record<string, unknown>) =>
  Response.json({ status, ...details }, { headers: { "Cache-Control": "no-store, max-age=0" } });

export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module");
  if (module !== "00") {
    return Response.json({ error: "Video not published for this module." }, { status: 404 });
  }

  const url = `${ROOT}/${PREFIX}`;
  try {
    const manifestResult = await fetch(`${url}-manifest.json`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    if (!manifestResult.ok) return response("processing");

    const manifest = await manifestResult.json() as Manifest;
    const scenes = manifest.scenes ?? [];
    if (
      manifest.script_revision !== REVISION ||
      scenes.length !== 12 ||
      scenes.some((scene, i) => scene.slide !== i + 1 ||
        !Number.isFinite(scene.start_seconds) || !Number.isFinite(scene.duration_seconds)) ||
      scenes[2]?.title !== "The Developer’s Role"
    ) return response("processing");

    const mp4Url = `${url}.mp4`;
    // Do not advertise an MP4 that is missing even if the manifest exists.
    const videoCheck = await fetch(mp4Url, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    await videoCheck.body?.cancel();
    if (!videoCheck.ok) {
      // R2 gateways may deny HEAD while serving the same object via GET.
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
      module: "00",
      title: "Course Introduction — Visual Lecture",
      revision: REVISION,
      videoUrl: mp4Url,
      captionsUrl: "/api/aip-video-captions?module=00",
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
