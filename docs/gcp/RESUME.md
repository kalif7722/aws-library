# GCP pipeline checkpoint — 2026-09-26

Status: PARTIAL. GitHub draft PR #1 now contains the canonical foundation. No claim of full completion or deployment.

## Canonical inputs
- gcp-services.json: 177 products / 14 main-article categories, official catalog snapshot and observed documentation URLs.
- PROJECT_BRIEF.txt: complete user instruction, including continuous execution and visual gates.
- VISUAL_STANDARD.md: inspected reference visual family and technical review rules.
- icon-manifest.json: original SVG hashes/provenance, 177 mappings: 94 product icons, 76 category fallbacks, 7 unavailable.
- service-content.json: ten draft service-specific records, not complete production content.
- walkthrough-decisions.tsv: draft selection scenarios. Ten high-value services have reviewed walkthrough selection fields in the canonical inventory; the remaining 167 have null applicability.

## Implementation
Home entry and /gcp-services; searchable persistent category rail, expand/collapse, aliases, deep links, local explicit asset paths, fullscreen dialog and related-service links. app/gcp-data.ts derives data from canonical JSON. Missing visual states are honest. No AWS/Azure shared component modifications.

## Image calibration and first production EL10
Built-in imagegen used with X-Ray style reference. Two 1672×941 Compute Engine calibration variants retained under calibration/; neither was presented as a production native 2048×1152 image. The first production Compute Engine EL10 is generated directly at 2048×1152 with a vector-like diagram renderer (scripts/render-gcp-compute-el10.py), uses the official product icon, and has 18 reviewed panels. It is saved and mapped at public/gcp/compute/gcp-compute-engine.webp. Cloud Run and Cloud Storage also have native 2048×1152, 18-section reviewed visuals at public/gcp/app-hosting/gcp-cloud-run.webp and public/gcp/storage/gcp-cloud-storage.webp. A shared panel renderer preserves the layout family. Remaining 174 EL10 visuals and all walkthroughs are pending.

## Verification
Production build passes. Catalog validator checks ready WebP dimensions and aspect ratio and passes. HTTP render smoke checks return 200 for /, /gcp-services, its Compute Engine query, /services, and /azure-services. Browser interaction and mobile visual QA are still pending. Existing test suite has two failures (preview meta and animation utilities); Both failures reproduced on untouched baseline e07d538; three other tests pass on both revisions. TypeScript check found pre-existing errors in other course components; full clean typecheck not claimed.

## Next work
1. Review official sources for the ten draft guides and finish missing technical depth; update service status only after validation.
2. Finish walkthrough applicability decisions and lifecycle/alias review, especially renamed products and source 404.
3. Continue native-resolution EL10 production for remaining services using canonical filenames, service-specific architecture, and visual review before mapping.
4. Generate the first service walkthrough with authentic console evidence where feasible; do not label illustrations as screenshots.
5. Fill remaining 167 guides and required primary/companion walkthroughs.
6. Complete official icon gaps, related-service relationships, interactive QA, asset uploads, route checks, and deployment validation.

Resume instruction: Resume the GCP pipeline from the canonical tracker and continue every item not marked COMPLETE.
