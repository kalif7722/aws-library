# AIP-C01 Visual Lesson Mapping — Maintainer Guide

## Source of truth

Edit **app/courses/aws-generative-ai-developer-professional/visual-lesson-map.json** to maintain module page ranges and per-source-page visual mappings. Both the course module route and ModuleVisualGallery read this file. Module 01 lesson counts and captions are no longer hard-coded in the gallery.

## Add or update a page mapping

1. Find the course module in the modules array and verify its PDF page range.
2. Under lessonsByModule, use the zero-padded module ID (for example, "02"). Add one object per source page in ascending PDF page order.
3. Set sourcePage, title, focus, batch, and assetStatus. Use "planned" before an image exists, "generated" when the individual image has been generated, "uploaded" after its matching WebP has been uploaded to R2, and "qa-passed" only after checking the image against its source page.
4. Preserve the asset naming convention: module-{moduleNumber}/slide-{visualIndexPadded}.webp. The visual index is the entry's position in that module's array, starting at 1, so keep entries ordered by source PDF page. The first visual for Module 02 maps to module-02/slide-01.webp.
5. Commit the JSON change. For a mapped module, the gallery expands to the number of lesson entries automatically. Do not hard-code a card count in the component.

## Current coverage

- All 19 course modules (00–18) and their source-page ranges are catalogued in the modules array.
- Module 01 has 59 page-specific lesson mappings for PDF pages 16–74.
- Module 01 pages 16–25 are marked "generated" (content review and R2 publication may still be pending); pages 26–74 are mapped as "planned".
- Modules without page-by-page entries keep the existing ten-slot gallery until their lesson mappings are added. This avoids presenting ten generic slots as the module's complete lesson inventory.

## Asset-state behavior

- "planned": show the mapped lesson title and source page without requesting an image.
- "generated": look for the expected WebP at the mapped R2 URL and label it as review-pending; a missing file shows a clear fallback.
- "uploaded": expect the R2 asset to exist, but keep QA status pending.
- "qa-passed": the image has been reviewed and can be counted as complete.

The status field is editorial metadata. It does not upload files to R2; upload the WebP to the exact asset path before setting a row to "uploaded".