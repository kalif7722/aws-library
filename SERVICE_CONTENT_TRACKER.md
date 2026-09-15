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

## SAP + Generative AI Developer Professional central content tracker

This is a course-section audit of the central service repository. SAP-C02 and AIP-C01 provide scope/category navigation only; service learning content is owned centrally and reused by every course. Status applies to the central Security & Governance, Design & Optimization, Cost, and Service-specific Watch Points sections.

Official course references:
- SAP-C02: https://aws-library.kalifs.workers.dev/courses/aws-solutions-architect-professional
- Generative AI Developer Professional / AIP-C01: https://aws-library.kalifs.workers.dev/courses/aws-generative-ai-developer-professional

The service-specific records are rebuilt from the relevant AWS service user guides, API/reference material, service FAQs, pricing dimensions, and Well-Architected guidance. They paraphrase service-specific control points: identity and resource permissions, encryption, audit/logging, service limits, failure semantics, performance controls, billing dimensions, and operational constraints.

Summary: SAP 19 sections / 157 services; AIP 13 sections / 111 services; 193 unique central insight records rebuilt as exact service records. No SAP/AIP service uses a family-level insight fallback. A service may appear in both courses but has one central record.

### SAP-C02

#### 01 Analytics (11)

| Service | Central insight status |
|---|---|
| Amazon Athena | Rebuilt — exact unique service record |
| AWS Data Exchange | Rebuilt — exact unique service record |
| Amazon Data Firehose | Rebuilt — exact unique service record |
| Amazon EMR | Rebuilt — exact unique service record |
| AWS Glue | Rebuilt — exact unique service record |
| Amazon Kinesis Data Streams | Rebuilt — exact unique service record |
| AWS Lake Formation | Rebuilt — exact unique service record |
| Amazon Managed Service for Apache Flink | Rebuilt — exact unique service record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Rebuilt — exact unique service record |
| Amazon OpenSearch Service | Rebuilt — exact unique service record |
| Amazon QuickSight | Rebuilt — exact unique service record |

#### 02 Application Integration (7)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Rebuilt — exact unique service record |
| AWS AppSync | Rebuilt — exact unique service record |
| Amazon EventBridge | Rebuilt — exact unique service record |
| Amazon MQ | Rebuilt — exact unique service record |
| Amazon SNS | Rebuilt — exact unique service record |
| Amazon SQS | Rebuilt — exact unique service record |
| AWS Step Functions | Rebuilt — exact unique service record |

#### 03 Blockchain (1)

| Service | Central insight status |
|---|---|
| Amazon Managed Blockchain | Rebuilt — exact unique service record |

#### 04 Business Applications (1)

| Service | Central insight status |
|---|---|
| Amazon SES | Rebuilt — exact unique service record |

#### 05 Cloud Financial Management (4)

| Service | Central insight status |
|---|---|
| AWS Budgets | Rebuilt — exact unique service record |
| AWS Cost and Usage Report | Rebuilt — exact unique service record |
| AWS Cost Explorer | Rebuilt — exact unique service record |
| Savings Plans | Rebuilt — exact unique service record |

#### 06 Compute (11)

| Service | Central insight status |
|---|---|
| AWS App Runner | Rebuilt — exact unique service record |
| AWS Auto Scaling | Rebuilt — exact unique service record |
| AWS Batch | Rebuilt — exact unique service record |
| AWS Elastic Beanstalk | Rebuilt — exact unique service record |
| Amazon EC2 | Rebuilt — exact unique service record |
| Amazon EC2 Auto Scaling | Rebuilt — exact unique service record |
| AWS Fargate | Rebuilt — exact unique service record |
| AWS Lambda | Rebuilt — exact unique service record |
| Amazon Lightsail | Rebuilt — exact unique service record |
| AWS Outposts | Rebuilt — exact unique service record |
| AWS Wavelength | Rebuilt — exact unique service record |

#### 07 Containers (6)

| Service | Central insight status |
|---|---|
| Amazon ECR | Rebuilt — exact unique service record |
| Amazon ECS | Rebuilt — exact unique service record |
| Amazon ECS Anywhere | Rebuilt — exact unique service record |
| Amazon EKS | Rebuilt — exact unique service record |
| Amazon EKS Anywhere | Rebuilt — exact unique service record |
| Amazon EKS Distro | Rebuilt — exact unique service record |

