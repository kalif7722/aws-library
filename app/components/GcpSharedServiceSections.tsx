import type { ReactNode } from "react";
import { Activity, Cloud, Database, FileText, Globe2, Laptop, Network, Server, Shield, Users } from "lucide-react";
import { ServiceCostBoard } from "./ServiceLearningShowcase";
import "./ServiceLearningShowcase.css";
import type { GcpContent } from "../gcp-data";
import { findGcpArchitectureIcon } from "../../lib/gcp-architecture-icons";

function NumberedPanel({ title, items, icon, id }: { title: string; items: string[]; icon: string; id?: string }) {
  return <section className="service-insight-panel" id={id}>
    <div className="service-panel-title"><span>{icon}</span><h3>{title}</h3></div>
    <div className="service-insight-list">{items.slice(0, 3).map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></div>)}</div>
  </section>;
}

function GenericArchitectureIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const [Icon, tone] = /user|customer|buyer|approver|operator|personnel|developer|designer|owner|team|consumer/.test(key) ? [Users, "user"]
    : /database|data|warehouse|record|dataset|table/.test(key) ? [Database, "data"]
    : /security|identity|iam|approval|policy|auth|token|mfa|governance|permission/.test(key) ? [Shield, "security"]
    : /network|edge|route|traffic|endpoint|connection/.test(key) ? [Network, "network"]
    : /file|manifest|yaml|repository|configuration|output|evidence|log|report|artifact/.test(key) ? [FileText, "file"]
    : /monitor|health|incident|telemetry|alert|status|review|metric|audit/.test(key) ? [Activity, "monitor"]
    : /compute|runtime|cluster|kubernetes|pipeline|automation|deployment|worker|instance/.test(key) ? [Server, "compute"]
    : /web|mobile|application|client|saas|portal|console/.test(key) ? [Laptop, "app"]
    : /internet|provider|vendor|external|partner/.test(key) ? [Globe2, "internet"] : [Cloud, "cloud"];
  return <div className={`gcp-architecture-generic tone-${tone}`}><Icon size={30} /></div>;
}

function ArchitectureNode({ label, sub }: { label: string; sub?: string }) {
  const icon = findGcpArchitectureIcon(label);
  return <div className={`gcp-architecture-node ${icon ? "official" : "generic"}`}>
    {icon ? <div className="gcp-architecture-icon"><img src={icon.path} alt={`${label} Google Cloud architecture icon`} loading="lazy" /></div> : <GenericArchitectureIcon label={label} />}
    <strong>{label}</strong>{sub ? <small>{sub}</small> : null}
  </div>;
}

function ArchitectureDiagram({ flow, index }: { flow: NonNullable<GcpContent["architectureFlows"]>[number]; index: number }) {
  return <article className="gcp-architecture-panel">
    <div className="service-section-cap"><div><p>ARCHITECTURE {String(index).padStart(2, "0")}</p><h3>{flow.title}</h3></div><span>{flow.note}</span></div>
    {flow.reference ? <div className="gcp-architecture-reference">Reference pattern: {flow.reference}</div> : null}
    <div className="gcp-architecture-layers">
      {flow.steps.slice(0, 6).map((step, stepIndex) => {
        const stepIcon = findGcpArchitectureIcon(step.title);
        return <div className="gcp-architecture-layer-wrap" key={`${step.title}-${stepIndex}`}>
          <div className="gcp-architecture-layer">
            <b>{step.title}</b>
            <div className="gcp-architecture-nodes">
              {stepIcon ? <ArchitectureNode label={step.title} sub={step.items.slice(0, 3).join(" • ")} /> : step.items.slice(0, 3).map((item) => <ArchitectureNode label={item} key={item} />)}
            </div>
          </div>
          {stepIndex < flow.steps.length - 1 ? <div className="gcp-architecture-arrow" aria-hidden="true">→</div> : null}
        </div>;
      })}
    </div>
  </article>;
}

function ArchitectureWalkthroughs({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const flows = details.architectureFlows || (details.architecture || []).map((note, index) => ({
    title: `${serviceName} architecture ${index + 1}`,
    note,
    reference: "Google Cloud architecture guidance",
    steps: [{ title: serviceName, items: ["Managed service boundary"] }],
  }));
  const hasStructuredArchitecture = Boolean(details.architectureFlows?.length);
  if (details.architectureVersion === 2 || hasStructuredArchitecture) return <section className="gcp-architecture-section" id="architecture">
    {flows.slice(0, 3).map((flow, flowIndex) => <ArchitectureDiagram flow={flow} index={flowIndex + 1} key={flow.title} />)}
  </section>;
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
