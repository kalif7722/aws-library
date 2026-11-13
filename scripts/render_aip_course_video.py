#!/usr/bin/env python3
"""Render an AIP-C01 narrated module from existing R2 WebP slides.

This script deliberately fails if any original slide is missing. It never substitutes
blank slides or recreates course visuals. The result is a review-only MP4 with
optional SRT captions, transcript, and embedded chapter markers.
"""
from __future__ import annotations

import argparse
import asyncio
import datetime as dt
import json
import re
import subprocess
import sys
from pathlib import Path

import requests
from PIL import Image

from aip_tts_reliability import synthesize_narration
from aip_media_tools import ffmpeg_exe, media_seconds


def run(*args: str) -> None:
    command = list(args)
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode:
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{result.stderr[-3500:]}")


def probe_seconds(path: Path) -> float:
    return media_seconds(path)

def download_slide(session: requests.Session, root: str, module: str,
                   number: int, folder: Path) -> tuple[Path, str]:
    filename = f"slide-{number:02}.webp"
    candidates = [
        f"module-{module}/{filename}",
        f"module-{module}/module-{module}/{filename}",
    ]
    errors = []
    for relative in candidates:
        url = f"{root.rstrip('/')}/{relative}"
        try:
            response = session.get(url, timeout=35)
            if response.status_code != 200:
                errors.append(f"{relative}: HTTP {response.status_code}")
                continue
            target = folder / filename
            target.write_bytes(response.content)
            with Image.open(target) as image:
                image.verify()
            with Image.open(target) as image:
                if image.width < 800 or image.height < 450:
                    raise ValueError(f"Slide too small: {image.size}")
            return target, url
        except (requests.RequestException, OSError, ValueError) as exc:
            errors.append(f"{relative}: {exc}")
    raise RuntimeError(f"Missing or invalid original slide {number:02}: " + "; ".join(errors))



def load_local_slide(module: str, number: int, local_dir: str,
                     folder: Path) -> tuple[Path, str]:
    """Use original checked-in source visuals, rather than an unrelated R2 module."""
    if module != "19":
        raise ValueError("Local slide mode is currently restricted to AIP Module 19")
    root = Path(__file__).resolve().parents[1]
    source_dir = (root / local_dir).resolve()
    expected_dir = (root / "public/course-visuals/genai-troubleshooting").resolve()
    if source_dir != expected_dir:
        raise ValueError("Module 19 original slide directory does not match approved local source")
    source = source_dir / f"module19-slide-{number:02}.webp"
    if not source.is_file():
        raise FileNotFoundError(f"Missing original local Module 19 slide: {source}")
    with Image.open(source) as img:
        img.verify()
    with Image.open(source) as img:
        if img.width < 800 or img.height < 450:
            raise ValueError(f"Invalid original Module 19 slide dimensions: {source} {img.size}")
    target = folder / f"slide-{number:02}.webp"
    import shutil
    shutil.copyfile(source, target)
    return target, source.as_uri()


def timecode(seconds: float) -> str:
    ms = max(0, round(seconds * 1000))
    hours, ms = divmod(ms, 3_600_000)
    minutes, ms = divmod(ms, 60_000)
    whole, fraction = divmod(ms, 1000)
    return f"{hours:02}:{minutes:02}:{whole:02},{fraction:03}"


def srt_entries(text: str, start: float, speech_seconds: float) -> list[tuple[float, float, str]]:
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s.strip()]
    if not sentences:
        return []
    weights = [max(1, len(re.findall(r"\b[\w'-]+\b", line))) for line in sentences]
    total = sum(weights)
    entries = []
    elapsed = start
    for line, weight in zip(sentences, weights):
        duration = speech_seconds * weight / total
        entries.append((elapsed, elapsed + duration, line))
        elapsed += duration
    return entries


def render_clip(image: Path, audio: Path, output: Path, duration: float,
                width: int, height: int, fps: int) -> None:
    video_filter = (
        f"scale={width}:{height}:force_original_aspect_ratio=decrease,"
        f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=0x111827,"
        f"setsar=1,fps={fps},format=yuv420p"
    )
    run(
        ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
        "-loop", "1", "-framerate", str(fps), "-i", str(image),
        "-i", str(audio),
        "-vf", video_filter, "-af", "apad=pad_dur=1.5",
        "-t", f"{duration:.3f}",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-r", str(fps),
        "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
        str(output),
    )


