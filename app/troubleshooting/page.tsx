"use client";

import { useEffect, useMemo, useState } from "react";
import "./troubleshooting.css";
import EvidencePanel from "./EvidencePanel";

type Step = { title: string; why: string; evidence: string; action: string; };
type Scenario = {
  id: string; category: string; title: string; subtitle: string; severity: string;
  providers: string[]; symptoms: string[]; architecture: string[]; rootCause: string;
  prevention: string; services: { name: string; href: string }[]; steps: Step[];
};

const scenarios: Scenario[] = [
  {
    id: "private-connectivity", category: "Networking & connectivity",
    title: "Private application cannot reach its database",
    subtitle: "A release has just gone live. Health checks pass, but checkout requests intermittently time out.",
    severity: "High impact", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["Connection timeout", "Application targets appear healthy", "Only private database calls fail"],
    architecture: ["Client", "Load balancer", "Application subnet", "Network policy + routes", "Private database"],
    rootCause: "The diagnostic evidence points to a missing or overly restrictive network rule on the application-to-database path. Confirm the actual source, destination, port, effective route, and return path before changing anything.",
    prevention: "Add a tested connectivity check to release validation, document the approved source-to-database path, and alert on connection failures.",
    services: [
      { name: "Amazon VPC", href: "/services?service=Amazon%20VPC" },
      { name: "AWS Network Firewall", href: "/services?service=AWS%20Network%20Firewall" },
      { name: "Azure Network Watcher", href: "/azure-services?service=azure-network-watcher" },
      { name: "Google Cloud Network Intelligence Center", href: "/gcp-services?service=network-intelligence-center" },
    ],
    steps: [
      { title: "Define the failed path", why: "Separate DNS, TCP reachability, TLS, and database authentication. A timeout alone does not prove a firewall problem.", evidence: "Application logs show connect timeout to the private database endpoint. DNS resolves to the expected private address.", action: "Record the application source subnet/security identity, database address, protocol, port, timestamp, and whether the failure affects all instances." },
      { title: "Inspect routes and network policy", why: "Verify both directions and the effective rules at every enforcement point. A correct outbound rule cannot compensate for a missing return path.", evidence: "The database listener is healthy. Route inspection shows the expected private route, but the database-side allow rule does not include the current application security identity.", action: "Validate the intended application identity and database port with the service owner. Review security group/NSG/firewall rules and any network appliance policy." },
      { title: "Apply the smallest approved fix", why: "Avoid broad CIDR ranges or opening database ports to the internet. Scope the rule to the required workload and port.", evidence: "The proposed change allows only the application workload identity or approved subnet to reach the database listener.", action: "Use the normal change process to correct the narrow rule. Capture the previous configuration and rollback steps." },
      { title: "Prove recovery", why: "A configuration change is not proof that the application path works end-to-end.", evidence: "Connection tests succeed from the application workload; application errors fall back to baseline; database and load-balancer health remain normal.", action: "Run a real application request, inspect logs and metrics, verify no unrelated access was opened, and record the root cause." },
    ],
  },
  {
    id: "access-denied", category: "Identity & security",
    title: "A deployment pipeline suddenly gets AccessDenied",
    subtitle: "The build is green until a deployment step attempts to read an artifact or update a cloud resource.",
    severity: "Release blocked", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["AccessDenied / 403", "Only one pipeline stage fails", "A role, policy, or resource was recently changed"],
    architecture: ["CI/CD runner", "Federated identity", "Assumed role / service principal", "Identity + resource policy", "Target resource"],
    rootCause: "The pipeline's effective identity or one of its required permissions changed. Diagnose the principal and exact denied action first; do not respond by granting broad administrator access.",
    prevention: "Use short-lived workload identity, least-privilege policies, policy change review, and a post-change deployment smoke test.",
    services: [
      { name: "AWS IAM", href: "/services?service=AWS%20IAM" },
      { name: "AWS CloudTrail", href: "/services?service=AWS%20CloudTrail" },
      { name: "Microsoft Entra ID", href: "/azure-services?service=microsoft-entra-id" },
      { name: "Cloud IAM", href: "/gcp-services?service=identity-and-access-management" },
    ],
    steps: [
      { title: "Identify the caller", why: "The name configured in a pipeline is not necessarily the principal used at runtime.", evidence: "The failing request identifies a federated or assumed workload identity different from the expected deployment role.", action: "Inspect the runtime caller identity, token/role audience, trust relationship, subscription/project/account, and target environment." },
      { title: "Read the exact denial", why: "Authorization can fail at identity policy, resource policy, organization policy, conditions, role assignment, or an explicit deny.", evidence: "The audit event identifies the denied operation and resource. A recent policy edit removed a required narrow permission.", action: "Correlate the audit event with policy changes. Check scope, conditions, explicit denies, permission boundaries, and resource-level controls." },
      { title: "Restore least privilege", why: "Wildcard administrator access hides the actual gap and creates unnecessary blast radius.", evidence: "The required action and resource scope are now explicit, with no unrelated permissions added.", action: "Request the minimum reviewed permission or restore the intended role assignment. Keep trust policy and resource policy constraints intact." },
      { title: "Verify and monitor", why: "A successful retry should not conceal a broken identity boundary or an overly permissive fix.", evidence: "The pipeline completes, the audit log shows the expected principal and action, and a negative test still denies an unrelated action.", action: "Re-run the failed stage, validate a prohibited action remains blocked, and document the policy change." },
    ],
  },
  {
    id: "rag-stale-answers", category: "AI & applications",
    title: "An enterprise RAG assistant gives outdated answers",
    subtitle: "Documents were updated, but the assistant continues to cite old policies or returns answers with weak evidence.",
    severity: "Trust at risk", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["Stale or irrelevant citations", "Missing source passages", "Answers vary after a content update"],
    architecture: ["Source documents", "Ingestion + chunking", "Embeddings + index", "Retriever / reranker", "Model + grounded response"],
    rootCause: "The source-to-index pipeline or retrieval path is stale or incomplete. First prove whether the updated document was ingested, indexed, retrieved, and passed to the model before tuning the prompt.",
    prevention: "Track document freshness and ingestion failures, version chunking/embedding settings, test retrieval against a golden set, and require citations for knowledge-sensitive answers.",
    services: [
      { name: "Amazon Bedrock Knowledge Bases", href: "/services?service=Amazon%20Bedrock%20Knowledge%20Bases" },
      { name: "Amazon OpenSearch Service", href: "/services?service=Amazon%20OpenSearch%20Service" },
      { name: "Azure AI Foundry", href: "/azure-services?service=microsoft-foundry" },
      { name: "Vertex AI / Gemini Enterprise Agent Platform", href: "/gcp-services?service=gemini-enterprise-agent-platform" },
    ],
    steps: [
      { title: "Reproduce with a known document", why: "Use a specific updated policy and a question whose expected answer is unambiguous.", evidence: "The assistant returns a citation to an older policy version for a question about the newly published rule.", action: "Record the question, expected source/version, returned citations, model configuration, and request trace." },
      { title: "Trace ingestion and indexing", why: "Prompt changes cannot repair a document that never reached the index.", evidence: "The source object is current, but the ingestion job did not complete successfully after the document update.", action: "Inspect ingestion status, parser/chunking errors, embedding failures, index timestamps, and document-level access filters." },
      { title: "Inspect retrieval before generation", why: "Separate retrieval quality from the model's interpretation of retrieved context.", evidence: "A direct retrieval test does not return the updated passage in the top results.", action: "Validate metadata filters, chunk boundaries, embeddings, query formulation, ranking, and index freshness; then re-run retrieval against a small golden set." },
      { title: "Verify grounded answers", why: "An answer sounding confident is not evidence that it is correct.", evidence: "The updated passage appears in retrieved context and the assistant cites the current source. Unsupported questions are handled according to the fallback policy.", action: "Run regression questions, inspect traces and citations, measure retrieval hit rate and freshness, and monitor for stale-answer recurrence." },
    ],
  },
  {
    id: "cloud-cost-spike", category: "Cost & governance",
    title: "Cloud spend doubles without an obvious traffic increase",
    subtitle: "The monthly cost trend changes sharply, but business usage appears stable.",
    severity: "Budget risk", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["Unexpected daily spend", "No matching traffic growth", "Cost increase concentrated in a service or region"],
    architecture: ["Billing export", "Account / subscription / project", "Service + region", "Usage and rate drivers", "Owner + remediation"],
    rootCause: "A spend spike can come from increased usage, a pricing/commitment change, data transfer, logging, idle resources, or an unexpected region. Establish the dominant cost driver before deleting resources or changing production capacity.",
    prevention: "Set anomaly alerts, enforce ownership tags/labels, review data-transfer and log-retention costs, and regularly detect idle or orphaned resources.",
    services: [
      { name: "AWS Cost Explorer", href: "/services?service=AWS%20Cost%20Explorer" },
      { name: "AWS CloudWatch", href: "/services?service=Amazon%20CloudWatch" },
      { name: "Azure Cost Management", href: "/azure-services?service=microsoft-cost-management" },
      { name: "Google Cloud Billing", href: "/gcp-services?service=cloud-billing" },
    ],
    steps: [
      { title: "Locate the cost delta", why: "A total bill hides the account, service, region, and usage type responsible for the change.", evidence: "The increase is concentrated in one service and region rather than distributed across the workload.", action: "Compare equivalent time windows; group by account/project, service, region, usage type, and owner." },
      { title: "Separate usage from rate", why: "A price or commitment change requires a different response from an accidental workload increase.", evidence: "Usage units increased despite stable customer traffic, and a new resource group appears in the same time window.", action: "Correlate billing with deployment history, autoscaling, data transfer, logs, snapshots, and resource inventory." },
      { title: "Choose a safe correction", why: "Deleting an apparently idle resource can cause an outage or remove required recovery data.", evidence: "The owner confirms a non-production resource and its dependencies; retention and recovery requirements are checked.", action: "Right-size, schedule, expire, or remove only confirmed unnecessary usage through an approved change." },
      { title: "Confirm savings persist", why: "A one-day reduction may be noise and not a durable fix.", evidence: "Daily usage returns toward baseline, alerts remain active, and no availability or retention control regresses.", action: "Compare post-change usage and cost, document ownership, and add a guardrail for recurrence." },
    ],
  },
  {
    id: "database-slowdown", category: "Performance & reliability",
    title: "Checkout latency rises during a promotion",
    subtitle: "Requests still succeed, but p95 latency and abandoned checkouts increase as traffic grows.",
    severity: "Customer impact", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["p95/p99 latency spike", "Database connections or queue depth rise", "CPU alone does not explain the slowdown"],
    architecture: ["Edge / load balancer", "Application tier", "Queue / cache", "Database", "Metrics + traces"],
    rootCause: "The bottleneck must be established from correlated telemetry. Common candidates include connection-pool exhaustion, slow queries, downstream throttling, queue saturation, or insufficient scaling.",
    prevention: "Load-test realistic traffic, alert on saturation and tail latency, trace downstream dependencies, and define tested scaling and back-pressure behavior.",
    services: [
      { name: "Amazon CloudWatch", href: "/services?service=Amazon%20CloudWatch" },
      { name: "Amazon RDS", href: "/services?service=Amazon%20RDS" },
      { name: "Azure Monitor", href: "/azure-services?service=azure-monitor" },
      { name: "Cloud Logging and Monitoring", href: "/gcp-services?service=logging" },
    ],
    steps: [
      { title: "Measure the user-visible symptom", why: "Average latency can hide a severe p95/p99 regression.", evidence: "Tail latency and checkout abandonment rise at the same time as request volume.", action: "Compare baseline and incident windows, split by endpoint and region, and inspect error rate and saturation." },
      { title: "Follow traces downstream", why: "The slowest dependency is often more informative than the busiest component.", evidence: "Distributed traces show most request time is spent waiting for database connections and query completion.", action: "Inspect connection-pool metrics, query latency, lock waits, queue depth, throttling and dependency health." },
      { title: "Relieve the measured bottleneck", why: "Adding application instances can worsen a saturated database by increasing concurrent connections.", evidence: "The proposed action addresses the observed bottleneck and has a rollback path.", action: "Apply a tested change such as query/index tuning, pool correction, controlled scaling, caching, or back-pressure based on evidence." },
      { title: "Validate under representative load", why: "A short improvement may hide a capacity cliff or move the bottleneck elsewhere.", evidence: "Tail latency, errors, queue depth and database health recover under a comparable load profile.", action: "Re-run the load test, inspect downstream saturation, and add an alert for the metric that exposed the incident." },
    ],
  },
  {
    id: "stale-data", category: "Data & databases",
    title: "The revenue dashboard is missing the latest data",
    subtitle: "The dashboard loads successfully, but its totals lag behind the source system.",
    severity: "Reporting risk", providers: ["AWS", "Azure", "Google Cloud"],
    symptoms: ["Dashboard is stale", "Pipeline shows partial success", "Only some partitions or records are missing"],
    architecture: ["Source system", "Ingestion", "Transform + schema", "Warehouse / lake", "Dashboard cache"],
    rootCause: "The gap can occur at ingestion, transformation, permissions, partition discovery, replication, or dashboard caching. Compare source and destination checkpoints before re-running an entire pipeline.",
    prevention: "Track freshness SLAs, failed-record counts, schema drift, partition completeness, and source-to-dashboard reconciliation.",
    services: [
      { name: "Amazon S3", href: "/services?service=Amazon%20S3" },
      { name: "Amazon Athena", href: "/services?service=Amazon%20Athena" },
      { name: "BigQuery", href: "/gcp-services?service=bigquery" },
      { name: "Azure Monitor", href: "/azure-services?service=azure-monitor" },
    ],
    steps: [
      { title: "Find the last good checkpoint", why: "Determine whether the gap begins at the source, ingestion, transform, warehouse, or presentation layer.", evidence: "Source records exist, but the latest partition is absent from the warehouse table.", action: "Compare source timestamps, ingestion offsets, job runs, record counts, partition metadata, and dashboard refresh time." },
      { title: "Inspect pipeline failures", why: "Partial success can silently drop records because of schema changes, permissions, or rejected rows.", evidence: "The transform logs show records rejected after a schema change; earlier partitions are intact.", action: "Review rejected-record output, schema compatibility, identity permissions, retry behavior, and partition registration." },
      { title: "Repair only the affected range", why: "Blind full reloads can duplicate records or create avoidable cost.", evidence: "The missing partition and replay boundary are known; the operation is idempotent or deduplication is defined.", action: "Correct the schema/metadata issue and replay the affected window using the documented recovery procedure." },
      { title: "Reconcile end to end", why: "A green pipeline status does not prove the dashboard reflects correct business totals.", evidence: "Source and destination counts/totals reconcile for the repaired window and the dashboard freshness timestamp advances.", action: "Validate counts and business aggregates, refresh the presentation layer, and alert on freshness SLA breaches." },
    ],
  },
];

