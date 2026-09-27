import type { ReactNode } from "react";
import { ServiceCostBoard } from "./ServiceLearningShowcase";
import "./ServiceLearningShowcase.css";
import type { GcpContent } from "../gcp-data";

function NumberedPanel({ title, items, icon, id }: { title: string; items: string[]; icon: string; id?: string }) {
  return <section className="service-insight-panel" id={id}>
    <div className="service-panel-title"><span>{icon}</span><h3>{title}</h3></div>
    <div className="service-insight-list">{items.slice(0, 3).map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></div>)}</div>
  </section>;
}

function ArchitectureWalkthroughs({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const flows = details.architectureFlows || (details.architecture || []).map((note, index) => ({
    title: `${serviceName} architecture ${index + 1}`,
    note,
    reference: "Google Cloud architecture guidance",
    steps: [{ title: serviceName, items: ["Managed service boundary"] }],
  }));
  return <section className="service-walkthrough-section" id="architecture">
    <div className="service-section-cap"><div><p>REAL-WORLD EXAMPLES</p><h3>Architecture walk-throughs</h3></div><span>Read each flow left to right and connect the service to the responsibility it actually owns.</span></div>
    <div className={`service-walk-grid count-${Math.max(1, Math.min(3, flows.length))}`}>
      {flows.slice(0, 3).map((flow, flowIndex) => <article className="service-walk-card" key={flow.title}>
        <div className="service-walk-heading"><b>{flowIndex + 1}</b><div><span>ARCHITECTURE WALK-THROUGH</span><h4>{flow.title}</h4></div></div>
        <p>{flow.note}</p>
        <div className="service-walk-flow" aria-label={`${flow.title} flow`}>
          {flow.steps.slice(0, 6).map((step, stepIndex) => <div className="service-walk-step" key={`${step.title}-${stepIndex}`}>
            <strong>{step.title}</strong><small>{step.items.slice(0, 3).join(" • ")}</small>{stepIndex < flow.steps.length - 1 && <i aria-hidden="true">→</i>}
          </div>)}
        </div>
        {flow.reference && <div className="service-walk-reference">Reference pattern: {flow.reference}</div>}
      </article>)}
    </div>
  </section>;
}

function ConsoleWalkthrough({ serviceName, details, visual }: { serviceName: string; details: GcpContent; visual?: ReactNode }) {
  if (!details.consoleSteps?.length && !visual) return null;
  return <section className="service-walkthrough-section" id="console-walkthrough">
    <div className="service-section-cap"><div><p>GOOGLE CLOUD CONSOLE</p><h3>Console walk-through</h3></div><span>Follow the service-specific control path; verify identity, scope and outcome at every step.</span></div>
    {details.consoleSteps?.length ? <div className="service-console-steps" aria-label={`${serviceName} console walk-through steps`}>
      {details.consoleSteps.slice(0, 6).map((step, index) => <article key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><div><h4>{step.title}</h4><p>{step.detail}</p></div></article>)}
    </div> : null}
    {visual}
  </section>;
}

export default function GcpSharedServiceSections({ serviceName, details, consoleWalkthrough }: { serviceName: string; details: GcpContent; consoleWalkthrough?: ReactNode }) {
  const tabs = [["concepts", "Concepts"], ["architecture", "Architecture"], ["console-walkthrough", "Console"], ["security", "Security"], ["cost-models", "Cost"], ["exam-hook", "Exam hook"]] as const;
  const comparisons = details.comparisons || (details.alternatives || []).slice(0, 3).map((item, index) => ({ name: item.split(" — ")[0] || item, fit: item.split(" — ")[1] || (index === 0 ? "Best fit for this service boundary." : "Use when the workload boundary differs.") }));
  const memory = details.memoryHooks || details.watchPoints?.slice(0, 3) || [];
  return <>
    <section className="gcp-service-hero-card"><div><p>VISUAL DEEP DIVE · GOOGLE CLOUD</p><h2>{serviceName}</h2><span><b>What it is:</b> {details.summary || `A Google Cloud service for ${serviceName} workloads.`}</span></div><div className="gcp-service-hero-index"><b>01&nbsp; Purpose</b><b>02&nbsp; Architecture</b><b>03&nbsp; Operations</b><b>04&nbsp; Exam fit</b></div></section>
    <nav className="gcp-service-tabs" aria-label={`${serviceName} sections`}>{tabs.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>

    <section className="service-insight-grid gcp-shared-foundation" id="concepts">
      <NumberedPanel title="Core service concepts" icon="◆" items={details.concepts || []} />
      <NumberedPanel title="Application fit" icon="◆" items={details.applicationFit || []} />
    </section>

    <ArchitectureWalkthroughs serviceName={serviceName} details={details} />

    <ConsoleWalkthrough serviceName={serviceName} details={details} visual={consoleWalkthrough} />

    <div className="service-insight-grid">
      <NumberedPanel title="Security & governance" icon="◆" items={details.security || []} id="security" />
      <NumberedPanel title="Design & optimization" icon="◇" items={details.operations || []} />
      <NumberedPanel title="Service-specific watch points" icon="!" items={details.watchPoints || []} />
    </div>

    <ServiceCostBoard cost={details.cost || []} />

    <section className="gcp-content-card" id="choose-right-tool"><p className="course-kicker">CHOOSE THE RIGHT TOOL</p><h3>Service comparison</h3><div className="gcp-alternatives">{comparisons.map((item, index) => <article key={item.name}><strong>{item.name}{index === 0 ? " · BEST FIT HERE" : ""}</strong><span>{item.fit}</span></article>)}</div></section>

    {memory.length > 0 && <section className="gcp-memory-hook" id="exam-hook"><p>CERTIFICATION MEMORY HOOK</p><div>{memory.slice(0, 3).map((item, index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></article>)}</div></section>}
  </>;
}
