"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
const AUTO_NEXT_KEY = "aip-auto-next:v1";

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
  const autoPlayAttempted=useRef(false);
  const watch=useAipVideoWatchProgress({moduleId,partId:partId??null,chapters:item.chapters,durationSeconds:item.durationSeconds??item.chapters.reduce((n,c)=>n+c.durationSeconds,0)});

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

  const skipSeconds=(delta:number)=>{
    const video=player.current;
    if(!video)return;
    const duration=Number.isFinite(video.duration) ? video.duration : (item.durationSeconds??0);
    const end=duration>0 ? Math.max(0,duration-0.05) : Number.MAX_SAFE_INTEGER;
    const destination=Math.min(end,Math.max(0,video.currentTime+delta));
    // Explicit navigation: do not count the skipped seconds as watched.
    video.currentTime=destination;
    setPosition(destination);
    watch.onSeeked(destination);
    persistPosition(destination);
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
      controls
      controlsList="nofullscreen"
      playsInline
      preload="metadata"
      poster={`https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals/${slideBase}`}
      onDoubleClick={event => {
        if(onToggleFullscreen){event.preventDefault();onToggleFullscreen();}
      }}
      onError={() => setError(true)}
      onLoadedMetadata={event => restorePosition(event.currentTarget)}
      onPlay={event => {
        watch.onPlay(event.currentTarget.currentTime);
        setAutoPlayBlocked(false);
        setResume(0);
      }}
      onSeeked={event => {
        watch.onSeeked(event.currentTarget.currentTime);
        persistPosition(event.currentTarget.currentTime);
      }}
      onTimeUpdate={event => {
        watch.onTimeUpdate(event.currentTarget);
        persistPosition(event.currentTarget.currentTime);
      }}
      onPause={event => {
        if(!event.currentTarget.ended){
          persistPosition(event.currentTarget.currentTime);
          setResume(event.currentTarget.currentTime);
        }
      }}
      onEnded={() => {
        watch.onEnded();
        try { localStorage.removeItem(storageKey); }
        catch { /* Storage may be disabled */ }
        setResume(0);
        onFinished?.();
      }}
    >
      <source src={item.videoUrl} type="video/mp4"/>
      <track src={item.captionsUrl} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support this video.
    </video>
    <div className="av-seek-controls" role="group" aria-label="Video skip controls">
      <button type="button" onClick={()=>skipSeconds(-5)} aria-label="Rewind 5 seconds" title="Back 5 seconds">↶ <span>5s</span></button>
      <button type="button" onClick={()=>skipSeconds(5)} aria-label="Forward 5 seconds" title="Forward 5 seconds"><span>5s</span> ↷</button>
    </div>
    {!fullscreen && onToggleFullscreen && <button className="av-video-enter" type="button"
      onClick={onToggleFullscreen} aria-label="Enter fullscreen with Previous and Next video navigation"
      title="Fullscreen with Previous / Next video controls">⛶ Fullscreen + navigation</button>}
    {fullscreen && <div className="av-video-overlay" role="group" aria-label="Fullscreen lecture navigation">
      <button className="av-video-arrow" type="button"
        disabled={!onPrevious} onClick={onPrevious}
        aria-label={previousTitle ? `Previous video: ${previousTitle}` : "No previous video"}
        title={previousTitle ? `Previous: ${previousTitle}` : "No previous video"}>
        <span aria-hidden="true">❮</span><small>Previous video</small>
      </button>
      <button className="av-video-arrow av-video-arrow-next" type="button"
        disabled={!onNext} onClick={onNext}
        aria-label={nextTitle ? `Next video: ${nextTitle}` : "No next video"}
        title={nextTitle ? `Next: ${nextTitle}` : "No next video"}>
        <small>Next video</small><span aria-hidden="true">❯</span>
      </button>
    </div>}
    {fullscreen && <button className="av-video-exit" type="button"
      onClick={onToggleFullscreen} aria-label="Exit fullscreen video">Exit fullscreen ✕</button>}
    {fullscreen && autoPlayBlocked && <div className="av-fullscreen-playblocked" role="status">
      Your browser paused automatic playback.
      <button type="button" onClick={()=>{void player.current?.play().catch(()=>setAutoPlayBlocked(true));}}>Play this video ▶</button>
    </div>}
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
            <a href={`${COURSE_URL}/visual/module-${moduleId}?slide=${ch.slide}${partId ? `&videoPart=${partId}` : ""}#visual-lessons`}
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
  useEffect(()=>{
    try{setAutoNext(localStorage.getItem(AUTO_NEXT_KEY)==="true");}
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
    if (moduleId === "01" || moduleId === "02") {
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
      .av-player{width:100%;display:block;background:#071a2b;border-radius:12px;aspect-ratio:16/9}
      .av-video-stage{position:relative;min-width:0;min-height:0}
      .av-seek-controls{position:absolute;left:50%;bottom:62px;transform:translateX(-50%);z-index:4;display:flex;gap:12px;pointer-events:none}
      .av-seek-controls button{pointer-events:auto;display:flex;align-items:center;gap:7px;padding:9px 15px;color:#fff;background:#071e36e8;border:1px solid #e0f3ffa3;border-radius:11px;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 3px 14px #0007}
      .av-seek-controls button span{font-size:12px}
      .av-seek-controls button:hover,.av-seek-controls button:focus-visible{background:#0d548a;outline:2px solid #8ad4ff}
      .av-main:fullscreen .av-seek-controls{bottom:70px}
      @media(max-width:600px){.av-seek-controls{bottom:52px;gap:7px}.av-seek-controls button{padding:7px 10px}}
      .av-video-overlay{position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 14px;pointer-events:none}
      .av-video-arrow{pointer-events:auto;background:#08223bd9;border:1px solid #e2f4ff8a;color:white;border-radius:12px;display:flex;align-items:center;gap:10px;padding:13px 14px;min-height:54px;font-weight:750;max-width:220px;box-shadow:0 5px 20px #0008;cursor:pointer}
      .av-video-arrow span{font-size:22px;line-height:1}
      .av-video-arrow small{font-size:12px;color:#fff}
      .av-video-arrow:not(:disabled):hover,.av-video-arrow:not(:disabled):focus-visible{background:#0c4e84;outline:2px solid #8dd4ff}
      .av-video-arrow:disabled{opacity:.27;cursor:default}
      .av-video-enter{position:absolute;right:12px;top:12px;z-index:2;background:#06182ee6;color:#fff;border:1px solid #a3d9ffb3;border-radius:9px;padding:8px 11px;font-size:12px;font-weight:750;cursor:pointer;box-shadow:0 3px 12px #0006}
      .av-video-enter:hover,.av-video-enter:focus-visible{background:#075b92;outline:2px solid #88d7ff}
      .av-video-exit{position:absolute;right:18px;top:16px;background:#06182ed9;color:#fff;border:1px solid #cde5ff88;border-radius:9px;padding:9px 12px;font-weight:750;cursor:pointer}
      .av-fullscreen-playblocked{position:absolute;left:50%;bottom:74px;transform:translateX(-50%);background:#07182eea;border:1px solid #a3ceff;border-radius:12px;padding:12px 15px;color:white;display:flex;align-items:center;gap:14px;font-size:13px;max-width:90%;z-index:6}
      .av-fullscreen-playblocked button{background:#d7efff;color:#0a3258;font-weight:750;border:0;border-radius:8px;padding:9px 12px;cursor:pointer;white-space:nowrap}
      .av-main:fullscreen{box-sizing:border-box;width:100vw;height:100vh;background:#071827;color:#fff;display:flex;flex-direction:column;padding:14px 22px;overflow:hidden}
      .av-main:fullscreen .av-main-top{flex:0 0 auto;margin:0 0 12px}
      .av-main:fullscreen .av-main-top h3,.av-main:fullscreen .av-main-top small{color:#fff}
      .av-main:fullscreen .av-pill{background:#1f4b64;color:#e6faff}
      .av-main:fullscreen .av-video-stage{flex:1;display:flex;align-items:center;justify-content:center}
      .av-main:fullscreen .av-video-stage .av-player{height:100%;max-height:calc(100vh - 105px);width:100%;object-fit:contain;aspect-ratio:auto;border-radius:0}
      .av-main:fullscreen .av-video-overlay{width:100%;box-sizing:border-box}
      .av-main:fullscreen .av-tools,.av-main:fullscreen .av-chapters,.av-main:fullscreen .av-slidebar,.av-main:fullscreen .av-actions,.av-main:fullscreen .av-autoplay-notice{display:none}
      .av-main:fullscreen .av-video-exit{z-index:5}
      @media(max-width:600px){.av-video-arrow{padding:9px;min-height:43px}.av-video-arrow small{display:none}.av-video-overlay{padding:0 7px}.av-main:fullscreen{padding:8px}}
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
    {moduleId === "00" ? <div className="av-main" ref={playerAnchor}>
      {intro?.status === "ready"
        ? <VideoPlayer item={intro} storageKey="aip-module-00-video-progress" slideBase="module-00/slide-01.webp" moduleId="00" fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen}/>
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
      <div className="av-main" ref={playerAnchor}>
        <div className="av-main-top">
          <div>
            <small>PART {active.id} OF {String(parts.length).padStart(2, "0")} · SLIDES {active.start}–{active.end}</small>
            <h3>{active.title}</h3>
            <small>{active.subtitle}</small>
          </div>
          <span className={results[active.id]?.status === "ready" ? "av-pill" : "av-pill pending"}>
            {results[active.id]?.status === "ready" ? "Ready to watch" : "In preparation"}
          </span>
        </div>
        {results[active.id]?.status === "ready"
          ? <VideoPlayer key={active.id} item={results[active.id] as Ready} storageKey={`aip-video-${moduleId}-${active.id}-progress`} slideBase={`module-${moduleId}/slide-${String(active.start).padStart(2,"0")}.webp`} moduleId={moduleId} partId={active.id} autoStart={autoStartPart===active.id}
              onFinished={onVideoEnded} fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen}
              onPrevious={prev ? () => choose(prev.id,true) : undefined}
              onNext={next ? () => choose(next.id,true) : undefined}
              previousTitle={prev?.title} nextTitle={next?.title}/>
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
