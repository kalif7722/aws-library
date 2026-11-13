import inventory from "../docs/gcp/gcp-services.json";
import manifest from "../docs/gcp/icon-manifest.json";

export type GcpArchitectureIcon = {
  path: string | null;
  label: string | null;
  kind: string;
  fallback?: boolean;
};
export type ResolvedGcpArchitectureIcon = GcpArchitectureIcon & { path: string };

const normalize = (value: string) => value
  .toLowerCase()
  .replace(/^\s*(?:step|stage|layer|phase)?\s*\d+\s*[.\-:)]*\s*/, "")
  .replace(/&/g, "and")
  .replace(/[^a-z0-9]+/g, "")
  .trim();
const mappings = manifest.serviceMappings as Record<string, GcpArchitectureIcon | undefined>;
const catalog = manifest.icons as Record<string, GcpArchitectureIcon | undefined>;
const serviceAliases = new Map<string, string>();
const iconAliases = new Map<string, string>();

for (const service of inventory.services) {
  const names = [service.slug, service.canonicalName, service.displayName, ...(service.aliases || []), ...(service.abbreviations || [])];
  for (const name of names) serviceAliases.set(normalize(name), service.slug);
}

for (const [iconKey, icon] of Object.entries(catalog)) {
  const shortKey = iconKey.replace(/^(core|legacy|category)-/, "");
  for (const name of [iconKey, shortKey, icon?.label].filter(Boolean) as string[]) iconAliases.set(normalize(name), iconKey);
}

// Diagram labels frequently use architecture terminology rather than the exact
// catalog name. These aliases resolve to official Google-published icon files.
const diagramIconAliases: Record<string, string> = {
  auditlog: "legacy-cloud-audit-logs", auditlogs: "legacy-cloud-audit-logs", cloudauditlogs: "legacy-cloud-audit-logs",
  pubsub: "legacy-pubsub", pubsubtopic: "legacy-pubsub", deadlettertopic: "legacy-pubsub",
  iam: "legacy-identity-and-access-management", iampolicy: "legacy-identity-and-access-management",
  serviceaccount: "legacy-identity-and-access-management", usermanagedserviceaccount: "legacy-identity-and-access-management",
  workloadidentity: "legacy-workload-identity-pool", workloadidentityfederation: "legacy-workload-identity-pool",
  externalapplicationloadbalancer: "legacy-cloud-load-balancing", internalapplicationloadbalancer: "legacy-cloud-load-balancing",
  loadbalancer: "legacy-cloud-load-balancing", cloudloadbalancer: "legacy-cloud-load-balancing",
  googlecloudapi: "legacy-cloud-apis", googlecloudapis: "legacy-cloud-apis", cloudapi: "legacy-cloud-apis", cloudapis: "legacy-cloud-apis",
  googlecloud: "legacy-cloud-generic", googlecloudresources: "legacy-cloud-generic", cloudresource: "legacy-cloud-generic",
  marketplace: "legacy-google-cloud-marketplace", privatemarketplace: "legacy-google-cloud-marketplace",
  infrastructuremanager: "category-management-tools", inframanager: "category-management-tools",
  apphub: "category-management-tools", cloudhub: "category-management-tools", applicationdesigncenter: "category-management-tools",
  configconnector: "category-management-tools", gcloud: "category-management-tools", gcloudcli: "category-management-tools",
  cloudidentity: "category-security-identity", accessapproval: "category-security-identity",
  cloudmonitoring: "legacy-cloud-monitoring", monitoring: "legacy-cloud-monitoring",
  cloudlogging: "legacy-cloud-logging", logging: "legacy-cloud-logging",
  cloudtrace: "legacy-trace", trace: "legacy-trace", cloudprofiler: "legacy-profiler", profiler: "legacy-profiler",
  virtualprivatecloud: "legacy-virtual-private-cloud", vpc: "legacy-virtual-private-cloud", vpcnetwork: "legacy-virtual-private-cloud",
  cloudfirewall: "legacy-cloud-firewall-rules", firewallrules: "legacy-cloud-firewall-rules",
  cloudkms: "legacy-key-management-service", kms: "legacy-key-management-service",
  cloudfunctions: "legacy-cloud-functions", cloudfunction: "legacy-cloud-functions",
  gke: "core-gke", gkecluster: "core-gke", kubernetesengine: "core-gke", googlekubernetesengine: "core-gke",
  computeenginevm: "core-compute-engine", virtualmachine: "core-compute-engine", vm: "core-compute-engine",
  cloudstoragebucket: "core-cloud-storage", storagebucket: "core-cloud-storage", bucket: "core-cloud-storage",
  cloudsqlinstance: "core-cloud-sql", firestore: "legacy-firestore", bigtable: "legacy-bigtable",
  artifactregistry: "legacy-artifact-registry", containerregistry: "legacy-container-registry",
  secrets: "legacy-secret-manager", secret: "legacy-secret-manager", secretmanager: "legacy-secret-manager",
  scheduler: "legacy-cloud-scheduler", cloudscheduler: "legacy-cloud-scheduler",
  eventarc: "legacy-eventarc", workflows: "legacy-workflows", workflow: "legacy-workflows",
  cloudarmor: "legacy-cloud-armor", armorpolicy: "legacy-cloud-armor", clouddns: "legacy-cloud-dns", cloudnat: "legacy-cloud-nat",
  cloudvpn: "legacy-cloud-vpn", cloudrouter: "legacy-cloud-router", cloudcdn: "legacy-cloud-cdn", edgepop: "legacy-cloud-cdn",
};

const embeddedServiceAliases = [...serviceAliases.entries()].filter(([name]) => name.length >= 7).sort((a, b) => b[0].length - a[0].length);
const embeddedIconAliases = [...iconAliases.entries()].filter(([name]) => name.length >= 8).sort((a, b) => b[0].length - a[0].length);

const resolved = (icon?: GcpArchitectureIcon): ResolvedGcpArchitectureIcon | undefined => icon?.path ? icon as ResolvedGcpArchitectureIcon : undefined;

export function findGcpArchitectureIcon(name: string): ResolvedGcpArchitectureIcon | undefined {
  const key = normalize(name);
  const exactSlug = serviceAliases.get(key);
  const exactServiceIcon = exactSlug ? resolved(mappings[exactSlug]) : undefined;
  if (exactServiceIcon) return exactServiceIcon;

  const exactIconKey = diagramIconAliases[key] || iconAliases.get(key);
  const exactIcon = exactIconKey ? resolved(catalog[exactIconKey]) : undefined;
  if (exactIcon) return exactIcon;

  const embeddedService = embeddedServiceAliases.find(([alias]) => key.includes(alias));
  const embeddedServiceIcon = embeddedService ? resolved(mappings[embeddedService[1]]) : undefined;
  if (embeddedServiceIcon) return embeddedServiceIcon;

  const embeddedIcon = embeddedIconAliases.find(([alias]) => key.includes(alias));
  return embeddedIcon ? resolved(catalog[embeddedIcon[1]]) : undefined;
}
