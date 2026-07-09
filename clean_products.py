import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

# Keep only GCE products
cleaned = [p for p in products if p.get("brand") == "gce"]

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)

print(f"Deleted {len(products) - len(cleaned)} mock products. Kept {len(cleaned)} GCE products.")
