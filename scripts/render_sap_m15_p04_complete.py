#!/usr/bin/env python3
"""Complete review-only Part 04 with content-timed original artwork reveals."""
from pathlib import Path
import asyncio,hashlib,json,math,subprocess,sys,re
import numpy as np
from PIL import Image,ImageDraw
sys.path.insert(0,str(Path("scripts").resolve()))
from aip_tts_reliability import synthesize_narration
O=Path("video-output/sap-m15-p04-complete");O.mkdir(parents=True,exist_ok=True)
A=Path(".cache/sap-m15-p04");A.mkdir(parents=True,exist_ok=True)
S=json.loads(r'''{"10":[["primary",[[38,355,1280,428],[62,428,1238,606],[65,540,648,768],[1290,355,2012,535]],"Follow the viewer's GET request into CloudFront. When the object cannot be served from cache, CloudFront sends an origin request to the primary origin. The first timeline row shows that normal starting point. An origin group has an ordered primary and secondary; it is not a weighted choice between equal backends."],["secondary",[[650,606,1240,771],[211,635,459,733],[1290,535,2012,830]],"The primary now returns a qualifying error or fails to connect within the configured limits. Follow the blue failover arrow to the secondary origin. If the secondary returns the object, CloudFront can send that response to the viewer and cache it according to the cache policy. The timeline describes this request, not a permanent change of primary."],["contract",[[1244,116,2012,340]],"Read the configuration panel before relying on this behavior. Choose the supported error status codes that should trigger failover, and configure connection attempts and timeouts. Origin failover is limited to GET, HEAD, and OPTIONS requests. The slide's OPTIONS note also calls attention to how that method is configured in the cache behavior; do not generalize this mechanism to all HTTP methods."],["writes",[[38,800,2012,1030]],"The lower red example is a POST upload. A failed primary does not cause this origin-group mechanism to replay that POST, or a PUT, against the secondary. State-changing application operations need their own consistency, retry, and transaction design. Retrying a purchase blindly could create duplicate work."],["full",[],"With the complete sequence visible, keep the contract precise: a qualifying read reaches the primary first and may be retried at the secondary. A later origin request can try the primary again. This is per-request origin failover, not continuous health-check promotion of a Region. Make sure the secondary has usable content before counting on the path."]],"11":[["geo",[[30,258,305,595],[305,248,1046,752],[1162,238,1514,471]],"Start with the country markers and the GeoIP check. CloudFront determines the viewer's country from the request's IP location and evaluates the distribution's geographic restriction. The map uses example allowed and blocked countries; it does not prescribe a universal country policy."],["allowed",[[990,479,1434,709],[1434,338,2025,665]],"Follow the green allowed-request path to CloudFront. Once the country check permits the request, a cache hit can be served from the edge. On the blue cache miss path, CloudFront fetches from the configured origin. Country eligibility does not remove the normal cache and origin decisions."],["blocked",[[1020,593,1285,680],[1425,639,1883,791]],"Now follow the red blocked path. CloudFront can reject a request because of the country restriction and return HTTP 403. The restriction applies before delivery from the cache or origin. A cached object does not let a blocked viewer bypass this check."],["lists",[[28,792,1057,1042]],"Compare the two settings rows as alternative configurations. An allowlist permits the countries listed and blocks the rest. A blocklist denies the listed countries and permits the rest. The example codes in this table illustrate those two choices; they are not a single combined rule matching every marker on the map."],["full",[],"The complete slide separates geographic policy from user entitlement. IP geolocation is a country estimate, not proof of a person's identity, residence, or subscription. A paying-content service can combine country restrictions with login, authorization, and its licensing logic. Country eligibility alone does not establish permission to view every object."]],"12":[["path",[[22,284,696,1057]],"Start with the architecture on the left. Viewers resolve the distribution name and reach CloudFront. A cache hit is delivered at the edge; a miss follows the origin path. The DNS service shown is an example, and the cache controls are separate from price class. Price class mainly changes the set of serving edge locations used for delivery."],["all",[[707,284,1502,610],[1515,284,2028,582]],"The top comparison row is Price Class All. Its conceptual map represents the broadest edge footprint. This can keep delivery closer to more viewers, but actual performance and cost depend on their location and traffic. Treat the illustration as a coverage concept, not an exact map of today's edge sites or a latency guarantee."],["twohundred",[[707,610,1502,830],[1515,582,2028,800]],"Move to Price Class 200. It uses a selected geographic set rather than every price-class location. Compare the changed map with the viewer markers. Restricting the serving footprint may reduce eligible delivery rates, while some viewers may be served from farther away. Evaluate the actual audience instead of assuming the middle option is automatically best."],["onehundred",[[707,830,1502,1057],[1515,800,2028,1057]],"The bottom row is Price Class 100, the most restricted of these three choices. It may fit an audience concentrated in its included geographies. It is not a country access restriction: viewers elsewhere are not automatically denied. They may instead see different routing or latency because of the smaller serving footprint."],["full",[],"With all three options visible, estimate traffic by viewer geography, request count, and bytes delivered. Compare current rates and any pricing agreement, then test performance for the actual audience. The slide's cost labels describe a general trade-off, not a guaranteed lowest total bill. Keep geographic access rules, caching behavior, and delivery price class as separate design decisions."]]}''')
S={int(k):v for k,v in S.items()}
audit=json.loads(Path("docs/sap-c03/module-15-asset-manifest.json").read_text())
def run(a):subprocess.run(a,check=True)
def seconds(p):return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)]))
def voicepath(text):return A/(hashlib.sha256(("en-US-AndrewNeural|-3%|"+text).encode()).hexdigest()[:16]+".mp3")
async def voices():
 for n,ss in S.items():
  for _,_,text in ss:await synthesize_narration(text,"en-US-AndrewNeural","-3%",voicepath(text))
