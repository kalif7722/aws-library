"use client";

import { useEffect, useState } from "react";
import {awsConsolePath,awsConsoleStems,AWS_CONSOLE_PREFIX} from "../../lib/aws-console-walkthrough-assets";
import { assetUrl } from "../../lib/asset-url";
import "./SharedServiceWalkthrough.css";

export const sharedWalkthroughPath=awsConsolePath;

const legacyDemos:Record<string,string>={"Amazon Athena":"amazon-athena-practical-demo.webp","AWS Glue":"aws-glue-practical-demo-v3.webp","Amazon EMR":"amazon-emr-practical-demo-v3.webp","Amazon Kinesis":"amazon-kinesis-practical-demo-v3.webp","Amazon Kinesis Data Streams":"amazon-kinesis-data-streams.webp","Amazon Data Firehose":"amazon-data-firehose.webp","Amazon OpenSearch Service":"amazon-opensearch-service-practical-demo-v3.webp","Amazon QuickSight":"amazon-quicksight.webp","Amazon Quick Sight":"amazon-quicksight.webp","Amazon Managed Streaming for Apache Kafka":"amazon-msk.webp","AWS AppSync":"aws-appsync.webp","AWS Data Exchange":"aws-data-exchange.webp","AWS Lake Formation":"aws-lake-formation.webp","Amazon AppFlow":"amazon-appflow.webp","Amazon Managed Service for Apache Flink":"amazon-managed-service-for-apache-flink.webp","Amazon EventBridge":"amazon-eventbridge.webp"};
export const sharedWalkthroughCandidates=(name:string)=>{
 const primary=sharedWalkthroughPath(name),configured=assetUrl(primary);
 const base=configured===primary?"https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev":configured.slice(0,-primary.length);
 const names=awsConsoleStems(name);
 const candidates=[...names.map(value=>`${base}${AWS_CONSOLE_PREFIX}/${value}.webp`),...names.map(value=>`${base}${AWS_CONSOLE_PREFIX}/${value}.png`)];
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
