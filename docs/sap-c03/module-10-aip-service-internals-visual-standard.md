# SAP-C03 Module 10: AIP service internals visual standard

## Approved reference

The **“How EBS performance is really limited”** slide approved on 18 November 2026 is the reference for occasional deep teaching slides. The source image was generated in the course work session as `exec-bce73251-09d7-4859-87ab-e0823f2f4639.png`. Preserve it as a reference asset before relying on this guide alone.

## When to use this layout

Add only a few foundational and service internals slides in each module, placed immediately before the lessons that depend on them. Then continue the existing visual sequence and topic-specific AIP layouts. This dense explanatory pattern is appropriate for performance limits, mechanics, benefits, constraints, and diagnostic reasoning; it is not the template for every slide.

## Visual DNA

- 16:9 landscape, export 2048 × 1152 WebP for the course.
- Very dark matte navy canvas, sampled AIP open area near RGB `(1,25,44)`, subtle depth without a bright blue wash.
- Compact `MODULE 10` at upper left and `SERVICE INTERNALS` at upper right, each with a short thin orange underline.
- Large high-contrast white title with one meaningful orange phrase. A concise explanatory subtitle immediately below it.
- Central, topic-specific glossy diagram with a clear directional story. For EBS performance: application → EC2 EBS bandwidth → volume IOPS → volume throughput → EBS volume; colored gauge indicators and thin arrows emphasize the chain.
- Lower teaching area can carry concise definitions, a small diagnostic chart, and one worked example. Use cyan, orange, violet, and restrained green for meaning, not decoration. Thin luminous borders and subtle dimensional icon treatment suit the AIP reference.
- Finish with one practical takeaway. The approved EBS example states that provisioned volume performance is not an end-to-end guarantee.
- Keep the richer explanatory text legible at presentation scale. Avoid repeated concepts, clipped labels, fabricated logos, decorative cards, or a generic block diagram.

## Reusable generation prompt

> Create one 16:9 SAP-C03 Module 10 AIP-style training slide about **[exact topic]**. Match the approved “How EBS performance is really limited” reference: near-black navy RGB (1,25,44) background, short orange header rules, large white title with selective orange emphasis, concise teaching subtitle, precise topic-specific glossy directional visual, cyan/orange/violet semantic accents, thin luminous frames, and readable technical detail. Explain **[three to four exact concepts]** using a central cause-and-effect visual, concise labeled definitions, one technically valid numeric or decision example where useful, and a one-sentence operational takeaway. Use accurate AWS terminology, preserve the user-provided text exactly, avoid fake branding and unnecessary collage, and render one complete slide only.

## Technical and visual review

1. Check each label, number, unit, arrow, and AWS constraint against the source lesson and current official documentation.
2. View the full image and a downscaled preview; reject unreadable small text, scrambled spelling, crowded edges, or duplicated objects.
3. Compare open-canvas color, title scale, spacing, icon treatment, and teaching density to the AIP references and the approved EBS internals image.
4. Keep the original 45-lesson teaching flow. Interleave a small number of fundamentals at the service transition; do not renumber existing lessons.
5. Generate the rest of the module with varied AIP compositions suited to each topic. Do not apply the dense internals design indiscriminately.