const categories = [
  { name: "All incidents", icon: "✦", color: "violet" },
  { name: "Networking & connectivity", icon: "⌁", color: "blue" },
  { name: "Identity & security", icon: "⬡", color: "orange" },
  { name: "Performance & reliability", icon: "↗", color: "green" },
  { name: "Data & databases", icon: "▤", color: "cyan" },
  { name: "AI & applications", icon: "✳", color: "purple" },
  { name: "Cost & governance", icon: "◈", color: "amber" },
];

type GuidedCheckpoint = { label: string; stage: number };
const guidedCheckpoints: Record<string, GuidedCheckpoint[]> = {
  "private-connectivity": [{ label: "The application starts", stage: 0 }, { label: "The database name resolves", stage: 1 }, { label: "The database port connects", stage: 2 }],
  "access-denied": [{ label: "The pipeline starts", stage: 0 }, { label: "The caller identity is known", stage: 1 }, { label: "The target resource is reachable", stage: 2 }],
  "database-slowdown": [{ label: "Requests reach the application", stage: 0 }, { label: "The request reaches the database", stage: 1 }, { label: "The database is healthy", stage: 2 }],
  "stale-data": [{ label: "The source data is current", stage: 0 }, { label: "Ingestion completed", stage: 1 }, { label: "Warehouse data is current", stage: 2 }],
  "rag-stale-answers": [{ label: "The source document is updated", stage: 0 }, { label: "Ingestion completed", stage: 1 }, { label: "Retrieval returns current text", stage: 2 }],
  "cloud-cost-spike": [{ label: "Traffic is roughly normal", stage: 0 }, { label: "No major deployment changed", stage: 1 }, { label: "The expensive service is identified", stage: 2 }],
};

