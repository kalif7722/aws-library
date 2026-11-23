"""Runs only in owner-approved GitHub job. No upload in grant mode."""
import hashlib,json,os,pathlib,re,subprocess,time,urllib.parse
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
P=pathlib.Path
def fields(x):
 return dict(ContentType=x['mime'],ContentLength=x['bytes'],Metadata={'sha256':x['sha256']},IfNoneMatch='*')
def main():
 branch=os.environ['GITHUB_REF']; batch=int(os.environ['APPROVED_BATCH']); mode=os.environ['APPROVED_MODE']
 assert mode in ('grant','verify') and branch==f'refs/heads/stage/sap-m00-m08-{mode}-b{batch:02}-20261123'
 f=P('staging/pins.json'); data=f.read_bytes(); assert hashlib.sha256(data).hexdigest()==os.environ['APPROVED_PLAN_SHA256']; p=json.loads(data)
 assert p['batch']==batch and 1<=len(p['parts'])<=5
 assert p['indexSha256']=='e0f749227ba9fb3123459ae065ca6429b9cba1299c78c0edb8ddf4182050ef5c'
 ext_mime={'.mp4':'video/mp4','.vtt':'text/vtt','.srt':'application/x-subrip','-transcript.txt':'text/plain','-manifest.json':'application/json'}
 assert p['revision']=='2026-11-23-sap-through-m08-v1'
 hold={'M06P04','M06P07','M06P09','M06P10'}
 seen=set()
 for r in p['parts']:
  m=re.fullmatch(r'M(0[0-8])P(\d\d)',r['part']);assert m and r['part'] not in hold and r['part'] not in seen;seen.add(r['part']); mod,part=m.groups()
  pre=f'aws-course-videos/previews/sap/module-{mod}/releases/{p["revision"]}/part-{part}/sap-module-{mod}-part-{part}'
  assert len(r['objects'])==5
  for x,(ext,mime) in zip(r['objects'],ext_mime.items()):
   assert set(x)=={'key','mime','bytes','sha256'} and x['key']==pre+ext and x['mime']==mime and 0<x['bytes']<150_000_000 and re.fullmatch('[a-f0-9]{64}',x['sha256'])
 endpoint=os.environ['R2_ENDPOINT'];u=urllib.parse.urlsplit(endpoint);assert u.scheme=='https' and re.fullmatch(r'[a-z0-9-]+(?:\.[a-z0-9-]+)*\.r2\.cloudflarestorage\.com',u.hostname or '') and u.netloc==u.hostname and u.path in ('','/') and not u.query and not u.fragment
 bucket=os.environ['R2_BUCKET']; assert re.fullmatch('[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]',bucket)
 c=boto3.client('s3',endpoint_url=endpoint,region_name='auto',config=Config(signature_version='s3v4',retries={'total_max_attempts':1},s3={'addressing_style':'path'},request_checksum_calculation='when_required',response_checksum_validation='when_required'))
 available=[]; matches=[]
 result=P('result');result.mkdir()
 for r in p['parts']:
  for x in r['objects']:
   try: h=c.head_object(Bucket=bucket,Key=x['key'])
   except ClientError as e:
    assert str(e.response['Error']['Code']) in ('404','NoSuchKey','NotFound')
    assert mode=='grant'
    available.append(x);continue
   assert h['ContentLength']==x['bytes'] and h['ContentType']==x['mime'] and h['Metadata'].get('sha256')==x['sha256']
   body=c.get_object(Bucket=bucket,Key=x['key'])['Body']
   try:
    d=hashlib.sha256(); n=0
    for v in body.iter_chunks(chunk_size=1024*1024): d.update(v);n+=len(v)
    assert n==x['bytes'] and d.hexdigest()==x['sha256']
   finally: body.close()
   matches.append(x)
 if mode=='grant':
  absent={x['key'] for x in available}
  # Do not risk changing objects under a manifest already present.
  for r in p['parts']:
   if r['objects'][-1]['key'] not in absent: assert all(x['key'] not in absent for x in r['objects'])
  assert hashlib.sha256(P('staging/recipient.crt').read_bytes()).hexdigest()==os.environ['APPROVED_CERT_SHA256']
  assert 'IfNoneMatch' in c.meta.service_model.operation_model('PutObject').input_shape.members
  expires=int(time.time())+900
  grants=[x|dict(put_url=c.generate_presigned_url('put_object',Params={'Bucket':bucket,'Key':x['key']}|fields(x),ExpiresIn=900,HttpMethod='PUT')) for x in available]
  payload=json.dumps(dict(plan_sha256=hashlib.sha256(data).hexdigest(),expires_at=expires,absent=grants,matching=matches)).encode()
  subprocess.run(['openssl','cms','-encrypt','-binary','-aes-256-cbc','-outform','DER','-out',str(result/'targets.cms'),'staging/recipient.crt'],input=payload,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  print(f'Sealed {len(grants)} grants; {len(matches)} objects already match.')
 else:
  (result/'readback.json').write_text(json.dumps(dict(plan_sha256=hashlib.sha256(data).hexdigest(),verified=matches),indent=2)+'\n')
  print(f'Verified SHA-256, byte count and MIME of {len(matches)} objects.')
if __name__=='__main__':
 try:main()
 except Exception:
  print('FAIL: exact release storage check stopped. Sensitive details suppressed.')
  raise SystemExit(1)
