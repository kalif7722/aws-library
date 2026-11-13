import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expected = ["PCA", "PCD", "PDE", "PCDE", "PMLE", "PCSE", "PCDOE", "PCNE", "PAA", "PSOE", "ACE", "ADP", "AGWA", "GAL", "CDL"];
const courseFile = "app/gcp-course-data.ts";
const objectiveFiles = ["app/gcp-exam-objectives.ts", "app/gcp-exam-objectives-additional.ts"];
const syntaxFiles = [
  courseFile,
  ...objectiveFiles,
  "app/gcp-all-exam-objectives.ts",
  "app/gcp-course-services.ts",
  "app/components/GcpProfessionalCourseGuide.tsx",
  "app/components/GcpCertificationCourse.tsx",
];

const formatDiagnostic = (diagnostic, file) => {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  if (diagnostic.start == null || !diagnostic.file) return `${file}: ${message}`;
  const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  return `${file}:${line + 1}:${character + 1}: ${message}`;
};

const syntaxErrors = [];
for (const relativeFile of syntaxFiles) {
  const file = path.join(root, relativeFile);
  if (!fs.existsSync(file)) throw new Error(`Missing GCP course source file: ${relativeFile}`);
  const source = fs.readFileSync(file, "utf8");
  const result = ts.transpileModule(source, {
    fileName: relativeFile,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  });
  for (const diagnostic of result.diagnostics || []) {
    if (diagnostic.category === ts.DiagnosticCategory.Error) syntaxErrors.push(formatDiagnostic(diagnostic, relativeFile));
  }
}
if (syntaxErrors.length) {
  console.error("GCP certification TypeScript syntax validation failed.");
  for (const error of syntaxErrors) console.error(error);
  process.exit(1);
}

const courseSource = fs.readFileSync(path.join(root, courseFile), "utf8");
const courseEntries = [...courseSource.matchAll(/code:\s*"([A-Z]+)"[\s\S]*?route:\s*"([^"]+)"[\s\S]*?assetPrefix:\s*"([^"]+)"/g)]
  .map(match => ({ code: match[1], route: match[2], assetPrefix: match[3] }));
const codes = courseEntries.map(entry => entry.code);
const missingCourses = expected.filter(code => !codes.includes(code));
const extraCourses = codes.filter(code => !expected.includes(code));
const duplicateCodes = codes.filter((code, index) => codes.indexOf(code) !== index);
if (missingCourses.length || extraCourses.length || duplicateCodes.length || courseEntries.length !== expected.length) {
  console.error("GCP certification course catalog validation failed.");
  if (missingCourses.length) console.error(`Missing course codes: ${missingCourses.join(", ")}`);
  if (extraCourses.length) console.error(`Unexpected course codes: ${extraCourses.join(", ")}`);
  if (duplicateCodes.length) console.error(`Duplicate course codes: ${[...new Set(duplicateCodes)].join(", ")}`);
  process.exit(1);
}

for (const course of courseEntries) {
  const routeFile = path.join(root, "app/courses", course.route, "page.tsx");
  if (!fs.existsSync(routeFile)) throw new Error(`Missing route for ${course.code}: app/courses/${course.route}/page.tsx`);
  const routeSource = fs.readFileSync(routeFile, "utf8");
  if (!routeSource.includes(`gcpCourseByCode.${course.code}`)) throw new Error(`Route ${course.route} is not wired to ${course.code}`);
  if (!/^[a-z0-9-]+$/.test(course.assetPrefix)) throw new Error(`Invalid R2 asset prefix for ${course.code}: ${course.assetPrefix}`);
}

const objectiveSource = objectiveFiles.map(file => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
const courseHeaders = [...objectiveSource.matchAll(/^\s{2}([A-Z]+): \[/gm)].map(match => ({ code: match[1], index: match.index }));
const objectiveCodes = courseHeaders.map(entry => entry.code);
for (const code of expected) if (!objectiveCodes.includes(code)) throw new Error(`Missing exam objectives for ${code}`);
for (const code of objectiveCodes) if (!expected.includes(code)) throw new Error(`Unexpected exam objective set: ${code}`);

for (let index = 0; index < courseHeaders.length; index += 1) {
  const current = courseHeaders[index];
  const end = courseHeaders[index + 1]?.index ?? objectiveSource.lastIndexOf("};");
  const block = objectiveSource.slice(current.index, end);
  const weights = [...block.matchAll(/weight:\s*"([^"]+)"/g)].map(match => match[1]);
  const ids = [...block.matchAll(/\{ id:\s*"([0-9]+-[0-9]+)"/g)].map(match => match[1]);
  if (!weights.length) throw new Error(`${current.code} has no weighted exam domains`);
  if (!ids.length) throw new Error(`${current.code} has no numbered skill areas`);
  if (weights.some(weight => !weight.trim())) throw new Error(`${current.code} contains a blank domain weight`);
  const duplicateIds = ids.filter((id, idIndex) => ids.indexOf(id) !== idIndex);
  if (duplicateIds.length) throw new Error(`${current.code} has duplicate skill IDs: ${[...new Set(duplicateIds)].join(", ")}`);
}

console.log(`GCP certification course syntax validated across ${syntaxFiles.length} source files.`);
console.log(`GCP certification routes validated: ${courseEntries.length}/${expected.length}.`);
console.log(`GCP certification objective sets validated: ${objectiveCodes.length}/${expected.length}.`);
