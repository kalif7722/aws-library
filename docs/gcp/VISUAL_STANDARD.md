# GCP visual production standard

Reviewed six user-supplied reference PNGs on 2026-09-26. References are existing examples, not technical sources; do not reproduce their factual or numbering errors.

## EL10
White 16:9 canvas, blue compact numbered headers, thin pale borders, service-specific diagrams, concise dark text. Target 16–18 meaningful sections, maximum 20. Roughly half visual flows/relationships. Use a clear title, no certification claim or browser close controls. Native requested size >=2048×1152; record actual dimensions, never describe upscaling as native output. Deterministic final WebP path comes from canonical manifest.

Section coverage: purpose, concepts, operational model, architecture, components, scaling, resilience, advanced capabilities, security/IAM, observability, interactions, integrations, cost drivers, workload fit, limitations, troubleshooting, alternatives, takeaway. Merge only when readability improves.

## Walkthrough
Dark navy, three or four numbered panels, orange/cyan accents, precise configuration actions, integrated architecture, ACTION per panel, final VERIFY strip. Companion explains design tradeoffs and ends COMPANION VERIFY. Console-inspired generated illustrations must be labeled as illustrations, never passed off as real console captures. No claims that cloud resources were actually deployed.

## Validation
Inspect actual pixels for readable text, continuous unique numbering, diagrams consistent with current official docs, complete borders/no crop, no browser chrome, and design consistency. Generated is distinct from validated, mapped, and deployed. Record rejected variants and reason. Official icons must have provenance; generated approximations are not counted as official icon assets.
