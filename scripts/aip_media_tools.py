#!/usr/bin/env python3
"""Portable media helpers for AWS course videos.

Python wheels supply the FFmpeg executable and read media duration metadata.
No apt, system FFmpeg, or separate ffprobe binary is required.
"""
from __future__ import annotations

import math
from pathlib import Path

from imageio_ffmpeg import get_ffmpeg_exe
from mutagen import File as open_media


def ffmpeg_exe() -> str:
    """Return FFmpeg bundled in the imageio-ffmpeg wheel."""
    binary = Path(get_ffmpeg_exe())
    if not binary.is_file():
        raise RuntimeError(f"Bundled FFmpeg not available: {binary}")
    return str(binary)


def media_seconds(path: str | Path) -> float:
    """Return verified duration for an MP3, MP4, or other Mutagen-supported media."""
    source = Path(path)
    if not source.is_file() or source.stat().st_size < 1500:
        raise ValueError(f"Media file is missing or empty: {source}")
    info = open_media(source)
    duration = getattr(getattr(info, "info", None), "length", None)
    if duration is None or not math.isfinite(float(duration)) or duration <= 0:
        raise ValueError(f"Unable to read a valid duration from {source}")
    return float(duration)
