"use client";
// Reuse the same official AWS architecture-icon assets as the all-service simulator.
const icons:Record<string,{name:string;file:string}>={
 user:{name:"User",file:"General/User.png"},
 lambda:{name:"AWS Lambda",file:"Compute/Lambda.png"},
 bedrock:{name:"Amazon Bedrock",file:"ArtificialIntelligence/Bedrock.png"},
 bedrockKnowledgeBases:{name:"Bedrock Knowledge Bases",file:"ArtificialIntelligence/Bedrock.png"},
 opensearch:{name:"OpenSearch",file:"Analytics/OpenSearchService.png"},
 s3:{name:"Amazon S3",file:"Storage/SimpleStorageService.png"},
 cloudWatch:{name:"CloudWatch",file:"ManagementGovernance/CloudWatch.png"},
};
const root="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-icons";
export default function Architecture({labIndex}:{labIndex:number}){
 const rag=labIndex>=5&&labIndex<=8;
 const rows=[{label:"Query path",ids:["user","lambda",rag?"bedrockKnowledgeBases":"bedrock"]},...(rag?[{label:"Document ingestion",ids:["s3","bedrockKnowledgeBases","opensearch"]}]:[])];
 return <section className="gl-architecture" aria-label="Incident architecture">{rows.map(row=><div className="gl-arch-row" key={row.label}><b>{row.label}</b>{row.ids.map((id,i)=><div className="gl-arch-node" key={`${id}-${i}`}>{i>0&&<span className="gl-flow-arrow" aria-hidden="true">→</span>}<figure><img src={`${root}/${icons[id].file}`} alt="" onError={e=>{if(!e.currentTarget.dataset.fallback){e.currentTarget.dataset.fallback="1";e.currentTarget.src=`/aws-icons/${icons[id].file}`}}}/><figcaption>{icons[id].name}</figcaption></figure></div>)}</div>)}<div className="gl-arch-observe"><img src={`${root}/${icons.cloudWatch.file}`} alt=""/><span>CloudWatch<br/>Application, runtime and ingestion evidence</span></div></section>;
}
