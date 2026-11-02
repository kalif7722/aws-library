"""Bright-mode EC2 console walkthrough, based on supplied console captures and AWS docs.

The captures are references for control placement and terminology. Rendered views are
new annotated recreations, so no account identifiers, live prices or Free Tier claims
are copied from the captures.
"""
import json
from html import escape
from pathlib import Path
from textwrap import wrap

root=Path(__file__).resolve().parents[1]
out=root/'public/aws-console-walkthroughs'
lab=next(x for x in json.loads((root/'app/troubleshooting/walkthroughs/labs.json').read_text()) if x['id']=='ec2-first-instance')

INK='#1b2633'; MUTED='#516474'; BLUE='#087db4'; LINE='#c9d4dd'; BG='#f6f8fa'; CARD='#fff'; ORANGE='#ff9900'
def box(x,y,w,h,fill=CARD,stroke=LINE,rx=17,sw=1):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def t(value,x,y,size=20,fill=INK,weight=400):return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="{fill}" font-weight="{weight}">{escape(str(value))}</text>'
def lines(value,x,y,width=60,size=19,fill=MUTED,weight=400,limit=3):return ''.join(t(line,x,y+i*(size+7),size,fill,weight) for i,line in enumerate(wrap(value,width,break_long_words=False)[:limit]))
def inputbox(value,x,y,w=740,h=47,dropdown=False):return box(x,y,w,h,CARD,'#8797a7',8)+t(value,x+17,y+30,19,MUTED)+ (t('⌄',x+w-32,y+31,23,BLUE,700) if dropdown else '')
def button(label,x,y,w=205,orange=False):return box(x,y,w,48,ORANGE if orange else CARD,ORANGE if orange else BLUE,20,2)+t(label,x+19,y+31,18,INK if orange else BLUE,700)
def card_title(label,x,y):return t('▾',x,y,25,INK,700)+t(label,x+35,y,26,INK,700)+t('Info',x+80+min(len(label)*16,910),y-1,16,BLUE,700)
def frame(number,viewport='launch'):
 p=['<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1006" viewBox="0 0 1920 1006">',box(0,0,1920,1006,BG,BG,0)]
 if viewport=='launch':
  p += [t('Launch an instance',36,59,35,INK,700),t('Info',520,56,17,BLUE,700),
        t('Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud.',36,95,20,MUTED),
        box(1294,20,590,971,CARD,LINE,22),t('▾  Summary',1325,72,29,INK,700),
        t('Number of instances',1325,119,19,INK,700),t('Info',1559,119,16,BLUE,700),inputbox('1',1325,135,528,47),
        t('Software Image (AMI)',1325,239,19,BLUE,700),t('Amazon Linux 2023 AMI',1325,271,19,MUTED),
        t('Virtual server type (instance type)',1325,343,19,BLUE,700),t('t3.micro',1325,374,19,MUTED),
        t('Firewall (security group)',1325,445,19,BLUE,700),t('New security group',1325,476,19,MUTED),
        t('Storage (volumes)',1325,546,19,BLUE,700),t('1 volume(s) - 8 GiB',1325,577,19,MUTED),
        box(1315,616,547,115,'#f0f8fd','#8cc4e3',10),t('ⓘ',1335,651,24,BLUE,700),
        lines('Review pricing, Free Tier eligibility and public IPv4 charges in your own account.',1371,652,47,17,MUTED,400,3),
        box(1295,826,588,1,'#d7e1e8','#d7e1e8',0),t('Cancel',1355,888,18,BLUE,700),
        button('Launch instance',1628,857,224,True),t('Preview code',1650,952,17,BLUE,700)]
 return p

def panel(x,y,w,h,title,desc=None):
 p=[box(x,y,w,h,CARD,LINE,23),card_title(title,x+30,y+52)]
 if desc:p+=lines(desc,x+30,y+88,111,18,MUTED,400,2)
 return p

