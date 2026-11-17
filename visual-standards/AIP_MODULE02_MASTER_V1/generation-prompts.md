# Reusable prompts — AIP Module02 Master V1

## Universal base prompt

Create **ONE** 16:9 educational slide at final 2048×1152 for the subject below using **AIP_MODULE02_MASTER_V1**. Match the approved AIP Module 02 screenshots: matte deep navy background; crisp heavy white all-caps title with selective orange highlight; clear 1–2 sentence teaching premise; purposeful cyan/orange/violet technical diagrams; thin panel strokes; modest local icon depth; readable exact captions; strong technical narrative. Choose layout from the actual concept: pipeline, architecture, request/response, evidence comparison, worked transformation, branching output or lifecycle. Do not force repeated card layout, icon pedestal, footer, or numbering.

Content topic: {{EXACT_TOPIC}}
Primary teaching claim: {{CLAIM}}
Audience/level: {{COURSE_AND_DEPTH}}
Required concepts and examples: {{REQUIRED}}
Technical boundaries, arrows and caveats: {{BOUNDARIES}}
Source verification anchors: {{SOURCES}}
Correct course/module and page marker: {{IDENTIFIERS}}

No invented service capabilities, fake official AWS logos, inaccurate JSON, decorative blobs, huge icons, text glow, neon borders, thick glass, or unnecessary summaries. Ground readable exact technical text in separately typeset overlay where possible. No collage.

## Pipeline

For flow topics, put real data producers on the left; correctly ordered transformations/services center; outputs/consumers right. Use one continuous understandable causal path. Every arrow label states what actually crosses it. One meaningful concrete example, optional bottom nuance.

## Authorization and identity

Draw *principal, credential, request, trust, policy evaluation, resource* as separate concepts with correctly directed arrows. Never imply matching condition = final allow, an IAM policy alone overrides organizational constraints, or that network reachability grants IAM authorization. Ground every decision with an example request and evidence of allow/deny.

## Comparison / troubleshooting

Show two evidence states or before→after with exact unchanged variables. Identify symptom, root cause and corrected behavior. Evidence snippets and claims must be exact. Do not invent a console UI, security status, policy JSON or operational command.

## JSON/CLI/Tabular technical slide

Use real monospace overlays on top of graphical background. Validate syntax with parser or deterministic text. Keep code sufficient to teach and avoid reducing font to fit everything. Any complex material can be split into consecutive slides.

## Automatic review / repair prompt

Compare candidate with all applicable named AIP references. Report: (1) visual mismatch, (2) exact text legibility, (3) diagram semantics and arrow accuracy, (4) official AWS icon provenance, (5) coverage vs source objective, (6) layout variety for its *content*. Return a reject/fix list; do not claim final approval from a generated self-score. Prefer correcting typography/diagram source layers over repeatedly generating entire slide.
