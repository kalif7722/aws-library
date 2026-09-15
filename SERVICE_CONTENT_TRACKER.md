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

The service-specific records are compiled in batches and are intended to be grounded in each service’s AWS documentation topics: identity and resource permissions, encryption, audit/logging, service limits, failure semantics, performance controls, billing dimensions, and operational constraints.

Summary: SAP 19 sections / 157 services; AIP 13 sections / 111 services; 193 unique central insight records completed. A service may appear in both courses but has one central record.

### SAP-C02

#### 01 Analytics (11)

| Service | Central insight status |
|---|---|
| Amazon Athena | Completed — central service-specific record |
| AWS Data Exchange | Completed — exact central record |
| Amazon Data Firehose | Completed — central service-specific record |
| Amazon EMR | Completed — exact central record |
| AWS Glue | Completed — central service-specific record |
| Amazon Kinesis Data Streams | Completed — central service-specific record |
| AWS Lake Formation | Completed — exact central record |
| Amazon Managed Service for Apache Flink | Completed — central service-specific record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Completed — central service-specific record |
| Amazon OpenSearch Service | Completed — central service-specific record |
| Amazon QuickSight | Completed — central service-specific record |

#### 02 Application Integration (7)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Completed — exact central record |
| AWS AppSync | Completed — central service-specific record |
| Amazon EventBridge | Completed — central service-specific record |
| Amazon MQ | Completed — exact central record |
| Amazon SNS | Completed — central service-specific record |
| Amazon SQS | Completed — central service-specific record |
| AWS Step Functions | Completed — central service-specific record |

#### 03 Blockchain (1)

| Service | Central insight status |
|---|---|
| Amazon Managed Blockchain | Completed — central service-specific record |

#### 04 Business Applications (1)

| Service | Central insight status |
|---|---|
| Amazon SES | Completed — central service-specific record |

#### 05 Cloud Financial Management (4)

| Service | Central insight status |
|---|---|
| AWS Budgets | Completed — exact central record |
| AWS Cost and Usage Report | Completed — exact central record |
| AWS Cost Explorer | Completed — exact central record |
| Savings Plans | Completed — exact central record |

#### 06 Compute (11)

| Service | Central insight status |
|---|---|
| AWS App Runner | Completed — central service-specific record |
| AWS Auto Scaling | Completed — central service-specific record |
| AWS Batch | Completed — central service-specific record |
| AWS Elastic Beanstalk | Completed — central service-specific record |
| Amazon EC2 | Completed — central service-specific record |
| Amazon EC2 Auto Scaling | Completed — central service-specific record |
| AWS Fargate | Completed — central service-specific record |
| AWS Lambda | Completed — central service-specific record |
| Amazon Lightsail | Completed — central service-specific record |
| AWS Outposts | Completed — exact central record |
| AWS Wavelength | Completed — exact central record |

#### 07 Containers (6)

| Service | Central insight status |
|---|---|
| Amazon ECR | Completed — central service-specific record |
| Amazon ECS | Completed — central service-specific record |
| Amazon ECS Anywhere | Completed — central service-specific record |
| Amazon EKS | Completed — central service-specific record |
| Amazon EKS Anywhere | Completed — central service-specific record |
| Amazon EKS Distro | Completed — central service-specific record |

#### 08 Database (10)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Completed — central service-specific record |
| Amazon Aurora Serverless | Completed — central service-specific record |
| Amazon DocumentDB | Completed — exact central record |
| Amazon DynamoDB | Completed — central service-specific record |
| Amazon ElastiCache | Completed — exact central record |
| Amazon Keyspaces | Completed — exact central record |
| Amazon Neptune | Completed — exact central record |
| Amazon RDS | Completed — central service-specific record |
| Amazon Redshift | Completed — central service-specific record |
| Amazon Timestream | Completed — central service-specific record |

#### 09 Developer Tools (8)

| Service | Central insight status |
|---|---|
| AWS CDK | Completed — central service-specific record |
| AWS CodeArtifact | Completed — central service-specific record |
| AWS CodeBuild | Completed — central service-specific record |
| AWS CodeDeploy | Completed — central service-specific record |
| Amazon CodeGuru | Completed — exact central record |
| AWS CodePipeline | Completed — central service-specific record |
| AWS Tools and SDKs | Completed — central service-specific record |
| AWS X-Ray | Completed — exact central record |

#### 10 End User Computing (2)

| Service | Central insight status |
|---|---|
| Amazon AppStream 2.0 | Completed — central service-specific record |
| Amazon WorkSpaces | Completed — exact central record |

