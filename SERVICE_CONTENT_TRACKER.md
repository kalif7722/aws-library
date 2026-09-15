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

Each record is individually authored from the relevant AWS service user guide, API/reference material, service FAQs, pricing model and Well-Architected guidance. No record is produced by substituting a service name into a shared answer pattern.

Summary: SAP 19 sections / 157 services; AIP 13 sections / 111 services; 193 unique services rewritten with individually authored AWS-specific insight records. No SAP/AIP service uses the generated family-template content.

### SAP-C02

#### 01 Analytics (11)

| Service | Central insight status |
|---|---|
| Amazon Athena | Rewritten — AWS-specific record |
| AWS Data Exchange | Rewritten — AWS-specific record |
| Amazon Data Firehose | Rewritten — AWS-specific record |
| Amazon EMR | Rewritten — AWS-specific record |
| AWS Glue | Rewritten — AWS-specific record |
| Amazon Kinesis Data Streams | Rewritten — AWS-specific record |
| AWS Lake Formation | Rewritten — AWS-specific record |
| Amazon Managed Service for Apache Flink | Rewritten — AWS-specific record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Rewritten — AWS-specific record |
| Amazon OpenSearch Service | Rewritten — AWS-specific record |
| Amazon QuickSight | Rewritten — AWS-specific record |

#### 02 Application Integration (7)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Rewritten — AWS-specific record |
| AWS AppSync | Rewritten — AWS-specific record |
| Amazon EventBridge | Rewritten — AWS-specific record |
| Amazon MQ | Rewritten — AWS-specific record |
| Amazon SNS | Rewritten — AWS-specific record |
| Amazon SQS | Rewritten — AWS-specific record |
| AWS Step Functions | Rewritten — AWS-specific record |

#### 03 Blockchain (1)

| Service | Central insight status |
|---|---|
| Amazon Managed Blockchain | Rewritten — AWS-specific record |

#### 04 Business Applications (1)

| Service | Central insight status |
|---|---|
| Amazon SES | Rewritten — AWS-specific record |

#### 05 Cloud Financial Management (4)

| Service | Central insight status |
|---|---|
| AWS Budgets | Rewritten — AWS-specific record |
| AWS Cost and Usage Report | Rewritten — AWS-specific record |
| AWS Cost Explorer | Rewritten — AWS-specific record |
| Savings Plans | Rewritten — AWS-specific record |

#### 06 Compute (11)

| Service | Central insight status |
|---|---|
| AWS App Runner | Rewritten — AWS-specific record |
| AWS Auto Scaling | Rewritten — AWS-specific record |
| AWS Batch | Rewritten — AWS-specific record |
| AWS Elastic Beanstalk | Rewritten — AWS-specific record |
| Amazon EC2 | Rewritten — AWS-specific record |
| Amazon EC2 Auto Scaling | Rewritten — AWS-specific record |
| AWS Fargate | Rewritten — AWS-specific record |
| AWS Lambda | Rewritten — AWS-specific record |
| Amazon Lightsail | Rewritten — AWS-specific record |
| AWS Outposts | Rewritten — AWS-specific record |
| AWS Wavelength | Rewritten — AWS-specific record |

#### 07 Containers (6)

| Service | Central insight status |
|---|---|
| Amazon ECR | Rewritten — AWS-specific record |
| Amazon ECS | Rewritten — AWS-specific record |
| Amazon ECS Anywhere | Rewritten — AWS-specific record |
| Amazon EKS | Rewritten — AWS-specific record |
| Amazon EKS Anywhere | Rewritten — AWS-specific record |
| Amazon EKS Distro | Rewritten — AWS-specific record |

#### 08 Database (10)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Rewritten — AWS-specific record |
| Amazon Aurora Serverless | Rewritten — AWS-specific record |
| Amazon DocumentDB | Rewritten — AWS-specific record |
| Amazon DynamoDB | Rewritten — AWS-specific record |
| Amazon ElastiCache | Rewritten — AWS-specific record |
| Amazon Keyspaces | Rewritten — AWS-specific record |
| Amazon Neptune | Rewritten — AWS-specific record |
| Amazon RDS | Rewritten — AWS-specific record |
| Amazon Redshift | Rewritten — AWS-specific record |
| Amazon Timestream | Rewritten — AWS-specific record |

