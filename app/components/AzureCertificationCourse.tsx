"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { assetUrl } from "../../lib/asset-url";
import { azureAssetPaths, azureBranches, azureUniqueServices, type AzureService } from "../azure-data";
import type { AzureCourse, AzureCourseService } from "../azure-course-data";
import AzureServiceLearningDetails from "./AzureServiceLearningDetails";
import Az104CourseGuide from "./Az104CourseGuide";
import "../components/AzureLibrary.css";

const azureR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const azureAssetUrl = (path: string) => {
  const configured = assetUrl(path);
  return configured === path ? azureR2Base + path : configured;
};
const normalize = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/\b(formerly azure ad|azure|microsoft)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const serviceAliases: Record<string, string> = {
  "Azure Database for PostgreSQL": "Azure Database for PostgreSQL",
  "Azure Database for MySQL": "Azure Database for MySQL",
  "Azure Kubernetes Service (AKS)": "Azure Kubernetes Service (AKS)",
  "Microsoft Entra ID (formerly Azure AD)": "Microsoft Entra ID (formerly Azure AD)",
};
const findAzureService = (name: string) => {
  const target = serviceAliases[name] || name;
  const exact = azureUniqueServices.find((service) => service.name.toLowerCase() === target.toLowerCase());
  if (exact) return exact;
  const compact = normalize(target);
  return azureUniqueServices.find((service) => normalize(service.name) === compact);
};
const findBranchIndex = (service: AzureService | undefined) => service ? azureBranches.findIndex((branch) => branch.services.some((item) => item.slug === service.slug)) : -1;

type Props = { course: AzureCourse };

