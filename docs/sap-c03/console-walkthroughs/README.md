# SAP module 26 console walkthroughs

Module 26 contains two independently navigable sections: the recovered 32 original troubleshooting visuals, and 26 service walkthrough labs with 155 screens. IAM and EC2 are preserved. The other 24 sequences use 139 newly generated raster console reconstructions.

Screen counts follow each task rather than a shared four-screen template. The source plan is `real-console-plan.json`; image provenance is recorded in `generated-screens.json`. Original slide provenance is in `original-slide-sources.json`.

Console images use light-mode service layouts and example resource identifiers. They are educational reconstructions, not captures from a signed-in AWS account. AWS can change layouts and labels. Each lab links to its official service documentation. Policy and event-pattern examples are also available as selectable JSON beneath the relevant images.

Use `import-real-console-image.py` to convert approved raster outputs and register them, then `apply-real-console-labs.py` to update complete sequences. The earlier generic `*-sap.webp` assets are retained as historical files but are no longer referenced by the walkthrough data. Do not run the older generic renderer to rebuild these sequences.

Validation: all 24 planned replacement sequences are present; all 155 active screen references exist; raster images and all 32 recovered lesson images decode successfully. GitHub uploads are verified against the local Git blob hash before a branch update.
