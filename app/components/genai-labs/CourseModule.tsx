"use client";
import { useState } from "react";
import map from "./map.json";
import { SCENARIOS, TASKS } from "./engine.mjs";
import Visuals from "./Visuals";
import "./labs.css";
import "./layout.css";

export default function CourseModule(){
 const [selected,setSelected]=useState(0);const [search,setSearch]=useState("");
 const matches=map.map((item,i)=>!search||(`${item.title} ${TASKS[i]}`).toLowerCase().includes(search.toLowerCase())?i:-1).filter(i=>i>=0);
 const active=matches.includes(selected)?selected:matches[0];const lab=active===undefined?null:map[active];
 return <section className="gl-course"><div className="gl-intro"><h2>Understand the failure. Practise the fix.</h2><p>12 troubleshooting labs · 74 visual walkthroughs · isolated browser-based console and application exercises. No AWS account or charges.</p></div><label className="gl-search">Find a lab or exam task<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="e.g. retrieval or 5.2.4"/></label><div className="gl-course-layout"><nav aria-label="Troubleshooting labs">{matches.map(i=>{const item=map[i];return <button key={item.id} className={active===i?"active":""} onClick={()=>setSelected(i)} aria-current={active===i?"page":undefined}><small>LAB {item.id} · {item.steps.length} VISUALS</small>{item.title}</button>})}</nav><article className="gl-course-detail">{lab?<><h2>{lab.title}</h2><p>{SCENARIOS[active]}</p><a className="gl-launch" href={`/troubleshooting/simulators/aws/genai/${lab.slug}`}>Start interactive lab →</a><p className="gl-subtle">Choose Guided for step-by-step help or Challenge to diagnose independently with one optional hint.</p><Visuals key={lab.id} steps={lab.steps}/></>:<p>No labs match that search. Try a topic or task number.</p>}</article></div></section>;
}
