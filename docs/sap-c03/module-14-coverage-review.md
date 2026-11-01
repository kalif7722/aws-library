# Module 14 — Messaging, events, and workflow orchestration

Source: *AWS Certified Solutions Architect Professional Slides v30.pdf*, physical pages 448–475 and 547–551 (33 pages). Review date: 2026-11-01.

## Scope and mapping

The 38 lesson visuals cover Step Functions, SQS, Amazon MQ, SNS, EventBridge, Scheduler, and Pipes. Four illustrated walkthroughs exercise DLQ/redrive, SNS fanout, workflow retry/compensation, and pattern/failed-target investigation. The prior item-level review counted 124 teachable points across 33 pages. The recovered `module-14-source-crosswalk.json` maps lessons to every assigned source page; its item-level notes are a condensed index of the prior review. The source is a topic inventory; current AWS documentation resolves outdated limits and delivery semantics. The course-wide 100% coverage claim remains false while later modules are pending.

## Detail checks

| Area | Explicitly checked details | Evidence |
|---|---|---|
| Step Functions | Standard/Express duration and execution contracts, supported integrations, states, execution roles, Retry/Catch, task token callback, compensation, execution history | Lessons 1–7, 33, 37; precision group 1 |
| SQS | Standard/FIFO ordering and deduplication, message group, receive/visibility/delete, long polling, retention/delay/payload, in-flight/backlog, DLQ/redrive, Lambda partial batch, correlation queues | Lessons 8–16, 35; precision group 2 |
| Amazon MQ | ActiveMQ/RabbitMQ broker choice, migration and client/protocol compatibility, operational ownership | Lesson 17; both comparison groups |
| SNS | Topic subscription and filtering, endpoint fanout, direct/mobile publish, IAM/KMS/topic/queue policies, durable SQS fanout, S3 routes, Firehose, FIFO subscribers | Lessons 18–25, 36; precision group 3 |
| EventBridge | Default/custom/partner buses, patterns, target retry/DLQ, cross-account policy, archive/replay, schema registry | Lessons 26–30, 38; precision group 4 |
| Scheduler and Pipes | One-time/recurring schedule, time zone, flexible window, execution role/retry/DLQ; polling source, filter, enrichment, target, source-specific retries | Lessons 31–32; precision group 5 |
| Service selection | Queue vs topic vs event bus vs broker vs orchestration; ordering, retention, replay, permissions, failure domain | Lessons 33–34; 17 comparison rows |

## Corrections relative to older slide claims

* SQS current documented message maximum is 1 MiB rather than the older 256 KiB baseline; larger payload approaches have distinct constraints.
* Standard Step Functions can run up to one year and Express up to five minutes. Asynchronous Express is at-least-once; synchronous Express is at-most-once. Workflow execution semantics do not imply exactly-once external side effects.
* SNS large-message support is endpoint- and subscription-limited; a blanket 256 KiB maximum or unrestricted 2 MiB claim would be misleading.
* SNS FIFO supports ordered delivery to eligible subscriptions; SQS FIFO ordering is by message group. Throughput quotas and EventBridge target retry behavior depend on configuration and Region.
* EventBridge target API acceptance is separate from downstream Lambda handler success. Archive replay can re-trigger matching rules and requires consumer idempotency.

Source URLs and reviewed date are in `module-14-source-verification.json`. Lesson metadata and native comparison/precision tables are part of the production module, alongside the visuals. Illustrative walkthroughs do not assert real AWS account execution.
