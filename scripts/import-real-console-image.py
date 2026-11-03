"""Convert a generated console image without changing its layout or text."""
import sys,json,io,fcntl
from pathlib import Path
from PIL import Image
lab,index,source=sys.argv[1],int(sys.argv[2]),sys.argv[3]
root=Path(__file__).resolve().parents[1];out=root/'public/aws-console-walkthroughs';out.mkdir(exist_ok=True)
asset=f'{lab}-{index+1:02d}-real.webp';p=out/asset
with Image.open(source) as image:
 b=io.BytesIO();image.convert('RGB').save(b,'WEBP',quality=96,method=6);payload=b.getvalue()
 with Image.open(io.BytesIO(payload)) as check:check.verify()
p.write_bytes(payload)
registry=root/'docs/sap-c03/console-walkthroughs/generated-screens.json';registry.parent.mkdir(parents=True,exist_ok=True)
with open(str(registry)+'.lock','w') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX)
 rows=json.loads(registry.read_text()) if registry.exists() else []
 rows=[x for x in rows if (x['lab'],x['index'])!=(lab,index)]
 rows.append({'lab':lab,'index':index,'asset':asset,'source':source,'review':'pending'})
 registry.write_text(json.dumps(sorted(rows,key=lambda x:(x['lab'],x['index'])),indent=2)+'\n')
print(json.dumps({'lab':lab,'index':index,'asset':asset,'bytes':len(payload)}))
