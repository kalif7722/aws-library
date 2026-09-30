import type {FeatureRow} from './feature-matrix';
// Three additional decision rows per capability. Avoid universal numeric quota claims
// where limits vary by plan, region, tier, configuration, or requested increase.
export const limitsMatrix:Record<string,[FeatureRow,FeatureRow,FeatureRow]>={
'Virtual machines':[
 ['Quota boundary','Regional vCPU and instance-family quotas can block scale-out.','Regional VM-family vCPU quotas constrain deployments.','Regional CPU quotas and machine-family availability constrain deployments.'],
 ['Placement limit','Instance type, EBS type and local capacity vary by Availability Zone.','VM size, disk support and zone availability vary by region.','Machine types, accelerators and disk options vary by zone.'],
 ['Operational limit','OS patching, backup and application failover remain workload responsibilities.','OS patching and availability design remain workload responsibilities.','OS patching and recovery design remain workload responsibilities.']],
'Serverless functions':[
 ['Execution limit','Standard Lambda invocations: up to 900 seconds (15 minutes). Managed Instances have a 90-minute exception for eligible asynchronous/event-source invocations.','Consumption plan: up to 10 minutes; Flex/Premium can run longer, but an HTTP response is limited to 230 seconds.','Cloud Run functions: HTTP up to 60 minutes; Cloud Functions v2 API event-driven functions up to 9 minutes.'],
 ['Payload and scale','Payload size and account/region concurrency quotas can require S3 or a queue.','Plan, trigger and regional quota govern instance scale and event handling.','Request size, instance/concurrency quotas and trigger type constrain scale.'],
 ['Long work caveat','Use Step Functions, a queue or container jobs when work exceeds the applicable timeout.','Use Durable Functions or asynchronous processing for long HTTP work.','Use Cloud Run jobs or asynchronous orchestration for work beyond trigger timeouts.']],
'Managed containers':[
 ['Runtime boundary','App Runner targets web services; ECS on Fargate supports broader task patterns.','Container Apps supports apps and jobs; feature limits depend on environment/plan.','Cloud Run services handle requests; Cloud Run jobs handle finite tasks.'],
 ['Scale limit','Fargate task size, service quotas and subnet IP capacity bound expansion.','Replica, CPU/memory and regional environment limits apply.','Instance, CPU/memory and request concurrency limits apply by region.'],
 ['Operational caveat','Fargate removes host management, not task, image or network design.','Environment networking and revisions need deliberate deployment design.','Request timeouts and stateless instance behavior affect long-lived work.']],
'Kubernetes':[
 ['Capacity boundary','EKS cluster and node quotas plus subnet IP capacity limit scale.','AKS node-pool, VM quota and network IP limits affect scale.','GKE cluster, node and regional resource quotas affect scale.'],
 ['Control tradeoff','Managed control plane does not remove node and add-on ownership.','Managed modes reduce operations but constrain some customization.','Autopilot limits selected node-level customizations; Standard offers more control.'],
 ['Availability caveat','Multi-AZ nodes and application replicas must be configured.','Zone-aware node pools and app replicas must be configured.','Regional clusters and workload replicas still require design.']],
'Batch jobs':[
 ['Quota boundary','vCPU quotas, instance capacity and compute-environment settings bound jobs.','Pool cores and subscription quotas bound concurrent tasks.','Regional CPU/GPU quotas and VM availability bound tasks.'],
 ['Job behavior','Retry and timeout settings must fit idempotent jobs.','Task retries and pool lifecycle must be planned.','Task retry and allocation policies need careful sizing.'],
 ['Cost caveat','Idle compute environments or oversized instances can increase cost.','Pool nodes can incur cost while idle.','VM and storage charges continue for allocated task resources.']],
'Object storage':[
 ['Object boundary','Not a file system or block device; API request and object limits apply.','Blob APIs are not an SMB/NFS file share; use Azure Files for that.','Object APIs are not POSIX file storage; use Filestore for shared files.'],
 ['Data movement','Cross-region replication and outbound transfer add cost.','Redundancy, replication and egress choices add cost.','Location, replication and network egress choices add cost.'],
 ['Tier caveat','Archive classes add retrieval delay and minimum storage periods.','Cool/archive tiers have access and retention economics.','Nearline/cold/archive classes have retrieval and minimum-duration charges.']],
'Block storage':[
 ['Attachment boundary','EBS volumes are normally zonal; attachment patterns vary by type.','Disk zone and shared-disk support vary by SKU.','Persistent Disk/Hyperdisk placement and sharing vary by type.'],
 ['Performance ceiling','Volume and EC2 instance throughput/IOPS ceilings both matter.','Disk tier and VM-level limits both cap performance.','Disk provisioning and VM-level limits both cap performance.'],
 ['Failure caveat','Snapshots are point-in-time; application consistency needs coordination.','Snapshots alone do not replace application-consistent recovery.','Snapshots and regional disks do not replace application failover.']],
'Managed file shares':[
 ['Protocol limit','EFS uses NFS; it is not a native SMB share.','SMB/NFS availability depends on share tier and configuration.','Filestore serves NFS; SMB workloads need another design.'],
 ['Performance boundary','Throughput mode and client connection patterns affect performance.','Share quota, tier and provisioned throughput affect performance.','Instance tier and client/network placement affect performance.'],
 ['Migration caveat','POSIX permissions and NFS locking need testing.','Identity, SMB permissions and private endpoint DNS need testing.','NFS permissions, mount options and backup need testing.']],
'Private networks':[
 ['Scope limit','VPC is regional; cross-region architecture needs explicit routing.','VNet is regional; cross-region peering is separate.','VPC is global but subnets and many resources are regional.'],
 ['Addressing','Overlapping CIDRs complicate peering and hybrid routing.','Overlapping address spaces block simple peering paths.','Overlapping subnet ranges complicate peering and hybrid routing.'],
 ['Security caveat','Security groups are stateful; NACLs are subnet-level and stateless.','NSGs are stateful, but routing and firewall paths still matter.','Firewall policy hierarchy and implied rules require review.']],
'Load balancing':[
 ['Protocol limit','ALB is HTTP-oriented; NLB handles TCP/UDP and other L4 patterns.','Azure Load Balancer is L4; Application Gateway is HTTP/L7.','Choose the correct application or network load balancer variant.'],
 ['Reach','Most ELB resources are regional; global routing needs another layer.','Application Gateway is regional; Front Door provides global HTTP entry.','Global versus regional mode depends on load-balancer type.'],
 ['Health caveat','Target health checks can pass while business transactions fail.','Probe behavior and backend health must reflect application readiness.','Health checks and backend service configuration need validation.']],
'DNS':[
 ['Availability boundary','DNS failover responds to health signals, not application state automatically.','Azure DNS hosting alone does not provide Traffic Manager failover.','Routing policies and health checks need explicit design.'],
 ['Propagation','TTL and resolver caching delay traffic changes.','TTL and client caches delay record updates.','TTL and client caches delay record updates.'],
 ['Private DNS','Resolver and inbound/outbound endpoint design affects hybrid DNS.','Private DNS zone links and resolver paths affect hybrid DNS.','Private zone visibility and forwarding affect hybrid DNS.']],
'CDN and edge':[
 ['Cache limit','Origin headers and cache policies control freshness.','Rules and cache settings can serve stale or unintended content.','Cache keys and origin headers control freshness.'],
 ['Origin boundary','CloudFront still depends on healthy and protected origins.','Front Door still depends on healthy origin groups.','Cloud CDN depends on supported load balancer backends.'],
 ['Security caveat','WAF and signed access require explicit policies.','WAF mode, custom domains and origin access require configuration.','Cloud Armor and origin exposure need explicit configuration.']],
'Dedicated connectivity':[
 ['Availability','A single Direct Connect circuit is not an HA design.','A single ExpressRoute circuit/location is not full resiliency.','A single Interconnect location is not an HA design.'],
 ['Bandwidth','Port speed, virtual interfaces and partner limits matter.','Circuit bandwidth and gateway SKU limits matter.','Connection capacity and attachment bandwidth matter.'],
 ['Routing caveat','BGP, VPN backup and prefix advertisements need testing.','BGP, route filters and VPN fallback need testing.','Cloud Router advertisements and VPN fallback need testing.']],
'Managed relational':[
 ['Engine boundary','RDS feature and version support differ by engine.','Azure SQL and Azure PostgreSQL are distinct products and engines.','Cloud SQL feature support differs among MySQL, PostgreSQL and SQL Server.'],
 ['Scale limit','Instance size, storage and connection ceilings still apply.','Service tier, vCores, storage and connection ceilings apply.','Machine tier, storage and connection quotas apply.'],
 ['HA caveat','Multi-AZ does not replace cross-region disaster recovery.','Zone redundancy does not replace geo-recovery design.','Regional HA does not replace cross-region recovery planning.']],
'Global relational':[
 ['Write topology','Aurora Global Database normally writes in a primary region.','Distributed PostgreSQL writes depend on shard/coordinator design.','Spanner multi-region configuration supports distributed transactions.'],
 ['Compatibility','Aurora version and engine behavior require migration tests.','PostgreSQL extension and distributed-query support require tests.','Spanner dialect and transaction semantics require application tests.'],
 ['Cost/latency','Cross-region replication and failover add design and cost.','Shard placement and cross-region access affect latency.','Strong consistency across distant regions affects latency and cost.']],
'Document databases':[
 ['API limit','DocumentDB MongoDB compatibility is version/feature specific.','Cosmos DB MongoDB API compatibility varies by offering/version.','Firestore is not MongoDB API compatible.'],
 ['Query boundary','Indexes and aggregation support must be validated.','Partition key, RU charge and query support affect design.','Composite indexes and query rules affect design.'],
 ['Scale caveat','Instance and storage scale are separate considerations.','Hot partitions can throttle even with adequate overall throughput.','Hotspotting and index fanout can affect write throughput.']],
'NoSQL at scale':[
 ['Model limit','DynamoDB queries depend on primary key and indexes.','Cosmos DB queries depend heavily on partition-key choice.','Bigtable row-key scans differ from Firestore document queries.'],
 ['Hot keys','Uneven partition-key traffic can throttle workloads.','Hot logical partitions can limit throughput.','Sequential row keys or hot documents can create hotspots.'],
 ['Consistency','Read consistency and global-table behavior need explicit choice.','Consistency level affects latency and RU cost.','Bigtable/Firestore consistency and replication semantics differ.']],
'Analytics warehouse':[
 ['Workload boundary','Redshift capacity and workload management affect concurrency.','Fabric capacity or Synapse pool size affects concurrency.','BigQuery slot capacity and workload patterns affect concurrency.'],
 ['Data transfer','S3/region placement and unloading can add transfer cost.','OneLake/Azure region placement and movement add cost.','Cross-region datasets and egress add cost.'],
 ['SQL caveat','SQL dialect, external tables and workload tuning need migration work.','Fabric/Synapse SQL capabilities are not identical.','BigQuery SQL and partition/clustering choices need adaptation.']],
'Event streaming':[
 ['Ordering','Ordering is scoped to shards, not an entire Kinesis stream.','Ordering is scoped to partitions.','Ordering keys need explicit configuration and subscriber handling.'],
 ['Retention','Retention window bounds replay unless data is archived elsewhere.','Retention window bounds replay; Capture can persist events.','Message retention and subscription state bound replay.'],
 ['Throughput','Shard mode and consumer design affect throughput.','Throughput units/processing units and partitions affect scale.','Publisher/subscriber quotas and flow control affect scale.']],
'Data pipelines':[
 ['Runtime boundary','Glue job type/runtime and worker quotas affect parallelism.','Integration runtime and activity limits affect orchestration.','Dataflow worker quotas and Beam pipeline shape execution.'],
 ['State and retries','ETL job retries require idempotent sinks.','Pipeline retry rules can duplicate writes if sinks are not idempotent.','Streaming checkpoints and deduplication need design.'],
 ['Connector caveat','Crawler inference and schema drift need review.','Connector support and self-hosted runtime needs vary by source.','Data Fusion connector/runtime support varies; Beam may need code.']],
'Machine learning platform':[
 ['Compute quota','Training instance and endpoint quotas vary by type/region.','Compute quota and VM capacity vary by region.','Accelerator and training quota vary by region.'],
 ['Model boundary','Training format and deployment image affect portability.','Environment, model format and endpoint settings affect portability.','Custom container and model format affect portability.'],
 ['Operations','Endpoint scaling, monitoring and data drift need setup.','Endpoint scaling, monitoring and model governance need setup.','Endpoint scaling, monitoring and model governance need setup.']],
'Generative AI':[
 ['Model access','Model availability and quotas vary by AWS region/provider.','Model availability and deployment quotas vary by region/offer.','Model availability and quota vary by region/publisher.'],
 ['Context limit','Context window and output caps depend on the selected model.','Context window and output caps depend on the selected model.','Context window and output caps depend on the selected model.'],
 ['Governance','Guardrails do not replace app-level validation and access controls.','Content filters and evaluations need app-level governance.','Safety settings and grounding need app-level verification.']],
'Access control':[
 ['Scope','IAM policy evaluation spans identity and resource policies.','Entra directory roles differ from Azure resource RBAC roles.','IAM inheritance flows through organization, folder and project.'],
 ['Quota/size','Policy size and attachment quotas affect large permission sets.','Role assignment and custom-role limits affect large estates.','Policy binding and custom-role limits affect large estates.'],
 ['Caveat','Explicit deny and organization policies can override allows.','Deny assignments and policy can constrain RBAC grants.','Deny policies and organization policy can constrain allows.']],
'Secrets':[
 ['Size/version','Secret size, versions and API quotas bound storage patterns.','Vault object limits and transaction throttling vary by tier.','Secret payload, version and API quotas apply.'],
 ['Rotation','Rotation requires a supported workflow and target-side changes.','Rotation is not automatic for every application secret.','A rotation schedule still needs a consumer update workflow.'],
 ['Exposure','Resource policy and cross-account access require review.','Vault RBAC, firewall and private endpoint DNS require review.','IAM and version access must be scoped carefully.']],
'Encryption keys':[
 ['Request quota','KMS cryptographic request quotas can throttle high-volume use.','Key Vault transaction limits depend on service tier.','Cloud KMS request quotas apply by method/project.'],
 ['Key custody','KMS-managed keys differ from dedicated CloudHSM custody.','Managed HSM is distinct from standard Key Vault keys.','Cloud HSM and EKM have distinct custody/latency models.'],
 ['Failure mode','Disabled or pending-deletion keys can make data unreadable.','Deleted or inaccessible keys can block dependent services.','Disabled or unavailable keys can block dependent services.']],
'Web application firewall':[
 ['Rule limits','Web ACL rule capacity and quotas constrain complex policies.','Policy/rule limits depend on Front Door or Application Gateway tier.','Policy/rule quotas and load-balancer attachment limits apply.'],
 ['Blind spots','WAF inspects configured web entry points, not every network path.','WAF covers its associated gateway/edge traffic only.','Cloud Armor covers protected backend/edge paths only.'],
 ['Tuning','Managed rules can create false positives without tuning.','Detection versus prevention mode changes enforcement.','Preconfigured rule sensitivity can create false positives.']],
'Network firewalls':[
 ['Traffic path','Route tables must steer intended flows through firewall endpoints; symmetric routing matters.','Routes must direct inspected traffic through the firewall in its dedicated subnet.','Firewall rules apply at policy attachment; advanced inspection requires associated endpoints.'],
 ['Feature boundary','TLS inspection and stateful rules require certificates, rule groups and policy configuration.','Basic and Standard lack the full Premium TLS inspection and IDPS feature set.','Standard and Essentials differ from Enterprise Layer 7 inspection and IDPS.'],
 ['Operational caveat','Uninspected paths and asymmetric flows can bypass or disrupt stateful inspection.','Forced tunneling and return paths need deliberate route design.','TLS inspection has protocol exclusions, including HTTP/2 and QUIC.']],
'Security posture and threat detection':[
 ['Signal boundary','Security Hub aggregates findings; GuardDuty is only one detector and neither replaces prevention.','Defender coverage varies by enabled plan and does not remove the need for service-native controls.','SCC findings depend on enabled detectors, asset coverage and tier.'],
 ['Noise','Standards and detectors require suppression, ownership and tuning.','Recommendations and alerts require prioritization and workflow ownership.','Findings require mute rules, ownership and validation to control noise.'],
 ['Scope','Account, Region and delegated-administrator design can leave coverage gaps.','Subscription, tenant and connected-cloud scope can leave gaps.','Organization, folder/project and service activation can leave gaps.']],
'Private service access':[
 ['Transitivity','PrivateLink exposes a service, not general transitive network routing.','Private Link exposes a resource privately, not full VNet routing.','PSC exposes supported services, not arbitrary transitive connectivity.'],
 ['DNS caveat','Private DNS names, endpoint policies and cross-account approvals need deliberate setup.','Private DNS zone links and split-horizon resolution are frequent failure points.','Private DNS records and producer/consumer project permissions require setup.'],
 ['Cost/scale','Hourly endpoint and data processing charges plus endpoint quotas apply.','Endpoint, DNS and processed-data costs/limits vary by service.','Endpoint/service attachment quotas and data processing charges apply.']],
'Organization governance':[
 ['Permission boundary','SCPs constrain permissions but never grant them.','Policy constrains resources; RBAC still grants operator permissions.','Organization Policy constrains resources; IAM still grants access.'],
 ['Inheritance','OU moves and policy inheritance can change effective permissions broadly.','Management-group hierarchy changes propagate policy and access effects.','Folder/project moves change inherited IAM and constraints.'],
 ['Operational caveat','Landing-zone automation needs exception, drift and account-vending workflows.','Policy exemptions and remediation tasks need ownership.','Constraint exceptions and project provisioning need ownership.']],
'Centralized backup':[
 ['Coverage','Not every AWS service or feature is supported identically by AWS Backup.','Vault type and workload determine available backup features.','Supported workloads and regional availability vary.'],
 ['Recovery proof','A successful backup job does not prove application-consistent recovery.','Protected recovery points still require restore testing.','Backup completion does not prove dependency-aware recovery.'],
 ['Isolation','Vault lock, cross-account copies and recovery roles must be designed before compromise.','Immutability, soft delete and privileged operations need separation.','Retention locks, IAM and recovery access need separation.']],
'Workload disaster recovery':[
 ['RPO/RTO','Replication lag, launch time and dependencies determine achieved objectives.','Replication health, boot order and dependencies determine achieved objectives.','Objectives depend on each workload service and recovery design.'],
 ['Failback','Failback requires planning and is not the inverse of one-click failover.','Reprotect and failback require supported topology and testing.','Failback is workload-specific and must be designed explicitly.'],
 ['Dependency gap','DRS does not automatically recover every external dependency or data service.','Recovery plans do not guarantee application consistency for every dependency.','Backups alone do not recreate networking, identity, secrets or external integrations.']],
'Container registry':[
 ['Registry limit','Repository, image, pull and scan quotas can affect large fleets.','SKU controls storage, throughput, geo-replication and networking features.','Repository, request and scanning quotas apply by project/region.'],
 ['Image trust','Scanning finds known issues; it does not prove an image is safe.','Scanning and signing require an enforced deployment policy to prevent risky pulls.','Vulnerability findings and provenance require Binary Authorization or equivalent enforcement.'],
 ['Egress','Cross-region pulls can add latency and data-transfer cost.','Replication topology and cross-region pulls affect cost.','Repository location relative to runtime affects latency and egress.']],
'CI/CD delivery':[
 ['Product boundary','CodePipeline needs companion build/deploy services for execution.','Azure Pipelines is broader, but agent capacity and service connections still constrain jobs.','Cloud Build builds and deploys, while complex release promotion may need Cloud Deploy.'],
 ['Runner risk','Build roles, third-party actions and artifacts are supply-chain trust boundaries.','Hosted/self-hosted agents and service connections are privileged boundaries.','Build service accounts, private pools and substitutions require least privilege.'],
 ['Quota/cost','Concurrent actions, build minutes and artifact transfer affect throughput and cost.','Parallel jobs, agent capacity and retention affect throughput and cost.','Build concurrency, machine type, private pools and logs affect throughput and cost.']],
'Managed in-memory caching':[
 ['Durability','A cache is not the system of record; persistence options do not replace database backups.','Persistence and geo features depend on tier and are not a substitute for durable storage.','Persistence behavior varies by product and should not replace a durable database.'],
 ['Compatibility','Valkey/Redis/Memcached features and versions differ.','Redis commands, modules and clustering features vary by tier.','Valkey and Redis products differ in commands, topology and migration path.'],
 ['Failure behavior','Failover, resharding and maintenance can reset connections or expose stale data.','Maintenance and failover can cause connection interruption.','Maintenance, scaling and failover require client retry behavior.']],
'Database migration':[
 ['Engine support','Source/target combinations and CDC features are version-specific.','Online/offline support varies by engine and migration scenario.','Supported sources, targets and conversion paths are limited.'],
 ['Schema gap','Heterogeneous migrations require explicit schema and code conversion.','DMS does not automatically resolve every schema or application incompatibility.','DMS does not convert all schema, extensions or application behavior.'],
 ['Validation','Replication success does not prove data completeness or application correctness.','Cutover requires validation, connection updates and rollback planning.','Promotion requires validation, downtime control and rollback planning.']],
'Bulk and online data migration':[
 ['Bandwidth','Online transfer duration depends on usable throughput, change rate and small-file overhead.','Agent throughput and source/storage limits constrain migration windows.','Network capacity, quotas and source performance constrain online transfer.'],
 ['Device lead time','Snow device availability, shipping and ingestion time affect deadlines.','Data Box ordering, shipping and ingestion add lead time.','Transfer Appliance availability, shipping and upload add lead time.'],
 ['Cutover','Final deltas and source freeze still need orchestration.','Online/offline tools do not perform every application cutover step.','Transfer completion does not update applications or verify business consistency.']],
'Distributed tracing':[
 ['Sampling','Sampling can omit rare requests unless rules match the incident profile.','Sampling and adaptive collection can hide low-frequency failures.','Sampling can omit traces; rates must balance cost and diagnostic value.'],
 ['Instrumentation gap','Uninstrumented hops break end-to-end trace context.','Unsupported libraries or missing propagation break dependency maps.','Missing context propagation creates partial traces.'],
 ['Telemetry cost','Trace volume, retention and related logs/metrics contribute cost.','Application Insights ingestion and Log Analytics retention can be material.','Trace spans plus correlated logging and monitoring create ingestion cost.']],
'Metrics and logs':[
 ['Quota/cost','High-cardinality custom metrics and log ingestion cost grow.','Workspace ingestion, retention and query volume add cost.','Metric cardinality and log ingestion/retention add cost.'],
 ['Collection','Not every application signal appears without instrumentation.','Diagnostic settings/agents are needed for many resource logs.','Agents and sinks are needed for selected workload logs.'],
 ['Retention','Metric and log retention differ by data type/settings.','Retention differs by workspace and data plan.','Log bucket retention differs from metric retention.']],
'Audit activity':[
 ['Coverage','CloudTrail data events need explicit selection for many resources.','Activity Log is control-plane; resource logs cover data plane.','Data Access logs may require enabling per service.'],
 ['Retention','Event history alone is not a long-term audit archive.','Activity Log default retention may not meet policy; export it.','Audit log bucket retention may need a custom policy.'],
 ['Blind spots','Application-level events need app logging.','Application-level events need app logging.','Application-level events need app logging.']],
'Infrastructure as code':[
 ['Template limit','Stack/resource and template quotas affect large deployments.','Deployment/template limits affect very large ARM/Bicep scopes.','Terraform configuration and API quotas affect deployment size.'],
 ['Drift','CloudFormation drift detection does not cover every property.','External resource changes can diverge from Bicep source.','Terraform state drift requires plan/reconciliation.'],
 ['Rollback','Failed stack updates can require rollback recovery.','Partial deployment failures need state and dependency review.','Failed applies can leave partial infrastructure needing repair.']],
'API gateways':[
 ['Request limit','Payload, timeout and account throttle quotas vary by API type.','Tier governs throughput, policy and networking limits.','API Gateway and Apigee have different quota/policy limits.'],
 ['Feature boundary','API Gateway is a gateway, not a complete developer program.','API Management provides broader product/policy/developer features.','API Gateway is simpler; Apigee offers fuller API lifecycle.'],
 ['Backend caveat','Gateway success does not imply backend resilience.','Gateway policies cannot fix unhealthy backends.','Gateway or Apigee policies cannot fix unhealthy backends.']],
'Queues and events':[
 ['Message boundary','SQS payload, retention and visibility timeout constrain workers.','Service Bus size, lock duration and tier affect workers.','Cloud Tasks payload/schedule limits differ from Pub/Sub retention.'],
 ['Delivery','At-least-once delivery means consumers must handle duplicates.','Service Bus/Event Grid delivery needs idempotent consumers.','Tasks/Eventarc/Pub/Sub delivery needs idempotent handlers.'],
 ['Fanout caveat','SQS alone is a queue; use SNS/EventBridge for broad fanout.','Service Bus and Event Grid differ in broker versus event semantics.','Cloud Tasks is targeted; Pub/Sub and Eventarc distribute events.']]
};
