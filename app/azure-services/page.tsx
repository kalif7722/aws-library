"use client";

import { useEffect, useMemo, useState } from "react";
import { assetUrl } from "../../lib/asset-url";
import "../components/AzureLibrary.css";
import { azureBranches, azureUniqueServices, type AzureService } from "../azure-data";

const ready = (service: AzureService) => service.status.toLowerCase().startsWith("completed");
const azureR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";

const filenameOverrides: Record<string, string> = {
  "azure-ai-search": "azure-ai-search.webp",
  "azure-machine-learning": "azure-machine-learning.webp",
  "foundry-tools": "foundry-tools.webp",
  "azure-language-in-foundry-tools": "azure-language-in-foundry-tools.webp",
  "azure-translator-in-foundry-tools": "azure-translator-in-foundry-tools.webp",
  "azure-openai-in-foundry-models": "azure-openai-in-foundry-models.webp",
  "content-safety-in-foundry-control-plane": "content-safety-in-foundry-control-plane.webp",
  "microsoft-security-copilot": "microsoft-security-copilot.webp",
  "microsoft-planetary-computer-pro": "microsoft-planetary-computer-pro.webp",
  "azure-sre-agent": "azure-sre-agent.webp",
  "observability-in-foundry-control-plane": "observability-in-foundry-control-plane.webp",
  "sql-server-on-azure-virtual-machines": "sql-server-on-azure-virtual-machines.webp",
  "virtual-machines": "virtual-machines.webp",
  "windows-server": "windows-server.webp",
  "data-lake-analytics": "data-lake-analytics.webp",
  "power-bi": "power-bi.webp",
  "power-bi-embedded": "power-bi-embedded.webp",
  "devops-tool-integrations": "devops-tool-integrations.webp",
  "api-management": "api-management.webp",
};

const folderOverrides: Record<string, string> = {
  "api-management": "internet-of-things",
  "azure-container-apps": "containers",
  "azure-container-instances": "containers",
  "azure-databricks": "analytics",
  "azure-database-migration-service": "migration",
  "azure-functions": "containers",
  "azure-iot-edge": "internet-of-things",
  "azure-kubernetes-service": "containers",
  "azure-kubernetes-fleet-manager": "containers",
  "azure-confidential-ledger": "security",
};

const imagePathCandidates = (service: AzureService) => {
  const primary = filenameOverrides[service.slug] || (service.slug.startsWith("azure-") ? service.slug : "azure-" + service.slug) + ".webp";
  const names = [...new Set([primary, service.slug + ".webp", "azure-" + service.slug + ".webp"])];
  const folders = [...new Set([folderOverrides[service.slug] || service.folder, "ai-machine-learning"])];
  return folders.flatMap((folder) => names.map((name) => "/azure/" + folder + "/" + name));
};

const imageUrl = (path: string) => {
  const configured = assetUrl(path);
  return configured === path ? azureR2Base + path : configured;
};

type SearchEntry = { service: AzureService; branchTitle: string; branchIndex: number };