#### 08 Database (10)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Rebuilt — exact unique service record |
| Amazon Aurora Serverless | Rebuilt — exact unique service record |
| Amazon DocumentDB | Rebuilt — exact unique service record |
| Amazon DynamoDB | Rebuilt — exact unique service record |
| Amazon ElastiCache | Rebuilt — exact unique service record |
| Amazon Keyspaces | Rebuilt — exact unique service record |
| Amazon Neptune | Rebuilt — exact unique service record |
| Amazon RDS | Rebuilt — exact unique service record |
| Amazon Redshift | Rebuilt — exact unique service record |
| Amazon Timestream | Rebuilt — exact unique service record |

#### 09 Developer Tools (8)

| Service | Central insight status |
|---|---|
| AWS CDK | Rebuilt — exact unique service record |
| AWS CodeArtifact | Rebuilt — exact unique service record |
| AWS CodeBuild | Rebuilt — exact unique service record |
| AWS CodeDeploy | Rebuilt — exact unique service record |
| Amazon CodeGuru | Rebuilt — exact unique service record |
| AWS CodePipeline | Rebuilt — exact unique service record |
| AWS Tools and SDKs | Rebuilt — exact unique service record |
| AWS X-Ray | Rebuilt — exact unique service record |

#### 10 End User Computing (2)

| Service | Central insight status |
|---|---|
| Amazon AppStream 2.0 | Rebuilt — exact unique service record |
| Amazon WorkSpaces | Rebuilt — exact unique service record |

#### 11 Frontend Web and Mobile (4)

| Service | Central insight status |
|---|---|
| AWS Amplify | Rebuilt — exact unique service record |
| Amazon API Gateway | Rebuilt — exact unique service record |
| AWS Device Farm | Rebuilt — exact unique service record |
| Amazon Pinpoint | Rebuilt — exact unique service record |

#### 12 Internet of Things (IoT) (8)

| Service | Central insight status |
|---|---|
| AWS IoT Core | Rebuilt — exact unique service record |
| AWS IoT Device Defender | Rebuilt — exact unique service record |
| AWS IoT Device Management | Rebuilt — exact unique service record |
| AWS IoT Events | Rebuilt — exact unique service record |
| AWS IoT Greengrass | Rebuilt — exact unique service record |
| AWS IoT SiteWise | Rebuilt — exact unique service record |
| AWS IoT Things Graph | Rebuilt — exact unique service record |
| AWS IoT 1-Click | Rebuilt — exact unique service record |

#### 13 Machine Learning (15)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Rebuilt — exact unique service record |
| Amazon Comprehend | Rebuilt — exact unique service record |
| Amazon Comprehend Medical | Rebuilt — exact unique service record |
| Amazon Fraud Detector | Rebuilt — exact unique service record |
| Amazon Kendra | Rebuilt — exact unique service record |
| Amazon Lex | Rebuilt — exact unique service record |
| Amazon Nova | Rebuilt — exact unique service record |
| Amazon PartyRock | Rebuilt — exact unique service record |
| Amazon Personalize | Rebuilt — exact unique service record |
| Amazon Polly | Rebuilt — exact unique service record |
| Amazon Rekognition | Rebuilt — exact unique service record |
| Amazon SageMaker AI | Rebuilt — exact unique service record |
| Amazon Textract | Rebuilt — exact unique service record |
| Amazon Transcribe | Rebuilt — exact unique service record |
| Amazon Translate | Rebuilt — exact unique service record |

#### 14 Media Services (2)

| Service | Central insight status |
|---|---|
| Amazon Elastic Transcoder | Rebuilt — exact unique service record |
| Amazon Kinesis Video Streams | Rebuilt — exact unique service record |

#### 15 Management and Governance (21)

