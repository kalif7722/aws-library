#!/usr/bin/env python3
"""Render native Cloud Run visual. Sources:
https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run
https://docs.cloud.google.com/run/docs/deploying
https://docs.cloud.google.com/run/docs/configuring/services/ingress
https://docs.cloud.google.com/run/docs/configuring/billing-settings
"""
from gcp_el10_canvas import *

OUT = ROOT / "public/gcp/app-hosting/gcp-cloud-run.webp"
d.rectangle((0,0,W,87),fill=NAVY)
icon=ROOT / "public/assets/gcp-icons/core/cloud-run.svg"
with tempfile.TemporaryDirectory() as temporary:
    png=Path(temporary)/"icon.png"
    subprocess.run(["inkscape",str(icon),"--export-type=png",f"--export-filename={png}","--export-width=62","--export-height=62"],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    with Image.open(png) as official_icon:im.paste(official_icon,(22,12),official_icon)
text(96,12,"GOOGLE CLOUD",25,"white",True)
text(96,48,"Visual service guide · Application hosting",16,"#B9DBFF")
text(1010,18,"Cloud Run",36,"white",True,"mt")
text(1010,60,"Deploy code; configure identity, traffic, scaling and the data boundary.",17,"#D8E9FD",anchor="mt")

x,y=panel(1,"Service introduction",0,0)
pill(x,y,"Managed app platform",BLUE,298,53,20)
y+=66
y=paragraph(x,y,"Cloud Run runs containers or source deployments without operating the underlying VM fleet.",298,17)
bullets(x,y+10,["Services respond to requests.","Jobs execute tasks to completion.","Worker pools handle continuous work."],298,15)

x,y=panel(2,"Three workload shapes",1,0)
for i,(a,b,c) in enumerate([("Service","HTTP requests and events",BLUE),("Job","Finite tasks and batches",ORANGE),("Worker pool","Continuous background work",PURPLE)]):
    yy=y+i*85
    d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+10,yy+11,a,18,c,True);text(x+10,yy+42,b,14,INK)

x,y=panel(3,"Request path",2,0)
flow(x,y,["Client","Service URL","Revision"],[BLUE,PURPLE,GREEN]);y+=90
pill(x+11,y,"Container instance",BLUE,276,51,17)
arrow(x+230,y-17,x+149,y-1)
bullets(x,y+75,["Platform routes traffic to a revision.","Instance returns a response; persist state externally."],298,15)

x,y=panel(4,"Build and deploy",3,0)
flow(x,y,["Source","Cloud Build","Artifact Registry"],[PURPLE,BLUE,ORANGE]);y+=101
pill(x+18,y,"Deploy container image",GREEN,262,50,16)
arrow(x+149,y-22,x+149,y-2)
bullets(x,y+80,["Image digest identifies deployed content.","Deploying a change creates an immutable revision."],298,15)

x,y=panel(5,"Revisions and traffic",4,0)
pill(x+12,y,"Service endpoint",BLUE,274,48,17)
arrow(x+149,y+49,x+70,y+77);arrow(x+149,y+49,x+229,y+77)
pill(x,y+83,"Revision A · 90%",GREEN,139,74,14)
pill(x+159,y+83,"Revision B · 10%",PURPLE,139,74,14)
bullets(x,y+178,["Split traffic for a gradual release.","Rollback by changing traffic allocation."],298,15)

x,y=panel(6,"Scaling and concurrency",5,0)
flow(x,y,["Requests","Concurrency","Instances"],[BLUE,ORANGE,GREEN]);y+=94
for i,(a,b) in enumerate([("Min instances","Lower cold-start exposure"),("Max instances","Bound downstream demand")]):
    yy=y+i*71;d.rounded_rectangle((x,yy,x+298,yy+63),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+8,a,16,BLUE,True);text(x+10,yy+36,b,14,INK)
paragraph(x,y+145,"Tune latency vs. database load.",298,15,ORANGE,True)

x,y=panel(7,"Ingress versus IAM",0,1)
pill(x,y,"Ingress control",BLUE,298,44,16)
paragraph(x,y+53,"Where requests may enter: all, internal, or through supported load-balancer paths.",298,15)
pill(x,y+133,"Invocation authorization",GREEN,298,44,16)
paragraph(x,y+185,"Who may call the service: public access only when intended; otherwise grant invoker access.",298,15)

