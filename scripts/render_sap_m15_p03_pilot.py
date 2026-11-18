#!/usr/bin/env python3
"""Review-only, original-artwork SAP M15 P03 pilot. No publishing paths."""
import asyncio, hashlib, json, math, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw
sys.path.insert(0,str(Path("scripts").resolve()))
from aip_tts_reliability import synthesize_narration
O=Path("video-output/sap-m15-p03-pilot");O.mkdir(parents=True,exist_ok=True)
A=Path(".cache/sap-m15-p03-pilot");A.mkdir(parents=True,exist_ok=True)
source=Path("public/course-visuals/sap-c03/module-15/slide-07.webp")
audit=json.loads(Path("docs/sap-c03/module-15-asset-manifest.json").read_text())
assert hashlib.sha256(source.read_bytes()).hexdigest()==next(x["sha256"] for x in audit if x["sequence"]==7)
im=Image.open(source).convert("RGB");assert im.size==(2048,1152)
# Each audio segment owns the visual state; reveal begins 0.5s before speech.
segments=[
("cache",[(40,246,1032,678)],"On the left, follow the viewer request into CloudFront. A usable cached object returns from the edge on the blue cache hit path. The yellow cache miss path needs the S3 origin. These worldwide edge copies improve read delivery; they are temporary caches, not a separately managed recovery bucket."),
("replication",[(1050,246,2012,678)],"Now look at the right-hand arrow. S3 replication copies objects asynchronously from the source bucket to selected destination buckets. The rule beneath the arrow chooses destinations and filters, and uses an IAM role with replication permissions. Unlike an edge cache, the destination is persistent S3 storage with its own storage charges."),
("updates",[(40,694,2010,747),(40,840,2010,889)],"Compare the update row. Changing an object at the origin does not immediately replace every cached copy. Cache policy and expiration control reuse, and invalidation can remove a cached version. S3 replication instead propagates eligible changes asynchronously. Neither path promises that every copy changes instantly."),
("placement",[(40,747,2010,840),(40,889,2010,988)],"The remaining rows separate location, configuration, and use case. CloudFront places cached content at edge locations for reads. Replication places stored copies in destination buckets. Replication for recovery still needs appropriate configuration and a tested recovery plan; a replica does not automatically route application traffic during an outage."),
("full",[],"With the complete slide visible, imagine a global photo service. CloudFront serves popular photos near viewers. S3 replication maintains another regional copy where required. Choose the cache for read performance, and configure replication separately for data placement or recovery. A workload can use both.")
]
def run(args):subprocess.run(args,check=True)
def seconds(p):return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)]))
async def speech():
 for name,rects,text in segments:
  key=hashlib.sha256(("en-US-AndrewNeural|-3%|"+text).encode()).hexdigest()[:16]
  await synthesize_narration(text,"en-US-AndrewNeural","-3%",A/(key+".mp3"))
asyncio.run(speech())
base=im.copy();dim=Image.blend(im,Image.new("RGB",im.size,(2,15,30)),.9)
for box in [(40,246,2012,988),(40,1012,2012,1112)]:base.paste(dim.crop(box),box[:2])
states=[];timeline=[];at=0;visible=[];audio=[]
for i,(name,rects,text) in enumerate(segments):
 key=hashlib.sha256(("en-US-AndrewNeural|-3%|"+text).encode()).hexdigest()[:16];voice=A/(key+".mp3");d=seconds(voice);length=math.ceil((d+1.2)*24)/24
 previous=base.copy()
 for b in visible:previous.paste(im.crop(b),b[:2])
 if name=="full":target=im.copy()
 else:
  visible+=rects;target=base.copy()
  for b in visible:target.paste(im.crop(b),b[:2])
  draw=ImageDraw.Draw(target)
  for b in rects:draw.rounded_rectangle(b,radius=10,outline=(255,194,66),width=3)
 target.resize((1280,720),Image.Resampling.LANCZOS).save(O/("qa-"+name+".png"))
 states.append((previous,target,length))
 wav=O/("audio-"+str(i)+".wav")
 run(["ffmpeg","-v","error","-y","-i",str(voice),"-af","adelay=500|500,apad","-t",str(length),"-ar","48000","-ac","2",str(wav)])
 audio.append(wav);timeline.append(dict(element=name,start=at,speech_start=at+.5,speech_duration=d,duration=length,text=text));at+=length
# Hold the exact original artwork for 4 additional seconds.
duration=at+4
video=O/"animation.mp4"
proc=subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s","2048x1152","-r","24","-i","pipe:0","-an","-c:v","libx264","-preset","fast","-crf","17","-pix_fmt","yuv420p",str(video)],stdin=subprocess.PIPE)
for previous,target,length in states:
 data=target.tobytes()
 for k in range(round(length*24)):
  proc.stdin.write(Image.blend(previous,target,k/10).tobytes() if k<10 else data)
for k in range(96):proc.stdin.write(im.tobytes())
proc.stdin.close();assert proc.wait()==0
(O/"audio-list.txt").write_text("".join("file '"+str(p.resolve())+"'\n" for p in audio))
final=O/"sap-module-15-part-03-animation-pilot.mp4"
run(["ffmpeg","-v","error","-y","-i",str(video),"-f","concat","-safe","0","-i",str(O/"audio-list.txt"),"-map","0:v","-map","1:a","-af","apad","-t",str(duration),"-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart",str(final)])
def stamp(t):
 m=round(t*1000);return f"{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02}.{m%1000:03}"
(O/"captions.vtt").write_text("WEBVTT\n\n"+"\n\n".join(str(i+1)+"\n"+stamp(x["speech_start"])+" --> "+stamp(x["speech_start"]+x["speech_duration"])+"\n"+x["text"] for i,x in enumerate(timeline))+"\n")
(O/"transcript.txt").write_text("\n\n".join(x["text"] for x in timeline))
# Decode all output, verify dimensions, duration, and final original hold.
run(["ffmpeg","-v","error","-i",str(final),"-f","null","-"])
run(["ffmpeg","-v","error","-y","-ss",str(duration-2),"-i",str(final),"-frames:v","1",str(O/"decoded-hold.png")])
import numpy as np
a=np.asarray(im).astype(float);b=np.asarray(Image.open(O/"decoded-hold.png").convert("RGB")).astype(float)
psnr=float(10*np.log10(255**2/((a-b)**2).mean()));assert psnr>35
assert abs(seconds(final)-duration)<.15
assert (O/"captions.vtt").read_text().count("-->")==len(segments)
report=dict(part_slides=[7,8,9],pilot_slides=[7],voice="en-US-AndrewNeural",rate="-3%",duration_seconds=seconds(final),resolution=[2048,1152],fps=24,render_environment="GitHub Actions ubuntu-latest",source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),video_sha256=hashlib.sha256(final.read_bytes()).hexdigest(),full_hold_psnr_db=psnr,decode_errors=0,gif_intermediate=False,published=False,timeline=timeline,limitations=["Focused one-slide pilot, not complete Part 03","Region-level original raster reveals, not editable vector layers","Captions timed per actual synthesized passage, not word-level alignment","Full listening review remains for user"])
(O/"review-report.json").write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
