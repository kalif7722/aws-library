"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { ScopeCategory } from "../course-data";
import { guideAliases, pendingGuides } from "../course-data";
import { services } from "../services/page";
import { assetUrl } from "../../lib/asset-url";

type Props = {
  code: string;
  level: string;
  title: string;
  description: string;
  scope: ScopeCategory[];
  sourceUrl: string;
  sourceLabel: string;
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const guideName = (name: string) => guideAliases[name] || name;

export default function CertificationCourse({ code, level, title, description, scope, sourceUrl, sourceLabel }: Props) {
  const uniqueServices = new Set(scope.flatMap((category) => category.services)).size;
  const references = scope.reduce((total, category) => total + category.services.length, 0);
  const pending = new Set(scope.flatMap((category) => category.services).filter((service) => pendingGuides.has(service))).size;
  const available = useMemo(() => scope.flatMap((category) => category.services).map(guideName).map((name) => services.find((item) => normalize(item.name) === normalize(name))).filter(Boolean), [scope]);
  const [selectedName, setSelectedName] = useState(available[0]?.name || "");
  const [expanded, setExpanded] = useState(false);
  const [imageScale, setImageScale] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scale: 100 });
  const [allOpen, setAllOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const selected = services.find((item) => item.name === selectedName) || available[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!dragging) return;
    const move = (event: PointerEvent) => setImageScale(Math.max(60, Math.min(220, dragStart.scale + (event.clientX - dragStart.x) / 4)));
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [dragging, dragStart]);

  const selectService = (name: string) => {
    const match = services.find((item) => normalize(item.name) === normalize(guideName(name)));
    if (!match) return;
    setSelectedName(match.name);
    setImageScale(100);
  };

  return (
    <main className="learning-shell course-page">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/">EL10 AWS Learning</a>
        <div><a className="active" href="#curriculum">{title}</a><a href="/services">Browse all AWS services</a></div>
      </nav>

      <header className="course-hero compact-course-hero">
        <div className="cert-mark"><span>AWS</span><strong>{code}</strong></div>
        <div className="course-title">
          <p className="course-kicker">{level} certification learning path</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <a className="scope-source" href={sourceUrl} target="_blank" rel="noreferrer">Official AWS in-scope services ↗</a>
        </div>
        <div className="course-overview">
          <div><strong>{scope.length}</strong><span>scope categories</span></div>
          <div><strong>{uniqueServices}</strong><span>unique services</span></div>
          <div><strong>{references}</strong><span>scope references</span></div>
        </div>
      </header>

      <section className="scope-note compact-scope-note">
        <div><strong>Official scope aligned</strong><span>Service names and categories follow the current AWS exam guide.</span></div>
        <div><strong>{uniqueServices - pending} guides connected</strong><span>Related features reuse their parent service guide where appropriate.</span></div>
        <div><strong>{pending} guides pending</strong><span>Still listed here so the certification scope remains complete.</span></div>
      </section>

      <section className={`course-workspace ${sidebarCollapsed ? "sidebar-collapsed" : ""}`} id="curriculum">
        <aside className={`course-sidebar ${sidebarCollapsed ? "collapsed" : ""}`} aria-label={`${title} service navigation`}>
          <button className="course-sidebar-toggle" onClick={() => setSidebarCollapsed((value) => !value)} aria-expanded={!sidebarCollapsed} aria-label={`${sidebarCollapsed ? "Expand" : "Collapse"} course navigation`} title={`${sidebarCollapsed ? "Expand" : "Collapse"} course navigation`}>
            {sidebarCollapsed ? "›" : "‹"}
          </button>
          {sidebarCollapsed ? <div className="course-sidebar-rail"><span>{code}</span><strong>Course scope</strong><small>{scope.length}</small></div> : <>
          <div className="course-sidebar-head">
            <div><p className="course-kicker">Official scope</p><h2>{scope.length} categories</h2></div>
            <button onClick={() => setAllOpen((value) => !value)}>{allOpen ? "Collapse all" : "Expand all"}</button>
          </div>
          <p className="course-source-note">{sourceLabel}. The list is non-exhaustive and subject to change.</p>
          <div className="course-category-list">
            {scope.map((category, index) => (
              <details className="course-nav-group" key={`${category.title}-${allOpen}`} open={allOpen || index === 0} style={{ "--module-accent": `hsl(${(index * 37 + 325) % 360} 78% 62%)` } as CSSProperties}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><small>{category.services.length}</small><b>⌄</b></summary>
                <div className="course-service-list">
                  {category.services.map((service) => {
                    const mapped = services.find((item) => normalize(item.name) === normalize(guideName(service)));
                    const isPending = pendingGuides.has(service) || !mapped;
                    return <button key={service} className={`${selected?.name === mapped?.name ? "active" : ""} ${isPending ? "pending" : ""}`} onClick={() => !isPending && selectService(service)} disabled={isPending} aria-pressed={selected?.name === mapped?.name}>
                      <span>{service}</span><small>{isPending ? "EL10 pending" : guideAliases[service] ? `Uses ${guideAliases[service]}` : "View EL10"}</small>
                    </button>;
                  })}
                </div>
              </details>
            ))}
          </div>
          </>}
        </aside>

        {selected && <article className="viewer course-viewer" style={{ "--service-accent": selected.accent } as CSSProperties}>
          <div className="viewer-head">
            <div><p>Selected EL10 page</p><h2>{selected.name}</h2><small>{selected.summary}</small></div>
            <button onClick={() => setExpanded(true)}>Fit in browser ↗</button>
          </div>
          <button className="image-link" onClick={() => setExpanded(true)} aria-label={`Open ${selected.name} EL10 infographic in fitted viewer`}>
            <img src={assetUrl(selected.file)} style={{ width: `${imageScale}%`, maxWidth: "none" }} alt={`${selected.name} EL10 infographic`} />
          </button>
          <div className="image-controls"><span>Drag the corner to resize</span><strong>{Math.round(imageScale)}%</strong></div>
          <div className="resize-handle" role="slider" tabIndex={0} aria-valuemin={60} aria-valuemax={220} aria-valuenow={Math.round(imageScale)} aria-label="Drag to resize infographic" onKeyDown={(event) => { if (event.key === "ArrowRight") setImageScale((value) => Math.min(220, value + 10)); if (event.key === "ArrowLeft") setImageScale((value) => Math.max(60, value - 10)); }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragStart({ x: event.clientX, scale: imageScale }); setDragging(true); }} />
          <p className="viewer-note">Choose another service on the left to switch pages. Click the image for the full browser view.</p>
        </article>}
        {expanded && selected && <div className="image-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} fitted infographic viewer`} onClick={() => setExpanded(false)}><button className="modal-close" onClick={() => setExpanded(false)}>Close ×</button><img src={assetUrl(selected.file)} alt={`${selected.name} EL10 infographic`} onClick={(event) => event.stopPropagation()} /></div>}
      </section>
    </main>
  );
}
