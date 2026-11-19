"use client";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {courseDirectory,providers} from "../courses/catalog";
import "./UniformCourseNav.css";

const sectionNames:Record<string,string>={visual:"Visual lessons",review:"Review",exam:"Practice exam",practice:"Practice",labs:"Labs",services:"Course services","exam-objectives":"Exam objectives",progress:"Progress"};
// Routes verified against main c5b1847. Do not infer services/exam/progress for other courses.
const routeSections:Record<string,string[]>={
 "/courses/aws-ai-practitioner":["exam-objectives","services","progress"],
 "/courses/aws-generative-ai-developer-professional":["exam-objectives","services"],
 "/courses/aws-security-specialty":["exam-objectives","services"]
};
const anchors=[{id:"visual-lessons",title:"Visual lessons"},{id:"video-lectures",title:"Video lectures"}];
export default function UniformCourseNav(){
 const pathname=usePathname()||"/";
 const course=courseDirectory.find(c=>pathname===c.href||pathname.startsWith(c.href+"/"));
 const [query,setQuery]=useState("");
 const [sections,setSections]=useState<typeof anchors>([]);
 const chooser=useRef<HTMLDetailsElement>(null);
 const input=useRef<HTMLInputElement>(null);
 useEffect(()=>{
  setQuery("");setSections([]);
  if(chooser.current)chooser.current.open=false;
  if(!course)return;
  const scan=()=>setSections(previous=>{
   const next=anchors.filter(a=>document.getElementById(a.id));
   return previous.map(a=>a.id).join()===next.map(a=>a.id).join()?previous:next;
  });
  scan();
  // The video section may mount after its availability check. Never advertise an absent anchor.
  const observer=new MutationObserver(scan);
  observer.observe(document.body,{childList:true,subtree:true});
  return()=>observer.disconnect();
 },[pathname,course?.href]);
 if(!course)return null;
 const suffix=pathname.slice(course.href.length).split("/").filter(Boolean);
 const last=suffix.at(-1)||"";
 const module=last.match(/^module-(\d+)$/);
 const current=module?`Module ${module[1]}`:sectionNames[last]|| (suffix.length?"Course content":"");
 const services=providers.find(p=>p.key===course.cloud)?.links.find(([,href])=>!href.startsWith("/courses/"));
 const matches=courseDirectory.filter(c=>`${c.title} ${c.cloudName} ${c.level}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <div className="uniform-course-nav">
  <div className="ucn-inner">
   <nav aria-label="Course breadcrumb" className="ucn-breadcrumb"><a href="/courses">All courses</a><span aria-hidden="true">/</span><a href={course.href} aria-current={!suffix.length?"page":undefined}>{course.cloudName} · {course.title}</a>{current&&<><span aria-hidden="true">/</span><span aria-current="page">{current}</span></>}</nav>
   <div className="ucn-controls">
    <nav aria-label="Course navigation" className="ucn-links"><a href={course.href} aria-current={!suffix.length?"page":undefined}>Course overview</a>{sections.map(a=><a key={a.id} href={`#${a.id}`}>{a.title}</a>)}{(routeSections[course.href]||[]).map(section=><a key={section} href={`${course.href}/${section}`} aria-current={pathname===`${course.href}/${section}`?"page":undefined}>{sectionNames[section]}</a>)}{services&&<a href={services[1]}>{course.cloudName} services</a>}</nav>
    <details className="ucn-chooser" ref={chooser} onToggle={e=>{if(e.currentTarget.open)input.current?.focus();}} onKeyDown={e=>{if(e.key==="Escape"&&chooser.current?.open){chooser.current.open=false;chooser.current.querySelector("summary")?.focus();}}}>
     <summary>Find a course <span aria-hidden="true">⌄</span></summary>
     <div className="ucn-search-panel"><label htmlFor="uniform-course-search">Search all {courseDirectory.length} courses</label><input ref={input} id="uniform-course-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Course, exam code or provider" autoComplete="off"/><p role="status" aria-live="polite">{matches.length} {matches.length===1?"course":"courses"}</p><nav aria-label="Course search results">{matches.map(c=><a key={c.href} href={c.href} aria-current={c.href===course.href?"page":undefined}><small>{c.cloudName} · {c.level}</small><span>{c.title}</span></a>)}</nav>{!matches.length&&<p>No matching courses. Try an exam code or provider.</p>}</div>
    </details>
   </div>
  </div>
 </div>;
}