async def build(manifest_path: Path, destination: Path, width: int, height: int,
                fps: int, voice_override: str | None) -> None:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    scenes = manifest["scenes"]
    if not scenes:
        raise ValueError("At least one scene is required")
    first_slide = scenes[0]["slide"]
    if [s["slide"] for s in scenes] != list(range(first_slide, first_slide + len(scenes))):
        raise ValueError("Scenes must cover consecutive slides in a single topic part")
    if len(scenes) != 12 and manifest["module_id"] == "00":
        raise ValueError("AIP module 00 has 12 verified original slides")
    destination.mkdir(parents=True, exist_ok=True)
    scratch = destination / "_work"
    images = scratch / "images"
    audio = scratch / "audio"
    clips = scratch / "clips"
    for folder in (images, audio, clips):
        folder.mkdir(parents=True, exist_ok=True)

    session = requests.Session()
    session.headers.update({"User-Agent": "aws-visual-course-lecture-builder/1.0"})
    downloaded = []
    print(f"Verifying {len(scenes)} original slide images...", flush=True)
    # Check ALL slide assets before beginning voice synthesis.
    for scene in scenes:
        index = scene["slide"]
        if manifest.get("slide_local_dir"):
            file, url = load_local_slide(manifest["module_id"], index, manifest["slide_local_dir"], images)
        else:
            file, url = download_slide(session, manifest["slide_base"], manifest["module_id"], index, images)
        downloaded.append((file, url))
        print(f"  Slide {index:02}: verified", flush=True)

    voice = voice_override or manifest.get("voice", "en-US-AndrewNeural")
    rate = manifest.get("speech_rate", "-3%")
    segments = []
    captions = []
    current_time = 0.0
    output_prefix = f"aip-module-{manifest['module_id']}"
    if manifest.get("part_id"):
        output_prefix += "-part-" + str(manifest["part_id"])
    for scene, (picture, origin) in zip(scenes, downloaded):
        number = scene["slide"]
        print(f"Rendering narrated slide {number:02}/{len(scenes)}...", flush=True)
        audio_path = audio / f"audio-{number:02}.mp3"
        await synthesize_narration(scene["narration"], voice, rate, audio_path)
        speech_duration = probe_seconds(audio_path)
        duration = speech_duration + 0.85
        clip_path = clips / f"clip-{number:02}.mp4"
        render_clip(picture, audio_path, clip_path, duration, width, height, fps)
        captions.extend(srt_entries(scene["narration"], current_time + 0.05, speech_duration))
        segments.append({
            "slide": number, "title": scene["title"], "original_image": origin,
            "start_seconds": round(current_time, 3),
            "speech_seconds": round(speech_duration, 3),
            "duration_seconds": round(duration, 3),
            "video_clip": clip_path.name,
        })
        current_time += duration

    list_path = scratch / "clips.txt"
    list_path.write_text(
        "".join("file '" + str((clips / ("clip-%02d.mp4" % s["slide"])).resolve()) + "'\n" for s in segments),
        encoding="utf-8",
    )
    concatenated = scratch / "combined.mp4"
    run(ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
        "-f", "concat", "-safe", "0", "-i", str(list_path),
        "-c", "copy", str(concatenated))

    chapter_path = scratch / "chapters.ffmeta"
    chapter_rows = [";FFMETADATA1", f"title={manifest['course']} — {manifest['module_title']}"]
    for index, item in enumerate(segments):
        chapter_rows += [
            "[CHAPTER]", "TIMEBASE=1/1000",
            f"START={round(item['start_seconds'] * 1000)}",
            f"END={round((item['start_seconds'] + item['duration_seconds']) * 1000)}",
            "title=" + item["title"].replace("=", "-").replace(";", ","),
        ]
    chapter_path.write_text("\n".join(chapter_rows) + "\n", encoding="utf-8")
    mp4 = destination / f"{output_prefix}.mp4"
    run(ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(concatenated), "-f", "ffmetadata", "-i", str(chapter_path),
        "-map", "0:v:0", "-map", "0:a:0", "-map_metadata", "1",
        "-map_chapters", "1", "-c", "copy", "-movflags", "+faststart", str(mp4))

    subtitles = destination / f"{output_prefix}.srt"
    subtitles.write_text(
        "".join(
            f"{i}\n{timecode(start)} --> {timecode(end)}\n{text}\n\n"
            for i, (start, end, text) in enumerate(captions, 1)
        ),
        encoding="utf-8",
    )
    vtt = destination / f"{output_prefix}.vtt"
    vtt.write_text(
        "WEBVTT\n\n" + "".join(
            f"{i}\n{timecode(start).replace(',', '.')} --> {timecode(end).replace(',', '.')}\n{text}\n\n"
            for i, (start, end, text) in enumerate(captions, 1)
        ),
        encoding="utf-8",
    )
    transcript = destination / f"{output_prefix}-transcript.txt"
    transcript.write_text(
        "\n\n".join(f"SLIDE {s['slide']:02} — {s['title']}\n\n{s['narration']}" for s in scenes) + "\n",
        encoding="utf-8",
    )
    report = {
        "course": manifest["course"],
        "module": manifest["module_id"],
        "part": manifest.get("part_id"),
        "status": "rendered_preview_pending_human_qa",
        "script_revision": manifest.get("script_revision", "unversioned"),
        "voice": voice,
        "speech_rate": rate,
        "resolution": f"{width}x{height}",
        "slides": len(segments),
        "duration_seconds": round(current_time, 1),
        "created_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
        "video_filename": mp4.name,
        "captions_filename": subtitles.name,
        "webvtt_filename": vtt.name,
        "scenes": segments,
    }
    (destination / f"{output_prefix}-manifest.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"PREVIEW READY: {mp4} ({current_time / 60:.1f} minutes)", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=Path("content/video-narration/aip-module-00.json"))
    parser.add_argument("--output", type=Path, default=Path("video-output"))
    parser.add_argument("--width", type=int, default=1920)
    parser.add_argument("--height", type=int, default=1080)
    parser.add_argument("--fps", type=int, default=24)
    parser.add_argument("--voice", type=str, default=None)
    args = parser.parse_args()
    try:
        asyncio.run(build(args.manifest, args.output, args.width, args.height, args.fps, args.voice))
    except Exception as exc:
        print(f"VIDEO RENDER FAILED: {exc}", file=sys.stderr, flush=True)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
