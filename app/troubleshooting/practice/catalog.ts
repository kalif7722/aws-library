export type PracticeLab = { id: string; title: string; goal: string; ready?: boolean };
export type PracticeSection = { id: string; title: string; labs: PracticeLab[] };

// Stable IDs are intended for links from certification courses and service pages.
export const practiceSections: PracticeSection[] = [
  { id: 'start', title: '01 · Console foundations', labs: [
    { id: 'ec2-first-instance', title: 'Launch and inspect an EC2 instance', goal: 'Navigate the console, choose a Region, configure, connect, and clean up.', ready: true },
    { id: 'account-billing', title: 'Account, Regions, budgets and tags', goal: 'Find account settings, cost controls, and resource ownership.' },
  ] },
  { id: 'identity', title: '02 · Identity and security', labs: [
    { id: 'iam-role', title: 'IAM roles and least privilege', goal: 'Trace effective permissions and attach a role to a workload.' },
    { id: 'kms-secrets', title: 'KMS and Secrets Manager', goal: 'Inspect encryption keys, grants, and secret access.' },
  ] },
  { id: 'network', title: '03 · Networking', labs: [
    { id: 'vpc-path', title: 'VPC, subnets, routes and gateways', goal: 'Follow public and private traffic paths.' },
    { id: 'security-boundaries', title: 'Security groups and network ACLs', goal: 'Compare stateful and stateless controls.' },
    { id: 'elb-dns', title: 'Load balancing, DNS and TLS', goal: 'Trace a request through Route 53, ACM and ALB.' },
  ] },
  { id: 'storage', title: '04 · Storage and data', labs: [
    { id: 's3-bucket', title: 'S3 buckets and access', goal: 'Configure versioning, encryption, lifecycle and access.' },
    { id: 'ebs-efs', title: 'EBS snapshots and EFS', goal: 'Compare block and shared file storage.' },
    { id: 'rds-dynamodb', title: 'RDS and DynamoDB', goal: 'Inspect connectivity, backups, scaling and capacity.' },
  ] },
  { id: 'compute', title: '05 · Compute and application', labs: [
    { id: 'autoscaling', title: 'Launch templates and Auto Scaling', goal: 'Inspect capacity, health checks and replacement.' },
    { id: 'lambda-events', title: 'Lambda and event routing', goal: 'Connect a function to EventBridge, SQS and logs.' },
    { id: 'containers', title: 'ECR, ECS and Fargate', goal: 'Follow image, task, service and deployment.' },
  ] },
  { id: 'operations', title: '06 · Operations and governance', labs: [
    { id: 'cloudwatch-cloudtrail', title: 'CloudWatch and CloudTrail', goal: 'Distinguish metrics, logs, alarms and audit events.' },
    { id: 'cloudformation', title: 'CloudFormation stacks', goal: 'Review change sets, drift, rollback and outputs.' },
    { id: 'resilience-cost', title: 'Resilience and cost review', goal: 'Review backups, multi-AZ choices, budgets and cleanup.' },
  ] },
];
export const practiceHref = (id: string) => `/troubleshooting/practice?lab=${encodeURIComponent(id)}`;
