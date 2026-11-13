"""Render console-shaped training views from screen-specific AWS walkthrough data.

These are annotated reconstructions, not screenshots from an AWS account. Keep
labels and navigation current against each lab's AWS documentation reference.
"""
import json
from pathlib import Path
from html import escape
from textwrap import wrap
import re

root = Path(__file__).resolve().parents[1]
labs = json.loads((root / 'app/troubleshooting/walkthroughs/labs.json').read_text())
out = root / 'public/aws-console-walkthroughs'
out.mkdir(parents=True, exist_ok=True)

NAV = {
    'ec2-first-instance': ('EC2 Dashboard','Instances','Instance Types','Launch Templates','Volumes','Security Groups'),
    'security-group': ('VPC Dashboard','Security Groups','Network ACLs','Route Tables','Subnets'),
    'vpc-public-subnet': ('VPC Dashboard','Your VPCs','Subnets','Route Tables','Internet Gateways'),
    's3-bucket': ('Buckets','Access Points','Storage Lens','Batch Operations'),
    'iam-role': ('IAM Dashboard','Users','User groups','Roles','Policies','Identity providers'),
    'rds-private-db': ('Dashboard','Databases','Query Editor','Performance Insights','Snapshots','Subnet groups'),
    'lambda-function': ('Dashboard','Functions','Applications','Layers','Event source mappings'),
    'cloudwatch-alarm': ('Overview','Alarms','Metrics','Logs','Dashboards'),
    'route53-record': ('Dashboard','Hosted zones','Health checks','Registered domains'),
    'ebs-volume': ('Instances','Volumes','Snapshots','Lifecycle Manager'),
    'alb-targets': ('Load Balancers','Target Groups','Security Groups','Instances'),
    'dynamodb-table': ('Dashboard','Tables','Explore items','Backups','Exports to S3'),
    'cloudtrail-events': ('Dashboard','Event history','Trails','Event data stores'),
    'cloudformation-stack': ('Stacks','StackSets','Exports','Designer'),
    'ecs-service': ('Clusters','Task definitions','Services','Account settings'),
    'cost-explorer': ('Cost Explorer','Cost and usage','Budgets','Cost Anomaly Detection'),
}
VIEW = {
    'ec2-first-instance': ('list','ec2-form','ec2-form','ec2-form','ec2-form','ec2-form','detail','connect','terminate'),
    'iam-role': ('list','form','form','detail'),
    'vpc-public-subnet': ('form','form','form','detail'),
    's3-bucket': ('form','form','form','detail'),
    'rds-private-db': ('form','form','form','detail'),
    'lambda-function': ('form','form','form','detail'),
    'cloudwatch-alarm': ('list','form','form','detail'),
    'route53-record': ('list','form','form','detail'),
    'security-group': ('detail','detail','form','detail'),
    'ebs-volume': ('list','form','form','detail'),
    'alb-targets': ('form','form','form','detail'),
    'dynamodb-table': ('form','form','form','detail'),
    'cloudtrail-events': ('list','list','detail','detail'),
    'cloudformation-stack': ('list','form','detail','detail'),
    'ecs-service': ('list','form','form','detail'),
    'cost-explorer': ('list','detail','detail','detail'),
}

PAGE_TITLES = {
 'iam-role':['Roles','Create role','Create role','ec2-lab-s3-read'],
 'vpc-public-subnet':['Create VPC','Create subnet','Edit routes','Route tables'],
 's3-bucket':['Create bucket','Create bucket','Create bucket','architect-lab-bucket'],
 'rds-private-db':['Create database','Create database','Create database','architect-lab-db'],
 'lambda-function':['Create function','Create function','architect-lab-function','architect-lab-function'],
 'cloudwatch-alarm':['All metrics','Create alarm','Create alarm','Alarms'],
 'route53-record':['Hosted zones','Create record','Create record','Records'],
 'security-group':['Security groups','Inbound rules','Edit inbound rules','Security group details'],
 'ebs-volume':['Volumes','Create volume','Attach volume','Volume details'],
 'alb-targets':['Create Application Load Balancer','Create Application Load Balancer','Create target group','Target groups'],
 'dynamodb-table':['Create table','Create table','Explore table items','Table overview'],
 'cloudtrail-events':['Event history','Event history','Event details','CloudTrail event'],
 'cloudformation-stack':['Stacks','Create change set','Change set details','Stack events'],
 'ecs-service':['Clusters','Create task definition','Create service','Service details'],
 'cost-explorer':['Cost and usage','Cost and usage','Cost and usage','Cost and usage'],
}

