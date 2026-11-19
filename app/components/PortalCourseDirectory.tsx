"use client";
import {ArrowRight, BookOpen} from "lucide-react";
import "./PortalCourseDirectory.css";
import {useState,type CSSProperties} from "react";
import PortalCertificationBadge from "./PortalCertificationBadge";
import {portalExamCode,portalCertificationHue} from "./portalCertificationAssets";
import {useSearchParams} from "next/navigation";
import {courseDirectory, providers} from "../courses/catalog";
import {PortalResume} from "./PortalChrome";
const levels=Array.from(new Set(courseDirectory.map(c=>c.level)));
const subjects=Array.from(new Set(courseDirectory.map(c=>c.subject))).sort();
export default function CourseDirectory(){
 const params=useSearchParams();
 const requested=params.get("cloud")||"";
 const initial=providers.some(p=>p.key===requested)?requested:"";
 const [cloud,setCloud]=useState(initial);const [level,setLevel]=useState("");const [subject,setSubject]=useState("");const [query,setQuery]=useState("");
 const reset=()=>{setCloud("");setLevel("");setSubject("");setQuery("");};
 const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const results=courseDirectory.filter(c=>(!cloud||c.cloud===cloud)&&(!level||c.level===level)&&(!subject||c.subject===subject)&&words.every(w=>`${c.title} ${c.cloudName} ${c.level} ${c.subject}`.toLowerCase().includes(w)));
 return <section className="portal-section portal-course-directory" aria-labelledby="course-directory-title">
 <header className="catalog-hero">
  <div><p className="portal-kicker">Visual certification pathways</p><h1 id="course-directory-title">Your next cloud<br/><span>starts here.</span></h1><p className="portal-lede">Explore AWS, Azure and Google Cloud courses. Find your exam, choose a level, and see what’s available to study.</p><div className="portal-actions"><PortalResume className="portal-button portal-resume"/><a className="portal-button" href="#catalog-filters">Find a course <ArrowRight size={16} aria-hidden="true"/></a></div></div>
  <figure className="catalog-preview"><div className="catalog-preview-label"><BookOpen size={16} aria-hidden="true"/> Inside a visual lesson</div><img src="/course-visuals/sap-c03/module-10/slide-01-aip-v3.webp" width={2048} height={1152} alt="EBS volumes stay within an Availability Zone; snapshots can restore volumes in another zone."/><figcaption><span>AWS · Storage architecture</span><a href="/courses/aws-solutions-architect-professional/visual/module-10?lesson=sap-10-001">Explore this lesson <ArrowRight size={15} aria-hidden="true"/></a></figcaption></figure>
 </header>
 <div className="catalog-provider-shortcuts" role="group" aria-label="Filter by cloud provider"><button type="button" aria-pressed={!cloud} onClick={()=>setCloud("")}>All clouds <span>{courseDirectory.length}</span></button>{providers.map(p=><button type="button" className={`catalog-${p.key}`} key={p.key} aria-pressed={cloud===p.key} onClick={()=>setCloud(p.key)}>{p.name}<span>{courseDirectory.filter(c=>c.cloud===p.key).length}</span></button>)}</div>
 <fieldset id="catalog-filters" className="portal-filters"><legend>Filter courses</legend><label>Search<input type="search" placeholder="e.g. SAP-C03" value={query} onChange={e=>setQuery(e.target.value)}/></label><label>Cloud<select value={cloud} onChange={e=>setCloud(e.target.value)}><option value="">All clouds</option>{providers.map(p=><option key={p.key} value={p.key}>{p.short}</option>)}</select></label><label>Level<select value={level} onChange={e=>setLevel(e.target.value)}><option value="">All levels</option>{levels.map(v=><option key={v} value={v}>{v}</option>)}</select></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option value="">All subjects</option>{subjects.map(v=><option key={v}>{v}</option>)}</select></label><button className="portal-button" type="button" onClick={reset}>Clear filters</button></fieldset>

 <p role="status" aria-live="polite" className="portal-result-count">{results.length} {results.length===1?"course":"courses"} found</p>
 {results.length ? providers.map(provider=>{
  const courses=results.filter(c=>c.cloud===provider.key);
  if(!courses.length) return null;
  return <section key={provider.key} className={`catalog-provider-section catalog-${provider.key}`} aria-labelledby={`catalog-${provider.key}-title`}>
   <header className="catalog-provider-heading"><div><p className="catalog-provider-eyebrow">{provider.short} certification paths</p><h2 id={`catalog-${provider.key}-title`}>{provider.name}</h2></div><p>{courses.length} {courses.length===1?"course":"courses"}{cloud||level||subject||query?" matching your filters":" to explore"}</p></header>
   <div className="catalog-course-grid">{courses.map(c=>{const code=portalExamCode(c.title);return <article className="catalog-course-card portal-certification-tile" style={{"--cert-hue":portalCertificationHue(code)} as CSSProperties} key={c.href}>
    <div className="catalog-course-mark"><PortalCertificationBadge cloud={c.cloud} code={code}/><span className="catalog-course-level">{c.level}</span></div>
    <h3><a href={c.href}>{c.title}<ArrowRight size={17} aria-hidden="true"/></a></h3><p className="catalog-course-subject">{c.subject}</p>
    <p className="catalog-course-availability">{c.featured?"Reviewed visual lessons available":"See course page for available content"}</p>
   </article>})}</div>
  </section>;
 }):<p className="catalog-empty">No matching courses. Try another term or clear the filters.</p>}
 </section>;
}
