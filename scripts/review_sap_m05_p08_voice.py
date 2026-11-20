"""Review-only Microsoft Andrew US narration; no storage or publication credentials."""
import asyncio,hashlib,json,pathlib,random,ssl,subprocess
import edge_tts,aiohttp
from edge_tts.communicate import _SSL_CTX
P=pathlib.Path('content/video-narration/review-sap-m05-p08-fresh.json');O=pathlib.Path('voice-review');O.mkdir(exist_ok=True)
assert hashlib.sha256(P.read_bytes()).hexdigest()=='5361f984f438cccd71575c0e7efe52abf401681c1e3f3d1fc5f304d9649278e8'
plan=json.loads(P.read_text());assert plan['voice']=='en-US-AndrewNeural' and plan['rate']=='-3%';assert len(plan['units'])==12;assert _SSL_CTX.check_hostname and _SSL_CTX.verify_mode==ssl.CERT_REQUIRED
assert [u['slide'] for u in plan['units']]==[23,23,23,23,24,24,24,24,25,25,25,25]
for u in plan['units']:assert hashlib.sha256(u['text'].encode()).hexdigest()==u['text_sha256']
async def one(u):
 for attempt in range(1,16):
  temp=O/(u['id']+'.partial');audio=bytearray();bounds=[]
  try:
   async def stream():
    async for event in edge_tts.Communicate(u['text'],voice=plan['voice'],rate=plan['rate'],connect_timeout=10,receive_timeout=30).stream():
     if event['type']=='audio':audio.extend(event['data'])
     elif event['type'] in ('WordBoundary','SentenceBoundary'):bounds.append(event)
   await asyncio.wait_for(stream(),60);assert len(audio)>1000 and bounds
   import html,re
   norm=lambda x:re.sub(r'\s+',' ',html.unescape(x)).strip()
   assert norm(' '.join(b['text'] for b in bounds))==norm(u['text']), 'Incomplete narration coverage'
   temp.write_bytes(audio)
   subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(temp),'-f','null','-'],check=True,capture_output=True)
   duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(temp)]));assert duration>.3
   # Decode PCM and reject empty/silent output.
   import array
   pcm=array.array('h',subprocess.check_output(['ffmpeg','-v','error','-i',str(temp),'-f','s16le','-ac','1','-ar','24000','-']));assert pcm and max(abs(v) for v in pcm)>300
   final=O/(u['id']+'.mp3');temp.rename(final)
   receipt={k:u[k] for k in ('id','text_sha256','asset_sha256') if k in u};receipt.update(voice=plan['voice'],rate=plan['rate'],duration=duration,audio_sha256=hashlib.sha256(audio).hexdigest(),attempts=attempt)
   (O/(u['id']+'.json')).write_text(json.dumps(receipt,indent=2));(O/(u['id']+'.boundaries.json')).write_text(json.dumps(bounds));print('READY',u['id'],round(duration,3),flush=True);return
  except Exception as e:
   temp.unlink(missing_ok=True);status=getattr(e,'status',None)
   transient=isinstance(e,(asyncio.TimeoutError,edge_tts.exceptions.NoAudioReceived)) or isinstance(e,aiohttp.ClientResponseError) and status in (429,500,502,503,504)
   print('FAIL',u['id'],attempt,type(e).__name__,status,flush=True)
   if not transient or attempt==15:raise RuntimeError('Stopped; review remains incomplete') from None
   delay=min(60,5*attempt)+random.uniform(0,3);headers=getattr(e,'headers',{}) or {};retry=headers.get('Retry-After','')
   if retry.isdigit():delay=max(delay,int(retry))
   await asyncio.sleep(delay)
async def main():
 for u in plan['units']:await one(u);await asyncio.sleep(2)
 (O/'complete.json').write_text(json.dumps({'revision':plan['revision'],'units':12,'voice':plan['voice'],'rate':plan['rate'],'status':'complete audio; local video QA still required'},indent=2))
asyncio.run(main())
