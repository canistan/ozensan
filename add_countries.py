import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
tr["Countries"] = {
  "turkey": "Türkiye",
  "iraq": "Irak",
  "afghanistan": "Afganistan",
  "libya": "Libya",
  "djibouti": "Cibuti",
  "indonesia": "Endonezya"
}
json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))
en["Countries"] = {
  "turkey": "Turkey",
  "iraq": "Iraq",
  "afghanistan": "Afghanistan",
  "libya": "Libya",
  "djibouti": "Djibouti",
  "indonesia": "Indonesia"
}
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
