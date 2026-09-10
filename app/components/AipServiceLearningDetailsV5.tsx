"use client";

import { Activity, BrainCircuit, Database, FileText, Globe2, HardDrive, Laptop, MessageSquare, Network, Server, Shield, Users } from "lucide-react";
import { aipScope, guideAliases } from "../course-data";
import { awsArchitectureIcons, awsIconFallbackSrc, awsIconSrc, findAwsArchitectureIcon } from "../../lib/aws-architecture-icons";
import "./AthenaLearningDetails.css";
import "./AthenaAwsIcons.css";
import "./AipServiceLearningDetails.css";

type Kind = "user"|"internet"|"app"|"data"|"security"|"file"|"network"|"storage"|"ai"|"message"|"monitor";
type Node = { label:string; sub:string; kind?:Kind };
type Arch = { title:string; note:string; left:Node[]; center:Node; right:Node[] };
type Entry = { service:string; category:string; alias?:string };

const normalize=(v:string)=>v.toLowerCase().replace(/\([^)]*\)/g," ").replace(/\b(amazon|aws)\b/g," ").replace(/[^a-z0-9]+/g," ").trim();
const entries:Entry[]=aipScope.flatMap(category=>category.services.map(service=>({service,category:category.title,alias:guideAliases[service]})));
const resolveEntry=(name:string)=>entries.find(x=>normalize(x.service)===normalize(name)||!!x.alias&&normalize(x.alias)===normalize(name));
export const aipDetailServices=new Set(entries.flatMap(x=>[x.service,x.alias].filter(Boolean) as string[]));
export const hasAipLearningDetails=(name:string)=>!!resolveEntry(name);
export const getAipLearningMeta=(name:string)=>{const e=resolveEntry(name);return e?{service:e.service,category:e.category,sections:["overview","concepts","architectures","use-cases","security","optimization","cost-models","comparison","memory-hook"]}:null};

const aws=(label:string,sub:string):Node=>({label,sub});
const pub=(kind:Kind,label:string,sub:string):Node=>({kind,label,sub});
const A=(title:string,note:string,left:Node[],center:Node,right:Node[]):Arch=>({title,note,left,center,right});