#### 09 Developer Tools (8)

| Service | Central insight status |
|---|---|
| AWS CDK | Rewritten — AWS-specific record |
| AWS CodeArtifact | Rewritten — AWS-specific record |
| AWS CodeBuild | Rewritten — AWS-specific record |
| AWS CodeDeploy | Rewritten — AWS-specific record |
| Amazon CodeGuru | Rewritten — AWS-specific record |
| AWS CodePipeline | Rewritten — AWS-specific record |
| AWS Tools and SDKs | Rewritten — AWS-specific record |
| AWS X-Ray | Rewritten — AWS-specific record |

#### 10 End User Computing (2)

| Service | Central insight status |
|---|---|
| Amazon AppStream 2.0 | Rewritten — AWS-specific record |
| Amazon WorkSpaces | Rewritten — AWS-specific record |

#### 11 Frontend Web and Mobile (4)

| Service | Central insight status |
|---|---|
| AWS Amplify | Rewritten — AWS-specific record |
| Amazon API Gateway | Rewritten — AWS-specific record |
| AWS Device Farm | Rewritten — AWS-specific record |
| Amazon Pinpoint | Rewritten — AWS-specific record |

#### 12 Internet of Things (IoT) (8)

| Service | Central insight status |
|---|---|
| AWS IoT Core | Rewritten — AWS-specific record |
| AWS IoT Device Defender | Rewritten — AWS-specific record |
| AWS IoT Device Management | Rewritten — AWS-specific record |
| AWS IoT Events | Rewritten — AWS-specific record |
| AWS IoT Greengrass | Rewritten — AWS-specific record |
| AWS IoT SiteWise | Rewritten — AWS-specific record |
| AWS IoT Things Graph | Rewritten — AWS-specific record |
| AWS IoT 1-Click | Rewritten — AWS-specific record |

#### 13 Machine Learning (15)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Rewritten — AWS-specific record |
| Amazon Comprehend | Rewritten — AWS-specific record |
| Amazon Comprehend Medical | Rewritten — AWS-specific record |
| Amazon Fraud Detector | Rewritten — AWS-specific record |
| Amazon Kendra | Rewritten — AWS-specific record |
| Amazon Lex | Rewritten — AWS-specific record |
| Amazon Nova | Rewritten — AWS-specific record |
| Amazon PartyRock | Rewritten — AWS-specific record |
| Amazon Personalize | Rewritten — AWS-specific record |
| Amazon Polly | Rewritten — AWS-specific record |
| Amazon Rekognition | Rewritten — AWS-specific record |
| Amazon SageMaker AI | Rewritten — AWS-specific record |
| Amazon Textract | Rewritten — AWS-specific record |
| Amazon Transcribe | Rewritten — AWS-specific record |
| Amazon Translate | Rewritten — AWS-specific record |

#### 14 Media Services (2)

| Service | Central insight status |
|---|---|
| Amazon Elastic Transcoder | Rewritten — AWS-specific record |
| Amazon Kinesis Video Streams | Rewritten — AWS-specific record |

#### 15 Management and Governance (21)

| Service | Central insight status |
|---|---|
| AWS CloudFormation | Rewritten — AWS-specific record |
| AWS CloudTrail | Rewritten — AWS-specific record |
| Amazon CloudWatch | Rewritten — AWS-specific record |
| Amazon CloudWatch Logs | Rewritten — AWS-specific record |
| AWS CLI | Rewritten — AWS-specific record |
| AWS Compute Optimizer | Rewritten — AWS-specific record |
| AWS Config | Rewritten — AWS-specific record |
| AWS Control Tower | Rewritten — AWS-specific record |
| AWS Cost Anomaly Detection | Rewritten — AWS-specific record |
| AWS Health Dashboard | Rewritten — AWS-specific record |
| AWS License Manager | Rewritten — AWS-specific record |
| Amazon Managed Grafana | Rewritten — AWS-specific record |
| Amazon Managed Service for Prometheus | Rewritten — AWS-specific record |
| AWS Management Console | Rewritten — AWS-specific record |
| AWS Organizations | Rewritten — AWS-specific record |
| AWS Proton | Rewritten — AWS-specific record |
| AWS Service Catalog | Rewritten — AWS-specific record |
| AWS Service Quotas | Rewritten — AWS-specific record |
| AWS Systems Manager | Rewritten — AWS-specific record |
| AWS Trusted Advisor | Rewritten — AWS-specific record |
| AWS Well-Architected Tool | Rewritten — AWS-specific record |

