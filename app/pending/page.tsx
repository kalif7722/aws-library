"use client";

import * as base from "../course-data";
import * as extra from "../course-data-extra";
import * as security from "../security-scope";
import type { ScopeCategory } from "../course-data";
import { findGuide } from "../components/CertificationCourse";

type ScopeEntry = { course: string; scope: ScopeCategory[] };

const labels: Record<string, string> = {
  saaScope: "Solutions Architect Associate (SAA-C03)", sapScope: "Solutions Architect Professional (SAP-C02)", aipScope: "Generative AI Developer Professional (AIP-C01)",
  clfScope: "Cloud Practitioner (CLF-C02)", aifScope: "AI Practitioner (AIF-C01)", dvaScope: "Developer Associate (DVA-C02)", soaScope: "CloudOps Engineer Associate (SOA-C03)",
  deaScope: "Data Engineer Associate (DEA-C01)", mlaScope: "Machine Learning Engineer Associate", dopScope: "DevOps Engineer Professional (DOP-C02)", ansScope: "Advanced Networking Specialty (ANS-C01)", scsScope: "Security Specialty (SCS-C03)",
};

const collect = (module: Record<string, unknown>): ScopeEntry[] => Object.entries(module).flatMap(([key, value]) => {
  if (!key.endsWith("Scope") || !Array.isArray(value)) return [];
  return [{ course: labels[key] || key.replace(/Scope$/, ""), scope: value as ScopeCategory[] }];
});

const scopes = [...collect(base as unknown as Record<string, unknown>), ...collect(extra as unknown as Record<string, unknown>), ...collect(security as unknown as Record<string, unknown>)];

export default function PendingGuidesPage() {
  const pending = new Map<string, Set<string>>();
  for (const { course, scope } of scopes) for (const category of scope) for (const service of category.services) {
    if (!findGuide(service)) {
      if (!pending.has(service)) pending.set(service, new Set());
      pending.get(service)!.add(course);
    }
  }
  const rows = [...pending.entries()].map(([service, courses]) => ({ service, courses: [...courses].sort() })).sort((a,b) => b.courses.length-a.courses.length || a.service.localeCompare(b.service));

  return <main className="learning-shell course-page">
    <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual Learning</a><div><a className="home-button" href="/">Home</a><a href="/services">Browse all AWS services</a></div></nav>
    <header className="course-hero compact-course-hero"><div className="cert-mark"><span>EL10</span><strong>{rows.length}</strong></div><div className="course-title"><p className="course-kicker">Master creation queue</p><h1>Pending infographic tracker</h1><p>One deduplicated backlog across every certification course. A guide disappears from this list automatically as soon as its service maps to the All Services library.</p></div><div className="course-overview"><div><strong>{scopes.length}</strong><span>course scopes checked</span></div><div><strong>{rows.length}</strong><span>unique guides pending</span></div><div><strong>{rows.reduce((n,r)=>n+r.courses.length,0)}</strong><span>course references</span></div></div></header>
    <section className="scope-note compact-scope-note"><div><strong>Automatic tracking</strong><span>No duplicate image work when a missing service appears in multiple exams.</span></div><div><strong>Priority ordered</strong><span>Services used by the most certification paths appear first.</span></div><div><strong>Creation standard</strong><span>Generate at 2048×1152 using the Amazon Inspector / Audit Manager visual standard.</span></div></section>
    <section style={{maxWidth:1200,margin:"24px auto",padding:"0 20px 48px"}}><div style={{display:"grid",gap:10}}>{rows.map((row,index)=><article key={row.service} style={{border:"1px solid #334155",borderRadius:14,padding:"16px 18px",background:"#111827"}}><div style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"flex-start"}}><div><small style={{opacity:.65}}>#{String(index+1).padStart(2,"0")} · EL10 PENDING</small><h3 style={{margin:"5px 0 8px"}}>{row.service}</h3><p style={{margin:0,opacity:.72,fontSize:13}}>Needed by {row.courses.join(" · ")}</p></div><strong style={{whiteSpace:"nowrap"}}>{row.courses.length} course{row.courses.length===1?"":"s"}</strong></div></article>)}</div></section>
  </main>;
}
