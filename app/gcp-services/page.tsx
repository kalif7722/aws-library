"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gcpAssetReady, gcpAssetUrl, gcpCategories, gcpContent, gcpIcons, gcpServices, gcpSourceUrl, type GcpContent } from "../gcp-data";
import "../components/GcpLibrary.css";
import GcpSharedServiceSections from "../components/GcpSharedServiceSections";

function StudyImage({ path, status, title }: { path: string; status?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const available = gcpAssetReady(status) && Boolean(path) && !failed;
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };
  return <section className="gcp-visual-section"><h3>{title}</h3>{available ? <>
    {!loaded && <p role="status">Loading visual…</p>}
    <button ref={trigger} className="gcp-image-button" type="button" disabled={!loaded} onClick={() => dialog.current?.showModal()} aria-label={"Open " + title + " full screen"}>
      <img src={gcpAssetUrl(path)} alt={title} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
    </button>
    <dialog ref={dialog} className="gcp-image-dialog" aria-label={title + " full screen"} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <button type="button" className="gcp-modal-close" onClick={close} autoFocus aria-label="Close full screen">Close ×</button>
      <img src={gcpAssetUrl(path)} alt={title} />
    </dialog>
  </> : <div className="gcp-pending"><strong>{failed ? "Visual temporarily unavailable" : "Visual in preparation"}</strong><p>{failed ? "The published image could not be loaded. The service information below remains available." : "This service is mapped. Its reviewed study visual will appear here when published."}</p></div>}</section>;
}

const sections: { key: keyof GcpContent; title: string }[] = [
  { key: "concepts", title: "Core concepts" }, { key: "applicationFit", title: "Application fit" },
  { key: "architecture", title: "Architecture walkthrough" }, { key: "security", title: "Security & governance" },
  { key: "operations", title: "Design & operations" }, { key: "watchPoints", title: "Watch points" },
  { key: "cost", title: "Cost considerations" }, { key: "alternatives", title: "Choose the right service" },
];

