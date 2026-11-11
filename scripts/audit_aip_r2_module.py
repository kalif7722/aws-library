#!/usr/bin/env python3
"""Audit real Cloudflare R2 images, never infer published slide count from ZIP titles."""
from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import io
import json
from datetime import datetime, timezone
from pathlib import Path

import requests
from PIL import Image

ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals"


def inspect(module: str, number: int) -> dict:
    url=f"{ROOT}/module-{module}/slide-{number:02d}.webp"
    result={"slide":number,"url":url,"available":False}
    try:
        response=requests.get(url,timeout=28,headers={"User-Agent":"aip-course-slide-audit/1.0"})
        result["http_status"]=response.status_code
        if not response.ok:
            result["error"]=f"HTTP {response.status_code}"
            return result
        content=response.content
        if len(content)<2000:
            raise ValueError("Empty or invalid image: "+str(len(content))+" bytes")
        with Image.open(io.BytesIO(content)) as image:
            image.verify()
        with Image.open(io.BytesIO(content)) as image:
            result["dimensions"]=list(image.size)
            if image.width<800 or image.height<450:
                raise ValueError("Image dimensions too small")
        result["available"]=True
        result["size_bytes"]=len(content)
        result["sha256"]=hashlib.sha256(content).hexdigest()
    except (requests.RequestException,OSError,ValueError) as exc:
        result["error"]=str(exc)
    return result


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--module",required=True)
    parser.add_argument("--mapped-count",type=int,required=True)
    parser.add_argument("--up-to",type=int,default=160)
    parser.add_argument("--output",type=Path,default=Path("video-review/aip/module-02-r2-inventory.json"))
    args=parser.parse_args()
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        checked=sorted(pool.map(lambda i: inspect(args.module,i),range(1,args.up_to+1)),key=lambda x:x["slide"])
    available=[a["slide"] for a in checked if a["available"]]
    missing=[a["slide"] for a in checked if not a["available"] and a["slide"]<=args.mapped_count]
    extra=[a["slide"] for a in checked if a["available"] and a["slide"]>args.mapped_count]
    hashes={}
    dup=[]
    for item in checked:
        if not item["available"]: continue
        sha=item["sha256"]
        if sha in hashes:dup.append([hashes[sha],item["slide"]])
        hashes[sha]=item["slide"]
    report={
      "module":args.module,
      "created_utc":datetime.now(timezone.utc).isoformat(),
      "mapped_lessons":args.mapped_count,
      "probed_through_slide":args.up_to,
      "available_count":len(available),
      "available_slides":available,
      "missing_mapped_slides":missing,
      "available_beyond_map":extra,
      "duplicate_hashes":dup,
      "items":checked,
    }
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({key:report[key] for key in
        ("mapped_lessons","available_count","missing_mapped_slides","available_beyond_map","duplicate_hashes")},indent=2))


if __name__=="__main__":
    main()
