"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../../lib/asset-url";

export const services = [
  { name: "AWS Config", file: "/el10/aws-config.webp", accent: "#7c3aed", summary: "Configuration history and continuous compliance" },
  { name: "Systems Manager", file: "/el10/systems-manager.webp", accent: "#db2777", summary: "Fleet operations, patching, secure access, and automation" },
  { name: "Audit Manager", file: "/el10/audit-manager.webp", accent: "#9333ea", summary: "Automated audit evidence collection and reporting" },
  { name: "AWS Organizations", file: "/el10/organizations.webp", accent: "#2563eb", summary: "Multi-account hierarchy, billing, and policy guardrails" },
  { name: "AWS Control Tower", file: "/el10/control-tower.webp", accent: "#ea580c", summary: "Governed multi-account landing zones" },
  { name: "AWS CloudFormation", file: "/el10/cloudformation.webp", accent: "#ec4899", summary: "Provision AWS infrastructure as code" },
  { name: "CloudFormation StackSets", file: "/el10/cloudformation-stacksets.webp", accent: "#db2777", summary: "Deploy stacks across accounts and Regions" },
  { name: "AWS CloudTrail", file: "/el10/cloudtrail.webp", accent: "#7c3aed", summary: "Record and investigate AWS API activity" },
  { name: "AWS Service Catalog", file: "/el10/service-catalog.webp", accent: "#2563eb", summary: "Govern approved cloud products and portfolios" },
  { name: "AWS Compute Optimizer", file: "/el10/compute-optimizer.webp", accent: "#16a34a", summary: "Rightsizing recommendations from utilization data" },
  { name: "Amazon EventBridge", file: "/el10/eventbridge-final.webp", accent: "#7c3aed", summary: "Event buses, rules, pipes, and serverless automation" },
  { name: "AWS Resource Explorer", file: "/el10/resource-explorer-final.webp", accent: "#2563eb", summary: "Search and discover resources across Regions and accounts" },
  { name: "AWS Auto Scaling", file: "/el10/auto-scaling.webp", accent: "#16a34a", summary: "Automatically adjust capacity to match demand" },
  { name: "AWS Trusted Advisor", file: "/el10/trusted-advisor.webp", accent: "#16a34a", summary: "Recommendations for cost, security, performance, and limits" },
  { name: "AWS Well-Architected Tool", file: "/el10/well-architected.webp", accent: "#7c3aed", summary: "Review workloads against the six pillars" },
  { name: "AWS Artifact", file: "/el10/artifact.webp", accent: "#7c3aed", summary: "Access AWS compliance reports and agreements" },
  { name: "AWS License Manager", file: "/el10/license-manager.webp", accent: "#2563eb", summary: "Track and govern software license usage" },
  { name: "AWS Resource Groups", file: "/el10/resource-groups.webp", accent: "#7c3aed", summary: "Organize related resources into logical groups" },
  { name: "AWS Service Quotas", file: "/el10/service-quotas.webp", accent: "#2563eb", summary: "View limits and request quota increases" },
  { name: "AWS Health Dashboard", file: "/el10/health-dashboard.webp", accent: "#16a34a", summary: "Personalized visibility into AWS service events" },
  { name: "AWS User Notifications", file: "/el10/user-notifications.webp", accent: "#db2777", summary: "Route AWS notifications to the right channels" },
  { name: "AWS Account Management", file: "/el10/account-management.webp", accent: "#2563eb", summary: "Manage account profile, contacts, and Regions" },
  { name: "AWS Resource Access Manager (RAM)", file: "/el10/ram.webp", accent: "#7c3aed", summary: "Share resources securely across accounts and organizations" },
  { name: "AWS Billing and Cost Management", file: "/el10/billing-cost.webp", accent: "#2563eb", summary: "Understand, allocate, and optimize AWS spending" },
  { name: "AWS Budgets", file: "/el10/budgets.webp", accent: "#16a34a", summary: "Set thresholds, alerts, and automated cost actions" },
  { name: "AWS Cost Explorer", file: "/el10/cost-explorer.webp", accent: "#7c3aed", summary: "Analyze cost and usage with forecasts and reports" },
  { name: "AWS Service Management / AppRegistry", file: "/el10/appregistry.webp", accent: "#db2777", summary: "Register applications and connect operational metadata" },
  { name: "Amazon CloudWatch", file: "/el10/cloudwatch.webp", accent: "#db2777", summary: "Metrics, logs, alarms, traces, and dashboards" },
  { name: "AWS Console Mobile Application", file: "/el10/console-mobile.webp", accent: "#2563eb", summary: "Monitor and manage selected resources on mobile" },
  { name: "AWS Launch Wizard", file: "/el10/launch-wizard.webp", accent: "#7c3aed", summary: "Guided deployment for complex third-party workloads" },
  { name: "Amazon Managed Grafana", file: "/el10/managed-grafana.webp", accent: "#7c3aed", summary: "Managed operational dashboards and visualization" },
  { name: "Amazon Managed Service for Prometheus", file: "/el10/managed-prometheus.webp", accent: "#7c3aed", summary: "Managed Prometheus metrics and alerting" },
  { name: "AWS OpsWorks (Legacy)", file: "/el10/opsworks.webp", accent: "#ea580c", summary: "Chef/Puppet operations; legacy maintenance mode" },
  { name: "Amazon Q Developer in chat applications", file: "/el10/q-developer-chat.webp", accent: "#7c3aed", summary: "ChatOps notifications and controlled AWS actions" },
  { name: "AWS IAM", file: "/el10/iam.webp", accent: "#7c3aed", summary: "Users, roles, policies, and permission boundaries" },
  { name: "AWS IAM Identity Center", file: "/el10/iam-identity-center.webp", accent: "#2563eb", summary: "Central workforce access to accounts and applications" },
  { name: "Amazon Cognito", file: "/el10/cognito.webp", accent: "#7c3aed", summary: "Customer identity, sign-in, and federation" },
  { name: "AWS Directory Service", file: "/el10/directory-service.webp", accent: "#2563eb", summary: "Managed Microsoft AD and directory integration" },
  { name: "AWS KMS", file: "/el10/kms.webp", accent: "#16a34a", summary: "Create and control encryption keys" },
  { name: "AWS CloudHSM", file: "/el10/cloudhsm.webp", accent: "#7c3aed", summary: "Dedicated hardware security modules" },
  { name: "AWS Certificate Manager", file: "/el10/acm.webp", accent: "#2563eb", summary: "Provision and manage TLS certificates" },
  { name: "AWS Secrets Manager", file: "/el10/secrets-manager.webp", accent: "#16a34a", summary: "Store, rotate, and retrieve secrets securely" },
  { name: "Amazon GuardDuty", file: "/el10/guardduty.webp", accent: "#dc2626", summary: "Continuous threat detection" },
  { name: "Amazon Inspector", file: "/el10/inspector.webp", accent: "#ea580c", summary: "Workload vulnerability and exposure scanning" },
  { name: "Amazon Macie", file: "/el10/macie.webp", accent: "#7c3aed", summary: "Discover and protect sensitive S3 data" },
  { name: "AWS Security Hub", file: "/el10/security-hub.webp", accent: "#dc2626", summary: "Aggregate and prioritize security findings" },
  { name: "AWS WAF", file: "/el10/waf.webp", accent: "#dc2626", summary: "Protect web applications and APIs" },
  { name: "AWS Shield", file: "/el10/shield.webp", accent: "#dc2626", summary: "Automatic and advanced DDoS protection" },
  { name: "AWS Firewall Manager", file: "/el10/firewall-manager.webp", accent: "#7c3aed", summary: "Central security policy enforcement" },
  { name: "AWS Network Firewall", file: "/el10/network-firewall.webp", accent: "#dc2626", summary: "Stateful and stateless VPC inspection" },
  { name: "Amazon Detective", file: "/el10/detective.webp", accent: "#7c3aed", summary: "Investigate findings and behavior relationships" },
  { name: "Amazon EC2", file: "/el10/compute/ec2.webp", accent: "#ea580c", summary: "Secure, resizable virtual servers" },
  { name: "Amazon ECS", file: "/el10/compute/ecs.webp", accent: "#ea580c", summary: "Managed container orchestration" },
  { name: "Amazon EKS", file: "/el10/compute/eks.webp", accent: "#2563eb", summary: "Managed Kubernetes on AWS" },
  { name: "Amazon ECR", file: "/el10/compute/ecr.webp", accent: "#ea580c", summary: "Managed container image registry" },
  { name: "AWS Fargate", file: "/el10/compute/fargate.webp", accent: "#ea580c", summary: "Serverless compute for containers" },
  { name: "AWS Lambda", file: "/el10/compute/lambda.webp", accent: "#ea580c", summary: "Run code without managing servers" },
  { name: "AWS Elastic Beanstalk", file: "/el10/compute/elastic-beanstalk.webp", accent: "#16a34a", summary: "Deploy and scale web applications" },
  { name: "AWS Batch", file: "/el10/compute/batch.webp", accent: "#7c3aed", summary: "Fully managed batch processing" },
  { name: "AWS App Runner", file: "/el10/compute/app-runner.webp", accent: "#ea580c", summary: "Build and run containerized applications" },
  { name: "Amazon Lightsail", file: "/el10/compute/lightsail.webp", accent: "#7c3aed", summary: "Simple virtual servers and applications" },
  { name: "Amazon ECS Anywhere", file: "/el10/compute/ecs-anywhere.webp", accent: "#ea580c", summary: "Run ECS tasks on customer infrastructure" },
  { name: "Amazon EKS Anywhere", file: "/el10/compute/eks-anywhere.webp", accent: "#2563eb", summary: "Run Kubernetes on your infrastructure" },
  { name: "AWS Serverless Application Repository", file: "/el10/compute/serverless-repository.webp", accent: "#7c3aed", summary: "Discover and deploy serverless applications" },
  { name: "AWS Outposts", file: "/el10/compute/outposts.webp", accent: "#7c3aed", summary: "AWS infrastructure on premises" },
  { name: "AWS Wavelength", file: "/el10/compute/wavelength.webp", accent: "#2563eb", summary: "Ultra-low-latency 5G edge compute" },
  { name: "AWS Local Zones", file: "/el10/compute/local-zones.webp", accent: "#2563eb", summary: "Compute near end users" },
  { name: "VMware Cloud on AWS", file: "/el10/compute/vmware-cloud.webp", accent: "#16a34a", summary: "Run vSphere workloads on AWS" },
  { name: "Amazon S3", file: "/el10/storage/s3.webp", accent: "#16a34a", summary: "Scalable object storage and data lakes" },
  { name: "Amazon EBS", file: "/el10/storage/ebs.webp", accent: "#16a34a", summary: "Persistent block storage for EC2" },
  { name: "Amazon EFS", file: "/el10/storage/efs.webp", accent: "#16a34a", summary: "Serverless shared NFS file storage" },
  { name: "Amazon FSx", file: "/el10/storage/fsx.webp", accent: "#16a34a", summary: "Managed file-system family overview" },
  { name: "AWS Backup", file: "/el10/storage/backup.webp", accent: "#16a34a", summary: "Centralized policy-based data protection" },
  { name: "Amazon File Cache", file: "/el10/storage/file-cache.webp", accent: "#7c3aed", summary: "High-speed cache for distributed datasets" },
  { name: "Amazon FSx for Lustre", file: "/el10/storage/fsx-lustre.webp", accent: "#7c3aed", summary: "High-performance Lustre file storage" },
  { name: "Amazon FSx for NetApp ONTAP", file: "/el10/storage/fsx-ontap.webp", accent: "#16a34a", summary: "Managed enterprise ONTAP storage" },
  { name: "Amazon FSx for OpenZFS", file: "/el10/storage/fsx-openzfs.webp", accent: "#16a34a", summary: "Managed OpenZFS file storage" },
  { name: "Amazon FSx for Windows File Server", file: "/el10/storage/fsx-windows.webp", accent: "#16a34a", summary: "Managed Windows SMB file shares" },
  { name: "Amazon S3 Glacier", file: "/el10/storage/s3-glacier.webp", accent: "#7c3aed", summary: "Low-cost long-term archival storage" },
  { name: "AWS Elastic Disaster Recovery", file: "/el10/storage/elastic-disaster-recovery.webp", accent: "#7c3aed", summary: "Continuous replication and rapid recovery" },
  { name: "AWS Storage Gateway", file: "/el10/storage/storage-gateway.webp", accent: "#7c3aed", summary: "Hybrid access to AWS cloud storage" },
  { name: "AWS DataSync", file: "/el10/storage/datasync.webp", accent: "#0f766e", summary: "Accelerated online data transfer" },
  { name: "AWS Snowball Edge", file: "/el10/storage/snowball-edge.webp", accent: "#2563eb", summary: "Offline transfer and edge computing" },
  { name: "AWS Transfer Family", file: "/el10/storage/transfer-family.webp", accent: "#0f766e", summary: "Managed SFTP, FTPS, FTP and AS2" },
  { name: "Amazon RDS", file: "/el10/database/rds.webp", accent: "#2563eb", summary: "Managed relational databases with six engines" },
  { name: "Amazon Aurora", file: "/el10/database/aurora.webp", accent: "#7c3aed", summary: "Cloud-native MySQL and PostgreSQL-compatible database" },
  { name: "Amazon Aurora DSQL", file: "/el10/database/aurora-dsql.webp", accent: "#7c3aed", summary: "Serverless distributed SQL for global applications" },
  { name: "Amazon DynamoDB", file: "/el10/database/dynamodb.webp", accent: "#2563eb", summary: "Serverless key-value and document database" },
  { name: "Amazon DocumentDB", file: "/el10/database/documentdb.webp", accent: "#16a34a", summary: "Managed JSON document database" },
  { name: "Amazon ElastiCache", file: "/el10/database/elasticache.webp", accent: "#dc2626", summary: "Serverless and managed in-memory caching" },
  { name: "Amazon MemoryDB", file: "/el10/database/memorydb.webp", accent: "#7c3aed", summary: "Durable in-memory database" },
  { name: "Amazon Keyspaces", file: "/el10/database/keyspaces.webp", accent: "#7c3aed", summary: "Serverless Apache Cassandra-compatible database" },
  { name: "Amazon Neptune", file: "/el10/database/neptune.webp", accent: "#7c3aed", summary: "Managed graph database" },
  { name: "Amazon Neptune Analytics", file: "/el10/database/neptune-analytics.webp", accent: "#16a34a", summary: "High-performance graph analytics" },
  { name: "Amazon Timestream", file: "/el10/database/timestream.webp", accent: "#7c3aed", summary: "Purpose-built time-series databases" },
  { name: "AWS Database Migration Service", file: "/el10/database/dms.webp", accent: "#2563eb", summary: "Assess, convert, migrate and replicate data" },
  { name: "AWS Transform", file: "/el10/migration/aws-transform.webp", accent: "#7c3aed", summary: "Agentic AI for migration and modernization" },
  { name: "AWS Transform MGN", file: "/el10/migration/transform-mgn.webp", accent: "#ea580c", summary: "Rehost applications to AWS" },
  { name: "AWS Migration Hub", file: "/el10/migration/migration-hub.webp", accent: "#16a34a", summary: "Plan, track and govern application migrations" },
  { name: "AWS Application Discovery Service", file: "/el10/aws-application-discovery-service.webp", accent: "#16a34a", summary: "Discover workloads for migration planning" },
  { name: "Amazon API Gateway", file: "/el10/networking/api-gateway.webp", accent: "#8b5cf6", summary: "Create, secure, and operate APIs at scale" },
  { name: "Amazon CloudFront", file: "/el10/networking/cloudfront.webp", accent: "#8b5cf6", summary: "Global content delivery and edge acceleration" },
  { name: "AWS Cloud Map", file: "/el10/networking/cloud-map.webp", accent: "#8b5cf6", summary: "Dynamic service discovery for cloud resources" },
  { name: "AWS Direct Connect", file: "/el10/networking/direct-connect.webp", accent: "#8b5cf6", summary: "Dedicated private connectivity to AWS" },
  { name: "Elastic Load Balancing", file: "/el10/networking/elastic-load-balancing.webp", accent: "#8b5cf6", summary: "Distribute traffic across healthy targets" },
  { name: "AWS Global Accelerator", file: "/el10/networking/global-accelerator.webp", accent: "#8b5cf6", summary: "Improve global application availability and performance" },
  { name: "AWS PrivateLink", file: "/el10/networking/privatelink.webp", accent: "#8b5cf6", summary: "Private service connectivity over the AWS network" },
  { name: "Amazon Route 53", file: "/el10/networking/route-53.webp", accent: "#8b5cf6", summary: "Highly available DNS and traffic routing" },
  { name: "AWS Transit Gateway", file: "/el10/networking/transit-gateway.webp", accent: "#8b5cf6", summary: "Hub connectivity for VPCs and on-premises networks" },
  { name: "AWS Verified Access", file: "/el10/networking/verified-access.webp", accent: "#8b5cf6", summary: "Zero-trust access to private applications" },
  { name: "Amazon VPC", file: "/el10/networking/vpc.webp", accent: "#8b5cf6", summary: "Isolated virtual networks in AWS" },
  { name: "Amazon VPC Lattice", file: "/el10/networking/vpc-lattice.webp", accent: "#8b5cf6", summary: "Application networking across services and VPCs" },
  { name: "AWS Site-to-Site VPN", file: "/el10/networking/site-to-site-vpn.webp", accent: "#8b5cf6", summary: "Encrypted connectivity between networks and AWS" },
  { name: "AWS Cloud WAN", file: "/el10/networking/cloud-wan.webp", accent: "#8b5cf6", summary: "Build and manage global wide-area networks" },
  { name: "AWS Client VPN", file: "/el10/networking/client-vpn.webp", accent: "#8b5cf6", summary: "Managed remote access to AWS and on-premises" },
  { name: "AWS Network Manager", file: "/el10/networking/network-manager.webp", accent: "#8b5cf6", summary: "Central network topology, health, and operations" },
  { name: "Amazon VPC IPAM", file: "/el10/networking/vpc-ipam.webp", accent: "#8b5cf6", summary: "Plan, track, and govern IP address space" },
  { name: "AWS Data Transfer Terminal", file: "/el10/networking/data-transfer-terminal.webp", accent: "#8b5cf6", summary: "High-speed transfer at secure AWS facilities" },
  { name: "Integrated Private Wireless on AWS", file: "/el10/networking/integrated-private-wireless.webp", accent: "#8b5cf6", summary: "AWS-validated private wireless partner solutions" },
  { name: "AWS Private 5G", file: "/el10/networking/private-5g.webp", accent: "#8b5cf6", summary: "Managed private cellular networking" },
  { name: "AWS Infrastructure Composer", file: "/el10/developer-tools/infrastructure-composer.webp", accent: "#f97316", summary: "Visually compose serverless applications" },
  { name: "AWS CloudShell", file: "/el10/developer-tools/cloudshell.webp", accent: "#f97316", summary: "Browser-based authenticated shell for AWS" },
  { name: "AWS CodeArtifact", file: "/el10/developer-tools/codeartifact.webp", accent: "#f97316", summary: "Secure package repositories for development teams" },
  { name: "AWS CodeBuild", file: "/el10/developer-tools/codebuild.webp", accent: "#f97316", summary: "Managed continuous integration build service" },
  { name: "AWS CodeCommit", file: "/el10/developer-tools/codecommit.webp", accent: "#f97316", summary: "Private Git repositories with lifecycle constraints" },
  { name: "AWS CodeDeploy", file: "/el10/developer-tools/codedeploy.webp", accent: "#f97316", summary: "Automated application deployments" },
  { name: "AWS CodePipeline", file: "/el10/developer-tools/codepipeline.webp", accent: "#f97316", summary: "Continuous delivery workflow orchestration" },
  { name: "AWS CodeConnections", file: "/el10/developer-tools/codeconnections.webp", accent: "#f97316", summary: "Connect AWS developer services to source providers" },
  { name: "Amazon Corretto", file: "/el10/developer-tools/corretto.webp", accent: "#f97316", summary: "AWS-supported OpenJDK distribution" },
  { name: "AWS Fault Injection Service", file: "/el10/developer-tools/fault-injection-service.webp", accent: "#f97316", summary: "Controlled resilience experiments on AWS workloads" },
  { name: "Amazon Q Developer", file: "/el10/developer-tools/q-developer.webp", accent: "#f97316", summary: "Generative AI assistant for software development" },
  { name: "AWS X-Ray", file: "/el10/developer-tools/x-ray.webp", accent: "#f97316", summary: "Distributed tracing and service-map analysis" },
  { name: "Amazon Athena", file: "/el10/analytics/athena.webp", accent: "#ec4899", summary: "Serverless SQL analytics for data in Amazon S3" },
  { name: "Amazon DataZone", file: "/el10/analytics/datazone.webp", accent: "#ec4899", summary: "Governed data discovery, sharing, and collaboration" },
  { name: "Amazon EMR", file: "/el10/analytics/emr.webp", accent: "#ec4899", summary: "Managed big-data processing with open-source frameworks" },
  { name: "Amazon FinSpace", file: "/el10/analytics/finspace.webp", accent: "#ec4899", summary: "Financial data management and analytics" },
  { name: "Amazon Kinesis", file: "/el10/analytics/kinesis.webp", accent: "#ec4899", summary: "Real-time streaming services overview" },
  { name: "Amazon Data Firehose", file: "/el10/analytics/data-firehose.webp", accent: "#ec4899", summary: "Deliver streaming data to analytics destinations" },
  { name: "Amazon Kinesis Data Streams", file: "/el10/analytics/kinesis-data-streams.webp", accent: "#ec4899", summary: "Durable real-time data stream ingestion" },
  { name: "Amazon Kinesis Video Streams", file: "/el10/analytics/kinesis-video-streams.webp", accent: "#ec4899", summary: "Secure video streaming from connected devices" },
  { name: "Amazon Managed Service for Apache Flink", file: "/el10/analytics/managed-flink.webp", accent: "#ec4899", summary: "Real-time stream processing with Apache Flink" },
  { name: "Amazon Managed Streaming for Apache Kafka", file: "/el10/analytics/msk.webp", accent: "#ec4899", summary: "Managed Apache Kafka clusters and serverless streaming" },
  { name: "Amazon OpenSearch Service", file: "/el10/analytics/opensearch-service.webp", accent: "#ec4899", summary: "Managed search, log analytics, and observability" },
  { name: "Amazon OpenSearch Serverless", file: "/el10/analytics/opensearch-serverless.webp", accent: "#ec4899", summary: "Serverless search and analytics collections" },
  { name: "Amazon Redshift", file: "/el10/analytics/redshift.webp", accent: "#ec4899", summary: "Cloud data warehousing at scale" },
  { name: "Amazon Redshift Serverless", file: "/el10/analytics/redshift-serverless.webp", accent: "#ec4899", summary: "Serverless data warehouse capacity" },
  { name: "AWS Clean Rooms", file: "/el10/analytics/clean-rooms.webp", accent: "#ec4899", summary: "Collaborate on data without exposing raw records" },
  { name: "AWS Data Exchange", file: "/el10/analytics/data-exchange.webp", accent: "#ec4899", summary: "Discover, subscribe to, and deliver third-party data" },
  { name: "AWS Entity Resolution", file: "/el10/analytics/entity-resolution.webp", accent: "#ec4899", summary: "Match and link related records across datasets" },
  { name: "AWS Glue", file: "/el10/analytics/glue.webp", accent: "#ec4899", summary: "Serverless data integration and cataloging" },
  { name: "AWS Lake Formation", file: "/el10/analytics/lake-formation.webp", accent: "#ec4899", summary: "Build and govern secure data lakes" },
  { name: "AWS IoT Core", file: "/el10/iot/iot-core.webp", accent: "#14b8a6", summary: "Securely connect devices and route messages at scale" },
  { name: "AWS IoT Device Defender", file: "/el10/iot/device-defender.webp", accent: "#14b8a6", summary: "Audit and monitor IoT fleet security" },
  { name: "AWS IoT Device Management", file: "/el10/iot/device-management.webp", accent: "#14b8a6", summary: "Onboard, organize, monitor, and operate device fleets" },
  { name: "AWS IoT ExpressLink", file: "/el10/iot/expresslink.webp", accent: "#14b8a6", summary: "Secure cloud connectivity modules for products" },
  { name: "AWS IoT FleetWise", file: "/el10/iot/fleetwise.webp", accent: "#14b8a6", summary: "Collect and transform vehicle data in near real time" },
  { name: "AWS IoT Greengrass", file: "/el10/iot/greengrass.webp", accent: "#14b8a6", summary: "Run and manage software at the edge" },
  { name: "AWS IoT SiteWise", file: "/el10/iot/sitewise.webp", accent: "#14b8a6", summary: "Collect and analyze industrial equipment data" },
  { name: "AWS IoT TwinMaker", file: "/el10/iot/twinmaker.webp", accent: "#14b8a6", summary: "Build operational digital twins" },
  { name: "AWS Partner Device Catalog", file: "/el10/iot/partner-device-catalog.webp", accent: "#14b8a6", summary: "Find qualified devices compatible with AWS IoT" },
  { name: "FreeRTOS", file: "/el10/iot/freertos.webp", accent: "#14b8a6", summary: "Real-time operating system for microcontrollers" },
  { name: "Amazon Quick", file: "/el10/analytics/amazon-quick.webp", accent: "#a855f7", summary: "Enterprise business intelligence and AI assistance" },
  { name: "Amazon Augmented AI", file: "/el10/ai/augmented-ai.webp", accent: "#a855f7", summary: "Human review workflows for machine-learning predictions" },
  { name: "Amazon Bedrock", file: "/el10/ai/bedrock.webp", accent: "#a855f7", summary: "Build generative AI applications with foundation models" },
  { name: "Amazon Nova", file: "/el10/ai/nova.webp", accent: "#a855f7", summary: "AWS foundation models for multimodal generative AI" },
  { name: "Amazon Comprehend", file: "/el10/ai/comprehend.webp", accent: "#a855f7", summary: "Natural-language processing and text insights" },
  { name: "Amazon Comprehend Medical", file: "/el10/ai/comprehend-medical.webp", accent: "#a855f7", summary: "Extract structured insights from medical text" },
  { name: "Amazon Kendra", file: "/el10/ai/kendra.webp", accent: "#a855f7", summary: "Intelligent enterprise search powered by machine learning" },
  { name: "Amazon Lex", file: "/el10/ai/lex.webp", accent: "#a855f7", summary: "Conversational interfaces using voice and text" },
  { name: "Amazon PartyRock", file: "/el10/ai/partyrock.webp", accent: "#a855f7", summary: "Hands-on generative AI application playground" },
  { name: "Amazon Personalize", file: "/el10/ai/personalize.webp", accent: "#a855f7", summary: "Real-time personalized recommendations" },
  { name: "Amazon Polly", file: "/el10/ai/polly.webp", accent: "#a855f7", summary: "Natural-sounding text-to-speech" },
  { name: "Amazon Q Business", file: "/el10/ai/q-business.webp", accent: "#a855f7", summary: "Generative AI assistant for enterprise knowledge" },
  { name: "Amazon Rekognition", file: "/el10/ai/rekognition.webp", accent: "#a855f7", summary: "Image and video analysis with machine learning" },
  { name: "Amazon SageMaker AI", file: "/el10/ai/sagemaker-ai.webp", accent: "#a855f7", summary: "Build, train, and deploy machine-learning models" },
  { name: "Amazon Textract", file: "/el10/ai/textract.webp", accent: "#a855f7", summary: "Extract text, handwriting, tables, and forms" },
  { name: "Amazon Transcribe", file: "/el10/ai/transcribe.webp", accent: "#a855f7", summary: "Automatic speech recognition and transcription" },
  { name: "Amazon Translate", file: "/el10/ai/translate.webp", accent: "#a855f7", summary: "Neural machine translation" },
  { name: "AWS HealthLake", file: "/el10/ai/healthlake.webp", accent: "#a855f7", summary: "Store and analyze health data using FHIR" },
  { name: "AWS HealthScribe", file: "/el10/ai/healthscribe.webp", accent: "#a855f7", summary: "Generate clinical documentation from conversations" },
  { name: "Kiro", file: "/el10/ai/kiro.webp", accent: "#a855f7", summary: "Agentic IDE for spec-driven software development" },
  { name: "AWS AppSync", file: "/el10/appint-media/appsync.webp", accent: "#ec4899", summary: "Managed GraphQL and real-time APIs" },
  { name: "Amazon SNS", file: "/el10/appint-media/sns.webp", accent: "#ec4899", summary: "Pub/sub messaging and application notifications" },
  { name: "Amazon SQS", file: "/el10/appint-media/sqs.webp", accent: "#ec4899", summary: "Durable managed message queues" },
  { name: "Amazon MQ", file: "/el10/appint-media/mq.webp", accent: "#ec4899", summary: "Managed ActiveMQ and RabbitMQ brokers" },
  { name: "Amazon AppFlow", file: "/el10/appint-media/appflow.webp", accent: "#ec4899", summary: "Secure SaaS and AWS data flows" },
  { name: "AWS Step Functions", file: "/el10/appint-media/step-functions.webp", accent: "#ec4899", summary: "Visual workflow orchestration for distributed applications" },
  { name: "Amazon MWAA", file: "/el10/appint-media/mwaa.webp", accent: "#ec4899", summary: "Managed Apache Airflow workflow orchestration" },
  { name: "AWS B2B Data Interchange", file: "/el10/appint-media/b2b-data-interchange.webp", accent: "#ec4899", summary: "Automate business-to-business EDI workflows" },
  { name: "AWS Deadline Cloud", file: "/el10/appint-media/deadline-cloud.webp", accent: "#8b5cf6", summary: "Managed cloud render farms" },
  { name: "AWS Elemental MediaConnect", file: "/el10/appint-media/mediaconnect.webp", accent: "#8b5cf6", summary: "Reliable live video transport" },
  { name: "AWS Elemental MediaConvert", file: "/el10/appint-media/mediaconvert.webp", accent: "#8b5cf6", summary: "File-based video transcoding" },
  { name: "AWS Elemental MediaLive", file: "/el10/appint-media/medialive.webp", accent: "#8b5cf6", summary: "Broadcast-grade live video encoding" },
  { name: "AWS Elemental MediaPackage", file: "/el10/appint-media/mediapackage.webp", accent: "#8b5cf6", summary: "Package and protect live and on-demand video" },
  { name: "AWS Elemental MediaTailor", file: "/el10/appint-media/mediatailor.webp", accent: "#8b5cf6", summary: "Personalized ads and channel assembly" },
  { name: "Amazon Interactive Video Service", file: "/el10/appint-media/ivs.webp", accent: "#8b5cf6", summary: "Managed low-latency live streaming" },
  { name: "AWS AppFabric", file: "/el10/other-services/appfabric.webp", accent: "#14b8a6", summary: "Connect SaaS applications for security insights" },
  { name: "Amazon Chime SDK", file: "/el10/other-services/chime-sdk.webp", accent: "#14b8a6", summary: "Embed real-time voice, video, and messaging" },
  { name: "Amazon Connect Customer", file: "/el10/other-services/connect-customer.webp", accent: "#14b8a6", summary: "Customer engagement capabilities for Amazon Connect" },
  { name: "Amazon SES", file: "/el10/other-services/ses.webp", accent: "#14b8a6", summary: "Scalable transactional and marketing email" },
  { name: "Amazon WorkMail", file: "/el10/other-services/workmail.webp", accent: "#14b8a6", summary: "Secure managed business email and calendars" },
  { name: "AWS Managed Services", file: "/el10/other-services/aws-managed-services.webp", accent: "#06b6d4", summary: "Operate AWS environments with managed controls" },
  { name: "AWS re:Post Private", file: "/el10/other-services/aws-repost-private.webp", accent: "#06b6d4", summary: "Private cloud knowledge and collaboration" },
  { name: "Amazon WorkSpaces Applications", file: "/el10/other-services/workspaces-applications.webp", accent: "#2563eb", summary: "Stream applications securely to users" },
  { name: "Amazon WorkSpaces", file: "/el10/other-services/amazon-workspaces.webp", accent: "#2563eb", summary: "Managed cloud desktops" },
  { name: "Amazon WorkSpaces Core", file: "/el10/other-services/workspaces-core.webp", accent: "#2563eb", summary: "Cloud desktop infrastructure for VDI solutions" },
  { name: "Amazon WorkSpaces Thin Client", file: "/el10/other-services/workspaces-thin-client.webp", accent: "#2563eb", summary: "Managed endpoint devices for virtual desktops" },
  { name: "Amazon WorkSpaces Secure Browser", file: "/el10/amazon-workspaces-secure-browser.webp", accent: "#2563eb", summary: "Secure browser access to internal websites" },
  { name: "AWS Amplify", file: "/el10/other-services/aws-amplify.webp", accent: "#f43f5e", summary: "Build and deploy full-stack web and mobile applications" },
  { name: "AWS Device Farm", file: "/el10/other-services/aws-device-farm.webp", accent: "#f43f5e", summary: "Test applications on real devices and browsers" },
  { name: "Amazon Location Service", file: "/el10/other-services/amazon-location-service.webp", accent: "#f43f5e", summary: "Maps, places, routes, trackers, and geofences" },
  { name: "Amazon Managed Blockchain", file: "/el10/other-services/amazon-managed-blockchain.webp", accent: "#7c3aed", summary: "Managed blockchain networks and query access" },
  { name: "Amazon GameLift Servers", file: "/el10/other-services/amazon-gamelift-servers.webp", accent: "#7c3aed", summary: "Managed multiplayer game server hosting" },
  { name: "Amazon Braket", file: "/el10/other-services/amazon-braket.webp", accent: "#7c3aed", summary: "Explore quantum computing with simulators and QPUs" },
  { name: "AWS Ground Station", file: "/el10/other-services/aws-ground-station.webp", accent: "#2563eb", summary: "Managed satellite communications and data delivery" },
  { name: "AWS Billing Conductor", file: "/el10/backlog/billing-conductor.webp", accent: "#16a34a", summary: "Custom pricing and pro forma billing groups" },
  { name: "AWS Cost and Usage Reports", file: "/el10/aws-cost-and-usage-reports.webp", accent: "#16a34a", summary: "Detailed cost and usage data delivered to Amazon S3" },
  { name: "Amazon EC2 Image Builder", file: "/el10/amazon-ec2-image-builder.webp", accent: "#f59e0b", summary: "Automate secure VM and container image pipelines" },
  { name: "AWS Parallel Computing Service", file: "/el10/backlog/parallel-computing-service.webp", accent: "#f59e0b", summary: "Managed Slurm clusters for HPC workloads" },
  { name: "Amazon Verified Permissions", file: "/el10/backlog/verified-permissions.webp", accent: "#60a5fa", summary: "Fine-grained application authorization with Cedar" },
  { name: "Amazon Security Lake", file: "/el10/backlog/security-lake.webp", accent: "#60a5fa", summary: "Centralize security data using OCSF" },
  { name: "AWS Payment Cryptography", file: "/el10/backlog/payment-cryptography.webp", accent: "#60a5fa", summary: "HSM-backed cryptography for payment workloads" },
  { name: "AWS Private CA", file: "/el10/backlog/private-ca.webp", accent: "#60a5fa", summary: "Create and operate private certificate authorities" },
  { name: "AWS Signer", file: "/el10/backlog/signer.webp", accent: "#60a5fa", summary: "Managed code signing for software artifacts" },
  { name: "IAM Access Analyzer", file: "/el10/backlog/iam-access-analyzer.webp", accent: "#60a5fa", summary: "Find unintended and unused access" },
  { name: "Amazon Simple Workflow Service", file: "/el10/backlog/swf.webp", accent: "#ec4899", summary: "Coordinate durable, long-running application workflows" },
  { name: "AWS App Studio", file: "/el10/backlog/app-studio.webp", accent: "#14b8a6", summary: "Build business applications with generative AI" },
  { name: "AWS Supply Chain", file: "/el10/backlog/supply-chain.webp", accent: "#14b8a6", summary: "Unify supply-chain data, planning and insights" },
  { name: "AWS Wickr", file: "/el10/backlog/wickr.webp", accent: "#14b8a6", summary: "End-to-end encrypted enterprise collaboration" },
  { name: "Amazon Bedrock AgentCore", file: "/el10/ai/bedrock-agentcore.webp", accent: "#a855f7", summary: "Build, deploy, and operate production AI agents" },
  { name: "Amazon Bedrock Knowledge Bases", file: "/el10/ai/bedrock-knowledge-bases.webp", accent: "#a855f7", summary: "Ground generative AI responses in enterprise data" },
  { name: "Amazon Bedrock Prompt Management", file: "/el10/ai/bedrock-prompt-management.webp", accent: "#a855f7", summary: "Create, test, version, and reuse prompts" },
  { name: "Amazon Bedrock Prompt Flows", file: "/el10/ai/bedrock-prompt-flows.webp", accent: "#a855f7", summary: "Visually orchestrate multi-step generative AI workflows" },
  { name: "Amazon SageMaker Clarify", file: "/el10/ai/sagemaker-clarify.webp", accent: "#a855f7", summary: "Detect bias and explain machine-learning predictions" },
  { name: "Amazon SageMaker Data Wrangler", file: "/el10/ai/sagemaker-data-wrangler.webp", accent: "#a855f7", summary: "Prepare and transform data for machine learning" },
  { name: "Amazon SageMaker Ground Truth", file: "/el10/ai/sagemaker-ground-truth.webp", accent: "#a855f7", summary: "Create high-quality labeled datasets" },
  { name: "Amazon SageMaker JumpStart", file: "/el10/ai/sagemaker-jumpstart.webp", accent: "#a855f7", summary: "Discover and deploy foundation and machine-learning models" },
  { name: "Amazon SageMaker Model Monitor", file: "/el10/ai/sagemaker-model-monitor.webp", accent: "#a855f7", summary: "Monitor model quality, bias, and data drift" },
  { name: "Amazon SageMaker Model Registry", file: "/el10/ai/sagemaker-model-registry.webp", accent: "#a855f7", summary: "Catalog, version, and govern machine-learning models" },
  { name: "Amazon SageMaker Neo", file: "/el10/ai/sagemaker-neo.webp", accent: "#a855f7", summary: "Optimize models to run efficiently on edge devices" },
  { name: "Amazon SageMaker Processing", file: "/el10/ai/sagemaker-processing.webp", accent: "#a855f7", summary: "Run data processing and evaluation jobs at scale" },
  { name: "Amazon SageMaker Unified Studio", file: "/el10/ai/sagemaker-unified-studio.webp", accent: "#a855f7", summary: "Unified environment for analytics and AI development" },
  { name: "Amazon Titan", file: "/el10/ai/titan.webp", accent: "#a855f7", summary: "Amazon foundation models for generative AI applications" },
  { name: "AWS CDK", file: "/el10/aws-cdk.webp", accent: "#f97316", summary: "Define AWS infrastructure using familiar programming languages" },
  { name: "AWS Cost Anomaly Detection", file: "/el10/aws-cost-anomaly-detection.webp", accent: "#16a34a", summary: "Detect unusual AWS spending with machine learning" },
  { name: "AWS Tools and SDKs", file: "/el10/aws-tools-sdk.webp", accent: "#f97316", summary: "Build and automate AWS workloads through tools and language SDKs" },
  { name: "AWS Security Token Service", file: "/el10/aws-sts.webp", accent: "#dc2626", summary: "Issue temporary credentials for secure AWS access" },
  { name: "AWS Schema Conversion Tool", file: "/el10/aws-schema-conversion-tool.webp", accent: "#14b8a6", summary: "Assess and convert database schemas and code for migration" },
  { name: "AWS Management Console", file: "/el10/aws-management-console.webp", accent: "#2563eb", summary: "Web interface for accessing and managing AWS services" },
  { name: "AWS CLI", file: "/el10/aws-cli.webp", accent: "#f97316", summary: "Unified command-line interface for AWS services" },
  { name: "AWS AppConfig", file: "/el10/appconfig.webp", accent: "#db2777", summary: "Safely deploy feature flags and dynamic application configuration" },
  { name: "Savings Plans", file: "/el10/savings-plans.webp", accent: "#16a34a", summary: "Commitment-based pricing for lower eligible AWS usage costs" },
  { name: "Amazon Elastic Transcoder", file: "/el10/amazon-elastic-transcoder.webp", accent: "#8b5cf6", summary: "Legacy cloud media transcoding service; migrate to MediaConvert" },
  { name: "Amazon Pinpoint", file: "/el10/amazon-pinpoint.webp", accent: "#ec4899", summary: "Customer engagement campaigns, journeys, and messaging analytics" },
  { name: "AWS IoT Things Graph", file: "/el10/aws-iot-things-graph.webp", accent: "#14b8a6", summary: "Discontinued visual IoT workflow orchestration service" },
  { name: "AWS IoT 1-Click", file: "/el10/aws-iot-1-click.webp", accent: "#14b8a6", summary: "Legacy button-triggered IoT actions service" },
  { name: "AWS Proton", file: "/el10/aws-proton.webp", accent: "#f97316", summary: "Managed platform engineering and self-service deployments" },
  { name: "Amazon CodeGuru", file: "/el10/developer-tools/codeguru.webp", accent: "#f97316", summary: "Automated code reviews and application performance profiling" },
  { name: "AWS IoT Events", file: "/el10/IoT/iot-events.webp", accent: "#14b8a6", summary: "Detect and respond to IoT equipment and operational events" },
  { name: "Amazon Fraud Detector", file: "/el10/ai/fraud-detector.webp", accent: "#a855f7", summary: "Legacy machine-learning fraud detection service" },
  { name: "AWS Application Migration Service", file: "/el10/aws-application-migration-service.webp", accent: "#14b8a6", summary: "Automated lift-and-shift server migration to AWS" },
  { name: "AWS Snow Family", file: "/el10/aws-snow-family.webp", accent: "#14b8a6", summary: "Physical devices for offline data transfer and edge computing" },
  { name: "AWS Glue DataBrew", file: "/el10/aws-glue-databrew.webp", accent: "#ec4899", summary: "Visual no-code data preparation" },
  { name: "Amazon Q", file: "/el10/amazon-q.webp", accent: "#a855f7", summary: "Generative AI assistance for work and development" },
  { name: "Amazon Aurora Serverless", file: "/el10/amazon-aurora-serverless.webp", accent: "#8b5cf6", summary: "On-demand autoscaling Aurora database capacity" },
  { name: "Amazon AppStream 2.0", file: "/el10/amazon-appstream-2.webp", accent: "#f59e0b", summary: "Stream desktop applications securely to browsers" },
  { name: "AWS Chatbot", file: "/el10/aws-chatbot.webp", accent: "#ec4899", summary: "AWS notifications and CLI actions in chat applications" },
  { name: "Amazon Application Recovery Controller", file: "/el10/amazon-application-recovery-controller.webp", accent: "#8b5cf6", summary: "Controlled recovery and traffic shifting for resilient applications" },
  { name: "AWS Copilot", file: "/el10/aws-copilot.webp", accent: "#f97316", summary: "Deploy and operate containerized applications on AWS" },
  { name: "AWS App2Container", file: "/el10/aws-app2container.webp", accent: "#f97316", summary: "Containerize and migrate existing applications" },
  { name: "Amazon Managed Workflows for Apache Airflow", file: "/el10/amazon-mwaa.webp", accent: "#ec4899", summary: "Managed Apache Airflow orchestration" },
  { name: "AWS Marketplace", file: "/el10/aws-marketplace.webp", accent: "#2563eb", summary: "Discover, procure, and govern third-party cloud products" },
  { name: "AWS Support", file: "/el10/aws-support.webp", accent: "#2563eb", summary: "Technical support plans and AWS operational guidance" },
  { name: "AWS Health", file: "/el10/aws-health.webp", accent: "#2563eb", summary: "Personalized AWS service health and account events" },
  { name: "AWS Resilience Hub", file: "/el10/aws-resilience-hub.webp", accent: "#2563eb", summary: "Assess and improve application resiliency" },
];

