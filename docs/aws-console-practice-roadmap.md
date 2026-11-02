# AWS console practice library

## Purpose and scope

A reusable service-familiarity lab library for architecture courses. Each lab teaches where to find a service in the AWS Management Console, what choices matter, how to inspect its live state, how it connects to other services, and how to clean up. The interactive practice area is `/troubleshooting/practice`; its left pane shows the ordered curriculum. Only EC2-01 is implemented today. Planned items remain unlinked until a walkthrough exists.

Use the stable link `/troubleshooting/practice?lab=ec2-first-instance` from any course lesson introducing EC2, VPC public access, security groups, EBS, key pairs or instance health. The query ID is a durable catalog key; future labs should keep IDs stable and add their own route or query handling before marking them ready. Do not link to planned IDs yet.

## Learning progression

| Sequence | Section | Labs and architect decisions | Prerequisite |
| --- | --- | --- | --- |
| 1 | Console foundations | EC2 first instance; account/Region, billing, budgets and tags | Approved sandbox account |
| 2 | Identity and security | IAM role, effective permissions, KMS key and Secrets Manager access | Console orientation |
| 3 | Networking | VPC/subnets/routes/gateways; SG vs NACL; Route 53/ACM/ALB request path | EC2 and IAM |
| 4 | Storage and data | S3 access/versioning/lifecycle; EBS snapshot vs EFS; RDS and DynamoDB | Identity and network |
| 5 | Compute and application | Launch templates/Auto Scaling; Lambda/EventBridge/SQS; ECR/ECS/Fargate | Network, storage, IAM |
| 6 | Operations and governance | CloudWatch/CloudTrail; CloudFormation changes/drift; resilience/cost review | Prior service paths |

## Standard for each future walkthrough

1. State objective, time, prerequisites, permissions, sandbox cost exposure and exact cleanup.
2. Show account and Region before service navigation. Mirror console breadcrumb and field names, with a dated AWS documentation link because the console evolves.
3. Give one task per step with an interactive simulated state change. Validate required decisions before continuing; explain the architect tradeoff at each point.
4. Inspect resource detail tabs and relationships, including identifiers, network, identity, encryption, observability, health and billing where relevant.
5. Show a verification action and evidence. Distinguish simulated output from actual AWS output.
6. End with cleanup inventory, residual resources and a link to a corresponding troubleshooting scenario.
7. Provide stable cross-course URL, reset/repeat control, mobile navigation and accessibility labels. Never collect credentials or private keys.

## First lab: EC2-01 acceptance path

Region → EC2 Launch instances → name and Amazon Linux 2023 AMI → instance type and key pair → VPC, public subnet, public IP and SSH from My IP → gp3 root volume and summary → launch → running with 2/2 status checks → Details/Security/Storage/Monitoring → EC2 Instance Connect and read-only guest checks → terminate and verify EBS/key pair/snapshot/IP inventory. The browser simulation performs no AWS calls. The accompanying real-account checklist requires approved access, current pricing and cleanup review.

## Rollout and reuse

Implement sections in prerequisite order. For each lab, add its catalog ID, interactive walkthrough, primary AWS docs, one evidence-based completion check, cleanup and related troubleshooting link. Only set `ready: true` when the route and experience work. Certification pages can link to a single stable lab rather than duplicate console screenshots and instructions. Revisit console terminology and pricing assumptions when AWS documentation changes.

## Image-led console module (November 2026)

`/troubleshooting/walkthroughs` is the separate visible module, linked from Home and the Troubleshooting hub. Its left pane currently has sixteen illustrated tours and 65 numbered SVG console views: EC2, IAM, VPC, security groups, ALB, S3, EBS, RDS, DynamoDB, Lambda, ECS, CloudWatch, CloudTrail, Route 53, CloudFormation and Cost Explorer. The source data lives in `app/troubleshooting/walkthroughs/labs.json`; `scripts/generate-aws-console-walkthroughs.py` regenerates the illustrations. Each view shows the relevant breadcrumb, settings, action and architect reasoning. At the bottom, a service-specific simulator link opens its screen where implemented, with an additional EC2 guided practice link. EBS, ECS and CloudFormation link to the AWS console because this simulator has no matching service screen yet. The illustrations are training views, not official AWS screenshots; simulator implementation depth varies by service.

Next coverage batches, in dependency order: network ACLs and Reachability Analyzer; EFS; ACM; EventBridge/SQS; Auto Scaling; KMS/Secrets Manager; backup. Before marking each simulator practice equivalent to AWS click-for-click, implement and validate its creation, editing, review, inspection, deletion, persistence and error paths against current AWS docs. The EC2 simulator has a simplified launch editor with AMI, type, key pair label, subnet, security group, public-IP choice and root-volume summary, plus termination for newly launched training instances. It still does not create actual key pairs or EBS volumes, and it does not implement the complete AWS wizard.
