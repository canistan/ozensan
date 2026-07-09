import json

products_file = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/products.json"
ticab_file = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/ticab_products.json"

with open(products_file, "r", encoding="utf-8") as f:
    products = json.load(f)

with open(ticab_file, "r", encoding="utf-8") as f:
    ticab_products = json.load(f)

# Optional: Avoid duplicates
existing_slugs = {p["slug"] for p in products}

added = 0
for p in ticab_products:
    if p["slug"] not in existing_slugs:
        products.append(p)
        added += 1

with open(products_file, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"Added {added} TICAB products to products.json.")