#### 11 Frontend Web and Mobile (4)

| Service | Central insight status |
|---|---|
| AWS Amplify | Completed — exact central record |
| Amazon API Gateway | Completed — central service-specific record |
| AWS Device Farm | Completed — exact central record |
| Amazon Pinpoint | Completed — exact central record |

#### 12 Internet of Things (IoT) (8)

| Service | Central insight status |
|---|---|
| AWS IoT Core | Completed — central service-specific record |
| AWS IoT Device Defender | Completed — central service-specific record |
| AWS IoT Device Management | Completed — central service-specific record |
| AWS IoT Events | Completed — central service-specific record |
| AWS IoT Greengrass | Completed — central service-specific record |
| AWS IoT SiteWise | Completed — central service-specific record |
| AWS IoT Things Graph | Completed — central service-specific record |
| AWS IoT 1-Click | Completed — central service-specific record |

#### 13 Machine Learning (15)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Completed — central service-specific record |
| Amazon Comprehend | Completed — central service-specific record |
| Amazon Comprehend Medical | Completed — central service-specific record |
| Amazon Fraud Detector | Completed — exact central record |
| Amazon Kendra | Completed — central service-specific record |
| Amazon Lex | Completed — central service-specific record |
| Amazon Nova | Completed — exact central record |
| Amazon PartyRock | Completed — exact central record |
| Amazon Personalize | Completed — central service-specific record |
| Amazon Polly | Completed — central service-specific record |
| Amazon Rekognition | Completed — central service-specific record |
| Amazon SageMaker AI | Completed — central service-specific record |
| Amazon Textract | Completed — central service-specific record |
| Amazon Transcribe | Completed — central service-specific record |
| Amazon Translate | Completed — central service-specific record |

#### 14 Media Services (2)

| Service | Central insight status |
|---|---|
| Amazon Elastic Transcoder | Completed — exact central record |
| Amazon Kinesis Video Streams | Completed — central service-specific record |

#### 15 Management and Governance (21)

| Service | Central insight status |
|---|---|
| AWS CloudFormation | Completed — central service-specific record |
| AWS CloudTrail | Completed — central service-specific record |
| Amazon CloudWatch | Completed — central service-specific record |
| Amazon CloudWatch Logs | Completed — central service-specific record |
| AWS CLI | Completed — central service-specific record |
| AWS Compute Optimizer | Completed — central service-specific record |
| AWS Config | Completed — central service-specific record |
| AWS Control Tower | Completed — central service-specific record |
| AWS Cost Anomaly Detection | Completed — exact central record |
| AWS Health Dashboard | Completed — exact central record |
| AWS License Manager | Completed — exact central record |
| Amazon Managed Grafana | Completed — exact central record |
| Amazon Managed Service for Prometheus | Completed — exact central record |
| AWS Management Console | Completed — central service-specific record |
| AWS Organizations | Completed — central service-specific record |
| AWS Proton | Completed — exact central record |
| AWS Service Catalog | Completed — central service-specific record |
| AWS Service Quotas | Completed — exact central record |
| AWS Systems Manager | Completed — central service-specific record |
| AWS Trusted Advisor | Completed — central service-specific record |
| AWS Well-Architected Tool | Completed — central service-specific record |

#### 16 Migration and Transfer (8)

| Service | Central insight status |
|---|---|
| AWS Application Discovery Service | Completed — exact central record |
| AWS Application Migration Service | Completed — central service-specific record |
| AWS DMS | Completed — central service-specific record |
| AWS DataSync | Completed — central service-specific record |
| AWS Migration Hub | Completed — central service-specific record |
| AWS Schema Conversion Tool | Completed — exact central record |
| AWS Snow Family | Completed — central service-specific record |
| AWS Transfer Family | Completed — central service-specific record |

#### 17 Networking and Content Delivery (9)

| Service | Central insight status |
|---|---|
| Amazon CloudFront | Completed — central service-specific record |
| AWS Direct Connect | Completed — central service-specific record |
| Elastic Load Balancing | Completed — central service-specific record |
| AWS Global Accelerator | Completed — central service-specific record |
| AWS PrivateLink | Completed — central service-specific record |
| Amazon Route 53 | Completed — central service-specific record |
| AWS Transit Gateway | Completed — central service-specific record |
| Amazon VPC | Completed — central service-specific record |
| AWS VPN | Completed — central service-specific record |

#### 18 Security, Identity, and Compliance (21)

