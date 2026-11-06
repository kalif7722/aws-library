'use client';
import {useState} from 'react';
export type CourseSearchItem={id:string;title:string;moduleTitle:string;href:string;terms:string};
export default function CourseSearch({items}:{items:CourseSearchItem[]}){
 const [query,setQuery]=useState('');const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const results=words.length?items.filter(item=>words.every(word=>`${item.title} ${item.moduleTitle} ${item.terms}`.toLowerCase().includes(word))).slice(0,30):[];
 return <section className="course-search" id="course-search"><label htmlFor="course-search-input">Search this course</label><input id="course-search-input" type="search" placeholder="Find a service, title or architecture topic…" value={query} onChange={e=>setQuery(e.target.value)}/>{words.length>0&&<div className="course-search-results" role="status">{results.length?results.map(item=><a key={item.id} href={item.href}><strong>{item.title}</strong><span>{item.moduleTitle}</span></a>):<p>No matching lessons.</p>}</div>}</section>
}
