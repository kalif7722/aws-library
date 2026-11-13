"""Shared 2048×1152 Google Cloud service visual drawing primitives."""
from pathlib import Path
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 2048, 1152
NAVY = "#0D396D"
BLUE = "#0B66CE"
INK = "#1D3454"
MUTED = "#4D6581"
BORDER = "#B9CEE7"
PALE = "#EAF3FF"
GREEN = "#168451"
ORANGE = "#DA6A12"
PURPLE = "#6B45B4"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

im = Image.new("RGB", (W, H), "white")
d = ImageDraw.Draw(im)
def font(n, bold=False): return ImageFont.truetype(BOLD if bold else FONT, n)

def text(x, y, s, size=17, fill=INK, bold=False, anchor=None):
    d.text((x, y), s, font=font(size, bold), fill=fill, anchor=anchor)

def wrapped(s, width, size=17, bold=False):
    words, lines, line = s.split(), [], ""
    for word in words:
        candidate = (line + " " + word).strip()
        if d.textbbox((0, 0), candidate, font=font(size, bold))[2] > width and line:
            lines.append(line); line = word
        else: line = candidate
    if line: lines.append(line)
    return lines

def paragraph(x, y, s, width, size=16, fill=INK, bold=False, gap=5):
    for line in wrapped(s, width, size, bold):
        text(x, y, line, size, fill, bold)
        y += size + gap
    return y

def pill(x, y, label, color=BLUE, width=None, height=43, size=16):
    width = width or min(298, d.textbbox((0,0), label, font=font(size,True))[2] + 25)
    d.rounded_rectangle((x,y,x+width,y+height), radius=9, fill=PALE, outline=color, width=2)
    text(x+width/2, y+height/2, label, size, color, True, "mm")
    return width

def arrow(x1,y1,x2,y2,color=BLUE):
    d.line((x1,y1,x2,y2),fill=color,width=4)
    if x2==x1: p=[(x2,y2),(x2-7,y2-10),(x2+7,y2-10)]
    else: p=[(x2,y2),(x2-10,y2-7),(x2-10,y2+7)]
    d.polygon(p,fill=color)

def bullets(x,y,items,width,size=16,step=6):
    for item in items:
        d.ellipse((x,y+9,x+7,y+16),fill=GREEN)
        y=paragraph(x+17,y,item,width-18,size) + step
    return y

def flow(x,y,labels,colors=None):
    colors=colors or [BLUE]*len(labels)
    gaps=15
    boxw=int((298-gaps*(len(labels)-1))/len(labels))
    for i,(label,c) in enumerate(zip(labels,colors)):
        px=x+i*(boxw+gaps)
        d.rounded_rectangle((px,y,px+boxw,y+72),radius=9,fill=PALE,outline=c,width=2)
        lines=wrapped(label,boxw-14,14,True)
        for k,line in enumerate(lines[:3]):text(px+boxw/2,y+36+(k-(len(lines)-1)/2)*18,line,14,c,True,"mm")
        if i<len(labels)-1:arrow(px+boxw+2,y+36,px+boxw+gaps-2,y+36,c)

def panel(n,title,col,row):
    x=18+col*339; y=99+row*339; w=331; h=331
    d.rounded_rectangle((x,y,x+w,y+h),radius=12,fill="white",outline=BORDER,width=2)
    d.rounded_rectangle((x+1,y+1,x+w-1,y+41),radius=11,fill=NAVY)
    d.rectangle((x+1,y+29,x+w-1,y+41),fill=NAVY)
    d.rounded_rectangle((x+9,y+8,x+43,y+34),radius=6,fill="white")
    text(x+26,y+21,str(n),17,NAVY,True,"mm")
    text(x+52,y+12,title,17,"white",True)
    return x+16,y+52

