#!/usr/bin/env python3
"""Audit local Module 19 troubleshooting images and compare to the lesson map."""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--output",default="docs/video-review/aip/module-19/local-visual-audit.json")
    a=p.parse_args()
    root=Path(__file__).resolve().parents[1]
    labs=json.loads((root/"app/components/genai-labs/map.json").read_text())
    assert len(labs)==12, f"Expected 12 labs, found {len(labs)}"
    entries=[]; n=0
    for lab in labs:
        numbers=[s["slide"] for s in lab["steps"]]
        assert numbers==list(range(lab["start"],lab["end"]+1)),f"Non-contiguous lab {lab['id']}"
        for step in lab["steps"]:
            n+=1
            assert step["slide"]==n,f"Non-contiguous global slide {n}"
            assert step["src"]==f"/course-visuals/genai-troubleshooting/module19-slide-{n:02}.webp",f"Unexpected source {step['src']}"
            file=root/"public"/step["src"].lstrip("/")
            item={"slide":n,"lab":lab["id"],"lab_title":lab["title"],"step_title":step["title"],"path":str(file.relative_to(root)),"status":"missing"}
            if file.is_file():
                try:
                    with Image.open(file) as im:
                        im.verify()
                    with Image.open(file) as im:
                        item["dimensions"]=list(im.size)
                    item["bytes"]=file.stat().st_size
                    item["sha256"]=hashlib.sha256(file.read_bytes()).hexdigest()
                    item["status"]="ok" if item["dimensions"][0]>=800 and item["dimensions"][1]>=450 else "invalid_dimensions"
                except Exception as e:
                    item["status"]="invalid_image"
                    item["error"]=str(e)
            entries.append(item)
    assert n==74, f"Expected 74 original visuals, found {n}"
    out={"module":"19","source":"repository public/course-visuals/genai-troubleshooting","labs":len(labs),"mapped_slides":n,"verified_slides":sum(x["status"]=="ok" for x in entries),"slides":entries}
    dest=root/a.output;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(json.dumps(out,indent=2)+"\n")
    print(json.dumps({"mapped":n,"verified":out["verified_slides"],"failed":[{"slide":x["slide"],"status":x["status"]} for x in entries if x["status"]!="ok"]},indent=2))
    assert out["verified_slides"]==74,"Module 19 images missing or invalid; block audio synthesis"

if __name__=="__main__":
    main()
