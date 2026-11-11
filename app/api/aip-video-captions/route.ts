import { NextRequest } from "next/server";

const CAPTIONS_URL =
  "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aip/module-00/aip-module-00.vtt";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("module") !== "00") {
    return new Response("Not found", { status: 404 });
  }
  try {
    const result = await fetch(CAPTIONS_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(6500),
    });
    if (!result.ok) return new Response("Captions not ready", { status: 404 });
    const body = await result.text();
    if (!body.startsWith("WEBVTT")) return new Response("Invalid captions", { status: 502 });
    return new Response(body, {
      headers: {
        "Content-Type": "text/vtt; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new Response("Captions unavailable", { status: 503 });
  }
}
