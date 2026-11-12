#!/usr/bin/env python3
"""Write a verified AIP lecture release record without git rebase conflicts."""
import argparse
import base64
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

EXPECTED = {
    ("00", None): (list(range(1, 13)), "2026-11-11-visual-aligned-v2"),
    ("01", "01"): (list(range(1, 10)), "2026-11-11-m01-p01-visual-aligned-v1"),
    ("01", "02"): (list(range(10, 14)), "2026-11-11-m01-p02-visual-aligned-v1"),
    ("01", "03"): (list(range(14, 25)), "2026-11-11-m01-p03-visual-aligned-v1"),
    ("01", "04"): (list(range(25, 35)), "2026-11-11-m01-p04-visual-aligned-v1"),
    ("01", "05"): (list(range(35, 44)), "2026-11-11-m01-p05-visual-aligned-v1"),
    ("01", "06"): (list(range(44, 51)), "2026-11-11-m01-p06-50-slides-v2"),
    ("03", "01"): (list(range(1, 7)), "2026-11-12-m03-p01-visual-aligned-v1"),
    ("03", "02"): (list(range(7, 15)), "2026-11-12-m03-p02-visual-aligned-v1"),
    ("03", "03"): (list(range(15, 21)), "2026-11-12-m03-p03-visual-aligned-v1"),
    ("03", "04"): (list(range(21, 28)), "2026-11-12-m03-p04-visual-aligned-v1"),
    ("03", "05"): (list(range(28, 34)), "2026-11-12-m03-p05-visual-aligned-v1"),
    ("03", "06"): (list(range(34, 41)), "2026-11-12-m03-p06-visual-aligned-v1"),
    ("03", "07"): (list(range(41, 46)), "2026-11-12-m03-p07-visual-aligned-v1"),
    ("03", "08"): (list(range(46, 51)), "2026-11-12-m03-p08-visual-aligned-v1"),
    ("04", "01"): (list(range(1, 7)), "2026-11-12-m04-p01-visual-aligned-v1"),
    ("04", "02"): (list(range(7, 12)), "2026-11-12-m04-p02-visual-aligned-v1"),
    ("04", "03"): (list(range(12, 17)), "2026-11-12-m04-p03-visual-aligned-v1"),
    ("04", "04"): (list(range(17, 23)), "2026-11-12-m04-p04-visual-aligned-v1"),
    ("05", "01"): (list(range(1, 6)), "2026-11-12-m05-p01-visual-aligned-v1"),
    ("05", "02"): (list(range(6, 11)), "2026-11-12-m05-p02-visual-aligned-v1"),
    ("05", "03"): (list(range(11, 16)), "2026-11-12-m05-p03-visual-aligned-v1"),
    ("05", "04"): (list(range(16, 21)), "2026-11-12-m05-p04-visual-aligned-v1"),
    ("05", "05"): (list(range(21, 26)), "2026-11-12-m05-p05-visual-aligned-v1"),
    ("05", "06"): (list(range(26, 32)), "2026-11-12-m05-p06-visual-aligned-v1"),
    ("05", "07"): (list(range(32, 37)), "2026-11-12-m05-p07-visual-aligned-v1"),
    ("06", "01"): (list(range(1, 6)), "2026-11-12-m06-p01-visual-order-v5"),
    ("06", "02"): (list(range(6, 11)), "2026-11-12-m06-p02-visual-audit-v3"),
    ("06", "03"): (list(range(11, 17)), "2026-11-12-m06-p03-visual-audit-v3"),
    ("06", "04"): (list(range(17, 25)), "2026-11-12-m06-p04-visual-audit-v3"),
    ("06", "05"): (list(range(25, 33)), "2026-11-12-m06-p05-visual-audit-v3"),
    ("06", "06"): (list(range(33, 42)), "2026-11-12-m06-p06-specific-narration-v2"),
    ("06", "07"): (list(range(42, 49)), "2026-11-12-m06-p07-specific-narration-v2"),
    ("06", "08"): (list(range(49, 56)), "2026-11-12-m06-p08-specific-narration-v2"),
    ("06", "09"): (list(range(56, 61)), "2026-11-12-m06-p09-nontemplate-v3"),
    ("06", "10"): (list(range(61, 64)), "2026-11-12-m06-p10-nontemplate-v3"),
    ("06", "11"): (list(range(64, 69)), "2026-11-12-m06-p11-nontemplate-v3"),
    ("06", "12"): (list(range(69, 73)), "2026-11-12-m06-p12-nontemplate-v3"),
    ("06", "13"): (list(range(73, 77)), "2026-11-12-m06-p13-nontemplate-v3"),
    ("07", "01"): (list(range(1, 6)), "2026-11-12-m07-p01-lesson-map-v1"),
    ("07", "02"): (list(range(6, 11)), "2026-11-12-m07-p02-lesson-map-v1"),
    ("02", "01"): (list(range(1, 8)), "2026-11-11-m02-p01-visual-aligned-v1"),
    ("02", "02"): (list(range(8, 16)), "2026-11-11-m02-p02-visual-aligned-v1"),
    ("02", "03"): (list(range(16, 22)), "2026-11-11-m02-p03-visual-aligned-v1"),
    ("02", "04"): (list(range(22, 29)), "2026-11-11-m02-p04-visual-aligned-v1"),
    ("02", "05"): (list(range(29, 34)), "2026-11-11-m02-p05-visual-aligned-v1"),
    ("02", "06"): (list(range(34, 40)), "2026-11-11-m02-p06-visual-aligned-v1"),
    ("02", "07"): (list(range(40, 47)), "2026-11-11-m02-p07-visual-aligned-v1"),
    ("02", "08"): (list(range(47, 57)), "2026-11-11-m02-p08-visual-aligned-v1"),
    ("02", "09"): (list(range(57, 65)), "2026-11-11-m02-p09-visual-aligned-v1"),
    ("02", "10"): (list(range(65, 71)), "2026-11-11-m02-p10-visual-aligned-v1"),
    ("02", "11"): (list(range(71, 81)), "2026-11-11-m02-p11-visual-aligned-v1"),
    ("02", "12"): (list(range(81, 91)), "2026-11-11-m02-p12-visual-aligned-v1"),
    ("02", "13"): (list(range(91, 101)), "2026-11-11-m02-p13-visual-aligned-v1"),
    ("02", "14"): (list(range(101, 111)), "2026-11-11-m02-p14-visual-aligned-v1"),
    ("02", "15"): (list(range(111, 121)), "2026-11-11-m02-p15-visual-aligned-v1"),
    ("02", "16"): (list(range(121, 126)), "2026-11-12-m02-p16-visual-aligned-v1"),
    ("02", "17"): (list(range(126, 135)), "2026-11-12-m02-p17-visual-aligned-v1"),
    ("02", "18"): (list(range(135, 139)), "2026-11-12-m02-p18-visual-aligned-v1"),
    ("02", "19"): (list(range(139, 145)), "2026-11-12-m02-p19-visual-aligned-v1"),
}
ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aip"
COURSE = "https://aws-library.kalifs.workers.dev/courses/aws-generative-ai-developer-professional"

