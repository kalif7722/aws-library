'use client';
import {useCallback,useEffect,useRef} from 'react';
import {recordStudyCompletions} from './StudyProgress';

type Chapter={slide:number;title:string;startSeconds:number;durationSeconds:number};

/**
 * Credit only distinct seconds of genuine foreground playback.
 * Fast seeking, background playback and replaying the same section do not
 * inflate the count. Watching a lecture also marks its covered slide chapters.
 */
export function useAipVideoWatchProgress({
 moduleId,partId,chapters,durationSeconds
}:{
 moduleId:string;
 partId:string|null;
 chapters:Chapter[];
 durationSeconds:number;
}){
 const last=useRef<number|null>(null);
 const watched=useRef<Set<number>>(new Set());
 const credited=useRef<Set<number>>(new Set());
 const storeKey=`aip-watched-seconds:v1:${moduleId}:${partId??'intro'}`;
 const videoId=`aip-video-${moduleId}${partId?'-'+partId:''}`;

 useEffect(()=>{
  last.current=null;
  watched.current=new Set();
  credited.current=new Set();
  try {
   const value=JSON.parse(localStorage.getItem(storeKey)||'[]');
   if(Array.isArray(value)){
    watched.current=new Set(value.filter((x):x is number=>Number.isInteger(x)&&x>=0&&x<=Math.ceil(durationSeconds)));
   }
  }catch{/* Optional local storage */}
 },[storeKey,durationSeconds]);

 const onPlay=useCallback((time:number)=>{last.current=time},[]);
 const onSeeked=useCallback((time:number)=>{last.current=time},[]);
 const onTimeUpdate=useCallback((video:HTMLVideoElement)=>{
  const t=video.currentTime;
  const previous=last.current;
  last.current=t;
  if(!Number.isFinite(t)||previous===null||t<=previous||t-previous>2.5||
     video.paused||video.seeking||document.visibilityState!=='visible'||!document.hasFocus())return;
  let changed=false;
  for(let second=Math.floor(previous);second<=Math.floor(t);second++){
   if(second<0||second>=Math.ceil(durationSeconds))continue;
   if(!watched.current.has(second)){watched.current.add(second);changed=true}
  }
  if(!changed)return;
  try{localStorage.setItem(storeKey,JSON.stringify([...watched.current]));}
  catch{/* Progress still tracked during this session */}
  const toCredit:string[]=[];
  for(const chapter of chapters){
   if(credited.current.has(chapter.slide))continue;
   const start=Math.max(0,Math.floor(chapter.startSeconds));
   const end=Math.min(Math.ceil(durationSeconds),Math.ceil(chapter.startSeconds+chapter.durationSeconds));
   let listened=0;
   for(let second=start;second<end;second++)if(watched.current.has(second))listened++;
   // Short slides need at least 75% listened; longer slides need 40 seconds.
   const required=Math.min(40,Math.max(1,Math.ceil(chapter.durationSeconds*.75)));
   if(listened>=required){
    credited.current.add(chapter.slide);
    toCredit.push(`aip-${moduleId}-${chapter.slide}`);
   }
  }
  if(watched.current.size>=Math.ceil(durationSeconds*.85))toCredit.push(videoId);
  if(toCredit.length)recordStudyCompletions('aip',toCredit);
 },[chapters,durationSeconds,moduleId,storeKey,videoId]);

 return {onPlay,onSeeked,onTimeUpdate,videoId};
}
