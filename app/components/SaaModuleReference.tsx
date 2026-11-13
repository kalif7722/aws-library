import './SaaModuleReference.css';

const rows:Record<string,[string,string,string,string][]>= {
 '01':[
  ['IAM user / group','Named workforce identity / shared permission set','Prefer federation for human access; groups hold policies for users.','A group is not a principal that assumes a role.'],
  ['IAM role','Temporary workload or cross-account access','Trust policy controls who may assume it; permission policy controls allowed actions.','Role trust alone does not grant access to the target resource.'],
  ['Identity / resource policy','Principal permissions / resource-side grant','Evaluate the whole request: principal, action, resource and conditions.','An explicit deny overrides an allow.'],
  ['Permissions boundary / SCP','Maximum permissions for an identity / organization account guardrail','Intersect applicable allows with guardrails.','Neither grants access by itself.'],
  ['MFA / access keys','Sign-in protection / programmatic credentials','Use temporary credentials and audit long-lived keys.','A password policy does not protect access keys.'],
  ['KMS key policy','Key authorization boundary','Check key policy, applicable IAM permission and grants as relevant.','S3 object access alone does not authorize SSE-KMS decryption.']
 ],
 '02':[
  ['AMI / user data','Instance image / launch-time bootstrap','Choose the base image, then configure software at launch.','User data normally runs on first boot by default.'],
  ['Instance family','Compute, memory, storage or accelerated profile','Match the family to the measured bottleneck.','A larger instance is not always the right family.'],
  ['Security group','Stateful ENI traffic filter','Allow the required source and port; return traffic is automatic.','Rules are allow-only and do not create a route.'],
  ['EC2 Instance Connect','Temporary SSH public key delivery','Check IAM authorization and SSH network reachability.','A key delivery mechanism does not replace a security-group rule.'],
  ['Spot / Savings Plan','Interruptible capacity / billing commitment','Use Spot for interruption-tolerant work; a plan discounts matching usage.','A discount is not a capacity guarantee.'],
  ['Capacity Reservation / Dedicated Host','AZ capacity / physical host allocation','Reserve matching capacity or meet licensing and isolation needs.','Regional RI and Savings Plans do not reserve AZ capacity.'],
  ['Auto Scaling group','Replace and adjust instance capacity','Set health checks, min/max/desired capacity and scaling policy.','Warmup and readiness affect how safely new capacity serves traffic.']
 ],
 '03':[
  ['Private / public / Elastic IPv4','Internal identity / internet address / persistent public IPv4','Keep the private IP on the ENI; use routing and security groups for reachability.','An Elastic IP does not create a route and public IPv4 addresses incur charges.'],
  ['Placement group / ENI','Instance locality or isolation / network interface identity','Choose cluster, spread or partition for the workload; move a secondary ENI only within its AZ.','Primary ENI is not detachable; placement strategy affects capacity and failure domain.'],
  ['Stop / hibernate / terminate','Pause / preserve RAM / end instance','Check EBS and instance-store data fate before changing state.','Hibernate requires launch-time enablement and an encrypted EBS root volume.'],
  ['EBS / instance store','Persistent AZ block volume / local ephemeral storage','Use EBS for durable block data; use instance store only for rebuildable data.','EBS attachment and restore must respect the target AZ.'],
  ['Snapshot / AMI','Volume recovery point / repeatable instance launch definition','Create a volume from a snapshot; use an AMI to launch a configured instance.','Snapshots are regional; an AMI does not preserve RAM or live process state.'],
  ['gp3 / io2 / st1 / sc1','General SSD / provisioned IOPS / throughput HDD / cold HDD','Measure IOPS, throughput and access pattern before choosing.','HDD volume types are not boot volumes; instance limits can constrain disk performance.'],
  ['EBS Multi-Attach','Shared io1/io2 block device in one AZ','Use only with a cluster-aware application and filesystem.','Multiple writers do not turn a block device into a normal shared file system.'],
  ['EFS','Regional managed NFS file system','Create mount targets and authorize the network and file access path.','EFS shares files across clients and AZs; storage tier and throughput choice affect behavior.']
 ],
 '04':[
  ['Scale up / scale out','Increase one instance / add instances','Use horizontal scaling with multi-AZ capacity for replaceable web tiers.','Handling more load does not itself guarantee high availability.'],
  ['ALB / NLB / GWLB','HTTP request routing / transport flows / appliance inspection','Choose from protocol and traffic behavior before selecting a target group.','An ALB listener rule is different from a network security rule.'],
  ['Target health / ASG health','Route only to healthy targets / replace unhealthy instances','Set target group checks and configure ELB health checks on the ASG when needed.','An ALB health failure alone does not guarantee ASG replacement.'],
  ['Sticky session / shared state','Target affinity / replaceable application tier','Use cookie affinity only when required; externalize session state for resilience.','A failed target can break a session even when affinity is enabled.'],
  ['Cross-zone balancing','Distribute load among enabled AZ target pools','Check load-balancer and target-group settings and transfer behavior.','Disabled cross-zone can create uneven per-AZ capacity.'],
  ['TLS / SNI','Encrypt the client connection / select a hostname certificate','Use an HTTPS listener with a trusted matching certificate.','The ALB-to-target connection is separate; configure HTTPS if needed.'],
  ['Deregistration delay','Allow in-flight requests to finish','Drain a target before replacement or scale-in.','A removed target should stop new requests while existing work completes.'],
  ['Target tracking / warmup','Keep demand per instance near a target / exclude new-instance metrics','Pick CPU or ALB requests per target to match the bottleneck.','Simple scaling cooldown and target-tracking warmup serve different purposes.']
 ],
 '05':[
  ['RDS / Aurora','Managed relational databases','Choose engine compatibility, availability, scaling and workload pricing.','You still own schema, indexes, SQL and database permissions.'],
  ['Multi-AZ DB instance / read replica','Failover standby / read offload','Use synchronous standby for availability and asynchronous replicas for read scaling.','A classic standby cannot serve reads; replica lag can affect freshness.'],
  ['Multi-AZ DB cluster','Writer and two readable instances across three AZs','Use writer and reader endpoints for the correct connection type.','This is a different deployment from a DB instance with one standby.'],
  ['Aurora endpoints / replicas','Write routing / read connection distribution','Send writes to the writer endpoint and read-only connections to eligible readers.','Reader endpoints balance connections rather than individual queries.'],
  ['Serverless v2 / reader Auto Scaling','Instance ACUs / provisioned reader count','Set supported capacity bounds and reader scaling policies separately.','Zero-ACU auto-pause depends on engine version and configuration.'],
  ['Backups / snapshots / clone','Recovery history / retained copy / test environment','RDS automated retention can be 0–35 days for eligible DB instances; Aurora uses 1–35 days. Restore and validate a new DB before cutover.','RDS Multi-AZ DB clusters require automated backups; an Aurora clone is not an independent backup policy.'],
  ['RDS Proxy','Reusable database connection pool','Use a supported private proxy endpoint and authentication path.','Pinning can reduce pooling; a proxy does not fix slow queries.'],
  ['Cache-aside / write-through','Load on miss / update cache with writes','Plan TTL, invalidation, eviction and failure behavior.','Write-through needs correct handling of every write path; it cannot universally guarantee fresh reads.'],
  ['Valkey / Redis OSS / Memcached','Choose engine and deployment model','Use sorted sets for ranked data and shared sessions for replaceable app instances.','Replication and backup support depend on engine and deployment; Memcached Serverless supports snapshots.'],
  ['TLS / KMS / IAM / security groups','Transport / stored data / login / network controls','Authorize the network and database identity separately.','An AWS API policy does not automatically grant database or cache login.']
 ],
 '06':[
  ['Public / private hosted zone','Internet-visible / associated VPC DNS view','Choose the zone that should answer the caller’s query.','Creating a private zone alone does not make on-premises resolvers aware of it.'],
  ['A / AAAA / CNAME / Alias','IPv4 / IPv6 / hostname / supported target','Use alias A or AAAA for supported AWS targets at zone apex.','CNAME cannot occupy the apex; alias target types and TTL depend on target.'],
  ['Simple / weighted / latency','One response / weighted answers / measured Region latency','Set the routing policy to match the actual goal.','Weights affect answers over time; DNS caching means no exact request split.'],
  ['Geolocation / geoproximity / IP-based','Query origin geography / biased proximity / CIDR collection','Use the relevant record and sensible default where supported.','These policies do not mean lowest latency.'],
  ['Endpoint / calculated / CloudWatch health','Public probes / combined state / private metric signal','Check that the health source is reachable or observable.','Public Route 53 health checkers cannot directly probe private subnet IPs.'],
  ['Failover / multivalue','Primary-secondary / up to eight healthy values','Attach appropriate health checks and plan DNS cache behavior.','Multivalue answers do not replace a load balancer and do not support alias.'],
  ['Domain registrar / delegation','Purchase name / authorize DNS name servers','Set registrar NS values to the public hosted zone’s name servers.','Creating a Route 53 hosted zone alone does not change domain delegation.'],
  ['Resolver inbound / outbound','On-prem to AWS private names / VPC to on-prem names','Associate zones or rules and allow required TCP/UDP 53.','Avoid forwarding loops and keep the two directions distinct.']
 ],
 '07':[
  ['Three-tier / serverless', 'Managed web, application and data tiers', 'Choose by traffic pattern and operational model.', 'Keep state outside replaceable compute.'],
  ['Synchronous / asynchronous', 'Immediate response / buffered work', 'Queue work that can be processed later.', 'The user contract decides whether an immediate answer is required.'],
  ['Multi-AZ / caching', 'Failure tolerance / latency reduction', 'Test AZ loss and cache invalidation.', 'A cache is not a durable source of truth.']
 ],
 '08':[
  ['S3 Standard / Intelligent-Tiering', 'Frequent or changing access', 'Choose by measured access pattern and monitoring overhead.', 'Tiering and retrieval costs differ.'],
  ['S3 Standard-IA / One Zone-IA', 'Infrequent access; one AZ for the latter', 'Compare resilience and minimum storage duration.', 'One Zone-IA is unsuitable for AZ-loss tolerance.'],
  ['S3 Glacier classes', 'Archive with retrieval-time choices', 'Match restore latency and minimum duration to RTO.', 'Archive retrieval is not instant in all classes.']
 ],
 '09':[
  ['S3 versioning / replication', 'Recover versions / copy to another bucket', 'Enable versioning and scope replication rules.', 'Replication is asynchronous and does not replace backup.'],
  ['SSE-S3 / SSE-KMS', 'Managed encryption / key control and audit', 'Choose KMS when key policies and audit are needed.', 'KMS permissions and request costs matter.'],
  ['Bucket policy / access point', 'Resource boundary / scoped access path', 'Test principal, action, resource and conditions together.', 'An explicit deny overrides any allow.']
 ],
 '10':[
  ['CloudFront / Global Accelerator', 'HTTP caching / global network routing', 'Choose by protocol, caching and endpoint needs.', 'Global Accelerator does not cache objects.'],
  ['Origin access control / public origin', 'Private S3 origin / internet-accessible origin', 'Restrict direct origin bypass when needed.', 'An S3 website endpoint uses a custom origin.'],
  ['Cache key / invalidation', 'Cache variation / content refresh', 'Set TTL and vary only on needed request values.', 'Too many variations reduce hit ratio.']
 ],
 '11':[
  ['EBS / EFS / FSx', 'Block / shared NFS / managed specialist file', 'Choose protocol, latency and sharing requirement.', 'EBS volume access is AZ scoped.'],
  ['Storage Gateway / DataSync', 'Hybrid access / data movement', 'Choose gateway for ongoing access, DataSync for transfer.', 'Neither makes data automatically multi-Region.'],
  ['Transfer Family / Snow Family', 'Managed file protocol endpoint / offline transfer', 'Match partner protocol, bandwidth and volume.', 'Validate transfer completion and permissions.']
 ],
 '12':[
  ['SQS standard / FIFO', 'High throughput / ordered deduplication', 'Choose FIFO when ordering per message group matters.', 'Both require consumer idempotency planning.'],
  ['SNS / EventBridge', 'Fan-out notification / event routing', 'Choose by routing, filtering and integration needs.', 'Delivery and retry behavior vary by target.'],
  ['Step Functions / SQS', 'Workflow state / buffered work', 'Use workflows for coordinated steps, queues for decoupling.', 'A queue alone does not orchestrate a saga.']
 ],
 '13':[
  ['ECS / EKS', 'AWS container orchestration / Kubernetes', 'Choose by team skills and platform integration.', 'Kubernetes adds operational complexity.'],
  ['Fargate / EC2 capacity', 'Managed task compute / host control', 'Choose based on isolation, scaling and host requirements.', 'Capacity selection affects cost and operations.'],
  ['ALB / Cloud Map', 'HTTP ingress / service discovery', 'Route by protocol and deployment topology.', 'Discovery alone does not enforce authorization.']
 ],
 '14':[
  ['Lambda / Fargate', 'Event function / long-running container task', 'Match runtime, duration and scaling behavior.', 'Retries require idempotency.'],
  ['API Gateway / ALB', 'API policies / HTTP application routing', 'Choose required authorization and routing features.', 'Products have different limits and pricing.'],
  ['EventBridge / Step Functions', 'Event routing / workflow state', 'Use orchestration for coordinated multi-step work.', 'Event delivery is not a transaction.']
 ],
 '15':[
  ['RDS / DynamoDB', 'Relational joins / key-value access patterns', 'Choose by query shape, consistency and scaling.', 'DynamoDB needs partition-key design.'],
  ['Aurora / RDS', 'Distributed storage / managed engine choices', 'Compare compatibility, scaling, recovery and cost.', 'Aurora is not automatically cheaper.'],
  ['ElastiCache / database', 'Fast derived data / durable system of record', 'Plan invalidation and cache failure.', 'Cache is not a replacement for durable writes.']
 ],
 '16':[
  ['CloudWatch / CloudTrail / Config', 'Metrics and logs / API events / configuration history', 'Correlate evidence by time and resource.', 'Each observes a different aspect.'],
  ['X-Ray / CloudWatch logs', 'Distributed traces / application events', 'Use traces to follow request paths.', 'Tracing needs instrumentation and sampling.'],
  ['Compute Optimizer / Cost Explorer', 'Rightsizing suggestions / usage cost analysis', 'Validate performance and savings with actual load.', 'A recommendation is not a measured outcome.']
 ],
 '17':[
  ['IAM policy / SCP / boundary', 'Permission grant / organization maximum / identity maximum', 'Evaluate intersections and explicit deny.', 'Guardrails do not grant access.'],
  ['KMS / Secrets Manager', 'Key authorization / secret lifecycle', 'Check policies, rotation and application access.', 'Encryption alone does not authorize a principal.'],
  ['WAF / Network Firewall / Shield', 'HTTP filtering / network inspection / DDoS protection', 'Place controls at supported layers and paths.', 'A firewall endpoint needs routing to inspect traffic.']
 ],
 '18':[
  ['Security group / NACL', 'Stateful ENI filter / stateless subnet filter', 'Check both directions and ephemeral ports for NACL.', 'Rules do not create a route.'],
  ['VPN / Direct Connect', 'Encrypted tunnel / dedicated connection', 'Compare throughput, latency, setup and resilience.', 'Direct Connect is not encrypted by default.'],
  ['Peering / TGW / PrivateLink', 'Point-to-point / hub / service access', 'Select scope and transitivity to match the topology.', 'Peering is nontransitive.']
 ],
 '19':[
  ['AWS Backup / native backup', 'Policy coordination / service-specific controls', 'Match retention, vault and restore needs.', 'Test restoration, not just backup success.'],
  ['Pilot light / warm standby / active-active', 'Increasing readiness and cost', 'Select by RTO, RPO and operating complexity.', 'Failover paths need rehearsal.'],
  ['DMS / DataSync', 'Database migration / file and object transfer', 'Choose by data type and cutover method.', 'Replication must be validated before switch.']
 ],
 '20':[
  ['SQS / SNS / EventBridge', 'Queue / pub-sub / event bus', 'Choose delivery contract and consumer behavior.', 'Fan-out is different from buffering.'],
  ['CloudFormation change set / stack', 'Preview / execute infrastructure changes', 'Review replacements and rollback implications.', 'A change set is not a successful deployment.'],
  ['Cost Explorer / Budgets / CUR', 'Analyze / alert / detailed billing data', 'Use the level of detail required for attribution.', 'NAT, cross-AZ and egress can dominate transfer costs.']
 ],
 '21':[
  ['Multipart upload / Transfer Acceleration', 'Parallel parts / edge-assisted transfer', 'Use multipart for large uploads; benchmark distance benefit.', 'Transfer Acceleration has separate charges.'],
  ['On-Demand / Savings Plans / Spot', 'Flexibility / spend commitment / interruptible spare capacity', 'Match interruption tolerance and predictable spend.', 'Zonal RI can reserve capacity; Savings Plans do not.'],
  ['AZ / Region recovery', 'Local failure / regional disruption', 'Set RTO/RPO and validate standby quotas.', 'Multi-AZ does not cover a whole Region failure.']
 ]
};

