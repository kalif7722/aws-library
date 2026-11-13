# AIP Module 19 — Student Troubleshooting Walkthrough Guide

This instructor and student checklist supplements the module narration standard. It follows the twelve existing simulator scenarios and their 74 visual steps. The lessons must later be narrated against inspected original source images; this guide alone is not an image audit or rendered video.

## How to use each lecture

For each visual: (1) identify the exact observed symptom and expected baseline, (2) point to the specific simulated AWS console or application workbench control, (3) explain what a healthy versus failing output would show, (4) decide the next investigation, (5) apply only the targeted change when evidence supports it, (6) rerun a success and failure test, and (7) explain recurrence prevention. Use synthetic examples and preserve Challenge-mode answer secrecy.

## Lab 01: Context overflow and truncated inputs — slides 1–5

**Evidence to inspect:** Open CloudWatch → Log events and compare inputTokens, contextLimit and reserved output. The playground working does not prove the assembled application prompt fits.

**Targeted repair:** In Application workbench, select relevant context, use the model-supported tokenizer, and reject over-budget input explicitly. Keep output reservation; do not silently truncate the last pages.

**Verification and expected result:** Run the fixture suite. Confirm the long contract retains its termination clause, short input still works, and overflow returns an explicit application error.

**Slide-by-slide teaching checkpoints:**
- **Slide 01 — Scenario and architecture:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 02 — Context concepts and failure branches:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 03 — Collect exact prompt and token evidence:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 04 — Fix prompt assembly and chunk selection:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 05 — Verify complete answers and prevent recurrence:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 02: Invalid model API request or response — slides 6–11

**Evidence to inspect:** Inspect the runtime error and request ID in CloudWatch. Check HTTP status before changing IAM. Compare the raw request with the Converse content-block schema.

**Targeted repair:** In Application workbench, repair request.messages[].content and the response parsePath. A valid HTTP response and a valid application parser are separate checks.

**Verification and expected result:** Test a valid request and an intentionally malformed content block. The valid path must parse text; the malformed path must stay a 400, not be retried or relabelled AccessDenied.

**Slide-by-slide teaching checkpoints:**
- **Slide 06 — Scenario and request path:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 07 — Classify error codes before changing permissions:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 08 — Inspect and repair request contract:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 09 — Parse response content blocks safely:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 10 — Check model region and scoped permissions separately:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 11 — Verify positive and malformed-request tests:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 03: Throttling and retry failures — slides 12–17

**Evidence to inspect:** Inspect concurrency, attempts, throttling and queue pressure. Use the model/Region quota scope; the numbers here are a controlled teaching fixture, not live quotas.

**Targeted repair:** Set bounded exponential backoff with full jitter and a deadline in Application workbench. Reduce admitted concurrency and enable the application queue. Avoid nested SDK/application retry loops.

**Verification and expected result:** Run the representative burst and non-retryable-400 cases. Check successful requests, retry budget and sample p95/cost together; do not load-test a production endpoint.

**Slide-by-slide teaching checkpoints:**
- **Slide 12 — Scenario and retry-storm architecture:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 13 — Measure request and token quota pressure:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 14 — Inspect retry amplification with request IDs:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 15 — Implement bounded jitter and retry budget:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 16 — Control concurrency and capacity deliberately:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 17 — Load-test recovery and verify costs:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 04: Streaming timeout or incomplete response — slides 18–23

**Evidence to inspect:** Inspect the event sequence and timestamps in CloudWatch. Distinguish a model max_tokens stop from a transport disconnect.

**Targeted repair:** In Application workbench, use messageStop as the terminal signal. Give the slow fixture enough read timeout, propagate cancellation, and do not concatenate a retried complete answer with partial text.

**Verification and expected result:** Test normal, slow, interrupted and output-limited streams. Only a valid terminal event may be labelled complete. Use an async path for work that cannot fit the real ingress timeout.

