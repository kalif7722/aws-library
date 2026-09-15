# Shared service learning tracker

Updated: 2026-09-14

Status means the shared renderer has explicit service-specific Core service concepts and Application fit content.

## Compute and Containers

- AWS Auto Scaling — completed
- Amazon EC2 Auto Scaling — completed
- AWS Lambda — completed
- AWS Elastic Beanstalk — completed
- Amazon EC2 — completed
- AWS App Runner — completed
- AWS Batch — completed
- AWS Fargate — completed
- Amazon ECR — completed
- Amazon ECS — completed
- Amazon EKS — completed
- Amazon Lightsail — completed
- Amazon Outposts — completed
- AWS Wavelength — completed
- AWS Proton — pending
- AWS Serverless Application Repository — pending

## Databases

- Amazon RDS — completed
- Amazon Aurora — completed
- Amazon Aurora Serverless — completed
- Amazon DynamoDB — completed
- Amazon DocumentDB — completed
- Amazon ElastiCache — completed
- Amazon Neptune — completed
- Amazon Redshift — completed
- Amazon Timestream — completed
- Amazon Keyspaces — completed

## Developer Tools and Operations

- AWS CDK — completed
- AWS CodeArtifact — completed
- AWS CodeBuild — completed
- AWS CodeDeploy — completed
- AWS CodeGuru — completed
- AWS CodePipeline — completed
- AWS X-Ray — completed
- AWS CloudShell — completed
- Amazon CloudWatch — completed
- Amazon CloudWatch Logs — completed
- AWS Config — completed
- AWS Systems Manager — completed
- AWS Service Catalog — completed
- AWS Service Quotas — completed
- AWS CLI — completed
- AWS Control Tower — completed
- AWS Compute Optimizer — completed
- AWS Cost Anomaly Detection — completed
- AWS Health Dashboard — completed
- AWS License Manager — completed
- AWS Trusted Advisor — completed
- AWS Well-Architected Tool — completed

## IoT, AI and Media

- AWS IoT Core — completed
- AWS IoT Device Defender — completed
- AWS IoT Device Management — completed
- AWS IoT Greengrass — completed
- Amazon SageMaker AI — completed
- Amazon Comprehend — completed
- Amazon Lex — completed
- Amazon Rekognition — completed
- Amazon Textract — completed
- Amazon Transcribe — completed
- Amazon Polly — completed
- Amazon Nova — completed
- Amazon PartyRock — completed
- Amazon Fraud Detector — completed
- Amazon Kendra — completed
- Amazon Elastic Transcoder — pending
- Amazon Kinesis Video Streams — pending

## Networking and Content Delivery

- Amazon Route 53 — completed
- AWS Global Accelerator — completed
- Amazon CloudFront — completed
- Amazon VPC — completed
- AWS PrivateLink — completed
- Elastic Load Balancing — completed
- AWS Direct Connect — completed
- AWS Transit Gateway — completed
- AWS VPN — completed
- AWS Network Firewall — completed
- AWS App Mesh — completed

## Security and Identity

- AWS IAM — completed
- AWS IAM Identity Center — completed
- AWS KMS — completed
- Amazon Cognito — completed
- Amazon GuardDuty — completed
- AWS Artifact — completed
- AWS Audit Manager — completed
- AWS CloudHSM — completed
- AWS Directory Service — completed
- Amazon Detective — completed
- Amazon Inspector — completed
- AWS Firewall Manager — completed
- AWS Shield — completed
- AWS Certificate Manager — completed

## Migration and Transfer

- AWS Application Discovery Service — pending
- AWS Application Migration Service — pending
- AWS DMS — pending
- AWS DataSync — pending
- AWS Migration Hub — pending
- AWS Schema Conversion Tool — pending
- AWS Snow Family — pending
- AWS Transfer Family — pending

## Next batch

