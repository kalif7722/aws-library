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
    {id:"04",title:"Training Data, Labels and Structured versus Unstructured Information",start:15,end:18},
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
      .aif-video-shell{background:#fff;border:1px solid #d4e1f0;border-radius:20px;overflow:hidden;color:#162947;box-shadow:0 12px 32px #152d4612}
      .aif-video-head{background:linear-gradient(118deg,#0f1b3c,#154a7c 65%,#0b7089);color:#fff;padding:24px 26px}
      .aif-video-head strong{font-size:11px;letter-spacing:.12em;color:#bde7ff}
      .aif-video-head h2{font-size:clamp(21px,2.4vw,27px);margin:6px 0;color:white}
      .aif-video-head p{font-size:13px;line-height:1.6;color:#dceafa;margin:0}
      .aif-video-head a{font-size:13px;font-weight:700;color:#c0e9ff;text-decoration:underline}
      .aif-video-layout{display:grid;grid-template-columns:minmax(235px,310px) minmax(0,1fr);align-items:start}
      .aif-video-list{background:#f5f8fc;border-right:1px solid #dce5f1;padding:13px;display:flex;flex-direction:column;gap:5px;min-width:0;align-self:stretch}
      .aif-video-list-title{margin:4px 8px 12px;font-size:12px;font-weight:800;color:#405d7d;letter-spacing:.06em}
      .aif-video-lesson{display:flex;align-items:flex-start;width:100%;gap:12px;text-align:left;padding:13px 10px;background:transparent;color:#183353;border:1px solid transparent;border-radius:12px;cursor:pointer;font:inherit}
      .aif-video-lesson:hover{background:#e8f1fb;border-color:#cbdff2}
      .aif-video-lesson[aria-current="true"]{background:white;border-color:#65a8e6;box-shadow:0 3px 12px #11375d12}
      .aif-video-number{background:#dbeafa;border-radius:8px;padding:7px;min-width:34px;text-align:center;font-size:12px;font-weight:900;color:#13538e}
      .aif-video-lesson[aria-current="true"] .aif-video-number{background:#155a91;color:white}
      .aif-video-copy{min-width:0;flex:1}
      .aif-video-copy b{font-size:13px;line-height:1.35;display:block}
      .aif-video-copy small{font-size:11px;color:#637a91;line-height:1.5;display:block;margin-top:4px}
      .aif-video-status{display:inline-block;margin-top:5px;font-size:11px;font-weight:700;color:#227556}
      .aif-video-status.pending{color:#687990}
      .aif-video-main{min-width:0;padding:22px}
      .aif-video-main-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .aif-video-main-top h3{font-size:19px;margin:5px 0;color:#153956}
      .aif-video-main-top small{font-size:12px;color:#627b97}
      .aif-video-pill{padding:5px 10px;border-radius:9px;font-size:11px;font-weight:800;background:#e9f7ef;color:#187347}
      .aif-video-pill.pending{background:#eff3f8;color:#60728a}
      .aif-video-tools{display:flex;flex-wrap:wrap;align-items:center;gap:13px;margin:12px 0 16px;color:#546b84;font-size:12px}
      .aif-video-tools a{color:#1466b2;text-decoration:underline;font-weight:700}
      .aif-video-chapters{border:1px solid #e0e9f3;border-radius:12px;margin-top:15px;overflow:hidden;color:#1d5486}
      .aif-video-chapters summary{cursor:pointer;padding:12px 14px;font-size:13px;font-weight:800;background:#f4f8fd}
      .aif-video-chapter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;padding:12px}
      .aif-video-chapter{display:flex;align-items:center;gap:7px;padding:7px;background:#f4f8fc;border-radius:8px}
      .aif-video-chapter button{border:0;background:none;color:#1f4a70;cursor:pointer;text-align:left;font-size:12px;flex:1}
      .aif-video-chapter a{font-size:11px;color:#1761a4;white-space:nowrap}
      .aif-video-empty{border:1px dashed #bfd2e6;background:#f6f9fc;padding:24px;border-radius:12px;color:#506883;font-size:13px;line-height:1.7}
      @media(max-width:840px){.aif-video-layout{grid-template-columns:1fr}.aif-video-list{border-right:0;border-bottom:1px solid #dce5f1;max-height:340px;overflow-y:auto}.aif-video-main{padding:17px}.aif-video-chapter-grid{grid-template-columns:1fr}}
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
    <div className="aif-video-shell">
      <div className="aif-video-head">
        <strong>AIF-C01 · VIDEO LEARNING PATH</strong>
        <h2>{moduleId==="00"?"Introduction · Guided Video":`Module ${moduleId} · Video Lectures`}</h2>
        <p>Learn AI and cloud foundations step by step. Choose a topic, watch the video, or study its original slides.</p>
        <div style={{display:"flex",gap:18,marginTop:14,flexWrap:"wrap"}}>
          <a href="#visual-lessons">Open visual slides ↓</a>
          <a href="/courses/aws-ai-practitioner">All course modules</a>
        </div>
      </div>
      <div className="aif-video-layout">
        <nav aria-label="Choose video lecture" className="aif-video-list">
          <div className="aif-video-list-title">PLAYLIST · {readyCount}/{entries.length} AVAILABLE</div>
          {entries.map(item=>{
            const itemResult=results[item.id];
            const isReady=itemResult?.status==="ready";
            return <button key={item.id} type="button" className="aif-video-lesson" onClick={()=>choose(item.id)} aria-current={item.id===active?"true":undefined}>
              <span className="aif-video-number">{item.id}</span>
              <span className="aif-video-copy">
                <b>{item.title}</b>
                <small>Slides {item.start}–{item.end}</small>
                <span className={isReady?"aif-video-status":"aif-video-status pending"}>{isReady?(completed&&item.id===active?"✓ Completed":`▶ Watch · ${formatVideoTime(itemResult.durationSeconds)}`):checking?"Checking video":"In preparation"}</span>
              </span>
            </button>;
          })}
        </nav>
        <div className="aif-video-main">
          <div className="aif-video-main-top">
            <div>
              <small>PART {selected.id} OF {String(entries.length).padStart(2,"0")} · SLIDES {selected.start}–{selected.end}</small>
              <h3>{selected.title}</h3>
              <small>Visual-first, beginner-friendly guided explanation</small>
            </div>
            <span className={ready?"aif-video-pill":"aif-video-pill pending"}>{ready?(completed?"✓ Completed":"Ready to watch"):"In preparation"}</span>
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
          <div className="aif-video-tools">
            <label style={{display:"inline-flex",gap:7,alignItems:"center",fontSize:13,color:"#284f71"}}>
              <input type="checkbox" checked={autoNext} onChange={e=>changeAutoNext(e.currentTarget.checked)}/>
              Auto-play next lecture
            </label>
            <span style={{fontSize:12,color:"#546b84"}}>{formatVideoTime(ready.durationSeconds)} · {ready.chapters.length} slide chapters</span>
            <a href={ready.transcriptUrl} target="_blank" rel="noopener noreferrer" >Read transcript</a>
            <a href={ready.videoUrl} target="_blank" rel="noopener noreferrer" >Open MP4</a>
          </div>
          {notice&&<p role="status" style={{color:"#91551b"}}>{notice}</p>}
          <details className="aif-video-chapters"><summary>Chapters — jump to any slide explanation</summary>
            <div className="aif-video-chapter-grid">
              {ready.chapters.map(ch=><div key={ch.slide} className="aif-video-chapter">
                <button type="button" onClick={()=>{seek(ch.startSeconds);void videoRef.current?.play().catch(()=>{});}}
                  >
                  {formatVideoTime(ch.startSeconds)} · {String(ch.slide).padStart(2,"0")} · {ch.title}
                </button>
                <a href={source(ch.slide)} target="_blank" rel="noopener noreferrer"  aria-label={`Open original slide ${ch.slide}`}>Slide ↗</a>
              </div>)}
            </div>
          </details>
        </div>:<div role="status" className="aif-video-empty">
          {mediaError?"Video playback encountered a media error; the original slides are still available below.":checking?"Checking the narrated lecture on the media server…":"This video is being prepared. The source slides remain available below, and the full player appears after the MP4 and manifest are verified."}
        </div>}
        </div>
      </div>
    </div>
  </section>;
}
