import sections from './sap-precision-reference.json';
import comparisons from './sap-service-comparisons.json';
import './SapS3Reference.css';
import './SapPrecisionReference.css';

function ServiceIcon({icon}:{icon:string}) {
 return <img className="sap-service-icon" src={`/course-visuals/aws-service-icons/${icon}.svg`} width="40" height="40" alt="" loading="lazy" decoding="async"/>;
}
function detailIcon(moduleId:string,index:number,topic:string) {
 if(moduleId==='20'){
  if(/SSM |Runtime retrieval|Versioned references/.test(topic))return 'AWS-Systems-Manager';
  if(/SCP /.test(topic))return 'AWS-Organizations';
  if(/Config evaluation/.test(topic))return 'AWS-Config';
  if(/Catalog|Portfolio|Launch role/.test(topic))return 'AWS-Service-Catalog';
  if(/SAM /.test(topic))return 'AWS-CloudFormation';
  if(/CDK /.test(topic))return 'AWS-Cloud-Development-Kit';
  if(/Secret|Rotation/.test(topic))return 'AWS-Secrets-Manager';
  return ['AWS-CloudFormation','AWS-CloudFormation','AWS-CloudFormation','AWS-Service-Catalog','AWS-CloudFormation'][index];
 }
 if(moduleId==='19'){
  if(/AgentCore|Gateway|Inbound|Outbound|User versus workload|Target permissions|Cross-boundary|Resource scope|Telemetry defaults/.test(topic))return 'Amazon-Bedrock-AgentCore';
  if(/Lambda fulfillment|Action schema/.test(topic))return 'AWS-Lambda';
  if(/Callback token|Stale approvals|Idempotency|Denial and timeout/.test(topic))return 'AWS-Step-Functions';
  if(/Traces and logs/.test(topic))return 'AWS-CloudTrail';
  return ['Amazon-Bedrock','Amazon-Bedrock-AgentCore','Amazon-Bedrock','AWS-Step-Functions'][index];
 }
 if(moduleId==='18'){
  if(/Rekognition|Moderation|Face|A2I/.test(topic))return 'Amazon-Rekognition';
  if(/Textract|Extraction|Document security/.test(topic))return 'Amazon-Textract';
  if(/Transcribe|Transcript/.test(topic))return 'Amazon-Transcribe';
  if(/Polly/.test(topic))return 'Amazon-Polly';
  if(/Translate/.test(topic))return 'Amazon-Translate';
  if(/Lex/.test(topic))return 'Amazon-Lex';
  if(/Connect|Fallback/.test(topic))return 'Amazon-Connect';
  if(/Comprehend Medical|DetectPHI/.test(topic))return 'Amazon-Comprehend-Medical';
  if(/Comprehend|Entities|Sentiment/.test(topic))return 'Amazon-Comprehend';
  if(/Personalize|Recommendation/.test(topic))return 'Amazon-Personalize';
  if(/Forecast/.test(topic))return 'Amazon-Forecast';
  if(/Kendra/.test(topic))return 'Amazon-Kendra';
  if(/SageMaker|Canvas/.test(topic))return 'Amazon-SageMaker';
  return ['Amazon-Rekognition','Amazon-Transcribe','Amazon-Comprehend','Amazon-SageMaker','Amazon-Bedrock'][index];
 }
 if(moduleId==='17'){
  if(index===3&&/Detective|Investigation scope/.test(topic))return 'Amazon-Detective';
  if(index===5){
   if(/VPC Flow/.test(topic))return 'Amazon-Virtual-Private-Cloud';
   if(/ALB|CLB|NLB/.test(topic))return 'Elastic-Load-Balancing';
   if(/Public DNS|Resolver/.test(topic))return 'Amazon-Route-53';
   if(/CloudFront/.test(topic))return 'Amazon-CloudFront';
   if(/S3 server/.test(topic))return 'Amazon-S3';
   if(/Config/.test(topic))return 'AWS-Config';
  }
  if(index===6){
   if(/Security Lake/.test(topic))return 'Amazon-Security-Lake';
   if(/Subscriber/.test(topic))return 'AWS-Lake-Formation';
   if(/Artifact/.test(topic))return 'AWS-Artifact';
   if(/Residency|Region key/.test(topic))return 'AWS-Organizations';
   if(/Threat model/.test(topic))return 'AWS-Security-Hub';
   if(/Access Analyzer|Response privilege/.test(topic))return 'AWS-Identity-and-Access-Management';
   if(/AI /.test(topic))return 'Amazon-Bedrock';
  }
 }
 const defaults=moduleId==='17'?['Amazon-Inspector','AWS-Config','Amazon-GuardDuty','AWS-Security-Hub','Amazon-Macie','AWS-CloudTrail','AWS-Audit-Manager']:moduleId==='16'?['AWS-Data-Exchange','Amazon-Kinesis','Amazon-Data-Firehose','AWS-Batch','Amazon-EMR','Amazon-Redshift']:moduleId==='15'?['Amazon-CloudFront','Amazon-CloudFront','Amazon-CloudFront','AWS-Lambda','AWS-Global-Accelerator']:moduleId==='14'?['AWS-Step-Functions','Amazon-Simple-Queue-Service','Amazon-Simple-Notification-Service','Amazon-EventBridge','Amazon-EventBridge']:moduleId==='13'?['AWS-Lambda','AWS-Lambda','AWS-Lambda','Amazon-API-Gateway','Amazon-API-Gateway','Amazon-API-Gateway','AWS-AppSync']:moduleId==='11'?['Amazon-RDS','Amazon-Aurora','Amazon-DynamoDB','Amazon-ElastiCache','Amazon-OpenSearch-Service']:['Amazon-Elastic-Container-Service','Amazon-Elastic-Container-Registry','Amazon-Elastic-Kubernetes-Service','AWS-Cloud-Map','AWS-App-Runner'];
 if(moduleId==='15'&&/Global Accelerator|Anycast|Endpoint|Traffic dial|Client IP|Inspection caveat/.test(topic))return 'AWS-Global-Accelerator';
 if(moduleId==='15'&&/Lambda|Origin rewrite/.test(topic))return 'AWS-Lambda';
 if(moduleId==='15'&&/S3|OAC|OAI/.test(topic))return 'Amazon-Simple-Storage-Service';
 if(moduleId==='15'&&/ALB/.test(topic))return 'Elastic-Load-Balancing';
 if(moduleId==='14'&&/Amazon MQ|Migration|Broker/.test(topic))return 'Amazon-MQ';
 if(moduleId==='14'&&/Scheduler|Schedule delivery/.test(topic))return 'Amazon-EventBridge';
 if(moduleId==='14'&&/Pipes/.test(topic))return 'Amazon-EventBridge';
 if(moduleId==='13'&&/AppSync/.test(topic))return 'AWS-AppSync';
 if(moduleId==='13'&&/X-Ray/.test(topic))return 'AWS-X-Ray';
 if(moduleId==='13'&&/CodeDeploy/.test(topic))return 'AWS-CodeDeploy';
 if(/DAX/.test(topic))return 'dax';
 if(/DocumentDB/.test(topic))return 'Amazon-DocumentDB';
 if(/LiveAnalytics|Time-series/.test(topic))return 'Amazon-Timestream';
 if(/EKS Anywhere/.test(topic))return 'Amazon-EKS-Anywhere';
 if(/ECS Anywhere|Hybrid host/.test(topic))return 'Amazon-ECS-Anywhere';
 if(/Migration candidate/.test(topic))return 'Amazon-Elastic-Container-Service';
 if(/Lattice/.test(topic))return 'Amazon-VPC-Lattice';
 if(/App Mesh/.test(topic))return 'AWS-App-Mesh';
 if(/Service Connect/.test(topic))return 'Amazon-Elastic-Container-Service';
 if(/Fargate/.test(topic))return 'AWS-Fargate';
 if(/FSx/.test(topic))return 'Amazon-FSx-for-Lustre';
 return defaults[index];
}
export default function SapPrecisionReference({moduleId}:{moduleId:string}) {
 const own=sections.filter(section=>section.moduleId===moduleId);
 if(!own.length)return null;
 const enhanced=comparisons.some(group=>group.moduleId===moduleId);
 const groups=comparisons.filter(group=>group.moduleId===moduleId);
 const count=groups.reduce((sum,group)=>sum+group.rows.length,0);
 const detailCount=own.reduce((sum,section)=>sum+section.rows.length,0);
 return <section className={`sap-s3-ref${enhanced?' sap-precision-enhanced':''}`} id="module-precision-reference" aria-label="Detailed service comparison">
  <header><p className="sap-s3-kicker">DETAILS AND EXCEPTIONS · REVIEWED 1 NOVEMBER 2026</p><h2>{enhanced?'Compare the services. Master the details.':'Inspect the limits. Keep the exceptions.'}</h2><p>{enhanced?'Choose the right service, then check the operating model, security gates, recovery behavior and exceptions. These comparisons cover the core services, service features and supporting integrations taught in this module.':'Use these readable comparisons alongside the visual lessons. Numerical maxima depend on the selected Region, instance, configuration and current service documentation.'}</p>
  {enhanced&&<><div className="sap-reference-stats"><span><strong>{count}</strong> service &amp; feature comparisons</span><span><strong>{detailCount}</strong> precision details</span><span><strong>AWS</strong> official architecture icons</span></div><nav aria-label="Comparison sections">{groups.map((group,index)=><a key={group.title} href={`#sap-${moduleId}-compare-${index}`}>{group.title}</a>)}<a href={`#sap-${moduleId}-precision`}>Limits &amp; exceptions ↓</a></nav></>}
  </header>
  {enhanced&&<div className="sap-comparison-guide"><strong>Read across to make a decision.</strong> Compare purpose → operating contract → caveat. Supporting services are building blocks, not interchangeable alternatives. Feature rows use the parent AWS service icon. On a small screen, scroll each table sideways; service names stay visible.</div>}
  {groups.map((group,index)=><details className="sap-comparison-section" key={group.title} id={`sap-${moduleId}-compare-${index}`} open><summary><span className="sap-summary-label"><span className="sap-section-number">{String(index+1).padStart(2,'0')}</span>{group.title}</span><span className="sap-row-count">{group.rows.length} comparisons</span></summary><div className="sap-s3-detail"><div className="sap-s3-table sap-service-table" role="region" aria-label={`${group.title} comparison table, scroll horizontally`} tabIndex={0}><table><caption>{group.title} · Module {moduleId}<span>Compare purpose, responsibilities and decision-changing exceptions.</span></caption><thead><tr><th scope="col">AWS service / feature</th><th scope="col">Choose it for</th><th scope="col">Operating model &amp; controls</th><th scope="col">Exceptions &amp; exam traps</th></tr></thead><tbody>{group.rows.map(row=><tr key={row.service}><th scope="row"><span className="sap-service-label"><ServiceIcon icon={row.icon}/><span>{row.service}</span></span></th><td>{row.choose}</td><td>{row.operations}</td><td className="sap-caveat">{row.watch}</td></tr>)}</tbody></table></div><div className="sap-reference-sources"><p>Primary AWS documentation</p>{group.sources.map(source=><a key={source} href={source} target="_blank" rel="noreferrer">{new URL(source).pathname.split('/').filter(Boolean).pop()?.replace(/\.html$/,'').replace(/[_.-]/g,' ')} ↗</a>)}</div></div></details>)}
  {enhanced&&<div className="sap-detail-heading" id={`sap-${moduleId}-precision`}><p className="sap-s3-kicker">THE PRECISION LAYER</p><h3>Limits, prerequisites &amp; operational exceptions</h3><p>Retain every qualification below alongside the visual lessons. Numerical maxima depend on Region, engine, version, deployment and configuration; linked AWS documentation is authoritative.</p></div>}
  {own.map((section,index)=><details key={section.title} open><summary>{enhanced?<><span className="sap-summary-label"><ServiceIcon icon={detailIcon(moduleId,index,'')}/>{section.title}</span><span className="sap-row-count">{section.rows.length} details</span></>:section.title}</summary><div className="sap-s3-detail"><div className="sap-s3-table sap-precision-table" role="region" aria-label={section.title} tabIndex={0}><table>{enhanced&&<caption>{section.title}<span>Exact boundaries that can change an architecture decision.</span></caption>}<thead><tr><th scope="col">Topic</th><th scope="col">Detail to retain</th></tr></thead><tbody>{section.rows.map(([topic,detail])=><tr key={topic}><th scope="row">{enhanced?<span className="sap-service-label"><ServiceIcon icon={detailIcon(moduleId,index,topic)}/><span>{topic}</span></span>:topic}</th><td>{detail}</td></tr>)}</tbody></table></div><div className={enhanced?'sap-reference-sources':''}><p>{enhanced?'Primary AWS documentation':'Primary references:'}</p>{section.sources.map((source,sourceIndex)=><a key={source} href={source} target="_blank" rel="noreferrer">{enhanced?new URL(source).pathname.split('/').pop()?.replace(/\.html$/,'').replace(/[_.-]/g,' '):`AWS reference ${sourceIndex+1}`} ↗ </a>)}</div></div></details>)}
  {enhanced&&<p className="sap-icon-attribution">Icons: <a href="https://aws.amazon.com/architecture/icons/" target="_blank" rel="noreferrer">official AWS Architecture Icons</a>, July 2026 package. Service features share their parent icon; an icon is not an availability guarantee. App Mesh retirement and restricted new-customer offerings are explicitly identified above.</p>}
 </section>;
}
