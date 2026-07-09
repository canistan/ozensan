import os
import json
import shutil
from pathlib import Path

db_path = "src/data/products.json"
src_dir = Path("public/victor")
dst_dir = Path("public/brands/victor")

with open(db_path, "r", encoding="utf-8") as f:
    products = json.load(f)

manual_map = {
    "SLR 150 Aşırı Gerilim Sınırlama Regülatörü.webp": "slr-150-surge-limiting-regulator",
    "GRF400 Debimetre Regülatörü.jpg": "grf400-flowmeter-regulator",
    "Tip MTHP Yüksek Hızlı Propilen Ucu.jpg": "type-mthp-high-speed-propylene-tip",
    "EDGE™ Serisi 2.0 ETS42 Regülatörler.jpeg": "edge-series-2-0-regulators" # Just using one of them
}

for p in products:
    if p["slug"] in manual_map.values():
        # Find which filename maps to this slug
        filename = next(k for k, v in manual_map.items() if v == p["slug"])
        file_path = src_dir / filename
        
        if file_path.exists():
            ext = file_path.suffix
            new_filename = f"{p['slug']}{ext}"
            new_filepath = dst_dir / new_filename
            shutil.copy2(file_path, new_filepath)
            
            p["image"] = f"/brands/victor/{new_filename}"
            print(f"Manually mapped {filename} -> {new_filename}")
            
with open(db_path, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Manual mapping complete.")
