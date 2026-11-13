import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Capacity / health"), c("Cloud Logging", "Access / operation logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Separate ${service} data access, protection policy and recovery validation so durable storage is also recoverable and operationally owned.`, `${service} governance pattern`,
  g("IDENTITY / NETWORK", c("IAM controls", "Admin / data roles", "IAM"), c("VPC network", "Private storage path", "VPC")),
  g("STORAGE SERVICE", c(service, role, service)),
  g("DATA PROTECTION", c("Backup / snapshot", "Recovery point", "data"), c("Cloud KMS", "CMEK where required", "Cloud KMS")),
  g("RECOVERY TEST", c("Restore validation", "Prove recoverability", "monitor")),
  g("AUDIT", c("Cloud Audit Logs", "Admin evidence"), c("Cloud Monitoring", "Capacity / SLO"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpStorageArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "backup-and-dr-service": pair(
    b("Centralized backup and recovery", "Protect supported production workloads through centrally managed backup policy, isolated recovery points and tested restore workflows instead of treating snapshot success as proven recovery.", "Google Cloud Backup and DR production pattern",
      g("PROTECTED WORKLOADS", c("Compute Engine", "VM workloads"), c("Databases", "Application data", "database")),
      g("BACKUP CONTROL", c("Backup and DR Service", "Plans + policies")),
      g("PROTECTED VAULT", c("Backup vault", "Isolated recovery points", "Backup and DR Service")),
      g("RECOVERY", c("Restore / mount", "Recovery workflow", "data"), c("Recovery target", "Validated workload", "server")),
      ops()), "Backup and DR Service", "Central backup / recovery control"),
  "cloud-storage": pair(
    b("Durable object data platform", "Accept application uploads into a protected bucket, keep immutable object generations or retention controls where required and transition older data through lifecycle policy.", "Google Cloud Cloud Storage application data pattern",
      g("PRODUCERS", c("Applications", "Object uploads", "app"), c("Data pipelines", "Batch / stream output", "Dataflow")),
      g("OBJECT STORAGE", c("Cloud Storage", "Durable objects")),
      g("DATA PROTECTION", c("Soft delete / versioning", "Recovery window", "Cloud Storage"), c("Retention policy", "Immutability", "security")),
      g("LIFECYCLE", c("Storage classes", "Hot to archive", "Cloud Storage"), c("BigQuery", "Analytics consumer")),
      ops()), "Cloud Storage", "Durable object storage"),
  "filestore": pair(
    b("Shared POSIX storage for containers and VMs", "Mount the same managed NFS share from GKE pods and Compute Engine VMs while keeping backup and application compute lifecycles independent from the file service.", "Google Cloud Filestore shared file pattern",
      g("COMPUTE CLIENTS", c("GKE", "Pods / workloads"), c("Compute Engine", "VM applications")),
      g("PRIVATE NETWORK", c("VPC network", "NFS connectivity", "VPC")),
      g("SHARED FILE LAYER", c("Filestore", "Managed NFS share")),
      g("DATA PROTECTION", c("Filestore backup", "File recovery", "Filestore"), c("Cloud Storage", "Archive / export")),
      ops()), "Filestore", "Managed NFS file storage"),
  "netapp-volumes": pair(
    b("Enterprise NFS / SMB data services", "Serve enterprise file workloads through managed NetApp volumes, use snapshots for fast recovery and replicate selected data across regions for disaster-recovery objectives.", "Google Cloud NetApp Volumes enterprise file pattern",
      g("FILE CLIENTS", c("Compute Engine", "NFS / SMB clients"), c("GKE", "Container file workloads")),
      g("PRIVATE ACCESS", c("VPC network", "Private file endpoint", "VPC"), c("Microsoft AD", "SMB identity", "security")),
      g("FILE STORAGE", c("NetApp Volumes", "Enterprise NFS / SMB")),
      g("PROTECTION / DR", c("Snapshots", "Point-in-time recovery", "NetApp Volumes"), c("Cross-region replication", "DR copy", "NetApp Volumes")),
      ops()), "NetApp Volumes", "Enterprise managed file storage")
};
