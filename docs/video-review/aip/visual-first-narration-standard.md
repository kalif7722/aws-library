# AIP visual-first lecture narration standard

Approved reference: AIP Modules 03–05 narration scripts and user-reviewed Module 06 Part 01
revision `2026-11-12-m06-p01-visual-order-v5`.

## Preflight for every batch
1. Use the **numbered WebP in R2**, not the PDF lesson-map title, as the primary teaching evidence.
2. Audit the filename, number and visible slide heading; do not infer order from chat attachment order.
3. Read the layout in a meaningful sequence: numbered steps, arrows, code/JSON, graphs, bottom panels.
4. For graphs, name *visible* axis units, thresholds and actual values; do not invent them.
5. For code examples, describe fields/operations actually shown. Clarify service semantics and caveats.
6. Where a slide is sparse, teach the technical mechanism or a directly relevant example, but do not introduce a new unrelated story.
7. Write natural teaching speech, not rigid boilerplate or a repeated closing template. Let length vary with explanatory need.
8. Ensure all consecutive slide titles, numbers, revision IDs and chapter order match images.
9. Fail the batch before synthesis when original images are missing or mapping is uncertain.
10. Keep narrations educational: explain **what the student sees**, **what happens**, and **why the distinction matters**.

## Review safeguards
- Prefer one reviewed pilot before large batches.
- Source images must pass R2 validation on the GitHub runner.
- Render MP4, VTT, transcript and manifest from the same narration revision.
- The course availability API checks the R2 manifest and MP4 independently of a GitHub release-record commit.
- Never regard a register-only GitHub failure after a successful R2 upload as proof of media failure.
- Record any slide number/title mismatch as a blocker and resolve it using the image.
- Avoid unnecessary fixed narration durations. ~6 minutes for five slides is only an example, not a policy.

## Special note for Module 06
Slides 1–5 were visually supplied and reviewed. Slides 61–72 were recovered and supplied.
Slides 6–60 require image-based verification; lesson-map labels alone are insufficient.
The R2-original OCR audit for slides 6–32 is in
`.github/workflows/audit-aip-m06-visuals.yml`; it is evidence supporting visual QA,
not a replacement for a human check of diagrams.
