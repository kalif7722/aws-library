"""Render readable AWS-style raster training views from audited lab screen data.

These are console reconstructions, never live account captures. Exact choices are in
labs.json; avoid fabricated resource IDs and live telemetry.
"""
import json, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
LABS=json.loads((ROOT/'app/troubleshooting/walkthroughs/labs.json').read_text())
OUT=ROOT/'public/aws-console-walkthroughs'; OUT.mkdir(parents=True,exist_ok=True)
W,H=1672,941
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
F={n:ImageFont.truetype(FONT,n) for n in (15,17,19,21,24,28,32,42)}
FB={n:ImageFont.truetype(BOLD,n) for n in (15,17,19,21,24,28,32,42)}
NAV={
'vpc-public-subnet':['Your VPCs','Subnets','Route tables','Internet gateways','Transit gateways','Security groups'],
's3-bucket':['General purpose buckets','Access points','Storage Lens','Batch Operations','Multi-Region Access Points'],
'rds-private-db':['Databases','Query Editor','Performance Insights','Snapshots','Subnet groups','Events'],
'lambda-function':['Functions','Applications','Layers','Event source mappings','Monitoring'],
'cloudwatch-alarm':['Overview','Metrics','Alarms','Logs','Dashboards','Insights'],
'route53-record':['Dashboard','Hosted zones','Health checks','Resolver','Domains','Traffic policies'],
'security-group':['Instances','Security Groups','Network Interfaces','Volumes','Load Balancers'],
'ebs-volume':['Instances','Volumes','Snapshots','Lifecycle Manager','Security Groups'],
'alb-targets':['Load Balancers','Target Groups','Listeners','Security Groups','Instances'],
'dynamodb-table':['Tables','Explore items','Backups','Exports to S3','PartiQL editor'],
'cloudtrail-events':['Dashboard','Event history','Trails','Event data stores','Insights'],
'cloudformation-stack':['Stacks','StackSets','Exports','Designer','Registry'],
'ecs-service':['Clusters','Task definitions','Services','Tasks','Capacity providers'],
'cost-explorer':['Cost Explorer','Budgets','Cost Anomaly Detection','Cost allocation tags','Bills'],
'organizations-scp':['Dashboard','AWS accounts','Policies','Organize accounts','Settings'],
'control-tower':['Dashboard','Landing zone','Organization','Control catalog','Controls'],
'transit-gateway':['Transit gateways','Transit Gateway Attachments','Transit Gateway Route Tables','Your VPCs','Route tables'],
'direct-connect':['Connections','Virtual interfaces','Direct Connect gateways','LAGs','Monitoring'],
'cloudfront-distribution':['Distributions','Policies','Functions','Key management','Monitoring'],
'waf-web-acl':['Web ACLs','IP sets','Regex pattern sets','Rule groups','Protection packs'],
'kms-key':['AWS managed keys','Customer managed keys','Custom key stores','External key stores'],
'backup-plan':['Dashboard','Backup plans','Backup vaults','Protected resources','Jobs','Settings'],
'eventbridge-rule':['Event buses','Rules','Pipes','Scheduler','Connections'],
'sqs-dlq':['Queues','Dead-letter queues','Monitoring','Access policy']}
SELECT={'Create','Choose','Next','Review','Inspect','Edit','Open','Attach','Verify'}
def text(d,xy,value,size=19,color='#1d2939',bold=False):d.text(xy,value,font=(FB if bold else F)[size],fill=color)
def line(d,xy,value,width,size=19,color='#344054',bold=False,maxlines=3):
    words=value.split(); lines=[]; cur=''
    for word in words:
        nxt=(cur+' '+word).strip()
        if d.textlength(nxt,font=(FB if bold else F)[size])>width and cur:
            lines.append(cur);cur=word
        else:cur=nxt
    if cur:lines.append(cur)
    for j,s in enumerate(lines[:maxlines]):text(d,(xy[0],xy[1]+j*(size+8)),s,size,color,bold)
    return min(len(lines),maxlines)*(size+8)
def rect(d,box,fill='#fff',outline='#c8d1da',r=7,width=1):d.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=width)
def button(d,box,label,orange=False):
    rect(d,box,'#ff9900' if orange else '#fff','#de8a00' if orange else '#8997a6',6)
    tw=d.textlength(label,font=FB[17]); text(d,(box[0]+(box[2]-box[0]-tw)/2,box[1]+13),label,17,'#151a20',True)
