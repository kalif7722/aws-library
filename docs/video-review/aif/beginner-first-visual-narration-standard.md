# AIF-C01 — Beginner-first, visual-first narration standard

**Audience:** College graduates and first-time learners with no prior experience in cloud, programming, artificial intelligence, or AWS. Apply this guide to **every AIF video in every future chat** alongside the approved `docs/video-review/aip/visual-first-narration-standard.md`. AIF-specific beginner requirements below take precedence where additional teaching depth is needed.

## Teaching promise
- A learner should understand **what the slide shows, what every important element means, how the concept works, when it is useful, and why a competing solution may not fit**.
- Speak as a patient instructor, not as a narrator reading headings. Never assume understanding of a model, dataset, algorithm, inference, API, container, server, Region, storage, training, embeddings or prompts before defining it.
- Use plain, conversational English with short well-formed sentences, and natural pacing. Avoid filler greetings, mechanical repeated intros/outros and unnecessary jargon.
- Define a term once when it first appears: e.g. **cloud computing** = using computing resources through a provider rather than buying and maintaining all of your own hardware; **model** = a system learned or configured to make a prediction or generate output; **inference** = using a model after it is ready to answer a new request.
- Distinguish **AI**, **machine learning**, **deep learning**, **generative AI**, and **cloud services** precisely; do not imply every AI system is a generative chatbot or that all cloud services are AI.
- Where a slide contains numbered steps, diagrams, arrows, comparisons, charts, code or a worked example, narrate in that **visual order**, calling out actual labels, units, and decisions. Never invent graphics, AWS services, results or claims not on the slide.
- Teach with a relatable, accessible **real-world example** (college assignment, scanning invoices, recognizing spam, classifying a message, customer help desk or photo tagging), keeping the example directly relevant to the slide and culturally neutral.
- Explicitly explain **the problem → what the technology does → the example outcome → how to evaluate correctness or risk**. For AWS names, first teach the generic problem and then the specific AWS service; explain managed versus self-managed trade-offs at beginner depth.
- Do not skip privacy, fairness, cost, responsible use or human review. Explain that a confidence score is not a guarantee and a plausible generated answer can be wrong. Include a practical verification habit.
- For each natural teaching unit, end with a **short comprehension question or decision** (“Would we extract a number from an invoice with a chatbot or document extraction?”), then explain the answer; do not add the same scripted conclusion after every slide.
- Deliver instructional depth according to the actual content; never force a fixed number of slides, word count or video duration. Four visually dense slides may need more teaching than ten simple slides.
- The learner should be able to retell the concept in their own words and recognize it in a simple AWS AI Practitioner exam scenario.

## Source and narration preflight
1. Use the reviewed original local WebP images `public/course-visuals/aif-course/module-NN/slide-MM.webp`; map them to `app/courses/aws-ai-practitioner/visual-lesson-map.json`.
2. Audit all original WebPs in the target module for existence, dimensions, file format and slide order before synthesis. Historical `docs/aif-audit-completion-2026-10-30.md` reports all 349 as reviewed, but the current render still validates each file.
3. Read **the original image**. Titles and learning notes are supplementary; if text differs, resolve against the image.
4. Narration script must have a clear teaching purpose, familiar analogy, correct definition, walkthrough of the actual picture, crucial distinction, and an observation/check/decision. Avoid lecture-length boilerplate.
5. When a diagram or number is only illustrative, identify it as an example. Do not imply certificate types are a mandatory progression, or guarantee an exam outcome.
6. Choose videos by **complete concepts**, not a quota of five slides. For orientation, a single four-slide lecture may be appropriate.
7. Use a consistent professional English teaching voice, **en-US-AndrewNeural** at **-3%** as the approved starting voice. Keep captions and a readable transcript from the exact approved revision.
8. Gate rendering on source audit, module/part ID, exact slide sequence, title alignment, no missing narration, complete MP4/VTT/SRT/transcript/manifest and R2 availability. Publish to the **AIF-specific** video directory, not the AIP media prefix.
9. Add student-facing video lectures *above* the original visual lesson gallery on the AIF module page while keeping all existing lesson links and navigation. Make unavailable videos visibly pending, never pretend the preview is ready.
10. Do not ask for a new confirmation between AIF modules. Automated workflows may render committed scripts; writing visually accurate scripts still needs actual image review. Never claim an R2 upload or website deployment until verified.

## Pilot
- Begin with AIF Module 00, slides 01–04, one coherent orientation lecture.
- Follow with Module 01's six beginner fundamentals slides once the visual source check is complete.
- Use an ordinary student / recent graduate perspective. Every lab or practice explanation should include a concrete expected answer and why an incorrect choice is wrong.
