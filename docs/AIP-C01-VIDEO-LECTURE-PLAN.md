# AIP-C01 Course Video Lectures — Version 1 Plan

**Purpose:** Transform existing AWS course slides into visually grounded, instructor-quality narrated videos, using the approved Module 00 voice and style.

**Status:** Module 01 Parts 01–02 visually audited. Module 01 Part 02 covers slides 10–13; slide 14 is RAG and starts Part 03. R2 slide 4 was returned as an invalid image during QA. Other splits remain provisional. Slide counts below come from the course lesson map; they are NOT verified R2 asset inventories. Groupings and titles must be confirmed against actual images before recording.

## Delivery progress (2026-11-11)

- **M00 introduction:** corrected 12-slide, visual-aligned 13:31 video uploaded to R2; course Video Overview player is gated by manifest revision.
- **M01 Part 02 (slides 10–13):** the four original visuals were inspected, narration written against the actual diagrams, and a 6:21 MP4 uploaded to R2.
- **M01 Part 03 (slides 14–24):** all 11 original slide images passed the R2 inventory; visual-first script is committed and the video workflow is configured.
- **M01 Part 01 (slides 1–9):** R2 slide 04 is an **empty 0-byte WebP**. The same empty entry exists in the latest redesigned Module 01 slide package. An older backup contains a valid slide 04, but its visual treatment and service examples differ from the redesigned set. Keep Part 01 unreleased until this slide is restored or redesigned and technically reviewed.
- **Remaining videos:** no MP4 is considered complete merely because a script or workflow exists; publish only after upload and manifest verification.

## Core standards

- Keep original 16:9 WebP course slides full-screen, not new block diagrams; preserve existing neural voice (`en-US-AndrewNeural`, rate `-3%`) for continuity.
- Target 10–18 minutes per part, generally 8–15 slides; allow smaller focused topics or longer hands-on demos. Never split a multi-step architecture explanation awkwardly to meet a numeric target.
- Use visual-first narration: mention on-screen headings, icon names, arrow direction, the role of each service, decisions and trade-offs, and relevant real-world examples; do not read bullets verbatim.
- A slide's **actual image**, not merely the previous source-PDF mapping, is the source of truth. Confirm accuracy of text, diagrams, safety/security relationships, and pronunciation.
- Required deliverables per part: MP4, captions (.srt), full transcript, per-scene audio/visual timing manifest, chapter metadata, R2 preview asset, quality gate, and eventually a course website video player with resume.
- Stop a build when source images are missing; do not replace them with blank or synthesized unrelated images.

## Course module-level plan

| Module | Title | Mapped slide entries / visuals | Proposed video parts |
|---|---|---:|---:|
| 00 | Course Introduction | 12 | 1 |
| 01 | Generative AI Fundamentals and Bedrock | 59 | 7 |
| 02 | Managing Data for Generative AI | 144 | 14 |
| 03 | Agentic AI | 50 | 5 |
| 04 | Operations Efficiency and Optimization | 22 | 3 |
| 05 | Managing Models with SageMaker AI | 36 | 4 |
| 06 | More Tools for Building AI Applications | 76 | 7 |
| 07 | Governance and Quality Assurance | 52 | 6 |
| 08 | Security, Identity, and Compliance | 53 | 5 |
| 09 | Analytics | 26 | 3 |
| 10 | Compute, Containers and Customer Engagement | 17 | 2 |
| 11 | Database | 10 | 1 |
| 12 | Developer Tools | 18 | 2 |
| 13 | Machine Learning | 12 | 1 |
| 14 | Management and Governance | 15 | 2 |
| 15 | Migration and Data Transfer | 6 | 1 |
| 16 | Networking and Content Delivery | 18 | 2 |
| 17 | Storage | 20 | 2 |
| 18 | Exam Preparation | 22 | 2 |
| 19 | GenAI Troubleshooting | 74 visuals (12 labs) | 12 |
| **TOTAL** | | **668 mapped entries across 00–18 + 74 troubleshooting visuals** | **82 provisional parts** |

**Major source discrepancy:** Module 07 currently has 52 mapped lessons, but its module metadata also includes `lessonCount: 300`. Reconcile with actual R2 objects. Likewise `assetStatus: planned` does not prove slides are unavailable; it is only map metadata.

## Provisional part-by-part breakdown

### Module 00 — Course Introduction

- **AIP-M00-P01** · Slides 1–12: Course introduction and learning roadmap

### Module 01 — Generative AI Fundamentals and Bedrock