def callout(d,x,y,n):
    d.ellipse((x-21,y-21,x+21,y+21),fill='#eaffff',outline='#08aab8',width=3)
    text(d,(x-6,y-12),str(n),21,'#087883',True)
def service_name(lab):
    return lab['service'].replace('Amazon ','').replace('AWS ','').replace('Elastic Load Balancing','EC2').replace(' / EC2','')
def current_nav(lab,screen):
    route=screen['path'].lower(); opts=NAV[lab['id']]
    for item in opts:
        if item.lower() in route:return item
    return opts[0]
def base(lab,screen,index):
    im=Image.new('RGB',(W,H),'#fff');d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,68),fill='#182433')
    text(d,(28,15),'aws',42,'#fff',True);d.arc((26,43,96,67),5,178,fill='#ff9900',width=4)
    text(d,(147,20),'▦  Services',19,'#fff',True)
    rect(d,(318,11,1160,57),'#111a27','#8494a7',6)
    text(d,(343,24),'⌕  Search for services, features, blogs, docs, and more',17,'#d5dde6')
    region='Global' if lab['id'] in ('route53-record','cloudfront-distribution','organizations-scp','control-tower','waf-web-acl','cost-explorer') else 'N. Virginia'
    text(d,(1241,23),region+'  ▾',17,'#f4f7fa');text(d,(1430,23),'training-account  ▾',17,'#f4f7fa')
    d.rectangle((0,68,318,H),fill='#fafbfc');d.line((318,68,318,H),fill='#c8d1da',width=2)
    text(d,(30,96),service_name(lab),28,'#17202e',True)
    d.line((0,153,318,153),fill='#c8d1da',width=1)
    text(d,(30,182),'Dashboard',19)
    text(d,(30,237),'NAVIGATION',15,'#66788b',True)
    selected=current_nav(lab,screen)
    for n,item in enumerate(NAV[lab['id']]):
        y=273+n*48
        if item==selected:
            d.rectangle((12,y-8,306,y+36),fill='#e7f2ff');d.rectangle((12,y-8,18,y+36),fill='#0972d3')
        text(d,(32,y),item,17,'#0966b3' if item==selected else '#344054',item==selected)
    text(d,(344,91),service_name(lab),17,'#096bbd',True)
    text(d,(344+d.textlength(service_name(lab),font=FB[17])+16,91),' / '+screen['path'].split('→')[-1].strip(),17,'#5b6470')
    text(d,(344,137),screen['title'],32,'#111c2a',True)
    line(d,(344,184),screen['action'],1235,17,'#5a6470',False,2)
    return im,d

def form(d,lab,screen,index):
    rows=screen['rows']; title=screen['title'];
    rect(d,(344,251,1322,830),'#fff','#c9d2dc',9)
    text(d,(370,278),'Configuration',24,'#162536',True)
    text(d,(370,315),'Review the values and options in this step.',17,'#647184')
    y=367
    for n,(label,value) in enumerate(rows):
        text(d,(372,y),label,19,'#222e3b',True)
        if len(value)<56:
            rect(d,(372,y+33,1284,y+87),'#fff','#9aa9b8',6)
            line(d,(390,y+48),value,850,19,'#182230',False,1)
            text(d,(1250,y+48),'▾',17,'#1682c4')
        else:
            rect(d,(372,y+33,1284,y+100),'#fff','#9aa9b8',6)
            line(d,(390,y+47),value,850,17,'#182230',False,2)
        callout(d,1305,y+60,n+1)
        y+=135
    rect(d,(1343,251,1644,729),'#f9fafb','#c9d2dc',9)
    text(d,(1365,277),'Summary',21,'#19283b',True)
    d.line((1365,318,1622,318),fill='#d5dce5')
    yy=341
    for label,value in rows:
        text(d,(1365,yy),label,15,'#096bbd',True)
        height=line(d,(1365,yy+27),value,252,15,'#445163',False,2)
        yy+=max(99,27+height+24)
    if title.startswith(('Create','Attach','Set','Define','Choose')):
        button(d,(1456,770,1625,824),'Create' if title.startswith('Create') and index==len(lab['screens'])-1 else 'Next',True)
        button(d,(1320,770,1440,824),'Cancel')
    text(d,(367,859),'Training reconstruction · confirm labels in the current AWS console',15,'#6a7788')

