'use client';
import {useEffect,useState} from 'react';
import type {CSSProperties} from 'react';

// A visible, focused slide receives automatic credit after 40 seconds.
// The dwell counter is intentionally never shown to learners.
export const SLIDE_STUDY_SECONDS = 40;
const key=(course:string)=>`study-progress:v1:${course}`;

export function readCompleted(course:string):string[]{
 if(typeof window==='undefined')return [];
 try {
  const value=JSON.parse(localStorage.getItem(key(course))||'[]');
  return Array.isArray(value)?value.filter((x):x is string=>typeof x==='string'):[];
 } catch{return []}
}

export function recordStudyCompletions(course:string,ids:string[]):void{
 if(typeof window==='undefined'||!ids.length)return;
 const current=readCompleted(course);
 const next=[...new Set([...current,...ids.filter(Boolean)])];
 if(next.length===current.length)return;
 try{localStorage.setItem(key(course),JSON.stringify(next));}catch{return}
 window.dispatchEvent(new Event('study-progress-change'));
}

export function recordStudyCompletion(course:string,id:string):void{
 recordStudyCompletions(course,[id]);
}

export function useStudyProgress(course:string,lessonId:string|null){
 const [completed,setCompleted]=useState<string[]>([]);
 const [seconds,setSeconds]=useState(0);
 useEffect(()=>{
  const sync=()=>setCompleted(readCompleted(course));
  sync();
  window.addEventListener('storage',sync);
  window.addEventListener('study-progress-change',sync);
  return ()=>{
   window.removeEventListener('storage',sync);
   window.removeEventListener('study-progress-change',sync);
  };
 },[course]);
 useEffect(()=>{
  setSeconds(0);
  if(!lessonId)return;
  if(readCompleted(course).includes(lessonId))return;
  let seen=0;
  let last=performance.now();
  const timer=window.setInterval(()=>{
   const now=performance.now();
   // Ignore time spent in background tabs, while unfocused or when the device sleeps.
   const elapsed=Math.min(1.5,Math.max(0,(now-last)/1000));
   last=now;
   if(document.visibilityState!=='visible'||!document.hasFocus())return;
   seen+=elapsed;
   setSeconds(Math.floor(seen));
   if(seen>=SLIDE_STUDY_SECONDS){
    recordStudyCompletion(course,lessonId);
    window.clearInterval(timer);
   }
  },1000);
  return()=>window.clearInterval(timer);
 },[course,lessonId]);
 return {
  completed,
  seconds,
  acknowledge:()=>lessonId&&recordStudyCompletion(course,lessonId),
 };
}

// No countdown, stopwatch, or manual "Mark complete" action in the slide viewer.
export function StudyStatus({completed}:{completed:boolean;seconds?:number;onAcknowledge?:()=>void}){
 return completed?<span className="study-status" aria-label="Slide viewed">✓ Viewed</span>:null;
}

type ProgressLesson={id:string;moduleId:string;title:string;href:string};
export function CourseProgress({course,lessons,detailed=false}:{course:string;lessons:ProgressLesson[];detailed?:boolean}){
 const [done,setDone]=useState<string[]>([]);
 useEffect(()=>{
  const update=()=>setDone(readCompleted(course));
  update();
  window.addEventListener('storage',update);
  window.addEventListener('study-progress-change',update);
  return()=>{
   window.removeEventListener('storage',update);
   window.removeEventListener('study-progress-change',update);
  };
 },[course]);
 const finished=lessons.filter(l=>done.includes(l.id)).length;
 const percent=lessons.length?Math.round(finished/lessons.length*100):0;
 const watched=done.filter(x=>x.startsWith(course+'-video-')).length;
 if(detailed)return <section className="course-progress-dashboard" id="study-progress" aria-label="Course learning progress">
  <div className="course-progress-dashboard-heading">
   <div><strong>My course progress</strong><span>{finished} of {lessons.length} slides covered · {watched} {watched===1?'video':'videos'} watched</span></div>
   <strong>{percent}%</strong>
  </div>
  <div className="course-progress-dashboard-track" role="progressbar" aria-label="Course slides covered" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={finished}>
   <span style={{width:`${percent}%`}}/>
  </div>
  <p>Progress updates automatically as you study slides or watch their video chapters. The slide timer is hidden.</p>
 </section>;
 return <div className="course-progress-compact" id="study-progress" role="status" aria-label={`My progress: ${percent}%, ${finished} of ${lessons.length} slides covered, ${watched} videos watched`}
  title={`${finished} of ${lessons.length} slides covered · ${watched} videos watched`}>
  <span className="course-progress-ring" style={{'--progress':`${percent}%`} as CSSProperties}><strong>{percent}%</strong></span>
  <span className="course-progress-label">My progress</span>
 </div>;
}

export function ModuleStudyProgress({course,moduleId,totalSlides}:{course:string;moduleId:string;totalSlides:number}){
 const [done,setDone]=useState<string[]>([]);
 useEffect(()=>{
  const sync=()=>setDone(readCompleted(course));
  sync();
  window.addEventListener('storage',sync);
  window.addEventListener('study-progress-change',sync);
  return()=>{
   window.removeEventListener('storage',sync);
   window.removeEventListener('study-progress-change',sync);
  };
 },[course]);
 const slidePrefix=`${course}-${moduleId}-`;
 const videoPrefix=`${course}-video-${moduleId}`;
 const count=Array.from({length:totalSlides},(_,i)=>`${slidePrefix}${i+1}`).filter(id=>done.includes(id)).length;
 const watched=done.filter(id=>id===videoPrefix||id.startsWith(videoPrefix+'-')).length;
 const percent=totalSlides?Math.round(count*100/totalSlides):0;
 return <div className="module-study-progress" id="module-study-progress" role="status"
   aria-label={`Module progress: ${count} of ${totalSlides} slides covered, ${watched} videos watched`}>
   <div className="module-study-progress-details">
    <strong>My learning progress</strong>
    <span>{count}/{totalSlides} slides covered · {watched} {watched===1?'video':'videos'} watched</span>
   </div>
   <div className="module-study-progress-meter" role="progressbar" aria-valuemin={0} aria-valuemax={totalSlides} aria-valuenow={count} aria-label="Slides covered">
    <span style={{width:`${percent}%`}}/>
   </div>
   <strong className="module-study-progress-pct">{percent}%</strong>
 </div>;
}
