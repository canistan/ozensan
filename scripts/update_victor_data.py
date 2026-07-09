import json

db_path = "src/data/products.json"
with open(db_path, "r", encoding="utf-8") as f:
    products = json.load(f)
    
for p in products:
    if p.get("brand") == "victor":
        if "technicalData" in p:
            for td in p["technicalData"]:
                if td.get("value") == "Standart":
                    td["value"] = "Uygundur"
        if "technicalDataEn" in p:
            for td in p["technicalDataEn"]:
                if td.get("value") == "Standard":
                    td["value"] = "Suitable"

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Victor data updated successfully.")
