"use client";
import {useCallback,useEffect,useRef,useState,type PointerEvent,type KeyboardEvent} from "react";
import CourseVideoControls,{COURSE_VIDEO_SPEEDS,COURSE_VIDEO_SPEED_KEY,COURSE_VIDEO_AUTO_NEXT_KEY,formatVideoTime} from "./CourseVideoControls";

type Chapter={slide:number;title:string;startSeconds:number;durationSeconds:number};
type Ready={status:"ready";title:string;videoUrl:string;captionsUrl:string;transcriptUrl:string;durationSeconds:number;chapters:Chapter[]};
type Result=Ready|{status:"processing"};
type Lecture={id:string;title:string;start:number;end:number};
const LECTURES:Record<string,Lecture[]>={
  "00":[{id:"01",title:"Start Here — Your AI Practitioner Learning Journey",start:1,end:4}],
  "01":[{id:"01",title:"AI Fundamentals — From Everyday Examples to Generative AI",start:1,end:6}],
  "03":[
    {id:"01",title:"AI Fundamentals, Use Cases and Rule-Based vs Learning Systems",start:1,end:5},
    {id:"02",title:"Deep Learning and Neural Networks Explained Visually",start:6,end:8},
    {id:"03",title:"Generative AI, Transformers, Diffusion and Multimodal Models Explained",start:9,end:14},
  ],
  "02":[
    {id:"01",title:"Cloud Foundations — How the Internet and Servers Work",start:1,end:6},
    {id:"02",title:"What Cloud Computing Is and Why Businesses Use It",start:7,end:13},
    {id:"03",title:"Cloud Service Models, Responsibility and Pricing",start:14,end:17},
    {id:"04",title:"AWS History, Global Infrastructure and Regional Design",start:18,end:25},
    {id:"05",title:"AWS Console, Security Responsibilities and Safe Learning Costs",start:26,end:29},
  ],
};
const MODULE_PATH="/courses/aws-ai-practitioner/visual/module-";
const AUTO_NEXT_KEY=COURSE_VIDEO_AUTO_NEXT_KEY;
const frame={background:"#101d36",border:"1px solid #3b526d",borderRadius:16,padding:18,color:"#e9f2ff"} as const;

