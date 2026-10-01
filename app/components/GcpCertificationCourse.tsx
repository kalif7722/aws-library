"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { GcpCourse } from "../gcp-course-data";
import { gcpCourseSkillCount } from "../gcp-course-data";
import { gcpCourseServices } from "../gcp-course-services";
import { gcpOfficialExamDomains } from "../gcp-all-exam-objectives";
import { gcpAssetUrl, gcpContent, gcpIcons, type GcpService } from "../gcp-data";
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

const gcpBadgeTitles: Record<string, string> = {
  PCA: "Cloud Architect",
  PCD: "Cloud Developer",
  PDE: "Data Engineer",
  PCDE: "Cloud Database Engineer",
  PMLE: "Machine Learning Engineer",
  PCSE: "Cloud Security Engineer",
  PCDOE: "Cloud DevOps Engineer",
  PCNE: "Cloud Network Engineer",
  PAA: "Agentic AI Architect",
  PSOE: "Security Operations Engineer",
  ACE: "Cloud Engineer",
  ADP: "Data Practitioner",
  AGWA: "Workspace Administrator",
  GAL: "Generative AI Leader",
  CDL: "Cloud Digital Leader",
};

function GcpCourseBadge({ course }: { course: GcpCourse }) {
  const pathId = `gcp-badge-${course.code.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const badgeTitle = gcpBadgeTitles[course.code] || course.title.replace(/^(Professional|Associate)\s+/, "");

  return <svg className="gcp-course-badge" viewBox="0 0 160 160" role="img" aria-label={`${course.title} Google Cloud certification badge`}>
    <defs>
      <path id={`${pathId}-top`} d="M 25 78 A 55 55 0 0 1 135 78" />
      <path id={`${pathId}-bottom`} d="M 20 91 A 62 62 0 0 0 140 91" />
      <linearGradient id={`${pathId}-ring`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f8d46a" />
        <stop offset=".48" stopColor="#b97912" />
        <stop offset="1" stopColor="#ffe59a" />
      </linearGradient>
    </defs>
    <circle className="gcp-badge-shadow" cx="80" cy="80" r="72" />
    <circle className="gcp-badge-face" cx="80" cy="80" r="69" />
    <circle className="gcp-badge-edge" cx="80" cy="80" r="63" />
    <text className="gcp-badge-title">
      <textPath href={`#${pathId}-top`} startOffset="50%" textAnchor="middle">{badgeTitle}</textPath>
    </text>
    <text className="gcp-badge-caption">
      <textPath href={`#${pathId}-bottom`} startOffset="50%" textAnchor="middle">GOOGLE CLOUD CERTIFIED · {course.level.toUpperCase()}</textPath>
    </text>
    <circle className="gcp-badge-ring" cx="80" cy="81" r="31" stroke={`url(#${pathId}-ring)`} />
    <image
      className="gcp-badge-cloud"
      href="/assets/gcp-icons/legacy/cloud-generic.svg"
      x="57"
      y="58"
      width="46"
      height="46"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    />
  </svg>;
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
  const domainCount = (gcpOfficialExamDomains[course.code] || []).length;

  return <main className="learning-shell course-page gcp-course-page">
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="brand-link" href="/">Visual Learning</a>
      <div><a className="home-button" href="/">Home</a><a className="active" href={`/courses/${course.route}`}>{course.code}</a><a href="/gcp-services">Browse all GCP services</a></div>
    </nav>

    <header className="course-hero compact-course-hero gcp-course-page-hero">
      <GcpCourseBadge course={course} />
      <div className="course-title">
        <p className="course-kicker">{course.level} certification learning path</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <a className="scope-source" href={course.sourceUrl} target="_blank" rel="noreferrer">Official Google Cloud certification guide ↗</a>
      </div>
      <div className="course-overview">
        <div><strong>{domainCount}</strong><span>exam domains</span></div>
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
          <p className="course-source-note">Services are matched from the supplied Google exam objectives and reviewed course coverage. Selecting a service reuses the central GCP EL10, architecture, learning, and console walkthrough content.</p>
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

        {serviceDetailsVisible && details ? <div className="gcp-course-learning gcp-standard-service-surface"><GcpSharedServiceSections serviceName={selected.displayName} details={details} consoleWalkthrough={<CourseStudyImage path={selected.primaryWalkthroughPath} title={`${selected.displayName} console walkthrough`} compact />} /></div> : null}
      </article>}
    </section>
  </main>;
}
