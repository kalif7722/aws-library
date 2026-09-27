import inventory from "../docs/gcp/gcp-services.json";
import manifest from "../docs/gcp/icon-manifest.json";

export type GcpArchitectureIcon = {
  path: string | null;
  label: string | null;
  kind: string;
  fallback?: boolean;
};
export type ResolvedGcpArchitectureIcon = GcpArchitectureIcon & { path: string };

const normalize = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").trim();
const mappings = manifest.serviceMappings as Record<string, GcpArchitectureIcon | undefined>;
const aliases = new Map<string, string>();

for (const service of inventory.services) {
  const names = [service.slug, service.canonicalName, service.displayName, ...(service.aliases || []), ...(service.abbreviations || [])];
  for (const name of names) aliases.set(normalize(name), service.slug);
}

const diagramAliases: Record<string, string> = {
  auditlogs: "cloud-audit-logs",
  cloudauditlogs: "cloud-audit-logs",
  googlecloudapi: "service-usage",
  googlecloudapis: "service-usage",
  cloudapi: "service-usage",
  cloudapis: "service-usage",
  marketplace: "cloud-marketplace",
  infrastructuremanager: "infra-manager",
  apphub: "cloud-hub",
};

export function findGcpArchitectureIcon(name: string): ResolvedGcpArchitectureIcon | undefined {
  const key = normalize(name);
  const slug = aliases.get(key) || diagramAliases[key];
  const icon = slug ? mappings[slug] : undefined;
  return icon?.path ? icon as ResolvedGcpArchitectureIcon : undefined;
}
