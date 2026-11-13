# Module 12 — Containers, service connectivity and tenant isolation

Review date: 31 October 2026. 40 original visual lessons planned, including four illustrative sandbox walkthroughs. The Module 09 presentation standard applies. PDF physical pages 204–224 and 589 (22 pages) form the source checklist. Current-guide additions extend coverage to service mesh, cross-account application connectivity and tenant isolation.

## PDF page crosswalk

| Physical page | Topics/qualifiers | Lessons |
| --- | --- | --- |
|204|Image and running-container distinction; packaged dependencies; platform compatibility qualification; CPU/memory controls; density and startup qualification|01|
|205|ECS native orchestration; EKS managed Kubernetes; Fargate supported compute for both; orchestration versus compute|02|
|206|Microservices and multiple containers per host; discovery; ALB/NLB integration; scaling; finite or scheduled tasks; capacity/billing options; legacy container migration|06, 10, 11, 31|
|207|Logical cluster; desired-count service; versioned JSON task definition; running tasks with one or more containers; instance profile; application task role; added execution-role distinction|03, 04, 05|
|208|Definition/service/task relationship; multiple services per cluster; EC2 capacity through ASG; host identity versus task identity; log and data-service paths|03, 05, 12, 25|
|209|EC2 bridge dynamic host ports; ALB target registration; utilization; multiple tasks per host; rolling replacement; single-host failure qualification; awsvpc IP target distinction|06, 37|
|210|Fargate managed compute; task definition and supported CPU/memory; no customer-managed worker instances; desired task count; networking and quotas remain|02, 04, 08|
|211|Parameter Store and Secrets Manager injection; rotation refresh; none/bridge/host/awsvpc; task ENI/private IP/security groups/Flow Logs; Fargate required awsvpc; platform exceptions|05, 07, 08, 09|
|212|Application Auto Scaling desired tasks; CPU/memory metrics; target tracking; step scaling; scheduled scaling; task versus EC2 host scaling; Fargate constraints|11, 12|
|213|EC2 Spot ASG; draining; reliability trade-off; FARGATE baseline and FARGATE_SPOT weights; interruptions; capacity and fallback qualification|12, 13|
|214|Private/public registry; image content/digest/tags; ECS pulls; IAM and cross-account repository policy; scanning; lifecycle retention; versioning|14, 15, 17, 38|
|215|Source build/push; cross-Region/cross-account replication; destination registry permission; existing-image backfill; independent destination controls and runtime deployment|16, 28, 38|
|216|Manual and on-push basic OS scanning; Inspector enhanced OS/language scanning; finding views/APIs; EventBridge events; remediation not automatic patch|17, 38|
|217|Managed Kubernetes deployment/scaling; different API from ECS; EC2/Fargate; Kubernetes migration and portability qualifiers; regional clusters; Container Insights|02, 18, 19, 24, 25|
|218|VPC and AZ boundaries; public ingress load balancer; private ingress load balancer; private workers/Pods; suitable NAT or endpoints; compute fleet scaling|18, 20, 24|
|219|Managed node groups and ASG; self-managed nodes/bootstrap/optimized AMI concept; On-Demand/Spot; Fargate ownership and restrictions; current Auto Mode option|19, 21, 24|
|220|StorageClass; PVC/PV; CSI provisioner; EBS AZ block storage; EFS shared storage and Fargate static provisioning; FSx Lustre; FSx ONTAP; compatibility/reclaim/recovery|22, 23, 39|
|221|Supported code/image source; build and deploy; CPU/RAM; autoscaling; health check; URL/HTTPS/managed ingress; encryption; outbound VPC dependencies; eligibility correction and migration option|26, 27|
|222|Independent regional service; ECR image replication; DynamoDB global data; traffic routing; custom domain/TLS; DNS sketch correction; recovery verification|28|
|223|Customer-managed on-premises/VM compute; managed regional ECS control; ECS and SSM agents; EXTERNAL; management connectivity; local-processing/latency/compliance use cases; external network feature restrictions|29|
|224|Local Kubernetes lifecycle; EKS Distro; installer/tooling; optional Connector and console visibility; connected/disconnected/air-gapped operation; correction to historical fully-disconnected claim|30|
|589|Namespace/service/registered endpoints; location/attribute/health metadata; dynamic API/SDK/DNS discovery; client direct backend connection; health filtering and DNS caching qualification|31|

## Exact comparisons and historical dispositions

