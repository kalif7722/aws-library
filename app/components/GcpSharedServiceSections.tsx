import type { ReactNode } from "react";
import { Activity, Cloud, Database, FileText, Globe2, Laptop, Network, Server, Shield, Users } from "lucide-react";
import { ServiceCostBoard } from "./ServiceLearningShowcase";
import "./ServiceLearningShowcase.css";
import "./GcpArchitectureBoard.css";
import type { GcpContent } from "../gcp-data";
import { findGcpArchitectureIcon } from "../../lib/gcp-architecture-icons";
import { architectureStageCopy, architectureStageLabel, isGenericArchitectureItem } from "../../lib/gcp-architecture-stage-copy";
import {architectureNodeDetail} from "../../lib/architecture-node-detail";

type ArchitectureBoard = NonNullable<GcpContent["architectureBoards"]>[number];
type ArchitectureCard = ArchitectureBoard["groups"][number]["cards"][number];

function NumberedPanel({ title, items, icon, id }: { title: string; items: string[]; icon: string; id?: string }) {
  return <section className="service-insight-panel" id={id}>
    <div className="service-panel-title"><span>{icon}</span><h3>{title}</h3></div>
    <div className="service-insight-list">{items.slice(0, 3).map((item, index) => <div key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></div>)}</div>
  </section>;
}

function GenericArchitectureIcon({ label, board = false }: { label: string; board?: boolean }) {
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
  return <div className={`${board ? "gcp-architecture-board-generic" : "gcp-architecture-generic"} tone-${tone}`}><Icon size={board ? 36 : 30} /></div>;
}

const gcpGroupNames=(group:ArchitectureBoard["groups"][number]|undefined)=>group?.cards.slice(0,3).map(card=>card.label).join(" and ")||"the surrounding workload";
function gcpBoardCardDetail(board:ArchitectureBoard,groupIndex:number,card:ArchitectureCard){
  return architectureNodeDetail({label:card.label,sub:card.caption,previous:gcpGroupNames(board.groups[groupIndex-1]),next:gcpGroupNames(board.groups[groupIndex+1]),stage:board.groups[groupIndex]?.title,architecture:board.title,position:groupIndex===0?"first":groupIndex===board.groups.length-1?"last":"middle"});
}
function ArchitectureBoardCard({ card, board, groupIndex }: { card: ArchitectureCard; board: ArchitectureBoard; groupIndex: number }) {
  const iconLabel = card.iconLabel || card.label;
  const icon = findGcpArchitectureIcon(iconLabel);
  const detail=gcpBoardCardDetail(board,groupIndex,card);
  return <div className={`gcp-architecture-board-card ${icon ? "official" : "generic"}`} tabIndex={0} data-architecture-provider="gcp" data-architecture-detail={detail} aria-label={`${card.label}. ${detail}`}>
    {icon ? <div className="gcp-architecture-board-icon"><img src={icon.path} alt={`${card.label} Google Cloud architecture icon`} loading="lazy" /></div> : <GenericArchitectureIcon label={iconLabel} board />}
    <b>{card.label}</b>
    <small>{card.caption}</small>
  </div>;
}

function ArchitectureBoardDiagram({ board, index }: { board: ArchitectureBoard; index: number }) {
  const groups = board.groups.slice(0, 6);
  return <article className="gcp-architecture-board-panel">
    <header className="gcp-architecture-board-head">
      <div><p className="gcp-architecture-board-kicker">ARCHITECTURE {String(index).padStart(2, "0")}</p><h3>{board.title}</h3></div>
      <p className="gcp-architecture-board-note">{board.note}</p>
    </header>
    {board.reference ? <div className="gcp-architecture-board-reference">Reference pattern: {board.reference}</div> : null}
    <div className="gcp-architecture-board-flow" aria-label={`${board.title} architecture flow`}>
      {groups.map((group, groupIndex) => <div className="gcp-architecture-board-group-wrap" key={`${group.title}-${groupIndex}`}>
        <section className="gcp-architecture-board-group">
          <strong>{group.title}</strong>
          <div className="gcp-architecture-board-cards">{group.cards.slice(0, 3).map((card, cardIndex) => <ArchitectureBoardCard card={card} board={board} groupIndex={groupIndex} key={`${card.label}-${cardIndex}`} />)}</div>
        </section>
        {groupIndex < groups.length - 1 ? <div className="gcp-architecture-board-arrow" aria-hidden="true">→</div> : null}
      </div>)}
    </div>
  </article>;
}

