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
 ]
};

export default function SaaModuleReference({moduleId,topics}:{moduleId:string;topics:string[]}){
 const entries=rows[moduleId];
 return <section className="saa-reference" aria-label="Module decision reference"><div className="saa-reference-heading"><p>ARCHITECTURE DECISION REFERENCE</p><h2>Compare the choices</h2><span>{entries?'Use these boundaries when applying the visual lessons.':'Use the topic inventory while visual lessons are prepared.'}</span></div><div className="saa-reference-scroll" role="region" aria-label="Module comparison table" tabIndex={0}><table><thead><tr><th scope="col">{entries?'Service / feature':'Topic'}</th><th scope="col">{entries?'Purpose':'Learning focus'}</th><th scope="col">{entries?'Choose and configure':'Status'}</th><th scope="col">{entries?'Decision boundary':'Next step'}</th></tr></thead><tbody>{entries?entries.map(([name,purpose,choice,boundary])=><tr key={name}><th scope="row">{name}</th><td>{purpose}</td><td>{choice}</td><td>{boundary}</td></tr>):topics.map(topic=><tr key={topic}><th scope="row">{topic}</th><td>Architecture concept and relevant service decision</td><td>Visual lesson in preparation</td><td>Review the technical details before applying this choice.</td></tr>)}</tbody></table></div></section>;
}