function GuidedTroubleshooting({ scenario, provider }: { scenario: Scenario; provider: string }) {
  const [checkpoint, setCheckpoint] = useState<number | null>(null);
  const [stage, setStage] = useState(0);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [complete, setComplete] = useState(false);
  const checkpoints = guidedCheckpoints[scenario.id] ?? [];
  const current = scenario.steps[Math.min(stage, scenario.steps.length - 1)];
  const advance = () => {
    setFailed(false);
    setExpanded(false);
    if (stage >= scenario.steps.length - 1) setComplete(true);
    else setStage((value) => Math.min(value + 1, scenario.steps.length - 1));
  };

  return <section className="trouble-guided-console" aria-label="Guided troubleshooting flow">
    <header className="trouble-guided-header">
      <div><span className="trouble-guided-kicker">Dynamic guided flow</span><strong>{complete ? "Recovery verification" : "Start from the last confirmed checkpoint"}</strong></div>
      <span className="trouble-guided-count">{complete ? scenario.steps.length : Math.min(stage + 1, scenario.steps.length)} / {scenario.steps.length}</span>
    </header>
    <div className="trouble-guided-progress"><span style={{ width: complete ? "100%" : `${((stage + 1) / scenario.steps.length) * 100}%` }} /></div>
    <div className="trouble-guided-body">
      {checkpoint === null && !complete ? <>
        <h4>What is working right now?</h4>
        <p className="trouble-guided-muted">Choose the latest checkpoint you have actually confirmed. Earlier checks are skipped.</p>
        <div className="trouble-guided-options">{checkpoints.map((item, index) => <button key={item.label} className="trouble-guided-option" onClick={() => { setCheckpoint(index); setStage(item.stage); }}><span>{["✓", "⌁", "↗"][index]}</span>{item.label}</button>)}</div>
      </> : <>
        <div className="trouble-guided-flow-caption"><span>LIVE ARCHITECTURE PATH</span><span>{failed ? "Attention needed" : complete ? "Path reviewed" : "Glowing node = current check"}</span></div>
        <div className="trouble-guided-flow">{scenario.architecture.map((node, index) => <div className="trouble-guided-hop" key={node}>
          <div className={`trouble-guided-node ${index < stage ? "done" : index === Math.min(stage, scenario.architecture.length - 1) && !complete ? "current" : ""}`}><span>{index < stage ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{node}</strong></div>
          {index < scenario.architecture.length - 1 && <span className={`trouble-guided-arrow ${index < stage ? "passed" : ""}`}>➜</span>}
        </div>)}</div>
        {complete ? <div className="trouble-guided-resolution"><strong>✓ Diagnostic path completed</strong><p>{scenario.rootCause}</p><strong>Verify and prevent recurrence</strong><p>{scenario.prevention}</p><p>Confirm the original symptom is gone and monitor the relevant health signal. This is a simulation; no cloud resources were changed.</p></div> : <div className="trouble-guided-check">
          <span className="trouble-guided-kicker">{failed ? "FAILURE PATH · INVESTIGATE BEFORE CHANGING" : `NEXT CHECK · STEP ${stage + 1}`}</span>
          <h4>{current.title}</h4>
          <p>{current.why}</p>
          <EvidencePanel scenarioId={scenario.id} stepIndex={Math.min(stage, scenario.steps.length - 1)} provider={provider} />
          {failed && <div className="trouble-guided-evidence"><strong>Evidence to inspect</strong><p>{current.evidence}</p><strong>Recommended safe action</strong><p>{current.action}</p>{expanded && <div className="trouble-guided-deeper"><strong>If it still fails</strong><p>Compare the expected and observed values at this boundary, check the adjacent upstream and downstream layer, and change one variable at a time. Preserve the current configuration and use the normal approval and rollback process before any production change.</p></div>}</div>}
          <div className="trouble-guided-actions">
            <button className="trouble-guided-pass" onClick={advance}>{failed ? "Retest passes — continue" : stage === scenario.steps.length - 1 ? "✓ Check passes — verify recovery" : "✓ This works — continue"}</button>
            {!failed ? <button className="trouble-guided-fail" onClick={() => { setFailed(true); setExpanded(false); }}>✕ This fails</button> : <button className="trouble-guided-fail" onClick={() => setExpanded((value) => !value)}>{expanded ? "Hide deeper checks" : "Still failing — show deeper checks"}</button>}
          </div>
        </div>}
        <button className="trouble-guided-reset" onClick={() => { setCheckpoint(null); setStage(0); setFailed(false); setExpanded(false); setComplete(false); }}>↺ Start this incident again</button>
      </>}
    </div>
  </section>;
}

export default function TroubleshootingPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All incidents");
  const [provider, setProvider] = useState("All clouds");
  const [mode, setMode] = useState<"Learn" | "Guided" | "Challenge">("Guided");
  const [activeId, setActiveId] = useState("private-connectivity");
  const [revealed, setRevealed] = useState(0);
  const [showRootCause, setShowRootCause] = useState(false);
  const filtered = useMemo(() => scenarios.filter((s) => {
    const matchesCategory = category === "All incidents" || s.category === category;
    const matchesProvider = provider === "All clouds" || s.providers.includes(provider);
    const haystack = [s.title, s.subtitle, s.category, ...s.symptoms, ...s.services.map((x) => x.name)].join(" ").toLowerCase();
    return matchesCategory && matchesProvider && haystack.includes(query.toLowerCase().trim());
  }), [query, category, provider]);
  const active = filtered.find((s) => s.id === activeId) ?? filtered[0];
  useEffect(() => { if (filtered.length > 0 && !filtered.some((s) => s.id === activeId)) { setActiveId(filtered[0].id); setRevealed(0); setShowRootCause(false); } }, [filtered, activeId]);
  const selectScenario = (id: string) => { setActiveId(id); setRevealed(0); setShowRootCause(false); };
  return <main className="troubleshooting-shell">
    <nav className="trouble-nav"><a className="trouble-brand" href="/">Visual Cloud Learning</a><div><a href="/services">Services</a><a href="/cloud-comparison">Cloud comparison</a><a className="trouble-nav-active" href="/troubleshooting">Troubleshooting</a></div></nav>
    <section className="trouble-hero">
      <div className="trouble-hero-copy"><p className="trouble-eyebrow">AWS · AZURE · GOOGLE CLOUD</p><h1>Learn to diagnose.<br /><span>Not just memorize.</span></h1><p>Realistic cloud incidents, evidence-led diagnostic paths, safe remediation, and cross-cloud service mapping—all in one hands-on learning workspace.</p>
        <div className="trouble-hero-actions"><a href="#incident-workspace" className="trouble-primary-cta">Start investigating <span>↘</span></a><a href="/troubleshooting/labs/vm-unreachable" className="trouble-secondary-cta">Try interactive VM lab ↗</a><a href="/troubleshooting/labs/private-connectivity" className="trouble-secondary-cta">Try private database lab ↗</a><a href="#incident-catalog" className="trouble-secondary-cta">Browse incident library</a></div>
      </div>
      <div className="trouble-hero-visual" aria-label="Illustrative incident flow">
        <div className="signal-orbit orbit-one"></div><div className="signal-orbit orbit-two"></div>
        <div className="signal-node signal-source"><span>01</span><strong>Symptom</strong><small>What changed?</small></div>
        <div className="signal-node signal-evidence"><span>02</span><strong>Evidence</strong><small>What do we know?</small></div>
        <div className="signal-node signal-root"><span>03</span><strong>Root cause</strong><small>Prove the hypothesis</small></div>
        <div className="signal-node signal-recover"><span>04</span><strong>Recovery</strong><small>Verify the fix</small></div>
        <div className="signal-center"><span>INCIDENT</span><strong>→</strong><small>Evidence before action</small></div>
      </div>
    </section>
    <section className="trouble-metrics"><div><strong>{scenarios.length.toString().padStart(2, "0")}</strong><span>guided incident playbooks</span></div><div><strong>06</strong><span>troubleshooting categories</span></div><div><strong>03</strong><span>cloud ecosystems mapped</span></div><div><strong>03</strong><span>learning modes</span></div></section>
    <section className="trouble-categories" id="incident-catalog"><div className="trouble-section-heading"><div><p className="trouble-eyebrow">FIND YOUR FAILURE MODE</p><h2>What are you troubleshooting?</h2></div><p>Start from the symptom you recognize. Each playbook connects the technical cause to the service, evidence, and safe fix.</p></div>
      <div className="trouble-category-grid">{categories.map((c) => <button key={c.name} onClick={() => setCategory(c.name)} className={`trouble-category trouble-${c.color} ${category === c.name ? "selected" : ""}`}><span>{c.icon}</span><strong>{c.name}</strong><small>{c.name === "All incidents" ? "Explore every scenario" : "Browse related incidents"} <b>↗</b></small></button>)}</div>
      <div className="trouble-filters"><label className="trouble-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search symptoms, services, or errors…" aria-label="Search incident scenarios" /></label><label className="trouble-provider-select"><span>Cloud provider</span><select value={provider} onChange={(e) => setProvider(e.target.value)}><option>All clouds</option><option>AWS</option><option>Azure</option><option>Google Cloud</option></select></label></div>
      <div className="trouble-catalog-layout"><div className="trouble-scenario-list"><div className="trouble-list-heading"><strong>Incident library</strong><span>{filtered.length} scenarios</span></div>{filtered.map((s) => <button key={s.id} className={`trouble-scenario-row ${active?.id === s.id ? "active" : ""}`} onClick={() => selectScenario(s.id)}><span className="trouble-scenario-category">{s.category}</span><strong>{s.title}</strong><span className="trouble-scenario-subtitle">{s.subtitle}</span><span className="trouble-row-foot"><span>{s.severity}</span><span>{s.providers.join(" · ")}</span></span></button>)}{filtered.length === 0 && <div className="trouble-empty">No incidents match those filters. Try another symptom or cloud provider.</div>}</div>
      {active ? <article className="trouble-incident-card" id="incident-workspace"><div className="trouble-incident-top"><div><span className="trouble-pill">{active.category}</span><span className="trouble-severity">{active.severity}</span></div><span className="trouble-incident-id">CASE / {active.id.toUpperCase()}</span></div><h3>{active.title}</h3><p className="trouble-incident-subtitle">{active.subtitle}</p>
        <div className="trouble-symptoms"><strong>Symptoms reported</strong><div>{active.symptoms.map((symptom) => <span key={symptom}>• {symptom}</span>)}</div></div>
        <div className="trouble-architecture"><div className="trouble-block-heading"><strong>Follow the request / data path</strong><span>Illustrative architecture</span></div><div className="trouble-flow">{active.architecture.map((node, i) => <div className="trouble-flow-wrap" key={node}><div className={`trouble-flow-node ${i === active.architecture.length - 2 ? "focus" : ""}`}><small>{String(i + 1).padStart(2, "0")}</small><strong>{node}</strong></div>{i < active.architecture.length - 1 && <span className="trouble-flow-arrow">→</span>}</div>)}</div></div>
        <div className="trouble-mode-switch"><div><strong>Learning mode</strong><small>Choose how much guidance you want</small></div><div className="trouble-mode-options">{(["Learn", "Guided", "Challenge"] as const).map((m) => <button key={m} onClick={() => { setMode(m); setRevealed(m === "Learn" ? active.steps.length - 1 : 0); setShowRootCause(m === "Learn"); }} className={mode === m ? "active" : ""}>{m}</button>)}</div></div>
        {mode === "Challenge" && <div className="trouble-challenge-note"><strong>Challenge mode</strong><span>Work from evidence first. The root cause stays hidden until you reveal it. Select each check and explain what the evidence proves before moving on.</span></div>}
        {mode === "Guided" ? <GuidedTroubleshooting key={active.id} scenario={active} provider={provider === "All clouds" ? "AWS" : provider} /> : <>
        <div className="trouble-diagnostic-heading"><div><p className="trouble-eyebrow">DIAGNOSTIC WORKFLOW</p><h4>Investigate in order</h4></div><span>{Math.min(revealed + 1, active.steps.length)} / {active.steps.length} checks</span></div>
        <div className="trouble-step-list">{active.steps.map((step, i) => { const open = mode === "Learn" || i <= revealed; return <div key={step.title} className={`trouble-step ${open ? "revealed" : "locked"}`}><button className="trouble-step-trigger" onClick={() => { if (mode === "Learn" || i <= revealed + 1) setRevealed(i); }} disabled={mode !== "Learn" && i > revealed + 1}><span className="trouble-step-number">{open ? "✓" : String(i + 1).padStart(2, "0")}</span><span><strong>{step.title}</strong><small>{open ? "Evidence available" : "Complete the previous check first"}</small></span><b>{open ? "−" : "+"}</b></button>{open && <div className="trouble-step-content"><p><strong>Why this check matters</strong>{step.why}</p><div className="trouble-evidence"><span>OBSERVED EVIDENCE</span><p>{step.evidence}</p></div><EvidencePanel scenarioId={active.id} stepIndex={i} provider={provider === "All clouds" ? "AWS" : provider} /><p><strong>Recommended action</strong>{step.action}</p></div>}</div>; })}</div>
        {mode !== "Learn" && revealed < active.steps.length - 1 && <button className="trouble-next-step" onClick={() => setRevealed((v) => Math.min(v + 1, active.steps.length - 1))}>Reveal next diagnostic check <span>→</span></button>}
        {revealed >= active.steps.length - 1 && <button className="trouble-root-toggle" onClick={() => setShowRootCause((v) => !v)}>{showRootCause ? "Hide root cause & prevention" : "Reveal root cause & prevention"} <span>{showRootCause ? "−" : "+"}</span></button>}
        {showRootCause && <div className="trouble-root-cause"><p className="trouble-eyebrow">ROOT CAUSE & LEARNING</p><h4>What the evidence supports</h4><p>{active.rootCause}</p><h4>Prevent recurrence</h4><p>{active.prevention}</p></div>}
        </>}
        <div className="trouble-related-services"><div><p className="trouble-eyebrow">CONTINUE LEARNING</p><h4>Services & tools connected to this incident</h4></div><div className="trouble-service-links">{active.services.map((service) => <a key={service.name} href={service.href}><span>{service.name}</span><b>↗</b></a>)}</div></div>
      </article> : <div className="trouble-no-selection">No incident matches your current filters. Clear the search or select another category.</div>}
      </div>
    </section>
    <section className="trouble-next-ideas"><div className="trouble-section-heading"><div><p className="trouble-eyebrow">NEXT EVOLUTION</p><h2>What we should build next</h2></div><p>The hub is designed to grow from guided reading into a more complete cloud operations learning lab.</p></div><div className="trouble-idea-grid"><article><span>01 / PRACTICE</span><h3>Evidence-based incident simulator</h3><p>Reveal logs, metrics, traces, audit events, and configuration diffs as learners test hypotheses. Score the diagnostic reasoning, not just the final answer.</p></article><article><span>02 / ARCHITECTURE</span><h3>Clickable topology maps</h3><p>Select a service or boundary in a request path to open the shared service page and explain which checks apply at that layer.</p></article><article><span>03 / CROSS-CLOUD</span><h3>Same incident, three clouds</h3><p>Switch AWS, Azure, and GCP implementations while keeping the failure pattern constant. Highlight equivalent tools and important differences.</p></article><article><span>04 / OPERATIONS</span><h3>Runbooks and incident review</h3><p>Add severity, blast radius, safe rollback, verification checklist, prevention controls, and a short post-incident review template.</p></article></div></section>
    <footer className="trouble-footer"><a href="/">← Back to Visual Cloud Learning</a><span>Learning simulations use illustrative evidence; no cloud resources are accessed or changed.</span></footer>
  </main>;
}
