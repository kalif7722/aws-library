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
  "03-01": {
    prefix: "module-03/part-01/aip-module-03-part-01",
    revision: "2026-11-12-m03-p01-visual-aligned-v1",
    firstSlide: 1,
    count: 6,
    firstTitle: "Agentic AI: Reason, Retrieve and Act",
    title: "Agentic AI Fundamentals and Bedrock Agent Deployment",
  },
  "03-02": {
    prefix: "module-03/part-02/aip-module-03-part-02",
    revision: "2026-11-12-m03-p02-visual-aligned-v1",
    firstSlide: 7,
    count: 8,
    firstTitle: "Multi-Agent Translation Request",
    title: "Multi-Agent Patterns, Routing, Parallelization and Memory",
  },
  "03-03": {
    prefix: "module-03/part-03/aip-module-03-part-03",
    revision: "2026-11-12-m03-p03-visual-aligned-v1",
    firstSlide: 15,
    count: 6,
    firstTitle: "Strands Agents SDK",
    title: "Strands Agents, Agent Squad and AgentCore Introduction",
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
  "02-03": {
    prefix: "module-02/part-03/aip-module-02-part-03",
    revision: "2026-11-11-m02-p03-visual-aligned-v1",
    firstSlide: 16,
    count: 6,
    firstTitle: "SageMaker Data Wrangler",
    title: "SageMaker Data Wrangler and Practical Data Preparation",
  },
  "02-04": {
    prefix: "module-02/part-04/aip-module-02-part-04",
    revision: "2026-11-11-m02-p04-visual-aligned-v1",
    firstSlide: 22,
    count: 7,
    firstTitle: "AWS Glue: Table Definitions and ETL",
    title: "AWS Glue, Catalogs, ETL and Data Quality",
  },
  "02-05": {
    prefix: "module-02/part-05/aip-module-02-part-05",
    revision: "2026-11-11-m02-p05-visual-aligned-v1",
    firstSlide: 29,
    count: 5,
    firstTitle: "CloudWatch Metrics Basics",
    title: "CloudWatch Metrics, Metric Streams and Amazon Transcribe",
  },
  "02-06": {
    prefix: "module-02/part-06/aip-module-02-part-06",
    revision: "2026-11-11-m02-p06-visual-aligned-v1",
    firstSlide: 34,
    count: 6,
    firstTitle: "Amazon Comprehend",
    title: "Amazon Comprehend, Custom Entities and Sensitive-Data Review",
  },
  "02-07": {
    prefix: "module-02/part-07/aip-module-02-part-07",
    revision: "2026-11-11-m02-p07-visual-aligned-v1",
    firstSlide: 40,
    count: 7,
    firstTitle: "Amazon OpenSearch Service",
    title: "Amazon OpenSearch Fundamentals, Indexes, Shards and Replicas",
  },
  "02-08": {
    prefix: "module-02/part-08/aip-module-02-part-08",
    revision: "2026-11-11-m02-p08-visual-aligned-v1",
    firstSlide: 47,
    count: 10,
    firstTitle: "Managed OpenSearch Domains",
    title: "Managed OpenSearch Domains, Index Lifecycle, Operations and Security",
  },
  "02-09": {
    prefix: "module-02/part-09/aip-module-02-part-09",
    revision: "2026-11-11-m02-p09-visual-aligned-v1",
    firstSlide: 57,
    count: 8,
    firstTitle: "Shard Pressure and Performance",
    title: "OpenSearch Performance, Serverless and Vector Search",
  },
  "02-10": {
    prefix: "module-02/part-10/aip-module-02-part-10",
    revision: "2026-11-11-m02-p10-visual-aligned-v1",
    firstSlide: 65,
    count: 6,
    firstTitle: "Amazon S3 Vectors",
    title: "Amazon S3 Vectors and Bedrock Knowledge Bases",
  },
  "02-11": {
    prefix: "module-02/part-11/aip-module-02-part-11",
    revision: "2026-11-11-m02-p11-visual-aligned-v1",
    firstSlide: 71,
    count: 10,
    firstTitle: "Amazon RDS Overview",
    title: "Amazon RDS, Aurora and PostgreSQL Vector Retrieval",
  },
  "02-12": {
    prefix: "module-02/part-12/aip-module-02-part-12",
    revision: "2026-11-11-m02-p12-visual-aligned-v1",
    firstSlide: 81,
    count: 10,
    firstTitle: "NoSQL Data Modeling",
    title: "DynamoDB Data Modeling, Capacity and Consistency",
  },
  "02-13": {
    prefix: "module-02/part-13/aip-module-02-part-13",
    revision: "2026-11-11-m02-p13-visual-aligned-v1",
    firstSlide: 91,
    count: 10,
    firstTitle: "Read Capacity Units",
    title: "DynamoDB Read Capacity, CRUD, Query and Batch Operations",
  },
  "02-14": {
    prefix: "module-02/part-14/aip-module-02-part-14",
    revision: "2026-11-11-m02-p14-visual-aligned-v1",
    firstSlide: 101,
    count: 10,
    firstTitle: "PartiQL for DynamoDB",
    title: "DynamoDB Integrations, DAX, TTL and Vector Index Freshness",
  },
  "02-15": {
    prefix: "module-02/part-15/aip-module-02-part-15",
    revision: "2026-11-11-m02-p15-visual-aligned-v1",
    firstSlide: 111,
    count: 10,
    firstTitle: "Amazon S3 Storage Classes",
    title: "Amazon S3 Storage Classes, Intelligent-Tiering and Lifecycle",
  },
  "02-16": {
    prefix: "module-02/part-16/aip-module-02-part-16",
    revision: "2026-11-12-m02-p16-visual-aligned-v1",
    firstSlide: 121,
    count: 5,
    firstTitle: "Lifecycle Scenario: Photos",
    title: "S3 Lifecycle Scenarios, Storage Class Analytics and Replication",
  },
  "02-17": {
    prefix: "module-02/part-17/aip-module-02-part-17",
    revision: "2026-11-12-m02-p17-visual-aligned-v1",
    firstSlide: 126,
    count: 9,
    firstTitle: "S3 Encryption Choices",
    title: "Amazon S3 Encryption: SSE-S3, SSE-KMS, SSE-C and TLS Enforcement",
  },
  "02-18": {
    prefix: "module-02/part-18/aip-module-02-part-18",
    revision: "2026-11-12-m02-p18-visual-aligned-v1",
    firstSlide: 135,
    count: 4,
    firstTitle: "S3 Server Access Logging",
    title: "S3 Access Logging, Logging-Loop Protection and VPC Access Points",
  },
  "02-19": {
    prefix: "module-02/part-19/aip-module-02-part-19",
    revision: "2026-11-12-m02-p19-visual-aligned-v1",
    firstSlide: 139,
    count: 6,
    firstTitle: "BDA Walkthrough: File to Structured Result",
    title: "Hands-On Bedrock Data Automation and SageMaker Data Wrangler Walkthroughs",
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
