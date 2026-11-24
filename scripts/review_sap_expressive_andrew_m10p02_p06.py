"""Exact-scope speech comparison review; no learner publication/storage credentials."""
import argparse, asyncio, hashlib, html, json, os, pathlib, random, re, ssl

PLAN=pathlib.Path('content/video-narration/review-sap-expressive-andrew-m10p02-p06.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-expressive-andrew-m10p02-p06'
VOICES=['en-US-AndrewNeural']
RATE='-3%'
SCOPE={'m10p02': {1: 3, 2: 5, 3: 5}, 'm10p03': {1: 6, 2: 5}, 'm10p04': {1: 4}, 'm10p05': {1: 6}, 'm10p06': {1: 4, 2: 4, 3: 5}}
EXPECTED_IDS={'m10p02': ['m10p02-andrew-exp-s01-c1-d42f71829bd9', 'm10p02-andrew-exp-s01-c2-02d2e3641729', 'm10p02-andrew-exp-s01-c3-c69bf413ad77', 'm10p02-andrew-exp-s02-c1-e903b9e545e5', 'm10p02-andrew-exp-s02-c2-9eee3cac61fb', 'm10p02-andrew-exp-s02-c3-ae37d358a150', 'm10p02-andrew-exp-s02-c4-20cdd0c131e6', 'm10p02-andrew-exp-s02-c5-bf5017efaa5c', 'm10p02-andrew-exp-s03-c1-613ac68707a6', 'm10p02-andrew-exp-s03-c2-3a2952850444', 'm10p02-andrew-exp-s03-c3-db543203f6da', 'm10p02-andrew-exp-s03-c4-ca2f23ae8652', 'm10p02-andrew-exp-s03-c5-4f6ed92e86ba'], 'm10p03': ['m10p03-andrew-exp-s01-c1-cd785b9963a7', 'm10p03-andrew-exp-s01-c2-8c6177f60e86', 'm10p03-andrew-exp-s01-c3-578c7bc515fb', 'm10p03-andrew-exp-s01-c4-5fb71af47a66', 'm10p03-andrew-exp-s01-c5-d4a010259e3a', 'm10p03-andrew-exp-s01-c6-04cb2db6b984', 'm10p03-andrew-exp-s02-c1-10288ccfddfe', 'm10p03-andrew-exp-s02-c2-7af29668437f', 'm10p03-andrew-exp-s02-c3-3ac916fb2fe8', 'm10p03-andrew-exp-s02-c4-1c1c81949c72', 'm10p03-andrew-exp-s02-c5-6f28726c4c52'], 'm10p04': ['m10p04-andrew-exp-s01-c1-0ae20e0c0ceb', 'm10p04-andrew-exp-s01-c2-212207652739', 'm10p04-andrew-exp-s01-c3-66519c629c34', 'm10p04-andrew-exp-s01-c4-24aef614e7bc'], 'm10p05': ['m10p05-andrew-exp-s01-c1-e6dd74a1c8fa', 'm10p05-andrew-exp-s01-c2-99bf83065f56', 'm10p05-andrew-exp-s01-c3-88f2cbc32afa', 'm10p05-andrew-exp-s01-c4-9bc0131f2564', 'm10p05-andrew-exp-s01-c5-eb8127dc8775', 'm10p05-andrew-exp-s01-c6-65899ca91e08'], 'm10p06': ['m10p06-andrew-exp-s01-c1-b225c0a53775', 'm10p06-andrew-exp-s01-c2-1435012ab1d0', 'm10p06-andrew-exp-s01-c3-cb719c001eb1', 'm10p06-andrew-exp-s01-c4-84d65b4f8542', 'm10p06-andrew-exp-s02-c1-686ee53e6f7d', 'm10p06-andrew-exp-s02-c2-a2b3012069a2', 'm10p06-andrew-exp-s02-c3-0e80f6509afd', 'm10p06-andrew-exp-s02-c4-c9529301422c', 'm10p06-andrew-exp-s03-c1-c6b024571df6', 'm10p06-andrew-exp-s03-c2-012d443f3220', 'm10p06-andrew-exp-s03-c3-721d5beffd64', 'm10p06-andrew-exp-s03-c4-ab34a406cd40', 'm10p06-andrew-exp-s03-c5-a78e11d56924']}
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-expressive-andrew-m10p02-p06.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
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
