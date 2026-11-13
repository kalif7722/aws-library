#!/usr/bin/env python3
"""Render native GKE visual. Official references:
https://docs.cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview
https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview
https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler
"""
from gcp_el10_canvas import *

OUT=ROOT/"public/gcp/app-hosting/gcp-google-kubernetes-engine.webp"
d.rectangle((0,0,W,87),fill=NAVY)
icon=ROOT/"public/assets/gcp-icons/core/gke.svg"
with tempfile.TemporaryDirectory() as temporary:
    png=Path(temporary)/"icon.png"
    subprocess.run(["inkscape",str(icon),"--export-type=png",f"--export-filename={png}","--export-width=62","--export-height=62"],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    with Image.open(png) as official_icon:im.paste(official_icon,(22,12),official_icon)
text(96,12,"GOOGLE CLOUD",25,"white",True)
text(96,48,"Visual service guide · Application hosting",16,"#B9DBFF")
text(1010,18,"Google Kubernetes Engine",34,"white",True,"mt")
text(1010,60,"Schedule Pods; govern clusters, identities, network and application recovery.",17,"#D8E9FD",anchor="mt")

x,y=panel(1,"Service introduction",0,0)
pill(x,y,"Managed Kubernetes",BLUE,298,53,20);y+=66
y=paragraph(x,y,"GKE runs Kubernetes workloads with a Google-managed control plane and configurable workload compute.",298,17)
bullets(x,y+10,["Kubernetes APIs describe desired state.","Pods run container workloads.","Applications still need healthy replicas."],298,15)

x,y=panel(2,"Cluster anatomy",1,0)
pill(x,y,"Control plane",PURPLE,298,51,18)
arrow(x+149,y+53,x+149,y+75)
pill(x,y+83,"Workload compute",BLUE,298,51,18)
bullets(x,y+153,["API, scheduler and controllers reconcile state.","Pods run on managed cluster capacity.","Objects declare the target state."],298,15)

x,y=panel(3,"Deployment flow",2,0)
flow(x,y,["Registry","Deploy","Pods"],[ORANGE,BLUE,GREEN]);y+=101
bullets(x,y,["Publish an image with a stable version.","Controller creates requested replicas.","Scheduler places Pods on capacity."],298,15)

x,y=panel(4,"Service traffic",3,0)
flow(x,y,["Client","Gateway / LB","Service"],[BLUE,PURPLE,ORANGE]);y+=95
pill(x+20,y,"Ready Pods",GREEN,258,50,17)
arrow(x+230,y-17,x+149,y-1)
bullets(x,y+78,["Readiness decides which Pods serve traffic.","A Service supplies stable discovery."],298,15)

x,y=panel(5,"Autopilot or Standard",4,0)
for i,(a,b,c) in enumerate([("Autopilot","Google manages more node operations",GREEN),("Standard","More direct node and cluster control",PURPLE)]):
    yy=y+i*121;d.rounded_rectangle((x,yy,x+298,yy+111),radius=9,fill=PALE,outline=c,width=2)
    text(x+12,yy+13,a,20,c,True);paragraph(x+12,yy+49,b,270,15)

x,y=panel(6,"Kubernetes objects",5,0)
for i,(a,b) in enumerate([("Pod","One or more containers"),("Deployment","Replaceable desired replicas"),("Service","Stable endpoint and selection"),("Config / Secret","Runtime configuration")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+9,yy+7,a,15,BLUE,True);text(x+9,yy+33,b,13,INK)

x,y=panel(7,"VPC and IP planning",0,1)
flow(x,y,["VPC subnet","Pod ranges","Service ranges"],[BLUE,PURPLE,GREEN]);y+=103
bullets(x,y,["Plan secondary IP ranges in advance.","Use network policy for workload isolation.","Choose private cluster access deliberately."],298,15)

x,y=panel(8,"Workload identity",1,1)
flow(x,y,["Pod","K8s identity","Cloud API"],[BLUE,PURPLE,GREEN]);y+=103
bullets(x,y,["Federate workload identity for APIs.","Grant only the required cloud permissions.","Avoid exporting long-lived service account keys."],298,15)

x,y=panel(9,"IAM and RBAC",2,1)
pill(x,y,"Google Cloud IAM",BLUE,298,50,17)
paragraph(x,y+58,"Controls access to cloud and GKE management APIs.",298,15)
pill(x,y+126,"Kubernetes RBAC",PURPLE,298,50,17)
paragraph(x,y+186,"Controls actions on Kubernetes resources inside the cluster.",298,15)

x,y=panel(10,"Three probes",3,1)
for i,(a,b,c) in enumerate([("Startup","Give slow apps time to initialize",ORANGE),("Readiness","Gate request traffic",GREEN),("Liveness","Restart an unhealthy container",BLUE)]):
    yy=y+i*85;d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+10,yy+12,a,17,c,True);text(x+10,yy+43,b,13,INK)

x,y=panel(11,"Scale two layers",4,1)
pill(x,y,"Pod autoscaling",BLUE,298,50,17)
arrow(x+149,y+52,x+149,y+75)
pill(x,y+82,"Compute capacity",GREEN,298,50,17)
bullets(x,y+154,["HPA adjusts eligible workload replicas.","Cluster autoscaler adds node capacity.","Resource requests affect placement."],298,15)

x,y=panel(12,"Resilience",5,1)
pill(x,y,"Regional cluster",GREEN,298,50,18)
arrow(x+149,y+52,x+70,y+75);arrow(x+149,y+52,x+229,y+75)
pill(x,y+83,"Zone A Pods",BLUE,139,73,13)
pill(x+159,y+83,"Zone B Pods",PURPLE,139,73,13)
bullets(x,y+174,["Spread replicas and set disruption budgets.","Replicate application data separately."],298,15)

x,y=panel(13,"Persistent data",0,2)
flow(x,y,["Pod","PVC","Storage"],[BLUE,PURPLE,GREEN]);y+=100
bullets(x,y,["Use claims for persistent volumes.","A volume alone is not a backup.","Choose managed DBs for supported engines."],298,15)

x,y=panel(14,"Release and supply",1,2)
flow(x,y,["Build","Registry","Rollout"],[BLUE,ORANGE,GREEN]);y+=101
bullets(x,y,["Pin images and scan build artifacts.","Control rollout surge and disruption.","Use admission policies when required."],298,15)

x,y=panel(15,"Observe the cluster",2,2)
flow(x,y,["Pods / nodes","Logs / metrics","Alert"],[BLUE,PURPLE,ORANGE]);y+=101
bullets(x,y,["Watch failed Pods and restart patterns.","Correlate latency with deployments.","Alert on capacity and control-plane issues."],298,15)

x,y=panel(16,"Cost factors",3,2)
for i,(a,b) in enumerate([("Cluster mode","Management and capacity"),("Compute","Requested and used resources"),("Storage","Persistent volumes and backup"),("Network","Balancing and transfer")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,15,BLUE,True);text(x+10,yy+33,b,13,INK)

x,y=panel(17,"Fit and watch points",4,2)
bullets(x,y,["Fits workloads needing Kubernetes APIs.","Cloud Run suits simpler stateless services.","A running Pod may not be ready.","Autopilot limits some host-level control.","Plan upgrade and state recovery together."],298,15,6)

x,y=panel(18,"Design workflow",5,2)
for i,(a,b) in enumerate([("1  Choose","Mode and region"),("2  Plan","VPC and identity"),("3  Deploy","Images and resources"),("4  Scale","Probes and capacity"),("5  Verify","Traffic and recovery")]):
    yy=y+i*51;d.rounded_rectangle((x,yy,x+298,yy+45),radius=8,fill=PALE,outline=BORDER)
    text(x+10,yy+11,a,15,BLUE,True);text(x+111,yy+12,b,13,INK)

d.rectangle((0,1122,W,H),fill=NAVY)
text(18,1137,"Study guide · Illustrated architecture, not a live console capture",14,"white",anchor="lm")
text(W-18,1137,"Source: Google Kubernetes Engine documentation  •  Reviewed 2026-09-26",14,"white",anchor="rm")
OUT.parent.mkdir(parents=True,exist_ok=True)
im.save(OUT,"WEBP",quality=94,method=6)
print(f"{OUT}: {im.size[0]}x{im.size[1]}")