| Service | Central insight status |
|---|---|
| AWS Artifact | Completed — exact central record |
| AWS Audit Manager | Completed — exact central record |
| AWS Certificate Manager | Completed — central service-specific record |
| AWS CloudHSM | Completed — central service-specific record |
| Amazon Cognito | Completed — exact central record |
| Amazon Detective | Completed — central service-specific record |
| AWS Directory Service | Completed — exact central record |
| AWS Firewall Manager | Completed — central service-specific record |
| Amazon GuardDuty | Completed — central service-specific record |
| AWS IAM Identity Center | Completed — central service-specific record |
| AWS IAM | Completed — central service-specific record |
| Amazon Inspector | Completed — central service-specific record |
| AWS KMS | Completed — central service-specific record |
| Amazon Macie | Completed — central service-specific record |
| AWS Network Firewall | Completed — central service-specific record |
| AWS Resource Access Manager | Completed — exact central record |
| AWS Secrets Manager | Completed — central service-specific record |
| AWS Security Hub | Completed — central service-specific record |
| AWS Security Token Service | Completed — central service-specific record |
| AWS Shield | Completed — central service-specific record |
| AWS WAF | Completed — central service-specific record |

#### 19 Storage (8)

| Service | Central insight status |
|---|---|
| AWS Backup | Completed — exact central record |
| Amazon EBS | Completed — central service-specific record |
| AWS Elastic Disaster Recovery | Completed — exact central record |
| Amazon EFS | Completed — central service-specific record |
| Amazon FSx | Completed — exact central record |
| Amazon S3 | Completed — central service-specific record |
| Amazon S3 Glacier | Completed — central service-specific record |
| AWS Storage Gateway | Completed — exact central record |


### AIP-C01

#### 01 Analytics (7)

| Service | Central insight status |
|---|---|
| Amazon Athena | Completed — central service-specific record |
| Amazon EMR | Completed — exact central record |
| AWS Glue | Completed — central service-specific record |
| Amazon Kinesis | Completed — central service-specific record |
| Amazon OpenSearch Service | Completed — central service-specific record |
| Amazon Quick Sight | Completed — central service-specific record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Completed — central service-specific record |

#### 02 Application Integration (6)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Completed — exact central record |
| AWS AppConfig | Completed — central service-specific record |
| Amazon EventBridge | Completed — central service-specific record |
| Amazon SNS | Completed — central service-specific record |
| Amazon SQS | Completed — central service-specific record |
| AWS Step Functions | Completed — central service-specific record |

#### 03 Compute (6)

| Service | Central insight status |
|---|---|
| AWS App Runner | Completed — central service-specific record |
| Amazon EC2 | Completed — central service-specific record |
| AWS Lambda | Completed — central service-specific record |
| AWS Lambda@Edge | Completed — central service-specific record |
| AWS Outposts | Completed — exact central record |
| AWS Wavelength | Completed — exact central record |

#### 04 Containers (4)

| Service | Central insight status |
|---|---|
| Amazon ECR | Completed — central service-specific record |
| Amazon ECS | Completed — central service-specific record |
| Amazon EKS | Completed — central service-specific record |
| AWS Fargate | Completed — central service-specific record |

#### 05 Customer Engagement (1)

| Service | Central insight status |
|---|---|
| Amazon Connect | Completed — central service-specific record |

#### 06 Database (7)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Completed — central service-specific record |
| Amazon DocumentDB | Completed — exact central record |
| Amazon DynamoDB | Completed — central service-specific record |
| Amazon DynamoDB Streams | Completed — central service-specific record |
| Amazon ElastiCache | Completed — exact central record |
| Amazon Neptune | Completed — exact central record |
| Amazon RDS | Completed — central service-specific record |

#### 07 Developer Tools (11)

| Service | Central insight status |
|---|---|
| AWS Amplify | Completed — exact central record |
| AWS CDK | Completed — central service-specific record |
| AWS CLI | Completed — central service-specific record |
| AWS CloudFormation | Completed — central service-specific record |
| AWS CodeArtifact | Completed — central service-specific record |
| AWS CodeBuild | Completed — central service-specific record |
| AWS CodeDeploy | Completed — central service-specific record |
| AWS CodePipeline | Completed — central service-specific record |
| Kiro | Completed — exact central record |
| AWS Tools and SDKs | Completed — central service-specific record |
| AWS X-Ray | Completed — exact central record |

