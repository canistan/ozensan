import re

with open('src/components/products/ProductCatalog.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the current GCE categories block and replace it.
old_block_regex = r"gce:\s*\[[\s\S]*?\]\n};"

new_block = """gce: [
    { slug: 'nozzles', name: 'Kesme Uçları', nameEn: 'Nozzles' },
    { slug: 'combi-torches', name: 'Kombi Hamlaçlar', nameEn: 'Combi Torches' },
    { slug: 'welding-torches', name: 'Kaynak Hamlaçları', nameEn: 'Welding Torches' },
    { slug: 'injector-cutting-torches', name: 'Enjektörlü Kesme Hamlaçları', nameEn: 'Injector Cutting Torches' },
    { slug: 'nozzle-mix-cutting-torches', name: 'Lüle Karışımlı Kesme Hamlaçları', nameEn: 'Nozzle Mix Cutting Torches' },
    { slug: 'combi-torch-sets', name: 'Kombi Hamlaç Setleri', nameEn: 'Combi Torch Sets' },
    { slug: 'machine-cutting-nozzles', name: 'Makine Kesme Uçları', nameEn: 'Machine Cutting Nozzles' },
    { slug: 'automated-torches-systems', name: 'Otomatik Hamlaç ve Sistemler', nameEn: 'Automated Torches & Systems' },
    { slug: 'portable-cutting-machines', name: 'Portatif Kesme Makineleri', nameEn: 'Portable Cutting Machines' },
    { slug: 'machine-cutting-accessories', name: 'Makine Kesim Aksesuarları', nameEn: 'Machine Cutting Accessories' },
    { slug: 'cylinder-regulators', name: 'Tüp Regülatörleri', nameEn: 'Cylinder Regulators' },
    { slug: 'propane-regulators', name: 'Propan Regülatörleri', nameEn: 'Propane Regulators' },
    { slug: 'technical-grade-regulators', name: 'Teknik Derece Regülatörler', nameEn: 'Technical Grade Regulators' },
    { slug: 'standard-cylinder-valves', name: 'Standart Tüp Vanaları', nameEn: 'Standard Cylinder Valves' },
    { slug: 'industrial-vipr-combination-valves', name: 'Endüstriyel Kombinasyon Vanaları', nameEn: 'Industrial VIPR Combination Valves' },
    { slug: 'bundle-pack-valves', name: 'Çoklu Tüp Paket Vanaları', nameEn: 'Bundle Pack Valves' },
    { slug: 'flashback-arrestors', name: 'Alev Geri Tepme Emniyet Valfleri', nameEn: 'Flashback Arrestors' },
    { slug: 'hoses', name: 'Hortumlar', nameEn: 'Hoses' },
    { slug: 'torch-accessories', name: 'Hamlaç Aksesuarları', nameEn: 'Torch Accessories' },
    { slug: 'filling-adaptors', name: 'Dolum Adaptörleri', nameEn: 'Filling Adaptors' },
    { slug: 'safety-equipment-and-ppe', name: 'İş Güvenliği Ekipmanları (KKE)', nameEn: 'Safety Equipment and PPE' },
    { slug: 'air-propane-equipment', name: 'Hava ve Propan Ekipmanları', nameEn: 'Air & Propane Equipment' },
    { slug: 'arc-welding-and-cutting', name: 'Ark Kaynağı ve Kesimi', nameEn: 'Arc Welding & Cutting' },
    { slug: 'nitrogen-generators', name: 'Azot (Nitrojen) Jeneratörleri', nameEn: 'Nitrogen Generators' },
    { slug: 'accessories', name: 'Genel Aksesuarlar', nameEn: 'Accessories' }
  ]
};"""

content = re.sub(old_block_regex, new_block, content)

with open('src/components/products/ProductCatalog.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ProductCatalog.tsx with all GCE subcategories")
