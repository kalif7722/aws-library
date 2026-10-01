export type ArchitectureNodeDetailInput={
  label:string;
  sub?:string;
  previous?:string;
  next?:string;
  stage?:string;
  architecture?:string;
  position?:"first"|"middle"|"last";
};

const has=(value:string,pattern:RegExp)=>pattern.test(value);
const clean=(value?:string)=>value?.trim().replace(/[.]+$/g,"")||"its configured responsibility";

/** Describe what a node actually does. Control-plane, security, storage and
 * observability services deliberately do not pretend to transform and forward
 * the application payload. */
export function architectureNodeDetail(input:ArchitectureNodeDetailInput){
  const {label}=input;
  const sub=clean(input.sub);
  const previous=clean(input.previous||"the preceding architecture layer");
  const next=clean(input.next||"the next architecture layer");
  const context=`${label} ${sub}`.toLowerCase();

  if(has(context,/cloud armor|aws waf|web application firewall|front door waf|application gateway waf|network firewall|firewall policy|shield|ddos protection/))
    return `${label} inspects traffic against its configured protection rules and either allows the original request to continue toward ${next} or blocks/challenges it. It enforces policy; it does not process the application payload and produce a new result.`;
  if(has(context,/security hub|guardduty|defender for cloud|security command center|sentinel|inspector|detective|security finding|threat detection|posture/))
    return `${label} evaluates security signals and resource context to create or aggregate findings for investigation. It observes the workload and drives response workflows; normal application traffic does not pass through it.`;
  if(has(context,/cloudwatch|cloudtrail|azure monitor|log analytics|application insights|operations suite|cloud logging|cloud monitoring|metrics|logs|telemetry|observability|audit/))
    return `${label} receives operational or audit telemetry from ${previous}, retains or analyzes it, and exposes evidence for dashboards, alerts, and investigation. It monitors the flow rather than forwarding its business data.`;
  if(has(context,/iam|identity center|entra|active directory|identity platform|authentication|authorization|authoriz|permission|role session|sts|service account|workload identity/))
    return `${label} verifies identity and applies access policy for this stage. It returns credentials or an allow/deny decision that lets authorized activity continue toward ${next}; it is not the application data-processing step.`;
  if(has(context,/route 53|cloud dns|azure dns|dns zone|dns resolver/))
    return `${label} resolves the requested name and returns the endpoint used for the connection. DNS selects where the client should connect; it does not carry the subsequent application traffic.`;
  if(has(context,/backup|snapshot|recovery vault|disaster recovery|site recovery|elastic disaster recovery|replica copy/))
    return `${label} creates and manages recoverable copies of ${previous} according to retention and recovery policy. Those copies are read during restore or failover; this protection path is separate from normal request processing.`;
  if(has(context,/kms|key vault|cloud key management|certificate|private ca|secret manager|secrets manager/))
    return `${label} supplies protected keys, certificates, or secrets when an authorized operation needs them. It supports the workload's trust boundary without becoming the destination for its business data.`;
  if(has(context,/s3|blob storage|cloud storage|data lake|file system|efs|fsx|managed disk|persistent disk|bucket|archive|object storage/))
    return `${label} durably stores ${sub.toLowerCase()} and serves authorized reads or writes from ${previous}. Data remains here until a consumer such as ${next} requests it; storage does not automatically push every object onward.`;
  if(has(context,/rds|aurora|dynamodb|cosmos|sql database|cloud sql|spanner|bigtable|firestore|database|data store|system of record/))
    return `${label} persists and queries ${sub.toLowerCase()} for authorized callers from ${previous}. It returns query or transaction results on request rather than acting as a passive forwarding hop to ${next}.`;
  if(has(context,/load balancer|application gateway|traffic manager|front door|cloudfront|cloud cdn|cdn|api gateway|api management/))
    return `${label} accepts the supported request, applies its routing and health rules, and sends permitted traffic to an eligible target in ${next}. It distributes requests; it does not perform the target application's business logic.`;
  if(has(context,/eventbridge|event grid|pub\/sub|sns|eventarc|router|routing|topic/))
    return `${label} matches or publishes events from ${previous} and delivers each event to the configured target in ${next}. Its responsibility is decoupled routing, not transforming the event into a business result.`;
  if(has(context,/sqs|service bus|queue|kinesis|event hubs|stream|kafka|msk|pubsub/))
    return `${label} buffers or retains ${sub.toLowerCase()} so producers and consumers can scale and recover independently. Consumers in ${next} pull or receive records under the service's delivery and ordering rules.`;
  if(has(context,/step functions|logic apps|durable functions|workflows|orchestrat/))
    return `${label} coordinates the sequence, state, retries, and failure paths between ${previous} and ${next}. The participating services perform the work; this node controls when each step runs.`;
  if(has(context,/nat gateway|internet gateway|transit gateway|virtual network gateway|vpn gateway|cloud router|interconnect|expressroute|direct connect|private link|privatelink|private service connect/))
    return `${label} provides the configured network path between ${previous} and ${next}, applying its routing or connectivity semantics. It carries permitted packets without interpreting the application's business content.`;
  if(input.position==="first")
    return `${label} initiates the “${clean(input.architecture)}” scenario by providing ${sub.toLowerCase()} to ${next}. This is the source or entry condition for the flow.`;
  if(input.position==="last")
    return `${label} uses the output available from ${previous} for ${sub.toLowerCase()}. It represents the consumer or final outcome rather than another forwarding step.`;
  return `${label} receives the required input from ${previous}, performs ${sub.toLowerCase()}, and makes its output available to ${next}.`;
}