LIST_CONTENT = {
    'ec2-first-instance': (['Name','Instance ID','Instance state','Instance type','Status check'], [['No instances in this training view','','','','']]),
    'iam-role': (['Role name','Trusted entities','Last activity'], [['Existing-lab-role','AWS service','—']]),
    'cloudwatch-alarm': (['Alarm name','State','Metric','Last update'], [['No lab alarms yet','','','']]),
    'route53-record': (['Hosted zone name','Type','Record count'], [['lab.example.com','Public hosted zone','3 records']]),
    'ebs-volume': (['Volume ID','Size','Type','State','Availability Zone'], [['vol-0labexample','8 GiB','gp3','Available','us-east-1a']]),
    'cloudtrail-events': (['Event name','Event time','Username','Event source'], [['RunInstances','2026-11-02 10:25','LabOperator','ec2.amazonaws.com']]),
    'cloudformation-stack': (['Stack name','Status','Created time'], [['architect-lab-stack','CREATE_COMPLETE','Recent']]),
    'ecs-service': (['Cluster','Services','Tasks','Infrastructure'], [['lab-cluster','1','1','AWS Fargate']]),
    'cost-explorer': (['Service','Current period','Previous period'], [['Amazon EC2','$12.40','$8.25'],['Amazon S3','$2.10','$1.95']]),
}
LIST_ACTION = {'ec2-first-instance':'Launch instances','iam-role':'Create role','cloudwatch-alarm':'Create alarm','route53-record':'Create hosted zone','ebs-volume':'Create volume','cloudtrail-events':'Download events','cloudformation-stack':'Create stack','ecs-service':'Create cluster','cost-explorer':'Save report'}
DETAIL_TITLE = {'ec2-first-instance':'architect-console-lab  ·  i-0labexample01','iam-role':'ec2-lab-s3-read','s3-bucket':'architect-lab-bucket','rds-private-db':'architect-lab-db','lambda-function':'architect-lab-function','route53-record':'app.lab.example.com','security-group':'sg-lab-ssh','ebs-volume':'vol-0labexample','alb-targets':'lab-target-group','dynamodb-table':'ArchitectLabOrders','cloudformation-stack':'architect-lab-stack','ecs-service':'lab-service'}

def rect(x,y,w,h,fill='#fff',stroke='none',radius=0,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}" {extra}/>'

def text(s,x,y,size=17,fill='#243747',weight=400):
    return f'<text x="{x}" y="{y}" fill="{fill}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}">{escape(str(s))}</text>'

def multi(s,x,y,width=53,size=16,fill='#263b4b',weight=400,max_lines=2):
    return ''.join(text(line,x,y+i*(size+4),size,fill,weight) for i,line in enumerate(wrap(str(s),width,break_long_words=False)[:max_lines]))

def button(s,x,y,w=150,active=True):
    bg,fg=('#ec8c19','#1d2935') if active else ('#fff','#176f9a')
    return rect(x,y,w,37,bg,'#b77421' if active else '#8baabe',5)+text(s,x+13,y+24,14,fg,700)

def base(lab,screen,number):
    p=['<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img">',
       rect(0,0,1280,720,'#f6f8fa'),rect(0,0,1280,54,'#232f3e'),
       text('aws',18,37,30,'#f8a822',700),text('☰',110,34,21,'#fff'),
       rect(158,10,425,34,'#fff','none',4),text('⌕  Search services, features, blogs, docs',171,33,14,'#6a7b89'),
       text('◉  Training account',805,34,14,'#dbe7ed'),text('◉  us-east-1  ⌄',1032,34,14,'#dbe7ed'),
       rect(0,54,218,603,'#fff','#d5dfe6'),text(lab['service'],18,91,18,'#202e3b',700),
       text('⌕  Search navigation',18,128,13,'#61788b'),
       rect(18,137,183,1,'#e1e8ee')]
    for i,item in enumerate(NAV[lab['id']]):
        active = item=='Instances' if lab['id']=='ec2-first-instance' else (item.lower() in screen['path'].lower() or (i==0 and number==1))
        y=167+i*39
        if active: p.append(rect(8,y-24,202,34,'#e2f2fa','none',3))
        p.append(text(item,23,y,14,'#0873a2' if active else '#465b6c',700 if active else 400))
    p += [rect(218,54,1062,44,'#fff','#dce5eb'),text('Services  ›  '+lab['service']+'  ›  '+('Launch an instance' if lab['id']=='ec2-first-instance' and number in (2,3,4,5,6) else screen['path'].split('→')[-1].strip()),242,83,13,'#47728b'),
          text(PAGE_TITLES.get(lab['id'],[screen['title']]*len(lab['screens']))[number-1],246,143,26,'#1f2f3e',700),
          ]
    return p