### Container runtime, ECS networking and identity

- **Platform portability** — Image OS family, CPU architecture, runtime and kernel requirements must match. Containers share host resources; their writable layer is not a durable shared database.
- **ECS objects** — Cluster: logical grouping, including eligible Fargate capacity. Task definition: versioned configuration. Task: running one or more containers. Service: maintains desired tasks. A Reserved Instance is a billing/capacity arrangement, not an ECS launch type.
- **Roles** — Task role authorizes application AWS API access. Execution role authorizes supported agent startup operations such as ECR pulls, awslogs and secret retrieval. EC2 instance profile supports the host/agent. Scope trust, actions, resources and applicable KMS access to the actual caller.
- **Bridge and host** — On Linux EC2, bridge supports dynamic host-port mapping. Host mode shares the host network, so the same host port cannot be reused by competing copies. An ALB target for bridge uses the instance and registered host port.
- **awsvpc and none** — awsvpc supplies a task ENI/private IP and security groups; Fargate requires it. Use IP target groups for supported awsvpc service load balancing. None provides no external task networking or port mappings. Windows mode support differs.
- **Fargate private startup** — Provide subnet IP capacity and required IAM/network paths. ECR image pull commonly needs ECR API and registry interface endpoints plus an S3 gateway endpoint for layers; CloudWatch Logs and Secrets Manager need their own access. NAT is another appropriate egress option.
- **Secret refresh** — Environment references are resolved at task start. Rotation does not update a running process environment; redeploy tasks or implement supported application retrieval/caching. Do not expose secrets in image layers, logs or broad diagnostic access.
- **Health and replacement** — Configure the application port, health-check path, security-group source and target type. Rolling updates need sufficient healthy capacity and deployment settings. Several tasks on one EC2 host share its failure boundary.
- **Task versus host scaling** — Application Auto Scaling changes desired service tasks with target tracking, step or scheduled policies. EC2 capacity-provider/ASG scaling supplies eligible slots. CPU, memory, ENIs, subnet IPs, quotas and placement constraints can each block placement.
- **Spot strategy** — Only one capacity provider in a strategy can have a base. Base is fulfilled first; weights distribute subsequent placements. FARGATE_SPOT can be interrupted or unavailable; it does not automatically fall back to FARGATE. Plan graceful stop, replicas and checkpointing.
- **Managed Instances** — Current ECS Managed Instances adds a managed compute option with its own supported task/network settings. Confirm current migration and capacity-provider compatibility instead of generalizing old EC2/Fargate-only statements.

### Image registry, scanning and regional distribution

- **Image identity** — A tag is a reference; the digest identifies content. Use reproducible build inputs and record the digest deployed. Appropriate tag-immutability settings reduce accidental release changes.
- **Repository access** — Authentication is separate from permission to pull/push. Cross-account pulls need applicable identity and repository policy authorization; registry token acquisition alone is insufficient. Image network reachability remains required.
- **Lifecycle preview** — Preview retention rules, preserve deployed and rollback images, and account for manifest lists/reference artifacts. An image still running from a local cache may later fail to redeploy if its registry content was removed.
- **Cross-account replication** — Source registry rules specify destinations. Destination registry permissions grant ecr:ReplicateImage and, for automatic repository creation, ecr:CreateRepository. Without creation permission, precreate matching destination repositories.
- **Replication completeness** — Automatic replication does not simply synchronize every historical image and deletion. Validate eligible push/restore triggers and use supported replication backfill deliberately. Destination settings, policies, lifecycle and deployment remain separate; verify destination digest and status.
- **Basic scanning** — Current ECR Basic Scanning uses AWS-native OS vulnerability detection, with supported manual/on-push operation. Retrieve current findings through supported APIs; old DescribeImages summary/status fields are not the current findings interface.
- **Enhanced scanning** — Inspector covers supported OS and programming-language packages, configured repository filters and rescan rules. Current eligibility/history and rescan-duration settings matter; enabling scanning does not guarantee every old image was assessed.
- **Events and remediation** — Basic and enhanced scan events have different producers/details. Process supported EventBridge events, prioritize exploitable findings, rebuild and scan a patched image, then deploy the new digest. Scanning itself does not patch or universally block deployment.

### Kubernetes compute, storage and tenant boundaries

