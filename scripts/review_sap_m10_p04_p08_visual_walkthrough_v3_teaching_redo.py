"""Exact-scope Andrew narration review; no learner publication/storage credentials."""
import argparse, array, asyncio, hashlib, html, json, math, os, pathlib, random, re, ssl, subprocess

PLAN=pathlib.Path('content/video-narration/review-sap-m10-p04-p08-visual-walkthrough-v3-teaching-redo.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-m10-p04-p08-visual-walkthrough-v3-teaching-redo'
VOICE='en-US-AndrewNeural'
RATE='-3%'
SCOPE={'m10p04': {1: 4}, 'm10p05': {1: 6}, 'm10p06': {1: 4, 2: 4, 3: 5}, 'm10p07': {1: 4, 2: 4, 3: 5}, 'm10p08': {1: 4, 2: 5, 3: 4, 4: 6}}
EXPECTED_IDS={'m10p04': ['m10p04-redo-s01-c1-ce29bc131722', 'm10p04-redo-s01-c2-30652b92f2c8', 'm10p04-redo-s01-c3-66519c629c34', 'm10p04-redo-s01-c4-4ee7a9434e33'], 'm10p05': ['m10p05-redo-s01-c1-c2a7963e1c20', 'm10p05-redo-s01-c2-27b24e06a2cf', 'm10p05-redo-s01-c3-9b7ab39be88e', 'm10p05-redo-s01-c4-9bc0131f2564', 'm10p05-redo-s01-c5-ed9b27374e9b', 'm10p05-redo-s01-c6-ad9d3cba6a41'], 'm10p06': ['m10p06-redo-s01-c1-b6fa1fa4c931', 'm10p06-redo-s01-c2-8d0e82398ba7', 'm10p06-redo-s01-c3-cb719c001eb1', 'm10p06-redo-s01-c4-84d65b4f8542', 'm10p06-redo-s02-c1-143aa3528fac', 'm10p06-redo-s02-c2-a2b3012069a2', 'm10p06-redo-s02-c3-1bd9338823c0', 'm10p06-redo-s02-c4-c20ce6689b9d', 'm10p06-redo-s03-c1-997ea07ac790', 'm10p06-redo-s03-c2-09f62e1508be', 'm10p06-redo-s03-c3-dec8b54d9926', 'm10p06-redo-s03-c4-29a5516f822e', 'm10p06-redo-s03-c5-a78e11d56924'], 'm10p07': ['m10p07-redo-s01-c1-b6193b2ba84d', 'm10p07-redo-s01-c2-99b6004fcc94', 'm10p07-redo-s01-c3-04078682f346', 'm10p07-redo-s01-c4-4c52a50bd96e', 'm10p07-redo-s02-c1-789a3a437323', 'm10p07-redo-s02-c2-99e2e5f597a4', 'm10p07-redo-s02-c3-fb6a697b3a41', 'm10p07-redo-s02-c4-73eea6981159', 'm10p07-redo-s03-c1-f01023d0f0ab', 'm10p07-redo-s03-c2-d20990b3ade6', 'm10p07-redo-s03-c3-507f9b207df4', 'm10p07-redo-s03-c4-917a624bf8e8', 'm10p07-redo-s03-c5-6ec5a5bf27b8'], 'm10p08': ['m10p08-redo-s01-c1-074754eda5ea', 'm10p08-redo-s01-c2-bc5f553bdd2a', 'm10p08-redo-s01-c3-7cf0266c7971', 'm10p08-redo-s01-c4-2563abab7853', 'm10p08-redo-s02-c1-fe173376b571', 'm10p08-redo-s02-c2-f3e718af02f6', 'm10p08-redo-s02-c3-8f35cdebd4ce', 'm10p08-redo-s02-c4-37a9581a4000', 'm10p08-redo-s02-c5-907ce771c689', 'm10p08-redo-s03-c1-7263c7902417', 'm10p08-redo-s03-c2-5372906a6a38', 'm10p08-redo-s03-c3-79dfa1b20041', 'm10p08-redo-s03-c4-5a5a24999d25', 'm10p08-redo-s04-c1-9f3af2dd677d', 'm10p08-redo-s04-c2-def8e6e87d7b', 'm10p08-redo-s04-c3-1af393dcab26', 'm10p08-redo-s04-c4-1df9bda6b9ed', 'm10p08-redo-s04-c5-350f87cbc180', 'm10p08-redo-s04-c6-525e9c9ce7e6']}
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-m10-p04-p08-visual-walkthrough-v3-teaching-redo.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
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
