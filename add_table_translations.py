import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Product"]["parameter"] = "Parametre"
en["Product"]["parameter"] = "Parameter"

tr["Product"]["value"] = "Değer"
en["Product"]["value"] = "Value"

tr["Product"]["accessory"] = "Önerilen Aksesuar"
en["Product"]["accessory"] = "Recommended Accessory"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
