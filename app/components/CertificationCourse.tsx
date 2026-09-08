"use client";

import { useEffect, useMemo, useState, type CSSProperties, type SyntheticEvent } from "react";
import type { ScopeCategory } from "../course-data";
import { guideAliases } from "../course-data";
import { services } from "../services/page";
import { assetUrl } from "../../lib/asset-url";

type Props = { code: string; level: string; title: string; description: string; scope: ScopeCategory[]; sourceUrl: string; sourceLabel: string; };

const normalize = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/\b(amazon|aws)\b/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\b(simple|elastic)\b/g, " ").trim();
const acronym = (value: string) => { const match = value.match(/\((?:Amazon |AWS )?([A-Z0-9]+)\)/); return match?.[1]?.toLowerCase() || ""; };
const explicitAliases: Record<string, string> = {
  "Amazon Elastic Container Registry (Amazon ECR)": "Amazon ECR",
  "Amazon Elastic Container Service (Amazon ECS)": "Amazon ECS",
  "Amazon Elastic Kubernetes Service (Amazon EKS)": "Amazon EKS",
  "Amazon Simple Notification Service (Amazon SNS)": "Amazon SNS",
  "Amazon Simple Queue Service (Amazon SQS)": "Amazon SQS",
  "Amazon Simple Storage Service (Amazon S3)": "Amazon S3",
  "Amazon Elastic Block Store (Amazon EBS)": "Amazon EBS",
  "Amazon Elastic File System (Amazon EFS)": "Amazon EFS",
  "AWS Identity and Access Management (IAM)": "AWS IAM",
  "AWS Resource Access Manager (AWS RAM)": "AWS Resource Access Manager (RAM)",
  "AWS Key Management Service (AWS KMS)": "AWS KMS",
  "AWS Security Token Service (AWS STS)": "AWS Security Token Service",
  "AWS Certificate Manager (ACM)": "AWS Certificate Manager",
  "AWS Command Line Interface (AWS CLI)": "AWS CLI",
  "Amazon Bedrock AgentCore": "Amazon Bedrock AgentCore",
  "Amazon Bedrock Knowledge Bases": "Amazon Bedrock Knowledge Bases",
  "Amazon Bedrock Prompt Management": "Amazon Bedrock Prompt Management",
  "Amazon Bedrock Prompt Flows": "Amazon Bedrock Prompt Flows",
  "Amazon SageMaker Clarify": "Amazon SageMaker Clarify",
  "Amazon SageMaker Data Wrangler": "Amazon SageMaker Data Wrangler",
  "Amazon SageMaker Ground Truth": "Amazon SageMaker Ground Truth",
  "Amazon SageMaker JumpStart": "Amazon SageMaker JumpStart",
  "Amazon SageMaker Model Monitor": "Amazon SageMaker Model Monitor",
  "Amazon SageMaker Model Registry": "Amazon SageMaker Model Registry",
  "Amazon SageMaker Neo": "Amazon SageMaker Neo",
  "Amazon SageMaker Processing": "Amazon SageMaker Processing",
  "Amazon SageMaker Unified Studio": "Amazon SageMaker Unified Studio",
  "Amazon Titan": "Amazon Titan",
};
const guideName = (name: string) => explicitAliases[name] || guideAliases[name] || name;
export const findGuide = (name: string) => {
  const target = guideName(name);
  const exact = services.find((item) => item.name.toLowerCase() === target.toLowerCase());
  if (exact) return exact;
  const normalized = normalize(target);
  const byNormalized = services.find((item) => normalize(item.name) === normalized);
  if (byNormalized) return byNormalized;
  const short = acronym(name);
  if (short) return services.find((item) => item.name.toLowerCase().split(/\s+/).includes(short) || item.name.toLowerCase().endsWith(` ${short}`));
  return undefined;
};

const repoAssetUrl = (path: string) => `https://raw.githubusercontent.com/kalif7722/aws-library/main${path.startsWith("/") ? path : `/${path}`}`;
const imageFallback = (event: SyntheticEvent<HTMLImageElement>, path: string) => {
  const image = event.currentTarget;
  const repoUrl = repoAssetUrl(path);
  if (image.src !== repoUrl) { image.src = repoUrl; return; }
  image.onerror = null;
};

