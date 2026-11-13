export type GcpArchitectureBoardCard = {
  label: string;
  caption: string;
  iconLabel?: string;
};

export type GcpArchitectureBoardGroup = {
  title: string;
  cards: GcpArchitectureBoardCard[];
};

export type GcpArchitectureBoard = {
  title: string;
  note: string;
  reference?: string;
  groups: GcpArchitectureBoardGroup[];
};

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });

const operate = () => g("OPERATE & GOVERN",
  c("Cloud Monitoring", "Metrics / alerts"),
  c("Cloud Logging", "Logs / audit"),
  c("IAM controls", "Least privilege", "IAM")
);
const releaseGovernance = () => g("OPERATE & GOVERN",
  c("Cloud Monitoring", "Release health"),
  c("Cloud Audit Logs", "Admin audit"),
  c("IAM controls", "Separation of duties", "IAM")
);

export const gcpArchitectureBoardsBySlug: Record<string, GcpArchitectureBoard[]> = {
  "api-gateway": [
    b("Serverless API front door", "Publish a managed REST endpoint in front of independently scaling serverless backends while keeping authentication and operations explicit.", "Google Cloud API Gateway serverless backend pattern",
      g("APPLICATIONS", c("Web / mobile", "API requests")),
      g("API ENTRY", c("API Gateway", "Auth + routing")),
      g("SERVERLESS BACKENDS", c("Cloud Run", "Container API"), c("Cloud Functions", "Function API")),
      g("APPLICATION DATA", c("Cloud SQL", "Relational state"), c("Firestore", "Document state")),
      operate()),
    b("Governed API release", "Promote an OpenAPI contract and gateway configuration through a controlled delivery path before production traffic reaches the backend.", "Google Cloud governed API delivery pattern",
      g("SOURCE", c("OpenAPI contract", "Versioned API spec", "file"), c("Secure Source Manager", "Reviewed source")),
      g("BUILD / CONFIG", c("Cloud Build", "Validate + package")),
      g("API CONTROL", c("API Gateway", "Managed endpoint")),
      g("BACKEND", c("Cloud Run", "Private service")),
      releaseGovernance())
  ],
  "apigee": [
    b("Enterprise API mediation", "Expose enterprise APIs through reusable policies, products and analytics while backends remain independently owned.", "Google Cloud Apigee enterprise API pattern",
      g("API CONSUMERS", c("Apps / partners", "OAuth / API key")),
      g("API MANAGEMENT", c("Apigee", "Proxy + policies")),
      g("BACKEND SERVICES", c("Cloud Run", "Managed APIs"), c("Google Kubernetes Engine", "Service APIs", "GKE")),
      g("ENTERPRISE SYSTEMS", c("Integration Connectors", "SaaS / database")),
      operate()),
    b("Governed API product lifecycle", "Separate developer access, API-product policy and runtime delivery so enterprise consumers can be governed without coupling them to backend teams.", "Apigee API product governance pattern",
      g("DEVELOPERS", c("Developer apps", "Consumer identity", "user")),
      g("PRODUCT CONTROL", c("Apigee", "Products + quotas")),
      g("RUNTIME", c("Apigee runtime", "Policy execution", "Apigee")),
      g("TARGET APIs", c("Cloud Run", "Service endpoint"), c("GKE", "Cluster services")),
      releaseGovernance())
  ],
  "app-design-center": [
    b("Platform engineering self-service", "Platform teams publish approved application patterns that developers configure and deploy without rebuilding the architecture from scratch.", "Google Cloud Application Design Center self-service pattern",
      g("PLATFORM TEAM", c("Architects", "Approved patterns", "user")),
      g("DESIGN CATALOG", c("Application Design Center", "Templates + components", "App Design Center")),
      g("INFRASTRUCTURE AS CODE", c("Terraform blueprint", "Versioned desired state", "file"), c("Infrastructure Manager", "Managed apply", "Infra Manager")),
      g("APPLICATION TARGET", c("Cloud Run", "Runtime"), c("Cloud SQL", "Data")),
      operate()),
    b("Governed application template", "Use a controlled catalog and deployment boundary so teams can reuse architecture while platform owners retain policy and lifecycle control.", "Application Design Center governed catalog pattern",
      g("CATALOG AUTHORS", c("Platform team", "Design + approve", "user")),
      g("CATALOG", c("Application Design Center", "Published template", "App Design Center")),
      g("POLICY / DEPLOY", c("Infrastructure Manager", "Terraform execution", "Infra Manager"), c("Organization Policy", "Guardrails")),
      g("TARGET PROJECT", c("Application stack", "Managed resources", "Google Cloud")),
      releaseGovernance())
  ],
  "app-hub": [
    b("Application-centric operations", "Group distributed resources into business applications so operations teams can reason about services and workloads instead of individual assets.", "Google Cloud App Hub application operations pattern",
      g("RESOURCE PROJECTS", c("Cloud resources", "Discovered workloads", "Google Cloud")),
      g("APPLICATION MODEL", c("App Hub", "Services + workloads")),
      g("OWNERSHIP", c("Application owners", "Criticality + team", "user")),
      g("OPERATIONS", c("Cloud Monitoring", "Health + SLOs"), c("Cloud Logging", "Logs")),
      g("GOVERNANCE", c("IAM controls", "Scoped access", "IAM"), c("Cloud Audit Logs", "Admin evidence"))),
    b("Portfolio governance with App Hub", "Register projects centrally, assign ownership metadata and connect application inventory to operational evidence.", "App Hub governance pattern",
      g("ORGANIZATION", c("Projects / folders", "Registered scope", "Google Cloud")),
      g("APP INVENTORY", c("App Hub", "Application registry")),
      g("RESOURCE CONTEXT", c("Cloud Asset Inventory", "Asset metadata")),
      g("HEALTH CONTEXT", c("Cloud Monitoring", "Operational status")),
      releaseGovernance())
  ],
  "application-integration": [
    b("Enterprise application orchestration", "Coordinate SaaS and Google Cloud systems through visual workflows while connectors isolate credentials and provider-specific APIs.", "Google Cloud Application Integration enterprise integration pattern",
      g("TRIGGERS", c("API / event", "Start integration", "eventarc"), c("Cloud Scheduler", "Timed trigger")),
      g("ORCHESTRATION", c("Application Integration", "Workflow + mapping")),
      g("CONNECTIVITY", c("Integration Connectors", "Managed adapters")),
      g("BUSINESS SYSTEMS", c("SaaS applications", "CRM / ERP", "internet"), c("Cloud SQL", "Database")),
      operate()),
    b("Event-driven enterprise integration", "Route a cloud event into stateful integration logic, invoke managed connectors and retain execution evidence for operations.", "Application Integration event-driven pattern",
      g("EVENT SOURCES", c("Eventarc", "CloudEvents"), c("Pub/Sub", "Messaging")),
      g("INTEGRATION", c("Application Integration", "Stateful workflow")),
      g("CONNECTORS", c("Integration Connectors", "SaaS / database")),
      g("DESTINATIONS", c("External systems", "Business APIs", "internet")),
      releaseGovernance())
  ],
  "artifact-analysis": [
    b("Container vulnerability gate", "Scan immutable image digests after build and use findings as an input to deployment policy rather than treating scanning as remediation.", "Google Cloud Artifact Analysis container security pattern",
      g("BUILD", c("Cloud Build", "Produce image")),
      g("REGISTRY", c("Artifact Registry", "Immutable digest")),
      g("SECURITY ANALYSIS", c("Artifact Analysis", "Vulnerability scan")),
      g("DEPLOYMENT GATE", c("Binary Authorization", "Admission policy"), c("GKE", "Trusted runtime")),
      operate()),
    b("On-demand artifact assessment", "Assess an artifact before promotion, route critical findings to security teams and admit only approved digests to production.", "Artifact Analysis on-demand scanning pattern",
      g("CI PIPELINE", c("Cloud Build", "Candidate artifact")),
      g("SCAN", c("Artifact Analysis", "On-demand findings")),
      g("SECURITY REVIEW", c("Security Command Center", "Finding workflow")),
      g("TRUSTED ARTIFACT", c("Artifact Registry", "Approved digest")),
      releaseGovernance())
  ],
  "artifact-registry": [
    b("Container delivery through Artifact Registry", "Build once, store immutable artifacts centrally and let multiple managed runtimes pull the same trusted version.", "Google Cloud Artifact Registry delivery pattern",
      g("SOURCE / CI", c("Developers / CI", "Build input", "user"), c("Cloud Build", "Package")),
      g("ARTIFACT STORE", c("Artifact Registry", "Images / packages")),
      g("RUNTIMES", c("Cloud Run", "Serverless containers"), c("GKE", "Kubernetes workloads")),
      g("APPLICATION DATA", c("Cloud Storage", "Build assets")),
      operate()),
    b("Remote and virtual repository pattern", "Centralize upstream packages behind Artifact Registry so builds use controlled dependency paths instead of reaching public repositories directly.", "Artifact Registry remote repository pattern",
      g("UPSTREAM", c("Public package source", "External packages", "internet")),
      g("CONTROLLED REPOSITORY", c("Artifact Registry", "Remote / virtual repo")),
      g("BUILD", c("Cloud Build", "Dependency consumer")),
      g("DEPLOY", c("Cloud Run", "Runtime"), c("GKE", "Runtime")),
      releaseGovernance())
  ],
  "cloud-build": [
    b("Source-to-deployment pipeline", "Turn a reviewed source revision into a versioned artifact and promote the same digest into managed runtime targets.", "Google Cloud Cloud Build delivery pipeline",
      g("SOURCE", c("GitHub / GitLab", "Repository event", "internet"), c("Developer Connect", "Trusted link")),
      g("BUILD", c("Cloud Build", "Build + test")),
      g("ARTIFACT", c("Artifact Registry", "Immutable output")),
      g("DELIVERY", c("Cloud Deploy", "Promotion"), c("Cloud Run", "Runtime")),
      operate()),
    b("Private build worker pattern", "Run builds inside a private worker pool when dependencies, package repositories or internal services are reachable only from a controlled VPC.", "Cloud Build private pool pattern",
      g("SOURCE", c("Secure Source Manager", "Reviewed Git")),
      g("PRIVATE BUILD", c("Cloud Build", "Private worker pool")),
      g("SECRETS / PACKAGES", c("Secret Manager", "Build secrets"), c("Artifact Registry", "Dependencies")),
      g("DEPLOY", c("Cloud Deploy", "Controlled release")),
      releaseGovernance())
  ],
  "cloud-code": [
    b("Kubernetes developer inner loop", "Use Cloud Code inside the IDE to build, debug and deploy the same application configuration developers will later promote through CI.", "Google Cloud Cloud Code Kubernetes development pattern",
      g("DEVELOPER", c("IDE", "Edit + debug", "app")),
      g("DEV TOOLING", c("Cloud Code", "Google Cloud workflows")),
      g("LOCAL / BUILD", c("Skaffold", "Build + sync", "compute")),
      g("RUNTIME", c("GKE", "Development cluster"), c("Cloud Run", "Serverless target")),
      operate()),
    b("Developer-to-CI handoff", "Keep local developer feedback fast while the authoritative build and release path remains in managed CI/CD services.", "Cloud Code to Cloud Build handoff pattern",
      g("WORKSTATION", c("Cloud Code", "Local validation")),
      g("SOURCE", c("Secure Source Manager", "Versioned revision")),
      g("CI", c("Cloud Build", "Authoritative build")),
      g("DELIVERY", c("Cloud Deploy", "Promotion")),
      releaseGovernance())
  ],
  "cloud-deploy": [
    b("Progressive delivery to managed runtimes", "Promote one immutable artifact through ordered targets while deployment policy and runtime health remain independently observable.", "Google Cloud Cloud Deploy promotion pattern",
      g("ARTIFACT", c("Artifact Registry", "Release image")),
      g("DELIVERY CONTROL", c("Cloud Deploy", "Release + rollout")),
      g("STAGING", c("GKE", "Pre-production"), c("Cloud Run", "Pre-production")),
      g("PRODUCTION", c("GKE", "Production"), c("Cloud Run", "Production")),
      operate()),
    b("Canary rollout with approval", "Release a small canary first, evaluate service health and require approval before promoting the remaining production traffic.", "Cloud Deploy canary strategy",
      g("RELEASE", c("Artifact Registry", "Immutable digest")),
      g("ROLLOUT", c("Cloud Deploy", "Canary phases")),
      g("CANARY", c("Cloud Run", "Initial traffic"), c("GKE", "Canary workload")),
      g("FULL PRODUCTION", c("Production target", "Approved promotion", "Google Cloud")),
      releaseGovernance())
  ],
  "cloud-scheduler": [
    b("Scheduled serverless job", "Trigger an authenticated serverless endpoint on a cron schedule and keep the handler idempotent because delivery can be retried.", "Google Cloud Cloud Scheduler HTTP target pattern",
      g("SCHEDULE", c("Cloud Scheduler", "Cron + timezone")),
      g("AUTHENTICATED TARGET", c("Cloud Run", "HTTP worker"), c("Cloud Functions", "Function worker")),
      g("APPLICATION DATA", c("Cloud SQL", "Transactional state"), c("Cloud Storage", "Objects")),
      g("RESULT", c("Job outcome", "Idempotent work", "monitor")),
      operate()),
    b("Scheduled event fan-out", "Publish a scheduled message into Pub/Sub so multiple asynchronous consumers can scale independently from the cron trigger.", "Cloud Scheduler Pub/Sub pattern",
      g("SCHEDULE", c("Cloud Scheduler", "Timed trigger")),
      g("MESSAGING", c("Pub/Sub", "Scheduled event")),
      g("CONSUMERS", c("Cloud Run", "Subscriber"), c("Workflows", "Orchestration")),
      g("STATE / RESULT", c("BigQuery", "Analytical output"), c("Cloud Storage", "Files")),
      operate())
  ],
  "cloud-shell": [
    b("Browser-based cloud administration", "Give an operator an ephemeral, preconfigured shell for gcloud and API administration without turning the shell VM into a production host.", "Google Cloud Cloud Shell administration pattern",
      g("OPERATOR", c("Administrator", "Browser session", "user")),
      g("ADMIN ENVIRONMENT", c("Cloud Shell", "gcloud + tools")),
      g("CONTROL PLANE", c("Google Cloud APIs", "Management calls", "cloudapis")),
      g("TARGET RESOURCES", c("Google Cloud", "Projects / services")),
      g("GOVERNANCE", c("Cloud Audit Logs", "Admin evidence"), c("IAM controls", "Impersonation", "IAM"))),
    b("Troubleshooting workflow", "Use Cloud Shell to inspect logs and resource state, then make the smallest audited configuration change required to restore service.", "Cloud Shell operations troubleshooting pattern",
      g("OPERATOR", c("SRE / engineer", "Interactive diagnosis", "user")),
      g("TOOLS", c("Cloud Shell", "CLI workspace")),
      g("OBSERVABILITY", c("Cloud Logging", "Logs"), c("Cloud Monitoring", "Metrics")),
      g("TARGET", c("Google Cloud resource", "Diagnose / change", "Google Cloud")),
      releaseGovernance())
  ],
  "cloud-source-repositories": [
    b("Legacy managed Git delivery", "For existing eligible projects, a repository change can still trigger managed builds and artifact publication before deployment.", "Cloud Source Repositories legacy CI pattern",
      g("DEVELOPERS", c("Git clients", "Push commits", "user")),
      g("SOURCE", c("Cloud Source Repositories", "Legacy private Git")),
      g("BUILD", c("Cloud Build", "Trigger + build")),
      g("ARTIFACT / DEPLOY", c("Artifact Registry", "Versioned artifact"), c("Cloud Deploy", "Promotion")),
      operate()),
    b("Repository modernization path", "Move legacy Google-hosted Git repositories toward Secure Source Manager or externally hosted SCM connected through Developer Connect.", "Cloud Source Repositories migration pattern",
      g("LEGACY SOURCE", c("Cloud Source Repositories", "Existing repository")),
      g("MIGRATION", c("Git mirror / transfer", "Preserve history", "file")),
      g("TARGET SOURCE", c("Secure Source Manager", "Google-managed Git"), c("Developer Connect", "External SCM link")),
      g("CI", c("Cloud Build", "Reconnected triggers")),
      releaseGovernance())
  ],
  "cloud-tasks": [
    b("Rate-controlled asynchronous worker", "Decouple request intake from background processing while Cloud Tasks controls concurrency, retry and schedule behaviour per queue.", "Google Cloud Cloud Tasks worker pattern",
      g("PRODUCER", c("Web / API service", "Create task", "app")),
      g("QUEUE", c("Cloud Tasks", "Rate + retry control")),
      g("WORKERS", c("Cloud Run", "HTTP worker"), c("Cloud Functions", "Function worker")),
      g("APPLICATION STATE", c("Cloud SQL", "Transactions"), c("Firestore", "Document state")),
      operate()),
    b("Protected task dispatch", "Use an OIDC-authenticated queue to smooth bursts into a private worker service while preserving bounded concurrency and retry backoff.", "Cloud Tasks authenticated dispatch pattern",
      g("APPLICATION", c("Frontend service", "Enqueue work", "app")),
      g("TASK CONTROL", c("Cloud Tasks", "OIDC + backoff")),
      g("PRIVATE WORKER", c("Cloud Run", "Authenticated target")),
      g("RESULT STORE", c("Firestore", "Task outcome")),
      releaseGovernance())
  ],
  "cloud-workstations": [
    b("Managed enterprise developer environment", "Place reproducible developer workstations inside the customer network so source, private dependencies and build systems are reached through governed paths.", "Google Cloud Cloud Workstations enterprise development pattern",
      g("DEVELOPERS", c("Engineer", "Browser / IDE", "user")),
      g("WORKSTATION", c("Cloud Workstations", "Managed dev environment")),
      g("PRIVATE DEPENDENCIES", c("VPC network", "Private access", "VPC"), c("Secret Manager", "Credentials")),
      g("SOURCE / BUILD", c("Secure Source Manager", "Git"), c("Cloud Build", "CI")),
      operate()),
    b("Governed workstation lifecycle", "Standardize images, machine types, idle policy and persistent disks while separating developer identity from runtime service identities.", "Cloud Workstations governance pattern",
      g("IDENTITY", c("Cloud Identity", "User access"), c("IAM controls", "Roles", "IAM")),
      g("CONFIGURATION", c("Cloud Workstations", "Approved config")),
      g("NETWORK", c("VPC network", "Private egress", "VPC")),
      g("DEVELOPER DATA", c("Persistent Disk", "Home / workspace")),
      releaseGovernance())
  ],
  "developer-connect": [
    b("External source to Google Cloud delivery", "Create a managed trust link from GitHub or GitLab into Google Cloud so build and delivery services consume approved repositories without bespoke credentials per product.", "Google Cloud Developer Connect CI/CD pattern",
      g("SOURCE CONTROL", c("GitHub / GitLab", "External SCM", "internet")),
      g("TRUSTED CONNECTION", c("Developer Connect", "Repository link")),
      g("BUILD", c("Cloud Build", "CI pipeline")),
      g("DELIVERY", c("Artifact Registry", "Artifact"), c("Cloud Deploy", "Promotion")),
      operate()),
    b("Private SCM integration", "Connect a privately hosted source system through managed connection lifecycle and let downstream Google Cloud services reuse the same repository link.", "Developer Connect private repository pattern",
      g("PRIVATE SCM", c("GitLab / GitHub Enterprise", "Private repository", "internet")),
      g("CONNECTION", c("Developer Connect", "Managed authorization")),
      g("CONSUMERS", c("Cloud Build", "Build trigger"), c("Application Design Center", "Source components", "App Design Center")),
      g("ARTIFACT", c("Artifact Registry", "Build output")),
      releaseGovernance())
  ],
  "developer-device-platform": [
    b("Managed physical-device testing", "Send a versioned application build to a managed device fleet, execute tests on real hardware and retain reproducible evidence for engineering teams.", "Google Cloud Developer Device Platform testing pattern",
      g("APPLICATION BUILD", c("Cloud Build", "Test artifact")),
      g("DEVICE ORCHESTRATION", c("Developer Device Platform", "Session + allocation")),
      g("PHYSICAL DEVICES", c("Managed device fleet", "Real hardware", "mobile")),
      g("TEST RESULTS", c("Cloud Storage", "Video / screenshots"), c("BigQuery", "Test analytics")),
      operate()),
    b("CI-driven device validation", "Make device testing part of CI so release candidates are exercised against selected hardware and OS profiles before promotion.", "Developer Device Platform CI validation pattern",
      g("SOURCE / CI", c("Secure Source Manager", "Revision"), c("Cloud Build", "Build + test trigger")),
      g("DEVICE TEST", c("Developer Device Platform", "Managed session")),
      g("DEVICE POOL", c("Physical devices", "Model / OS matrix", "mobile")),
      g("EVIDENCE", c("Cloud Storage", "Artifacts")),
      releaseGovernance())
  ],
  "eventarc": [
    b("Event-driven serverless application", "Route provider events as CloudEvents into independently scaling destinations without embedding source-specific polling logic in the application.", "Google Cloud Eventarc event-driven pattern",
      g("EVENT SOURCES", c("Cloud Storage", "Object events"), c("Pub/Sub", "Messages"), c("Cloud Audit Logs", "Audit events")),
      g("EVENT ROUTING", c("Eventarc", "Filter + deliver")),
      g("DESTINATIONS", c("Cloud Run", "Service"), c("Cloud Functions", "Function"), c("Workflows", "Orchestration")),
      g("APPLICATION STATE", c("Firestore", "Event state"), c("BigQuery", "Analytics")),
      operate()),
    b("Workflow orchestration from events", "Use Eventarc to normalize an infrastructure or application event before handing durable multi-step processing to Workflows.", "Eventarc to Workflows orchestration pattern",
      g("PRODUCER", c("Google Cloud service", "Provider event", "Google Cloud")),
      g("ROUTER", c("Eventarc", "CloudEvent delivery")),
      g("ORCHESTRATION", c("Workflows", "Durable steps")),
      g("DOWNSTREAM APIS", c("Google Cloud APIs", "Managed calls", "cloudapis")),
      releaseGovernance())
  ],
  "integration-connectors": [
    b("Managed SaaS and database connectivity", "Keep provider-specific credentials and schemas inside managed connectors while orchestration logic works with normalized entities and actions.", "Google Cloud Integration Connectors enterprise connectivity pattern",
      g("ORCHESTRATION", c("Application Integration", "Business workflow"), c("Workflows", "API workflow")),
      g("CONNECTOR LAYER", c("Integration Connectors", "Managed adapters")),
      g("PRIVATE / PUBLIC SYSTEMS", c("SaaS applications", "CRM / ERP", "internet"), c("Cloud SQL", "Database")),
      g("CREDENTIALS", c("Secret Manager", "Secrets / OAuth")),
      operate()),
    b("Private enterprise connector", "Reach a private database or application through a governed connector instead of placing provider credentials directly in every calling workload.", "Integration Connectors private endpoint pattern",
      g("CALLER", c("Cloud Run", "Application")),
      g("CONNECTOR", c("Integration Connectors", "Connection runtime")),
      g("NETWORK", c("VPC network", "Private path", "VPC")),
      g("ENTERPRISE SYSTEM", c("Private application", "Database / API", "server")),
      releaseGovernance())
  ],
  "secure-source-manager": [
    b("Google-managed source-to-release", "Keep Git hosting, review, managed build and artifact delivery inside Google Cloud with explicit IAM between each lifecycle stage.", "Google Cloud Secure Source Manager CI/CD pattern",
      g("DEVELOPERS", c("Engineering team", "Git + review", "user")),
      g("SOURCE CONTROL", c("Secure Source Manager", "Repository + PR")),
      g("BUILD", c("Cloud Build", "Build + test")),
      g("ARTIFACT / DELIVERY", c("Artifact Registry", "Immutable artifact"), c("Cloud Deploy", "Promotion")),
      operate()),
    b("Protected branch delivery", "Require peer review on protected branches before CI builds an immutable artifact that can be promoted to production.", "Secure Source Manager protected branch pattern",
      g("CHANGE", c("Pull request", "Peer review", "file")),
      g("SOURCE POLICY", c("Secure Source Manager", "Branch protection")),
      g("CI", c("Cloud Build", "Trusted build")),
      g("RELEASE", c("Artifact Registry", "Digest"), c("Cloud Deploy", "Controlled rollout")),
      releaseGovernance())
  ],
  "service-infrastructure": [
    b("Managed API producer control plane", "Let an API producer centralize consumer enablement, quota checks and usage reporting while the business backend remains independently deployed.", "Google Cloud Service Infrastructure producer pattern",
      g("API CONSUMERS", c("Consumer projects", "Enabled service", "user")),
      g("SERVICE MANAGEMENT", c("Service Management", "API configuration", "cloudapis")),
      g("SERVICE CONTROL", c("Service Control", "Check + report", "cloudapis")),
      g("PRODUCER BACKEND", c("Cloud Run", "API implementation"), c("GKE", "API implementation")),
      operate()),
    b("Quota and usage enforcement", "Evaluate consumer identity and quota before backend work, then report usage so the producer can operate the API as a managed service.", "Service Control check-report pattern",
      g("REQUEST", c("API consumer", "Service request", "user")),
      g("CHECK", c("Service Control", "Quota + auth context", "cloudapis")),
      g("BACKEND", c("Producer service", "Business logic", "server")),
      g("REPORT", c("Service Control", "Usage telemetry", "cloudapis")),
      releaseGovernance())
  ],
  "software-supply-chain-security": [
    b("Trusted software delivery chain", "Carry review, provenance, vulnerability findings and admission policy with the artifact from source to runtime instead of relying on scanning alone.", "Google Cloud software supply chain security pattern",
      g("SOURCE", c("Secure Source Manager", "Reviewed revision")),
      g("TRUSTED BUILD", c("Cloud Build", "Provenance")),
      g("ARTIFACT SECURITY", c("Artifact Registry", "Immutable digest"), c("Artifact Analysis", "Vulnerability findings")),
      g("ADMISSION / RUNTIME", c("Binary Authorization", "Policy gate"), c("GKE", "Trusted workload")),
      operate()),
    b("Provenance-backed deployment", "Verify that a deployable digest came from the approved source and builder before Binary Authorization admits it to production.", "SLSA-aligned Google Cloud provenance pattern",
      g("SOURCE IDENTITY", c("Developer Connect", "Trusted repository")),
      g("BUILD EVIDENCE", c("Cloud Build", "Signed provenance")),
      g("ARTIFACT", c("Artifact Registry", "Digest + metadata")),
      g("POLICY", c("Binary Authorization", "Attestation policy")),
      releaseGovernance())
  ],
  "workflows": [
    b("Durable serverless orchestration", "Coordinate multiple Google Cloud and HTTP APIs with durable execution state, retries and branching without keeping application compute running between steps.", "Google Cloud Workflows orchestration pattern",
      g("TRIGGERS", c("API caller", "Execution request", "user"), c("Eventarc", "Event trigger"), c("Cloud Scheduler", "Timed trigger")),
      g("ORCHESTRATION", c("Workflows", "State + retries")),
      g("SERVICE CALLS", c("Cloud Run", "Business API"), c("Google Cloud APIs", "Managed services", "cloudapis")),
      g("STATE / RESULT", c("Cloud Storage", "Durable output"), c("BigQuery", "Analytical result")),
      operate()),
    b("Human approval callback", "Pause a durable workflow for an external approval and resume from a callback without holding a compute instance open.", "Workflows callback approval pattern",
      g("REQUEST", c("Business application", "Start process", "app")),
      g("WORKFLOW", c("Workflows", "Wait for callback")),
      g("APPROVAL", c("Approver", "External decision", "user")),
      g("CONTINUE", c("Cloud Run", "Approved action"), c("Google Cloud APIs", "Managed action", "cloudapis")),
      releaseGovernance())
  ]
};
