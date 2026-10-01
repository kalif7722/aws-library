import type {ReviewedNode,ReviewedArchitecture} from "./reviewed-workload-architectures";
export const n=(label:string,sub:string,detail:string,kind?:ReviewedNode["kind"],icon?:string):ReviewedNode=>({label,sub,detail,kind,icon});
export const l=(title:string,...nodes:ReviewedNode[])=>({title,nodes});
export const a=(title:string,note:string,reference:string,...layers:ReviewedArchitecture["layers"]):ReviewedArchitecture=>({title,note,reference,layers});
