import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Forms"]["email_placeholder"] = "ornek@firma.com"
tr["Forms"]["phone_placeholder"] = "0555 555 55 55"

en["Forms"]["email_placeholder"] = "example@company.com"
en["Forms"]["phone_placeholder"] = "+1 234 567 8900"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

