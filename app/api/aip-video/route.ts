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
  "03-04": {
    prefix: "module-03/part-04/aip-module-03-part-04",
    revision: "2026-11-12-m03-p04-visual-aligned-v1",
    firstSlide: 21,
    count: 7,
    firstTitle: "AgentCore Capabilities",
    title: "AgentCore Runtime, Memory, Tools, Gateway and Identity",
  },
  "03-05": {
    prefix: "module-03/part-05/aip-module-03-part-05",
    revision: "2026-11-12-m03-p05-visual-aligned-v1",
    firstSlide: 28,
    count: 6,
    firstTitle: "Policy in AgentCore",
    title: "AgentCore Policy Enforcement, Evaluations and Observability",
  },
  "03-06": {
    prefix: "module-03/part-06/aip-module-03-part-06",
    revision: "2026-11-12-m03-p06-visual-aligned-v1",
    firstSlide: 34,
    count: 7,
    firstTitle: "Lab Preparation: Strands, AgentCore and Agent Squad",
    title: "Agent Labs, MCP, OpenAPI, Human Review and Amazon Q Business",
  },
  "03-07": {
    prefix: "module-03/part-07/aip-module-03-part-07",
    revision: "2026-11-12-m03-p07-visual-aligned-v1",
    firstSlide: 41,
    count: 5,
    firstTitle: "Amazon Q Business: A Grounded Answer",
    title: "Amazon Q Business, Secure Enterprise Answers and Q Apps",
  },
  "03-08": {
    prefix: "module-03/part-08/aip-module-03-part-08",
    revision: "2026-11-12-m03-p08-visual-aligned-v1",
    firstSlide: 46,
    count: 5,
    firstTitle: "Amazon Q Developer in AWS",
    title: "Amazon Q Developer: Infrastructure, Coding and Project Rules",
  },
  "04-01": {
    prefix: "module-04/part-01/aip-module-04-part-01",
    revision: "2026-11-12-m04-p01-visual-aligned-v1",
    firstSlide: 1,
    count: 6,
    firstTitle: "Operational Efficiency and Optimization",
    title: "Token Efficiency, CloudWatch and Cost-Effective Model Choice",
  },
  "04-02": {
    prefix: "module-04/part-02/aip-module-04-part-02",
    revision: "2026-11-12-m04-p02-visual-aligned-v1",
    firstSlide: 7,
    count: 5,
    firstTitle: "Maximize Resource Utilization",
    title: "Capacity Planning, Provisioned Throughput and Three Caching Patterns",
  },
  "04-03": {
    prefix: "module-04/part-03/aip-module-04-part-03",
    revision: "2026-11-12-m04-p03-visual-aligned-v1",
    firstSlide: 12,
    count: 5,
    firstTitle: "Build a Responsive AI Experience",
    title: "Responsive AI, Routing, Retrieval and Model Profiling",
  },
  "04-04": {
    prefix: "module-04/part-04/aip-module-04-part-04",
    revision: "2026-11-12-m04-p04-visual-aligned-v1",
    firstSlide: 17,
    count: 6,
    firstTitle: "Size a SageMaker Model Deployment",
    title: "SageMaker Serving, Reliability and Bedrock Cross-Region Inference",
  },
  "05-01": {
    prefix: "module-05/part-01/aip-module-05-part-01",
    revision: "2026-11-12-m05-p01-visual-aligned-v1",
    firstSlide: 1,
    count: 5,
    firstTitle: "Managing Models with SageMaker AI",
    title: "SageMaker ML Lifecycle and Training Architecture",
  },
  "05-02": {
    prefix: "module-05/part-02/aip-module-05-part-02",
    revision: "2026-11-12-m05-p02-visual-aligned-v1",
    firstSlide: 6,
    count: 5,
    firstTitle: "Prepare Your Training Data",
    title: "Data Preparation, Deployment Modes and Safe Rollouts",
  },
  "05-03": {
    prefix: "module-05/part-03/aip-module-05-part-03",
    revision: "2026-11-12-m05-p03-visual-aligned-v1",
    firstSlide: 11,
    count: 5,
    firstTitle: "Accelerate Model Building",
    title: "Model Building, Hosting Options and Ground Truth",
  },
  "05-04": {
    prefix: "module-05/part-04/aip-module-05-part-04",
    revision: "2026-11-12-m05-p04-visual-aligned-v1",
    firstSlide: 16,
    count: 5,
    firstTitle: "Human Labeling Workflow",
    title: "Human Labeling, Active Learning and Ground Truth Plus",
  },
  "05-05": {
    prefix: "module-05/part-05/aip-module-05-part-05",
    revision: "2026-11-12-m05-p05-visual-aligned-v1",
    firstSlide: 21,
    count: 5,
    firstTitle: "Monitor Drift and Act",
    title: "Model Monitor, Clarify and Production Drift",
  },
  "05-06": {
    prefix: "module-05/part-06/aip-module-05-part-06",
    revision: "2026-11-12-m05-p06-visual-aligned-v1",
    firstSlide: 26,
    count: 6,
    firstTitle: "Model Registry Versions",
    title: "Model Registry, Approvals and ML Lineage",
  },
  "05-07": {
    prefix: "module-05/part-07/aip-module-05-part-07",
    revision: "2026-11-12-m05-p07-visual-aligned-v1",
    firstSlide: 32,
    count: 5,
    firstTitle: "Compile for Target Hardware with Neo",
    title: "SageMaker Neo, Unified Studio and ML Pipelines",
  },
  "06-01": {
    prefix: "module-06/part-01/aip-module-06-part-01",
    revision: "2026-11-12-m06-p01-visual-order-v5",
    firstSlide: 1,
    count: 5,
    firstTitle: "Module 06 — Build AI applications on AWS",
    title: "AWS Application Architecture, Lambda, API Requests and Kinesis Events",
  },
  "06-02": {
    prefix: "module-06/part-02/aip-module-06-part-02",
    revision: "2026-11-12-m06-p02-visual-audit-v3",
    firstSlide: 6,
    count: 5,
    firstTitle: "When Lambda fits your workload",
    title: "Lambda Workload Choices, Five Patterns, Runtimes, Triggers and OpenSearch",
  },
  "06-03": {
    prefix: "module-06/part-03/aip-module-06-part-03",
    revision: "2026-11-12-m06-p03-visual-audit-v3",
    firstSlide: 11,
    count: 6,
    firstTitle: "Lambda as a data pipeline step",
    title: "Lambda Data Pipelines, Kinesis Batches, Bedrock and API Integrations",
  },
  "06-04": {
    prefix: "module-06/part-04/aip-module-06-part-04",
    revision: "2026-11-12-m06-p04-visual-audit-v3",
    firstSlide: 17,
    count: 8,
    firstTitle: "Direct API Gateway to AWS service",
    title: "API Gateway Routing and Security, AppConfig and Step Functions",
  },
  "06-05": {
    prefix: "module-06/part-05/aip-module-06-part-05",
    revision: "2026-11-12-m06-p05-visual-audit-v3",
    firstSlide: 25,
    count: 8,
    firstTitle: "Train a model with a state machine",
    title: "Step Functions Model Workflows, Resilience, Agent Controls and CI/CD",
  },
  "06-06": {
    prefix: "module-06/part-06/aip-module-06-part-06",
    revision: "2026-11-12-m06-p06-r2-audited-v3",
    firstSlide: 33,
    count: 9,
    firstTitle: "Find a failed pipeline stage",
    title: "CodePipeline Troubleshooting, CodeBuild, CodeDeploy and MLflow",
  },
  "06-07": {
    prefix: "module-06/part-07/aip-module-06-part-07",
    revision: "2026-11-12-m06-p07-r2-audited-v3",
    firstSlide: 42,
    count: 7,
    firstTitle: "AppSync for live AI application data",
    title: "AppSync Updates, Outposts, Wavelength and SQS Fundamentals",
  },
  "06-08": {
    prefix: "module-06/part-08/aip-module-06-part-08",
    revision: "2026-11-12-m06-p08-r2-audited-v3",
    firstSlide: 49,
    count: 7,
    firstTitle: "Produce and consume an SQS message",
    title: "SQS Operations, Amplify and EventBridge Routing",
  },
  "06-09": {
    prefix: "module-06/part-09/aip-module-06-part-09",
    revision: "2026-11-12-m06-p09-r2-audited-v4",
    firstSlide: 56,
    count: 5,
    firstTitle: "Discover events with a schema registry",
    title: "EventBridge Schema Registry, SNS Messaging Security and AppFlow",
  },
  "06-10": {
    prefix: "module-06/part-10/aip-module-06-part-10",
    revision: "2026-11-12-m06-p10-nontemplate-v3",
    firstSlide: 61,
    count: 3,
    firstTitle: "REST API or WebSocket API?",
    title: "API Gateway REST, WebSocket, Stages and Caching",
  },
  "06-11": {
    prefix: "module-06/part-11/aip-module-06-part-11",
    revision: "2026-11-12-m06-p11-nontemplate-v3",
    firstSlide: 64,
    count: 5,
    firstTitle: "Call Bedrock directly from Step Functions",
    title: "Bedrock Workflows, CodeBuild and CodeDeploy",
  },
  "06-12": {
    prefix: "module-06/part-12/aip-module-06-part-12",
    revision: "2026-11-12-m06-p12-nontemplate-v3",
    firstSlide: 69,
    count: 4,
    firstTitle: "Publish and filter SNS messages",
    title: "SNS Filtering, Mobile Push, AppFlow and SQS Operations",
  },
  "06-13": {
    prefix: "module-06/part-13/aip-module-06-part-13",
    revision: "2026-11-12-m06-p13-nontemplate-v3",
    firstSlide: 73,
    count: 4,
    firstTitle: "Route events with EventBridge rules",
    title: "EventBridge Routing, Reliability, Scheduler and Pipes",
  },
  "07-01": {
    prefix: "module-07/part-01/aip-module-07-part-01",
    revision: "2026-11-12-m07-p01-r2-visual-v2",
    firstSlide: 1,
    count: 5,
    firstTitle: "Bedrock Agent tracing",
    title: "Bedrock Agent Tracing and Evidence-Based Model Evaluation",
  },
  "07-02": {
    prefix: "module-07/part-02/aip-module-07-part-02",
    revision: "2026-11-12-m07-p02-r2-visual-v2",
    firstSlide: 6,
    count: 5,
    firstTitle: "Hybrid evaluation strategy",
    title: "Hybrid Evaluation, ROUGE, BLEU, BERTScore and Bedrock Jobs",
  },
  "07-03": {
    prefix: "module-07/part-03/aip-module-07-part-03",
    revision: "2026-11-12-m07-p03-r2-visual-v1",
    firstSlide: 11,
    count: 5,
    firstTitle: "Evaluation Strategy Selection",
    title: "Evaluation Strategy, Responsible AI and CloudWatch Logs",
  },
  "07-04": {
    prefix: "module-07/part-04/aip-module-07-part-04",
    revision: "2026-11-12-m07-p04-r2-visual-v1",
    firstSlide: 16,
    count: 5,
    firstTitle: "CloudWatch Logs sources and collection",
    title: "CloudWatch Log Collection, Insights, Exports and Alarms",
  },
  "07-05": {
    prefix: "module-07/part-05/aip-module-07-part-05",
    revision: "2026-11-12-m07-p05-r2-visual-v1",
    firstSlide: 21,
    count: 4,
    firstTitle: "CloudWatch alarm targets",
    title: "CloudWatch Alarm Actions, Composite Alarms and AI Quality Dashboards",
  },
  "07-06": {
    prefix: "module-07/part-06/aip-module-07-part-06",
    revision: "2026-11-12-m07-p06-r2-visual-v1",
    firstSlide: 25,
    count: 5,
    firstTitle: "X-Ray Distributed Tracing for GenAI",
    title: "X-Ray Tracing, Service Maps and AI Request Diagnostics",
  },
  "07-07": {
    prefix: "module-07/part-07/aip-module-07-part-07",
    revision: "2026-11-12-m07-p07-r2-visual-v1",
    firstSlide: 30,
    count: 5,
    firstTitle: "Bedrock and application observability boundaries",
    title: "Bedrock Telemetry, RAG Quality and Release Observability",
  },
  "07-08": {
    prefix: "module-07/part-08/aip-module-07-part-08",
    revision: "2026-11-12-m07-p08-r2-visual-v1",
    firstSlide: 35,
    count: 5,
    firstTitle: "X-Ray service map for a multi-service AI application",
    title: "X-Ray Bottlenecks, Retries, Correlation and Safe AI Telemetry",
  },
  "07-09": {
    prefix: "module-07/part-09/aip-module-07-part-09",
    revision: "2026-11-12-m07-p09-r2-visual-v1",
    firstSlide: 40,
    count: 5,
    firstTitle: "RAG Observability Pipeline",
    title: "RAG Observability, AI Incident Response and Production Readiness",
  },
  "07-10": {
    prefix: "module-07/part-10/aip-module-07-part-10",
    revision: "2026-11-12-m07-p10-r2-visual-v1",
    firstSlide: 45,
    count: 5,
    firstTitle: "Trace an Asynchronous AI Workflow",
    title: "Async AI Tracing, Model Fallback and Quality Scorecards",
  },
  "07-11": {
    prefix: "module-07/part-11/aip-module-07-part-11",
    revision: "2026-11-12-m07-p11-r2-visual-v1",
    firstSlide: 50,
    count: 5,
    firstTitle: "Operational runbook for model errors and throttles",
    title: "Operational AI Runbooks, Privacy, Governance and Bedrock Evaluation Lab",
  },
  "08-01": {
    prefix: "module-08/part-01/aip-module-08-part-01",
    revision: "2026-11-12-m08-p01-r2-visual-v1",
    firstSlide: 1,
    count: 5,
    firstTitle: "Security, Identity, and Compliance",
    title: "Secure GenAI Architecture, Least Privilege and Data Masking",
  },
  "08-02": {
    prefix: "module-08/part-02/aip-module-08-part-02",
    revision: "2026-11-12-m08-p02-r2-visual-v1",
    firstSlide: 6,
    count: 5,
    firstTitle: "Why salts matter",
    title: "Password Salts, IAM Users, Policy Evaluation and JSON Policies",
  },
  "08-03": {
    prefix: "module-08/part-03/aip-module-08-part-03",
    revision: "2026-11-12-m08-p03-r2-visual-v1",
    firstSlide: 11,
    count: 5,
    firstTitle: "IAM password policy",
    title: "IAM Password Policies, MFA, Service Roles and Identity Center",
  },
  "08-04": {
    prefix: "module-08/part-04/aip-module-08-part-04",
    revision: "2026-11-12-m08-p04-r2-visual-v1",
    firstSlide: 16,
    count: 5,
    firstTitle: "Fine-grained permissions with IAM Identity Center",
    title: "Identity Center Guardrails, Control Tower and Transport Encryption",
  },
  "08-05": {
    prefix: "module-08/part-05/aip-module-08-part-05",
    revision: "2026-11-12-m08-p05-r2-visual-v1",
    firstSlide: 21,
    count: 5,
    firstTitle: "AWS KMS envelope encryption",
    title: "KMS Envelope Encryption, Key Ownership, Snapshots and Macie",
  },
  "08-06": {
    prefix: "module-08/part-06/aip-module-08-part-06",
    revision: "2026-11-12-m08-p06-r2-visual-v1",
    firstSlide: 26,
    count: 5,
    firstTitle: "Multi-region secrets",
    title: "Multi-Region Secrets, Cognito User Pools and Tenant Isolation",
  },
  "08-07": {
    prefix: "module-08/part-07/aip-module-08-part-07",
    revision: "2026-11-12-m08-p07-topic-waf-v2",
    firstSlide: 31,
    count: 2,
    firstTitle: "AWS WAF request protection",
    title: "AWS WAF: Request Protection and Rule Evaluation",
  },
  "08-08": {
    prefix: "module-08/part-08/aip-module-08-part-08",
    revision: "2026-11-12-m08-p08-topic-vpc-v2",
    firstSlide: 33,
    count: 6,
    firstTitle: "VPCs and subnets",
    title: "VPC Fundamentals: Subnets, Gateways, Network Controls and Peering",
  },
  "08-09": {
    prefix: "module-08/part-09/aip-module-08-part-09",
    revision: "2026-11-12-m08-p09-topic-private-v2",
    firstSlide: 39,
    count: 6,
    firstTitle: "VPC endpoints",
    title: "Private AWS Access: VPC Endpoints, Hybrid Links and PrivateLink",
  },
  "08-10": {
    prefix: "module-08/part-10/aip-module-08-part-10",
    revision: "2026-11-12-m08-p10-topic-v1",
    firstSlide: 45,
    count: 6,
    firstTitle: "Identity decision guide",
    title: "Security Architecture Decision Guides and Integrated Review",
  },
  "08-11": {
    prefix: "module-08/part-11/aip-module-08-part-11",
    revision: "2026-11-12-m08-p11-topic-v1",
    firstSlide: 51,
    count: 3,
    firstTitle: "IAM Least-Privilege Lab Overview",
    title: "Hands-On Security Labs: Least Privilege, IAM Policy Simulator and SSE-KMS",
  },
  "09-01": {
    prefix: "module-09/part-01/aip-module-09-part-01",
    revision: "2026-11-13-m09-p01-r2-topic-v1",
    firstSlide: 1,
    count: 3,
    firstTitle: "Analytics for GenAI applications",
    title: "GenAI Analytics Architecture and Amazon Athena",
  },
  "09-02": {
    prefix: "module-09/part-02/aip-module-09-part-02",
    revision: "2026-11-13-m09-p02-r2-topic-v1",
    firstSlide: 4,
    count: 3,
    firstTitle: "Amazon EMR overview",
    title: "Amazon EMR: Distributed Processing, Usage Patterns and Frameworks",
  },
  "09-03": {
    prefix: "module-09/part-03/aip-module-09-part-03",
    revision: "2026-11-13-m09-p03-r2-topic-v1",
    firstSlide: 7,
    count: 5,
    firstTitle: "Amazon QuickSight architecture",
    title: "Amazon QuickSight: Data Sources, Query Modes and GenAI Dashboards",
  },
  "09-04": {
    prefix: "module-09/part-04/aip-module-09-part-04",
    revision: "2026-11-13-m09-p04-r2-topic-v1",
    firstSlide: 12,
    count: 5,
    firstTitle: "QuickSight account access",
    title: "QuickSight Security, Cross-Region Access and User Management",
  },
  "09-05": {
    prefix: "module-09/part-05/aip-module-09-part-05",
    revision: "2026-11-13-m09-p05-r2-topic-v1",
    firstSlide: 17,
    count: 4,
    firstTitle: "Kinesis Data Streams architecture",
    title: "Kinesis Data Streams: Shards, Replay, Capacity and GenAI Pipelines",
  },
  "09-06": {
    prefix: "module-09/part-06/aip-module-09-part-06",
    revision: "2026-11-13-m09-p06-r2-topic-v1",
    firstSlide: 21,
    count: 4,
    firstTitle: "Amazon MSK architecture",
    title: "Amazon MSK: Kafka Architecture, Partitioning and Independent Consumers",
  },
  "09-07": {
    prefix: "module-09/part-07/aip-module-09-part-07",
    revision: "2026-11-13-m09-p07-r2-topic-v1",
    firstSlide: 25,
    count: 2,
    firstTitle: "Choose an analytics stream",
    title: "Choosing Analytics Services and an Integrated GenAI Data Architecture",
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
  const cacheVersion = `?v=${encodeURIComponent(config.revision)}`;
  try {
    const manifestResult = await fetch(`${url}-manifest.json${cacheVersion}`, {
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

    const mp4Url = `${url}.mp4${cacheVersion}`;
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
      captionsUrl: `/api/aip-video-captions?module=${module}${part ? `&part=${part}` : ""}&rev=${encodeURIComponent(config.revision)}`,
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
