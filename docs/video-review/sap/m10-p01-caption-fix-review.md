# Review-only SAP M10 P01 caption fix

The live player advances normally, but CC reports captions unavailable. This patch adds one exact SAP caption key before the unchanged legacy AIP/AIF validation in the same-origin endpoint.

Source provenance: .github/workflows/stage-sap-m10-approved-20261119.yml at commit 9518b083a7d0d5c4239973adc78fef34b5035eaa records the 4651-byte VTT with SHA256 3f6ec4842a5d9eec7cac95e38b92c160d20eb0c7e60c80df6bbbf06545088947. Mapping commit c05d3293e18cecef35fab3d8895d866a1a146167 selects release 2026-11-19-approved-direct-v1. Browser-observed video duration is 306.291667 seconds.

There are no VTT files in the complete repository tree and no local .agents skills. This uses the trusted fixed release key and hash instead of inventing captions. The endpoint refuses redirects, limits response bytes, verifies SHA256 and validates ordered, bounded VTT timing. Unknown SAP paths remain rejected. No broad host/path allowlist expansion, credentials, bucket permission or media access setting changes.

Validation: node --test tests/sap-reviewed-captions.test.mjs — six tests passed. Covers exact accepted key, unknown keys and destination tricks, synthetic pinned-fixture success, rejection of fixture bytes for the actual production pin, redirects, upstream denial, wrong size/hash and malformed timing. All fetches mocked.

Limit: the live original VTT was not fetched; full application build and fixed live-caption playback were not tested. Before merge, verify the original VTT satisfies its existing pin/parser through an authorized normal path. A mismatch must fail closed rather than relaxing the pin.

Scope: M10 P01 only. No deployment or production merge. Module 2 publication PR #33 remains unchanged and unmerged; no rejected media request was retried.
