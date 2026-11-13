"use client";
import {useEffect,useMemo,useState} from "react";

type Cue={start:number;end:number;text:string};
const timestamp=(value:string)=>{
  const p=value.trim().replace(",",".").split(":").map(Number);
  if(p.length<2||p.length>3||p.some(x=>!Number.isFinite(x)))return NaN;
  return p.reduce((sum,n)=>sum*60+n,0);
};
export function parseCourseVideoVtt(source:string):Cue[]{
  const lines=source.replace(/\r/g,"").split("\n");
  const cues:Cue[]=[];
  for(let i=0;i<lines.length;i++){
    if(!lines[i].includes("-->"))continue;
    const times=lines[i].split("-->");
    const start=timestamp(times[0]);
    const end=timestamp(times[1].trim().split(/\s+/)[0]);
    const text:string[]=[];
    while(i+1<lines.length&&lines[i+1].trim())text.push(lines[++i].trim());
    if(Number.isFinite(start)&&Number.isFinite(end)&&end>start&&text.length){
      cues.push({start,end,text:text.join(" ").replace(/<[^>]*>/g,"")});
    }
  }
  return cues.sort((a,b)=>a.start-b.start);
}

/** Synchronized captions rendered over the picture, independent of native cross-origin track UI. */
export default function CourseVideoCaptions({src,position,enabled}:{src:string;position:number;enabled:boolean}){
  const [cues,setCues]=useState<Cue[]>([]);
  const [error,setError]=useState(false);
  useEffect(()=>{
    const controller=new AbortController();
    setCues([]);setError(false);
    fetch("/api/course-video-captions?src="+encodeURIComponent(src),{signal:controller.signal})
      .then(r=>{if(!r.ok)throw Error("captions unavailable");return r.text();})
      .then(data=>{if(!controller.signal.aborted)setCues(parseCourseVideoVtt(data));})
      .catch(()=>{if(!controller.signal.aborted)setError(true);});
    return()=>controller.abort();
  },[src]);
  const cue=useMemo(()=>cues.find(c=>position>=c.start&&position<c.end),[cues,position]);
  if(!enabled)return null;
  return <div className="cv-caption-layer" aria-label="Spoken English captions">
    <style>{`
      .cv-caption-layer{pointer-events:none;position:absolute;z-index:8;left:5%;right:5%;bottom:82px;text-align:center;display:flex;justify-content:center;align-items:flex-end}
      .cv-caption-text{display:inline-block;max-width:920px;background:rgba(2,12,25,.88);color:#fff;font-size:clamp(14px,1.55vw,23px);font-weight:650;line-height:1.45;padding:7px 13px;border-radius:7px;box-shadow:0 2px 12px #0009;white-space:normal;text-wrap:balance}
      .cv-caption-layer:fullscreen{bottom:100px}
      @media(max-width:600px){.cv-caption-layer{bottom:90px;left:3%;right:3%}.cv-caption-text{font-size:13px;padding:5px 9px}}
    `}</style>
    {cue?<span className="cv-caption-text">{cue.text}</span>:error?<span className="cv-caption-text">Captions unavailable for this video.</span>:null}
  </div>;
}