export default function SaaModuleReference({moduleId,topics}:{moduleId:string;topics:string[]}){
 const entries=rows[moduleId];
 return <section className="saa-reference" aria-label="Module decision reference"><div className="saa-reference-heading"><p>ARCHITECTURE DECISION REFERENCE</p><h2>Compare the choices</h2><span>{entries?'Use these boundaries when applying the visual lessons.':'Use the topic inventory while visual lessons are prepared.'}</span></div><div className="saa-reference-scroll" role="region" aria-label="Module comparison table" tabIndex={0}><table><thead><tr><th scope="col">{entries?'Service / feature':'Topic'}</th><th scope="col">{entries?'Purpose':'Learning focus'}</th><th scope="col">{entries?'Choose and configure':'Status'}</th><th scope="col">{entries?'Decision boundary':'Next step'}</th></tr></thead><tbody>{entries?entries.map(([name,purpose,choice,boundary])=><tr key={name}><th scope="row">{name}</th><td>{purpose}</td><td>{choice}</td><td>{boundary}</td></tr>):topics.map(topic=><tr key={topic}><th scope="row">{topic}</th><td>Architecture concept and relevant service decision</td><td>Explore the module lessons</td><td>Review the technical details before applying this choice.</td></tr>)}</tbody></table></div></section>;
}