#### 16 Migration and Transfer (8)

| Service | Central insight status |
|---|---|
| AWS Application Discovery Service | Rewritten — AWS-specific record |
| AWS Application Migration Service | Rewritten — AWS-specific record |
| AWS DMS | Rewritten — AWS-specific record |
| AWS DataSync | Rewritten — AWS-specific record |
| AWS Migration Hub | Rewritten — AWS-specific record |
| AWS Schema Conversion Tool | Rewritten — AWS-specific record |
| AWS Snow Family | Rewritten — AWS-specific record |
| AWS Transfer Family | Rewritten — AWS-specific record |

#### 17 Networking and Content Delivery (9)

| Service | Central insight status |
|---|---|
| Amazon CloudFront | Rewritten — AWS-specific record |
| AWS Direct Connect | Rewritten — AWS-specific record |
| Elastic Load Balancing | Rewritten — AWS-specific record |
| AWS Global Accelerator | Rewritten — AWS-specific record |
| AWS PrivateLink | Rewritten — AWS-specific record |
| Amazon Route 53 | Rewritten — AWS-specific record |
| AWS Transit Gateway | Rewritten — AWS-specific record |
| Amazon VPC | Rewritten — AWS-specific record |
| AWS VPN | Rewritten — AWS-specific record |

#### 18 Security, Identity, and Compliance (21)

| Service | Central insight status |
|---|---|
| AWS Artifact | Rewritten — AWS-specific record |
| AWS Audit Manager | Rewritten — AWS-specific record |
| AWS Certificate Manager | Rewritten — AWS-specific record |
| AWS CloudHSM | Rewritten — AWS-specific record |
| Amazon Cognito | Rewritten — AWS-specific record |
| Amazon Detective | Rewritten — AWS-specific record |
| AWS Directory Service | Rewritten — AWS-specific record |
| AWS Firewall Manager | Rewritten — AWS-specific record |
| Amazon GuardDuty | Rewritten — AWS-specific record |
| AWS IAM Identity Center | Rewritten — AWS-specific record |
| AWS IAM | Rewritten — AWS-specific record |
| Amazon Inspector | Rewritten — AWS-specific record |
| AWS KMS | Rewritten — AWS-specific record |
| Amazon Macie | Rewritten — AWS-specific record |
| AWS Network Firewall | Rewritten — AWS-specific record |
| AWS Resource Access Manager | Rewritten — AWS-specific record |
| AWS Secrets Manager | Rewritten — AWS-specific record |
| AWS Security Hub | Rewritten — AWS-specific record |
| AWS Security Token Service | Rewritten — AWS-specific record |
| AWS Shield | Rewritten — AWS-specific record |
| AWS WAF | Rewritten — AWS-specific record |

#### 19 Storage (8)

| Service | Central insight status |
|---|---|
| AWS Backup | Rewritten — AWS-specific record |
| Amazon EBS | Rewritten — AWS-specific record |
| AWS Elastic Disaster Recovery | Rewritten — AWS-specific record |
| Amazon EFS | Rewritten — AWS-specific record |
| Amazon FSx | Rewritten — AWS-specific record |
| Amazon S3 | Rewritten — AWS-specific record |
| Amazon S3 Glacier | Rewritten — AWS-specific record |
| AWS Storage Gateway | Rewritten — AWS-specific record |


### AIP-C01

#### 01 Analytics (7)

| Service | Central insight status |
|---|---|
| Amazon Athena | Rewritten — AWS-specific record |
| Amazon EMR | Rewritten — AWS-specific record |
| AWS Glue | Rewritten — AWS-specific record |
| Amazon Kinesis | Rewritten — AWS-specific record |
| Amazon OpenSearch Service | Rewritten — AWS-specific record |
| Amazon Quick Sight | Rewritten — AWS-specific record |
| Amazon Managed Streaming for Apache Kafka (Amazon MSK) | Rewritten — AWS-specific record |

