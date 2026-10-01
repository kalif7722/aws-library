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

/** Describe the node's own responsibility in the scenario. Adjacency in a
 * diagram is context, not proof that one service sends data to the next. */
export function architectureNodeDetail(input:ArchitectureNodeDetailInput){
  const {label}=input;
  const sub=clean(input.sub);
  const previous=clean(input.previous||"the preceding architecture layer");
  const next=clean(input.next||"the next architecture layer");
  const context=`${label} ${sub}`.toLowerCase();

  if(has(context,/cloud armor|aws waf|web application firewall|front door waf|application gateway waf|network firewall|firewall policy|shield|ddos protection/))
    return `${label} evaluates each applicable request against the configured WAF, threat, rate-limit, or DDoS rules. Allowed traffic continues to the protected endpoint; matching traffic is blocked, challenged, or logged according to policy.`;
  if(has(context,/security hub|guardduty|defender for cloud|security command center|sentinel|inspector|detective|security finding|threat detection|posture/))
    return `${label} evaluates security signals and resource context for the workloads shown here, then creates or aggregates prioritized findings for investigation, remediation, and compliance tracking.`;
  if(has(context,/cloud logging|log analytics|cloudtrail|audit logs|flow logs|service logs|application logs/))
    return `${label} collects and retains the logs produced by the services in this scenario so operators can search events, troubleshoot requests, build log-based alerts, and preserve audit evidence.`;
  if(has(context,/cloudwatch|azure monitor|application insights|operations suite|cloud monitoring|metrics|telemetry|observability|path \/ service health/))
    return `${label} collects health and performance metrics for the resources in this scenario, evaluates alert conditions, and presents dashboards that help operators detect availability, latency, or capacity problems.`;
  if(has(context,/iam|identity center|entra|active directory|identity platform|authentication|authorization|authoriz|permission|role session|sts|service account|workload identity/))
    return `${label} determines which users and workload identities may invoke or administer the resources in this scenario. Its roles and policies enforce least-privilege access at each service boundary.`;
  if(has(context,/route 53|cloud dns|azure dns|dns zone|dns resolver/))
    return `${label} resolves the application's hostname and returns the endpoint the client should use, with routing or health policies influencing the answer where configured.`;
  if(has(context,/backup|snapshot|recovery vault|disaster recovery|site recovery|elastic disaster recovery|replica copy/))
    return `${label} creates and manages recoverable copies of the protected resources according to retention and recovery policy. During an incident, those copies support restore, recovery, or failover procedures.`;
  if(has(context,/kms|key vault|cloud key management|certificate|private ca|secret manager|secrets manager/))
    return `${label} protects and supplies the keys, certificates, or secrets required by authorized services in this scenario, including encryption, TLS, credential retrieval, and rotation operations.`;
  if(has(context,/cloud run|app runner|azure container apps|container app|serverless backend/))
    return `${label} runs the containerized application backend for this scenario. It receives an HTTP request or event, starts or scales instances as needed, executes the application code, and returns or persists the application's result.`;
  if(has(context,/lambda|cloud functions|azure functions|function app|serverless function/))
    return `${label} runs the event-driven function used in this scenario. The configured trigger invokes the code, which performs the application task and returns or stores the result defined by that function.`;
  if(has(context,/gke|eks|aks|kubernetes|container backend|container cluster/))
    return `${label} schedules and operates the containerized workload in this scenario, maintaining the requested replicas, service networking, rollout state, and recovery of failed application instances.`;
  if(has(context,/ec2|compute engine|virtual machine|azure vm|vm instance|instance group|virtual machines/))
    return `${label} provides the virtual-machine compute that hosts the application or worker shown here. The software on the instance handles the request or job while the platform supplies the configured CPU, memory, network, and lifecycle controls.`;
  if(has(context,/s3|blob storage|cloud storage|data lake|file system|efs|fsx|managed disk|persistent disk|bucket|archive|object storage/))
    return `${label} durably stores ${sub.toLowerCase()} for this scenario. Authorized applications write or retrieve the required objects, files, or blocks according to its access, lifecycle, and resilience configuration.`;
  if(has(context,/rds|aurora|dynamodb|cosmos|sql database|cloud sql|spanner|bigtable|firestore|database|data store|system of record/))
    return `${label} persists and queries ${sub.toLowerCase()} for the application in this scenario. It applies the selected transaction, consistency, indexing, availability, and scaling model when serving reads and writes.`;
  if(has(context,/load balancer|application gateway|traffic manager|front door|cloudfront|cloud cdn|cdn|api gateway|api management/))
    return `${label} accepts the supported client request, applies TLS, routing, and health rules, then selects an eligible backend such as ${next}.`;
  if(has(context,/eventbridge|event grid|pub\/sub|sns|eventarc|router|routing|topic/))
    return `${label} matches or publishes events generated in this scenario and delivers each event to the configured subscribers or targets using its filtering and delivery rules.`;
  if(has(context,/sqs|service bus|queue|kinesis|event hubs|stream|kafka|msk|pubsub/))
    return `${label} buffers or retains ${sub.toLowerCase()} so producers and consumers can scale and recover independently. Consumers in ${next} pull or receive records under the service's delivery and ordering rules.`;
  if(has(context,/step functions|logic apps|durable functions|workflows|orchestrat/))
    return `${label} coordinates the sequence, state, retries, and failure paths between ${previous} and ${next}. The participating services perform the work; this node controls when each step runs.`;
  if(has(context,/nat gateway|internet gateway|transit gateway|virtual network gateway|vpn gateway|cloud router|interconnect|expressroute|direct connect|private link|privatelink|private service connect/))
    return `${label} provides the configured network path between ${previous} and ${next}, applying the service's routing, address-translation, advertisement, or private-connectivity behavior.`;
  if(has(context,/athena|bigquery|synapse|redshift|data warehouse|analytics|query engine/))
    return `${label} runs the query or analytical operation required in this scenario against the referenced datasets, applying its execution, scaling, and result-delivery model.`;
  if(has(context,/glue|dataflow|data factory|dataproc|emr|spark|etl|transform|processing/))
    return `${label} performs the ${sub.toLowerCase()} step shown in this scenario, reading the required source records, applying the configured processing logic, and writing the defined output.`;
  if(has(context,/user|client|caller|producer|application users|internet users|business users|analyst|developer/))
    return `${label} represents the actor or application that initiates or consumes this scenario through ${sub.toLowerCase()}. Its request or event supplies the business context for the services shown in the architecture.`;
  if(input.position==="first")
    return `${label} provides ${sub.toLowerCase()} at the start of the “${clean(input.architecture)}” scenario. This node represents the source, request, event, or configuration that initiates the example.`;
  if(input.position==="last")
    return `${label} represents ${sub.toLowerCase()} as the final consumer, stored outcome, operational evidence, or user-visible result in this scenario.`;
  return `${label} is responsible for ${sub.toLowerCase()} within the ${clean(input.stage)} stage of this architecture. It applies that capability to the workload shown in the example.`;
}
