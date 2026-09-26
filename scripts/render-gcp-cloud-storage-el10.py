#!/usr/bin/env python3
"""Render native Cloud Storage visual. Official references:
https://docs.cloud.google.com/storage/docs/introduction
https://docs.cloud.google.com/storage/docs/bucket-lock
https://docs.cloud.google.com/storage/docs/soft-delete
https://docs.cloud.google.com/storage/docs/storage-classes
"""
from gcp_el10_canvas import *

OUT=ROOT/"public/gcp/storage/gcp-cloud-storage.webp"
d.rectangle((0,0,W,87),fill=NAVY)
icon=ROOT/"public/assets/gcp-icons/core/cloud-storage.svg"
with tempfile.TemporaryDirectory() as temporary:
    png=Path(temporary)/"icon.png"
    subprocess.run(["inkscape",str(icon),"--export-type=png",f"--export-filename={png}","--export-width=62","--export-height=62"],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    with Image.open(png) as official_icon:im.paste(official_icon,(22,12),official_icon)
text(96,12,"GOOGLE CLOUD",25,"white",True)
text(96,48,"Visual service guide · Storage",16,"#B9DBFF")
text(1010,18,"Cloud Storage",36,"white",True,"mt")
text(1010,60,"Protect and retrieve objects with deliberate location, access and lifecycle choices.",17,"#D8E9FD",anchor="mt")

x,y=panel(1,"Service introduction",0,0)
pill(x,y,"Managed object storage",BLUE,298,53,20);y+=66
y=paragraph(x,y,"Store objects such as media, backups and datasets in buckets; applications access them through APIs.",298,17)
bullets(x,y+10,["Objects are data plus metadata.","Buckets hold objects and shared settings.","No attached VM filesystem is required."],298,15)

x,y=panel(2,"Resource model",1,0)
for i,(a,c) in enumerate([("Project",BLUE),("Bucket",PURPLE),("Object",GREEN)]):
    pill(x+35,y+i*77,a,c,228,50,18)
    if i<2:arrow(x+149,y+i*77+52,x+149,y+(i+1)*77-3)
bullets(x,y+239,["Choose location and access at bucket scope."],298,15)

x,y=panel(3,"Object request flow",2,0)
flow(x,y,["Producer","Bucket","Consumer"],[BLUE,PURPLE,GREEN]);y+=102
bullets(x,y,["Producer uploads bytes and metadata.","IAM or signed access controls the request.","Consumers download an object by name."],298,15)

x,y=panel(4,"Storage classes",3,0)
for i,(a,b,c) in enumerate([("Standard","Frequent access",BLUE),("Nearline","Infrequent access",GREEN),("Coldline","Rare access",PURPLE),("Archive","Long-term archive",ORANGE)]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,16,c,True);text(x+10,yy+33,b,14,INK)

x,y=panel(5,"Location choices",4,0)
for i,(a,b,c) in enumerate([("Region","Single region",BLUE),("Dual-region","Two specified regions",PURPLE),("Multi-region","Broad geographic area",GREEN)]):
    yy=y+i*85;d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+10,yy+10,a,17,c,True);text(x+10,yy+42,b,14,INK)

x,y=panel(6,"Availability design",5,0)
pill(x,y,"Location selection",BLUE,298,49,17)
arrow(x+149,y+50,x+149,y+77)
pill(x,y+83,"Data placement",PURPLE,298,49,17)
bullets(x,y+152,["Choose location for users and workloads.","Replication scope depends on location type.","Recovery still needs a tested design."],298,15)

x,y=panel(7,"Lifecycle rules",0,1)
pill(x,y,"Match condition",BLUE,298,52,17)
arrow(x+149,y+53,x+70,y+78);arrow(x+149,y+53,x+229,y+78)
pill(x,y+83,"Change class",PURPLE,139,73,13)
pill(x+159,y+83,"Delete",ORANGE,139,73,14)
y+=175
bullets(x,y,["Automate transitions or expiration.","Check retention and recovery first."],298,15)

x,y=panel(8,"Protection controls",1,1)
for i,(a,b,c) in enumerate([("Versioning","Keep prior generations",BLUE),("Soft delete","Restore recently deleted data",GREEN),("Retention","Enforce keep duration",ORANGE)]):
    yy=y+i*85;d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+10,yy+11,a,17,c,True);text(x+10,yy+42,b,14,INK)

