import type { GcpContent } from "../gcp-data";

type Section = NonNullable<GcpContent["sections"]>[number];

function SectionVisual({ section, serviceName, index }: { section: Section; serviceName: string; index: number }) {
  const visualKinds = new Set(["flow", "architecture", "hierarchy", "lifecycle", "iam", "integrations", "troubleshooting"]);
  return (
    <section className={`gcp-detail-card gcp-detail-${section.kind}`} id={`gcp-section-${index + 1}`}>
      <div className="gcp-detail-card-heading"><span>{String(index + 1).padStart(2, "0")}</span><h3>{section.title}</h3></div>
      {section.body && <p>{section.body}</p>}
      {section.steps && visualKinds.has(section.kind) && (
        <div className="gcp-flow">
          {section.steps.map((step, stepIndex) => <div className="gcp-flow-step" key={step}><b>{stepIndex + 1}</b><span>{step}</span>{stepIndex < section.steps!.length - 1 && <i aria-hidden="true">→</i>}</div>)}
        </div>
      )}
      {!section.body && !section.steps && <p>{`Study how ${serviceName} behaves in this area, using the official documentation linked below.`}</p>}
    </section>
  );
}

export default function GcpSharedServiceSections({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const sections = details.sections || [];
  const memory = details.watchPoints?.slice(0, 3) || [];
  return <>
    <section className="gcp-service-hero-card">
      <div><p>VISUAL DEEP DIVE · GOOGLE CLOUD</p><h2>{serviceName}</h2><span><b>Service purpose:</b> {details.summary || `A Google Cloud service for ${serviceName} workloads.`}</span></div>
      <div className="gcp-service-hero-index"><b>01&nbsp; Purpose</b><b>02&nbsp; Architecture</b><b>03&nbsp; Operations</b><b>04&nbsp; Exam fit</b></div>
    </section>
    <nav className="gcp-service-tabs" aria-label={`${serviceName} sections`}>
      {sections.slice(0, 8).map((section, index) => <a href={`#gcp-section-${index + 1}`} key={section.title}>{String(index + 1).padStart(2, "0")} {section.title}</a>)}
    </nav>
    {sections.length > 0 ? <section className="gcp-detail-grid">{sections.map((section, index) => <SectionVisual key={section.title} section={section} serviceName={serviceName} index={index} />)}</section> :
      <section className="gcp-content-grid gcp-shared-foundation"><section className="gcp-content-card"><h3>Core service concepts</h3><ul>{(details.concepts || []).map(item => <li key={item}>{item}</li>)}</ul></section><section className="gcp-content-card"><h3>Application fit</h3><ul>{(details.applicationFit || []).map(item => <li key={item}>{item}</li>)}</ul></section></section>}
    {details.alternatives?.length ? <section className="gcp-content-card" id="choose-right-tool"><h3>Choose the right tool</h3><div className="gcp-alternatives">{details.alternatives.map(item => <article key={item}><strong>{item}</strong><span>Compare workload boundary, operating model, security, networking, and cost.</span></article>)}</div></section> : null}
    {memory.length > 0 && <section className="gcp-memory-hook" id="exam-hook"><p>CERTIFICATION MEMORY HOOK</p><div>{memory.map((item, index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></article>)}</div></section>}
  </>;
}
