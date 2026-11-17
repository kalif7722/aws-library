# AIP Module 02 — additional 20 visual references (slides 82–105)

Analyzed directly from the user's second set of 20 attached 1116×627 PNG previews, 17 November 2026. Order is attachment order, not all consecutive slides. This expands the 20-reference baseline to **40 reviewed examples**. These screenshots are reference assets; no original course slides were modified.

| # | Visible slide | Topic | Composition / distinctive educational treatment |
|---|---|---|---|
| 21 | 82 | Amazon DynamoDB | Four inline benefit icons above application fan-in→table with partitions underneath→Streams fan-out to consumers; direct service narrative, no repeated panels |
| 22 | 83 | DynamoDB basics | Almost full-width high-density colorful attribute taxonomy table; varied attribute examples and item schema; single compact bottom learning bar |
| 23 | 84 | Primary key: partition only | Large example Users table→hash function→distributed physical partitions; colored cylinders and curved arrows; avoids large prose cards |
| 24 | 85 | Composite primary key | Two-column key definitions + grouped table; distinct cyan partition key, violet sort key, orange key uniqueness warning |
| 25 | 86 | Choose a good partition key | Balanced cyan-vs-violet side-by-side heatmaps with checks/crosses and brief concluding choice |
| 26 | 87 | DynamoDB capacity modes | Two content-sized comparative panels with different header fills and actual capacity/control graphics |
| 27 | 88 | Provisioned capacity and throttling | Dominant full-width quantitative request-rate graph, orange capacity line, transient burst and red throttle annotations; narrow icon-led explanations underneath |
| 28 | 90 | Eventually versus strongly consistent reads | Top replication timeline and two concept comparisons; colored read paths and explicit RCU caveat |
| 29 | 92 | How DynamoDB partitions data | Multiple colored key/hash paths and partition split before/after; no universal footer |
| 30 | 93 | Why throttling happens | Three reason-specific mini-diagrams (bar graph, hot key traffic, item capacity) above a wide remedy rail |
| 31 | 94 | On-demand capacity | One dominant custom demand/capacity line plot and three concept-specific mini callouts |
| 32 | 95 | Writing items safely | PutItem and UpdateItem exact-operation examples with before/after tables; condition outcomes explicitly separated |
| 33 | 96 | GetItem by primary key | Targeted table row→GetItem syntax→selected response; bottom notes on consistency, projection and single-item access |
| 34 | 98 | Scan versus Query | Three columns, but each is purposefully *different* comparison of table scan, keyed query and parallel scan with colored selection traces |
| 35 | 99 | Delete operations | Two contrasting outcomes with annotated table rows, delete icon and destructive warning |
| 36 | 100 | Batch operations | Distinct BatchWriteItem and BatchGetItem panels and separate retry-decision flowchart |
| 37 | 101 | PartiQL for DynamoDB | Colored SELECT/INSERT/UPDATE/DELETE examples at left and console/SDK/API ingress→query→table |
| 38 | 103 | DAX versus ElastiCache | Two mirrored system architectures with differing caches and use cases; purple bottom comparison rail |
| 39 | 104 | DynamoDB Time to Live | Four explanations connected to item JSON→clock→asynchronous delete→Streams, with precise caveat |
| 40 | 105 | DynamoDB in GenAI | Three large colored principles at left, chat context architecture center/right and separate vector index path; diagram does not resemble a template |

## What 40 images establish more clearly than the first 20

- **The graphics are the lesson.** Charts, heatmaps, actual rows, policy/code, state transitions, bold identifiers and correctly directed interactions are more important than matching a shell.
- **Type is graphically alive.** Headlines can be sentence-case or all-caps, centered or left-aligned. Orange/cyan/violet highlighted terms appear *inside* explanatory sentences and labels, not just in titles. Emphasis is often much bigger than supporting copy; annotations remain readable.
- **Panel grammar is not fixed.** Some slides have no panel around the central chart, some have a full-width table, some compare two columns, some have three concept blocks, and some mix floating objects with small pills. Edges are thin where containment matters, absent elsewhere; selective stronger borders communicate separation. Panels can be colored/filled when semantically helpful.
- **Icon and diagram detail vary.** Rendered cylinders, heatmaps, charts, files, arrows and service pictograms are varied, relatively bright, and visually stimulating. Moderate object highlights are allowed; flat labels and low-gloss backgrounds preserve readability.
- **Density is skillfully composed rather than minimized.** Use large central diagram with small related explanations, annotated evidence instead of repeated prose, and grouped exact examples. Avoid shrunk technical text.
- **Bottom takeaways are conditional.** Several of the best reference slides deliberately have no bottom strip; others use a compact decision-oriented rail.
- **Source screenshots contain illustrative data and may include technical oversimplifications.** A visual reference is style evidence only: technical claims, quotas and examples require independent verification for a new course.

## Reuse by slide goal

- **Mechanism/architecture:** #21, #23, #29, #39, #40
- **Exact-data/contract:** #22, #24, #32, #33, #37
- **Measured behavior/graphs:** #25, #27, #30, #31
- **Decision/comparison:** #26, #28, #34, #35, #38
- **Process + recovery:** #30, #36, #39

## Design anti-patterns from rejected Security previews

The earlier S3/KMS candidate slides suffered from near-identical rectangular panel grammar, oversized title text across full width, almost all descriptions as uniform white text, strong visual emphasis on frame borders rather than teaching mechanisms, and repetitive three-callout + takeaway footers. Reject a candidate if removing its content leaves a recognizable repeated slide skeleton.
