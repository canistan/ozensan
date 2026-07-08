import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Product"] = {
    "brandEngineering": "Mühendisliği",
    "allProducts": "Tüm Ürünler",
    "productsFound": "Toplam {count} ürün bulundu",
    "viewAndQuote": "İncele ve Teklif Al"
}

en["Product"] = {
    "brandEngineering": "Engineering",
    "allProducts": "All Products",
    "productsFound": "Total {count} products found",
    "viewAndQuote": "View Details & Get Quote"
}

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

