import { NextRequest } from "next/server";

const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aip";
const CAPTIONS: Record<string, string> = {
  "00": "module-00/aip-module-00.vtt",
  "01-01": "module-01/part-01/aip-module-01-part-01.vtt",
  "01-02": "module-01/part-02/aip-module-01-part-02.vtt",
  "01-03": "module-01/part-03/aip-module-01-part-03.vtt",
  "01-04": "module-01/part-04/aip-module-01-part-04.vtt",
  "01-05": "module-01/part-05/aip-module-01-part-05.vtt",
  "01-06": "module-01/part-06/aip-module-01-part-06.vtt",
  "03-01": "module-03/part-01/aip-module-03-part-01.vtt",
  "03-02": "module-03/part-02/aip-module-03-part-02.vtt",
  "03-03": "module-03/part-03/aip-module-03-part-03.vtt",
  "03-04": "module-03/part-04/aip-module-03-part-04.vtt",
  "03-05": "module-03/part-05/aip-module-03-part-05.vtt",
  "03-06": "module-03/part-06/aip-module-03-part-06.vtt",
  "03-07": "module-03/part-07/aip-module-03-part-07.vtt",
  "03-08": "module-03/part-08/aip-module-03-part-08.vtt",
  "04-01": "module-04/part-01/aip-module-04-part-01.vtt",
  "04-02": "module-04/part-02/aip-module-04-part-02.vtt",
  "04-03": "module-04/part-03/aip-module-04-part-03.vtt",
  "04-04": "module-04/part-04/aip-module-04-part-04.vtt",
  "05-01": "module-05/part-01/aip-module-05-part-01.vtt",
  "05-02": "module-05/part-02/aip-module-05-part-02.vtt",
  "05-03": "module-05/part-03/aip-module-05-part-03.vtt",
  "05-04": "module-05/part-04/aip-module-05-part-04.vtt",
  "05-05": "module-05/part-05/aip-module-05-part-05.vtt",
  "05-06": "module-05/part-06/aip-module-05-part-06.vtt",
  "05-07": "module-05/part-07/aip-module-05-part-07.vtt",
  "06-01": "module-06/part-01/aip-module-06-part-01.vtt",
  "06-02": "module-06/part-02/aip-module-06-part-02.vtt",
  "06-03": "module-06/part-03/aip-module-06-part-03.vtt",
  "06-04": "module-06/part-04/aip-module-06-part-04.vtt",
  "06-05": "module-06/part-05/aip-module-06-part-05.vtt",
  "02-01": "module-02/part-01/aip-module-02-part-01.vtt",
  "02-02": "module-02/part-02/aip-module-02-part-02.vtt",
  "02-03": "module-02/part-03/aip-module-02-part-03.vtt",
  "02-04": "module-02/part-04/aip-module-02-part-04.vtt",
  "02-05": "module-02/part-05/aip-module-02-part-05.vtt",
  "02-06": "module-02/part-06/aip-module-02-part-06.vtt",
  "02-07": "module-02/part-07/aip-module-02-part-07.vtt",
  "02-08": "module-02/part-08/aip-module-02-part-08.vtt",
  "02-09": "module-02/part-09/aip-module-02-part-09.vtt",
  "02-10": "module-02/part-10/aip-module-02-part-10.vtt",
  "02-11": "module-02/part-11/aip-module-02-part-11.vtt",
  "02-12": "module-02/part-12/aip-module-02-part-12.vtt",
  "02-13": "module-02/part-13/aip-module-02-part-13.vtt",
  "02-14": "module-02/part-14/aip-module-02-part-14.vtt",
  "02-15": "module-02/part-15/aip-module-02-part-15.vtt",
  "02-16": "module-02/part-16/aip-module-02-part-16.vtt",
  "02-17": "module-02/part-17/aip-module-02-part-17.vtt",
  "02-18": "module-02/part-18/aip-module-02-part-18.vtt",
  "02-19": "module-02/part-19/aip-module-02-part-19.vtt",
};

export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module") ?? "";
  const part = request.nextUrl.searchParams.get("part");
  const key = part ? `${module}-${part}` : module;
  if (!CAPTIONS[key]) return new Response("Not found", { status: 404 });
  try {
    const result = await fetch(`${ROOT}/${CAPTIONS[key]}`, {
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
