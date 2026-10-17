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
