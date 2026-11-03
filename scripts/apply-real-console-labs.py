import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'app/troubleshooting/walkthroughs/labs.json';labs=json.loads(p.read_text());plan=json.loads((root/'docs/sap-c03/console-walkthroughs/real-console-plan.json').read_text());registry=json.loads((root/'docs/sap-c03/console-walkthroughs/generated-screens.json').read_text());lookup={(r['lab'],r['index']):r for r in registry};done=[]
for lab in labs:
 views=plan.get(lab['id'])
 if not views or not all((lab['id'],i) in lookup for i in range(len(views))):continue
 why=lab['screens'][0]['why'];screens=[]
 for i,s in enumerate(views):
  r=lookup[(lab['id'],i)]
  screens.append({'title':s['title'],'path':s['path'],'action':s['action'],'why':why,'rows':[],'asset':r['asset']})
 lab['screens']=screens;lab['consoleFidelity']='service-specific';done.append(lab['id'])
p.write_text(json.dumps(labs,indent=2,ensure_ascii=False)+'\n')
print('Mapped complete services:',', '.join(done))
