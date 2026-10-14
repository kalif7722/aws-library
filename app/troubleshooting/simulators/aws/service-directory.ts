/**
 * AWS Management Console service directory.
 *
 * "implemented" means a service has a dedicated simulator screen today.
 * Catalog-only entries can be pinned from search, but are clearly marked as
 * not yet simulated so the UI never implies that a placeholder is functional.
 */
export type AwsServiceDirectoryEntry = {
  name: string;
  category: string;
  icon: string;
  description: string;
  count: string;
  implemented: boolean;
  screen?: string;
};

export const AWS_SERVICE_DIRECTORY: AwsServiceDirectoryEntry[] = [
  { name: "EC2", category: "Compute", icon: "▣", description: "Virtual servers in the cloud", count: "1 instance", implemented: true, screen: "EC2 Dashboard" },
  { name: "VPC", category: "Networking & Content Delivery", icon: "◇", description: "Isolated virtual networks and routing", count: "1 VPC", implemented: true, screen: "VPCs" },
  { name: "Security Groups", category: "Networking & Security", icon: "⬡", description: "Stateful traffic controls for resources", count: "2 security groups", implemented: true, screen: "Security Groups" },
  { name: "Route Tables", category: "Networking & Security", icon: "⇄", description: "Subnet routing configuration", count: "1 route table", implemented: true, screen: "Route Tables" },
  { name: "Network ACLs", category: "Networking & Security", icon: "▤", description: "Stateless subnet traffic controls", count: "1 network ACL", implemented: true, screen: "Network ACLs" },
  { name: "Load Balancers", category: "Networking & Content Delivery", icon: "⇋", description: "Distribute application traffic", count: "1 load balancer", implemented: true, screen: "Load Balancers" },
  { name: "Target Groups", category: "Networking & Content Delivery", icon: "◎", description: "Register targets for load balancers", count: "2 target groups", implemented: true, screen: "Target Groups" },
  { name: "S3", category: "Storage", icon: "▰", description: "Object storage", count: "3 buckets", implemented: true, screen: "S3" },
  { name: "IAM", category: "Security, Identity & Compliance", icon: "♙", description: "Users, roles, policies, and permissions", count: "3 roles · sample policies", implemented: true, screen: "IAM" },
  { name: "RDS", category: "Database", icon: "▤", description: "Managed relational databases", count: "1 database", implemented: true, screen: "RDS" },
  { name: "Lambda", category: "Compute", icon: "λ", description: "Run code without managing servers", count: "3 functions", implemented: true, screen: "Lambda" },
  { name: "CloudWatch", category: "Management & Governance", icon: "◷", description: "Metrics, logs, alarms, and events", count: "8 alarms", implemented: true, screen: "CloudWatch" },
  { name: "Route 53", category: "Networking & Content Delivery", icon: "⌘", description: "DNS and health checks", count: "2 hosted zones", implemented: true, screen: "Route 53" },
  { name: "DynamoDB", category: "Database", icon: "▦", description: "Managed NoSQL database", count: "2 tables", implemented: true, screen: "DynamoDB" },
  { name: "Cost Explorer", category: "Cloud Financial Management", icon: "$", description: "Explore usage and spending", count: "Current month", implemented: true, screen: "Cost Explorer" },
  { name: "Reachability Analyzer", category: "Network & Security", icon: "⌁", description: "Analyze paths between network resources", count: "Available", implemented: true, screen: "Reachability Analyzer" },
  { name: "CloudTrail", category: "Management & Governance", icon: "≋", description: "Audit API activity and account events", count: "2 trails", implemented: false },
  { name: "Elastic Load Balancing", category: "Networking & Content Delivery", icon: "⇋", description: "Application, network, and gateway load balancers", count: "Catalog entry", implemented: false },
  { name: "Auto Scaling", category: "Compute", icon: "↗", description: "Scale compute capacity to demand", count: "Catalog entry", implemented: false },
  { name: "Systems Manager", category: "Management & Governance", icon: "⚙", description: "Operate and manage cloud resources", count: "Catalog entry", implemented: false },
  { name: "AWS Config", category: "Management & Governance", icon: "☷", description: "Track resource configuration and compliance", count: "Catalog entry", implemented: false },
  { name: "Secrets Manager", category: "Security, Identity & Compliance", icon: "🔑", description: "Store and rotate application secrets", count: "Catalog entry", implemented: false },
  { name: "KMS", category: "Security, Identity & Compliance", icon: "⚿", description: "Create and manage encryption keys", count: "Catalog entry", implemented: false },
  { name: "ECS", category: "Containers", icon: "▦", description: "Run and manage containers", count: "Catalog entry", implemented: false },
  { name: "EKS", category: "Containers", icon: "◈", description: "Managed Kubernetes", count: "Catalog entry", implemented: false },
  { name: "ECR", category: "Containers", icon: "▤", description: "Store and distribute container images", count: "Catalog entry", implemented: false },
  { name: "API Gateway", category: "Application Integration", icon: "⇆", description: "Create and manage application APIs", count: "Catalog entry", implemented: false },
  { name: "Step Functions", category: "Application Integration", icon: "⌘", description: "Coordinate distributed workflows", count: "Catalog entry", implemented: false },
  { name: "SQS", category: "Application Integration", icon: "☰", description: "Managed message queues", count: "Catalog entry", implemented: false },
  { name: "SNS", category: "Application Integration", icon: "◉", description: "Managed pub/sub notifications", count: "Catalog entry", implemented: false },
  { name: "EventBridge", category: "Application Integration", icon: "↔", description: "Route events between services", count: "Catalog entry", implemented: false },
  { name: "Glue", category: "Analytics", icon: "⋈", description: "Serverless data integration and ETL", count: "Catalog entry", implemented: false },
  { name: "Athena", category: "Analytics", icon: "⌕", description: "Query data in Amazon S3", count: "Catalog entry", implemented: false },
  { name: "Redshift", category: "Analytics", icon: "▥", description: "Cloud data warehouse", count: "Catalog entry", implemented: false },
  { name: "OpenSearch Service", category: "Analytics", icon: "⌕", description: "Search and analyze application data", count: "Catalog entry", implemented: false },
  { name: "ElastiCache", category: "Database", icon: "▧", description: "In-memory caching", count: "Catalog entry", implemented: false },
  { name: "EFS", category: "Storage", icon: "▤", description: "Elastic shared file storage", count: "Catalog entry", implemented: false },
  { name: "FSx", category: "Storage", icon: "▤", description: "Managed file systems", count: "Catalog entry", implemented: false },
  { name: "CloudFront", category: "Networking & Content Delivery", icon: "◉", description: "Content delivery network", count: "Catalog entry", implemented: false },
  { name: "WAF", category: "Security, Identity & Compliance", icon: "⛨", description: "Protect web applications from common attacks", count: "Catalog entry", implemented: false },
  { name: "GuardDuty", category: "Security, Identity & Compliance", icon: "◉", description: "Detect threats in AWS accounts and workloads", count: "Catalog entry", implemented: false },
  { name: "Security Hub", category: "Security, Identity & Compliance", icon: "⛨", description: "Centralize security findings and posture", count: "Catalog entry", implemented: false },
  { name: "Macie", category: "Security, Identity & Compliance", icon: "◈", description: "Discover and protect sensitive data in S3", count: "Catalog entry", implemented: false },
  { name: "Organizations", category: "Management & Governance", icon: "▣", description: "Manage accounts and organizational policies", count: "Catalog entry", implemented: false },
  { name: "Control Tower", category: "Management & Governance", icon: "⌂", description: "Govern multi-account AWS environments", count: "Catalog entry", implemented: false },
  { name: "Backup", category: "Storage", icon: "↻", description: "Centralize and automate backups", count: "Catalog entry", implemented: false },
  { name: "Bedrock", category: "Artificial Intelligence", icon: "✧", description: "Build generative AI applications", count: "Catalog entry", implemented: false },
  { name: "SageMaker AI", category: "Artificial Intelligence", icon: "✧", description: "Build, train, and deploy machine learning models", count: "Catalog entry", implemented: false },
];
