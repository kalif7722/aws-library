'use client';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import './CourseReturnLink.css';

const key='visual-course-return';
type Origin={path:string;label:string;time:number};
function valid(value:unknown):value is Origin{
 return !!value&&typeof value==='object'&&typeof (value as Origin).path==='string'&&/^\/courses\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?$/.test((value as Origin).path)&&typeof (value as Origin).label==='string'&&typeof (value as Origin).time==='number'&&Date.now()-(value as Origin).time<2*60*60*1000;
}
export default function CourseReturnLink(){
 const pathname=usePathname();const [origin,setOrigin]=useState<Origin|null>(null);
 useEffect(()=>{
  const read=()=>{try{const value=JSON.parse(sessionStorage.getItem(key)||'null');setOrigin(valid(value)?value:null)}catch{setOrigin(null)}};
  read();
  const onClick=(event:MouseEvent)=>{
   const target=event.target;
   if(!(target instanceof Element))return;
   const anchor=target.closest('a[href]');if(!anchor)return;
   const destination=new URL(anchor.href,location.href);
   if(location.pathname.startsWith('/courses/')&&destination.origin===location.origin&&!destination.pathname.startsWith('/courses/')&&destination.pathname!=='/'&&destination.pathname!==location.pathname){
    const parts=location.pathname.split('/').filter(Boolean);
    const label=parts.length>2?`${parts[1].replaceAll('-',' ')} · ${parts.at(-1)?.replaceAll('-',' ')}`:parts[1].replaceAll('-',' ');
    sessionStorage.setItem(key,JSON.stringify({path:location.pathname+location.search,label,time:Date.now()}));
   }
  };
  document.addEventListener('click',onClick,true);
  return()=>document.removeEventListener('click',onClick,true);
 },[]);
 useEffect(()=>{if(!pathname.startsWith('/courses/')){try{const value=JSON.parse(sessionStorage.getItem(key)||'null');setOrigin(valid(value)?value:null)}catch{setOrigin(null)}}},[pathname]);
 if(!origin||pathname.startsWith('/courses/')||pathname==='/')return null;
 return <aside className="course-return-link"><a href={origin.path} onClick={()=>sessionStorage.removeItem(key)}>← Back to {origin.label}</a><button type="button" aria-label="Dismiss course return link" onClick={()=>{sessionStorage.removeItem(key);setOrigin(null)}}>×</button></aside>;
}
