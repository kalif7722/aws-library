# AWS Top 20 Troubleshooting Labs — Build Tracker

**Goal:** Build 20 realistic, hands-on AWS troubleshooting labs, starting with AWS only. Each lab must teach through the AWS Console Simulator; explanations, topology, hypotheses, decision checks, and runbook guidance live outside the simulated console. Never present synthetic output as live AWS evidence.

## Non-negotiable acceptance criteria

- [ ] Problem statement with observable symptoms, impact, and scope.
- [ ] Architecture/topology diagram showing request path, trust/network boundaries, and likely fault location.
- [ ] Failure flow diagram showing where the request fails and which evidence distinguishes competing causes.
- [ ] AWS Console Simulator is the interactive console; only controls and screens that exist in the real AWS console appear inside it.
- [ ] Step-by-step console navigation with explicit tabs, fields, tables, and what to inspect.
- [ ] Realistic seeded state: show configured rules/resources as they exist; do not add a fake “missing permission” or invented banner to the console.
- [ ] Each checkpoint asks a decision question; learner must select the evidence-supported answer to unlock the next step.
- [ ] Safe remediation scoped to least privilege and change control; no broad “open to everyone” shortcuts.
- [ ] Verification before/after the fix, including expected signals and a rollback note.
- [ ] Clear labels for simulated state, illustrative errors, and local training audit events. No claim that a simulator action created real CloudTrail events.
- [ ] Responsive layout, adjustable side panes, accessible controls, resettable state.
- [ ] Automated build/regression checks and manual browser smoke test before merge/deploy.

## Planned lab catalogue

| # | Lab | Primary AWS console path / evidence | Status |
|---:|---|---|---|
| 01 | EC2 instance unreachable (SSH/RDP) | EC2 → Instances / Status checks; Security Groups → Inbound rules; VPC → Route tables, Network ACLs, Reachability Analyzer; Systems Manager for guest checks | In progress — topology and embedded interactive console added on feature branch |
| 02 | Application Load Balancer targets unhealthy | EC2 → Target Groups → Targets / Health checks; Load Balancers → Listeners | Implemented on feature branch — guided/challenge, evidence checkpoints, remediation and verification |
| 03 | EC2 has no outbound internet access | VPC → Route tables, Internet Gateways, NAT Gateways, route targets | Implemented on feature branch — guided/challenge, evidence checkpoints, remediation and verification |
| 04 | Private EC2 cannot reach another subnet/service | VPC → Route tables, Security Groups, Network ACLs, Reachability Analyzer | Planned |
| 05 | RDS connection timeout from application | RDS → Connectivity & security; VPC security groups / subnet groups; CloudWatch metrics | Implemented on feature branch — seeded-config-aware evidence, guided/challenge, remediation and verification |
| 06 | S3 AccessDenied / object unavailable | S3 → Object permissions / bucket policy; IAM policy simulator concepts; KMS if encrypted | Implemented on feature branch — explicit-deny scenario, guided/challenge, remediation and verification |
| 07 | IAM role assumption or API AccessDenied | IAM → Roles / Trust relationships / Permissions; CloudTrail event history | Planned |
| 08 | Lambda function timeout | Lambda → Monitor / Configuration / VPC; CloudWatch Logs and metrics | Implemented on feature branch — guided/challenge, evidence checkpoints, remediation and verification |
| 09 | Lambda cannot reach RDS in VPC | Lambda → Configuration → VPC; RDS connectivity; security groups and subnet routes | Planned |
| 10 | Route 53 record resolves incorrectly | Route 53 → Hosted zones / Records; health checks; resolver and TTL checks | Planned |
| 11 | VPC peering / Transit Gateway connectivity failure | VPC → Peering connections / Transit Gateway attachments / Route tables | Planned |
| 12 | EBS volume full or filesystem out of space | EC2 → Volumes / Instances; CloudWatch; authorized guest-level filesystem checks | Planned |
| 13 | ECS service deployment fails or tasks stop | ECS → Cluster → Service → Tasks / Events; task definition and logs | Planned |
| 14 | EKS pod Pending / CrashLoopBackOff | EKS cluster context plus Kubernetes workload, node, and event evidence; keep console and CLI boundaries explicit | Planned |
| 15 | CloudWatch alarm not firing / missing logs | CloudWatch → Alarms / Log groups / Metric filters; namespace, dimensions, and timestamps | Planned |
| 16 | SQS queue backlog or messages not consumed | SQS → Queue monitoring / redrive policy; Lambda event source mapping where applicable | Planned |
| 17 | API Gateway returns 5xx / integration errors | API Gateway → Stages / Logs / Metrics / Integration; downstream Lambda evidence | Planned |
| 18 | KMS AccessDenied / decrypt failure | KMS → Keys / Key policy; IAM role permissions; CloudTrail event context | Planned |
| 19 | CloudFront 403, stale content, or origin failure | CloudFront → Distributions / Behaviors / Origins; response headers and cache invalidation evidence | Planned |
| 20 | AWS Backup restore or recovery point failure | AWS Backup → Backup jobs / Recovery points / Protected resources; target permissions and restore status | Planned |

