import fs from 'node:fs';

const path = 'app/services/page.tsx';
let s = fs.readFileSync(path, 'utf8');

if (!s.includes('file: "/el10/aws-management-console.webp"')) {
  const anchor = '  { name: "Amazon Titan", file: "/el10/ai/titan.webp", accent: "#a855f7", summary: "Amazon foundation models for generative AI applications" },\n];';
  const replacement = `  { name: "Amazon Titan", file: "/el10/ai/titan.webp", accent: "#a855f7", summary: "Amazon foundation models for generative AI applications" },
  { name: "AWS Management Console", file: "/el10/aws-management-console.webp", accent: "#2563eb", summary: "Web interface for accessing and managing AWS services" },
  { name: "AWS CLI", file: "/el10/aws-cli.webp", accent: "#f97316", summary: "Unified command-line interface for AWS services" },
  { name: "AWS AppConfig", file: "/el10/appconfig.webp", accent: "#db2777", summary: "Safely deploy feature flags and dynamic application configuration" },
  { name: "Savings Plans", file: "/el10/svgsavings-plans.webp", accent: "#16a34a", summary: "Commitment-based pricing for lower eligible AWS usage costs" },
];`;
  if (!s.includes(anchor)) throw new Error('services array anchor changed');
  s = s.replace(anchor, replacement);
}

const patches = [
  ['  { title: "Management & Governance", start: 0, end: 34, accent: "#f05aa6", copies: [215, 216] },', '  { title: "Management & Governance", start: 0, end: 34, accent: "#f05aa6", copies: [215, 216, 243, 244, 245] },'],
  ['  { title: "Developer Tools", start: 120, end: 132, accent: "#f97316", copies: [180] },', '  { title: "Developer Tools", start: 120, end: 132, accent: "#f97316", copies: [180, 244] },'],
  ['  { title: "Other Services", start: 196, end: 215, accent: "#14b8a6", copies: [181, 226, 227, 228] },\n];', '  { title: "Other Services", start: 196, end: 215, accent: "#14b8a6", copies: [181, 226, 227, 228] },\n  { title: "Cloud Financial Management", start: 0, end: 0, accent: "#16a34a", copies: [23, 24, 25, 9, 13, 215, 216, 246] },\n];'],
  ['  "Audit Manager": "audit evidence compliance", "AWS CloudFormation": "infrastructure as code IaC", "AWS CodePipeline": "CI CD continuous delivery deployment",\n};', '  "Audit Manager": "audit evidence compliance", "AWS CloudFormation": "infrastructure as code IaC", "AWS CodePipeline": "CI CD continuous delivery deployment",\n  "AWS Management Console": "console browser web interface access AWS services",\n  "AWS CLI": "command line terminal developer tools automation",\n  "AWS AppConfig": "feature flags dynamic configuration deployment systems manager",\n  "Savings Plans": "cost savings commitment pricing cloud financial management",\n};'],
  ['  const service = selected === null ? null : services[selected];\n  const allCollapsed = branches.every((branch) => collapsedBranches[branch.title]);', '  const service = selected === null ? null : services[selected];\n  const uniqueServiceCount = new Set(services.map((item) => normalize(item.name))).size;\n  const allCollapsed = branches.every((branch) => collapsedBranches[branch.title]);'],
  ['<div className="progress"><strong>{services.length}</strong><span>services mapped</span></div>', '<div className="progress"><strong>{uniqueServiceCount}</strong><span>services mapped</span></div>']
];

for (const [from, to] of patches) {
  if (s.includes(to)) continue;
  if (!s.includes(from)) throw new Error(`catalog anchor missing: ${from.slice(0, 90)}`);
  s = s.replace(from, to);
}

for (const [name, file] of [
  ['AWS Management Console', '/el10/aws-management-console.webp'],
  ['AWS CLI', '/el10/aws-cli.webp'],
  ['AWS AppConfig', '/el10/appconfig.webp'],
  ['Savings Plans', '/el10/svgsavings-plans.webp'],
]) {
  const nameCount = s.split(`name: "${name}"`).length - 1;
  const fileCount = s.split(`file: "${file}"`).length - 1;
  if (nameCount !== 1 || fileCount !== 1) throw new Error(`${name} must have exactly one catalog record and one image path`);
}

fs.writeFileSync(path, s);
console.log('Applied uploaded AWS service catalog additions.');