- **Control plane and Region** — EKS manages a regional Kubernetes control plane. Deploy separate clusters for regional recovery; restore workload definitions, image availability, secrets, state and routing. Kubernetes API portability does not remove cloud-specific integrations. The EKS management API PrivateLink endpoint does not carry Kubernetes API traffic; configure the separate cluster API endpoint and private access path.
- **Compute ownership** — Managed node groups automate supported EC2/ASG lifecycle operations; self-managed nodes require more bootstrap and patching ownership, including compatible optimized AMIs. EKS Auto Mode manages additional supported compute/platform functions. Verify workload and platform support.
- **Fargate restrictions** — EKS Fargate has no Fargate Spot and does not support arbitrary DaemonSets, privileged patterns or EBS-backed Pod volumes. Select compatible storage and identity rather than assuming ECS Fargate feature parity.
- **Cluster and workload authorization** — EKS access entries/configuration and Kubernetes RBAC authorize cluster actions. IRSA or supported EKS Pod Identity authorizes workload AWS API calls. IRSA requires the cluster IAM OIDC provider and a trust policy scoped to the expected service-account subject and STS audience. Pod Identity uses its supported association and agent path and is not supported on Fargate; restrict IMDS and avoid broad node-role inheritance.
- **PVC/PV and provisioning** — StorageClass describes dynamic-provisioning parameters through a compatible provisioner; statically provisioned volumes are also valid. Match access mode, topology, reclaim policy, driver identity, filesystem/network permissions and backup/restore.
- **EBS and EFS** — EBS data volumes are AZ-scoped; compatible scheduling must follow volume topology. EFS supports shared access. EKS Fargate supports eligible EFS static provisioning and does not support dynamic persistent-volume provisioning for Fargate workloads.
- **FSx drivers** — FSx for Lustre uses supported CSI components and compatible nodes; ONTAP integrations such as Trident have different protocols and provisioning contracts. FSx for Lustre CSI is not supported on Fargate. The current ONTAP CSI integration is not compatible with EKS Hybrid Nodes; validate the selected driver and compute. This list does not promise universal backend support.
- **Soft tenancy** — Namespaces, scoped RBAC, quotas, admission restrictions and workload identities support pooled isolation. A namespace by itself is not a security boundary; separate cluster/account choices can reduce trust and blast-radius exposure.
- **Network enforcement** — Start with default-deny intent and explicit required DNS/dependency paths, using a supported enforcing network-policy implementation. Shared nodes share kernel risks; combine traffic controls with data authorization, metadata restrictions and resource limits.
- **Tenant context** — Derive tenant identity from authenticated trusted context and enforce it in every data access path. Silo dedicates resources, pool shares them with isolation controls, and bridge combines models. Test cross-tenant reads/writes, not only network reachability.

### Service discovery, mesh and cross-account connectivity

- **Cloud Map data path** — Register endpoint identity/attributes/health and use eligible API or DNS discovery. The caller connects directly to the discovered backend; Cloud Map is not an inline load balancer or a network tunnel.
- **Health and caching** — DiscoverInstances supports HEALTHY, UNHEALTHY, ALL and HEALTHY_OR_ELSE_ALL filtering. Without configured health checks, filtering may not exclude instances. DNS routing/fail-open behavior and TTL/client caches differ; do not assume instant removal or an authorization boundary.
- **Service Connect scope** — Each service joins one namespace; compatible participating services can span ECS clusters in the same Region and supported shared namespaces/accounts. They still need routes and security-group reachability. Outside clients need another discovery/interconnection method.
- **Service Connect TLS** — Supported TLS configuration uses AWS Private CA and an ECS infrastructure role, with managed certificate secrets/rotation. Configure required permissions and protect those secrets. Encryption/rotation behavior does not automatically supply all tenant authorization or legacy mesh features.
- **App Mesh disposition** — Support ended 30 September 2026 and resources are no longer available as a current choice. Preserve mesh concepts and evaluate supported Service Connect, Lattice or Kubernetes options against explicit telemetry, TLS, retries and traffic-control requirements.
- **Lattice controls** — Service networks, VPC associations, listeners, target groups and supported sharing provide connectivity. IAM-auth policies and caller IAM authorization are distinct controls; signed requests are required when using IAM authentication. Verify target health, security paths and logs.
- **Isolation validation** — Use an allow/deny matrix across application authorization, IAM and network policies. A timeout may indicate DNS or routing failure rather than an enforced tenant boundary. Preserve policy versions and negative-test evidence.

### App Runner and hybrid operating-model exceptions

