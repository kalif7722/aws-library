'use client';
import {useEffect,useState} from 'react';
import type {CSSProperties} from 'react';

const key=(course:string)=>`study-progress:v1:${course}`;
export function readCompleted(course:string):string[]{
 try{return JSON.parse(localStorage.getItem(key(course))||'[]') as string[]}catch{return []}
}
export function useStudyProgress(course:string,lessonId:string|null){
 const [completed,setCompleted]=useState<string[]>([]),[seconds,setSeconds]=useState(0);
 useEffect(()=>{setCompleted(readCompleted(course));const sync=()=>setCompleted(readCompleted(course));window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync)},[course]);
 useEffect(()=>{setSeconds(0);if(!lessonId)return;const timer=window.setInterval(()=>{if(document.visibilityState==='visible')setSeconds(s=>s+1)},1000);return()=>window.clearInterval(timer)},[lessonId]);
 useEffect(()=>{if(lessonId&&seconds>=120&&!completed.includes(lessonId))markCompleted(course,lessonId,setCompleted)},[course,lessonId,seconds,completed]);
 return {completed,seconds,acknowledge:()=>lessonId&&markCompleted(course,lessonId,setCompleted)};
}
function markCompleted(course:string,id:string,set:(ids:string[])=>void){const next=[...new Set([...readCompleted(course),id])];localStorage.setItem(key(course),JSON.stringify(next));set(next);window.dispatchEvent(new Event('study-progress-change'))}
export function StudyStatus({completed,seconds,onAcknowledge}:{completed:boolean;seconds:number;onAcknowledge:()=>void}){
 return <div className="study-status" role="status"><span>{completed?'✓ Completed':`Study time ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} / 2:00`}</span>{!completed&&<button type="button" onClick={onAcknowledge}>I studied this slide · mark complete</button>}</div>
}
export function CourseProgress({course,lessons}:{course:string;lessons:{id:string;moduleId:string;title:string;href:string}[]}){
 const [done,setDone]=useState<string[]>([]);
 useEffect(()=>{const update=()=>setDone(readCompleted(course));update();window.addEventListener('storage',update);window.addEventListener('study-progress-change',update);return()=>{window.removeEventListener('storage',update);window.removeEventListener('study-progress-change',update)}},[course]);
 const finished=lessons.filter(l=>done.includes(l.id)).length;
 const percent=lessons.length?Math.round(finished/lessons.length*100):0;
 return <div className="course-progress-compact" id="study-progress" role="status" aria-label={`My progress: ${percent}%, ${finished} of ${lessons.length} slides completed`} title={`${finished} of ${lessons.length} slides completed`}>
  <span className="course-progress-ring" style={{'--progress':`${percent}%`} as CSSProperties}><strong>{percent}%</strong></span><span className="course-progress-label">My progress</span>
 </div>
}
