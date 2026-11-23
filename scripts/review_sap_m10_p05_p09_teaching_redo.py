"""Exact-scope Andrew narration review; no learner publication/storage credentials."""
import argparse, array, asyncio, hashlib, html, json, math, os, pathlib, random, re, ssl, subprocess

PLAN=pathlib.Path('content/video-narration/review-sap-m10-p05-p09-teaching-redo.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-m10-p05-p09-teaching-redo'
VOICE='en-US-AndrewNeural'
RATE='-3%'
SCOPE={'m10p05': {10: 5}, 'm10p06': {11: 4, 12: 3, 13: 4}, 'm10p07': {14: 3, 15: 3, 16: 4}, 'm10p08': {17: 4, 18: 3, 19: 3, 20: 3}, 'm10p09': {21: 4, 22: 3, 23: 3}}
EXPECTED_IDS={'m10p05': ['m10p05-redo-s10-c1-2fc5f95638b3', 'm10p05-redo-s10-c2-aeb86fb9dbfc', 'm10p05-redo-s10-c3-260858ee1136', 'm10p05-redo-s10-c4-d729913f8ee9', 'm10p05-redo-s10-c5-ece23a2faa81'], 'm10p06': ['m10p06-redo-s11-c1-d375fc6d0876', 'm10p06-redo-s11-c2-cc339a3a1596', 'm10p06-redo-s11-c3-c72ea04f9ed6', 'm10p06-redo-s11-c4-d1958da07737', 'm10p06-redo-s12-c1-1dcf492fcb57', 'm10p06-redo-s12-c2-0e7597e41960', 'm10p06-redo-s12-c3-fcbab2e25eb9', 'm10p06-redo-s13-c1-b921b3d4522a', 'm10p06-redo-s13-c2-ebd698feacf6', 'm10p06-redo-s13-c3-ecc52a12efa1', 'm10p06-redo-s13-c4-59acc429ba04'], 'm10p07': ['m10p07-redo-s14-c1-67e371774975', 'm10p07-redo-s14-c2-533f4eea38a5', 'm10p07-redo-s14-c3-2488c495487a', 'm10p07-redo-s15-c1-9a94bddd5b79', 'm10p07-redo-s15-c2-5543c4b3201c', 'm10p07-redo-s15-c3-b353ece39f0a', 'm10p07-redo-s16-c1-927fb230dcd9', 'm10p07-redo-s16-c2-72e6dba1e0fe', 'm10p07-redo-s16-c3-d42155c87ed1', 'm10p07-redo-s16-c4-64decbfd6c11'], 'm10p08': ['m10p08-redo-s17-c1-c6fd80213b29', 'm10p08-redo-s17-c2-7bcdd67a432f', 'm10p08-redo-s17-c3-3bcbb80bd54e', 'm10p08-redo-s17-c4-b9e7b8611d7f', 'm10p08-redo-s18-c1-168f510a65ed', 'm10p08-redo-s18-c2-1aff07121943', 'm10p08-redo-s18-c3-24b5bc9fdf9b', 'm10p08-redo-s19-c1-69bdf3fbdb80', 'm10p08-redo-s19-c2-5e478f1bb6e8', 'm10p08-redo-s19-c3-3a32b6845df8', 'm10p08-redo-s20-c1-91f4e68fc6fc', 'm10p08-redo-s20-c2-d26d77d54c55', 'm10p08-redo-s20-c3-95a24b6a77a7'], 'm10p09': ['m10p09-redo-s21-c1-39bc408b318b', 'm10p09-redo-s21-c2-b5e9c1286e1a', 'm10p09-redo-s21-c3-fd2eb0e210c1', 'm10p09-redo-s21-c4-a9ef32334638', 'm10p09-redo-s22-c1-a59ecfbdb798', 'm10p09-redo-s22-c2-384501102e5c', 'm10p09-redo-s22-c3-ea352d25d91e', 'm10p09-redo-s23-c1-5b062689cad4', 'm10p09-redo-s23-c2-b8e8720317b0', 'm10p09-redo-s23-c3-2aa52e2288d7']}
HEX=re.compile(r'[0-9a-f]{64}\Z')
def sha(b):return hashlib.sha256(b).hexdigest()
def norm(s):return re.sub(r'\s+',' ',html.unescape(s)).strip()
def need(ok,msg):
    if not ok:raise ValueError(msg)
def unambiguous(pairs):
    d={}
    for k,v in pairs:
        need(k not in d,'duplicate JSON key')
        d[k]=v
    return d
def validate():
    raw=PLAN.read_bytes()
    pin=PIN.read_text(encoding='ascii').strip()
    need(bool(HEX.fullmatch(pin)) and sha(raw)==pin,'whole-plan pin mismatch')
    x=json.loads(raw,object_pairs_hook=unambiguous)
    need(set(x)=={'schema_version','voice','rate','parts'} and x['schema_version']==1 and x['voice']==VOICE and x['rate']==RATE,'header voice/rate mismatch')
    need(isinstance(x['parts'],list) and len(x['parts'])==len(SCOPE),'part count mismatch')
    partkeys=[]
    for p in x['parts']:
        need(set(p)=={'module','part','revision','approved_assets','units'},'unexpected part fields')
        k='m'+p['module']+'p'+p['part'];partkeys.append(k)
        need(k in SCOPE and bool(re.fullmatch(r'[a-z0-9-]{10,100}',p['revision'])) and k in p['revision'],'part/revision mismatch')
        want=list(SCOPE[k]);a=p['approved_assets'];u=p['units']
        need(list(a)==[str(s) for s in want] and all(HEX.fullmatch(h) for h in a.values()),'approved asset coverage mismatch')
        need(isinstance(u,list) and len(u)==sum(SCOPE[k].values()),'cue count out of bounds')
        seen=set();slides=[];ordinal=0;prev=None
        for c in u:
            need(set(c)=={'id','slide','text','text_sha256','asset_sha256','canonical_text_sha256'},'unexpected cue fields')
            s,t,i=c['slide'],c['text'],c['id']
            need(type(s) is int and s in want and isinstance(t,str) and 5<=len(t.split())<=95 and len(t)<=700 and all(ord(ch)>=32 for ch in t),'cue text/range mismatch')
            if prev != s:
                slides.append(s);ordinal=0;prev=s
            ordinal+=1; th=sha(t.encode('utf8'))
            need(1<=ordinal<=8 and i==EXPECTED_IDS[k][len(seen)] and i not in seen,'cue ID or order mismatch')
            seen.add(i)
            need(c['text_sha256']==th and c['asset_sha256']==a[str(s)] and HEX.fullmatch(c['canonical_text_sha256']),'cue content/asset pin mismatch')
        need(slides==want and all(sum(c['slide']==s for c in u)==SCOPE[k][s] for s in want),'exact ordered chapter coverage mismatch')
    need(partkeys==list(SCOPE),'part set/order mismatch')
    return x,pin
def local_verification_only():
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-m10-p05-p09-teaching-redo.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
async def one(c,voice,rate,out):
    import aiohttp,edge_tts
    from edge_tts.communicate import _SSL_CTX
    need(_SSL_CTX.check_hostname and _SSL_CTX.verify_mode==ssl.CERT_REQUIRED,'TLS peer verification required')
    for attempt in range(1,16):
        i=c['id'];tmp=out/(i+'.partial'); audio=bytearray(); bounds=[]
        try:
            async def stream():
                async for ev in edge_tts.Communicate(c['text'],voice=voice,rate=rate,connect_timeout=10,receive_timeout=30).stream():
                    if ev['type']=='audio':audio.extend(ev['data'])
                    elif ev['type'] in ('WordBoundary','SentenceBoundary'):bounds.append(ev)
            await asyncio.wait_for(stream(),60)
            need(len(audio)>1000 and bounds,'no complete audio')
            need(norm(' '.join(ev['text'] for ev in bounds))==norm(c['text']),'provider boundary coverage mismatch')
            tmp.write_bytes(audio)
            pcm=array.array('h');pcm.frombytes(subprocess.check_output(['ffmpeg','-v','error','-xerror','-i',str(tmp),'-f','s16le','-ac','1','-ar','24000','-']))
            dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(tmp)]))
            need(pcm and max(abs(v) for v in pcm)>300 and math.isfinite(dur) and dur>.3,'empty/silent/truncated audio')
            tmp.rename(out/(i+'.mp3'))
            receipt={k:c[k] for k in ('id','text_sha256','asset_sha256','canonical_text_sha256')}
            receipt.update(voice=voice,rate=rate,duration=dur,audio_sha256=sha(audio),attempts=attempt)
            (out/(i+'.json')).write_text(json.dumps(receipt,indent=2))
            (out/(i+'.boundaries.json')).write_text(json.dumps(bounds))
            print('READY',i,round(dur,3),flush=True);return
        except Exception as e:
            tmp.unlink(missing_ok=True)
            status=getattr(e,'status',None)
            transient=isinstance(e,(asyncio.TimeoutError,edge_tts.exceptions.NoAudioReceived)) or isinstance(e,aiohttp.ClientResponseError) and status in (429,500,502,503,504)
            print('FAIL',i,attempt,type(e).__name__,status,flush=True)
            if not transient or attempt==15:raise RuntimeError('Stopped; review incomplete') from None
            delay=min(60,5*attempt)+random.uniform(0,3)
            retry=(getattr(e,'headers',None) or {}).get('Retry-After','')
            if retry.isdigit():delay=max(delay,int(retry))
            await asyncio.sleep(delay)
