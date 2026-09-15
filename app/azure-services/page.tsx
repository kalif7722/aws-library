"use client";

import { useEffect, useMemo, useState } from "react";
import "../components/AzureLibrary.css";
import { assetUrl } from "../../lib/asset-url";
import { azureBranches, azureBranchAccents, azureUniqueServices, type AzureService } from "../azure-data";

const ready = (service: AzureService) => service.status.toLowerCase().startsWith("completed");

const filenameOverrides: Record<string, string> = {
  "sql-server-on-azure-virtual-machines": "sql-server-on-azure-virtual-machines.webp",
  "virtual-machines": "virtual-machines.webp",
  "windows-server": "windows-server.webp",
  "data-lake-analytics": "data-lake-analytics.webp",
  "power-bi": "power-bi.webp",
  "power-bi-embedded": "power-bi-embedded.webp",
  "devops-tool-integrations": "devops-tool-integrations.webp",
  "api-management": "api-management.webp",
};

const noAzurePrefix = new Set([
  "ai-anomaly-detector",
  "data-science-virtual-machines",
  "foundry-agent-service",
  "foundry-control-plane",
  "foundry-iq",
  "foundry-models",
  "foundry-tools",
  "health-bot",
  "microsoft-foundry",
  "microsoft-planetary-computer-pro",
  "microsoft-security-copilot",
  "observability-in-foundry-control-plane",
  "phi-open-models",
  "sdks",
]);

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

const azureR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const azureAssetUrl = (path: string) => {
  const resolved = assetUrl(path);
  return resolved === path ? azureR2Base + path : resolved;
};

const assetPath = (service: AzureService) => {
  const filename = filenameOverrides[service.slug]
    || (noAzurePrefix.has(service.slug) || service.slug.startsWith("azure-") ? service.slug : "azure-" + service.slug) + ".webp";
  return "/azure/" + (folderOverrides[service.slug] || service.folder) + "/" + filename;
};

type SearchEntry = { service: AzureService; branchTitle: string; branchIndex: number };

export default function AzureServicesPage() {
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState(azureUniqueServices[0]?.slug || "");
  const [query, setQuery] = useState("");
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const branch = azureBranches[selectedBranchIndex] || azureBranches[0];
  const selected = azureUniqueServices.find((service) => service.slug === selectedSlug) || branch?.services[0] || azureUniqueServices[0];

  const searchEntries = useMemo<SearchEntry[]>(
    () => azureBranches.flatMap((item, branchIndex) => item.services.map((service) => ({ service, branchTitle: item.title, branchIndex }))),
    [],
  );

  const branchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? branch.services.filter((service) => service.name.toLowerCase().includes(q)) : branch.services;
  }, [branch, query]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchEntries
      .filter(({ service, branchTitle }) => (service.name + " " + branchTitle + " " + service.slug + " " + service.status).toLowerCase().includes(q))
      .slice(0, 14);
  }, [query, searchEntries]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const choose = (service: AzureService) => {
    setSelectedSlug(service.slug);
    setImageError(false);
    setExpanded(false);
  };

  const chooseBranch = (value: string) => {
    const index = Number(value);
    const next = azureBranches[index] || azureBranches[0];
    setSelectedBranchIndex(index);
    setQuery("");
    if (next?.services[0]) choose(next.services[0]);
  };

  const chooseSearchResult = (entry: SearchEntry) => {
    setSelectedBranchIndex(entry.branchIndex);
    choose(entry.service);
    setQuery("");
  };

  return <main className="workspace azure-workspace">
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="brand-link" href="/">Visual Learning</a>
      <div><a className="home-button" href="/">Home</a><a className="active" href="/azure-services">Azure services</a><a href="/services">AWS services</a></div>
    </nav>

    <header className="masthead">
      <div className="site-tools">
        <label className="azure-branch-picker">
          <span>Browse Azure branch</span>
          <select value={selectedBranchIndex} onChange={(event) => chooseBranch(event.target.value)} aria-label="Browse Azure branch">
            {azureBranches.map((item, index) => <option value={index} key={item.title}>{item.title} · {item.services.length} services</option>)}
          </select>
        </label>
        <div className="service-search">
          <span>Search all Azure services</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search service or branch…" aria-label="Search all Azure services and branches" />
          {searchResults.length > 0 && <div className="search-results" role="listbox" aria-label="Azure search results">
            {searchResults.map((entry) => <button key={entry.branchTitle + "-" + entry.service.slug} type="button" onClick={() => chooseSearchResult(entry)} role="option">
              <span>{entry.service.name}</span>
              <small>{entry.branchTitle} · {ready(entry.service) ? "Visual available" : "Visual pending"}</small>
            </button>)}
          </div>}
        </div>
        <div className="progress"><strong>{azureUniqueServices.length}</strong><span>unique services mapped</span></div>
      </div>
    </header>

    <section className="azure-library-panel" aria-label={branch?.title + " Azure services"}>
      <div className="azure-branch-heading">
        <div><p className="course-kicker">Selected Azure branch</p><h1>{branch?.title}</h1><p>{branch?.services.length} services in this branch · every listed service is selectable, whether its visual is ready or pending.</p></div>
        <span style={{ "--branch-accent": azureBranchAccents[selectedBranchIndex % azureBranchAccents.length] } as React.CSSProperties}>{String(selectedBranchIndex + 1).padStart(2, "0")}</span>
      </div>
      <div className="azure-service-list">
        {branchResults.map((service) => <button type="button" key={branch?.title + "-" + service.name} className={"azure-service-row " + (selected?.slug === service.slug ? "active" : "")} onClick={() => choose(service)} aria-pressed={selected?.slug === service.slug}>
          <span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small>
        </button>)}
        {branchResults.length === 0 && <p className="azure-empty">No service in this branch matches that search. Use the global results above to jump to another branch.</p>}
      </div>
    </section>

    {selected && <article className="viewer" style={{ "--service-accent": "#0078d4" } as React.CSSProperties}>
      <div className="viewer-head"><div><p>Selected Azure service</p><h2>{selected.name}</h2></div><span className={"azure-status " + (ready(selected) ? "ready" : "pending")}>{ready(selected) ? "Visual available" : "Visual pending"}</span></div>
      {ready(selected) && !imageError
        ? <button type="button" className="image-link" onClick={() => setExpanded(true)} aria-label={"Open " + selected.name + " visual in full view"}><img src={azureAssetUrl(assetPath(selected))} onError={() => setImageError(true)} alt={selected.name + " Azure study visual"} /></button>
        : <div className="azure-pending-card"><strong>{ready(selected) ? "Visual is being connected" : "Visual not ready yet"}</strong><p>This service is already included in the Azure library. Its visual guide will appear here as soon as the matching R2 image is available.</p></div>}
      <p className="viewer-note">Select another service or branch to change the guide. Click a visual to open the full browser view; press Escape or Close to return.</p>
    </article>}

    {selected && expanded && ready(selected) && !imageError && <div className="image-modal" role="dialog" aria-modal="true" aria-label={selected.name + " full view"} onClick={() => setExpanded(false)}>
      <button type="button" className="modal-close" onClick={() => setExpanded(false)} aria-label="Close full view">Close ×</button>
      <img src={azureAssetUrl(assetPath(selected))} alt={selected.name + " Azure study visual full view"} onClick={(event) => event.stopPropagation()} />
    </div>}
  </main>;
}
