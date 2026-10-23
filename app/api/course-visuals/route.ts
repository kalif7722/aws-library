import visualMap from "../../courses/aws-generative-ai-developer-professional/visual-lesson-map.json";

type CourseModule = {
  id: string;
  title: string;
  sourcePageStart: number;
  sourcePageEnd: number;
};

const modules = visualMap.modules as CourseModule[];
const IMAGE_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals";
const MAX_SLIDES_PER_MODULE = 300;
const PROBE_CONCURRENCY = 24;
const PROBE_TIMEOUT_MS = 4000;

async function objectExists(url: string): Promise<{ exists: boolean; failed: boolean }> {
  try {
    let response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });

    // A few object gateways may not implement HEAD consistently. Fall back
    // to a one-byte range request without downloading the full image.
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
      });
      await response.body?.cancel();
    }

    if (response.ok) return { exists: true, failed: false };
    if (response.status === 404) return { exists: false, failed: false };
    return { exists: false, failed: true };
  } catch {
    return { exists: false, failed: true };
  }
}

export async function GET(request: Request) {
  const moduleId = new URL(request.url).searchParams.get("module") ?? "";
  if (!/^\d{2}$/.test(moduleId)) {
    return Response.json({ error: "A two-digit module ID is required." }, { status: 400 });
  }

  const moduleMeta = modules.find((module) => module.id === moduleId);
  if (!moduleMeta) {
    return Response.json({ error: "Module not found." }, { status: 404 });
  }

  const expectedCount = moduleMeta.sourcePageEnd - moduleMeta.sourcePageStart + 1;
  if (expectedCount < 1 || expectedCount > MAX_SLIDES_PER_MODULE) {
    return Response.json({ error: "The module slide range is invalid." }, { status: 500 });
  }

  const availableSlides: number[] = [];
  let failedChecks = 0;
  let nextSlide = 1;

  const worker = async () => {
    while (true) {
      const slideNumber = nextSlide++;
      if (slideNumber > expectedCount) return;

      const objectUrl = IMAGE_BASE + "/module-" + moduleId + "/slide-" + String(slideNumber).padStart(2, "0") + ".webp";
      const result = await objectExists(objectUrl);
      if (result.exists) availableSlides.push(slideNumber);
      if (result.failed) failedChecks++;
    }
  };

  await Promise.all(Array.from(
    { length: Math.min(PROBE_CONCURRENCY, expectedCount) },
    () => worker(),
  ));

  availableSlides.sort((a, b) => a - b);
  return Response.json(
    {
      moduleId,
      expectedCount,
      availableSlides,
      failedChecks,
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
