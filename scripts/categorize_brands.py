import json

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

def get_cedima_cat(name, desc):
    text = (name + " " + desc).lower()
    if 'core drill' in text or 'karot' in text or 'karotçu' in text: return 'core-drilling'
    if 'floor saw' in text or 'zemin kesme' in text or 'derz kesme' in text: return 'floor-sawing'
    if 'wall saw' in text or 'duvar kesme' in text or 'ws-' in name.lower(): return 'wall-sawing'
    if 'wire saw' in text or 'tel kesme' in text or 'csa-' in name.lower(): return 'wire-sawing'
    if 'table saw' in text or 'masa testere' in text or 'cts-' in name.lower() or 'ts-' in name.lower(): return 'table-sawing'
    if 'hand-held' in text or 'el tipi' in text or 'cbm' in name.lower() or 'hand' in text: return 'hand-held-tools'
    return 'special-machines'

def get_ticab_cat(name, desc):
    text = (name + " " + desc).lower()
    if 'bitumen' in text or 'distributor' in text or 'bs-' in name.lower() or 'emulsion' in text: return 'bitumen-emulsion-sprayers'
    if 'crack seal' in text or 'çatlak' in text or 'bpm-' in name.lower(): return 'crack-sealing-machine'
    if 'recycl' in text or 'geri dönüşüm' in text or 'ra-' in name.lower(): return 'asphalt-recycling-machines'
    if 'hotbox' in text or 'hb-' in name.lower(): return 'hotboxes'
    if 'heater' in text or 'ısıtıcı' in text or 'mira-' in name.lower(): return 'asphalt-heaters'
    if 'vacuum' in text or 'vakum' in text or 'süpürge' in text or 'city clean' in text: return 'street-vacuum-cleaner'
    if 'paver' in text or 'serici' in text or 'rp-' in name.lower(): return 'asphalt-paver'
    if 'loader' in text or 'yükleyici' in text: return 'mini-loaders'
    if 'salt' in text or 'sand' in text or 'spreader' in text or 'tuz' in text or 'kum' in text or 'rps-' in name.lower() or 'snow plow' in text or 'sb-' in name.lower(): return 'salt-sand-spreaders'
    return None

for p in products:
    brand = p.get('brand', '').lower()
    name = p.get('nameEn') or p.get('name', '')
    desc = p.get('descriptionEn') or p.get('description', '')
    
    if brand == 'cedima':
        cat = get_cedima_cat(name, desc)
        if cat:
            p['brandCategory'] = cat
    elif brand == 'ticab':
        cat = get_ticab_cat(name, desc)
        if cat:
            p['brandCategory'] = cat
        else:
            print(f"Ticab product not categorized: {name}")

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Categorization complete.")
