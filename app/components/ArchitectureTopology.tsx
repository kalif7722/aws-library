"use client";
import {useEffect,useId,useRef,useState,type ReactNode} from "react";
import type {ReviewedArchitecture,ReviewedNode} from "../../lib/reviewed-workload-architectures";
import "./ArchitectureTopology.css";
type Edge={path:string;label:string;x:number;y:number;control?:boolean};
export default function ArchitectureTopology({arch,renderNode}:{arch:ReviewedArchitecture;renderNode:(node:ReviewedNode,index:number)=>ReactNode}){
 const root=useRef<HTMLDivElement>(null),marker=useId().replace(/:/g,"");
 const [geometry,setGeometry]=useState<{width:number;height:number;edges:Edge[]}>({width:1,height:1,edges:[]});
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const update=()=>{
   const box=el.getBoundingClientRect(),positions=new Map<string,DOMRect>();
   el.querySelectorAll<HTMLElement>("[data-topology-node]").forEach(n=>positions.set(n.dataset.topologyNode!,n.getBoundingClientRect()));
   const edges=(arch.connections||[]).flatMap(edge=>{
    const a=positions.get(edge.from),b=positions.get(edge.to);if(!a||!b)return[];
    const sameRow=Math.abs(a.top-b.top)<30,forward=b.left>a.left;
    const x1=(sameRow?(forward?a.right:a.left):a.left+a.width/2)-box.left,x2=(sameRow?(forward?b.left:b.right):b.left+b.width/2)-box.left;
    const y1=(sameRow?a.top+a.height/2:a.bottom)-box.top,y2=(sameRow?b.top+b.height/2:b.top)-box.top;
    const bend=(y1+y2)/2;
    return[{path:sameRow?`M ${x1} ${y1} L ${x2} ${y2}`:`M ${x1} ${y1} C ${x1} ${bend}, ${x2} ${bend}, ${x2} ${y2}`,label:edge.label,x:(x1+x2)/2,y:sameRow?y1-10:bend-7,control:edge.control}];
   });
   setGeometry({width:el.scrollWidth,height:el.scrollHeight,edges});
  };
  const observer=new ResizeObserver(update);observer.observe(el);el.querySelectorAll("[data-topology-node]").forEach(n=>observer.observe(n));update();
  return()=>observer.disconnect();
 },[arch]);
 return <div className="architecture-topology-scroll"><div className="architecture-topology" ref={root}>
  <svg className="architecture-topology-edges" width={geometry.width} height={geometry.height} aria-hidden="true"><defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>{geometry.edges.map((e,i)=><g key={i} className={e.control?"control":"data"}><path d={e.path} markerEnd={`url(#${marker})`}/><text x={e.x} y={e.y} textAnchor="middle">{e.label}</text></g>)}</svg>
  {arch.layers.map((layer,i)=><div className="architecture-topology-row" key={layer.title}><b className="v8-layer-title">{layer.title}</b><div className="architecture-topology-nodes">{layer.nodes.map(node=><div className="architecture-topology-cell" data-topology-node={node.label} key={node.label}>{renderNode(node,i)}</div>)}</div></div>)}
 </div><details className="architecture-topology-key"><summary>Connections · solid: requests/data · dashed: configuration/evidence</summary><ul>{arch.connections?.map((e,i)=><li key={i}>{e.from} → {e.to}: {e.label}</li>)}</ul></details></div>;
}
