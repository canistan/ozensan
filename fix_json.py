import json

with open("src/messages/tr.json", "r", encoding="utf-8") as f:
    tr = json.load(f)

tr["HomePage"]["Pillars"]["p1_desc"] = "Türkiye'nin her noktasına ulaşan hizmet ağımızla, makineleriniz için orijinal yedek parça ve 7/24 bakım desteği sunuyoruz."
tr["HomePage"]["Pillars"]["p3_desc"] = "Geniş stok ağımız sayesinde sahada yaşanabilecek duruş sürelerini minimize ediyor, ürünleri ve sarf malzemelerini en hızlı şekilde antrepoya kadar ulaştırıyoruz."
tr["Footer"]["hours"] = "09:00 - 18:00"

with open("src/messages/tr.json", "w", encoding="utf-8") as f:
    json.dump(tr, f, ensure_ascii=False, indent=2)

with open("src/messages/en.json", "r", encoding="utf-8") as f:
    en = json.load(f)

en["HomePage"]["Pillars"]["p1_desc"] = "With our extensive service network reaching every point in Turkey, we provide original spare parts and 24/7 maintenance support for your machines."
en["HomePage"]["Pillars"]["p3_desc"] = "Thanks to our extensive stock network, we minimize potential downtime on-site and deliver products and consumables to the warehouse as quickly as possible."
en["Footer"]["hours"] = "09:00 - 18:00"

with open("src/messages/en.json", "w", encoding="utf-8") as f:
    json.dump(en, f, ensure_ascii=False, indent=2)
