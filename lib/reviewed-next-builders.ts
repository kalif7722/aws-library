import type {ReviewedArchitecture} from "./reviewed-workload-architectures";
export function scenario(service:string,title:string,reference:string,rows:string[]):ReviewedArchitecture{
 const layers=rows.map(row=>{const [label,sub,detail,icon]=row.split("^");if(!label||!sub||!detail)throw new Error("Incomplete authored scenario: "+service);return {title:sub,nodes:[{label,sub,detail,icon:icon||label}]};});
 return {title:"AWS: "+title,note:layers[0].nodes[0].detail,reference,layers,connections:layers.slice(0,-1).map((layer,index)=>({from:layer.nodes[0].label,to:layers[index+1].nodes[0].label,label:layers[index+1].title}))};
}
export type ScenarioSpec=[string,string,string,string[]];
export const batch=(specs:ScenarioSpec[]):Record<string,ReviewedArchitecture[]>=>Object.fromEntries(specs.map(([service,title,reference,rows])=>[service,[scenario(service,title,reference,rows)]]));
