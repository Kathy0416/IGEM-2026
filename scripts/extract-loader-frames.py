"""Regenerate lossless loader frames: python scripts/extract-loader-frames.py.

Requires Pillow only for regeneration; the website has no decoder dependency.
"""
import hashlib
import json
import os
from PIL import Image

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
source = os.path.join(root, "1(1).gif")
output = os.path.join(root, "public", "loader-frames")
if not os.path.isdir(output):
    os.makedirs(output)
gif = Image.open(source)
frames = []
index = 0
while True:
    try:
        gif.seek(index)
    except EOFError:
        break
    duration = gif.info.get("duration", 0)
    if duration <= 0:
        raise ValueError("Every frame must have an explicit positive duration")
    name = "frame-{}.png".format(index)
    # Sequential seeking lets Pillow composite GIF disposal and partial frames.
    gif.convert("RGBA").save(os.path.join(output, name))
    frames.append({"file": name, "duration": duration})
    index += 1
with open(source, "rb") as original:
    source_hash = hashlib.sha256(original.read()).hexdigest()
manifest = {"width": gif.size[0], "height": gif.size[1],
            "sourceSha256": source_hash,
            "frames": frames}
with open(os.path.join(output, "manifest.json"), "w") as target:
    target.write(json.dumps(manifest, indent=2) + "\n")
print("Extracted {} frames, {} ms".format(len(frames), sum(f["duration"] for f in frames)))