export default function AifVideoLectures({moduleId}:{moduleId:string}){
  const entries=LECTURES[moduleId]??[];
  const [active,setActive]=useState("01");
  const [results,setResults]=useState<Record<string,Result>>({});
  const [checking,setChecking]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [speed,setSpeed]=useState(1);
  const [position,setPosition]=useState(0);
  const [duration,setDuration]=useState(0);
  const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState(1);
  const [captionsOn,setCaptionsOn]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  const [hudVisible,setHudVisible]=useState(true);
  const [autoNext,setAutoNext]=useState(false);
  const [completed,setCompleted]=useState(false);
  const [notice,setNotice]=useState("");
  const [mediaError,setMediaError]=useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);
  const stageRef=useRef<HTMLDivElement>(null);
  const hudTimeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  const selected=entries.find(x=>x.id===active)??entries[0];
  const result=results[active];
  const readyCount=entries.filter(lecture=>results[lecture.id]?.status==="ready").length;
  const ready=result?.status==="ready"?result:null;
  const storageKey=`aif-video-${moduleId}-${active}-position`;
  const completedKey=`aif-video-${moduleId}-${active}-complete`;
  const source=(n:number)=>`/course-visuals/aif-course/module-${moduleId}/slide-${String(n).padStart(2,"0")}.webp`;
  const currentIndex=entries.findIndex(x=>x.id===active);
  const previous=entries[currentIndex-1];
  const following=entries[currentIndex+1];
  const moduleIds=Object.keys(LECTURES).sort();
  const modulePosition=moduleIds.indexOf(moduleId);
  const previousModule=modulePosition>0?moduleIds[modulePosition-1]:undefined;
  const nextModule=modulePosition>=0?moduleIds[modulePosition+1]:undefined;

  const revealHud=useCallback((durationMs=2800)=>{
    setHudVisible(true);
    if(hudTimeout.current)clearTimeout(hudTimeout.current);
    hudTimeout.current=setTimeout(()=>setHudVisible(false),durationMs);
  },[]);
  useEffect(()=>()=>{if(hudTimeout.current)clearTimeout(hudTimeout.current);},[]);
  useEffect(()=>{
    const sync=()=>{const value=document.fullscreenElement===stageRef.current;setFullscreen(value);if(value)revealHud(3000);};
    document.addEventListener("fullscreenchange",sync);
    return()=>document.removeEventListener("fullscreenchange",sync);
  },[revealHud]);

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
    try{
      const stored=Number(localStorage.getItem(COURSE_VIDEO_SPEED_KEY)
        ??localStorage.getItem("aif-video-speed")??"1");
      if(COURSE_VIDEO_SPEEDS.some(value=>value===stored))setSpeed(stored);
      setAutoNext(localStorage.getItem(AUTO_NEXT_KEY)==="true");
    }catch{}
  },[]);
  useEffect(()=>{
    setPosition(0);setPlaying(false);setMuted(false);setVolume(1);
    setCaptionsOn(false);setMediaError(false);setNotice("");
    try{setCompleted(localStorage.getItem(completedKey)==="true");}catch{setCompleted(false);}
  },[completedKey]);

  const savePosition=(t:number)=>{
    if(!Number.isFinite(t)||t<0)return;
    try{localStorage.setItem(storageKey,String(t));}catch{}
  };
  const seek=(seconds:number)=>{
    const video=videoRef.current;
    if(!video||!Number.isFinite(seconds))return;
    const max=Number.isFinite(video.duration)?video.duration:(ready?.durationSeconds??seconds);
    const target=Math.min(Math.max(0,seconds),max>0?max:seconds);
    video.currentTime=target;setPosition(target);savePosition(target);
  };
  const togglePlay=()=>{
    const video=videoRef.current;
    if(!video)return;
    if(video.paused)void video.play().catch(()=>setNotice("Press Play to start this lecture."));
    else video.pause();
  };
  const changeSpeed=(rate:number)=>{
    if(!COURSE_VIDEO_SPEEDS.some(x=>x===rate))return;
    setSpeed(rate);
    if(videoRef.current)videoRef.current.playbackRate=rate;
    try{localStorage.setItem(COURSE_VIDEO_SPEED_KEY,String(rate));}catch{}
  };
  const toggleCaptions=()=>{
    const video=videoRef.current;
    if(!video)return;
    const next=!captionsOn;
    for(let i=0;i<video.textTracks.length;i++)video.textTracks[i].mode=next?"showing":"disabled";
    setCaptionsOn(next);
  };
  const toggleMute=()=>{
    const video=videoRef.current;
    if(!video)return;
    video.muted=!video.muted;setMuted(video.muted);
  };
  const adjustVolume=(v:number)=>{
    const video=videoRef.current;
    if(!video)return;
    video.volume=Math.max(0,Math.min(1,v));video.muted=v===0;
    setVolume(video.volume);setMuted(video.muted);
  };
  const toggleFullscreen=async()=>{
    try{
      if(document.fullscreenElement===stageRef.current)await document.exitFullscreen();
      else if(!document.fullscreenElement&&stageRef.current?.requestFullscreen)await stageRef.current.requestFullscreen();
      else setNotice("Exit your current fullscreen view before opening this lecture.");
    }catch{setNotice("This browser could not open fullscreen navigation.");}
  };
  const choose=(id:string,autoPlay=false)=>{
    setActive(id);setNotice("");
    if(autoPlay){
      // Keyed video remount is needed; playback begins after canplay on the newly selected video.
      setAutoPlayPart(id);
    } else setAutoPlayPart(null);
  };
  const [autoPlayPart,setAutoPlayPart]=useState<string|null>(null);
  const changeAutoNext=(on:boolean)=>{
    setAutoNext(on);
    try{localStorage.setItem(AUTO_NEXT_KEY,String(on));}catch{}
  };
  const selectPrevious=()=>{
    if(previous)choose(previous.id);
    else if(previousModule)window.location.assign(MODULE_PATH+previousModule+"#video-lectures");
  };
  const selectNext=()=>{
    if(following)choose(following.id,true);
    else if(nextModule)window.location.assign(MODULE_PATH+nextModule+"#video-lectures");
  };
  const hasPrev=Boolean(previous||previousModule),hasNext=Boolean(following||nextModule);
  const markComplete=()=>{
    setCompleted(true);
    try{localStorage.setItem(completedKey,"true");}catch{}
  };
  const finish=()=>{
    setPlaying(false);markComplete();
    try{localStorage.removeItem(storageKey);}catch{}
    if(autoNext&&hasNext)selectNext();
  };
  const trackHud=(event:PointerEvent<HTMLDivElement>)=>{
    if(!fullscreen)return;
    if(event.pointerType==="touch"){revealHud(4000);return;}
    const area=event.currentTarget.getBoundingClientRect();
    const y=event.clientY-area.top,x=event.clientX-area.left;
    if(y<120||y>area.height-160||x<115||x>area.width-115)revealHud(2500);
  };
  const handleKeyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
    const target=event.target as HTMLElement;
    if(["INPUT","SELECT","TEXTAREA","BUTTON"].includes(target.tagName)||!ready)return;
    const key=event.key.toLowerCase();
    if(key==="arrowleft"){event.preventDefault();seek((videoRef.current?.currentTime??0)-5);}
    else if(key==="arrowright"){event.preventDefault();seek((videoRef.current?.currentTime??0)+5);}
    else if(key===" "){event.preventDefault();togglePlay();}
    else if(key==="c"){toggleCaptions();}
    else if(key==="f"){void toggleFullscreen();}
    if(fullscreen)revealHud(4000);
  };

  if(!entries.length)return null;
  return <section id="video-lectures" aria-label="Beginner-friendly video lectures" style={{margin:"26px auto 32px",scrollMarginTop:24}}>
    <style>{`
      .aif-video-stage{position:relative;display:flex;flex-direction:column;min-width:0;overflow:hidden;border-radius:12px;background:#061726}
      .aif-video-stage video{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#061726;cursor:pointer}
      .aif-video-stage:fullscreen{width:100vw;height:100dvh;max-width:none;border-radius:0;background:#03101e}
      .aif-video-stage:fullscreen video{flex:1;min-height:0;height:100%;width:100%;aspect-ratio:auto}
      .aif-video-stage:fullscreen .cv-controls{position:absolute;left:0;right:0;bottom:0;opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .22s ease,transform .22s ease;background:#061827ee}
      .aif-video-stage:fullscreen[data-hud="visible"] .cv-controls,
      .aif-video-stage:fullscreen .cv-controls:focus-within{opacity:1;transform:translateY(0);pointer-events:auto}
      .aif-video-fullscreen-nav{position:absolute;top:50%;left:0;right:0;display:flex;justify-content:space-between;pointer-events:none;transform:translateY(-50%);opacity:0;transition:opacity .2s}
      .aif-video-stage:fullscreen[data-hud="visible"] .aif-video-fullscreen-nav,
      .aif-video-stage:fullscreen .aif-video-fullscreen-nav:focus-within{opacity:1}
      .aif-video-fullscreen-nav button{pointer-events:auto;border:1px solid #527da2;border-radius:10px;padding:13px 17px;background:#0c2943dd;color:white;cursor:pointer;font-size:20px}
      .aif-video-fullscreen-nav button:disabled{opacity:.35;cursor:default}
      @media(prefers-reduced-motion:reduce){.aif-video-stage:fullscreen .cv-controls,.aif-video-fullscreen-nav{transition:none}}
    `}</style>
    <div style={{...frame,background:"linear-gradient(130deg,#101c35,#17365a)"}}>
      <p style={{letterSpacing:".11em",fontWeight:800,fontSize:12,color:"#74e0fa",margin:"0 0 8px"}}>VISUAL-FIRST VIDEO LESSONS</p>
      <h2 style={{fontSize:"clamp(20px,2.3vw,29px)",margin:"0 0 8px",color:"#fff"}}>Learn AI step by step — no prior experience required</h2>
      <p style={{color:"#cbdcf0",lineHeight:1.65,margin:"0 0 20px"}}>Every slide is explained in plain English with examples and practical decisions. Video controls follow the same standard as the AIP course.</p>
      <p role="status" aria-live="polite" style={{color:"#a7e9ff",fontWeight:700,fontSize:13,margin:"-7px 0 14px"}}>{checking?"Checking published videos…":`${readyCount} of ${entries.length} module videos ready to watch`}</p>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr)",gap:16}}>
        <div role="list" aria-label="Video lessons" style={{display:"grid",gap:8}}>
          {entries.map(item=><button key={item.id} type="button" role="listitem" onClick={()=>choose(item.id)}
            aria-current={item.id===active?"true":undefined}
            style={{cursor:"pointer",border:item.id===active?"2px solid #56d9ff":"1px solid #46617a",borderRadius:10,padding:"13px 14px",textAlign:"left",background:item.id===active?"#1d4366":"#14283f",color:"#f2f7ff"}}>
            <strong style={{display:"block",fontSize:15}}>Video {item.id} · {item.title}</strong>
            <small style={{color:"#b2d2ed"}}>Slides {item.start}–{item.end} · {results[item.id]?.status==="ready"?(completed&&item.id===active?"✓ Completed":"Ready to watch"):checking?"Checking video":"In preparation"}</small>
          </button>)}
        </div>
        {ready&&!mediaError?<div>
          <div ref={stageRef} className="aif-video-stage" data-hud={hudVisible?"visible":"hidden"}
            tabIndex={fullscreen?0:undefined} onPointerMove={trackHud}
            onPointerDown={e=>{if(fullscreen&&e.pointerType==="touch")revealHud(4000);}}
            onFocus={()=>{if(fullscreen)revealHud(4000);}} onKeyDown={handleKeyboard}>
            <video key={ready.videoUrl} ref={videoRef} controls={false} playsInline preload="metadata"
              poster={source(selected.start)} aria-label="Narrated lecture video. Use the player controls below."
              onClick={togglePlay} onDoubleClick={()=>void toggleFullscreen()}
              onError={()=>setMediaError(true)}
              onLoadedMetadata={e=>{
                const v=e.currentTarget;
                setDuration(Number.isFinite(v.duration)?v.duration:ready.durationSeconds);
                v.playbackRate=speed;
                for(let i=0;i<v.textTracks.length;i++)v.textTracks[i].mode="disabled";
                try{
                  const saved=Number(localStorage.getItem(storageKey)??"0");
                  if(saved>5&&saved<v.duration-5)v.currentTime=saved;
                }catch{}
              }}
              onCanPlay={e=>{
                if(autoPlayPart===active){setAutoPlayPart(null);void e.currentTarget.play().catch(()=>setNotice("Select Play to begin the next lecture."));}
              }}
              onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}
              onTimeUpdate={e=>{setPosition(e.currentTarget.currentTime);savePosition(e.currentTarget.currentTime);}}
              onEnded={finish}>
              <source src={ready.videoUrl} type="video/mp4"/>
              <track src={ready.captionsUrl} kind="subtitles" srcLang="en" label="English"/>
              Your browser does not support HTML5 video.
            </video>
            {fullscreen&&<div className="aif-video-fullscreen-nav" role="group" aria-label="Fullscreen lecture navigation">
              <button type="button" disabled={!hasPrev} onClick={selectPrevious} aria-label="Previous lecture" title="Previous lecture">❮</button>
              <button type="button" disabled={!hasNext} onClick={selectNext} aria-label="Next lecture" title="Next lecture">❯</button>
            </div>}
            <CourseVideoControls playing={playing} position={position} duration={duration||ready.durationSeconds}
              playbackSpeed={speed} muted={muted} volume={volume} captionsOn={captionsOn} fullscreen={fullscreen}
              onTogglePlayback={togglePlay} onSkip={delta=>seek((videoRef.current?.currentTime??0)+delta)}
              onSeek={seek} onChangeSpeed={changeSpeed} onToggleCaptions={toggleCaptions}
              onToggleMute={toggleMute} onVolume={adjustVolume}
              onPrevious={hasPrev?selectPrevious:undefined} onNext={hasNext?selectNext:undefined}
              previousTitle={previous?.title??(previousModule?"Previous module":"")}
              nextTitle={following?.title??(nextModule?"Next module":"")}
              onFullscreen={()=>void toggleFullscreen()} onMarkComplete={markComplete} completed={completed}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:13,margin:"12px 0 16px"}}>
            <label style={{display:"inline-flex",gap:7,alignItems:"center",fontSize:13,color:"#d8ebff"}}>
              <input type="checkbox" checked={autoNext} onChange={e=>changeAutoNext(e.currentTarget.checked)}/>
              Auto-play next lecture
            </label>
            <span style={{fontSize:12,color:"#cbdcf0"}}>{formatVideoTime(ready.durationSeconds)} · {ready.chapters.length} slide chapters</span>
            <a href={ready.transcriptUrl} target="_blank" rel="noopener noreferrer" style={{color:"#7ae0ff",fontSize:13}}>Read transcript</a>
            <a href={ready.videoUrl} target="_blank" rel="noopener noreferrer" style={{color:"#7ae0ff",fontSize:13}}>Open MP4</a>
          </div>
          {notice&&<p role="status" style={{color:"#ffe6a7"}}>{notice}</p>}
          <details style={{color:"#eaf6ff"}}><summary style={{cursor:"pointer",padding:"8px 0"}}>Chapters — jump to any slide explanation</summary>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
              {ready.chapters.map(ch=><div key={ch.slide} style={{display:"flex",gap:7,alignItems:"center"}}>
                <button type="button" onClick={()=>{seek(ch.startSeconds);void videoRef.current?.play().catch(()=>{});}}
                  style={{border:"1px solid #44617c",borderRadius:8,padding:"8px 10px",background:"#213651",color:"#f4f9ff",cursor:"pointer",fontSize:12}}>
                  {formatVideoTime(ch.startSeconds)} · {String(ch.slide).padStart(2,"0")} · {ch.title}
                </button>
                <a href={source(ch.slide)} target="_blank" rel="noopener noreferrer" style={{color:"#7ae0ff",fontSize:12}} aria-label={`Open original slide ${ch.slide}`}>Slide ↗</a>
              </div>)}
            </div>
          </details>
        </div>:<div role="status" style={{border:"1px dashed #58718b",padding:18,borderRadius:10,color:"#d4e5f4"}}>
          {mediaError?"Video playback encountered a media error; the original slides are still available below.":checking?"Checking the narrated lecture on the media server…":"This video is being prepared. The source slides remain available below, and the full player appears after the MP4 and manifest are verified."}
        </div>}
      </div>
    </div>
  </section>;
}
