# SAP Module 02 approved review publication — blocked before upload

Scope: Parts 01, 02, 04 and 07 only. User approved these exact narrated reviews. Do not merge this draft until the versioned objects are uploaded and independently verified.

## Verified existing GitHub path
- Successful publishing run: https://github.com/kalif7722/aws-library/actions/runs/44382463403
- Workflow: .github/workflows/publish-sap-m15-p04-approved.yml
- Source review run: 44378467686; source commit: 052b93a6079b498da9321acb628006eb7df40e6c.
- Artifact: sap-m15-part04-complete-review, ID 14464715370, ZIP digest sha256:913e5067d09c0bbd3c81f65189e0565ece67d4d09adff5bd5b94eadc982dd99a.
- Publication job 135078135561 succeeded and recorded public checksum, chapter, caption and transcript verification.
- The workflow has workflow_dispatch with no inputs; run-id and artifact name are hardcoded for Module 15. Running it cannot publish Module 02.
- Module 02 render workflows also have workflow_dispatch with no inputs. They synthesize and rerender older scripts, then overwrite legacy keys. Do not run them for these approved replacements.

## Artifact ingress blocker
All 127 repository Actions artifacts were listed on 2026-11-20. None is a Module 02 review artifact; the newest artifact is dated 2026-11-19. The four approved files were produced locally and have no source Actions run ID.
All 276 workflow records were inspected for staging/publication/upload paths. No existing workflow accepts local reviewed MP4 files. The newer Module 10 staging workflows create encrypted, short-lived direct R2 upload links; that route is explicitly excluded from this task.

There is no existing Run workflow selection or set of inputs that uploads these four local files. The minimum missing prerequisite is an approved GitHub-hosted ingress for the exact files, producing an immutable artifact ID/run ID and matching checksums, followed by a narrowly scoped publisher consuming that artifact. It must not execute code from the media package, accept private download URLs, put binaries in main, or rerender media. No new ingress workflow is included or triggered here.

## Draft contents and activation gate
The inventory records 20 exact objects: unchanged approved MP4/VTT plus matching SRT, transcript and chapter manifest for each part. Local checks reconfirmed approved MP4 checksums, H.264/AAC compatibility, ordered chapters and all 165 caption texts/timestamps against embedded subtitles.

The route draft selects versioned media only for M02 Parts 01/02/04/07; all legacy fallbacks and M10 selections remain intact. Before merging:
1. Verify approved artifact provenance and every item hash against the inventory.
2. Upload new versioned keys through the trusted GitHub publisher without overwriting existing keys.
3. Verify remote bytes, sizes, MIME, MP4 access, VTT and chapter manifests.
4. Recheck current main, run focused mapping checks and deploy to the existing production target.
5. Verify each learner API and playback/caption controls; distinguish deployment from playback if access is blocked.

No media, credentials, private URLs, executable workflow or production change is included in this draft.
