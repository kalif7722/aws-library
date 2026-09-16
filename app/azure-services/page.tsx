"use client";

import { useEffect, useMemo, useState } from "react";
import { assetUrl } from "../../lib/asset-url";
import "../components/AzureLibrary.css";
import AzureServiceLearningDetails from "../components/AzureServiceLearningDetails";
import { azureAssetPath, azureBranches, azureUniqueServices, type AzureService } from "../azure-data";

const ready = (service: AzureService) => service.status.toLowerCase().startsWith("completed");
const azureR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";

const azureAssetUrl = (path: string) => {
  const configured = assetUrl(path);
  return configured === path ? azureR2Base + path : configured;
};

type SearchEntry = { service: AzureService; branchTitle: string; branchIndex: number };

export default function AzureServicesPage() {
  const [selectedSlug, setSelectedSlug] = useState(azureUniqueServices[0]?.slug || "");
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [imageErrorPath, setImageErrorPath] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [visualVisible, setVisualVisible] = useState(true);

  const selected = azureUniqueServices.find((service) => service.slug === selectedSlug) || azureUniqueServices[0];
  const branch = azureBranches[selectedBranchIndex] || azureBranches[0];
  const searchEntries = useMemo<SearchEntry[]>(
    () => azureBranches.flatMap((item, branchIndex) => item.services.map((service) => ({ service, branchTitle: item.title, branchIndex }))),
    [],
  );
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchEntries
      .filter(({ service, branchTitle }) => (service.name + " " + branchTitle + " " + service.slug + " " + service.status).toLowerCase().includes(q))
      .slice(0, 16);
  }, [query, searchEntries]);
  const imagePath = selected ? azureAssetPath(selected) : "";
  const currentImage = selected ? azureAssetUrl(imagePath) : "";
  const hasImage = Boolean(selected && currentImage && imageErrorPath !== imagePath);

  useEffect(() => {
    setImageErrorPath("");
    setExpanded(false);
    setVisualVisible(true);
  }, [imagePath]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const choose = (service: AzureService, branchIndex = selectedBranchIndex) => {
    setSelectedSlug(service.slug);
    setSelectedBranchIndex(branchIndex);
    setQuery("");
    setExpanded(false);
  };

  const chooseSearchResult = (entry: SearchEntry) => choose(entry.service, entry.branchIndex);

  return <main className="workspace azure-workspace">
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="brand-link" href="/">Visual Learning</a>
      <div><a className="home-button" href="/">Home</a><a className="active" href="/azure-services">Azure services</a><a href="/services">AWS services</a></div>
    </nav>

    <div className={"azure-shell" + (menuCollapsed ? " rail-collapsed" : "")}>
      <aside className={"azure-branch-rail" + (menuCollapsed ? " collapsed" : "")} aria-label="Azure service branches">
        <div className="azure-menu-heading"><span>Azure branches</span><button type="button" onClick={() => setMenuCollapsed((collapsed) => !collapsed)} aria-label={menuCollapsed ? "Expand branch menu" : "Collapse branch menu"}>{menuCollapsed ? "›" : "‹"}</button></div>
        {!menuCollapsed && azureBranches.map((item, branchIndex) => <div className="azure-branch-menu-item" key={item.title}>
          <button type="button" className="azure-branch-trigger" onClick={() => choose(item.services[0], branchIndex)} aria-haspopup="true"><span>{item.title}</span><small>{item.services.length}</small></button>
          <div className="azure-branch-dropdown" role="menu">
            <div className="azure-dropdown-title">{item.title}</div>
            {item.services.map((service) => <button type="button" role="menuitem" key={item.title + "-" + service.slug} onClick={() => choose(service, branchIndex)}><span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small></button>)}
          </div>
        </div>)}
      </aside>

      <section className="azure-main-pane">
        <header className="azure-toolbar">
          <div className="service-search azure-search">
            <span>Search all Azure services</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search service or branch…" aria-label="Search all Azure services and branches" />
            {searchResults.length > 0 && <div className="search-results" role="listbox" aria-label="Azure search results">
              {searchResults.map((entry) => <button type="button" key={entry.branchTitle + "-" + entry.service.slug} onClick={() => chooseSearchResult(entry)} role="option"><span>{entry.service.name}</span><small>{entry.branchTitle} · {ready(entry.service) ? "Visual available" : "Visual pending"}</small></button>)}
            </div>}
          </div>
          <div className="progress"><strong>{azureUniqueServices.length}</strong><span>unique services mapped</span></div>
        </header>

        {selected && <article className="viewer azure-viewer" style={{ "--service-accent": "#0078d4" } as React.CSSProperties}>
          <div className="viewer-head"><div><p>Selected Azure service</p><h2>{selected.name}</h2><small className="azure-branch-context">{branch?.title}</small></div><div className="azure-viewer-actions"><span className={"azure-status " + (hasImage ? "ready" : "pending")}>{hasImage ? "Visual available" : "Visual pending"}</span><button type="button" className="visual-toggle" onClick={() => { setVisualVisible((visible) => { if (visible) setExpanded(false); return !visible; }); }}>{visualVisible ? "Hide visual ↑" : "Show visual ↓"}</button></div></div>
          <section className="azure-el10-section" aria-label={selected.name + " visual"}><div className="azure-el10-heading"><div><p>EL10 SERVICE VISUAL</p><span>Click the visual to open a full-screen study view.</span></div></div>{visualVisible && (hasImage ? <button type="button" className="image-link" onClick={() => setExpanded(true)} aria-label={"Open " + selected.name + " visual in full view"}><img key={imagePath} src={currentImage} loading="eager" decoding="async" fetchPriority="high" onError={() => setImageErrorPath(imagePath)} alt={selected.name + " Azure study visual"} /></button> : <div className="azure-pending-card"><strong>{ready(selected) ? "Visual is being connected" : "Visual not ready yet"}</strong><p>This service remains available in the branch menu. Its guide will appear as soon as a matching R2 image is available.</p></div>)}</section>
          <p className="viewer-note">Choose any branch from the left rail or search globally. Click the visual for full view; press Escape or Close to return.</p>
        <AzureServiceLearningDetails serviceName={selected.name} /></article>}
      </section>
    </div>

    {selected && expanded && hasImage && <div className="image-modal" role="dialog" aria-modal="true" aria-label={selected.name + " full view"} onClick={() => setExpanded(false)}><button type="button" className="modal-close" onClick={() => setExpanded(false)} aria-label="Close full view">Close ×</button><img src={currentImage} loading="eager" decoding="async" fetchPriority="high" alt={selected.name + " Azure study visual full view"} onClick={(event) => event.stopPropagation()} /></div>}
  </main>;
}