export default function AzureCertificationCourse({ course }: Props) {
  const allServices = useMemo(() => course.scope.flatMap((category) => category.services), [course.scope]);
  const firstMapped = allServices.map((service) => findAzureService(service.name)).find(Boolean);
  const [selectedName, setSelectedName] = useState(firstMapped?.name || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [visualVisible, setVisualVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [imageCandidateIndex, setImageCandidateIndex] = useState(0);
  const selected = findAzureService(selectedName);
  const selectedEntry = allServices.find((service) => findAzureService(service.name)?.slug === selected?.slug);
  const selectedCategory = course.scope.find((category) => category.services.some((service) => service.name === selectedEntry?.name))?.title || "Azure services";
  const connected = allServices.filter((service) => !!findAzureService(service.name)).length;
  const pending = allServices.length - connected;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectService = (entry: AzureCourseService) => {
    const service = findAzureService(entry.name);
    setSelectedName(service?.name || entry.name);
    setVisualVisible(true);
    setExpanded(false);
  };

  const imageCandidates = selected ? azureAssetPaths(selected) : [];
  const imagePath = imageCandidates[imageCandidateIndex] || "";
  const branchIndex = findBranchIndex(selected);

  useEffect(() => { setImageCandidateIndex(0); }, [selected?.slug]);

  return <main className="learning-shell course-page">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a className="active" href={`/courses/azure-${course.code.toLowerCase()}`}>{course.code}</a><a href="/azure-services">Browse all Azure services</a></div></nav>
    <header className="course-hero compact-course-hero"><div className="cert-mark"><span>AZURE</span><strong>{course.code}</strong></div><div className="course-title"><p className="course-kicker">{course.level} certification learning path</p><h1>{course.title}</h1><p>{course.description}</p><a className="scope-source" href={course.sourceUrl} target="_blank" rel="noreferrer">Official Microsoft Learn study guide ↗</a></div><div className="course-overview"><div><strong>{course.scope.length}</strong><span>scope categories</span></div><div><strong>{new Set(allServices.map((service) => service.name)).size}</strong><span>mapped services</span></div><div><strong>{allServices.length}</strong><span>scope references</span></div></div></header>
    <section className="scope-note compact-scope-note"><div><strong>Tracker aligned</strong><span>Service names and Direct/Related classifications come from the attached certification tracker.</span></div><div><strong>{connected} central pages connected</strong><span>Each selected service reuses the shared Azure EL10 and service-learning renderer.</span></div><div><strong>{pending} catalog mappings pending</strong><span>Unmatched tracker rows remain visible for review instead of being silently dropped.</span></div></section>
    {course.code === "AZ-104" && <Az104CourseGuide />}
    <section className={`course-workspace ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} id="curriculum">
      <aside className={`course-sidebar ${sidebarCollapsed ? "collapsed" : ""}`} aria-label={`${course.title} service navigation`}><button className="course-sidebar-toggle" onClick={() => setSidebarCollapsed((value) => !value)} aria-expanded={!sidebarCollapsed}>{sidebarCollapsed ? "›" : "‹"}</button>{sidebarCollapsed ? <div className="course-sidebar-rail"><span>{course.code}</span><strong>Course scope</strong><small>{allServices.length}</small></div> : <><div className="course-sidebar-head"><div><p className="course-kicker">Official scope</p><h2>{course.scope.length} categories</h2></div><button onClick={() => setAllOpen((value) => !value)}>{allOpen ? "Collapse all" : "Expand all"}</button></div><p className="course-source-note">Direct services are named in the guide objectives. Related services support the assessed capability.</p><div className="course-category-list">{course.scope.map((category, index) => <details className="course-nav-group" key={`${category.title}-${allOpen}`} open={allOpen || index === 0} style={{ "--module-accent": `hsl(${(index * 37 + 195) % 360} 78% 62%)` } as CSSProperties}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><small>{category.services.length}</small><b>⌄</b></summary><div className="course-service-list">{category.services.map((entry) => { const mapped = findAzureService(entry.name); return <button key={entry.name} className={`${mapped?.name === selected?.name ? "active" : ""} ${mapped ? "" : "pending"}`} onClick={() => selectService(entry)} aria-pressed={mapped?.name === selected?.name}><span>{entry.name}</span><small>{mapped ? entry.classification : "Catalog mapping pending"}</small></button>; })}</div></details>)}</div></>}</aside>
      {selected && <article className="viewer course-viewer has-knowledge" style={{ "--service-accent": "#0078d4" } as CSSProperties}><div className="viewer-head clean-viewer-head"><div><h2>{selected.name}</h2><small>{selectedCategory} · {selectedEntry?.classification || "Central service page"}</small></div><div className="azure-viewer-actions"><button className="visual-toggle" onClick={() => { setVisualVisible((value) => { if (value) setExpanded(false); return !value; }); }}>{visualVisible ? "Hide visual ↑" : "Show visual ↓"}</button><a className="visual-toggle" href={`/azure-services?service=${encodeURIComponent(selected.slug)}`}>Open service library →</a></div></div>{visualVisible && (imageCandidateIndex >= imageCandidates.length ? <div className="azure-pending-card"><strong>EL10 visual pending</strong><p>The central service page is connected, but no accepted filename was found in the matching R2 folder.</p></div> : <button className="image-link clean-image-link" onClick={() => setExpanded(true)} aria-label={`Open ${selected.name} visual full screen`}><img key={imagePath} src={azureAssetUrl(imagePath)} alt={`${selected.name} Azure study visual`} onError={() => setImageCandidateIndex((index) => index + 1)} /></button>)}<AzureServiceLearningDetails serviceName={selected.name} /></article>}
    </section>
    {expanded && selected && <div className="image-modal" role="dialog" aria-modal="true" onClick={() => setExpanded(false)}><button className="modal-close" onClick={() => setExpanded(false)}>Close ×</button><img src={azureAssetUrl(imagePath)} alt={`${selected.name} Azure study visual full view`} onClick={(event) => event.stopPropagation()} /></div>}
    {branchIndex >= 0 && <span className="sr-only">Central branch: {azureBranches[branchIndex].title}</span>}
  </main>;
}
