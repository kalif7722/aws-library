import asyncio,hashlib,html,json,os,pathlib,ssl,subprocess,sys
P=pathlib.Path('content/video-narration/review-sap-openers-tail-native-fit.json')
S=['M03P07-B', 'M03P09-A', 'M03P09-B', 'M05P02-A', 'M05P02-B', 'M06P06-A', 'M06P06-B', 'M07P01-A', 'M07P01-B', 'M07P02-A', 'M07P02-B', 'M07P04-A', 'M07P04-B', 'M07P07-A', 'M07P07-B', 'M07P10-A', 'M07P10-B', 'M07P11-A', 'M07P11-B', 'M08P01-A', 'M08P01-B', 'M08P02-A', 'M08P02-B', 'M08P03-A', 'M08P03-B', 'M08P05-A', 'M08P05-B']
REF='refs/heads/review/sap-openers-tail-native-fit'
sha=lambda b:hashlib.sha256(b).hexdigest()
norm=lambda s:' '.join(html.unescape(s).split())
def read():
 b=P.read_bytes(); h=sha(b); assert h==P.with_suffix('.sha256').read_text().strip()
 j=json.loads(b); assert set(j)=={'schema_version','voice','rate','parts'} and j['schema_version']==1 and j['voice']=='en-US-AndrewNeural' and j['rate']=='-3%'
 assert list(j['parts'])==S
 for val in j['parts'].values():
  assert set(val)=={'text','text_sha256'} and 12<=len(val['text'].split())<=60 and str(val['text']).isprintable() and sha(val['text'].encode())==val['text_sha256']
 return j,h
async def run(part,j,pin):
 assert os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push'
 assert os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library'
 import edge_tts,aiohttp,wave
 from edge_tts.communicate import _SSL_CTX
 assert _SSL_CTX.check_hostname and _SSL_CTX.verify_mode==ssl.CERT_REQUIRED
 c=j['parts'][part];dest=pathlib.Path('voice-review')/part;dest.mkdir(parents=True,exist_ok=False)
 for attempt in range(1,6):
  b=bytearray();bounds=[]
  async def collect():
   async for ev in edge_tts.Communicate(c['text'],voice=j['voice'],rate=j['rate'],connect_timeout=10,receive_timeout=30).stream():
    if ev['type']=='audio': b.extend(ev['data'])
    elif ev['type'] in ('WordBoundary','SentenceBoundary'):bounds.append(ev)
  try: await asyncio.wait_for(collect(),60); break
  except (asyncio.TimeoutError,edge_tts.exceptions.NoAudioReceived,aiohttp.ClientResponseError) as e:
   if attempt==5 or isinstance(e,aiohttp.ClientResponseError) and e.status not in {429,500,502,503,504}: raise
   retry=getattr(e,'headers',None) or {}; retry=retry.get('Retry-After','')
   await asyncio.sleep(max(5*attempt,int(retry) if retry.isdigit() else 0))
 assert len(b)>1000 and bounds and norm(' '.join(ev['text'] for ev in bounds))==norm(c['text'])
 wav=dest/f'{part}.wav'
 subprocess.run(['ffmpeg','-v','error','-xerror','-f','mp3','-i','pipe:0','-c:a','pcm_s16le',str(wav)],input=b,check=True)
 with wave.open(str(wav)) as w:
  d=w.getnframes()/w.getframerate()
  assert w.getsampwidth()==2 and w.getframerate()==24000 and w.getnchannels()==1 and 1<d<40
 receipt=dict(part=part,voice=j['voice'],rate=j['rate'],nativeSpeed=True,duration=d,plan_sha256=pin,wav_sha256=sha(wav.read_bytes()),attempts=attempt,**c)
 (dest/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
 (dest/'boundaries.json').write_text(json.dumps(bounds,indent=2)+'\n')
 print('Verified and encoded',part,round(d,3),receipt['wav_sha256'])
if __name__=='__main__':
 j,pin=read()
 if sys.argv[1]=='validate':print(pin)
 else: asyncio.run(run(sys.argv[2],j,pin))
