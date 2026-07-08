import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Product"]["features"] = "Öne Çıkan Özellikler"
en["Product"]["features"] = "Key Features"
tr["Product"]["techSpecs"] = "Teknik Spesifikasyonlar"
en["Product"]["techSpecs"] = "Technical Specifications"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

