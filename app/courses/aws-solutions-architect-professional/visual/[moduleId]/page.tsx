import Link from 'next/link';
import {notFound} from 'next/navigation';
import SapModuleLessons from '../../../../components/SapModuleLessons';
import SapS3Reference from '../../../../components/SapS3Reference';
import SapPrecisionReference from '../../../../components/SapPrecisionReference';
import plan from '../../visual-lesson-map.json';
import '../../../../components/AifVisualCourse.css';

export default async function Page({params}:{params:Promise<{moduleId:string}>}){
 const {moduleId}=await params;const id=moduleId.replace(/^module-/,'');const at=plan.modules.findIndex(m=>m.id===id);if(at<0)notFound();
 const m=plan.modules[at],previous=plan.modules[at-1],next=plan.modules[at+1];
 const own=(plan.lessonsByModule as Record<string,Array<{asset:string|null;status:string}>>)[id]||[];
 return <main className="aif-course"><section className="aif-hero aif-module-hero"><div><nav className="aif-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/courses/aws-solutions-architect-professional">Solutions Architect Professional</Link></nav><p className="aif-eyebrow">MODULE {id} · SAP-C03 VISUAL LEARNING</p><h1>{m.title}</h1><p className="aif-hero-copy">Understand the architecture through original diagrams, service comparisons and constrained examples. The visual course is being completed module by module.</p><div className="aif-module-facts"><span>{m.plannedVisuals} visuals planned</span><span>{own.filter(l=>l.asset&&l.status==='qa-passed').length} reviewed visuals available</span></div>{id==='09'&&<a href="#s3-decision-reference" style={{display:'inline-block',marginTop:16,color:'#fff',textDecoration:'underline'}}>Compare S3 classes, limits and metrics ↓</a>}</div></section><SapModuleLessons key={id} moduleId={id}/><SapPrecisionReference moduleId={id}/>{id==='09'&&<SapS3Reference/>}<nav className="aif-module-pager" aria-label="Module navigation"><span>{previous&&<Link href={`/courses/aws-solutions-architect-professional/visual/module-${previous.id}`}>← {previous.title}</Link>}</span><span>{next&&<Link href={`/courses/aws-solutions-architect-professional/visual/module-${next.id}`}>{next.title} →</Link>}</span></nav></main>;
}