| Service | Central insight status |
|---|---|
| AWS CloudFormation | Rebuilt — exact unique service record |
| AWS CloudTrail | Rebuilt — exact unique service record |
| Amazon CloudWatch | Rebuilt — exact unique service record |
| Amazon CloudWatch Logs | Rebuilt — exact unique service record |
| AWS CLI | Rebuilt — exact unique service record |
| AWS Compute Optimizer | Rebuilt — exact unique service record |
| AWS Config | Rebuilt — exact unique service record |
| AWS Control Tower | Rebuilt — exact unique service record |
| AWS Cost Anomaly Detection | Rebuilt — exact unique service record |
| AWS Health Dashboard | Rebuilt — exact unique service record |
| AWS License Manager | Rebuilt — exact unique service record |
| Amazon Managed Grafana | Rebuilt — exact unique service record |
| Amazon Managed Service for Prometheus | Rebuilt — exact unique service record |
| AWS Management Console | Rebuilt — exact unique service record |
| AWS Organizations | Rebuilt — exact unique service record |
| AWS Proton | Rebuilt — exact unique service record |
| AWS Service Catalog | Rebuilt — exact unique service record |
| AWS Service Quotas | Rebuilt — exact unique service record |
| AWS Systems Manager | Rebuilt — exact unique service record |
| AWS Trusted Advisor | Rebuilt — exact unique service record |
| AWS Well-Architected Tool | Rebuilt — exact unique service record |

#### 16 Migration and Transfer (8)

| Service | Central insight status |
|---|---|
| AWS Application Discovery Service | Rebuilt — exact unique service record |
| AWS Application Migration Service | Rebuilt — exact unique service record |
| AWS DMS | Rebuilt — exact unique service record |
| AWS DataSync | Rebuilt — exact unique service record |
| AWS Migration Hub | Rebuilt — exact unique service record |
| AWS Schema Conversion Tool | Rebuilt — exact unique service record |
| AWS Snow Family | Rebuilt — exact unique service record |
| AWS Transfer Family | Rebuilt — exact unique service record |

#### 17 Networking and Content Delivery (9)

| Service | Central insight status |
|---|---|
| Amazon CloudFront | Rebuilt — exact unique service record |
| AWS Direct Connect | Rebuilt — exact unique service record |
| Elastic Load Balancing | Rebuilt — exact unique service record |
| AWS Global Accelerator | Rebuilt — exact unique service record |
| AWS PrivateLink | Rebuilt — exact unique service record |
| Amazon Route 53 | Rebuilt — exact unique service record |
| AWS Transit Gateway | Rebuilt — exact unique service record |
| Amazon VPC | Rebuilt — exact unique service record |
| AWS VPN | Rebuilt — exact unique service record |

#### 18 Security, Identity, and Compliance (21)

| Service | Central insight status |
|---|---|
| AWS Artifact | Rebuilt — exact unique service record |
| AWS Audit Manager | Rebuilt — exact unique service record |
| AWS Certificate Manager | Rebuilt — exact unique service record |
| AWS CloudHSM | Rebuilt — exact unique service record |
| Amazon Cognito | Rebuilt — exact unique service record |
| Amazon Detective | Rebuilt — exact unique service record |
| AWS Directory Service | Rebuilt — exact unique service record |
| AWS Firewall Manager | Rebuilt — exact unique service record |
| Amazon GuardDuty | Rebuilt — exact unique service record |
| AWS IAM Identity Center | Rebuilt — exact unique service record |
| AWS IAM | Rebuilt — exact unique service record |
| Amazon Inspector | Rebuilt — exact unique service record |
| AWS KMS | Rebuilt — exact unique service record |
| Amazon Macie | Rebuilt — exact unique service record |
| AWS Network Firewall | Rebuilt — exact unique service record |
| AWS Resource Access Manager | Rebuilt — exact unique service record |
| AWS Secrets Manager | Rebuilt — exact unique service record |
| AWS Security Hub | Rebuilt — exact unique service record |
| AWS Security Token Service | Rebuilt — exact unique service record |
| AWS Shield | Rebuilt — exact unique service record |
| AWS WAF | Rebuilt — exact unique service record |

#### 19 Storage (8)

| Service | Central insight status |
|---|---|
| AWS Backup | Rebuilt — exact unique service record |
| Amazon EBS | Rebuilt — exact unique service record |
| AWS Elastic Disaster Recovery | Rebuilt — exact unique service record |
| Amazon EFS | Rebuilt — exact unique service record |
| Amazon FSx | Rebuilt — exact unique service record |
| Amazon S3 | Rebuilt — exact unique service record |
| Amazon S3 Glacier | Rebuilt — exact unique service record |
| AWS Storage Gateway | Rebuilt — exact unique service record |