def field(k,v,x,y,w,focus=False):
    p=[text(k,x,y,15,'#2c4150',700)]
    is_toggle= v.lower() in ('enable','enabled','yes','no','all four settings enabled','disable','disabled')
    if is_toggle:
        p += [rect(x,y+11,24,24,'#fff','#1a82b6',12),text('●',x+6,y+29,12,'#137caa'),multi(v,x+35,y+30,42,15)]
    else:
        p += [rect(x,y+11,w,40,'#fff','#0888c0' if focus else '#aebfca',4, 'stroke-width="2"' if focus else ''),
              multi(v,x+13,y+36,max(27,int(w/8.2)),15,max_lines=1)]
        if any(word in k.lower() for word in ('type','pair','vpc','subnet','source','engine','region','policy','target','runtime','mode','role','template','setting')):
            p.append(text('⌄',x+w-26,y+37,18,'#687c8c'))
    return p

def form(lab,screen,num,ec2=False):
    rows=screen['rows']; x=242; w=720 if ec2 else 1012
    heading = ({2:'Name and tags / Application and OS Images',3:'Instance type / Key pair (login)',4:'Network settings · Edit',5:'Firewall (security groups)',6:'Configure storage'}).get(num,'Launch an instance') if ec2 else screen['path'].split('→')[-1].strip()
    p=[rect(x,162,w,475,'#fff','#d3dce4',8),text(heading,x+20,198,20,'#243647',700),
       rect(x+20,220,w-40,1,'#e1e8ee')]
    # Real AWS wizard uses stacked settings. The selected field is outlined in blue.
    control_width=610 if ec2 else 750
    spacing=69 if len(rows)>4 else 82
    for i,(k,v) in enumerate(rows):
        fx=x+22; fy=249+i*spacing
        p.extend(field(k,v,fx,fy,control_width,focus=i==0 or (ec2 and num==6 and i==len(rows)-1)))
    if ec2:
        p += [rect(978,162,276,475,'#fff','#d3dce4',8),text('Summary',998,200,20,'#243647',700),
              text('Number of instances',998,231,13,'#526b7d'),text('1',998,254,17,'#1e2e3c',700)]
        summary=[('Software Image (AMI)','Amazon Linux 2023'),('Virtual server type','t3.micro'),('Firewall','Security group'),('Storage','1 volume · gp3')]
        for i,(k,v) in enumerate(summary):
            sy=289+i*68;p += [text(k,998,sy,12,'#526b7d'),multi(v,998,sy+22,27,14,'#213544',700,1)]
        p.append(button('Launch instance',998,575,231))
    else:
        action={'s3-bucket':'Create bucket','iam-role':'Next','vpc-public-subnet':'Create VPC','rds-private-db':'Create database','lambda-function':'Create function','cloudwatch-alarm':'Create alarm','route53-record':'Create record','security-group':'Save rules','ebs-volume':'Create volume','alb-targets':'Create load balancer','dynamodb-table':'Create table','cloudformation-stack':'Create change set','ecs-service':'Create service'}.get(lab['id'],'Save changes')
        p.append(button(action,x+w-175,582,151))
    return p

def listing(lab,screen,num):
    cols,rows=LIST_CONTENT[lab['id']]
    xpositions=[282,520,740,930,1090][:len(cols)]
    p=[rect(242,161,1012,474,'#fff','#d4dee6',8),
       text(screen['path'].split('→')[-1].strip(),264,200,20,'#23394a',700),
       button(LIST_ACTION[lab['id']],1042,174,188),
       rect(265,222,380,39,'#fff','#adbdc9',4),text('⌕  Filter resources',279,247,14,'#637c8b'),
       button('↻ Refresh',1090,224,129,False),rect(264,281,956,41,'#f1f5f8')]
    for i,h in enumerate(cols):p.append(text(h,xpositions[i],308,13,'#3f5667',700))
    for ri,row in enumerate(rows):
        y=359+ri*58;p += [rect(264,y-28,956,56,'#fff','#e1e9ef')]
        if len(row)>1 and all(not value for value in row[1:]):p.append(text('No instances found. Choose Launch instances to create the first one.' if lab['id']=='ec2-first-instance' else row[0],282,y+4,14,'#4f6a7c'))
        else:
            for ci,value in enumerate(row):p.append(multi(value,xpositions[ci],y+4,26 if ci else 22,13,'#0876ad' if ci==0 else '#304b5b',700 if ci==0 else 400,1))
    if lab['id']=='ec2-first-instance':
        p += [rect(1022,4,235,46,'none','#f5bb58',3,'stroke-width="2"'),text('① Check Region',1035,47,11,'#f5bb58',700),
              rect(1040,172,193,42,'none','#0b8dc2',5,'stroke-width="3"')]
    return p

