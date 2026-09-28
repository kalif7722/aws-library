import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Health / SLOs"), c("Cloud Logging", "Application logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} delivery`, `Separate build identity, runtime identity and configuration ownership around ${service}; promote immutable versions and retain operational evidence for rollback.`, `${service} governance pattern`,
  g("SOURCE / BUILD", c("Secure Source Manager", "Reviewed source"), c("Cloud Build", "Trusted build")),
  g("ARTIFACT / VERSION", c("Artifact Registry", "Immutable output")),
  g("RUNTIME", c(service, role, service)),
  g("RELEASE", c("Cloud Deploy", "Controlled promotion")),
  g("OPERATE", c("Cloud Monitoring", "Release health"), c("Cloud Audit Logs", "Admin evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpAppHostingArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "app-engine": pair(
    b("Versioned web application on App Engine", "Route user traffic across managed application versions while autoscaling instances and keeping durable state in managed data services outside the runtime.", "Google Cloud App Engine production pattern",
      g("CLIENTS", c("Web / mobile", "HTTP requests", "user")),
      g("APPLICATION PLATFORM", c("App Engine", "Service + versions")),
      g("TRAFFIC / SCALE", c("Traffic splitting", "Canary / rollback", "App Engine"), c("Autoscaling", "Managed instances", "App Engine")),
      g("APPLICATION DATA", c("Cloud SQL", "Relational state"), c("Cloud Storage", "Objects")),
      ops()), "App Engine", "Managed application platform"),
  "blockchain-node-engine": pair(
    b("Managed blockchain RPC backend", "Let applications use a managed protocol node for JSON-RPC or WebSocket access while transaction signing keys remain outside the node service.", "Google Cloud Blockchain Node Engine application pattern",
      g("APPLICATION", c("Web3 service", "RPC requests", "app")),
      g("RPC ACCESS", c("Blockchain Node Engine", "Managed RPC endpoint")),
      g("BLOCKCHAIN NETWORK", c("Supported chain", "Synchronized network", "network")),
      g("KEY / APP STATE", c("Cloud KMS", "Signing key operations"), c("Cloud SQL", "Application metadata")),
      ops()), "Blockchain Node Engine", "Managed blockchain node"),
  "buildpacks": pair(
    b("Source-to-container without Dockerfile", "Detect the application language, build repeatable OCI layers with Cloud Native Buildpacks and publish the resulting image to Artifact Registry for managed runtimes.", "Google Cloud Buildpacks source-to-image pattern",
      g("SOURCE", c("Application source", "Language + manifests", "file")),
      g("BUILD", c("Buildpacks", "Detect + build + export")),
      g("ARTIFACT", c("Artifact Registry", "OCI image")),
      g("RUNTIME", c("Cloud Run", "Serverless container"), c("GKE", "Kubernetes workload")),
      ops()), "Buildpacks", "Source-to-OCI image build"),
  "cloud-run": pair(
    b("Production serverless web application", "Terminate internet traffic at Google's managed edge, route authenticated requests to autoscaling Cloud Run revisions and keep durable state outside the stateless container lifecycle.", "Google Cloud Cloud Run production web pattern",
      g("CLIENTS", c("Web / mobile", "HTTPS requests", "user")),
      g("EDGE / INGRESS", c("Cloud Load Balancing", "Global HTTPS entry"), c("Cloud Armor", "WAF + DDoS")),
      g("SERVERLESS RUNTIME", c("Cloud Run", "Autoscaling container revisions")),
      g("APPLICATION DATA", c("Cloud SQL", "Transactional state"), c("Cloud Storage", "Object data")),
      ops()), "Cloud Run", "Managed serverless containers"),
    b("Event-driven Cloud Run worker", "Decouple producers from background work with Pub/Sub or Cloud Tasks, invoke an authenticated Cloud Run worker and persist results outside the instance so retries remain safe.", "Google Cloud Cloud Run asynchronous worker pattern",
      g("PRODUCERS", c("Application", "Create event / task", "app")),
      g("ASYNC CONTROL", c("Pub/Sub", "Event delivery"), c("Cloud Tasks", "Rate + retry control")),
      g("WORKER", c("Cloud Run", "Authenticated background service")),
      g("RESULT / STATE", c("BigQuery", "Analytical output"), c("Cloud Storage", "Durable result")),
      ops())),
  "google-kubernetes-engine": pair(
    b("Production microservices on GKE", "Expose containerized services through managed ingress, run application workloads across a regional cluster and keep state in managed data services while fleet operations remain centralized.", "Google Cloud GKE production microservices pattern",
      g("CLIENTS", c("Web / mobile", "Requests", "user")),
      g("EDGE / INGRESS", c("Cloud Load Balancing", "Traffic entry"), c("Cloud Armor", "WAF + DDoS")),
      g("KUBERNETES", c("GKE", "Services + pods"), c("Cloud Service Mesh", "mTLS + service policy")),
      g("STATE", c("Cloud SQL", "Transactions"), c("Cloud Storage", "Object data")),
      ops()), "Google Kubernetes Engine", "Managed Kubernetes platform")
};
