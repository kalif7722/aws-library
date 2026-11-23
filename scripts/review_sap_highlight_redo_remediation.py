"""Exact-scope Andrew narration review; no learner publication/storage credentials."""
import argparse, array, asyncio, hashlib, html, json, math, os, pathlib, random, re, ssl, subprocess

PLAN=pathlib.Path('content/video-narration/review-sap-highlight-redo-remediation.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-highlight-redo-remediation'
VOICE='en-US-AndrewNeural'
RATE='-3%'
SCOPE=('m04p06', 'm04p14', 'm06p05')
REPO='kalif7722/aws-library'
# Filled from independently byte-verified source plans by assemble.py.
EXPECTED={'m04p06': {'assets': {'17': '035e953d71a2b42d08733287e84d6ec0a32b0b9ce617109d37cb730b79b57a61', '18': 'b32c965d8c8681bf04239ab5bdff1abb7ddf3fe3fd38178923a2f181d3a1a7b8', '19': '2c98474d70fdbcf6747b44f494065772575f803b721b76a24b012a6139c9cc07', '20': '865dc45053274e3501b203afa1bcf0973f3c7a25c9c771bf19d41ea9ebad55e3'}, 'video': '033c5ea5df6d8a7285a5e5870d720b6e5791c59c3eb318b5675e81d4acb43e46', 'slots': {'m04p06-s17-c1': [17, 16824], 'm04p06-s17-c3': [17, 20376]}}, 'm04p14': {'assets': {'41': '1c8283ed441008cc4ced25d04988af85d16632c04710df7c815c2655de5e3b3e', '42': '22f605394907e6be6ae0cbbca2453b38b5901d9c1edc465c3890ec37b5139704'}, 'video': 'fc233963960f5768f0c8919b4c1dee54e37602b1db2564832cc2ecca2c4c9355', 'slots': {'m04p14-s42-c1': [42, 14928]}}, 'm06p05': {'assets': {'17': '230ea929aabb5a5346c7e2e9e788ae70e3e8bd12d2a40e9e475d460d0428ba33', '18': 'c9d6d6b7d9159eafae0d052f39352d7806d72cd543d4c9c7d7d9b05e622436d0'}, 'video': '5e29365db7b812d8caa94410e9d6152676f72be349d745bc6f284d64a9833299', 'slots': {'m06p05-s17-c1': [17, 17400]}}}
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
    need(set(x)=={'schema_version','voice','rate','parts'} and x['schema_version']==2 and x['voice']==VOICE and x['rate']==RATE,'schema or voice/rate mismatch')
    need(isinstance(x['parts'],list) and len(x['parts'])==len(SCOPE) and tuple(EXPECTED)==SCOPE,'part count mismatch')
    for key,p in zip(SCOPE,x['parts'],strict=True):
        need(set(p)=={'module','part','revision','approved_assets','original_review_video_sha256','local_fit_policy','units'},'unexpected part fields')
        e=EXPECTED[key]
        need(p['module']==key[1:3] and p['part']==key[4:] and p['revision']=='2026-11-23-'+key+'-highlight-redo-remediation-v1','wrong exact part/revision')
        need(p['approved_assets']==e['assets'] and p['original_review_video_sha256']==e['video'],'wrong canonical media source')
        need(p['local_fit_policy']=='fixed-slot-preferred; hold on fit failure; local explicit fallback only','unexpected fit policy')
        units=p['units']
        need(isinstance(units,list) and [c.get('source_cue_id') for c in units]==list(e['slots']),'wrong cue set/order')
        for c in units:
            fields={'id','source_cue_id','slide','canonical_text','canonical_text_sha256','speech_text','speech_text_sha256','asset_sha256','original_review_video_sha256','slot_ms'}
            need(set(c)==fields and type(c['slide']) is int,'wrong cue fields or slide')
            k=c['source_cue_id']; slot=e['slots'][k]
            need(type(c['slot_ms']) is int and [c['slide'],c['slot_ms']]==slot and c['asset_sha256']==e['assets'][str(c['slide'])] and c['original_review_video_sha256']==e['video'],'wrong splice/media pin')
            for name in ('canonical_text','speech_text'):
                t=c[name]
                need(isinstance(t,str) and 5<=len(t.split())<=95 and len(t)<=650 and all(ord(ch)>=32 for ch in t),'invalid cue prose')
                need(c[name+'_sha256']==sha(t.encode('utf8')),'cue text pin mismatch')
            need(c['id']==k+'-'+c['speech_text_sha256'][:12],'cue artifact ID mismatch')
    return x,pin
def local_verification_only():
    need(os.environ.get('GITHUB_REPOSITORY')==REPO and os.environ.get('GITHUB_ACTIONS')=='true' and os.environ.get('GITHUB_REF')==REF and os.environ.get('GITHUB_EVENT_NAME')=='push','speech allowed only on exact approved Actions push ref')
    need(os.environ.get('GITHUB_WORKFLOW_REF')==REPO+'/.github/workflows/review-sap-highlight-redo-remediation.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'[0-9]+',os.environ.get('GITHUB_RUN_ID','')),'wrong workflow path or run identity')
async def one(c,voice,rate,out):
    import aiohttp,edge_tts
    from edge_tts.communicate import _SSL_CTX
    need(_SSL_CTX.check_hostname and _SSL_CTX.verify_mode==ssl.CERT_REQUIRED,'TLS peer verification required')
    for attempt in range(1,16):
        i=c['id'];tmp=out/(i+'.partial'); audio=bytearray(); bounds=[]
        try:
            async def stream():
                async for ev in edge_tts.Communicate(c['speech_text'],voice=voice,rate=rate,boundary='SentenceBoundary',connect_timeout=10,receive_timeout=30).stream():
                    if ev['type']=='audio':audio.extend(ev['data'])
                    elif ev['type']=='SentenceBoundary':bounds.append(ev)
            await asyncio.wait_for(stream(),60)
            need(len(audio)>1000 and bounds,'no complete audio')
            need(norm(' '.join(ev['text'] for ev in bounds))==norm(c['speech_text']),'provider boundary coverage mismatch')
            tmp.write_bytes(audio)
            pcm=array.array('h');pcm.frombytes(subprocess.check_output(['ffmpeg','-v','error','-xerror','-i',str(tmp),'-f','s16le','-ac','1','-ar','24000','-']))
            dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(tmp)]))
            need(pcm and max(abs(v) for v in pcm)>300 and math.isfinite(dur) and dur>.3,'empty/silent/truncated audio')
            tmp.rename(out/(i+'.mp3'))
            receipt={k:c[k] for k in ('id','source_cue_id','canonical_text','canonical_text_sha256','speech_text_sha256','asset_sha256','original_review_video_sha256','slot_ms')}
            receipt.update(voice=voice,rate=rate,duration=dur,slot_drift_percent=round((dur/(c['slot_ms']/1000)-1)*100,2),audio_sha256=sha(audio),attempts=attempt)
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
    (out/'complete.json').write_text(json.dumps(dict(revision=item['revision'],units=len(item['units']),voice=VOICE,rate=RATE,status='complete audio; local video QA still required',plan_sha256=pin,original_review_video_sha256=item["original_review_video_sha256"],approved_assets=item["approved_assets"],local_fit_policy=item["local_fit_policy"],repository=os.environ['GITHUB_REPOSITORY'],ref=os.environ['GITHUB_REF'],head=os.environ['GITHUB_SHA'],run_id=os.environ['GITHUB_RUN_ID']),indent=2))
if __name__=='__main__':
    parser=argparse.ArgumentParser();subs=parser.add_subparsers(dest='mode',required=True)
    subs.add_parser('validate');syn=subs.add_parser('synthesize');syn.add_argument('part',choices=SCOPE)
    args=parser.parse_args();plan,pin=validate()
    if args.mode=='validate':print('Verified exact pinned complete review plan',pin)
    else:asyncio.run(main(args.part,plan,pin))
