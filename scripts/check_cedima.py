import json
with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    if p.get("brand") == "cedima":
        for t in p.get("technicalData", []):
            if t["param"] and t["value"]:
                if len(t["param"]) > 40 or len(t["value"]) > 40:
                    print(f"CEDIMA {p['slug']} -> Param: {t['param']} | Value: {t['value']}")
