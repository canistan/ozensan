import json

data = json.load(open("src/data/solutions.json", "r", encoding="utf-8"))

for s in data:
    if s["slug"] == "yol-yapim-ve-bakim":
        s["slugEn"] = "road-construction-and-maintenance"
    elif s["slug"] == "agir-sanayi-ve-metal":
        s["slugEn"] = "heavy-industry-and-metalworking"
    elif s["slug"] == "profesyonel-delme-yikim":
        s["slugEn"] = "professional-drilling-and-demolition"

json.dump(data, open("src/data/solutions.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