x,y=panel(9,"IAM boundaries",2,1)
flow(x,y,["Principal","IAM role","Bucket / object"],[BLUE,PURPLE,GREEN]);y+=102
bullets(x,y,["Prefer uniform bucket-level access.","Separate producer and reader permissions.","Test access from the real runtime identity."],298,15)

x,y=panel(10,"Prevent exposure",3,1)
pill(x,y,"Public access prevention",ORANGE,298,51,17)
pill(x,y+68,"Least-privilege IAM",GREEN,298,51,17)
bullets(x,y+143,["Set a private default for sensitive data.","Use short-lived signed access as needed.","Review grants and object naming patterns."],298,15)

x,y=panel(11,"Encrypt and retain",4,1)
pill(x,y,"Encryption at rest",BLUE,298,50,17)
arrow(x+149,y+52,x+149,y+75)
pill(x,y+80,"Google-managed or CMEK",PURPLE,298,50,15)
bullets(x,y+151,["Select key controls for the data policy.","Retention lock can limit later deletion.","Confirm recovery and key availability."],298,15)

x,y=panel(12,"Access methods",5,1)
for i,(a,b) in enumerate([("Client libraries","App upload and download"),("gcloud CLI","Operational transfers"),("Console","Inspect buckets and objects"),("Signed URLs","Delegated time-limited access")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,15,BLUE,True);text(x+10,yy+33,b,13,INK)

x,y=panel(13,"Events and analytics",0,2)
flow(x,y,["Object change","Eventarc","Cloud Run"],[BLUE,PURPLE,GREEN]);y+=101
bullets(x,y,["Trigger processing after new objects.","Design consumers for retry and duplicates.","Use BigQuery for analysis of object data."],298,15)

x,y=panel(14,"Monitor and audit",1,2)
flow(x,y,["Bucket","Metrics / logs","Alert"],[BLUE,PURPLE,ORANGE]);y+=101
bullets(x,y,["Watch storage growth and request patterns.","Use audit logs where required.","Alert on unexpected access or cost changes."],298,15)

x,y=panel(15,"Cost factors",2,2)
for i,(a,b) in enumerate([("Capacity","Bytes and class"),("Operations","Requests and management"),("Retrieval","Class-dependent reads"),("Transfer","Outbound network and location")]):
    yy=y+i*65;d.rounded_rectangle((x,yy,x+298,yy+57),radius=9,fill=PALE,outline=BORDER)
    text(x+10,yy+7,a,15,BLUE,True);text(x+10,yy+33,b,13,INK)

x,y=panel(16,"Application fit",3,2)
for i,(a,b,c) in enumerate([("Cloud Storage","Object assets and backups",BLUE),("Filestore","Shared file-system semantics",GREEN),("Block disk","VM-attached application data",PURPLE)]):
    yy=y+i*85;d.rounded_rectangle((x,yy,x+298,yy+76),radius=9,fill=PALE,outline=c,width=2)
    text(x+10,yy+11,a,17,c,True);text(x+10,yy+42,b,14,INK)

x,y=panel(17,"Watch points",4,2)
bullets(x,y,["An object bucket is not a POSIX disk.","Archive reads can incur retrieval cost.","Retention lock changes deletion ability.","Public access needs an explicit decision.","Test restores before claiming recoverability."],298,15,6)

x,y=panel(18,"Design workflow",5,2)
for i,(a,b) in enumerate([("1  Locate","Region and users"),("2  Class","Read frequency"),("3  Protect","IAM and retention"),("4  Connect","Apps and events"),("5  Verify","Restore and cost")]):
    yy=y+i*51;d.rounded_rectangle((x,yy,x+298,yy+45),radius=8,fill=PALE,outline=BORDER)
    text(x+10,yy+11,a,15,BLUE,True);text(x+111,yy+12,b,13,INK)

d.rectangle((0,1122,W,H),fill=NAVY)
text(18,1137,"Study guide · Illustrated architecture, not a live console capture",14,"white",anchor="lm")
text(W-18,1137,"Source: Google Cloud Storage documentation  •  Reviewed 2026-09-26",14,"white",anchor="rm")
OUT.parent.mkdir(parents=True,exist_ok=True)
im.save(OUT,"WEBP",quality=94,method=6)
print(f"{OUT}: {im.size[0]}x{im.size[1]}")
