"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { GcpCourse } from "../gcp-course-data";
import { gcpCourseSkillCount } from "../gcp-course-data";
import { gcpCourseServices } from "../gcp-course-services";
import { gcpAssetUrl, gcpContent, gcpIcons, type GcpContent, type GcpService } from "../gcp-data";
import GcpProfessionalCourseGuide from "./GcpProfessionalCourseGuide";
import GcpSharedServiceSections from "./GcpSharedServiceSections";
import "./GcpLibrary.css";
import "./GcpProfessionalCourseGuide.css";

function CourseStudyImage({ path, title, compact = false }: { path?: string; title: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => { setFailed(false); setLoaded(false); }, [path]);
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };

  if (!path || failed) return <div className={`gcp-course-service-pending ${compact ? "compact" : ""}`}><strong>{title} pending</strong><span>No reviewed image is currently available at the mapped GCP asset path.</span></div>;

  return <section className={`gcp-course-study-image ${compact ? "compact" : ""}`}>
    {!loaded && <div className="gcp-course-image-loading">Loading visual…</div>}
    <button ref={trigger} type="button" disabled={!loaded} onClick={() => dialog.current?.showModal()} aria-label={`Open ${title} full screen`}>
      <img src={gcpAssetUrl(path)} alt={title} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      {loaded && <span>Open full screen ↗</span>}
    </button>
    <dialog ref={dialog} className="gcp-image-dialog" aria-label={`${title} full screen`} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <button type="button" className="gcp-modal-close" onClick={close} autoFocus aria-label="Close full screen">×</button>
      <img src={gcpAssetUrl(path)} alt={title} onClick={event => event.stopPropagation()} />
    </dialog>
  </section>;
}

function groupServices(services: GcpService[]) {
  const map = new Map<string, GcpService[]>();
  for (const service of services) {
    const current = map.get(service.officialCategory) || [];
    current.push(service);
    map.set(service.officialCategory, current);
  }
  return [...map.entries()].map(([title, items]) => ({ title, services: items }));
}

