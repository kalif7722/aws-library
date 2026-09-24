"use client";

import { useEffect, useMemo, useState, type CSSProperties, type SyntheticEvent } from "react";
import type { ScopeCategory } from "../course-data";
import { guideAliases } from "../course-data";
import { services } from "../services/page";
import { assetUrl } from "../../lib/asset-url";
import AthenaLearningDetails from "./AthenaLearningDetails";
import AnalyticsLearningDetails, { analyticsDetailServices } from "./AnalyticsLearningDetails";
import AipServiceLearningDetails, { hasAipLearningDetails } from "./AipServiceLearningDetails";
import CrossCourseLearningDetails from "./CrossCourseLearningDetails";

type Props = { code: string; level: string; title: string; description: string; scope: ScopeCategory[]; sourceUrl: string; sourceLabel: string; };

const normalize = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/\b(amazon|aws)\b/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\b(simple|elastic)\b/g, " ").trim();
const serviceAnchor = (value: string) => `service-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
const acronym = (value: string) => { const match = value.match(/\((?:Amazon |AWS )?([A-Z0-9]+)\)/); return match?.[1]?.toLowerCase() || ""; };
const explicitAliases: Record<string, string> = {
  "Amazon Elastic Container Registry (Amazon ECR)": "Amazon ECR", "Amazon Elastic Container Service (Amazon ECS)": "Amazon ECS", "Amazon Elastic Kubernetes Service (Amazon EKS)": "Amazon EKS",
  "Amazon Simple Notification Service (Amazon SNS)": "Amazon SNS", "Amazon Simple Queue Service (Amazon SQS)": "Amazon SQS", "Amazon Simple Storage Service (Amazon S3)": "Amazon S3",
  "Amazon Elastic Block Store (Amazon EBS)": "Amazon EBS", "Amazon Elastic File System (Amazon EFS)": "Amazon EFS", "AWS Identity and Access Management (IAM)": "AWS IAM",
  "AWS Cost and Usage Report": "AWS Cost and Usage Reports", "AWS Audit Manager": "Audit Manager", "AWS Resource Access Manager": "AWS Resource Access Manager (RAM)",
  "AWS Resource Access Manager (AWS RAM)": "AWS Resource Access Manager (RAM)", "AWS Key Management Service (AWS KMS)": "AWS KMS", "AWS Security Token Service (AWS STS)": "AWS Security Token Service",
  "AWS Certificate Manager (ACM)": "AWS Certificate Manager", "AWS Command Line Interface (AWS CLI)": "AWS CLI", "Amazon Bedrock AgentCore": "Amazon Bedrock AgentCore",
  "Amazon Bedrock Knowledge Bases": "Amazon Bedrock Knowledge Bases", "Amazon Bedrock Prompt Management": "Amazon Bedrock Prompt Management", "Amazon Bedrock Prompt Flows": "Amazon Bedrock Prompt Flows",
  "Amazon SageMaker Clarify": "Amazon SageMaker Clarify", "Amazon SageMaker Data Wrangler": "Amazon SageMaker Data Wrangler", "Amazon SageMaker Ground Truth": "Amazon SageMaker Ground Truth",
  "Amazon SageMaker JumpStart": "Amazon SageMaker JumpStart", "Amazon SageMaker Model Monitor": "Amazon SageMaker Model Monitor", "Amazon SageMaker Model Registry": "Amazon SageMaker Model Registry",
  "Amazon SageMaker Neo": "Amazon SageMaker Neo", "Amazon SageMaker Processing": "Amazon SageMaker Processing", "Amazon SageMaker Unified Studio": "Amazon SageMaker Unified Studio", "Amazon Titan": "Amazon Titan",
  "AWS Key Management Service (KMS)": "AWS KMS",
  "AWS SDKs and APIs": "AWS Tools and SDKs", "AWS Distro for OpenTelemetry": "Amazon CloudWatch",
  "AWS IAM Policy Simulator": "AWS IAM", "Amazon CloudWatch Logs": "Amazon CloudWatch",
  "Amazon Bedrock Guardrails": "Amazon Bedrock", "Amazon Bedrock Agents": "Amazon Bedrock",
  "Amazon Bedrock Custom Model Import": "Amazon Bedrock", "Amazon Bedrock Model Evaluation": "Amazon Bedrock",
  "Amazon Bedrock Model Evaluations": "Amazon Bedrock", "Amazon Bedrock Data Automation": "Amazon Bedrock",
};
const sharedContentCategories = new Set(["Database", "Developer Tools", "Networking and Content Delivery", "Network and Content Delivery", "Application Integration", "Containers", "Compute"]);
const guideName = (name: string) => explicitAliases[name] || guideAliases[name] || name;
export const findGuide = (name: string) => {
  const target = guideName(name); const exact = services.find((item) => item.name.toLowerCase() === target.toLowerCase()); if (exact) return exact;
  const normalized = normalize(target); const byNormalized = services.find((item) => normalize(item.name) === normalized); if (byNormalized) return byNormalized;
  const short = acronym(name); if (short) return services.find((item) => item.name.toLowerCase().split(/\s+/).includes(short) || item.name.toLowerCase().endsWith(` ${short}`)); return undefined;
};
const certificationBadgeUrl = (title: string) => {
  const normalized = title.toLowerCase();
  const filename = normalized.includes("generative ai developer") ? "generative-ai-developer-professional.png"
    : normalized.includes("solutions architect") && normalized.includes("professional") ? "solutions-architect-professional.png"
    : normalized.includes("solutions architect") ? "solutions-architect-associate.png"
    : normalized.includes("cloud practitioner") ? "cloud-practitioner.png"
    : normalized.includes("developer") ? "developer-associate.png"
    : normalized.includes("sysops") ? "sysops-administrator-associate.png"
    : normalized.includes("devops") ? "devops-engineer-professional.png"
    : normalized.includes("advanced networking") ? "advanced-networking-specialty.png"
    : normalized.includes("data analytics") ? "data-analytics-specialty.png"
    : normalized.includes("data engineer") ? "data-engineer-associate.png"
    : normalized.includes("machine learning engineer") ? "machine-learning-engineer.png"
    : normalized.includes("machine learning") ? "machine-learning-specialty.png"
    : normalized.includes("security") ? "security-specialty.png"
    : normalized.includes("ai practitioner") ? "ai-practitioner.png"
    : "cloud-practitioner.png";
  return `https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-badges/${filename}`;
};
const repoAssetUrl = (path: string) => `https://raw.githubusercontent.com/kalif7722/aws-library/main${path.startsWith("/") ? path : `/${path}`}`;
const imageFallback = (event: SyntheticEvent<HTMLImageElement>, path: string) => { const image = event.currentTarget; const repoUrl = repoAssetUrl(path); if (image.src !== repoUrl) { image.src = repoUrl; return; } image.onerror = null; };

