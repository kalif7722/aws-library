# Module 07 visual depth repair — identified refinements complete

Updated2026-10-31. User-directed approach: revise existing images first and add focused slides only where the complete explanation would crowd the image.

## Published result

**32 available visuals out of32 planned.** All five remaining refinements (07,09,11,25,31) have reviewed replacement images. Original lesson identities and the accepted lesson27 orchestration visual are preserved.

Earlier rejected drafts remain excluded. Final images were inspected for complete copy, readability, misleading graphics and the specific missing subtopics. All five selected WebP assets decode at2048×1152.

## What the published revisions improve

| Lesson | Details now visible in the image |
|---|---|
| 01 | C/R/M/I/G-P/T family mapping, workload fit, resource limits and benchmarking |
| 02 | CPU credits/Standard/Unlimited; Graviton Arm64/Linux, Windows limitation, binaries/images/libraries and testing |
| 06 | RI Standard/Convertible, terms/payment, Savings Plans, Regional/zonal benefit and capacity assurance |
| 08 | Shared/Dedicated Instances/Dedicated Hosts, affinity, auto-placement, recovery and licensing checks |
| 09 | Cluster/spread/partition distinctions, limits, metadata, stop/change/start and capacity failures |
| 10 | ENA/SR-IOV, EFA/libfabric/MPI/NCCL, prerequisites and legacy Intel VF context |
| 13 | CPU/ALB/network metrics, proportional utilization, backlog per worker and coordination of policies |
| 19 | System/guest/attached-EBS/HTTP/custom ASG health, SetInstanceHealth and shared-dependency endpoint risk |

## Accepted additions

| Lesson | Explanation |
|---|---|
| 24 | Default EC2, credits/network/local-disk, EBS and guest-agent metrics; cadence |
| 25 | Recovery triggers, preserved identity, lost RAM/instance-store caveat and replacement comparison |
| 26 | EBS, instance store, S3, EFS and FSx for Lustre: performance, access, durability and staging |
| 28 | All nine Auto Scaling processes and their separate roles |
| 29 | Suspension/resumption cases: launch, replacement, missed registration and missed schedules |
| 30 | Rolling refresh, separate ASGs/target groups, separate load balancers/DNS, pre-cutover testing and rollback |
| 31 | Spot Fleet pools, target/weighted capacity, optional On-Demand and allocation strategies |
| 32 | Whole-system layer overview: DNS/CDN, ingress, compute, sessions/cache, data, messaging/workflows, storage/static assets |

## Final five visual refinements

| Lesson | Detail now visibly covered | Asset |
|---|---|---|
|07|Price/capacity eligibility, best-effort warning, immediate hibernation without a two-minute lead, recovery, diversity and cancel-versus-terminate actions|slide-07-v4.webp|
|09|Many instances per partition, seven partitions per AZ subject to quota, rack separation and metadata-based replica placement|slide-09-v4.webp|
|11|Job shape and HPC examples; resource fit; DX/DataSync staging; Batch versus ParallelCluster; checkpoints; existing-customer Snowball eligibility|slide-11-v4.webp|
|25|Explicit SNS alerting alongside preserved identity, lost in-memory state, supported recovery mechanisms and replacement comparison|slide-25-v4.webp|
|31|Price/budget constraints alongside pools, target/weighted capacity, optional On-Demand and four allocation strategies|slide-31-v4.webp|

These five corrections are closed by visible image content, rather than notes alone. Source review was performed2026-10-30; the2026-10-31 retry could not retrieve current AWS documentation and is not represented as a new successful check. No newly unverified Module09 content is included in this release.

## PDF topic-to-visual crosswalk

Page numbers refer to the 845-page reference *AWS Certified Solutions Architect Professional Slides v30.pdf*. Teaching prose and images are original. This section includes the continuation after page 195 omitted by the earlier short review.

