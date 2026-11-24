"""Exact-scope speech comparison review; no learner publication/storage credentials."""
import argparse, asyncio, hashlib, html, json, os, pathlib, random, re, ssl

PLAN=pathlib.Path('content/video-narration/review-sap-expressive-andrew-m11p02-p06.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-expressive-andrew-m11p02-p06'
VOICES=['en-US-AndrewNeural']
RATE='-3%'
SCOPE={'m11p02': {1: 4, 2: 2, 3: 3, 4: 3}, 'm11p03': {1: 4, 2: 4}, 'm11p04': {1: 3, 2: 4}, 'm11p05': {1: 3, 2: 2, 3: 3}, 'm11p06': {1: 2, 2: 2, 3: 3}}
EXPECTED_IDS={'m11p02': ['m11p02-andrew-exp-s01-c1-b4750e128567', 'm11p02-andrew-exp-s01-c2-f4e4decf3a9a', 'm11p02-andrew-exp-s01-c3-9da7de9c33b2', 'm11p02-andrew-exp-s01-c4-0eb0fad51b14', 'm11p02-andrew-exp-s02-c1-0a83c7ec0d3e', 'm11p02-andrew-exp-s02-c2-3d68cca7c2c0', 'm11p02-andrew-exp-s03-c1-ea08f77d4840', 'm11p02-andrew-exp-s03-c2-e4e2350b04b1', 'm11p02-andrew-exp-s03-c3-2fa1589d8ae1', 'm11p02-andrew-exp-s04-c1-8841b1ebff06', 'm11p02-andrew-exp-s04-c2-53eeb2d0b55e', 'm11p02-andrew-exp-s04-c3-543bc837e16c'], 'm11p03': ['m11p03-andrew-exp-s01-c1-8a36b00328e1', 'm11p03-andrew-exp-s01-c2-ba5f872a25d1', 'm11p03-andrew-exp-s01-c3-1c895636b76d', 'm11p03-andrew-exp-s01-c4-3b3dcdc42724', 'm11p03-andrew-exp-s02-c1-47a5ec515ba7', 'm11p03-andrew-exp-s02-c2-23bd752922a7', 'm11p03-andrew-exp-s02-c3-23e7910e0459', 'm11p03-andrew-exp-s02-c4-2f512233ee7a'], 'm11p04': ['m11p04-andrew-exp-s01-c1-eb049d452a60', 'm11p04-andrew-exp-s01-c2-70287a31b14a', 'm11p04-andrew-exp-s01-c3-18e112f0a69a', 'm11p04-andrew-exp-s02-c1-5a6e238b4626', 'm11p04-andrew-exp-s02-c2-1d765805e838', 'm11p04-andrew-exp-s02-c3-ff19d1157f6b', 'm11p04-andrew-exp-s02-c4-8e72953b5d5d'], 'm11p05': ['m11p05-andrew-exp-s01-c1-81f692587f66', 'm11p05-andrew-exp-s01-c2-9cde1a60c36f', 'm11p05-andrew-exp-s01-c3-73c4f4e7a744', 'm11p05-andrew-exp-s02-c1-2133eb8c7ed2', 'm11p05-andrew-exp-s02-c2-7d252e5e1fcb', 'm11p05-andrew-exp-s03-c1-7537105001b4', 'm11p05-andrew-exp-s03-c2-311c53af319d', 'm11p05-andrew-exp-s03-c3-8db66fe1c71f'], 'm11p06': ['m11p06-andrew-exp-s01-c1-75231a86c40e', 'm11p06-andrew-exp-s01-c2-7a09e0ff54f2', 'm11p06-andrew-exp-s02-c1-4914a51c4b6a', 'm11p06-andrew-exp-s02-c2-f85dab311b17', 'm11p06-andrew-exp-s03-c1-75e00b256a0e', 'm11p06-andrew-exp-s03-c2-0b9427da8776', 'm11p06-andrew-exp-s03-c3-24413e85c710']}
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
    need(set(x)=={'schema_version','voices','rate','parts'} and x['schema_version']==1 and x['voices']==VOICES and x['rate']==RATE,'header voice/rate mismatch')
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-expressive-andrew-m11p02-p06.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
async def one(c,voice,rate,out):
    import aiohttp,edge_tts
    from edge_tts.communicate import _SSL_CTX
    need(_SSL_CTX.check_hostname and _SSL_CTX.verify_mode==ssl.CERT_REQUIRED,'TLS peer verification required')
    for attempt in range(1,16):
        i=c['id'];tmp=out/(i+'.partial'); audio=bytearray(); bounds=[]
        try:
            async def stream():
                async for ev in edge_tts.Communicate(c['text'],voice=voice,rate=rate,connect_timeout=10,receive_timeout=30,boundary="SentenceBoundary").stream():
                    if ev['type']=='audio':audio.extend(ev['data'])
                    elif ev['type']=='SentenceBoundary':bounds.append(ev)
            await asyncio.wait_for(stream(),60)
            need(len(audio)>1000 and bounds,'no complete audio')
            need(norm(' '.join(ev['text'] for ev in bounds))==norm(c['text']),'provider boundary coverage mismatch')
            tmp.write_bytes(audio)
            need(all(isinstance(ev.get('text'),str) and ev['text'].strip() and isinstance(ev.get('offset'),int) and ev['offset']>=0 and isinstance(ev.get('duration'),int) and ev['duration']>0 for ev in bounds),'invalid provider boundary metadata')
            need(all(a['offset']<=b['offset'] for a,b in zip(bounds,bounds[1:])),'provider boundaries out of order')
            tmp.rename(out/(i+'.mp3'))
            receipt={k:c[k] for k in ('id','text_sha256','asset_sha256','canonical_text_sha256')}
            receipt.update(voice=voice,rate=rate,audio_bytes=len(audio),audio_sha256=sha(audio),boundaries_sha256=sha(json.dumps(bounds).encode()),attempts=attempt,media_validation='deferred_to_local_ffmpeg')
            (out/(i+'.json')).write_text(json.dumps(receipt,indent=2))
            (out/(i+'.boundaries.json')).write_text(json.dumps(bounds))
            print('READY',i,len(audio),flush=True);return
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
    voice=VOICES[0]
    local_verification_only()
    need(part in SCOPE,'unknown part')
    item=next(p for p in plan['parts'] if 'm'+p['module']+'p'+p['part']==part)
    out=pathlib.Path('voice-review')/part;out.mkdir(parents=True,exist_ok=False)
    for c in item['units']:
        await one(c,voice,RATE,out);await asyncio.sleep(2)
    (out/'complete.json').write_text(json.dumps(dict(revision=item['revision'],units=len(item['units']),voice=voice,rate=RATE,status='complete provider audio; mandatory local decode, duration, and waveform checks pending',plan_sha256=pin,repository=os.environ['GITHUB_REPOSITORY'],ref=os.environ['GITHUB_REF'],head=os.environ['GITHUB_SHA'],run_id=os.environ['GITHUB_RUN_ID'],approved_assets=item['approved_assets']),indent=2))
if __name__=='__main__':
    parser=argparse.ArgumentParser();subs=parser.add_subparsers(dest='mode',required=True)
    subs.add_parser('validate');syn=subs.add_parser('synthesize');syn.add_argument('part',choices=SCOPE)
    args=parser.parse_args();plan,pin=validate()
    if args.mode=='validate':print('Verified exact pinned complete review plan',pin)
    else:asyncio.run(main(args.part,plan,pin))
