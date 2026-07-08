import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Forms"]["kvkk_prefix"] = ""
tr["Forms"]["kvkk"] = "KVKK Aydınlatma Metni"
tr["Forms"]["kvkk_read"] = "'ni okudum ve kabul ediyorum."

en["Forms"]["kvkk_prefix"] = "I have read and accept the "
en["Forms"]["kvkk"] = "Privacy Policy"
en["Forms"]["kvkk_read"] = "."

# Also update the footer just in case
tr["Footer"]["kvkk"] = "KVKK Aydınlatma Metni"
en["Footer"]["kvkk"] = "Privacy Policy"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

