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
    { id: "01", title: "Bedrock Agent Tracing and Evidence-Based Model Evaluation", subtitle: "Agent traces, evaluation dimensions, human review, benchmark scoring and model judging", start: 1, end: 5 },
    { id: "02", title: "Hybrid Evaluation, ROUGE, BLEU, BERTScore and Bedrock Jobs", subtitle: "Combining judges and humans, text evaluation metrics, and Bedrock evaluation jobs", start: 6, end: 10 },
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
    { id: "06", title: "CodePipeline Troubleshooting, CodeBuild, CodeDeploy and MLflow", subtitle: "Diagnosing CI/CD, secure builds, safe deployments, model tracking", start: 33, end: 41 },
    { id: "07", title: "AppSync Updates, Outposts, Wavelength and SQS Fundamentals", subtitle: "Realtime GraphQL, edge and hybrid placement, queues, delivery order", start: 42, end: 48 },
    { id: "08", title: "SQS Operations, Amplify and EventBridge Routing", subtitle: "Queue consumers, worker scaling, front-end hosting, event buses and security", start: 49, end: 55 },
    { id: "09", title: "EventBridge Schema Registry, SNS Messaging Security and AppFlow", subtitle: "Schema versions and bindings, SNS fan-out, independent deliveries, notification security and SaaS transfers", start: 56, end: 60 },
    { id: "10", title: "API Gateway REST, WebSocket, Stages and Caching", subtitle: "REST versus WebSocket, deployment stages, custom domain and TLS", start: 61, end: 63 },
    { id: "11", title: "Bedrock Workflows, CodeBuild and CodeDeploy", subtitle: "Step Functions integration, payload constraints, caching and deployment", start: 64, end: 68 },
    { id: "12", title: "SNS Filtering, Mobile Push, AppFlow and SQS Operations", subtitle: "Subscription filters, APNs and FCM, AppFlow transfer and dead-letter queues", start: 69, end: 72 },
    { id: "13", title: "EventBridge Routing, Reliability, Scheduler and Pipes", subtitle: "Rules, cross-account policies, Scheduler and Pipes", start: 73, end: 76 },
  ],
  "15": [
    { id: "01", title: "Transfer Service Choice, DataSync Lifecycle and On-Premises Migration", subtitle: "DataSync vs Transfer Family, task lifecycle and NFS/SMB migration", start: 1, end: 3 },
    { id: "02", title: "Agentless Transfer, Task Controls and Data Integrity", subtitle: "AWS storage transfers, overwrite/delete settings, verification and archives", start: 4, end: 6 },
  ],
  "19": [
    { id: "01", title: "Lab 01 — Diagnose and Fix Context Overflow and Truncated Inputs", subtitle: "Reproduce, inspect prompts and token budget, repair chunk selection, verify regressions", start: 1, end: 5 },
    { id: "02", title: "Lab 02 — Diagnose Bedrock Converse API Schema and Response Errors", subtitle: "Triage HTTP errors, repair content blocks and validate parsing", start: 6, end: 11 },
    { id: "03", title: "Lab 03 — Diagnose Bedrock Throttling and Retry Storms", subtitle: "429s, token quotas, jitter, admission limits and cost", start: 12, end: 17 },
    { id: "04", title: "Lab 04 — Diagnose Incomplete Streaming Responses and Timeouts", subtitle: "Trace stream events, locate disconnects and verify terminal completion", start: 18, end: 23 },
    { id: "05", title: "Lab 05 — Diagnose and Roll Back Prompt Version Regressions", subtitle: "Pinned version comparison, variable repair, JSON schema and release gate", start: 24, end: 28 },
    { id: "06", title: "Lab 06 — Diagnose a Stale Bedrock Knowledge Base After Update", subtitle: "Trace S3 version, ingestion failures, source retrieval and answer caching", start: 29, end: 35 },
    { id: "07", title: "Lab 07 — Diagnose Irrelevant Retrieved Context Without Weakening Security", subtitle: "Inspect top-K, chunking, metadata and ranking with tenant filters intact", start: 36, end: 41 },
  ],
  "17": [
    { id: "01", title: "EBS Block Storage, Placement, Performance and Recovery", subtitle: "EBS volumes, AZ boundaries, snapshots and performance", start: 1, end: 5 },
    { id: "02", title: "EFS Shared Storage and Choosing Storage for AI Pipelines", subtitle: "EFS design, lifecycle classes and pipeline storage", start: 6, end: 10 },
    { id: "03", title: "Production GenAI and Vector Store Architecture Decisions", subtitle: "RAG architecture and OpenSearch deployment choices", start: 11, end: 13 },
    { id: "04", title: "Permission-Aware Retrieval, SQL Vectors, Graphs and S3 Vectors", subtitle: "Kendra, Aurora pgvector, Neptune Analytics and S3 Vectors", start: 14, end: 17 },
    { id: "05", title: "Durable AI Orchestration and Chatbot Architecture Walkthroughs", subtitle: "Step Functions, legal Q&A and customer chatbot design", start: 18, end: 20 },
  ],
  "16": [
    { id: "01", title: "CloudFront Edge Delivery, Secure Origins and Cache Policies", subtitle: "Cache flow, private origins, OAC, TTL and replication comparison", start: 1, end: 5 },
    { id: "02", title: "Elastic Load Balancing: ALB, NLB, Gateway and TLS", subtitle: "Health, listeners, Layer 7, Layer 4, inspection and HTTPS", start: 6, end: 10 },
    { id: "03", title: "Global Accelerator: Anycast Routing and CDN Comparison", subtitle: "Static addresses, regional failover and CloudFront trade-offs", start: 11, end: 12 },
    { id: "04", title: "Route 53 DNS, Records, Private Zones and Failover", subtitle: "TTL, aliases, internal DNS and health-aware routing", start: 13, end: 16 },
    { id: "05", title: "Hands-On CloudFront OAC Security and Cache Verification", subtitle: "Private S3 access, cache hits, versioning and invalidation", start: 17, end: 18 },
  ],
  "14": [
    { id: "01", title: "GenAI Capacity Management: Target Tracking, Predictive Scaling and Guardrails", subtitle: "Scaling responsibilities, target tracking, predictive plans and Bedrock quota guardrails", start: 1, end: 5 },
    { id: "02", title: "AWS Cost Anomaly Detection: Baselines, Alerts and Incident Triage", subtitle: "Anomaly baselines, alert subscriptions and root-cause cost triage", start: 6, end: 7 },
    { id: "03", title: "Cost Explorer: Spend Analysis, Resource Investigation, Savings Plans and Forecasts", subtitle: "Cost Explorer filters, service trends, resource investigation, Savings Plans and forecasts", start: 8, end: 12 },
    { id: "04", title: "Amazon Managed Grafana: Observability Data Sources, Dashboards and Alerts", subtitle: "Grafana authentication, telemetry, GenAI dashboards and explicit alert routing", start: 13, end: 14 },
    { id: "05", title: "AWS Systems Manager: Managed Node Identity, Agent and Network Prerequisites", subtitle: "SSM managed nodes, IAM/Agent/HTTPS prerequisites and troubleshooting", start: 15, end: 15 },
  ],
  "13": [
    { id: "01", title: "Task-Focused ML Services and Human-in-the-Loop Review with A2I", subtitle: "ML service selection, A2I review decisions and human oversight", start: 1, end: 3 },
    { id: "02", title: "Amazon Kendra Enterprise Search and Retrieval Quality", subtitle: "Kendra enterprise indexing, source permissions and retrieval tuning", start: 4, end: 5 },
    { id: "03", title: "Amazon Lex V2 Conversations, Fulfilment and Contact Centre Handoff", subtitle: "Lex V2 intents, slots, Lambda fulfilment and optional Connect handoff", start: 6, end: 7 },
    { id: "04", title: "Rekognition Analysis, Custom Labels and Responsible Image Moderation", subtitle: "Image analysis, custom labels, moderation policies and generated-image gating", start: 8, end: 11 },
    { id: "05", title: "Amazon Textract: OCR, Forms, Tables and Structured Document Extraction", subtitle: "Invoice OCR, form/table extraction and verified structured output", start: 12, end: 12 },
  ],
  "12": [
    { id: "01", title: "Developer Tools and CDK: Synthesis, SAM Testing and Event-Driven Example", subtitle: "CDK synthesis, SAM comparison and local Lambda validation plus image-event architecture", start: 1, end: 5 },
    { id: "02", title: "AWS Console, CLI and SDK: Identity, Credentials and API Access", subtitle: "Console, CLI, SDK credentials, temporary roles and caller verification", start: 6, end: 7 },
    { id: "03", title: "CloudFormation Template Lifecycle, Change Sets and Stack Safety", subtitle: "CloudFormation lifecycle and safe infrastructure changes", start: 8, end: 8 },
    { id: "04", title: "CodeArtifact Dependency Flow and Approved Package Consumption", subtitle: "CodeArtifact domains, repositories, versions and approved builds", start: 9, end: 9 },
    { id: "06", title: "CloudFormation Advanced: Dependencies, Change Sets, Drift and Infrastructure Composer", subtitle: "CloudFormation dependencies, drift, retention and visual IaC authoring", start: 14, end: 16 },
    { id: "07", title: "CodeArtifact Security and Event-Driven Package Validation", subtitle: "Cross-account package permissions and safe EventBridge validation", start: 17, end: 18 },
  ],
  "11": [
    { id: "01", title: "Purpose-Built GenAI Databases and Amazon DocumentDB", subtitle: "Purpose-built stores, structured retrieval and DocumentDB read replicas", start: 1, end: 3 },
    { id: "02", title: "GenAI Caching and Durable Agent State with ElastiCache and MemoryDB", subtitle: "Cache-aside response reuse and durable multi-AZ agent state", start: 4, end: 5 },
    { id: "03", title: "Neptune Knowledge Graphs, Redis Data Structures and GraphRAG", subtitle: "Neptune entity traversal, Redis state structures and grounded GraphRAG", start: 6, end: 8 },
    { id: "04", title: "Database Selection Guide and Integrated GenAI Data Architecture", subtitle: "Access-pattern selection and multi-store Bedrock architecture", start: 9, end: 10 },
  ],
  "10": [
    { id: "01", title: "Choosing GenAI Compute and Deploying APIs with AWS App Runner", subtitle: "Compute trade-offs, managed App Runner deployment and APIs", start: 1, end: 2 },
    { id: "02", title: "EC2 for GenAI: Instance Selection, Bootstrap and Linux Launch Walkthrough", subtitle: "EC2 architecture, accelerated inference sizing, user data and console launch", start: 3, end: 6 },
    { id: "03", title: "Docker to Amazon ECS: EC2, Fargate, IAM, Load Balancing and EFS", subtitle: "Docker, ECR, ECS EC2/Fargate, task/execution roles, ALB and EFS", start: 7, end: 12 },
    { id: "04", title: "Amazon EKS: Kubernetes Control Plane, GenAI Architecture, Nodes and Storage", subtitle: "EKS control plane, secure GenAI Pods, node options and block/file storage", start: 13, end: 16 },
    { id: "05", title: "Customer Engagement: Amazon Lex, Amazon Connect and Human Handoff", subtitle: "Contact flows, Lex dialog, Bedrock/Lambda backend and human escalation", start: 17, end: 17 },
  ],
  "09": [
    { id: "01", title: "GenAI Analytics Architecture and Amazon Athena", subtitle: "S3 analytics data, Athena query execution and grounded SQL answers", start: 1, end: 3 },
    { id: "02", title: "Amazon EMR: Distributed Processing, Usage Patterns and Frameworks", subtitle: "Distributed Spark processing, EMR deployment patterns and engines", start: 4, end: 6 },
    { id: "03", title: "Amazon QuickSight: Data Sources, Query Modes and GenAI Dashboards", subtitle: "QuickSight architecture, data sources, SPICE, dashboards and anti-patterns", start: 7, end: 11 },
    { id: "04", title: "QuickSight Security, Cross-Region Access and User Management", subtitle: "QuickSight account/data permissions, regional and account boundaries, row security", start: 12, end: 16 },
    { id: "05", title: "Kinesis Data Streams: Shards, Replay, Capacity and GenAI Pipelines", subtitle: "Kinesis partitioning, record replay, scaling modes and real-time GenAI telemetry", start: 17, end: 20 },
    { id: "06", title: "Amazon MSK: Kafka Architecture, Partitioning and Independent Consumers", subtitle: "MSK brokers, topics, partitions, Kafka groups and Kinesis comparison", start: 21, end: 24 },
    { id: "07", title: "Choosing Analytics Services and an Integrated GenAI Data Architecture", subtitle: "Decision tree and integrated streaming, data-lake, BI and AI architecture", start: 25, end: 26 },
  ],
  "08": [
    { id: "01", title: "Secure GenAI Architecture, Least Privilege and Data Masking", subtitle: "Security boundaries, IAM scoping, pseudonymisation and salted hashes", start: 1, end: 5 },
    { id: "02", title: "Password Salts, IAM Users, Policy Evaluation and JSON Policies", subtitle: "Password storage, user groups, explicit denies and policy syntax", start: 6, end: 10 },
    { id: "03", title: "IAM Password Policies, MFA, Service Roles and Identity Center", subtitle: "Authentication controls, temporary roles, federation and multi-account access", start: 11, end: 15 },
    { id: "04", title: "Identity Center Guardrails, Control Tower and Transport Encryption", subtitle: "Permission sets, landing-zone governance, TLS and client-side encryption", start: 16, end: 20 },
    { id: "05", title: "KMS Envelope Encryption, Key Ownership, Snapshots and Macie", subtitle: "Data keys, key control, encrypted disaster recovery, sensitive data and secrets", start: 21, end: 25 },
    { id: "06", title: "Multi-Region Secrets, Cognito User Pools and Tenant Isolation", subtitle: "Regional secrets, user authentication, federated credentials and row security", start: 26, end: 30 },
    { id: "07", title: "AWS WAF: Request Protection and Rule Evaluation", subtitle: "Managed rules, ACL priority and request allow/block decisions", start: 31, end: 32 },
    { id: "08", title: "VPC Fundamentals: Subnets, Gateways, Network Controls and Peering", subtitle: "Public/private networks, NAT, security groups, ACLs, logs and peering", start: 33, end: 38 },
    { id: "09", title: "Private AWS Access: VPC Endpoints, Hybrid Links and PrivateLink", subtitle: "VPC endpoints, hybrid connectivity, PrivateLink and secure GenAI architecture", start: 39, end: 44 },
    { id: "10", title: "Security Architecture Decision Guides and Integrated Review", subtitle: "Identity, encryption, privacy, network choices, investigation evidence and secure-design review", start: 45, end: 50 },
    { id: "11", title: "Hands-On Security Labs: Least Privilege, IAM Policy Simulator and SSE-KMS", subtitle: "Lambda permissions lab, policy editor validation and KMS-encrypted S3 lab", start: 51, end: 53 },
  ],
  "07": [
    { id: "01", title: "Governance, Agent Tracing and Human Model Evaluation", subtitle: "Evaluation criteria, benchmarks and human review", start: 1, end: 5 },
    { id: "02", title: "LLM-as-a-Judge, Hybrid Evaluation and Text Metrics", subtitle: "LLM judges, ROUGE, BLEU and BERTScore", start: 6, end: 10 },
    { id: "03", title: "Evaluation Strategy, Responsible AI and CloudWatch Logs", subtitle: "Choosing evaluation approaches, deployment readiness, responsible AI and logging architecture", start: 11, end: 15 },
    { id: "04", title: "CloudWatch Log Collection, Insights, Exports and Alarms", subtitle: "Collect logs, query failures, export and subscribe to events, configure AI alerts", start: 16, end: 20 },
    { id: "05", title: "CloudWatch Alarm Actions, Composite Alarms and AI Quality Dashboards", subtitle: "Alarm targets, composite decisions, prompt regression and operational dashboards", start: 21, end: 24 },
    { id: "06", title: "X-Ray Tracing, Service Maps and AI Request Diagnostics", subtitle: "Distributed traces, latency bottlenecks, annotations and error investigation", start: 25, end: 29 },
    { id: "07", title: "Bedrock Telemetry, RAG Quality and Release Observability", subtitle: "Safe metadata, RAG evaluation, canary release gates and trace sampling", start: 30, end: 34 },
    { id: "08", title: "X-Ray Bottlenecks, Retries, Correlation and Safe AI Telemetry", subtitle: "Tracing dependencies, throttling retries, log correlation and telemetry privacy", start: 35, end: 39 },
    { id: "09", title: "RAG Observability, AI Incident Response and Production Readiness", subtitle: "RAG metrics, incident workflows, release checklist and synchronous traces", start: 40, end: 44 },
    { id: "10", title: "Async AI Tracing, Model Fallback and Quality Scorecards", subtitle: "Cross-service correlation, fallback telemetry, cost, quality and answer troubleshooting", start: 45, end: 49 },
    { id: "11", title: "Operational AI Runbooks, Privacy, Governance and Bedrock Evaluation Lab", subtitle: "Throttling fixes, telemetry privacy, governance cycle and evaluation dataset lab", start: 50, end: 54 },
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