function compactCaption(value: string, max = 58) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const shortened = text.slice(0, max - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || text.slice(0, max - 1)}…`;
}

function serviceCaption(summary?: string) {
  const text = (summary || "Managed Google Cloud capability").replace(/^(a|an|the)\s+/i, "");
  return compactCaption(text.split(/\s+/).slice(0, 6).join(" "), 48);
}

function stageCard(serviceName: string, flow: NonNullable<GcpContent["architectureFlows"]>[number], step: NonNullable<GcpContent["architectureFlows"]>[number]["steps"][number]): ArchitectureCard {
  const label = architectureStageLabel(step.title);
  const copy = architectureStageCopy(serviceName, flow.title, step.title, step.items);
  return { label, caption: compactCaption(copy[0] || "Architecture stage"), iconLabel: label };
}

function standardOperateGroup(audit = false): ArchitectureBoard["groups"][number] {
  return { title: "OPERATE & GOVERN", cards: [
    { label: "Cloud Monitoring", caption: "Metrics / alerts", iconLabel: "Cloud Monitoring" },
    { label: audit ? "Cloud Audit Logs" : "Cloud Logging", caption: audit ? "Admin audit" : "Logs / audit", iconLabel: audit ? "Cloud Audit Logs" : "Cloud Logging" },
    { label: "IAM controls", caption: "Least privilege", iconLabel: "IAM" }
  ] };
}

function derivedProductionBoard(serviceName: string, details: GcpContent, flow: NonNullable<GcpContent["architectureFlows"]>[number]): ArchitectureBoard {
  const cards = flow.steps.slice(0, 5).map(step => stageCard(serviceName, flow, step));
  const firstLabel = cards[0]?.label.toLowerCase() || "";
  const secondLabel = cards[1]?.label.toLowerCase() || "";
  const tailLabels = cards.slice(3).map(card => card.label.toLowerCase()).join(" ");
  const firstTitle = /user|client|caller|consumer|application|web|developer|viewer|operator|request/.test(firstLabel) ? "CLIENTS / APPS" : "SOURCES / INPUT";
  const secondTitle = /edge|gateway|auth|route|network|vpc|proxy|ingress|load balancer|policy|scheduler|pub.?sub|eventarc|endpoint/.test(secondLabel) ? "ENTRY / CONTROL" : "PROCESS / CONTROL";
  const tailTitle = /storage|table|dataset|database|bucket|state|result|output|backup|replica|warehouse|checkpoint|model|archive/.test(tailLabels) ? "DATA / RESULT" : /backend|target|destination|service|response|worker|runtime|site/.test(tailLabels) ? "DELIVERY / TARGET" : "RESULT / TARGET";
  const groups: ArchitectureBoard["groups"] = [];
  if (cards[0]) groups.push({ title: firstTitle, cards: [cards[0]] });
  if (cards[1]) groups.push({ title: secondTitle, cards: [cards[1]] });
  const coreCards: ArchitectureCard[] = [{ label: serviceName, caption: serviceCaption(details.summary), iconLabel: serviceName }];
  if (cards[2] && cards[2].label.toLowerCase() !== serviceName.toLowerCase()) coreCards.push(cards[2]);
  groups.push({ title: "SERVICE CAPABILITY", cards: coreCards.slice(0, 2) });
  if (cards.length > 3) groups.push({ title: tailTitle, cards: cards.slice(3, 5) });
  groups.push(standardOperateGroup(false));
  return { title: flow.title, note: flow.note, reference: flow.reference, groups };
}

function derivedGovernanceBoard(serviceName: string, details: GcpContent, flow: NonNullable<GcpContent["architectureFlows"]>[number]): ArchitectureBoard {
  const cards = flow.steps.slice(0, 5).map(step => stageCard(serviceName, flow, step));
  const groups: ArchitectureBoard["groups"] = [];
  if (cards[0]) groups.push({ title: "CONFIGURATION", cards: [cards[0]] });
  if (cards[1] || cards[2]) groups.push({ title: "IDENTITY / BOUNDARY", cards: cards.slice(1, 3) });
  groups.push({ title: "SERVICE CAPABILITY", cards: [{ label: serviceName, caption: serviceCaption(details.summary), iconLabel: serviceName }] });
  if (cards[3] || cards[4]) groups.push({ title: "RELEASE / OPERATIONS", cards: cards.slice(3, 5) });
  groups.push(standardOperateGroup(true));
  return { title: flow.title, note: flow.note, reference: flow.reference, groups };
}

function deriveArchitectureBoards(serviceName: string, details: GcpContent): ArchitectureBoard[] {
  if (!details.architectureFlows?.length) return [];
  return details.architectureFlows.slice(0, 2).map((flow, index) => index === 0 ? derivedProductionBoard(serviceName, details, flow) : derivedGovernanceBoard(serviceName, details, flow));
}

function ArchitectureNode({ label, sub, detail }: { label: string; sub?: string; detail: string }) {
  const icon = findGcpArchitectureIcon(label);
  return <div className={`gcp-architecture-node ${icon ? "official" : "generic"}`} tabIndex={0} data-architecture-provider="gcp" data-architecture-detail={detail} aria-label={`${label}. ${detail}`}>
    {icon ? <div className="gcp-architecture-icon"><img src={icon.path} alt={`${label} Google Cloud architecture icon`} loading="lazy" /></div> : <GenericArchitectureIcon label={label} />}
    <strong>{label}</strong>{sub ? <small>{sub}</small> : null}
  </div>;
}

function ArchitectureDiagram({ serviceName, flow, index }: { serviceName: string; flow: NonNullable<GcpContent["architectureFlows"]>[number]; index: number }) {
  const visibleSteps = flow.steps.slice(0, 6);
  return <article className="gcp-architecture-panel">
    <div className="service-section-cap"><div><p>ARCHITECTURE {String(index).padStart(2, "0")}</p><h3>{flow.title}</h3></div><span>{flow.note}</span></div>
    {flow.reference ? <div className="gcp-architecture-reference">Reference pattern: {flow.reference}</div> : null}
    <div className="gcp-architecture-layers">
      {visibleSteps.map((step, stepIndex) => {
        const stageLabel = architectureStageLabel(step.title);
        const stageCopy = architectureStageCopy(serviceName, flow.title, step.title, step.items);
        const childItems = step.items
          .filter(item => !isGenericArchitectureItem(item) && item.length <= 48 && item.toLowerCase() !== stageLabel.toLowerCase())
          .slice(0, 2);
        return <div className="gcp-architecture-layer-wrap" key={`${step.title}-${stepIndex}`}>
          <div className="gcp-architecture-layer">
            <b>{step.title}</b>
            <div className="gcp-architecture-nodes">
              <ArchitectureNode label={stageLabel} sub={stageCopy.join(" • ")} detail={architectureNodeDetail({label:stageLabel,sub:stageCopy.join("; "),previous:visibleSteps[stepIndex-1]?.title,next:visibleSteps[stepIndex+1]?.title,stage:step.title,architecture:flow.title,position:stepIndex===0?"first":stepIndex===visibleSteps.length-1?"last":"middle"})} />
              {childItems.map((item) => <ArchitectureNode label={item} key={item} detail={`${item} supports ${stageLabel} during the ${step.title.toLowerCase()} stage${stepIndex < visibleSteps.length-1 ? ` before the flow continues to ${visibleSteps[stepIndex+1].title}` : " and contributes to the final architecture outcome"}.`} />)}
            </div>
          </div>
          {stepIndex < visibleSteps.length - 1 ? <div className="gcp-architecture-arrow" aria-hidden="true">→</div> : null}
        </div>;
      })}
    </div>
  </article>;
}

function ArchitectureWalkthroughs({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const boards = details.architectureBoards?.length ? details.architectureBoards : deriveArchitectureBoards(serviceName, details);
  if (boards.length) return <section className="gcp-architecture-board-section" id="architecture">
    {boards.slice(0, 3).map((board, boardIndex) => <ArchitectureBoardDiagram board={board} index={boardIndex + 1} key={board.title} />)}
  </section>;

  const flows = details.architectureFlows || (details.architecture || []).map((note, index) => ({
    title: `${serviceName} architecture ${index + 1}`,
    note,
    reference: "Google Cloud architecture guidance",
    steps: [{ title: serviceName, items: ["Managed service boundary"] }],
  }));
  const hasStructuredArchitecture = Boolean(details.architectureFlows?.length);
  if (details.architectureVersion === 2 || hasStructuredArchitecture) return <section className="gcp-architecture-section" id="architecture">
    {flows.slice(0, 3).map((flow, flowIndex) => <ArchitectureDiagram serviceName={serviceName} flow={flow} index={flowIndex + 1} key={flow.title} />)}
  </section>;
  return <section className="service-walkthrough-section" id="architecture">
    <div className="service-section-cap"><div><p>REAL-WORLD EXAMPLES</p><h3>Architecture walk-throughs</h3></div><span>Read each flow left to right and connect the service to the responsibility it actually owns.</span></div>
    <div className={`service-walk-grid count-${Math.max(1, Math.min(3, flows.length))}`}>
      {flows.slice(0, 3).map((flow, flowIndex) => <article className="service-walk-card" key={flow.title}>
        <div className="service-walk-heading"><b>{flowIndex + 1}</b><div><span>ARCHITECTURE WALK-THROUGH</span><h4>{flow.title}</h4></div></div>
        <p>{flow.note}</p>
        <div className="service-walk-flow" aria-label={`${flow.title} flow`}>
          {flow.steps.slice(0, 6).map((step, stepIndex) => <div className="service-walk-step" key={`${step.title}-${stepIndex}`} tabIndex={0} data-architecture-provider="gcp" data-architecture-detail={`${step.title} ${stepIndex === 0 ? "starts this flow" : `receives input from ${flow.steps[stepIndex-1].title}`}. It handles ${step.items.slice(0,3).join(", ").toLowerCase()}${stepIndex < flow.steps.length-1 ? ` and passes the result to ${flow.steps[stepIndex+1].title}.` : " and produces the final architecture outcome."}`}>
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