x,y=panel(8,"Service identity",1,1)
flow(x,y,["Revision","Service account","Google APIs"],[BLUE,PURPLE,GREEN]);y+=100
bullets(x,y,["Runtime identity is separate from deployer identity.","Grant the runtime service account only needed roles.","Avoid long-lived service account keys."],298,15)

x,y=panel(9,"Secrets and config",2,1)
flow(x,y,["Secret Manager","Revision config","Container"],[PURPLE,BLUE,GREEN]);y+=94
bullets(x,y,["Reference secret versions via integration.","Keep secrets out of image layers and source.","Plan rotation and revision behavior."],298,15)

x,y=panel(10,"Private data paths",3,1)
flow(x,y,["Cloud Run","VPC egress","Cloud SQL"],[BLUE,PURPLE,GREEN]);y+=93
bullets(x,y,["Configure private networking as required.","Choose connection method and authentication.","Bound DB connection pools as instances scale."],298,15)

x,y=panel(11,"Durable state",4,1)
pill(x,y,"Ephemeral local filesystem",ORANGE,298,52,16)
arrow(x+149,y+55,x+149,y+77)
pill(x,y+85,"Cloud Storage",BLUE,139,72,13)
pill(x+159,y+85,"Cloud SQL",GREEN,139,72,13)
bullets(x,y+177,["Store objects and records outside instances.","Never rely on a local write after replacement."],298,15)

x,y=panel(12,"Event delivery",5,1)
flow(x,y,["Pub/Sub","Eventarc","Cloud Run"],[ORANGE,PURPLE,BLUE]);y+=99
bullets(x,y,["Check trigger type and retry behavior.","Make handlers safe for repeated delivery.","Use IAM to protect the receiving service."],298,15)

x,y=panel(13,"Jobs for finite work",0,2)
flow(x,y,["Trigger","Job execution","Task result"],[BLUE,ORANGE,GREEN]);y+=101
bullets(x,y,["Use jobs for scheduled or batch tasks.","Configure task retries and parallelism.","Check exit status, logs and external output."],298,15)

x,y=panel(14,"Availability design",1,2)
pill(x,y,"Regional service",BLUE,298,50,18)
arrow(x+149,y+52,x+149,y+79)
pill(x,y+84,"Autoscaled instances",GREEN,298,50,16)
bullets(x,y+155,["Design multi-region routing separately.","Keep application data resilient too.","Test downstream failure and retry policy."],298,15)

x,y=panel(15,"Observe the service",2,2)
flow(x,y,["Requests","Logs / metrics","Alert"],[BLUE,PURPLE,ORANGE]);y+=101
bullets(x,y,["Watch latency, errors, instance count.","Correlate revisions with incident timelines.","Measure downstream saturation and retries."],298,15)

x,y=panel(16,"Cost factors",3,2)
for i,(a,b) in enumerate([("Execution","CPU, memory, active time"),("Configuration","Billing mode and min instances"),("Dependencies","Build, registry, database"),("Transfer","Network egress and traffic")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,15,BLUE,True);text(x+10,yy+33,b,13,INK)

x,y=panel(17,"When to use / caution",4,2)
bullets(x,y,["Fits APIs, web apps, events, and jobs.","Use GKE if Kubernetes controls are essential.","Use Compute Engine for guest OS control.","Watch request timeout and startup latency.","Protect downstream systems from burst scale."],298,15,6)

x,y=panel(18,"Learning workflow",5,2)
for i,(a,b) in enumerate([("1  Package","Image or source"),("2  Secure","IAM and ingress"),("3  Deploy","Revision and traffic"),("4  Connect","Secrets and data"),("5  Verify","Logs, cost, rollback")]):
    yy=y+i*51;d.rounded_rectangle((x,yy,x+298,yy+45),radius=8,fill=PALE,outline=BORDER)
    text(x+9,yy+11,a,15,BLUE,True);text(x+111,yy+12,b,13,INK)

d.rectangle((0,1122,W,H),fill=NAVY)
text(18,1137,"Study guide · Illustrated architecture, not a live console capture",14,"white",anchor="lm")
text(W-18,1137,"Source: Google Cloud Run documentation  •  Reviewed 2026-09-26",14,"white",anchor="rm")
OUT.parent.mkdir(parents=True,exist_ok=True)
im.save(OUT,"WEBP",quality=94,method=6)
print(f"{OUT}: {im.size[0]}x{im.size[1]}")