### AIP-C01

#### 01 Analytics (7)

| Service | Central insight status |
|---|---|
| Amazon Athena | Rebuilt — exact unique service record |
| Amazon EMR | Rebuilt — exact unique service record |
| AWS Glue | Rebuilt — exact unique service record |
| Amazon Kinesis | Rebuilt — exact unique service record |
| Amazon OpenSearch Service | Rebuilt — exact unique service record |
| Amazon Quick Sight | Rebuilt — exact unique service record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Rebuilt — exact unique service record |

#### 02 Application Integration (6)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Rebuilt — exact unique service record |
| AWS AppConfig | Rebuilt — exact unique service record |
| Amazon EventBridge | Rebuilt — exact unique service record |
| Amazon SNS | Rebuilt — exact unique service record |
| Amazon SQS | Rebuilt — exact unique service record |
| AWS Step Functions | Rebuilt — exact unique service record |

#### 03 Compute (6)

| Service | Central insight status |
|---|---|
| AWS App Runner | Rebuilt — exact unique service record |
| Amazon EC2 | Rebuilt — exact unique service record |
| AWS Lambda | Rebuilt — exact unique service record |
| AWS Lambda@Edge | Rebuilt — exact unique service record |
| AWS Outposts | Rebuilt — exact unique service record |
| AWS Wavelength | Rebuilt — exact unique service record |

#### 04 Containers (4)

| Service | Central insight status |
|---|---|
| Amazon ECR | Rebuilt — exact unique service record |
| Amazon ECS | Rebuilt — exact unique service record |
| Amazon EKS | Rebuilt — exact unique service record |
| AWS Fargate | Rebuilt — exact unique service record |

#### 05 Customer Engagement (1)

| Service | Central insight status |
|---|---|
| Amazon Connect | Rebuilt — exact unique service record |

#### 06 Database (7)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Rebuilt — exact unique service record |
| Amazon DocumentDB | Rebuilt — exact unique service record |
| Amazon DynamoDB | Rebuilt — exact unique service record |
| Amazon DynamoDB Streams | Rebuilt — exact unique service record |
| Amazon ElastiCache | Rebuilt — exact unique service record |
| Amazon Neptune | Rebuilt — exact unique service record |
| Amazon RDS | Rebuilt — exact unique service record |

#### 07 Developer Tools (11)

| Service | Central insight status |
|---|---|
| AWS Amplify | Rebuilt — exact unique service record |
| AWS CDK | Rebuilt — exact unique service record |
| AWS CLI | Rebuilt — exact unique service record |
| AWS CloudFormation | Rebuilt — exact unique service record |
| AWS CodeArtifact | Rebuilt — exact unique service record |
| AWS CodeBuild | Rebuilt — exact unique service record |
| AWS CodeDeploy | Rebuilt — exact unique service record |
| AWS CodePipeline | Rebuilt — exact unique service record |
| Kiro | Rebuilt — exact unique service record |
| AWS Tools and SDKs | Rebuilt — exact unique service record |
| AWS X-Ray | Rebuilt — exact unique service record |

#### 08 Machine Learning (32)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Rebuilt — exact unique service record |
| Amazon Bedrock | Rebuilt — exact unique service record |
| Amazon Bedrock AgentCore | Rebuilt — exact unique service record |
| Amazon Bedrock Knowledge Bases | Rebuilt — exact unique service record |
| Amazon Bedrock Prompt Management | Rebuilt — exact unique service record |
| Amazon Bedrock Prompt Flows | Rebuilt — exact unique service record |
| Amazon Comprehend | Rebuilt — exact unique service record |
| Amazon Comprehend Medical | Rebuilt — exact unique service record |
| Amazon Kendra | Rebuilt — exact unique service record |
| Amazon Lex | Rebuilt — exact unique service record |
| Amazon Nova | Rebuilt — exact unique service record |
| Amazon PartyRock | Rebuilt — exact unique service record |
| Amazon Personalize | Rebuilt — exact unique service record |
| Amazon Polly | Rebuilt — exact unique service record |
| Amazon Q Business | Rebuilt — exact unique service record |
| Amazon Q Business Apps | Rebuilt — exact unique service record |
| Amazon Q Developer | Rebuilt — exact unique service record |
| Amazon Quick | Rebuilt — exact unique service record |
| Amazon Rekognition | Rebuilt — exact unique service record |
| Amazon SageMaker AI | Rebuilt — exact unique service record |
| Amazon SageMaker Clarify | Rebuilt — exact unique service record |
| Amazon SageMaker Data Wrangler | Rebuilt — exact unique service record |
| Amazon SageMaker Ground Truth | Rebuilt — exact unique service record |
| Amazon SageMaker JumpStart | Rebuilt — exact unique service record |
| Amazon SageMaker Model Monitor | Rebuilt — exact unique service record |
| Amazon SageMaker Model Registry | Rebuilt — exact unique service record |
| Amazon SageMaker Neo | Rebuilt — exact unique service record |
| Amazon SageMaker Processing | Rebuilt — exact unique service record |
| Amazon SageMaker Unified Studio | Rebuilt — exact unique service record |
| Amazon Textract | Rebuilt — exact unique service record |
| Amazon Titan | Rebuilt — exact unique service record |
| Amazon Transcribe | Rebuilt — exact unique service record |

