# SAA Module 15 — Databases, data, analytics and ML

- Planned source range: SAA course PDF pages 516–577.
- Published mapping: 57 lessons, 16 new SAA visuals and 41 reviewed SAP visuals (15 DynamoDB from SAP Module 11, 26 data/analytics from SAP Module 16).
- Topics: DynamoDB keys/indexes/capacity/hot partitions/Streams/backups; Batch, EMR, Glue, Redshift, Athena, QuickSight, purpose-built data choices and managed ML awareness.
- Technical distinctions: LSI shares the base partition key and is created with the table, while a GSI can use another partition key and be added later. Athena partition pruning and columnar formats can reduce scanned data. DAX does not solve hot writes.
- Source status: module topics are mapped; page-by-page comparison against the original SAA PDF remains open. No 100% source coverage assertion is made.
- Related walkthrough: DynamoDB table/item lab remains in the course plan for separate review.
