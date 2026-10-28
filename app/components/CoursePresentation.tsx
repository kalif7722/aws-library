'use client';
import type {CSSProperties} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowRight, BookOpen, Layers, GraduationCap, Compass, ChartNoAxesCombined, Cpu, Workflow, Cloud, KeyRound, Settings2, ArrowRightLeft, Network, HardDrive, ShieldCheck, Database, BrainCircuit, Code2, Coins, MessageSquare, MonitorCheck} from 'lucide-react';
import catalog from '../course-presentation-catalog.json';
import {gcpOfficialExamDomains} from '../gcp-all-exam-objectives';
import './AifVisualCourse.css';
import './CoursePresentation.css';
type Course={cloud:string;code:string;title:string;description:string;sourceUrl:string;badge?:string;assetPrefix?:string;modules:{title:string;description:string}[]};
const modulePalette=['#d97706','#7c3aed','#0891b2','#db2777','#2563eb','#059669','#ea580c','#4f46e5'];
function moduleIcon(title:string){
 const name=title.toLowerCase();
 if(/identity|access|authentication/.test(name)) return KeyRound;
 if(/security|secure|protect|compliance/.test(name)) return ShieldCheck;
 if(/analytics|analysis|insights/.test(name)) return ChartNoAxesCombined;
 if(/database|data engineer/.test(name)) return Database;
 if(/storage|backup/.test(name)) return HardDrive;
 if(/network|connectivity/.test(name)) return Network;
 if(/migration|moderniz/.test(name)) return ArrowRightLeft;
 if(/hybrid|multicloud|multi-cloud/.test(name)) return Cloud;
 if(/devops|delivery|deployment|pipeline/.test(name)) return Workflow;
 if(/govern|management|organizational/.test(name)) return Settings2;
 if(/compute|container|workload/.test(name)) return Cpu;
 if(/machine learning|ai|model|intelligence/.test(name)) return BrainCircuit;
 if(/cost|financ|optimiz/.test(name)) return Coins;
 if(/application|develop|code/.test(name)) return Code2;
 if(/operation|monitor|reliab|resilien/.test(name)) return MonitorCheck;
 if(/integration|messag/.test(name)) return MessageSquare;
 return BookOpen;
}
export default function CoursePresentation({children}:{children:React.ReactNode}){
 const pathname=usePathname();const parts=pathname.split('/').filter(Boolean);const root=parts.length===2;const slug=parts[1];const course=(catalog as Record<string,Course>)[slug];
 const domains=course?.cloud==='GCP'?(gcpOfficialExamDomains as Record<string,{name:string;weight:string;groups:{name:string}[]}[]>)[course.code]||[]:[];
 const modules=domains.length?domains.map(d=>({title:d.name,description:d.groups.map(g=>g.name).join(' · ')})):course?.modules||[];
 const serviceTarget=course?.cloud==='AWS'?'course-services':'curriculum';
 function openModule(index:number){
  if(domains.length){document.querySelectorAll<HTMLButtonElement>('.gcp-domain-tabs button')[index]?.click();return;}
  const group=document.getElementById(`course-category-${index}`) as HTMLDetailsElement|null;
  if(group)group.open=true;
 }
 if(root&&slug==='aws-solutions-architect-professional')return <>{children}</>;\n return <div className={`course-presentation ${root&&course?'course-presentation-overview':''}`}>
  <div className="course-topbar"><a className="course-home" href="/">Home</a>{!root&&<a href={`/courses/${slug}`}>Course overview</a>}<span>{course?`${course.cloud} · ${course.code}`:'Visual learning path'}</span></div>
  {root&&course&&<div className="aif-course course-landing"><section className="aif-hero"><div><p className="aif-eyebrow">VISUAL LEARNING PATH · {course.cloud} {course.code}</p><h1>{course.title}</h1><p className="aif-hero-copy">{course.description}</p><a className="aif-hero-action" href="#learning-path">Explore the learning path <ArrowRight size={17}/></a></div><div className="course-hero-side">{course.badge&&<img className="course-official-badge" src={course.badge} alt={`${course.title} official certification badge`}/>}<div className="aif-hero-stats"><div><Layers/><strong>{modules.length}</strong><span>{domains.length?'exam domain modules':'service learning modules'}</span></div><div><GraduationCap/><strong>{course.code}</strong><span>certification learning path</span></div><div><BookOpen/><strong>Visual</strong><span>concepts and walkthroughs</span></div><div><Compass/><strong>Apply</strong><span>connect concepts to practice</span></div></div></div></section>
   <nav className="aif-quicknav" aria-label="Course navigation"><a href="#learning-path">Learning modules</a><a href="#course-existing-content">Exam objectives & walkthroughs</a><a href={`#${serviceTarget}`}>{course.cloud} services reference</a><a href={course.sourceUrl} target="_blank" rel="noreferrer">Official certification guide ↗</a></nav>
   <section className="aif-section-heading" id="learning-path"><div><p className="aif-eyebrow">ONE CONNECTED LEARNING JOURNEY</p><h2>Your learning path</h2><p>Explore a module, connect the services, then practise with the course material below.</p></div><span className="aif-path-tag">Learn · Compare · Apply</span></section>
   <div className="aif-module-grid">{modules.map((m,index)=>{const Icon=moduleIcon(m.title);return <a style={{'--tile-color':modulePalette[index%modulePalette.length]} as CSSProperties} className="aif-module-card" key={m.title} href={domains.length?`#${course.assetPrefix}-exam-guide`:`#course-category-${index}`} onClick={()=>openModule(index)}><div className="aif-card-top"><span className="aif-module-icon"><Icon size={27} strokeWidth={1.8} aria-hidden="true"/></span><span>MODULE {String(index+1).padStart(2,'0')}</span></div><h3>{m.title}</h3><p>{m.description}</p><div className="aif-card-footer">Explore topics <ArrowRight size={16}/></div></a>})}</div>
  </div>}
  <div id="course-existing-content">{children}</div>
 </div>;
}
