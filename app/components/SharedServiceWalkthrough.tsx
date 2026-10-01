"use client";

import { useEffect, useState } from "react";
import { assetUrl } from "../../lib/asset-url";
import "./SharedServiceWalkthrough.css";

const aliases: Record<string,string> = {
  "Amazon QuickSight":"amazon-quick-sight", "Amazon Quick Sight":"amazon-quick-sight", "Amazon Quick":"amazon-quick",
  "Amazon Kinesis":"amazon-kinesis", "Amazon Kinesis Data Streams":"amazon-kinesis-data-streams", "Amazon Data Firehose":"amazon-data-firehose",
  "Amazon Managed Streaming for Apache Kafka (Amazon MSK)":"amazon-managed-streaming-for-apache-kafka", "Amazon Managed Streaming for Apache Kafka":"amazon-managed-streaming-for-apache-kafka",
  "AWS Marketplace":"aws-marketplace", "AWS Cost and Usage Reports":"aws-cost-and-usage-reports", "AWS Cost and Usage Report":"aws-cost-and-usage-report", "AWS Support":"aws-support", "AWS Audit Manager":"aws-audit-manager", "Audit Manager":"aws-audit-manager",
  "Amazon WorkSpaces Secure Browser":"amazon-workspaces-secure-browser", "Amazon Q":"amazon-q", "Service Quotas":"aws-service-quotas", "Migration Evaluator":"migration-evaluator", "AWS VPN":"aws-vpn",
  "AWS Identity and Access Management (IAM)":"iam", "AWS IAM":"iam", "IAM":"iam", "AWS IAM Identity Center":"aws-iam-identity-center", "IAM Identity Center":"aws-iam-identity-center",
  "AWS Key Management Service (AWS KMS)":"kms", "AWS KMS":"kms", "AWS Global Accelerator":"aws-global-accelerator", "AWS Auto Scaling":"aws-auto-scaling", "Amazon EC2 Auto Scaling":"aws-auto-scaling", "Amazon Route 53":"amazon-route-53", "Route 53":"amazon-route-53",
  "AWS Serverless Application Repository":"aws-serverless-application-repository", "VMware Cloud on AWS":"vmware-cloud-on-aws", "AWS DMS":"aws-dms", "AWS Client VPN":"aws-client-vpn", "AWS Snow Family":"aws-snow-family",
  "Amazon SageMaker AI":"amazon-sagemaker-ai", "Amazon Elastic Container Registry (Amazon ECR)":"amazon-ecr", "Amazon Elastic Container Service (Amazon ECS)":"amazon-ecs", "Amazon Elastic Kubernetes Service (Amazon EKS)":"amazon-eks", "Amazon Elastic Block Store (Amazon EBS)":"amazon-ebs", "Amazon Elastic File System (Amazon EFS)":"amazon-efs"
};
const normalized = (name:string) => name.toLowerCase().replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const normalizedAliases: Record<string,string> = Object.fromEntries(Object.entries(aliases).map(([key,value]) => [normalized(key),value]));
const slug = (name:string) => aliases[name] || normalizedAliases[normalized(name)] || normalized(name).replace(/\s+/g, "-");
export const sharedWalkthroughPath = (name:string) => `/aws-certification-walkthroughs/${slug(name)}.webp`;

const legacyDemos:Record<string,string>={"Amazon Athena":"amazon-athena-practical-demo.webp","AWS Glue":"aws-glue-practical-demo-v3.webp","Amazon EMR":"amazon-emr-practical-demo-v3.webp","Amazon Kinesis":"amazon-kinesis-practical-demo-v3.webp","Amazon Kinesis Data Streams":"amazon-kinesis-data-streams.webp","Amazon Data Firehose":"amazon-data-firehose.webp","Amazon OpenSearch Service":"amazon-opensearch-service-practical-demo-v3.webp","Amazon QuickSight":"amazon-quicksight.webp","Amazon Quick Sight":"amazon-quicksight.webp","Amazon Managed Streaming for Apache Kafka":"amazon-msk.webp","AWS AppSync":"aws-appsync.webp","AWS Data Exchange":"aws-data-exchange.webp","AWS Lake Formation":"aws-lake-formation.webp","Amazon AppFlow":"amazon-appflow.webp","Amazon Managed Service for Apache Flink":"amazon-managed-service-for-apache-flink.webp","Amazon EventBridge":"amazon-eventbridge.webp"};
export const sharedWalkthroughCandidates=(name:string)=>{
 const primary=sharedWalkthroughPath(name),configured=assetUrl(primary);
 const base=configured===primary?"https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev":configured.slice(0,-primary.length);
 const names=[slug(name),normalized(name).replace(/\s+/g,"-"),normalized(name).replace(/^(aws|amazon) /,"").replace(/\s+/g,"-")];
 const candidates=[base+primary,...names.flatMap(value=>[`${base}/aws-certification-walkthroughs/${value}.webp`,`${base}/aws-certification-walkthroughs/${value}.png`])];
 if(legacyDemos[name])candidates.push(`/assets/demos/${legacyDemos[name]}`);
 return [...new Set(candidates)];
};

export default function SharedServiceWalkthrough({serviceName}:{serviceName:string}) {
  const [open,setOpen] = useState(false); const [expanded,setExpanded] = useState(false);
  const [candidate,setCandidate]=useState(0);const [loaded,setLoaded]=useState(false);
  useEffect(()=>{setCandidate(0);setLoaded(false);setExpanded(false)},[serviceName]);
  const candidates=sharedWalkthroughCandidates(serviceName),src=candidates[candidate];
  const failed=()=>{setLoaded(false);setExpanded(false);setCandidate(index=>index+1)};
  return <section className="shared-walkthrough" aria-label={`${serviceName} walkthrough`}>
    <button type="button" className="shared-walkthrough-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open ? "Hide walkthrough" : "View walkthrough"}</button>
    {open&&src&&<><p className="shared-walkthrough-status" role="status">{loaded?"Click the image to open the full walkthrough.":"Loading walkthrough…"}</p><button type="button" className="shared-walkthrough-image" disabled={!loaded} onClick={()=>setExpanded(true)} aria-label={`Open ${serviceName} walkthrough full page`}><img key={src} src={src} alt={`${serviceName} practical AWS Console walkthrough`} loading="eager" onLoad={()=>setLoaded(true)} onError={failed}/></button></>}
    {open&&!src&&<p className="shared-walkthrough-status" role="status">The {serviceName} walkthrough image could not be loaded. <button type="button" onClick={()=>setCandidate(0)}>Retry</button></p>}
    {expanded&&loaded&&src&&<div className="shared-walkthrough-modal" role="dialog" aria-modal="true" onClick={()=>setExpanded(false)}><button type="button" onClick={()=>setExpanded(false)}>Close ×</button><img src={src} alt={`${serviceName} practical AWS Console walkthrough`} onClick={e=>e.stopPropagation()} /></div>}
  </section>;
}