async def main(part,plan,pin):
    local_verification_only()
    need(part in SCOPE,'unknown part')
    item=next(p for p in plan['parts'] if 'm'+p['module']+'p'+p['part']==part)
    out=pathlib.Path('voice-review')/part;out.mkdir(parents=True,exist_ok=False)
    for c in item['units']:
        await one(c,VOICE,RATE,out);await asyncio.sleep(2)
    (out/'complete.json').write_text(json.dumps(dict(revision=item['revision'],units=len(item['units']),voice=VOICE,rate=RATE,status='complete audio; local video QA still required',plan_sha256=pin,repository=os.environ['GITHUB_REPOSITORY'],ref=os.environ['GITHUB_REF'],head=os.environ['GITHUB_SHA'],run_id=os.environ['GITHUB_RUN_ID'],approved_assets=item['approved_assets']),indent=2))
if __name__=='__main__':
    parser=argparse.ArgumentParser();subs=parser.add_subparsers(dest='mode',required=True)
    subs.add_parser('validate');syn=subs.add_parser('synthesize');syn.add_argument('part',choices=SCOPE)
    args=parser.parse_args();plan,pin=validate()
    if args.mode=='validate':print('Verified exact pinned complete review plan',pin)
    else:asyncio.run(main(args.part,plan,pin))
