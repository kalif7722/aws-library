import {financialNodeDetail} from "./financial-architectures";
import {reviewedWorkloadNodeDetail} from "./reviewed-workload-architectures";
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
  const workloadDetail=reviewedWorkloadNodeDetail(input.architecture,input.label);
  if(workloadDetail)return workloadDetail;
  const explicit=financialNodeDetail(input.architecture,input.label);
  if(explicit)return explicit;
  const {label}=input;
  const sub=clean(input.sub);
  const previous=clean(input.previous||"the preceding architecture layer");
  const next=clean(input.next||"the next architecture layer");
  const name=label.toLowerCase();
  // A subtitle such as "metrics" or "database migration" must not change
  // the identity of a named cloud service. Generic nodes retain role matching.
  const context=/^(?:aws |amazon |azure |google |cloud run\b|cloud functions\b|cloud sql\b|cloud storage\b|bigquery\b|elastic load balancing\b)/i.test(label)?name:`${label} ${sub}`.toLowerCase();

  // Official service and boundary names take precedence over subtitle inference.
  if(has(name,/^aws budgets$/))
    return "AWS Budgets evaluates actual or forecast cost and usage against a configured budget and sends threshold notifications to its configured recipients. Resource restrictions require a separately configured budget action and execution role; notifications alone do not cap spending.";
  if(has(name,/^aws cost explorer$/))
    return "Cost Explorer queries billing history using the selected dates, filters, and grouping dimensions to expose the contributors to spending changes. Supported forecast views estimate future spend; remediation is performed separately by the resource owner.";
  if(has(name,/elastic load balancing|application load balancer|network load balancer|gateway load balancer|azure load balancer|cloud load balancing/))
    return `${label} checks target health and distributes each connection or request only to eligible application targets. Listener, protocol, routing, and balancing settings determine which healthy instance, container, pod, or IP receives the traffic.`;
  if(has(name,/private wan|internet|corporate network|on-premises network|enterprise network/))
    return `${label} is the external network path used by administrators, workloads, or remote sites to reach the platform endpoints shown here. Routing, VPN or private connectivity, DNS, proxy, and firewall policy determine whether control traffic and image pulls can reach those endpoints.`;
  if(has(name,/amazon q developer/))
    return `${label} uses the developer's IDE, repository, and AWS resource context to explain code, propose changes, generate tests, investigate failures, or prepare bounded AWS actions while respecting the caller's permissions.`;
  if(has(name,/amazon q business apps/))
    return `${label} turns natural-language requirements into a governed business application that can search approved enterprise data and run the configured workflow without exposing sources the user cannot access.`;
  if(has(name,/amazon q business|^amazon q$/))
    return `${label} interprets the user's question, retrieves only enterprise content the user is permitted to access, and uses that evidence to generate a grounded answer with source citations or an approved business action.`;

  if(has(context,/cloud armor|aws waf|web application firewall|front door waf|application gateway waf|network firewall|firewall policy|shield|ddos protection/))
    return `${label} evaluates each applicable request against the configured WAF, threat, rate-limit, or DDoS rules. Allowed traffic continues to the protected endpoint; matching traffic is blocked, challenged, or logged according to policy.`;
  if(has(context,/security hub|guardduty|defender for cloud|security command center|sentinel|inspector|detective|security finding|threat detection|posture/))
    return `${label} evaluates security signals and resource context, then creates or aggregates prioritized findings for investigation, remediation, and compliance tracking.`;
  if(has(context,/cloud logging|log analytics|cloudtrail|audit logs|flow logs|service logs|application logs/))
    return `${label} collects and retains service logs so operators can search events, troubleshoot requests, build log-based alerts, and preserve audit evidence.`;
  if(has(context,/cloudwatch|azure monitor|application insights|operations suite|cloud monitoring|metrics|telemetry|observability|path \/ service health/))
    return `${label} collects health and performance metrics, evaluates alert conditions, and presents dashboards that help operators detect availability, latency, or capacity problems.`;
  if(has(context,/iam|identity center|entra|active directory|identity platform|authentication|authorization|authoriz|permission|role session|sts|service account|workload identity/))
    return `${label} determines which users and workload identities may invoke or administer these resources. Its roles and policies enforce least-privilege access at each service boundary.`;
  if(has(context,/route 53|cloud dns|azure dns|dns zone|dns resolver/))
    return `${label} resolves the application's hostname and returns the endpoint the client should use, with routing or health policies influencing the answer where configured.`;
  if(has(context,/backup|snapshot|recovery vault|disaster recovery|site recovery|elastic disaster recovery|replica copy/))
    return `${label} creates and manages recoverable copies of the protected resources according to retention and recovery policy. During an incident, those copies support restore, recovery, or failover procedures.`;
  if(has(context,/kms|key vault|cloud key management|certificate|private ca|secret manager|secrets manager/))
    return `${label} protects and supplies the keys, certificates, or secrets required by authorized services, including encryption, TLS, credential retrieval, and rotation operations.`;
  if(has(context,/cloud run|app runner|azure container apps|container app|serverless backend/))
    return `${label} runs the containerized application backend. It receives an HTTP request or event, starts or scales instances as needed, executes the application code, and returns or persists the application's result.`;
  if(has(context,/strands agents|bedrock agents|vertex ai agent|agent engine|agent runtime|managed agent|ai agent/))
    return `${label} runs the agent loop for this workflow: it receives the user's goal, invokes the configured model, selects approved tools or knowledge sources, and returns the grounded response or business action produced by those calls.`;
  if(has(context,/bedrock|vertex ai|azure openai|model endpoint|foundation model|model inference|generative ai/))
    return `${label} performs the model inference requested by the application in this workflow, using the supplied prompt and context to generate the response that the calling service validates and returns.`;
  if(has(context,/lambda|cloud functions|azure functions|function app|serverless function/))
    return `${label} runs the event-driven function. The configured trigger invokes the code, which performs the application task and returns or stores the result defined by that function.`;
  if(has(context,/gke|eks|aks|kubernetes|container backend|container cluster/))
    return `${label} schedules and operates the containerized workload, maintaining the requested replicas, service networking, rollout state, and recovery of failed application instances.`;
  if(has(context,/ec2|compute engine|virtual machine|azure vm|vm instance|instance group|virtual machines/))
    return `${label} provides the virtual-machine compute that hosts the application or worker shown here. The software on the instance handles the request or job while the platform supplies the configured CPU, memory, network, and lifecycle controls.`;
  if(has(context,/systems manager|run command|session manager|patch manager/))
    return `${label} provides the session access, remote command execution, and patch operations used to manage the compute resources in “${clean(input.architecture)}”.`;
  if(has(context,/s3|blob storage|cloud storage|data lake|file system|efs|fsx|managed disk|persistent disk|bucket|archive|object storage/))
    return `${label} durably stores ${sub.toLowerCase()}. Authorized applications write or retrieve the required objects, files, or blocks according to its access, lifecycle, and resilience configuration.`;
  if(has(context,/rds|aurora|dynamodb|cosmos|sql database|cloud sql|spanner|bigtable|firestore|database|data store|system of record/))
    return `${label} persists and queries ${sub.toLowerCase()} for the application. It applies the selected transaction, consistency, indexing, availability, and scaling model when serving reads and writes.`;
  if(has(context,/load balanc|application gateway|traffic manager|front door|cloudfront|cloud cdn|cdn|api gateway|api management/))
    return `${label} accepts the supported client request, applies TLS, routing, and health rules, then selects an eligible backend such as ${next}.`;
  if(has(context,/eventbridge|event grid|pub\/sub|sns|eventarc|router|routing|topic/))
    return `${label} matches or publishes application events and delivers each event to the configured subscribers or targets using its filtering and delivery rules.`;
  if(has(context,/sqs|service bus|queue|kinesis|event hubs|stream|kafka|msk|pubsub/))
    return `${label} buffers or retains ${sub.toLowerCase()} so producers and consumers can scale and recover independently. Consumers in ${next} pull or receive records under the service's delivery and ordering rules.`;
  if(has(context,/step functions|logic apps|durable functions|workflows|orchestrat/))
    return `${label} coordinates the sequence, state, retries, and failure paths between ${previous} and ${next}. The participating services perform the work; this node controls when each step runs.`;
  if(has(context,/private wan|nat gateway|internet gateway|transit gateway|virtual network gateway|vpn gateway|cloud router|interconnect|expressroute|direct connect|private link|privatelink|private service connect/))
    return `${label} provides the configured network path between ${previous} and ${next}, applying the service's routing, address-translation, advertisement, or private-connectivity behavior.`;
  if(has(context,/vpc|virtual network|subnet|network segment|security group|network acl/))
    return `${label} defines the isolated network boundary used by this workload, including its address range, subnets, routes, and traffic controls for the resources placed inside it.`;
  if(has(context,/organizations|management group|folder|landing zone|control tower|resource hierarchy/))
    return `${label} establishes the account, subscription, or project hierarchy for this design and applies inherited governance controls to the workloads placed beneath that scope.`;
  if(has(context,/codepipeline|cloud build|azure devops|github actions|ci\/cd|build|deploy|release pipeline/))
    return `${label} builds, validates, and promotes the versioned application artifact through this delivery workflow, stopping or rolling back when a configured quality or deployment check fails.`;
  if(has(context,/migration service|database migration|migration hub|transfer appliance|datasync|storage transfer/))
    return `${label} copies the selected source data into the target service, tracks transfer progress, and supports validation or incremental synchronization before the workload is cut over.`;
  if(has(context,/open search|opensearch|elasticsearch|search index|vector search/))
    return `${label} indexes the records produced by this workflow and serves low-latency text, filter, or vector queries over that index to the consuming application.`;
  if(has(context,/athena|bigquery|synapse|redshift|data warehouse|analytics|query engine/))
    return `${label} runs the required query or analytical operation against the referenced datasets, applying its execution, scaling, and result-delivery model.`;
  if(has(context,/glue|dataflow|data factory|dataproc|emr|spark|etl|transform|processing/))
    return `${label} reads the required source records, applies the configured ${sub.toLowerCase()} logic, and writes the defined output for downstream use.`;
  if(has(context,/ecr|artifact registry|container registry|image registry/))
    return `${label} stores the versioned container image used by the runtime in this workflow. The deployment pulls the approved image digest from this registry before starting application instances.`;
  if(has(context,/redis|elasticache|memorystore|cache/))
    return `${label} serves frequently requested application data from memory so the workload can avoid repeated database or API reads. The application refreshes or invalidates entries according to its cache policy.`;
  if(has(context,/policy engine|guardrail|organization policy|service control policy|azure policy/))
    return `${label} evaluates the applicable request or resource configuration against the rules defined for this workflow and enforces the resulting allow, deny, or compliance decision.`;
  if(has(context,/notification|notify|email|sms|alert|sns topic/))
    return `${label} delivers the workflow's notification to the configured recipients or subscribers after the triggering condition occurs, using the selected channel and delivery policy.`;
  if(has(context,/output|result|response|consumer|downstream|business application/))
    return `${label} consumes the completed ${sub.toLowerCase()} produced by this workflow and uses it for the stated business response, user experience, or follow-on operation.`;
  if(has(context,/user|client|caller|producer|application users|internet users|business users|analyst|developer/))
    return `${label} represents the actor or application that initiates or consumes this scenario through ${sub.toLowerCase()}. Its request or event supplies the business context for the services shown in the architecture.`;
  if(input.position==="first")
    return `${label} initiates this workflow by supplying ${sub.toLowerCase()}. That input gives the next service the request, event, or data it needs to begin its assigned operation.`;
  if(input.position==="last")
    return `${label} receives or represents the completed ${sub.toLowerCase()} from this workflow, making the processed result available to its intended user or downstream system.`;
  return `${label} owns ${sub.toLowerCase()} at this point in the flow. Its configuration defines the request, data, or control signal it accepts and the concrete outcome it makes available to the workload.`;
}
