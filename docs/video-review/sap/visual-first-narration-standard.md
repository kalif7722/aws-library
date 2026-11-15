# SAP-C03 VisualFirst video narration standard

Applies to every AWS Solutions Architect Professional narrated video. This extends `docs/video-review/aip/visual-first-narration-standard.md` and `docs/video-review/shared-course-video-player-standard.md`.

## Source and instructional sequence
1. Inspect each **actual numbered** original WebP in `public/course-visuals/sap-c03/module-NN/slide-MM.webp`. Do not narrate from lesson-map titles or inherited SAP/SAA text alone.
2. **Orient** the learner with one or two natural sentences: what the whole slide depicts and the architectural question it answers.
3. **Walk the actual picture** in meaningful order, explaining every important arrow, boundary, service role, policy rule, routing choice, chart, comparison or console step. Do not treat option comparisons as a mandatory flow.
4. **Teach the pictured example** accurately, including relevant condition, input, scale, AWS service, failure path, cost or security caveat. Resolve the decision rather than simply reading panel labels.
5. **Synthesize** the overall architecture and explain why an architect would choose it over a plausible alternative. Preserve professional-level correctness and caveats.
6. Speak naturally and concisely: trim repetitive intros and summaries, redefinitions and unrelated anecdotes. A dense architecture deserves more time; a simple decision can be short. Never use fixed five-slide batches or a fixed runtime.
7. Use full topic boundaries, not a fixed number of scenes. Keep a coherent request/response, network route or end-to-end procedure together.
8. Use `en-US-AndrewNeural` at `-3%` without artificial speed-up; synthesize from the current narration only, with matching VTT/SRT/transcript and chapters.
9. Validate slide WebP files, module/part IDs, continuous numbering and narration revision **before** TTS. Render using the shared script `scripts/render_aip_course_video.py` with `course_slug=sap`.
10. Only publish verified MP4 and matching manifest to `aws-course-videos/previews/sap/module-NN/part-PP/`. Never claim availability from GitHub commits alone.
11. Use the shared AIP/AIF video controls through `SapVideoLectures`, preserving 5-second seek, captions, speed, volume, previous/next, fullscreen auto-hide, resume and chapters. Show pending until the SAP availability API verifies media.
12. Module 01 Part 01 is the initial reference: slides 01–04 (principal, credentials, policy statement, effective authorization). Continue subsequent parts from slide 05 after inspecting the source images.

## Quality gate
Every scene should have `visual_overview`, `visual_walkthrough`, `visual_example`, `visual_synthesis`, and accurate natural `narration`. A viewer should be able to retell the system architecture and make the relevant SAP-C03 exam decision.