| PDF page(s) | Topic/subtopic | Published visual(s) and disposition |
|---|---|---|
| 175 | DNS, CDN, ingress, compute, sessions/cache, databases, messaging/workflows, storage/static assets | 32; compute/state relationship also 05, 22 |
| 176 | R/C/M/I/G families; T burstable and Unlimited | 01, 02 |
| 177 | Placement strategies and change operation | 09 |
| 178 | Cluster single-AZ locality, network trade-off and use cases | 09, 10; no guaranteed one-rack or universal speed claim |
| 179 | Spread hardware isolation, multi-AZ scope and per-AZ limit | 09 |
| 180 | Partition limits, racks, metadata and distributed replicas | 09; many-instance wording and quota qualification visible |
| 181 | Purchase options, RI term/class/payment, dedicated tenancy and affinity | 06,08; complete Spot explanation in revised07 |
| 182 | Graviton/Linux/Windows limitation and workload suitability | 02; legacy marketing gains replaced by benchmark decision |
| 183 | CPU/credit/network/status/local-disk metrics; RAM not default | 24, 19 |
| 184 | System/guest failures, monitoring/recovery and preserved attributes | 19,25; SNS alerts visible |
| 185 | HPC elasticity, scientific/analytical use cases and job shape | 11; expanded job shape, elasticity and use-case overview |
| 186 | Direct Connect, DataSync and large offline/Snowball transfer | 11; DX/DataSync staging and current Snowball eligibility visible |
| 187 | CPU/GPU, Spot and placement for HPC | 01,07,09,11; full orchestration comparison in27 |
| 188 | SR-IOV, ENA, Intel VF, EFA/Linux/MPI and OS bypass | 10 |
| 189 | EBS/io2, local scratch, S3 object model, EFS and FSx for Lustre | 26 |
| 190 | Batch scheduling/multi-node jobs; ParallelCluster configuration | 27 reviewed: full visible explanation, Spot/Fargate restrictions and workload comparison |
| 191 | Target, simple/step and scheduled scaling | 13, 14, 15 |
| 192 | Predictive scaling | 15 |
| 193 | CPU, ALB, network and custom scaling metrics | 13, 24 |
| 194 | Mixed Spot/On-Demand, hooks, cleanup/logging, AMI rollout | 17, 18, 20, 21, 31 |
| 195 | Instance refresh, healthy capacity and warmup | 18, 30 |
| 196 | Launch, Terminate, HealthCheck, ReplaceUnhealthy, AZRebalance, AlarmNotification, ScheduledActions, AddToLoadBalancer, InstanceRefresh; suspension | 28, 29 |
| 197 | EC2/ELB/custom health, SetInstanceHealth and endpoint design | 19 |
| 198 | Launch-definition/ASG application rollout | 04, 18, 30 |
| 199 | Rolling group versus separate ASGs/target groups | 30 |
| 200 | Separate ALBs, DNS weighting and pre-cutover/manual/load testing | 30 |
| 201–202 | Spot price/capacity eligibility, warning behavior and use cases | 07; price/capacity eligibility, warning/hibernation behavior and recovery visible |
| 203 | Spot Fleet target, optional On-Demand, pools and allocation strategies | 31; price/budget constraint visible |

## Current-source checks and dispositions

Current primary documentation was checked for RI options, Graviton compatibility, host affinity/recovery, placement, networking software, EC2 metrics/recovery, EBS/EFS, Batch/ParallelCluster, scaling processes, custom health, weighted traffic shifting, Spot warnings and allocation.

- Cluster is not a guarantee of one rack; network limits depend on compatible instances.
- Intel 82599 VF and the PDF's fixed speed examples are retained as legacy context, not current universal caps.
- EFS throughput modes are not provisioned IOPS; EBS claims are qualified by supported configurations.
- Snowball's existing-customer restriction is explicitly visible in reviewed lesson11.
- Lesson 27 now visibly includes multi-node Batch restrictions and has passed coverage QA.
- DNS weighting is not an instantaneous per-request dial.
- Recovery identity preservation does not preserve RAM; instance-store behavior is qualified by mechanism.
- Source-PDF Elasticsearch naming is represented by OpenSearch in the overview.

Primary references:
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-types.html
- https://docs.aws.amazon.com/ec2/latest/instancetypes/gp.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-understanding.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-recovery-basics.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html
- https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstancePlacement.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html
- https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html
- https://docs.aws.amazon.com/efs/latest/ug/managing-throughput.html
- https://docs.aws.amazon.com/batch/latest/userguide/multi-node-parallel-jobs.html
- https://docs.aws.amazon.com/batch/latest/userguide/mnp-ce.html
- https://docs.aws.amazon.com/parallelcluster/latest/ug/install-v3-configuring.html
- https://docs.aws.amazon.com/datasync/latest/userguide/transferring-on-premises-storage.html
- https://docs.aws.amazon.com/snowball/latest/developer-guide/doc-history.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/set-up-a-custom-health-check.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-how-suspending-processes-affects-other-processes.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-allocation-strategy.html

## Claim boundary

The enumerated Module07 PDF topic inventory on pages175–203 is represented by reviewed visuals or explicit current/legacy dispositions, including all five previously identified finishing items. This does not establish whole-course completion. Whole-course pdfDistinctTopicsReviewed and claim100PercentCoverage remain false.

Final copy/layout and selected versioned assets are preserved in module-07-visual-repair-plan.json. The release changes five existing lesson assets and metadata; it adds no lessons and preserves unrelated course modules.
