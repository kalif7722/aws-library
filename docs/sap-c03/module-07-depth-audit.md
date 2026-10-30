# Module 07 depth audit — 2026-10-30

**Assessment: not yet complete at reference-PDF depth.** All 23 published images were inspected against their learning notes. PDF pages 175–203 were read, including the continuation after page 195 that the previous review did not include. The earlier short review described the original 23-lesson plan, not a complete source-topic audit.

## What is strong

The original visuals teach resource bottlenecks, CPU credits, lifecycle/state, repeatable launch templates, statelessness, purchase-versus-capacity distinctions, Spot resilience, tenancy, placement principles, ENA/EFA selection, HPC layers, ASG limits, target/step/scheduled/predictive scaling, warmup, hooks, refresh, health, graceful scale-in, mixed capacity and an integrated case. Precision time is additional current-service enrichment.

## Page-to-visual findings

"Partial" means a student can see the main concept but not all relevant decision details. Optional notes do not count as a completed visual explanation.

| PDF page(s) | Source topic | Existing visual(s) | Result and missing depth |
|---|---|---|---|
| 175 | Layered solution architecture | 05, 22 | Compute/state relationship present; full service-layer map needs traceability in the course roadmap and later service modules. Not counted as a completed whole-course map. |
| 176 | EC2 families and burstable modes | 01, 02 | Partial: explicit C/R/M/I/G-P/T family-to-workload mapping is in notes, not the images. Credit concept is good. |
| 177–180 | Placement groups | 09, 23 | Partial: limits, rack/host distinctions, partition metadata for replica placement, stop/change/start operation and capacity failure behavior need visible explanation. Do not repeat the PDF's implication that cluster means one guaranteed rack. |
| 181 | Purchase options and dedicated tenancy | 06, 08 | Partial: Standard versus Convertible RI, commitment terms/payment trade-offs and Dedicated Host affinity are not visually taught. |
| 182 | Graviton | 02 | Partial: image only says compare architectures. Arm64/Linux compatibility, rebuild/retest of binaries and images, Windows limitation and workload fit need a focused visual. Old generation-specific marketing percentages are not evergreen guarantees. |
| 183 | Default EC2 metrics | 19 | Partial: RAM/filesystem agent distinction appears, but default CPU/credit/network/local-disk metrics versus EBS metrics are not systematically explained. |
| 184 | EC2 recovery | 19 | Partial: generic identity preservation is too brief. Need recovery versus reboot/stop-start/ASG replacement and explicit preserved identity versus lost in-memory state. |
| 185, 187 | HPC use cases and compute | 01, 07, 09, 11 | Main ideas present; representative tightly coupled versus independent jobs should accompany the supplements. |
| 186 | HPC data movement | 11 | In notes only. Needs visible DX/DataSync/offline-transfer decision and an explicit current-status disposition for Snowball. |
| 188 | Enhanced networking and EFA | 10 | Partial: OS bypass and same-AZ requirement present; SR-IOV/ENA versus EFA/libfabric/MPI/NCCL software layers are only in notes or absent. Historical Intel VF and fixed speed caps require legacy/context treatment. |
| 189 | HPC storage options | 03, 11 | Partial: generic object/file/block/scratch categories plus FSx for Lustre; EBS, instance store, S3, EFS and FSx trade-offs need explicit visual comparison. Correct the PDF's EFS IOPS/throughput terminology rather than copy it. |
| 190 | Batch and ParallelCluster | 11 | Partial: ParallelCluster is named; AWS Batch multi-node jobs and managed scheduling versus cluster provisioning are not visually explained. |
| 191 | Target, simple and step scaling | 13, 14, 15 | Core mechanisms covered. |
| 192 | Predictive scaling | 15 | Covered conceptually, with forecast limitations. |
| 193 | Scaling metrics | 13 | CPU, ALB per-target and custom metrics covered; add a network-bound example when showing the metrics supplement. |
| 194 | Mixed capacity, hooks, AMI rollout | 17, 18, 21 | Main concepts covered; Spot Fleet itself is distinct from an ASG mixed-instances policy and needs explicit treatment. |
| 195 | Instance refresh | 18 | Covered with healthy-capacity, warmup, checkpoints and rollback caveats. |
| 196 | Scaling processes and suspension | None | Missing: nine named processes and operational effects of suspension/resumption. |
| 197 | Health checks and custom health | 19 | Partial: EC2/application checks exist; custom set-instance-health and shallow-versus-dependency-heavy health endpoints need a worked visual. |
| 198–200 | Rolling and parallel-fleet deployment | 04, 18 | Rolling refresh covered. Separate ASGs/target groups, traffic shifting, separate ALBs/DNS weighting and pre-cutover testing are missing from the images. |
| 201–202 | Spot pricing/request lifecycle | 07 | Partial: resilience covered; interruption causes, price ceiling versus capacity availability and best-effort notice behavior need visible explanation. |
| 203 | Spot Fleet pools and allocation strategies | 07, 21 | Partial: diversification is generic; Spot Fleet target capacity, pools, optional On-Demand and named strategy trade-offs need explicit teaching. |

