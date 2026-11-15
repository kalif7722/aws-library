import {notFound} from "next/navigation";
import {SecurityModule} from "../../../../components/SecurityCourse";
import plan from "../../visual-plan.json";
export default async function SecurityModulePage({params}:{params:Promise<{moduleId:string}>}){const {moduleId}=await params;const id=moduleId.replace("module-","");if(!plan.modules.some(m=>m.id===id))notFound();return <SecurityModule id={id}/>;}
