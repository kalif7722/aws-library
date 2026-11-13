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
  screen={'title':s['title'],'path':s['path'],'action':s['action'],'why':why,'rows':[],'asset':r['asset']}
  if lab['id']=='organizations-scp' and i==2:
   screen['code']=json.dumps({'Version':'2012-10-17','Statement':[{'Effect':'Deny','Action':'organizations:LeaveOrganization','Resource':'*'}]},indent=2)
  if lab['id']=='eventbridge-rule' and i==2:
   screen['code']=json.dumps({'source':['aws.ec2'],'detail-type':['EC2 Instance State-change Notification'],'detail':{'state':['running']}},indent=2)
  if lab['id']=='cloudfront-distribution' and i==2:
   screen['code']=json.dumps({'Version':'2012-10-17','Statement':[{'Sid':'AllowCloudFrontServicePrincipalReadOnly','Effect':'Allow','Principal':{'Service':'cloudfront.amazonaws.com'},'Action':'s3:GetObject','Resource':'arn:aws:s3:::architect-lab-123456789012/*','Condition':{'StringEquals':{'AWS:SourceArn':'arn:aws:cloudfront::123456789012:distribution/E123EXAMPLE'}}}]},indent=2)
   screen['warning']='Replace the example bucket, account and distribution identifiers with your lab resources before saving the policy.'
  screens.append(screen)
 lab['screens']=screens;lab['consoleFidelity']='service-specific';done.append(lab['id'])
p.write_text(json.dumps(labs,indent=2,ensure_ascii=False)+'\n')
print('Mapped complete services:',', '.join(done))
