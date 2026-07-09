import json
import urllib.request
import urllib.parse
import os
from PIL import Image

def optimize_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        if img.mode in ('RGBA', 'LA'):
            background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
            background.paste(img, img.split()[-1])
            img = background
        max_width = 800
        if img.width > max_width:
            ratio = max_width / float(img.width)
            new_height = int((float(img.height) * float(ratio)))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        img.save(output_path, "WEBP", quality=80)
        return True
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")
        return False

with open("raw_floor_saws.json", "r") as f:
    raw_products = json.load(f)

with open("src/data/products.json", "r") as f:
    products = json.load(f)

public_dir = "public/products"

for rp in raw_products:
    for p in products:
        if p["slug"] == rp["slug"] and p["image"] == "":
            image_url = rp["image"]
            if image_url:
                # Fix URL encoding
                parsed = urllib.parse.urlsplit(image_url)
                encoded_path = urllib.parse.quote(parsed.path)
                fixed_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, encoded_path, parsed.query, parsed.fragment))
                
                temp_img = os.path.join(public_dir, f"{p['slug']}_temp.png")
                final_img = os.path.join(public_dir, f"{p['slug']}.webp")
                
                try:
                    req = urllib.request.Request(fixed_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req) as resp:
                        with open(temp_img, "wb") as f_img:
                            f_img.write(resp.read())
                    if optimize_image(temp_img, final_img):
                        p["image"] = f"/products/{p['slug']}.webp"
                        print(f"Fixed image for {p['slug']}")
                    os.remove(temp_img)
                except Exception as e:
                    print(f"Failed to fix image for {p['slug']}: {e} (URL: {fixed_url})")

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Image fix complete.")
