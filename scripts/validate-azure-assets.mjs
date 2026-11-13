import fs from "node:fs";

const source = fs.readFileSync("app/azure-data.ts", "utf8");
const marker = "export const azureBranches: AzureBranch[] = ";
const start = source.indexOf(marker);
const end = source.indexOf("\nconst azureFilenameOverrides", start);
if (start < 0 || end < 0) throw new Error("Azure branch catalog markers not found");
const raw = source.slice(start + marker.length, end).trim().replace(/;$/, "");
const branches = JSON.parse(raw);
const services = branches.flatMap((branch) => branch.services);
const slugs = new Set();
for (const service of services) {
  if (!service.name || !service.slug || !service.folder) throw new Error("Incomplete Azure service entry");
  if (slugs.has(service.slug)) continue;
  slugs.add(service.slug);
}
if (!source.includes("export const azureAssetPath")) throw new Error("Canonical Azure asset mapper missing");
console.log("Validated Azure catalog: " + branches.length + " branches, " + services.length + " references, " + slugs.size + " unique services.");
