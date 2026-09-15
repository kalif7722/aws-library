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

Summary: SAP 19 sections / 157 services; AIP 13 sections / 111 services; 46 exact central insight records currently completed. A service may appear in both courses but has one central record.

### SAP-C02

#### 01 Analytics (11)

| Service | Central insight status |
|---|---|
| Amazon Athena | Pending — central service-specific review |
| AWS Data Exchange | Completed — exact central record |
| Amazon Data Firehose | Pending — central service-specific review |
| Amazon EMR | Completed — exact central record |
| AWS Glue | Pending — central service-specific review |
| Amazon Kinesis Data Streams | Pending — central service-specific review |
| AWS Lake Formation | Completed — exact central record |
| Amazon Managed Service for Apache Flink | Pending — central service-specific review |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Pending — central service-specific review |
| Amazon OpenSearch Service | Pending — central service-specific review |
| Amazon QuickSight | Pending — central service-specific review |

#### 02 Application Integration (7)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Completed — exact central record |
| AWS AppSync | Pending — central service-specific review |
| Amazon EventBridge | Pending — central service-specific review |
| Amazon MQ | Completed — exact central record |
| Amazon SNS | Pending — central service-specific review |
| Amazon SQS | Pending — central service-specific review |
| AWS Step Functions | Pending — central service-specific review |

#### 03 Blockchain (1)

| Service | Central insight status |
|---|---|
| Amazon Managed Blockchain | Pending — central service-specific review |

#### 04 Business Applications (1)

| Service | Central insight status |
|---|---|
| Amazon SES | Pending — central service-specific review |

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
| AWS App Runner | Pending — central service-specific review |
| AWS Auto Scaling | Pending — central service-specific review |
| AWS Batch | Pending — central service-specific review |
| AWS Elastic Beanstalk | Pending — central service-specific review |
| Amazon EC2 | Pending — central service-specific review |
| Amazon EC2 Auto Scaling | Pending — central service-specific review |
| AWS Fargate | Pending — central service-specific review |
| AWS Lambda | Pending — central service-specific review |
| Amazon Lightsail | Pending — central service-specific review |
| AWS Outposts | Completed — exact central record |
| AWS Wavelength | Completed — exact central record |

#### 07 Containers (6)

| Service | Central insight status |
|---|---|
| Amazon ECR | Pending — central service-specific review |
| Amazon ECS | Pending — central service-specific review |
| Amazon ECS Anywhere | Pending — central service-specific review |
| Amazon EKS | Pending — central service-specific review |
| Amazon EKS Anywhere | Pending — central service-specific review |
| Amazon EKS Distro | Pending — central service-specific review |

#### 08 Database (10)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Pending — central service-specific review |
| Amazon Aurora Serverless | Pending — central service-specific review |
| Amazon DocumentDB | Completed — exact central record |
| Amazon DynamoDB | Pending — central service-specific review |
| Amazon ElastiCache | Completed — exact central record |
| Amazon Keyspaces | Completed — exact central record |
| Amazon Neptune | Completed — exact central record |
| Amazon RDS | Pending — central service-specific review |
| Amazon Redshift | Pending — central service-specific review |
| Amazon Timestream | Pending — central service-specific review |

#### 09 Developer Tools (8)

| Service | Central insight status |
|---|---|
| AWS CDK | Pending — central service-specific review |
| AWS CodeArtifact | Pending — central service-specific review |
| AWS CodeBuild | Pending — central service-specific review |
| AWS CodeDeploy | Pending — central service-specific review |
| Amazon CodeGuru | Completed — exact central record |
| AWS CodePipeline | Pending — central service-specific review |
| AWS Tools and SDKs | Pending — central service-specific review |
| AWS X-Ray | Completed — exact central record |

#### 10 End User Computing (2)

| Service | Central insight status |
|---|---|
| Amazon AppStream 2.0 | Pending — central service-specific review |
| Amazon WorkSpaces | Completed — exact central record |

#### 11 Frontend Web and Mobile (4)

| Service | Central insight status |
|---|---|
| AWS Amplify | Completed — exact central record |
| Amazon API Gateway | Pending — central service-specific review |
| AWS Device Farm | Completed — exact central record |
| Amazon Pinpoint | Completed — exact central record |

#### 12 Internet of Things (IoT) (8)

