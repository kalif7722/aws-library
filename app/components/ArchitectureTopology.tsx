"use client";
import type {ReactNode} from "react";
import type {ReviewedArchitecture,ReviewedNode} from "../../lib/reviewed-workload-architectures";
import "./ArchitectureTopology.css";
export default function ArchitectureTopology({arch,renderNode}:{arch:ReviewedArchitecture;renderNode:(node:ReviewedNode,index:number)=>ReactNode}){
 const count=arch.layers.flatMap(layer=>layer.nodes).length;
 const completeLearningPath=arch.learningPath?.flatMap(layer=>layer.nodes).length===count;
 const layers=completeLearningPath?arch.learningPath!:arch.layers;
 return <div className="v8-layers architecture-directional-flow" aria-label={arch.title+" directional architecture"}>
  {layers.map((layer,index)=><div className="v8-layer-wrap" key={layer.title}>
   <div className="v8-layer"><b className="v8-layer-title">{layer.title}</b><div className="v8-layer-nodes">
    {layer.nodes.map((node,nodeIndex)=><div data-topology-node={node.label} key={node.label}>{renderNode(node,arch.layers.findIndex(item=>item.nodes.some(n=>n.label===node.label)))}
     {arch.connections?.some(edge=>edge.from===node.label&&edge.to===layer.nodes[nodeIndex+1]?.label)&&<div className="architecture-within-stage-arrow" aria-label="Connected workflow step">↓</div>}
    </div>)}
   </div></div>
   {index<layers.length-1&&<div className="v8-connector" aria-label="Next part of the workflow">→</div>}
  </div>)}
 </div>;
}