#### 02 Application Integration (6)

| Service | Central insight status |
|---|---|
| Amazon AppFlow | Rewritten — AWS-specific record |
| AWS AppConfig | Rewritten — AWS-specific record |
| Amazon EventBridge | Rewritten — AWS-specific record |
| Amazon SNS | Rewritten — AWS-specific record |
| Amazon SQS | Rewritten — AWS-specific record |
| AWS Step Functions | Rewritten — AWS-specific record |

#### 03 Compute (6)

| Service | Central insight status |
|---|---|
| AWS App Runner | Rewritten — AWS-specific record |
| Amazon EC2 | Rewritten — AWS-specific record |
| AWS Lambda | Rewritten — AWS-specific record |
| AWS Lambda@Edge | Rewritten — AWS-specific record |
| AWS Outposts | Rewritten — AWS-specific record |
| AWS Wavelength | Rewritten — AWS-specific record |

#### 04 Containers (4)

| Service | Central insight status |
|---|---|
| Amazon ECR | Rewritten — AWS-specific record |
| Amazon ECS | Rewritten — AWS-specific record |
| Amazon EKS | Rewritten — AWS-specific record |
| AWS Fargate | Rewritten — AWS-specific record |

#### 05 Customer Engagement (1)

| Service | Central insight status |
|---|---|
| Amazon Connect | Rewritten — AWS-specific record |

#### 06 Database (7)

| Service | Central insight status |
|---|---|
| Amazon Aurora | Rewritten — AWS-specific record |
| Amazon DocumentDB | Rewritten — AWS-specific record |
| Amazon DynamoDB | Rewritten — AWS-specific record |
| Amazon DynamoDB Streams | Rewritten — AWS-specific record |
| Amazon ElastiCache | Rewritten — AWS-specific record |
| Amazon Neptune | Rewritten — AWS-specific record |
| Amazon RDS | Rewritten — AWS-specific record |

#### 07 Developer Tools (11)

| Service | Central insight status |
|---|---|
| AWS Amplify | Rewritten — AWS-specific record |
| AWS CDK | Rewritten — AWS-specific record |
| AWS CLI | Rewritten — AWS-specific record |
| AWS CloudFormation | Rewritten — AWS-specific record |
| AWS CodeArtifact | Rewritten — AWS-specific record |
| AWS CodeBuild | Rewritten — AWS-specific record |
| AWS CodeDeploy | Rewritten — AWS-specific record |
| AWS CodePipeline | Rewritten — AWS-specific record |
| Kiro | Rewritten — AWS-specific record |
| AWS Tools and SDKs | Rewritten — AWS-specific record |
| AWS X-Ray | Rewritten — AWS-specific record |

#### 08 Machine Learning (32)

| Service | Central insight status |
|---|---|
| Amazon Augmented AI | Rewritten — AWS-specific record |
| Amazon Bedrock | Rewritten — AWS-specific record |
| Amazon Bedrock AgentCore | Rewritten — AWS-specific record |
| Amazon Bedrock Knowledge Bases | Rewritten — AWS-specific record |
| Amazon Bedrock Prompt Management | Rewritten — AWS-specific record |
| Amazon Bedrock Prompt Flows | Rewritten — AWS-specific record |
| Amazon Comprehend | Rewritten — AWS-specific record |
| Amazon Comprehend Medical | Rewritten — AWS-specific record |
| Amazon Kendra | Rewritten — AWS-specific record |
| Amazon Lex | Rewritten — AWS-specific record |
| Amazon Nova | Rewritten — AWS-specific record |
| Amazon PartyRock | Rewritten — AWS-specific record |
| Amazon Personalize | Rewritten — AWS-specific record |
| Amazon Polly | Rewritten — AWS-specific record |
| Amazon Q Business | Rewritten — AWS-specific record |
| Amazon Q Business Apps | Rewritten — AWS-specific record |
| Amazon Q Developer | Rewritten — AWS-specific record |
| Amazon Quick | Rewritten — AWS-specific record |
| Amazon Rekognition | Rewritten — AWS-specific record |
| Amazon SageMaker AI | Rewritten — AWS-specific record |
| Amazon SageMaker Clarify | Rewritten — AWS-specific record |
| Amazon SageMaker Data Wrangler | Rewritten — AWS-specific record |
| Amazon SageMaker Ground Truth | Rewritten — AWS-specific record |
| Amazon SageMaker JumpStart | Rewritten — AWS-specific record |
| Amazon SageMaker Model Monitor | Rewritten — AWS-specific record |
| Amazon SageMaker Model Registry | Rewritten — AWS-specific record |
| Amazon SageMaker Neo | Rewritten — AWS-specific record |
| Amazon SageMaker Processing | Rewritten — AWS-specific record |
| Amazon SageMaker Unified Studio | Rewritten — AWS-specific record |
| Amazon Textract | Rewritten — AWS-specific record |
| Amazon Titan | Rewritten — AWS-specific record |
| Amazon Transcribe | Rewritten — AWS-specific record |

