# AWS Console Simulator — Build Plan & Progress Tracker

**Repository:** `kalif7722/aws-library`  
**Working branch:** `feature/troubleshooting-guided-flow`  
**Pull request:** [#5 — Build console-first AWS account simulator](https://github.com/kalif7722/aws-library/pull/5)  
**Status:** In progress — shared AWS application/data/identity graph; current head awaits build/test validation  
**Last reviewed:** 2026-10-15 (build-blocker correction recorded)

This is the source-of-truth tracker for the AWS simulator. Update the checkboxes and status notes in the same change as each meaningful implementation step. Do not mark work complete until it is implemented and validated.

## Product rules (must remain true)

- [x] **Console-first:** learners browse the simulated AWS account and discover issues themselves.
- [x] No incident selector, disclosed root cause, or diagnostic checklist in the normal console.
- [x] A shared simulated account/resource graph; service pages must read and update the same underlying resources.
- [ ] Resource changes propagate consistently to dependent views and troubleshooting evaluations.
- [ ] Each service screen should feel like a credible AWS console workflow before moving to the next service family.
- [ ] Clearly distinguish implemented simulator behavior from catalog-only/planned services.
- [ ] Preserve existing learning-site behavior; keep the simulator work on its feature branch until reviewed.

## Progress at a glance

| Workstream | Status | Notes |
|---|---|---|
| Console shell and service discovery | **Mostly complete** | Home, categorized navigation, search, account/Region context, simulated/planned labels |
| Service catalog | **Complete for current catalog scope** | 89 unique catalog entries; catalog entries are not all functional simulators |
| EC2 inventory and lifecycle | **Implemented; validation pending** | Launch workflow, multi-instance inventory, scoped lifecycle actions, bulk start/stop/reboot and tag CRUD; browser/build verification remains |
| Security Groups | **Ingress/egress CRUD implemented; validation pending** | Selectable inventory; inbound and outbound rule create/edit/delete with shared validation; end-to-end verification remains |
| VPC / subnets / route tables | **Core model wired; validation pending** | One VPC, four public/private subnets across two AZs, two route tables, subnet associations, route create/edit/delete, connected target subnets and RDS/ALB placements |
| Network ACLs | **CRUD implemented; validation pending** | Numeric priority, validated create/edit/renumber/delete UI and shared reachability evaluation |
| Shared network reachability | **Expanded; validation pending** | Selected source/destination EC2, attached SGs, target subnet route table, instance health, guest listener and inbound/return-path NACL checks; DB connectivity also evaluates local route, DB SG, and both NACL directions |
| S3 | **Basic config flows implemented** | Three bucket records; public-access block, versioning, encryption and shared-state updates. Object-level workflows and policy evaluation remain future work |
| IAM and Lambda | **Shared configuration and readiness modeled** | Three Lambda functions, execution-role trust/policy checks, invocation retry behavior, per-function error counts and CloudWatch impact |
| Load Balancing | **Shared model and health checks implemented** | One ALB across two public subnets, listeners, two target groups, registered EC2 target, port/SG checks and configurable health-check paths |
| RDS | **Shared model and connectivity checks implemented** | Private PostgreSQL resource in two private subnets; status, endpoint/port, DB SG, route and stateless NACL checks |
| Route 53 | **Shared record targeting implemented** | Public/private example zones, records to ALB/RDS, resource-target mismatch detection and stale-target exercise |
| DynamoDB | **Inventory/configuration data seeded** | Orders and IdempotencyKeys tables; capacity, encryption, item counts, throttling and recovery configuration are displayed |
| CloudWatch | **Alarm states computed from shared model** | Target health, RDS connections/state, Lambda errors and Glue data freshness feed four alarms; successful curation resolves the Glue alarm |
| CloudTrail | **Event history modeled** | Seeded API events include DynamoDB AccessDenied, missing S3 object, DNS target edit, target-group change and NAT change; key simulator actions append new events |
| Glue and S3 objects | **Shared ingestion workflow modeled** | Four buckets and object keys, one daily curation job, expected partition detection, output freshness checks, object upload and Glue rerun path |
| Cost Explorer | **Usage breakdown modeled** | Seven usage line items total the seeded month-to-date cost; NAT gateway byte usage exceeds its baseline and can be investigated alongside CloudTrail |
| Other catalog services | **Catalog-only / partially simulated** | Only entries explicitly marked implemented should be treated as working simulators |
| Automated validation / build | **Previous builds reported green; current graph changes pending** | The project owner reported two successful Cloudflare builds after the JSX correction. Those builds preceded the latest shared-service model/UI/tests; the current head needs a fresh build and test run |
| Deployment | **Not verified** | Do not assume changes are live until deployment is explicitly checked |

## Phase 0 — Architecture and working discipline

- [x] Use one shared `AwsLabState` model for simulated account state.
- [x] Separate engine logic from React console UI.
- [x] Persist account changes locally and normalize legacy saved state when the model evolves.
- [x] Add regression tests for engine behavior and service-directory invariants.
- [ ] Establish a repeatable local test/build command and record actual results before calling a change validated.
- [ ] Keep a clear boundary between implemented features and catalog-only placeholders.

**Exit gate:** state migrations are safe, core engine behavior is tested, and a reproducible validation command is documented.

## Phase 1 — AWS console shell and discovery

- [x] Console home and AWS-style service navigation.
- [x] Searchable, categorized service directory.
- [x] Account/Region context and explicit simulated/planned labels.
- [x] Separate console subpages from actual AWS services in the catalog.
- [x] Expand catalog to 89 unique entries.
- [ ] Review shell consistency across desktop and narrower viewports.
- [ ] Confirm all navigation labels lead to the correct implemented screen or clearly marked placeholder.

**Status:** Mostly complete. The catalog breadth must not be confused with functional service coverage.

## Phase 2 — EC2 and VPC: make the core console credible

**Current priority. Do not start another service family until the exit gate below is met.**

### 2A. EC2 inventory and instance lifecycle

- [x] Search by instance name, ID and private IP.
- [x] Filter by instance state.
- [x] Select rows independently from opening instance details.
- [x] Refresh action/timestamp.
- [x] Start, stop and reboot update shared simulated state.
- [x] Instance detail tabs and related-resource navigation.
- [x] Implement a functional **Launch instance** workflow with name/type/subnet/security-group validation and local resource creation.
- [x] Add a backward-compatible multi-instance collection, launch workflow, inventory, selection, and per-instance lifecycle helpers; browser/build verification remains.
- [x] Implement instance tag editing with key/value validation and selected-instance scoping.
- [x] Add safe bulk start/stop/reboot actions for selected instances; bulk termination remains intentionally disabled.
- [ ] Make empty states, validation, pending/terminal states and action feedback consistent with the rest of the console (pending/terminal lifecycle states are not modeled yet).
- [ ] Verify lifecycle actions affect dependent views and reachability outcomes in a running browser session.

### 2B. VPC and subnet inventory

- [x] Replace the static VPC presentation with a shared inventory for the seeded VPC and connected subnets.
- [x] Render subnet inventory with CIDR, Availability Zone, route table association and status fields.
- [x] Support selecting VPCs/subnets and navigating to related resources.
- [ ] Verify resource IDs, CIDRs and associations agree across VPC, Subnets, Route Tables, NACLs, EC2 and Reachability Analyzer through browser walkthroughs.
- [x] Add safe migration for legacy single-instance/network state and missing resource collections; regression tests added, runtime verification pending.

### 2C. Security Groups

- [x] Show a selectable inventory of seeded security groups.
- [x] Show rules for the selected security group.
- [x] Add inbound rule create/edit/delete flows with port, protocol, CIDR/source-group and duplicate validation. Outbound rule editing remains to be added.
- [x] Add outbound-rule create/edit/delete and default egress state; end-to-end verification of both directions and resource associations remains.
- [x] Wire Security Group edits into shared state and add selected-instance reachability regression coverage; run tests before treating as verified.

### 2D. Route Tables

- [x] Show route-table route and association/tag tabs.
- [x] Route state participates in shared reachability evaluation.
- [x] Add validated subnet-to-route-table association helper, route-table inventory/selection, and subnet association controls; browser validation pending.
- [x] Implement route create/edit/delete flows with destination CIDR, known-target, duplicate-destination, and protected-local-route validation.
- [x] Resolve the selected destination instance's subnet route table in Reachability Analyzer; primary-instance legacy route state remains compatible.
- [x] Show active/blackhole route state and allow toggling it in the selected route table; route create/edit/delete still remain.

### 2E. Network ACLs

- [x] Display numbered rules in numeric priority order.
- [x] Evaluate the lowest-numbered matching rule first, with implicit deny when nothing matches.
- [x] Create-rule editor with validation for number, duplicate direction/number, port/range and IPv4 CIDR.
- [x] Edit existing rules, including rule-number changes with direction-local duplicate validation.
- [x] Reorder rules by changing rule numbers while preventing direction-local duplicates.
- [x] Delete rules with clear feedback.
- [x] Validate supported NACL protocols and wildcard ports for all-traffic rules; expand coverage if additional protocol families are modeled.
- [ ] Verify inbound and return-path outbound rules both affect reachability.

### 2F. Reachability and cross-resource consistency

- [x] Evaluate instance health, security-group ingress, route state and inbound/return-path NACL checks through shared engine logic.
- [x] Reachability Analyzer uses the shared configuration engine.
- [x] Add tests for multiple instances, subnet-specific route tables, attached security groups and selected-resource relationships.
- [x] Add tests for route association changes and Security Group edits changing reachability; continue expanding NACL/VPC edge-case coverage.
- [x] Keep the normal console free of an incident picker or pre-revealed root cause; expose path evaluation only through Reachability Analyzer.
- [ ] Verify every configuration change is reflected consistently across inventory, details and diagnostic screens in a browser session.

### Phase 2 exit gate — required before moving on

- [ ] Launch and manage multiple instances through the UI.
- [ ] VPC and subnet inventories are selectable and connected to real shared simulated state.
- [ ] Security Group, Route Table and NACL edits persist and validate.
- [ ] Route/subnet/SG/NACL relationships are consistent across all relevant screens.
- [ ] Regression tests cover successful paths, invalid input, persistence/migration and reachability changes.
- [ ] A local production build and test suite pass, with exact commands/results recorded.
- [ ] Manually walk at least one working network path and one broken path by inspecting normal console configuration—not by selecting a canned incident.
- [ ] Review the finished EC2/VPC experience before approving any work on another service family.

## Phase 3 — Troubleshooting and realism hardening

Begin after Phase 2 exit gate.

- [x] Seed a shared connected application graph for ALB → target group → EC2 → RDS/Lambda/DynamoDB, plus Route 53 and CloudWatch links.
- [x] Add CloudTrail event history, S3 object-level data, a repairable Glue curation job and cost-usage dimensions for stale-data, access-denied and cost-spike labs.
- [x] Make selected configuration changes affect dependent checks: target health path/listener, DB status/security group/NACL, DNS target, Lambda role policy and invocation error count.
- [x] Add regression tests for cross-service state transitions and legacy-state migration; execution remains pending on the latest branch head.
- [ ] Expand S3 access-policy evaluation and wire all supported actions into audit history; CloudTrail and object-level data are now seeded and partially interactive.
- [ ] Improve empty/error states, action feedback, accessibility, keyboard use and responsive browser behavior.
- [ ] Extend IAM policy evaluation beyond the currently simulated policy-attachment/readiness cases.

## Phase 4 — Expand service families (one at a time)

Only start a service family after its prerequisite resource relationships are defined and Phase 2 is approved.

For each service, use the same checklist:
- [ ] Define the resource data model and links to existing resources.
- [ ] Implement inventory/list and resource details.
- [ ] Implement the most important create/edit/delete or lifecycle workflows.
- [ ] Add input validation, persistence and migration where needed.
- [ ] Connect configuration to shared evaluation/dependent screens where relevant.
- [ ] Add engine/UI regression tests.
- [ ] Validate the full workflow before moving to the next service.

Suggested order after EC2/VPC: **Load Balancing → DNS/network edge → S3 → IAM → monitoring/diagnostics → other catalog services.** Revisit the order only if dependencies justify it. Do not represent a catalog-only entry as a working simulator.

## Phase 5 — Release readiness

- [ ] Run the repository's documented test suite.
- [ ] Run the production build.
- [ ] Review changed files and browser-console/runtime errors.
- [ ] Test persisted state and migration from a pre-change saved account.
- [ ] Verify Cloudflare deployment status separately; a GitHub commit alone is not proof of deployment.
- [ ] Update the PR summary and this tracker with exact validation results.
- [ ] Review and approve the PR before merging; do not merge or deploy implicitly.

## Current next actions (ordered)

1. [x] Inspect package scripts and document commands: `npm run build`, `node --test tests/*.test.mjs`, and `npm test` (build + tests); execution is still pending.
2. [x] Implement EC2 Launch Instance flow and backward-compatible multi-instance state/UI.
3. [x] Add instance tag editing and safe bulk start/stop/reboot actions.
4. [x] Wire VPC/subnet inventories, resource selection and related navigation.
5. [x] Add route-table inventory and subnet association editing.
6. [x] Add NACL edit/renumber/delete.
7. [ ] Complete outbound Security Group rule editing and broader cross-resource regression coverage.
8. [ ] Run tests/build and record actual results.
9. [ ] Complete the Phase 2 exit gate review before adding another service family.

## Latest verification update — 2026-10-15

- The project owner reported two successful Cloudflare builds after the EC2 Tags JSX correction. Those builds preceded the later shared-service graph and current CloudTrail/Glue/S3-object/Cost Explorer additions.
- The current source adds **CloudTrail event history**, a repairable S3-to-Glue ingestion workflow, object-level S3 inventory/upload, cost-usage breakdown, and a CloudWatch Glue freshness alarm. Persisted simulator state is now schema v5; migrations preserve saved configuration and backfill newly added alarm definitions. A follow-up review fixed the service-panel allowlist for Glue/CloudTrail and added an IAM-policy repair regression test.
- The shared application graph now covers EC2/VPC, Security Groups, NACLs, route tables, ALB/target groups, RDS, Route 53, Lambda/IAM, DynamoDB, CloudWatch, S3 objects/bucket settings, Glue jobs, CloudTrail events and Cost Explorer usage rows.
- The engine test source contains **34 test cases** after adding regression coverage for schema-v4 alarm migration, alongside network configuration, cross-service health changes, Glue partition repair, CloudTrail audit updates and cost anomaly data.
- Reviewed branch head before the Glue alarm and migration hardening: `63ad4ff655314e346326257fdc11bec7837ea7fa`. The latest commits add a fourth alarm driven by Glue job freshness and migrate saved schema-v4 accounts to include it; a fresh Cloudflare build and execution of `npm run build`, `node --test tests/*.test.mjs`, and `npm test` are still required. These commands have not been executed in a local checkout in this session.
- Do not mark build/test/deployment green until the current head is verified. After the new build passes, manually walk three connected scenarios: ALB target health, Lambda AccessDenied → IAM policy → successful invocation, and S3 partition → Glue job → fresh curated output.
- Avoid additional service-family expansion until this validation pass completes; prioritize fixes found by the next build/test run.

## Historical Cloudflare failure evidence supplied — 2026-10-15

> Historical log excerpts from before the JSX root-cause fix. The project owner subsequently reported two successful builds; the later shared-service additions still need a fresh verification pass.


- The repeated Cloudflare build logs supplied by the project owner show dependency installation and all catalog validators completing, then the production build failing during Vite/Rolldown transform of `app/troubleshooting/simulators/aws/page.tsx`.
- Latest supplied error (2026-10-15 04:54 UTC): **`Expected `}` but found `Identifier``**, location reported as `page.tsx at 35381..35390`. Earlier retry logs show the same parser failure at the same location. A previous 2026-10-14 build reported a separate missing `,` or `)` around offsets 29715–29897; subsequent commits changed that area, but the newer error remains.
- This is a source-level TSX parse failure, not a dependency-install failure. Build output confirms the catalog/Azure/GCP validators ran before the app transform failed. The npm `allow-scripts` messages are warnings, not the terminating error shown in these logs.
- **Action at that point:** resolve the TSX parser location against the exact commit Cloudflare built. Do not infer that the earlier EC2 select-all fix resolved all syntax errors. Re-run Cloudflare build, then run `npm run build`, `node --test tests/*.test.mjs`, and `npm test` in a working checkout; only mark the gate green with actual successful output.

