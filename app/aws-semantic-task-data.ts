// Pure data snapshot of AWS course task guides for semantic search.
// Kept separate from client components so global search never imports React/CSS UI.
const V = (kind: string, title: string, subtitle: string, nodes: string[], explanation: string, cue: string) => ({ kind, title, subtitle, nodes, explanation, cue });

export const awsSaaDomains = [
  {
    number: "01", title: "Design Secure Architectures", weight: "30%", outcome: "Build identity, network, application, and data controls around the workload boundary.", flow: ["Identity", "Network", "Application", "Data"],
    tasks: [
      { title: "Task 1.1 · Design secure access to AWS resources", ask: "Choose identity, authorization, account, and resource-policy controls that give the right principal the right access at the right scope.", focus: ["IAM users, groups, roles, policies, MFA, root-user protection, and least privilege", "Federated access, IAM Identity Center, STS, role switching, and cross-account access", "Organizations, Control Tower, service control policies, resource policies, and multi-account boundaries", "AWS Regions, Availability Zones, shared responsibility, and secure access patterns"], services: ["AWS IAM", "AWS IAM Identity Center", "AWS Security Token Service", "AWS Organizations"], visual: V("decision", "Access is a policy decision", "Identity proves who; policy decides what", ["Principal", "Action", "Resource", "Condition", "Allow / deny"], "Evaluate the principal, requested action, target resource, and conditions at the policy boundary. Then apply the narrowest scope that satisfies the workload.", "A role is temporary identity; a policy is the permission statement; an SCP is a maximum boundary, not an allow grant.") },
      { title: "Task 1.2 · Design secure workloads and applications", ask: "Combine segmentation, traffic controls, application security services, and protected connectivity to reduce workload attack paths.", focus: ["VPC subnet tiers, route tables, security groups, network ACLs, NAT gateways, and port/protocol control", "Cognito, GuardDuty, Macie, Shield, WAF, Secrets Manager, and IAM Identity Center by use case", "Public and private subnet segmentation, secure service endpoints, VPN, and Direct Connect", "External threats such as DDoS and SQL injection, and the control that addresses each threat"], services: ["Amazon VPC", "AWS WAF", "AWS Secrets Manager", "Amazon GuardDuty"], visual: V("layers", "Security follows the request path", "Layer the controls around the application", ["Internet edge", "WAF / Shield", "Public entry", "Private tiers", "Secrets + data"], "A secure workload separates internet-facing entry from private application and data tiers, then applies identity, network, and data controls at each boundary.", "WAF understands HTTP attacks; security groups filter stateful traffic; NACLs filter subnet traffic; Secrets Manager protects application credentials.") },
      { title: "Task 1.3 · Determine appropriate data security controls", ask: "Protect data through encryption, key policy, access, retention, backup, recovery, and lifecycle controls that match its classification and compliance needs.", focus: ["Data governance, classification, access policies, retention, lifecycle, backups, and replication", "KMS encryption at rest, ACM/TLS encryption in transit, key policies, rotation, and certificate renewal", "Compliance alignment and separation of data-plane access from key-management access", "Backup and replication choices that preserve confidentiality, durability, and recoverability"], services: ["AWS KMS", "AWS Certificate Manager", "AWS Backup"], visual: V("flow", "Data protection is a lifecycle", "Protect the value before, during, and after use", ["Classify", "Authorize", "Encrypt", "Replicate", "Retain / recover"], "Data controls are connected: classification influences access and retention; keys protect content; backups and replicas protect availability; evidence proves the controls operate.", "KMS protects keys and encrypted data; ACM manages certificates for TLS; backups are not a substitute for access control.") },
    ]
  },
  {
    number: "02", title: "Design Resilient Architectures", weight: "26%", outcome: "Remove single points of failure and design for scale, loose coupling, availability, and recoverability.", flow: ["Decouple", "Scale", "Fail over", "Recover"],
    tasks: [
      { title: "Task 2.1 · Design scalable and loosely coupled architectures", ask: "Select the right compute, storage, networking, messaging, caching, container, serverless, and orchestration patterns for changing demand.", focus: ["Event-driven, microservice, multi-tier, stateless, serverless, and container architectures", "API creation and management, managed services such as Transfer Family and Secrets Manager, and ALB load balancing", "SQS, SNS, EventBridge, API Gateway, Step Functions, caching, read replicas, and publish/subscribe", "Horizontal versus vertical scaling, CDN/edge acceleration, object/file/block storage, and future growth", "ECS, EKS, Fargate, Lambda, purpose-built compute/storage/network/database services, and migration into containers"], services: ["Amazon SQS", "Amazon EventBridge", "AWS Lambda", "Amazon ECS"], visual: V("flow", "Loose coupling absorbs change", "Producers do not wait on every consumer", ["Producer", "Event / queue", "Independent workers", "State store", "Consumer"], "Queues buffer work, events route intent, and independently scaling consumers process at their own pace. This reduces timing and failure dependencies between components.", "Use a queue for work distribution, pub/sub for fan-out, and a workflow service when stateful orchestration is the requirement.") },
      { title: "Task 2.2 · Design highly available and/or fault-tolerant architectures", ask: "Design across failure domains and choose an RTO/RPO-aligned recovery strategy with automation, visibility, and no single point of failure.", focus: ["Regions, Availability Zones, Route 53, route tables, load balancing, distributed design, immutable infrastructure, and service quotas/throttling", "Backup and restore, pilot light, warm standby, active-active, RPO, and RTO", "Automation, health metrics, failover, durable storage, replication, and legacy-workload reliability using managed services", "X-Ray, RDS Proxy, storage durability/availability, and purpose-built services such as Comprehend or Polly where appropriate", "Remove single points of failure and select the least complex recovery strategy that meets the business requirement"], services: ["Amazon Route 53", "Elastic Load Balancing", "AWS Backup", "AWS X-Ray"], visual: V("timeline", "Recovery strategy follows business loss", "RPO and RTO narrow the design", ["Failure", "Detect", "Fail over", "Restore / replay", "Validate"], "Start with how much data may be lost and how quickly service must return. Then choose the least complex strategy that meets those limits and test it.", "Backup and restore is cheaper but slower; active-active is faster but more complex and costly.") },
    ]
  },
  {
    number: "03", title: "Design High-Performing Architectures", weight: "24%", outcome: "Match workload access patterns, throughput, latency, and growth to the right AWS technology.", flow: ["Workload", "Data path", "Capacity", "Latency"],
    tasks: [
      { title: "Task 3.1 · Determine high-performing and/or scalable storage solutions", ask: "Choose object, file, block, or hybrid storage and configure it for the workload's throughput, latency, access pattern, and future growth.", focus: ["S3, EFS, EBS, FSx, hybrid storage, object/file/block characteristics, and business requirements", "Throughput, IOPS, latency, durability, access patterns, and scaling limits", "Data transfer and hybrid integration with DataSync, Storage Gateway, or Transfer Family", "Determine the storage service and configuration for performance demands and future capacity, not only today's size"], services: ["Amazon S3", "Amazon EBS", "Amazon EFS", "AWS Storage Gateway"], visual: V("matrix", "Storage follows access shape", "Choose by data behavior, not product familiarity", ["Object\nlarge durable objects", "File\nshared hierarchy", "Block\nlow-latency volume", "Hybrid\non-prem + cloud"], "Object storage scales for independent objects, file storage shares a hierarchy, block storage attaches to compute, and hybrid services bridge existing environments.", "Ask whether the workload needs a filesystem, a mounted volume, or durable object access before comparing performance tiers.") },
      { title: "Task 3.2 · Design high-performing and elastic compute solutions", ask: "Select compute types, sizes, scaling signals, and decoupling patterns that meet performance and elasticity requirements.", focus: ["EC2 instance families and sizes, Lambda memory, Batch, EMR, Fargate, ECS, and EKS", "Global infrastructure, edge processing, queues, messaging, and publish/subscribe for distributed workloads", "EC2 Auto Scaling, AWS Auto Scaling, queue depth, utilization metrics, horizontal/vertical scaling, and hibernation", "Serverless patterns and container orchestration, with components decoupled so they scale independently", "Resource type and size selection based on workload requirements rather than habit"], services: ["Amazon EC2", "Amazon EC2 Auto Scaling", "AWS Lambda", "AWS Fargate"], visual: V("decision", "Elastic compute is a feedback loop", "Measure demand, then change capacity", ["Demand signal", "Metric", "Scaling policy", "Capacity", "Health check"], "A scaling policy connects workload demand to a capacity change and then checks whether the new fleet is healthy and sufficient.", "Scale on the metric that represents demand: queue depth, requests, concurrency, or throughput—not CPU by default.") },
      { title: "Task 3.3 · Determine high-performing database solutions", ask: "Match database engine, type, capacity, caching, replication, and connection strategy to access patterns and performance needs.", focus: ["Regions and Availability Zones, relational/non-relational/serverless/in-memory types, Aurora, RDS, DynamoDB, and purpose-built engines", "Read-intensive versus write-intensive access, capacity units, instance types, and Provisioned IOPS", "Read replicas, database connections, RDS Proxy, caching with ElastiCache, and replication", "Engine selection such as MySQL versus PostgreSQL, including homogeneous/heterogeneous migration implications", "Design the database architecture around access pattern, capacity, consistency, and connection behavior"], services: ["Amazon RDS", "Amazon Aurora", "Amazon DynamoDB", "Amazon ElastiCache"], visual: V("matrix", "Database choice starts with access pattern", "Shape the data path before choosing the engine", ["Relational\njoins + transactions", "Key-value\nknown access keys", "Cache\nhot reads", "Replica\nread scale", "Proxy\nconnection control"], "Performance comes from matching consistency, query shape, read/write ratio, connection behavior, and data model to the engine and its scaling model.", "Read replicas scale reads; they do not replace a multi-writer design or solve every write bottleneck.") },
      { title: "Task 3.4 · Determine high-performing and/or scalable network architectures", ask: "Design network topology, addressing, edge, connection, routing, and load-balancing choices that meet latency and scale requirements.", focus: ["Global, hybrid, and multi-tier topology, subnet tiers, routing, IP addressing, and resource placement", "CloudFront, Global Accelerator, ALB, VPN, Direct Connect, and PrivateLink use cases", "Scaling network configurations and selecting the load balancer at the right layer", "Future address space and network growth rather than only today's topology"], services: ["Amazon CloudFront", "AWS Global Accelerator", "Elastic Load Balancing", "Amazon VPC"], visual: V("flow", "Traffic should enter at the right edge", "Placement controls latency and scale", ["Client", "Edge / accelerator", "Load balancer", "Service tier", "Data tier"], "Use edge caching for content, acceleration for global TCP/UDP entry, and load balancing for distributing application traffic across healthy targets.", "CloudFront caches content; Global Accelerator improves global entry; ALB understands HTTP; NLB handles high-performance transport traffic.") },
      { title: "Task 3.5 · Determine high-performing data ingestion and transformation solutions", ask: "Design secure ingestion, streaming, transfer, transformation, processing, and visualization paths for the required volume and frequency.", focus: ["Data lakes, Kinesis streaming, Firehose delivery, Glue transformation, Athena/Lake Formation, and visualization", "Batch versus streaming ingestion, data transfer with DataSync and Storage Gateway, and secure endpoints", "EMR and other processing choices, throughput, sizes, speeds, and ingestion configuration", "Transforming formats such as CSV to Parquet and securing the ingestion access point"], services: ["Amazon Kinesis", "Amazon Data Firehose", "AWS Glue", "Amazon Athena"], visual: V("pipeline", "The data path has distinct jobs", "Ingest, transform, govern, and query", ["Sources", "Ingest", "Transform", "Lake / catalog", "Query / visualize"], "Separate ingestion from transformation and consumption so each stage can scale and use the right format, security boundary, and processing engine.", "Firehose simplifies delivery; Glue transforms/catalogs; Athena queries data in place; Lake Formation governs the lake.") },
    ]
  },
  {
    number: "04", title: "Design Cost-Optimized Architectures", weight: "20%", outcome: "Reduce total cost while preserving the availability, performance, security, and recovery requirement.", flow: ["Measure", "Right-size", "Tier", "Review"],
    tasks: [
      { title: "Task 4.1 · Design cost-optimized storage solutions", ask: "Choose the lowest-cost storage, transfer, tier, lifecycle, backup, and access strategy that still meets the workload requirement.", focus: ["S3 access patterns, Requester Pays, lifecycle, tiering, EFS, EBS, FSx, and object/file/block choices", "Cost allocation tags, multi-account billing, Cost Explorer, Budgets, and Cost and Usage Report", "HDD versus SSD block options, data transfer, DataSync, Transfer Family, Storage Gateway, and backup/archive choices", "Storage size, auto scaling, access patterns, retention, tier selection, lifecycle timing, and the lowest-cost migration path"], services: ["Amazon S3", "AWS Cost Explorer", "AWS Budgets", "AWS Backup"], visual: V("cycle", "Storage cost follows the lifecycle", "Move data as its value and access change", ["Hot", "Warm", "Cold", "Archive", "Delete"], "Measure access patterns, transition data to an appropriate tier, retain only as long as required, and review the resulting cost and retrieval trade-off.", "The cheapest tier is not always cheapest overall when retrieval frequency, latency, and transfer are included.") },
      { title: "Task 4.2 · Design cost-optimized compute solutions", ask: "Choose compute service, instance family, size, purchase model, scaling, and availability level that fit the workload economics.", focus: ["On-Demand, Spot, Reserved Instances, Savings Plans, cost allocation, and Cost Explorer/Budgets/CUR", "Regions and Availability Zones, EC2 families and sizes, Lambda, Fargate, containers, Outposts, and edge processing", "Horizontal/vertical scaling, hibernation, ALB versus NLB versus GWLB, and production versus non-production availability", "Right-size utilization, select the correct instance family and size, and choose the least expensive service that meets the requirement"], services: ["Amazon EC2", "AWS Lambda", "AWS Fargate", "Savings Plans"], visual: V("decision", "Compute cost is a commitment decision", "Match certainty and interruption tolerance", ["Variable demand", "Steady baseline", "Interruptible work", "Container / function", "Purchase model"], "Use serverless or elastic capacity for uncertain demand, commitments for stable baseline, and Spot for interruptible work with retryable processing.", "Do not choose Spot when interruption breaks the workload; do not buy commitments before measuring the baseline.") },
      { title: "Task 4.3 · Design cost-optimized database solutions", ask: "Choose database type, engine, capacity, caching, retention, backup, and migration approach that meets the requirement at the lowest sustainable cost.", focus: ["RDS, Aurora, DynamoDB, serverless, relational/non-relational, time-series and columnar patterns", "Capacity units, read replicas, connection proxies, caching, and access patterns", "Backup frequency, retention, snapshots, and data lifecycle", "Engine selection, schema/data migration, and Cost Explorer/Budgets/CUR visibility"], services: ["Amazon DynamoDB", "Amazon Aurora Serverless", "Amazon ElastiCache", "AWS Cost Explorer"], visual: V("matrix", "Database cost follows workload shape", "Pay for the capacity model you actually need", ["Provisioned", "On-demand", "Serverless", "Cache", "Retention"], "Compare steady capacity, bursty demand, connection overhead, read duplication, cache hit rate, and retention before selecting the database model.", "Cost optimization is not just a smaller instance; it is the right capacity and lifecycle model.") },
      { title: "Task 4.4 · Design cost-optimized network architectures", ask: "Reduce network transfer, connection, NAT, routing, bandwidth, and edge delivery cost without violating the architecture requirement.", focus: ["NAT gateway choices, shared versus per-AZ gateways, VPC endpoints, routes, peering, and Transit Gateway", "VPN versus Direct Connect versus internet, bandwidth allocation, and private connectivity", "CloudFront, Global Accelerator, DNS, ALB, throttling, and edge caching", "Cost Explorer/Budgets/CUR and reviewing existing workloads for transfer optimization"], services: ["Amazon VPC", "AWS Transit Gateway", "Amazon CloudFront", "AWS PrivateLink"], visual: V("layers", "Network cost is a path problem", "The route determines the bill", ["Workload", "AZ / Region path", "NAT / endpoint", "Internet / private link", "User"], "Place traffic on the shortest appropriate path, avoid unnecessary cross-AZ or cross-Region movement, and use endpoints or edge caching when they reduce repeated transfer.", "NAT gateways, data transfer, and bandwidth are architecture decisions—not afterthoughts in the cost review.") },
    ]
  }
] as const;