export default function GcpCertificationCourse({ course }: { course: GcpCourse }) {
  const services = useMemo(() => gcpCourseServices(course.code), [course.code]);
  const categories = useMemo(() => groupServices(services), [services]);
  const [selectedSlug, setSelectedSlug] = useState(services[0]?.slug || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [visualVisible, setVisualVisible] = useState(true);
  const [serviceDetailsVisible, setServiceDetailsVisible] = useState(true);

  useEffect(() => {
    if (!selectedSlug && services[0]) setSelectedSlug(services[0].slug);
  }, [services, selectedSlug]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && services.some(service => service.slug === requested)) setSelectedSlug(requested);
  }, [services]);

  useEffect(() => {
    const onCourseService = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string; courseCode?: string }>).detail;
      if (detail?.courseCode !== course.code || !detail.slug) return;
      if (!services.some(service => service.slug === detail.slug)) return;
      setSelectedSlug(detail.slug);
      setVisualVisible(true);
      setServiceDetailsVisible(true);
      const url = new URL(window.location.href);
      url.searchParams.set("service", detail.slug);
      window.history.replaceState(null, "", url);
      document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("gcp-course-service", onCourseService);
    return () => window.removeEventListener("gcp-course-service", onCourseService);
  }, [course.code, services]);

  const selectService = (service: GcpService) => {
    setSelectedSlug(service.slug);
    setVisualVisible(true);
    setServiceDetailsVisible(true);
    const url = new URL(window.location.href);
    url.searchParams.set("service", service.slug);
    window.history.replaceState(null, "", url);
  };

  const selected = services.find(service => service.slug === selectedSlug) || services[0];
  const details = selected ? gcpContent[selected.slug] : undefined;
  const skillCount = gcpCourseSkillCount(course);

  return <main className="learning-shell course-page gcp-course-page">
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="brand-link" href="/">Visual Learning</a>
      <div><a className="home-button" href="/">Home</a><a className="active" href={`/courses/${course.route}`}>{course.code}</a><a href="/gcp-services">Browse all GCP services</a></div>
    </nav>

    <header className="course-hero compact-course-hero gcp-course-page-hero">
      <div className="cert-mark gcp-cert-mark"><span>GOOGLE CLOUD</span><strong>{course.code}</strong></div>
      <div className="course-title">
        <p className="course-kicker">{course.level} certification learning path</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <a className="scope-source" href={course.sourceUrl} target="_blank" rel="noreferrer">Official Google Cloud certification guide ↗</a>
      </div>
      <div className="course-overview">
        <div><strong>{(gcpContent && course.code) ? (Object.keys((awaitlessDomains(course.code))).length || 0) : 0}</strong><span>exam domains</span></div>
        <div><strong>{skillCount}</strong><span>skill areas</span></div>
        <div><strong>{services.length}</strong><span>mapped GCP services</span></div>
      </div>
    </header>

    <GcpProfessionalCourseGuide course={course} />

    <section className={`course-workspace ${sidebarCollapsed ? "sidebar-collapsed" : ""} gcp-course-workspace`} id="curriculum">
      <aside className={`course-sidebar ${sidebarCollapsed ? "collapsed" : ""}`} aria-label={`${course.title} service navigation`}>
        <button className="course-sidebar-toggle" onClick={() => setSidebarCollapsed(value => !value)} aria-expanded={!sidebarCollapsed} type="button">{sidebarCollapsed ? "›" : "‹"}</button>
        {sidebarCollapsed ? <div className="course-sidebar-rail"><span>{course.code}</span><strong>Course services</strong><small>{services.length}</small></div> : <>
          <div className="course-sidebar-head"><div><p className="course-kicker">Exam-linked services</p><h2>{categories.length} service categories</h2></div><button onClick={() => setAllOpen(value => !value)} type="button">{allOpen ? "Collapse all" : "Expand all"}</button></div>
          <p className="course-source-note">Services are matched from the supplied Google exam objectives. Selecting a service reuses the central GCP EL10, architecture, learning, and console walkthrough content.</p>
          <div className="course-category-list">{categories.map((category, index) => <details className="course-nav-group" key={`${category.title}-${allOpen}`} open={allOpen || index === 0} style={{ "--module-accent": `hsl(${(index * 37 + 205) % 360} 78% 62%)` } as CSSProperties}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><small>{category.services.length}</small><b>⌄</b></summary>
            <div className="course-service-list">{category.services.map(service => <button key={service.slug} className={service.slug === selected?.slug ? "active" : ""} onClick={() => selectService(service)} aria-pressed={service.slug === selected?.slug} type="button"><span>{service.displayName}</span><small>GCP service page</small></button>)}</div>
          </details>)}</div>
        </>}
      </aside>

      {selected && <article className="viewer course-viewer has-knowledge gcp-course-viewer" style={{ "--service-accent": "#4285f4" } as CSSProperties}>
        <div className="viewer-head clean-viewer-head">
          <div className="gcp-course-service-heading">
            {gcpIcons[selected.slug]?.path ? <img src={gcpIcons[selected.slug].path || ""} alt={`${selected.displayName} icon`} /> : null}
            <div><h2>{selected.displayName}</h2><small>{selected.officialCategory} · mapped to {course.code}</small></div>
          </div>
          <div className="gcp-course-viewer-actions">
            <button className="visual-toggle" onClick={() => setVisualVisible(value => !value)} type="button">{visualVisible ? "Hide EL10 ↑" : "Show EL10 ↓"}</button>
            <button className="visual-toggle" onClick={() => setServiceDetailsVisible(value => !value)} type="button">{serviceDetailsVisible ? "Hide learning ↑" : "Show learning ↓"}</button>
            <a className="visual-toggle" href={`/gcp-services?service=${selected.slug}`}>Open service library →</a>
          </div>
        </div>

        {visualVisible && <CourseStudyImage path={selected.el10Path} title={`${selected.displayName} EL10 visual`} />}

        {serviceDetailsVisible && details ? <div className="gcp-course-learning"><GcpSharedServiceSections serviceName={selected.displayName} details={details} consoleWalkthrough={<CourseStudyImage path={selected.primaryWalkthroughPath} title={`${selected.displayName} console walkthrough`} compact />} />
          {selected.companionWalkthroughPath ? <section className="gcp-course-companion"><div className="service-section-cap"><div><p>COMPANION COVERAGE</p><h3>{selected.displayName} companion walkthrough</h3></div><span>Additional console or implementation context for the selected service.</span></div><CourseStudyImage path={selected.companionWalkthroughPath} title={`${selected.displayName} companion walkthrough`} compact /></section> : null}
        </div> : null}
      </article>}
    </section>
  </main>;
}

function awaitlessDomains(code: string) {
  // Kept synchronous for a stable server/client render; the guide itself owns the detailed domain UI.
  const counts: Record<string, number> = { PCA: 6, PCD: 4, PDE: 5, PCDE: 4, PMLE: 6, PCSE: 5, PCDOE: 5, PCNE: 6, PAA: 5, PSOE: 6 };
  return Object.fromEntries(Array.from({ length: counts[code] || 0 }, (_, index) => [String(index), true]));
}
