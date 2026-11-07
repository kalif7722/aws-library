import './SaaModuleReference.css';

type Row=[string,string,string,string];
const rows:Record<string,Row[]>={
 '01':[
  ['Region / AZ / edge','Geography / fault isolation / content proximity','Pick Region for residency, latency, service availability and cost; span AZs for resilience.','An edge location is not a replacement for an application AZ.'],
  ['IAM user / group / role','Human identity / permission grouping / temporary access','Prefer federation for people and roles for deployed workloads.','A group is not an assumable principal.'],
  ['Console / CLI / SDK','Interactive / scripted / application API access','Use a profile or role and let the SDK resolve short-lived credentials.','Never embed long-lived keys in application code.'],
  ['Policy / MFA','Authorization / sign-in protection','Inspect action, resource, condition and explicit denies; secure human sign-in.','MFA does not replace a least-privilege policy.']
 ],
 '02':[
  ['AMI / user data','Base image / launch bootstrap','Use an image for the baseline and user data for startup configuration.','User data is not a safe place for secrets.'],
  ['Security group / source SG','Stateful traffic filter / tier identity','Allow only the required port from the intended source group.','Security-group rules do not create network routes.'],
  ['Instance Connect / Session Manager / SSH','SSH key delivery / managed session / direct network SSH','Check IAM, agent and network prerequisites for the selected access path.','Session Manager can avoid inbound port 22.'],
  ['Savings Plans / RI / Spot','Spend commitment / term discount / interruptible capacity','Separate price discounts from interruption tolerance and capacity needs.','A Savings Plan does not reserve capacity.'],
  ['Common access ports','SSH 22 / HTTP 80 / HTTPS 443 / RDP 3389','Open only the protocol and trusted source the workload needs.','A reachable port still requires a route and a listening service.'],
  ['Capacity Reservation / Dedicated Host','AZ capacity / physical host','Reserve capacity when needed; choose a host for licensing or isolation.','A Regional RI does not reserve AZ capacity.']
 ],
 '03':[
  ['EBS / instance store / EFS','Persistent block / local scratch / shared NFS','Choose by data persistence, attachment and multi-AZ sharing needs.','Instance store data can be lost on stop or termination.'],
  ['Snapshot / AMI','Volume recovery point / launchable instance image','Restore data from a snapshot; launch a configured instance from an AMI.','A snapshot does not capture live process state.'],
  ['Archive / Recycle Bin / Fast Snapshot Restore','Retention / deletion recovery / low first-read latency','Choose each independent snapshot control for its recovery objective.','Archived snapshots must be restored before volume creation.'],
  ['gp3 / gp2 / io2 / st1 / sc1','General SSD / provisioned IOPS / throughput or colder HDD','Match the storage type and performance lever to the I/O pattern.','HDD volume types are not boot volumes.'],
  ['EFS Standard / One Zone / IA / Archive','Multi-AZ or single-AZ resilience / frequent or infrequent access','Pick the resilience boundary first, then apply lifecycle transitions for access frequency.','One Zone sacrifices AZ-loss resilience; retrieval charges and minimum durations can apply.'],
  ['EBS Multi-Attach / EFS','Shared block in one AZ / shared files across clients','Use a cluster-aware file system for concurrent EBS writers; EFS for NFS sharing.','Multi-Attach is not a general file-sharing substitute.']
 ],
 '05':[
  ['RDS Multi-AZ / read replica','Availability and failover / read scaling','Use a standby for resilience and a replica for read-heavy paths.','A standby is not normally a read target in the classic deployment.'],
  ['RDS Proxy / storage autoscaling','Connection pooling / increasing allocated storage','Pool short-lived application connections; set a storage maximum for growth.','Storage autoscaling does not add database compute or shrink storage.'],
  ['ElastiCache / MemoryDB','In-memory cache / durable Redis-compatible primary database','Choose cache-aside or write-through with invalidation and TTL.','TTL and eviction do not guarantee strict consistency.'],
  ['GetItem / Query / Scan','Full key / partition-key range / broad read','Model primary and index keys around the application query.','A filter expression does not remove the read work of a Scan.'],
  ['Provisioned / on-demand','Configured RCU/WCU / request-based capacity','Account for item size, consistency, hot keys and GSI write capacity.','On-demand can still throttle for hot partitions or other limits.'],
  ['Conditional write / transaction','One-item state check / atomic multi-item operation','Use version conditions for optimistic locking; transactions for coordinated items.','A failed condition needs application conflict handling.'],
  ['Streams / TTL / DAX','Change records / asynchronous expiry / read cache','Use idempotent event handlers and distinguish expiry from an exact scheduler.','A stream is not a backup, and DAX is not a change log.']
 ],
 '06':[
  ['Public / private hosted zone','Internet DNS / associated VPC DNS','Choose the visibility boundary and check VPC DNS settings.','A private hosted zone does not make an endpoint publicly resolvable.'],
  ['CNAME / Route 53 alias','Name-to-name / AWS resource target','Use an A or AAAA alias for supported resources at the zone apex.','A CNAME cannot be created at the zone apex.'],
  ['Weighted / latency / failover','Traffic proportions / latency region / active-passive','Set records, health checks and TTL to match the rollout or recovery goal.','DNS caching means changes are not instantaneous.'],
  ['Geolocation / geoproximity / IP-based','Client geography / resource proximity with bias / source CIDR','Choose from the actual routing signal and configure a default as needed.','IP-based routing uses defined CIDR collections, not geographic lookup.'],
  ['Security group / network ACL','Stateful ENI rules / stateless subnet rules','Open the required request and return paths at the right boundary.','A security group cannot deny explicitly; a NACL can.'],
  ['Gateway / interface endpoint / NAT','Prefix-list route / private ENI and DNS / IPv4 internet egress','Check route-table association, endpoint DNS and security group, or NAT public-subnet path.','An endpoint is service-specific; NAT does not provide private endpoint access.'],
  ['VPC peering / VPN / Direct Connect','VPC link / encrypted internet tunnel / private circuit','Choose for topology and transport, then configure both directions of routing.','Peering is nontransitive; Direct Connect is not encrypted by default.'],
  ['Flow Logs / application logs','IP flow metadata / request or code detail','Use both to debug SDK timeouts and rejected traffic.','Flow Logs do not include application payloads.'],
  ['EC2 local storage / EFS / RDS','Instance-local files / shared uploads / relational data','Keep replaceable web nodes stateless and store shared state appropriately.','An EFS mount target is per AZ; RDS Multi-AZ is for database availability.'],
  ['LAMP stack on EC2','Linux and Apache web server / PHP application / MySQL in RDS','Store local OS and software files on an EC2 EBS root volume; use EFS for shared WordPress uploads and optional ElastiCache for cache or sessions.','Per-instance EBS volumes are not a shared upload store for scaled web nodes.']
 ],
 '04':[
  ['ALB / NLB / GWLB','Layer 7 HTTP / transport flows / appliance insertion','Choose from protocol and request-routing or inspection needs.','NLB does not evaluate ALB host/path listener rules.'],
  ['Listener / rule / target group','Entry protocol / request decision / healthy destinations','Set rule priority, target group health checks and a default action.','A healthy target still needs reachable security-group and network paths.'],
  ['Sticky cookie / shared session store','Target affinity / durable session state','Use stickiness for locality and a shared store for failover resilience.','Affinity alone does not preserve state after target loss.'],
  ['Cross-zone / Multi-AZ','Target distribution / failure boundary','Spread capacity across AZs and examine cross-zone behavior and cost.','Cross-zone balancing does not create extra healthy capacity.'],
  ['Target tracking / step / scheduled / predictive','Metric target / threshold response / time / forecast','Select policy from signal and demand shape; configure min, max and warmup.','An ASG policy cannot exceed configured maximum capacity.'],
  ['Connection draining / instance refresh','In-flight request completion / controlled rollout','Allow deregistration time and verify new targets before old capacity leaves.','Launch success does not prove application readiness.']
 ]
};
export default function DvaModuleReference({moduleId}:{moduleId:string}){
 const entries=rows[moduleId];if(!entries)return null;
 return <section className="saa-reference" aria-label="Developer module decision reference"><div className="saa-reference-heading"><p>DEVELOPER DECISION REFERENCE</p><h2>Compare the choices</h2><span>Use these boundaries alongside the visual lessons.</span></div><div className="saa-reference-scroll" role="region" aria-label="Module comparison table" tabIndex={0}><table><thead><tr><th scope="col">Service / feature</th><th scope="col">Purpose</th><th scope="col">Choose and configure</th><th scope="col">Decision boundary</th></tr></thead><tbody>{entries.map(([name,purpose,choice,boundary])=><tr key={name}><th scope="row">{name}</th><td>{purpose}</td><td>{choice}</td><td>{boundary}</td></tr>)}</tbody></table></div></section>;
}
