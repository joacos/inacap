import re
import json

with open("public/construccion_bundle.js", "r") as f:
    data = f.read()

# Find anything that looks like an object with title, description, image, and year.
pattern = r'\{[^}]*title:"([^"]+)"[^}]*description:"([^"]+)"[^}]*image:"([^"]+)"[^}]*year:"([^"]+)"[^}]*\}'
matches = re.finditer(pattern, data)

items = []
for m in matches:
    items.append({
        "title": m.group(1),
        "description": m.group(2),
        "image": m.group(3),
        "year": m.group(4)
    })

if not items:
    # try different order
    pattern2 = r'\{[^}]*year:"([^"]+)"[^}]*title:"([^"]+)"[^}]*description:"([^"]+)"[^}]*image:"([^"]+)"[^}]*\}'
    matches2 = re.finditer(pattern2, data)
    for m in matches2:
        items.append({
            "year": m.group(1),
            "title": m.group(2),
            "description": m.group(3),
            "image": m.group(4)
        })

print(f"Extracted {len(items)} items")
if items:
    with open("public/construccion_milestones.json", "w") as f:
        json.dump(items, f, indent=2)
