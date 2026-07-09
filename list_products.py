import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    print(f"Slug: {p['slug']}, Brand: {p['brand']}, Name: {p['name']}")

