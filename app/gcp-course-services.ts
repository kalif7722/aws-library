import { gcpServices, type GcpService } from "./gcp-data";
import { gcpOfficialExamDomains, type GcpExamSkill } from "./gcp-exam-objectives";

const normalize = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

const manualAliases: Record<string, string[]> = {
  "google kubernetes engine": ["google-kubernetes-engine"], gke: ["google-kubernetes-engine"],
  "cloud iam": ["identity-and-access-management"], iam: ["identity-and-access-management"], "identity and access management": ["identity-and-access-management"],
  vpc: ["virtual-private-cloud"], "virtual private cloud": ["virtual-private-cloud"],
  "cloud logging": ["logging"], "cloud monitoring": ["monitoring"], "google cloud observability": ["monitoring", "logging", "trace", "error-reporting"], "cloud trace": ["trace"], "error reporting": ["error-reporting"],
  "cloud kms": ["cloud-kms"], "cloud key management service": ["cloud-kms"],
  "security command center": ["security-command-center"], scc: ["security-command-center"],
  "google security operations": ["google-secops"], secops: ["google-secops"],
  "cloud ngfw": ["cloud-ngfw"], "cloud next generation firewall": ["cloud-ngfw"],
  "network connectivity center": ["network-connectivity-center"], ncc: ["network-connectivity-center"], "network intelligence center": ["network-intelligence-center"],
  "cloud service mesh": ["cloud-service-mesh"], "sensitive data protection": ["sensitive-data-protection"], "cloud dlp": ["sensitive-data-protection"],
  "certificate authority service": ["ca-service"], "ca service": ["ca-service"],
  "agent platform": ["gemini-enterprise-agent-platform"], "gemini enterprise": ["gemini-enterprise-agent-platform"], "agent search": ["gemini-enterprise-agent-platform"], "model garden": ["gemini-enterprise-agent-platform"], "vertex ai": ["gemini-enterprise-agent-platform"],
  "cloud composer": ["managed-service-for-apache-airflow"], "managed service for apache airflow": ["managed-service-for-apache-airflow"],
  "memorystore for redis": ["memorystore-for-redis-cluster"],
  "cloud api gateway": ["api-gateway"], "api gateway": ["api-gateway"],
  "cloud source repositories": ["cloud-source-repositories"], "cloud workstations": ["cloud-workstations"],
  "cloud interconnect": ["cloud-interconnect"], "cloud vpn": ["cloud-vpn"], "cloud router": ["cloud-router"], "cloud nat": ["cloud-nat"], "cloud dns": ["cloud-dns"], "cloud armor": ["cloud-armor"], "secure web proxy": ["secure-web-proxy"],
};

function scoreServices(raw: string) {
  const text = normalize(raw);
  const scored = new Map<string, number>();
  for (const service of gcpServices) {
    const terms = [service.displayName, service.canonicalName, ...(service.aliases || []), ...(service.abbreviations || [])].map(normalize).filter(term => term.length >= 3);
    let best = Number.POSITIVE_INFINITY;
    for (const term of terms) {
      const index = text.indexOf(term);
      if (index >= 0) best = Math.min(best, index);
    }
    if (Number.isFinite(best)) scored.set(service.slug, best);
  }
  for (const [alias, slugs] of Object.entries(manualAliases)) {
    const index = text.indexOf(normalize(alias));
    if (index < 0) continue;
    for (const slug of slugs) scored.set(slug, Math.min(scored.get(slug) ?? Number.POSITIVE_INFINITY, index));
  }
  return [...scored.entries()].sort((a, b) => a[1] - b[1]);
}

export function gcpRelatedServicesForSkill(skill: GcpExamSkill, limit = 8): GcpService[] {
  return scoreServices(`${skill.name} ${skill.tasks.join(" ")}`).map(([slug]) => gcpServices.find(service => service.slug === slug)).filter((service): service is GcpService => Boolean(service)).slice(0, limit);
}

export function gcpCourseServices(code: string): GcpService[] {
  const domains = gcpOfficialExamDomains[code] || [];
  const text = domains.flatMap(domain => domain.groups.flatMap(group => [group.name, ...group.tasks])).join(" ");
  return scoreServices(text).map(([slug]) => gcpServices.find(service => service.slug === slug)).filter((service): service is GcpService => Boolean(service));
}
