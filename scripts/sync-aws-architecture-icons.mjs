import { mkdir, rm, cp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const version = process.argv[2] || "v23.0";
const target = "public/aws-icons";
const work = join(tmpdir(), `aws-icons-${Date.now()}`);
const archive = join(work, "icons.tar.gz");
const unpacked = join(work, "src");
const url = `https://github.com/awslabs/aws-icons-for-plantuml/archive/refs/tags/${version}.tar.gz`;

await mkdir(work, { recursive: true });
await mkdir(unpacked, { recursive: true });
const response = await fetch(url);
if (!response.ok) throw new Error(`Unable to download AWS icon set ${version}: ${response.status}`);
await writeFile(archive, Buffer.from(await response.arrayBuffer()));
execFileSync("tar", ["-xzf", archive, "-C", unpacked]);
const folder = `aws-icons-for-plantuml-${version.replace(/^v/, "")}`;
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(join(unpacked, folder, "dist"), target, { recursive: true });
await writeFile(join(target, "SOURCE.md"), `# AWS Architecture Icons\n\nVendored from AWS Labs aws-icons-for-plantuml tag ${version}.\n\nUpstream: https://github.com/awslabs/aws-icons-for-plantuml\nOfficial AWS architecture icon guidance: https://aws.amazon.com/architecture/icons/\n\nRun \`node scripts/sync-aws-architecture-icons.mjs <tag>\` to refresh the complete icon set.\n`);
await rm(work, { recursive: true, force: true });
console.log(`AWS architecture icons ${version} copied to ${target}`);
