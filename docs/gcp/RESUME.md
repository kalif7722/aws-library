# GCP pipeline checkpoint — 2026-09-26

Status: PARTIAL. Parallel workers reported a platform usage limit during content/QA/selection work. No claim of full completion or deployment.

## Canonical inputs
- gcp-services.json: 177 products / 14 main-article categories, official catalog snapshot and observed documentation URLs.
- PROJECT_BRIEF.txt: complete user instruction, including continuous execution and visual gates.
- VISUAL_STANDARD.md: inspected reference visual family and technical review rules.
- icon-manifest.json: original SVG hashes/provenance, 177 mappings: 94 product icons, 76 category fallbacks, 7 unavailable.
- service-content.json: ten draft service-specific records, not complete production content.
- walkthrough-decisions.tsv: draft selection scenarios; interrupted before canonical review. Do not assume these decisions are final.

## Implementation
Home entry and /gcp-services; searchable persistent category rail, expand/collapse, aliases, deep links, local explicit asset paths, fullscreen dialog and related-service links. app/gcp-data.ts derives data from canonical JSON. Missing visual states are honest. No AWS/Azure shared component modifications.

## Image calibration
Built-in imagegen used with X-Ray style reference. Two Compute Engine variants retained under calibration/. Both native 1672×941 despite requested >=2048×1152. V1 rejected for invented machine labels and disk-lifecycle inaccuracies. V2 corrects requested textual issues but full diagram QA remains pending (health-check arrows need checking). Neither is a production WebP or mapped asset. Do not silently upscale and call it native generation. No walkthrough images generated.

## Verification
Production build passes. Catalog structural validator passes. HTTP render smoke checks return 200 for /, /gcp-services, its Compute Engine query, /services, and /azure-services. Browser interaction and mobile visual QA are still pending. Existing test suite has two failures (preview meta and animation utilities); Both failures reproduced on untouched baseline e07d538; three other tests pass on both revisions. TypeScript check found pre-existing errors in other course components; full clean typecheck not claimed.

## Next work
1. Review official sources for the ten draft guides and finish missing technical depth; update service status only after validation.
2. Finish walkthrough applicability decisions and lifecycle/alias review, especially renamed products and source 404.
3. Resolve native resolution / calibration visual correctness. Keep images below gate out of mappings.
4. Continue EL10 generation using canonical filenames; map only validated assets.
5. Fill remaining 167 guides and required primary/companion walkthroughs.
6. Complete official icon gaps, related-service relationships, interactive QA, asset uploads, route checks, and deployment validation.

Resume instruction: Resume the GCP pipeline from the canonical tracker and continue every item not marked COMPLETE.
