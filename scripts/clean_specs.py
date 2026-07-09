import json

def clean_data():
    db_path = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/products.json"
    
    with open(db_path, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    for p in products:
        if p.get("brand") == "ticab":
            tech_en = p.get("technicalDataEn", [])
            tech_tr = p.get("technicalData", [])
            
            new_en = []
            new_tr = []
            
            # They should be perfectly synced in length
            if len(tech_en) == len(tech_tr):
                for i in range(len(tech_en)):
                    en_item = tech_en[i]
                    tr_item = tech_tr[i]
                    
                    param = en_item["param"].strip()
                    val = en_item["value"].strip()
                    
                    # Heuristics for BAD rows
                    is_bad = False
                    
                    # 1. Known marketing headers
                    if param in ["Application", "Advantages", "Properties", "Features"]:
                        is_bad = True
                        
                    # 2. Product name used as header
                    if param.lower() == p["slug"].lower() or param.lower() == p["nameEn"].lower():
                        is_bad = True
                        
                    # 3. TICAB keyword used as header
                    if param.upper() == "TICAB":
                        is_bad = True
                        
                    # 4. Long blurbs
                    if len(param) > 80 or len(val) > 80:
                        is_bad = True
                        
                    # 5. Sometimes a long blurb is split into param and value
                    if "our company" in param.lower() or "you can buy" in param.lower() or "bitumen sprayer machines" in param.lower():
                        is_bad = True
                        
                    if not is_bad:
                        new_en.append(en_item)
                        new_tr.append(tr_item)
                        
                p["technicalDataEn"] = new_en
                p["technicalData"] = new_tr
            
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print("Done cleaning!")

if __name__ == "__main__":
    clean_data()
