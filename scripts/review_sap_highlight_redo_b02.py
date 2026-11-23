"""Exact-scope Andrew narration review; no learner publication/storage credentials."""
import argparse, array, asyncio, hashlib, html, json, math, os, pathlib, random, re, ssl, subprocess

PLAN=pathlib.Path('content/video-narration/review-sap-highlight-redo-b02.json')
PIN=PLAN.with_suffix('.sha256')
REF='refs/heads/review/sap-highlight-redo-b02'
VOICE='en-US-AndrewNeural'
RATE='-3%'
SCOPE=('m06p04','m06p05','m06p07','m06p08','m06p09','m06p10')
REPO='kalif7722/aws-library'
# Filled from independently byte-verified source plans by assemble.py.
EXPECTED={'m06p04': {'assets': {'13': '34d961e9d6e53cbc72ba1f00633f4be82bacce21d697eb392fe1a3c29ad65728', '14': '8687af2d29ca1339360d323ec800977e4329c98659d36be121c9b67a1dafde21', '15': '1c1165705e3f548906b84be0d8471a54fa7228c11337e7e47b78979275aaa20a', '16': '7723eb87a2664fdbf71fa32bf020d384c89bc6d61acf07de74aa9cdfe8314f7c'}, 'video': '5211c50e85122b89c33c37e4ba58497a1724861f322cf476b811ebbf25daa461', 'slots': {'m06p04-s13-c1': [13, 16944]}}, 'm06p05': {'assets': {'17': '230ea929aabb5a5346c7e2e9e788ae70e3e8bd12d2a40e9e475d460d0428ba33', '18': 'c9d6d6b7d9159eafae0d052f39352d7806d72cd543d4c9c7d7d9b05e622436d0'}, 'video': '5e29365db7b812d8caa94410e9d6152676f72be349d745bc6f284d64a9833299', 'slots': {'m06p05-s17-c1': [17, 17400]}}, 'm06p07': {'assets': {'23': 'dfccd509ff3078b1e25d83f863d54840e03c3201a4f59e8e66eac6d5b54c4e83', '24': '687be4ffab2cb9b3d0fce53b292f7126f4e6e38ed24c1d805c93436891b60051', '25': '0de778f5b97634a11bca09467fae3d48368984d6ba9098180c1afc36185dbf9d', '26': 'cff7c6e0ea4ffa25e1f8127f1e2ff7b550e3bc64f1b15d3f06bdc6b48d76197c'}, 'video': '11940d723ae59e58ae5dde51e6a4d068b1fc4858bdd2601ec47ae3aed2d12a40', 'slots': {'m06p07-s23-c1': [23, 12288], 'm06p07-s26-c2': [26, 18696]}}, 'm06p08': {'assets': {'27': '8a338e651e381792955fb8b2578800fefbe125fd0daf353fea38a4ac8141b4a5', '28': 'a8e580e74415b81528c0b98a3b1fa173d5b17762b0be75023ed25d3dd5349ac6', '29': '60b6e0ba00b3c9ffc04d4dce5f68a363a518adb9f0f740ba0acca3664417e901', '30': 'ddb7a1889ce313ee319144702fb7c195ba410b644ab1788e128a49e95c39cef4'}, 'video': '7281a623b0744bd91f1d5d1f58e0c288c0c0660725f4f4a5153d545afdaa0fe5', 'slots': {'m06p08-s27-c1': [27, 8712], 'm06p08-s28-c1': [28, 13104], 'm06p08-s30-c2': [30, 12720]}}, 'm06p09': {'assets': {'31': '6154aed5109bd351ba88c410e45628697389cc32802ef644d91f8e186ea2180c', '32': '87733007b6b237b26663614e2a9de054d17f7ada2ad767c88b53eb3996312846', '33': '4fefc283187962afe248acf9b11367b8cfc8983b15de9462744ee0b9be508f72', '34': '8effe0a42daf9f702f8aed187549d0ff2a40b32e17933c12a683b0d62f205669'}, 'video': '7d48bae19919933d406ae49acdd7fbace0f0dffcc96745d5a29c15afb93dc24b', 'slots': {'m06p09-s31-c1': [31, 13560], 'm06p09-s32-c1': [32, 13416], 'm06p09-s32-c2': [32, 14904], 'm06p09-s32-c3': [32, 14880], 'm06p09-s33-c3': [33, 11472]}}, 'm06p10': {'assets': {'35': '769ab6f19923d5356371a09ff8d64c75b32f88d03a02970b13676727f719d8d5', '36': '81b336651962acf0c7f6266fcdcf4d3e6ccb3e4fa8f5d5556890e8f070913ba3', '37': '28a65e5c8769386975b3e62969288e4cc2c49259fc3138caba8dc5b3473747e7', '38': 'ff8f0d8ec39a0f3a801db662d4ad94a91b51af9ea119e01414f751a5378b45d1'}, 'video': '5c3f7715425f02f96566f3cd220b5379b638643b93ef1db5672a9b57d017e0e4', 'slots': {'m06p10-s35-c1': [35, 12696], 'm06p10-s37-c1': [37, 18528]}}}
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
        need(p['module']==key[1:3] and p['part']==key[4:] and p['revision']=='2026-11-23-'+key+'-highlight-redo-b02-v1','wrong exact part/revision')
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
    need(os.environ.get('GITHUB_WORKFLOW_REF')==REPO+'/.github/workflows/review-sap-highlight-redo-b02.yml@'+REF and re.fullmatch(r'[0-9a-f]{40}',os.environ.get('GITHUB_SHA','')) and re.fullmatch(r'[0-9]+',os.environ.get('GITHUB_RUN_ID','')),'wrong workflow path or run identity')
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
