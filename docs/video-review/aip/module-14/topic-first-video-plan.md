# AIP Module 14 — verified topic-first video plan

Original R2 visual audit: `docs/video-review/aip/module-14/visual-ocr-01-15.json`. All **15 of 15 source slides** verified.

| Video | Original R2 slides | Complete teaching topic |
|---|---|---|
| 01 | 01–05 | Scaling architecture, target tracking, predictive plans, model quotas and cost guardrails |
| 02 | 06–07 | Cost Anomaly Detection, dynamic baselines, subscriptions and investigation |
| 03 | 08–12 | Cost Explorer reporting, monthly trends, resource drilldown, Savings Plans and forecasts |
| 04 | 13–14 | Amazon Managed Grafana workspace, observability and explicit alerts |
| 05 | 15 | AWS Systems Manager managed node identity, agent and HTTPS prerequisites |

## Quality and release status

All fifteen original visuals have corresponding **new source-grounded narration**. All five scripts and revisions are registered with the player API, video catalog, captions and publishing script, without missing or overlapping slide numbers.

Fresh-voice render workflows on GitHub main:
- `.github/workflows/render-aip-m14-parts-01-03.yml`
- `.github/workflows/render-aip-m14-parts-04-05.yml`

The legacy course map mentioned Session Manager and Parameter Store as separate final slides; the actual original Module 14 visuals stop with Systems Manager managed-node prerequisites on slide 15. Do not create unsupported scenes from legacy titles.

Rendering completion, Cloudflare R2 MP4 publication and live course playback **are not yet independently verified**. Validate actual MP4s, VTT, slide range, first title and `script_revision` before marking a video ready.