**Slide-by-slide teaching checkpoints:**
- **Slide 18 — Scenario and end-to-end streaming path:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 19 — Locate timeout boundary with timestamps:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 20 — Inspect stream events and stop reasons:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 21 — Fix parser completion and error handling:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 22 — Align timeouts cancellation and async fallback:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 23 — Verify slow interrupted and normal streams:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 05: Prompt version regression — slides 24–28

**Evidence to inspect:** Compare prompt versions, resolved variables and output schema in the application trace. Use the same golden dataset and model settings.

**Targeted repair:** Repair the template or roll back to the JSON-contract version in Application workbench. Resolve the customer variable and enable application output validation; prompting alone is not a parser guarantee.

**Verification and expected result:** Run known-customer, missing-variable and schema-invalid cases. Record prompt/version/settings with quality, safety, latency and token-cost evidence before promotion.

**Slide-by-slide teaching checkpoints:**
- **Slide 24 — Scenario and versioned prompt path:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 25 — Build a reproducible prompt comparison:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 26 — Find variable and output-contract regressions:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 27 — Repair or roll back with schema validation:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 28 — Verify golden cases and release gate:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 06: Stale Knowledge Base after an update — slides 29–35

**Evidence to inspect:** Inspect S3 → policy.pdf versions, then Bedrock → Knowledge bases → Data source and sync history. Uploading v18 does not mean it was indexed.

**Targeted repair:** Select Sync in the knowledge-base data source. Verify raw retrieval returns v18. Then correct the application cache version and KB routing in Application workbench; cache controls are not native Bedrock playground settings.

**Verification and expected result:** Run the policy and no-answer fixtures. The answer must say 30 days and cite policy.pdf version 18. Confirm tenant cache separation, not merely a successful ingestion banner.

**Slide-by-slide teaching checkpoints:**
- **Slide 29 — Scenario and ingestion versus query architecture:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 30 — Verify source object and policy version:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 31 — Inspect data source sync and ingestion failures:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 32 — Repair scoped access parsing and indexing:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 33 — Retrieve directly and eliminate stale duplicates:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 34 — Check answer cache routing and citations:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 35 — Verify updated answer and regression evidence:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 07: Irrelevant retrieved context — slides 36–41

**Evidence to inspect:** Inspect raw retrieved passages in Bedrock → Knowledge bases → Test. Compare category and tenant metadata to the query; do not start by swapping the generation model.

**Targeted repair:** Correct the authorized category filter and evidence coverage in Application workbench. Keep tenant=acme. Changing chunking or embedding strategy in a real system can require rebuilding the index.

**Verification and expected result:** Run refund, shipping and cross-tenant fixtures. Compare labelled retrieval relevance/coverage; never use a raw score as a universal quality threshold across engines.

**Slide-by-slide teaching checkpoints:**
- **Slide 36 — Scenario and retrieval pipeline:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 37 — Inspect raw top-K chunks and provenance:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 38 — Diagnose chunk embedding and filter mismatch:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 39 — Tune retrieval with security preserved:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 40 — Reindex and compare labelled queries:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 41 — Verify grounded answers and remaining misses:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 08: Slow or failing vector search — slides 42–48

**Evidence to inspect:** Inspect OpenSearch collection/index details, access gates and dimensions, then CloudWatch timing. This fixture has healthy permissions and a compatible index; retrieval is the slow stage.

**Targeted repair:** Narrow the application query, use measured top-K and bound concurrency in Application workbench. Do not increase capacity or change the generation model without evidence.

**Verification and expected result:** Run latency and labelled-relevance fixtures. Check p95 and quality together. Inspect denied-access and dimension-mismatch examples as different failure classes, not retryable slowness.

**Slide-by-slide teaching checkpoints:**
- **Slide 42 — Scenario and latency budget:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 43 — Isolate slow retrieval from model generation:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 44 — Diagnose network IAM and data-access gates:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 45 — Validate index dimensions and ingestion state:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 46 — Inspect capacity and expensive query shape:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 47 — Apply targeted tuning with bounded load:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 48 — Verify p95 quality and cost together:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 09: Plausible answer without evidence — slides 49–54

