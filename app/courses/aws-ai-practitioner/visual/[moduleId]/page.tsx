import Link from 'next/link';
import Preparation from '../../../../components/aif-exam/Preparation';
import {notFound} from 'next/navigation';
import AifModuleLessons from '../../../../components/AifModuleLessons';
import plan from '../../visual-lesson-map.json';
import '../../../../components/AifVisualCourse.css';
export default async function Page({params}:{params:Promise<{moduleId:string}>}){
 const {moduleId}=await params;const id=moduleId.replace(/^module-/,'');const at=plan.modules.findIndex(m=>m.id===id);if(at<0)notFound();const m=plan.modules[at];const previous=plan.modules[at-1],next=plan.modules[at+1];const own=plan.lessons.filter(l=>l.moduleId===id);
 return <main className="aif-course"><section className="aif-hero aif-module-hero"><div><nav className="aif-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses/aws-ai-practitioner">AI Practitioner</Link><span>/</span><Link href="/courses/aws-ai-practitioner/progress">Progress tracker</Link></nav><p className="aif-eyebrow">MODULE {m.id} · AIF-C01 VISUAL LEARNING</p><h1>{m.title}</h1><p className="aif-hero-copy">{m.description}</p><div className="aif-module-facts">{id==='14'?<><span>65 practice questions</span><span>Practice and timed exam</span></>:<><span>{own.length} visual lessons planned</span><span>{own.filter(l=>l.asset).length} {own.filter(l=>l.asset).length===1?'visual':'visuals'} available</span></>}{m.examTasks.length>0&&<span>Exam tasks {m.examTasks.join(' · ')}</span>}</div></div></section>{id==='14'&&<Preparation/>}{id!=='14'&&<AifModuleLessons key={id} moduleId={id}/>}<nav className="aif-module-pager" aria-label="Module navigation"><span>{previous&&<Link href={`/courses/aws-ai-practitioner/visual/module-${previous.id}`}>← {previous.title}</Link>}</span><span>{next&&<Link href={`/courses/aws-ai-practitioner/visual/module-${next.id}`}>{next.title} →</Link>}</span></nav></main>;
}
