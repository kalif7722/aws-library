import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Health / SLOs"), c("Cloud Logging", "Operations logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Separate ${service} configuration, runtime identities and operational evidence, and test rollback or recovery before promoting a production change.`, `${service} governance pattern`,
  g("IDENTITY / SCOPE", c("IAM controls", "Admin / runtime separation", "IAM"), c("Resource Manager", "Project / fleet scope")),
  g("CONFIGURATION", c(service, "Versioned desired state", service)),
  g("SERVICE CAPABILITY", c(service, role, service)),
  g("RESILIENCE", c("Cloud Monitoring", "Failure / readiness signals")),
  g("AUDIT", c("Cloud Audit Logs", "Admin evidence"), c("Cloud Logging", "Runtime evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpHybridArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "cloud-location-finder": pair(
    b("Workload placement discovery", "Compare geography, service availability, latency and partner or colocation options before selecting a site, then validate connectivity separately before committing capacity.", "Google Cloud Cloud Location Finder placement pattern",
      g("PLACEMENT NEED", c("Workload requirements", "Latency / residency / services", "file")),
      g("LOCATION DISCOVERY", c("Cloud Location Finder", "Filter + compare sites")),
      g("CANDIDATES", c("Google Cloud regions", "Cloud locations", "Google Cloud"), c("Edge / colocation", "Partner locations", "internet")),
      g("CONNECTIVITY CHECK", c("Cloud Interconnect", "Private path"), c("Network Connectivity Center", "Topology fit")),
      ops()), "Cloud Location Finder", "Location discovery + comparison"),
  "config-controller": pair(
    b("Kubernetes-native cloud provisioning", "Commit declarative resource manifests, reconcile them through a managed Kubernetes control plane and let Config Connector create or update Google Cloud resources through their APIs.", "Google Cloud Config Controller infrastructure pattern",
      g("DESIRED STATE", c("Git / YAML", "Reviewed resource manifests", "file")),
      g("MANAGED CONTROL PLANE", c("Config Controller", "Kubernetes API")),
      g("RECONCILIATION", c("Config Connector", "Cloud resource controller")),
      g("GOOGLE CLOUD", c("Google Cloud APIs", "Create / update resources", "cloudapis"), c("Cloud resources", "Reconciled state", "Google Cloud")),
      ops()), "Config Controller", "Managed Kubernetes infrastructure control"),
  "config-sync": pair(
    b("Fleet GitOps configuration", "Promote approved Git, OCI or Helm configuration to a fleet and continuously reconcile cluster drift back to the reviewed desired state.", "Google Cloud Config Sync fleet GitOps pattern",
      g("APPROVED SOURCE", c("Git repository", "Versioned configuration", "file"), c("OCI / Helm", "Packaged config", "artifact")),
      g("GITOPS CONTROL", c("Config Sync", "Fetch + render + reconcile")),
      g("GKE FLEET", c("GKE", "Cluster A"), c("GKE", "Cluster B")),
      g("POLICY", c("Policy Controller", "Admission guardrails")),
      ops()), "Config Sync", "Continuous fleet reconciliation"),
  "gke-multi-cloud": pair(
    b("Centralized Kubernetes across clouds", "Operate Kubernetes clusters across Google Cloud, AWS and Azure through a common fleet while provider-specific infrastructure and networking remain in each cloud.", "Google Cloud GKE Multi-Cloud fleet pattern",
      g("FLEET CONTROL", c("GKE Multi-Cloud", "Central cluster lifecycle")),
      g("GOOGLE CLOUD", c("GKE", "Google Cloud cluster")),
      g("AWS / AZURE", c("GKE on AWS", "AWS cluster", "GKE Multi-Cloud"), c("GKE on Azure", "Azure cluster", "GKE Multi-Cloud")),
      g("FLEET SERVICES", c("Config Sync", "GitOps"), c("Policy Controller", "Policy"), c("Cloud Service Mesh", "Service traffic")),
      ops()), "GKE Multi-Cloud", "Multi-cloud Kubernetes fleet"),
  "policy-controller": pair(
    b("Kubernetes policy admission", "Evaluate workload manifests against centrally managed Gatekeeper constraints before admission, then audit existing fleet resources for drift or violations.", "Google Cloud Policy Controller admission pattern",
      g("DEPLOYMENT", c("Developer / CI", "Kubernetes manifest", "user")),
      g("ADMISSION", c("GKE API", "Admission request", "GKE")),
      g("POLICY", c("Policy Controller", "Constraints + bundles")),
      g("OUTCOME", c("GKE", "Allowed workload"), c("Violation", "Deny / audit finding", "security")),
      ops()), "Policy Controller", "Kubernetes admission + audit"),
  "service-directory": pair(
    b("Cross-environment service registry", "Register service endpoints from heterogeneous environments and let applications resolve current endpoint metadata without treating the registry as a load balancer.", "Google Cloud Service Directory discovery pattern",
      g("SERVICE PRODUCERS", c("GKE / VMs", "Service endpoints", "server"), c("On-prem services", "External endpoints", "network")),
      g("REGISTRY", c("Service Directory", "Namespace + endpoints")),
      g("DISCOVERY", c("Cloud DNS", "DNS integration"), c("Service lookup", "Metadata query", "Service Directory")),
      g("CONSUMERS", c("Cloud Run", "Application client"), c("GKE", "Service client")),
      ops()), "Service Directory", "Managed service registry")
};

export const gcpMigrationArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "dual-run": pair(
    b("Parallel migration validation", "Send equivalent input through legacy and modernized implementations, normalize their outputs and turn discrepancies into explicit cutover evidence before production switchover.", "Google Cloud Dual Run migration validation pattern",
      g("INPUT", c("Production / test request", "Controlled test input", "user")),
      g("PARALLEL EXECUTION", c("Legacy system", "Current result", "server"), c("Modernized system", "Target result", "Google Cloud")),
      g("COMPARISON", c("Dual Run", "Normalize + compare")),
      g("EVIDENCE", c("Discrepancy report", "Semantic differences", "file")),
      g("CUTOVER", c("Migration team", "Go / no-go decision", "user"), c("Cloud Logging", "Validation evidence"))), "Dual Run", "Legacy / target comparison"),
  "mainframe-assessment-tool": pair(
    b("Mainframe modernization assessment", "Extract source artifacts read-only, build an inventory and dependency graph, then use the assessment report to plan modernization waves rather than assuming code discovery proves migratability.", "Google Cloud Mainframe Assessment Tool pattern",
      g("MAINFRAME", c("Programs / configs", "Assessment source", "server")),
      g("SECURE EXTRACTION", c("Assessment collector", "Read-only artifacts", "security")),
      g("ANALYSIS", c("Mainframe Assessment Tool", "Inventory + dependencies")),
      g("REPORT", c("Assessment report", "Complexity + recommendations", "file")),
      g("PLANNING", c("Migration Center", "Portfolio / wave planning"), c("Architecture team", "Modernization decisions", "user"))), "Mainframe Assessment Tool", "Mainframe inventory + assessment"),
  "mainframe-connector": pair(
    b("Mainframe data integration", "Move mainframe datasets or changes over encrypted connectivity into cloud storage and analytics targets while preserving schema and encoding validation.", "Google Cloud Mainframe Connector data movement pattern",
      g("MAINFRAME SOURCE", c("Mainframe datasets", "Records / changes", "server")),
      g("CONNECTOR", c("Mainframe Connector", "Extraction + transfer")),
      g("SECURE PATH", c("Cloud Interconnect", "Private transfer"), c("Cloud VPN", "Encrypted alternative")),
      g("CLOUD TARGET", c("Cloud Storage", "Landing data"), c("BigQuery", "Analytics tables")),
      ops()), "Mainframe Connector", "Mainframe-to-cloud transfer"),
  "migrate-to-containers": pair(
    b("VM application replatform to containers", "Discover a supported VM application, generate container artifacts, review them in CI and test the new runtime before shifting production traffic.", "Google Cloud Migrate to Containers replatform pattern",
      g("SOURCE VM", c("Compute Engine / VMware", "Existing application", "server")),
      g("DISCOVERY / PLAN", c("Migrate to Containers", "Analyze + generate")),
      g("ARTIFACT", c("Artifact Registry", "Generated container image"), c("Cloud Build", "Review + rebuild")),
      g("TARGET RUNTIME", c("GKE", "Kubernetes target"), c("Cloud Run", "Serverless target")),
      ops()), "Migrate to Containers", "VM-to-container modernization"),
  "migrate-to-vms": pair(
    b("Continuous VM replication and cutover", "Replicate source disks continuously into Google Cloud, prove a test clone in the target VPC and perform a final sync before controlled cutover to Compute Engine.", "Google Cloud Migrate to VMs cutover pattern",
      g("SOURCE ESTATE", c("VMware / cloud VM", "Source machine", "server")),
      g("REPLICATION", c("Migrate to VMs", "Continuous disk replication")),
      g("STAGING", c("Google Cloud staging", "Replicated state", "Cloud Storage")),
      g("TEST / TARGET", c("Compute Engine", "Test clone / target VM")),
      g("CUTOVER", c("Migration team", "Final sync + switch", "user"), c("Cloud Monitoring", "Target health"))), "Migrate to VMs", "VM replication + cutover"),
  "migration-center": pair(
    b("Enterprise migration portfolio planning", "Collect estate inventory and utilization, group related assets, model target fit and TCO, then build migration waves that feed execution tools.", "Google Cloud Migration Center assessment pattern",
      g("SOURCE ESTATE", c("On-prem / cloud estate", "Servers + dependencies", "server")),
      g("DISCOVERY", c("Migration Center", "Inventory + utilization")),
      g("ASSESSMENT", c("Migration Center", "TCO + target fit")),
      g("WAVE PLANNING", c("Migration waves", "Grouped roadmap", "file")),
      g("EXECUTION", c("Migrate to VMs", "Lift / shift"), c("Migrate to Containers", "Replatform"))), "Migration Center", "Migration discovery + planning")
};

export const gcpIndustryArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "ai-commerce-search": pair(
    b("Retail search and recommendations", "Combine a fresh product catalog with user events and serving configuration so shopper queries return ranked products while conversion feedback improves relevance measurement.", "Google Cloud AI Commerce Search retail pattern",
      g("COMMERCE DATA", c("Product catalog", "Products + attributes", "data"), c("User events", "Clicks / purchases", "eventarc")),
      g("RETAIL AI", c("AI Commerce Search", "Index + ranking")),
      g("SHOPPER QUERY", c("Web / mobile store", "Search request", "app")),
      g("RESULTS", c("Ranked products", "Search / recommendation", "data"), c("BigQuery", "Conversion analytics")),
      ops()), "AI Commerce Search", "Retail search + recommendations"),
  "anti-money-laundering-ai": pair(
    b("AML risk prioritization", "Validate governed banking data, train and backtest the AML model, generate batch risk scores and hand high-risk cases to investigators for human review.", "Google Cloud Anti Money Laundering AI pattern",
      g("BANK DATA", c("Party / account data", "Customers + accounts", "database"), c("Transactions", "Financial activity", "data")),
      g("GOVERNED DATA", c("BigQuery", "Validated AML dataset"), c("VPC Service Controls", "Data perimeter")),
      g("AML AI", c("Anti Money Laundering AI", "Model + batch prediction")),
      g("INVESTIGATION", c("Risk scores", "Prioritized cases", "security"), c("Investigator", "Human decision", "user")),
      ops()), "Anti Money Laundering AI", "AML risk scoring"),
  "healthcare-data-engine": pair(
    b("Longitudinal healthcare data platform", "Ingest clinical records securely, harmonize them into a healthcare-aware model and expose governed longitudinal data to analytics and AI without losing clinical semantics.", "Google Cloud Healthcare Data Engine pattern",
      g("CLINICAL SOURCES", c("EHR / clinical systems", "FHIR / HL7 / records", "database")),
      g("SECURE INGESTION", c("Cloud Healthcare API", "Healthcare interfaces"), c("Pub/Sub", "Event ingestion")),
      g("HARMONIZATION", c("Healthcare Data Engine", "Normalize + contextualize")),
      g("ANALYTICS / AI", c("BigQuery", "Clinical analytics"), c("Vertex AI", "Healthcare models")),
      ops()), "Healthcare Data Engine", "Healthcare harmonization platform"),
  "talent-solutions": pair(
    b("AI-assisted job discovery", "Index structured company and job data, process job-seeker search context and feed conversion events back into relevance measurement without turning ranking into an automated employment decision.", "Google Cloud Talent Solution search pattern",
      g("JOB DATA", c("Companies / jobs", "Structured listings", "data")),
      g("SEARCH SERVICE", c("Talent Solutions", "Index + ranking")),
      g("JOB SEEKER", c("Career application", "Search query", "app")),
      g("RESULTS / EVENTS", c("Ranked jobs", "Search results", "data"), c("BigQuery", "Apply / conversion analytics")),
      ops()), "Talent Solutions", "Job search + matching"),
  "telecom-network-automation": pair(
    b("Telecom network-function lifecycle", "Validate vendor network-function packages, deploy them to approved telecom environments and automate controlled lifecycle actions while assurance signals verify service health.", "Google Cloud Telecom Network Automation pattern",
      g("VENDOR PACKAGE", c("Network function package", "Signed blueprint", "artifact")),
      g("AUTOMATION CONTROL", c("Telecom Network Automation", "Validate + orchestrate")),
      g("TELCO RUNTIME", c("GKE", "Cloud-native network functions"), c("Edge environment", "Distributed site", "network")),
      g("ASSURANCE", c("Cloud Monitoring", "Network-function health"), c("Cloud Logging", "Lifecycle evidence")),
      g("OPERATIONS", c("Network operations", "Approve / rollback", "user"), c("IAM controls", "Role separation", "IAM"))), "Telecom Network Automation", "Network-function lifecycle automation"),
  "telecom-subscriber-insights-api": pair(
    b("Consent-based carrier insight", "Obtain subscriber authorization, query supported carrier signals and combine the normalized insight with application policy rather than treating the network signal as identity proof.", "Google Cloud Telecom Subscriber Insights API pattern",
      g("APPLICATION", c("Consumer application", "Risk / verification request", "app")),
      g("CONSENT", c("Subscriber", "Explicit authorization", "user")),
      g("NETWORK INSIGHT", c("Telecom Subscriber Insights API", "Carrier signal lookup")),
      g("BUSINESS DECISION", c("Application policy", "Allow / review / step-up", "security")),
      ops()), "Telecom Subscriber Insights API", "Carrier network risk signals"),
  "vision-api-product-search": pair(
    b("Visual product discovery", "Index retailer-managed reference images, submit a shopper image for visual matching and resolve the matched product into catalog details and commerce actions.", "Google Cloud Vision Product Search pattern",
      g("PRODUCT CATALOG", c("Cloud Storage", "Reference images"), c("Product metadata", "SKU / category", "data")),
      g("VISUAL INDEX", c("Vision API Product Search", "Product sets + index")),
      g("SHOPPER QUERY", c("Mobile application", "Query image", "app")),
      g("MATCH / DETAIL", c("Visual matches", "Candidate products", "data"), c("Commerce backend", "Price / inventory", "server")),
      ops()), "Vision API Product Search", "Image-based product matching")
};
