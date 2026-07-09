import json
import urllib.request
import os
from deep_translator import GoogleTranslator
from PIL import Image

def translate_text(text):
    if not text: return ""
    try:
        return GoogleTranslator(source='en', target='tr').translate(text)
    except:
        return text

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

with open("raw_floor_saws.json", "r", encoding="utf-8") as f:
    raw_products = json.load(f)

public_dir = "public/products"
os.makedirs(public_dir, exist_ok=True)

final_products = []

print(f"Processing {len(raw_products)} products...")
for i, rp in enumerate(raw_products):
    print(f"[{i+1}/{len(raw_products)}] Processing {rp['nameEn']}...")
    slug = rp["slug"]
    
    # 1. Translate
    name = translate_text(rp["nameEn"])
    desc = translate_text(rp["descriptionEn"])
    
    features_tr = []
    for f_en in rp["featuresEn"]:
        features_tr.append(translate_text(f_en))
        
    tech_tr = []
    for td in rp["technicalDataEn"]:
        param_tr = translate_text(td["param"])
        tech_tr.append({
            "param": param_tr,
            "value": td["value"],
            "accessory": "-"
        })
        
    # 2. Download Image
    image_url = rp["image"]
    local_image_path = ""
    if image_url:
        temp_img = os.path.join(public_dir, f"{slug}_temp.png")
        final_img = os.path.join(public_dir, f"{slug}.webp")
        try:
            req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp:
                with open(temp_img, "wb") as f:
                    f.write(resp.read())
            
            # 3. Optimize Image
            if optimize_image(temp_img, final_img):
                local_image_path = f"/products/{slug}.webp"
            os.remove(temp_img)
        except Exception as e:
            print(f"  Image Error: {e}")
            
    final_products.append({
        "slug": slug,
        "brand": rp["brand"],
        "name": name,
        "nameEn": rp["nameEn"],
        "image": local_image_path,
        "description": desc,
        "descriptionEn": rp["descriptionEn"],
        "features": features_tr,
        "featuresEn": rp["featuresEn"],
        "technicalData": tech_tr,
        "technicalDataEn": rp["technicalDataEn"],
        "solutions": ["yol-yapim-ve-bakim", "profesyonel-delme-ve-kirim"],
        "isFeatured": True if i < 3 else False
    })

# Save to products.json
with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(final_products, f, ensure_ascii=False, indent=2)

print("All done! Saved to products.json")
