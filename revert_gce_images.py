import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for product in products:
    if product["brand"] == "gce":
        if product["slug"] == "gce-procontrol":
            product["image"] = "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+ProControl"
        elif product["slug"] == "gce-ecosaver":
            product["image"] = "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+ECOSAVER"
        elif product["slug"] == "gce-dincontrol":
            product["image"] = "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+DINCONTROL"

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Reverted products.json images to placeholders.")
