import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const consoleSource = await readFile(
  new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url),
  "utf8",
);
const accessDeniedLab = await readFile(
  new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url),
  "utf8",
);

test("AWS console screens do not expose custom troubleshooting diagnostics", () => {
  for (const artificialLabel of [
    "Connected application topology",
    "Downstream dependencies",
    "service checks",
    "application connectivity",
    "configuration and invocation checks",
    "data freshness checks",
    "Resolution checks",
    "App connectivity",
  ]) {
    assert.equal(
      consoleSource.includes(artificialLabel),
      false,
      `AWS console should not contain custom diagnostic label: ${artificialLabel}`,
    );
  }
  assert.doesNotMatch(consoleSource, /Blocked IAM identity permission/i);
  assert.doesNotMatch(consoleSource, /Test access to an object/i);
});

test("Access Denied teaching remains in the standalone lab", () => {
  assert.match(accessDeniedLab, /Identify the actual caller/);
  assert.match(accessDeniedLab, /Evaluate effective permissions/);
  assert.match(accessDeniedLab, /least privilege/i);
  assert.match(accessDeniedLab, /CloudTrail/);
});


test("labs 5–8 have evidence-led walkthroughs, actionable fixes, and rollback guidance", async () => {
  const source = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  for (const phrase of [
    "NatGateway-Hours", "NatGateway-Bytes", "Create and verify an S3 gateway endpoint",
    "Checkout latency: RDS database slowdown", "CPUUtilization 96%", "DatabaseConnections",
    "Restore the missing partition through S3", "orders-daily-curation",
    "Test retrieval independently", "Problem and solution confirmed", "Rollback / safety:",
  ]) assert.ok(source.includes(phrase), "Expected walkthrough evidence: " + phrase);
  for (const incident of ["cloud-cost-spike", "database-slowdown", "stale-data", "rag-stale-answers"]) {
    const at = source.indexOf('"' + incident + '":{', source.indexOf("const labs:"));
    assert.ok(at >= 0, "Missing incident " + incident);
    const next = source.indexOf("\n\n", at);
    const block = source.slice(at, next < 0 ? source.length : next);
    assert.match(block, /solution:/, incident + " needs an explicit solution");
    assert.match(block, /rollback:/, incident + " needs rollback guidance");
  }
});

test("cost mitigation is performed through the simulated VPC Endpoints console", async () => {
  const lab = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  assert.equal(lab.includes("Create S3 gateway endpoint (simulation)"), false);
  assert.match(consoleSource, /Create VPC endpoint/);
  assert.match(consoleSource, /HealthyHostCount/);
  assert.match(consoleSource, /HTTPCode_ELB_5XX_Count/);
});


test("database slowdown lab seeds an undersized RDS instance and validates performance recovery", async () => {
  const engine = await readFile(new URL("../app/troubleshooting/simulators/aws/engine.ts", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  const lab = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  assert.match(engine, /createAwsLabStateForScenario/);
  assert.match(engine, /db\.cpuPercent = 96; db\.connections = 88; db\.instanceClass = "db\.t3\.medium"/);
  assert.match(lab, /Checkout latency: RDS database slowdown/);
  assert.match(lab, /Modify DB instance/);
  assert.match(consoleSource, /RDS CPU recovery/);
  assert.match(consoleSource, /cpuPercent:38/);
  assert.match(consoleSource, /window\.localStorage\.setItem\(storageKey/);
});

test("existing simulator state migrates the checkout listener topology without overwriting other listener settings", async () => {
  const engine = await readFile(new URL("../app/troubleshooting/simulators/aws/engine.ts", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  assert.match(engine, /const topologyUpgrade = \(savedState\.schemaVersion \?\? 0\) < 10/);
  assert.match(engine, /healthyPath: typeof group\.healthyPath/);
  assert.match(engine, /healthCheckPaths: item\.healthCheckPaths \?\? seeded\?\.healthCheckPaths/);
  assert.match(consoleSource, /savedGroup\?\.healthCheckPath === targetGroupHealthDraft\.path\.trim\(\)/);
  assert.match(engine, /const migratedTargetGroups = .*tg-payments-api/s);
  assert.match(consoleSource, /0 after recovery/);
  assert.match(consoleSource, /24 during seeded incident window/);
});


test("RAG stale-answer lab stages PDF metadata, syncs the seeded knowledge base, and reveals grounded mock results only after verification", async () => {
  const lab = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  assert.match(lab, /RAG ANSWER PLAYGROUND/);
  assert.match(lab, /How long must payment transaction records be retained/);
  assert.match(lab, /Payment transaction records must be retained for 7 years/);
  assert.match(lab, /Payment transaction records must be retained for 10 years/);
  assert.match(lab, /accept="application\/pdf,\.pdf"/);
  assert.match(lab, /PDF text is not extracted/);
  assert.match(lab, /selectedRagExample\.currentAnswer/);
  assert.match(lab, /aws-sim-upload-rag-document/);
  assert.match(consoleSource, /putAwsS3Object\(state, \{ bucketName: "ai-workloads", key, sizeBytes \}\)/);
  assert.match(consoleSource, /knowledge\/payments\/uploads\//);
  assert.match(consoleSource, /aws-sim-reset-rag-lab/);
  assert.match(consoleSource, /Knowledge-base freshness/);
});


test("RAG stale and updated answer examples are shown side by side before the AWS simulator iframe", async () => {
  const lab = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  const panel = lab.indexOf('aria-label="RAG answer comparison workbench"');
  const consoleFrame = lab.indexOf('<section className="vm-real-console shared-lab-console">');
  assert.ok(panel >= 0 && consoleFrame > panel, "RAG comparison should appear above the console iframe.");
  assert.match(lab, /BEFORE FIX · STALE RETRIEVAL/);
  assert.match(lab, /AFTER FIX · EXPECTED CURRENT ANSWER/);
  assert.match(lab, /selectedRagExample\.staleAnswer/);
  assert.match(lab, /selectedRagExample\.currentAnswer/);
  assert.match(lab, /Not verified yet/);
  assert.match(lab, /Recovery check passed/);
});
