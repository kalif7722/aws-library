#!/usr/bin/env python3
"""Install the approved SAP Module 00 cover and preserve the four original slides.

Runs in GitHub Actions after a human uploads the approved generated WebP as
public/course-visuals/sap-c03/module-00/approved-cover.webp.
Never rewrites slide assets or metadata unless the cover is present.
"""
from __future__ import annotations

import copy
import json
import shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/"public/course-visuals/sap-c03/module-00"
COVER=DIR/"approved-cover.webp"
MAP=ROOT/"app/courses/aws-solutions-architect-professional/visual-lesson-map.json"
NARRATION=ROOT/"content/video-narration/sap-module-00-part-01.json"
REVISION="2026-11-16-sap-m00-p01-approved-cover-five-slides-v2"
TITLE="AWS Certified Solutions Architect – Professional | SAP-C03 Visual Course"


def main()->None:
    if not COVER.is_file():
        raise SystemExit(f"Approved cover missing: {COVER}")
    from PIL import Image
    with Image.open(COVER) as img:
        img.verify()
    with Image.open(COVER) as img:
        assert img.width>=1600 and img.height>=900, f"Cover must be high resolution: {img.size}"
        assert abs(img.width/img.height-16/9)<0.03, f"Cover must be 16:9: {img.size}"
    originals=[DIR/f"slide-{n:02}.webp" for n in range(1,5)]
    for f in originals:
        assert f.is_file(),f"Original missing: {f}"
    data=json.loads(MAP.read_text(encoding="utf-8"))
    lessons=data["lessonsByModule"]["00"]
    assert len(lessons)==4, f"Expected 4 original Module 00 lessons, found {len(lessons)}"
    for i,lesson in enumerate(lessons,1):
        assert lesson["asset"]==f"/course-visuals/sap-c03/module-00/slide-{i:02}.webp", (i,lesson["asset"])

    doc=json.loads(NARRATION.read_text(encoding="utf-8"))
    assert (doc["course_slug"],doc["module_id"],doc["part_id"])==("sap","00","01")
    assert [s["slide"] for s in doc["scenes"]]==[1,2,3,4]
    new_scene={
      "slide":1,
      "title":TITLE,
      "visual_overview":"The course-opening cover introduces SAP-C03, the professional-level audience, what the course covers and the visual scenario-based learning approach.",
      "visual_walkthrough":[
        "Title identifies AWS Certified Solutions Architect – Professional and SAP-C03 Visual Course",
        "Top subtitle emphasizes secure, resilient, available and cost-conscious design at scale",
        "Left card covers advanced architecture, multi-account and hybrid designs, security, resilience and operational trade-offs",
        "Middle card identifies solutions architects, engineers, experienced AWS professionals and certification candidates",
        "Right card describes architecture judgment, service selection, readiness and practical skills",
        "Bottom four connected pills emphasize visual diagrams, real-world scenarios, architecture trade-offs and exam-focused learning"
      ],
      "visual_example":"A real business scenario requires choosing among AWS services while considering hybrid connectivity, secure multi-account access, recovery objectives and operational cost.",
      "visual_synthesis":"This course is designed to teach professional architecture decisions through diagrams, end-to-end scenarios and constraints—not memorization of service names.",
      "narration":"Welcome to the AWS Certified Solutions Architect Professional SAP-C03 visual learning course. This opening slide introduces what we will learn, who the course is designed for, and how the lessons will work. At the top is our goal: make confident AWS architecture choices that remain secure, resilient, highly available and cost-conscious at scale. Look at the three cards in the middle. First, the course covers advanced designs, multi-account environments, hybrid connectivity, security, recovery and operational trade-offs. Second, it is designed for solutions architects, cloud engineers, experienced AWS professionals and candidates preparing for the professional certification. Third, you will strengthen architecture judgment, service selection and the ability to solve realistic scenarios. Now follow the four connected learning features at the bottom: visual diagrams reveal how components interact; real-world scenarios supply business requirements; architecture trade-offs explain why one valid design beats another; and exam-focused reasoning helps you recognize the strongest solution. We will begin by understanding what a diagram actually shows, then assess constraints, compare alternatives and make a defensible decision. The next slide introduces the main domains of this journey."
    }
    for scene in doc["scenes"]:
        scene["slide"]+=1
    doc["scenes"]=[new_scene,*doc["scenes"]]
    doc["script_revision"]=REVISION
    doc["part_title"]="SAP-C03 Visual Course Introduction and Architecture Journey"
    doc["review_basis"]="Approved course introduction cover at slide 01, followed by all four original SAP Module 00 source visuals shifted to slides 02–05."
    NARRATION.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

    new=copy.deepcopy(lessons[0])
    new.update({
      "id":"sap-00-cover",
      "moduleId":"00",
      "sequence":1,
      "title":TITLE,
      "asset":"/course-visuals/sap-c03/module-00/slide-01.webp",
      "status":"qa-passed",
      "learningNotes":["Professional SAP-C03 course overview","Audience: architects, cloud engineers and advanced AWS practitioners","Visual diagrams, real-world scenarios, trade-offs and exam-focused design decisions"],
      "decisionCue":"Study the full architecture and its constraints before selecting services.",
      "examSkills":[]
    })
    for i,item in enumerate(lessons,2):
        item["sequence"]=i
        item["asset"]=f"/course-visuals/sap-c03/module-00/slide-{i:02}.webp"
    data["lessonsByModule"]["00"]=[new,*lessons]
    MAP.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

    # Rename from the end to avoid overwriting source slides.
    for old in range(4,0,-1):
        (DIR/f"slide-{old:02}.webp").rename(DIR/f"slide-{old+1:02}.webp")
    COVER.rename(DIR/"slide-01.webp")
    for n in range(1,6):
        assert (DIR/f"slide-{n:02}.webp").is_file()
    print("PASS: cover installed as slide 01, original slides 02–05, lesson map + narration revised")


if __name__=="__main__":
    main()
