"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import CourseVideoControls,{COURSE_VIDEO_SPEEDS,COURSE_VIDEO_SPEED_KEY,COURSE_VIDEO_AUTO_NEXT_KEY} from "./CourseVideoControls";
import {useAipVideoWatchProgress} from "./useAipVideoWatchProgress";
import {readCompleted} from "./StudyProgress";
import {AIP_VIDEO_PARTS,getAipVideoProgress} from "./aipVideoCatalog";

type Chapter = { slide: number; title: string; startSeconds: number; durationSeconds: number };
type Ready = {
  status: "ready";
  title: string;
  videoUrl: string;
  captionsUrl: string;
  transcriptUrl: string;
  durationSeconds?: number;
  chapters: Chapter[];
};
type VideoResult = Ready | { status: "processing" };

const COURSE_URL = "/courses/aws-generative-ai-developer-professional";
const MODULE_01 = `${COURSE_URL}/visual/module-01`;
const AUTO_NEXT_KEY = COURSE_VIDEO_AUTO_NEXT_KEY;
const PLAYBACK_SPEED_KEY = COURSE_VIDEO_SPEED_KEY;
const PLAYBACK_SPEEDS = COURSE_VIDEO_SPEEDS;

function fmt(seconds: number) {
  if (!Number.isFinite(seconds)) return "—";
  const n = Math.max(0, Math.floor(seconds));
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
}