- **Current eligibility** — App Runner closed to new customers on 31 March 2026. Existing eligible customers can continue creating/using services, with continued security/availability investment but no planned new features. Retain code/image, deployment, health, scaling, HTTPS and encryption concepts as historical/current-existing-customer knowledge.
- **Migration candidate** — AWS recommends evaluating ECS Express Mode, which creates a Fargate service, ALB, scaling and networking in the account using an image and required IAM roles. It has no separate Express Mode charge; underlying resources remain billable. Validate ownership, private dependencies and deployment parity.
- **Ingress versus egress** — An App Runner VPC connector controls application outbound private-network traffic. It does not make incoming traffic private. Private ingress uses supported VPC interface endpoint and ingress-connection configuration; VPC egress may require NAT or endpoints for public dependencies.
- **Regional example correction** — Use independent supported regional services and validated custom-domain, certificate and routing configurations. A hostname is not a literal A-record IP value. Image replication, global-table data replication and traffic failover have separate configuration and verification.
- **ECS Anywhere** — Register supported external hosts with ECS/SSM agents, IAM and EXTERNAL launch type. Management depends on regional connectivity, while already-running tasks may continue during disconnection. External networking supports bridge/host/none, not awsvpc; service load balancing/discovery are not supported.
- **Hybrid host support** — Current ECS Anywhere operating-system support changed in August 2026. Validate the current supported list rather than using an old host image. Customer-owned infrastructure, patching, capacity, local access and recovery remain operational responsibilities.
- **EKS Anywhere correction** — A customer-operated local Kubernetes control plane can run connected, disconnected or air-gapped using prepared dependencies/mirrors. Optional EKS Connector provides console visibility; it does not make the local control plane a managed regional EKS cluster. Full disconnection does not require abandoning EKS Anywhere for bare EKS Distro.

## Publication gate

Do not accept the module until actual selected artwork is reviewed for technical relationships, text, legibility and the Module09 style; every final asset is decoded and checked at 2048 × 1152; unique IDs/sequences/paths and hashes pass; the final build and relevant existing checks pass. Whole-course 100% coverage remains unclaimed while later modules are planned. Walkthroughs illustrate sandbox procedures and do not claim execution in a real AWS account.

## Primary references

- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-ecs-iam-role-overview.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/capacity-launch-type-comparison.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/replication.html
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-basic.html
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning-enhanced.html
- https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html
- https://docs.aws.amazon.com/eks/latest/userguide/fsx-csi-create.html
- https://docs.aws.amazon.com/eks/latest/userguide/fsx-ontap.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking-awsvpc.html
- https://docs.aws.amazon.com/eks/latest/userguide/automode.html
- https://docs.aws.amazon.com/eks/latest/userguide/vpc-interface-endpoints.html
- https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html
- https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
- https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html
- https://docs.aws.amazon.com/eks/latest/userguide/fargate.html
- https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
- https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html
- https://docs.aws.amazon.com/eks/latest/best-practices/tenant-isolation.html
- https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html
- https://docs.aws.amazon.com/apprunner/latest/dg/network-vpc.html
- https://docs.aws.amazon.com/apprunner/latest/dg/network-pl.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere-troubleshooting.html
- https://anywhere.eks.amazonaws.com/docs/overview/faq/
- https://docs.aws.amazon.com/cloud-map/latest/api/API_DiscoverInstances.html
- https://docs.aws.amazon.com/cloud-map/latest/dg/services-route53.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect-tls.html
- https://docs.aws.amazon.com/app-mesh/latest/userguide/getting-started-ecs.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-vpc-lattice.html
- https://docs.aws.amazon.com/vpc-lattice/latest/ug/auth-policies.html

## Final review and verification

All 40 selected original visuals passed semantic and style review. Corrected variants resolve the ECS cluster boundary (03), private startup endpoint arrows (08), draining caption (12), Kubernetes API versus AWS service endpoints (20), EBS access-mode wording (22), alternate App Runner ingress modes (27), and trusted tenant identity/authorization labels (35). Native comparisons preserve exact prerequisites and current exceptions.

All 463 active course assets decoded at 2048 × 1152 with unique lesson IDs, sequences and paths. Final 40 image hashes and sizes match module-12-visual-qa.json. The single final application build and both existing course visual-discovery tests passed. The production-server Module 12 page returned 40 reviewed lessons and five visible reference tables; ten sampled asset URLs returned valid image bytes. Previous Modules 01–11 reference content is semantically unchanged.
