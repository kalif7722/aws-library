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
    "Checkout requests are slow or failing", "TargetResponseTime", "HTTPCode_Target_5XX_Count",
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
  assert.match(consoleSource, /TargetResponseTime/);
  assert.match(consoleSource, /HTTPCode_Target_5XX_Count/);
});


test("checkout latency lab follows the listener-to-target relationship and validates recovery", async () => {
  const engine = await readFile(new URL("../app/troubleshooting/simulators/aws/engine.ts", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  const lab = await readFile(new URL("../app/troubleshooting/labs/SharedConsoleTroubleshootingLab.tsx", import.meta.url), "utf8");
  assert.match(engine, /port: 8443, protocol: "HTTPS", targetGroupId: "tg-payments-admin"/);
  assert.match(engine, /id: "tg-payments-admin", name: "tg-payments-admin", protocol: "HTTP", port: 8080/);
  assert.match(lab, /HTTPS :8443/);
  assert.match(lab, /configured path \/ready differs from served path \/health/);
  assert.match(consoleSource, /HTTPS listener forwards to affected target group/);
  assert.match(consoleSource, /Registered target port/);
  assert.match(consoleSource, /Target health/);
  assert.doesNotMatch(lab, /Show CLI \/ diagnostic example/);
});


test("existing simulator state migrates the checkout listener topology without overwriting other listener settings", async () => {
  const engine = await readFile(new URL("../app/troubleshooting/simulators/aws/engine.ts", import.meta.url), "utf8");
  const consoleSource = await readFile(new URL("../app/troubleshooting/simulators/aws/page.tsx", import.meta.url), "utf8");
  assert.match(engine, /const topologyUpgrade = \(savedState\.schemaVersion \?\? 0\) < 8/);
  assert.match(engine, /const migratedTargetGroups = .*tg-payments-admin/s);
  assert.match(consoleSource, /0 after recovery/);
  assert.match(consoleSource, /24 during seeded incident window/);
});
