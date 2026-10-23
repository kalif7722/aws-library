import visualMap from "../../courses/aws-generative-ai-developer-professional/visual-lesson-map.json";

type CourseModule = {
  id: string;
  title: string;
  sourcePageStart: number;
  sourcePageEnd: number;
};

const modules = visualMap.modules as CourseModule[];
const IMAGE_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals";
const MAX_SCAN_INDEX = 10000; // Safety bound; the PDF page count is only a reference.
const TRAILING_MISSING_LIMIT = 24;
const PROBE_CONCURRENCY = 6;
// At most 24 probes per request, below the Worker subrequest budget.
const SCAN_SIZE = 12;
const PROBE_TIMEOUT_MS = 4000;

type ObjectCheck = "exists" | "missing" | "failed";

async function checkObject(url: string): Promise<ObjectCheck> {
  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });

    await headResponse.body?.cancel();
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
  // Support canonical and nested extraction paths, isolated to this module.
  return [
    "module-" + moduleId + "/" + filename,
    "module-" + moduleId + "/module-" + moduleId + "/" + filename,
  ];
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const moduleId = params.get("module") ?? "";
  if (!/^\d{2}$/.test(moduleId)) {
    return Response.json({ error: "A two-digit module ID is required." }, { status: 400 });
  }

  const moduleMeta = modules.find((module) => module.id === moduleId);
  if (!moduleMeta) {
    return Response.json({ error: "Module not found." }, { status: 404 });
  }

  const referenceCount = moduleMeta.sourcePageEnd - moduleMeta.sourcePageStart + 1;

  const availableSlides: number[] = [];
  const slidePaths: Record<string, string> = {};
  const probeResults = new Map<number, ObjectCheck>();
  let failedChecks = 0;
  const start = Number(params.get("start") ?? "1");
  const previousMissing = Number(params.get("missing") ?? "0");
  if (!Number.isInteger(previousMissing) || previousMissing < 0 || previousMissing >= TRAILING_MISSING_LIMIT) {
    return Response.json({ error: "Invalid discovery position." }, { status: 400 });
  }
  if (!Number.isInteger(start) || start < 1 || start > MAX_SCAN_INDEX) {
    return Response.json({ error: "Invalid scan position." }, { status: 400 });
  }
  const end = Math.min(start + SCAN_SIZE - 1, MAX_SCAN_INDEX);
  let nextSlide = start;

  const worker = async () => {
    while (true) {
      const slideNumber = nextSlide++;
      if (slideNumber > end) return;

      let hadFailedProbe = false;
      for (const objectKey of candidateObjectKeys(moduleId, slideNumber)) {
        const result = await checkObject(IMAGE_BASE + "/" + objectKey);
        if (result === "exists") {
          availableSlides.push(slideNumber);
          slidePaths[String(slideNumber)] = objectKey;
          hadFailedProbe = false;
          probeResults.set(slideNumber, "exists");
          break;
        }
        if (result === "failed") hadFailedProbe = true;
      }
      if (!slidePaths[String(slideNumber)]) {
        probeResults.set(slideNumber, hadFailedProbe ? "failed" : "missing");
        if (hadFailedProbe) failedChecks++;
      }
    }
  };

  await Promise.all(Array.from(
    { length: Math.min(PROBE_CONCURRENCY, end - start + 1) },
    () => worker(),
  ));

  availableSlides.sort((a, b) => a - b);
  let consecutiveMissing = previousMissing;
  for (let slide = start; slide <= end; slide++) {
    const result = probeResults.get(slide);
    if (result === "exists" || result === "failed") consecutiveMissing = 0;
    else if (slide >= referenceCount) consecutiveMissing++;
  }
  const finished = end >= referenceCount && consecutiveMissing >= TRAILING_MISSING_LIMIT;
  return Response.json(
    {
      moduleId,
      referenceCount,
      nextStart: finished || end >= MAX_SCAN_INDEX ? null : end + 1,
      consecutiveMissing,
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
