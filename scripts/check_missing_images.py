import json
import os

db = json.load(open('src/data/products.json'))
missing = []
for p in db:
    if p.get('brand') == 'victor':
        img = p.get('image')
        if img:
            # path is like /brands/victor/xyz.jpg
            # local path is public/brands/victor/xyz.jpg
            local_path = "public" + img
            if not os.path.exists(local_path):
                missing.append((p['name'], img))

if missing:
    print(f"Found {len(missing)} missing images on disk:")
    for m in missing:
        print(f" - {m[0]} (Expected: {m[1]})")
else:
    print("All Victor product images exist on disk!")
