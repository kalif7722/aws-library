"use client";
import {useEffect,useRef,useState} from "react";

type Chapter = {slide:number; title:string; startSeconds:number; durationSeconds:number};
type Ready = {status:"ready";title:string;videoUrl:string;captionsUrl:string;transcriptUrl:string;durationSeconds:number;chapters:Chapter[]};
type Result = Ready | {status:"processing"};
const LECTURES:Record<string,{id:string;title:string;start:number;end:number}[]> = {
  "00":[{id:"01",title:"Start Here — Your AI Practitioner Learning Journey",start:1,end:4}],
  "01":[{id:"01",title:"AI Fundamentals — From Everyday Examples to Generative AI",start:1,end:6}],
};
const fmt=(v:number)=>Number.isFinite(v)?`${Math.floor(v/60)}:${String(Math.floor(v%60)).padStart(2,"0")}`:"–";
const frame={background:"#101d36",border:"1px solid #3b526d",borderRadius:16,padding:18,color:"#e9f2ff"} as const;

export default function AifVideoLectures({moduleId}:{moduleId:string}){
  const entries=LECTURES[moduleId]??[];
  const [active,setActive]=useState("01");
  const [results,setResults]=useState<Record<string,Result>>({});
  const [checking,setChecking]=useState(true);
  const [speed,setSpeed]=useState(1);
  const [position,setPosition]=useState(0);
  const player=useRef<HTMLVideoElement>(null);
  const selected=entries.find(x=>x.id===active)??entries[0];
  const result=results[active];
  useEffect(()=>{
    const controller=new AbortController();
    setChecking(true);
    setActive("01");
    setResults({});
    Promise.all((LECTURES[moduleId]??[]).map(async x=>{
      try{
        const res=await fetch(`/api/aif-video?module=${moduleId}&part=${x.id}`,{cache:"no-store",signal:controller.signal});
        const value=(res.ok?await res.json():{status:"processing"}) as Result;
        return [x.id,value] as const;
      }catch{return [x.id,{status:"processing"} as Result] as const;}
    })).then(items=>{if(!controller.signal.aborted){setResults(Object.fromEntries(items));setChecking(false);}})
      .catch(()=>{if(!controller.signal.aborted)setChecking(false);});
    return ()=>controller.abort();
  },[moduleId]);
  useEffect(()=>{
    try{const v=Number(localStorage.getItem("aif-video-speed")??"1");
      if([0.75,1,1.25,1.5,1.75,2].includes(v))setSpeed(v);
    }catch{}
  },[]);
  useEffect(()=>{if(player.current)player.current.playbackRate=speed;},[speed,active,result]);
  useEffect(()=>{
    if(result?.status!=="ready")return;
    try{const p=Number(localStorage.getItem(`aif-video-${moduleId}-${active}-position`)??"0");
      if(player.current&&p>4&&p<result.durationSeconds-5)player.current.currentTime=p;
    }catch{}
  },[result,active,moduleId]);
  if(!entries.length)return null;
  const ready=result?.status==="ready"?result:null;
  const source=(n:number)=>`/course-visuals/aif-course/module-${moduleId}/slide-${String(n).padStart(2,"0")}.webp`;
  return <section id="video-lectures" aria-label="Beginner-friendly video lectures" style={{margin:"26px auto 32px",scrollMarginTop:24}}>
    <div style={{...frame,background:"linear-gradient(130deg,#101c35,#17365a)"}}>
      <p style={{letterSpacing:"0.11em",fontWeight:800,fontSize:12,color:"#74e0fa",margin:"0 0 8px"}}>VISUAL-FIRST VIDEO LESSONS</p>
      <h2 style={{fontSize:"clamp(20px,2.3vw,29px)",margin:"0 0 8px",color:"#fff"}}>Learn AI step by step — no prior experience required</h2>
      <p style={{color:"#cbdcf0",lineHeight:1.65,margin:"0 0 20px"}}>We explain each diagram in plain English, define unfamiliar terms, use everyday examples, and connect each concept to a real decision. The original lesson visuals remain available below.</p>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr)",gap:16}}>
        <div role="list" aria-label="Video lessons" style={{display:"grid",gap:8}}>
          {entries.map(item=><button key={item.id} type="button" role="listitem" onClick={()=>setActive(item.id)}
            style={{cursor:"pointer",border:item.id===active?"2px solid #56d9ff":"1px solid #46617a",borderRadius:10,padding:"13px 14px",textAlign:"left",background:item.id===active?"#1d4366":"#14283f",color:"#f2f7ff"}}>
            <strong style={{display:"block",fontSize:15}}>Video {item.id} · {item.title}</strong>
            <small style={{color:"#b2d2ed"}}>Slides {item.start}–{item.end} · {results[item.id]?.status==="ready"?"Ready to watch":checking?"Checking video":"In preparation"}</small>
          </button>)}
        </div>
        {ready?<div>
          <video key={ready.videoUrl} ref={player} controls playsInline preload="metadata" poster={source(selected.start)}
            style={{display:"block",width:"100%",maxHeight:620,aspectRatio:"16 / 9",background:"#07111f",borderRadius:12}}
            onLoadedMetadata={e=>{e.currentTarget.playbackRate=speed;}}
            onTimeUpdate={e=>{setPosition(e.currentTarget.currentTime);try{localStorage.setItem(`aif-video-${moduleId}-${active}-position`,String(Math.round(e.currentTarget.currentTime)));}catch{}}}
            onEnded={()=>{try{localStorage.removeItem(`aif-video-${moduleId}-${active}-position`);}catch{}}}>
            <source src={ready.videoUrl} type="video/mp4"/>
            <track src={ready.captionsUrl} kind="subtitles" srcLang="en" label="English"/>
            Your browser does not support HTML5 video.
          </video>
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:12,margin:"12px 0 16px"}}>
            <label htmlFor="aif-playback-speed" style={{fontSize:13}}>Playback speed</label>
            <select id="aif-playback-speed" value={speed} onChange={e=>{const v=Number(e.target.value);setSpeed(v);try{localStorage.setItem("aif-video-speed",String(v));}catch{}}}
              style={{borderRadius:8,padding:"6px 8px",color:"#172a43",background:"#fff"}}>
              {[0.75,1,1.25,1.5,1.75,2].map(v=><option key={v} value={v}>{v}×</option>)}
            </select>
            <span style={{fontSize:13,color:"#cbdcf0"}}>{fmt(position)} / {fmt(ready.durationSeconds)}</span>
            <a href={ready.transcriptUrl} target="_blank" rel="noopener noreferrer" style={{color:"#7ae0ff",fontSize:13}}>Read transcript</a>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {ready.chapters.map(ch=><button key={ch.slide} type="button" onClick={()=>{if(player.current){player.current.currentTime=ch.startSeconds;void player.current.play().catch(()=>{});}}}
              style={{border:"1px solid #44617c",borderRadius:8,padding:"8px 10px",background:"#213651",color:"#f4f9ff",cursor:"pointer",fontSize:12}}>
              {String(ch.slide).padStart(2,"0")} · {ch.title}
            </button>)}
          </div>
        </div>:<div role="status" style={{border:"1px dashed #58718b",padding:18,borderRadius:10,color:"#d4e5f4"}}>
          {checking?"Checking the narrated lecture on the media server…":"This video is being prepared. The original slides and explanations remain available below, and playback will appear only when the complete MP4 and manifest have passed verification."}
        </div>}
      </div>
    </div>
  </section>;
}
