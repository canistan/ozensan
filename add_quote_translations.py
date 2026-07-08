import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Forms"]["company"] = "Firma Adı (Opsiyonel)"
en["Forms"]["company"] = "Company Name (Optional)"

tr["Forms"]["productOfInterest"] = "İlgilendiğiniz Marka / Ürün / Çözüm"
en["Forms"]["productOfInterest"] = "Brand / Product / Solution of Interest"

tr["Forms"]["productPlaceholder"] = "Örn: Cedima Karot Makineleri, Husqvarna Kesiciler..."
en["Forms"]["productPlaceholder"] = "E.g. Cedima Core Drilling Machines, Husqvarna Cutters..."

tr["Forms"]["messageLabel"] = "Talebinizin Detayları"
en["Forms"]["messageLabel"] = "Request Details"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