#### 08 Machine Learning (32)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Completed — central service-specific record |
| Amazon Bedrock | Completed — central service-specific record |
| Amazon Bedrock AgentCore | Completed — central service-specific record |
| Amazon Bedrock Knowledge Bases | Completed — central service-specific record |
| Amazon Bedrock Prompt Management | Completed — central service-specific record |
| Amazon Bedrock Prompt Flows | Completed — central service-specific record |
| Amazon Comprehend | Completed — central service-specific record |
| Amazon Comprehend Medical | Completed — central service-specific record |
| Amazon Kendra | Completed — central service-specific record |
| Amazon Lex | Completed — central service-specific record |
| Amazon Nova | Completed — exact central record |
| Amazon PartyRock | Completed — exact central record |
| Amazon Personalize | Completed — central service-specific record |
| Amazon Polly | Completed — central service-specific record |
| Amazon Q Business | Completed — central service-specific record |
| Amazon Q Business Apps | Completed — central service-specific record |
| Amazon Q Developer | Completed — central service-specific record |
| Amazon Quick | Completed — central service-specific record |
| Amazon Rekognition | Completed — central service-specific record |
| Amazon SageMaker AI | Completed — central service-specific record |
| Amazon SageMaker Clarify | Completed — central service-specific record |
| Amazon SageMaker Data Wrangler | Completed — central service-specific record |
| Amazon SageMaker Ground Truth | Completed — central service-specific record |
| Amazon SageMaker JumpStart | Completed — central service-specific record |
| Amazon SageMaker Model Monitor | Completed — central service-specific record |
| Amazon SageMaker Model Registry | Completed — central service-specific record |
| Amazon SageMaker Neo | Completed — central service-specific record |
| Amazon SageMaker Processing | Completed — central service-specific record |
| Amazon SageMaker Unified Studio | Completed — central service-specific record |
| Amazon Textract | Completed — central service-specific record |
| Amazon Titan | Completed — exact central record |
| Amazon Transcribe | Completed — central service-specific record |

#### 09 Management and Governance (12)

| Service | Central insight status |
|---|---|
| AWS Auto Scaling | Completed — central service-specific record |
| AWS Chatbot | Completed — exact central record |
| AWS CloudTrail | Completed — central service-specific record |
| Amazon CloudWatch | Completed — central service-specific record |
| Amazon CloudWatch Logs | Completed — central service-specific record |
| Amazon CloudWatch Synthetics | Completed — central service-specific record |
| AWS Cost Anomaly Detection | Completed — exact central record |
| AWS Cost Explorer | Completed — exact central record |
| Amazon Managed Grafana | Completed — exact central record |
| AWS Service Catalog | Completed — central service-specific record |
| AWS Systems Manager | Completed — central service-specific record |
| AWS Well-Architected Tool | Completed — central service-specific record |

#### 10 Migration and Transfer (2)

| Service | Central insight status |
|---|---|
| AWS DataSync | Completed — central service-specific record |
| AWS Transfer Family | Completed — central service-specific record |

#### 11 Networking and Content Delivery (8)

| Service | Central insight status |
|---|---|
| Amazon API Gateway | Completed — central service-specific record |
| AWS AppSync | Completed — central service-specific record |
| Amazon CloudFront | Completed — central service-specific record |
| Elastic Load Balancing (ELB) | Completed — central service-specific record |
| AWS Global Accelerator | Completed — central service-specific record |
| AWS PrivateLink | Completed — central service-specific record |
| Amazon Route 53 | Completed — central service-specific record |
| Amazon VPC | Completed — central service-specific record |

#### 12 Security, Identity, and Compliance (9)

| Service | Central insight status |
|---|---|
| Amazon Cognito | Completed — exact central record |
| AWS Encryption SDK | Completed — central service-specific record |
| IAM | Completed — central service-specific record |
| IAM Access Analyzer | Completed — central service-specific record |
| IAM Identity Center | Completed — central service-specific record |
| AWS KMS | Completed — central service-specific record |
| Amazon Macie | Completed — central service-specific record |
| AWS Secrets Manager | Completed — central service-specific record |
| AWS WAF | Completed — central service-specific record |

#### 13 Storage (6)

| Service | Central insight status |
|---|---|
| Amazon EBS | Completed — central service-specific record |
| Amazon EFS | Completed — central service-specific record |
| Amazon S3 | Completed — central service-specific record |
| Amazon S3 Intelligent-Tiering | Completed — central service-specific record |
| Amazon S3 Lifecycle policies | Completed — central service-specific record |
| Amazon S3 Cross-Region Replication | Completed — central service-specific record |

