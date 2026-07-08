import json

data = json.load(open("src/data/solutions.json", "r", encoding="utf-8"))

for d in data:
    if d["slug"] == "yol-yapim-ve-bakim":
        d["image"] = "/solutions/road.png"
    elif d["slug"] == "agir-sanayi-ve-metal":
        d["image"] = "/solutions/heavy.png"
    elif d["slug"] == "profesyonel-delme-yikim":
        d["image"] = "/solutions/demolition.png"

json.dump(data, open("src/data/solutions.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
