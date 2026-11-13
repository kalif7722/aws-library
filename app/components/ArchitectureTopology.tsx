"use client";
import {useEffect,useId,useRef,useState,type ReactNode} from "react";
import type {ReviewedArchitecture,ReviewedNode} from "../../lib/reviewed-workload-architectures";
import "./ArchitectureTopology.css";
export default function ArchitectureTopology({arch,renderNode}:{arch:ReviewedArchitecture;renderNode:(node:ReviewedNode,index:number)=>ReactNode}){
 const flowRef=useRef<HTMLDivElement>(null),flowId=useId();
 const [position,setPosition]=useState({overflow:false,start:true,end:false});
 const measure=()=>{const el=flowRef.current;if(el)setPosition({overflow:el.scrollWidth>el.clientWidth+2,start:el.scrollLeft<2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2})};
 useEffect(()=>{measure();const el=flowRef.current;if(!el)return;const observer=new ResizeObserver(measure);observer.observe(el);return ()=>observer.disconnect()},[arch]);
 const move=(direction:number)=>{const el=flowRef.current;if(el)el.scrollBy({left:direction*Math.max(220,el.clientWidth*.75),behavior:"smooth"})};
 const count=arch.layers.flatMap(layer=>layer.nodes).length;
 const completeLearningPath=arch.learningPath?.flatMap(layer=>layer.nodes).length===count;
 const layers=completeLearningPath?arch.learningPath!:arch.layers;
 return <div className="architecture-topology">{position.overflow&&<nav className="architecture-scroll-controls" aria-label="Architecture scrolling"><button type="button" aria-controls={flowId} disabled={position.start} onClick={()=>move(-1)}>← Previous</button><span>Scroll to view all stages</span><button type="button" aria-controls={flowId} disabled={position.end} onClick={()=>move(1)}>Next →</button></nav>}<div ref={flowRef} id={flowId} onScroll={measure} className="v8-layers architecture-directional-flow" tabIndex={0} role="region" aria-label={arch.title+" directional architecture. Scroll horizontally or use the arrow keys to view all stages."}>
  {layers.map((layer,index)=><div className="v8-layer-wrap" key={layer.title}>
   <div className="v8-layer"><b className="v8-layer-title">{layer.title}</b><div className="v8-layer-nodes">
    {layer.nodes.map((node,nodeIndex)=><div data-topology-node={node.label} key={node.label}>{renderNode(node,arch.layers.findIndex(item=>item.nodes.some(n=>n.label===node.label)))}
     {arch.connections?.some(edge=>edge.from===node.label&&edge.to===layer.nodes[nodeIndex+1]?.label)&&<div className="architecture-within-stage-arrow" aria-label="Connected workflow step">↓</div>}
    </div>)}
   </div></div>
   {index<layers.length-1&&<div className="v8-connector" aria-label="Next part of the workflow">→</div>}
  </div>)}
 </div></div>;
}
