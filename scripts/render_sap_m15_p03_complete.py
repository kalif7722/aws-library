#!/usr/bin/env python3
"""Complete review-only Part 03; reuse approved Actions slide 7 artifact."""
from pathlib import Path
import asyncio,hashlib,json,math,subprocess,sys,re
import numpy as np
from PIL import Image,ImageDraw
sys.path.insert(0,str(Path("scripts").resolve()))
from aip_tts_reliability import synthesize_narration
O=Path("video-output/sap-m15-p03-complete");O.mkdir(parents=True,exist_ok=True)
P=Path("video-output/approved-slide7");A=Path(".cache/sap-m15-p03-pilot");A.mkdir(parents=True,exist_ok=True)
pilot=P/"sap-module-15-part-03-animation-pilot.mp4";prior=json.loads((P/"review-report.json").read_text())
assert hashlib.sha256(pilot.read_bytes()).hexdigest()==prior["video_sha256"]
S={
8:[
("public",[(20,238,1018,760)],"Start with the left-hand public custom origin. Follow HTTPS from CloudFront to the internet-facing Application Load Balancer. The load balancer then forwards requests to EC2 targets in private subnets. Those targets can be private even though the origin endpoint is reachable over the internet."),
("vpc",[(1030,238,2028,760)],"Now compare the right-hand VPC origin. CloudFront uses an AWS-managed private connection to reach an eligible origin in private subnets. The examples shown are an internal Application Load Balancer, a supported Network Load Balancer, or a private EC2 instance. This is a separately configured origin mode, not the public path on the left."),
("public_rows",[(20,768,2028,888),(20,966,2028,1036)],"The public-origin rows include both an internet-facing load balancer and a public EC2 endpoint. In either case CloudFront must be able to reach that endpoint. Choose the origin hostname, HTTPS settings, certificate, and security controls together. Putting private targets behind a load balancer does not by itself restrict who can contact the load balancer."),
("vpc_row",[(20,888,2028,966)],"The private-origin row changes the network path. VPC origins require supported resources, subnets, and configuration. Check current restrictions for the selected resource and location before deployment; do not assume every private endpoint is eligible. In particular, the illustrated notes exclude origins in Outposts and Local Zones."),
("full",[],"With both diagrams visible, separate two decisions. First, is the origin connection public or a configured VPC origin? Second, where do the application targets live? The left design can still have private targets. The right design also makes the origin connection private. Next, we will restrict bypass of the public load balancer path.")
],
9:[
("edge",[(45,400,475,695),(477,410,725,531)],"Follow the green HTTPS path from the client to CloudFront. A cache hit is served at the edge without an origin request. When content must be fetched, the blue HTTPS path continues from CloudFront toward the load balancer. We want requests to use these viewer-facing edge controls rather than bypassing them."),
("origin",[(475,530,1270,735),(727,268,1278,386)],"The blue origin request reaches the Application Load Balancer, which forwards it to the EC2 backend targets. This is the public custom-origin design from the previous slide. An internet-facing endpoint needs explicit restrictions if clients must not reach the application directly."),
("network",[(45,735,1095,918),(1320,329,2010,532)],"Look at the red dashed bypass attempt and the network-control row. Restrict the load balancer security group with the AWS-managed CloudFront origin-facing prefix list. This limits the allowed source addresses. It identifies CloudFront origin-facing traffic, not your particular distribution, so use another layer to distinguish the intended path."),
("header",[(943,385,1187,538),(1320,532,2010,665)],"The listener rule adds that second layer. Configure CloudFront to send a secret custom origin header, and require its expected value before forwarding to the application. Reject requests that do not match. Protect the header value, use HTTPS, and rotate it when necessary; a leaked header can weaken this restriction."),
("layers",[(1320,665,2010,958)],"The last rows combine the controls. A direct internet client should fail the network restriction, and a request without the expected header should fail the listener rule. Both controls need correct configuration. The prefix list alone does not identify your distribution, and the header alone is not a private network boundary."),
("full",[],"The complete diagram now shows the intended path and the bypass restriction together. Apply viewer authorization separately where required, keep the origin connection secure, and verify the security group and listener behavior. For an eligible private origin, evaluate the VPC-origin option instead of assuming these public-origin controls create private connectivity.")
]}
audit=json.loads(Path("docs/sap-c03/module-15-asset-manifest.json").read_text())
def run(a):subprocess.run(a,check=True)
def seconds(p):return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)]))
def voicepath(text):return A/(hashlib.sha256(("en-US-AndrewNeural|-3%|"+text).encode()).hexdigest()[:16]+".mp3")
async def voices():
 for n,ss in S.items():
  for _,_,text in ss:await synthesize_narration(text,"en-US-AndrewNeural","-3%",voicepath(text))
asyncio.run(voices())
clips=[pilot];chapters=[dict(slide=7,start=0,duration=seconds(pilot),reused=True)];offset=seconds(pilot)
vtt=(P/"captions.vtt").read_text();allcaptions=vtt.strip()+"\n\n";nextcue=vtt.count("-->")+1;report=[]
transcript=(P/"transcript.txt").read_text()
def stamp(t):
 m=round(t*1000);return f"{m//3600000:02}:{m//60000%60:02}:{m//1000%60:02}.{m%1000:03}"
for n,ss in S.items():
 src=Path(f"public/course-visuals/sap-c03/module-15/slide-{n:02}.webp")
 assert hashlib.sha256(src.read_bytes()).hexdigest()==next(x["sha256"] for x in audit if x["sequence"]==n)
 im=Image.open(src).convert("RGB");assert im.size==(2048,1152)
 base=im.copy();dim=Image.blend(im,Image.new("RGB",im.size,(2,15,30)),.9)
 boxes=[(20,238,2028,1036),(20,1045,2028,1138)] if n==8 else [(28,245,2023,977),(28,990,2023,1115)]
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
final=O/"SAP-Module-15-Part-03-AndrewUS-Complete.mp4"
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
assert allcaptions.count("-->")==16
out=dict(slides=[7,8,9],duration_seconds=seconds(final),resolution=[2048,1152],fps=24,voice="en-US-AndrewNeural",rate="-3%",render_environment="GitHub Actions",slide7_video_sha256=prior["video_sha256"],slide7_reused_without_rerender=True,chapters=chapters,new_segments=report,captions=16,decode_errors=0,hold_fidelity=holds,published=False,sha256=hashlib.sha256(final.read_bytes()).hexdigest(),limitations=["Original raster region reveals, not vector layers","Caption intervals use actual phrase durations, not word-level alignment","Human listening review remains"])
(O/"review-report.json").write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
