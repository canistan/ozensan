import json

db_path = "src/data/products.json"
with open(db_path, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    if p.get("brand") == "ticab":
        en_list = p.get("technicalDataEn", [])
        tr_list = p.get("technicalData", [])
        
        new_en = []
        new_tr = []
        
        for i in range(len(en_list)):
            en_item = en_list[i]
            tr_item = tr_list[i]
            
            param_en = (en_item.get("param") or "").strip()
            val_en = (en_item.get("value") or "").strip()
            param_tr = (tr_item.get("param") or "").strip()
            
            bad = False
            
            # Sentence endings
            if param_en.endswith(".") or param_en.endswith("!") or param_tr.endswith(".") or param_tr.endswith("!"):
                bad = True
                
            # Suspicious marketing text (verbs/phrases)
            sus_phrases = ["you can", "we offer", "advantages", "properties", "application", "features", "directly from", "nice touch", "our company", "we produce", "have a", "enjoy the", "you will", "a small", "the high-performance", "easy-to-operate", "you get", "save time", "easy to operate", "is one of the", "most efficient", "we provide"]
            if any(s in param_en.lower() or s in val_en.lower() for s in sus_phrases):
                bad = True
                
            # If value is extremely long and param is long
            if len(val_en) > 60 and len(param_en) > 30:
                bad = True
                
            # If param is extremely long (like a whole sentence)
            if len(param_en) > 65:
                bad = True
                
            if not bad:
                new_en.append(en_list[i])
                new_tr.append(tr_list[i])
                
        p["technicalDataEn"] = new_en
        p["technicalData"] = new_tr

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)
print("Further cleaning complete!")