function VideoPlayer({
  item, storageKey, slideBase, moduleId, partId, autoStart = false,
  onFinished, fullscreen = false, onToggleFullscreen,
  onPrevious, onNext, previousTitle, nextTitle, completed = false,
}: {
  item: Ready;
  storageKey: string;
  slideBase: string;
  moduleId: string;
  partId?: string;
  autoStart?: boolean;
  onFinished?: () => void;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousTitle?: string;
  nextTitle?: string;
  completed?: boolean;
}) {
  const player = useRef<HTMLVideoElement>(null);
  const [resume, setResume] = useState(0);
  const [error, setError] = useState(false);
  const [autoPlayBlocked,setAutoPlayBlocked]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [position,setPosition]=useState(0);
  const [duration,setDuration]=useState(item.durationSeconds??0);
  const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState(1);
  const [captionsOn,setCaptionsOn]=useState(false);
  const [playbackSpeed,setPlaybackSpeed]=useState(1);
  const autoPlayAttempted=useRef(false);
  const watch=useAipVideoWatchProgress({moduleId,partId:partId??null,chapters:item.chapters,durationSeconds:item.durationSeconds??item.chapters.reduce((n,c)=>n+c.durationSeconds,0)});

  // A single browser-local preference applies across all AIP course videos.
  useEffect(()=>{
    try{
      const saved=Number(localStorage.getItem(PLAYBACK_SPEED_KEY)??"1");
      const rate=PLAYBACK_SPEEDS.some(value=>value===saved)?saved:1;
      setPlaybackSpeed(rate);
      if(player.current)player.current.playbackRate=rate;
    }catch{
      setPlaybackSpeed(1);
    }
  },[]);

  const changePlaybackSpeed=(value:number)=>{
    if(!PLAYBACK_SPEEDS.some(rate=>rate===value))return;
    setPlaybackSpeed(value);
    if(player.current)player.current.playbackRate=value;
    try{localStorage.setItem(PLAYBACK_SPEED_KEY,String(value));}
    catch{/* Browser storage may be disabled */}
  };

  const persistPosition=(time:number)=>{
    if(!Number.isFinite(time) || time<0)return;
    try{localStorage.setItem(storageKey,String(time));}
    catch{/* Browser storage may be disabled */}
  };

  useEffect(()=>{
    setError(false);
    setAutoPlayBlocked(false);
    setPlaying(false);
    setPosition(0);
    setDuration(item.durationSeconds??0);
    setMuted(false);
    setVolume(1);
    setCaptionsOn(false);
    autoPlayAttempted.current=false;
    try{
      const current=Number(localStorage.getItem(storageKey)??"0");
      setResume(Number.isFinite(current)&&current>5?current:0);
    }catch{setResume(0);}
    const saveBeforeLeaving=()=>{
      const v=player.current;
      if(v && !v.ended && Number.isFinite(v.currentTime) && v.currentTime>0){
        try{localStorage.setItem(storageKey,String(v.currentTime));}
        catch{/* Optional storage */}
      }
    };
    window.addEventListener("pagehide",saveBeforeLeaving);
    return()=>{
      saveBeforeLeaving();
      window.removeEventListener("pagehide",saveBeforeLeaving);
    };
  },[storageKey]);

  useEffect(()=>{
    if(!autoStart || autoPlayAttempted.current || !player.current)return;
    const video=player.current;
    const tryPlay=()=>{
      if(autoPlayAttempted.current)return;
      autoPlayAttempted.current=true;
      void video.play().catch(()=>setAutoPlayBlocked(true));
    };
    if(video.readyState>=2)tryPlay();
    else{
      video.addEventListener("canplay",tryPlay,{once:true});
      return()=>video.removeEventListener("canplay",tryPlay);
    }
  },[autoStart,item.videoUrl]);

  const restorePosition=(video:HTMLVideoElement)=>{
    let saved=0;
    try{saved=Number(localStorage.getItem(storageKey)??"0");}
    catch{return;}
    const duration=Number.isFinite(video.duration)?video.duration:(item.durationSeconds??0);
    if(!Number.isFinite(saved)||saved<5)return;
    if(duration>0 && saved>=duration-5){
      try{localStorage.removeItem(storageKey);}
      catch{/* Optional storage */}
      setResume(0);
      return;
    }
    video.currentTime=saved;
    setPosition(saved);
    watch.onSeeked(saved);
    setResume(saved);
  };

  const jump=(seconds:number)=>{
    const video=player.current;
    if(!video)return;
    video.currentTime=seconds;
    setPosition(seconds);
    watch.onSeeked(seconds);
    persistPosition(seconds);
    video.scrollIntoView({behavior:"smooth",block:"center"});
  };

  const seekTo=(requested:number)=>{
    const video=player.current;
    if(!video || !Number.isFinite(requested))return;
    const end=Number.isFinite(video.duration) ? video.duration : (item.durationSeconds??0);
    const destination=Math.min(end>0?end:requested,Math.max(0,requested));
    video.currentTime=destination;
    setPosition(destination);
    watch.onSeeked(destination);
    persistPosition(destination);
    // Scrubbing to the finish is intentional completion, not a watch-time claim.
    if(end>0 && destination>=end-0.15)watch.markComplete();
  };
  const skipSeconds=(delta:number)=>{
    const video=player.current;
    if(video)seekTo(video.currentTime+delta);
  };

  const togglePlayback=()=>{
    const video=player.current;
    if(!video)return;
    if(video.paused){
      void video.play().catch(()=>setAutoPlayBlocked(true));
    }else video.pause();
  };
  const toggleMute=()=>{
    const video=player.current;
    if(!video)return;
    video.muted=!video.muted;
    setMuted(video.muted);
  };
  const adjustVolume=(next:number)=>{
    const video=player.current;
    if(!video)return;
    const safe=Math.min(1,Math.max(0,next));
    video.volume=safe;
    video.muted=safe===0;
    setMuted(video.muted);
    setVolume(safe);
  };
  const toggleCaptions=()=>{
    const video=player.current;
    if(!video)return;
    const next=!captionsOn;
    for(let i=0;i<video.textTracks.length;i++)
      video.textTracks[i].mode=next?"showing":"disabled";
    setCaptionsOn(next);
  };
  const completeManually=()=>{
    watch.markComplete();
  };

  const restart=()=>{
    jump(0);
    setResume(0);
  };

  if (error) {
    return <div className="av-empty" role="alert">Video playback could not start. <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Open the MP4 directly</a> or use the slide viewer below.</div>;
  }

  return <>
    <div className="av-video-stage">
      <video
        key={storageKey}
        className="av-player"
        ref={player}
        controls={false}
        playsInline
        preload="metadata"
        aria-label="Lecture video. Use the custom controls below for playback and fullscreen navigation."
        poster={slideBase.startsWith("/") ? slideBase : `https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals/${slideBase}`}
        onClick={togglePlayback}
        onDoubleClick={event=>{
          if(onToggleFullscreen){event.preventDefault();onToggleFullscreen();}
        }}
        onError={()=>setError(true)}
        onLoadedMetadata={event=>{
          const video=event.currentTarget;
          setDuration(Number.isFinite(video.duration)?video.duration:(item.durationSeconds??0));
          for(let i=0;i<video.textTracks.length;i++)video.textTracks[i].mode="disabled";
          restorePosition(video);
          // Apply saved rate even when a newly selected video mounts before effects.
          let rate=playbackSpeed;
          try{
            const saved=Number(localStorage.getItem(PLAYBACK_SPEED_KEY)??"1");
            if(PLAYBACK_SPEEDS.some(candidate=>candidate===saved))rate=saved;
          }catch{/* Keep state rate */}
          video.playbackRate=rate;
          setPlaybackSpeed(rate);
        }}
        onDurationChange={event=>{
          if(Number.isFinite(event.currentTarget.duration))
            setDuration(event.currentTarget.duration);
        }}
        onPlay={event=>{
          watch.onPlay(event.currentTarget.currentTime);
          setPlaying(true);
          setAutoPlayBlocked(false);
          setResume(0);
        }}
        onSeeked={event=>{
          const time=event.currentTarget.currentTime;
          watch.onSeeked(time);
          setPosition(time);
          persistPosition(time);
          if(Number.isFinite(event.currentTarget.duration) &&
             time>=event.currentTarget.duration-0.15)watch.markComplete();
        }}
        onTimeUpdate={event=>{
          watch.onTimeUpdate(event.currentTarget);
          const time=event.currentTarget.currentTime;
          setPosition(time);
          persistPosition(time);
        }}
        onPause={event=>{
          setPlaying(false);
          if(!event.currentTarget.ended){
            persistPosition(event.currentTarget.currentTime);
            setResume(event.currentTarget.currentTime);
          }
        }}
        onEnded={()=>{
          watch.onEnded();
          setPlaying(false);
          setPosition(Number.isFinite(duration)?duration:0);
          try{localStorage.removeItem(storageKey);}catch{/* Optional storage */}
          setResume(0);
          onFinished?.();
        }}
      >
        <source src={item.videoUrl} type="video/mp4"/>
        <track src={item.captionsUrl} kind="subtitles" srcLang="en" label="English"/>
        Your browser does not support this video.
      </video>
      {fullscreen && <div className="av-fullscreen-nav" role="group" aria-label="Fullscreen lecture navigation">
        <button type="button" className="av-nav-previous" disabled={!onPrevious} onClick={onPrevious}
          aria-label={previousTitle?`Previous video: ${previousTitle}`:"No previous video"}
          data-tooltip={previousTitle?`Previous: ${previousTitle}`:"No previous video"}
          title={previousTitle?`Previous: ${previousTitle}`:"No previous video"}>❮</button>
        <button type="button" className="av-nav-next" disabled={!onNext} onClick={onNext}
          aria-label={nextTitle?`Next video: ${nextTitle}`:"No next video"}
          data-tooltip={nextTitle?`Next: ${nextTitle}`:"No next video"}
          title={nextTitle?`Next: ${nextTitle}`:"No next video"}>❯</button>
      </div>}
      {autoPlayBlocked && <div className="av-playblocked" role="status">
        Browser autoplay is paused.
        <button type="button" onClick={()=>{void player.current?.play().catch(()=>setAutoPlayBlocked(true));}}>▶ Play lecture</button>
      </div>}
      <CourseVideoControls playing={playing} position={position} duration={duration}
        playbackSpeed={playbackSpeed} muted={muted} volume={volume} captionsOn={captionsOn}
        fullscreen={fullscreen} onTogglePlayback={togglePlayback} onSkip={skipSeconds}
        onSeek={seekTo} onChangeSpeed={changePlaybackSpeed} onToggleCaptions={toggleCaptions}
        onToggleMute={toggleMute} onVolume={adjustVolume} onFullscreen={onToggleFullscreen}
        onPrevious={onPrevious} onNext={onNext} previousTitle={previousTitle} nextTitle={nextTitle}
        onMarkComplete={completeManually} completed={completed}/>
    </div>
    <div className="av-tools">
      {onToggleFullscreen && <button type="button" className="av-action av-fullscreen-button"
        onClick={onToggleFullscreen}>{fullscreen ? "Exit fullscreen" : "⛶ Fullscreen with video navigation"}</button>}
      {resume > 5 && resume < (item.durationSeconds ?? Infinity) - 5 &&
        <><span>Saved position {fmt(resume)} · resumes automatically</span>
        <button type="button" className="av-action" onClick={restart}>Restart video</button></>}
      <span>{fmt(item.durationSeconds ?? 0)} · {item.chapters.length} slide chapters</span>
      <a href={item.transcriptUrl} target="_blank" rel="noopener noreferrer">Transcript</a>
      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Open MP4</a>
    </div>
    {autoPlayBlocked && <p className="av-autoplay-notice" role="status">The next lecture is ready. Your browser blocked automatic playback; press Play to continue.</p>}
    <details className="av-chapters">
      <summary>Chapters — jump to any slide explanation</summary>
      <div className="av-chapter-grid">
        {item.chapters.map(ch => (
          <div className="av-chapter" key={ch.slide}>
            <button type="button" onClick={() => jump(ch.startSeconds)} aria-label={`Play explanation for slide ${ch.slide}`}>
              <span>{fmt(ch.startSeconds)}</span> {String(ch.slide).padStart(2, "0")} · {ch.title}
            </button>
            <a href={moduleId === "19" ? `/course-visuals/genai-troubleshooting/module19-slide-${String(ch.slide).padStart(2,"0")}.webp` : `${COURSE_URL}/visual/module-${moduleId}?slide=${ch.slide}${partId ? `&videoPart=${partId}` : ""}#visual-lessons`} target={moduleId === "19" ? "_blank" : undefined} rel={moduleId === "19" ? "noopener noreferrer" : undefined}
              title={`Open full-size slide ${ch.slide}`} aria-label={`Open slide ${ch.slide} in viewer`}>Slide ↗</a>
          </div>
        ))}
      </div>
    </details>
  </>;
}

