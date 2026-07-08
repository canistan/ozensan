import json

en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

en["Footer"]["kvkk"] = "Clarification Text"
en["Forms"]["kvkk"] = "Clarification Text"

json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