def detail(lab,screen,num):
    rows=screen['rows'];p=[rect(242,162,1012,474,'#fff','#d4dee6',8),
        text(DETAIL_TITLE.get(lab['id'],screen['path'].split('→')[-1].strip()),263,201,21,'#253747',700),button('Actions  ⌄',1085,177,140,False),
        text('●  '+{'cloudtrail-events':'Event recorded','cloudformation-stack':'CREATE_COMPLETE','ec2-first-instance':'Running','rds-private-db':'Available','lambda-function':'Active','s3-bucket':'Bucket created'}.get(lab['id'],'Available'),264,229,13,'#168560',700),rect(265,249,958,1,'#d8e4eb')]
    tabs=['Details','Security','Networking','Storage','Status checks','Monitoring']
    if lab['id']=='rds-private-db':tabs=['Connectivity & security','Monitoring','Logs & events','Configuration','Maintenance & backups']
    if lab['id']=='s3-bucket':tabs=['Objects','Properties','Permissions','Metrics','Management']
    if lab['id']=='lambda-function':tabs=['Code','Test','Monitor','Configuration','Aliases']
    if lab['id']=='cloudtrail-events':tabs=['Event details','CloudTrail event','Resources']
    tx=264
    for i,t in enumerate(tabs):
        p += [text(t,tx,284,12,'#0978aa' if i==0 else '#536e7f',700 if i==0 else 400)]
        tx+=max(88,len(t)*7+20)
    p += [rect(265,299,958,2,'#c8dce9'),text('Resource details',265,337,18,'#24394a',700)]
    for i,(k,v) in enumerate(rows):
        fx=265+(i%2)*485;fy=381+(i//2)*93
        p += [text(k,fx,fy,13,'#5c7282'),multi(v,fx,fy+26,48,16,'#263c4b',700,2)]
    return p

def ec2_connect(screen):
    p=[rect(242,162,1012,474,'#fff','#cbd8e1',8),text('Connect to instance',264,204,22,'#203344',700),
       text('Connection methods',264,241,14,'#5c7281'),
       rect(263,259,270,52,'#ecf7fd','#0b8fc4',5,'stroke-width="2"'),text('EC2 Instance Connect',278,291,16,'#0878a6',700),
       rect(545,259,225,52,'#fff','#b8c8d3',5),text('Session Manager',559,291,16,'#506577'),
       rect(780,259,225,52,'#fff','#b8c8d3',5),text('SSH client',795,291,16,'#506577'),
       text('Connect using a public IP address',264,352,17,'#253a4b',700),
       rect(264,371,25,25,'#fff','#0c8cc0',13),text('●',270,389,12,'#0c8cc0'),
       text('Public IP address  198.51.100.24',302,390,15,'#284458'),
       text('Username',264,432,14,'#354c5e',700),rect(264,443,350,40,'#fff','#a4b7c6',4),text('ec2-user',279,469,15,'#2b4153'),
       button('Connect',1090,573,136),text('After connection: run whoami and uptime (read only).',265,566,13,'#587382')]
    return p

def ec2_terminate(screen):
    p=[rect(242,162,1012,474,'#fff','#cbd8e1',8),text('Instances (1)',265,204,22,'#233a4b',700),
       rect(265,241,954,46,'#e8f4fa','#9bc6d8',4),text('☑  architect-console-lab',279,270,15,'#0879a6',700),
       text('i-0labexample01',605,270,14,'#4a6474'),text('Running',960,270,14,'#17845d',700),
       button('Instance state  ⌄',1033,177,194,False),
       rect(660,305,540,285,'#fff','#adbdc9',8),
       text('Terminate (delete) instance?',684,345,22,'#263c4e',700),
       multi('Termination is permanent. Back up any data you need before continuing.',684,379,53,15,'#4c6373',400,2),
       rect(683,427,492,72,'#fff8e7','#e3bd64',5),multi('Root volumes set to delete on termination will be deleted. Check snapshots and other remaining resources.',697,452,55,14,'#6a531e',400,3),
       button('Cancel',889,527,105,False),button('Terminate (delete)',1004,527,172)]
    return p

for lab in labs:
    for number,screen in enumerate(lab['screens'],1):
        if screen.get('asset'):
            (out/f'{lab["id"]}-{number:02d}.svg').unlink(missing_ok=True)
            continue
        p=base(lab,screen,number)
        view=VIEW[lab['id']][number-1]
        p.extend(form(lab,screen,number,ec2=view=='ec2-form') if view in ('form','ec2-form') else listing(lab,screen,number) if view=='list' else ec2_connect(screen) if view=='connect' else ec2_terminate(screen) if view=='terminate' else detail(lab,screen,number))
        p += ['</svg>']
        (out/f'{lab["id"]}-{number:02d}.svg').write_text(''.join(p))
import runpy
runpy.run_path(str(root/'scripts/render-ec2-console-walkthrough.py'))
print(f'Generated {sum(len(x["screens"]) for x in labs)} console walkthrough views.')