export default function CertificationCourse({ code, level, title, description, scope, sourceUrl, sourceLabel }: Props) {
  const uniqueServices = new Set(scope.flatMap((category) => category.services)).size;
  const references = scope.reduce((total, category) => total + category.services.length, 0);
  const available = useMemo(() => scope.flatMap((category) => category.services).map(findGuide).filter(Boolean), [scope]);
  const pending = new Set(scope.flatMap((category) => category.services).filter((service) => !findGuide(service))).size;
  const [selectedName, setSelectedName] = useState(available[0]?.name || "");
  const [expanded, setExpanded] = useState(false); const [imageScale, setImageScale] = useState(100); const [dragging, setDragging] = useState(false); const [dragStart, setDragStart] = useState({ x: 0, scale: 100 }); const [allOpen, setAllOpen] = useState(false); const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const selected = services.find((item) => item.name === selectedName) || available[0];
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  useEffect(() => { if (!dragging) return; const move = (event: PointerEvent) => setImageScale(Math.max(60, Math.min(220, dragStart.scale + (event.clientX - dragStart.x) / 4))); const up = () => setDragging(false); window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; }, [dragging, dragStart]);
  const selectService = (name: string) => { const match = findGuide(name); if (!match) return; setSelectedName(match.name); setImageScale(100); };

  return <main className="learning-shell course-page">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a className="active" href="#curriculum">{title}</a><a href="/services">Browse all AWS services</a></div></nav>
    <header className="course-hero compact-course-hero"><div className="cert-mark"><span>AWS</span><strong>{code}</strong></div><div className="course-title"><p className="course-kicker">{level} certification learning path</p><h1>{title}</h1><p>{description}</p><a className="scope-source" href={sourceUrl} target="_blank" rel="noreferrer">Official AWS in-scope services ↗</a></div><div className="course-overview"><div><strong>{scope.length}</strong><span>scope categories</span></div><div><strong>{uniqueServices}</strong><span>unique services</span></div><div><strong>{references}</strong><span>scope references</span></div></div></header>
    <section className="scope-note compact-scope-note"><div><strong>Official scope aligned</strong><span>Service names and categories follow the current AWS exam guide.</span></div><div><strong>{uniqueServices - pending} guides connected</strong><span>Official long names and aliases automatically reuse existing library guides.</span></div><div><strong>{pending} guides pending</strong><span>Only services without a matching library guide remain pending.</span></div></section>
    <section className={`course-workspace ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} id="curriculum"><aside className={`course-sidebar ${sidebarCollapsed ? "collapsed" : ""}`} aria-label={`${title} service navigation`}><button className="course-sidebar-toggle" onClick={() => setSidebarCollapsed(v => !v)} aria-expanded={!sidebarCollapsed}>{sidebarCollapsed ? "›" : "‹"}</button>{sidebarCollapsed ? <div className="course-sidebar-rail"><span>{code}</span><strong>Course scope</strong><small>{scope.length}</small></div> : <><div className="course-sidebar-head"><div><p className="course-kicker">Official scope</p><h2>{scope.length} categories</h2></div><button onClick={() => setAllOpen(v => !v)}>{allOpen ? "Collapse all" : "Expand all"}</button></div><p className="course-source-note">{sourceLabel}. The list is non-exhaustive and subject to change.</p><div className="course-category-list">{scope.map((category,index)=><details className="course-nav-group" key={`${category.title}-${allOpen}`} open={allOpen||index===0} style={{"--module-accent":`hsl(${(index*37+325)%360} 78% 62%)`} as CSSProperties}><summary><span>{String(index+1).padStart(2,"0")}</span><strong>{category.title}</strong><small>{category.services.length}</small><b>⌄</b></summary><div className="course-service-list">{category.services.map(service=>{const mapped=findGuide(service);const isPending=!mapped;return <button key={service} className={`${selected?.name===mapped?.name?"active":""} ${isPending?"pending":""}`} onClick={()=>!isPending&&selectService(service)} disabled={isPending} aria-pressed={selected?.name===mapped?.name}><span>{service}</span><small>{isPending?"EL10 pending":mapped?.name!==service?`Uses ${mapped?.name}`:"View EL10"}</small></button>})}</div></details>)}</div></>}</aside>
    {selected&&<article className="viewer course-viewer" style={{"--service-accent":selected.accent} as CSSProperties}><div className="viewer-head"><div><p>Selected EL10 page</p><h2>{selected.name}</h2><small>{selected.summary}</small></div><button onClick={()=>setExpanded(true)}>Fit in browser ↗</button></div><button className="image-link" onClick={()=>setExpanded(true)}><img src={assetUrl(selected.file)} onError={e=>imageFallback(e,selected.file)} style={{width:`${imageScale}%`,maxWidth:"none"}} alt={`${selected.name} EL10 infographic`}/></button><div className="image-controls"><span>Drag the corner to resize</span><strong>{Math.round(imageScale)}%</strong></div><div className="resize-handle" role="slider" tabIndex={0} aria-valuemin={60} aria-valuemax={220} aria-valuenow={Math.round(imageScale)} onKeyDown={e=>{if(e.key==="ArrowRight")setImageScale(v=>Math.min(220,v+10));if(e.key==="ArrowLeft")setImageScale(v=>Math.max(60,v-10))}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);setDragStart({x:e.clientX,scale:imageScale});setDragging(true)}}/><p className="viewer-note">Choose another service on the left to switch pages. Click the image for the full browser view.</p></article>}{expanded&&selected&&<div className="image-modal" role="dialog" aria-modal="true" onClick={()=>setExpanded(false)}><button className="modal-close" onClick={()=>setExpanded(false)}>Close ×</button><img src={assetUrl(selected.file)} onError={e=>imageFallback(e,selected.file)} alt={`${selected.name} EL10 infographic`} onClick={e=>e.stopPropagation()}/></div>}</section>
  </main>;
}