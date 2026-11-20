# Normal learner control — 20 November 2026

Observed in the ordinary cloud browser, through the production learner page:
https://aws-library.kalifs.workers.dev/courses/aws-solutions-architect-professional/visual/module-10#video-lectures

- Page loaded without a sign-in prompt; no credentials, alternate identity or bypass token supplied.
- Playlist settled to 11/11 available.
- Part 01: EBS Availability-Zone Scope, Volume Families and gp3 Performance; duration 306.291667 seconds.
- Clicked normal Play and CC controls. Video time advanced from 0.337168 to 5.463245 and 10.437479 seconds; readyState 4, no reported media error. Paused after the check. This verifies sampled video playback, not a complete audio listening audit.
- Actual browser video source: https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap/module-10/releases/2026-11-19-approved-direct-v1/part-01/sap-module-10-part-01.mp4?v=2026-11-19-approved-direct-v1
- CC control became enabled but the visible message was “Captions unavailable for this video.”
- Main remains 02442c4b16c33dd746ff7544b184da1ef3c38a99. Its course-video-captions endpoint still accepts legacy aip/aif paths only, rejecting SAP release URLs before upstream retrieval.

## Implication
Normal browser playback of the M10 control works on the same delivery host used by the staged M02 objects. Therefore the prior executor 403 does not establish that all learner delivery is unavailable. It still does not verify any staged M02 object; no denied M02 request was retried and no alternate route was used to retrieve it.

The M02 release keys match the draft resolver. Current production still selects legacy M02 videos, so checking the current M02 page would not validate the staged replacements. PR #33 remains draft and unmerged.

## Narrowest supported next work
1. Prepare a focused caption integration change for registered SAP caption URLs, preserving the exact host boundary and rejecting arbitrary fetch targets. Prefer an exact approved media catalog/resolver over simply broadening to all URLs. This is the independent, now browser-confirmed CC defect; no access rule was changed in this pass.
2. Obtain authorized verification of the exact staged M02 object paths, hashes and VTT through the normal delivery system. The existing denied request must not be retried or routed around under the current instruction.
3. Only after both gates pass, merge the four-part mapping and verify ordinary learner playback/CC for Parts 01, 02, 04 and 07.

No workflow, upload, media regeneration, access-setting change, merge or production deployment occurred in this control-check pass.
