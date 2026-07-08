import json

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

new_products = [
    {
        "slug": "gce-safe-guard-5",
        "brand": "gce",
        "name": "SAFE-GUARD-5 Alev Emniyet Valfi",
        "nameEn": "SAFE-GUARD-5 Flashback Arrestor",
        "image": "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+SAFE-GUARD-5",
        "description": "GCE'nin en son yeniliği olan SAFE-GUARD-5, regülatöre ve tüp kaynağına tehlikeli alev geri tepmelerinin ulaşmasını önlemek için ISO 5175-1 tarafından talep edilen maksimum koruma seviyesini sunar.",
        "descriptionEn": "The latest innovation from GCE, the SAFE-GUARD-5 offers the maximum level of protection required by ISO 5175-1 to prevent dangerous flashbacks from reaching the regulator and cylinder supply sources.",
        "features": [
          "ISO 5175-1 tarafından tanımlanan maksimum sayıda güvenlik özelliği",
          "Yüksek görünürlüklü ve basınç altındayken bile hızlı tepki veren açma/sıfırlama kolu",
          "Hortum hasarını en aza indiren açılı giriş (Angled inlet)",
          "Alev geri tepme direncine karşı %100 test edilmiş üretim",
          "Aktive olduğunu gösteren net sıfırlama mekanizması (RM)"
        ],
        "featuresEn": [
          "Maximum number of safety features defined by ISO 5175-1",
          "High visibility trip/reset lever coupled with quick acting reset",
          "Angled inlet to minimise hose damage",
          "100% production flame tested for Flashback resistance",
          "Reset mechanism to clearly advise unit activation (RM)"
        ],
        "technicalData": [
          {
            "param": "Alev Tutucu Eleman",
            "value": "FA (Sinterlenmiş filtre)",
            "accessory": "-"
          },
          {
            "param": "Geri Dönüşsüz Valf",
            "value": "NV",
            "accessory": "-"
          },
          {
            "param": "Basınca Duyarlı Kesme",
            "value": "PV",
            "accessory": "-"
          },
          {
            "param": "Sıcaklığa Duyarlı Kesme",
            "value": "TV",
            "accessory": "-"
          }
        ],
        "technicalDataEn": [
          {
            "param": "Flame Arresting Element",
            "value": "FA (Sintered filter)",
            "accessory": "-"
          },
          {
            "param": "Non Return Valve",
            "value": "NV",
            "accessory": "-"
          },
          {
            "param": "Pressure Cut Off",
            "value": "PV",
            "accessory": "-"
          },
          {
            "param": "Temperature Cut Off",
            "value": "TV",
            "accessory": "-"
          }
        ],
        "solutions": [
          "yol-yapim-ve-bakim",
          "agir-sanayi-ve-metal"
        ],
        "isFeatured": False
    },
    {
        "slug": "gce-safe-guard-3",
        "brand": "gce",
        "name": "SAFE-GUARD-3 Alev Emniyet Valfi",
        "nameEn": "SAFE-GUARD-3 Flashback Arrestor",
        "image": "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+SAFE-GUARD-3",
        "description": "Regülatör montajı için üretilen yeni SAFE-GUARD-3, performans, filtrasyon ve güvenlik alanında çeşitli yükseltmeler içerir. ISO 5175-1 standardına tamamen uygundur.",
        "descriptionEn": "The new SAFE-GUARD-3 for regulator mounting contains a host of new upgrades to performance, filtration, and product marking. Complies fully with ISO 5175-1.",
        "features": [
          "Sinterlenmiş alev tutucu eleman (FA)",
          "Gazın geri akışını engelleyen tek yönlü valf (NV)",
          "Aşırı ısınmaya karşı sıcaklığa duyarlı kesme valfi (TV)",
          "Toz filtresi entegrasyonu",
          "Oksijen (25 bar), Asetilen (1.5 bar) ve Hidrojen (3.5 bar) dahil çoklu gaz uyumu"
        ],
        "featuresEn": [
          "Flame arresting element (FA)",
          "Non return valve (NV)",
          "Temperature sensitive cut off valve (TV)",
          "Integrated dust filter",
          "Multi-gas support including Oxygen (25 bar), Acetylene (1.5 bar), Hydrogen (3.5 bar)"
        ],
        "technicalData": [
          {
            "param": "Standart Uyumluluğu",
            "value": "ISO 5175-1",
            "accessory": "-"
          },
          {
            "param": "Maks Oksijen Basıncı",
            "value": "25 bar",
            "accessory": "-"
          },
          {
            "param": "Maks Asetilen Basıncı",
            "value": "1.5 bar",
            "accessory": "-"
          },
          {
            "param": "Ek Özellik",
            "value": "Toz Filtresi",
            "accessory": "-"
          }
        ],
        "technicalDataEn": [
          {
            "param": "Standard",
            "value": "ISO 5175-1",
            "accessory": "-"
          },
          {
            "param": "Max Oxygen Pressure",
            "value": "25 bar",
            "accessory": "-"
          },
          {
            "param": "Max Acetylene Pressure",
            "value": "1.5 bar",
            "accessory": "-"
          },
          {
            "param": "Extra Feature",
            "value": "Dust filter",
            "accessory": "-"
          }
        ],
        "solutions": [
          "agir-sanayi-ve-metal"
        ],
        "isFeatured": False
    }
]

existing_slugs = {p["slug"] for p in products}
for np in new_products:
    if np["slug"] not in existing_slugs:
        products.append(np)
        print(f"Added {np['slug']}")

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)
