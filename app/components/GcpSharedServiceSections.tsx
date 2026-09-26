import ServiceLearningShowcase from "./ServiceLearningShowcase";
import type { GcpContent } from "../gcp-data";

export default function GcpSharedServiceSections({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const architecture = (details.architecture || []).map((item, index) => ({
    title: `${serviceName} pattern ${index + 1}`,
    note: item,
    reference: "Google Cloud architecture guidance",
    layers: [{ title: "Workload", nodes: [{ label: item, sub: "service boundary" }] }],
  }));
  const tabs = [["concepts", "Concepts"], ["use-cases", "Use cases"], ["security", "Security"], ["cost-models", "Cost"], ["exam-hook", "Exam hook"]] as const;
  const memory = details.watchPoints?.slice(0, 3) || [];
  return <>
    <section className="gcp-service-hero-card"><div><p>VISUAL DEEP DIVE · GOOGLE CLOUD</p><h2>{serviceName}</h2><span><b>What it is:</b> {details.summary || `A Google Cloud service for ${serviceName} workloads.`}</span></div><div className="gcp-service-hero-index"><b>01&nbsp; Purpose</b><b>02&nbsp; Architecture</b><b>03&nbsp; Operations</b><b>04&nbsp; Exam fit</b></div></section>
    <nav className="gcp-service-tabs" aria-label={`${serviceName} sections`}>{tabs.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
    <section className="gcp-content-grid gcp-shared-foundation">
      {[["Core service concepts", details.concepts, "concepts"], ["Application fit", details.applicationFit, "use-cases"]].map(([title, items, id]) => <section className="gcp-content-card" id={id as string} key={title as string}><h3>{title as string}</h3><ul>{(items as string[] || []).map((item, index) => <li key={index}>{item}</li>)}</ul></section>)}
    </section>
    <ServiceLearningShowcase serviceName={serviceName} architectures={architecture} security={details.security || []} optimization={details.operations || []} cost={details.cost || []} watchPoints={details.watchPoints || []} />
    <section className="gcp-content-card" id="choose-right-tool"><h3>Choose the right tool</h3><div className="gcp-alternatives">{(details.alternatives || []).map((item, index) => <article key={index}><strong>{item}</strong><span>{index === 0 ? "Best fit when this service boundary is the requirement." : "Consider when the workload boundary differs."}</span></article>)}</div></section>
    {memory.length > 0 && <section className="gcp-memory-hook" id="exam-hook"><p>CERTIFICATION MEMORY HOOK</p><div>{memory.map((item, index) => <article key={index}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></article>)}</div></section>}
  </>;
}
