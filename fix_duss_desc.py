import json

with open('src/data/products.json', 'r') as f:
    products = json.load(f)

count = 0
for p in products:
    if p.get('brand') == 'duss' and 'info@duss.de' in p.get('descriptionEn', ''):
        p['description'] = ''
        p['descriptionEn'] = ''
        count += 1

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"Fixed {count} DUSS descriptions.")
