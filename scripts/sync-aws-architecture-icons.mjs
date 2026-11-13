import { mkdir, rm, cp, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const source = process.argv[2] || process.env.AWS_ICON_SOURCE || "main";
const target = "public/aws-icons";
const sentinel = join(target, "Analytics", "QuickSight.png");

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

if (await exists(sentinel) && process.env.FORCE_AWS_ICON_SYNC !== "1") {
  console.log(`AWS architecture icons already available locally at ${target}`);
  process.exit(0);
}

const work = join(tmpdir(), `aws-icons-${Date.now()}`);
const archive = join(work, "icons.tar.gz");
const unpacked = join(work, "src");
const isBranch = source === "main" || source === "master";
const url = isBranch
  ? `https://github.com/awslabs/aws-icons-for-plantuml/archive/refs/heads/${source}.tar.gz`
  : `https://github.com/awslabs/aws-icons-for-plantuml/archive/refs/tags/${source}.tar.gz`;

await mkdir(work, { recursive: true });
await mkdir(unpacked, { recursive: true });

let response;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(30000) });
    if (response.ok) break;
    console.warn(`AWS icon download attempt ${attempt} failed: HTTP ${response.status}`);
  } catch (error) {
    console.warn(`AWS icon download attempt ${attempt} failed: ${error.message}`);
  }
  if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 1200));
}
if (!response?.ok) throw new Error(`Unable to download AWS icon set from ${url}`);

await writeFile(archive, Buffer.from(await response.arrayBuffer()));
execFileSync("tar", ["-xzf", archive, "-C", unpacked]);

const folder = isBranch
  ? `aws-icons-for-plantuml-${source}`
  : `aws-icons-for-plantuml-${source.replace(/^v/, "")}`;
const sourceDir = join(unpacked, folder, "dist");

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(sourceDir, target, { recursive: true });

if (!(await exists(sentinel))) {
  throw new Error(`AWS icon sync completed but QuickSight sentinel is missing: ${sentinel}`);
}

await writeFile(
  join(target, "SOURCE.md"),
  `# AWS Architecture Icons\n\nVendored at build time from AWS Labs aws-icons-for-plantuml (${source}).\n\nUpstream: https://github.com/awslabs/aws-icons-for-plantuml\nOfficial AWS architecture icon guidance: https://aws.amazon.com/architecture/icons/\n\nRuntime pages load these files locally from /aws-icons/. No browser request to raw.githubusercontent.com is required.\n`
);

await rm(work, { recursive: true, force: true });
console.log(`AWS architecture icons (${source}) copied locally to ${target}`);
