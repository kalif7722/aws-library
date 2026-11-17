# Dynamic Presentation Standard V2 — AIP reference expansion

**Status: DRAFT / user approval pending.** Supplements the initial visual-system README. References: all 40 user-supplied AIP Module 02 screenshots. This is a presentation standard, not a static slide template.

## 1. Design the visual story before choosing layout

Create a one-sentence teaching claim and ask: what must the student *see* to understand this? Pick data relationship, state transition, time-series graph, key distribution, side-by-side decision, input→service→output, before/after, IAM decision evidence, troubleshooting, code/JSON contract, lifecycle or lineage. Draft the main diagram first. The diagram should occupy the largest appropriate space; additional panels exist only to support it.

## 2. Composition must vary organically

- Chart-led: big central graph or heatmap, small readable legends and annotated cause/effect.
- Data-led: full-width table, key highlighted rows/columns, minimal descriptive text.
- Architecture-led: floating inputs, real service boundary, clear direction and conditional branches.
- Evidence-led: accurate JSON/policy/CLI excerpts, request, evaluation and outcome.
- Decision-led: asymmetric comparison with checks/risks and a specific choice.
- Operation-led: before/after state with highlighted differences.
- Narrative-led: 2–5 actual stages for real stages only, with varied connectors and icons.

**No forced 3-panel row, compulsory takeaway, big hero center icon, same top header bar, repeated corner badge or mechanically alternating layouts.** Keep nonessential whitespace but don't make sparse slides.

## 3. Color-coded text is essential

Use white for primary text; orange for action/threshold/critical term, cyan for data/key/positive concept, violet for alternate/identity/processing. Use these *within prose* in short purposeful spans and in chart/diagram labels, not as random rainbow. Bold accent words can be 1.1–1.4× adjacent supporting text. Don't overbold every sentence. Text hierarchy visually groups labels, explanation, example and exception; exact code/JSON remains legible.

## 4. Stylistic measurement targets at final 2048×1152

The 1116×627 screenshots are previews; measurements below are **working guides**, not pixel-perfect measured AIP requirements:

- Outer slide margins typically 2–4% of width, with composition allowed near edges when balanced.
- Hairline to slim strokes: typically ~1–2 px in reference preview, equivalent ~2–4 px on 2048-wide output. Some meaningfully highlighted edges may be thicker; don't use a universal frame thickness.
- Modest corner radius: typically ~7–15 px at preview resolution (about 13–28 px final). No thick, glowing glass look.
- Type sizes must be relative to actual content density: major heading frequently ~40–65 px preview in examples; subtitle ~20–29 px preview; body typically ~14–23 px preview; code can be smaller when validated at course viewport. Translate to 2048 master proportionally; DO NOT use this as rigid sizes across all layouts.
- Palette: dark navy base approx RGB (0–6,16–27,38–60); high-contrast white; warm orange and cyan as main accents; violet for alternative/secondary category. Charts may use red, blue, yellow, green for actual meaning.
- Text areas are usually matte or barely shaded; soft surface fills permitted under data and icons. Object illustration may have restrained bevel/gloss and gradient; lettering remains flat, sharp and unglowed.
- Use highlight shapes/selected table cells, colored cylinders, arrows and data marks as primary emphasis rather than global panel glow.

## 5. Five-dimensional QA: don't reduce everything to style similarity

**Meaning:** each arrow, partition, service boundary, resource, sequence and condition maps to real mechanics.
**Interest:** diagrams are visually engaging and make the student want to inspect them; colorful emphasis has teaching purpose.
**Readability:** every label, graph axis, policy text and table cell readable at course-player size; no mangled small text.
**Variety:** the chosen visual grammar reflects the relationship; no duplicate layout shell across unrelated topics.
**Coverage:** the claim, source-required topics and caveats are all represented, without unverified capability claims.

## 6. Two new Security sample concepts (not approved or published)

A) **S3 public-access decision**, reference #23 (keys flow) + #28 (two outcome modes) + #34 (comparison): draw actual anonymous GetObject request → S3 policy vs Block Public Access effective constraints → result. Present as a decision/evidence flow, not four equal cards plus three bottom panels. Distinguish the specific RestrictPublicBuckets behavior from all S3 BPA settings; verify against current AWS documentation.

B) **KMS decrypt authorization**, reference #33 (selected row→request→response) + #36 (decision/retry) + #38 (architecture): show a legitimate request, key-policy grant mechanism versus IAM identity policy, explicit-deny and grant/role conditions, then success or deny. Do **not** claim IAM and key policy must each grant directly in all KMS scenarios: the key policy can directly authorize, or enable IAM to delegate; cross-account uses additional rules. Verify exact trust evaluation before artwork.

Review these separately with the user; no course mapping, bulk-generation or deployment.
