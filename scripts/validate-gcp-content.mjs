import fs from "node:fs";

const file = new URL("../docs/gcp/pilot-service-content.json", import.meta.url);
const payload = JSON.parse(fs.readFileSync(file, "utf8"));
const services = payload.services || [];
const failures = [];

if (services.length < 3) failures.push("Pilot catalog must contain at least three services.");
for (const service of services) {
  if (!service.slug || !service.summary || !Array.isArray(service.sections)) failures.push(service.slug + ": missing slug, summary, or sections");
  if (service.sections?.length !== 20) failures.push(service.slug + ": expected exactly 20 sections, found " + (service.sections?.length ?? 0));
  const titles = service.sections?.map(section => section.title) || [];
  if (new Set(titles).size !== titles.length) failures.push(service.slug + ": duplicate section titles");
  if (!service.sources?.length) failures.push(service.slug + ": missing official sources");
  if (!service.relatedServices?.length) failures.push(service.slug + ": missing related services");
}
const allText = services.flatMap(service => (service.sections || []).flatMap(section => [section.body || "", ...(section.steps || [])]));
const seen = new Map();
for (const text of allText) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) continue;
  seen.set(normalized, (seen.get(normalized) || 0) + 1);
}
for (const [text, count] of seen) if (count > 1) failures.push("Repeated teaching text appears " + count + " times: " + text.slice(0, 100));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("GCP pilot content valid: " + services.length + " services, 20 unique sections each, no repeated teaching strings.");
