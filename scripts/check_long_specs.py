import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    if p.get("brand") == "ticab":
        for t in p.get("technicalData", []):
            if len(t["param"]) > 45 or len(t["value"]) > 45:
                print(f"{p['slug']} -> Param: {t['param']} | Value: {t['value']}")
