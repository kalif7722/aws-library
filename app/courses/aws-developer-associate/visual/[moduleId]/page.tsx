import {notFound} from 'next/navigation';
import {DvaModule} from '../../../../components/DvaVisualCourse';
import plan from '../../visual-plan.json';
export default async function Page({params}:{params:Promise<{moduleId:string}>}){
 const {moduleId}=await params,id=moduleId.replace(/^module-/,'');
 if(!plan.modules.some(m=>m.id===id&&m.lessons.length))notFound();
 return <DvaModule id={id}/>;
}
