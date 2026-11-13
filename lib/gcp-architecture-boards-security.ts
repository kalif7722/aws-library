import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const evidence = () => g("OPERATE & GOVERN", c("Cloud Logging", "Security evidence"), c("Cloud Audit Logs", "Admin audit"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string, iconLabel: string = service): GcpArchitectureBoard => b(
  `Governed ${service} production`,
  `Separate ${service} policy administration, runtime use and evidence review so control changes cannot silently bypass the protection they are meant to enforce.`,
  `${service} governance pattern`,
  g("SCOPE", c("Resource hierarchy", "Org / folder / project", "Resource Manager")),
  g("ADMINISTRATION", c("IAM controls", "Separated roles", "IAM"), c(service, "Versioned policy", iconLabel)),
  g("CONTROL", c(service, role, iconLabel)),
  g("VALIDATION", c("Security review", "Allow / deny / failure test", "security")),
  g("EVIDENCE", c("Cloud Audit Logs", "Policy changes"), c("Cloud Logging", "Control outcomes"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string, iconLabel: string = service): GcpArchitectureBoard[] => [primary, governed(service, role, iconLabel)];

export const gcpSecurityArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "access-context-manager": pair(
    b("Context-aware access decision", "Evaluate identity, device and network context before IAM and service-perimeter policy allows a request to reach a protected Google Cloud API.", "Google Cloud context-aware access pattern",
      g("USER / DEVICE", c("Workforce user", "Identity + device", "user"), c("Cloud Identity", "Managed identity")),
      g("CONTEXT", c("Access Context Manager", "Access-level evaluation")),
      g("AUTHORIZATION", c("IAM", "Resource permission"), c("VPC Service Controls", "Service perimeter")),
      g("PROTECTED SERVICE", c("BigQuery", "Sensitive data"), c("Cloud Storage", "Protected objects")), evidence()),
    "Access Context Manager", "Context-aware access levels"),
  "access-transparency": pair(
    b("Google personnel access evidence", "Record supported Google personnel access to customer content, centralize the transparency records and retain them for independent review.", "Google Cloud Access Transparency audit pattern",
      g("GOOGLE ACCESS", c("Google personnel", "Supported support / ops access", "user")),
      g("TRANSPARENCY", c("Access Transparency", "Reason + resource event")),
      g("LOG PIPELINE", c("Cloud Logging", "Transparency records")),
      g("REVIEW / EXPORT", c("BigQuery", "Long-term analysis"), c("Security team", "Independent review", "user")), evidence()),
    "Access Transparency", "Google access evidence"),
  "advisory-notifications": pair(
    b("Security advisory response", "Route a Google security advisory to the correct asset owners, assess affected resources and retain remediation evidence instead of treating notification as automatic patching.", "Google Cloud Advisory Notifications response pattern",
      g("ADVISORY SOURCE", c("Google advisory", "Security notice", "security")),
      g("NOTIFICATION", c("Advisory Notifications", "Targeted organization alert")),
      g("IMPACT ASSESSMENT", c("Cloud Asset Inventory", "Affected resources"), c("Security Command Center", "Security context")),
      g("REMEDIATION", c("Service owners", "Patch / mitigate", "user")), evidence()),
    "Advisory Notifications", "Targeted security advisories"),
  "assured-oss": pair(
    b("Curated open-source dependency path", "Consume continuously tested open-source packages from a curated source, build applications from pinned versions and retain provenance and vulnerability context through delivery.", "Google Cloud Assured OSS supply-chain pattern",
      g("UPSTREAM OSS", c("Open-source packages", "Source dependencies", "internet")),
      g("CURATION", c("Assured OSS", "Google build + testing")),
      g("APPLICATION BUILD", c("Cloud Build", "Pinned dependencies")),
      g("ARTIFACT SECURITY", c("Artifact Registry", "Built artifact"), c("Artifact Analysis", "Vulnerability findings")), evidence()),
    "Assured OSS", "Curated open-source packages"),
  "assured-workloads": pair(
    b("Regulated workload landing zone", "Place regulated resources inside an Assured Workloads folder so location, organization policy and supported compliance controls are applied before applications are deployed.", "Google Cloud Assured Workloads regulated landing-zone pattern",
      g("COMPLIANCE REQUIREMENT", c("Regulated workload", "Required control regime", "security")),
      g("CONTROL PACKAGE", c("Assured Workloads", "Compliance-oriented folder")),
      g("GUARDRAILS", c("Organization Policy", "Location / service controls"), c("Cloud KMS", "Key controls")),
      g("WORKLOAD SERVICES", c("Compute Engine", "Regulated compute"), c("Cloud Storage", "Regulated data")), evidence()),
    "Assured Workloads", "Compliance control package"),
  "audit-manager": pair(
    b("Automated compliance evidence collection", "Map cloud resources and logs to a supported framework, assess control evidence and route exceptions to owners before generating an audit-ready report.", "Google Cloud Audit Manager evidence pattern",
      g("FRAMEWORK", c("Compliance framework", "Control requirements", "file")),
      g("EVIDENCE SOURCES", c("Cloud Asset Inventory", "Resource state"), c("Cloud Audit Logs", "Activity evidence")),
      g("ASSESSMENT", c("Audit Manager", "Control evaluation")),
      g("REPORT / EXCEPTIONS", c("Audit report", "Evidence package", "file"), c("Control owners", "Exception review", "user")), evidence()),
    "Audit Manager", "Compliance evidence assessment"),
  "binary-authorization": pair(
    b("Trusted container admission", "Build an immutable image, attach provenance or attestations and let Binary Authorization admit only policy-compliant digests to the Kubernetes runtime.", "Google Cloud Binary Authorization admission pattern",
      g("SOURCE / BUILD", c("Secure Source Manager", "Reviewed source"), c("Cloud Build", "Trusted build")),
      g("ARTIFACT", c("Artifact Registry", "Immutable digest"), c("Artifact Analysis", "Vulnerability context")),
      g("ADMISSION POLICY", c("Binary Authorization", "Attestation + policy")),
      g("RUNTIME", c("GKE", "Admitted workload")), evidence()),
    "Binary Authorization", "Container admission policy"),
  "ca-service": pair(
    b("Private PKI certificate issuance", "Validate workload identity, issue certificates from a governed private CA hierarchy and use short-lived certificates for service-to-service TLS.", "Google Cloud Certificate Authority Service private PKI pattern",
      g("IDENTITY", c("Workload / device", "Validated identity", "user")),
      g("PRIVATE CA", c("CA Service", "CA pool + issuance policy")),
      g("CERTIFICATES", c("Private certificate", "Short-lived credential", "security")),
      g("MTLS SERVICES", c("GKE", "Workload endpoint"), c("Cloud Service Mesh", "mTLS traffic")), evidence()),
    "CA Service", "Managed private certificate authority"),
  "certificate-manager": pair(
    b("Managed TLS at global load balancer", "Authorize a domain, issue or import certificates, map them to the HTTPS frontend and renew them without coupling certificate lifecycle to the backend workload.", "Google Cloud Certificate Manager HTTPS pattern",
      g("DOMAIN", c("Cloud DNS", "DNS authorization")),
      g("CERTIFICATE LIFECYCLE", c("Certificate Manager", "Issue / import / map")),
      g("TLS FRONTEND", c("Cloud Load Balancing", "HTTPS termination")),
      g("BACKENDS", c("Cloud Run", "Application"), c("GKE", "Service backend")), evidence()),
    "Certificate Manager", "Serving certificate lifecycle"),
  "chrome-enterprise-premium": pair(
    b("Zero-trust workforce access", "Evaluate user identity, browser and device posture before allowing access to SaaS or private applications, then feed threat and access telemetry into operations.", "Google Cloud Chrome Enterprise Premium zero-trust pattern",
      g("USER / BROWSER", c("Workforce user", "Managed browser / device", "user")),
      g("IDENTITY / POSTURE", c("Cloud Identity", "User identity"), c("Access Context Manager", "Context signals")),
      g("ZERO-TRUST CONTROL", c("Chrome Enterprise Premium", "Access + threat policy")),
      g("APPLICATIONS", c("SaaS application", "Enterprise SaaS", "internet"), c("Private application", "Protected resource", "server")), evidence()),
    "Chrome Enterprise Premium", "Workforce zero-trust controls"),
  "cloud-asset-inventory": pair(
    b("Cloud asset inventory and change feed", "Collect resource and IAM metadata centrally, query historical state and publish asset changes to downstream governance or security automation.", "Google Cloud Cloud Asset Inventory governance pattern",
      g("RESOURCE CHANGES", c("Google Cloud resources", "Assets + IAM changes", "Google Cloud")),
      g("INVENTORY", c("Cloud Asset Inventory", "Current + historical state")),
      g("EXPORT / FEED", c("Pub/Sub", "Asset change feed"), c("BigQuery", "Asset export")),
      g("CONSUMERS", c("Security Command Center", "Security context"), c("Governance team", "Inventory analysis", "user")), evidence()),
    "Cloud Asset Inventory", "Asset metadata + history"),
  "cloud-kms": pair(
    b("Customer-managed encryption keys", "Keep cryptographic key operations inside Cloud KMS while applications and managed data services reference the key without receiving raw key material.", "Google Cloud Cloud KMS CMEK pattern",
      g("APPLICATION / SERVICE", c("Workload identity", "Authorized crypto caller", "user")),
      g("KEY SERVICE", c("Cloud KMS", "Encrypt / sign / MAC")),
      g("PROTECTED DATA", c("Cloud Storage", "CMEK objects"), c("BigQuery", "CMEK datasets")),
      g("KEY LIFECYCLE", c("Key rotation", "Version lifecycle", "security")), evidence()),
    "Cloud KMS", "Managed cryptographic keys"),
  "fraud-defense": pair(
    b("Transaction fraud decision", "Assess a user or transaction event with Google risk intelligence, combine the risk result with business policy and choose allow, review or block in the application.", "Google Cloud Fraud Defense transaction pattern",
      g("USER EVENT", c("Customer interaction", "Transaction / account event", "user")),
      g("RISK ASSESSMENT", c("Fraud Defense", "Risk signals + score")),
      g("BUSINESS POLICY", c("Application rules", "Context + thresholds", "app")),
      g("DECISION", c("Allow / review / block", "Business outcome", "security")), evidence()),
    "Fraud Defense", "Fraud risk assessment"),
  "google-secops": pair(
    b("Cloud-native SIEM and SOAR", "Normalize security telemetry into UDM, evaluate detection rules, investigate prioritized signals and automate controlled response through playbooks.", "Google SecOps detection and response pattern",
      g("TELEMETRY", c("Cloud Logging", "Google Cloud logs"), c("Endpoint / network", "External telemetry", "network")),
      g("INGEST / NORMALIZE", c("Google SecOps", "Parsers + UDM")),
      g("DETECTION", c("Google SecOps", "Rules + detections")),
      g("RESPONSE", c("Cases", "Investigation", "Google SecOps"), c("SOAR playbook", "Controlled automation", "Google SecOps")), evidence()),
    "Google SecOps", "SIEM + SOAR platform"),
  "identity-and-access-management": pair(
    b("Hierarchical resource authorization", "Authenticate a principal, evaluate inherited allow/deny policy at the resource hierarchy and record the resulting API action for audit.", "Google Cloud IAM authorization pattern",
      g("PRINCIPAL", c("User / workload", "Authenticated identity", "user")),
      g("RESOURCE HIERARCHY", c("Resource Manager", "Org / folder / project")),
      g("AUTHORIZATION", c("Identity and Access Management", "Roles + policies", "IAM")),
      g("RESOURCE API", c("Google Cloud APIs", "Allowed operation", "cloudapis")), evidence()),
    "Identity and Access Management", "Resource authorization", "IAM"),
  "identity-aware-proxy": pair(
    b("Identity-aware application access", "Authenticate users with Google identity, evaluate IAP authorization and forward signed identity assertions only to backends that cannot be reached around the proxy.", "Google Cloud IAP protected application pattern",
      g("USER", c("Workforce user", "Browser / TCP client", "user")),
      g("IDENTITY / CONTEXT", c("Cloud Identity", "Authentication"), c("Access Context Manager", "Context policy")),
      g("ACCESS PROXY", c("Identity-Aware Proxy", "Authorization + assertion")),
      g("APPLICATION", c("Compute Engine", "Protected backend"), c("GKE", "Protected service")), evidence()),
    "Identity-Aware Proxy", "Identity-aware app protection"),
  "model-armor": pair(
    b("Protected generative-AI request path", "Screen prompts before model invocation and responses before delivery so prompt-injection, sensitive-data and safety controls sit on both sides of the model call.", "Google Cloud Model Armor GenAI protection pattern",
      g("USER / APPLICATION", c("GenAI application", "Prompt / response", "app")),
      g("INPUT SCREENING", c("Model Armor", "Prompt filters")),
      g("MODEL", c("Vertex AI", "Gemini / model endpoint")),
      g("OUTPUT SCREENING", c("Model Armor", "Response filters")), evidence()),
    "Model Armor", "GenAI prompt / response screening"),
  "policy-intelligence": pair(
    b("Least-privilege policy analysis", "Combine IAM policy and access-usage evidence, analyze current or proposed access and route recommendations to human reviewers before changing authorization.", "Google Cloud Policy Intelligence least-privilege pattern",
      g("POLICY / USAGE", c("IAM", "Current policies"), c("Cloud Asset Inventory", "Resource / IAM context")),
      g("ANALYSIS", c("Policy Intelligence", "Analyzer + recommender")),
      g("REVIEW", c("Security administrator", "Validate rare access", "user")),
      g("POLICY CHANGE", c("IAM", "Reviewed permission update")), evidence()),
    "Policy Intelligence", "IAM analysis + recommendations"),
  "resource-manager": pair(
    b("Enterprise resource hierarchy", "Place projects under organization and folders so IAM and organization policy inherit predictably before workloads are created.", "Google Cloud Resource Manager enterprise hierarchy pattern",
      g("ENTERPRISE", c("Organization", "Top-level boundary", "Resource Manager")),
      g("HIERARCHY", c("Folders", "Business / environment scope", "Resource Manager"), c("Projects", "Workload boundary", "Resource Manager")),
      g("INHERITED CONTROLS", c("IAM", "Role inheritance"), c("Organization Policy", "Resource guardrails")),
      g("WORKLOADS", c("Google Cloud resources", "Project resources", "Google Cloud")), evidence()),
    "Resource Manager", "Organization / folder / project hierarchy"),
  "secret-manager": pair(
    b("Runtime secret delivery", "Store versioned secrets centrally, grant only the runtime identity access to the required version and rotate without baking credentials into images or configuration files.", "Google Cloud Secret Manager runtime pattern",
      g("SECRET PRODUCER", c("Security / CI team", "Create secret version", "user")),
      g("SECRET STORE", c("Secret Manager", "Versioned encrypted secret")),
      g("RUNTIME IDENTITY", c("Workload Identity", "Short-lived access", "IAM")),
      g("APPLICATION", c("Cloud Run", "In-memory secret use"), c("GKE", "Workload secret use")), evidence()),
    "Secret Manager", "Versioned secret storage"),
  "security-command-center": pair(
    b("Cloud security findings hub", "Combine asset context with native and partner detectors, prioritize findings centrally and route high-impact issues into investigation and remediation workflows.", "Google Cloud Security Command Center operations pattern",
      g("ASSETS / TELEMETRY", c("Cloud Asset Inventory", "Asset context"), c("Google Cloud services", "Security signals", "Google Cloud")),
      g("DETECTORS", c("Security Command Center", "Posture + threat sources")),
      g("FINDINGS", c("Security Command Center", "Prioritized findings")),
      g("RESPONSE", c("Google SecOps", "Investigation / SOAR"), c("Operations team", "Remediation", "user")), evidence()),
    "Security Command Center", "Security posture + findings"),
  "sensitive-data-protection": pair(
    b("Sensitive-data discovery and de-identification", "Inspect source data for configured infoTypes, classify findings and apply redaction or tokenization before the governed output is shared downstream.", "Google Cloud Sensitive Data Protection de-identification pattern",
      g("SOURCE DATA", c("Cloud Storage", "Files / objects"), c("BigQuery", "Tables")),
      g("INSPECTION", c("Sensitive Data Protection", "InfoType detection")),
      g("TRANSFORMATION", c("De-identification", "Redact / tokenize", "Sensitive Data Protection")),
      g("GOVERNED OUTPUT", c("BigQuery", "Protected dataset"), c("Cloud Storage", "Protected objects")), evidence()),
    "Sensitive Data Protection", "Discover + de-identify sensitive data"),
  "service-health": pair(
    b("Cloud service disruption response", "Correlate a Google service event with the products and locations used by the workload, then drive incident response from external dependency evidence plus workload-specific health.", "Google Cloud Service Health incident pattern",
      g("GOOGLE EVENT", c("Google Cloud service event", "Disruption / maintenance", "cloud")),
      g("IMPACT SIGNAL", c("Service Health", "Personalized impact")),
      g("WORKLOAD CONTEXT", c("Cloud Monitoring", "Application SLOs"), c("Cloud Asset Inventory", "Affected assets")),
      g("INCIDENT RESPONSE", c("SRE team", "Mitigate / fail over", "user")), evidence()),
    "Service Health", "Service disruption information"),
  "sovereign-controls-by-partners": pair(
    b("Partner-operated sovereign workload", "Place a regulated workload inside a partner-operated sovereignty boundary with locally governed access and key controls while retaining Google Cloud service capabilities.", "Google Cloud Sovereign Controls by Partners pattern",
      g("REGULATED WORKLOAD", c("Sensitive application", "Sovereignty scope", "app")),
      g("SOVEREIGN CONTROL", c("Sovereign Controls by Partners", "Partner-operated boundary")),
      g("KEY / ACCESS CONTROL", c("Cloud KMS", "Governed keys"), c("IAM", "Controlled access")),
      g("GOOGLE CLOUD SERVICES", c("Compute Engine", "Compute"), c("Cloud Storage", "Data")), evidence()),
    "Sovereign Controls by Partners", "Partner sovereignty controls"),
  "spectrum-access-system": pair(
    b("CBRS spectrum coordination", "Register radio devices, request spectrum grants and keep the device authorized through heartbeat coordination until the grant changes or is relinquished.", "Google Cloud Spectrum Access System CBRS pattern",
      g("RADIO DEVICE", c("CBSD", "Registered radio", "network")),
      g("REGISTRATION", c("Spectrum Access System", "Device + location validation")),
      g("SPECTRUM GRANT", c("Spectrum Access System", "Channel / power grant")),
      g("RADIO OPERATION", c("Private wireless network", "Authorized spectrum use", "network")), evidence()),
    "Spectrum Access System", "CBRS spectrum coordination"),
  "unified-maintenance": pair(
    b("Coordinated maintenance preparation", "Map provider maintenance events to affected resources, notify workload owners and prepare redundancy or controlled downtime before the maintenance window begins.", "Google Cloud Unified Maintenance operations pattern",
      g("PROVIDER EVENT", c("Google maintenance", "Planned event", "cloud")),
      g("RESOURCE MAPPING", c("Unified Maintenance", "Affected-resource scope")),
      g("CONTROL / NOTIFY", c("Unified Maintenance", "Schedule + notification")),
      g("WORKLOAD PREP", c("Operations team", "Drain / fail over / validate", "user")), evidence()),
    "Unified Maintenance", "Maintenance visibility + controls"),
  "web-risk": pair(
    b("Malicious URL protection", "Check a canonicalized URL against Google threat lists and apply the application’s warning or blocking policy before a user follows a dangerous destination.", "Google Cloud Web Risk URL-check pattern",
      g("URL SOURCE", c("User / content", "Candidate URL", "user")),
      g("THREAT LOOKUP", c("Web Risk", "Malware / social engineering verdict")),
      g("APPLICATION POLICY", c("Application", "Allow / warn / block", "app")),
      g("USER EXPERIENCE", c("Browser / client", "Protected navigation", "app")), evidence()),
    "Web Risk", "Malicious URL reputation")
};
