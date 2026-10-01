# Architecture semantic review

Status: in progress. Catalog coverage and successful builds are not evidence of semantic correctness.

## Reviewed and corrected

- AWS Budgets: monthly project alert and approval-controlled action. Explicit descriptions for all 11 node occurrences; removed unrelated application-state diagram.
- AWS Cost Explorer: interactive FinOps analysis and post-anomaly investigation. Explicit descriptions for all 10 node occurrences, including report dimensions and ownership.
- Shared walkthrough summaries: resolve descriptions per node instead of combining different services into one classifier input.
- Named cloud services: subtitle keywords no longer override service identity.

## Remaining semantic review

All other AWS, Azure, and GCP architecture sources remain pending node-by-node verification. Previous service-family rules are not counted as individually reviewed descriptions.

Run `node scripts/audit-architecture-semantics.mjs` to inventory literal/dynamic nodes and generic copy candidates. This discovers source expressions, not all runtime diagrams; it must not be used as a semantic sign-off.

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

Verification: `node --test tests/financial-architecture-hover.test.mjs` asserts explicit descriptions for 21 financial node occurrences and different Budgets explanations by flow. Full production build is also required.
