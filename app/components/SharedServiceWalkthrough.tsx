"use client";

import { useState } from "react";
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

export default function SharedServiceWalkthrough({serviceName}:{serviceName:string}) {
  const [open,setOpen] = useState(false); const [expanded,setExpanded] = useState(false); const src = assetUrl(sharedWalkthroughPath(serviceName));
  return <section className="shared-walkthrough" aria-label={`${serviceName} walkthrough`}>
    <button type="button" className="shared-walkthrough-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open ? "Hide walkthrough" : "View walkthrough"}</button>
    {open && <button type="button" className="shared-walkthrough-image" onClick={()=>setExpanded(true)} aria-label={`Open ${serviceName} walkthrough full page`}><img src={src} alt={`${serviceName} practical AWS Console walkthrough`} loading="lazy" /></button>}
    {expanded && <div className="shared-walkthrough-modal" role="dialog" aria-modal="true" onClick={()=>setExpanded(false)}><button type="button" onClick={()=>setExpanded(false)}>Close ×</button><img src={src} alt={`${serviceName} practical AWS Console walkthrough`} onClick={e=>e.stopPropagation()} /></div>}
  </section>;
}