1. Finish Management and Governance pending items.
2. Finish IoT, AI and Media pending items.
3. Finish Security and Migration pending items.
4. Run a cross-course comparison to confirm every course uses this same map.

## Cross-course guide reuse audit

These official scope names are retained in course navigation, but currently reuse a related library guide because the library does not have a separate infographic for the scoped sub-service or naming variant. They must not be presented as duplicate service content:

- Amazon S3 Intelligent-Tiering → Amazon S3
- Amazon S3 Lifecycle policies → Amazon S3
- Amazon S3 Cross-Region Replication → Amazon S3
- AWS Chatbot → Amazon Q Developer in chat applications
- Amazon CloudWatch Logs → Amazon CloudWatch
- AWS Systems Manager → Systems Manager
- AWS Resource Access Manager → AWS Resource Access Manager (RAM)
- AWS Managed Service for Prometheus → Amazon Managed Service for Prometheus
- Amazon SageMaker family entries → Amazon SageMaker AI

The course sidebar now labels these as **View related guide**. A dedicated guide can be added later without changing the official course scope names.

## AIP Machine Learning and AI — core concepts and application fit

All 32 AIP Machine Learning services now have explicit service-specific content in `ServiceLearningContent.ts`; none use the category fallback for these two panels:

- Amazon Augmented AI — completed
- Amazon Bedrock — completed
- Amazon Bedrock AgentCore — completed
- Amazon Bedrock Knowledge Bases — completed
- Amazon Bedrock Prompt Management — completed
- Amazon Bedrock Prompt Flows — completed
- Amazon Comprehend — completed
- Amazon Comprehend Medical — completed
- Amazon Kendra — completed
- Amazon Lex — completed
- Amazon Nova — completed
- Amazon PartyRock — completed
- Amazon Personalize — completed
- Amazon Polly — completed
- Amazon Q Business — completed
- Amazon Q Business Apps — completed
- Amazon Q Developer — completed
- Amazon Quick — completed
- Amazon Rekognition — completed
- Amazon SageMaker AI — completed
- Amazon SageMaker Clarify — completed
- Amazon SageMaker Data Wrangler — completed
- Amazon SageMaker Ground Truth — completed
- Amazon SageMaker JumpStart — completed
- Amazon SageMaker Model Monitor — completed
- Amazon SageMaker Model Registry — completed
- Amazon SageMaker Neo — completed
- Amazon SageMaker Processing — completed
- Amazon SageMaker Unified Studio — completed
- Amazon Textract — completed
- Amazon Titan — completed
- Amazon Transcribe — completed

## Central insight remediation batches

Scope: central service repository data rendered by every course; SAP and AIP are audit consumers, not separate content owners. Content is aligned to the relevant AWS service documentation topics: identity/access, encryption, logging/audit, quotas, failure semantics, performance controls, pricing dimensions, and operational limits.

- Batch 01 — Data Exchange, EMR, Lake Formation, AppFlow, MQ, Budgets, CUR, Cost Explorer, Savings Plans, Outposts, Wavelength — completed
- Batch 02 — DocumentDB, ElastiCache, Keyspaces, Neptune, CodeGuru, X-Ray, WorkSpaces, Amplify, Device Farm, Pinpoint — completed
- Batch 03 — Fraud Detector, Nova, PartyRock, Elastic Transcoder, Cost Anomaly Detection, Health Dashboard, License Manager, Managed Grafana, Managed Service for Prometheus, Proton — completed
- Batch 04 — Service Quotas, Application Discovery Service, Schema Conversion Tool, Artifact, Audit Manager, Cognito, Directory Service, Resource Access Manager, Backup, Elastic Disaster Recovery — completed
- Batch 05 — FSx, Storage Gateway, Kiro, Titan, AWS Chatbot — completed

Central coverage validation: 46 previously generic services now have exact service-specific security/governance, design/optimization, cost, and watch-point records. Existing central family rules remain in place for the other SAP/AIP services.
