# Modules 11 and 12 — service comparison and table review

Reviewed 31 October 2026. Scope: native comparison/reference sections for the two completed modules.

## Result

| Module | Service/feature comparisons | Precision details | Tables |
| --- | ---: | ---: | ---: |
| 11 — databases and caching | 36 | 63 | 8 |
| 12 — containers and service connectivity | 39 | 44 | 8 |
| Total | 75 | 107 | 16 |

The three comparison groups in each module cover core services, feature/compute variants and supporting integrations. Adjacent selection alternatives are explicitly labelled. Each row compares purpose, operating responsibilities/controls and decision-changing exceptions. The five existing precision groups in each module remain visible and retain every previous detail.

## Visual design

Dark navy surfaces, cyan section labels and rules, white body text and amber caveats follow the established course palette. Official, unmodified AWS architecture SVGs identify services. Features use the parent service icon and an explicit feature label; Timestream variants share the official product icon. The asset provenance manifest records 58 distinct icons from the AWS July 2026 package.

Tables include captions, column/row headers, alternating surfaces, hover states, sticky column headers, service names fixed during horizontal scrolling, visible keyboard focus and independently collapsible groups. In-page section links and count badges support navigation. Tables scroll inside their containers on small screens rather than expanding page width. Primary AWS documentation links sit beside each comparison and precision table.

## Content integrity and additions

All 104 previous precision rows are retained verbatim. Module 11 now includes two additional current qualifications: eligible node-based Valkey optional Multi-AZ-log durability, and eligible Valkey 9+ Serverless public endpoints requiring IAM authentication and TLS 1.3. Module 12 adds predictive ECS service scaling, including forecast-only evaluation, historical-data prerequisites, no independent scale-in and the separate host-capacity loop.

Comparisons explicitly preserve restricted App Runner and Timestream for LiveAnalytics availability, App Mesh retirement, database replica/backup differences, consistency/TTL/cache exceptions, supported Kubernetes storage/identity combinations, tenant authorization, ECR replication/backfill and regional recovery boundaries. Current sources are linked in the UI and appended to each module's verification record.

## Validation

- Production application build passed after final content changes.
- Existing course visual discovery tests: 2 passed.
- Existing precision data was compared with the prior commit: all rows retained, earlier module data unchanged.
- All 75 comparison entries have populated fields and a valid official SVG; SVG XML parsed successfully.
- Real Chromium rendered both production module routes at 1440px and 390px widths; desktop and mobile screenshots were visually inspected.
- Both routes rendered 8 tables, the expected comparison counts and 63/44 precision rows respectively.
- Every icon URL used in each module returned HTTP 200 with SVG content.
- Browser checks passed for table overflow containment, horizontal scrolling, sticky service cells, keyboard focus and collapse/reopen interaction.
- The existing 463 visual lesson assets and page/lesson mappings are unchanged.

This is a table-section revision. It does not claim complete coverage of future planned course modules or a new live deployment. Historical module completion reports retain their original counts; this addendum records the revised reference-section counts.
