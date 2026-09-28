import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventory = JSON.parse(fs.readFileSync(path.join(root, "docs/gcp/gcp-services.json"), "utf8"));

const boardFiles = [
  "lib/gcp-architecture-boards.ts",
  "lib/gcp-architecture-boards-ai-ml.ts",
  "lib/gcp-architecture-boards-app-hosting.ts",
  "lib/gcp-architecture-boards-compute.ts",
  "lib/gcp-architecture-boards-networking.ts",
  "lib/gcp-architecture-boards-analytics.ts",
  "lib/gcp-architecture-boards-databases.ts",
  "lib/gcp-architecture-boards-hybrid-migration-industry.ts",
  "lib/gcp-architecture-boards-observability.ts",
  "lib/gcp-architecture-boards-security.ts",
  "lib/gcp-architecture-boards-storage.ts",
  "lib/gcp-architecture-boards-cross-product.ts",
];

const expected = new Set(inventory.services.map(service => service.slug));
const occurrences = new Map();

for (const relativeFile of boardFiles) {
  const file = path.join(root, relativeFile);
  if (!fs.existsSync(file)) throw new Error(`Missing GCP architecture board file: ${relativeFile}`);
  const source = fs.readFileSync(file, "utf8");
  const keyPattern = /^\s{2}"([a-z0-9-]+)":\s*(?:pair\(|\[)/gm;
  for (const match of source.matchAll(keyPattern)) {
    const slug = match[1];
    const list = occurrences.get(slug) || [];
    list.push(relativeFile);
    occurrences.set(slug, list);
  }
}

const actual = new Set(occurrences.keys());
const missing = [...expected].filter(slug => !actual.has(slug)).sort();
const extra = [...actual].filter(slug => !expected.has(slug)).sort();
const duplicates = [...occurrences.entries()].filter(([, files]) => files.length > 1).map(([slug, files]) => ({ slug, files }));

if (missing.length || extra.length || duplicates.length) {
  console.error("GCP architecture board validation failed.");
  if (missing.length) console.error(`Missing (${missing.length}): ${missing.join(", ")}`);
  if (extra.length) console.error(`Unknown (${extra.length}): ${extra.join(", ")}`);
  if (duplicates.length) for (const item of duplicates) console.error(`Duplicate ${item.slug}: ${item.files.join(", ")}`);
  process.exit(1);
}

for (const service of inventory.services) {
  const sourceFile = occurrences.get(service.slug)?.[0];
  if (!sourceFile) continue;
  const source = fs.readFileSync(path.join(root, sourceFile), "utf8");
  const escapedSlug = service.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const entryPattern = new RegExp(`^\\s{2}"${escapedSlug}":\\s*(?:pair\\(|\\[)`, "m");
  if (!entryPattern.test(source)) throw new Error(`Architecture board entry cannot be resolved for ${service.slug}`);
}

console.log(`GCP architecture boards validated: ${actual.size}/${expected.size} catalog services covered explicitly.`);
