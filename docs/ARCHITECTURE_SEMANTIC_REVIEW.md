# Architecture semantic review

Status: in progress. Catalog coverage and successful builds are not evidence of semantic correctness.

## Reviewed and corrected

- AWS Budgets: monthly project alert and approval-controlled action. Explicit descriptions for all 11 node occurrences; removed unrelated application-state diagram.
- AWS Cost Explorer: interactive FinOps analysis and post-anomaly investigation. Explicit descriptions for all 10 node occurrences, including report dimensions and ownership.
- Shared walkthrough summaries: resolve descriptions per node instead of combining different services into one classifier input.
- Named cloud services: subtitle keywords no longer override service identity.
- Added 203 explicitly authored cross-cloud workflows with 1,513 node occurrence descriptions across `lib/reviewed-*-architectures.ts`. These cover uploads, request handling, queues, protected ingress, CDN origins, security findings, policy guardrails, backup, recovery, migration, tracing, private access, cache-aside workloads, secrets, envelope encryption, identity, container delivery, releases, database transactions, persistent storage, hybrid networking, infrastructure operations, analytics and application integration. The latest 100-service release uses complete workload diagrams with explicit connections. The learning-layout repair separates the service walkthrough from application context and expands all 35 short reviewed examples with authored dependencies and recovery/outcome paths. Registry aliases are not additional reviewed services.
- Security Hub now includes a GuardDuty finding response with validation, analyst approval, a concurrency-safe Network Firewall rule update and containment verification. Finding routing and firewall traffic enforcement are distinct stages.
- The Service Bus catalog name now maps to its reviewed fulfillment workflow. API Gateway, database and orchestration service pages select relevant explicitly authored workflows rather than their previous category templates.
- AWS, Azure, and GCP renderers select these reviewed workflows before older category templates. Hover lookup uses the exact architecture title and node label.

## Remaining semantic review

Architectures outside the financial and explicit reviewed registries remain pending node-by-node verification. Previous service-family rules are not counted as individually reviewed descriptions. This is a staged rollout, not a complete catalog sign-off.

Run `node scripts/audit-architecture-semantics.mjs` to inventory literal/dynamic nodes and generic copy candidates. This discovers source expressions, not all runtime diagrams; it must not be used as a semantic sign-off.

Run `node scripts/report-architecture-review.mjs` to regenerate `docs/ARCHITECTURE_REVIEW_SERVICE_LIST.md`. Current catalog coverage: AWS 101/321, Azure 76/203, GCP 67/177. All 457 other catalog services remain pending individual semantic review. These counts are not a claim that every supporting-service node has a fully reviewed standalone service page.

## Acceptance criteria for each architecture

1. Use a concrete workload with a correct service boundary; replace category templates that imply unsupported integrations.
2. Distinguish request/data flow, control-plane configuration, telemetry, billing, and human decisions. Adjacency is not evidence of a service-to-service data transfer.
3. Give every node an explicit action or responsibility for that exact flow; do not construct prose from its subtitle.
4. State the input and outcome only where the integration actually supplies them. Document permission and failure behavior where relevant.
5. Verify against official documentation. Do not imply budgets cap charges, replicas replace backups, WAF runs application code, or monitoring is a backend's business purpose.
6. Test repeated service names in different flows, multi-node layers, and unmatched descriptions. Preserve colors, icons, responsive layout, and shared course routing.

## Financial documentation

- https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-action-configure.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/ce-filtering.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/ce-modify.html

Verification: the financial, reviewed-workload, reviewed-scale and topology-render and learning-repair suites pass 30 tests covering exact hover lookup, distinct workload responsibilities, queue acknowledgements, storage reads, WAF placement, GCP adapters, provider-qualified names, complete connection graphs and rendered node coverage. The production build passes with the topology renderer integrated in all selected service-page paths. Local preview browser access was blocked, so a screenshot-based visual audit is not claimed.
