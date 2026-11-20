import {resolveSapReuseAssets} from '../../../../components/SapReuseAssets';
import {notFound} from "next/navigation";
import {SecurityModule} from "../../../../components/SecurityCourse";
import plan from "../../visual-plan.json";
export default async function SecurityModulePage({params}:{params:Promise<{moduleId:string}>}){const {moduleId}=await params;const id=moduleId.replace("module-","");const courseModule=plan.modules.find(m=>m.id===id);if(!courseModule)notFound();return <SecurityModule id={id} sapReuse={resolveSapReuseAssets('scs', id, courseModule.slides.map(s=>({id:'lessonId' in s&&typeof s.lessonId==='string'?s.lessonId:`scs-${id}-${s.number}`,asset:s.src})))}/>;}
