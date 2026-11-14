#!/usr/bin/env python3
"""Fail fast when an AIF video workflow points to another module or stale scripts.

Use --workflow to check one render job including its narration/slide coverage.
Use --all to check module references across every AIF rendering workflow (CI).
No non-standard Python dependencies.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKFLOWS = ROOT / ".github" / "workflows"
MODULE_FILE = re.compile(r"^render-aif-m(?P<module>\d{2})-.*\.ya?ml$")
REFERENCES = {
    "AIF source manifest": r"aif-module-(\d{2})-part-",
    "AIF revision or audio cache": r"aif-m(\d{2})-(?:p|parts)",
    "AIF original audit command": r"audit_aif_local_visuals\.py\s+--module\s+(\d{2})",
    "Audit module assertion": r'audit\[["\x27]module["\x27]\]\s*==\s*["\x27](\d{2})["\x27]',
    "Narration module assertion": r'm\[["\x27]module_id["\x27]\]\s*==\s*["\x27](\d{2})["\x27]',
    "AIF R2 storage prefix": r"aws-course-videos/previews/aif/module-(\d{2})",
    "AIF module display name": r"(?:AIF\s+)?Module\s+(\d{2})",
    "AIF render job name": r"AIF\s+M(\d{2})\s+Part",
}
PARTS = re.compile(
    r'^\s+- part: ["\x27](\d{2})["\x27]\s*\n'
    r'\s+start:\s*(\d+)\s*\n'
    r'\s+end:\s*(\d+)\s*\n'
    r'\s+revision:\s*["\x27]([^"\x27]+)["\x27]',
    re.MULTILINE,
)


def validate(path: Path, *, check_manifests: bool = False) -> list[str]:
    errors: list[str] = []
    match = MODULE_FILE.fullmatch(path.name)
    if not match:
        return [f"{path}: unsupported AIF renderer filename"]
    module = match.group("module")
    body = path.read_text(encoding="utf-8")

    for label, pattern in REFERENCES.items():
        for hit in re.finditer(pattern, body):
            found = hit.group(1)
            if found != module:
                line = body.count("\n", 0, hit.start()) + 1
                errors.append(
                    f"{path.relative_to(ROOT)}:{line}: {label} refers to module {found}, "
                    f"but filename targets module {module}"
                )

    # Newly created modules must never bypass the module-alignment check.
    # Older workflows predate this policy and remain available for reruns.
    if int(module) >= 11 and "parts" in path.name:
        required = f"python scripts/validate_aif_video_workflow.py --workflow .github/workflows/{path.name}"
        if required not in body:
            errors.append(f"{path}: missing mandatory fail-fast AIF preflight: {required}")

    if not check_manifests:
        return errors

    parts = [(part, int(start), int(end), revision)
             for part, start, end, revision in PARTS.findall(body)]
    if not parts:
        return errors + [f"{path}: missing part/start/end/revision render matrix"]

    lesson_map = json.loads(
        (ROOT / "app/courses/aws-ai-practitioner/visual-lesson-map.json")
        .read_text(encoding="utf-8")
    )
    count = sum(item["moduleId"] == module for item in lesson_map["lessons"])
    if not count:
        errors.append(f"{path}: no Module {module} lessons in visual-lesson-map.json")

    audit_command = re.findall(
        r"audit_aif_local_visuals\.py\s+--module\s+(\d{2})", body
    )
    if audit_command != [module]:
        errors.append(f"{path}: expected exactly one original-image audit for {module}")

    for field in ("mapped_slides", "verified_slides"):
        expected = f'audit["{field}"]=={count}'
        if expected not in body:
            errors.append(f"{path}: audit must verify {expected}")

    seen: list[int] = []
    for part, start, end, revision in parts:
        if end < start:
            errors.append(f"{path}: Part {part} end is before start")
            continue
        manifest = ROOT / f"content/video-narration/aif-module-{module}-part-{part}.json"
        if not manifest.is_file():
            errors.append(f"{path}: missing {manifest.relative_to(ROOT)}")
            continue
        doc = json.loads(manifest.read_text(encoding="utf-8"))
        if (doc.get("course_slug"), doc.get("module_id"), doc.get("part_id")) != ("aif", module, part):
            errors.append(f"{manifest}: wrong course/module/part")
        if doc.get("script_revision") != revision:
            errors.append(f"{manifest}: revision differs from workflow")
        actual = [scene.get("slide") for scene in doc.get("scenes", [])]
        expected = list(range(start, end + 1))
        if actual != expected:
            errors.append(f"{manifest}: slide sequence {actual} != {expected}")
        if not all(len(scene.get("narration", "").split()) >= 90 for scene in doc.get("scenes", [])):
            errors.append(f"{manifest}: missing/too-short image-grounded narration")
        if doc.get("slide_local_dir") != f"public/course-visuals/aif-course/module-{module}":
            errors.append(f"{manifest}: original image directory does not match module")
        seen.extend(actual)

    if len(parts) > 1 and seen != list(range(1, count + 1)):
        errors.append(f"{path}: module coverage not continuous from 1 through {count}: {seen}")
    return errors


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--workflow", type=Path, help="Validate one workflow and all its narration parts")
    group.add_argument("--all", action="store_true", help="Scan all AIF render workflows for wrong module IDs")
    args = parser.parse_args()
    paths = sorted(WORKFLOWS.glob("render-aif-m*.yml")) if args.all else [args.workflow]
    paths = [p if p.is_absolute() else ROOT / p for p in paths]
    errors: list[str] = []
    checked = 0
    for path in paths:
        if not MODULE_FILE.fullmatch(path.name):
            continue
        checked += 1
        # In CI, all new modules (11 onward) receive strict manifest and
        # original-slide coverage checks. Legacy workflows receive static checks.
        module_number = int(MODULE_FILE.fullmatch(path.name).group("module"))
        strict = not args.all or (module_number >= 11 and "parts" in path.name)
        errors.extend(validate(path, check_manifests=strict))
    if checked == 0:
        errors.append("No matching AIF rendering workflows found")
    if errors:
        for issue in errors:
            print(f"::error::{issue}")
        raise SystemExit(f"FAILED: {len(errors)} AIF workflow mismatch(es)")
    print(f"PASS: {checked} AIF video workflow(s) checked for module and source alignment")


if __name__ == "__main__":
    main()
