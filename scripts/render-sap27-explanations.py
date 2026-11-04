#!/usr/bin/env python3
"""Render precise, original SAP-C03 architecture answer explanations."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT=Path(__file__).resolve().parents[1]
QUESTIONS=json.loads((ROOT/'app/components/sap-exam/questions.json').read_text())
OUT=ROOT/'public/course-visuals/sap-c03/module-27'
OUT.mkdir(parents=True,exist_ok=True)
REG=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',36)
SMALL=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',28)
TINY=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',24)
BOLD=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',42)
TITLE=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',58)
DOMAIN={'1':'Cloud architecture','2':'Security & governance','3':'Cost optimization','4':'Resilience & migration','5':'Operational excellence'}

def wrap(draw,text,font,maxw):
    lines=[]; cur=''
    for word in text.split():
        candidate=(cur+' '+word).strip()
        if cur and draw.textlength(candidate,font=font)>maxw:
            lines.append(cur);cur=word
        else:cur=candidate
    if cur:lines.append(cur)
    return lines

def write(draw,text,xy,font,fill,maxw,lineh,limit=None):
    lines=wrap(draw,text,font,maxw)
    if limit and len(lines)>limit:
        lines=lines[:limit]
        while draw.textlength(lines[-1]+'…',font=font)>maxw:lines[-1]=lines[-1][:-1]
        lines[-1]+='…'
    x,y=xy
    for line in lines:draw.text((x,y),line,font=font,fill=fill);y+=lineh
    return y

for idx,q in enumerate(QUESTIONS,1):
    im=Image.new('RGB',(2048,1152),(6,17,41));d=ImageDraw.Draw(im)
    for y in range(1152):
        d.line((0,y,2048,y),fill=(6+int(y/1152*3),17+int(y/1152*11),41+int(y/1152*16)))
    glow=Image.new('RGBA',im.size);g=ImageDraw.Draw(glow)
    g.ellipse((1420,-320,2320,510),fill=(48,89,224,85));g.ellipse((-420,510,390,1330),fill=(0,205,244,45))
    im=Image.alpha_composite(im.convert('RGBA'),glow.filter(ImageFilter.GaussianBlur(125)))
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((36,34,2012,1118),radius=24,outline=(81,177,225,170),width=2,fill=(11,28,58,90))
    d.text((76,65),f'SAP-C03  |  MODULE 27  |  QUESTION {idx:02d} / 28',font=SMALL,fill='#8de6fa')
    d.text((1500,65),'DOMAIN '+q['domain']+' · '+DOMAIN[q['domain']],font=TINY,fill='#d9e8ff')
    title_lines=wrap(d,q['concept'],TITLE,1850)
    for j,line in enumerate(title_lines[:2]):d.text((76,118+j*70),line,font=TITLE,fill='#ffffff')
    y=255 if len(title_lines)>1 else 215
    answer=', '.join(chr(65+n) for n in q['correct'])
    d.rounded_rectangle((76,y,1972,y+155),radius=16,fill=(21,56,91,240),outline='#6cd5f4',width=2)
    d.text((101,y+18),f'ANSWER {answer}',font=BOLD,fill='#ffd667')
    response='  •  '.join(q['options'][n] for n in q['correct'])
    write(d,response,(101,y+74),SMALL,'#f3f7ff',1830,35,2)
    flow_y=y+187;node_w=444;gap=37
    d.text((76,flow_y-3),'ARCHITECTURE PATH',font=SMALL,fill='#83e4f6')
    for j,node in enumerate(q['flow']):
        x=76+j*(node_w+gap);top=flow_y+52
        d.rounded_rectangle((x,top,x+node_w,top+164),radius=18,fill=(13,43,78,235),outline=(90,205,244,210),width=2)
        d.ellipse((x+24,top+22,x+82,top+80),fill=(19,94,162),outline='#76e8ff',width=2)
        d.text((x+41,top+34),str(j+1),font=SMALL,fill='#ffffff')
        write(d,node,(x+25,top+91),SMALL,'#f0f6ff',node_w-50,37,2)
        if j<3:
            cy=top+83;d.line((x+node_w+7,cy,x+node_w+gap-8,cy),fill='#7de8ff',width=5)
            d.polygon([(x+node_w+gap-17,cy-10),(x+node_w+gap-5,cy),(x+node_w+gap-17,cy+10)],fill='#7de8ff')
    explain_y=flow_y+259
    d.rounded_rectangle((76,explain_y,1972,explain_y+255),radius=18,fill=(15,39,73,236),outline=(75,153,216,180),width=2)
    d.text((101,explain_y+20),'WHY THIS WORKS',font=BOLD,fill='#79e4f7')
    end=write(d,q['explanation'],(101,explain_y+82),SMALL,'#eef5ff',1830,43,4)
    d.text((101,max(explain_y+215,end+5)),'DECISION  '+q['decision'],font=TINY,fill='#ffd667')
    bottom=explain_y+282
    d.rounded_rectangle((76,bottom,1972,bottom+110),radius=16,fill=(55,42,31,230),outline='#e6b94d',width=2)
    d.text((101,bottom+17),'REMEMBER',font=BOLD,fill='#ffd667')
    write(d,q['tradeoff'],(405,bottom+23),SMALL,'#ffffff',1510,38,2)
    if bottom+110>1095:raise RuntimeError(f'Overflow in {q["id"]}: {bottom+110}')
    dest=OUT/f'question-{idx:02d}.webp'
    im.convert('RGB').save(dest,'WEBP',quality=91,method=6)
    print(dest.name,dest.stat().st_size)
