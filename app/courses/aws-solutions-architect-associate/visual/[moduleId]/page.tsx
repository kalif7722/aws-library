import {resolveSapReuseAssets} from '../../../../components/SapReuseAssets';
import {notFound} from 'next/navigation';
import {SaaModule} from '../../../../components/SaaVisualCourse';
import plan from '../../visual-plan.json';
export default async function Page({params}:{params:Promise<{moduleId:string}>}){
 const {moduleId}=await params,id=moduleId.replace(/^module-/,'');
 const courseModule=plan.modules.find(m=>m.id===id);
 if(!courseModule)notFound();
 return <SaaModule id={id} sapReuse={resolveSapReuseAssets('saa', id, courseModule.lessons ?? [])}/>;
}