function architectureFor(service:string,category:string):Arch[]{
  if(service==="AWS Lambda") return [
    A("Event-driven serverless function","Requests and events invoke short-lived stateless compute while durable state stays outside the function.",[aws("Amazon API Gateway","Synchronous API"),aws("Amazon S3","Object event")],aws("AWS Lambda","Function"),[aws("Amazon DynamoDB","State"),aws("Amazon SQS","Async work"),pub("monitor","CloudWatch","Logs + metrics")]),
    A("GenAI tool function","Lambda is a good fit for deterministic tools and lightweight orchestration around managed model APIs.",[aws("Amazon Bedrock","Agent / model"),pub("app","Application","Tool request")],aws("AWS Lambda","Business action"),[pub("app","Enterprise API","Action target"),aws("AWS Secrets Manager","Credentials"),pub("monitor","AWS X-Ray","Trace")])
  ];
  if(service==="Amazon SQS") return [
    A("Buffered worker queue","The queue absorbs bursts and lets workers scale independently from producers.",[pub("app","Producers","Jobs / requests")],aws("Amazon SQS","Standard or FIFO queue"),[aws("AWS Lambda","Elastic consumer"),pub("message","Dead-letter queue","Poison messages"),pub("monitor","Queue age","Backlog signal")]),
    A("Ordered GenAI job processing","FIFO queues preserve order within message groups for controlled asynchronous work.",[pub("user","GenAI application","Queued job")],aws("Amazon SQS","FIFO queue"),[aws("AWS Lambda","Worker"),aws("Amazon DynamoDB","Job status"),aws("Amazon S3","Artifacts")])
  ];
  if(service==="Amazon SNS") return [
    A("Pub/sub fan-out","One publication fans out to independent subscribers.",[pub("app","Publisher","Business event")],aws("Amazon SNS","Topic"),[aws("Amazon SQS","Queue subscriber"),aws("AWS Lambda","Function subscriber"),pub("message","Email / HTTPS","External subscriber")]),
    A("Durable fan-out","SNS plus SQS isolates consumers that process at different speeds.",[aws("Amazon S3","Object event"),pub("app","Application","Domain event")],aws("Amazon SNS","Fan-out"),[aws("Amazon SQS","Consumer A"),aws("Amazon SQS","Consumer B"),pub("monitor","Delivery status","Retries / failures")])
  ];
  if(service==="Amazon EventBridge") return [
    A("Event-bus routing","Rules match events and route them to independent targets.",[pub("app","AWS / custom producers","Domain events"),pub("internet","SaaS source","Partner events")],aws("Amazon EventBridge","Event bus + rules"),[aws("AWS Lambda","Function target"),aws("Amazon SQS","Buffered target"),aws("AWS Step Functions","Workflow target")]),
    A("Scheduled automation","Scheduler or event rules trigger workflows without polling.",[pub("monitor","Schedule / event","Trigger")],aws("Amazon EventBridge","Route by pattern"),[aws("AWS Step Functions","Orchestrate"),aws("Amazon S3","Store output"),pub("monitor","DLQ / retry","Failure handling")])
  ];
  if(service==="AWS Step Functions") return [
    A("GenAI orchestration","A state machine coordinates model calls, tools, branches, waits and retries.",[pub("app","API / event","Start execution")],aws("AWS Step Functions","State machine"),[aws("AWS Lambda","Tool execution"),aws("Amazon Bedrock","Model inference"),aws("Amazon DynamoDB","Workflow state")]),
    A("Human approval workflow","Long-running workflows can pause for callbacks instead of holding compute open.",[pub("user","Requester","Submit task")],aws("AWS Step Functions","Wait + choice states"),[pub("message","Approval notification","Send token"),pub("user","Human reviewer","Callback"),pub("app","Final action","Continue / reject")])
  ];
  if(service==="Amazon Bedrock") return [
    A("Managed foundation-model application","Application code invokes a selected model while data, retrieval and guardrails remain separate controls.",[pub("user","User","Prompt"),pub("data","Application context","Optional grounding")],aws("Amazon Bedrock","Foundation model inference"),[pub("ai","Model response","Text / multimodal"),pub("security","Guardrails","Safety policy"),pub("monitor","Usage + latency","Operate")]),
    A("Grounded RAG application","Retrieval supplies relevant context before model generation.",[pub("user","User","Question"),aws("Amazon S3","Documents")],aws("Amazon Bedrock","Knowledge + model layer"),[pub("data","Vector retrieval","Relevant chunks"),aws("AWS Lambda","Application logic"),pub("file","Grounded answer","Citations / context")])
  ];
  if(service==="Amazon API Gateway") return [
    A("Serverless API front door","API Gateway manages routes, auth and throttling while compute/data remain independent backends.",[pub("user","Web/mobile client","HTTPS")],aws("Amazon API Gateway","Routes + auth + throttling"),[aws("AWS Lambda","Business logic"),aws("Amazon DynamoDB","State"),pub("monitor","CloudWatch","Access/execution logs")]),
    A("GenAI API boundary","Authentication and quotas sit before prompt orchestration and model invocation.",[pub("user","GenAI client","Request")],aws("Amazon API Gateway","Secured API"),[aws("AWS Lambda","Prompt/orchestration"),aws("Amazon Bedrock","Inference"),aws("AWS WAF","Request protection")])
  ];
  if(service==="Amazon CloudFront") return [
    A("Global content delivery","CloudFront caches content at edge locations and forwards misses to origins.",[pub("user","Global viewers","HTTPS")],aws("Amazon CloudFront","Edge cache / distribution"),[aws("Amazon S3","Static origin"),pub("app","Application origin","Dynamic content"),aws("AWS WAF","Edge protection")]),
    A("Protected GenAI web delivery","Static UI and API traffic can share a global edge entry with different origins.",[pub("user","Users","Web + API")],aws("Amazon CloudFront","Path-based origins"),[aws("Amazon S3","Web assets"),aws("Amazon API Gateway","API origin"),aws("AWS WAF","Filtering")])
  ];
  if(service==="Amazon S3") return [
    A("Object-storage data layer","Producers write objects while independent analytics and AI consumers read the same durable data.",[pub("app","Applications","Put/Get"),pub("data","Data ingestion","Files/events")],aws("Amazon S3","Buckets + objects"),[aws("AWS Glue","Catalog/ETL"),aws("Amazon Athena","SQL analytics"),aws("Amazon Bedrock","RAG source")]),
    A("Lifecycle and protection","Access frequency, replication, encryption and retention determine the storage design.",[pub("app","Writers","Object creation")],aws("Amazon S3","Lifecycle-managed bucket"),[pub("storage","Storage classes","Hot → archive"),aws("AWS KMS","Encryption"),pub("monitor","Versioning / replication","Resilience")])
  ];
  const role=category==="Developer Tools"?"developer delivery workflow":category==="Management and Governance"?"control-plane operations":category==="Security, Identity, and Compliance"?"security control":category==="Networking and Content Delivery"?"networking boundary":category==="Database"?"managed data layer":category==="Storage"?"durable storage layer":category==="Machine Learning"?"AI/ML capability":"application capability";
  return [
    A(`${service} core operating model`,`Shows the primary boundary of ${service} in a ${role}.`,[pub("user","Caller / operator","Request or intent"),pub("app","Upstream system","Input")],aws(service,role),[pub("app","Primary consumer","Uses result"),pub("monitor","Operations","Metrics / logs")]),
    A(`${service} production integration`,`Shows ${service} integrated with independently governed application, data and security layers.`,[pub("app","Application / workflow","Invoke or configure")],aws(service,"Managed AWS capability"),[pub("data","Data / service dependency","Integration"),pub("security","Access controls","IAM / policy"),pub("monitor","Audit / observability","Operate")])
  ];
}

