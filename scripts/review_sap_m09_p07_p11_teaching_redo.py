"""Exact-scope Andrew narration review; no learner publication/storage credentials."""
import argparse, array, asyncio, hashlib, html, json, math, os, pathlib, random, re, ssl, subprocess

PLAN=pathlib.Path('content/video-narration/review-sap-m09-p07-p11-teaching-redo.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-m09-p07-p11-teaching-redo'
VOICE='en-US-AndrewNeural'
RATE='-3%'
SCOPE={'m09p07': {19: 3, 20: 3, 21: 3}, 'm09p08': {22: 3, 23: 3, 24: 3}, 'm09p09': {25: 3, 26: 3, 27: 3, 28: 3}, 'm09p10': {29: 3, 30: 3, 31: 3}, 'm09p11': {32: 3, 33: 3}}
EXPECTED_IDS={'m09p07': ['m09p07-redo-s19-c1-40979300d31a', 'm09p07-redo-s19-c2-a9a40843ce8c', 'm09p07-redo-s19-c3-52e3fb597430', 'm09p07-redo-s20-c1-476d9483f23c', 'm09p07-redo-s20-c2-47a2f12ff2e8', 'm09p07-redo-s20-c3-c2adb932f6fd', 'm09p07-redo-s21-c1-3885a98b7d9e', 'm09p07-redo-s21-c2-f49a09796626', 'm09p07-redo-s21-c3-29fce72d6043'], 'm09p08': ['m09p08-redo-s22-c1-31fda3d7e843', 'm09p08-redo-s22-c2-df90938e179f', 'm09p08-redo-s22-c3-32022deb7c89', 'm09p08-redo-s23-c1-96ddc7258b55', 'm09p08-redo-s23-c2-01da726cc00c', 'm09p08-redo-s23-c3-4c9194f224e6', 'm09p08-redo-s24-c1-042f6aebcd26', 'm09p08-redo-s24-c2-b1f4306ab0bb', 'm09p08-redo-s24-c3-cf33e856bdd8'], 'm09p09': ['m09p09-redo-s25-c1-85958e6b4deb', 'm09p09-redo-s25-c2-955d35f6e757', 'm09p09-redo-s25-c3-bd4c134faa15', 'm09p09-redo-s26-c1-990e31a0aa22', 'm09p09-redo-s26-c2-ddf97ac4187e', 'm09p09-redo-s26-c3-beb298610e1a', 'm09p09-redo-s27-c1-50bcb6c38c48', 'm09p09-redo-s27-c2-9105f9513437', 'm09p09-redo-s27-c3-cb66af3a0781', 'm09p09-redo-s28-c1-8b1f520604b3', 'm09p09-redo-s28-c2-0f382743a519', 'm09p09-redo-s28-c3-fcdce45e4099'], 'm09p10': ['m09p10-redo-s29-c1-486d74c5b134', 'm09p10-redo-s29-c2-065b62743592', 'm09p10-redo-s29-c3-bd1997e62c37', 'm09p10-redo-s30-c1-91751ec74a9e', 'm09p10-redo-s30-c2-d1f0f8fedcb6', 'm09p10-redo-s30-c3-65859a3180ee', 'm09p10-redo-s31-c1-037739c1ee16', 'm09p10-redo-s31-c2-07f4d1c53499', 'm09p10-redo-s31-c3-21159fbd81ef'], 'm09p11': ['m09p11-redo-s32-c1-953f88d1c8e9', 'm09p11-redo-s32-c2-716379ac0008', 'm09p11-redo-s32-c3-581d46826bed', 'm09p11-redo-s33-c1-0c5234101683', 'm09p11-redo-s33-c2-8783e7685e4b', 'm09p11-redo-s33-c3-62ec6c146214']}
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
    need(os.environ.get('GITHUB_REPOSITORY')=='kalif7722/aws-library' and os.environ.get('GITHUB_WORKFLOW_REF')=='kalif7722/aws-library/.github/workflows/review-sap-m09-p07-p11-teaching-redo.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'\d+',os.environ.get('GITHUB_RUN_ID','')) and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
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
