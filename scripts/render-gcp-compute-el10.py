#!/usr/bin/env python3
"""Render a reviewable, native 2048×1152 Compute Engine teaching visual.

Source facts: https://docs.cloud.google.com/compute/docs/overview
https://docs.cloud.google.com/compute/docs/instance-groups
https://docs.cloud.google.com/compute/docs/disks
https://docs.cloud.google.com/compute/docs/access
This diagram is an original learning aid, not a Cloud Console screenshot.
"""

from gcp_el10_canvas import *
OUT = ROOT / "public/gcp/compute/gcp-compute-engine.webp"

# Header and learning intent
d.rectangle((0,0,W,87),fill=NAVY)
icon = ROOT / "public/assets/gcp-icons/core/compute-engine.svg"
with tempfile.TemporaryDirectory() as temporary:
    rendered_icon = Path(temporary) / "icon.png"
    subprocess.run(["inkscape", str(icon), "--export-type=png", f"--export-filename={rendered_icon}",
                    "--export-width=62", "--export-height=62"], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    with Image.open(rendered_icon) as official_icon:
        im.paste(official_icon, (22, 12), official_icon)
text(96,12,"GOOGLE CLOUD",25,"white",True)
text(96,48,"Visual service guide · Compute",16,"#B9DBFF")
text(1010,18,"Compute Engine",36,"white",True,"mt")
text(1010,60,"Control the VM; design the fleet, network, identity, data and recovery.",17,"#D8E9FD",anchor="mt")

x,y=panel(1,"What it is",0,0)
pill(x,y,"Virtual machines",BLUE,296,52,21)
y+=68
y=paragraph(x,y,"Google Cloud runs the physical infrastructure. You choose the guest OS, machine shape and workload configuration.",298,17)
bullets(x,y+10,["Best when you need OS control or a VM-based application.","A VM by itself is one failure domain."],298)

x,y=panel(2,"Resource scope",1,0)
for i,(label,c) in enumerate([("Project",BLUE),("Region",PURPLE),("Zone",GREEN),("VM instance",ORANGE)]):
    pill(x+45,y+i*63,label,c,210,43,17)
    if i<3:arrow(x+150,y+i*63+44,x+150,y+(i+1)*63-4)
paragraph(x,y+227,"Regions contain zones; VM instances live in one zone.",298,15)

x,y=panel(3,"VM anatomy",2,0)
for i,(a,b) in enumerate([("Compute","Machine type: vCPU + memory"),("Boot","Image initializes boot disk"),("Network","Interface on a VPC subnet"),("Identity","Attached service account")]):
    yy=y+i*65
    d.rounded_rectangle((x,yy,x+298,yy+56),radius=9,fill=PALE,outline=BORDER)
    text(x+12,yy+7,a,16,BLUE,True)
    paragraph(x+107,yy+7,b,176,14)

x,y=panel(4,"Choose a machine",3,0)
for i,(a,b,c) in enumerate([("General", "Balanced applications",BLUE),("Compute", "CPU-intensive work",ORANGE),("Memory", "High RAM-to-vCPU",PURPLE),("Accelerator", "GPU-supported work",GREEN)]):
    yy=y+i*66
    d.rounded_rectangle((x,yy,x+298,yy+58),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,16,c,True);text(x+10,yy+32,b,14,INK)

x,y=panel(5,"Request architecture",4,0)
flow(x,y,["Client","Load balancer","Regional MIG"],[BLUE,PURPLE,GREEN]);y+=91
d.rounded_rectangle((x,y,x+139,y+74),radius=9,fill=PALE,outline=BLUE,width=2)
d.rounded_rectangle((x+159,y,x+298,y+74),radius=9,fill=PALE,outline=BLUE,width=2)
text(x+70,y+36,"Zone A: VMs",14,BLUE,True,"mm");text(x+229,y+36,"Zone B: VMs",14,BLUE,True,"mm")
arrow(x+149,y-18,x+70,y)
arrow(x+149,y-18,x+229,y)
bullets(x,y+95,["Load balancer routes to healthy backends.","Keep durable app data in a managed data store."],298,15)

x,y=panel(6,"VPC networking",5,0)
pill(x+25,y,"Global VPC network",BLUE,248,45,17);arrow(x+149,y+47,x+149,y+72)
pill(x+25,y+77,"Regional subnet",PURPLE,248,45,17);arrow(x+149,y+124,x+149,y+150)
pill(x+25,y+155,"Zonal VM interfaces",GREEN,248,45,17)
bullets(x,y+207,["Firewall policy governs traffic.","Prefer private admin paths."],298,15)

x,y=panel(7,"Storage choices",0,1)
for i,(a,b,c) in enumerate([("Persistent Disk", "Durable block disk",BLUE),("Hyperdisk", "Configurable block performance",PURPLE),("Local SSD", "Ephemeral; never sole copy",ORANGE),("Snapshots", "Point-in-time recovery input",GREEN)]):
    yy=y+i*66
    d.rounded_rectangle((x,yy,x+298,yy+58),radius=9,fill=PALE,outline=BORDER)
    text(x+11,yy+7,a,16,c,True);text(x+11,yy+33,b,14,INK)

x,y=panel(8,"Images and templates",1,1)
flow(x,y,["OS image","Boot disk","VM"],[PURPLE,BLUE,GREEN]);y+=94
pill(x+18,y,"Instance template",ORANGE,262,47,17);arrow(x+149,y+50,x+149,y+76)
pill(x+18,y+81,"Managed instance group",GREEN,262,47,15)
bullets(x,y+131,["Templates repeat VM settings.","Revise templates for rollout."],298,15)

x,y=panel(9,"Scale with a MIG",2,1)
flow(x,y,["Demand metric","Autoscaler","MIG size"],[BLUE,ORANGE,GREEN]);y+=94
for i,v in enumerate([2,4,6]):
    bx=x+22+i*91;d.rounded_rectangle((bx,y+76-v*10,bx+50,y+85),radius=5,fill=BLUE)
    text(bx+25,y+110,str(v)+" VMs",14,BLUE,True,"mm")
bullets(x,y+128,["Autoscaler adjusts the fleet.","One VM does not autoscale."],298,15)

x,y=panel(10,"Two health decisions",3,1)
pill(x,y,"Load balancing check",BLUE,298,44,15)
paragraph(x,y+53,"Routes new requests away from an unhealthy backend.",298,15)
pill(x,y+117,"MIG autohealing check",GREEN,298,44,15)
paragraph(x,y+170,"Detects a failed instance and recreates it from the template.",298,15)
paragraph(x,y+232,"Use distinct startup thresholds.",298,15,ORANGE,True)

x,y=panel(11,"Resilience design",4,1)
pill(x+14,y,"Regional MIG",GREEN,270,47,19);arrow(x+149,y+49,x+149,y+72)
pill(x,y+77,"Zone A: replicas",BLUE,137,72,14)
pill(x+161,y+77,"Zone B: replicas",PURPLE,137,72,14)
arrow(x+149,y+48,x+68,y+75); arrow(x+149,y+48,x+230,y+75)
bullets(x,y+167,["Distribute replicas across zones in a region.","App state needs its own backup or replication.","Test a zone loss and recovery path."],298,15)

x,y=panel(12,"Security and access",5,1)
for i,(a,b) in enumerate([("Service account","Least privilege for VM APIs"),("OS Login / IAP","Control administrative entry"),("Firewall rules","Permit only required ports"),("Disk protection","Encrypt; manage keys as needed")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+9,yy+7,a,15,BLUE,True);paragraph(x+9,yy+29,b,277,13)

x,y=panel(13,"Observe and operate",0,2)
flow(x,y,["VM + agent","Logs / metrics","Alert"],[BLUE,PURPLE,ORANGE]);y+=101
bullets(x,y,["Monitor CPU, disk, service errors and latency.","Separate infrastructure health from app health.","Keep guest patching and access logs in scope."],298,15)

x,y=panel(14,"VM lifecycle",1,2)
flow(x,y,["Create","Run","Stop","Delete"],[BLUE,GREEN,ORANGE,PURPLE]);y+=98
bullets(x,y,["Stopped VMs can still incur disk and reserved IP costs.","Deletion may remove auto-delete disks; check settings.","Snapshots and backups need restore tests."],298,15)

x,y=panel(15,"Cost drivers",2,2)
for i,(a,b) in enumerate([("Compute time","vCPU, RAM and machine type"),("Storage","Disk capacity, type, snapshots"),("Network","Outbound transfer, load balancing"),("Licensing","OS or software when applicable")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+11,yy+7,a,15,BLUE,True);text(x+11,yy+33,b,13,INK)

x,y=panel(16,"Application fit",3,2)
for i,(a,b,c) in enumerate([("Compute Engine","OS control / VM migration",BLUE),("Cloud Run","Managed request-driven app",GREEN),("GKE","Kubernetes API and operators",PURPLE)]):
    yy=y+i*85;d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+11,yy+11,a,17,c,True);paragraph(x+11,yy+40,b,273,14)

x,y=panel(17,"Watch points",4,2)
bullets(x,y,["Zonal VM is not multi-zone HA.","Quota and zonal capacity can block scaling.","Spot VMs can be interrupted.","Public IP and broad firewall rules expand exposure.","A snapshot alone is not a tested recovery plan."],298,15,7)

x,y=panel(18,"Design workflow",5,2)
for i,(a,b) in enumerate([("1  Size","Machine, zone, quotas"),("2  Secure","VPC, IAM, OS access"),("3  Deploy","Template, MIG, traffic"),("4  Observe","Logs, metrics, alerts"),("5  Recover","Backups and failure tests")]):
    yy=y+i*51;d.rounded_rectangle((x,yy,x+298,yy+45),radius=8,fill=PALE,outline=BORDER)
    text(x+9,yy+11,a,15,BLUE,True);text(x+111,yy+12,b,13,INK)

d.rectangle((0,1122,W,H),fill=NAVY)
text(18,1137,"Study guide · Illustrated architecture, not a live console capture",14,"white",anchor="lm")
text(W-18,1137,"Source: Google Cloud Compute Engine documentation  •  Reviewed 2026-09-26",14,"white",anchor="rm")
OUT.parent.mkdir(parents=True,exist_ok=True)
im.save(OUT,"WEBP",quality=94,method=6)
print(f"{OUT}: {im.size[0]}x{im.size[1]}")
