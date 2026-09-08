import type { ScopeCategory } from "./course-data";

export const scsScope: ScopeCategory[] = [
  { title: "Analytics", services: ["Amazon Athena", "Amazon OpenSearch Service"] },
  { title: "Application Integration", services: ["Amazon SNS", "AWS Step Functions"] },
  { title: "Compute", services: ["Amazon API Gateway", "Amazon EC2", "Amazon EKS", "Amazon EMR", "AWS Lambda", "Amazon Data Lifecycle Manager"] },
  { title: "Developer Tools", services: ["AWS Fault Injection Service"] },
  { title: "Internet of Things", services: ["AWS IoT Core"] },
  { title: "Machine Learning", services: ["Amazon Bedrock", "Amazon CodeGuru Security", "Amazon Q Business", "Amazon Q Developer", "Amazon SageMaker AI"] },
  { title: "Management and Governance", services: ["AWS CloudFormation", "AWS CloudTrail", "AWS CloudTrail Lake", "Amazon CloudWatch", "AWS Config", "AWS Control Tower", "Amazon Managed Grafana", "AWS Organizations", "AWS Resilience Hub", "AWS Resource Access Manager (AWS RAM)", "AWS Service Catalog", "AWS Systems Manager", "AWS Trusted Advisor", "AWS User Notifications", "AWS Well-Architected Tool"] },
  { title: "Networking and Content Delivery", services: ["Amazon Application Recovery Controller", "Amazon VPC", "AWS Client VPN", "Amazon CloudFront", "Amazon Verified Permissions", "Amazon Route 53", "AWS Direct Connect", "Elastic Load Balancing (ELB)", "Network Access Analyzer", "AWS Transit Gateway"] },
  { title: "Security, Identity, and Compliance", services: ["AWS Artifact", "AWS Audit Manager", "AWS Certificate Manager (ACM)", "AWS CloudHSM", "Amazon Cognito", "Amazon Detective", "AWS Directory Service", "AWS Firewall Manager", "Automated Forensics Orchestrator for Amazon EC2", "Amazon GuardDuty", "IAM", "AWS IAM Identity Center", "Amazon Inspector", "AWS KMS", "Amazon Macie", "AWS Network Firewall", "AWS Private Certificate Authority", "AWS Secrets Manager", "AWS Security Hub", "Amazon Security Lake", "AWS Shield", "AWS Shield Advanced", "AWS STS", "AWS WAF"] },
  { title: "Storage and Data Management", services: ["Amazon S3", "AWS Backup", "AWS DataSync", "Amazon EFS", "Amazon FSx for Lustre"] },
];