def name_ami():
 p=frame(2)
 p+=panel(36,154,1222,195,'Name and tags')
 p+=[t('Name',67,257,19,INK,700),inputbox('architect-console-lab',67,271,762),t('Add additional tags',860,299,19,BLUE,700)]
 p+=panel(36,380,1222,598,'Application and OS Images (Amazon Machine Image)','An AMI contains the operating system and applications for your instance. Browse more AMIs for other choices.')
 p+=[inputbox('⌕  Search our full catalog including 1000s of application and OS images',67,548,1160),t('Quick Start',98,659,22,BLUE,700),box(70,683,184,5,BLUE,BLUE,2)]
 for i,label in enumerate(['Amazon Linux','macOS','Ubuntu','Windows','Red Hat','SUSE Linux']):
  x=75+i*145;p+=[box(x,712,137,188,'#f0f8ff' if i==0 else CARD,BLUE if i==0 else LINE,0,2 if i==0 else 1),t(label,x+11,753,17,INK),t(['aws','Mac','◉','▦','Red Hat','SUSE'][i],x+28,841,25,['#ff9900','#283c4e','#f57e27','#277bd1','#db302a','#40a86d'][i],700)]
 p+=[t('Browse more AMIs',1008,788,19,BLUE),t('Amazon Machine Image (AMI)',67,950,18,INK,700)]
 return p

def type_key():
 p=frame(3)
 p+=panel(36,154,1222,290,'Instance type')
 p+=[t('Instance type',67,247,19,INK,700),inputbox('t3.micro',67,262,850,70,True),
     t('Family: t3     2 vCPU     1 GiB Memory',84,359,16,MUTED),t('Compare instance types',961,302,19,BLUE,700),
     t('Current pricing and eligibility appear in the real console.',67,404,16,MUTED)]
 p+=panel(36,473,1222,258,'Key pair (login)','You can use a key pair to securely connect to your instance. Keep the downloaded private key safe.')
 p+=[t('Key pair name - required',67,631,19,INK,700),inputbox('lab-key',67,649,766,48,True),t('Create new key pair',866,679,19,BLUE,700)]
 p+=panel(36,759,1222,215,'Network settings')
 p+=[button('Edit',1083,780,135),t('Network',67,861,19,INK,700),t('Select a VPC and subnet in the next step.',67,897,19,MUTED)]
 return p

def network(edit=False):
 p=frame(4 if not edit else 5)
 p+=panel(36,154,1222,830,'Network settings')
 p+=[button('Edit' if not edit else 'Edited',1082,176,136),
     t('Network',67,265,19,INK,700),*( [inputbox('Approved lab VPC',67,278,774,48,True)] if edit else [t('Approved lab VPC',67,300,19,MUTED)] ),
     t('Subnet',67,373,19,INK,700),*( [inputbox('Public subnet (route to internet gateway)',67,388,774,48,True)] if edit else [t('Public subnet (route to internet gateway)',67,410,19,MUTED)] ),
     t('Auto-assign public IP',67,481,19,INK,700),*( [inputbox('Enable',67,496,774,48,True)] if edit else [t('Enable',67,519,19,MUTED)] ),
     t('Firewall (security groups)',67,601,21,INK,700),
     t('A security group controls inbound and outbound traffic to the instance.',67,637,17,MUTED),
     box(67,658,452,54,'#f0f8ff',BLUE,9,2),t('◉  Create security group',86,692,19,INK),
     box(538,658,449,54,CARD,LINE,9),t('○  Select existing security group',557,692,19,INK),
     t('Allow SSH traffic from',67,773,19,INK,700),inputbox('My IP (current public IPv4 /32)',459,742,508,58,True),
]
 return p

def storage():
 p=frame(6)
 p+=panel(36,154,1222,665,'Configure storage')
 p+=[t('1x',66,271,20,INK,700),inputbox('8 GiB',116,233,213,51),inputbox('gp3',350,233,270,51,True),
     t('Root volume (Amazon EBS)',650,269,18,MUTED),
     t('Volume type',350,224,15,MUTED),t('Size',116,224,15,MUTED),
     t('Encryption',68,371,18,INK,700),inputbox('Encrypted',68,387,446,48,True),
     t('Delete on termination',541,371,18,INK,700),inputbox('Yes',541,387,426,48,True),
     t('Add new volume',68,510,18,BLUE,700),
     box(67,565,1135,82,'#f1f8fd','#c3dfed',9),t('Before launch',91,599,18,INK,700),
     t('Review the Summary panel: AMI, instance type, firewall, storage, count and current charges.',91,627,17,MUTED)]
 return p

