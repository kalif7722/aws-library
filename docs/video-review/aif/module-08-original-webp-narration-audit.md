# AIF Module 08 original-WebP-first narration audit

All 29 numbered originals were individually visually inspected in sequence on November 13, 2026. The previous v1 narration was rejected because it followed generic lesson notes rather than the actual slide layouts.

## Source-of-truth and example anchors
- 01: Six input categories mapped to purpose-built AI services; password-reset email produces negative sentiment and key phrases; Textract invoice INV-1001, ACME Ltd, 2024-01-15, 1250 dollars.
- 02: Support email about late Chennai delivery and helpful support; English, Chennai LOCATION, delivery/support phrases, mixed sentiment; topic-modeling historical feature, and Comprehend versus Textract.
- 03: Five numbered S3 training/classifier/message/label/routing boxes; "charged twice" maps to billing.
- 04: "Maya met the team in Seattle on Tuesday" gives PERSON Maya, LOCATION Seattle, DATE Tuesday; ACME-12345 custom POLICY_ID.
- 05: PL-2048 policy custom-entity extraction, S3 labels and real-time versus batch paths.
- 06: English "Your order is ready" to Spanish "Tu pedido está listo" via Translate.
- 07: "My order is delayed" audio to Transcribe timestamps 00:00:00.000 and 00:00:01.250.
- 08: Toxicity segments 00:00-00:08 NONE, 00:08-00:15 INSULT, 00:15-00:27 NONE; human moderation.
- 09: "AsterValve inspection" custom vocabulary versus custom language model.
- 10: "Your package is ready" via Polly to MP3/voice delivery.
- 11: "Welcome to AWS" lexicon, SSML, audio versus separate speech-marks request.
- 12: Store shelf photograph with chips/cereal/granola and "Special Offer" text; Rekognition versus Textract.
- 13: Leaf logo custom labels, S3 training images and shelf-photo detection.
- 14: Illustrative moderation labels and confidence values; policy allow/review/block plus optional adapter.
- 15: Mountain landscape generation, Rekognition moderation policy gate, human approval or rejection.
- 16: Lex BookHotel slots city Seattle, date April 12; Lambda and confirmation HTL12345.
- 17: GardenMart gardening items, S3 historical interactions, fresh events and recommendations API.
- 18: Personalize recipes table and existing shelf re-ranking with campaign ARN.
- 19: Textract invoice INV-100 for Example Co: Product A 2 x 10 and Service B 1 x 22, total 42.
- 20: Kendra employee query "Where is IT support?" returns IT Support FAQ and laptop setup guide.
- 21: Mechanical Turk mug, shoe and backpack human labeling and quality review.
- 22: Ground Truth damaged versus intact package labels and consensus workflow.
- 23: A2I low-confidence invoice total $100? reviewed and verified as $100.00.
- 24: Transcribe Medical "Patient reports knee pain" to reviewed clinical note.
- 25: Comprehend Medical DetectEntitiesV2 knee pain/ibuprofen, DetectPHI separate.
- 26: Two pathways for dictated versus typed knee-pain note, Comprehend Medical and optional DetectPHI.
- 27: ELB -> EC2+EBS inside ASG; traffic spike 2 to 3 instances.
- 28: Six EC2 setup checks; two vCPUs, 4 GiB RAM, EBS, subnet, HTTPS 443, user data.
- 29: GPU P/G, Trainium Trn and Inferentia Inf architecture for training versus inference.

Narration requirements: describe what students see in the same order as on-screen labels and arrows, explain any actual values and examples, then offer service-selection distinctions. No independent unrelated examples should replace a displayed worked example. Re-render MP4, subtitles and manifests from the same v2 revision.
