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
  "05": [
    { id: "01", title: "SageMaker ML Lifecycle and Training Architecture", subtitle: "ML lifecycle, training, notebooks and console map", start: 1, end: 5 },
    { id: "02", title: "Data Preparation, Deployment Modes and Safe Rollouts", subtitle: "Processing jobs, inference modes and endpoint release safety", start: 6, end: 10 },
    { id: "03", title: "Model Building, Hosting Options and Ground Truth", subtitle: "JumpStart, Feature Store, hosting and labeling", start: 11, end: 15 },
    { id: "04", title: "Human Labeling, Active Learning and Ground Truth Plus", subtitle: "Workforce selection, active learning and managed labeling", start: 16, end: 20 },
    { id: "05", title: "Model Monitor, Clarify and Production Drift", subtitle: "Monitoring data, bias, explanation and drift", start: 21, end: 25 },
    { id: "06", title: "Model Registry, Approvals and ML Lineage", subtitle: "Version promotion, auditing and cross-account lineage", start: 26, end: 31 },
    { id: "07", title: "SageMaker Neo, Unified Studio and ML Pipelines", subtitle: "Edge optimization, shared projects and orchestration", start: 32, end: 36 },
  ],
  "06": [
    { id: "01", title: "AWS Application Architecture, Lambda, API Requests and Kinesis Events", subtitle: "Overview, Lambda basics, API request, order-event processing and stream alerts", start: 1, end: 5 },
    { id: "02", title: "Lambda Workload Choices, Five Patterns, Runtimes, Triggers and OpenSearch", subtitle: "When to use Lambda, event patterns, runtimes, triggers and vector indexing", start: 6, end: 10 },
    { id: "03", title: "Lambda Data Pipelines, Kinesis Batches, Bedrock and API Integrations", subtitle: "Data transformations, Redshift COPY, stream retries, Bedrock adapters and API integrations", start: 11, end: 16 },
    { id: "04", title: "API Gateway Routing and Security, AppConfig and Step Functions", subtitle: "Direct Kinesis integration, REST endpoint types, AI API security, model flags and orchestration", start: 17, end: 24 },
    { id: "05", title: "Step Functions Model Workflows, Resilience, Agent Controls and CI/CD", subtitle: "Training, tuning, batch recovery, circuit breakers, agent controls and delivery pipelines", start: 25, end: 32 },
    { id: "06", title: "CodePipeline, CI/CD and CodeBuild", subtitle: "Pipeline artifacts, troubleshooting, build environments and buildspec", start: 33, end: 41 },
    { id: "07", title: "CodeDeploy Strategies for EC2, Lambda and ECS", subtitle: "Deployment lifecycle, in-place versus blue-green and rollback", start: 42, end: 48 },
    { id: "08", title: "MLflow, AppSync and AWS Hybrid Edge Infrastructure", subtitle: "Experiment tracking, GraphQL, Outposts and Wavelength", start: 49, end: 55 },
    { id: "09", title: "Amazon SQS Fundamentals and Queue Consumers", subtitle: "Queue types, producers, consumers and multiple EC2 workers", start: 56, end: 60 },
    { id: "10", title: "API Gateway REST, WebSocket, Stages and Caching", subtitle: "REST versus WebSocket, deployment stages, custom domain and TLS", start: 61, end: 63 },
    { id: "11", title: "Bedrock Workflows, CodeBuild and CodeDeploy", subtitle: "Step Functions integration, payload constraints, caching and deployment", start: 64, end: 68 },
    { id: "12", title: "SNS Filtering, Mobile Push, AppFlow and SQS Operations", subtitle: "Subscription filters, APNs and FCM, AppFlow transfer and dead-letter queues", start: 69, end: 72 },
    { id: "13", title: "EventBridge Routing, Reliability, Scheduler and Pipes", subtitle: "Rules, cross-account policies, Scheduler and Pipes", start: 73, end: 76 },
  ],
  "07": [
    { id: "01", title: "Governance, Agent Tracing and Human Model Evaluation", subtitle: "Evaluation criteria, benchmarks and human review", start: 1, end: 5 },
    { id: "02", title: "LLM-as-a-Judge, Hybrid Evaluation and Text Metrics", subtitle: "LLM judges, ROUGE, BLEU and BERTScore", start: 6, end: 10 },
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