def call(url, token, payload=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode() if payload is not None else None,
        method="PUT" if payload is not None else "GET",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + token,
            "X-GitHub-Api-Version": "2022-11-28",
            **({"Content-Type": "application/json"} if payload is not None else {}),
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.status, json.load(response)
    except urllib.error.HTTPError as exc:
        error = exc.read(1200).decode("utf-8", errors="replace")
        if exc.code in (404, 409, 422, 429, 500, 502, 503, 504):
            return exc.code, {"message": error}
        raise RuntimeError("GitHub API error HTTP %s: %s" % (exc.code, error)) from exc

def publish(path):
    m = json.loads(Path(path).read_text(encoding="utf-8"))
    module, part = m.get("module"), m.get("part")
    if (module, part) not in EXPECTED:
        raise ValueError("Unrecognized AIP module / part")
    slides, revision = EXPECTED[(module, part)]
    if m.get("script_revision") != revision or [s.get("slide") for s in m.get("scenes", [])] != slides:
        raise ValueError("Refusing mismatched slide sequence or narration revision")
    if float(m.get("duration_seconds", 0)) <= 0:
        raise ValueError("Refusing empty video")
    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    if not token or "/" not in repo:
        raise RuntimeError("Missing GitHub token/repository")
    stem = "aip-module-" + module + ("-part-" + part if part else "")
    media_prefix = "module-" + module + ("/part-" + part if part else "")
    info = {
        "status": "uploaded_pending_human_review",
        "module": module,
        "part": part,
        "script_revision": revision,
        "slides": slides,
        "duration_seconds": m["duration_seconds"],
        "created_utc": m.get("created_utc"),
        "video_url": ROOT + "/" + media_prefix + "/" + stem + ".mp4",
        "course_page": COURSE + "/visual/module-" + module + "#video-lectures",
    }
    content = (json.dumps(info, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    endpoint = "https://api.github.com/repos/" + repo + "/contents/content/video-releases/" + stem + ".json"
    for attempt in range(6):
        status, current = call(endpoint, token)
        if status == 200:
            if base64.b64decode(current.get("content", "")) == content:
                print("Release record already matches uploaded video.")
                return
        elif status != 404:
            time.sleep(min(2 ** attempt, 12))
            continue
        update = {
            "message": "Record uploaded AIP lecture " + stem,
            "branch": "main",
            "content": base64.b64encode(content).decode("ascii"),
        }
        if status == 200:
            update["sha"] = current["sha"]
        response_code, _ = call(endpoint, token, update)
        if response_code in (200, 201):
            print("Uploaded video release record committed to main: " + stem)
            return
        print("GitHub contents API retry after HTTP", response_code)
        time.sleep(min(2 ** attempt, 12))
    raise RuntimeError("Could not update release record after retries; MP4 may still exist in R2.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", required=True)
    publish(parser.parse_args().manifest)
