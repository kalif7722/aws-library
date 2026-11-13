import type { ScopeCategory } from "./course-data";

export const clfScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon EMR", "AWS Glue", "Amazon Kinesis", "Amazon OpenSearch Service", "Amazon QuickSight", "Amazon Redshift"] },
  { title: "Application Integration", services: ["Amazon EventBridge", "Amazon Simple Notification Service (Amazon SNS)", "Amazon Simple Queue Service (Amazon SQS)", "AWS Step Functions"] },
  { title: "Business Applications", services: ["Amazon Connect", "Amazon Simple Email Service (Amazon SES)"] },
  { title: "Cloud Financial Management", services: ["AWS Budgets", "AWS Cost and Usage Reports", "AWS Cost Explorer", "AWS Marketplace"] },
  { title: "Compute", services: ["AWS Batch", "Amazon EC2", "AWS Elastic Beanstalk", "Amazon Lightsail", "AWS Outposts"] },
  { title: "Containers", services: ["Amazon Elastic Container Registry (Amazon ECR)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)"] },
  { title: "Customer Enablement", services: ["AWS Support"] },
  { title: "Database", services: ["Amazon Aurora", "Amazon DocumentDB", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Neptune", "Amazon RDS"] },
  { title: "Developer Tools", services: ["AWS CLI", "AWS CodeBuild", "AWS CodePipeline", "AWS X-Ray"] },
  { title: "End User Computing", services: ["Amazon AppStream 2.0", "Amazon WorkSpaces", "Amazon WorkSpaces Secure Browser"] },
  { title: "Frontend Web and Mobile", services: ["AWS Amplify", "AWS AppSync"] },
  { title: "Internet of Things (IoT)", services: ["AWS IoT Core"] },
  { title: "Machine Learning", services: ["Amazon Comprehend", "Amazon Kendra", "Amazon Lex", "Amazon Polly", "Amazon Q", "Amazon Rekognition", "Amazon SageMaker AI", "Amazon Textract", "Amazon Transcribe", "Amazon Translate"] },
  { title: "Management and Governance", services: ["AWS Auto Scaling", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Compute Optimizer", "AWS Config", "AWS Control Tower", "AWS Health Dashboard", "AWS License Manager", "AWS Management Console", "AWS Organizations", "AWS Service Catalog", "Service Quotas", "AWS Systems Manager", "AWS Trusted Advisor", "AWS Well-Architected Tool"] },
  { title: "Migration and Transfer", services: ["AWS Application Discovery Service", "AWS Application Migration Service", "AWS Database Migration Service (AWS DMS)", "Migration Evaluator", "AWS Migration Hub", "AWS Schema Conversion Tool (AWS SCT)", "AWS Snow Family"] },
  { title: "Networking and Content Delivery", services: ["Amazon API Gateway", "Amazon CloudFront", "AWS Direct Connect", "AWS Global Accelerator", "AWS PrivateLink", "Amazon Route 53", "AWS Transit Gateway", "Amazon VPC", "AWS VPN", "AWS Site-to-Site VPN", "AWS Client VPN"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Artifact", "AWS Audit Manager", "AWS Certificate Manager (ACM)", "AWS CloudHSM", "Amazon Cognito", "Amazon Detective", "AWS Directory Service", "AWS Firewall Manager", "Amazon GuardDuty", "AWS Identity and Access Management (IAM)", "AWS IAM Identity Center", "Amazon Inspector", "AWS Key Management Service (AWS KMS)", "Amazon Macie", "AWS Resource Access Manager (AWS RAM)", "AWS Secrets Manager", "AWS Security Hub", "AWS Shield", "AWS WAF"] },
  { title: "Serverless", services: ["AWS Fargate", "AWS Lambda"] },
  { title: "Storage", services: ["AWS Backup", "Amazon Elastic Block Store (Amazon EBS)", "Amazon Elastic File System (Amazon EFS)", "AWS Elastic Disaster Recovery", "Amazon FSx", "Amazon S3", "Amazon S3 Glacier", "AWS Storage Gateway"] },
];

export const aifScope: ScopeCategory[] = [
  { title: "Analytics", services: ["AWS Data Exchange", "Amazon EMR", "AWS Glue", "AWS Glue DataBrew", "AWS Lake Formation", "Amazon OpenSearch Service", "Amazon Quick", "Amazon Redshift"] },
  { title: "Cloud Financial Management", services: ["AWS Budgets", "AWS Cost Explorer"] },
  { title: "Compute", services: ["Amazon EC2", "AWS Lambda"] },
  { title: "Containers", services: ["Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)"] },
  { title: "Database", services: ["Amazon Aurora", "Amazon DocumentDB (with MongoDB compatibility)", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Neptune", "Amazon RDS"] },
  { title: "Developer Tools", services: ["Kiro", "Strands Agents", "Amazon Q"] },
  { title: "Machine Learning", services: ["Amazon Augmented AI (Amazon A2I)", "Amazon Bedrock", "Amazon Bedrock AgentCore", "Amazon Comprehend", "Amazon Kendra", "Amazon Lex", "Amazon Nova", "Amazon Personalize", "Amazon Polly", "Amazon Rekognition", "Amazon SageMaker AI", "Amazon SageMaker JumpStart", "Amazon Textract", "Amazon Transcribe", "Amazon Translate", "AWS Transform"] },
  { title: "Management and Governance", services: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor", "AWS Well-Architected Tool"] },
  { title: "Networking and Content Delivery", services: ["Amazon CloudFront", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Artifact", "AWS Audit Manager", "AWS Identity and Access Management (IAM)", "Amazon Inspector", "AWS Key Management Service (AWS KMS)", "Amazon Macie", "AWS Secrets Manager"] },
  { title: "Storage", services: ["Amazon S3", "Amazon S3 Glacier"] },
];

export const dvaScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon Kinesis", "Amazon OpenSearch Service"] },
  { title: "Application Integration", services: ["AWS AppSync", "Amazon EventBridge", "Amazon Simple Notification Service (Amazon SNS)", "Amazon Simple Queue Service (Amazon SQS)", "AWS Step Functions"] },
  { title: "Compute", services: ["Amazon EC2", "AWS Elastic Beanstalk", "AWS Lambda"] },
  { title: "Containers", services: ["Amazon Elastic Container Registry (Amazon ECR)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)"] },
  { title: "Database", services: ["Amazon Aurora", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon RDS"] },
  { title: "Developer Tools", services: ["AWS Amplify", "AWS CloudShell", "AWS CodeArtifact", "AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline", "AWS X-Ray", "Amazon Q Developer"] },
  { title: "Management and Governance", services: ["AWS AppConfig", "AWS Cloud Development Kit (AWS CDK)", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Command Line Interface (AWS CLI)", "AWS Systems Manager"] },
  { title: "Networking and Content Delivery", services: ["Amazon API Gateway", "Amazon CloudFront", "Elastic Load Balancing", "Amazon Route 53", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["Amazon Cognito", "AWS Identity and Access Management (IAM)", "AWS Key Management Service (AWS KMS)", "AWS Secrets Manager", "AWS Security Token Service (AWS STS)", "AWS WAF"] },
  { title: "Storage", services: ["Amazon Elastic Block Store (Amazon EBS)", "Amazon Elastic File System (Amazon EFS)", "Amazon S3"] },
];

export const soaScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon Data Firehose"] },
  { title: "Application Integration", services: ["Amazon EventBridge", "Amazon SNS", "Amazon SQS", "AWS Step Functions"] },
  { title: "Business Applications", services: ["Amazon SES"] },
  { title: "Cloud Financial Management", services: ["AWS Cost and Usage Reports", "AWS Cost Explorer", "Savings Plans"] },
  { title: "Compute", services: ["Amazon EC2", "Amazon EC2 Image Builder", "AWS Lambda"] },
  { title: "Containers", services: ["Amazon ECR", "Amazon ECS", "Amazon EKS"] },
  { title: "Database", services: ["Amazon Aurora", "Amazon Aurora Serverless v2", "Amazon DynamoDB", "Amazon DynamoDB Accelerator (DAX)", "Amazon ElastiCache", "Amazon RDS", "Amazon RDS Proxy"] },
  { title: "Developer Tools", services: ["AWS X-Ray", "Kiro"] },
  { title: "Machine Learning and Artificial Intelligence", services: ["Amazon Bedrock"] },
  { title: "Management and Governance", services: ["AWS Auto Scaling", "AWS CDK", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Compute Optimizer", "AWS Config", "AWS Control Tower", "AWS DevOps Agent", "AWS Health Dashboard", "Amazon Managed Grafana", "AWS Managed Service for Prometheus", "AWS Organizations", "AWS Resource Access Manager (AWS RAM)", "AWS Service Catalog", "Service control policies (SCPs)", "AWS Systems Manager", "AWS Trusted Advisor", "Amazon VPC IP Address Manager (IPAM)"] },
  { title: "Migration and Transfer", services: ["AWS DataSync"] },
  { title: "Network and Content Delivery", services: ["Amazon Application Recovery Controller", "AWS Client VPN", "Amazon CloudFront", "Elastic IP addresses", "AWS Global Accelerator", "AWS PrivateLink", "Amazon Route 53", "Amazon Route 53 Resolver DNS Firewall", "AWS Site-to-Site VPN", "AWS Transit Gateway", "Amazon VPC", "VPC endpoints", "VPC Flow Logs", "VPC peering", "VPC Reachability Analyzer"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Certificate Manager (ACM)", "Amazon EC2 security groups", "Egress-only internet gateways", "Elastic Load Balancing (ELB)", "Amazon GuardDuty", "AWS IAM Access Analyzer", "AWS IAM Identity Center", "IAM", "Amazon Inspector", "Internet gateways", "AWS KMS", "Amazon Macie", "AWS Network Firewall", "NAT gateways", "Network ACLs", "AWS Secrets Manager", "AWS Security Agent", "AWS Security Hub", "AWS Shield", "AWS WAF"] },
  { title: "Storage", services: ["AWS Backup", "Amazon EBS", "Amazon EFS", "Amazon FSx", "Amazon S3", "AWS Storage Gateway"] },
];

export const deaScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon EMR", "AWS Glue", "AWS Glue DataBrew", "AWS Lake Formation", "Amazon Kinesis Data Firehose", "Amazon Kinesis Data Streams", "Amazon Managed Service for Apache Flink", "Amazon Managed Streaming for Apache Kafka (Amazon MSK)", "Amazon OpenSearch Service", "Amazon Quick", "Amazon SageMaker AI"] },
  { title: "Application Integration", services: ["Amazon AppFlow", "Amazon EventBridge", "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)", "Amazon SNS", "Amazon SQS", "AWS Step Functions"] },
  { title: "Cloud Financial Management", services: ["AWS Budgets", "AWS Cost Explorer"] },
  { title: "Compute", services: ["AWS Batch", "Amazon EC2", "AWS Lambda", "AWS SAM"] },
  { title: "Containers", services: ["Amazon ECR", "Amazon ECS", "Amazon EKS"] },
  { title: "Database", services: ["Amazon DocumentDB", "Amazon DynamoDB", "Amazon Keyspaces", "Amazon MemoryDB for Redis", "Amazon Neptune", "Amazon RDS", "Amazon Aurora", "Amazon Redshift"] },
  { title: "Developer Tools", services: ["AWS CLI", "AWS CloudFormation", "AWS CDK", "AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline", "Amazon Q"] },
  { title: "Web and Mobile", services: ["Amazon API Gateway"] },
  { title: "Machine Learning", services: ["Amazon SageMaker AI", "Amazon Bedrock", "Amazon Kendra"] },
  { title: "Management and Governance", services: ["AWS CloudTrail", "Amazon CloudWatch", "Amazon CloudWatch Logs", "AWS Config", "Amazon Managed Grafana", "AWS Systems Manager", "AWS Well-Architected Tool", "AWS Data Exchange"] },
  { title: "Migration and Transfer", services: ["AWS Application Discovery Service", "AWS Application Migration Service", "AWS DMS", "AWS DataSync", "AWS Snow Family", "AWS Transfer Family"] },
  { title: "Networking and Content Delivery", services: ["Amazon CloudFront", "AWS PrivateLink", "Amazon Route 53", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["IAM", "AWS KMS", "Amazon Macie", "AWS Secrets Manager", "AWS Shield", "AWS WAF"] },
  { title: "Storage", services: ["AWS Backup", "Amazon EBS", "Amazon EFS", "Amazon S3", "Amazon S3 Tables", "Amazon S3 Glacier"] },
];

export const mlaScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon Data Firehose", "Amazon EMR", "AWS Glue", "AWS Glue DataBrew", "AWS Glue Data Quality", "Amazon Kinesis", "AWS Lake Formation", "Amazon Managed Service for Apache Flink", "Amazon OpenSearch Service", "Amazon Quick", "Amazon Redshift"] },
  { title: "Application Integration", services: ["Amazon EventBridge", "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)", "Amazon SNS", "Amazon SQS", "AWS Step Functions"] },
  { title: "Cloud Financial Management", services: ["AWS Billing and Cost Management", "AWS Budgets", "AWS Cost Explorer"] },
  { title: "Compute", services: ["AWS Batch", "Amazon EC2", "AWS Lambda", "AWS Serverless Application Repository"] },
  { title: "Containers", services: ["Amazon ECR", "Amazon ECS", "Amazon EKS"] },
  { title: "Database", services: ["Amazon DocumentDB", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon Neptune", "Amazon RDS"] },
  { title: "Developer Tools", services: ["AWS CDK", "AWS CodeArtifact", "AWS CodeBuild", "AWS CodeDeploy", "AWS CodePipeline", "AWS X-Ray"] },
  { title: "Machine Learning", services: ["Amazon Augmented AI (Amazon A2I)", "Amazon Bedrock", "Amazon CodeGuru", "Amazon Comprehend", "Amazon Comprehend Medical", "Amazon DevOps Guru", "Amazon Fraud Detector", "AWS HealthLake", "Amazon Kendra", "Amazon Lex", "Amazon Lookout for Equipment", "Amazon Lookout for Metrics", "Amazon Lookout for Vision", "Amazon Mechanical Turk", "Amazon Personalize", "Amazon Polly", "Amazon Q", "Amazon Rekognition", "Amazon SageMaker", "Amazon Textract", "Amazon Transcribe", "Amazon Translate"] },
  { title: "Management and Governance", services: ["AWS Auto Scaling", "AWS Chatbot", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "Amazon CloudWatch Logs", "AWS Compute Optimizer", "AWS Config", "AWS Organizations", "AWS Service Catalog", "AWS Systems Manager", "AWS Trusted Advisor"] },
  { title: "Media", services: ["Amazon Kinesis Video Streams"] },
  { title: "Migration and Transfer", services: ["AWS DataSync"] },
  { title: "Networking and Content Delivery", services: ["Amazon API Gateway", "Amazon CloudFront", "AWS Direct Connect", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["AWS KMS", "Amazon Macie", "AWS Secrets Manager", "IAM"] },
  { title: "Storage", services: ["Amazon EBS", "Amazon EFS", "Amazon FSx", "Amazon S3", "Amazon S3 Glacier", "AWS Storage Gateway"] },
];

export const dopScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon EMR", "Amazon Kinesis Data Firehose", "Amazon Kinesis Data Streams", "Amazon OpenSearch Service", "Amazon Quick Sight"] },
  { title: "Application Integration", services: ["Amazon AppFlow", "Amazon EventBridge"] },
  { title: "Compute", services: ["AWS App Runner", "Amazon EC2", "Amazon EC2 Auto Scaling", "EC2 Image Builder", "AWS Elastic Beanstalk", "AWS Serverless Application Repository"] },
  { title: "Containers", services: ["AWS App2Container", "AWS Copilot", "Amazon Elastic Container Registry (Amazon ECR)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)", "Amazon EKS Distro", "AWS Fargate", "Red Hat OpenShift Service on AWS (ROSA)"] },
  { title: "Database", services: ["Amazon Aurora", "Amazon Aurora Serverless v2", "AWS Database Migration Service (AWS DMS)", "Amazon DocumentDB (with MongoDB compatibility)", "Amazon DynamoDB", "Amazon ElastiCache", "Amazon MemoryDB for Redis", "Amazon RDS", "Amazon Redshift"] },
  { title: "Developer Tools", services: ["AWS CLI", "AWS Cloud Development Kit (AWS CDK)", "AWS CloudShell", "AWS CodeArtifact", "AWS CodeBuild", "AWS CodeDeploy", "Amazon CodeGuru", "AWS CodePipeline", "AWS CodeStar", "AWS Fault Injection Simulator (AWS FIS)", "AWS SDKs and Tools", "AWS X-Ray"] },
  { title: "Management and Governance", services: ["AWS Auto Scaling", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "Amazon CloudWatch Logs", "AWS Compute Optimizer", "AWS Config", "AWS Control Tower", "AWS Health", "AWS License Manager", "Amazon Managed Grafana", "Amazon Managed Service for Prometheus", "AWS OpsWorks", "AWS Organizations", "AWS Proton", "AWS Resilience Hub", "AWS Service Catalog", "AWS Systems Manager", "AWS Trusted Advisor"] },
  { title: "Networking and Content Delivery", services: ["Amazon API Gateway", "AWS Client VPN", "Amazon CloudFront", "Elastic Load Balancing (ELB)", "AWS PrivateLink", "Amazon Route 53", "AWS Site-to-Site VPN", "AWS Transit Gateway", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Certificate Manager (ACM)", "AWS CloudHSM", "Amazon Cognito", "Amazon Detective", "AWS Directory Service", "Amazon GuardDuty", "AWS IAM Identity Center", "AWS Identity and Access Management (IAM)", "Amazon Inspector", "AWS Key Management Service (AWS KMS)", "Amazon Macie", "AWS Network Firewall", "AWS Resource Access Manager (AWS RAM)", "AWS Secrets Manager", "AWS Security Hub", "AWS Security Token Service (AWS STS)", "AWS Shield", "AWS WAF"] },
  { title: "Serverless", services: ["AWS Lambda", "AWS Serverless Application Model (AWS SAM)", "Amazon Simple Notification Service (Amazon SNS)", "Amazon Simple Queue Service (Amazon SQS)", "AWS Step Functions"] },
  { title: "Storage", services: ["AWS Backup", "Amazon Elastic Block Store (Amazon EBS)", "AWS Elastic Disaster Recovery", "Amazon Elastic File System (Amazon EFS)", "Amazon FSx for Lustre", "Amazon FSx for NetApp ONTAP", "Amazon FSx for OpenZFS", "Amazon FSx for Windows File Server", "Amazon S3", "Amazon S3 Glacier", "AWS Storage Gateway"] },
];

export const ansScope: ScopeCategory[] = [
  { title: "Application Integration", services: ["Amazon EventBridge", "Amazon Simple Notification Service (Amazon SNS)", "Amazon Simple Queue Service (Amazon SQS)"] },
  { title: "Compute", services: ["Amazon EC2", "Amazon EC2 Auto Scaling", "AWS Lambda"] },
  { title: "Containers", services: ["Amazon Elastic Container Registry (Amazon ECR)", "Amazon Elastic Container Service (Amazon ECS)", "Amazon Elastic Kubernetes Service (Amazon EKS)", "AWS Fargate"] },
  { title: "Cost Management", services: ["AWS Cost Explorer"] },
  { title: "Front-End Web and Mobile", services: ["Amazon API Gateway"] },
  { title: "Management and Governance", services: ["AWS Auto Scaling", "AWS CLI", "AWS CloudFormation", "AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Control Tower", "AWS Health Dashboard", "AWS Management Console", "AWS Organizations", "AWS Trusted Advisor", "AWS Well-Architected Tool"] },
  { title: "Networking and Content Delivery", services: ["Amazon API Gateway", "AWS App Mesh", "AWS Client VPN", "AWS Cloud Map", "Amazon CloudFront", "AWS Direct Connect", "Elastic Load Balancing (ELB)", "AWS Global Accelerator", "AWS PrivateLink", "Amazon Route 53", "AWS Site-to-Site VPN", "AWS Transit Gateway", "Amazon VPC"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Firewall Manager", "AWS Identity and Access Management (IAM)", "AWS Network Firewall", "AWS Resource Access Manager (AWS RAM)", "AWS Shield", "AWS WAF"] },
  { title: "Serverless", services: ["Amazon API Gateway", "Amazon EventBridge", "AWS Fargate", "AWS Lambda", "Amazon Simple Notification Service (Amazon SNS)", "Amazon Simple Queue Service (Amazon SQS)", "Amazon Simple Storage Service (Amazon S3)"] },
  { title: "Storage", services: ["Amazon S3"] },
];
