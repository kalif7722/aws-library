"use client";
import {useState} from "react";
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
 return <section className="portal-section"><p className="portal-kicker">Learning paths</p><h1>Certification courses</h1><p className="portal-lede">Choose a cloud, search an exam code, or narrow the list by level and subject.</p><div className="portal-actions"><PortalResume className="portal-button portal-resume"/></div>
 <fieldset className="portal-filters"><legend>Filter courses</legend><label>Search<input type="search" placeholder="e.g. SAP-C03" value={query} onChange={e=>setQuery(e.target.value)}/></label><label>Cloud<select value={cloud} onChange={e=>setCloud(e.target.value)}><option value="">All clouds</option>{providers.map(p=><option key={p.key} value={p.key}>{p.short}</option>)}</select></label><label>Level<select value={level} onChange={e=>setLevel(e.target.value)}><option value="">All levels</option>{levels.map(v=><option key={v} value={v}>{v}</option>)}</select></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option value="">All subjects</option>{subjects.map(v=><option key={v}>{v}</option>)}</select></label><button className="portal-button" type="button" onClick={reset}>Clear filters</button></fieldset>
 <p role="status" className="portal-result-count">{results.length} {results.length===1?"course":"courses"} found</p>
 {results.length ? <div className="portal-card-grid">{results.map(c=><article key={c.href}><small>{c.cloudName} · {c.level}</small><h2><a href={c.href}>{c.title}</a></h2><p>{c.subject}</p><p className="portal-course-status">{c.featured?"Reviewed visual lessons available":"See course page for available content"}</p></article>)}</div>:<p>No matching courses. Try another term or clear the filters.</p>}
 </section>;
}
