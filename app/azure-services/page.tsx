"use client";

import { useMemo, useState } from "react";
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
const noAzurePrefix = new Set(["ai-anomaly-detector", "data-science-virtual-machines", "foundry-agent-service", "foundry-control-plane", "foundry-iq", "foundry-models", "health-bot", "observability-in-foundry-control-plane", "phi-open-models", "sdks"]);
const folderOverrides: Record<string, string> = { "api-management": "internet-of-things", "azure-iot-edge": "internet-of-things", "azure-database-migration-service": "migration", "azure-confidential-ledger": "security" };
const azureR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
const azureAssetUrl = (path: string) => { const resolved = assetUrl(path); return resolved === path ? azureR2Base + path : resolved; };
const assetPath = (service: AzureService) => {
  const filename = filenameOverrides[service.slug] || (noAzurePrefix.has(service.slug) ? service.slug : "azure-" + service.slug) + ".webp";
  return "/azure/" + (folderOverrides[service.slug] || service.folder) + "/" + filename;
};

export default function AzureServicesPage() {
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState(azureUniqueServices[0]?.slug || "");
  const [query, setQuery] = useState("");
  const [imageError, setImageError] = useState(false);
  const branch = azureBranches[selectedBranchIndex] || azureBranches[0];
  const selected = azureUniqueServices.find((service) => service.slug === selectedSlug) || branch?.services[0] || azureUniqueServices[0];
  const branchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? branch.services.filter((service) => service.name.toLowerCase().includes(q)) : branch.services;
  }, [branch, query]);
  const choose = (service: AzureService) => { setSelectedSlug(service.slug); setImageError(false); };
  const chooseBranch = (value: string) => {
    const index = Number(value);
    const next = azureBranches[index] || azureBranches[0];
    setSelectedBranchIndex(index);
    setQuery("");
    if (next?.services[0]) choose(next.services[0]);
  };

  return <main className="workspace azure-workspace">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a className="active" href="/azure-services">Azure services</a><a href="/services">AWS services</a></div></nav>
    <header className="masthead"><div className="site-tools"><label className="azure-branch-picker"><span>Browse Azure branch</span><select value={selectedBranchIndex} onChange={(event) => chooseBranch(event.target.value)} aria-label="Browse Azure branch">{azureBranches.map((item,index) => <option value={index} key={item.title}>{item.title} · {item.services.length} services</option>)}</select></label><label className="service-search"><span>Find within branch</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this branch…" aria-label="Search services in selected Azure branch" /></label><div className="progress"><strong>{azureUniqueServices.length}</strong><span>unique services mapped</span></div></div></header>
    <section className="azure-library-panel" aria-label={branch?.title + " Azure services"}><div className="azure-branch-heading"><div><p className="course-kicker">Selected Azure branch</p><h1>{branch?.title}</h1><p>{branch?.services.length} services in this branch · repeated services keep one shared visual identity.</p></div><span style={{ "--branch-accent": azureBranchAccents[selectedBranchIndex % azureBranchAccents.length] } as React.CSSProperties}>{selectedBranchIndex + 1}</span></div><div className="azure-service-list">{branchResults.map((service) => <button key={branch?.title + "-" + service.name} className={"azure-service-row " + (selected?.slug === service.slug ? "active" : "")} onClick={() => choose(service)} aria-pressed={selected?.slug === service.slug}><span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small></button>)}{branchResults.length === 0 && <p className="azure-empty">No service in this branch matches that search.</p>}</div></section>
    {selected && <article className="viewer" style={{ "--service-accent": "#0078d4" } as React.CSSProperties}><div className="viewer-head"><div><p>Selected Azure service</p><h2>{selected.name}</h2></div><span className={"azure-status " + (ready(selected) ? "ready" : "pending")}>{ready(selected) ? "Visual available" : "Visual pending"}</span></div>{ready(selected) && !imageError ? <button className="image-link" onClick={() => setImageError(false)} aria-label={"Open " + selected.name + " visual"}><img src={azureAssetUrl(assetPath(selected))} onError={() => setImageError(true)} alt={selected.name + " Azure study visual"} /></button> : <div className="azure-pending-card"><strong>{ready(selected) ? "Visual is being connected" : "Visual not ready yet"}</strong><p>This service is already included in the Azure library. Its visual guide will appear here as soon as the matching R2 image is available.</p></div>}<p className="viewer-note">Select another service or branch to change the guide. Repeated branch references use the same central service identity.</p></article>}
  </main>;
}
