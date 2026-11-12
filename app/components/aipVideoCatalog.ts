/** Published AIP video chapters. Keep the catalog in one place so the
 * playlist, slide study credit, and dashboard cannot disagree about counts. */
export type AipLecturePart = {
  id: string;
  title: string;
  subtitle: string;
  start: number;
  end: number;
};

export const AIP_VIDEO_PARTS: Record<string, readonly AipLecturePart[]> = {
  "00": [
    { id: "00", title: "Course Introduction", subtitle: "Course overview", start: 1, end: 12 },
  ],
  "01": [
    { id: "01", title: "Foundation Models & Amazon Bedrock", subtitle: "Models, APIs and access", start: 1, end: 9 },
    { id: "02", title: "Fine-Tuning & LoRA", subtitle: "Customization approaches", start: 10, end: 13 },
    { id: "03", title: "RAG & Knowledge Bases", subtitle: "Retrieval, vectors and grounding", start: 14, end: 24 },
    { id: "04", title: "Chunking, Embeddings & RAG Quality", subtitle: "Retrieval quality and metadata", start: 25, end: 34 },
    { id: "05", title: "RAG Evaluation & Guardrails", subtitle: "Multimodal AI and prompt management", start: 35, end: 43 },
    { id: "06", title: "Bedrock Flows & Effective Prompting", subtitle: "Structured responses and prompt anatomy", start: 44, end: 50 },
  ],
  "03": [
    { id: "01", title: "Agentic AI and Bedrock Agents", subtitle: "Reasoning, tool calls, action groups and deployment", start: 1, end: 6 },
    { id: "02", title: "Multi-Agent Orchestration Patterns", subtitle: "Supervisor-workers, routing, parallelization, chaining and memory", start: 7, end: 14 },
    { id: "03", title: "Strands Agents and AgentCore", subtitle: "Agent loop, quickstart tools, Agent Squad and runtime", start: 15, end: 20 },
    { id: "04", title: "AgentCore Managed Capabilities", subtitle: "Runtime deployment, memory, tools, gateway and identity", start: 21, end: 27 },
    { id: "05", title: "AgentCore Policies and Evaluations", subtitle: "Authorization, goal success, observability and custom evaluators", start: 28, end: 33 },
    { id: "06", title: "MCP, Agent Labs and Q Business", subtitle: "Strands lab, MCP hosting, OpenAPI, human review and enterprise AI", start: 34, end: 40 },
    { id: "07", title: "Amazon Q Business and Q Apps", subtitle: "Grounded answers, connectors, permissions, admin controls and apps", start: 41, end: 45 },
    { id: "08", title: "Amazon Q Developer", subtitle: "AWS operations, coding, IDE extensions and project rules", start: 46, end: 50 },
  ],
  "04": [
    { id: "01", title: "Tokens and Model Selection", subtitle: "CloudWatch monitoring, context pruning and cost-to-quality", start: 1, end: 6 },
    { id: "02", title: "Throughput and Caching", subtitle: "Batch inference, capacity, semantic, prompt and edge caching", start: 7, end: 11 },
    { id: "03", title: "Responsive AI and Retrieval", subtitle: "Streaming, model routing, RAG relevance and API profiling", start: 12, end: 16 },
    { id: "04", title: "Resilient and Cross-Region Inference", subtitle: "SageMaker deployment, backoff, pooling and inference profiles", start: 17, end: 22 },
  ],
  "02": [
    { id: "01", title: "Structuring Data for GenAI", subtitle: "JSON, conversations and chunking", start: 1, end: 7 },
    { id: "02", title: "Bedrock Data Automation", subtitle: "Documents, images, video, audio and blueprints", start: 8, end: 15 },
    { id: "03", title: "SageMaker Data Wrangler", subtitle: "Transformations, preparation and common failures", start: 16, end: 21 },
    { id: "04", title: "AWS Glue and Data Quality", subtitle: "ETL, crawler, catalog, partitions and checks", start: 22, end: 28 },
    { id: "05", title: "CloudWatch & Amazon Transcribe", subtitle: "Metrics, speech recognition and content review", start: 29, end: 33 },
    { id: "06", title: "Amazon Comprehend", subtitle: "NLP, custom entities, PII review and medical text", start: 34, end: 39 },
    { id: "07", title: "OpenSearch Fundamentals", subtitle: "Search, dashboards, indexes, shards and replicas", start: 40, end: 46 },
    { id: "08", title: "Operating OpenSearch Domains", subtitle: "Managed domains, lifecycle, stability and security", start: 47, end: 56 },
    { id: "09", title: "OpenSearch Vector Search", subtitle: "Shard performance, serverless and neural search pipelines", start: 57, end: 64 },
    { id: "10", title: "Amazon S3 Vectors & Knowledge Bases", subtitle: "Vector storage, retrieval and operating practices", start: 65, end: 70 },
    { id: "11", title: "Amazon RDS & Aurora", subtitle: "Managed relational data and PostgreSQL vector retrieval", start: 71, end: 80 },
    { id: "12", title: "DynamoDB Fundamentals", subtitle: "Keys, partitions, capacity and consistency", start: 81, end: 90 },
    { id: "13", title: "DynamoDB Read and Write Operations", subtitle: "RCUs, partitions, throttling, Query, Scan and batch APIs", start: 91, end: 100 },
    { id: "14", title: "DynamoDB Integration and RAG Freshness", subtitle: "PartiQL, DAX, TTL, indexing, synchronization and reranking", start: 101, end: 110 },
    { id: "15", title: "Amazon S3 Storage Classes and Lifecycle", subtitle: "Durability, access tiers, cost, transitions and retention", start: 111, end: 120 },
    { id: "16", title: "S3 Lifecycle and Replication", subtitle: "Photo retention, analytics, CRR, SRR and replication exceptions", start: 121, end: 125 },
    { id: "17", title: "S3 Encryption and Transport Security", subtitle: "SSE-S3, SSE-KMS, SSE-C, client-side encryption and TLS", start: 126, end: 134 },
    { id: "18", title: "S3 Logging and Access Points", subtitle: "Server access logs, logging loops, policies and VPC-origin access", start: 135, end: 138 },
    { id: "19", title: "BDA and Data Wrangler Walkthroughs", subtitle: "Invoice extraction, output blueprint, data cleaning and export", start: 139, end: 144 },
  ],
};

