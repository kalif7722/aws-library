# AIP Module 19 — Troubleshooting Video Production Status

## Scope and teaching standard
- Module 18 intentionally skipped for video lessons.
- Source: 74 original local WebPs at `public/course-visuals/genai-troubleshooting/module19-slide-NN.webp` across 12 scenario-complete labs.
- Verified source audit: `docs/video-review/aip/module-19/local-visual-audit.json`, 74/74 original images passed.
- Mandatory narration: `docs/video-review/aip/visual-first-narration-standard.md` plus `docs/video-review/aip/module-19/troubleshooting-narration-standard.md`.
- Every lab teaches symptoms, architecture, where to inspect evidence and expected output, alternative diagnosis branches, a scoped correction, success/negative/regression verification, and recurrence prevention.
- Voice: `en-US-AndrewNeural`, rate `-3%`.

## Committed parts
| Lab | Slide range | Case | Narration | Render workflow |
| --- | --- | --- | --- | --- |
| 01 | 01–05 | Context overflow and truncated inputs | `content/video-narration/aip-module-19-part-01.json` | `.github/workflows/render-aip-m19-part-01.yml` |
| 02 | 06–11 | Converse API schema and response errors | `content/video-narration/aip-module-19-part-02.json` | `.github/workflows/render-aip-m19-part-02.yml` |
| 03 | 12–17 | Throttling and retry storms | `content/video-narration/aip-module-19-part-03.json` | `.github/workflows/render-aip-m19-part-03.yml` |
| 04 | 18–23 | Streaming timeouts and incomplete responses | `content/video-narration/aip-module-19-part-04.json` | `.github/workflows/render-aip-m19-part-04.yml` |
| 05 | 24–28 | Prompt version regression | `content/video-narration/aip-module-19-part-05.json` | `.github/workflows/render-aip-m19-part-05.yml` |
| 06 | 29–35 | Stale Bedrock Knowledge Base | `content/video-narration/aip-module-19-part-06.json` | `.github/workflows/render-aip-m19-part-06.yml` |
| 07 | 36–41 | Irrelevant retrieved context | `content/video-narration/aip-module-19-part-07.json` | `.github/workflows/render-aip-m19-part-07.yml` |
| 08 | 42–48 | Slow OpenSearch vector search | `content/video-narration/aip-module-19-part-08.json` | `.github/workflows/render-aip-m19-part-08.yml` |
| 09 | 49–54 | Unsupported claims and citation failures | `content/video-narration/aip-module-19-part-09.json` | `.github/workflows/render-aip-m19-part-09.yml` |
| 10 | 55–61 | Agent tool errors, loops and permissions | `content/video-narration/aip-module-19-part-10.json` | `.github/workflows/render-aip-m19-part-10.yml` |
| 11 | 62–67 | Prompt injection and output leakage | `content/video-narration/aip-module-19-part-11.json` | `.github/workflows/render-aip-m19-part-11.yml` |
| 12 | 68–74 | Deployment regression and safe rollback | `content/video-narration/aip-module-19-part-12.json` | `.github/workflows/render-aip-m19-part-12.yml` |

## Implementation and static QA
- All 12 original-image-reviewed narration scripts are committed on main, with no missing or overlapping slide number. Every scene exceeds the minimum 100-word guardrail.
- All 12 part-specific workflows are committed on main, validate the full 74-image audit, correct module ID 19, matching part ranges/revisions, and publish MP4/VTT/SRT/transcript/manifest to Cloudflare R2 only after media validation.
- Renderer `scripts/render_aip_course_video.py` explicitly supports original checked-in Module 19 WebPs; it never substitutes the normal R2 visual source. The output manifest uses public course-relative original-image provenance.
- Course catalog `app/components/aipVideoCatalog.ts`, playback API `app/api/aip-video/route.ts`, captions API `app/api/aip-video-captions/route.ts` have all 12 matching part entries.
- **Publication status: pending independent confirmation** of each rendered R2 MP4 and matching R2 manifest, plus live playback. A committed workflow is not proof a renderer succeeded. Some runs may need diagnosis if GitHub Actions fails.
- No new user confirmation is required to complete an already-authorized running workflow; preserve this standard across sessions.
