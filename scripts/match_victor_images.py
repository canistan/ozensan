import os
import json
import shutil
from pathlib import Path
import re

db_path = "src/data/products.json"
src_dir = Path("public/victor")
dst_dir = Path("public/brands/victor")

# Ensure destination exists
dst_dir.mkdir(parents=True, exist_ok=True)

with open(db_path, "r", encoding="utf-8") as f:
    products = json.load(f)

# Helper to normalize strings for comparison
def normalize(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

# Create a mapping of normalized names to products
victor_products = [p for p in products if p.get("brand") == "victor"]
name_map = {}
for p in victor_products:
    name_map[normalize(p["name"])] = p
    if p.get("nameEn"):
        name_map[normalize(p["nameEn"])] = p

matched_count = 0
unmatched = []

for file in src_dir.iterdir():
    if file.is_file() and not file.name.startswith("."):
        basename = file.stem # e.g. "CA 270"
        ext = file.suffix    # e.g. ".jpg"
        norm_base = normalize(basename)
        
        # Exact match or substring match
        matched_prod = None
        
        # 1. Direct match
        if norm_base in name_map:
            matched_prod = name_map[norm_base]
        else:
            # 2. Try to find the closest match (if one contains the other)
            for norm_name, p in name_map.items():
                if norm_base in norm_name or norm_name in norm_base:
                    matched_prod = p
                    break
        
        if matched_prod:
            slug = matched_prod["slug"]
            new_filename = f"{slug}{ext}"
            new_filepath = dst_dir / new_filename
            
            # Copy/move file
            shutil.copy2(file, new_filepath)
            
            # Update product json
            matched_prod["image"] = f"/brands/victor/{new_filename}"
            matched_count += 1
            print(f"Matched: '{file.name}' -> {slug}")
        else:
            unmatched.append(file.name)

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"\nSuccessfully matched and updated {matched_count} images.")
if unmatched:
    print("Could not match the following images:")
    for u in unmatched:
        print(f" - {u}")