#### 09 Management and Governance (12)

| Service | Central insight status |
|---|---|
| AWS Auto Scaling | Rebuilt — exact unique service record |
| AWS Chatbot | Rebuilt — exact unique service record |
| AWS CloudTrail | Rebuilt — exact unique service record |
| Amazon CloudWatch | Rebuilt — exact unique service record |
| Amazon CloudWatch Logs | Rebuilt — exact unique service record |
| Amazon CloudWatch Synthetics | Rebuilt — exact unique service record |
| AWS Cost Anomaly Detection | Rebuilt — exact unique service record |
| AWS Cost Explorer | Rebuilt — exact unique service record |
| Amazon Managed Grafana | Rebuilt — exact unique service record |
| AWS Service Catalog | Rebuilt — exact unique service record |
| AWS Systems Manager | Rebuilt — exact unique service record |
| AWS Well-Architected Tool | Rebuilt — exact unique service record |

#### 10 Migration and Transfer (2)

| Service | Central insight status |
|---|---|
| AWS DataSync | Rebuilt — exact unique service record |
| AWS Transfer Family | Rebuilt — exact unique service record |

#### 11 Networking and Content Delivery (8)

| Service | Central insight status |
|---|---|
| Amazon API Gateway | Rebuilt — exact unique service record |
| AWS AppSync | Rebuilt — exact unique service record |
| Amazon CloudFront | Rebuilt — exact unique service record |
| Elastic Load Balancing (ELB) | Rebuilt — exact unique service record |
| AWS Global Accelerator | Rebuilt — exact unique service record |
| AWS PrivateLink | Rebuilt — exact unique service record |
| Amazon Route 53 | Rebuilt — exact unique service record |
| Amazon VPC | Rebuilt — exact unique service record |

#### 12 Security, Identity, and Compliance (9)

| Service | Central insight status |
|---|---|
| Amazon Cognito | Rebuilt — exact unique service record |
| AWS Encryption SDK | Rebuilt — exact unique service record |
| IAM | Rebuilt — exact unique service record |
| IAM Access Analyzer | Rebuilt — exact unique service record |
| IAM Identity Center | Rebuilt — exact unique service record |
| AWS KMS | Rebuilt — exact unique service record |
| Amazon Macie | Rebuilt — exact unique service record |
| AWS Secrets Manager | Rebuilt — exact unique service record |
| AWS WAF | Rebuilt — exact unique service record |

#### 13 Storage (6)

| Service | Central insight status |
|---|---|
| Amazon EBS | Rebuilt — exact unique service record |
| Amazon EFS | Rebuilt — exact unique service record |
| Amazon S3 | Rebuilt — exact unique service record |
| Amazon S3 Intelligent-Tiering | Rebuilt — exact unique service record |
| Amazon S3 Lifecycle policies | Rebuilt — exact unique service record |
| Amazon S3 Cross-Region Replication | Rebuilt — exact unique service record |



Central rewrite validation: each of the 193 SAP/AIP services now has a distinct exact record for Security & Governance, Design & Optimization, Cost, and Service-specific Watch Points. Family rules remain only as a safeguard for services outside these two course scopes.
