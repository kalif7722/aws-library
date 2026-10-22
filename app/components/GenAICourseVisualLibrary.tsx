"use client";

import { useEffect, useMemo, useState } from "react";

type CourseModule = { id: string; title: string; pages: string; description: string; topics: string[]; ready?: boolean };

const modules: CourseModule[] = [
  { id: "00", title: "Course Introduction", pages: "3–15", description: "Course orientation, learning goals, and roadmap.", topics: ["Course introduction", "Learning roadmap", "How to use this visual course"], ready: true },
  { id: "01", title: "Generative AI Fundamentals and Amazon Bedrock", pages: "16–74", description: "Understand generative AI foundations and the core Amazon Bedrock concepts.", topics: ["Generative AI fundamentals", "Foundation models", "Amazon Bedrock"] },
  { id: "02", title: "Managing Data for Generative AI", pages: "75–218", description: "Prepare, transform, store, retrieve, and protect data for GenAI applications.", topics: ["Data preparation", "Embeddings and vectors", "Data services and security"] },
  { id: "03", title: "Agentic AI", pages: "219–268", description: "Learn agent patterns, tool use, orchestration, and agent platforms.", topics: ["Agent loops", "Tools and orchestration", "Agent frameworks"] },
  { id: "04", title: "Operations Efficiency and Optimization", pages: "269–290", description: "Improve cost, latency, throughput, reliability, and operational visibility.", topics: ["Efficiency", "Optimization", "Monitoring"] },
  { id: "05", title: "Managing Models with SageMaker AI", pages: "291–326", description: "Explore model management and related SageMaker workflows.", topics: ["Model lifecycle", "Deployment", "Monitoring"] },
  { id: "06", title: "More Tools for Building AI Applications", pages: "327–402", description: "Connect application components and developer tools into useful workflows.", topics: ["Application tooling", "Integration patterns", "Developer workflows"] },
  { id: "07", title: "Governance and Quality Assurance", pages: "403–454", description: "Evaluate quality, establish governance, and improve trust in AI outputs.", topics: ["Evaluation", "Quality assurance", "Governance"] },
  { id: "08", title: "Security, Identity, and Compliance", pages: "455–507", description: "Apply identity, access, privacy, and security controls.", topics: ["Identity and access", "Data protection", "Compliance"] },
  { id: "09", title: "Other AWS Services: Analytics", pages: "508–533", description: "Understand analytics services that support AI application data flows.", topics: ["Analytics services", "Data movement", "Analysis patterns"] },
  { id: "10", title: "Other AWS Services: Compute, Containers and Customer Engagement", pages: "534–550", description: "Review compute, container, and customer engagement services.", topics: ["Compute", "Containers", "Customer engagement"] },
  { id: "11", title: "Other AWS Services: Database", pages: "551–560", description: "Review database services and where they fit in application architectures.", topics: ["Database options", "Data access", "Integration"] },
  { id: "12", title: "Other AWS Services: Developer Tools", pages: "561–578", description: "Explore developer tools used to build and deliver applications.", topics: ["Developer tools", "Build and release", "Automation"] },
  { id: "13", title: "Other AWS Services: Machine Learning", pages: "579–590", description: "Connect related ML services and capabilities to GenAI workflows.", topics: ["ML services", "Model capabilities", "Use cases"] },
  { id: "14", title: "Other AWS Services: Management and Governance", pages: "591–605", description: "Explore management and governance services that support reliable operations.", topics: ["Management", "Governance", "Operations"] },
  { id: "15", title: "Other AWS Services: Migration and Data Transfer", pages: "606–611", description: "Review services for migration and data transfer.", topics: ["Migration", "Transfer choices", "Data movement"] },
  { id: "16", title: "Other AWS Services: Networking and Content Delivery", pages: "612–629", description: "Understand connectivity, network boundaries, and content delivery.", topics: ["Networking", "Connectivity", "Content delivery"] },
  { id: "17", title: "Other AWS Services: Storage", pages: "630–649", description: "Compare storage choices and their role in AI application architectures.", topics: ["Object storage", "File and block storage", "Archive and backup"] },
  { id: "18", title: "Exam Preparation", pages: "650–671", description: "Review exam-oriented scenarios and connect the course concepts.", topics: ["Scenario review", "Service selection", "Final revision"] },
];

const TOTAL_PLANNED_VISUALS: Record<string, number> = { "00": 13 };
const R2_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals";