const categoryConcepts:Record<string,string[]>={
  "Application Integration":["Know whether the service routes events, queues work, fans out messages or orchestrates state.","Retries, delivery semantics, ordering and idempotency are design decisions.","DLQs or explicit failure branches prevent poison work from disappearing."],
  "Compute":["Separate stateless compute from durable state.","Choose based on runtime duration, OS/container control, scaling and latency.","Concurrency, startup behavior and network placement affect production design."],
  "Containers":["Registry, orchestrator and compute capacity are separate layers.","Images should be immutable; runtime state and secrets stay outside the image.","Task/pod identity and autoscaling should match workload boundaries."],
  "Database":["Start from access patterns and consistency requirements.","Indexes/replicas improve reads but add cost and tradeoffs.","Backup, recovery and encryption are part of the design."],
  "Developer Tools":["Developer tools live in build/deploy/operator workflows, not usually the runtime request path.","Prefer repeatable automation and temporary credentials.","Artifacts, source, deployment targets and audit controls are separate concerns."],
  "Machine Learning":["Separate source data, model/AI capability, orchestration and evaluation.","Quality, latency, safety and cost must be measured together.","Grounding and retrieval are different from model inference."],
  "Management and Governance":["These services are primarily control-plane/operations capabilities.","Centralized governance often spans multiple accounts and workloads.","Metrics, logs, audit records, findings and automation solve different problems."],
  "Networking and Content Delivery":["Routing determines path; security determines permission.","DNS, edge, load balancing and private connectivity operate at different layers.","Availability requires health checks and multiple failure domains where appropriate."],
  "Security, Identity, and Compliance":["Authentication, authorization, encryption and detection are different controls.","Use least privilege and temporary credentials where possible.","Security findings need an ownership and remediation path."],
  "Storage":["Object, block and file storage expose different semantics.","Lifecycle and storage class should follow access frequency.","Replication and backup solve different recovery requirements."]
};

