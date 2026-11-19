"use client";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {ChevronDown} from "lucide-react";
import {serviceProviders} from "./ServiceProviderNav";
import ThemeToggle from "./ThemeToggle";
import SemanticSearch from "./SemanticSearch";
import "./PortalNavigation.css";

const links = [
  {title:"Courses", href:"/courses", active:(p:string)=>p.startsWith("/courses")},
  {title:"Services", href:"/services", active:(p:string)=>/^\/(?:services|azure-services|gcp-services)(?:\/|$)/.test(p)},
  {title:"Compare", href:"/cloud-comparison", active:(p:string)=>p.startsWith("/cloud-comparison")},
];
const resumeKey = "visual-cloud:last-module:v1";
const moduleRoute = /^\/courses\/[a-z0-9-]+\/visual\/module-\d+(?:\?.*)?(?:#.*)?$/;
export function PortalResume({className=""}:{className?:string}){
  const [last,setLast]=useState("");
  useEffect(()=>{
    const read=()=>{try {const path=localStorage.getItem(resumeKey) || "";setLast(moduleRoute.test(path) ? path : "");}catch{}};
    read();window.addEventListener("pageshow",read);window.addEventListener("storage",read);
    return()=>{window.removeEventListener("pageshow",read);window.removeEventListener("storage",read);};
  },[]);
  return last ? <a className={className} href={last}>Continue learning <span aria-hidden="true">→</span></a> : null;
}
export default function PortalChrome(){
  const pathname=usePathname() || "/";
  const menu=useRef<HTMLDetailsElement>(null);
  const servicesMenu=useRef<HTMLDetailsElement>(null);
  const show=pathname === "/" || /^\/(?:courses|services|azure-services|gcp-services|cloud-comparison)(?:\/|$)/.test(pathname);
  useEffect(()=>{
    if(menu.current)menu.current.open=false;
    if(servicesMenu.current)servicesMenu.current.open=false;
    if(!moduleRoute.test(pathname))return;
    const remember=()=>{try {const p=location.pathname+location.search+location.hash;if(moduleRoute.test(p))localStorage.setItem(resumeKey,p);}catch{}};
    remember();
    window.addEventListener("pagehide",remember);
    window.addEventListener("popstate",remember);
    window.addEventListener("hashchange",remember);
    document.addEventListener("visibilitychange",remember);
    return()=>{window.removeEventListener("pagehide",remember);window.removeEventListener("popstate",remember);window.removeEventListener("hashchange",remember);document.removeEventListener("visibilitychange",remember);};
  },[pathname]);
  if(!show)return <><ThemeToggle/><SemanticSearch/></>;
  const providerLinks=serviceProviders.map(provider=><li key={provider.key}><a href={provider.href}
    aria-current={pathname===provider.href?"page":undefined}>{provider.label} services</a></li>);
  const navigation=(mobile:boolean)=>links.map(link=>{
    const active=link.active(pathname);
    const isServices=link.href==="/services";
    const destination=<a key={link.href} href={link.href}
      aria-current={active&&(!isServices||pathname===link.href)?"page":undefined}
      className={active&&isServices?"portal-services-active":undefined}>{link.title}</a>;
    if(!isServices)return destination;
    if(mobile)return <div key={link.href}>{destination}<ul aria-label="Cloud service directories" className="portal-mobile-providers">{providerLinks}</ul></div>;
    return <div key={link.href} className="portal-service-nav">{destination}
      <details ref={servicesMenu} className="portal-service-dropdown"
        onBlur={event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))event.currentTarget.open=false;}}
        onKeyDown={event=>{if(event.key==="Escape"&&event.currentTarget.open){event.preventDefault();event.currentTarget.open=false;event.currentTarget.querySelector("summary")?.focus();}}}>
        <summary aria-label="Choose a cloud service directory" title="Choose a cloud service directory"><ChevronDown size={16} aria-hidden="true"/></summary>
        <ul aria-label="Cloud service directories">{providerLinks}</ul>
      </details>
    </div>;
  });
  return <header className="portal-site-header">
    <div className="portal-header-inner">
      <a className="portal-brand" href="/"><span aria-hidden="true">VC</span>Visual Cloud Learning</a>
      <nav className="portal-desktop-nav" aria-label="Primary navigation">{navigation(false)}</nav>
      <div className="portal-header-actions">
        <SemanticSearch inHeader/>
        <ThemeToggle inHeader/>
        <details className="portal-menu" ref={menu} onKeyDown={e=>{if(e.key==="Escape"&&menu.current?.open){menu.current.open=false;menu.current.querySelector("summary")?.focus();}}}><summary>Menu</summary><nav aria-label="Mobile navigation">{navigation(true)}</nav></details>
      </div>
    </div>
  </header>;
}
