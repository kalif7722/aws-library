# GCP image handoff

Image binaries are handed off in numbered batches instead of being committed to GitHub. Each batch contains the files, a SHA-256 manifest, and the exact R2 object key for upload.

## Batch process

1. Run the renderer or add the approved source image under `public/gcp/`.
2. Run `node scripts/package-gcp-image-batch.mjs --batch gcp-001`.
3. Upload the generated ZIP contents to the `r2_key` values in `R2_UPLOAD_MANIFEST.tsv`.
4. Run `node scripts/validate-gcp-catalog.mjs --write-report`.
5. Commit only catalog/code/manifests to GitHub; keep image binaries in the Drive/R2 handoff.

The current batch is `gcp-001` and contains four validated 2048×1152 WebP EL10 visuals. Walkthrough files will use the same manifest with `kind=walkthrough`, paired `-1` and `-2` filenames, and their exact R2 keys.
