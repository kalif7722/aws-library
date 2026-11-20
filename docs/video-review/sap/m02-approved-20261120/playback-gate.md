# Playback gate investigation — 2026-11-20

Read-only evidence: main 02442c4b16c33dd746ff7544b184da1ef3c38a99; Workers Builds: aws-library succeeded 2026-11-20T07:07:15Z (build 494b58b4-74f2-4aac-bd2e-4900468f8b50). No denied media request was repeated.

## Actual learner path
Production origin is https://aws-library.kalifs.workers.dev (app/layout.tsx metadataBase).
Control lesson: https://aws-library.kalifs.workers.dev/courses/aws-solutions-architect-professional/visual/module-10#video-lectures
Target lesson: https://aws-library.kalifs.workers.dev/courses/aws-solutions-architect-professional/visual/module-02#video-lectures

SapVideoLectures requests /api/sap-video?module=10&part=01 (or module=02 and the chosen part). That server resolver checks the public manifest and media availability and returns videoUrl, captionsUrl and transcriptUrl. The browser video source is that videoUrl directly. The code supplies no Authorization header, signed media query or private bucket proxy. The module page, root layout and Worker handler inspected contain no learner sign-in check. An external edge access policy cannot be ruled out from source alone.

M10 P01 selects:
https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap/module-10/releases/2026-11-19-approved-direct-v1/part-01/sap-module-10-part-01.mp4?v=2026-11-19-approved-direct-v1

Draft M02 P01 selects:
https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap/module-02/releases/2026-11-20-approved-animation-v1/part-01/sap-module-02-part-01.mp4?v=2026-11-20-approved-animation-v1

The 403 occurred on the same M02 object URL without the revision query, on this same public delivery host. It was not a request to the private S3-compatible r2.cloudflarestorage.com upload endpoint. The revision query is a cache/version marker, not an authorization credential. No query-string variant was tried after denial.

## What the 403 does and does not establish
It establishes failed public retrieval from this executor. The stored receipt contains HTTP status but no response headers/body, so it does not establish whether the denying layer was the object service, an edge rule or executor egress. It does not establish actual learner-browser failure. It is not supported to describe it as an expected private-bucket denial: the existing player uses this public host directly.

The M02 staged prefix matches the draft resolver exactly. No prefix or filename mismatch was found. Main still selects legacy M02 URLs; visiting Module 02 now cannot verify these staged replacements.

No authenticated learner session has been verified in this task. No alternate identity, login, auth-bypass token, proxy fetch or denied-media retry was attempted. The source does not show an authenticated-media flow to use as the next step.

An authorized normal learner check should start on the Module 10 control page in the learner's existing browser: verify the API returns ready with the exact M10 revision; the video actually advances; inspect media 200/206 and captions. This is a proposed check, not a claim of successful playback. For the four M02 replacements, exact staged-object reachability and hashes must be verified through an authorized normal check before merging; the current Module 02 page only demonstrates legacy playback.

## Independent caption integration blocker
CourseVideoCaptions sends the approved caption URL to /api/course-video-captions?src=...
The current route's PATH allowlist accepts only legacy aip/aif VTT paths. It excludes sap and release paths. A local evaluation of the exact regex accepts a legacy AIP URL and rejects both M10 P01 and staged M02 P01 VTT paths. In current source this yields HTTP 400 Unsupported caption source before any upstream request. This cannot explain the raw MP4 403; it is an independent CC defect.

No caption allowlist or access rule was changed. A narrowly reviewed SAP caption integration fix is required before claiming selectable CC works. Do not bypass the endpoint or broaden it to arbitrary URLs.

## Draft-only non-security correction
The page previously supplied effective slideAssets only for M10, and the player used them only for M10. M02 therefore linked to old slide-08.webp and slide-16.webp despite its gallery mapping the aip-v2 replacements.
The draft extends the existing effective-gallery source mapping to M02. It changes original-slide/poster lookup only; no media access checks, keys, upload rules, captions or authorization logic. M10 and other modules preserve their existing lookup behavior.

PR remains draft; no production change or access-rule change.
