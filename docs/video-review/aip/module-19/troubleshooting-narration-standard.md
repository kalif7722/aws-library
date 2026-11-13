# AIP Module 19 — Hands-on troubleshooting lecture standard

This extends (does not replace) `docs/video-review/aip/visual-first-narration-standard.md`.

## Sources and sequence
- **Module 18 is deliberately skipped** for the current video-production sequence.
- Original slide source is the repository's local WebP set: `public/course-visuals/genai-troubleshooting/module19-slide-NN.webp` for `NN=01..74`, not `aws-genai-course-visuals/module-19/slide-NN.webp` in R2.
- Preserve the 12 existing labs and their exact consecutive slide ranges from `app/components/genai-labs/map.json`. Never divide a troubleshooting case in the middle just to meet a fixed slide quota. One lab = one complete lecture unless original visuals show a defensible concept-level split.
- Ground each narration in the original visual and accompanying existing lab map, application state, and `app/components/genai-labs/guides.mjs`. Verify the rendered image itself: heading, arrows, code, metrics, console panels, expected test output. Never invent observed evidence.
- Cover all 74 images and all 12 scenarios. Do not synthesize a video from topic labels alone.

## Instructional troubleshooting contract — mandatory for *each* lab
1. **Incident / observable symptom:** Begin from the user-facing failure, scope and impact. Clearly state what the student will be diagnosing.
2. **Working architecture and expected behavior:** Walk the architecture left to right, naming components, trust boundaries and the *healthy* request/response path. Explain what successful behavior would look like.
3. **Reproduce safely and capture evidence:** Tell students which app or simulated AWS console pane to open, which test query, trace, log, request ID, metric, configuration and timestamp to examine *as visibly present*. Use redacted/synthetic data.
4. **Diagnostic decision sequence:** For every numbered step, say **where to go → what to inspect → what healthy looks like → what failing evidence means → the next diagnostic branch**. Separate hypotheses from confirmed causes.
5. **Root cause:** Explain only after walking through supporting evidence. Distinguish symptom, contributing condition, and actual fault; do not prematurely assert the answer.
6. **Targeted remediation:** State the precise configuration, request/schema, permission, code, retrieval, index, limit, workflow or deployment change. Identify safe scope, rollback and side effects. Never suggest blind policy broadening, disabling security, or unbounded retries.
7. **Verify fix:** Repeat the original failing fixture and at least one negative/edge case. Name what successful evidence looks like (response contract, citation, request status, latencies, token budget, model/Region versions, traces or logs as applicable). Note that a single green console badge may be insufficient.
8. **Prevent recurrence:** Add regression tests, alert thresholds, rollout guardrails, and an evidence-based takeaway that directly connects to the investigated failure.

## Delivery and pacing
- Narrate in second-person instructional speech: "Open…", "Look for…", "If… then…", "After changing… rerun…".
- Show expected screen or log result for each step, explain why it matters and what to do if the student sees something different. Do not read just headings or blindly summarize.
- Give difficult screens (JSON schema, metrics, tool calls, retrieval results) additional teaching time; pace by content complexity.
- Keep Guided and Challenge modes distinct: explain and demonstrate in the lecture, without modifying the exercise's challenge-answer secrecy.
- Use existing voice `en-US-AndrewNeural`, `-3%` and topic-first lecture grouping.
- Production QA should reject scripts missing explicit observations, branches, remediation or verification. Prefer detailed step-by-step narration over superficial bullet recitation.
- Because module 19 contains local assets, the renderer must **not** rely on the usual R2 original image URL; use the checked-in local `public/course-visuals/genai-troubleshooting` images as authoritative and publish rendered videos to the existing R2 video prefix.
- Check every image exists, decodes, has expected dimensions, and corresponds to the map before any TTS or MP4 rendering. Validate MP4, SRT, VTT, transcripts, chapters and R2 manifest on publication.

## 12 topic-complete lectures
| Lecture | Visual slides | Troubleshooting case |
| --- | --- | --- |
| 01 | 01–05 | Context overflow and truncated inputs |
| 02 | 06–11 | Invalid model API request or response |
| 03 | 12–17 | Throttling and retry failures |
| 04 | 18–23 | Streaming timeout or incomplete response |
| 05 | 24–28 | Prompt version regression |
| 06 | 29–35 | Stale Knowledge Base after an update |
| 07 | 36–41 | Irrelevant retrieved context |
| 08 | 42–48 | Slow or failing vector search |
| 09 | 49–54 | Plausible answer without evidence |
| 10 | 55–61 | Agent tool failure or loop |
| 11 | 62–67 | Unsafe input or output |
| 12 | 68–74 | Model deployment regression |

## Release gates
1. Verify 74/74 local images and slide map using the automated audit.
2. Review the actual diagram content; write and review 12 lab-specific, sufficiently detailed, stepwise scripts.
3. Validate manifest module ID `19`, scene ranges, first slide title, script revision and instructional coverage.
4. Publish only verified R2 videos, captions, transcript and manifest. Update catalog and API to matching revisions.
5. Never call the workflow "rendered" until R2 MP4/manifest presence and live playback are verified. No additional user confirmation is needed between completed gates.