- **2026-10-15 follow-up:** Inspected the current AWS simulator TSX and found the concrete malformed JSX in the EC2 **Tags** tab: two sibling `<div>` panels were emitted directly from one `&&` expression without a fragment/closing expression. Wrapped the tag header, table, and editor in a fragment. Commit: [`f40f0e1`](https://github.com/kalif7722/aws-library/commit/f40f0e19cf250045efd4377c433043f81c9dee5f). This is a source-level fix matching the reported parser class; the Cloudflare rebuild and automated test suite are still pending, so the gate remains **not verified**.

- **Earlier failure log supplied by project owner (2026-10-14 21:51 UTC):** This was a distinct, earlier blocker: a literal backslash-n sequence was accidentally written into the TypeScript source after `useState(false);` on the `showAclRuleEditor` declaration, immediately followed by `const [aclEditingRule, ...]`. The parser therefore saw `\n` as an invalid Unicode escape sequence at line 33. This is not an npm dependency issue. I inspected the current branch source after the later edits: the two declarations are now on separate real source lines (currently lines 40–41), with no literal `\\n  const [aclEditingRule` sequence. This confirms that specific historical defect is absent from the current fetched file; it does **not** prove the current branch builds. Current/latest TSX failures still need a fresh Cloudflare build and tests.

- **Cloudflare log supplied — 2026-10-15 05:26 UTC:** the app transform now reports `Unterminated regular expression` in `app/troubleshooting/simulators/aws/page.tsx` at offsets `36835..36839`. Dependencies and catalog validators completed; this is again a source-transform failure. Comparing the offset against the currently fetched branch file (blob `34d32797`, 72,534 characters) places it inside ordinary JSX text near the EC2 Details panel, not an obvious regex. Treat the source/log offset mismatch as unresolved: confirm the exact commit SHA Cloudflare built before editing, then inspect that commit's source around the error. Do not apply a speculative regex edit. Build and tests remain **not verified**.

- **Repeated Cloudflare failure — 2026-10-15 05:27 UTC:** The next build reports the identical `Unterminated regular expression` at `app/troubleshooting/simulators/aws/page.tsx:36835..36839`. The branch head at this time is `7505d786adfea767d2608dd62e1b5bb953f52dab`; fetching the source at that exact SHA returns blob `34d32797`, length 72,534 characters, and the reported offset points at ordinary JSX text around the EC2 Details panel (`AMI ID`). This strongly suggests parser context became invalid before the reported point; the offset itself is not a trustworthy isolated regex location. No source change was made based on this ambiguous location. Next diagnostic should use the exact Cloudflare build's commit/source and inspect JSX nesting immediately before the Details tab, especially the recently modified Tags conditional. The build/test gate remains blocked.

- **Root cause found and corrected — 2026-10-15:** The repeated Cloudflare error at offsets `36835..36839` was downstream of malformed JSX in the EC2 Tags tab, not a regular expression. The nested `{showTagEditor && <div ...>}` conditional did not close its expression before the containing fragment ended. The Details tab that followed was parsed in the wrong context, producing the misleading `Unterminated regular expression` at the `AMI ID` JSX. Added the missing `}` between the tag editor's closing `</div>` and the fragment close. Commit: [`cc5cac4`](https://github.com/kalif7722/aws-library/commit/cc5cac49a43c754dcc0186ab367fd3acf56d9768). This corrects the identified parse defect; a fresh Cloudflare build and test run are still required and are not yet claimed successful.

## Change log

- **2026-10-15:** Wired EC2 launch/multi-instance inventory and lifecycle controls, instance tag editing, inbound/outbound Security Group CRUD, connected VPC/subnet/route-table inventories, route-table association and route CRUD controls, selected-instance Reachability Analyzer, and legacy state migration. Engine/UI regression tests were added for the workflows; build, automated tests, and browser behavior remain unverified in this session.

- **2026-10-15:** Initial persistent tracker created from the current PR scope. Current implementation includes the 89-entry service catalog, EC2 inventory, launch, multi-instance lifecycle and tag editing, selectable Security Groups with inbound-rule CRUD, Route Table/NACL views, NACL rule creation/validation, shared reachability engine, and basic S3/IAM state flows. Build/test and deployment remain unverified.

- **2026-10-15:** Added an EC2 lifecycle regression test covering per-instance stop/reboot scoping, synchronization of the legacy primary-instance view, and immutability of the prior state. Test suite execution remains pending.

- **2026-10-15:** Fixed the TSX parser error reported by the Cloudflare build (`Expected ',' or ')' but found '}'`) by closing the `setSelectedInstanceIds(...)` call in the EC2 select-all handler. Commit: [`994ad21`](https://github.com/kalif7722/aws-library/commit/994ad2165af7bc308588e6afab299498967856e6). The previous failure is explained by this syntax defect; a fresh production build and test run are still required before marking validation complete.

- [x] Add a CloudWatch alarm driven by Glue freshness/job state; assert that uploading the missing source partition and rerunning Glue moves the alarm from ALARM to OK.

- [x] Upgrade persisted account schema to v5 and merge missing default alarm definitions into previously saved accounts without removing user-edited alarm definitions or resource state.


## Automated validation workflow — 2026-10-15

- [x] Add `.github/workflows/aws-simulator-validation.yml` to run engine tests and the production build whenever simulator code, test helpers, dependency manifests, or the validation workflow changes on `feature/troubleshooting-guided-flow`.
- [ ] Check the first workflow run for the current simulator head and fix any actual failure before adding additional service features.
- [ ] Record engine-test and production-build outcomes separately from Cloudflare deployment status.