#### 09 Management and Governance (12)

| Service | Central insight status |
|---|---|
| AWS Auto Scaling | Rewritten — AWS-specific record |
| AWS Chatbot | Rewritten — AWS-specific record |
| AWS CloudTrail | Rewritten — AWS-specific record |
| Amazon CloudWatch | Rewritten — AWS-specific record |
| Amazon CloudWatch Logs | Rewritten — AWS-specific record |
| Amazon CloudWatch Synthetics | Rewritten — AWS-specific record |
| AWS Cost Anomaly Detection | Rewritten — AWS-specific record |
| AWS Cost Explorer | Rewritten — AWS-specific record |
| Amazon Managed Grafana | Rewritten — AWS-specific record |
| AWS Service Catalog | Rewritten — AWS-specific record |
| AWS Systems Manager | Rewritten — AWS-specific record |
| AWS Well-Architected Tool | Rewritten — AWS-specific record |

#### 10 Migration and Transfer (2)

| Service | Central insight status |
|---|---|
| AWS DataSync | Rewritten — AWS-specific record |
| AWS Transfer Family | Rewritten — AWS-specific record |

#### 11 Networking and Content Delivery (8)

| Service | Central insight status |
|---|---|
| Amazon API Gateway | Rewritten — AWS-specific record |
| AWS AppSync | Rewritten — AWS-specific record |
| Amazon CloudFront | Rewritten — AWS-specific record |
| Elastic Load Balancing (ELB) | Rewritten — AWS-specific record |
| AWS Global Accelerator | Rewritten — AWS-specific record |
| AWS PrivateLink | Rewritten — AWS-specific record |
| Amazon Route 53 | Rewritten — AWS-specific record |
| Amazon VPC | Rewritten — AWS-specific record |

#### 12 Security, Identity, and Compliance (9)

| Service | Central insight status |
|---|---|
| Amazon Cognito | Rewritten — AWS-specific record |
| AWS Encryption SDK | Rewritten — AWS-specific record |
| IAM | Rewritten — AWS-specific record |
| IAM Access Analyzer | Rewritten — AWS-specific record |
| IAM Identity Center | Rewritten — AWS-specific record |
| AWS KMS | Rewritten — AWS-specific record |
| Amazon Macie | Rewritten — AWS-specific record |
| AWS Secrets Manager | Rewritten — AWS-specific record |
| AWS WAF | Rewritten — AWS-specific record |

#### 13 Storage (6)

| Service | Central insight status |
|---|---|
| Amazon EBS | Rewritten — AWS-specific record |
| Amazon EFS | Rewritten — AWS-specific record |
| Amazon S3 | Rewritten — AWS-specific record |
| Amazon S3 Intelligent-Tiering | Rewritten — AWS-specific record |
| Amazon S3 Lifecycle policies | Rewritten — AWS-specific record |
| Amazon S3 Cross-Region Replication | Rewritten — AWS-specific record |



Central rewrite validation: each of the 193 SAP/AIP services now has a distinct exact record for Security & Governance, Design & Optimization, Cost, and Service-specific Watch Points. Family rules remain only as a safeguard for services outside these two course scopes.


Rewrite validation: 193 of 193 SAP/AIP services have distinct exact records. Each record contains service-specific Security & Governance, Design & Optimization, Cost, and Service-specific Watch Points content; no SAP/AIP service is marked pending.