export default function AipVideoLectures({ moduleId }: { moduleId: string }) {
  const [results, setResults] = useState<Record<string, VideoResult>>({});
  const [selected, setSelected] = useState("01");
  const [checking, setChecking] = useState(true);
  const [autoNext,setAutoNext]=useState(false);
  const [autoStartPart,setAutoStartPart]=useState<string|null>(null);
  const [notice,setNotice]=useState<string|null>(null);
  const [fullscreen,setFullscreen]=useState(false);
  // Immersive fullscreen: show each overlay only when the pointer approaches
  // its edge. The UI is initially visible, then fades after inactivity.
  const [hudZone,setHudZone]=useState<"all"|"top"|"bottom"|"sides"|"none">("none");
  const hudTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const clearHudTimer=()=>{
    if(hudTimer.current!==null){clearTimeout(hudTimer.current);hudTimer.current=null;}
  };
  const hideHudSoon=(delay=1000)=>{
    if(hudTimer.current!==null)return;
    hudTimer.current=setTimeout(()=>{hudTimer.current=null;setHudZone("none");},delay);
  };
  const revealHud=(zone:"all"|"top"|"bottom"|"sides",duration?:number)=>{
    clearHudTimer();
    setHudZone(zone);
    if(duration)hideHudSoon(duration);
  };
  useEffect(()=>{
    if(fullscreen)revealHud("all",2600);
    else{clearHudTimer();setHudZone("none");}
    return()=>clearHudTimer();
  },[fullscreen]);
  const trackFullscreenPointer=(event:PointerEvent<HTMLDivElement>)=>{
    if(!fullscreen)return;
    if(event.pointerType==="touch"){revealHud("all",3500);return;}
    const area=event.currentTarget.getBoundingClientRect();
    const x=event.clientX-area.left,y=event.clientY-area.top;
    if(y<145)revealHud("top");
    else if(y>area.height-175)revealHud("bottom");
    else if(x<135||x>area.width-135)revealHud("sides");
    else hideHudSoon(1100);
  };
  useEffect(()=>{
    try{setAutoNext((localStorage.getItem(AUTO_NEXT_KEY)??localStorage.getItem("aip-auto-next:v1"))==="true");}
    catch{/* Site storage may be disabled */}
  },[]);
  const [progressDone,setProgressDone]=useState<string[]>([]);
  useEffect(()=>{
    const refreshProgress=()=>setProgressDone(readCompleted("aip"));
    refreshProgress();
    window.addEventListener("storage",refreshProgress);
    window.addEventListener("study-progress-change",refreshProgress);
    return()=>{
      window.removeEventListener("storage",refreshProgress);
      window.removeEventListener("study-progress-change",refreshProgress);
    };
  },[]);
  const playerAnchor = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const sync=()=>setFullscreen(document.fullscreenElement===playerAnchor.current);
    document.addEventListener("fullscreenchange",sync);
    return()=>document.removeEventListener("fullscreenchange",sync);
  },[]);
  const toggleFullscreen=async()=>{
    const area=playerAnchor.current;
    if(!area)return;
    try{
      if(document.fullscreenElement===area)await document.exitFullscreen();
      else if(document.fullscreenElement){
        setNotice("Exit the current fullscreen view, then choose Fullscreen with video navigation.");
      }else if(area.requestFullscreen)await area.requestFullscreen();
      else setNotice("Fullscreen navigation is not supported by this browser.");
    }catch{
      setNotice("The browser could not open fullscreen. Use the video controls or normal playlist instead.");
    }
  };
  const parts=AIP_VIDEO_PARTS[moduleId]??[];
  const videoStats=getAipVideoProgress(progressDone,moduleId);
  const moduleUrl=`${COURSE_URL}/visual/module-${moduleId}`;
  const readyParts = parts.filter(part => results[part.id]?.status === "ready");
  const active = parts.find(p => p.id === selected) ?? parts[0];

  const refresh = useCallback(async (signal?: AbortSignal) => {
    setChecking(true);
    const ids = (AIP_VIDEO_PARTS[moduleId]??[]).map(p=>p.id);
    const responsePairs = await Promise.all(ids.map(async id => {
      const endpoint = moduleId === "00" ? "/api/aip-video?module=00" : `/api/aip-video?module=${moduleId}&part=${id}`;
      try {
        const response = await fetch(endpoint, { cache: "no-store", signal });
        const data = response.ok ? await response.json() as VideoResult : { status: "processing" as const };
        return [id, data] as const;
      } catch { return [id, { status: "processing" as const }] as const; }
    }));
    if (!signal?.aborted) {
      setResults(Object.fromEntries(responsePairs));
      setChecking(false);
    }
  }, [moduleId]);

  useEffect(() => {
    const ctrl = new AbortController();
    setSelected("01");
    if (moduleId !== "00") {
      const current = new URLSearchParams(window.location.search).get("videoPart");
      const available=AIP_VIDEO_PARTS[moduleId]??[];
      if (available.some(p => p.id === current)) setSelected(current!);
    }
    void refresh(ctrl.signal);
    return () => ctrl.abort();
  }, [moduleId, refresh]);

  const choose = (part: string, startPlaying = false) => {
    setSelected(part);
    setAutoStartPart(startPlaying ? part : null);
    setNotice(null);
    const url = new URL(window.location.href);
    url.searchParams.set("videoPart", part);
    url.hash = "video-lectures";
    window.history.replaceState(null, "", url.toString());
    if(document.fullscreenElement!==playerAnchor.current)
      playerAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onVideoEnded = () => {
    if(!autoNext || moduleId==="00")return;
    const index=parts.findIndex(part=>part.id===selected);
    const following=parts[index+1];
    if(!following){
      setNotice("You've finished the available lectures in this module.");
    }else if(results[following.id]?.status==="ready"){
      choose(following.id,true);
    }else{
      setNotice("The next lecture is not yet available. You can continue with the slides below.");
    }
  };

  const changeAutoNext=(value:boolean)=>{
    setAutoNext(value);
    try{localStorage.setItem(AUTO_NEXT_KEY,String(value));}
    catch{/* Optional browser preference */}
  };

  const selectedIndex = readyParts.findIndex(p => p.id === selected);
  const prev = selectedIndex > 0 ? readyParts[selectedIndex - 1] : undefined;
  const next = selectedIndex >= 0 && selectedIndex < readyParts.length - 1
    ? readyParts[selectedIndex + 1] : undefined;

  const intro = results["00"];
  return <section id="video-lectures" className="av-root" aria-label="AIP video lectures">
    <style>{`
      .av-root{margin:26px 0 32px;background:#fff;border:1px solid #d4e1f0;border-radius:20px;overflow:hidden;color:#162947;box-shadow:0 12px 32px #152d4612;scroll-margin-top:20px}
      .av-root button{font:inherit;cursor:pointer}
      .av-head{background:linear-gradient(118deg,#0f1b3c,#154a7c 65%,#0b7089);color:white;padding:24px 26px}
      .av-head strong{font-size:11px;letter-spacing:.12em;color:#bde7ff}
      .av-head h2{font-size:clamp(21px,2.4vw,27px);margin:6px 0;color:white}
      .av-head p{font-size:13px;line-height:1.6;color:#dceafa;margin:0}
      .av-headlinks{display:flex;gap:18px;margin-top:14px;flex-wrap:wrap}
      .av-headlinks a{font-size:13px;font-weight:700;color:#c0e9ff;text-decoration:underline;text-underline-offset:3px}
      .av-layout{display:grid;grid-template-columns:minmax(235px,310px) minmax(0,1fr);align-items:start}
      .av-list{background:#f5f8fc;border-right:1px solid #dce5f1;padding:13px}
      .av-list-title{margin:4px 8px 12px;font-size:12px;font-weight:800;color:#405d7d;letter-spacing:.06em}
      .av-lesson{display:flex;align-items:flex-start;width:100%;gap:12px;text-align:left;padding:13px 10px;background:transparent;color:#183353;border:1px solid transparent;border-radius:12px;margin-bottom:5px}
      .av-lesson:hover{background:#e8f1fb;border-color:#cbdff2}
      .av-lesson[aria-current="true"]{background:white;border-color:#65a8e6;box-shadow:0 3px 12px #11375d12}
      .av-number{background:#dbeafa;border-radius:8px;padding:7px;min-width:34px;text-align:center;font-size:12px;font-weight:900;color:#13538e}
      .av-lesson[aria-current="true"] .av-number{background:#155a91;color:white}
      .av-copy{min-width:0;flex:1}
      .av-copy b{font-size:13px;line-height:1.35;display:block}
      .av-copy small{font-size:11px;color:#637a91;line-height:1.5;display:block;margin-top:4px}
      .av-status{display:inline-block;margin-top:5px;font-size:11px;font-weight:700;color:#227556}
      .av-status.pending{color:#687990}
      .av-main{min-width:0;padding:22px}
      .av-main-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .av-main h3{font-size:19px;margin:0 0 5px;color:#153956}
      .av-main small{font-size:12px;color:#627b97}
      .av-pill{padding:5px 10px;border-radius:9px;font-size:11px;font-weight:800;background:#e9f7ef;color:#187347}
      .av-pill.pending{background:#eff3f8;color:#60728a}
      .av-video-stage{position:relative;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden;border-radius:12px;background:#061726}
      .av-player{width:100%;aspect-ratio:16/9;display:block;object-fit:contain;cursor:pointer;background:#061726}
      .av-custom-controls{position:relative;z-index:10;flex:none;background:#071827;color:#f5faff;padding:9px 12px 10px}
      .av-timeline{display:block;width:100%;height:13px;margin:0 0 8px;accent-color:#79d8ff;cursor:pointer}
      .av-control-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .av-control-row button{border:1px solid #557b9a;border-radius:8px;padding:8px 10px;color:#effaff;background:#173b5b;font-size:12px;font-weight:750;white-space:nowrap;min-height:36px;cursor:pointer}
      .av-control-row button:hover:not(:disabled),.av-control-row button:focus-visible{background:#17639b;outline:2px solid #8ddcff;outline-offset:1px}
      .av-control-row button:disabled{opacity:.6;cursor:default}
      .av-speed-control{display:flex;gap:5px;align-items:center;color:#effaff;font-size:12px;font-weight:750}
      .av-speed-control select{background:#173b5b;color:#fff;border:1px solid #557b9a;border-radius:8px;padding:8px 5px;font-size:12px;min-height:36px;cursor:pointer}
      .av-speed-control select:focus-visible{outline:2px solid #8ddcff;outline-offset:1px}
      .av-control-row .av-mark-complete{background:#14574f;border-color:#40a895}
      .av-control-row .av-mark-complete:disabled{background:#183d39;color:#b9f5e2;opacity:1}
      .av-timestamp{white-space:nowrap;font-size:12px;color:#dceffa;font-variant-numeric:tabular-nums}
      .av-controls-grow{flex:1 1 8px}
      .av-volume{width:65px;accent-color:#79d8ff;cursor:pointer}
      .av-fullscreen-nav{position:absolute;inset:0;z-index:7;display:flex;align-items:center;justify-content:space-between;pointer-events:none;padding:0 12px 64px}
      .av-fullscreen-nav button{pointer-events:auto;display:flex;align-items:center;gap:9px;justify-content:center;min-height:54px;padding:12px 16px;background:#082b49e8;border:1px solid #c8e7ffb8;border-radius:12px;color:#fff;box-shadow:0 6px 18px #0009;font-size:15px;font-weight:800}
      .av-fullscreen-nav button:hover:not(:disabled),.av-fullscreen-nav button:focus-visible{background:#0e659d;outline:2px solid #8addff}
      .av-fullscreen-nav button:disabled{opacity:.28;cursor:default}
      .av-fullscreen-nav button{position:relative;width:54px;min-width:54px;padding:12px;font-size:23px;line-height:1}
      .av-fullscreen-nav button::after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 10px);left:0;width:max-content;max-width:min(330px,65vw);overflow-wrap:break-word;padding:9px 12px;border:1px solid #b9dffa;border-radius:8px;color:#fff;background:#0a233bed;box-shadow:0 8px 20px #0008;font-size:12px;font-weight:750;line-height:1.4;text-align:left;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .12s}
      .av-nav-next::after{left:auto!important;right:0}
      .av-fullscreen-nav button:not(:disabled):is(:hover,:focus-visible)::after{opacity:1;visibility:visible}
      .av-playblocked{position:absolute;left:50%;bottom:118px;transform:translateX(-50%);z-index:9;display:flex;gap:12px;align-items:center;justify-content:center;background:#061d33f2;border:1px solid #a7deff;border-radius:12px;padding:12px 14px;color:white;font-size:12px;box-shadow:0 5px 22px #0009}
      .av-playblocked button{background:#e3f4ff;color:#123c5c;padding:8px 10px;border:0;border-radius:7px;font-weight:800;white-space:nowrap}
      .av-main:fullscreen{box-sizing:border-box;position:relative;width:100vw;height:100vh;min-height:0;background:#061726;color:#fff;display:flex;flex-direction:column;padding:0;overflow:hidden}
      .av-main:fullscreen .av-main-top{position:absolute;top:0;left:0;right:0;z-index:12;margin:0;padding:18px 28px 32px;background:linear-gradient(#06182ee8,#06182e00);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .25s ease,visibility .25s}
      .av-main:fullscreen .av-main-top h3,.av-main:fullscreen .av-main-top small{color:#fff}
      .av-main:fullscreen .av-pill{display:none}
      .av-main:fullscreen .av-video-stage{flex:1 1 auto;min-height:0;width:100%;border-radius:0;overflow:hidden}
      .av-main:fullscreen .av-player{flex:1 1 auto;min-height:0;height:0;max-height:none;width:100%;aspect-ratio:auto;object-fit:contain;border-radius:0}
      .av-main:fullscreen .av-custom-controls{position:absolute;bottom:0;left:0;right:0;z-index:11;padding:24px 18px 13px;background:linear-gradient(transparent,#061423d9 22%,#061423f5);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(12px);transition:opacity .22s ease,visibility .22s,transform .22s ease}
      .av-main:fullscreen .av-fullscreen-nav{padding:0 18px 28px;opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s}
      .av-main:fullscreen .av-fullscreen-nav button{pointer-events:none}
      .av-main:fullscreen:is(.av-fs-all,.av-fs-top) .av-main-top,.av-main:fullscreen .av-main-top:focus-within{opacity:1;visibility:visible;pointer-events:auto}
      .av-main:fullscreen:is(.av-fs-all,.av-fs-bottom) .av-custom-controls,.av-main:fullscreen .av-custom-controls:focus-within{opacity:1;visibility:visible;pointer-events:auto;transform:none}
      .av-main:fullscreen:is(.av-fs-all,.av-fs-sides) .av-fullscreen-nav,.av-main:fullscreen .av-fullscreen-nav:focus-within{opacity:1;visibility:visible}
      .av-main:fullscreen:is(.av-fs-all,.av-fs-sides) .av-fullscreen-nav button,.av-main:fullscreen .av-fullscreen-nav:focus-within button{pointer-events:auto}
      .av-main:fullscreen .av-tools,.av-main:fullscreen .av-chapters,.av-main:fullscreen .av-slidebar,.av-main:fullscreen .av-actions,.av-main:fullscreen .av-autoplay-notice{display:none}
      @media(prefers-reduced-motion:reduce){.av-main:fullscreen .av-main-top,.av-main:fullscreen .av-custom-controls,.av-main:fullscreen .av-fullscreen-nav{transition:none}}
      @media(max-width:600px){.av-control-row{gap:5px}.av-control-row button{padding:7px 8px;font-size:11px;min-height:32px}.av-volume{width:48px}.av-speed-control span{display:none}.av-speed-control select{padding:6px 3px;min-height:32px}.av-timestamp{font-size:10px}.av-custom-controls{padding:8px}.av-fullscreen-nav button{padding:9px 12px;min-height:43px}.av-main:fullscreen{padding:0}.av-main:fullscreen .av-main-top{padding:12px 16px 28px}.av-main:fullscreen .av-custom-controls{padding:16px 8px 8px}}
      .av-tools{display:flex;align-items:center;gap:14px;flex-wrap:wrap;color:#546b84;font-size:12px;margin:13px 0}
      .av-tools a,.av-actions a{font-weight:700;color:#1466b2;text-decoration:underline;text-underline-offset:3px}
      .av-action{border:1px solid #a7c8ea;background:#edf6ff;color:#104f85;border-radius:9px;padding:8px 12px;font-size:12px;font-weight:700}
      .av-action:disabled{opacity:.4;cursor:default}
      .av-action:hover:not(:disabled){background:#d8edff}
      .av-actions{margin-top:18px;padding-top:17px;border-top:1px solid #dce8f4;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
      .av-actions span{flex:1}
      .av-auto-toggle{display:flex;gap:9px;align-items:center;cursor:pointer;font-size:12px;color:#284f71;font-weight:750;white-space:nowrap}
      .av-auto-toggle input{width:16px;height:16px;accent-color:#1765ad}
      .av-autoplay-notice{font-size:12px;color:#91551b;background:#fff7e9;padding:10px 12px;border-radius:9px}
      .av-empty{border:1px dashed #bfd2e6;background:#f6f9fc;padding:24px;border-radius:12px;color:#506883;font-size:13px;line-height:1.7}
      .av-empty a{color:#1466b2;text-decoration:underline}
      .av-chapters{border:1px solid #e0e9f3;border-radius:12px;margin-top:15px;overflow:hidden}
      .av-chapters summary{cursor:pointer;padding:12px 14px;color:#1d5486;font-size:13px;font-weight:800;background:#f4f8fd}
      .av-chapter-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;padding:12px}
      .av-chapter{display:flex;align-items:center;justify-content:space-between;gap:8px;border-radius:8px;background:#f4f8fc;padding:7px 9px}
      .av-chapter button{border:0;background:none;color:#1f4a70;font-size:12px;line-height:1.4;text-align:left;flex:1}
      .av-chapter button span{font-size:11px;color:#7c889a;margin-right:7px;font-weight:700}
      .av-chapter a{font-size:11px;font-weight:700;white-space:nowrap;color:#1761a4}
      .av-slidebar{margin-top:14px;padding:12px 14px;background:#f5f8fe;border-radius:10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-size:13px}
      .av-slidebar a{font-weight:800;color:#1563ad}
      @media(max-width:840px){.av-layout{grid-template-columns:1fr}.av-list{border-right:0;border-bottom:1px solid #dce5f1;display:flex;gap:8px;overflow-x:auto}.av-list-title{display:none}.av-lesson{min-width:185px;max-width:225px;margin:0}.av-main{padding:17px}.av-chapter-grid{grid-template-columns:1fr}}
    `}</style>
    <div className="av-head">
      <strong>AIP-C01 · VIDEO LEARNING PATH</strong>
      <h2>{moduleId === "00" ? "Introduction · Guided Video" : `Module ${moduleId} · Video Lectures`}</h2>
      <p>{moduleId === "00" ? "A continuous lecture following the 12 original course images." : "Follow the original AWS diagrams in topic order. Choose a part, watch the lecturer, or study its individual slides."}</p>
      <div className="av-headlinks">
        <a href="#visual-lessons">Open visual slides ↓</a>
        <a href={COURSE_URL}>All course modules</a>
        {moduleId === "00" && <a href={MODULE_01+"#video-lectures"}>Next module: GenAI Fundamentals</a>}
      </div>
    </div>
    {moduleId === "00" ? <div className={`av-main av-fs-${hudZone}`} ref={playerAnchor}
      tabIndex={fullscreen?0:undefined}
      onFocus={()=>{if(fullscreen)revealHud("all",3500);}}
      onPointerMove={trackFullscreenPointer} onPointerLeave={()=>fullscreen&&hideHudSoon(650)}
      onPointerDown={event=>{if(fullscreen&&event.pointerType==="touch")revealHud("all",3500);}}
      onKeyDown={()=>{if(fullscreen)revealHud("all",3500);}}>
      {intro?.status === "ready"
        ? <VideoPlayer item={intro} storageKey="aip-module-00-video-progress" slideBase="module-00/slide-01.webp" moduleId="00" fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} completed={videoStats.completedIds.includes("aip-video-00")}/>
        : <p className="av-empty">{checking ? "Checking the introduction video…" : "The revised video is not currently available. Open the original slides below."}</p>}
      <div className="av-actions"><a href={MODULE_01+"#video-lectures"}>Continue to Module 01 →</a></div>
    </div> : <div className="av-layout">
      <nav className="av-list" aria-label="Choose video part">
        <div className="av-list-title">PLAYLIST · {readyParts.length}/{parts.length} AVAILABLE · {videoStats.completed} COMPLETED</div>
        {parts.map(p => {
          const ready = results[p.id]?.status === "ready";
          return <button key={p.id} type="button" className="av-lesson" aria-current={selected === p.id ? "true" : undefined} onClick={() => choose(p.id)}>
            <span className="av-number">{p.id}</span>
            <span className="av-copy">
              <b>{p.title}</b>
              <small>{p.subtitle} · Slides {p.start}–{p.end}</small>
              <span className={ready ? "av-status" : "av-status pending"}>{ready ? (videoStats.completedIds.includes(`aip-video-${moduleId}-${p.id}`) ? "✓ Completed" : videoStats.seenIds.includes(`aip-video-${moduleId}-${p.id}`) ? `◐ In progress · ${fmt((results[p.id] as Ready).durationSeconds ?? 0)}` : `▶ Watch · ${fmt((results[p.id] as Ready).durationSeconds ?? 0)}`) : "In preparation"}</span>
            </span>
          </button>;
        })}
      </nav>
      <div className={`av-main av-fs-${hudZone}`} ref={playerAnchor}
        tabIndex={fullscreen?0:undefined}
        onFocus={()=>{if(fullscreen)revealHud("all",3500);}}
        onPointerMove={trackFullscreenPointer} onPointerLeave={()=>fullscreen&&hideHudSoon(650)}
        onPointerDown={event=>{if(fullscreen&&event.pointerType==="touch")revealHud("all",3500);}}
        onKeyDown={()=>{if(fullscreen)revealHud("all",3500);}}>
        <div className="av-main-top">
          <div>
            <small>PART {active.id} OF {String(parts.length).padStart(2, "0")} · SLIDES {active.start}–{active.end}</small>
            <h3>{active.title}</h3>
            <small>{active.subtitle}</small>
          </div>
          <span className={results[active.id]?.status === "ready" ? "av-pill" : "av-pill pending"}>
            {results[active.id]?.status === "ready"
              ? (videoStats.completedIds.includes(`aip-video-${moduleId}-${active.id}`) ? "✓ Completed" : "Ready to watch")
              : "In preparation"}
          </span>
        </div>
        {results[active.id]?.status === "ready"
          ? <VideoPlayer key={active.id} item={results[active.id] as Ready} storageKey={`aip-video-${moduleId}-${active.id}-progress`} slideBase={moduleId === "19" ? `/course-visuals/genai-troubleshooting/module19-slide-${String(active.start).padStart(2,"0")}.webp` : `module-${moduleId}/slide-${String(active.start).padStart(2,"0")}.webp`} moduleId={moduleId} partId={active.id} autoStart={autoStartPart===active.id}
              onFinished={onVideoEnded} fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen}
              onPrevious={prev ? () => choose(prev.id,true) : undefined}
              onNext={next ? () => choose(next.id,true) : undefined}
              previousTitle={prev?.title} nextTitle={next?.title}
              completed={videoStats.completedIds.includes(`aip-video-${moduleId}-${active.id}`)}/>
          : <div className="av-empty" role="status">{checking ? "Checking lecture availability…" : "This topic's video is in production. Its source slides are still available for study."}</div>}
        <div className="av-slidebar">
          <span>Want to inspect the actual architecture diagrams?</span>
          <a href={`${moduleUrl}?slide=${active.start}&videoPart=${active.id}#visual-lessons`}>Open slide {active.start} in full screen ↗</a>
          <a href="#visual-lessons">All slides ↓</a>
        </div>
        {notice && <p className="av-autoplay-notice" role="status">{notice}</p>}
        <div className="av-actions">
          <label className="av-auto-toggle">
            <input type="checkbox" checked={autoNext} onChange={event=>changeAutoNext(event.currentTarget.checked)}/>
            Auto-play next video
          </label>
          <button type="button" className="av-action" disabled={!prev} onClick={() => prev && choose(prev.id)}>← Previous video</button>
          <button type="button" className="av-action" disabled={!next} onClick={() => next && choose(next.id)}>Next video →</button>
          <span/>
          <button type="button" className="av-action" onClick={() => void refresh()}>Refresh availability</button>
        </div>
      </div>
    </div>}
  </section>;
}
