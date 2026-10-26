import GenAILabWorkspace from "../../../../../components/genai-labs/Workspace";
import map from "../../../../../components/genai-labs/map.json";
import "../../simulator.css";

export default async function GenAILabPage({params}:{params:Promise<{labId:string}>}){
 const {labId}=await params;const index=map.findIndex(lab=>lab.slug===labId||lab.id===labId);
 if(index<0)return <main style={{padding:32}}><h1>Lab not found</h1><a href="/courses/aws-generative-ai-developer-professional/visual/19">View troubleshooting labs</a></main>;
 return <GenAILabWorkspace labIndex={index}/>;
}