- **AIP-M01-P01** · Slides 1–9: GenAI fundamentals and Amazon Bedrock
- **AIP-M01-P02** · Slides 10–13: Fine-tuning, continued pre-training and LoRA
- **AIP-M01-P03** · Slides 14–24: RAG and Bedrock knowledge bases
- **AIP-M01-P04** · Slides 25–34: Chunking, embeddings, search and RAG evaluation
- **AIP-M01-P05** · Slides 35–43: Multimodal models, guardrails and prompt management
- **AIP-M01-P06** · Slides 44–54: Prompt patterns and application flows
- **AIP-M01-P07** · Slides 55–59: Responsible AI and Generative AI Lens

### Module 02 — Managing Data for Generative AI

- **AIP-M02-P01** · Slides 1–9: Data ingestion, segmentation and preparation
- **AIP-M02-P02** · Slides 10–17: Bedrock Data Automation
- **AIP-M02-P03** · Slides 18–28: SageMaker Data Wrangler
- **AIP-M02-P04** · Slides 29–40: Glue, pipelines and observability inputs
- **AIP-M02-P05** · Slides 41–45: Amazon Comprehend
- **AIP-M02-P06** · Slides 46–56: OpenSearch indexing and architecture
- **AIP-M02-P07** · Slides 57–68: OpenSearch operations, security and vector search
- **AIP-M02-P08** · Slides 69–77: Amazon S3 Vectors
- **AIP-M02-P09** · Slides 78–87: Aurora and relational data patterns
- **AIP-M02-P10** · Slides 88–99: DynamoDB data modeling and consistency
- **AIP-M02-P11** · Slides 100–112: DynamoDB operations and GenAI integration
- **AIP-M02-P12** · Slides 113–117: Reranking and retrieval improvements
- **AIP-M02-P13** · Slides 118–130: S3 storage, lifecycle and replication
- **AIP-M02-P14** · Slides 131–144: S3 encryption, logging and access controls

### Module 03 — Agentic AI

- **AIP-M03-P01** · Slides 1–14: Agent fundamentals and orchestration patterns
- **AIP-M03-P02** · Slides 15–20: Strands Agents and agent frameworks
- **AIP-M03-P03** · Slides 21–34: AgentCore runtime, memory, identity and evaluation
- **AIP-M03-P04** · Slides 35–40: Hands-on tools, MCP and human handoffs
- **AIP-M03-P05** · Slides 41–50: Amazon Q Business and Amazon Q Developer

### Module 04 — Operations Efficiency and Optimization

- **AIP-M04-P01** · Slides 1–8: Token cost, model selection and batching
- **AIP-M04-P02** · Slides 9–15: Caching, parallelism, routing and retrieval performance
- **AIP-M04-P03** · Slides 16–22: Profiling, reliability and cross-Region inference

### Module 05 — Managing Models with SageMaker AI

- **AIP-M05-P01** · Slides 1–14: SageMaker AI lifecycle and model deployment
- **AIP-M05-P02** · Slides 15–20: Ground Truth and human labeling
- **AIP-M05-P03** · Slides 21–31: Monitoring, registry, approval and lineage
- **AIP-M05-P04** · Slides 32–36: Neo, Unified Studio and SageMaker Pipelines

### Module 06 — More Tools for Building AI Applications

- **AIP-M06-P01** · Slides 1–16: Lambda and serverless applications
- **AIP-M06-P02** · Slides 17–23: API Gateway integrations for GenAI
- **AIP-M06-P03** · Slides 24–33: Step Functions orchestration
- **AIP-M06-P04** · Slides 34–49: CI/CD, CodeBuild, CodeDeploy and MLflow
- **AIP-M06-P05** · Slides 50–56: Hybrid and edge services
- **AIP-M06-P06** · Slides 57–63: SQS decoupling and scaling
- **AIP-M06-P07** · Slides 64–76: Amplify, EventBridge, SNS and AppFlow

### Module 07 — Governance and Quality Assurance

- **AIP-M07-P01** · Slides 1–11: Quality criteria and evaluation strategies
- **AIP-M07-P02** · Slides 12–16: LLM-as-a-judge and responsible AI
- **AIP-M07-P03** · Slides 17–29: CloudWatch logs, metrics and alarms
- **AIP-M07-P04** · Slides 30–36: CloudTrail auditing
- **AIP-M07-P05** · Slides 37–44: X-Ray tracing
- **AIP-M07-P06** · Slides 45–52: Lake Formation permissions and governance

### Module 08 — Security, Identity, and Compliance

- **AIP-M08-P01** · Slides 1–6: Privacy, masking and data protection
- **AIP-M08-P02** · Slides 7–19: IAM and IAM Identity Center
- **AIP-M08-P03** · Slides 20–30: Encryption and AWS KMS
- **AIP-M08-P04** · Slides 31–38: Secrets Manager and Cognito
- **AIP-M08-P05** · Slides 39–53: WAF, VPC security, endpoints and PrivateLink

### Module 09 — Analytics

