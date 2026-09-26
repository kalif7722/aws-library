import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const args = process.argv.slice(2);
const batchFlag = args.indexOf('--batch');
const batch = batchFlag >= 0 ? args[batchFlag + 1] : 'gcp-001';
if (!batch) throw new Error('Missing batch name');

const manifestPath = path.join(root, 'docs/gcp/R2_UPLOAD_MANIFEST.tsv');
const lines = fs.readFileSync(manifestPath, 'utf8').trim().split(/\r?\n/);
const headers = lines.shift().split('\t');
const rows = lines.map((line) => Object.fromEntries(line.split('\t').map((value, i) => [headers[i], value]))).filter((row) => row.batch === batch);
if (!rows.length) throw new Error(`No manifest rows for ${batch}`);

const outDir = path.join(root, 'dist/gcp-image-batches', batch);
fs.mkdirSync(outDir, { recursive: true });
const checksums = [];
for (const row of rows) {
  const source = path.join(root, row.local_file);
  if (!fs.existsSync(source)) throw new Error(`Missing source: ${row.local_file}`);
  const destination = path.join(outDir, row.r2_key.replace(/^gcp-el10-images\//, ''));
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex');
  checksums.push(`${sha256}  ${row.r2_key}`);
}
fs.writeFileSync(path.join(outDir, 'SHA256SUMS.txt'), `${checksums.join('\n')}\n`);
fs.copyFileSync(manifestPath, path.join(outDir, 'R2_UPLOAD_MANIFEST.tsv'));
const zipPath = path.join(root, 'dist/gcp-image-batches', `${batch}.zip`);
execFileSync('zip', ['-qr', zipPath, batch], { cwd: path.dirname(outDir) });
console.log(zipPath);
