# SAA Module 12 — Integration and messaging

- Planned source range: course PDF pages 377–415.
- Published mapping: 37 lessons, including 11 new SAA visuals and 26 reviewed SAP Module 14 visuals.
- Topics: SQS standard/FIFO, visibility and long polling, retry and DLQ, SNS fan-out and filtering, EventBridge buses/rules/delivery, Kinesis Data Streams, Data Firehose, and service selection.
- Technical boundary: EventBridge target delivery retry and DLQ do not establish successful downstream processing. SQS consumers need idempotency even with FIFO producer deduplication.
- Source coverage status: topic mapping complete against the module plan; page-by-page verification against the original course PDF is still open. No 100% source coverage assertion is made.
- Related walkthroughs: EventBridge rule and SQS DLQ remain listed in the plan for separate lab review.
