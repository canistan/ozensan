import json
import os

with open("src/data/products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

# Define X11 and X21
new_products = [
    {
        "slug": "gce-x11-original",
        "brand": "gce",
        "name": "X11® Original Kaynak ve Kesme Torcu",
        "nameEn": "X11® Original Welding and Cutting Torch",
        "image": "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+X11+Original",
        "description": "Kesme, kaynak, ısıtma ve lehimleme için tasarlanmış eksiksiz bir sistemdir. Ergonomik tasarımı ve geniş yelpazesi ile hafif hizmet (light duty) uygulamaları için piyasadaki en pratik çözümdür.",
        "descriptionEn": "A complete system for cutting, welding, heating and soldering. With its ergonomic design and wide range, it’s the most attractive product for light duty applications on the market.",
        "features": [
          "Mükemmel sızdırmazlık için kolay değiştirilebilir teflon contalar",
          "Kaynak ve kesme başlıklarının hızlı değişimi için hızlı bağlantı somunu",
          "Hassas ayar için yeni trim valfi ve kesme oksijeni kolu tasarımı",
          "Asetilen ve propan gazları ile tam uyum",
          "EN ISO 5172 ve ISO 9001 standartlarında üretim"
        ],
        "featuresEn": [
          "Easily replaceable teflon washers for perfect seal",
          "Quick connection nut enables rapid exchange of heads",
          "New trim valve design and cutting oxygen lever",
          "Usable for both acetylene and propane",
          "Fully meets EN ISO 5172 and ISO 9001 standards"
        ],
        "technicalData": [
          {
            "param": "Uygulama Alanı",
            "value": "Hafif Hizmet (Light Duty)",
            "accessory": "-"
          },
          {
            "param": "Uyumlu Gazlar",
            "value": "Asetilen, Propan",
            "accessory": "Kesme ve Kaynak Nozulları"
          },
          {
            "param": "Bağlantı Tipi",
            "value": "Hızlı Bağlantı Somunu (EN560)",
            "accessory": "Teflon Contalar"
          }
        ],
        "technicalDataEn": [
          {
            "param": "Application",
            "value": "Light Duty",
            "accessory": "-"
          },
          {
            "param": "Compatible Gases",
            "value": "Acetylene, Propane",
            "accessory": "Cutting & Welding Nozzles"
          },
          {
            "param": "Connection Type",
            "value": "Quick Connection Nut (EN560)",
            "accessory": "Teflon Washers"
          }
        ],
        "solutions": [
          "profesyonel-delme-ve-kirim",
          "agir-sanayi-ve-metal"
        ],
        "isFeatured": True
    },
    {
        "slug": "gce-x21-original",
        "brand": "gce",
        "name": "X21® Original Ağır Hizmet Kesme ve Kaynak Sistemi",
        "nameEn": "X21® Original Heavy Duty Cutting and Welding System",
        "image": "https://placehold.co/800x600/1A1E24/FFFFFF/webp?text=GCE+X21+Original",
        "description": "Kaynak, kesme, lehimleme, ısıtma ve doğrultma işlemleri için yüksek kapasiteli, kombine gazlı sistemdir. Orta ve ağır hizmet uygulamaları için EN ISO 5172 standartlarına uygun basınçlı torç teknolojisi sunar.",
        "descriptionEn": "Large capacity combined system for welding, cutting, soldering, heating and straightening. Designed for medium and heavy duty jobs conforming to EN ISO 5172 standards.",
        "features": [
          "14 mm'ye kadar kaynak ve 500 mm'ye kadar kesim kapasitesi",
          "Yuvarlak veya oval torç sapı seçeneği",
          "Alevle temizleme ve doğrultma işlemleri için mükemmel uyum",
          "Torç kafasında gaz karışımı ile alev geri tepmesine karşı artırılmış güvenlik",
          "Asetilen ve Propan (LPG) için uygun tasarım"
        ],
        "featuresEn": [
          "Potential to weld material thicknesses up to 14 mm",
          "Cut up to 500 mm",
          "Perfect for Flame cleaning and straightening",
          "Gases mixed in torch head increases safety against flashbacks",
          "Available for both Acetylene and Propane (LPG)"
        ],
        "technicalData": [
          {
            "param": "Uygulama Alanı",
            "value": "Orta ve Ağır Hizmet",
            "accessory": "-"
          },
          {
            "param": "Maksimum Kesim",
            "value": "500 mm",
            "accessory": "3-Koni Kesme Nozulu"
          },
          {
            "param": "Maksimum Kaynak",
            "value": "14 mm",
            "accessory": "Kaynak Başlığı"
          },
          {
            "param": "Sap Tasarımı",
            "value": "Yuvarlak veya Oval",
            "accessory": "-"
          }
        ],
        "technicalDataEn": [
          {
            "param": "Application",
            "value": "Medium & Heavy Duty",
            "accessory": "-"
          },
          {
            "param": "Max Cutting",
            "value": "500 mm",
            "accessory": "3-cone Cutting Nozzle"
          },
          {
            "param": "Max Welding",
            "value": "14 mm",
            "accessory": "Welding Head"
          },
          {
            "param": "Shank Design",
            "value": "Round or Oval",
            "accessory": "-"
          }
        ],
        "solutions": [
          "agir-sanayi-ve-metal"
        ],
        "isFeatured": True
    }
]

# Avoid duplicates
existing_slugs = {p["slug"] for p in products}
for np in new_products:
    if np["slug"] not in existing_slugs:
        products.append(np)
        print(f"Added {np['slug']}")
    else:
        print(f"Skipped {np['slug']} (already exists)")

with open("src/data/products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

