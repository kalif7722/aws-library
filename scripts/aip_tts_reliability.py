#!/usr/bin/env python3
"""Resilient, cached neural-voice narration for the AWS visual lecture renderer.

Keeps the approved Edge neural voice, but divides each slide into short,
sentence-aware requests. Completed chunks survive interrupted syntheses.
Never substitutes silent audio or a different voice for a failed request.
"""
from __future__ import annotations

import asyncio
import os
import re
import subprocess
from pathlib import Path

import edge_tts

MAX_CHARS = 420
MAX_ATTEMPTS = 6


def chunks_for(text: str, max_chars: int = MAX_CHARS) -> list[str]:
    """Split at sentence boundaries where possible, preserving every word."""
    if not text or not text.strip():
        raise ValueError("Narration text is empty")
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    units: list[str] = []
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
        if len(sentence) <= max_chars:
            units.append(sentence)
            continue
        # Very long sentences are split on whitespace, never by truncation.
        group = ""
        for word in sentence.split():
            if len(word) > max_chars:
                raise ValueError("One narration token is longer than the TTS limit")
            candidate = (group + " " + word).strip()
            if group and len(candidate) > max_chars:
                units.append(group)
                group = word
            else:
                group = candidate
        if group:
            units.append(group)

    groups: list[str] = []
    current = ""
    for unit in units:
        candidate = (current + " " + unit).strip()
        if current and len(candidate) > max_chars:
            groups.append(current)
            current = unit
        else:
            current = candidate
    if current:
        groups.append(current)
    if not groups or any(len(s) > max_chars for s in groups):
        raise ValueError("TTS chunker could not preserve the narration safely")
    return groups


def valid_mp3(path: Path, min_seconds: float = 0.3) -> bool:
    if not path.is_file() or path.stat().st_size < 1500:
        return False
    try:
        result = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1", str(path),
            ],
            capture_output=True, text=True, timeout=15, check=False,
        )
        return result.returncode == 0 and float(result.stdout.strip()) >= min_seconds
    except (ValueError, OSError, subprocess.TimeoutExpired):
        return False


async def synthesize_narration(text: str, voice: str, rate: str, target: Path) -> None:
    """Produce full slide audio using the same chosen voice, with resumable chunks."""
    target.parent.mkdir(parents=True, exist_ok=True)
    whole_minimum = max(1.0, len(text.split()) / 6.5)
    if valid_mp3(target, whole_minimum):
        print(f"  Reusing complete cached narration: {target.name}", flush=True)
        return

    pieces = chunks_for(text)
    print(
        f"  Speech: {len(text)} characters in {len(pieces)} short chunks "
        f"(voice={voice}, rate={rate})", flush=True,
    )
    chunk_paths: list[Path] = []
    for index, piece in enumerate(pieces, start=1):
        chunk_path = target.with_name(f"{target.stem}-chunk-{index:02}.mp3")
        chunk_paths.append(chunk_path)
        minimum = max(0.5, len(piece.split()) / 6.5)
        if valid_mp3(chunk_path, minimum):
            print(f"  Chunk {index}/{len(pieces)}: cached", flush=True)
            continue

        last_error: Exception | None = None
        for attempt in range(1, MAX_ATTEMPTS + 1):
            chunk_path.unlink(missing_ok=True)
            try:
                await asyncio.wait_for(
                    edge_tts.Communicate(text=piece, voice=voice, rate=rate)
                    .save(str(chunk_path)), timeout=110,
                )
                if not valid_mp3(chunk_path, minimum):
                    raise RuntimeError("TTS response contained no valid playable audio")
                print(
                    f"  Chunk {index}/{len(pieces)}: voice generated "
                    f"(attempt {attempt})", flush=True,
                )
                last_error = None
                break
            except Exception as exc:
                last_error = exc
                chunk_path.unlink(missing_ok=True)
                print(
                    f"  Chunk {index}/{len(pieces)}, attempt "
                    f"{attempt}/{MAX_ATTEMPTS}: {type(exc).__name__}: {exc}",
                    flush=True,
                )
                if attempt < MAX_ATTEMPTS:
                    await asyncio.sleep(min(3 * 2 ** (attempt - 1), 40))
        if last_error is not None:
            raise RuntimeError(
                f"Speech service failed after {MAX_ATTEMPTS} attempts "
                f"on chunk {index}/{len(pieces)} of {target.name}; "
                "completed chunks remain cached for a retry"
            ) from last_error
        # Space calls to avoid hammering the service; not a change to speech rate.
        await asyncio.sleep(0.7)

    if not all(valid_mp3(path, max(0.5, len(piece.split()) / 6.5)) for path, piece in zip(chunk_paths, pieces)):
        raise RuntimeError("Audio assembly blocked: a chunk is missing")

    if len(chunk_paths) == 1:
        # Preserve a single audio segment exactly without re-encoding.
        os.replace(chunk_paths[0], target)
    else:
        concat_list = target.with_name(f"{target.stem}-chunks.txt")
        # Generated files have safe names and reside in a controlled folder.
        concat_list.write_text(
            "".join(f"file '{p.resolve()}'\n" for p in chunk_paths),
            encoding="utf-8",
        )
        candidate = target.with_name(f"{target.stem}-joined.mp3")
        result = subprocess.run(
            [
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-f", "concat", "-safe", "0", "-i", str(concat_list),
                "-c:a", "libmp3lame", "-b:a", "160k", str(candidate),
            ],
            capture_output=True, text=True, timeout=180, check=False,
        )
        if result.returncode or not valid_mp3(candidate, whole_minimum):
            raise RuntimeError(
                "Could not assemble short speech chunks into one MP3: "
                + result.stderr[-1600:]
            )
        os.replace(candidate, target)
    if not valid_mp3(target, whole_minimum):
        raise RuntimeError(f"Final audio is invalid: {target}")
    print(f"  Complete slide narration ready: {target.name}", flush=True)
