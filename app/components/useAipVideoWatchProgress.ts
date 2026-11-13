'use client';

import {useCallback,useEffect,useRef} from 'react';
import {readCompleted,recordStudyCompletions} from './StudyProgress';
import {aipVideoId,aipVideoStartedId,aipVideoCompletionIds} from './aipVideoCatalog';

type Chapter={slide:number;title:string;startSeconds:number;durationSeconds:number};

/**
 * Persist distinct seconds of actual foreground playback. Seek jumps and
 * background playback do not count toward passive study credit.
 * A video also completes when a learner reaches its end or explicitly marks
 * it complete, without a minimum watch-time requirement.
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
  const videoId=aipVideoId(moduleId,partId??'00');
  const startedId=aipVideoStartedId(moduleId,partId??'00');

  const awardCredit=useCallback(()=>{
    const recorded=new Set(readCompleted('aip'));
    const added:string[]=[];
    for(const chapter of chapters){
      const slideId=`aip-${moduleId}-${chapter.slide}`;
      if(recorded.has(slideId) || credited.current.has(chapter.slide))continue;
      const start=Math.max(0,Math.floor(chapter.startSeconds));
      const end=Math.min(Math.ceil(durationSeconds),Math.ceil(chapter.startSeconds+chapter.durationSeconds));
      let played=0;
      for(let i=start;i<end;i++)if(watched.current.has(i))played++;
      const required=Math.min(40,Math.max(1,Math.ceil(chapter.durationSeconds*.75)));
      if(played>=required){
        credited.current.add(chapter.slide);
        added.push(slideId);
        recorded.add(slideId);
      }
    }
    if(!recorded.has(startedId) && watched.current.size>=15){
      added.push(startedId);
      recorded.add(startedId);
    }
    if(!recorded.has(videoId)){
      const byPlayback=durationSeconds>0 &&
        watched.current.size>=Math.ceil(durationSeconds*.85);
      const bySlides=chapters.length>0 &&
        chapters.every(ch=>recorded.has(`aip-${moduleId}-${ch.slide}`));
      if(byPlayback || bySlides)added.push(videoId);
    }
    if(added.length)recordStudyCompletions('aip',added);
  },[chapters,durationSeconds,moduleId,startedId,videoId]);

  useEffect(()=>{
    last.current=null;
    watched.current=new Set();
    credited.current=new Set();
    try{
      const saved=JSON.parse(localStorage.getItem(storeKey)||'[]');
      if(Array.isArray(saved)){
        watched.current=new Set(saved.filter((x):x is number=>
          Number.isInteger(x)&&x>=0&&x<Math.ceil(durationSeconds)));
      }
    }catch{/* Progress remains usable for this session */}
    // Restore completion credit from older saved playback records as well.
    awardCredit();
  },[storeKey,durationSeconds,awardCredit]);

  const onPlay=useCallback((time:number)=>{last.current=time},[]);
  const onSeeked=useCallback((time:number)=>{last.current=time},[]);
  const onTimeUpdate=useCallback((video:HTMLVideoElement)=>{
    const now=video.currentTime;
    const before=last.current;
    last.current=now;
    if(before===null||!Number.isFinite(now)||now<=before||video.paused||
      video.seeking||document.visibilityState!=='visible'||!document.hasFocus())return;
    // A seek is separately reset in onSeeked. Guard against other large jumps.
    if(now-before>Math.max(4,3*Math.max(0.5,video.playbackRate)))return;
    let changed=false;
    for(let i=Math.floor(before);i<=Math.floor(now);i++){
      if(i<0||i>=Math.ceil(durationSeconds))continue;
      if(!watched.current.has(i)){watched.current.add(i);changed=true;}
    }
    if(!changed)return;
    try{localStorage.setItem(storeKey,JSON.stringify([...watched.current]));}
    catch{/* Optional local persistence */}
    awardCredit();
  },[storeKey,durationSeconds,awardCredit]);

  // Finishing the timeline, including skipping to the end, or deliberately
  // marking the lecture complete is sufficient. Credit its mapped slides too
  // so module progress and the video playlist stay consistent.
  const markComplete=useCallback(()=>{
    recordStudyCompletions('aip',
      aipVideoCompletionIds(moduleId,partId??'00',chapters.map(chapter=>chapter.slide)));
  },[moduleId,partId,chapters]);

  const onEnded=useCallback(()=>{
    last.current=null;
    markComplete();
  },[markComplete]);

  return {onPlay,onSeeked,onTimeUpdate,onEnded,markComplete,videoId};
}
