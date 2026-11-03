#!/usr/bin/env python3
"""Find turquoise numbered callouts in authored console walkthroughs.

The hotspots open the screen's field picker. Field semantics live in expanded-spec.ts.
"""
import json
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import binary_closing, find_objects, label

root = Path(__file__).resolve().parents[1]
labs = json.loads((root / 'app/troubleshooting/walkthroughs/labs.json').read_text())[5:]
result = {}
for lab in labs:
    screens = []
    for screen in lab['screens']:
        image = np.array(Image.open(root / 'public/aws-console-walkthroughs' / screen['asset']).convert('RGB'))
        cyan = (image[:,:,0] < 130) & (image[:,:,1] > 145) & (image[:,:,2] > 140) & (image[:,:,1] > image[:,:,0] * 1.35)
        components, _ = label(binary_closing(cyan, iterations=4))
        points = []
        for number, bounds in enumerate(find_objects(components), 1):
            if bounds is None:
                continue
            vertical, horizontal = bounds
            height, width = vertical.stop - vertical.start, horizontal.stop - horizontal.start
            area = int(np.sum(components[bounds] == number))
            if 25 < width < 100 and 25 < height < 100 and 130 < area < 1800:
                points.append([int(horizontal.start + width/2), int(vertical.start + height/2), 'inspect'])
        screens.append(sorted(points, key=lambda point: (point[1], point[0])))
    result[lab['id']] = screens
output = root / 'app/troubleshooting/simulators/aws/practice/auto-hotspots.json'
output.write_text(json.dumps(result, separators=(',', ':'))+'\n')
print(f'{len(result)} labs, {sum(map(len,result.values()))} screens, {sum(len(screen) for screens in result.values() for screen in screens)} hotspots')
