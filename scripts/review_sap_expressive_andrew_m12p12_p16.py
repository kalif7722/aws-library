"""Exact-scope speech comparison review; no learner publication/storage credentials."""
import argparse, asyncio, hashlib, html, json, os, pathlib, random, re, ssl

PLAN=pathlib.Path('content/video-narration/review-sap-expressive-andrew-m12p12-p16.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-expressive-andrew-m12p12-p16'
VOICES=['en-US-AndrewNeural']
RATE='-3%'
SCOPE={'m12p12': {1: 2, 2: 3, 3: 3, 4: 3}, 'm12p13': {1: 2, 2: 3, 3: 2, 4: 2}, 'm12p14': {1: 2, 2: 2, 3: 2, 4: 3}, 'm12p15': {1: 3, 2: 2, 3: 3}, 'm12p16': {1: 3, 2: 2, 3: 3}}
EXPECTED_IDS={'m12p12': ['m12p12-andrew-exp-s01-c1-2d890d6c85b5', 'm12p12-andrew-exp-s01-c2-7b9dd45977d3', 'm12p12-andrew-exp-s02-c1-725bbd3f8045', 'm12p12-andrew-exp-s02-c2-13359356d579', 'm12p12-andrew-exp-s02-c3-70c17aa4e3dc', 'm12p12-andrew-exp-s03-c1-581c9effb022', 'm12p12-andrew-exp-s03-c2-732cb6068c93', 'm12p12-andrew-exp-s03-c3-d6dca10605c6', 'm12p12-andrew-exp-s04-c1-bb7db84ef640', 'm12p12-andrew-exp-s04-c2-06b00e1ec768', 'm12p12-andrew-exp-s04-c3-5cd7e940561b'], 'm12p13': ['m12p13-andrew-exp-s01-c1-d40e1201040f', 'm12p13-andrew-exp-s01-c2-a9950afe74e8', 'm12p13-andrew-exp-s02-c1-eeba593ae4f5', 'm12p13-andrew-exp-s02-c2-766176bee481', 'm12p13-andrew-exp-s02-c3-d9deec4255c1', 'm12p13-andrew-exp-s03-c1-7bb316144179', 'm12p13-andrew-exp-s03-c2-add39de8bc68', 'm12p13-andrew-exp-s04-c1-3b281deb5fa9', 'm12p13-andrew-exp-s04-c2-a7053458ea31'], 'm12p14': ['m12p14-andrew-exp-s01-c1-4ff21843e18a', 'm12p14-andrew-exp-s01-c2-268d28aa68fc', 'm12p14-andrew-exp-s02-c1-538a4f271edb', 'm12p14-andrew-exp-s02-c2-46945ea9983f', 'm12p14-andrew-exp-s03-c1-29bf85f756b4', 'm12p14-andrew-exp-s03-c2-7af8feb0c302', 'm12p14-andrew-exp-s04-c1-7d1123d5d381', 'm12p14-andrew-exp-s04-c2-91fe800f11ff', 'm12p14-andrew-exp-s04-c3-ffc37343c7e2'], 'm12p15': ['m12p15-andrew-exp-s01-c1-39b2828009ac', 'm12p15-andrew-exp-s01-c2-44bdb85fa4e1', 'm12p15-andrew-exp-s01-c3-5d05823d30f1', 'm12p15-andrew-exp-s02-c1-84c080d03819', 'm12p15-andrew-exp-s02-c2-eb7528723792', 'm12p15-andrew-exp-s03-c1-01b0b4703e2b', 'm12p15-andrew-exp-s03-c2-a7c4069c426a', 'm12p15-andrew-exp-s03-c3-8d66509048d0'], 'm12p16': ['m12p16-andrew-exp-s01-c1-a36a6d8ecbf4', 'm12p16-andrew-exp-s01-c2-222896f338c8', 'm12p16-andrew-exp-s01-c3-ad1e320b5615', 'm12p16-andrew-exp-s02-c1-b124465a73c6', 'm12p16-andrew-exp-s02-c2-cebd975f1d5e', 'm12p16-andrew-exp-s03-c1-f2a1d9badac7', 'm12p16-andrew-exp-s03-c2-7b71f80056e6', 'm12p16-andrew-exp-s03-c3-26d9f9d0445d']}
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-expressive-andrew-m12p12-p16.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
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
