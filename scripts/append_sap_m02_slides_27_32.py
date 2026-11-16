#!/usr/bin/env python3
"""Idempotently append the six user-uploaded SAP Module 02 visuals to the course map."""
from __future__ import annotations
import json
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
MAP=ROOT/"app/courses/aws-solutions-architect-professional/visual-lesson-map.json"
VIS=ROOT/"public/course-visuals/sap-c03/module-02"
TITLES={
27:"AWS Control Tower — Drift Detection and Remediation",
28:"CloudFormation StackSets Across Accounts and Regions",
29:"AWS Budgets, Cost Categories and Cost Allocation",
30:"AWS Account Lifecycle and Closure",
31:"Control Tower — Landing-Zone Updates and Account Enrollment",
32:"Multi-Account Governance — Troubleshooting Example",
}
NOTES={
27:["Compare approved landing-zone controls with deployed state","Investigate drift before selecting manual or configured automated remediation"],
28:["Deploy stack instances across selected accounts and Regions","Compare StackSets service-managed and self-managed permissions"],
29:["Monitor AWS Budgets, use Cost Categories to group spending, and enable allocation tags","Investigate cost alerts and assign cost ownership"],
30:["Create, govern and retire accounts through approved lifecycle stages","Preserve evidence and resolve dependencies before closure"],
31:["Separate landing-zone updates from account enrollment","Check prerequisites, supported controls and post-update compliance"],
32:["Diagnose EC2 AccessDenied using IAM and effective inherited SCPs","Apply narrowly scoped guardrail changes only after review and retest"],
}
DECISIONS={
27:"Drift detection does not guarantee automatic repair; verify the exact affected resource and supported remediation.",
28:"Use StackSets for consistent baseline deployment with controlled rollout and explicit permissions.",
29:"Budgets alert; Cost Categories group; allocation tags attribute eligible spending.",
30:"Decommission dependencies and retain required records before account closure.",
31:"Keep landing-zone updates and account enrollment as distinct verified operations.",
32:"An inherited explicit SCP Deny cannot be overridden by an IAM Allow.",
}
def main():
    data=json.loads(MAP.read_text(encoding="utf-8"))
    lessons=data["lessonsByModule"]["02"]
    seq=[int(x["sequence"]) for x in lessons]
    assert len(seq)==len(set(seq)),f"Duplicate Module 02 sequence: {seq}"
    existing={int(x["sequence"]):x for x in lessons}
    assert all(n in existing for n in range(1,27)),"Original 26 lessons incomplete"
    if any(n in existing for n in range(27,33)):
        assert all(n in existing and existing[n].get("asset")==f"/course-visuals/sap-c03/module-02/slide-{n:02}.webp" for n in range(27,33)), "Conflicting mapped slides in 27-32"
        print("PASS: Module 02 already includes all uploaded slides")
        return
    assert len(lessons)==26,f"Unexpected Module 02 lesson count {len(lessons)}"
    for n in range(27,33):
        p=VIS/f"slide-{n:02}.webp"
        assert p.is_file() and p.stat().st_size>10000,p
        with Image.open(p) as im:
            assert im.format=="WEBP" and abs(im.width/im.height-16/9)<0.025,(p,im.size)
        lesson={
          "id":f"sap-02-{n:03d}","moduleId":"02","sequence":n,
          "title":TITLES[n],"asset":f"/course-visuals/sap-c03/module-02/slide-{n:02}.webp",
          "status":"qa-passed","learningNotes":NOTES[n],
          "decisionCue":DECISIONS[n],"examSkills":["Architecture design","Governance and operational trade-offs"]
        }
        lessons.append(lesson)
    lessons.sort(key=lambda x:x["sequence"])
    assert len(lessons)==32 and [l["sequence"] for l in lessons]==list(range(1,33))
    data["lessonsByModule"]["02"]=lessons
    MAP.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("PASS: SAP M02 32 lessons; slides 27-32 mapped; existing 1-26 preserved")
if __name__=="__main__":main()