export function aipVideoId(moduleId: string, partId: string): string {
  return moduleId === "00" ? "aip-video-00" : `aip-video-${moduleId}-${partId}`;
}

export function aipVideoStartedId(moduleId: string, partId: string): string {
  return moduleId === "00" ? "aip-video-started-00" : `aip-video-started-${moduleId}-${partId}`;
}

/** A learner can finish by reaching the end or choosing Mark complete.
 * The video's mapped slide lessons are credited in the same transaction. */
export function aipVideoCompletionIds(moduleId: string, partId: string, slides: readonly number[]): string[] {
  return [
    aipVideoId(moduleId, partId),
    ...[...new Set(slides.filter(slide=>Number.isInteger(slide) && slide>0))]
      .map(slide=>`aip-${moduleId}-${slide}`),
  ];
}


export type AipVideoProgress = {
  total: number;
  seen: number;
  completed: number;
  inProgress: number;
  seenIds: string[];
  completedIds: string[];
};

/** A video has been seen once its slide navigation or narration yields study
 * credit. It is completed by watching the video or studying every slide.
 * This also recovers progress stored before these counters were introduced. */
export function getAipVideoProgress(done: readonly string[], moduleId?: string): AipVideoProgress {
  const ids = new Set(done);
  const modules = moduleId ? [moduleId] : Object.keys(AIP_VIDEO_PARTS);
  const seenIds: string[] = [];
  const completedIds: string[] = [];
  let total = 0;
  for (const mod of modules) {
    for (const part of AIP_VIDEO_PARTS[mod] ?? []) {
      total++;
      const id = aipVideoId(mod, part.id);
      let viewedSlides = 0;
      for (let slide = part.start; slide <= part.end; slide++) {
        if (ids.has(`aip-${mod}-${slide}`)) viewedSlides++;
      }
      const finished = ids.has(id) || viewedSlides === part.end - part.start + 1;
      if (finished || viewedSlides > 0 || ids.has(aipVideoStartedId(mod, part.id))) seenIds.push(id);
      if (finished) completedIds.push(id);
    }
  }
  return {
    total, seen: seenIds.length, completed: completedIds.length,
    inProgress: seenIds.length - completedIds.length,
    seenIds, completedIds,
  };
}