export default function GenAICourseVisualLibrary() {
  const [selectedId, setSelectedId] = useState("00");
  const [opened, setOpened] = useState<number | null>(null);
  // Discourage casual saving/copying of course visuals. Browser-only controls
  // cannot prevent OS screenshots or users retrieving public image URLs.
  useEffect(() => {
    const root = document.querySelector(".genai-visual-library");
    if (!root) return;
    const stopContextMenu = (event: Event) => {
      if ((event.target as HTMLElement | null)?.closest("img, .genai-slide-image")) event.preventDefault();
    };
    const stopDrag = (event: Event) => {
      if ((event.target as HTMLElement | null)?.closest("img, .genai-slide-image")) event.preventDefault();
    };
    root.addEventListener("contextmenu", stopContextMenu);
    root.addEventListener("dragstart", stopDrag);
    return () => {
      root.removeEventListener("contextmenu", stopContextMenu);
      root.removeEventListener("dragstart", stopDrag);
    };
  }, []);

  const selected = useMemo(() => modules.find((item) => item.id === selectedId) || modules[0], [selectedId]);
  const planned = TOTAL_PLANNED_VISUALS[selected.id] || 0;
  const imageSrc = (index: number) => `${R2_BASE}/module-${selected.id}/slide-${String(index).padStart(2, "0")}.webp`;
  const readyCount = selected.id === "00" ? 1 : 0;

  return <section className="genai-visual-library" id="genai-visual-course">
    <style>{`
      .genai-visual-library{--g-ink:#12213c;--g-muted:#64748b;--g-line:#dce5f1;--g-blue:#2459d3;color:var(--g-ink);margin:24px 0 32px}
      .genai-hero{border-radius:22px;padding:clamp(20px,3vw,34px);color:white;background:radial-gradient(circle at 78% 20%,#4e7fe0 0,transparent 28%),linear-gradient(125deg,#101d3a,#123e77 58%,#2267a7);display:grid;grid-template-columns:1.6fr 1fr;gap:22px;align-items:center}
      .genai-hero h2{font-size:clamp(26px,3vw,38px);line-height:1.1;margin:8px 0 12px}.genai-hero p{max-width:680px;line-height:1.65;margin:0;color:#e1ebff}.genai-hero-stat{border:1px solid #ffffff42;background:#ffffff12;border-radius:16px;padding:16px}.genai-hero-stat strong{display:block;font-size:32px}.genai-hero-stat span{color:#dce8ff;font-size:13px}
      .genai-module-layout{display:grid;grid-template-columns:280px minmax(0,1fr);gap:18px;margin-top:18px}.genai-module-nav,.genai-module-content{border:1px solid var(--g-line);border-radius:16px;background:#fff;overflow:hidden}.genai-module-nav h3{margin:0;padding:16px;background:#f5f8fd;font-size:15px}.genai-module-button{width:100%;border:0;border-top:1px solid #edf1f7;background:white;text-align:left;padding:12px 14px;display:block;cursor:pointer;color:inherit}.genai-module-button.active{background:#edf4ff;box-shadow:inset 3px 0 #2459d3}.genai-module-button b{display:block;font-size:12px;color:#2459d3;margin-bottom:3px}.genai-module-button span{display:block;font-weight:650;font-size:13px;line-height:1.35}.genai-module-button small{display:block;color:var(--g-muted);margin-top:5px}.genai-module-content{padding:clamp(16px,2.5vw,26px)}.genai-module-heading{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.genai-module-heading h3{font-size:clamp(20px,2vw,28px);line-height:1.2;margin:5px 0 8px}.genai-kicker{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#2459d3;font-weight:800}.genai-chip{background:#eef3fb;border-radius:99px;padding:6px 9px;font-size:11px;white-space:nowrap;color:#344766}.genai-module-desc{color:#53627a;line-height:1.6}.genai-topic-list{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 22px}.genai-topic-list span{background:#f4f7fb;border:1px solid #e3eaf3;border-radius:8px;padding:6px 9px;font-size:12px}
      .genai-slide-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.genai-slide-card{border:1px solid var(--g-line);border-radius:12px;overflow:hidden;background:#f7f9fc;min-width:0}.genai-slide-image{width:100%;aspect-ratio:16/9;user-select:none;-webkit-user-drag:none;pointer-events:none;object-fit:cover;display:block;background:linear-gradient(135deg,#e8effb,#f8fafc)}.genai-slide-fallback{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;color:#61718a;font-size:12px}.genai-slide-meta{padding:10px 11px;background:white}.genai-slide-meta b{font-size:12px;display:block}.genai-slide-meta small{display:block;color:var(--g-muted);margin-top:4px}.genai-placeholder{border:1px dashed #c7d4e7;border-radius:12px;padding:20px;background:#f8faff;color:#53627a;line-height:1.6}.genai-open-image{border:0;padding:0;width:100%;display:block;text-align:left;cursor:zoom-in;background:transparent}.genai-modal{position:fixed;inset:0;z-index:10000;background:#06101beF;display:flex;align-items:center;justify-content:center;padding:4vw}.genai-modal img{max-width:94vw;max-height:88vh;object-fit:contain;border-radius:8px}.genai-modal button{position:absolute;right:20px;top:20px;padding:10px 14px;border:1px solid #ffffff70;border-radius:9px;background:#14233d;color:white;cursor:pointer}
      @media(max-width:850px){.genai-hero{grid-template-columns:1fr}.genai-module-layout{grid-template-columns:1fr}.genai-module-nav{max-height:310px;overflow:auto}.genai-slide-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.genai-slide-grid{grid-template-columns:1fr}.genai-module-heading{display:block}.genai-chip{display:inline-block;margin-top:8px}}
    `}</style>
    <div className="genai-hero">
      <div><div className="genai-kicker" style={{color:"#c5dcff"}}>VISUAL LEARNING LIBRARY · AIP-C01</div><h2>Learn the course one visual at a time</h2><p>Explore every course module through individual, clear visual explainers. Each image will turn a key concept into a readable diagram, process, comparison, or architecture—not a collage.</p></div>
      <div className="genai-hero-stat"><strong>19 modules</strong><span>Source PDF pages 3–671 · individual 16:9 visual lessons are being added in reviewed batches.</span><hr style={{borderColor:"#ffffff30",margin:"14px 0"}}/><strong>{readyCount} visual ready</strong><span>in this module so far</span></div>
    </div>
    <div className="genai-module-layout">
      <nav className="genai-module-nav" aria-label="Generative AI course modules"><h3>Course modules</h3>{modules.map((item) => <button type="button" key={item.id} className={item.id === selectedId ? "genai-module-button active" : "genai-module-button"} onClick={() => {setSelectedId(item.id);setOpened(null);}}><b>MODULE {item.id}</b><span>{item.title}</span><small>PDF pages {item.pages}{item.id === "00" ? " · First batch" : " · Visuals pending"}</small></button>)}</nav>
      <article className="genai-module-content">
        <div className="genai-module-heading"><div><div className="genai-kicker">MODULE {selected.id}</div><h3>{selected.title}</h3></div><span className="genai-chip">PDF pages {selected.pages}</span></div>
        <p className="genai-module-desc">{selected.description}</p>
        <div className="genai-topic-list">{selected.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        {selected.id === "00" ? <><div className="genai-slide-grid">{Array.from({length: planned}, (_, i) => i + 1).map((index) => <div className="genai-slide-card" key={index}><button className="genai-open-image" type="button" onClick={() => setOpened(index)} aria-label={`Open Module 00 visual ${index}`}><img draggable={false} className="genai-slide-image" src={imageSrc(index)} alt={`Module 00 visual lesson ${index}`} onError={(event) => {event.currentTarget.style.display="none"; const next=event.currentTarget.nextElementSibling as HTMLElement | null; if(next) next.style.display="flex";}}/><div className="genai-slide-fallback" style={{display:"none"}}>Image {String(index).padStart(2,"0")} will appear here after its WebP asset is uploaded.</div></button><div className="genai-slide-meta"><b>Visual {String(index).padStart(2,"0")}</b><small>{index === 1 ? "Course introduction · generated, asset upload pending" : "Planned · not generated yet"}</small></div></div>)}</div><p className="genai-module-desc" style={{fontSize:12,marginTop:14}}>Image slots use the asset convention <code>aws-genai-course-visuals/module-00/slide-01.webp</code>. The gallery will populate as reviewed WebP images are uploaded.</p></> : <div className="genai-placeholder"><strong>Visual lessons are queued for this module.</strong><br/>This module is already listed in the course map. Individual image cards will be added in batches as each topic is illustrated and reviewed. No placeholder is counted as completed content.</div>}
      </article>
    </div>
    {opened !== null && <div className="genai-modal" role="dialog" aria-modal="true" aria-label="Expanded course visual" onClick={() => setOpened(null)}><button type="button" onClick={() => setOpened(null)}>Close ×</button><img src={imageSrc(opened)} alt={`Expanded Module 00 visual ${opened}`} onClick={(event) => event.stopPropagation()} /></div>}
  </section>;
}