**Evidence to inspect:** Compare the 90-day answer to the exact v18 source passage in raw retrieval. A citation marker is not proof that the cited span supports the claim.

**Targeted repair:** In Application workbench, require authorized evidence, validate citation spans, and abstain when evidence is missing or conflicting. Treat retrieved instructions as untrusted data.

**Verification and expected result:** Run supported, unsupported and no-answer fixtures. Supported response: 30 days with a matching span. Unsupported/conflicting response: cannot determine from available sources, with escalation where appropriate.

**Slide-by-slide teaching checkpoints:**
- **Slide 49 — Scenario and evidence chain:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 50 — Trace claims to retrieved source passages:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 51 — Distinguish retrieval gap from generation failure:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 52 — Fix grounding citations and abstention policy:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 53 — Evaluate supported conflicting and absent evidence:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 54 — Verify quality gate and human escalation:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 10: Agent tool failure or loop — slides 55–61

**Evidence to inspect:** Open Lambda to inspect the function output, and Bedrock → Agents → Test → Show trace to identify repeated calls and correlation fields. IAM is already scoped correctly in this fixture.

**Targeted repair:** Repair the function-details action-group response envelope in Application workbench. Bound calls and use idempotency for writes. Then select Prepare in the agent working draft; changes are not automatically prepared.

**Verification and expected result:** Run success, invalid-input, missing-order, denied-access and timeout fixtures. A104 should return SHIPPED once; all failures must terminate without repeated side effects.

**Slide-by-slide teaching checkpoints:**
- **Slide 55 — Scenario and agent tool architecture:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 56 — Inspect trace and repeated tool calls:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 57 — Validate arguments and result contract:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 58 — Diagnose Lambda and downstream permissions:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 59 — Repair tool behavior and version routing:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 60 — Bound loops retries and side effects:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 61 — Verify success denied timeout and invalid-input paths:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 11: Unsafe input or output — slides 62–67

**Evidence to inspect:** Inspect Bedrock → Guardrails → Working draft and Versions, then the guardrail version actually invoked by the application. Use only synthetic test inputs and dummy identifiers.

**Targeted repair:** Enable the draft safeguards and create numeric version 2. In Application workbench, invoke version 2, distrust source instructions, redact logs and buffer output before display. Guardrails do not replace authorization or tool scope checks.

**Verification and expected result:** Run synthetic instruction-override, dummy-identifier and benign-task fixtures. Verify output, streaming and logs together, including false-positive protection for the legitimate refund question.

**Slide-by-slide teaching checkpoints:**
- **Slide 62 — Scenario and trust-boundary map:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 63 — Reproduce with synthetic redacted evidence:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 64 — Inspect guardrail version invocation and policy:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 65 — Enforce input retrieval tool and output controls:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 66 — Verify streaming and logging do not leak:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 67 — Run safety and legitimate-task regression suite:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

## Lab 12: Model deployment regression — slides 68–74

**Evidence to inspect:** Inspect CloudWatch version-tagged canary evidence and the application release manifest. Separate model/prompt changes from embedding/index compatibility.

**Targeted repair:** In Application workbench, route a small canary to the compatible baseline A bundle: prompt-1, embed-A, index-A. There is no universal Bedrock rollback button; routing belongs to the deployment/application layer.

**Verification and expected result:** Run quality, safety, latency and cost gates on fixed inputs before widening traffic. Preserve a rollback manifest and compatible index so the previous release is actually recoverable.

**Slide-by-slide teaching checkpoints:**
- **Slide 68 — Scenario and release dependency graph:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 69 — Capture versions and comparable baseline:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 70 — Inspect canary metrics and quality failures:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 71 — Isolate model prompt embedding and config changes:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 72 — Roll back routing and compatible index safely:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 73 — Re-test quality latency cost and safety gates:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.
- **Slide 74 — Verify staged promotion and rollback readiness:** Walk the pictured architecture/console in order. State the student's next concrete action, which field or event is important, what should be seen, and what alternative result changes the diagnosis. Connect the step to the evidence/repair/verification sequence above; do not reveal the final cause before confirming it.

