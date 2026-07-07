import json
import os
import urllib.request
import time

def download_file(url, dest_path):
    if not url.startswith('http'):
        return url
    
    # Check if placehold.co, we can just skip or download a real placeholder
    if 'placehold.co' in url:
        return url # Or download it. Let's just download a real placeholder if we must, but for now we'll skip placeholders or download them.
    
    print(f"Downloading {url} to {dest_path}")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response, open(dest_path, 'wb') as out_file:
            out_file.write(response.read())
        return f"/{os.path.relpath(dest_path, 'public')}"
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return url

# Ensure directories exist
os.makedirs('public/brands', exist_ok=True)
os.makedirs('public/products', exist_ok=True)

# Process Brands
with open('src/data/brands.json', 'r') as f:
    brands = json.load(f)

for b in brands:
    if b['logo'].startswith('http'):
        ext = b['logo'].split('.')[-1]
        if len(ext) > 4 or '?' in ext: ext = 'png'
        filename = f"public/brands/{b['slug']}_logo.{ext}"
        new_url = download_file(b['logo'], filename)
        b['logo'] = new_url

with open('src/data/brands.json', 'w') as f:
    json.dump(brands, f, indent=2)

# Process Products
with open('src/data/products.json', 'r') as f:
    products = json.load(f)

for p in products:
    if p['image'].startswith('http'):
        # For placehold.co we might just leave it, or generate a real fallback later
        if 'placehold.co' not in p['image']:
            ext = p['image'].split('.')[-1]
            if len(ext) > 4 or '?' in ext: ext = 'jpg'
            filename = f"public/products/{p['slug']}.{ext}"
            new_url = download_file(p['image'], filename)
            p['image'] = new_url

with open('src/data/products.json', 'w') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Download complete.")
