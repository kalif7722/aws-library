// Each row compares the same design aspect across all three providers.
export type FeatureRow=[aspect:string,aws:string,azure:string,gcp:string];
export const featureMatrix:Record<string,[FeatureRow,FeatureRow,FeatureRow]>={
'Virtual machines':[
 ['Compute choice','EC2 offers instance families and sizes tuned for general, memory, compute or accelerated workloads.','Azure VMs span broad sizes with strong Windows and SQL Server integration.','Compute Engine offers machine families and custom machine types for targeted sizing.'],
 ['Storage and placement','EBS volumes attach to instances in an Availability Zone; instance store is ephemeral.','Managed disks attach to Azure VMs; availability sets and zones affect placement.','Persistent Disk or Hyperdisk attaches to VMs; zonal and regional disk options differ.'],
 ['Operations','You manage the guest OS and can use Systems Manager for fleet tasks.','You manage the guest OS with Azure management and policy integration.','You manage the guest OS and can use VM Manager for fleet operations.']],
'Serverless functions':[
 ['Deployment','Lambda runs packaged code or container images with AWS event integrations.','Functions supports several hosting plans and language runtimes.','Cloud Run functions deploy source into the Cloud Run execution model.'],
 ['Events','AWS services invoke functions through event sources, queues and schedules.','Azure triggers and bindings connect functions to services and data.','Eventarc and Google Cloud events can invoke functions.'],
 ['Scaling watch','Concurrency controls and execution limits shape burst behavior.','Hosting plan affects scale, networking and cold-start characteristics.','Cloud Run concurrency and instance settings affect scaling and latency.']],
'Managed containers':[
 ['Service model','App Runner simplifies web apps; ECS on Fargate manages tasks without EC2 hosts.','Container Apps runs apps and jobs with revisions and managed scaling.','Cloud Run runs container services and jobs with managed scaling.'],
 ['Control','ECS exposes task definitions and richer AWS network choices.','Container Apps exposes environments, ingress and revision controls.','Cloud Run exposes service, instance and concurrency controls.'],
 ['Workload fit','App Runner targets simple HTTP apps; ECS fits more customized services.','Strong fit for Azure microservices and event-driven workloads.','Strong fit for stateless HTTP services and containerized jobs.']],
'Kubernetes':[
 ['Control plane','EKS manages the Kubernetes control plane in AWS.','AKS manages the Kubernetes control plane in Azure.','GKE manages the Kubernetes control plane in Google Cloud.'],
 ['Node operation','EC2 nodes or Fargate profiles alter operational ownership.','Node pools and managed modes alter cluster operations.','Standard and Autopilot modes alter node management.'],
 ['Integration','AWS IAM, VPC and load-balancer integration shape platform design.','Entra, VNet and Azure monitoring shape platform design.','Google IAM, VPC and Cloud Operations shape platform design.']],
'Batch jobs':[
 ['Scheduling','AWS Batch submits jobs to queues and compute environments.','Azure Batch schedules tasks onto pools of compute nodes.','Google Cloud Batch submits jobs onto Google Cloud compute resources.'],
 ['Compute','EC2 and Fargate choices affect isolation and capacity.','Pool VM size and autoscale policy affect throughput.','VM allocation and job task settings affect throughput.'],
 ['Data path','S3 or EFS usually supplies inputs and stores outputs.','Azure Storage commonly carries input and output data.','Cloud Storage commonly carries input and output data.']],
'Object storage':[
 ['Core unit','S3 stores objects in buckets with storage classes.','Blob Storage stores blobs within containers and storage accounts.','Cloud Storage stores objects in buckets with storage classes.'],
 ['Access','IAM and bucket policies govern requests; access points can scope usage.','Entra RBAC, SAS and account controls govern access.','IAM and bucket-level controls govern object access.'],
 ['Lifecycle','Lifecycle policies and replication govern transitions and copies.','Lifecycle management and redundancy choices shape placement.','Lifecycle rules and replication choices shape transitions and copies.']],
'Block storage':[
 ['Attachment','EBS is persistent block storage attached to EC2.','Managed disks are persistent block volumes for Azure VMs.','Persistent Disk and Hyperdisk are block volumes for Compute Engine.'],
 ['Performance','Volume type and provisioned throughput/IOPS vary.','Disk tier and VM limits bound throughput/IOPS.','Disk family and VM limits determine throughput/IOPS.'],
 ['Resilience','Snapshots and Multi-Attach support selected patterns.','Snapshots and zone-redundant options vary by disk type.','Snapshots and regional disk options support selected designs.']],
'Managed file shares':[
 ['Protocol','EFS is managed NFS for Linux-style shared access.','Azure Files offers SMB and NFS options subject to tier and configuration.','Filestore is managed NFS for Google Cloud clients.'],
 ['Scale','Performance and throughput modes shape EFS behavior.','Share tier and provisioned performance shape Azure Files behavior.','Filestore tier shapes capacity and throughput.'],
 ['Fit','Common for EC2 or container workloads needing shared POSIX files.','Common for SMB migration and Azure application shares.','Common for GKE or VM workloads needing NFS.']],
'Private networks':[
 ['Scope','VPC is regional; subnets live in Availability Zones.','VNet is regional; subnets belong to the VNet.','VPC network is global; subnets are regional.'],
 ['Connectivity','Peering, Transit Gateway and PrivateLink serve different paths.','Peering, Virtual WAN and Private Link serve different paths.','Peering, Network Connectivity Center and Private Service Connect serve different paths.'],
 ['Controls','Security groups and network ACLs filter traffic.','Network security groups and route tables shape traffic.','Firewall rules and routes shape traffic.']],
'Load balancing':[
 ['Layer 4','Network Load Balancer handles transport-layer traffic.','Azure Load Balancer handles transport-layer traffic.','Cloud Load Balancing includes network load balancer options.'],
 ['HTTP','Application Load Balancer handles HTTP routing.','Application Gateway handles regional HTTP routing.','Application load balancer options handle HTTP routing.'],
 ['Scope','Select regional endpoints and use other AWS services for global entry.','Front Door complements regional gateways for global HTTP entry.','Global and regional load-balancer choices are available.']],
'DNS':[
 ['Zones','Route 53 hosts public and private hosted zones.','Azure DNS hosts public and private DNS zones.','Cloud DNS hosts public and private managed zones.'],
 ['Routing','Routing policies and health checks support traffic decisions.','Azure DNS handles records; Traffic Manager adds DNS-based routing.','Cloud DNS routing policies and health checks cover selected patterns.'],
 ['Integration','IAM and AWS resource aliases streamline AWS targets.','Azure resource and Private DNS integration streamlines Azure targets.','Google Cloud network integration streamlines private resolution.']],
'CDN and edge':[
 ['Delivery','CloudFront caches content at AWS edge locations.','Front Door provides global HTTP entry and edge caching.','Cloud CDN caches content at Google edge locations.'],
 ['Origin','Origins can include S3 and custom HTTP endpoints.','Origins are grouped for routing and failover.','Backends sit behind supported Cloud Load Balancing configurations.'],
 ['Protection','AWS WAF and Shield can protect the edge.','Front Door WAF policies protect the edge.','Cloud Armor policies protect supported edge traffic.']],
'Dedicated connectivity':[
 ['Circuit','Direct Connect links sites to AWS through a dedicated connection.','ExpressRoute links sites to Microsoft cloud through a private circuit.','Cloud Interconnect links sites to Google Cloud privately.'],
 ['Routing','Private and transit virtual interfaces serve different destinations.','Private peering and gateways connect Azure networks.','Cloud Router exchanges routes with Interconnect attachments.'],
 ['Resilience','Use redundant links and sites for production availability.','Use redundant circuits and connectivity locations.','Use redundant connections and locations for critical workloads.']],
'Managed relational':[
 ['Engines','RDS supports several relational engines including PostgreSQL, MySQL and SQL Server.','Azure SQL Database targets SQL Server; Azure Database for PostgreSQL targets PostgreSQL.','Cloud SQL supports MySQL, PostgreSQL and SQL Server.'],
 ['Operations','RDS manages provisioning, backups and patching within engine choices.','Azure managed databases handle platform tasks with engine-specific features.','Cloud SQL manages platform tasks with engine-specific features.'],
 ['Scale','Instance, storage and replica features depend on engine and edition.','Compute tier, storage and replicas depend on selected Azure product.','Machine tier, storage and replicas depend on engine and edition.']],
'Global relational':[
 ['Topology','Aurora Global Database uses a primary region with cross-region replicas.','Cosmos DB for PostgreSQL distributes PostgreSQL via coordinator and worker nodes.','Spanner supports relational data with distributed transactions across selected configurations.'],
 ['Writes','Primary-region writes are the common Aurora Global Database model.','Writes follow the PostgreSQL distribution and cluster design.','Multi-region configurations can serve globally distributed transactional workloads.'],
 ['Compatibility','Aurora is MySQL or PostgreSQL compatible by edition.','PostgreSQL extension and sharding compatibility need validation.','Spanner SQL dialect and application semantics need validation.']],
'Document databases':[
 ['Data model','DocumentDB stores JSON-like documents with MongoDB compatibility.','Cosmos DB MongoDB APIs offer document access on Azure.','Firestore stores documents in collections.'],
 ['Query API','MongoDB API compatibility varies by supported version and feature.','MongoDB API and feature compatibility vary by offering.','Firestore has its own query and SDK model.'],
 ['Scaling','Instances and storage configuration shape DocumentDB scale.','Throughput and partition keys shape Cosmos DB scale.','Document paths, indexes and query patterns shape Firestore scale.']],
'NoSQL at scale':[
 ['Model','DynamoDB is a key-value and document database.','Cosmos DB for NoSQL is a JSON document database.','Bigtable is wide-column; Firestore is document-oriented.'],
 ['Access','Partition and sort keys determine efficient DynamoDB access.','Partition key and RU provisioning affect Cosmos queries.','Row keys govern Bigtable access; indexes govern Firestore queries.'],
 ['Distribution','Global tables support multi-region DynamoDB writes.','Cosmos DB offers multiple regional distribution choices.','Bigtable replication and Firestore locations follow distinct models.']],
'Analytics warehouse':[
 ['Execution','Redshift uses provisioned or serverless warehouse capacity.','Fabric Warehouse uses Fabric capacity; Synapse has its own SQL compute models.','BigQuery runs serverless SQL analytics over managed storage.'],
 ['Data ecosystem','S3 and AWS analytics services feed Redshift.','OneLake/Fabric and Azure pipelines feed Fabric or Synapse.','Cloud Storage and Google Cloud pipelines feed BigQuery.'],
 ['Cost lever','Capacity, storage and query patterns drive Redshift cost.','Fabric capacity or Synapse compute and storage drive cost.','Query processing and storage models drive BigQuery cost.']],
'Event streaming':[
 ['Stream model','Kinesis Data Streams uses shards and consumer applications.','Event Hubs uses partitions and consumer groups.','Pub/Sub uses topics and subscriptions.'],
 ['Replay','Retention windows and shard processing govern replay.','Retention and offsets govern replay for consumers.','Subscription retention and snapshots support replay patterns.'],
 ['Processing','Lambda and stream consumers process records.','Stream Analytics, Functions or custom consumers process events.','Dataflow, Cloud Run or custom subscribers process messages.']],
'Data pipelines':[
 ['Primary role','Glue combines ETL jobs, crawlers and a data catalog.','Data Factory orchestrates data movement and transformation activities.','Dataflow runs Apache Beam pipelines; Data Fusion offers visual integration.'],
 ['Batch/stream','Glue supports batch and streaming ETL patterns.','Data Factory emphasizes orchestration; streaming needs companion services.','Dataflow supports batch and streaming processing.'],
 ['Design work','Job runtime and catalog integration drive Glue design.','Linked services, integration runtimes and pipelines drive Data Factory design.','Beam code or Fusion connectors determine the GCP path.']],
'Machine learning platform':[
 ['Lifecycle','SageMaker AI covers training, deployment and ML workflows.','Azure Machine Learning covers training, endpoints and MLOps workflows.','Vertex AI covers training, endpoints and ML workflows.'],
 ['Development','Studio, notebooks and pipelines support AWS teams.','Workspaces, jobs and registries support Azure teams.','Workbench, pipelines and model tools support Google Cloud teams.'],
 ['Governance','IAM, networking and model monitoring shape deployment.','Entra identity, networking and monitoring shape deployment.','IAM, networking and model monitoring shape deployment.']],
'Generative AI':[
 ['Model catalog','Bedrock exposes multiple foundation model providers.','Microsoft Foundry offers model discovery and deployment.','Vertex AI offers Google and partner model choices.'],
 ['Application tools','Knowledge Bases and Agents extend Bedrock workflows.','Foundry projects, agents and evaluations extend model use.','Model Garden, grounding and agent tools extend Vertex AI.'],
 ['Review','Check model access, regional availability and guardrails.','Check deployment type, content safety and quota.','Check model region, safety settings and grounding needs.']],
'Access control':[
 ['Identity','IAM identities and federated access represent AWS principals.','Entra ID represents workforce/workload identities.','Cloud Identity and federated principals can access GCP.'],
 ['Authorization','IAM policies and roles grant AWS actions.','Azure RBAC grants resource actions; Entra roles govern directory tasks.','IAM roles and policy bindings grant resource actions.'],
 ['Scope','Accounts, resources and organizations shape AWS scope.','Management groups, subscriptions, resource groups and resources shape Azure scope.','Organizations, folders, projects and resources shape GCP scope.']],
'Secrets':[
 ['Stored objects','Secrets Manager stores secret values and versions.','Key Vault stores secrets, keys and certificates.','Secret Manager stores secret versions.'],
 ['Rotation','Rotation workflows can use Lambda integrations.','Rotation requires application/process integration and policy.','Rotation schedules and workflows require workload integration.'],
 ['Access','IAM and resource policies govern retrieval.','Entra/RBAC or vault policies plus networking govern retrieval.','IAM and optional network controls govern retrieval.']],
'Encryption keys':[
 ['Key service','KMS creates and manages keys for integrated AWS services.','Key Vault keys or Managed HSM provide Azure cryptographic keys.','Cloud KMS manages keys for integrated Google services.'],
 ['Hardware','KMS keys have managed backing; CloudHSM is a separate dedicated option.','Managed HSM provides dedicated HSM-backed key management.','Cloud HSM and EKM options address distinct custody needs.'],
 ['Boundary','Key policies and grants govern KMS use.','RBAC/access policies and network controls govern vault use.','IAM and key rings govern Cloud KMS use.']],
'Web application firewall':[
 ['Attachment','AWS WAF associates with supported AWS web entry points.','Azure WAF associates with Front Door or Application Gateway.','Cloud Armor policies attach to supported load-balancing backends.'],
 ['Rules','Managed and custom rules filter HTTP requests.','Managed and custom rule sets filter HTTP requests.','Preconfigured and custom rules filter HTTP requests.'],
 ['Scope','Regional and CloudFront scopes differ.','Front Door and Application Gateway scopes differ.','Edge and regional policy behavior depends on load balancer.']],
'Network firewalls':[
 ['Inspection model','Stateful and stateless rule groups inspect traffic through firewall endpoints in a VPC.','A managed firewall in a dedicated subnet inspects traffic routed through it.','Distributed firewall policies govern VPC traffic; Enterprise adds inspection endpoints.'],
 ['Policy controls','Suricata-compatible stateful rules and domain lists support deeper filtering.','Network and application rules support FQDN filtering; Premium adds IDPS.','Hierarchical and network firewall policies support rules; Enterprise adds Layer 7 and IDPS.'],
 ['Encrypted traffic','TLS inspection can decrypt selected outbound traffic with configured certificates.','Premium supports TLS inspection for selected outbound and east-west flows.','Enterprise supports TLS inspection with configured Certificate Authority Service resources.']],
'Security posture and threat detection':[
 ['Core role','Security Hub aggregates posture checks and findings; GuardDuty detects threats from AWS telemetry.','Defender for Cloud combines posture management with workload protection plans.','Security Command Center centralizes posture, asset risk and threat findings.'],
 ['Coverage','Coverage depends on enabled standards, Regions, accounts and GuardDuty protection plans.','Coverage depends on subscriptions, enabled Defender plans and connected environments.','Coverage depends on SCC tier, organization activation and enabled services.'],
 ['Response','EventBridge, automation rules and investigation services route findings to response.','Workflow automation, Logic Apps and Sentinel integrations support response.','Event Threat Detection, findings exports and Security Operations integrations support response.']],
'Private service access':[
 ['Consumer endpoint','Interface endpoints place private ENIs in consumer subnets.','Private endpoints place a NIC with a private IP in the consumer VNet.','PSC endpoints or backends expose a private consumer address.'],
 ['Producer model','Endpoint services commonly front providers with a Network Load Balancer.','Private Link Service commonly fronts providers with a Standard Load Balancer.','Service attachments publish producer services to approved consumers.'],
 ['DNS and policy','Private DNS and endpoint policies scope access to supported services.','Private DNS zones and approval workflows complete the private endpoint path.','Private DNS and consumer accept lists govern discovery and access.']],
'Organization governance':[
 ['Hierarchy','Organizations groups accounts into organizational units with delegated administration.','Management groups organize subscriptions above resource groups.','Resource Manager organizes organizations, folders and projects.'],
 ['Guardrails','Service control policies set maximum permissions; Control Tower adds landing-zone controls.','Azure Policy initiatives and management-group inheritance enforce standards.','Organization Policy constraints inherit through folders and projects.'],
 ['Landing zone','Control Tower and Account Factory standardize account vending and baselines.','Azure landing zones combine management groups, policy, identity and connectivity.','Enterprise foundations combine folders, projects, IAM, organization policies and shared networking.']],
'Centralized backup':[
 ['Policy plane','Backup plans, vaults and Organizations policies centralize protected AWS resources.','Recovery Services vaults and Backup vaults apply workload-specific policies.','Backup and DR uses management consoles, backup vaults and appliance-based integrations.'],
 ['Protection','Supports selected AWS databases, storage and compute services.','Supports selected Azure VMs, databases, files and hybrid workloads.','Protects supported Google Cloud and enterprise workloads with service-specific methods.'],
 ['Recovery','Cross-account/Region copy and logically air-gapped vault patterns strengthen recovery.','Geo-redundancy, soft delete and immutability options protect recovery points.','Vault locations, retention locks and recovery workflows protect backup data.']],
'Workload disaster recovery':[
 ['Replication','DRS continuously replicates block-level server data into a staging area.','Site Recovery replicates supported VMs and servers to a recovery location.','Use workload-native replication and Backup and DR recovery orchestration where supported.'],
 ['Failover','Launch settings and recovery drills create replacement instances in AWS.','Recovery plans coordinate failover, test failover and reprotection.','Failover method varies across Compute Engine, databases, storage and protected enterprise workloads.'],
 ['Primary fit','Strong fit for server migration and low-RPO recovery into AWS.','Strong fit for Azure VM, VMware and supported physical-server recovery.','Strong fit when recovery is designed around native multi-region services plus protected backups.']],
'Container registry':[
 ['Artifacts','ECR stores OCI container images and related artifacts.','ACR stores OCI images and artifacts with Azure identity integration.','Artifact Registry stores containers plus language packages and other formats.'],
 ['Security','IAM, repository policies, KMS and Inspector scanning protect images.','Entra/RBAC, private endpoints, content trust features and scanning integrations protect registries.','IAM, VPC Service Controls and vulnerability scanning protect repositories.'],
 ['Delivery','Native integration targets ECS, EKS, Lambda container images and build services.','Native integration targets AKS, Container Apps, App Service and Azure pipelines.','Native integration targets GKE, Cloud Run, Cloud Build and software delivery services.']],
'CI/CD delivery':[
 ['Pipeline model','CodePipeline orchestrates stages and invokes CodeBuild, CodeDeploy and other actions.','Azure Pipelines runs YAML or classic pipelines with Microsoft-hosted or self-hosted agents.','Cloud Build executes build steps and triggers; Cloud Deploy can add release orchestration.'],
 ['Source and artifacts','Code connections and S3/ECR artifacts connect source to AWS targets.','Azure Repos, GitHub and artifacts integrate with broad Azure and external targets.','Cloud Build connects repositories and publishes to Artifact Registry or deployment targets.'],
 ['Governance','IAM, approvals, artifact encryption and CloudTrail govern delivery.','Environments, approvals, service connections and Entra permissions govern delivery.','IAM, private pools, Binary Authorization and provenance support governed delivery.']],
'Managed in-memory caching':[
 ['Engines','ElastiCache offers Valkey, Redis OSS and Memcached options.','Azure Cache for Redis offers Redis-compatible tiers and enterprise options subject to lifecycle.','Memorystore offers Valkey and Redis Cluster/Redis variants.'],
 ['Scaling','Node groups, replicas, serverless options and engine choice shape scaling.','Tier, clustering, shard count and replica design shape scaling.','Cluster or instance tier, shards, replicas and regional settings shape scaling.'],
 ['Resilience','Multi-AZ, replicas and automatic failover depend on engine and topology.','Zone redundancy, replicas and persistence depend on tier.','Regional availability, replicas and persistence depend on selected Memorystore product.']],
'Database migration':[
 ['Movement','DMS performs full load and change data capture for supported sources and targets.','Azure DMS supports online or offline migration paths for selected engines.','Google DMS supports continuous or one-time migrations for selected databases.'],
 ['Assessment','Migration Evaluator, Schema Conversion Tool or DMS Schema Conversion help plan selected migrations.','Azure Migrate and database assessment tooling identify compatibility issues.','Migration Center and engine-specific conversion tooling support assessment.'],
 ['Cutover','Replication lag, validation and target readiness govern cutover.','Migration mode and source/target support determine downtime.','Connectivity, conversion, replication lag and promotion determine downtime.']],
'Bulk and online data migration':[
 ['Online transfer','DataSync agents move file/object data over network links with scheduling and verification.','Storage Mover agents move supported file data into Azure Storage.','Data Transfer Essentials and Storage Transfer Service cover managed online movement patterns.'],
 ['Offline transfer','Snow Family provides devices for disconnected or bandwidth-constrained transfers.','Data Box appliances support offline bulk data import/export.','Transfer Appliance supports offline upload into Cloud Storage.'],
 ['Decision','Use online transfer for repeatable deltas; use devices when the network window is impractical.','Choose Storage Mover for online migration and Data Box for offline scale.','Choose managed online transfer or Transfer Appliance by source, bandwidth and deadline.']],
'Distributed tracing':[
 ['Telemetry','X-Ray records traces, segments, subsegments, annotations and service maps.','Application Insights captures distributed traces, dependencies, requests and application maps through Azure Monitor.','Cloud Trace collects latency data and traces across supported and instrumented services.'],
 ['Instrumentation','AWS SDKs, X-Ray SDK/daemon and OpenTelemetry can emit trace context.','Application Insights SDKs and OpenTelemetry distributions instrument applications.','Google libraries and OpenTelemetry exporters instrument applications.'],
 ['Analysis','Service maps, trace timelines and CloudWatch integration expose latency and errors.','Application Map, transaction search and Log Analytics correlate dependencies.','Trace Explorer and Cloud Logging/Monitoring correlation reveal latency and errors.']],
'Metrics and logs':[
 ['Metrics','CloudWatch metrics, alarms and dashboards cover AWS resources.','Azure Monitor metrics and alerts cover Azure resources.','Cloud Monitoring metrics and alerting cover Google Cloud resources.'],
 ['Logs','CloudWatch Logs ingests, queries and retains logs.','Log Analytics workspaces store and query collected logs.','Cloud Logging ingests and queries logs in log buckets.'],
 ['Cost','Ingestion, retention and query patterns affect the bill.','Workspace ingestion and retention choices affect the bill.','Log volume, retention and metric cardinality affect the bill.']],
'Audit activity':[
 ['Control plane','CloudTrail records supported AWS API activity.','Azure Activity Log records subscription control-plane events.','Cloud Audit Logs records administrative activity.'],
 ['Data plane','Data events require explicit selection for many AWS resources.','Resource logs cover many data-plane operations separately.','Data Access audit logs need configuration for many services.'],
 ['Retention','Trails and log destinations set the retention architecture.','Export and Log Analytics retention set the audit architecture.','Log buckets and sinks set the audit architecture.']],
'Infrastructure as code':[
 ['Language','CloudFormation templates use JSON or YAML.','Bicep compiles to ARM templates; ARM templates use JSON.','Infra Manager uses Terraform configurations.'],
 ['State','CloudFormation manages stack state and updates.','ARM tracks deployments while Azure manages resource state.','Terraform state is part of Infra Manager deployment workflow.'],
 ['Scope','Stacks can be deployed across accounts/regions with StackSets.','Deployments can target resource group, subscription and broader scopes.','Deployments target Google Cloud projects with IAM controls.']],
'API gateways':[
 ['Gateway','API Gateway handles AWS HTTP, REST and WebSocket API front doors.','API Management publishes and mediates APIs.','API Gateway serves managed front doors; Apigee adds broader API management.'],
 ['Policies','Authorizers, throttling and integrations shape AWS APIs.','Products, policies and developer portal shape Azure API lifecycle.','Apigee policies and developer experience vary from simpler API Gateway.'],
 ['Operations','Stage, route and usage design affect API Gateway.','Tier and gateway placement affect API Management.','Choose between gateway simplicity and Apigee lifecycle features.']],
'Queues and events':[
 ['Work queue','SQS queues work for one or more competing consumers.','Service Bus queues handle enterprise messages.','Cloud Tasks dispatches targeted asynchronous work.'],
 ['Event routing','EventBridge routes events via rules and buses.','Event Grid routes events to subscribers.','Eventarc routes events to supported destinations.'],
 ['Fanout','SNS or EventBridge can distribute to multiple targets.','Topics/subscriptions enable fanout in Service Bus or Event Grid.','Pub/Sub topics and subscriptions distribute messages.']]
};