const branches = [
  { title: "Management & Governance", start: 0, end: 34, accent: "#f05aa6", copies: [215, 216, 244, 248, 250, 256, 266, 271, 272, 273, 274, 217] },
  { title: "Cloud Financial Management", start: 0, end: 0, accent: "#16a34a", copies: [23, 24, 25, 9, 13, 215, 216, 244, 251] },
  { title: "Security, Identity & Compliance", start: 34, end: 51, accent: "#60a5fa", copies: [2, 3, 15, 22, 219, 220, 221, 222, 223, 224, 246] },
  { title: "Compute & Containers", start: 51, end: 68, accent: "#f59e0b", copies: [217, 218, 264, 265, 207] },
  { title: "Storage", start: 68, end: 84, accent: "#22c55e", copies: [] as number[] },
  { title: "Databases", start: 84, end: 96, accent: "#8b5cf6", copies: [] as number[] },
  { title: "Migration & Transfer", start: 96, end: 100, accent: "#14b8a6", copies: [95, 81, 83, 82, 247, 99, 260, 261] },
  { title: "Networking & Content Delivery", start: 100, end: 120, accent: "#8b5cf6", copies: [49, 267] },
  { title: "Developer Tools", start: 120, end: 132, accent: "#f97316", copies: [180, 243, 245, 249, 257, 268, 269] },
  { title: "Analytics", start: 132, end: 151, accent: "#ec4899", copies: [161, 262, 270] },
  { title: "Internet of Things", start: 151, end: 161, accent: "#14b8a6", copies: [254, 255, 258] },
  { title: "Machine Learning & AI", start: 161, end: 181, accent: "#a855f7", copies: [33, 130, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 259, 263] },
  { title: "Application Integration & Media", start: 181, end: 196, accent: "#ec4899", copies: [100, 10, 225, 252, 253] },
  { title: "Other Services", start: 196, end: 215, accent: "#14b8a6", copies: [181, 226, 227, 228] },
];

