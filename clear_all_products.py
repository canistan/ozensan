import json

# Set products.json to empty array
with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump([], f)

print("All products deleted. products.json is now empty [].")
