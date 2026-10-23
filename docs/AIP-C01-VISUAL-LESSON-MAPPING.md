# AIP-C01 Visual Lesson Mapping — Maintainer Guide

## Source of truth

Edit **app/courses/aws-generative-ai-developer-professional/visual-lesson-map.json** to maintain course module page ranges and page-by-page lesson mappings. The course routes and `ModuleVisualGallery` read this file for module titles, source PDF page numbers, and lesson captions.

## Current mapping coverage

- All 19 modules (00–18) have page-by-page mappings.
- The map covers all 669 source PDF pages from pages 3–671 without gaps.
- Module 00 maps 13 course-introduction pages (PDF pages 3–15).
- Module 01 maps 59 lesson pages (PDF pages 16–74).
- Modules 02–18 map the remaining 597 pages (PDF pages 75–671).
- Each mapping is ordered by source PDF page; its array position determines the visual index. For example, Module 02 PDF page 75 is `module-02/slide-01.webp`, and PDF page 76 is `module-02/slide-02.webp`.

## Add or update a page mapping

1. Find the target module in the `modules` array and verify its source PDF page range.
2. Under `lessonsByModule`, use the zero-padded module ID (for example, `"02"`) and add or update one object for every source page in ascending order.
3. Keep `sourcePage` aligned with the actual PDF page. Add a concise, accurate `title`; use `focus` for a useful non-repetitive learning objective when available, and `batch` to group work.
4. Set `assetStatus` as editorial metadata: `planned` before generation, `generated` after image generation, `uploaded` after the WebP is uploaded, and `qa-passed` only after checking it against the source PDF page.
5. Preserve the canonical asset convention: `module-{moduleNumber}/slide-{visualIndexPadded}.webp`. For example, `module-01/slide-11.webp`.
6. Do not hard-code the gallery card count in the component; the module's source range and mapping define its lesson inventory.

## Automatic R2 image discovery

The gallery discovers images from their actual public R2 object paths at runtime. It does not use `assetStatus` to hide or show cards, and does not require a manifest edit each time an image is uploaded.

Canonical path:

`aws-genai-course-visuals/module-01/slide-11.webp`

The discovery API also checks two compatibility layouts in case a ZIP folder was extracted one level too deep, or the slide files were uploaded directly to the course-assets root:

- `aws-genai-course-visuals/module-01/module-01/slide-11.webp`
- `aws-genai-course-visuals/slide-11.webp`

The API returns the exact discovered key to the gallery so both the thumbnail and full-screen viewer load the correct object. Use the canonical module folder whenever possible, because root-level slide names can overlap between modules.

After uploading, use **Refresh uploaded images** in the module gallery. Newly uploaded assets should appear when they match one of the supported paths and have a `.webp` extension with the expected zero-padded filename.

## Asset-state metadata

`assetStatus` documents editorial progress and does not upload or publish an image. Runtime visibility is based on successful R2 object discovery; successful discovery does not mean an image has passed content QA. Review each visual against its mapped source PDF page before marking it `qa-passed`.