def listing(d,lab,screen,index):
    rows=screen['rows'];action='Create' if 'Create' in screen['title'] else 'Actions'
    rect(d,(344,247,1644,838),'#fff','#c8d1dc',9)
    text(d,(370,276),screen['title'],24,'#172434',True)
    button(d,(1452,269,1620,318),action,True)
    rect(d,(370,352,1195,407),'#fff','#9eabb8',6)
    text(d,(391,369),'⌕  Search '+service_name(lab)+' resources',17,'#6b7888')
    button(d,(1214,352,1330,407),'Refresh')
    rect(d,(370,443,1618,500),'#eef2f6','#d6dfe7',4)
    labels=['Name / setting','Current selection','Status']
    for x,label in zip((391,890,1441),labels):text(d,(x,460),label,17,'#273647',True)
    y=501
    for n,(label,value) in enumerate(rows):
        d.rectangle((370,y,1618,y+72),fill='#fff' if n%2 else '#f8fafc')
        d.line((370,y+72,1618,y+72),fill='#d9e0e7')
        text(d,(392,y+22),label,19,'#096dbb',True)
        line(d,(890,y+20),value,490,17,'#344154',False,2)
        text(d,(1443,y+22),'Review',17,'#287c53',True)
        callout(d,1585,y+35,n+1)
        y+=72
    rect(d,(370,755,1618,813),'#f4faff','#b9d5ea',6)
    line(d,(390,769),'Select a row to inspect its details, permissions, routes or recent events.',1160,17,'#34485b',False,2)

def detail(d,lab,screen,index):
    rows=screen['rows']
    rect(d,(344,251,1644,414),'#fff','#c8d1dc',9)
    text(d,(370,277),'Resource summary',24,'#172536',True)
    for n,(label,value) in enumerate(rows[:3]):
        x=370+n*420
        text(d,(x,334),label,17,'#38516b',True)
        line(d,(x,364),value,385,17,'#172536',False,2)
        if n<2:d.line((x+398,333,x+398,398),fill='#dce3e9')
    tabs={
      'cloudformation-stack':['Events','Resources','Outputs','Parameters','Template'],
      'cloudtrail-events':['Event details','CloudTrail event','Resources','Related events'],
      'ecs-service':['Deployments','Tasks','Events','Configuration','Metrics'],
      'rds-private-db':['Connectivity & security','Monitoring','Logs & events','Configuration'],
      's3-bucket':['Objects','Properties','Permissions','Metrics','Management'],
      'alb-targets':['Targets','Health checks','Attributes','Tags'],
      'route53-record':['Records','Hosted zone details','Tags'],
      'backup-plan':['Recovery points','Jobs','Access policy','Tags'],
      'kms-key':['Key policy','Key rotation','Grants','Cryptographic configuration'],
      'waf-web-acl':['Rules','Associated resources','Traffic overview','Logging'],
      'cost-explorer':['Cost and usage','Forecast','Reports'],
    }.get(lab['id'],['Overview','Configuration','Permissions','Monitoring','Events'])
    for n,t in enumerate(tabs):
        x=355+n*(1260//max(len(tabs),1));text(d,(x,445),t,17,'#096fc1' if n==0 else '#4a596a',n==0)
    d.line((344,482,1644,482),fill='#b8c7d5',width=2)
    d.line((355,481,488,481),fill='#0972d3',width=5)
    rect(d,(344,504,1644,821),'#fff','#c8d1dc',9)
    text(d,(370,529),'Settings and evidence',24,'#172536',True)
    y=585
    for n,(label,value) in enumerate(rows):
        d.line((370,y-15,1615,y-15),fill='#e2e7ed')
        text(d,(375,y),label,19,'#31485e',True)
        line(d,(735,y),value,805,19,'#182738',False,2)
        callout(d,1580,y+12,n+1)
        y+=67
    text(d,(367,853),'Training reconstruction · inspect the live resource before making changes',15,'#6a7788')

for lab in LABS:
    if lab['id'] in ('ec2-first-instance','iam-role'):continue
    for n,screen in enumerate(lab['screens'],1):
        im,d=base(lab,screen,n)
        (listing if n==1 else detail if n==len(lab['screens']) else form)(d,lab,screen,n)
        path=OUT/f"{lab['id']}-{n:02d}-sap.webp"
        temporary=path.with_suffix('.rendering.webp')
        im.save(temporary,'WEBP',quality=94,method=6)
        if temporary.stat().st_size<1000: raise RuntimeError(f'Empty render: {path}')
        temporary.replace(path)
        screen['asset']=path.name
(ROOT/'app/troubleshooting/walkthroughs/labs.json').write_text(json.dumps(LABS,indent=2,ensure_ascii=False)+'\n')
print('Rendered',sum(len(l['screens']) for l in LABS if l['id'] not in ('ec2-first-instance','iam-role')),'views')
