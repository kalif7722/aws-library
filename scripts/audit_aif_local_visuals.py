#!/usr/bin/env python3
"""Verify original numbered AIF-C01 WebP slides match the published lesson map."""
from __future__ import annotations
import argparse, hashlib, json
from pathlib import Path
from PIL import Image

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--module", required=True, help="Two-digit AIF module ID")
    parser.add_argument("--output", help="Write report as JSON")
    args = parser.parse_args()
    module = args.module.zfill(2)
    root = Path(__file__).resolve().parents[1]
    lesson_map = json.loads((root / "app/courses/aws-ai-practitioner/visual-lesson-map.json").read_text(encoding="utf8"))
    source = [item for item in lesson_map["lessons"] if item["moduleId"] == module]
    if not source:
        raise ValueError(f"No AIF lesson map entries found for Module {module}")
    assert [item["sequence"] for item in source] == list(range(1, len(source) + 1)), "AIF source slide numbers not consecutive"
    records = []
    for lesson in source:
        n = lesson["sequence"]
        expected = f"/course-visuals/aif-course/module-{module}/slide-{n:02}.webp"
        path = root / "public" / expected.lstrip("/")
        rec = {"slide": n, "lesson_id": lesson["id"], "title": lesson["title"],
               "public_path": expected, "status": "missing"}
        if lesson.get("asset") != expected:
            rec["status"] = "asset_mapping_mismatch"
        elif path.exists():
            try:
                with Image.open(path) as img:
                    img.verify()
                with Image.open(path) as img:
                    rec["dimensions"] = list(img.size)
                    if img.format != "WEBP" or img.width < 800 or img.height < 450:
                        rec["status"] = "invalid_image"
                    else:
                        rec["status"] = "ok"
                rec["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
            except Exception as exc:
                rec["status"] = "invalid_image"
                rec["error"] = str(exc)
        records.append(rec)
    count = sum(x["status"] == "ok" for x in records)
    result = {"course_slug": "aif", "module": module,
              "mapped_slides": len(source), "verified_slides": count, "slides": records}
    if args.output:
        dest = root / args.output
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps(result, indent=2) + "\n", encoding="utf8")
    print(json.dumps({"module": module, "mapped": len(source), "verified": count,
                      "failures": [r for r in records if r["status"] != "ok"]}, indent=2))
    assert count == len(source), "Original AIF visual audit failed; refuse narration synthesis."

if __name__ == "__main__":
    main()