export default function GcpServicesPage() {
  const params = useSearchParams();
  const requested = params.get("service");
  const [slug, setSlug] = useState(gcpServices[0]?.slug || "");
  const [query, setQuery] = useState("");
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [opened, setOpened] = useState<string[]>([gcpServices[0]?.categorySlug || ""]);
  useEffect(() => {
    const match = gcpServices.find(service => service.slug === requested);
    if (match) { setSlug(match.slug); setOpened(current => [...new Set([...current, match.categorySlug])]); }
  }, [requested]);
  const selected = gcpServices.find(service => service.slug === slug) || gcpServices[0];
  const details = selected ? gcpContent[selected.slug] : undefined;
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return gcpServices.filter(service => [service.displayName, service.canonicalName, service.officialCategory, service.slug, ...(service.aliases || []), ...(service.abbreviations || [])].join(" ").toLowerCase().includes(term));
  }, [query]);
  const choose = (nextSlug: string) => {
    setSlug(nextSlug);
    const url = new URL(window.location.href); url.searchParams.set("service", nextSlug);
    window.history.replaceState(null, "", url);
  };
  return <main className="workspace gcp-workspace">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a href="/services">AWS services</a><a href="/azure-services">Azure services</a><a className="active" href="/gcp-services">Google Cloud</a></div></nav>
    <header className="gcp-heading"><div><p className="course-kicker">Google Cloud service library</p><h1>Explore Google Cloud, service by service.</h1><p>Browse the official product categories. Study guides and visuals are being prepared.</p></div><a href={gcpSourceUrl} target="_blank" rel="noreferrer">Official product catalog ↗</a></header>
    <div className={"gcp-shell" + (railCollapsed ? " gcp-collapsed" : "")}>
      <aside className="gcp-rail" aria-label="Google Cloud categories"><div className="gcp-rail-title">{!railCollapsed && <strong>Service categories</strong>}<button type="button" onClick={() => setRailCollapsed(value => !value)} aria-expanded={!railCollapsed} aria-label={railCollapsed ? "Expand categories" : "Collapse categories"}>{railCollapsed ? "›" : "‹"}</button></div>
        {!railCollapsed && <><label className="gcp-search">Search services<input type="search" placeholder="Service, alias or category…" value={query} onChange={event => setQuery(event.target.value)} /></label><div className="gcp-rail-actions"><button type="button" onClick={() => setOpened(gcpCategories.map(category => category.slug))}>Expand all</button><button type="button" onClick={() => setOpened([])}>Collapse all</button></div><p className="gcp-result-count" role="status">{filtered.length} of {gcpServices.length} services</p>
          <div className="gcp-branches">{gcpCategories.map(category => {
            const services = filtered.filter(service => service.categorySlug === category.slug);
            if (!services.length) return null;
            const expanded = Boolean(query.trim()) || opened.includes(category.slug);
            return <section key={category.slug}><button className="gcp-category" type="button" aria-expanded={expanded} aria-controls={"category-" + category.slug} onClick={() => setOpened(current => current.includes(category.slug) ? current.filter(item => item !== category.slug) : [...current, category.slug])}><span>{expanded ? "⌄" : "›"} {category.name}</span><small>{services.length}</small></button>{expanded && <div id={"category-" + category.slug} className="gcp-service-list">{services.map(service => <button key={service.slug} type="button" aria-current={service.slug === slug ? "page" : undefined} onClick={() => choose(service.slug)}>{service.displayName}</button>)}</div>}</section>;
          })}{filtered.length === 0 && <p>No matching services. Try another name or abbreviation.</p>}</div></>}
      </aside>
      {selected && <article className="gcp-main" key={selected.slug}><header className="gcp-service-heading"><p className="course-kicker">{selected.officialCategory}</p><div className="gcp-service-title">{gcpIcons[selected.slug]?.path && <img src={gcpIcons[selected.slug].path || ""} alt={gcpIcons[selected.slug].fallback ? gcpIcons[selected.slug].label + " category icon" : selected.displayName + " icon"} title={gcpIcons[selected.slug].fallback ? gcpIcons[selected.slug].label + " category icon" : selected.displayName} />}<h2>{selected.displayName}</h2></div>{details?.summary || selected.description ? <p>{details?.summary || selected.description}</p> : <p>Explore {selected.displayName} in the official Google Cloud documentation.</p>}{selected.documentationUrl && <a href={selected.documentationUrl} target="_blank" rel="noreferrer">Official documentation ↗</a>}</header>
        <StudyImage path={selected.el10Path} status={selected.el10Status} title={selected.displayName + " visual guide"} />
        {details ? <GcpSharedServiceSections serviceName={selected.displayName} details={details} /> : <>
          <div className="gcp-content-grid">{sections.map(section => {
          const items = details[section.key];
          return Array.isArray(items) && items.length > 0 && typeof items[0] === "string" ? <section className="gcp-content-card" key={section.key}><h3>{section.title}</h3><ul>{(items as string[]).map((item, index) => <li key={index}>{item}</li>)}</ul></section> : null;
        })}</div><section className="gcp-content-card"><h3>Service guide in preparation</h3><p>This catalog entry is available for browsing. The complete service explanation, architecture, operations, and study walkthrough are still being prepared.</p></section></>}
        <StudyImage path={selected.primaryWalkthroughPath} status={selected.primaryWalkthroughStatus} title={selected.displayName + " walkthrough"} />
        {gcpAssetReady(selected.companionWalkthroughStatus) && <StudyImage path={selected.companionWalkthroughPath} status={selected.companionWalkthroughStatus} title={selected.displayName + " companion walkthrough"} />}
        {details?.relatedServices?.length ? <section className="gcp-content-card"><h3>Related services</h3><div className="gcp-related">{details.relatedServices.map(relatedSlug => { const service = gcpServices.find(item => item.slug === relatedSlug); return service ? <a key={relatedSlug} href={"/gcp-services?service=" + service.slug}>{service.displayName}</a> : null; })}</div></section> : null}
        {details?.sources?.length ? <section className="gcp-sources"><h3>Sources</h3><ul>{details.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul></section> : null}
      </article>}
    </div>
  </main>;
}
