# Approved AIF practice exam - recoverable work checkpoint

This branch preserves work blocked by the image-generation Plus quota on 2026-10-30. It is not the completed production implementation. Main was not changed.

- The user approved all 65 questions in the review PDF (`libfile_f1fe260f6a2c81918db8b30085930fd8`). The complete approved content and image briefs are in `approved-questions.json`.
- 30 distinct explanation images were generated. 28 are verified and saved under `public/course-visuals/aif-exam-explanations/`; `progress.json` records their image and question hashes and manual review notes.
- AIF-R026 still needs the managed-provider versus customer security/version responsibilities corrected. AIF-R028 needs the introductory managed-runtime requirement scoped to this scenario. Their candidate PNGs and exact edit instructions are preserved here.
- AIF-R031 through AIF-R065 have not been generated. Prompts and all relevant visual briefs are saved in `prompts.json`.
- The quota response reported a reset at **18:05:37 Asia/Kolkata on 2026-10-30**. Do not retry before the reset. Use the built-in image generator. CLI/API fallback requires an explicit user request and a separately configured API key.

## Restore the implementation after checkout

1. Apply `git apply docs/aif-exam-recovery/implementation.patch` to restore the approved question bank, gated visual viewer, zoom/pan controls, and strict build validation. The snapshot's application files otherwise remain at the original base so it cannot accidentally publish a partially illustrated exam.
2. Edit the two saved candidates with the saved corrections, inspect them, then generate and manually inspect questions 31-65. Preserve the original navy/cyan glossy teaching depth and correct service boundaries.
3. Convert accepted assets atomically to 2048x1152 WebP quality 94 and update the per-question review records and hashes. `scripts/validate-aif-exam-assets.mjs` binds approved question content to each reviewed image.
4. Run the exam, course and asset checks and the required production build against the complete final tree. The strict validator must reject an incomplete set.
5. Complete browser checks for all response formats, image gating in both modes, fullscreen/zoom/keyboard accessibility, saved deadlines, automatic expiry and mobile containment.
6. Refresh main and preserve concurrent work; publish one consolidated, validated completion commit only after all 65 visuals are verified. Do not call this checkpoint completed or deployed.

The standalone revision section remains removed. The new explanation viewer is available only after practice checking or exam submission/expiry; it does not allow browsing unreviewed exam answers. Mobile zoom supports panning, and the overlay covers the global search launcher.
