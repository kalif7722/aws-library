import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Health / limits / alerts"), c("Cloud Logging", "Operational evidence"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Separate ${service} administration, consuming identities and audit review so shared platform controls remain independently governed from application teams.`, `${service} governance pattern`,
  g("SCOPE", c("Resource Manager", "Org / folder / project")),
  g("ADMINISTRATION", c("IAM controls", "Separated roles", "IAM"), c(service, "Versioned configuration", service)),
  g("SHARED CAPABILITY", c(service, role, service)),
  g("VALIDATION", c("Cloud Monitoring", "Health / policy outcome")),
  g("AUDIT", c("Cloud Audit Logs", "Admin evidence"), c("Cloud Logging", "Runtime evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpCrossProductArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "access-approval": pair(
    b("Customer-approved privileged access", "Require a customer approver to explicitly allow a supported Google personnel access request before the requested customer-data access can proceed, then retain independent evidence of what happened.", "Google Cloud Access Approval privileged-access pattern",
      g("ACCESS REQUEST", c("Google personnel", "Supported access need", "user")),
      g("APPROVAL CONTROL", c("Access Approval", "Signed request + reason")),
      g("CUSTOMER DECISION", c("Authorized approver", "Approve / dismiss", "user")),
      g("SUPPORTED ACCESS", c("Google Cloud service", "Time-bound access", "Google Cloud")),
      g("EVIDENCE", c("Access Transparency", "Google access log"), c("Cloud Audit Logs", "Customer admin audit"))), "Access Approval", "Customer-controlled Google access"),
  "cloud-billing": pair(
    b("FinOps billing and cost analytics", "Link workload projects to a billing account, export detailed cost data into BigQuery and turn budget thresholds and cost allocation into actionable FinOps controls.", "Google Cloud Cloud Billing FinOps pattern",
      g("WORKLOADS", c("Google Cloud projects", "Usage + labels", "Resource Manager")),
      g("BILLING ACCOUNT", c("Cloud Billing", "Charges + pricing")),
      g("COST DATA", c("BigQuery", "Detailed billing export")),
      g("FINOPS", c("Budgets & alerts", "Spend thresholds", "Cloud Billing"), c("Looker", "Cost dashboards")),
      ops()), "Cloud Billing", "Billing + cost management"),
  "cloud-hub": pair(
    b("Application-centric operations hub", "Model business applications across projects, aggregate operational and security context around those applications and give owners one place to prioritize health, cost and reliability actions.", "Google Cloud Cloud Hub application operations pattern",
      g("APPLICATION MODEL", c("App Hub", "Services + workloads")),
      g("RESOURCE SIGNALS", c("Cloud Monitoring", "Health / SLOs"), c("Security Command Center", "Security findings")),
      g("OPERATIONS HUB", c("Cloud Hub", "Application-centric insights")),
      g("OWNERS", c("Application teams", "Prioritize actions", "user")),
      g("CHANGE / EVIDENCE", c("Recommender", "Optimization advice"), c("Cloud Audit Logs", "Change audit"))), "Cloud Hub", "Application operations overview"),
  "cloud-identity": pair(
    b("Workforce identity foundation", "Provision workforce users and groups into Cloud Identity, federate corporate authentication and use the same managed identity for Google Cloud and configured SaaS applications.", "Google Cloud Cloud Identity workforce pattern",
      g("IDENTITY SOURCE", c("HR / corporate directory", "Users + groups", "database")),
      g("WORKFORCE IDENTITY", c("Cloud Identity", "Accounts + groups + devices")),
      g("FEDERATION / SSO", c("Corporate IdP", "SAML / OIDC", "security"), c("Context-Aware Access", "Device / context", "Access Context Manager")),
      g("APPLICATIONS", c("Google Cloud", "Cloud resources"), c("SaaS applications", "SSO targets", "internet")),
      ops()), "Cloud Identity", "Workforce identity + device management"),
  "cloud-marketplace": pair(
    b("Governed cloud software procurement", "Let approved buyers discover a marketplace solution, constrain choices through a private catalog, deploy the product into the correct runtime and consolidate commercial charges through Cloud Billing.", "Google Cloud Marketplace governed procurement pattern",
      g("BUYERS", c("Platform / procurement team", "Approved purchase", "user")),
      g("CATALOG", c("Cloud Marketplace", "Google / partner solutions"), c("Private Marketplace", "Approved products", "Cloud Marketplace")),
      g("DEPLOYMENT", c("GKE", "Kubernetes solution"), c("Compute Engine", "VM solution"), c("Vendor SaaS", "External service", "internet")),
      g("COMMERCIALS", c("Cloud Billing", "Consolidated charges")),
      ops()), "Cloud Marketplace", "Procure + deploy cloud solutions"),
  "cloud-quotas": pair(
    b("Proactive service quota management", "Observe current quota usage, set desired quota preferences before a growth event, request supported increases and alert before the workload reaches an operational limit.", "Google Cloud Cloud Quotas capacity pattern",
      g("WORKLOAD DEMAND", c("Google Cloud services", "Resource / API usage", "Google Cloud")),
      g("QUOTA VIEW", c("Cloud Quotas", "Usage + effective limits")),
      g("CAPACITY CHANGE", c("Quota preference", "Desired limit", "Cloud Quotas"), c("Increase request", "Review / automation", "Cloud Quotas")),
      g("ALERTING", c("Cloud Monitoring", "Quota threshold alerts")),
      g("WORKLOAD", c("Application platform", "Scaled capacity", "compute"))), "Cloud Quotas", "Quota visibility + adjustment"),
  "config-connector": pair(
    b("Kubernetes-native Google Cloud infrastructure", "Store desired Google Cloud resources as Kubernetes custom resources, reconcile them through Config Connector and continuously surface cloud API state back into the Kubernetes control plane.", "Google Cloud Config Connector reconciliation pattern",
      g("DESIRED STATE", c("Git / YAML", "Reviewed manifests", "file")),
      g("KUBERNETES API", c("GKE / Config Controller", "Custom resources", "GKE")),
      g("RECONCILER", c("Config Connector", "Desired-state controller")),
      g("GOOGLE CLOUD", c("Google Cloud APIs", "Resource operations", "cloudapis"), c("Cloud resources", "Managed state", "Google Cloud")),
      ops()), "Config Connector", "Kubernetes-native cloud resources"),
  "gcloud-cli": pair(
    b("Audited command-line administration", "Authenticate an operator or automation identity, select an explicit project and configuration, call Google Cloud APIs through gcloud and retain API-level audit evidence for every privileged change.", "Google Cloud gcloud CLI administration pattern",
      g("OPERATOR / AUTOMATION", c("Engineer / CI", "Human or workload identity", "user")),
      g("CLI CONTEXT", c("gcloud CLI", "Account + project + region")),
      g("GOOGLE CLOUD API", c("Google Cloud APIs", "Management request", "cloudapis")),
      g("TARGET RESOURCE", c("Google Cloud resources", "Create / inspect / update", "Google Cloud")),
      g("AUDIT", c("Cloud Audit Logs", "Admin Activity"), c("IAM controls", "Impersonation / roles", "IAM"))), "gcloud CLI", "Google Cloud command-line control"),
  "identity-platform": pair(
    b("Customer identity for web and mobile", "Authenticate application users through local or federated providers, enforce MFA where required and pass validated identity tokens to a separately authorized application backend.", "Google Cloud Identity Platform application-auth pattern",
      g("APPLICATION USERS", c("Web / mobile", "Sign-up / sign-in", "user")),
      g("IDENTITY PROVIDERS", c("OIDC / SAML / social", "Federated identity", "security")),
      g("CUSTOMER IDENTITY", c("Identity Platform", "Authentication + MFA")),
      g("APPLICATION BACKEND", c("Cloud Run", "Validate ID token"), c("Firestore", "User application data")),
      ops()), "Identity Platform", "Customer identity and authentication"),
  "infra-manager": pair(
    b("Managed Terraform deployment", "Keep Terraform configuration in a reviewed source repository, let Infrastructure Manager plan and apply it with a dedicated deployment identity and preserve revision/state evidence independently from the deployed resources.", "Google Cloud Infrastructure Manager Terraform pattern",
      g("BLUEPRINT SOURCE", c("Secure Source Manager", "Terraform configuration"), c("Cloud Storage", "Blueprint archive")),
      g("PLAN / APPLY", c("Infra Manager", "Managed Terraform execution")),
      g("DEPLOYMENT IDENTITY", c("Service account", "Scoped resource roles", "IAM")),
      g("CLOUD RESOURCES", c("Google Cloud", "Provisioned infrastructure")),
      g("OPERATE", c("Cloud Audit Logs", "Deployment changes"), c("Cloud Logging", "Execution logs"))), "Infra Manager", "Managed Terraform execution"),
  "managed-microsoft-ad": pair(
    b("Managed Active Directory for Windows workloads", "Run a managed Microsoft AD domain inside a private VPC, establish trust with an existing corporate forest where required and let Windows workloads use domain authentication without operating domain controllers.", "Google Cloud Managed Microsoft AD hybrid identity pattern",
      g("CORPORATE DIRECTORY", c("On-premises AD", "Existing identities", "database")),
      g("PRIVATE CONNECTIVITY", c("Cloud VPN", "Encrypted hybrid path"), c("Cloud Interconnect", "Private circuit")),
      g("MANAGED DOMAIN", c("Managed Microsoft AD", "Managed domain controllers")),
      g("DOMAIN WORKLOADS", c("Compute Engine", "Windows VMs"), c("NetApp Volumes", "SMB file services")),
      ops()), "Managed Microsoft AD", "Managed Microsoft Active Directory"),
  "recommender": pair(
    b("Optimization recommendation workflow", "Analyze resource configuration and usage, prioritize recommendations by impact and confidence, route them to the correct owner and validate service health after the approved change.", "Google Cloud Recommender optimization pattern",
      g("RESOURCE / USAGE", c("Google Cloud resources", "Configuration + utilization", "Google Cloud")),
      g("ANALYSIS", c("Recommender", "Insights + recommendations")),
      g("REVIEW", c("Platform / FinOps team", "Approve / dismiss", "user")),
      g("CHANGE", c("Infrastructure Manager", "Controlled remediation", "Infra Manager"), c("gcloud CLI", "Targeted change")),
      g("VALIDATION", c("Cloud Monitoring", "Post-change SLO"), c("Cloud Audit Logs", "Change evidence"))), "Recommender", "Optimization insights + recommendations"),
  "service-catalog": pair(
    b("Curated self-service cloud catalog", "Publish approved solutions to a service catalog so application teams can choose supported building blocks and launch them through governed deployment paths instead of creating bespoke infrastructure.", "Google Cloud Service Catalog self-service pattern",
      g("PLATFORM TEAM", c("Cloud architects", "Approve solutions", "user")),
      g("CATALOG", c("Service Catalog", "Curated solutions")),
      g("CONSUMERS", c("Application teams", "Self-service selection", "user")),
      g("DEPLOYMENT", c("Infrastructure Manager", "Provision infrastructure", "Infra Manager"), c("Cloud Marketplace", "Approved software")),
      ops()), "Service Catalog", "Curated self-service solutions"),
  "service-usage": pair(
    b("Project API enablement control", "Enable only the Google Cloud APIs a project actually needs, let workloads consume those service endpoints under IAM and quota controls and retain enablement and API activity in audit logs.", "Google Cloud Service Usage API enablement pattern",
      g("PROJECT", c("Google Cloud project", "Workload boundary", "Resource Manager")),
      g("API ENABLEMENT", c("Service Usage", "Enable / disable services")),
      g("QUOTA / AUTH", c("Cloud Quotas", "Service limits"), c("IAM", "Caller permissions")),
      g("GOOGLE APIS", c("Google Cloud APIs", "Enabled services", "cloudapis")),
      g("AUDIT", c("Cloud Audit Logs", "Enablement + API evidence"), c("Cloud Monitoring", "Usage / errors"))), "Service Usage", "Google Cloud API enablement")
};