export default function CertificationCourse({ code, level, title, description, scope, sourceUrl, sourceLabel }: Props) {
  const uniqueServices = new Set(scope.flatMap((category) => category.services)).size;
  const references = scope.reduce((total, category) => total + category.services.length, 0);
  const availableScopeServices = useMemo(() => scope.flatMap((category) => category.services).filter((service) => !!findGuide(service)), [scope]);
  const pending = new Set(scope.flatMap((category) => category.services).filter((service) => !findGuide(service))).size;
  const [selectedScopeName, setSelectedScopeName] = useState(availableScopeServices[0] || "");
  const [expanded, setExpanded] = useState(false); const [imageScale, setImageScale] = useState(100); const [dragging, setDragging] = useState(false); const [dragStart, setDragStart] = useState({ x: 0, scale: 100 }); const [allOpen, setAllOpen] = useState(false); const [sidebarCollapsed, setSidebarCollapsed] = useState(false); const [visualVisible, setVisualVisible] = useState(true);
  const selected = selectedScopeName ? findGuide(selectedScopeName) : undefined;
  const isAthena = selectedScopeName.toLowerCase().includes("athena");
  const hasStructuredDetails = !!selected;
  const selectedCategory = selectedScopeName ? (scope.find(category => category.services.includes(selectedScopeName))?.title || "Related services") : "AWS Services";
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  useEffect(() => { if (!dragging) return; const move = (event: PointerEvent) => setImageScale(Math.max(60, Math.min(220, dragStart.scale + (event.clientX - dragStart.x) / 4))); const up = () => setDragging(false); window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); }; }, [dragging, dragStart]);
  const selectCourseService = (name: string) => { const match = findGuide(name); if (!match) return; const scopeName = availableScopeServices.find((candidate) => findGuide(candidate)?.name === match.name) || match.name; setSelectedScopeName(scopeName); setImageScale(100); setVisualVisible(true); setSidebarCollapsed(false); requestAnimationFrame(() => document.getElementById("course-service-viewer")?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  useEffect(() => { const onCourseService = (event: Event) => { const detail = (event as CustomEvent<{ name?: string; courseCode?: string }>).detail; if (!detail?.name || (detail.courseCode && !code.toUpperCase().startsWith(detail.courseCode.toUpperCase()))) return; selectCourseService(detail.name); }; window.addEventListener("aws-course-service", onCourseService); return () => window.removeEventListener("aws-course-service", onCourseService); }, [availableScopeServices, code]);

  return <main className="learning-shell course-page">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a className="active" href="#course-services">{title}</a><a href="/services">Browse all AWS services</a></div></nav>
    <header className="course-hero compact-course-hero"><img className="official-cert-badge" src={certificationBadgeUrl(title)} alt={`AWS Certified ${title}`} /><div className="course-title"><p className="course-kicker">{level} certification learning path</p><h1>{title}</h1><p>{description}</p><a className="scope-source" href={sourceUrl} target="_blank" rel="noreferrer">Official AWS in-scope services ↗</a></div><div className="course-overview"><div><strong>{scope.length}</strong><span>scope categories</span></div><div><strong>{uniqueServices}</strong><span>unique services</span></div><div><strong>{references}</strong><span>scope references</span></div></div></header>
    <section className="scope-note compact-scope-note"><div><strong>Official scope aligned</strong><span>Service names and categories follow the current AWS exam guide.</span></div><div><strong>{uniqueServices - pending} guides connected</strong><span>Official long names and aliases automatically reuse existing library guides.</span></div><div><strong>{pending} guides pending</strong><span>Only services without a matching library guide remain pending.</span></div></section>
    <section className={`course-workspace ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} id="course-services">
      <aside className={`course-sidebar ${sidebarCollapsed ? "collapsed" : ""}`} aria-label={`${title} service navigation`}><button className="course-sidebar-toggle" onClick={() => setSidebarCollapsed(v => !v)} aria-expanded={!sidebarCollapsed}>{sidebarCollapsed ? "›" : "‹"}</button>{sidebarCollapsed ? <div className="course-sidebar-rail"><span>{code}</span><strong>Course scope</strong><small>{scope.length}</small></div> : <><div className="course-sidebar-head"><div><p className="course-kicker">Official scope</p><h2>{scope.length} categories</h2></div><button onClick={() => setAllOpen(v => !v)}>{allOpen ? "Collapse all" : "Expand all"}</button></div><p className="course-source-note">{sourceLabel}. The list is non-exhaustive and subject to change.</p><div className="course-category-list">{scope.map((category,index)=><details className="course-nav-group" key={`${category.title}-${allOpen}-${selectedScopeName}`} open={allOpen||index===0||category.services.includes(selectedScopeName)} style={{"--module-accent":`hsl(${(index*37+325)%360} 78% 62%)`} as CSSProperties}><summary><span>{String(index+1).padStart(2,"0")}</span><strong>{category.title}</strong><small>{category.services.length}</small><b>⌄</b></summary><div className="course-service-list">{category.services.map(service=>{const mapped=findGuide(service);const isPending=!mapped;return <button id={serviceAnchor(service)} key={service} className={`${selectedScopeName===service?"active":""} ${isPending?"pending":""}`} onClick={()=>!isPending&&selectCourseService(service)} disabled={isPending} aria-pressed={selectedScopeName===service}><span>{service}</span><small>{isPending?"EL10 pending":mapped?.name!==service?"View related guide":"View EL10"}</small></button>})}</div></details>)}</div></>}</aside>
      {selected&&<article id="course-service-viewer" className={`viewer course-viewer ${hasStructuredDetails ? "has-knowledge" : ""}`} style={{"--service-accent":selected.accent} as CSSProperties}><div className="viewer-head clean-viewer-head"><div><h2>{selectedScopeName}</h2><small>{selected.summary}</small></div><button className="visual-toggle" onClick={()=>setVisualVisible(v=>!v)}>{visualVisible ? "Hide visual ↑" : "Show visual ↓"}</button></div>{visualVisible && <button className="image-link clean-image-link" onClick={()=>setExpanded(true)} aria-label={`Open ${selectedScopeName} visual full screen`}><img src={assetUrl(selected.file)} onError={e=>imageFallback(e,selected.file)} alt={`${selectedScopeName} EL10 infographic`}/></button>}{isAthena ? <AthenaLearningDetails/> : analyticsDetailServices.has(selected.name) ? <AnalyticsLearningDetails serviceName={selected.name}/> : sharedContentCategories.has(selectedCategory) ? <CrossCourseLearningDetails serviceName={selected.name} category={selectedCategory} summary={selected.summary}/> : hasAipLearningDetails(selectedScopeName) ? <AipServiceLearningDetails serviceName={selectedScopeName} summary={selected.summary}/> : <CrossCourseLearningDetails serviceName={selected.name} category={selectedCategory} summary={selected.summary}/>}</article>}
      {expanded&&selected&&<div className="image-modal" role="dialog" aria-modal="true" onClick={()=>setExpanded(false)}><button className="modal-close" onClick={()=>setExpanded(false)}>Close ×</button><img src={assetUrl(selected.file)} onError={e=>imageFallback(e,selected.file)} alt={`${selectedScopeName} EL10 infographic`} onClick={e=>e.stopPropagation()}/></div>}
    </section>
  </main>;
}
