# Module 13 coverage review — Lambda, API Gateway and application APIs

Reviewed 2026-10-31. Scope: the 35 physical PDF pages 225–238, 255–271 and 311–314 in *AWS Certified Solutions Architect Professional Slides v30.pdf*. Pages 239–254 are covered by the existing Module 08 ingress audit. The PDF supplies topic depth; current AWS documentation and the SAP-C03 guide resolve current behavior. Explanations and diagrams are original.

## Delivered teaching material

49 visual lessons follow the Module 09 presentation system: dark navy, cyan outlined explanatory panels, functional service diagrams, white/amber headings and a Remember takeaway. Five explicitly illustrative sandbox walkthroughs cover async failure retention, private-network timeout diagnosis, REST throttling versus malformed proxy responses, AppSync allowed/denied access, and Lambda alias canary promotion/rollback. They describe prepare, test, verify and cleanup; no actual AWS account execution is claimed.

Three attractive comparison groups contain 41 rows spanning API front doors, execution/delivery choices and supporting AWS services. Seven precision groups contain 67 rows with exact limits, conditions, permissions, operational trade-offs and common exam traps. Tables retain the established sticky service column/header, accessible horizontal scroll, service icons and collapsible groups. Official AWS SVG assets come from the July 2026 architecture icon package; diagram illustrations use recognizable service symbols.

The source crosswalk inventories 261 details, with physical-page references and lesson evidence. Every inventory entry is reviewed and mapped. The 49 accepted lesson assets, readable explanatory notes and native precision tables form the scoped module coverage. The visual plan, source verification list, icon provenance and asset hash manifest make this review reproducible.

## Material corrections and qualifications

- Standard Lambda CPU is proportional to memory; 1,769 MB corresponds to one vCPU. Standard timeout is 900 seconds; eligible Lambda Managed Instances have a separately qualified longer async/event-source-mapping limit. Temporary storage, packaging and payload limits are separate.
- Async Lambda event payloads are 1 MB rather than the older PDF's 256 KB. Buffered synchronous invocation is 6 MB; Lambda response streaming and API Gateway streaming have distinct contracts and thresholds.
- Reserved concurrency allocates/caps capacity; provisioned concurrency prepares environments. SnapStart compatibility and current runtimes are explicitly qualified. Published code/configuration immutability does not imply operational settings or runtime patches never change.
- Synchronous callers, asynchronous delivery, the Lambda async queue and event-source-mapping pollers have separate retries and failure retention. SQS acknowledgments and stream checkpoints are not modeled as republishing failed records. SNS's smaller payload limit still matters for destination records.
- Customer VPC attachment does not create a public IP. Private RDS traffic stays on the private route; a NAT gateway serves a separate IPv4 internet path. The timeout walkthrough fixes a missing database security-group rule, not a NAT route.
- Current REST VPC Link V2 supports ALB/NLB; private backend integration and a private API endpoint have opposite directions. REST/HTTP/WebSocket products have different authentication, caching, limits and integration features.
- API keys meter consumers rather than authenticate users or impose a guaranteed spending ceiling. CORS is a browser access mechanism. Token issuers return tokens to clients; clients send API requests. Application tenant predicates remain necessary independently of resolver IAM.
- API Gateway stage throttling (429) and a malformed REST Lambda proxy response (502) have distinct evidence and fixes. WebSocket connection limits, signed HTTPS management callbacks and stale connection handling are explicit.
- AppSync GraphQL schema/resolvers, authorization modes, mutation-linked subscriptions and offline/conflict handling are separated from AppSync Events. ALB Lambda targets and function URLs have their own permissions and payload constraints.
- X-Ray SDK/daemon maintenance and support dates are qualified; OpenTelemetry is the forward instrumentation path. The X-Ray service is not described as retired.

## Visual review

All selected final visuals were inspected for technical relationships, text legibility and consistency. Drafts with incorrect token flow, serial alternative front doors, NAT-to-RDS routing, destination evidence, API error examples or alias targeting were corrected before acceptance. Exact qualifiers live in native precision tables as well as the relevant visual lessons. Illustrative numerical examples are labeled, and are not presented as measured production results.

## Coverage boundary

This completes the Module 13 scoped inventory. It does not establish 100% whole-course coverage. Future modules and guide skills remain in progress. The course audit keeps `claim100PercentCoverage` false. Module 14 is next; it is not included in this release.

Validation evidence is recorded in `module-13-visual-qa.json` and the corresponding SHA-256 asset manifest. The release is one complete module on main, without a PR or an unrelated hosting deployment.