asyncio.run(voices())
clips=[];chapters=[];offset=0
allcaptions="WEBVTT\n\n";nextcue=1;report=[]
transcript=""
def stamp(t):
 m=round(t*1000);return f"{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02}.{m%1000:03}"
for n,ss in S.items():
 src=Path(f"public/course-visuals/sap-c03/module-15/slide-{n:02}.webp")
 assert hashlib.sha256(src.read_bytes()).hexdigest()==next(x["sha256"] for x in audit if x["sequence"]==n)
 im=Image.open(src).convert("RGB");assert im.size==(2048,1152)
 base=im.copy();dim=Image.blend(im,Image.new("RGB",im.size,(2,15,30)),.9)
 boxes={10:[(38,355,2012,1030),(1244,116,2012,340),(38,1042,2012,1127)],11:[(28,238,2025,1042),(28,1057,2025,1133)],12:[(22,284,2028,1057),(22,1069,2028,1143)]}[n]
 for b in boxes:base.paste(dim.crop(b),b[:2])
 states=[];at=0;visible=[];audio=[];timeline=[]
 for i,(name,rects,text) in enumerate(ss):
  d=seconds(voicepath(text));length=math.ceil((d+1.2)*24)/24
  previous=base.copy()
  for b in visible:previous.paste(im.crop(b),b[:2])
  if name=="full":target=im.copy()
  else:
   visible+=rects;target=base.copy()
   for b in visible:target.paste(im.crop(b),b[:2])
   draw=ImageDraw.Draw(target)
   for b in rects:draw.rounded_rectangle(b,radius=10,outline=(255,194,66),width=3)
  target.resize((1280,720),Image.Resampling.LANCZOS).save(O/f"qa-{n}-{name}.png")
  states.append((previous,target,length));wav=O/f"audio-{n}-{i}.wav"
  run(["ffmpeg","-v","error","-y","-i",str(voicepath(text)),"-af","adelay=500|500,apad","-t",str(length),"-ar","48000","-ac","2",str(wav)])
  audio.append(wav);timeline.append(dict(element=name,start=offset+at,speech_start=offset+at+.5,speech_duration=d,text=text))
  allcaptions+=f"{nextcue}\n{stamp(offset+at+.5)} --> {stamp(offset+at+.5+d)}\n{text}\n\n";nextcue+=1;at+=length
 duration=at+4;animation=O/f"animation-{n}.mp4"
 proc=subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s","2048x1152","-r","24","-i","pipe:0","-an","-c:v","libx264","-preset","fast","-crf","17","-pix_fmt","yuv420p",str(animation)],stdin=subprocess.PIPE)
 for previous,target,length in states:
  data=target.tobytes()
  for k in range(round(length*24)):proc.stdin.write(Image.blend(previous,target,k/10).tobytes() if k<10 else data)
 for k in range(96):proc.stdin.write(im.tobytes())
 proc.stdin.close();assert proc.wait()==0
 alist=O/f"audio-list-{n}.txt";alist.write_text("".join("file '"+str(p.resolve())+"'\n" for p in audio));clip=O/f"scene-{n}.mp4"
 run(["ffmpeg","-v","error","-y","-i",str(animation),"-f","concat","-safe","0","-i",str(alist),"-map","0:v","-map","1:a","-af","apad","-t",str(duration),"-c:v","copy","-c:a","aac","-b:a","192k",str(clip)])
 clips.append(clip);chapters.append(dict(slide=n,start=offset,duration=seconds(clip),reused=False));offset+=seconds(clip);report+=timeline;transcript+="\n\nSlide "+str(n)+"\n"+"\n".join(x[2] for x in ss)
lst=O/"clips.txt";lst.write_text("".join("file '"+str(p.resolve())+"'\n" for p in clips))
final=O/"SAP-Module-15-Part-04-AndrewUS-Complete.mp4"
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",str(lst),"-c","copy","-movflags","+faststart",str(final)])
(O/"captions.vtt").write_text(allcaptions);(O/"transcript.txt").write_text(transcript)
# Validate actual assembled output, including every original slide hold.
run(["ffmpeg","-v","error","-i",str(final),"-f","null","-"])
holds=[]
for c in chapters:
 n=c["slide"];target=O/f"decoded-hold-{n}.png"
 run(["ffmpeg","-v","error","-y","-ss",str(c["start"]+c["duration"]-2),"-i",str(final),"-frames:v","1",str(target)])
 im=Image.open(f"public/course-visuals/sap-c03/module-15/slide-{n:02}.webp").convert("RGB")
 a=np.asarray(im).astype(float);b=np.asarray(Image.open(target).convert("RGB")).astype(float)
 psnr=float(10*np.log10(255**2/((a-b)**2).mean()));assert psnr>35;holds.append(dict(slide=n,psnr_db=psnr))
assert abs(seconds(final)-offset)<.2
assert allcaptions.count("-->")==15
out=dict(slides=[10,11,12],duration_seconds=seconds(final),resolution=[2048,1152],fps=24,voice="en-US-AndrewNeural",rate="-3%",render_environment="GitHub Actions",chapters=chapters,new_segments=report,captions=15,decode_errors=0,hold_fidelity=holds,published=False,sha256=hashlib.sha256(final.read_bytes()).hexdigest(),limitations=["Original raster region reveals, not vector layers","Caption intervals use actual phrase durations, not word-level alignment","Human listening review remains"])
(O/"review-report.json").write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
