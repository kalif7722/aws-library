'use client';
import type {CSSProperties} from 'react';
import {Compass,BrainCircuit,Cloud,ChartNoAxesCombined,Sparkles,Database,MessageSquare,Bot,ScanText,Workflow,ShieldCheck,Scale,LockKeyhole,RefreshCw,GraduationCap,ArrowRight,BookOpen,Layers} from 'lucide-react';
import plan from '../courses/aws-ai-practitioner/visual-lesson-map.json';
import './AifVisualCourse.css';
import './CourseStudyTools.css';
import CourseSearch from './CourseSearch';
import {CourseProgress} from './StudyProgress';
const base='/courses/aws-ai-practitioner';
const courseItems=plan.lessons.filter(l=>l.asset).map(l=>({id:l.id,title:l.title,moduleTitle:`Module ${l.moduleId} · ${plan.modules.find(m=>m.id===l.moduleId)?.title||''}`,href:`${base}/visual/module-${l.moduleId}?lesson=${l.id}`,terms:(l.learningNotes||[]).join(' ')}));
const progressItems=courseItems.map(x=>({id:x.id,moduleId:x.moduleTitle,title:x.title,href:x.href}));
const icons=[Compass,BrainCircuit,Cloud,ChartNoAxesCombined,Sparkles,Database,MessageSquare,Bot,ScanText,Workflow,ShieldCheck,Scale,LockKeyhole,RefreshCw,GraduationCap];
export default function AifCourseOverview(){
 return <main className="aif-course"><section className="aif-hero"><div><p className="aif-eyebrow">VISUAL LEARNING PATH · AWS AIF-C01</p><h1>Understand AI.<br/>Connect the concepts.</h1><p className="aif-hero-copy">A clear, carefully sequenced path through AI Practitioner. Explore the course topics through visual explanations, practical examples and the decisions behind each service.</p><a className="aif-hero-action" href={`${base}/visual/module-00`}>Explore the learning path <ArrowRight size={17}/></a></div><div><img className="aif-hero-badge" src="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-badges/ai-practitioner.png" alt="AWS Certified AI Practitioner badge"/><div className="aif-hero-stats"><div><Layers/><strong>{plan.modules.length}</strong><span>learning modules</span></div><div><BookOpen/><strong>{courseItems.length}</strong><span>visual lessons available</span></div><div><BrainCircuit/><strong>5 domains</strong><span>connected through concepts</span></div><div><GraduationCap/><strong>AIF-C01</strong><span>foundational understanding</span></div></div></div></section>
 <nav className="aif-quicknav" aria-label="Course navigation"><a href="#learning-path">Learning modules</a><a href={`${base}/exam-objectives`}>Exam objectives & tasks</a><a href={`${base}/services`}>AWS services reference</a><a href={`${base}/visual/module-14`}>Revision & exam preparation</a><CourseSearch items={courseItems}/><CourseProgress course="aif" lessons={progressItems}/></nav>
 <section className="aif-section-heading" id="learning-path"><div><p className="aif-eyebrow">ONE CONNECTED LEARNING JOURNEY</p><h2>Your learning path</h2><p>Start with the fundamentals, then build towards models, applications and responsible AI.</p></div><span className="aif-path-tag">Learn · Compare · Apply</span></section>
 <div className="aif-module-grid">{plan.modules.map(m=>{const Icon=icons[Number(m.id)];const ls=plan.lessons.filter(l=>l.moduleId===m.id);const available=ls.filter(l=>l.asset).length;return <a className="aif-module-card" key={m.id} href={`${base}/visual/module-${m.id}`} style={{'--aif-accent':m.color} as CSSProperties}><div className="aif-card-top"><span className="aif-module-icon"><Icon size={27} strokeWidth={1.7}/></span><span>MODULE {m.id}</span></div><h3>{m.title}</h3><p>{m.description}</p><div className="aif-card-meta"><span>{available?`${available} available`:'In preparation'}</span></div><div className="aif-card-footer">Explore topics <ArrowRight size={16}/></div></a>})}</div>


 </main>;
}