## Delivery sequence

1. Finish lab 01 as the end-to-end acceptance test: console navigation, topology, checkpoint gating, accurate security-group evidence, Reachability Analyzer path interpretation, simulated least-privilege remediation, and proof of recovery. Lab 01 now has Guided and Challenge modes plus a red-to-green security-group verification flow.
2. Labs 02, 03, and 05 now have reusable guided/challenge flows on the feature branch; continue expanding lab 04 and validate each seeded resource path.
3. Lab 06 and lab 08 now have reusable guided/challenge flows on the feature branch; continue labs 07, 09, and 10.
4. Build labs 11–15 (network connectivity, compute/storage, containers, and observability).
5. Build labs 16–20 (messaging, APIs, encryption, CDN, and recovery).
6. For each lab, add its route and index entry, validate the seeded state against the simulator engine, run tests/build, perform browser smoke tests, then proceed to the next lab.


## Incident-scenario labs 5–8 — current implementation batch

These are the four incident scenarios layered on the shared simulator (separate from the numbered Top-20 console-lab catalogue above). Changes remain on `feature/aws-top-20-console-labs`; do not merge or deploy until branch CI and browser smoke tests pass.

| Incident lab | Guided investigation | Remediation / recovery check | Validation status |
|---|---|---|---|
| Unexpected increase in cloud spend | Cost Explorer usage types → NAT Gateway → VPC Flow Logs / CloudWatch Logs Insights | Create S3 gateway endpoint through the VPC Endpoints console; verify prefix-list route and retain NAT | Updated; CI/browser verification pending |
| Checkout requests are slow or failing | CloudWatch latency/errors → ALB listener → target group health check | Correct `/ready` vs `/health` mismatch and retest | Updated; CI/browser verification pending |
| Analytics dashboard shows stale data | S3 source partition → Glue run/bookmark/input evidence → curated output | Restore expected source object, rerun Glue, verify target partition | Updated; CI/browser verification pending |
| RAG assistant returns outdated answers | Canonical S3 version → Bedrock ingestion history → retrieved chunk/citation → same-query retest | Sync the knowledge base after the source update and verify grounded citation | Updated; CI/browser verification pending |

**Console realism guardrail:** fixes must be performed through the simulated AWS service screens, not shortcut buttons in the teaching overlay. Guided walkthroughs may explain evidence and safe remediation outside the console. A saved setting is not recovery proof; each lab must validate the resulting shared simulator state and retain rollback guidance.

**Deployment rule:** Work on this feature branch first. Do not merge/deploy the batch until the VM-unreachable acceptance test and regression checks pass. Keep production AWS-console simulation screens vendor-faithful; put learning overlays and topology outside the simulated console.