export const awsSapDomains = [
  {
    number: "01", title: "Design Solutions for Organizational Complexity", weight: "26%", outcome: "Design governance, connectivity, security, resilience, and cost visibility across a complex AWS organization.", flow: ["Connect", "Control", "Recover", "Govern", "Measure"],
    tasks: [
      { title: "Task 1.1: Architect network connectivity strategies", ask: "Select a connectivity architecture that joins VPCs, on-premises networks, colocation, and AWS services with the required latency, routing, segmentation, and observability.", focus: ["Multi-VPC connectivity, transitive routing, hybrid DNS, subnetting, IP addressing, and traffic monitoring", "Direct Connect, VPN, Transit Gateway, VPC peering, service endpoints, and container networking", "Region and Availability Zone selection based on latency, resilience, and data locality"], services: ["Amazon VPC", "AWS Direct Connect", "AWS Transit Gateway", "Amazon Route 53"], flow: ["Classify the network participants and latency requirement.", "Choose hub, peering, hybrid, or endpoint connectivity.", "Trace routes, DNS, segmentation, and failure domains.", "Verify traffic with flow logs, metrics, and reachability evidence."], visual: V("topology", "Connectivity is a routing graph", "Every boundary needs a deliberate path", ["VPCs", "Transit hub", "Hybrid link", "DNS", "Service endpoint"], "Professional questions test whether the proposed topology supports growth, transitive routing, hybrid name resolution, and controlled service access—not merely whether two networks can connect.", "Transit Gateway simplifies many-to-many connectivity; endpoints keep service traffic private; DNS and route propagation are part of the design.") },
      { title: "Task 1.2: Prescribe security controls", ask: "Prescribe layered identity, network, encryption, detection, auditing, and centralized notification controls for an organization with cross-account and third-party access.", focus: ["Cross-account IAM and Identity Center access, federation, least privilege, resource policies, and permission boundaries", "Route tables, security groups, NACLs, KMS, ACM, CloudTrail, Access Analyzer, Security Hub, and Inspector", "Centralized security events, encryption at rest and in transit, and identity-provider integration"], services: ["AWS IAM", "AWS IAM Identity Center", "AWS KMS", "AWS Security Hub"], flow: ["Define identities, trust boundaries, and data sensitivity.", "Layer preventive, detective, and responsive controls.", "Centralize findings and audit evidence across accounts.", "Test effective permissions, encryption, and notification paths."], visual: V("layers", "Security is an organization-wide control plane", "Prevent, detect, investigate, respond", ["Identity", "Network", "Data", "Detection", "Response"], "SAP scenarios combine controls across accounts and layers. The correct answer normally preserves separation of duties while giving security teams centralized visibility and application teams delegated access.", "SCPs limit the maximum permission boundary; they do not grant permissions. CloudTrail records activity; Security Hub aggregates findings.") },
      { title: "Task 1.3: Design reliable and resilient architectures", ask: "Design disaster recovery and automatic recovery architectures that meet RTO, RPO, scale, backup, restoration, and failure-domain requirements.", focus: ["RTO/RPO, backup and restoration, pilot light, warm standby, multi-site, and Elastic Disaster Recovery", "Scale-up versus scale-out, automated recovery, data replication, and multi-Region design", "Recovery testing, durable backups, failover orchestration, and operational evidence"], services: ["AWS Elastic Disaster Recovery", "AWS Backup", "Amazon Route 53", "Amazon CloudWatch"], flow: ["Translate business loss into RTO and RPO.", "Select the least complex recovery pattern that meets both.", "Automate replication, detection, failover, and restore.", "Exercise the failure and measure recovery evidence."], visual: V("recovery", "Recovery follows the loss boundary", "RTO and RPO drive architecture", ["Failure", "Detect", "Replicate", "Fail over", "Prove"], "The professional-level decision is not simply backup versus replication. It is a trade-off among recovery time, recoverable data, operating complexity, testing effort, and cost.", "Backup and restore is slower and cheaper; warm standby reduces recovery time; multi-site provides faster recovery at higher operating cost.") },
      { title: "Task 1.4: Design a multi-account AWS environment", ask: "Design account structure, governance, resource sharing, central logging, and event notification patterns that fit organizational boundaries and operating models.", focus: ["Organizations, Control Tower, organizational units, account vending, SCPs, and delegated administration", "Central logging, multi-account event notifications, resource sharing, and security-account separation", "Governance models that balance central guardrails with application-team autonomy"], services: ["AWS Organizations", "AWS Control Tower", "AWS Resource Access Manager", "AWS CloudTrail"], flow: ["Separate workloads by security, billing, and operating boundary.", "Apply organization-wide guardrails and delegated administration.", "Share only required resources across accounts.", "Centralize logs, events, and governance evidence."], visual: V("hierarchy", "Accounts are control boundaries", "Organize first, automate second", ["Organization", "OU guardrails", "Workload accounts", "Shared services", "Central logs"], "A mature multi-account design makes ownership, blast radius, billing, security, and deployment boundaries explicit. Shared services should be intentional rather than an accidental central dependency.", "Use SCPs as guardrails, RAM for controlled sharing, and a dedicated log/archive account for evidence.") },
      { title: "Task 1.5: Determine cost optimization and visibility strategies", ask: "Create cost allocation, monitoring, rightsizing, purchasing, and reporting strategies that make spend visible and align it to business ownership.", focus: ["Cost Explorer, Budgets, Trusted Advisor, Pricing Calculator, Compute Optimizer, and S3 Storage Lens", "Tags, accounts, cost categories, chargeback/showback, and Cost and Usage Report analysis", "Reserved Instances, Savings Plans, Spot Instances, rightsizing, and utilization evidence"], services: ["AWS Cost Explorer", "AWS Budgets", "AWS Trusted Advisor", "AWS Compute Optimizer"], flow: ["Make ownership and usage measurable.", "Find waste and underutilized resources.", "Choose rightsizing and purchasing commitments.", "Alert, report, and continuously review the result."], visual: V("cycle", "Cost optimization is a feedback loop", "Measure before committing", ["Tag", "Measure", "Right-size", "Commit", "Review"], "Professional cost questions connect technical architecture to business accountability. The strongest strategy combines allocation, visibility, waste removal, purchase options, and ongoing review.", "Do not commit before establishing a stable baseline; Spot fits interruptible work, not critical stateful workloads.") }
    ]
  },
  {
    number: "02", title: "Design for New Solutions", weight: "29%", outcome: "Design new workloads for deployment, continuity, security, reliability, performance, and cost objectives.", flow: ["Deploy", "Continue", "Secure", "Scale", "Optimize"],
    tasks: [
      { title: "Task 2.1: Design a deployment strategy to meet business requirements", ask: "Choose deployment, IaC, CI/CD, change-management, configuration, upgrade, and rollback patterns that meet business risk and delivery requirements.", focus: ["CloudFormation, CI/CD, blue/green, canary, rolling, all-at-once, and rollback strategies", "Systems Manager configuration and patch management, managed services, and reducing provisioning overhead", "Upgrade paths for new services/features and delegation of complex operations to AWS"], services: ["AWS CloudFormation", "AWS CodePipeline", "AWS CodeDeploy", "AWS Systems Manager"], flow: ["Classify change risk and release constraints.", "Select IaC and deployment strategy.", "Add validation, health checks, approval, and rollback.", "Measure the release and improve the delivery path."], visual: V("pipeline", "Deployment is controlled change", "Release safely, then recover quickly", ["Commit", "Build", "Validate", "Release", "Rollback"], "A professional deployment strategy connects business requirements to blast radius, approval, automation, observability, and rollback. The fastest deployment is not always the safest deployment.", "Blue/green reduces cutover risk; canary limits exposure; CloudFormation and Systems Manager establish repeatability.") },
      { title: "Task 2.2: Design a solution to ensure business continuity", ask: "Design an automated, tested, and cost-effective continuity architecture across Availability Zones or Regions with appropriate replication, monitoring, and recovery.", focus: ["RTO/RPO, global infrastructure, Route 53 routing, backup and restore, pilot light, warm standby, and multi-site", "Database and data replication, automated backups, recovery testing, and centralized monitoring", "Application and infrastructure availability during disruption, including failover validation"], services: ["Amazon Route 53", "AWS Backup", "Amazon Aurora", "AWS Elastic Disaster Recovery"], flow: ["Define the disruption and business continuity target.", "Choose replication and recovery topology.", "Automate detection, failover, and restoration.", "Test the runbook and record recovery evidence."], visual: V("recovery", "Continuity is a tested operating capability", "A diagram is not a recovery plan", ["Primary", "Replica", "Health", "Failover", "Test"], "Continuity is complete only when data, application dependencies, DNS, operations, and people can recover together. Testing exposes hidden coupling and stale assumptions.", "A multi-Region design without tested failover is only theoretical resilience.") },
      { title: "Task 2.3: Determine security controls based on requirements", ask: "Select identity, network, encryption, endpoint, credential, managed security, patch, and attack-mitigation controls for a new workload.", focus: ["Least privilege IAM, security groups, NACLs, service endpoints, credentials, encryption, WAF, Shield, GuardDuty, and Security Hub", "Inbound and outbound flow control, web attack mitigation, patch compliance, and data protection", "Private integrations and control selection based on threat, exposure, and operational requirement"], services: ["AWS WAF", "AWS Shield", "Amazon GuardDuty", "AWS Secrets Manager"], flow: ["Identify asset, threat, and exposure.", "Place preventive controls at each boundary.", "Detect, aggregate, and prioritize findings.", "Automate patching, response, and evidence collection."], visual: V("layers", "Threats map to control layers", "Use the narrowest effective control", ["Threat", "Edge", "Network", "Identity", "Data"], "Security answers should connect the threat to the control: WAF for HTTP attacks, Shield for DDoS, security groups for stateful traffic, endpoints for private access, and secrets services for credentials.", "A security group is not a web application firewall; encryption does not replace authorization.") },
      { title: "Task 2.4: Design a strategy to meet reliability requirements", ask: "Design highly available, loosely coupled, self-healing architectures using replication, scaling, quotas, integration services, and DNS routing.", focus: ["Multi-AZ and multi-Region design, S3/RDS/ElastiCache replication, Auto Scaling, quotas, and limits", "SNS, SQS, Step Functions, Route 53 routing policies, load balancing, and failover", "Design for failure, managed service availability, seamless recovery, and operational maintenance"], services: ["Amazon Route 53", "Amazon SQS", "AWS Auto Scaling", "AWS Step Functions"], flow: ["Identify failure domains and dependency coupling.", "Add buffering, replication, health checks, and scaling.", "Automate failover and stateful recovery.", "Validate quotas, limits, and operational behavior."], visual: V("flow", "Reliability removes dependency chains", "Buffer, replicate, heal", ["Request", "Buffer", "Worker", "Replica", "Health"], "Reliable systems isolate failures and prevent one slow or unavailable dependency from cascading across the workload. Managed services reduce operational burden but still require limits and failure testing.", "Use queues for pressure relief, replicas for data availability, and Route 53 policies for controlled traffic steering.") },
      { title: "Task 2.5: Design a solution to meet performance objectives", ask: "Translate business objectives into measurable performance targets and choose elastic, cached, buffered, replicated, rightsized, and purpose-built services.", focus: ["Performance monitoring, storage options, instance families, purpose-built databases, caching, buffering, and replicas", "Large-scale access patterns, elasticity, rightsizing, and managed service adoption", "KPIs, SLAs, bottleneck analysis, testing remediation, and technology selection methodology"], services: ["Amazon CloudWatch", "Amazon CloudFront", "Amazon ElastiCache", "Amazon DynamoDB"], flow: ["Turn the requirement into KPI and SLA.", "Locate the bottleneck and access pattern.", "Test cache, buffer, replica, or scaling changes.", "Rightsize and verify the measured outcome."], visual: V("feedback", "Performance is measurable behavior", "Observe, change, validate", ["KPI", "Bottleneck", "Pattern", "Test", "Result"], "SAP performance scenarios reward a disciplined method: define the metric, find the limiting resource, select an appropriate pattern, test it, and compare the result to the requirement.", "Do not add a faster instance when the bottleneck is connection count, data transfer, query shape, or an unbounded queue.") },
      { title: "Task 2.6: Determine a cost optimization strategy to meet solution goals and objectives", ask: "Choose service, capacity, pricing, storage, transfer, and expenditure controls that meet solution goals at sustainable cost.", focus: ["Cost Explorer, Trusted Advisor, Pricing Calculator, Savings Plans, Reserved Instances, and storage tiering", "Data transfer modeling, managed services, rightsizing, and service selection", "Usage awareness, budgets, alerts, reporting, and expenditure controls"], services: ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Savings Plans", "AWS Budgets"], flow: ["Model the workload and cost drivers.", "Compare managed, elastic, and committed capacity.", "Reduce transfer, storage, and idle resource cost.", "Add budgets and review actual usage."], visual: V("matrix", "Cost is a design constraint", "Optimize the whole workload", ["Capacity", "Storage", "Transfer", "Commitment", "Control"], "The lowest unit price can lose when it increases transfer, operations, idle capacity, or recovery cost. Compare total cost against the business objective and operating model.", "Cost optimization must preserve the required performance, availability, security, and recovery outcome.") }
    ]
  },
  {
    number: "03", title: "Continuous Improvement for Existing Solutions", weight: "25%", outcome: "Diagnose existing workloads and prioritize operational, security, performance, reliability, and cost improvements.", flow: ["Observe", "Diagnose", "Prioritize", "Remediate", "Prove"],
    tasks: [
      { title: "Task 3.1: Determine a strategy to improve overall operational excellence", ask: "Improve monitoring, logging, deployment, configuration management, automation, remediation, and failure-exercise practices for an existing solution.", focus: ["Alerting, automatic remediation, disaster recovery planning, CloudWatch, CI/CD, deployment strategies, and Systems Manager", "Logging and monitoring strategy, deployment improvement, automation priority, and configuration management", "Failure scenario exercises and recovery-action validation"], services: ["Amazon CloudWatch", "AWS Systems Manager", "AWS CodeDeploy", "AWS Fault Injection Service"], flow: ["Observe signals, logs, and operational toil.", "Prioritize the highest-risk manual or blind spot.", "Automate configuration, deployment, and remediation.", "Exercise failure and prove the runbook."], visual: V("cycle", "Operational excellence closes the loop", "Detect, automate, learn", ["Observe", "Alert", "Act", "Recover", "Improve"], "Improvement is not adding dashboards. It is turning signals into reliable action, reducing manual work, testing recovery, and learning from operational outcomes.", "A useful alert has an owner and an action; a runbook is incomplete until it is exercised.") },
      { title: "Task 3.2: Determine a strategy to improve security", ask: "Improve an existing environment through least privilege, traceability, secrets, patching, backups, automated detection, remediation, and layered review.", focus: ["Data sensitivity, retention, regulation, Config rules, secrets management, least privilege, patching, and backups", "Security at every layer, user/service traceability, vulnerability prioritization, and automated response", "Remediation techniques and evidence that controls remain effective over time"], services: ["AWS Config", "AWS Security Hub", "Amazon Inspector", "AWS Secrets Manager"], flow: ["Discover drift, exposure, and control gaps.", "Prioritize by risk, sensitivity, and exploitability.", "Automate patching, secrets, detection, and remediation.", "Audit the result and preserve traceability."], visual: V("layers", "Security improvement is continuous control", "Find drift before attackers do", ["Inventory", "Assess", "Protect", "Remediate", "Audit"], "Existing environments decay through drift, stale permissions, unpatched software, unmanaged secrets, and incomplete evidence. Improvement strategies make those conditions visible and actionable.", "Config detects configuration drift; Inspector identifies vulnerabilities; Security Hub prioritizes findings.") },
      { title: "Task 3.3: Determine a strategy to improve performance", ask: "Identify bottlenecks and use measurable KPIs, rightsizing, global services, managed services, and tested remediation to improve an existing workload.", focus: ["Auto Scaling, instance fleets, placement groups, Global Accelerator, CloudFront, edge computing, and CloudWatch", "SLAs, KPIs, business-to-metric translation, remediation testing, and managed service adoption", "Rightsizing, bottleneck analysis, and performance trend evaluation"], services: ["Amazon CloudWatch", "AWS Global Accelerator", "Amazon CloudFront", "AWS Compute Optimizer"], flow: ["Translate user experience into measurable KPI.", "Correlate traces, metrics, and resource saturation.", "Test a targeted remediation or managed-service change.", "Rightsize and confirm the improvement against the SLA."], visual: V("feedback", "Performance improvement needs evidence", "A faster component is not always a faster system", ["SLA", "Metric", "Bottleneck", "Change", "Proof"], "A professional architect distinguishes symptoms from constraints. Measure the full request path, test the smallest useful change, and prove the result under representative load.", "CloudFront and Global Accelerator solve different edge problems; Compute Optimizer supports rightsizing, not architecture judgment.") },
      { title: "Task 3.4: Determine a strategy to improve reliability", ask: "Improve an existing architecture by removing single points of failure, enabling replication, self-healing, elastic scaling, and disaster recovery.", focus: ["Global infrastructure, replication, load balancing, Auto Scaling, high availability, resiliency, quotas, and disaster recovery", "Application growth and usage trends, reliability gap analysis, and failure-domain review", "Self-healing, elastic features, data replication, and remediation of single points of failure"], services: ["Elastic Load Balancing", "Amazon EC2 Auto Scaling", "Amazon RDS", "AWS Elastic Disaster Recovery"], flow: ["Map dependencies and failure domains.", "Find the single point and quantify its impact.", "Add redundancy, health checks, replication, or elasticity.", "Run failure tests and verify recovery behavior."], visual: V("topology", "Reliability is a dependency graph", "Remove the one point that can stop everything", ["Dependency", "Failure", "Replica", "Health", "Recovery"], "Reliability improvement starts with the current architecture, not a preferred service. Trace the dependency graph, identify concentration risk, and remediate the failure mode that matters most.", "Multi-AZ improves availability; multi-Region improves regional recovery; neither removes every application-level dependency.") },
      { title: "Task 3.5: Identify opportunities for cost optimizations", ask: "Use usage reports, rightsizing, pricing models, transfer analysis, alarms, CUR detail, and tagging to reduce waste in an existing solution.", focus: ["Spot, scaling policies, rightsizing, Reserved Instances, Savings Plans, networking and data transfer costs", "Cost management, alerting, reporting, unused-resource discovery, and granular CUR analysis", "Tagging for allocation, billing alarms, and underutilized/overutilized resource analysis"], services: ["AWS Cost and Usage Reports", "AWS Cost Explorer", "AWS Budgets", "AWS Compute Optimizer"], flow: ["Collect usage, ownership, and transfer evidence.", "Separate waste from intentional capacity.", "Apply rightsizing, schedule, tier, or purchase changes.", "Alert and report so savings persist."], visual: V("cycle", "Cost improvement is an operating practice", "Find waste without breaking the workload", ["Usage", "Owner", "Waste", "Change", "Savings"], "Existing workloads contain both waste and purposeful headroom. Cost improvement requires context, tags, workload criticality, and a measured change—not indiscriminate downsizing.", "CUR provides granular evidence; Cost Explorer shows trends; Budgets creates control; Compute Optimizer suggests rightsizing.") }
    ]
  },
  {
    number: "04", title: "Accelerate Workload Migration and Modernization", weight: "20%", outcome: "Assess, migrate, rearchitect, and modernize existing workloads using the right migration path and AWS services.", flow: ["Assess", "Choose 7R", "Migrate", "Rearchitect", "Modernize"],
    tasks: [
      { title: "Task 4.1: Select existing workloads and processes for potential migration", ask: "Assess applications and portfolios, prioritize migration waves, evaluate the seven migration strategies, and compare total cost of ownership.", focus: ["Migration Hub, Application Discovery, portfolio assessment, asset planning, wave planning, and TCO", "Application dependencies, business value, readiness, risk, and migration sequencing", "Rehost, replatform, refactor, repurchase, retain, retire, and relocate decisions"], services: ["AWS Migration Hub", "AWS Application Discovery Service", "AWS Migration Evaluator", "AWS Pricing Calculator"], flow: ["Discover assets and dependencies.", "Score business value, risk, and readiness.", "Select a 7R strategy and migration wave.", "Validate TCO and migration outcomes."], visual: V("matrix", "Migration starts with portfolio evidence", "Do not choose the 7R before understanding the workload", ["Discover", "Assess", "Prioritize", "7R", "Wave"], "Portfolio migration is a sequencing problem. A workload's business criticality, dependencies, technical debt, cost, and modernization value determine when and how it should move.", "Rehost is not automatically the best first move; retain and retire are valid decisions when evidence supports them.") },
      { title: "Task 4.2: Determine the optimal migration approach for existing workloads", ask: "Select data, application, database, network, identity, and governance migration mechanisms that fit security, downtime, dependency, and operating requirements.", focus: ["DataSync, Transfer Family, Snow Family, S3 Transfer Acceleration, Application Discovery, and Application Migration Service", "DMS, SCT, Direct Connect, VPN, Route 53, Identity Center, Directory Service, Control Tower, and Organizations", "Database, application, and data transfer strategy with secure tooling and appropriate governance"], services: ["AWS Database Migration Service", "AWS DataSync", "AWS Application Migration Service", "AWS Control Tower"], flow: ["Classify the migration object and downtime tolerance.", "Choose the transfer mechanism and security path.", "Sequence dependencies and validate cutover.", "Govern, monitor, and roll back when required."], visual: V("pipeline", "Migration is a coordinated transfer", "Move dependencies in the right order", ["Source", "Transfer", "Transform", "Validate", "Cutover"], "The optimal migration approach depends on data volume, change rate, downtime, compatibility, security, dependency order, and rollback. A tool choice without a cutover strategy is incomplete.", "DMS handles database replication; SCT handles schema conversion; DataSync moves file/object data; MGN moves servers.") },
      { title: "Task 4.3: Determine a new architecture for existing workloads", ask: "Select the appropriate compute, container, storage, and database platforms when redesigning an existing workload for AWS.", focus: ["EC2, Elastic Beanstalk, ECS, EKS, Fargate, ECR, EBS, EFS, FSx, S3, and Storage Gateway", "DynamoDB, OpenSearch, RDS, self-managed databases on EC2, and purpose-built platform choices", "Compute, container hosting, storage, and database selection based on workload constraints"], services: ["Amazon EC2", "Amazon ECS", "AWS Fargate", "Amazon RDS"], flow: ["Extract workload constraints from the current system.", "Choose the target compute and hosting model.", "Map storage semantics and database behavior.", "Prove compatibility, operations, and migration effort."], visual: V("matrix", "Rearchitecture preserves behavior intentionally", "Change the platform without losing the requirement", ["Compute", "Containers", "Storage", "Database", "Operations"], "A new architecture is successful when it preserves required behavior while improving operations, scale, cost, resilience, or delivery. Platform novelty alone is not modernization value.", "ECS, EKS, and Fargate solve different control and operating-model needs; database selection follows access pattern and compatibility.") },
      { title: "Task 4.4: Determine opportunities for modernization and enhancements", ask: "Identify where decoupling, serverless, containers, purpose-built databases, and integration services can improve an existing workload.", focus: ["Lambda, ECS, EKS, Fargate, S3, EFS, DynamoDB, Aurora Serverless, ElastiCache, and integration services", "Decoupling with SQS, SNS, EventBridge, and Step Functions", "Serverless opportunities, container selection, purpose-built data stores, and application integration"], services: ["AWS Lambda", "Amazon EventBridge", "Amazon SQS", "Amazon Aurora Serverless"], flow: ["Find coupling, manual operations, and scaling friction.", "Select the smallest modernization seam.", "Introduce managed, serverless, or purpose-built capability.", "Measure value and expand modernization safely."], visual: V("flow", "Modernization removes unnecessary ownership", "Delegate undifferentiated work", ["Legacy", "Seam", "Managed service", "Event", "Outcome"], "Modernization is a sequence of valuable changes: decouple a dependency, delegate operations, choose a purpose-built service, and preserve a controlled path to expand.", "Use events for intent and fan-out, queues for work distribution, Lambda for event-driven execution, and Step Functions for stateful orchestration.") }
    ]
  }
] as const;

export const awsAdvancedNetworkingDomains = [
  {
    number: "01", title: "Network Design", weight: "30%",
    outcome: "Design global, DNS, load-balancing, observability, hybrid, multi-account, multi-Region, and multi-VPC architectures.",
    flow: ["Discover", "Choose pattern", "Route", "Secure", "Prove"],
    tasks: [
      { title: "Task 1.1: Design a solution that incorporates edge network services to optimize user performance and traffic management for global architectures", ask: "Select and integrate edge services for global inbound and outbound traffic, performance, availability, and traffic management.", focus: ["CloudFront and Global Accelerator design patterns, origin integration, caching, Anycast, health checks, and failover", "ELB and API Gateway integration for global application traffic"], services: ["Amazon CloudFront", "AWS Global Accelerator", "Elastic Load Balancing", "Amazon API Gateway"], flow: ["Classify global inbound and outbound traffic.", "Choose CDN, Anycast, or both.", "Integrate origins, health checks, and failover.", "Validate latency, availability, and traffic behavior."], visual: V("layers", "Edge design puts traffic near the user", "Optimize performance before traffic reaches the origin", ["User", "Edge", "Accelerator", "Origin", "Failover"], "CloudFront serves cacheable content at the edge while Global Accelerator improves global availability and performance for dynamic TCP or UDP traffic.", "Use the service that matches protocol, caching, origin behavior, and failure requirements."), walkthrough: true },
      { title: "Task 1.2: Design DNS solutions that meet public, private, and hybrid requirements", ask: "Design public, private, and hybrid DNS using Route 53 zones, records, Resolver, health checks, traffic policies, and DNS security.", focus: ["DNS records, TTL, DNSSEC, delegation, public and private hosted zones, aliases, health checks, and traffic policies", "Resolver inbound and outbound endpoints for hybrid, multi-account, and multi-Region architectures"], services: ["Amazon Route 53", "Amazon VPC", "AWS CloudFront", "AWS Direct Connect"], flow: ["Identify namespace and resolution boundaries.", "Choose public, private, or hybrid zones.", "Configure records, routing, and health checks.", "Log, secure, and validate resolution."], visual: V("flow", "DNS is a control plane for reachability", "Resolve the right name in the right network", ["Client", "Resolver", "Zone", "Policy", "Endpoint"], "Route 53 design depends on who resolves the name, where the zone is hosted, and which routing or health signal should influence the answer.", "Private hosted zones and Resolver endpoints solve different sides of hybrid name resolution."), walkthrough: true },
      { title: "Task 1.3: Design solutions that integrate load balancing to meet high availability, scalability, and security requirements", ask: "Choose the appropriate load balancer and integrate it with routing, scaling, TLS, security, and application platforms.", focus: ["Layer 3, 4, and 7 behavior; ALB, NLB, GWLB, target groups, proxy protocol, cross-zone balancing, stickiness, and routing algorithms", "Integration with Global Accelerator, CloudFront, WAF, Route 53, EKS, ACM, and Auto Scaling"], services: ["Elastic Load Balancing", "AWS Global Accelerator", "AWS WAF", "AWS Certificate Manager"], flow: ["Classify protocol and application behavior.", "Choose the load-balancing layer.", "Integrate TLS, security, targets, and scaling.", "Test failover, health, and traffic distribution."], visual: V("decision", "Load balancing is a protocol decision", "Match the balancer to the traffic and target", ["Protocol", "Balancer", "TLS", "Target", "Scale"], "ALB, NLB, and GWLB solve different routing and insertion problems; the correct design also considers TLS termination, target type, health, and scaling.", "Choose by OSI layer, protocol, target behavior, security integration, and availability requirement."), walkthrough: true },
      { title: "Task 1.4: Define logging and monitoring requirements across AWS and hybrid networks", ask: "Define the logs, metrics, baselines, and analysis tools needed to prove network health and troubleshoot hybrid connectivity.", focus: ["CloudWatch metrics, logs, alarms, dashboards, agents, and Insights; Transit Gateway Network Manager; Reachability Analyzer", "VPC Flow Logs, traffic mirroring, ELB access logs, CloudFront access logs, and baseline performance"], services: ["Amazon CloudWatch", "AWS Transit Gateway", "Amazon VPC", "Amazon CloudFront"], flow: ["Define visibility and baseline requirements.", "Collect flow, access, route, and performance evidence.", "Correlate metrics with topology and paths.", "Alert on meaningful deviation and validate recovery."], visual: V("pipeline", "Observability turns paths into evidence", "Baseline first, troubleshoot with correlated signals", ["Metric", "Flow log", "Topology", "Alert", "Evidence"], "A network monitoring design combines quantitative metrics with flow and access logs, topology awareness, and reachability analysis.", "Use the signal that matches the question: performance, route, packet, access, or topology."), walkthrough: true },
      { title: "Task 1.5: Design a routing strategy and connectivity architecture between on-premises networks and the AWS Cloud", ask: "Design redundant hybrid connectivity using Direct Connect, VPN, BGP, physical interconnects, overlays, and SD-WAN patterns.", focus: ["BGP, static and dynamic routing, VLAN, LAG, optics, jumbo frames, GRE, IPsec, overlays, resource sharing, and SD-WAN", "Redundant Direct Connect and Site-to-Site VPN with BGP attributes for active-active or active-passive traffic"], services: ["AWS Direct Connect", "AWS Site-to-Site VPN", "AWS Transit Gateway", "Amazon VPC"], flow: ["Define bandwidth, latency, encryption, and failure needs.", "Choose physical and encrypted paths.", "Design BGP preference and route propagation.", "Test failover, return paths, and traffic symmetry."], visual: V("topology", "Hybrid routing is a failure-aware design", "Redundancy is incomplete without route behavior", ["On-prem", "DX", "VPN", "Transit", "VPC"], "Direct Connect supplies predictable private connectivity while VPN provides encrypted or backup paths; BGP attributes determine how traffic moves during normal and failed states.", "Design the preferred path, backup path, advertisements, and failure test together."), walkthrough: true },
      { title: "Task 1.6: Design a routing strategy and connectivity architecture that include multiple AWS accounts, AWS Regions, and VPCs to support different connectivity patterns", ask: "Select connectivity patterns across accounts, Regions, and VPCs while accounting for sharing, routing domains, and overlapping IP ranges.", focus: ["VPC peering, Transit Gateway, PrivateLink, VPC sharing, AWS RAM, multi-Region patterns, and IP overlap options", "NAT, PrivateLink, and Transit Gateway routing for isolated, shared, hub-and-spoke, and service-provider designs"], services: ["AWS Transit Gateway", "AWS PrivateLink", "AWS Resource Access Manager (RAM)", "Amazon VPC"], flow: ["Map accounts, Regions, VPCs, and CIDRs.", "Choose mesh, hub, shared, or service-provider pattern.", "Handle overlap and route-domain boundaries.", "Prove isolation, reachability, and ownership."], visual: V("topology", "Multi-account design is a routing-domain decision", "Connect only the boundaries the architecture needs", ["Account", "Region", "VPC", "Route", "Service"], "Transit Gateway centralizes routing, PrivateLink publishes a service without broad network access, and VPC sharing changes subnet ownership and account boundaries.", "Choose by scale, transitivity, ownership, isolation, and CIDR-overlap constraints."), walkthrough: true }
    ]
  },
  {
    number: "02", title: "Network Implementation", weight: "26%",
    outcome: "Implement hybrid, multi-account, multi-Region, multi-VPC, DNS, and automated network infrastructure patterns.",
    flow: ["Configure", "Propagate", "Share", "Test", "Automate"],
    tasks: [
      { title: "Task 2.1: Implement routing and connectivity between on-premises networks and the AWS Cloud", ask: "Configure physical connectivity, routing, DNS, security appliances, load balancing, monitoring, and connectivity tests for hybrid networks.", focus: ["Direct Connect LOA, colocation, VLANs, VIFs, gateways, VPN, static or dynamic routes, BGP, Transit Gateway Connect, and SD-WAN", "Conditional forwarding, security appliances, load balancing, monitoring, logging, and Reachability Analyzer validation"], services: ["AWS Direct Connect", "AWS Site-to-Site VPN", "AWS Transit Gateway", "Amazon Route 53"], flow: ["Provision the physical and logical connection.", "Configure addressing, routing, and propagation.", "Add DNS, security, and load-balancing controls.", "Test the complete path and failure modes."], visual: V("pipeline", "Hybrid implementation connects layers", "Physical, routing, security, and evidence must agree", ["Circuit", "VLAN", "BGP", "Policy", "Test"], "A working hybrid implementation is more than an attachment: it includes the physical handoff, addressing, routing, DNS, security, monitoring, and validation.", "Test both directions and verify the route actually used, not only the route advertised."), walkthrough: true },
      { title: "Task 2.2: Implement routing and connectivity across multiple AWS accounts, Regions, and VPCs to support different connectivity patterns", ask: "Implement single-VPC, multi-VPC, hub-and-spoke, vendor, SD-WAN, PrivateLink, DNS, security, and monitoring patterns.", focus: ["Organizations, RAM, Transit Gateway sharing, VPC peering, PrivateLink, VPN, DHCP, route tables, security groups, NACLs, and Network Firewall", "DNS, authentication, authorization, logging, Route Analyzer, Reachability Analyzer, and third-party connectivity"], services: ["AWS Transit Gateway", "AWS PrivateLink", "AWS Resource Access Manager (RAM)", "Amazon VPC"], flow: ["Create the connectivity hub or service boundary.", "Share only the required resources.", "Configure routes, DNS, and security boundaries.", "Validate reachability, logs, and ownership."], visual: V("topology", "Implementation makes ownership explicit", "Every attachment, route, and policy has an owner", ["Hub", "Spoke", "Route", "Policy", "Evidence"], "Multi-account implementation succeeds when resource sharing, route tables, DNS, security boundaries, and monitoring are configured as one design.", "Do not confuse network reachability with application authorization."), walkthrough: true },
      { title: "Task 2.3: Implement complex hybrid and multi-account DNS architectures", ask: "Configure hosted zones, records, forwarding, traffic management, DNSSEC, centralized DNS, and logging across accounts and hybrid environments.", focus: ["Public and private zones, alias and standard records, delegation, conditional forwarding, weighted, latency, and geolocation routing", "Resolver endpoints, RAM sharing, centralized or distributed DNS, DNSSEC, monitoring, and query logging"], services: ["Amazon Route 53", "Amazon VPC", "AWS Resource Access Manager (RAM)", "AWS Direct Connect"], flow: ["Create zones and delegation boundaries.", "Deploy Resolver endpoints and forwarding rules.", "Configure records, routing, and DNSSEC.", "Log queries and test from every network boundary."], visual: V("flow", "Hybrid DNS is a bidirectional path", "Inbound and outbound resolution need different endpoints", ["On-prem", "Inbound", "Route 53", "Outbound", "AWS"], "Resolver inbound endpoints receive queries from on-premises; outbound endpoints forward AWS queries to external DNS. Centralization and sharing must preserve ownership and visibility.", "Validate from the client network where the query originates."), walkthrough: true },
      { title: "Task 2.4: Automate and configure network infrastructure", ask: "Build repeatable, event-driven, parameterized, and cost-aware network configurations using AWS-native infrastructure automation.", focus: ["CloudFormation, CDK, CLI, SDKs, APIs, event-driven networking, parameterized templates, and hardcoded-instruction risks", "Repeatability, drift avoidance, hybrid automation, validation, remediation, and network resource optimization"], services: ["AWS CloudFormation", "AWS CLI", "AWS Lambda", "AWS Config"], flow: ["Define network intent and parameters.", "Validate templates and policy requirements.", "Deploy repeatable resources and routes.", "Detect drift, respond to events, and optimize cost."], visual: V("cycle", "Automation turns network intent into control", "Repeatable configuration reduces unsafe variation", ["Intent", "Template", "Deploy", "Verify", "Remediate"], "Network automation should encode intent, eliminate hardcoded assumptions, validate reachability, respond to changes, and keep resource use cost-aware.", "IaC is not complete until the deployed network is tested and drift is handled."), walkthrough: true }
    ]
  },
  {
    number: "03", title: "Network Management and Operation", weight: "20%",
    outcome: "Maintain connectivity, troubleshoot network behavior, and optimize performance, reliability, and cost.",
    flow: ["Maintain", "Observe", "Troubleshoot", "Optimize", "Prove"],
    tasks: [
      { title: "Task 3.1: Maintain routing and connectivity on AWS and hybrid networks", ask: "Maintain routes, protocols, limits, quotas, private access, and inter-Region or intra-Region connectivity.", focus: ["BGP over Direct Connect, Direct Connect gateways, VIFs, Transit Gateway, route propagation, route limits, bandwidth quotas, PrivateLink, and VPC peering", "Static and dynamic route optimization, summarization, CIDR overlap, public and private access, and maintenance procedures"], services: ["AWS Direct Connect", "AWS Transit Gateway", "AWS PrivateLink", "Amazon VPC"], flow: ["Observe route and quota health.", "Maintain attachments, advertisements, and propagation.", "Protect private access and failover paths.", "Verify reachability after every change."], visual: V("topology", "Operations preserve the intended path", "Routes, limits, and private access change over time", ["Route", "Quota", "Path", "Change", "Verify"], "Network operation requires awareness of routing protocols, service limits, private access methods, and the effect of changes on hybrid and multi-Region paths.", "A route can be valid yet unusable because of quota, overlap, propagation, or return-path failure."), walkthrough: true },
      { title: "Task 3.2: Monitor and analyze network traffic to troubleshoot and optimize connectivity patterns", ask: "Use logs, metrics, topology, traffic analysis, reachability analysis, and packet evidence to troubleshoot connectivity and verify intent.", focus: ["CloudWatch, VPC Flow Logs, traffic mirroring, Reachability Analyzer, Transit Gateway Network Manager, packet loss, routing, and packet-size mismatches", "Automated verification of connectivity intent as network configuration changes"], services: ["Amazon CloudWatch", "Amazon VPC", "AWS Transit Gateway", "AWS Network Access Analyzer"], flow: ["Reproduce the connectivity symptom.", "Correlate metrics, flow logs, routes, and topology.", "Inspect packets or reachability when needed.", "Fix the boundary and verify the intended path."], visual: V("decision", "Troubleshooting starts with evidence", "Follow the packet, route, and policy", ["Symptom", "Metric", "Flow", "Route", "Fix"], "Use the least invasive evidence first, then escalate from metrics and flow logs to reachability or traffic mirroring when the problem requires deeper visibility.", "Packet size, asymmetric routes, missing propagation, and policy boundaries commonly explain intermittent failures."), walkthrough: true },
      { title: "Task 3.3: Optimize AWS networks for performance, reliability, and cost-effectiveness", ask: "Select connectivity, interfaces, subnets, DNS, load balancing, frame sizes, and traffic distribution patterns that meet performance and cost goals.", focus: ["VPC peering versus Transit Gateway, CloudFront, multicast, data-transfer cost, ENI, ENA, EFA, subnet IP capacity, jumbo frames, and Route 53 health-based routing", "Global Accelerator, load distribution, high availability, and right-sized network paths"], services: ["AWS Global Accelerator", "Amazon Route 53", "Amazon VPC", "AWS Transit Gateway"], flow: ["Measure throughput, latency, availability, and cost.", "Choose the simplest suitable network path.", "Optimize interfaces, subnets, frames, and traffic distribution.", "Validate performance and total cost."], visual: V("matrix", "Optimization balances four outcomes", "Fast, reliable, scalable, and cost-aware", ["Throughput", "Latency", "Reliability", "Cost", "Choice"], "Network optimization is a trade-off among performance, availability, IP capacity, data transfer, and operational complexity.", "Choose the least complex service that satisfies the measured requirement."), walkthrough: true }
    ]
  },
  {
    number: "04", title: "Network Security, Compliance, and Governance", weight: "24%",
    outcome: "Secure network boundaries, validate security evidence, and preserve confidentiality for data and communications.",
    flow: ["Threat model", "Control", "Monitor", "Encrypt", "Audit"],
    tasks: [
      { title: "Task 4.1: Implement and maintain network features to meet security and compliance needs and requirements", ask: "Secure inbound, outbound, and inter-VPC traffic with layered controls and a threat-model-driven architecture.", focus: ["WAF, Shield, Network Firewall, proxies, Gateway Load Balancer, security groups, NACLs, endpoint policies, perimeter VPCs, and three-tier designs", "Threat modeling, compliance testing, resiliency validation, and automated incident reporting"], services: ["AWS WAF", "AWS Shield", "AWS Network Firewall", "Amazon VPC"], flow: ["Model threats and trust boundaries.", "Place controls at edge, egress, and east-west boundaries.", "Test allowed and denied paths.", "Automate alerts and compliance evidence."], visual: V("layers", "Network security is layered placement", "Control traffic at the boundary where risk appears", ["Ingress", "Perimeter", "Egress", "East-west", "Evidence"], "No single network control solves every threat. Secure architectures combine edge protection, inspection, segmentation, identity, route boundaries, and evidence.", "Match the control to direction, protocol, trust boundary, and failure mode."), walkthrough: true },
      { title: "Task 4.2: Validate and audit security by using network monitoring and logging services", ask: "Create, analyze, correlate, deliver, alert on, and audit network security logs across accounts and services.", focus: ["VPC Flow Logs, traffic mirroring, CloudWatch alarms and custom metrics, CloudTrail, Transit Gateway Network Manager, ELB and CloudFront logs", "Kinesis and Route 53 delivery, Firewall Manager, security groups, NACL audits, and cross-account correlation"], services: ["Amazon CloudWatch", "AWS CloudTrail", "Amazon VPC", "AWS Firewall Manager"], flow: ["Define audit questions and evidence sources.", "Deliver and protect logs centrally.", "Correlate findings across services and accounts.", "Alert, remediate, and preserve audit evidence."], visual: V("pipeline", "Audit turns telemetry into proof", "Evidence must be complete, correlated, and reviewable", ["Source", "Deliver", "Correlate", "Alert", "Audit"], "Network audit requires more than collecting logs: delivery, retention, correlation, alarms, configuration review, and evidence ownership must be explicit.", "Validate both the security configuration and the log path that proves it."), walkthrough: true },
      { title: "Task 4.3: Implement and maintain confidentiality of data and communications of the network", ask: "Implement encryption for network paths, VPN over Direct Connect, TLS, certificates, and secure DNS communications.", focus: ["IPsec, TLS, VPN over Direct Connect, CloudFront, ALB, NLB, Transit Gateway, ACM, Private CA, DNSSEC, and shared-responsibility boundaries", "Encryption in transit, certificate lifecycle, private connectivity, and secure DNS implementation"], services: ["AWS Certificate Manager", "AWS Private Certificate Authority", "AWS Site-to-Site VPN", "Amazon Route 53"], flow: ["Map data paths and confidentiality requirements.", "Choose TLS, IPsec, or layered encryption.", "Issue and rotate certificates or keys.", "Validate secure DNS and encrypted communications."], visual: V("layers", "Confidentiality follows every communication path", "Protect the link, endpoint, and name resolution", ["Client", "TLS", "VPN", "Certificate", "DNSSEC"], "Network confidentiality combines protocol encryption, private transport, certificate management, VPN design, and DNS security.", "Encryption at one hop does not prove confidentiality across the whole path."), walkthrough: true }
    ]
  }
] as const;

export const awsSecurityDomains = [
{number:"01",title:"Detection",weight:"16%",outcome:"Make security signals visible, actionable, correlated, and continuously assessed across an AWS organization.",flow:["Observe","Collect","Correlate","Alert","Remediate"],tasks:[
{title:"Task 1.1: Design and implement monitoring and alerting solutions for an AWS account or organization",ask:"Analyze workloads, aggregate events, create metrics and alerts, and automate assessments that detect anomalous data and security events.",focus:["GuardDuty, Security Hub, Security Lake, Macie, CloudWatch, Config conformance packs, and Systems Manager State Manager","Organization-wide event aggregation, dashboards, health checks, and investigation automation"],services:["Amazon GuardDuty","AWS Security Hub","Amazon Security Lake","Amazon Macie"],flow:["Classify workload signals and threat requirements.","Aggregate findings across accounts and Regions.","Create metrics, dashboards, and alert thresholds.","Automate assessment and response actions."],visual:V("flow","Detection turns signals into action","Observe the control plane before impact grows",["Workload","Signal","Finding","Alert","Action"],"Effective monitoring starts with the signal required to detect the threat, then connects aggregation, prioritization, notification, and automation.","Security Hub centralizes findings; GuardDuty detects threats; Macie discovers sensitive data; Security Lake preserves normalized security data.")},
{title:"Task 1.2: Design and implement logging solutions",ask:"Choose log sources, storage, analysis, normalization, correlation, and network-flow logging that match the threat and investigation requirement.",focus:["CloudTrail organization trails, CloudWatch Logs, Security Lake, Athena, OpenSearch, Managed Grafana, Lambda, VPC Flow Logs, Transit Gateway flow logs, and Route 53 Resolver logs","Dedicated logging accounts, retention, third-party integration, OCSF normalization, and query access"],services:["AWS CloudTrail","Amazon CloudWatch","Amazon Security Lake","Amazon Athena"],flow:["Identify the evidence and source systems.","Centralize logs into durable, governed storage.","Normalize, parse, and correlate records.","Query evidence and preserve retention."],visual:V("pipeline","Logging is an evidence pipeline","Collect once, analyze many ways",["Source","Ingest","Normalize","Query","Evidence"],"A useful logging design identifies the source, protects the evidence, makes it queryable, and preserves the context needed to correlate activity across services.","CloudTrail records API activity; VPC Flow Logs show network metadata; Security Lake normalizes security data; Athena queries the lake.")},
{title:"Task 1.3: Troubleshoot security monitoring, logging, and alerting solutions",ask:"Analyze permissions and configuration, then remediate missing logs, broken integrations, health checks, and resource-level monitoring failures.",focus:["Lambda, API Gateway, CloudFront, CloudWatch Agent, health checks, log destinations, IAM permissions, and delivery configuration","Missing events, incorrect filters, disabled trails, unavailable log groups, and notification paths"],services:["Amazon CloudWatch","AWS CloudTrail","AWS Lambda","Amazon API Gateway"],flow:["Reproduce the missing signal or alert.","Trace permissions, filters, destinations, and delivery.","Correct the configuration at the failing boundary.","Generate a test event and verify evidence."],visual:V("decision","Troubleshooting follows the signal","Find the first broken boundary",["Event","Permission","Filter","Destination","Alert"],"Monitoring failures are usually boundary failures. Trace whether the event exists, is permitted, matches the filter, reaches its destination, and triggers the expected action.","A healthy resource does not prove a healthy logging path; test the end-to-end event and delivery chain.")}]},
{number:"02",title:"Incident Response",weight:"14%",outcome:"Prepare, test, contain, investigate, eradicate, and recover from security events with evidence and repeatable automation.",flow:["Prepare","Detect","Contain","Eradicate","Recover"],tasks:[
{title:"Task 2.1: Design and test an incident response plan",ask:"Create response plans and runbooks, prepare access and tools, test effectiveness, and automate remediation for security incidents.",focus:["Systems Manager OpsCenter, Fault Injection Service, Resilience Hub, Shield Advanced, Step Functions, Lambda, and Automated Forensics Orchestrator","Break-glass access, blast-radius reduction, response roles, validation exercises, and recovery automation"],services:["AWS Systems Manager","AWS Fault Injection Service","AWS Resilience Hub","AWS Shield Advanced"],flow:["Define incident roles, scope, and authority.","Provision tools, access, and containment controls.","Exercise the runbook against realistic failure modes.","Automate validated remediation and record lessons."],visual:V("cycle","Incident readiness is tested capability","A runbook is only useful when it works under pressure",["Plan","Prepare","Exercise","Automate","Improve"],"A response plan connects people, permissions, tools, containment, evidence, and recovery. Testing exposes missing access, unsafe assumptions, and steps that cannot be automated.","Fault Injection Service tests resilience; OpsCenter coordinates operational work; Shield Advanced prepares DDoS response; automation must be bounded and tested.")},
{title:"Task 2.2: Respond to security events",ask:"Capture forensic artifacts, correlate logs, validate findings, contain and eradicate threats, recover resources, and conduct root-cause analysis.",focus:["Forensic log and snapshot preservation, Security Hub and GuardDuty finding validation, network containment, backup restoration, and Detective investigation","Evidence integrity, affected-resource scope, containment order, eradication, recovery, and root cause"],services:["Amazon Detective","Amazon GuardDuty","AWS Security Hub","AWS Backup"],flow:["Preserve evidence before changing the scene.","Validate findings and determine scope and impact.","Contain, eradicate, and recover affected resources.","Correlate evidence and document root cause."],visual:V("timeline","Response preserves evidence and control","Contain safely, then recover deliberately",["Finding","Evidence","Scope","Contain","Recover"],"Incident response balances speed with evidence. Validate the signal, preserve artifacts, limit blast radius, remove the cause, and restore from a trusted state.","Detective supports root-cause analysis; GuardDuty and Security Hub provide findings; recovery must not destroy the evidence needed to explain the event.")}]},
{number:"03",title:"Infrastructure Security",weight:"18%",outcome:"Protect network edges, compute workloads, and network paths with layered controls that match the threat model.",flow:["Edge","Compute","Network","Segment","Verify"],tasks:[
{title:"Task 3.1: Design, implement, and troubleshoot security controls for network edge services",ask:"Select edge strategies and implement protection, rules, integrations, and threat controls for internet-facing services.",focus:["CloudFront, WAF, Shield Advanced, API Gateway, IoT policies, CORS, OWASP Top 10, geography, rate limiting, client fingerprinting, OCSF, and third-party WAF rules","Rule order, managed rules, logging, false-positive handling, and edge-to-origin protection"],services:["Amazon CloudFront","AWS WAF","AWS Shield Advanced","Amazon API Gateway"],flow:["Classify the edge threat and exposure.","Choose the control at the correct protocol layer.","Configure rules, limits, and integrations.","Test allowed, blocked, and origin traffic."],visual:V("layers","The edge is a policy boundary","Block the right traffic before origin impact",["Client","Edge","WAF","Shield","Origin"],"Edge controls work when the rule matches the threat, the control is placed at the right boundary, and the origin remains protected when traffic is allowed.","WAF filters web requests; Shield addresses DDoS; CloudFront is the edge distribution; API Gateway adds API-specific controls.")},
{title:"Task 3.2: Design, implement, and troubleshoot security controls for compute workloads",ask:"Harden images, authorize workloads, scan vulnerabilities, patch resources, secure administration, and protect generative AI applications.",focus:["EC2 Image Builder, Systems Manager, instance profiles, service and execution roles, Inspector, GuardDuty runtime monitoring, Patch Manager, Session Manager, EC2 Instance Connect, CodeGuru Security, Q Developer, and GenAI OWASP protections","Immutable images, continuous validation, least-privilege workload roles, pipeline scanning, and secure administrative access"],services:["Amazon EC2","Amazon Inspector","AWS Systems Manager","Amazon CodeGuru Security"],flow:["Build a hardened and traceable workload image.","Attach only required runtime identity.","Scan, patch, and continuously validate.","Restrict administration and remediate findings."],visual:V("pipeline","Compute security follows the workload lifecycle","Build secure, run constrained, validate continuously",["Build","Identity","Scan","Patch","Operate"],"Compute controls span image creation, runtime identity, vulnerability discovery, patching, administrative access, and pipeline validation.","Instance profiles authorize applications; Session Manager avoids open SSH; Inspector finds vulnerabilities; GuardDuty monitors runtime behavior.")},
{title:"Task 3.3: Design and troubleshoot network security controls",ask:"Permit or prevent traffic, secure hybrid and multi-cloud connectivity, segment networks, and identify unnecessary network access.",focus:["Security groups, network ACLs, Network Firewall, Site-to-Site VPN, Direct Connect, MACsec, Verified Access, Network Access Analyzer, VPC Flow Logs, and segmentation","North-south and east-west traffic, isolated subnets, route evaluation, reachability findings, and hybrid trust boundaries"],services:["Amazon VPC","AWS Network Firewall","AWS Network Access Analyzer","AWS Verified Access"],flow:["Define traffic, trust, and failure boundaries.","Select stateful, stateless, or identity-aware controls.","Segment and route hybrid traffic deliberately.","Analyze reachability and remove unnecessary access."],visual:V("topology","Network security is controlled reachability","Permit only the path the requirement needs",["Source","Boundary","Segment","Control","Target"],"Network security decisions are about reachable paths. Combine routing, security groups, NACLs, firewalls, identity-aware access, and analysis to prove the intended path.","Security groups are stateful; NACLs are subnet-level stateless filters; Network Access Analyzer finds unintended reachability.")}]},
{number:"04",title:"Identity and Access Management",weight:"20%",outcome:"Authenticate humans, applications, and systems, then authorize exactly the access each needs.",flow:["Authenticate","Issue","Authorize","Analyze","Correct"],tasks:[
{title:"Task 4.1: Design, implement, and troubleshoot authentication strategies",ask:"Design identity solutions and temporary-credential mechanisms for human, application, and system authentication.",focus:["IAM Identity Center, Cognito, MFA, IdP integration, STS, presigned URLs, CloudTrail, Directory Service, and permission sets","Federation, credential lifetime, session context, authentication failure analysis, and secure access patterns"],services:["AWS IAM Identity Center","Amazon Cognito","AWS STS","AWS Directory Service"],flow:["Identify the actor and authentication context.","Select federation, native, or application identity.","Issue temporary credentials with narrow scope.","Trace failures through identity and audit evidence."],visual:V("flow","Authentication establishes trusted context","Who is acting, for how long, and from where?",["Actor","IdP","Token","Session","Audit"],"Authentication design chooses the identity authority, credential type, session duration, and evidence required for a human, application, or system actor.","Identity Center is for workforce access; Cognito is for application users; STS issues temporary AWS credentials; presigned URLs delegate limited access.")},
{title:"Task 4.2: Design, implement, and troubleshoot authorization strategies",ask:"Evaluate access controls, apply ABAC/RBAC and least privilege, analyze failures, and correct unintended permissions.",focus:["IAM paths, resource policies, trust policies, permission boundaries, session policies, cross-account access, IAM Roles Anywhere, Verified Permissions, Access Analyzer, and Policy Simulator","Policy evaluation logic, explicit deny, conditions, tags, principals, unintended grants, and privilege analysis"],services:["AWS IAM","AWS IAM Access Analyzer","Amazon Verified Permissions","AWS IAM Policy Simulator"],flow:["Name the principal, action, resource, and context.","Evaluate identity, resource, boundary, and organization policies.","Choose RBAC or ABAC with least privilege.","Simulate, analyze, and correct unintended access."],visual:V("decision","Authorization is an effective-policy result","The allowed action is the intersection of boundaries",["Principal","Policy","Boundary","Condition","Decision"],"Authorization requires evaluating every relevant policy and boundary. The design should be explainable, testable, and narrow enough to prevent unintended privilege.","An explicit deny wins; a permission boundary limits a role's maximum permissions; Access Analyzer finds unintended external access.")}]},
{number:"05",title:"Data Protection",weight:"18%",outcome:"Protect data in transit and at rest while managing secrets, keys, certificates, integrity, retention, and recovery.",flow:["Classify","Encrypt","Restrict","Retain","Recover"],tasks:[
{title:"Task 5.1: Design and implement controls for data in transit",ask:"Require encryption, private access, and inter-resource encryption for data moving between users, services, nodes, and environments.",focus:["ELB security policies, TLS enforcement, PrivateLink, VPC endpoints, Client VPN, Verified Access, EMR/EKS/SageMaker inter-node encryption, and Nitro encryption","Certificate selection, private connectivity, protocol requirements, and secure hybrid paths"],services:["AWS Certificate Manager","AWS PrivateLink","AWS Client VPN","Elastic Load Balancing"],flow:["Identify every data path and trust boundary.","Require TLS and validate certificate behavior.","Choose private or identity-aware access.","Verify encryption between services and nodes."],visual:V("layers","Transit protection follows every hop","Encrypt the path, not just the endpoint",["Client","TLS","Private path","Service","Node"],"Data-in-transit protection covers client access, service-to-service communication, private connectivity, and internal node traffic.","ACM manages certificates; ELB enforces TLS policy; PrivateLink keeps service access private; inter-node encryption is a separate requirement.")},
{title:"Task 5.2: Design and implement controls for data at rest",ask:"Encrypt data, protect integrity, automate lifecycle and retention, and implement secure replication and backup solutions.",focus:["KMS, CloudHSM, client-side and server-side encryption, S3 Object Lock, Glacier Vault Lock, versioning, code signing, lifecycle, DLM, AWS Backup, ransomware protection, and DataSync","Key selection, immutable retention, backup isolation, replication, restore testing, and integrity evidence"],services:["AWS KMS","Amazon S3","AWS Backup","AWS DataSync"],flow:["Classify data and recovery requirements.","Select encryption and integrity controls.","Apply lifecycle, retention, and immutability.","Replicate, back up, and test restoration."],visual:V("cycle","At-rest protection is a durable lifecycle","Protect confidentiality, integrity, and recovery",["Encrypt","Integrity","Retain","Replicate","Restore"],"Data-at-rest design combines encryption, integrity, lifecycle, immutable retention, backup isolation, replication, and evidence that restoration works.","KMS protects keys; Object Lock protects retention; AWS Backup centralizes recovery; encryption alone does not prove recoverability.")},
{title:"Task 5.3: Design and implement controls to protect confidential data, credentials, secrets, and cryptographic key materials",ask:"Manage secrets and imported or generated key material, mask sensitive data, and operate keys and certificates across Regions.",focus:["Secrets Manager rotation, imported versus AWS-generated key material, external key stores, CloudWatch Logs data protection, SNS message data protection, KMS multi-Region keys, and Private CA","Separation of key administration from data access, rotation, masking, certificate lifecycle, and cross-Region operations"],services:["AWS Secrets Manager","AWS KMS","AWS CloudHSM","AWS Private Certificate Authority"],flow:["Classify the secret, key, or sensitive field.","Choose ownership, generation, import, and storage model.","Rotate, mask, and restrict operational access.","Replicate or issue certificates with auditable lifecycle."],visual:V("matrix","Confidentiality needs distinct control planes","Secrets, keys, certificates, and data are related but not interchangeable",["Secret","Key","Certificate","Mask","Audit"],"Protecting confidential material means choosing the right service and separating secret storage, cryptographic key control, certificate issuance, masking, and data access.","Secrets Manager rotates secrets; KMS manages keys; Private CA issues private certificates; masking reduces exposure in logs and messages.")}]},
{number:"06",title:"Security Foundations and Governance",weight:"14%",outcome:"Centrally govern accounts, deploy consistent controls, and evaluate compliance with durable evidence.",flow:["Organize","Guardrail","Deploy","Evaluate","Evidence"],tasks:[
{title:"Task 6.1: Develop a strategy to centrally deploy and manage AWS accounts",ask:"Use Organizations and Control Tower, organization policies, delegated administration, and protected root access to manage accounts centrally.",focus:["Organizations, Control Tower, OUs, SCPs, RCPs, AI service opt-out and declarative policies, delegated administrators, centralized root access, MFA, and break-glass procedures","Account lifecycle, guardrail placement, separation of duties, and emergency access"],services:["AWS Organizations","AWS Control Tower","AWS IAM Identity Center","AWS CloudTrail"],flow:["Define account, ownership, and blast-radius boundaries.","Apply organization guardrails and delegated administration.","Centralize security, identity, and audit services.","Protect root access and test break-glass procedures."],visual:V("hierarchy","Governance begins with account boundaries","Central guardrails, delegated operations",["Organization","OU","Account","Guardrail","Evidence"],"A secure organization makes account boundaries, policy scope, central services, delegated administration, and emergency access explicit.","SCPs and RCPs constrain permissions; they do not replace identity policies. Root access must be centralized, monitored, and recoverable.")},
{title:"Task 6.2: Implement a secure and consistent deployment strategy for cloud resources",ask:"Deploy resources consistently with IaC, tags, central policies, Firewall Manager, and controlled cross-account sharing.",focus:["CloudFormation StackSets, third-party IaC, CloudFormation Guard, cfn-lint, tagging, Firewall Manager, Service Catalog, and RAM","Preventive validation, central configuration, resource ownership, policy enforcement, and secure sharing"],services:["AWS CloudFormation","AWS Firewall Manager","AWS Service Catalog","AWS Resource Access Manager"],flow:["Define the secure baseline as code.","Validate templates, tags, and policy requirements.","Deploy consistently across accounts and Regions.","Enforce controls centrally and share only required resources."],visual:V("pipeline","Secure deployment is repeatable governance","Encode the baseline, then enforce it",["Template","Validate","Deploy","Enforce","Share"],"Infrastructure as code makes the desired state repeatable; central controls prevent drift; resource sharing should expose only the capability required by the workload.","StackSets scale deployment; CloudFormation Guard validates policy; Firewall Manager enforces network controls; RAM shares resources deliberately.")},
{title:"Task 6.3: Evaluate the compliance of AWS resources",ask:"Detect and remediate noncompliance, collect audit evidence, and evaluate architecture against AWS security best practices.",focus:["Config aggregators and remediation, Security Hub, Audit Manager, Artifact, Well-Architected Tool, evidence collection, notifications, and continuous compliance","Control mapping, evidence integrity, architecture review, remediation ownership, and audit readiness"],services:["AWS Config","AWS Audit Manager","AWS Artifact","AWS Well-Architected Tool"],flow:["Define control requirements and evidence.","Detect drift and noncompliant resources.","Remediate with ownership and notification.","Collect evidence and review architecture continuously."],visual:V("cycle","Compliance is an evidence loop","Detect, correct, prove, repeat",["Control","Resource","Finding","Remediation","Evidence"],"Compliance is not a one-time scan. It connects control intent, resource evaluation, remediation, notification, evidence collection, and architecture review.","Config evaluates resource state; Audit Manager organizes evidence; Artifact provides AWS compliance documents; Well-Architected reviews design best practices.")}]}
] as const;

export const awsDeveloperDomains = [
  {
    number: "01", title: "Development with AWS Services", weight: "32%", outcome: "Build, integrate, and persist application behavior with AWS APIs, compute, and data services.", flow: ["Design the application boundary", "Implement the runtime", "Persist and retrieve data", "Prove the behavior"],
    tasks: [
      { title: "Task 1.1: Develop code for applications hosted on AWS", ask: "Use AWS SDKs, APIs, CLI tools, and application configuration to build code that interacts correctly with AWS services.", focus: ["AWS SDKs, APIs, CLI, credentials, regions, endpoints, retries, pagination, and error handling", "Application integration with Lambda, API Gateway, ECS, Elastic Beanstalk, EC2, and event-driven services"], services: ["AWS SDKs and APIs", "AWS Lambda", "Amazon API Gateway", "Amazon ECS"], flow: ["Identify the application boundary.", "Choose the AWS API and credential path.", "Implement retries, errors, and configuration.", "Test the service interaction end to end."], visual: V("flow", "Application code is an AWS integration boundary", "Make credentials, APIs, retries, and runtime behavior explicit", ["Code", "SDK", "Identity", "API", "Result"], "Developer solutions must account for region, credentials, request shape, retries, pagination, errors, and the runtime where the code executes.", "Choose the narrowest SDK or API path and prove the response, failure, and permission behavior.") },
      { title: "Task 1.2: Develop code for AWS Lambda", ask: "Develop event-driven Lambda code with the correct handler, event source, execution role, configuration, concurrency, versioning, and invocation behavior.", focus: ["Lambda handlers, context, environment variables, layers, versions, aliases, concurrency, timeouts, memory, and ephemeral storage", "Synchronous and asynchronous invocation, event source mappings, destinations, retries, DLQs, and idempotency"], services: ["AWS Lambda", "Amazon EventBridge", "Amazon SQS", "AWS Step Functions"], flow: ["Define the event and handler contract.", "Configure execution and scaling.", "Control retries and duplicate events.", "Validate success, failure, and observability."], visual: V("cycle", "Lambda behavior is an event contract", "The handler, event, retry, and destination must agree", ["Event", "Handler", "Runtime", "Retry", "Outcome"], "Lambda design connects the event shape to handler code, execution role, runtime limits, concurrency, retries, and idempotent outcomes.", "Treat retries and duplicate delivery as part of the application design.") },
      { title: "Task 1.3: Use data stores in application development", ask: "Select and use AWS data stores according to access patterns, consistency, transactions, performance, durability, and lifecycle requirements.", focus: ["DynamoDB keys, indexes, capacity, consistency, transactions, streams, and conditional writes", "S3, RDS/Aurora, ElastiCache, OpenSearch, connection handling, caching, and data access patterns"], services: ["Amazon DynamoDB", "Amazon S3", "Amazon Aurora", "Amazon ElastiCache"], flow: ["Classify the access pattern.", "Choose the data model and consistency.", "Implement connection, retry, and cache behavior.", "Measure performance and durability."], visual: V("matrix", "The access pattern chooses the data store", "Model reads, writes, consistency, and growth before coding", ["Access", "Model", "Consistency", "Scale", "Durability"], "Application data design depends on access pattern, item or row shape, consistency, connection behavior, scaling, durability, and recovery.", "Do not choose a database by habit; choose it from the access pattern and failure requirement.") }
    ]
  },
  {
    number: "02", title: "Security", weight: "26%", outcome: "Apply identity, encryption, secrets, and least-privilege controls in application code and AWS services.", flow: ["Identify the caller", "Authorize the action", "Protect the data", "Prove the boundary"],
    tasks: [
      { title: "Task 2.1: Implement authentication and/or authorization for applications and AWS services", ask: "Implement identity and access controls for users, workloads, APIs, resources, and cross-account application interactions.", focus: ["IAM users, roles, policies, STS, Cognito, API Gateway authorizers, resource policies, and policy evaluation", "Least privilege, temporary credentials, role assumption, service-to-service access, and authorization boundaries"], services: ["AWS Identity and Access Management (IAM)", "Amazon Cognito", "AWS Security Token Service (STS)", "Amazon API Gateway"], flow: ["Identify the principal.", "Evaluate the policy boundary.", "Issue temporary or application identity.", "Test allowed and denied actions."], visual: V("decision", "Authorization follows the principal and resource", "Trace identity, policy, action, and resource together", ["Principal", "Policy", "Action", "Resource", "Decision"], "Application authorization depends on who calls, which policy applies, what action is requested, which resource is targeted, and which boundary overrides it.", "Separate authentication from authorization and test both allow and deny paths.") },
      { title: "Task 2.2: Implement encryption by using AWS services", ask: "Use AWS encryption services and application integrations to protect data in transit, at rest, and during key or certificate lifecycle operations.", focus: ["KMS keys, key policies, grants, envelope encryption, rotation, multi-Region keys, and encryption context", "TLS certificates, S3 and DynamoDB encryption, RDS encryption, EBS encryption, and client-side encryption"], services: ["AWS Key Management Service (KMS)", "AWS Certificate Manager", "AWS Secrets Manager", "Amazon S3"], flow: ["Classify the data path.", "Choose the encryption layer and key.", "Control key use and rotation.", "Validate encrypted reads, writes, and transport."], visual: V("layers", "Encryption is a data-path decision", "Protect the payload, key, endpoint, and transport", ["Data", "Key", "Policy", "TLS", "Evidence"], "Encryption design includes the data path, key ownership, key policy, service integration, certificate lifecycle, and the boundary where plaintext is exposed.", "Know whether the requirement is encryption at rest, in transit, client-side, or all three.") },
      { title: "Task 2.3: Manage sensitive data in application code", ask: "Store, retrieve, rotate, and audit application secrets without exposing credentials through source code, configuration, logs, or deployment artifacts.", focus: ["Secrets Manager, Systems Manager Parameter Store, AppConfig, environment variables, IAM roles, and secret rotation", "Secret retrieval, caching, access policies, logging redaction, repository scanning, and separation of configuration from code"], services: ["AWS Secrets Manager", "AWS Systems Manager", "AWS AppConfig", "AWS IAM"], flow: ["Classify the sensitive value.", "Store it in a managed control plane.", "Retrieve it with least privilege.", "Rotate, redact, and audit usage."], visual: V("pipeline", "Sensitive data should not travel with the code", "Separate storage, retrieval, rotation, and audit", ["Secret", "Store", "Role", "Runtime", "Rotate"], "Secure application code keeps secrets out of source, images, logs, and templates while controlling runtime retrieval, rotation, and evidence.", "A secret is not protected if it is merely moved into an environment variable without access control and rotation.") }
    ]
  },
  {
    number: "03", title: "Deployment", weight: "24%", outcome: "Package, test, automate, and release applications through repeatable AWS deployment pipelines.", flow: ["Package the artifact", "Test the change", "Automate the gates", "Release safely"],
    tasks: [
      { title: "Task 3.1: Prepare application artifacts to be deployed to AWS", ask: "Build, package, version, store, and prepare application artifacts and dependencies for deployment to AWS runtimes.", focus: ["Build specifications, dependency packaging, Lambda deployment packages, container images, ECR, S3 artifacts, CodeArtifact, and SAM", "Artifact immutability, versioning, architecture compatibility, configuration separation, and deployment manifests"], services: ["AWS CodeBuild", "Amazon ECR", "AWS CodeArtifact", "Amazon S3"], flow: ["Resolve dependencies.", "Build the deployable artifact.", "Version and store it immutably.", "Validate runtime compatibility."], visual: V("pipeline", "A deployment starts with a trustworthy artifact", "Build once, version once, promote the same artifact", ["Source", "Build", "Artifact", "Version", "Runtime"], "Artifact preparation covers dependencies, architecture, packaging format, version identity, storage, configuration separation, and runtime compatibility.", "Do not let the deployment stage silently rebuild or mutate the artifact.") },
      { title: "Task 3.2: Test applications in development environments", ask: "Test application code, integrations, infrastructure, and deployment behavior in suitable local, isolated, and development environments.", focus: ["Unit, integration, contract, load, and acceptance testing; SAM local, containerized tests, API Gateway stages, Lambda versions, and test data", "Environment isolation, mocks, service integrations, failure injection, logs, traces, and reproducible test configuration"], services: ["AWS CodeBuild", "AWS SAM", "Amazon API Gateway", "AWS X-Ray"], flow: ["Define the test boundary.", "Provision isolated dependencies.", "Run functional and failure tests.", "Capture evidence before promotion."], visual: V("decision", "Test the boundary that can fail", "Mocks are useful only when the real integration is also verified", ["Code", "Mock", "Service", "Trace", "Evidence"], "Development testing must distinguish code defects from integration, configuration, permission, data, and deployment defects.", "Use fast tests for feedback and realistic integration tests before release.") },
      { title: "Task 3.3: Automate deployment testing", ask: "Automate quality, security, infrastructure, and regression tests as gates in an AWS delivery workflow.", focus: ["CodePipeline stages, CodeBuild reports, test specifications, CloudFormation validation, cfn-lint, unit and integration gates", "Approval controls, test artifacts, deployment strategies, rollback signals, and automated promotion criteria"], services: ["AWS CodePipeline", "AWS CodeBuild", "AWS CloudFormation", "AWS CodeDeploy"], flow: ["Define the release gates.", "Run automated test stages.", "Publish reports and evidence.", "Promote or stop based on policy."], visual: V("cycle", "Automation turns quality into a release gate", "A green build must prove more than compilation", ["Commit", "Test", "Report", "Gate", "Promote"], "Automated deployment testing should cover code, infrastructure, security, integration, and regression behavior before promotion.", "A deployment pipeline is safe only when failed evidence blocks release.") },
      { title: "Task 3.4: Deploy code by using AWS Continuous Integration and Continuous Delivery (CI/CD) services", ask: "Design and operate CI/CD deployments for compute, containers, serverless applications, and infrastructure with safe release and rollback behavior.", focus: ["CodePipeline, CodeBuild, CodeDeploy, Elastic Beanstalk, ECS, ECR, Lambda aliases, blue/green, canary, rolling, and all-at-once deployments", "Parameterization, approvals, alarms, rollback, artifact promotion, source integrations, and environment separation"], services: ["AWS CodePipeline", "AWS CodeDeploy", "Amazon ECS", "AWS Lambda"], flow: ["Connect the source and artifact.", "Deploy to the target environment.", "Shift traffic with a release strategy.", "Observe, approve, or roll back."], visual: V("flow", "CI/CD is controlled traffic movement", "Release strategy, alarms, and rollback are one design", ["Source", "Artifact", "Deploy", "Traffic", "Rollback"], "A safe release combines immutable artifacts, environment configuration, deployment strategy, health signals, approvals, and rollback.", "Choose blue/green, canary, rolling, or all-at-once from risk, traffic, and rollback requirements.") }
    ]
  },
  {
    number: "04", title: "Troubleshooting and Optimization", weight: "18%", outcome: "Use evidence to isolate faults, instrument applications, and improve performance, reliability, and cost.", flow: ["Reproduce the symptom", "Collect evidence", "Fix the boundary", "Measure the outcome"],
    tasks: [
      { title: "Task 4.1: Assist in a root cause analysis", ask: "Use logs, metrics, traces, deployment history, configuration, and service signals to identify the root cause of application failures.", focus: ["CloudWatch Logs Insights, metrics, alarms, X-Ray traces, CloudTrail, deployment events, health checks, and distributed request context", "Hypothesis-driven investigation, correlation IDs, failure boundaries, rollback evidence, and incident timelines"], services: ["Amazon CloudWatch", "AWS X-Ray", "AWS CloudTrail", "AWS Systems Manager"], flow: ["Reproduce and scope the symptom.", "Correlate logs, metrics, and traces.", "Test the most likely boundary.", "Verify the fix and document evidence."], visual: V("decision", "Root cause analysis follows evidence", "Trace the request, change, dependency, and failure", ["Symptom", "Signal", "Trace", "Change", "Cause"], "Root cause analysis separates symptom from cause by correlating application behavior with AWS service signals, deployment changes, configuration, and dependencies.", "Start with a hypothesis and evidence, not a random configuration change.") },
      { title: "Task 4.2: Instrument code for observability", ask: "Add logs, metrics, traces, correlation context, and alarms that make application behavior measurable and diagnosable.", focus: ["Structured logging, custom metrics, CloudWatch Logs and alarms, X-Ray SDK, segments, annotations, metadata, and OpenTelemetry", "Request IDs, latency, errors, throttles, saturation, dashboards, sampling, retention, and alert quality"], services: ["Amazon CloudWatch", "AWS X-Ray", "AWS Distro for OpenTelemetry", "Amazon API Gateway"], flow: ["Define the question to answer.", "Emit structured signals.", "Correlate across services.", "Alert on meaningful change."], visual: V("pipeline", "Observability makes runtime behavior explainable", "Logs, metrics, and traces answer different questions", ["Log", "Metric", "Trace", "Dashboard", "Alert"], "Good instrumentation connects request context, structured events, measurements, traces, dashboards, and alerts without creating noisy or unsafe telemetry.", "Instrument for diagnosis and action, not simply for volume.") },
      { title: "Task 4.3: Optimize applications by using AWS services and features", ask: "Improve application performance, scalability, reliability, and cost by selecting and tuning AWS services and features.", focus: ["Lambda memory and concurrency, DynamoDB capacity and indexes, caching, S3 transfer, CloudFront, API Gateway caching, database connections, and asynchronous patterns", "Right-sizing, batching, pagination, compression, retries, quotas, service limits, cost allocation, and performance measurement"], services: ["AWS Lambda", "Amazon DynamoDB", "Amazon CloudFront", "Amazon ElastiCache"], flow: ["Measure the bottleneck.", "Choose the smallest effective change.", "Tune the service and code.", "Validate performance, reliability, and cost."], visual: V("matrix", "Optimization is measured trade-off", "Improve the bottleneck without creating a new one", ["Measure", "Bottleneck", "Change", "Result", "Cost"], "Application optimization balances latency, throughput, availability, operational complexity, quotas, and cost using measured evidence.", "Optimize the limiting resource and re-measure the whole request path.") }
    ]
  }
] as const;

export const awsCloudPractitionerDomains = [
  {
    "number": "01",
    "title": "Cloud Concepts",
    "weight": "24%",
    "outcome": "Understand cloud value, Well-Architected principles, migration, and economics",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 1.1: Define the benefits of the AWS Cloud",
        "ask": "Global reach, high availability, elasticity and agility",
        "focus": [
          "Global reach, high availability, elasticity and agility.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon CloudFront",
          "AWS Auto Scaling"
        ],
        "flow": [
          "Identify the define the benefits of the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define the benefits of the AWS Cloud",
          "subtitle": "Global reach, high availability, elasticity and agility",
          "nodes": [
            "Need",
            "Region",
            "Scale",
            "Value"
          ],
          "explanation": "Start with the use case, then connect global reach, high availability, elasticity and agility to the relevant AWS capabilities and their practical limits.",
          "cue": "For define the benefits of the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.2: Identify design principles of the AWS Cloud",
        "ask": "The six Well-Architected pillars and how each improves outcomes",
        "focus": [
          "The six Well-Architected pillars and how each improves outcomes.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Well-Architected Tool",
          "Amazon CloudWatch",
          "AWS Trusted Advisor"
        ],
        "flow": [
          "Identify the identify design principles of the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify design principles of the AWS Cloud",
          "subtitle": "The six Well-Architected pillars and how each improves outcomes",
          "nodes": [
            "Workload",
            "Pillar",
            "Review",
            "Improve"
          ],
          "explanation": "Start with the use case, then connect the six well-architected pillars and how each improves outcomes to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify design principles of the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.3: Understand the benefits of and strategies for migration to the AWS Cloud",
        "ask": "Cloud Adoption Framework, migration paths, and migration support",
        "focus": [
          "Cloud Adoption Framework, migration paths, and migration support.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Migration Hub",
          "AWS Application Migration Service",
          "AWS DMS"
        ],
        "flow": [
          "Identify the understand the benefits of and strategies for migration to the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand the benefits of and strategies for migration to the AWS Cloud",
          "subtitle": "Cloud Adoption Framework, migration paths, and migration support",
          "nodes": [
            "Assess",
            "Plan",
            "Migrate",
            "Optimize"
          ],
          "explanation": "Start with the use case, then connect cloud adoption framework, migration paths, and migration support to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand the benefits of and strategies for migration to the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.4: Understand concepts of cloud economics",
        "ask": "Fixed versus variable cost, rightsizing, licensing, automation and scale",
        "focus": [
          "Fixed versus variable cost, rightsizing, licensing, automation and scale.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Pricing Calculator",
          "AWS Cost Explorer",
          "AWS Compute Optimizer"
        ],
        "flow": [
          "Identify the understand concepts of cloud economics requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand concepts of cloud economics",
          "subtitle": "Fixed versus variable cost, rightsizing, licensing, automation and scale",
          "nodes": [
            "Baseline",
            "Right-size",
            "Estimate",
            "Measure"
          ],
          "explanation": "Start with the use case, then connect fixed versus variable cost, rightsizing, licensing, automation and scale to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand concepts of cloud economics, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "02",
    "title": "Security and Compliance",
    "weight": "30%",
    "outcome": "Recognize responsibility, governance, access control, and security resources",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 2.1: Understand the AWS shared responsibility model",
        "ask": "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda",
        "focus": [
          "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon RDS",
          "AWS Lambda"
        ],
        "flow": [
          "Identify the understand the aws shared responsibility model requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand the AWS shared responsibility model",
          "subtitle": "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda",
          "nodes": [
            "Service",
            "AWS duty",
            "Your duty",
            "Verify"
          ],
          "explanation": "Start with the use case, then connect separate security of the cloud from security in the cloud across ec2, rds and lambda to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand the aws shared responsibility model, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.2: Understand AWS Cloud security, governance, and compliance concepts",
        "ask": "Encryption, compliance evidence, logging, detection, and governance",
        "focus": [
          "Encryption, compliance evidence, logging, detection, and governance.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Artifact",
          "AWS CloudTrail",
          "AWS Config",
          "Amazon GuardDuty"
        ],
        "flow": [
          "Identify the understand aws cloud security, governance, and compliance concepts requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand AWS Cloud security, governance, and compliance concepts",
          "subtitle": "Encryption, compliance evidence, logging, detection, and governance",
          "nodes": [
            "Classify",
            "Protect",
            "Log",
            "Audit"
          ],
          "explanation": "Start with the use case, then connect encryption, compliance evidence, logging, detection, and governance to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand aws cloud security, governance, and compliance concepts, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.3: Identify AWS access management capabilities",
        "ask": "Root account protection, MFA, least privilege, policies, roles and federation",
        "focus": [
          "Root account protection, MFA, least privilege, policies, roles and federation.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS IAM",
          "AWS IAM Identity Center",
          "AWS Secrets Manager"
        ],
        "flow": [
          "Identify the identify aws access management capabilities requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS access management capabilities",
          "subtitle": "Root account protection, MFA, least privilege, policies, roles and federation",
          "nodes": [
            "Identity",
            "Authenticate",
            "Authorize",
            "Review"
          ],
          "explanation": "Start with the use case, then connect root account protection, mfa, least privilege, policies, roles and federation to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws access management capabilities, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.4: Identify components and resources for security",
        "ask": "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor",
        "focus": [
          "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS WAF",
          "AWS Shield",
          "AWS Security Hub",
          "AWS Trusted Advisor"
        ],
        "flow": [
          "Identify the identify components and resources for security requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify components and resources for security",
          "subtitle": "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor",
          "nodes": [
            "Threat",
            "Control",
            "Signal",
            "Guidance"
          ],
          "explanation": "Start with the use case, then connect threat protection, marketplace solutions, security guidance, and trusted advisor to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify components and resources for security, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "03",
    "title": "Cloud Technology and Services",
    "weight": "34%",
    "outcome": "Choose and describe core AWS infrastructure and service categories",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 3.1: Define methods of deploying and operating in the AWS Cloud",
        "ask": "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models",
        "focus": [
          "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Management Console",
          "AWS CLI",
          "AWS CloudFormation"
        ],
        "flow": [
          "Identify the define methods of deploying and operating in the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define methods of deploying and operating in the AWS Cloud",
          "subtitle": "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models",
          "nodes": [
            "Access",
            "Provision",
            "Repeat",
            "Operate"
          ],
          "explanation": "Start with the use case, then connect console, apis, sdks, cli, infrastructure as code, and deployment models to the relevant AWS capabilities and their practical limits.",
          "cue": "For define methods of deploying and operating in the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.2: Define the AWS global infrastructure",
        "ask": "Regions, Availability Zones, edge locations, and high availability",
        "focus": [
          "Regions, Availability Zones, edge locations, and high availability.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon CloudFront",
          "Amazon Route 53",
          "AWS Global Accelerator"
        ],
        "flow": [
          "Identify the define the aws global infrastructure requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define the AWS global infrastructure",
          "subtitle": "Regions, Availability Zones, edge locations, and high availability",
          "nodes": [
            "Region",
            "AZ",
            "Edge",
            "Resilience"
          ],
          "explanation": "Start with the use case, then connect regions, availability zones, edge locations, and high availability to the relevant AWS capabilities and their practical limits.",
          "cue": "For define the aws global infrastructure, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.3: Identify AWS compute services",
        "ask": "EC2 instance families, containers, serverless, scaling and load balancing",
        "focus": [
          "EC2 instance families, containers, serverless, scaling and load balancing.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon ECS",
          "Amazon EKS",
          "AWS Lambda"
        ],
        "flow": [
          "Identify the identify aws compute services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS compute services",
          "subtitle": "EC2 instance families, containers, serverless, scaling and load balancing",
          "nodes": [
            "Workload",
            "Compute",
            "Scale",
            "Balance"
          ],
          "explanation": "Start with the use case, then connect ec2 instance families, containers, serverless, scaling and load balancing to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws compute services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.4: Identify AWS database services",
        "ask": "Relational, NoSQL, in-memory, and migration options",
        "focus": [
          "Relational, NoSQL, in-memory, and migration options.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon RDS",
          "Amazon Aurora",
          "Amazon DynamoDB",
          "AWS DMS"
        ],
        "flow": [
          "Identify the identify aws database services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS database services",
          "subtitle": "Relational, NoSQL, in-memory, and migration options",
          "nodes": [
            "Data",
            "Model",
            "Service",
            "Migrate"
          ],
          "explanation": "Start with the use case, then connect relational, nosql, in-memory, and migration options to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws database services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.5: Identify AWS network services",
        "ask": "VPC components, network controls, DNS and connectivity",
        "focus": [
          "VPC components, network controls, DNS and connectivity.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon VPC",
          "Amazon Route 53",
          "AWS Direct Connect",
          "AWS VPN"
        ],
        "flow": [
          "Identify the identify aws network services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS network services",
          "subtitle": "VPC components, network controls, DNS and connectivity",
          "nodes": [
            "VPC",
            "Subnet",
            "Secure",
            "Connect"
          ],
          "explanation": "Start with the use case, then connect vpc components, network controls, dns and connectivity to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws network services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.6: Identify AWS storage services",
        "ask": "Object, block, file, storage classes, lifecycle and backup",
        "focus": [
          "Object, block, file, storage classes, lifecycle and backup.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon S3",
          "Amazon EBS",
          "Amazon EFS",
          "AWS Backup"
        ],
        "flow": [
          "Identify the identify aws storage services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS storage services",
          "subtitle": "Object, block, file, storage classes, lifecycle and backup",
          "nodes": [
            "Data",
            "Access",
            "Tier",
            "Protect"
          ],
          "explanation": "Start with the use case, then connect object, block, file, storage classes, lifecycle and backup to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws storage services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.7: Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services",
        "ask": "Managed AI capabilities and analytics for querying, streams and visualization",
        "focus": [
          "Managed AI capabilities and analytics for querying, streams and visualization.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon SageMaker AI",
          "Amazon Lex",
          "Amazon Athena",
          "AWS Glue"
        ],
        "flow": [
          "Identify the identify aws artificial intelligence and machine learning (ai/ml) services and analytics services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services",
          "subtitle": "Managed AI capabilities and analytics for querying, streams and visualization",
          "nodes": [
            "Question",
            "Data",
            "Analyze",
            "Result"
          ],
          "explanation": "Start with the use case, then connect managed ai capabilities and analytics for querying, streams and visualization to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws artificial intelligence and machine learning (ai/ml) services and analytics services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.8: Identify services from other in-scope AWS service categories",
        "ask": "Integration, communication, developer tools, end-user computing, IoT and support",
        "focus": [
          "Integration, communication, developer tools, end-user computing, IoT and support.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EventBridge",
          "Amazon SNS",
          "Amazon SQS",
          "Amazon Connect"
        ],
        "flow": [
          "Identify the identify services from other in-scope aws service categories requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify services from other in-scope AWS service categories",
          "subtitle": "Integration, communication, developer tools, end-user computing, IoT and support",
          "nodes": [
            "Event",
            "Integrate",
            "Deliver",
            "Support"
          ],
          "explanation": "Start with the use case, then connect integration, communication, developer tools, end-user computing, iot and support to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify services from other in-scope aws service categories, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "04",
    "title": "Billing, Pricing, and Support",
    "weight": "12%",
    "outcome": "Compare purchase options and find cost and support resources",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 4.1: Compare AWS pricing models",
        "ask": "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers",
        "focus": [
          "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "AWS Savings Plans",
          "Amazon S3"
        ],
        "flow": [
          "Identify the compare aws pricing models requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Compare AWS pricing models",
          "subtitle": "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers",
          "nodes": [
            "Usage",
            "Commitment",
            "Discount",
            "Trade-off"
          ],
          "explanation": "Start with the use case, then connect on-demand, savings plans, reserved instances, spot, dedicated capacity and storage tiers to the relevant AWS capabilities and their practical limits.",
          "cue": "For compare aws pricing models, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 4.2: Understand resources for billing, budget, and cost management",
        "ask": "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags",
        "focus": [
          "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Budgets",
          "AWS Cost Explorer",
          "AWS Pricing Calculator",
          "AWS Organizations"
        ],
        "flow": [
          "Identify the understand resources for billing, budget, and cost management requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand resources for billing, budget, and cost management",
          "subtitle": "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags",
          "nodes": [
            "Estimate",
            "Tag",
            "Track",
            "Alert"
          ],
          "explanation": "Start with the use case, then connect budgets, cost explorer, pricing calculator, consolidated billing and allocation tags to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand resources for billing, budget, and cost management, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 4.3: Identify AWS technical resources and AWS Support options",
        "ask": "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners",
        "focus": [
          "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Support",
          "AWS Trusted Advisor",
          "AWS Health Dashboard",
          "AWS Marketplace"
        ],
        "flow": [
          "Identify the identify aws technical resources and aws support options requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS technical resources and AWS Support options",
          "subtitle": "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners",
          "nodes": [
            "Question",
            "Resource",
            "Plan",
            "Resolve"
          ],
          "explanation": "Start with the use case, then connect support plans, documentation, trusted advisor, health, marketplace and partners to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws technical resources and aws support options, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  }
] as const;

export const awsAiPractitionerDomains = [
  {
    number: "01", title: "Fundamentals of AI and ML", weight: "20%", outcome: "Recognize core AI and ML concepts, practical use cases, and the lifecycle from data to production.", flow: ["Define the AI problem", "Choose the learning approach", "Match the use case", "Measure business value"],
    tasks: [
      { title: "Task 1.1: Explain basic AI concepts and terminologies", ask: "Explain the vocabulary, data types, learning approaches, inference patterns, and differences between AI, ML, GenAI, and agentic AI.", focus: ["AI, ML, deep learning, neural networks, models, algorithms, training, inference, bias, fairness, LLMs, GenAI, and agentic AI", "Supervised, unsupervised, and reinforcement learning; labeled and unlabeled data; batch, real-time, asynchronous, and serverless inference"], services: ["Amazon SageMaker AI", "Amazon Bedrock", "Amazon Comprehend", "Amazon Rekognition"], flow: ["Classify the AI concept.", "Identify the data and learning type.", "Choose the inference pattern.", "Explain the expected output and limitation."], visual: V("matrix", "AI concepts form a connected vocabulary", "Separate data, learning, model, inference, and outcome", ["Data", "Learn", "Model", "Infer", "Outcome"], "AI questions become clearer when the data type, learning method, model behavior, inference mode, and business outcome are separated.", "Know the difference between prediction, generation, classification, clustering, and agentic action.") },
      { title: "Task 1.2: Identify practical use cases for AI", ask: "Select suitable AI or ML techniques and AWS managed services for practical business problems.", focus: ["Regression, classification, clustering, computer vision, NLP, speech, recommendations, fraud detection, forecasting, knowledge bases, and agentic AI", "When traditional ML or foundation models fit better based on cost, regulation, explainability, operational constraints, and required outcome"], services: ["Amazon SageMaker AI", "Amazon Transcribe", "Amazon Translate", "Amazon Comprehend", "Amazon Lex", "Amazon Polly"], flow: ["Describe the business decision.", "Select the AI capability.", "Match the managed service.", "Check value, risk, and feasibility."], visual: V("decision", "Use the simplest AI capability that fits", "Start with the business decision, not the model name", ["Problem", "Data", "Technique", "Service", "Value"], "A practical AI choice balances business value, available data, required accuracy, explainability, cost, latency, and operational ownership.", "Use a managed AI service when the capability is already available and the business does not need to build the model.") },
      { title: "Task 1.3: Describe the AI/ML development lifecycle", ask: "Describe the lifecycle from problem framing and data preparation through training, deployment, monitoring, retraining, and production readiness.", focus: ["Data and feature preparation, experimentation, model training, evaluation, deployment, monitoring, retraining, and technical debt", "Foundation model sources, managed APIs, self-hosted APIs, MLOps repeatability, model metrics, and business metrics"], services: ["Amazon SageMaker AI", "Amazon Bedrock", "Amazon S3", "Amazon CloudWatch"], flow: ["Frame the problem and data.", "Experiment and train.", "Deploy and monitor.", "Improve and retrain."], visual: V("cycle", "AI value is a lifecycle, not a single model call", "Experiment, deploy, measure, and improve", ["Frame", "Prepare", "Train", "Deploy", "Monitor"], "Production AI requires repeatable data, model, deployment, monitoring, feedback, and retraining processes.", "Distinguish model metrics such as precision and recall from business metrics such as cost per user, ROI, and customer feedback.") }
    ]
  },
  {
    number: "02", title: "Fundamentals of GenAI", weight: "24%", outcome: "Explain how generative AI works, where it fits, and which AWS infrastructure supports GenAI applications.", flow: ["Understand generation", "Assess capability", "Choose the pattern", "Build the foundation"],
    tasks: [
      { title: "Task 2.1: Explain the basic concepts of generative AI (GenAI)", ask: "Explain foundation models, tokens, embeddings, transformers, context, inference, multimodality, and common GenAI patterns.", focus: ["Foundation models, large language models, tokens, embeddings, transformers, context windows, temperature, hallucinations, and multimodal models", "Text generation, summarization, classification, extraction, image generation, code generation, and conversational experiences"], services: ["Amazon Bedrock", "Amazon SageMaker AI", "Amazon Nova", "Amazon Q"], flow: ["Identify the generation task.", "Choose the model capability.", "Shape the prompt and context.", "Validate the generated result."], visual: V("flow", "GenAI transforms context into generated output", "Model capability, prompt, context, and evaluation work together", ["Prompt", "Context", "Model", "Output", "Evaluate"], "Generative AI produces new content from learned patterns, but output quality depends on model capability, instructions, context, sampling, and evaluation.", "A foundation model is general-purpose; a business solution still needs grounding, guardrails, evaluation, and monitoring.") },
      { title: "Task 2.2: Understand the capabilities and limitations of GenAI for solving business problems", ask: "Evaluate GenAI opportunities, limitations, risks, and cost trade-offs for business use cases.", focus: ["Accuracy, hallucination, bias, explainability, privacy, latency, token cost, context limits, model selection, and human review", "When GenAI is appropriate for drafting, summarization, search, assistants, and generation; when deterministic logic or traditional ML is safer"], services: ["Amazon Bedrock", "Amazon Bedrock Guardrails", "Amazon Q Business", "Amazon SageMaker AI"], flow: ["Define the business outcome.", "Test model capability and limits.", "Add grounding and human review.", "Measure quality, risk, and cost."], visual: V("matrix", "GenAI value depends on risk and control", "Match autonomy to the consequence of error", ["Use case", "Model", "Risk", "Control", "Value"], "GenAI decisions should balance quality, uncertainty, data sensitivity, latency, cost, explainability, and the required level of human oversight.", "Do not use a generative model when a deterministic rule or verified data lookup is the safer solution.") },
      { title: "Task 2.3: Describe AWS infrastructure and technologies for building GenAI applications", ask: "Describe the AWS services, architecture components, and managed capabilities used to build GenAI applications.", focus: ["Amazon Bedrock models, inference, knowledge bases, agents, guardrails, prompt management, model evaluation, and data grounding", "S3, IAM, KMS, VPC connectivity, CloudWatch, SageMaker AI, vector stores, APIs, and application integration"], services: ["Amazon Bedrock", "Amazon SageMaker AI", "Amazon S3", "AWS Identity and Access Management (IAM)", "AWS Key Management Service (KMS)"], flow: ["Choose the model access path.", "Secure data and identity.", "Add grounding and controls.", "Observe quality, usage, and cost."], visual: V("pipeline", "A GenAI application is an AWS system", "Model access is one layer in a secure application architecture", ["Data", "Ground", "Model", "Guard", "App"], "A production GenAI architecture includes data, identity, network, model access, grounding, guardrails, observability, and application integration.", "Choose managed model access when it reduces operational burden without violating control or data requirements.") }
    ]
  },
  {
    number: "03", title: "Applications of Foundation Models", weight: "28%", outcome: "Design, prompt, adapt, and evaluate foundation-model applications for reliable business outcomes.", flow: ["Design the application", "Engineer the prompt", "Adapt the model", "Evaluate performance"],
    tasks: [
      { title: "Task 3.1: Describe design considerations for applications that use foundation models (FMs)", ask: "Choose architecture patterns for foundation-model applications based on data, latency, control, cost, and user experience requirements.", focus: ["Prompt-based applications, retrieval augmented generation, agents, knowledge bases, vector search, model choice, context, latency, throughput, and cost", "Data grounding, access control, session memory, human review, failure handling, and multi-model architecture"], services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases", "Amazon Bedrock Agents", "Amazon OpenSearch Service"], flow: ["Define the user task.", "Choose context and grounding.", "Select model and orchestration.", "Control access, cost, and failure."], visual: V("decision", "Foundation-model design is a context decision", "Choose model, knowledge, tools, and controls together", ["Task", "Context", "Model", "Tools", "Control"], "FM application design connects user intent to context, model behavior, retrieval, tools, session state, safety, and measurable outcomes.", "Use retrieval or tools when the model needs current, private, or verifiable information.") },
      { title: "Task 3.2: Choose effective prompt engineering techniques", ask: "Select prompting techniques that improve clarity, consistency, grounding, and output format.", focus: ["Zero-shot, few-shot, role, system instructions, delimiters, decomposition, chain-of-thought handling, prompt templates, structured output, and negative constraints", "Prompt injection awareness, context selection, examples, output validation, and iterative testing"], services: ["Amazon Bedrock", "Amazon Bedrock Prompt Management", "Amazon Q", "Amazon SageMaker AI"], flow: ["State the task and role.", "Provide relevant context and examples.", "Specify the output contract.", "Test edge cases and revise."], visual: V("flow", "A prompt is an interface contract", "Instruction, context, examples, and output format reduce ambiguity", ["Role", "Task", "Context", "Format", "Test"], "Effective prompts make the task, constraints, context, examples, and expected output explicit while testing ambiguity, injection, and failure cases.", "Prompt engineering improves behavior, but it does not replace access control, grounding, evaluation, or application validation.") },
      { title: "Task 3.3: Describe the training and fine-tuning process for FMs", ask: "Describe when to use pre-training, fine-tuning, continued pre-training, instruction tuning, or retrieval instead of changing the model.", focus: ["Training data, labeling, compute, hyperparameters, epochs, overfitting, transfer learning, fine-tuning, adapters, and reinforcement learning from human feedback", "Prompt engineering versus retrieval versus fine-tuning; data quality, privacy, cost, model versioning, and evaluation before release"], services: ["Amazon Bedrock Custom Model Import", "Amazon SageMaker AI", "Amazon SageMaker JumpStart", "Amazon S3"], flow: ["Define the behavior gap.", "Choose retrieval, prompt, or tuning.", "Prepare secure representative data.", "Train, evaluate, version, and deploy."], visual: V("matrix", "Adapt the model only when the gap requires it", "Retrieval, prompting, and tuning solve different problems", ["Need", "Prompt", "Retrieve", "Tune", "Evaluate"], "Prompting changes instructions, retrieval supplies current context, and fine-tuning changes model behavior using representative data and controlled evaluation.", "Do not fine-tune simply because the model lacks current facts; retrieval is usually the better fit for changing knowledge.") },
      { title: "Task 3.4: Describe methods to evaluate FM performance", ask: "Evaluate foundation-model quality, safety, usefulness, and business impact using appropriate metrics and test sets.", focus: ["Human evaluation, automated evaluation, ground-truth comparison, relevance, faithfulness, toxicity, bias, robustness, latency, cost, and task success", "Representative datasets, golden answers, prompt regression tests, model comparison, red teaming, and production feedback"], services: ["Amazon Bedrock Model Evaluation", "Amazon SageMaker AI", "Amazon Bedrock Guardrails", "Amazon CloudWatch"], flow: ["Define success and failure.", "Build representative test cases.", "Measure quality and risk.", "Compare, monitor, and improve."], visual: V("cycle", "FM evaluation must reflect the real task", "Quality, safety, cost, and business impact are all signals", ["Test set", "Quality", "Safety", "Cost", "Decision"], "Foundation-model evaluation combines automated metrics, human judgment, safety checks, business measures, and production monitoring.", "A high language score does not prove factuality, safety, or business usefulness.") }
    ]
  },
  {
    number: "04", title: "Guidelines for Responsible AI", weight: "14%", outcome: "Recognize fairness, transparency, explainability, privacy, safety, and human oversight requirements for responsible AI.", flow: ["Identify harm", "Measure bias", "Explain behavior", "Govern use"],
    tasks: [
      { title: "Task 4.1: Explain the development of AI systems that are responsible", ask: "Recognize responsible-AI principles and development practices that reduce bias, privacy risk, unsafe output, and unintended harm.", focus: ["Fairness, inclusiveness, robustness, safety, privacy, security, transparency, explainability, accountability, and human oversight", "Representative data, bias testing, content filters, guardrails, monitoring, documentation, red teaming, and feedback loops"], services: ["Amazon SageMaker Clarify", "Amazon Bedrock Guardrails", "Amazon Bedrock", "AWS Audit Manager"], flow: ["Identify affected users.", "Assess data and model risk.", "Apply controls and human review.", "Monitor outcomes and improve."], visual: V("layers", "Responsible AI is built across the lifecycle", "Principles become controls, tests, and accountable decisions", ["Data", "Model", "Control", "Human", "Monitor"], "Responsible AI requires practical controls across data, model development, deployment, user interaction, monitoring, and governance.", "Treat fairness and safety as measurable engineering concerns, not only policy statements.") },
      { title: "Task 4.2: Recognize the importance of transparent and explainable models", ask: "Explain why transparency, interpretability, explainability, documentation, and user communication matter for AI systems.", focus: ["Model cards, data documentation, feature importance, explainability methods, confidence, uncertainty, human review, auditability, and disclosure", "Trade-offs between model complexity and explainability; communicating limitations and appropriate use to stakeholders"], services: ["Amazon SageMaker Clarify", "Amazon SageMaker Model Monitor", "AWS Audit Manager", "Amazon Bedrock"], flow: ["Document the model and data.", "Explain the decision or output.", "Communicate uncertainty and limits.", "Audit and review the use."], visual: V("decision", "Explainability connects the model to the decision", "Users need context, evidence, limits, and recourse", ["Model", "Reason", "Confidence", "User", "Review"], "Transparency and explainability help users understand model behavior, detect errors, support accountability, and make informed decisions.", "Explainability requirements increase when decisions affect people, rights, safety, or regulated outcomes.") }
    ]
  },
  {
    number: "05", title: "Security, Compliance, and Governance for AI Solutions", weight: "14%", outcome: "Secure AI data and workloads while applying governance, compliance, access, monitoring, and lifecycle controls.", flow: ["Protect the data", "Control access", "Monitor usage", "Prove compliance"],
    tasks: [
      { title: "Task 5.1: Explain methods to secure AI systems", ask: "Recognize identity, data, network, application, model, prompt, and output controls for secure AI solutions.", focus: ["IAM least privilege, KMS encryption, private connectivity, data isolation, prompt injection, data leakage, model access, guardrails, logging, and secrets management", "S3 security, VPC endpoints, CloudTrail, CloudWatch, Macie, vulnerability management, abuse prevention, and human approval"], services: ["AWS Identity and Access Management (IAM)", "AWS Key Management Service (KMS)", "Amazon Bedrock Guardrails", "Amazon Macie", "AWS CloudTrail"], flow: ["Classify data and threats.", "Apply identity and encryption controls.", "Constrain prompts, outputs, and network paths.", "Monitor, detect, and respond."], visual: V("layers", "AI security spans data, model, and interaction", "Protect inputs, processing, outputs, identities, and evidence", ["Data", "Identity", "Model", "Output", "Audit"], "Secure AI systems require layered controls around data, identity, model access, prompts, outputs, network paths, monitoring, and response.", "Apply least privilege to both people and applications that can invoke or configure AI services.") },
      { title: "Task 5.2: Recognize governance and compliance regulations for AI systems", ask: "Recognize governance, risk, compliance, data residency, audit, and organizational controls that apply to AI systems.", focus: ["Data classification, retention, residency, consent, intellectual property, audit evidence, model inventory, acceptable use, risk assessment, and third-party governance", "AWS shared responsibility, service terms, access reviews, change control, incident response, documentation, and continuous monitoring"], services: ["AWS Audit Manager", "AWS Artifact", "AWS Config", "AWS Organizations", "AWS Control Tower"], flow: ["Identify obligations and ownership.", "Classify data and AI use.", "Implement policy and evidence.", "Review changes and compliance continuously."], visual: V("matrix", "AI governance makes responsibility visible", "Map use, data, control, evidence, and accountable owner", ["Use", "Data", "Policy", "Evidence", "Owner"], "AI governance connects business purpose, data rights, security controls, model risk, regulatory obligations, audit evidence, and accountable ownership.", "Compliance is not proven by a model choice alone; it requires controls, evidence, reviews, and operating processes.") }
    ]
  }
] as const;