function PublicIcon({kind}:{kind:Kind}){const C=kind==="user"?Users:kind==="internet"?Globe2:kind==="data"?Database:kind==="security"?Shield:kind==="file"?FileText:kind==="network"?Network:kind==="storage"?HardDrive:kind==="ai"?BrainCircuit:kind==="message"?MessageSquare:kind==="monitor"?Activity:kind==="app"?Laptop:Server;return <div className="public-icon-disc"><C size={36}/></div>}
function iconFor(label:string){return findAwsArchitectureIcon(label)||awsArchitectureIcons.awsCloud}
function NodeView({node,featured=false}:{node:Node;featured?:boolean}){if(node.kind)return <div className={`dynamic-node public ${featured?"featured":""}`}><PublicIcon kind={node.kind}/><strong>{node.label}</strong><small>{node.sub}</small></div>;const icon=iconFor(node.label);return <div className={`dynamic-node ${featured?"featured":""}`}><div className="aws-icon-disc"><img src={awsIconSrc(icon)} data-fallback={awsIconFallbackSrc(icon)} onError={e=>{const i=e.currentTarget;const f=i.dataset.fallback;if(f&&i.src!==f){i.src=f;return}i.onerror=null}} alt={`${node.label} architecture icon`}/></div><strong>{node.label}</strong><small>{node.sub}</small></div>}
function Architecture({arch,index}:{arch:Arch;index:number}){return <section className="architecture-stage dynamic-architecture" id={`architecture-${index}`}><div className="section-cap"><div><p>ARCHITECTURE {String(index).padStart(2,"0")}</p><h3>{arch.title}</h3></div><span>{arch.note}</span></div><div className="dynamic-map"><div className="map-left">{arch.left.map((x,i)=><NodeView key={i} node={x}/>)}</div><div className="map-arrow">→</div><NodeView node={arch.center} featured/><div className="map-arrow">→</div><div className="map-branches">{arch.right.map((x,i)=><NodeView key={i} node={x}/>)}</div></div></section>}
function Cards({title,items,id}:{title:string;items:string[];id?:string}){return <section className="knowledge-card" id={id}><div className="knowledge-card-title"><span>◆</span><h3>{title}</h3></div><div className="knowledge-card-body"><div className="concept-stack">{items.map((x,i)=><p key={i}><b>{String(i+1).padStart(2,"0")}</b>{x}</p>)}</div></div></section>}

export default function AipServiceLearningDetails({serviceName}:{serviceName:string;summary?:string}){const e=resolveEntry(serviceName);if(!e)return null;const arches=architectureFor(e.service,e.category);const concepts=categoryConcepts[e.category]||["Know the service boundary and primary input/output.","Understand security, scaling and availability responsibilities.","Know when it is preferred over adjacent AWS services."];const useCases=arches.map(a=>`${a.title}: ${a.note}`);const security=[`Apply least-privilege access to ${e.service}.`,`Encrypt sensitive data in transit and at rest where supported.`,`Log the relevant API, workload or security events for audit and operations.`];const optimize=[`Optimize the dimension ${e.service} actually scales on—requests, concurrency, capacity, storage, transfer, model usage or managed resource size.`,`Use service metrics and limits to find saturation before adding capacity.`,`Keep application data, security and operational dependencies separate unless the service owns that responsibility.`];const cost=[`Primary ${e.service} usage or capacity is the first cost driver.`,`Supporting transfer, storage, logs, requests or downstream compute can become material.`,`Use on-demand, provisioned or committed models only where that service actually offers them.`];return <div className="service-knowledge aip-shared-learning"><div className="knowledge-intro"><div><p className="knowledge-kicker">VISUAL DEEP DIVE • {e.category.toUpperCase()}</p><h2>{e.service}</h2><p><b>What it is:</b> a managed AWS capability in {e.category}.</p></div></div><nav className="knowledge-jumps"><a href="#concepts">Concepts</a><a href="#architecture-1">Architectures</a><a href="#use-cases">Use cases</a><a href="#security">Security</a><a href="#cost-models">Cost</a><a href="#memory-hook">Exam hook</a></nav><div className="knowledge-grid" id="concepts"><Cards title="Core service concepts" items={concepts}/><Cards title="Where it fits" items={[`Category: ${e.category}.`,`Architecture 01 shows a common usage pattern.`,`Architecture 02 shows a second production integration pattern.`]}/></div>{arches.map((a,i)=><Architecture key={i} arch={a} index={i+1}/>)}<div className="knowledge-grid"><Cards id="use-cases" title="Practical use cases" items={useCases}/><Cards id="security" title="Security & governance" items={security}/><Cards title="Design & optimization" items={optimize}/><Cards id="cost-models" title="Cost model & drivers" items={cost}/><Cards title="Service comparison" items={[`Choose ${e.service} when its specific service boundary matches the requirement.`,`Compare adjacent services by control plane, data plane, execution model and ownership boundary.`,`Reject exam options that assign ${e.service} a responsibility it does not perform.`]}/><Cards id="memory-hook" title="Certification memory hook" items={[`Remember ${e.service} by its service boundary, not by category alone.`,`Read architecture arrows before the product name in exam questions.`,`If the service is shown owning unrelated storage, networking or orchestration, treat that as a warning sign.`]}/></div></div>}
