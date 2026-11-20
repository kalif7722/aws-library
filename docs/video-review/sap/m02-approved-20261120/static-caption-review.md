# Module 02 static captions — draft review

Base: ad9b8c0802e698e528bebdede3dbdbecad9187c9.

The live reviewed videos for Parts 01, 02, 04 and 07 select revision 2026-11-20-approved-animation-v1, but the shared remote-caption proxy rejects SAP paths. This change adds the exact approved VTT bytes as repository-owned static files. The resolver selects a static track only for the exact module, part, approved candidate revision and video URL. A legacy fallback cannot select these captions even if its manifest claims the new revision.

The overlay fetches only these four exact static paths directly. Every other source retains the existing proxy path. The proxy validation, bucket access, video mappings, player artwork, Module 10 and PR #34 are unchanged.

Validation: node --test tests/m02-static-captions.test.mjs — 5 passed. All 165 cues (49/45/38/33) match the existing inventory SHA-256 and byte sizes, parse with the actual player parser, are ordered/non-overlapping and within manifest durations. All four local chapter manifests also matched inventory hashes. Mocked actual resolver tests cover approved and legacy fallback candidates; mocked existing proxy tests cover AIP/AIF success and unsupported destination rejection. Player wiring checks confirm both native track and overlay use the resolver caption URL, and overlay cancellation/CC enable behavior remain present.

These are offline integration and source-wiring checks, not browser rendering checks. Full application build and deployed browser CC verification remain outstanding. No raw media requests, production changes or Module 10 caption changes were performed. The existing inventory's historical blocked-playback labels are retained as provenance; subsequent normal learner checks confirmed all four upgraded videos play.