## Proposed additional visuals: 16 (24–39)

| New lesson | Visual teaching objective | PDF mapping |
|---|---|---|
| 24 | Family map: C/R/M/I/G-P/T workloads, bottlenecks and limits | 176 |
| 25 | Graviton: Arm64 migration, Linux and software compatibility, benchmark decision | 182 |
| 26 | Placement details: spread/partition limits, metadata, replica separation and stop/change/start | 177–180 |
| 27 | RI choices: Standard/Convertible, terms, payment options, discount versus capacity | 181 |
| 28 | Dedicated Hosts: host affinity, placement visibility and license-bound decisions | 181 |
| 29 | Metrics: default EC2, credits, network, instance-store disk, EBS and agent metrics | 183, 193 |
| 30 | Recovery: preserved identity, volatile state, recovery versus replacement | 184 |
| 31 | HPC data ingestion: DX/DataSync/offline transfer with explicit legacy disposition | 186 |
| 32 | HPC storage: EBS/local scratch/S3/EFS/FSx for Lustre and data staging | 189 |
| 33 | HPC orchestration: Batch multi-node scheduling versus ParallelCluster provisioning | 185, 187, 190 |
| 34 | Networking stack: ENA/SR-IOV, EFA OS bypass, libfabric/MPI/NCCL prerequisites | 188 |
| 35 | Nine ASG processes: role of each process in the control loop | 196 |
| 36 | Suspension and resumption: worked operational failure cases | 196 |
| 37 | Health endpoint design and custom ASG health reporting | 197 |
| 38 | Rolling versus parallel fleets: target-group/ALB/DNS traffic-shifting options | 198–200 |
| 39 | Spot and Spot Fleet: pools, target capacity, allocation, price/capacity interruption | 201–203 |

These are a production plan, not generated or accepted visuals. Expected module size after production: **39 visuals**, retaining the existing 23. Split a proposed lesson further if its text cannot remain legible; coverage must not be squeezed to preserve a slide budget.

## Current-source checks

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html
- https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstancePlacement.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-how-suspending-processes-affects-other-processes.html
- https://docs.aws.amazon.com/autoscaling/ec2/userguide/resume-processes.html
- https://docs.aws.amazon.com/snowball/latest/developer-guide/doc-history.html

Snowball Edge has been restricted to existing customers since November 7, 2025. Teach the PDF's offline-transfer concept and current eligibility; do not silently drop the topic or recommend legacy access to a new customer.

## Scope and release decision

Module 07 should not receive a 100% source-coverage label yet. The 23 original assets remain useful, but image quality and broad topic representation are not equivalent to complete teaching depth. This audit records all topics found in pages 175–203; it is not a completed audit of all 845 pages. Cross-module subjects must receive explicit lesson-level mappings as modules 08–10, 22–24 and other service modules are built. Until those visuals are accepted, planned mappings remain open.

Future production gate: enumerate every PDF topic/subtopic, assign a visual lesson or a documented current-service/legacy disposition, check both original teaching content and visual QA, then audit omissions again. Optional notes complement images and cannot close a visual teaching gap by themselves. Whole-course 100% flags remain false while topics or modules are pending.

