import json
with open("src/data/products.json", "r") as f:
    data = json.load(f)
    
for p in data:
    if p.get("brand") == "ticab":
        for t in p.get("technicalDataEn", []):
            if t["param"] in ["Application", "Advantages", "Properties", "Features"] or p["slug"].upper() in t["param"] or len(t["value"]) > 80:
                print(f"{p['slug']}: Bad Row -> Param: {t['param'][:30]} | Value: {t['value'][:30]}")
