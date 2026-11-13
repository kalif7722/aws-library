import { useMemo, useState, type CSSProperties } from "react";
import type { AzureCourse, AzureCourseScope, AzureCourseService } from "../azure-course-data";
import "./Az104CourseGuide.css";

const R2_BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-certification-walkthroughs";

const filenameAliases: Record<string, string> = {
  "API Management": "api-management",
  "App Service": "app-service",
  "Event Hubs": "event-hubs",
  "Logic Apps": "logic-apps",
  "Service Bus": "service-bus",
  "Microsoft Entra ID (formerly Azure AD)": "microsoft-entra-id",
  "Microsoft Entra External ID": "microsoft-entra-external-id",
  "Azure Database for PostgreSQL": "azure-database-for-postgresql",
  "Azure Database for PostgreSQL Flexible Server": "azure-database-for-postgresql-flexible-server",
  "Azure Virtual Network": "azure-virtual-network",
  "Azure Virtual Desktop": "azure-virtual-desktop",
};

const slug = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const courseFolder = (code: string) => code.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const categoryFolder = (value: string) => slug(value);
const fileSlug = (service: string) => filenameAliases[service] ?? slug(service);

type GenericTask = { service: AzureCourseService; filename: string; steps: string[]; cue: string };

const taskFor = (service: AzureCourseService, category: string): GenericTask => ({
  service,
  filename: fileSlug(service.name),
  steps: [
    `Open the Azure portal and locate ${service.name}.`,
    `Configure the primary ${category.toLowerCase()} setting and review its dependencies.`,
    `Verify the resulting state, access boundary, and operational signal before moving on.`,
  ],
  cue: `${service.name} is the selected service boundary; keep identity, networking, data protection, and monitoring decisions explicit around it.`,
});

function WalkthroughImage({ task, course, category }: { task: GenericTask; course: string; category: string }) {
  const [failed, setFailed] = useState(false);
  const image = `${R2_BASE}/${courseFolder(course)}/${task.filename}.webp`;
  const common = `${R2_BASE}/common/${categoryFolder(category)}/${task.filename}.webp`;
  return failed ? (
    <div className="az104-task-image-fallback">
      <strong>Console walkthrough pending</strong>
      <span>Upload {task.filename}.webp to azure-certification-walkthroughs/{courseFolder(course)}/.</span>
    </div>
  ) : (
    <div className="az104-task-image-walkthrough">
      <p>SCREENSHOT WALKTHROUGH</p>
      <button className="az104-task-image-button" type="button">
        <img src={image} alt={`${task.service.name} Azure portal walkthrough`} onError={(event) => {
          if (event.currentTarget.src === common) setFailed(true);
          else event.currentTarget.src = common;
        }} />
        <span>Open the selected console walkthrough</span>
      </button>
    </div>
  );
}

function DomainTab({ scope, index, selected, onSelect, accent }: { scope: AzureCourseScope; index: number; selected: boolean; onSelect: () => void; accent: string }) {
  return <button className={selected ? "is-selected" : ""} style={{ "--domain-accent": accent } as CSSProperties} onClick={onSelect} type="button">
    <b>{String(index + 1).padStart(2, "0")}</b><span>{scope.title}</span><small>{scope.services.length} mapped services</small>
  </button>;
}

export default function AzureCourseGuide({ course }: { course: AzureCourse }) {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const scope = course.scope[domainIndex] ?? course.scope[0];
  const tasks = useMemo(() => scope?.services.map((service) => taskFor(service, scope.title)) ?? [], [scope]);
  const task = tasks[taskIndex] ?? tasks[0];
  const accent = ["#8b5cf6", "#f59e0b", "#06b6d4", "#10b981", "#ef4444"][domainIndex % 5];

  if (!scope || !task) return null;
  return <section className="az104-guide" aria-label={`${course.code} course guide`}>
    <div className="az104-guide-hero">
      <p className="az104-kicker">{course.code} · CERTIFICATION COURSE</p>
      <h2>Learn each {course.code} scope area in the portal</h2>
      <p>One domain at a time, with a service tab, architecture cue, and course-scoped console walkthrough.</p>
    </div>
    <div className="az104-study-loop" aria-label="Study loop">
      {["Learn the boundary", "Open the EL10 visual", "Trace the architecture", "Follow the walkthrough", "Answer the exam cue"].map((label, index) => <div key={label}><b>{String(index + 1).padStart(2, "0")}</b><span>{label}</span></div>)}
    </div>
    <nav className="az104-domain-roadmap" aria-label={`${course.code} domains`}>
      {course.scope.map((item, index) => <DomainTab key={item.title} scope={item} index={index} selected={index === domainIndex} accent={["#8b5cf6", "#f59e0b", "#06b6d4", "#10b981", "#ef4444"][index % 5]} onSelect={() => { setDomainIndex(index); setTaskIndex(0); }} />)}
    </nav>
    <article className="az104-domain" style={{ "--domain-accent": accent } as CSSProperties}>
      <header className="az104-domain-head"><div className="az104-domain-number">{String(domainIndex + 1).padStart(2, "0")}</div><div><span>COURSE SCOPE · {scope.services.length} SERVICES</span><h3>{scope.title}</h3><p>Connect the mapped services to the portal decision you need to make and verify.</p></div></header>
      <div className="az104-flow">{["Boundary", "Service choice", "Console state", "Exam cue"].map((item, index) => <span key={item}><strong>{item}</strong>{index < 3 && <b>→</b>}</span>)}</div>
      <div className="az104-task-lab">
        <div className="az104-task-lab-head"><div><p>SELECTED DOMAIN · TASK WALKTHROUGHS</p><h4>Only the selected service is shown below</h4></div><span>{tasks.length} services in this scope</span></div>
        <div className="az104-task-tabs-shell">
          <div className="az104-task-tabs" role="tablist">{tasks.map((item, index) => <button key={item.service.name} className={index === taskIndex ? "is-selected" : ""} onClick={() => setTaskIndex(index)} type="button" role="tab" aria-selected={index === taskIndex}><b>{String(index + 1).padStart(2, "0")}</b>{item.service.name}</button>)}</div>
          <div className="az104-task-selected" role="tabpanel">
            <div className="az104-task-selected-head"><div><p>{scope.title.toUpperCase()} · {task.service.classification.toUpperCase()} MAPPING</p><h5>{task.service.name}</h5><span>Course asset: azure-certification-walkthroughs/{courseFolder(course.code)}/{task.filename}.webp</span></div><a href={`/azure-services?service=${encodeURIComponent(task.service.name)}`}>Open EL10 service →</a></div>
            <div className="az104-task-selected-body"><WalkthroughImage task={task} course={course.code} category={scope.title} /><div className="az104-task-selected-instructions"><strong>Console actions</strong><ol>{task.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="az104-task-verify"><b>Exam cue</b>{task.cue}</p></div></div>
          </div>
        </div>
      </div>
    </article>
  </section>;
}
