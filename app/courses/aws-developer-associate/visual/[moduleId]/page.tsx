import {resolveSapReuseAssets} from '../../../../components/SapReuseAssets';
import {notFound} from 'next/navigation';
import {DvaModule} from '../../../../components/DvaVisualCourse';
import plan from '../../visual-plan.json';
export default async function Page({params}:{params:Promise<{moduleId:string}>}){
 const {moduleId}=await params,id=moduleId.replace(/^module-/,'');
 const courseModule=plan.modules.find(m=>m.id===id&&m.lessons.length);
 if(!courseModule)notFound();
 return <DvaModule id={id} sapReuse={resolveSapReuseAssets('dva', id, courseModule.lessons)}/>;
}