| Service | Central insight status |
|---|---|
| AWS IoT Core | Pending — central service-specific review |
| AWS IoT Device Defender | Pending — central service-specific review |
| AWS IoT Device Management | Pending — central service-specific review |
| AWS IoT Events | Pending — central service-specific review |
| AWS IoT Greengrass | Pending — central service-specific review |
| AWS IoT SiteWise | Pending — central service-specific review |
| AWS IoT Things Graph | Pending — central service-specific review |
| AWS IoT 1-Click | Pending — central service-specific review |

#### 13 Machine Learning (15)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Pending — central service-specific review |
| Amazon Comprehend | Pending — central service-specific review |
| Amazon Comprehend Medical | Pending — central service-specific review |
| Amazon Fraud Detector | Completed — exact central record |
| Amazon Kendra | Pending — central service-specific review |
| Amazon Lex | Pending — central service-specific review |
| Amazon Nova | Completed — exact central record |
| Amazon PartyRock | Completed — exact central record |
| Amazon Personalize | Pending — central service-specific review |
| Amazon Polly | Pending — central service-specific review |
| Amazon Rekognition | Pending — central service-specific review |
| Amazon SageMaker AI | Pending — central service-specific review |
| Amazon Textract | Pending — central service-specific review |
| Amazon Transcribe | Pending — central service-specific review |
| Amazon Translate | Pending — central service-specific review |

#### 14 Media Services (2)

| Service | Central insight status |
|---|---|
| Amazon Elastic Transcoder | Completed — exact central record |
| Amazon Kinesis Video Streams | Pending — central service-specific review |

#### 15 Management and Governance (21)

| Service | Central insight status |
|---|---|
| AWS CloudFormation | Pending — central service-specific review |
| AWS CloudTrail | Pending — central service-specific review |
| Amazon CloudWatch | Pending — central service-specific review |
| Amazon CloudWatch Logs | Pending — central service-specific review |
| AWS CLI | Pending — central service-specific review |
| AWS Compute Optimizer | Pending — central service-specific review |
| AWS Config | Pending — central service-specific review |
| AWS Control Tower | Pending — central service-specific review |
| AWS Cost Anomaly Detection | Completed — exact central record |
| AWS Health Dashboard | Completed — exact central record |
| AWS License Manager | Completed — exact central record |
| Amazon Managed Grafana | Completed — exact central record |
| Amazon Managed Service for Prometheus | Completed — exact central record |
| AWS Management Console | Pending — central service-specific review |
| AWS Organizations | Pending — central service-specific review |
| AWS Proton | Completed — exact central record |
| AWS Service Catalog | Pending — central service-specific review |
| AWS Service Quotas | Completed — exact central record |
| AWS Systems Manager | Pending — central service-specific review |
| AWS Trusted Advisor | Pending — central service-specific review |
| AWS Well-Architected Tool | Pending — central service-specific review |

#### 16 Migration and Transfer (8)

| Service | Central insight status |
|---|---|
| AWS Application Discovery Service | Completed — exact central record |
| AWS Application Migration Service | Pending — central service-specific review |
| AWS DMS | Pending — central service-specific review |
| AWS DataSync | Pending — central service-specific review |
| AWS Migration Hub | Pending — central service-specific review |
| AWS Schema Conversion Tool | Completed — exact central record |
| AWS Snow Family | Pending — central service-specific review |
| AWS Transfer Family | Pending — central service-specific review |

#### 17 Networking and Content Delivery (9)

| Service | Central insight status |
|---|---|
| Amazon CloudFront | Pending — central service-specific review |
| AWS Direct Connect | Pending — central service-specific review |
| Elastic Load Balancing | Pending — central service-specific review |
| AWS Global Accelerator | Pending — central service-specific review |
| AWS PrivateLink | Pending — central service-specific review |
| Amazon Route 53 | Pending — central service-specific review |
| AWS Transit Gateway | Pending — central service-specific review |
| Amazon VPC | Pending — central service-specific review |
| AWS VPN | Pending — central service-specific review |

#### 18 Security, Identity, and Compliance (21)

