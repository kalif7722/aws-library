import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const governance = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} telemetry`, `Control telemetry writers, viewers, retention and alert configuration around ${service}, and keep sensitive application data out of observability payloads.`, `${service} observability governance pattern`,
  g("INSTRUMENTATION", c("Application / agent", "Scoped telemetry writer", "app")),
  g("OBSERVABILITY SERVICE", c(service, role, service)),
  g("ACCESS CONTROL", c("IAM controls", "Viewer / editor separation", "IAM")),
  g("RETENTION / ROUTING", c("Cloud Logging", "Evidence / export"), c("Cloud Storage", "Long-term archive")),
  g("REVIEW", c("SRE team", "SLO / incident review", "user"), c("Cloud Audit Logs", "Admin evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governance(service, role)];

export const gcpObservabilityArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "error-reporting": pair(
    b("Application exception triage", "Collect structured exceptions through Cloud Logging, group related stack traces into error groups and notify teams when a new or regressed failure appears.", "Google Cloud Error Reporting triage pattern",
      g("APPLICATION", c("Cloud Run", "Application exceptions"), c("GKE", "Service exceptions")),
      g("LOG PIPELINE", c("Cloud Logging", "Structured stack traces")),
      g("ERROR ANALYSIS", c("Error Reporting", "Group + regression detection")),
      g("TRIAGE", c("Engineering team", "Owner / resolution", "user")),
      g("OPERATE", c("Cloud Monitoring", "Service health"), c("Cloud Trace", "Request context"))), "Error Reporting", "Exception grouping + triage"),
  "logging": pair(
    b("Centralized log routing and analysis", "Ingest application and platform logs once, route them through the Log Router into controlled regional buckets and export selected streams to analytics or SIEM destinations.", "Google Cloud Logging architecture",
      g("LOG SOURCES", c("Google Cloud services", "Platform logs", "Google Cloud"), c("Applications / agents", "Application logs", "app")),
      g("LOG ROUTER", c("Cloud Logging", "Ingest + route")),
      g("LOG STORAGE", c("Log buckets", "Retention + views", "Cloud Logging")),
      g("EXPORTS", c("BigQuery", "Log analytics"), c("Google SecOps", "SIEM / detection")),
      g("OPERATE", c("Cloud Monitoring", "Log-based alerts"), c("IAM controls", "Scoped log views", "IAM"))), "Cloud Logging", "Central log management"),
  "monitoring": pair(
    b("SLO-driven application monitoring", "Collect workload metrics, reduce them into service-level signals and alert on SLO burn or user-impacting conditions rather than raw infrastructure noise.", "Google Cloud Monitoring SLO pattern",
      g("METRIC SOURCES", c("Cloud Run", "Service metrics"), c("GKE", "Workload metrics"), c("Compute Engine", "VM metrics")),
      g("METRIC INGESTION", c("Cloud Monitoring", "Time series")),
      g("SERVICE HEALTH", c("SLOs", "Availability / latency", "Cloud Monitoring"), c("Dashboards", "Golden signals", "Cloud Monitoring")),
      g("ALERTING", c("Alert policies", "Burn rate / threshold", "Cloud Monitoring"), c("Notification channels", "Incident delivery", "monitor")),
      g("RESPONSE", c("SRE team", "Investigate + recover", "user"), c("Cloud Logging", "Correlated logs"))), "Cloud Monitoring", "Metrics + SLO alerting"),
  "profiler": pair(
    b("Continuous production profiling", "Sample application CPU, heap and wall-time profiles continuously, compare hot code paths by version and use the evidence to target optimization work.", "Google Cloud Profiler optimization pattern",
      g("APPLICATION", c("Cloud Run", "Instrumented service"), c("GKE", "Instrumented workload")),
      g("PROFILE AGENT", c("Profiler agent", "Periodic low-overhead samples", "compute")),
      g("PROFILE BACKEND", c("Cloud Profiler", "Aggregate profiles", "Profiler")),
      g("ANALYSIS", c("Flame graph", "Hot functions / allocations", "monitor")),
      g("ENGINEERING", c("Developer team", "Optimize code", "user"), c("Cloud Monitoring", "Validate impact"))), "Cloud Profiler", "Continuous code profiling"),
  "trace": pair(
    b("Distributed request tracing", "Propagate trace context across microservices, export spans centrally and use waterfall views to isolate latency and error contribution across service boundaries.", "Google Cloud Trace microservices pattern",
      g("CLIENT REQUEST", c("Web / mobile", "Incoming request", "user")),
      g("SERVICE PATH", c("Cloud Run", "Service A"), c("GKE", "Service B"), c("Cloud SQL", "Database call")),
      g("TRACE EXPORT", c("OpenTelemetry", "Context + spans", "monitor")),
      g("TRACE ANALYSIS", c("Cloud Trace", "Waterfall + latency")),
      g("CORRELATION", c("Cloud Logging", "Request logs"), c("Cloud Monitoring", "Aggregate SLOs"))), "Cloud Trace", "Distributed request tracing")
};
