import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for product in products:
    if product["brand"] == "gce":
        if product["slug"] == "gce-procontrol":
            product["image"] = "/products/gce-procontrol.webp"
        elif product["slug"] == "gce-ecosaver":
            product["image"] = "/products/gce-ecosaver.webp"
        elif product["slug"] == "gce-dincontrol":
            product["image"] = "/products/gce-dincontrol.webp"

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Updated products.json with optimized local images.")