| Service | Central insight status |
|---|---|
| AWS Artifact | Completed — exact central record |
| AWS Audit Manager | Completed — exact central record |
| AWS Certificate Manager | Pending — central service-specific review |
| AWS CloudHSM | Pending — central service-specific review |
| Amazon Cognito | Completed — exact central record |
| Amazon Detective | Pending — central service-specific review |
| AWS Directory Service | Completed — exact central record |
| AWS Firewall Manager | Pending — central service-specific review |
| Amazon GuardDuty | Pending — central service-specific review |
| AWS IAM Identity Center | Pending — central service-specific review |
| AWS IAM | Pending — central service-specific review |
| Amazon Inspector | Pending — central service-specific review |
| AWS KMS | Pending — central service-specific review |
| Amazon Macie | Pending — central service-specific review |
| AWS Network Firewall | Pending — central service-specific review |
| AWS Resource Access Manager | Completed — exact central record |
| AWS Secrets Manager | Pending — central service-specific review |
| AWS Security Hub | Pending — central service-specific review |
| AWS Security Token Service | Pending — central service-specific review |
| AWS Shield | Pending — central service-specific review |
| AWS WAF | Pending — central service-specific review |

#### 19 Storage (8)

| Service | Central insight status |
|---|---|
| AWS Backup | Completed — exact central record |
| Amazon EBS | Pending — central service-specific review |
| AWS Elastic Disaster Recovery | Completed — exact central record |
| Amazon EFS | Pending — central service-specific review |
| Amazon FSx | Completed — exact central record |
| Amazon S3 | Pending — central service-specific review |
| Amazon S3 Glacier | Pending — central service-specific review |
| AWS Storage Gateway | Completed — exact central record |


### AIP-C01

#### 01 Analytics (7)

| Service | Central insight status |
|---|---|
| Amazon Athena | Pending — central service-specific review |
| Amazon EMR | Completed — exact central record |
| AWS Glue | Pending — central service-specific review |
| Amazon Kinesis | Pending — central service-specific review |
| Amazon OpenSearch Service | Pending — central service-specific review |
| Amazon Quick Sight | Pending — central service-specific review |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Pending — central service-specific review |

#### 02 Application Integration (6)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Completed — exact central record |
| AWS AppConfig | Pending — central service-specific review |
| Amazon EventBridge | Pending — central service-specific review |
| Amazon SNS | Pending — central service-specific review |
| Amazon SQS | Pending — central service-specific review |
| AWS Step Functions | Pending — central service-specific review |

#### 03 Compute (6)

| Service | Central insight status |
|---|---|
| AWS App Runner | Pending — central service-specific review |
| Amazon EC2 | Pending — central service-specific review |
| AWS Lambda | Pending — central service-specific review |
| AWS Lambda@Edge | Pending — central service-specific review |
| AWS Outposts | Completed — exact central record |
| AWS Wavelength | Completed — exact central record |

#### 04 Containers (4)

| Service | Central insight status |
|---|---|
| Amazon ECR | Pending — central service-specific review |
| Amazon ECS | Pending — central service-specific review |
| Amazon EKS | Pending — central service-specific review |
| AWS Fargate | Pending — central service-specific review |

#### 05 Customer Engagement (1)

| Service | Central insight status |
|---|---|
| Amazon Connect | Pending — central service-specific review |

#### 06 Database (7)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Pending — central service-specific review |
| Amazon DocumentDB | Completed — exact central record |
| Amazon DynamoDB | Pending — central service-specific review |
| Amazon DynamoDB Streams | Pending — central service-specific review |
| Amazon ElastiCache | Completed — exact central record |
| Amazon Neptune | Completed — exact central record |
| Amazon RDS | Pending — central service-specific review |

#### 07 Developer Tools (11)

| Service | Central insight status |
|---|---|
| AWS Amplify | Completed — exact central record |
| AWS CDK | Pending — central service-specific review |
| AWS CLI | Pending — central service-specific review |
| AWS CloudFormation | Pending — central service-specific review |
| AWS CodeArtifact | Pending — central service-specific review |
| AWS CodeBuild | Pending — central service-specific review |
| AWS CodeDeploy | Pending — central service-specific review |
| AWS CodePipeline | Pending — central service-specific review |
| Kiro | Completed — exact central record |
| AWS Tools and SDKs | Pending — central service-specific review |
| AWS X-Ray | Completed — exact central record |

