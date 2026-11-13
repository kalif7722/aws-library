#!/usr/bin/env python3
"""Prepare an AIP module's *actual R2 images* for visual-first video scripting.

The source images are never replaced. The generated JPEGs are review-only copies
with slide numbers; mapped titles are explicitly advisory until visually verified.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont, ImageOps

BASE = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals"
REPOSITORY_MAP = Path("app/courses/aws-generative-ai-developer-professional/visual-lesson-map.json")


def font(size: int):
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size)
    except OSError:
        return ImageFont.load_default()


def get_image(session: requests.Session, module: str, number: int):
    name = f"slide-{number:02}.webp"
    paths = (
        f"module-{module}/{name}",
        f"module-{module}/module-{module}/{name}",
        f"module-{module}/slide-{number:02}.png",
        f"module-{module}/slide-{number:02}.jpg",
        f"module-{module}/slide-{number:03}.webp",
        f"module-{module}/slide-{number}.webp",
    )
    errors = []
    for path in paths:
        try:
            response = session.get(f"{BASE}/{path}", timeout=30)
            if response.status_code != 200:
                errors.append(f"{path}: HTTP {response.status_code}")
                continue
            with Image.open(io.BytesIO(response.content)) as im:
                image = im.convert("RGB")
            if image.width < 800 or image.height < 450:
                errors.append(f"{path}: too small ({image.width}x{image.height})")
                continue
            return image, response.content, path
        except Exception as exc:
            details = ""
            if "response" in locals() and response is not None:
                details = f" (status {response.status_code}; type {response.headers.get('content-type')}; length {len(response.content)}; first bytes {response.content[:12]!r})"
            errors.append(f"{path}: {exc}{details}")
    return None, b"", "; ".join(errors)


def with_header(image: Image.Image, number: int, title: str) -> Image.Image:
    canvas = Image.new("RGB", (1600, 955), "#0d1d35")
    fit = ImageOps.contain(image, (1600, 900), Image.Resampling.LANCZOS)
    canvas.paste(fit, ((1600 - fit.width) // 2, 55 + (900 - fit.height) // 2))
    draw = ImageDraw.Draw(canvas)
    draw.text((16, 13), f"ACTUAL SLIDE {number:02} — MAP LABEL ONLY (VERIFY VISUALLY): {title[:95]}",
              font=font(22), fill="#ffffff")
    return canvas


def contact_sheet(images: list[tuple[int, Image.Image]], filename: Path) -> None:
    if not images:
        return
    columns = 3
    tile_w, tile_h = 700, 419
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * tile_w, rows * tile_h), "#13243e")
    for index, (_, image) in enumerate(images):
        thumbnail = image.copy()
        thumbnail.thumbnail((tile_w, tile_h), Image.Resampling.LANCZOS)
        x = (index % columns) * tile_w
        y = (index // columns) * tile_h
        sheet.paste(thumbnail, (x, y))
    sheet.save(filename, "JPEG", quality=84, optimize=True)


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--module", default="01")
    p.add_argument("--part", action="append", required=True, help="PART:START-END, e.g. 01:1-9")
    p.add_argument("--out", type=Path, default=Path("docs/video-review/aip/module-01"))
    args = p.parse_args()
    mapped = json.loads(REPOSITORY_MAP.read_text(encoding="utf-8"))
    lessons = mapped["lessonsByModule"].get(args.module, [])
    args.out.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": "aip-video-review-image-audit/1.0"})
    report = {"module": args.module, "source": BASE, "parts": [], "missing": [], "duplicate_sha256": []}
    seen = {}
    for spec in args.part:
        label, segment = spec.split(":", 1)
        a, b = (int(x) for x in segment.split("-", 1))
        if a < 1 or b < a:
            raise ValueError("Invalid range: " + spec)
        contact_images = []
        part = {"part": label, "range": [a, b], "slides": []}
        for i in range(a, b + 1):
            title = lessons[i - 1]["title"] if i <= len(lessons) else "unmapped"
            image, data, source = get_image(session, args.module, i)
            if image is None:
                report["missing"].append({"slide": i, "error": source})
                part["slides"].append({"slide": i, "available": False, "title_from_map_not_verified": title})
                print(f"Slide {i:02}: MISSING — {source}", flush=True)
                continue
            digest = hashlib.sha256(data).hexdigest()
            if digest in seen:
                report["duplicate_sha256"].append({"slide": i, "same_as": seen[digest]})
            seen[digest] = i
            annotated = with_header(image, i, title)
            annotated.save(args.out / f"slide-{i:02}.jpg", "JPEG", quality=82, optimize=True)
            contact_images.append((i, annotated))
            part["slides"].append({
                "slide": i, "available": True,
                "title_from_map_not_verified": title, "r2_key": source,
                "width": image.width, "height": image.height,
                "sha256": digest, "review_file": f"slide-{i:02}.jpg",
            })
            print(f"Slide {i:02}: downloaded and reviewed image staged", flush=True)
        contact_sheet(contact_images, args.out / f"part-{label}-contact.jpg")
        report["parts"].append(part)
    (args.out / "inventory.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"Completed review preparation: {len(report['missing'])} missing images", flush=True)


if __name__ == "__main__":
    main()
