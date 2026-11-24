"""Exact-scope speech comparison review; no learner publication/storage credentials."""
import argparse, asyncio, hashlib, html, json, os, pathlib, random, re, ssl

PLAN=pathlib.Path('content/video-narration/review-sap-expressive-andrew-m10p07-p11.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-expressive-andrew-m10p07-p11'
VOICES=['en-US-AndrewNeural']
RATE='-3%'
SCOPE={'m10p07': {1: 4, 2: 4, 3: 5}, 'm10p08': {1: 4, 2: 5, 3: 4, 4: 6}, 'm10p09': {1: 4, 2: 3, 3: 5}, 'm10p10': {1: 4, 2: 4}, 'm10p11': {1: 5, 2: 2, 3: 3}}
EXPECTED_IDS={'m10p07': ['m10p07-andrew-exp-s01-c1-9c3222c3dc02', 'm10p07-andrew-exp-s01-c2-35b66532a501', 'm10p07-andrew-exp-s01-c3-04078682f346', 'm10p07-andrew-exp-s01-c4-a3e7c08784f3', 'm10p07-andrew-exp-s02-c1-8024198aa9cf', 'm10p07-andrew-exp-s02-c2-c88a2fa29eff', 'm10p07-andrew-exp-s02-c3-167d2b8bc744', 'm10p07-andrew-exp-s02-c4-73eea6981159', 'm10p07-andrew-exp-s03-c1-0632630cf131', 'm10p07-andrew-exp-s03-c2-d20990b3ade6', 'm10p07-andrew-exp-s03-c3-ce2d38e26ba9', 'm10p07-andrew-exp-s03-c4-917a624bf8e8', 'm10p07-andrew-exp-s03-c5-2afc7be6d895'], 'm10p08': ['m10p08-andrew-exp-s01-c1-a9d8e82683d9', 'm10p08-andrew-exp-s01-c2-a6f1e3124abc', 'm10p08-andrew-exp-s01-c3-7cf0266c7971', 'm10p08-andrew-exp-s01-c4-2563abab7853', 'm10p08-andrew-exp-s02-c1-fe173376b571', 'm10p08-andrew-exp-s02-c2-f3e718af02f6', 'm10p08-andrew-exp-s02-c3-17f37c4b114c', 'm10p08-andrew-exp-s02-c4-431f890ac1fc', 'm10p08-andrew-exp-s02-c5-907ce771c689', 'm10p08-andrew-exp-s03-c1-7263c7902417', 'm10p08-andrew-exp-s03-c2-803d9e7fdb17', 'm10p08-andrew-exp-s03-c3-79dfa1b20041', 'm10p08-andrew-exp-s03-c4-8feb80918f07', 'm10p08-andrew-exp-s04-c1-3ca3cb41bc0d', 'm10p08-andrew-exp-s04-c2-def8e6e87d7b', 'm10p08-andrew-exp-s04-c3-1af393dcab26', 'm10p08-andrew-exp-s04-c4-5445675364cb', 'm10p08-andrew-exp-s04-c5-add493b87570', 'm10p08-andrew-exp-s04-c6-525e9c9ce7e6'], 'm10p09': ['m10p09-andrew-exp-s01-c1-46958470da86', 'm10p09-andrew-exp-s01-c2-e247218d9fce', 'm10p09-andrew-exp-s01-c3-a849e76c0a73', 'm10p09-andrew-exp-s01-c4-106c4f8b6c10', 'm10p09-andrew-exp-s02-c1-3bfbcd9915b4', 'm10p09-andrew-exp-s02-c2-be5e0f7cb263', 'm10p09-andrew-exp-s02-c3-87e571a02954', 'm10p09-andrew-exp-s03-c1-e7de834f9e04', 'm10p09-andrew-exp-s03-c2-afd5328ea50f', 'm10p09-andrew-exp-s03-c3-8a887c37bcc7', 'm10p09-andrew-exp-s03-c4-dc6b12bdc902', 'm10p09-andrew-exp-s03-c5-621244db2d6d'], 'm10p10': ['m10p10-andrew-exp-s01-c1-1bf85a465915', 'm10p10-andrew-exp-s01-c2-dfc2c24ba7c7', 'm10p10-andrew-exp-s01-c3-373e3a05f841', 'm10p10-andrew-exp-s01-c4-aa534bf722e9', 'm10p10-andrew-exp-s02-c1-5659b51d8665', 'm10p10-andrew-exp-s02-c2-7187a6f5fc35', 'm10p10-andrew-exp-s02-c3-027ff5337aa8', 'm10p10-andrew-exp-s02-c4-9ab48358cf64'], 'm10p11': ['m10p11-andrew-exp-s01-c1-c33ab3672e74', 'm10p11-andrew-exp-s01-c2-90810ce9c448', 'm10p11-andrew-exp-s01-c3-a6095d6a301e', 'm10p11-andrew-exp-s01-c4-67f8671bb0bb', 'm10p11-andrew-exp-s01-c5-a1db81e0e09e', 'm10p11-andrew-exp-s02-c1-0a07ac626efc', 'm10p11-andrew-exp-s02-c2-77df231d2c36', 'm10p11-andrew-exp-s03-c1-419ea0b975bd', 'm10p11-andrew-exp-s03-c2-486dac47f4fc', 'm10p11-andrew-exp-s03-c3-ade07599e24b']}
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-expressive-andrew-m10p07-p11.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
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