const collapsedByDefault = Object.fromEntries(branches.map((branch) => [branch.title, true]));

const semanticAliases: Record<string, string> = {
  "AWS Lambda": "serverless functions event driven code", "AWS Fargate": "serverless containers", "Amazon EKS": "kubernetes containers",
  "Amazon ECS": "containers orchestration", "Amazon ECR": "container registry docker images OCI", "Amazon EC2": "virtual machine server instance compute",
  "Amazon S3": "object storage data lake bucket", "Amazon EBS": "block storage disk volume", "Amazon EFS": "shared file storage NFS",
  "Amazon Route 53": "DNS domains traffic routing", "Amazon CloudFront": "CDN edge content delivery", "Amazon API Gateway": "API REST HTTP websocket",
  "Elastic Load Balancing": "load balancer ALB NLB traffic", "Amazon VPC": "private network networking subnet", "AWS Direct Connect": "dedicated private network",
  "AWS IAM": "identity permissions users roles policy", "AWS IAM Identity Center": "SSO workforce identity", "Amazon Cognito": "customer login authentication federation",
  "AWS KMS": "encryption keys cryptography", "AWS Secrets Manager": "password secret credential rotation", "Amazon GuardDuty": "threat detection security",
  "Amazon Inspector": "vulnerability scanning security", "AWS Security Hub": "security posture findings", "Amazon CloudWatch": "monitoring metrics logs alarms observability",
  "AWS X-Ray": "tracing observability performance", "Amazon Managed Grafana": "dashboard visualization monitoring", "Amazon Managed Service for Prometheus": "metrics monitoring prometheus",
  "Amazon Redshift": "data warehouse analytics SQL", "Amazon Athena": "SQL query S3 serverless analytics", "AWS Glue": "ETL data integration catalog",
  "Amazon Kinesis Data Streams": "streaming realtime events", "Amazon MSK": "Kafka streaming", "Amazon Bedrock": "generative AI foundation models agents",
  "Amazon SageMaker AI": "machine learning model training deployment", "Amazon Quick": "business intelligence BI dashboards AI agents automation research",
  "Amazon CodeGuru": "code review profiler developer tools application performance java python",
  "AWS IoT Events": "iot events equipment detection alarms state monitoring",
  "Amazon Fraud Detector": "fraud detection machine learning suspicious transactions legacy",
  "Amazon SageMaker": "sagemaker sagemaker ai machine learning model training deployment hosting endpoints",
  "Amazon Q Business": "enterprise chatbot knowledge assistant", "Amazon Lex": "chatbot conversation voice", "Amazon Textract": "OCR documents forms tables",
  "Amazon Transcribe": "speech to text transcription", "Amazon Polly": "text to speech voice", "Amazon Translate": "language translation",
  "Amazon Personalize": "recommendation engine personalization", "AWS IoT Core": "devices MQTT edge internet of things", "AWS IoT Greengrass": "edge devices offline",
  "AWS Cost Explorer": "cost billing spend optimization", "AWS Budgets": "cost alerts budget", "AWS Config": "compliance configuration audit",
  "Audit Manager": "audit evidence compliance", "AWS CloudFormation": "infrastructure as code IaC", "AWS CodePipeline": "CI CD continuous delivery deployment",
  "AWS CDK": "cdk cloud development kit infrastructure as code programming language constructs",
  "AWS Cost Anomaly Detection": "cost anomaly detection spend unusual billing alert machine learning",
  "AWS Tools and SDKs": "sdk software development kit aws tools cli powershell cloudshell",
  "AWS SDKs and Tools": "sdk software development kit aws tools cli powershell cloudshell",
  "AWS Security Token Service": "sts security token service temporary credentials assume role federation",
  "AWS STS": "sts security token service temporary credentials assume role federation",
  "AWS Schema Conversion Tool": "sct schema conversion tool database migration oracle aurora dms",
  "AWS Management Console": "console browser web interface access aws services",
  "AWS CLI": "cli command line terminal developer tools automation",
  "AWS AppConfig": "appconfig feature flags dynamic configuration deployment",
  "Savings Plans": "savings plans cost savings commitment pricing cloud financial management",
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function ServicesLibrary() {
  const branchesRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scale: 100 });
  const [expanded, setExpanded] = useState(false);
  const [collapsedBranches, setCollapsedBranches] = useState<Record<string, boolean>>(collapsedByDefault);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mapScroll, setMapScroll] = useState(0);
  const [mapScrollMax, setMapScrollMax] = useState(0);
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (!requested) return;
    const index = services.findIndex((item) => normalize(item.name) === normalize(requested));
    if (index < 0) return;
    const branch = branches.find((candidate) => (index >= candidate.start && index < candidate.end) || candidate.copies.includes(index));
    setSelected(index);
    if (branch) setCollapsedBranches((current) => ({ ...current, [branch.title]: false }));
  }, []);
  useEffect(() => { if (!dragging) return; const move = (event: PointerEvent) => setImageScale(Math.max(60, Math.min(220, dragStart.scale + (event.clientX - dragStart.x) / 4))); const up = () => setDragging(false); window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; }, [dragging, dragStart]);
  useEffect(() => {
    const element = branchesRef.current;
    if (!element) return;
    const sync = () => { setMapScroll(element.scrollLeft); setMapScrollMax(Math.max(0, element.scrollWidth - element.clientWidth)); };
    sync();
    element.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    const row = element.querySelector(".branch-row");
    if (row) observer.observe(row);
    return () => { element.removeEventListener("scroll", sync); observer.disconnect(); };
  }, [collapsedBranches]);
  const service = selected === null ? null : services[selected];
  const uniqueServiceCount = new Set(services.map((item) => normalize(item.name))).size;
  const allCollapsed = branches.every((branch) => collapsedBranches[branch.title]);
  const query = normalize(searchQuery);
  const searchResults = query ? services.map((item, index) => {
    const branch = branches.find((candidate) => (index >= candidate.start && index < candidate.end) || candidate.copies.includes(index))!;
    const name = normalize(item.name);
    const words = query.split(" ").filter(Boolean);
    const searchable = normalize(`${item.name} ${item.summary} ${branch.title} ${semanticAliases[item.name] || ""}`);
    let score = name === query ? 100 : name.startsWith(query) ? 80 : name.includes(query) ? 65 : 0;
    score += words.reduce((total, word) => total + (searchable.includes(word) ? 12 : 0), 0);
    return { item, index, branch, score };
  }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 8) : [];

  const chooseSearchResult = (index: number, branchTitle: string) => {
    setSelected(index);
    setCollapsedBranches((current) => ({ ...current, [branchTitle]: false }));
    setSearchOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector(`[data-service-index="${index}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })));
  };

  return (
    <main className="workspace">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/">Visual Learning</a>
      </nav>
      <header className="masthead">
        <div className="site-tools">
          <div className="service-search">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                if (event.key === "Enter" && searchResults[0]) chooseSearchResult(searchResults[0].index, searchResults[0].branch.title);
              }}
              placeholder="Search by service or concept…"
              aria-label="Search AWS services by name or concept"
              aria-expanded={searchOpen && searchResults.length > 0}
            />
            {searchOpen && query && <div className="search-results" role="listbox" aria-label="Service search results">
              {searchResults.length ? searchResults.map((result) => <button key={`${result.item.name}-${result.index}`} role="option" onClick={() => chooseSearchResult(result.index, result.branch.title)}>
                <span>{result.item.name}</span><small>{result.branch.title} · {result.item.summary}</small>
              </button>) : <p>No matching services</p>}
            </div>}
          </div>
          <button className="expand-all" onClick={() => setCollapsedBranches(Object.fromEntries(branches.map((branch) => [branch.title, !allCollapsed])))}>
            {allCollapsed ? "Expand all" : "Collapse all"}
          </button>
          <div className="progress"><strong>{uniqueServiceCount}</strong><span>services mapped</span></div>
        </div>
      </header>

      <section className="canvas" aria-label="AWS service mind map">
        <div
          className="branches"
          ref={branchesRef}
          tabIndex={0}
          aria-label="AWS service category branches. Scroll horizontally to view more categories."
        >
          <div className="root-node">AWS Services</div>
          <div className="connector vertical" aria-hidden="true" />
          <div className="branch-row">
            {branches.map((branch) => (
              <div className={`map-column ${collapsedBranches[branch.title] ? "collapsed" : ""}`} key={branch.title} style={{ "--branch-accent": branch.accent } as React.CSSProperties}>
                <button
                  className="branch-toggle"
                  onClick={() => setCollapsedBranches((current) => ({ ...current, [branch.title]: !current[branch.title] }))}
                  aria-expanded={!collapsedBranches[branch.title]}
                  aria-label={`${collapsedBranches[branch.title] ? "Expand" : "Collapse"} ${branch.title}`}
                  title={`${collapsedBranches[branch.title] ? "Expand" : "Collapse"} branch`}
                >
                  {collapsedBranches[branch.title] ? "+" : "−"}
                </button>
                <div className="category-node">{branch.title}</div>
                {!collapsedBranches[branch.title] && <><div className="branch" aria-hidden="true" />
                <div className="service-list">
                  {[...Array.from({ length: branch.end - branch.start }, (_, offset) => branch.start + offset), ...(branch.copies || [])].map((index) => {
                    const item = services[index];
                    if (!item) return null;
                    return <button key={item.name} data-service-index={index} className={`service-node ${selected === index ? "active" : ""}`} style={{ "--service-accent": item.accent } as React.CSSProperties} onClick={() => setSelected(index)} aria-pressed={selected === index}>
                      <span>{item.name}</span><small>{item.summary}</small>
                    </button>;
                  })}
                </div></>}
              </div>
            ))}
          </div>
        </div>

        {service && <article className="viewer" style={{ "--service-accent": service.accent } as React.CSSProperties}>
          <div className="viewer-head">
            <div><p>Selected EL10 page</p><h2>{service.name}</h2></div>
            <button onClick={() => setExpanded(true)}>Fit in browser ↗</button>
          </div>
            <button className="image-link" onClick={() => setExpanded(true)} aria-label={`Open ${service.name} EL10 infographic in fitted viewer`}>
            <img src={assetUrl(service.file)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = service.file; }} style={{ width: `${imageScale}%`, maxWidth: "none" }} alt={`${service.name} EL10 infographic with ten study sections`} />
          </button>
          <div className="image-controls"><span>Drag the corner to resize</span><strong>{Math.round(imageScale)}%</strong></div>
          <div className="resize-handle" role="slider" aria-label="Drag to resize infographic" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragStart({ x: event.clientX, scale: imageScale }); setDragging(true); }} />
          <p className="viewer-note">Select another service node to switch pages. Open full size for readable study view.</p>
        </article>}
        {service && expanded && <div className="image-modal" role="dialog" aria-modal="true" aria-label={`${service.name} fitted infographic viewer`} onClick={() => setExpanded(false)}><button className="modal-close" onClick={() => setExpanded(false)}>Close ×</button><img src={assetUrl(service.file)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = service.file; }} alt={`${service.name} EL10 infographic`} onClick={(event) => event.stopPropagation()} /></div>}
      </section>
      <nav className="map-navigator" aria-label="Horizontal category navigation">
        <button onClick={() => branchesRef.current?.scrollBy({ left: -420, behavior: "smooth" })} disabled={mapScroll <= 1} aria-label="Scroll categories left">←</button>
        <input
          type="range"
          min="0"
          max={Math.max(1, mapScrollMax)}
          value={Math.min(mapScroll, Math.max(1, mapScrollMax))}
          onChange={(event) => { const left = Number(event.target.value); branchesRef.current?.scrollTo({ left }); setMapScroll(left); }}
          aria-label="Category horizontal position"
          disabled={mapScrollMax === 0}
        />
        <button onClick={() => branchesRef.current?.scrollBy({ left: 420, behavior: "smooth" })} disabled={mapScroll >= mapScrollMax - 1} aria-label="Scroll categories right">→</button>
      </nav>
    </main>
  );
}
