"use client";

import { useMemo, useState } from "react";
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
const folderOverrides: Record<string, string> = { "api-management": "internet-of-things", "azure-iot-edge": "internet-of-things", "azure-database-migration-service": "migration", "azure-confidential-ledger": "security" };\nconst assetPath = (service: AzureService) => {
  const filename = filenameOverrides[service.slug] || (noAzurePrefix.has(service.slug) ? service.slug : "azure-" + service.slug) + ".webp";
  return "/azure/" + (folderOverrides[service.slug] || service.folder) + "/" + filename;
};

export default function AzureServicesPage() {
  const [selectedSlug, setSelectedSlug] = useState(azureUniqueServices[0]?.slug || "");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [imageError, setImageError] = useState(false);
  const selected = azureUniqueServices.find((service) => service.slug === selectedSlug) || azureUniqueServices[0];
  const allCollapsed = azureBranches.every((branch) => collapsed[branch.title]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return azureUniqueServices.filter((service) => service.name.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);
  const choose = (service: AzureService) => { setSelectedSlug(service.slug); setImageError(false); };
  const toggleAll = () => setCollapsed(Object.fromEntries(azureBranches.map((branch) => [branch.title, !allCollapsed])));

  return <main className="workspace azure-workspace">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a className="active" href="/azure-services">Azure services</a><a href="/services">AWS services</a></div></nav>
    <header className="masthead"><div className="site-tools"><div className="service-search"><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Azure services…" aria-label="Search Azure services" />{results.length > 0 && <div className="search-results" role="listbox">{results.map((service) => <button key={service.slug} role="option" onClick={() => { choose(service); setQuery(""); }}><span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small></button>)}</div>}</div><button className="expand-all" onClick={toggleAll}>{allCollapsed ? "Expand all" : "Collapse all"}</button><div className="progress"><strong>{azureUniqueServices.length}</strong><span>unique services mapped</span></div></div></header>
    <section className="canvas" aria-label="Azure service category branches"><div className="root-node">Microsoft Azure services</div><div className="connector vertical" aria-hidden="true" /><div className="branch-row">{azureBranches.map((branch,index)=><div className={"map-column " + (collapsed[branch.title] ? "collapsed" : "")} key={branch.title} style={{ "--branch-accent": azureBranchAccents[index % azureBranchAccents.length] } as React.CSSProperties}><button className="branch-toggle" onClick={() => setCollapsed((current) => ({ ...current, [branch.title]: !current[branch.title] }))} aria-expanded={!collapsed[branch.title]} aria-label={(collapsed[branch.title] ? "Expand " : "Collapse ") + branch.title}>{collapsed[branch.title] ? "+" : "−"}</button><div className="category-node">{branch.title}</div>{!collapsed[branch.title] && <><div className="branch" aria-hidden="true" /><div className="service-list">{branch.services.map((service) => <button key={branch.title + "-" + service.name} className={"service-node " + (selected?.slug === service.slug ? "active " : "") + (ready(service) ? "" : "pending")} onClick={() => choose(service)} aria-pressed={selected?.slug === service.slug}><span>{service.name}</span><small>{ready(service) ? "Visual available" : "Visual pending"}</small></button>)}</div></>}</div>)}</div></section>
    {selected && <article className="viewer" style={{ "--service-accent": "#0078d4" } as React.CSSProperties}><div className="viewer-head"><div><p>Selected Azure service</p><h2>{selected.name}</h2></div><span className={"azure-status " + (ready(selected) ? "ready" : "pending")}>{ready(selected) ? "Visual available" : "Visual pending"}</span></div>{ready(selected) && !imageError ? <button className="image-link" onClick={() => setImageError(false)} aria-label={"Open " + selected.name + " visual"}><img src={assetUrl(assetPath(selected))} onError={() => setImageError(true)} alt={selected.name + " Azure study visual"} /></button> : <div className="azure-pending-card"><strong>{ready(selected) ? "Visual is being connected" : "Visual not ready yet"}</strong><p>This service is already included in the Azure library. Its visual guide will appear here as soon as the matching R2 image is available.</p></div>}<p className="viewer-note">Branch references remain linked to one shared service entry, so adding a visual updates every category that uses it.</p></article>}
  </main>;
}
