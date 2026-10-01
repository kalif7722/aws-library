"use client";
import {Cloud,Database,HardDrive,Laptop,MessageSquare,Shield,Users} from "lucide-react";
import {awsIconSrc,awsIconFallbackSrc,findAwsArchitectureIcon} from "../../lib/aws-architecture-icons";
import type {ReviewedArchitecture,ReviewedNode} from "../../lib/reviewed-workload-architectures";
import {findGcpArchitectureIcon} from "../../lib/gcp-architecture-icons";
import ArchitectureTopology from "./ArchitectureTopology";
import "./AipServiceLearningDetailsV8.css";
import "./AthenaAwsIcons.css";
function Node({node,provider}:{node:ReviewedNode;provider:"aws"|"gcp"}){
 const icon=node.kind||provider==="gcp"?undefined:findAwsArchitectureIcon(node.icon||node.label);
 const gcp=provider==="gcp"?findGcpArchitectureIcon(node.icon||node.label):undefined;
 const PublicIcon=node.kind==="user"?Users:node.kind==="data"?Database:node.kind==="storage"?HardDrive:node.kind==="security"?Shield:node.kind==="message"?MessageSquare:node.kind==="app"?Laptop:Cloud;
 return <div className={`v8-node ${icon||gcp?"aws":"public"}`} tabIndex={0} data-architecture-provider={provider} data-architecture-detail={node.detail} aria-label={`${node.label}. ${node.detail}`}>
  {gcp?<div className="aws-icon-disc"><img src={gcp.path} alt={`${node.label} Google Cloud architecture icon`}/></div>:icon?<div className="aws-icon-disc"><img src={awsIconSrc(icon)} alt={`${node.label} AWS architecture icon`} data-fallback={awsIconFallbackSrc(icon)} onError={e=>{const el=e.currentTarget;const fallback=el.dataset.fallback;if(fallback&&el.src!==fallback)el.src=fallback;else el.style.display="none"}}/></div>:<div className={`public-icon-disc public-${node.kind||"internet"}`}><PublicIcon size={32}/></div>}
  <strong>{node.label}</strong><small>{node.sub}</small>
 </div>;
}
export default function ReviewedArchitectureSections({architectures,anchor,provider="aws"}:{architectures:ReviewedArchitecture[];anchor:string;provider?:"aws"|"gcp"}){
 return <>{architectures.map((arch,index)=><section className="v8-architecture" key={arch.title} id={index===0?anchor:`${anchor}-${index+1}`}>
  <div className="section-cap"><div><p>ARCHITECTURE {String(index+1).padStart(2,"0")}</p><h3>{arch.title}</h3></div><span>{arch.note}</span></div>
  <div className="v8-reference">Reference pattern: {arch.reference}</div>
  {arch.connections?<ArchitectureTopology arch={arch} renderNode={node=><Node node={node} provider={provider}/>}/>:<div className="v8-layers">{arch.layers.map((layer,i)=><div className="v8-layer-wrap" key={layer.title}><div className="v8-layer"><b className="v8-layer-title">{layer.title}</b><div className="v8-layer-nodes">{layer.nodes.map(node=><Node key={node.label} node={node} provider={provider}/>)}</div></div>{i<arch.layers.length-1&&<div className="v8-connector" aria-hidden="true">→</div>}</div>)}</div>}
 </section>)}</>;
}
