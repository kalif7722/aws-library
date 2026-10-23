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

type ObjectCheck = "exists" | "missing" | "failed";

async function checkObject(url: string): Promise<ObjectCheck> {
  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });

    if (headResponse.ok) return "exists";
    if (headResponse.status === 404) return "missing";

    // Some public object gateways do not respond consistently to HEAD.
    // Confirm with a one-byte range request before treating the object as unavailable.
    const response = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });
    await response.body?.cancel();

    if (response.ok) return "exists";
    if (response.status === 404) return "missing";
    return "failed";
  } catch {
    return "failed";
  }
}

function candidateObjectKeys(moduleId: string, slideNumber: number): string[] {
  const filename = "slide-" + String(slideNumber).padStart(2, "0") + ".webp";
  // The first key is the canonical convention. The alternatives handle files
  // uploaded by extracting the ZIP inside the already-selected module folder,
  // or extracting only the slide files to the course-assets root.
  return [
    "module-" + moduleId + "/" + filename,
    "module-" + moduleId + "/module-" + moduleId + "/" + filename,
    filename,
  ];
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
  const slidePaths: Record<string, string> = {};
  let failedChecks = 0;
  let nextSlide = 1;

  const worker = async () => {
    while (true) {
      const slideNumber = nextSlide++;
      if (slideNumber > expectedCount) return;

      let hadFailedProbe = false;
      for (const objectKey of candidateObjectKeys(moduleId, slideNumber)) {
        const result = await checkObject(IMAGE_BASE + "/" + objectKey);
        if (result === "exists") {
          availableSlides.push(slideNumber);
          slidePaths[String(slideNumber)] = objectKey;
          hadFailedProbe = false;
          break;
        }
        if (result === "failed") hadFailedProbe = true;
      }
      if (!slidePaths[String(slideNumber)] && hadFailedProbe) failedChecks++;
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
      slidePaths,
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
