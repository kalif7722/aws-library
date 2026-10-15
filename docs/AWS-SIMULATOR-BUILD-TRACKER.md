# AWS Console Simulator — Build Plan & Progress Tracker

**Repository:** `kalif7722/aws-library`  
**Working branch:** `feature/troubleshooting-guided-flow`  
**Pull request:** [#5 — Build console-first AWS account simulator](https://github.com/kalif7722/aws-library/pull/5)  
**Status:** In progress — EC2/VPC only  
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
| VPC / subnets / route tables | **Core CRUD wired; validation pending** | One VPC, public/private subnets, two route tables, selectable inventories, subnet association editor, route create/edit/delete and state model |
| Network ACLs | **CRUD implemented; validation pending** | Numeric priority, validated create/edit/renumber/delete UI and shared reachability evaluation |
| Shared reachability evaluation | **Expanded; validation pending** | Selected source/destination instance, attached SGs, target subnet route table, instance health, guest listener and inbound/return-path NACL checks |
| S3 and IAM examples | **Basic state flows implemented** | Bucket public-access/versioning settings and role policy attachments; not the current focus |
| Automated validation / build | **Blocked previously; correction committed, rerun pending** | The supplied Cloudflare log identified a missing `)` in the EC2 select-all checkbox handler in `page.tsx`; corrected in `994ad216`. No GitHub Actions runs/status checks are available to confirm the next build yet |
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

- [ ] Add representative, configurable mock resource profiles that reuse the same resource model (not isolated hard-coded scenario engines).
- [ ] Make service configuration changes visibly affect dependent resources and diagnostic results.
- [ ] Add useful validation, loading/empty/error states and realistic action feedback.
- [ ] Improve AWS-console visual/interaction consistency without claiming pixel-perfect parity.
- [ ] Add regression tests for cross-resource state transitions and saved-state compatibility.
- [ ] Review accessibility, keyboard use and responsive layouts.

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

- GitHub PR #5 is still **open and draft**; head is `9f011bfc4c0ad8305ce6f3110b1a809f39ccbdb6`.
- The Cloudflare deployment status attached to the latest PR discussion reports **deployment failed** for commit `9f011bfc` at 2026-10-15 04:54 UTC. This supersedes any assumption that the prior syntax correction made the build/deployment healthy.
- GitHub Actions PR-triggered workflow runs and commit status checks are empty for this head. They do not establish a passing build.
- `package.json` defines `npm run build`, `node --test tests/*.test.mjs`, and `npm test` (build followed by tests). These commands have not been executed here: the GitHub connector provides repository reads/writes but no runnable checkout, and a network clone was unavailable. Do not mark the Phase 2 gate passed.
- Next blocking action: inspect the Cloudflare build log for commit `9f011bfc`, fix the specific current failure, then run the exact commands above in a working checkout and record their outputs before further service expansion.

## Cloudflare failure evidence supplied — 2026-10-15

- The repeated Cloudflare build logs supplied by the project owner show dependency installation and all catalog validators completing, then the production build failing during Vite/Rolldown transform of `app/troubleshooting/simulators/aws/page.tsx`.
- Latest supplied error (2026-10-15 04:54 UTC): **`Expected `}` but found `Identifier``**, location reported as `page.tsx at 35381..35390`. Earlier retry logs show the same parser failure at the same location. A previous 2026-10-14 build reported a separate missing `,` or `)` around offsets 29715–29897; subsequent commits changed that area, but the newer error remains.
- This is a source-level TSX parse failure, not a dependency-install failure. Build output confirms the catalog/Azure/GCP validators ran before the app transform failed. The npm `allow-scripts` messages are warnings, not the terminating error shown in these logs.
- **Current blocker:** resolve the exact current TSX parser location against the exact commit Cloudflare built. Do not infer that the earlier EC2 select-all fix resolved all syntax errors. Re-run Cloudflare build, then run `npm run build`, `node --test tests/*.test.mjs`, and `npm test` in a working checkout; only mark the gate green with actual successful output.

## Change log

- **2026-10-15:** Wired EC2 launch/multi-instance inventory and lifecycle controls, instance tag editing, inbound/outbound Security Group CRUD, connected VPC/subnet/route-table inventories, route-table association and route CRUD controls, selected-instance Reachability Analyzer, and legacy state migration. Engine/UI regression tests were added for the workflows; build, automated tests, and browser behavior remain unverified in this session.

- **2026-10-15:** Initial persistent tracker created from the current PR scope. Current implementation includes the 89-entry service catalog, EC2 inventory, launch, multi-instance lifecycle and tag editing, selectable Security Groups with inbound-rule CRUD, Route Table/NACL views, NACL rule creation/validation, shared reachability engine, and basic S3/IAM state flows. Build/test and deployment remain unverified.

- **2026-10-15:** Added an EC2 lifecycle regression test covering per-instance stop/reboot scoping, synchronization of the legacy primary-instance view, and immutability of the prior state. Test suite execution remains pending.

- **2026-10-15:** Fixed the TSX parser error reported by the Cloudflare build (`Expected ',' or ')' but found '}'`) by closing the `setSelectedInstanceIds(...)` call in the EC2 select-all handler. Commit: [`994ad21`](https://github.com/kalif7722/aws-library/commit/994ad2165af7bc308588e6afab299498967856e6). The previous failure is explained by this syntax defect; a fresh production build and test run are still required before marking validation complete.