#### 08 Machine Learning (32)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Pending — central service-specific review |
| Amazon Bedrock | Pending — central service-specific review |
| Amazon Bedrock AgentCore | Pending — central service-specific review |
| Amazon Bedrock Knowledge Bases | Pending — central service-specific review |
| Amazon Bedrock Prompt Management | Pending — central service-specific review |
| Amazon Bedrock Prompt Flows | Pending — central service-specific review |
| Amazon Comprehend | Pending — central service-specific review |
| Amazon Comprehend Medical | Pending — central service-specific review |
| Amazon Kendra | Pending — central service-specific review |
| Amazon Lex | Pending — central service-specific review |
| Amazon Nova | Completed — exact central record |
| Amazon PartyRock | Completed — exact central record |
| Amazon Personalize | Pending — central service-specific review |
| Amazon Polly | Pending — central service-specific review |
| Amazon Q Business | Pending — central service-specific review |
| Amazon Q Business Apps | Pending — central service-specific review |
| Amazon Q Developer | Pending — central service-specific review |
| Amazon Quick | Pending — central service-specific review |
| Amazon Rekognition | Pending — central service-specific review |
| Amazon SageMaker AI | Pending — central service-specific review |
| Amazon SageMaker Clarify | Pending — central service-specific review |
| Amazon SageMaker Data Wrangler | Pending — central service-specific review |
| Amazon SageMaker Ground Truth | Pending — central service-specific review |
| Amazon SageMaker JumpStart | Pending — central service-specific review |
| Amazon SageMaker Model Monitor | Pending — central service-specific review |
| Amazon SageMaker Model Registry | Pending — central service-specific review |
| Amazon SageMaker Neo | Pending — central service-specific review |
| Amazon SageMaker Processing | Pending — central service-specific review |
| Amazon SageMaker Unified Studio | Pending — central service-specific review |
| Amazon Textract | Pending — central service-specific review |
| Amazon Titan | Completed — exact central record |
| Amazon Transcribe | Pending — central service-specific review |

#### 09 Management and Governance (12)

| Service | Central insight status |
|---|---|
| AWS Auto Scaling | Pending — central service-specific review |
| AWS Chatbot | Completed — exact central record |
| AWS CloudTrail | Pending — central service-specific review |
| Amazon CloudWatch | Pending — central service-specific review |
| Amazon CloudWatch Logs | Pending — central service-specific review |
| Amazon CloudWatch Synthetics | Pending — central service-specific review |
| AWS Cost Anomaly Detection | Completed — exact central record |
| AWS Cost Explorer | Completed — exact central record |
| Amazon Managed Grafana | Completed — exact central record |
| AWS Service Catalog | Pending — central service-specific review |
| AWS Systems Manager | Pending — central service-specific review |
| AWS Well-Architected Tool | Pending — central service-specific review |

#### 10 Migration and Transfer (2)

| Service | Central insight status |
|---|---|
| AWS DataSync | Pending — central service-specific review |
| AWS Transfer Family | Pending — central service-specific review |

#### 11 Networking and Content Delivery (8)

| Service | Central insight status |
|---|---|
| Amazon API Gateway | Pending — central service-specific review |
| AWS AppSync | Pending — central service-specific review |
| Amazon CloudFront | Pending — central service-specific review |
| Elastic Load Balancing (ELB) | Pending — central service-specific review |
| AWS Global Accelerator | Pending — central service-specific review |
| AWS PrivateLink | Pending — central service-specific review |
| Amazon Route 53 | Pending — central service-specific review |
| Amazon VPC | Pending — central service-specific review |

#### 12 Security, Identity, and Compliance (9)

| Service | Central insight status |
|---|---|
| Amazon Cognito | Completed — exact central record |
| AWS Encryption SDK | Pending — central service-specific review |
| IAM | Pending — central service-specific review |
| IAM Access Analyzer | Pending — central service-specific review |
| IAM Identity Center | Pending — central service-specific review |
| AWS KMS | Pending — central service-specific review |
| Amazon Macie | Pending — central service-specific review |
| AWS Secrets Manager | Pending — central service-specific review |
| AWS WAF | Pending — central service-specific review |

#### 13 Storage (6)

| Service | Central insight status |
|---|---|
| Amazon EBS | Pending — central service-specific review |
| Amazon EFS | Pending — central service-specific review |
| Amazon S3 | Pending — central service-specific review |
| Amazon S3 Intelligent-Tiering | Pending — central service-specific review |
| Amazon S3 Lifecycle policies | Pending — central service-specific review |
| Amazon S3 Cross-Region Replication | Pending — central service-specific review |