export default function AzureServicesPage() {
  const [selectedSlug, setSelectedSlug] = useState(azureUniqueServices[0]?.slug || "");
  const [query, setQuery] = useState("");
  const [assetAttempt, setAssetAttempt] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const selected = azureUniqueServices.find((service) => service.slug === selectedSlug) || azureUniqueServices[0];

  const searchEntries = useMemo<SearchEntry[]>(
    () => azureBranches.flatMap((branch, branchIndex) => branch.services.map((service) => ({ service, branchTitle: branch.title, branchIndex }))),
    [],
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchEntries
      .filter(({ service, branchTitle }) => (service.name + " " + branchTitle + " " + service.slug + " " + service.status).toLowerCase().includes(q))
      .slice(0, 16);
  }, [query, searchEntries]);

  const candidates = selected ? imagePathCandidates(selected) : [];
  const currentImage = candidates[assetAttempt];
  const hasImage = Boolean(selected && ready(selected) && currentImage);

  useEffect(() => {
    setAssetAttempt(0);
    setExpanded(false);
  }, [selectedSlug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const choose = (service: AzureService) => {
    setSelectedSlug(service.slug);
    setQuery("");
  };

  const chooseBranch = (branchIndex: number) => {
    const service = azureBranches[branchIndex]?.services[0];
    if (service) choose(service);
  };

  const chooseSearchResult = (entry: SearchEntry) => choose(entry.service);

  return <main className="workspace azure-workspace">
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="brand-link" href="/">Visual Learning</a>
      <div><a className="home-button" href="/">Home</a><a className="active" href="/azure-services">Azure services</a><a href="/services">AWS services</a></div>
    </nav>

    <header className="masthead">
      <div className="site-tools azure-tools">
        <div className={"azure-branch-menu" + (menuCollapsed ? " collapsed" : "")} aria-label="Azure service branches">
          <div className="azure-menu-heading"><span>Azure branches</span><button type="button" onClick={() => setMenuCollapsed((collapsed) => !collapsed)} aria-label={menuCollapsed ? "Expand branch menu" : "Collapse branch menu"}>{menuCollapsed ? "›" : "‹"}</button></div>
          {azureBranches.map((branch, branchIndex) => <div className="azure-branch-menu-item" key={branch.title}>
            <button type="button" className="azure-branch-trigger" onClick={() => chooseBranch(branchIndex)} aria-haspopup="true">
              <span>{branch.title}</span><small>{branch.services.length}</small>
            </button>
            <div className="azure-branch-dropdown" role="menu">
              {branch.services.map((service) => <button type="button" role="menuitem" key={branch.title + "-" + service.slug} onClick={() => choose(service)}>
                <span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small>
              </button>)}
            </div>
          </div>)}
        </div>

        <div className="service-search azure-search">
          <span>Search all Azure services</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search service or branch…" aria-label="Search all Azure services and branches" />
          {searchResults.length > 0 && <div className="search-results" role="listbox" aria-label="Azure search results">
            {searchResults.map((entry) => <button type="button" key={entry.branchTitle + "-" + entry.service.slug} onClick={() => chooseSearchResult(entry)} role="option">
              <span>{entry.service.name}</span><small>{entry.branchTitle} · {ready(entry.service) ? "Visual available" : "Visual pending"}</small>
            </button>)}
          </div>}
        </div>
        <div className="progress"><strong>{azureUniqueServices.length}</strong><span>unique services mapped</span></div>
      </div>
      <div className="azure-navigation-hint">Hover any branch to open its service menu. Select a service to view its visual guide.</div>
    </header>

    {selected && <article className="viewer azure-viewer" style={{ "--service-accent": "#0078d4" } as React.CSSProperties}>
      <div className="viewer-head"><div><p>Selected Azure service</p><h2>{selected.name}</h2></div><span className={"azure-status " + (ready(selected) && hasImage ? "ready" : "pending")}>{ready(selected) && hasImage ? "Visual available" : "Visual pending"}</span></div>
      {hasImage
        ? <button type="button" className="image-link" onClick={() => setExpanded(true)} aria-label={"Open " + selected.name + " visual in full view"}><img src={imageUrl(currentImage)} onError={() => setAssetAttempt((attempt) => attempt + 1)} alt={selected.name + " Azure study visual"} /></button>
        : <div className="azure-pending-card"><strong>{ready(selected) ? "Visual is being connected" : "Visual not ready yet"}</strong><p>This service remains available in the branch menu. Its guide will appear as soon as a matching R2 image is available.</p></div>}
      <p className="viewer-note">Use the branch menus or global search to change services. Click the visual for full view; press Escape or Close to return.</p>
    </article>}

    {selected && expanded && hasImage && <div className="image-modal" role="dialog" aria-modal="true" aria-label={selected.name + " full view"} onClick={() => setExpanded(false)}>
      <button type="button" className="modal-close" onClick={() => setExpanded(false)} aria-label="Close full view">Close ×</button>
      <img src={imageUrl(currentImage)} alt={selected.name + " Azure study visual full view"} onClick={(event) => event.stopPropagation()} />
    </div>}
  </main>;
}
