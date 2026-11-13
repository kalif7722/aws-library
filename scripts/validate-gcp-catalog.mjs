#!/usr/bin/env node
// Read-only by default. Pending production work is reported, never treated as success or failure.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [], pending = [], warnings = [];
const fail = (where, message) => errors.push({ where, message });
const read = (name, optional = false) => {
  try { return JSON.parse(fs.readFileSync(path.join(root, name), 'utf8')); }
  catch (error) { if (!optional || fs.existsSync(path.join(root, name))) fail(name, error.message); return {}; }
};
const catalog = read('docs/gcp/gcp-services.json');
const content = read('docs/gcp/service-content.json');
const icons = read('docs/gcp/icon-manifest.json', true);
const services = Array.isArray(catalog.services) ? catalog.services : [];
const categories = Array.isArray(catalog.categories) ? catalog.categories : [];
if (!services.length || !categories.length) fail('catalog', 'Nonempty services and categories arrays required');
const fold = value => String(value).normalize('NFKC').trim().toLocaleLowerCase('en-US');
const ready = value => /^(READY|COMPLETE|COMPLETED|VERIFIED|AVAILABLE)$/i.test(value || '');
const url = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
const unique = (items, field) => {
  const seen = new Set();
  for (const item of items) { const key = fold(item[field]); if (seen.has(key)) fail(item.slug || field, `Duplicate ${field}: ${item[field]}`); seen.add(key); }
};
for (const field of ['slug', 'canonicalName', 'route']) unique(services, field);
for (const field of ['slug', 'name']) unique(categories, field);
const categoryMap = new Map(categories.map(c => [c.slug, c.name]));
const slugs = new Set(services.map(s => s.slug));
const contentItems = Array.isArray(content.services) ? content.services : [];
unique(contentItems, 'slug');
const contentMap = new Map(contentItems.map(s => [s.slug, s]));
const aliasOwners = new Map();
const claimAlias = (alias, slug) => {
  if (typeof alias !== 'string' || !alias.trim()) return fail(slug, 'Empty or non-string alias');
  const key = fold(alias), owner = aliasOwners.get(key);
  if (owner && owner !== slug) fail(slug, `Alias collision: ${alias} also identifies ${owner}`);
  aliasOwners.set(key, slug);
};
const related = (entry, where) => {
  if (!Array.isArray(entry.relatedServices)) return fail(where, 'relatedServices must be an array');
  const seen = new Set();
  for (const slug of entry.relatedServices) {
    if (!slugs.has(slug)) fail(where, `Unknown related service: ${slug}`);
    if (slug === entry.slug || seen.has(slug)) fail(where, `Self or duplicate related service: ${slug}`);
    seen.add(slug);
  }
};
const localAsset = (assetPath, where) => {
  if (typeof assetPath !== 'string' || !assetPath.startsWith('/') || assetPath.includes('..')) { fail(where, 'Ready asset requires safe public-root path'); return; }
  const file = path.join(root, 'public', assetPath);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile() || !fs.statSync(file).size) fail(where, `Claimed ready asset missing or empty: public${assetPath}`);
  return file;
};
const webpDimensions = file => {
  const b = fs.readFileSync(file);
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const kind = b.toString('ascii', 12, 16);
  if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (kind === 'VP8 ' && b[23] === 0x9d && b[24] === 0x01 && b[25] === 0x2a)
    return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L' && b[20] === 0x2f)
    return [1 + (((b[22] & 0x3f) << 8) | b[21]), 1 + (((b[24] & 0x0f) << 10) | (b[23] << 2) | (b[22] >> 6))];
  return null;
};
const statusCounts = {};
for (const s of services) {
  const where = s.slug || '<missing slug>';
  for (const field of ['canonicalName', 'displayName', 'slug', 'description', 'documentationUrl', 'officialCategory', 'categorySlug', 'route']) {
    if (typeof s[field] !== 'string' || !s[field].trim()) fail(where, `Required nonempty field: ${field}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.slug)) fail(where, 'Invalid canonical slug');
  if (categoryMap.get(s.categorySlug) !== s.officialCategory) fail(where, 'Category slug/name membership mismatch');
  if (!url(s.documentationUrl)) fail(where, 'documentationUrl must be an HTTPS URL');
  if (s.route !== `/gcp-services?service=${s.slug}`) fail(where, 'Noncanonical route');
  for (const field of ['aliases', 'abbreviations', 'notes']) if (!Array.isArray(s[field])) fail(where, `${field} must be an array`);
  for (const alias of [s.canonicalName, s.displayName, s.slug, ...(s.aliases || []), ...(s.abbreviations || [])]) claimAlias(alias, where);
  related(s, where);
  for (const field of ['walkthroughRequired', 'companionRequired']) if (![true, false, null].includes(s[field])) fail(where, `${field} must be true, false or null`);
  for (const [prefix, filename, assetPath] of [
    ['el10', `gcp-${s.slug}.webp`, `/gcp/${s.categorySlug}/gcp-${s.slug}.webp`],
    ['primaryWalkthrough', `${s.slug}-primary.webp`, `/gcp-service-walkthroughs/${s.slug}-primary.webp`],
    ['companionWalkthrough', `${s.slug}-companion.webp`, `/gcp-service-walkthroughs/${s.slug}-companion.webp`],
  ]) {
    if (s[`${prefix}Filename`] !== filename || s[`${prefix}Path`] !== assetPath) fail(where, `${prefix} filename/path mismatch`);
    if (ready(s[`${prefix}Status`])) {
      const file = localAsset(s[`${prefix}Path`], `${where}.${prefix}`);
      if (file) {
        const dims = webpDimensions(file);
        if (!dims) fail(`${where}.${prefix}`, 'Ready visual must be a valid WebP image');
        else if (dims[0] < 2048 || dims[1] < 1152 || dims[0] * 9 !== dims[1] * 16)
          fail(`${where}.${prefix}`, `Ready visual below 2048×1152 16:9 gate: ${dims.join('×')}`);
      }
    }
  }
  for (const field of ['iconStatus', 'el10Status', 'primaryWalkthroughStatus', 'companionWalkthroughStatus', 'servicePageStatus', 'mappingStatus', 'routeStatus', 'qaStatus']) {
    if (typeof s[field] !== 'string' || !s[field].trim()) fail(where, `Missing ${field}`);
    const status = s[field] || 'MISSING';
    statusCounts[field] ??= {};
    statusCounts[field][status] = (statusCounts[field][status] || 0) + 1;
    if (/PENDING|BLOCKED|DRAFT|NOT_STARTED|IN_PROGRESS/i.test(status)) pending.push({ slug: s.slug, field, status });
  }
  if (ready(s.servicePageStatus) && !contentMap.has(s.slug)) fail(where, 'Service page marked ready without content record');
  if (ready(s.iconStatus)) {
    const icon = icons.icons?.[s.iconIdentifier];
    if (!icon) fail(where, 'Ready iconIdentifier absent from icon manifest');
    else localAsset(icon.path, `${where}.icon`);
  }
}
for (const item of contentItems) {
  const where = `content.${item.slug}`;
  if (!slugs.has(item.slug)) fail(where, 'Content references an unknown service');
  related(item, where);
  if (!Array.isArray(item.sources) || !item.sources.length) fail(where, 'Content requires sources');
  else for (const source of item.sources) if (!source.title || !url(source.url)) fail(where, 'Source requires title and HTTPS URL');
}
for (const [id, icon] of Object.entries(icons.icons || {})) {
  const file = localAsset(icon.path, `icons.${id}`);
  if (file && fs.existsSync(file) && icon.sha256 && createHash('sha256').update(fs.readFileSync(file)).digest('hex') !== icon.sha256) fail(`icons.${id}`, 'Icon SHA256 mismatch');
}
if (catalog.source?.sourceSnapshot && catalog.source?.sourceSha256) {
  const sourcePath = path.resolve(root, catalog.source.sourceSnapshot);
  if (!sourcePath.startsWith(root + path.sep) || !fs.existsSync(sourcePath)) fail('source', 'Missing or unsafe source snapshot');
  else if (createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex') !== catalog.source.sourceSha256) fail('source', 'Source snapshot SHA256 mismatch');
}
const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), counts: { services: services.length, categories: categories.length, contentRecords: contentItems.length, errors: errors.length, pendingFields: pending.length }, statusCounts, errors, warnings, pending };
if (process.argv.includes('--write-report')) fs.writeFileSync(path.join(root, 'docs/gcp/coverage-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`GCP catalog: ${services.length} services; ${categories.length} categories; ${contentItems.length} content records.`);
console.log(`Validation: ${errors.length} errors. Production pending: ${pending.length} status fields (not failures).`);
console.log(JSON.stringify(statusCounts, null, 2));
for (const error of errors) console.error(`ERROR ${error.where}: ${error.message}`);
process.exitCode = errors.length ? 1 : 0;