- **AIP-M09-P01** · Slides 1–7: Athena and EMR
- **AIP-M09-P02** · Slides 8–19: QuickSight analytics and security
- **AIP-M09-P03** · Slides 20–26: Kinesis Data Streams and Amazon MSK

### Module 10 — Compute, Containers and Customer Engagement

- **AIP-M10-P01** · Slides 1–6: App Runner and EC2
- **AIP-M10-P02** · Slides 7–17: Docker, ECS, EKS, Lex and Connect

### Module 11 — Database

- **AIP-M11-P01** · Slides 1–10: DocumentDB, caching, MemoryDB and Neptune

### Module 12 — Developer Tools

- **AIP-M12-P01** · Slides 1–10: AWS CDK, SAM, CLI and SDK
- **AIP-M12-P02** · Slides 11–18: CloudFormation and CodeArtifact

### Module 13 — Machine Learning

- **AIP-M13-P01** · Slides 1–12: AI/ML services: A2I, Kendra, Lex, Rekognition, Textract, Transcribe

### Module 14 — Management and Governance

- **AIP-M14-P01** · Slides 1–9: Auto Scaling and cost optimization tools
- **AIP-M14-P02** · Slides 10–15: Managed Grafana and Systems Manager

### Module 15 — Migration and Data Transfer

- **AIP-M15-P01** · Slides 1–6: DataSync and AWS Transfer Family

### Module 16 — Networking and Content Delivery

- **AIP-M16-P01** · Slides 1–6: CloudFront and content delivery
- **AIP-M16-P02** · Slides 7–18: Load balancing, Global Accelerator and Route 53

### Module 17 — Storage

- **AIP-M17-P01** · Slides 1–11: EBS and EFS storage choices
- **AIP-M17-P02** · Slides 12–20: Production GenAI architecture decisions

### Module 18 — Exam Preparation

- **AIP-M18-P01** · Slides 1–13: Exam types, preparation tools and strategies
- **AIP-M18-P02** · Slides 14–22: Certification paths and final review

### Module 19 — GenAI Troubleshooting

- **AIP-M19-P01**: Troubleshooting lab 1 — one guided case per video
- **AIP-M19-P02**: Troubleshooting lab 2 — one guided case per video
- **AIP-M19-P03**: Troubleshooting lab 3 — one guided case per video
- **AIP-M19-P04**: Troubleshooting lab 4 — one guided case per video
- **AIP-M19-P05**: Troubleshooting lab 5 — one guided case per video
- **AIP-M19-P06**: Troubleshooting lab 6 — one guided case per video
- **AIP-M19-P07**: Troubleshooting lab 7 — one guided case per video
- **AIP-M19-P08**: Troubleshooting lab 8 — one guided case per video
- **AIP-M19-P09**: Troubleshooting lab 9 — one guided case per video
- **AIP-M19-P10**: Troubleshooting lab 10 — one guided case per video
- **AIP-M19-P11**: Troubleshooting lab 11 — one guided case per video
- **AIP-M19-P12**: Troubleshooting lab 12 — one guided case per video

## Production and QA pipeline

1. **Actual image inventory** — list R2 slide object keys per module; check availability, numbering, duplicates, visual text, size and meaningful order. Correct stale mapping before narrating.
2. **Topic segmentation** — group adjacent visuals into coherent learning objectives; keep full workflows, diagrams and comparison sequences together; revise provisional boundaries if the real images differ.
3. **Visual-by-visual annotation** — capture exact slide title, important callouts, reading order, arrow/relationship descriptions, technical constraints, example details and desired transition to the next slide.
4. **Lecture scripting** — write natural instructor explanations linked to each cue, including why the service or pattern matters; add analogies only when appropriate; avoid generic paragraphs unrelated to the active slide.
5. **Technical and visual QA** — compare every script against its original image; verify current AWS terminology, pronunciation and diagrams. Have a reviewer flag ambiguous visuals or incorrect claims.
6. **Audio and rendering** — synthesize scene audio with the approved voice, build synchronized 1080p chapters, captions and transcript; make previews only until accepted.
7. **Video QA** — automatically verify that each MP4 has the expected scene count, complete audio, correct frame duration and captions; then inspect representative frames at every transition and listen for smooth teaching flow.
8. **Publish and track** — after approval, upload to R2 and add a course module section called `Video Lectures` with numbered parts, topic titles, duration, chapters, resume, speed control, captions and links to corresponding slide pages.

## Launch sequence

- **Pilot:** AIP-M01-P01 and AIP-M01-P02; review actual source images and align voiceover at the diagram level before expanding.
- **Then:** Complete remaining M01 parts, followed by M02 and M03, checking quality after each completed part.
- **Later:** Scale across the rest of AIP with automated manifests; use the same platform for SAP, SAA and DVA after topic-based mapping of their own exact slides.
- **Publishing gate:** A complete playable QA-passed video is mandatory; a committed script or workflow is not a completed video.
