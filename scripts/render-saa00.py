"""Render original SAA-C03 foundation visuals in the SAP course visual language."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

OUT = Path(__file__).resolve().parents[1] / 'public/course-visuals/saa-c03/module-00'
OUT.mkdir(parents=True, exist_ok=True)
W, H = 2048, 1152
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

slides = [
 dict(title='Your SAA architecture journey', subtitle='Learn to choose an architecture from constraints, not service names.',
      cards=[('01  SECURE','Who can reach the workload?','Identity, network boundaries, encryption and data access.'),('02  RESILIENT','What happens when a part fails?','Multiple AZs, loose coupling, backups and recovery.'),('03  FAST','Where is the bottleneck?','Scale compute, storage, data and network to demand.'),('04  EFFICIENT','What drives the bill?','Match capacity, purchase model and data movement to use.')],
      remember='Every design answer balances security, resilience, performance and cost.'),
 dict(title='Why teams use a cloud platform', subtitle='Choose a delivery model that matches the workload and operating responsibility.',
      cards=[('BUILD','Launch a web application','Compute, load balancing, DNS and data services work together.'),('SCALE','Respond to demand','Add capacity when traffic rises and release it when demand falls.'),('PROTECT','Preserve business data','Access controls, encryption and recovery are design decisions.'),('ANALYZE','Turn data into insight','Ingestion, storage and query tools fit different data patterns.')],
      remember='A use case is an architecture: start with the business constraint.'),
 dict(title='From infrastructure to services', subtitle='An original conceptual timeline: capacity becomes programmable and composable.',
      cards=[('EARLY WEB','Own the hardware','Procure servers, plan peak capacity and operate the stack.'),('CLOUD BUILDING BLOCKS','Provision on demand','Compute, object storage and messaging become service choices.'),('MANAGED SERVICES','Reduce undifferentiated work','Databases, scaling and serverless shift more operations to AWS.')],
      remember='The exam tests service selection and tradeoffs, not company history.'),
 dict(title='Region, AZ and edge: three boundaries', subtitle='Place each component at the boundary that serves its purpose.',
      cards=[('REGION','Geographic deployment','Most resources are created in a selected Region.'),('AVAILABILITY ZONE','Isolated location in a Region','Spread critical compute across AZs to reduce a single-zone failure.'),('EDGE LOCATION','Close to viewers','CloudFront can serve cached content nearer users.')],
      remember='A Region choice does not automatically make a workload multi-AZ.'),
 dict(title='Choose a Region from requirements', subtitle='Four checks before deployment; revisit them for data and disaster recovery.',
      cards=[('DATA','Location and compliance','Identify where data may be stored and processed.'),('USERS','Latency and proximity','Measure where requests originate and where backends run.'),('FEATURES','Service availability','Confirm required services, instance types and quotas.'),('COST','Total architecture','Compare service pricing and inter-Region data movement.')],
      remember='Select a Region for the workload, not simply the nearest label on a map.'),
 dict(title='A resilient application spans AZs', subtitle='One Region can contain multiple isolated failure locations.',
      cards=[('AZ A','Healthy application capacity','A target group sends traffic to working targets.'),('AZ B','Independent application capacity','A second zone carries traffic if AZ A is unavailable.'),('DATA TIER','Choose its own resilience model','For example, a managed database can use Multi-AZ failover.')],
      remember='A load balancer needs healthy capacity in more than one AZ.'),
 dict(title='The edge shortens the content path', subtitle='A viewer requests content through a distribution and its origin.',
      cards=[('VIEWER','Requests an object','DNS directs the viewer toward the distribution.'),('EDGE','Checks the cache','A hit is served nearby; a miss travels to the origin.'),('ORIGIN','Supplies the source','S3 or an HTTP origin returns content when needed.')],
      remember='Caching can improve latency, but the origin and cache policy still matter.'),
 dict(title='Global entry, regional resources', subtitle='Do not confuse a service endpoint with the placement of workload resources.',
      cards=[('GLOBAL ENTRY','IAM · Route 53 · CloudFront','These services have global or partition-wide control surfaces.'),('REGIONAL WORKLOAD','EC2 · RDS · Lambda','Select a Region and inspect resource availability there.'),('SCOPE MATTERS','WAF and certificates','CloudFront and regional integrations have different configuration scopes.')],
      remember='Always check the Region and scope before changing a resource.'),
 dict(title='Read the request path before naming services', subtitle='A simple web workload previews the decisions used throughout SAA.',
      cards=[('ENTRY','DNS and edge','Where does the user enter? Is content cached?'),('APPLICATION','Load balancer and compute','How is traffic distributed and capacity scaled?'),('DATA','Storage and database','What persists, who can read it, and how does it recover?'),('OPERATIONS','Signals and cost','What proves health, and what changes with demand?')],
      remember='Draw the flow, mark the failure boundary, then choose services.')
]

def font(size, bold=False): return ImageFont.truetype(BOLD if bold else FONT, size)

def wrap(draw, text, f, width):
    words=text.split(); lines=[]; line=''
    for word in words:
        trial=f'{line} {word}'.strip()
        if draw.textlength(trial,font=f)>width and line: lines.append(line);line=word
        else: line=trial
    if line: lines.append(line)
    return lines

def rr(d, box, radius, fill, outline=None, width=1): d.rounded_rectangle(box,radius=radius,fill=fill,outline=outline,width=width)

def mark(d,cx,cy,kind):
    # Original diagram marks; no third-party icon artwork is embedded.
    d.ellipse((cx-70,cy-70,cx+70,cy+70),fill='#174A8D',outline='#8D64FF',width=9)
    k=kind.lower()
    if any(w in k for w in ('region','world','geographic','users','viewer','edge','global','location')):
        d.ellipse((cx-44,cy-44,cx+44,cy+44),outline='#5CEAFF',width=7)
        d.arc((cx-24,cy-44,cx+24,cy+44),80,280,fill='#FFE36B',width=6)
        d.arc((cx-24,cy-44,cx+24,cy+44),260,100,fill='#FFE36B',width=6)
        d.line((cx-42,cy,cx+42,cy),fill='#5CEAFF',width=5)
    elif any(w in k for w in ('cost','efficient','pricing','bill','fast','scale')):
        for j,h in enumerate((36,62,84)):
            x=cx-43+j*34;d.rounded_rectangle((x,cy+43-h,x+22,cy+43),radius=5,fill=('#2CE3FF','#8E72FF','#FFD442')[j])
    elif any(w in k for w in ('az','zone','capacity','application','compute','build','managed')):
        for j in range(3):
            x=cx-48+j*34;y=cy-31+(j%2)*22
            rr(d,(x,y,x+28,y+55),6,'#265CB7','#75E9FF',3)
        d.line((cx-39,cy+41,cx+45,cy+41),fill='#FFD442',width=6)
    elif any(w in k for w in ('data','protect','source','origin','storage','database')):
        rr(d,(cx-43,cy-30,cx+43,cy+43),9,'#3B56AD','#60EAFF',5)
        d.ellipse((cx-43,cy-43,cx+43,cy-10),fill='#625EEA',outline='#B6A2FF',width=4)
        d.arc((cx-43,cy+11,cx+43,cy+43),0,180,fill='#76EEFF',width=4)
    elif any(w in k for w in ('secure','identity','access','protect')):
        d.polygon([(cx,cy-47),(cx+44,cy-28),(cx+36,cy+28),(cx,cy+50),(cx-36,cy+28),(cx-44,cy-28)],fill='#2356A9',outline='#62E8FF')
        d.line((cx-23,cy,cx-5,cy+17,cx+27,cy-22),fill='#FFD442',width=8)
    else:
        d.ellipse((cx-36,cy-36,cx+36,cy+36),outline='#5CEAFF',width=8)
        d.polygon([(cx-9,cy-28),(cx+28,cy),(cx-9,cy+28)],fill='#FFD442')

for idx,s in enumerate(slides,1):
    im=Image.new('RGB',(W,H)); pix=im.load()
    for y in range(H):
        for x in range(W):
            glow=max(0,1-math.hypot(x-W*.77,y-H*.25)/(W*.73))
            pix[x,y]=(int(3+7*glow),int(17+15*glow+y/H*3),int(43+23*glow))
    d=ImageDraw.Draw(im)
    d.text((52,24),f'SAA-C03  |  MODULE 00  |  VISUAL {idx:02d}',font=font(27),fill='#D1E4FF')
    d.text((52,76),s['title'],font=font(74,True),fill='#FFFFFF',stroke_width=1,stroke_fill='#283B63')
    d.text((56,171),s['subtitle'],font=font(31),fill='#BBD4EF')
    cards=s['cards'];n=len(cards);gap=24;left=45;right=45;top=264;bottom=940
    cardw=(W-left-right-gap*(n-1))//n
    for j,(kicker,title,body) in enumerate(cards):
        x=left+j*(cardw+gap);x2=x+cardw
        shadow=Image.new('RGBA',(cardw+24,700),(0,0,0,0)); sd=ImageDraw.Draw(shadow)
        sd.rounded_rectangle((12,12,cardw+8,690),radius=27,fill=(0,0,0,130))
        shadow=shadow.filter(ImageFilter.GaussianBlur(14));im.paste(shadow,(x-12,top-10),shadow);d=ImageDraw.Draw(im)
        rr(d,(x,top,x2,bottom),28,'#082A50','#25DFFF',4)
        rr(d,(x+15,top+16,x2-15,top+92),17,'#174E87','#447FD7',2)
        d.text((x+31,top+34),kicker,font=font(25,True),fill='#70E8FF')
        cx=x+cardw//2;cy=top+220
        mark(d,cx,cy,kicker)
        yy=top+326
        for line in wrap(d,title,font(37,True),cardw-58):
            d.text((x+29,yy),line,font=font(37,True),fill='#FFFFFF');yy+=49
        yy+=25
        for line in wrap(d,body,font(29),cardw-60):
            d.text((x+30,yy),line,font=font(29),fill='#D9E7F8');yy+=43
        d.line((x+30,bottom-76,x2-30,bottom-76),fill='#38A8E0',width=2)
        d.text((x+30,bottom-61),'ARCHITECTURE CHOICE',font=font(19,True),fill='#8DEAFF')
        if idx in (3,7,9) and j<n-1:
            ax=x2+4;ay=top+218
            d.polygon([(ax,ay-16),(ax+18,ay),(ax,ay+16)],fill='#2BE3FF')
    rr(d,(32,994,W-32,1121),23,'#FFD12D','#FFF2A9',4)
    d.text((62,1020),'REMEMBER',font=font(40,True),fill='#17213A')
    lines=wrap(d,s['remember'],font(33,True),W-430)
    for j,line in enumerate(lines):d.text((353,1018+j*42),line,font=font(33,True),fill='#18233D')
    im.save(OUT/f'slide-{idx:02d}.webp','WEBP',quality=94,method=6)
print(f'Rendered {len(slides)} visuals to {OUT}')
