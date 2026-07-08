import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

# Remove old keys
for k in ["asphalt", "road", "drilling", "gas"]:
    tr["Navigation"].pop(k, None)
    en["Navigation"].pop(k, None)

# Add new keys matching the actual 3 solutions
tr["Navigation"]["solution_road"] = "Yol Yapım ve Bakım"
en["Navigation"]["solution_road"] = "Road Construction and Maintenance"

tr["Navigation"]["solution_heavy"] = "Ağır Sanayi ve Metal İşleme"
en["Navigation"]["solution_heavy"] = "Heavy Industry and Metalworking"

tr["Navigation"]["solution_drilling"] = "Profesyonel Delme ve Yıkım"
en["Navigation"]["solution_drilling"] = "Professional Drilling and Demolition"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