def chrome(title):
 return ['<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1006" viewBox="0 0 1920 1006">',box(0,0,1920,1006,BG,BG,0),box(0,0,1920,64,'#232f3e','#232f3e',0),t('aws',28,43,31,ORANGE,700),t('☰',128,42,22,'#fff'),inputbox('⌕  Search services, features, blogs, docs',178,14,550,36),t('US East (N. Virginia)',1530,42,17,'#fff'),box(0,64,242,942,CARD,LINE,0),t('Amazon EC2',26,111,23,INK,700),t('EC2 Dashboard',27,171,18,MUTED),t('Instances',27,222,18,BLUE,700),t('Instance Types',27,272,18,MUTED),t('Launch Templates',27,322,18,MUTED),t('Volumes',27,372,18,MUTED),t(title,280,126,30,INK,700)]
def instances():
 p=chrome('Instances (0)');p+=[button('Launch instances',1640,96,220,True),inputbox('⌕  Find instances',280,177,680),button('Refresh',1702,177,150),
     box(280,253,1578,57,'#edf3f7','#d7e0e8',0)]
 for x,label in [(305,'Name'),(590,'Instance ID'),(880,'Instance state'),(1150,'Instance type'),(1435,'Status check')]:p.append(t(label,x,289,16,INK,700))
 p+=[t('No instances found in this Region. Choose Launch instances.',548,420,21,MUTED)]
 return p

def details():
 p=chrome('Instances (1)');p+=[button('Connect',1430,95,156),button('Instance state  ⌄',1608,95,252),
     box(280,174,1580,70,'#eaf7fc','#a5d2e8',6),t('☑  architect-console-lab',310,216,18,BLUE,700),t('i-0labexample01',725,216,18,BLUE),t('Running',1190,216,18,'#147d53',700),t('2/2 checks passed',1495,216,18,'#147d53',700)]
 tabs=['Details','Security','Networking','Storage','Status checks','Monitoring','Tags'];x=310
 for tab in tabs:p+=[t(tab,x,305,17,BLUE if tab=='Details' else MUTED,700 if tab=='Details' else 400)];x+=max(125,len(tab)*13+40)
 p+=[box(280,340,1580,585,CARD,LINE,12),t('Instance summary',310,386,24,INK,700)]
 for i,(k,v) in enumerate([('Instance ID','i-0labexample01'),('Instance state','Running'),('Public IPv4 address','198.51.100.24 (example)'),('Private IPv4 address','10.0.1.24 (example)'),('Instance type','t3.micro'),('VPC ID','Lab VPC'),('Security groups','Lab SSH group'),('Root volume','8 GiB gp3')]):
  x=310+(i%2)*745;y=442+(i//2)*108;p += [t(k,x,y,16,MUTED),t(v,x,y+31,19,BLUE if i==0 else INK,700)]
 return p

def connect():
 p=chrome('Connect to instance');p+=[t('i-0labexample01 (architect-console-lab)',280,173,19,MUTED),box(280,215,1580,684,CARD,LINE,12)]
 for i,(x,label) in enumerate([(308,'EC2 Instance Connect'),(656,'Session Manager'),(971,'SSH client'),(1227,'EC2 serial console')]):p+=[box(x,247,295,65,'#eaf7fc' if i==0 else CARD,BLUE if i==0 else LINE,7,2 if i==0 else 1),t(label,x+16,285,18,BLUE if i==0 else INK,700)]
 p+=[t('Connect using a public IP address',310,390,23,INK,700),t('◉  Public IP address  198.51.100.24',310,442,18,INK),
     t('Username',310,514,17,INK,700),inputbox('ec2-user',310,534,600,54),
     t('The instance must be reachable and support EC2 Instance Connect.',310,652,17,MUTED),button('Connect',1620,822,208,True)]
 return p

def terminate():
 p=details();p.insert(-1,box(0,64,1920,942,'#dce5ea','#dce5ea',0))
 p+=[box(482,243,956,523,CARD,LINE,16),t('Terminate (delete) instance',526,306,28,INK,700),
     lines('Termination is permanent. Back up any data that you need to keep before terminating this instance.',526,357,71,19,MUTED),
     box(526,433,868,138,'#fff8e7','#dfb45c',9),t('Data warning',550,468,19,INK,700),
     lines('Root EBS volumes with Delete on termination set to Yes are deleted. Review remaining snapshots, volumes and IP allocations.',550,502,83,18,MUTED),
     button('Cancel',1015,665,140),button('Terminate (delete)',1180,665,214,True)]
 return p

views=[instances,name_ami,type_key,lambda:network(False),lambda:network(True),storage,details,connect,terminate]
for n,render in enumerate(views,1):
 p=render();p.append('</svg>')
 (out/f'ec2-first-instance-{n:02d}.svg').write_text(''.join(p))
print('Rendered 9 EC2 console views')
