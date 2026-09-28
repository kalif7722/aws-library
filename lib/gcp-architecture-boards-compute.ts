import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Metrics / alerts"), c("Cloud Logging", "Logs / audit"), c("IAM controls", "Least privilege", "IAM"));
const auditOps = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Health / capacity"), c("Cloud Audit Logs", "Admin evidence"), c("IAM controls", "Separation of duties", "IAM"));

export const gcpComputeArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "ai-hypercomputer": [
    b("Distributed AI training fabric", "Feed large training datasets through high-throughput storage into tightly coupled GPU or TPU workers while checkpointing models outside the accelerator fleet.", "Google Cloud AI Hypercomputer distributed training pattern",
      g("TRAINING DATA", c("Cloud Storage", "Datasets / objects"), c("Parallelstore", "High-throughput files")),
      g("AI INFRASTRUCTURE", c("AI Hypercomputer", "Integrated AI system")),
      g("ACCELERATOR FABRIC", c("GPU / TPU cluster", "Topology-aware workers", "compute")),
      g("CHECKPOINTS / MODELS", c("Cloud Storage", "Durable checkpoints"), c("Artifact Registry", "Model artifacts")),
      ops()),
    b("Managed AI cluster operations", "Coordinate accelerator capacity, topology and recovery as one system so storage, network and compute are sized for the same distributed job.", "AI Hypercomputer governed cluster pattern",
      g("BLUEPRINT", c("Cluster Director", "Cluster topology"), c("Capacity Planner", "Capacity forecast")),
      g("AI SYSTEM", c("AI Hypercomputer", "Compute + network + storage")),
      g("WORKLOAD", c("Distributed training job", "Multi-node execution", "compute")),
      g("RECOVERY", c("Cloud Storage", "Checkpoint restore")),
      auditOps())
  ],
  "batch": [
    b("Managed batch data processing", "Submit a job, let Batch provision ephemeral Compute Engine workers, write durable results and remove the worker fleet after completion.", "Google Cloud Batch managed worker pattern",
      g("INPUT", c("Cloud Storage", "Input files"), c("Job submission", "Tasks / parameters", "user")),
      g("SCHEDULER", c("Batch", "Queue + placement")),
      g("WORKERS", c("Compute Engine", "Ephemeral workers")),
      g("RESULTS", c("Cloud Storage", "Output files"), c("BigQuery", "Analytical results")),
      ops()),
    b("GPU batch processing", "Provision accelerator-backed workers only for queued tasks, keep model/data artifacts external and release expensive GPU capacity when the job ends.", "Google Cloud Batch GPU workload pattern",
      g("TRIGGER", c("Cloud Scheduler", "Timed submission"), c("Pub/Sub", "Event submission")),
      g("JOB CONTROL", c("Batch", "Parallel tasks")),
      g("GPU WORKERS", c("Compute Engine", "GPU instances")),
      g("MODEL / DATA", c("Cloud Storage", "Models + outputs")),
      auditOps())
  ],
  "capacity-planner": [
    b("Compute capacity planning", "Turn historical resource demand into a forward plan for quotas and reservations before a growth event becomes a capacity incident.", "Google Cloud Capacity Planner reservation pattern",
      g("USAGE HISTORY", c("Compute Engine", "Historical demand"), c("Cloud Monitoring", "Utilization metrics")),
      g("FORECAST", c("Capacity Planner", "Demand scenarios")),
      g("CAPACITY ACTION", c("Reservations", "Committed capacity", "Compute Engine"), c("Cloud Quotas", "Limit planning")),
      g("WORKLOAD", c("Compute Engine", "Planned fleet")),
      ops()),
    b("AI accelerator capacity plan", "Forecast GPU or TPU demand, compare growth scenarios and reserve topology-aware capacity before scheduling large distributed workloads.", "Capacity Planner accelerator planning pattern",
      g("DEMAND", c("AI workloads", "Forecast demand", "compute")),
      g("PLANNING", c("Capacity Planner", "Scenario comparison")),
      g("QUOTA / RESERVATION", c("Cloud Quotas", "Quota headroom"), c("Reservations", "Accelerator capacity", "Compute Engine")),
      g("DEPLOYMENT", c("AI Hypercomputer", "Reserved AI system")),
      auditOps())
  ],
  "cluster-director": [
    b("Managed accelerator cluster", "Provision a topology-aware accelerator cluster with matched storage and networking, then schedule distributed jobs as a coordinated system.", "Google Cloud Cluster Director accelerator pattern",
      g("CLUSTER BLUEPRINT", c("Cluster Director", "Topology + node sets")),
      g("ACCELERATOR NODES", c("GPU / TPU workers", "Tightly coupled compute", "compute")),
      g("HIGH-SPEED DATA", c("Parallelstore", "Training files"), c("Cloud Storage", "Datasets / checkpoints")),
      g("DISTRIBUTED JOB", c("AI / HPC workload", "Multi-node execution", "compute")),
      ops()),
    b("Topology-aware recovery", "Detect unhealthy nodes or fabric placement and recover the cluster without losing durable training state.", "Cluster Director recovery pattern",
      g("WORKLOAD", c("Distributed job", "Running workload", "compute")),
      g("CLUSTER CONTROL", c("Cluster Director", "Node + topology health")),
      g("REPAIR", c("Replacement nodes", "Coordinated recovery", "Compute Engine")),
      g("DURABLE STATE", c("Cloud Storage", "Checkpoints")),
      auditOps())
  ],
  "cluster-toolkit": [
    b("Repeatable HPC cluster blueprint", "Describe an HPC or AI environment as a reusable blueprint, expand modules into Terraform and deploy the resulting compute, network and storage stack.", "Google Cloud Cluster Toolkit blueprint pattern",
      g("BLUEPRINT", c("YAML blueprint", "Modules + variables", "file")),
      g("CLUSTER TOOLING", c("Cluster Toolkit", "Expand architecture")),
      g("INFRASTRUCTURE AS CODE", c("Terraform", "Planned resources", "file")),
      g("HPC STACK", c("Compute Engine", "Worker nodes"), c("Parallelstore", "Shared storage")),
      ops()),
    b("Versioned cluster delivery", "Keep the blueprint in source control, validate generated infrastructure in CI and apply reviewed changes through a controlled deployment path.", "Cluster Toolkit CI delivery pattern",
      g("SOURCE", c("Secure Source Manager", "Versioned blueprint")),
      g("VALIDATION", c("Cloud Build", "Lint + plan")),
      g("BLUEPRINT", c("Cluster Toolkit", "Terraform generation")),
      g("DEPLOYMENT", c("Infrastructure Manager", "Managed apply", "Infra Manager")),
      auditOps())
  ],
  "compute-engine": [
    b("Highly available VM application", "Serve application traffic through a managed load balancer into a regional instance group while application state stays in managed data services.", "Google Cloud Compute Engine highly available application pattern",
      g("CLIENTS", c("Web / mobile", "Requests")),
      g("TRAFFIC ENTRY", c("Cloud Load Balancing", "Health-aware routing"), c("Cloud Armor", "Edge protection")),
      g("COMPUTE", c("Compute Engine", "Regional MIG instances")),
      g("APPLICATION STATE", c("Cloud SQL", "Relational state"), c("Cloud Storage", "Object data")),
      ops()),
    b("Stateful VM with protected data", "Run a stateful workload on hardened VMs, place persistent data on durable disks and protect recovery points independently from the instance lifecycle.", "Compute Engine stateful workload pattern",
      g("APPLICATION", c("Internal / external client", "Application traffic", "app")),
      g("VM RUNTIME", c("Shielded VMs", "Hardened Compute Engine")),
      g("PERSISTENT DATA", c("Persistent Disk", "Block storage")),
      g("PROTECTION", c("Backup and DR Service", "Recovery points"), c("Cloud Storage", "Export / archive")),
      auditOps())
  ],
  "container-optimized-os": [
    b("Immutable container VM host", "Pull a trusted container image onto a minimal Compute Engine host and replace the VM from an updated image instead of treating the host as a mutable server.", "Container-Optimized OS immutable host pattern",
      g("CONTAINER IMAGE", c("Artifact Registry", "Trusted image")),
      g("VM HOST", c("Container-Optimized OS", "Minimal container OS")),
      g("APPLICATION", c("Container workload", "Runtime process", "compute")),
      g("EXTERNAL STATE", c("Cloud Storage", "Objects"), c("Cloud SQL", "Database")),
      ops()),
    b("Managed instance group replacement", "Use an instance template and managed instance group so patched COS images roll out by replacing hosts rather than patching them in place.", "Container-Optimized OS managed replacement pattern",
      g("IMAGE", c("Container-Optimized OS", "Signed OS image")),
      g("TEMPLATE", c("Instance template", "Immutable config", "Compute Engine")),
      g("FLEET", c("Compute Engine", "Managed instance group")),
      g("ROLLOUT", c("Replacement VMs", "Rolling update", "Compute Engine")),
      auditOps())
  ],
  "oracle-on-google-cloud-compute": [
    b("Oracle database on Compute Engine", "Run certified Oracle software on private Compute Engine instances with high-performance block storage and separate backup/recovery controls.", "Google Cloud Oracle on Compute Engine pattern",
      g("APPLICATIONS", c("Enterprise applications", "SQL / listener traffic", "app")),
      g("PRIVATE NETWORK", c("VPC network", "Private database path", "VPC")),
      g("DATABASE COMPUTE", c("Compute Engine", "Oracle database VM")),
      g("DATABASE STORAGE", c("Hyperdisk", "Database volumes"), c("Cloud Storage", "Backup / archive")),
      ops()),
    b("Oracle primary and standby", "Separate database instances across failure domains and keep recovery data outside the VM so database HA is not confused with VM availability.", "Oracle Data Guard on Google Cloud pattern",
      g("APPLICATION", c("Application tier", "Database clients", "app")),
      g("PRIMARY", c("Compute Engine", "Oracle primary")),
      g("STANDBY", c("Compute Engine", "Oracle standby")),
      g("BACKUP", c("Cloud Storage", "Protected backups")),
      auditOps())
  ],
  "shielded-vms": [
    b("Trusted VM boot chain", "Verify firmware, bootloader and kernel state before a sensitive workload starts, then surface unexpected integrity changes to operations.", "Google Cloud Shielded VM trusted boot pattern",
      g("TRUSTED IMAGE", c("VM image", "Signed boot components", "file")),
      g("BOOT CONTROLS", c("Shielded VMs", "Secure Boot + vTPM")),
      g("WORKLOAD", c("Compute Engine", "Protected VM runtime")),
      g("INTEGRITY SIGNALS", c("Cloud Logging", "Integrity events")),
      ops()),
    b("Integrity incident response", "Treat an integrity-baseline change as a security signal, investigate the VM and replace compromised instances from a trusted image rather than normalizing an unexplained baseline.", "Shielded VM integrity monitoring pattern",
      g("DETECTION", c("Shielded VMs", "Integrity monitoring")),
      g("EVIDENCE", c("Cloud Logging", "Integrity event"), c("Cloud Audit Logs", "Config changes")),
      g("RESPONSE", c("Security Command Center", "Investigation workflow")),
      g("RECOVERY", c("Compute Engine", "Trusted replacement VM")),
      auditOps())
  ],
  "vm-manager": [
    b("Managed VM patch fleet", "Inventory a VM fleet, apply a controlled patch deployment during a maintenance window and verify reboot and compliance outcomes centrally.", "Google Cloud VM Manager patch management pattern",
      g("VM FLEET", c("Compute Engine", "Managed instances")),
      g("INVENTORY / POLICY", c("VM Manager", "OS inventory + policy")),
      g("PATCH ROLLOUT", c("Patch deployment", "Window + reboot", "VM Manager")),
      g("COMPLIANCE", c("VM Manager", "Compliance report")),
      ops()),
    b("OS policy compliance", "Continuously compare enrolled VMs against desired OS policy and separate compliance visibility from the permissions used to remediate drift.", "VM Manager OS policy pattern",
      g("AGENTS", c("OS Config agent", "Fleet telemetry", "VM Manager")),
      g("POLICY", c("VM Manager", "Desired OS state")),
      g("FINDINGS", c("Compliance report", "Drift / failures", "monitor")),
      g("REMEDIATION", c("Patch deployment", "Controlled change", "VM Manager")),
      auditOps())
  ],
  "vmware-engine": [
    b("Hybrid VMware extension", "Move or extend VMware workloads into a managed private cloud while preserving VMware operations and connecting application traffic to native Google Cloud services through VPC networking.", "Google Cloud VMware Engine HCX hybrid pattern",
      g("ON-PREMISES", c("VMware vSphere", "Existing workloads", "server")),
      g("MIGRATION", c("VMware HCX", "Mobility / extension", "VMware Engine")),
      g("PRIVATE CLOUD", c("VMware Engine", "Managed VMware SDDC")),
      g("GOOGLE CLOUD", c("VPC network", "Native connectivity", "VPC"), c("Cloud Storage", "Backup / data")),
      ops()),
    b("VMware disaster recovery topology", "Protect VMware workloads with independent backup and recovery controls and maintain redundant connectivity between the private cloud and the rest of the application estate.", "Google Cloud VMware Engine recovery pattern",
      g("PRIMARY SDDC", c("VMware Engine", "Production private cloud")),
      g("CONNECTIVITY", c("Cloud Interconnect", "Private hybrid path"), c("Cloud VPN", "Redundant path")),
      g("PROTECTION", c("Backup and DR Service", "Recovery points")),
      g("RECOVERY", c("VMware Engine", "Recovery capacity")),
      auditOps())
  ],
  "workload-manager": [
    b("Workload best-practice evaluation", "Inspect a specialized workload against Google Cloud configuration rules, turn failed checks into actionable findings and reevaluate after remediation.", "Google Cloud Workload Manager evaluation pattern",
      g("WORKLOAD", c("Google Cloud resources", "Evaluated environment", "Google Cloud")),
      g("EVALUATION", c("Workload Manager", "Workload-specific rules")),
      g("FINDINGS", c("Evaluation findings", "Failed checks", "monitor")),
      g("REMEDIATION", c("Platform team", "Configuration change", "user")),
      ops()),
    b("Governed remediation loop", "Keep evaluation permissions read-oriented, route findings to owners and verify each remediation with a fresh evaluation instead of treating a point-in-time pass as ongoing assurance.", "Workload Manager governed remediation pattern",
      g("READ-ONLY SCAN", c("Workload Manager", "Configuration assessment")),
      g("FINDING REVIEW", c("Cloud Logging", "Evaluation evidence")),
      g("CHANGE OWNER", c("Operations team", "Approved remediation", "user")),
      g("REEVALUATION", c("Workload Manager", "Verify correction")),
      auditOps())
  ]
};
