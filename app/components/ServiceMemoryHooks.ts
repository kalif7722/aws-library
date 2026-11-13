export type MemoryDecision={headline:string;choices:Array<{name:string;when:string}>};
export type MemoryArchitecture={title:string;note:string};

const normalize=(value:string)=>value.toLowerCase().replace(/\([^)]*\)/g," ").replace(/\b(amazon|aws)\b/g," ").replace(/[^a-z0-9]+/g," ").trim();

const exact:Record<string,string[]>={
  "transit gateway":[
    "Think hub-and-spoke: Transit Gateway is the regional routing hub that connects many VPCs and on-premises networks through attachments.",
    "Route tables create segmentation. A VPC route table sends traffic to the TGW attachment, while TGW route tables decide which attachment receives it next.",
    "Exam clue: many VPCs, centralized routing, VPN/Direct Connect integration or transitive connectivity usually points to Transit Gateway—not VPC peering."
  ],
  "vpc":[
    "VPC = your isolated regional network boundary. Subnets are AZ-scoped; route tables choose paths; security groups and NACLs filter traffic.",
    "Public subnet does not mean public by itself: the route to an Internet Gateway plus a public IP is what creates internet reachability.",
    "Exam clue: decide the path first—IGW, NAT gateway, VPC endpoint, peering, Transit Gateway, VPN or Direct Connect—then apply security controls."
  ],
  "cloudwatch logs":[
    "CloudWatch Logs is the log store/query path: log groups contain log streams, retention controls storage duration, and Logs Insights performs interactive queries.",
    "Subscription filters stream selected log events to destinations such as Lambda, Kinesis or Firehose; metric filters turn matching log patterns into CloudWatch metrics.",
    "Exam clue: choose CloudWatch Logs for centralized application/system logs and querying; choose CloudWatch Metrics for time-series measurements and X-Ray for traces."
  ],
  "cloudwatch":[
    "CloudWatch is the operational observability umbrella: metrics, alarms, dashboards and logs are related but distinct building blocks.",
    "Alarm actions respond to metric conditions; Logs Insights queries logs; dashboards visualize signals. Do not treat one signal type as a replacement for another.",
    "Exam clue: if the requirement is alerting on a numerical time series, think metric + alarm; if it is searching raw events, think CloudWatch Logs."
  ],
  "direct connect":[
    "Direct Connect = dedicated private network connectivity from your location to AWS through a DX location; it does not encrypt traffic by itself.",
    "Virtual interfaces determine what you reach: private VIFs reach VPC resources, public VIFs reach AWS public endpoints, and transit VIFs integrate with Transit Gateway through a Direct Connect gateway.",
    "Exam clue: predictable private bandwidth and consistent hybrid connectivity points to Direct Connect; encryption can be added with VPN where required."
  ],
  "site to site vpn":[
    "Site-to-Site VPN = encrypted IPsec connectivity between your customer gateway and AWS. Two tunnels provide redundancy.",
    "It commonly terminates on a virtual private gateway or Transit Gateway and can provide backup connectivity for Direct Connect.",
    "Exam clue: encrypted hybrid connectivity over the internet favors Site-to-Site VPN; dedicated private transport favors Direct Connect."
  ],
  "client vpn":[
    "Client VPN is user-to-VPC remote access, not site-to-site network connectivity. Individual clients establish managed VPN sessions into associated subnets.",
    "Authorization rules decide which networks users may reach, while security groups and routes still control the actual traffic path.",
    "Exam clue: remote employees/laptops point to Client VPN; branch offices and data centers point to Site-to-Site VPN."
  ],
  "private link":[
    "PrivateLink gives private service access through interface endpoints without peering, public IPs or transitive routing between consumer and provider VPCs.",
    "Consumers get endpoint ENIs in their subnets; providers expose an endpoint service, commonly behind a Network Load Balancer.",
    "Exam clue: privately consume a service across VPC/account boundaries while hiding provider network topology = PrivateLink."
  ],
  "route 53":[
    "Route 53 is DNS and health-aware traffic steering. Routing policies influence which endpoint DNS returns; they do not forward packets like a router.",
    "Private hosted zones provide VPC-only DNS; Resolver inbound/outbound endpoints connect VPC DNS with on-premises DNS.",
    "Exam clue: DNS failover, latency/weighted/geolocation routing or hybrid name resolution points to Route 53—not a load balancer."
  ],
  "cloudfront":[
    "CloudFront is a global CDN: viewers connect to edge locations, cache behavior selects an origin, and cache keys/TTL determine reuse.",
    "Use Origin Access Control for private S3 origins and WAF at the edge for HTTP-layer protection; Lambda@Edge/CloudFront Functions add edge logic.",
    "Exam clue: cacheable global web/API delivery and reduced origin load points to CloudFront; static anycast acceleration without caching points to Global Accelerator."
  ],
  "global accelerator":[
    "Global Accelerator gives static anycast IPs and routes TCP/UDP traffic over the AWS global network to healthy regional endpoints.",
    "It does not cache content. Endpoint groups, health checks and traffic dials control regional routing and failover.",
    "Exam clue: improve global latency/failover for non-cacheable TCP/UDP or preserve fixed IPs = Global Accelerator; cached HTTP content = CloudFront."
  ],
  "s3":[
    "S3 = regional object storage with buckets and object keys. It is not a file system or block device, even when applications present it that way.",
    "Versioning, lifecycle, replication and backup solve different problems: recovery from overwrite, cost-tiering, regional copy and protected restore respectively.",
    "Exam clue: massive durable object storage, data lakes, static assets or event-driven object workflows usually point to S3."
  ],
  "ebs":[
    "EBS = persistent block storage attached to EC2. Volumes live in one Availability Zone and snapshots are the portable backup mechanism.",
    "Choose volume type by IOPS/throughput/latency needs; Multi-Attach is specialized and does not make EBS a general shared file system.",
    "Exam clue: boot/data disk for EC2 = EBS; shared NFS across instances = EFS; object storage = S3."
  ],
  "efs":[
    "EFS = managed shared NFS file storage that can be mounted by many Linux clients across Availability Zones.",
    "Mount targets provide VPC access and security groups protect NFS traffic; throughput/performance mode controls workload behavior.",
    "Exam clue: shared POSIX/NFS file system with elastic capacity = EFS; single-instance block disk = EBS."
  ],
  "lambda":[
    "Lambda = event-driven functions with no server management. Design around invocation type, timeout, concurrency, retries and idempotency.",
    "Synchronous callers see errors directly; asynchronous and event-source integrations have different retry, batching and failure-destination behavior.",
    "Exam clue: short-lived event processing that scales per invocation favors Lambda; long-running containers or host-level control favors Fargate/EC2."
  ],
  "eventbridge":[
    "EventBridge routes events by content from AWS services, SaaS partners and custom producers using buses, rules and targets.",
    "It is an event router, not a durable work queue. Use SQS when a consumer must pull from a backlog and SNS when a publisher pushes the same message to subscribers.",
    "Exam clue: many event sources + filtering + many target types = EventBridge."
  ],
  "sns":[
    "SNS = push-based pub/sub fan-out. A topic accepts one publication and distributes it to multiple subscriptions.",
    "Pair SNS with SQS when each consumer needs its own durable backlog and independent retry/failure behavior.",
    "Exam clue: broadcast one event to email/SMS/HTTP/Lambda/queues = SNS; single durable work queue = SQS."
  ],
  "sqs":[
    "SQS = durable pull-based queue that decouples producers from consumers and absorbs bursts.",
    "Standard queues maximize scale with at-least-once delivery; FIFO queues add ordering and deduplication within message groups; DLQs isolate poison messages.",
    "Exam clue: back-pressure, worker decoupling, retry backlog or DLQ = SQS; pub/sub fan-out = SNS."
  ],
  "step functions":[
    "Step Functions = durable workflow state. States model retries, branching, parallel work, waits and callbacks without keeping compute running.",
    "Use it when orchestration itself is part of the application state; do not replace a simple event router with a state machine unnecessarily.",
    "Exam clue: multi-step process with retries/choices/human approval/long waits = Step Functions."
  ],
  "kms":[
    "KMS protects cryptographic keys and performs cryptographic operations; applications normally use envelope encryption so plaintext data keys are short-lived.",
    "IAM permission alone may not be enough: key policies and grants are part of authorization, especially across accounts.",
    "Exam clue: control who can encrypt/decrypt with centrally governed keys = KMS; dedicated customer-controlled HSM appliances = CloudHSM."
  ],
  "secrets manager":[
    "Secrets Manager stores sensitive credentials as versioned secrets and can automate rotation; applications retrieve them at runtime with IAM authorization.",
    "Do not use it for ordinary non-secret configuration when Parameter Store/AppConfig is a better fit.",
    "Exam clue: database password/API token + managed rotation = Secrets Manager."
  ],
  "iam identity center":[
    "IAM Identity Center centralizes workforce sign-in and permission sets across AWS accounts and applications; it is not the same as IAM users for each account.",
    "Permission sets create role-based access in target accounts and can federate from an external identity provider.",
    "Exam clue: employees need SSO to many AWS accounts = IAM Identity Center; application end users = Cognito."
  ],
  "iam":[
    "IAM answers who can do what on which AWS resource under what conditions. Policies are evaluated together; an explicit deny wins.",
    "Prefer roles and temporary credentials over long-lived access keys, especially for workloads and cross-account access.",
    "Exam clue: service-to-service or cross-account authorization usually means an IAM role plus a trust policy and permissions policy."
  ],
  "rds":[
    "RDS manages relational database engines; Multi-AZ is primarily availability/failover while read replicas are primarily read scaling and can support DR patterns.",
    "Keep databases private, use Secrets Manager/IAM database authentication where appropriate, and plan backups/snapshots separately from replicas.",
    "Exam clue: familiar relational engine with managed patching/backups = RDS; cloud-native MySQL/PostgreSQL distributed storage = Aurora."
  ],
  "aurora":[
    "Aurora separates compute from a distributed multi-AZ storage layer and is MySQL/PostgreSQL compatible.",
    "Aurora replicas share cluster storage and can provide read scaling/failover; Aurora Serverless changes compute capacity behavior, not the relational model.",
    "Exam clue: high-scale cloud-native relational workload with MySQL/PostgreSQL compatibility often points to Aurora."
  ],
  "dynamodb":[
    "DynamoDB = serverless key-value/document database designed around known access patterns, partition keys and optional sort keys/indexes.",
    "Capacity mode, hot partitions, GSIs/LSIs, Streams and DAX solve different scaling or integration needs.",
    "Exam clue: predictable low-latency at very high scale without relational joins = DynamoDB."
  ],
  "cloudtrail":[
    "CloudTrail records AWS API activity: who called what, when, from where and against which resource. It is the audit trail, not the performance-monitoring system.",
    "Trails deliver events to destinations such as S3/CloudWatch Logs; CloudTrail Lake supports longer-term SQL-style event analysis.",
    "Exam clue: investigate account/API changes or prove administrative activity = CloudTrail; resource performance = CloudWatch."
  ],
  "systems manager":[
    "Systems Manager is the fleet operations control plane for managed nodes: patching, Run Command, Session Manager, Automation and inventory.",
    "Session Manager avoids inbound SSH/RDP ports and uses IAM-controlled API access; Automation runbooks turn operational procedures into repeatable workflows.",
    "Exam clue: manage EC2/on-prem fleets without direct admin access = Systems Manager."
  ],
  "config":[
    "AWS Config records resource configuration history and evaluates resources against desired-state rules; it does not replace CloudTrail API auditing.",
    "Conformance packs group rules/remediations and aggregators centralize configuration/compliance views across accounts/Regions.",
    "Exam clue: 'was this resource compliant/configured correctly over time?' = Config; 'who changed it?' = CloudTrail."
  ],
  "backup":[
    "AWS Backup centralizes policy-based backups across supported AWS services and accounts. Backup plans define schedule, lifecycle and retention.",
    "Vaults provide the protection boundary; Vault Lock strengthens immutability. Cross-Region/account copies support recovery isolation.",
    "Exam clue: centrally govern backups across multiple AWS data services = AWS Backup."
  ],
  "datasync":[
    "DataSync is online accelerated data movement for files/objects between on-premises storage and AWS or between supported AWS storage services.",
    "Agents are used for many on-premises sources; tasks define source, destination, options, schedule and verification.",
    "Exam clue: recurring or high-throughput NFS/SMB/object transfer = DataSync; database CDC = DMS; offline appliance = Snow Family."
  ]
};

export function getServiceMemoryHook(service:string,category:string,decision:MemoryDecision,architectures:MemoryArchitecture[]):string[]{
  const key=normalize(service);
  const direct=exact[key] || Object.entries(exact).find(([candidate])=>key===candidate||key.endsWith(candidate))?.[1];
  if(direct)return direct;
  const current=decision.choices?.[0];
  const alternative=decision.choices?.find((choice,index)=>index>0&&choice.name!==service);
  const primary=architectures?.[0];
  return [
    current?`${service} — ${current.when}`:`${service}: remember the specific responsibility it owns inside ${category}.`,
    alternative?`Do not confuse it with ${alternative.name}: ${alternative.when}`:`Decision boundary: identify what ${service} owns versus the neighboring service that handles the next layer.`,
    primary?`Architecture clue: ${primary.title}. ${primary.note}`:`Architecture clue: place ${service} in its real request/data/control path before choosing it in an exam scenario.`
  ];
}
