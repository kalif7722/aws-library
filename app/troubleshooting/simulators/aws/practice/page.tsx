'use client';
import {useEffect,useMemo,useState} from 'react';
import labsData from '../../../walkthroughs/labs.json';
import {stages,type Field} from './spec';
import './practice.css';

type Lab={id:string;title:string;service:string;simulator:string;screens:{title:string;path:string;action:string;why:string;asset?:string;warning?:string;steps?:string[];rows:[string,string][]}[]};
const labs=(labsData as Lab[]).filter(lab=>lab.id in stages);
const defaults=(id:string)=>Object.fromEntries(stages[id].flatMap((stage,index)=>stage.fields.map(field=>[`${index}:${field.label}`,field.value])));
const storeKey=(id:string)=>`aws-guided-practice-v1:${id}`;
export default function PracticePage(){
 const [labId,setLabId]=useState(labs[0].id),[step,setStep]=useState(0),[values,setValues]=useState<Record<string,string>>(defaults(labs[0].id));
 const [completed,setCompleted]=useState<number[]>([]),[error,setError]=useState(''),[ready,setReady]=useState(false);
 const lab=useMemo(()=>labs.find(item=>item.id===labId)??labs[0],[labId]);
 const stage=stages[lab.id][step],screen=lab.screens[step];
 useEffect(()=>{const query=new URLSearchParams(location.search).get('lab');if(query&&query in stages)setLabId(query);setReady(true)},[]);
 useEffect(()=>{if(!ready)return;try{const previous=JSON.parse(localStorage.getItem(storeKey(labId))||'null');setStep(Math.max(0,Math.min(stages[labId].length-1,Number(previous?.step)||0)));setValues({...defaults(labId),...(previous?.values||{})});setCompleted(Array.isArray(previous?.completed)?previous.completed.filter((n:unknown)=>Number.isInteger(n)):[])}catch{setStep(0);setValues(defaults(labId));setCompleted([])}setError('')},[labId,ready]);
 useEffect(()=>{if(ready)localStorage.setItem(storeKey(labId),JSON.stringify({step,values,completed}))},[labId,step,values,completed,ready]);
 const src=screen.asset?`/aws-console-walkthroughs/${screen.asset}`:`/aws-console-walkthroughs/${lab.id}-${String(step+1).padStart(2,'0')}.svg`;
 const get=(field:Field)=>values[`${step}:${field.label}`]??field.value;
 const change=(field:Field,value:string)=>{setValues(current=>({...current,[`${step}:${field.label}`]:value}));setError('')};
 const advance=()=>{
  const missing=stage.fields.find(field=>field.required&&!get(field).trim());
  if(missing){setError(`Complete ${missing.label} to continue.`);return}
  if(labId==='ec2-first-instance'&&step===4&&get(stage.fields[1])!=='My IP'){setError('Choose My IP for SSH before proceeding.');return}
  if(labId==='rds-private-db'&&step===4&&get(stage.fields[4])!=='No'){setError('Choose No for public access in this private database exercise.');return}
  if(labId==='s3-bucket'&&step===1&&get(stage.fields[1])!=='Yes'){setError('Block all public access for this exercise.');return}
  setCompleted(current=>Array.from(new Set([...current,step])));setError('');
  if(step<lab.screens.length-1)setStep(step+1);
 };
 const pickLab=(id:string)=>{if(id===labId)return;setLabId(id);history.replaceState(null,'',`?lab=${encodeURIComponent(id)}`)};
 return <main className="guided-lab">
  <header className="guided-top"><div><b>aws</b><span>Services</span><span className="guided-search">⌕ &nbsp;Search for services, features, blogs, docs, and more</span></div><span>N. Virginia ⌄ &nbsp; | &nbsp; training account ⌄</span></header>
  <div className="guided-banner"><strong>Simulator sandbox</strong><span>Practice with training reconstructions. Your choices stay in this browser; no AWS resources are created.</span><a href="/courses/aws-solutions-architect-professional/visual/26">Module 26 ↗</a></div>
  <div className="guided-layout"><aside><h2>Console practice</h2><p>First five walkthrough labs</p>{labs.map(item=><button key={item.id} className={item.id===labId?'active':''} onClick={()=>pickLab(item.id)}><small>{item.service}</small>{item.title}<em>{stages[item.id].length} screens</em></button>)}<a href="/troubleshooting/simulators/aws">Open full console simulator ↗</a></aside>
   <article><div className="guided-heading"><div><small>{lab.service} · STEP {step+1} OF {lab.screens.length}</small><h1>{screen.title}</h1><p>{screen.path}</p></div><span>{completed.length}/{lab.screens.length} completed</span></div>
    <nav className="guided-steps" aria-label="Lab steps">{lab.screens.map((item,index)=><button key={index} className={index===step?'active':''} onClick={()=>{setStep(index);setError('')}} aria-current={index===step?'step':undefined}><b>{String(index+1).padStart(2,'0')}</b><span>{item.title}</span>{completed.includes(index)&&<i>✓</i>}</button>)}</nav>
    <div className="guided-columns"><section className="guided-reference"><div className="guided-section-title"><strong>Console screen</strong><a href={src} target="_blank" rel="noreferrer">View full size ↗</a></div><img src={src} alt={`${lab.service} console: ${screen.title}`} /><p>Use this screen as a visual reference while you make the same choices in the practice controls. The picture is a training reconstruction.</p></section>
    <section className="guided-controls"><div className="guided-section-title"><strong>Practice the choices</strong><span>{step+1} / {lab.screens.length}</span></div><p className="guided-action">{screen.action}</p>{screen.steps&&<details><summary>Detailed walkthrough</summary><ol>{screen.steps.map((line,index)=><li key={index}>{line}</li>)}</ol></details>}
    <form onSubmit={event=>{event.preventDefault();advance()}}>{stage.fields.map((field,index)=><label key={`${step}:${field.label}:${index}`} className={field.kind==='check'?'guided-check':''}><span>{field.label}</span>{field.kind==='readonly'?<output>{get(field)}</output>:field.kind==='check'?<input type="checkbox" checked={get(field)==='Yes'} onChange={event=>change(field,event.target.checked?'Yes':'No')}/>:field.kind==='select'?<select value={get(field)} onChange={event=>change(field,event.target.value)}>{field.options?.map(option=><option key={option}>{option}</option>)}</select>:field.kind==='choice'?<div className="guided-choices">{field.options?.map(option=><button type="button" key={option} className={get(field)===option?'selected':''} onClick={()=>change(field,option)} aria-pressed={get(field)===option}>{option}</button>)}</div>:<input value={get(field)} onChange={event=>change(field,event.target.value)} required={field.required}/>}</label>)}
    {(stage.note||screen.warning)&&<div className="guided-note">{stage.note||screen.warning}</div>}{error&&<p role="alert" className="guided-error">{error}</p>}
    <div className="guided-actions"><button type="button" disabled={step===0} onClick={()=>{setStep(step-1);setError('')}}>← Back</button><button className="primary" type="submit">{stage.button} →</button></div>{completed.includes(step)&&<p className="guided-success">✓ This screen is complete. You can revisit any choice.</p>}</form></section></div>
    <footer><a href={`/troubleshooting/walkthroughs?lab=${lab.id}`}>Read standalone walkthrough ↗</a><a href={`/troubleshooting/simulators/aws?screen=${encodeURIComponent(lab.simulator)}`}>Explore resource inventory ↗</a><button onClick={()=>{if(confirm('Reset this lab and its saved choices?')){localStorage.removeItem(storeKey(labId));setValues(defaults(labId));setCompleted([]);setStep(0);setError('')}}}>Reset this lab</button></footer>
   </article></div>
 </main>
}
