"use client";
import {useId,type ReactNode} from "react";
import type {ReviewedArchitecture,ReviewedNode} from "../../lib/reviewed-workload-architectures";
import "./ArchitectureTopology.css";
export default function ArchitectureTopology({arch,renderNode}:{arch:ReviewedArchitecture;renderNode:(node:ReviewedNode,index:number)=>ReactNode}){
 const id=useId().replace(/:/g,"");
 const all=arch.layers.flatMap((layer,index)=>layer.nodes.map(node=>({node,index})));
 const anchor=(label:string)=>`${id}-${all.findIndex(item=>item.node.label===label)}`;
 const focus=new Set(arch.learningPath?.flatMap(layer=>layer.nodes.map(node=>node.label))||[]);
 const walkthrough=arch.learningPath?.map(layer=>({...layer,nodes:layer.nodes.map(node=>all.find(item=>item.node.label===node.label)?.node||node)}))||arch.layers;
 const context=arch.learningPath?arch.layers.map(layer=>({...layer,title:layer.title.split(" · ")[0],nodes:layer.nodes.filter(node=>!focus.has(node.label))})).filter(layer=>layer.nodes.length):[];
 const rows=(layers:ReviewedArchitecture["layers"],supporting=false)=>layers.map((layer,index)=><section className="architecture-lesson-stage" key={layer.title}>
  <h4><span>{supporting?"↳":String(index+1).padStart(2,"0")}</span>{layer.title}</h4>
  <div className="architecture-topology-nodes">{layer.nodes.map(node=><div className="architecture-topology-cell" id={anchor(node.label)} data-topology-node={node.label} key={node.label}>
   {renderNode(node,all.find(item=>item.node.label===node.label)?.index||0)}
   {(arch.connections||[]).some(edge=>edge.from===node.label)&&<ul className="architecture-node-connections" aria-label={`Connections from ${node.label}`}>
    {arch.connections!.filter(edge=>edge.from===node.label).map((edge,i)=><li key={i} data-connection-kind={edge.control?"control":"data"}><span>{edge.control?"Control / evidence":"Request / data"}</span><a href={`#${anchor(edge.to)}`}>{edge.label} → <b>{edge.to}</b></a></li>)}
   </ul>}
  </div>)}</div>
 </section>);
 return <div className="architecture-topology-scroll">
  <p className="architecture-lesson-guide">Follow the numbered stages. Hover or focus a service for its role; connection labels show the actual destination.</p>
  <div className="architecture-topology">{rows(walkthrough)}</div>
  {context.length>0&&<details className="architecture-context" open><summary>Application context · clients, dependencies and supporting controls</summary><div className="architecture-topology">{rows(context,true)}</div></details>}
  {!arch.connections&&<p className="architecture-lesson-guide">These stages group responsibilities; they do not imply that every service forwards traffic to the next stage.</p>}
 </div>;
}
