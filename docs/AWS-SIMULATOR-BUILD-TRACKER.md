# AWS Console Simulator — Build Plan & Progress Tracker

**Repository:** `kalif7722/aws-library`  
**Working branch:** `feature/troubleshooting-guided-flow`  
**Pull request:** [#5 — Build console-first AWS account simulator](https://github.com/kalif7722/aws-library/pull/5)  
**Status:** In progress — EC2/VPC only  
**Last reviewed:** 2026-10-15

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
| EC2 inventory and basic actions | **Partially complete** | Search, state filter, selection, refresh timestamp, start/stop/reboot; launch flow remains |
| Security Groups | **Basic inventory complete** | Seeded group selection/rules; expand editing and consistency checks |
| VPC / subnets / route tables | **Partially complete** | Shared network model and route view; richer inventories and association editor remain |
| Network ACLs | **Partially complete** | Numeric rule priority and create-rule editor/validation; edit, reorder and delete remain |
| Shared reachability evaluation | **Implemented; needs broader regression coverage** | EC2 health, SG ingress, routes, inbound/return-path NACL checks; Reachability Analyzer uses shared engine |
| S3 and IAM examples | **Basic state flows implemented** | Bucket public-access/versioning settings and role policy attachments; not the current focus |
| Automated validation / build | **Not verified** | No PR-triggered workflow runs or commit status checks were reported for the latest reviewed commit |
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
- [ ] Implement a functional **Launch instance** workflow (configuration/review/launch).
- [ ] Support more than one instance in the resource model and UI without breaking existing saved state.
- [ ] Implement useful tags, tag editing and bulk actions for selected instances.
- [ ] Make empty states, validation, pending/terminal states and action feedback consistent with the rest of the console.
- [ ] Verify lifecycle actions affect dependent views and reachability outcomes.

### 2B. VPC and subnet inventory

- [ ] Replace single-resource/static presentation with a coherent VPC inventory.
- [ ] Add subnet inventory with CIDR, Availability Zone, route table association and relevant status fields.
- [ ] Support selecting a VPC/subnet and navigating to related resources.
- [ ] Ensure resource IDs, CIDRs and associations agree across VPC, Subnets, Route Tables, NACLs, EC2 and Reachability Analyzer.
- [ ] Add safe state migration for any expanded resource collections.

### 2C. Security Groups

- [x] Show a selectable inventory of seeded security groups.
- [x] Show rules for the selected security group.
- [ ] Add rule create/edit/delete flows with validation.
- [ ] Show inbound/outbound rules and resource associations clearly.
- [ ] Verify security-group edits immediately affect shared reachability evaluation.

### 2D. Route Tables

- [x] Show route-table route and association/tag tabs.
- [x] Route state participates in shared reachability evaluation.
- [ ] Implement subnet association editing and validation.
- [ ] Implement route create/edit/delete flows and route-target validation.
- [ ] Ensure the selected subnet's effective route table is the one evaluated.
- [ ] Show meaningful route state (including unavailable/blackhole target cases where modeled).

### 2E. Network ACLs

- [x] Display numbered rules in numeric priority order.
- [x] Evaluate the lowest-numbered matching rule first, with implicit deny when nothing matches.
- [x] Create-rule editor with validation for number, duplicate direction/number, port/range and IPv4 CIDR.
- [ ] Edit existing rules.
- [ ] Reorder rules by changing rule numbers while preventing direction-local duplicates.
- [ ] Delete rules with clear feedback.
- [ ] Add protocol/port/CIDR/action validation aligned with the simulator's supported behavior.
- [ ] Verify inbound and return-path outbound rules both affect reachability.

### 2F. Reachability and cross-resource consistency

- [x] Evaluate instance health, security-group ingress, route state and inbound/return-path NACL checks through shared engine logic.
- [x] Reachability Analyzer uses the shared configuration engine.
- [ ] Add tests for multiple instances/subnets/VPCs and selected-resource relationships.
- [ ] Add tests for route association changes and SG/NACL edits changing the evaluation result.
- [ ] Keep the normal console free of an incident picker or pre-revealed root cause; expose evaluation through the relevant diagnostic tool only.
- [ ] Ensure each configuration change is reflected consistently across inventory, details and diagnostic screens.

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

1. [ ] Inspect package scripts and establish the exact local test/build commands.
2. [ ] Implement EC2 Launch Instance flow and decide/implement a backward-compatible multi-instance state shape.
3. [ ] Add tag editing and safe bulk actions for EC2.
4. [ ] Expand VPC/subnet inventories and resource selection.
5. [ ] Add Route Table subnet association editing.
6. [ ] Add NACL edit/reorder/delete.
7. [ ] Add Security Group rule editing and cross-resource consistency tests.
8. [ ] Run tests/build and record actual results.
9. [ ] Complete the Phase 2 exit gate review before adding another service family.

## Change log

- **2026-10-15:** Initial persistent tracker created from the current PR scope. Current implementation includes the 89-entry service catalog, EC2 inventory/basic lifecycle actions, selectable Security Groups, Route Table/NACL views, NACL rule creation/validation, shared reachability engine, and basic S3/IAM state flows. Build/test and deployment remain unverified.
