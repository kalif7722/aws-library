"""Build deterministic, accessible SVG console illustrations from the lab screen data."""
import json
from pathlib import Path
from html import escape
from textwrap import wrap

root = Path(__file__).resolve().parents[1]
labs = json.loads((root / 'app/troubleshooting/walkthroughs/labs.json').read_text())
out = root / 'public/aws-console-walkthroughs'
out.mkdir(parents=True, exist_ok=True)

def lines(text, width=48):
    return wrap(str(text), width=width, break_long_words=False, break_on_hyphens=False) or ['']

def label(text, x, y, size=22, fill='#243746', weight=400):
    return f'<text x="{x}" y="{y}" fill="{fill}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}">{escape(str(text))}</text>'

for lab in labs:
    for number, screen in enumerate(lab['screens'], 1):
        parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img">',
                 '<rect width="1280" height="720" fill="#f5f7f9"/>',
                 '<rect width="1280" height="60" fill="#232f3e"/>',
                 label('aws',24,42,31,'#ffae2e',700), label('☰    Services     Search AWS services, features, blogs, docs',125,39,18,'#e7eef5'),
                 label('◉  Lab account    |    Region selector ⌄',930,38,15,'#c5e3ec'),
                 '<rect x="0" y="60" width="230" height="660" fill="#fff" stroke="#d5dfe6"/>',
                 label(lab['service'],22,102,18,'#232f3e',700),
                 '<rect x="10" y="140" width="210" height="49" rx="6" fill="#e3f3fb"/>',
                 label('Overview',25,172,18,'#176b91',700),
                 label('Resources',25,224,17,'#42596b'), label('Configuration',25,264,17,'#42596b'),
                 label('Monitoring',25,304,17,'#42596b'), label('Security',25,344,17,'#42596b'),
                 '<rect x="252" y="76" width="1005" height="33" rx="4" fill="#ecf3f7"/>',
                 label(screen['path'][:108],270,99,15,'#527085'),
                 label(screen['title'],263,155,29,'#172c3e',700),
                 '<rect x="260" y="182" width="984" height="439" rx="12" fill="#fff" stroke="#c8d6e1"/>',
                 label('Configuration',286,220,21,'#253748',700),
                 '<line x1="286" y1="237" x2="1214" y2="237" stroke="#dce5ec"/>']
        y = 282
        for k, v in screen['rows']:
            parts.extend([label(k,290,y,17,'#3f5364',700),
                          f'<rect x="595" y="{y-27}" width="595" height="44" rx="5" fill="#fff" stroke="#a3b7c7"/>'])
            for idx, line in enumerate(lines(v, 53)[:2]):
                parts.append(label(line,610,y-1 + idx*19,16,'#243746'))
            y += 74
        parts.extend(['<rect x="260" y="638" width="984" height="55" rx="8" fill="#e8f4fa" stroke="#9fc6db"/>',
                      label('ACTION',281,671,14,'#0c7199',700)])
        for idx, line in enumerate(lines(screen['action'], 105)[:2]):
            parts.append(label(line,366,664+idx*17,15,'#1e4254',700))
        parts.extend([label(f'ILLUSTRATIVE CONSOLE VIEW  •  {lab["id"]}  •  {number:02d}/{len(lab["screens"]):02d}',25,701,11,'#67818f'),'</svg>'])
        (out / f'{lab["id"]}-{number:02d}.svg').write_text(''.join(parts))
print(f'Generated {sum(len(x["screens"]) for x in labs)} console illustrations for {len(labs)} labs.')
