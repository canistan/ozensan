import json

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

def get_duss_cat(name, desc):
    text = (name + " " + desc).lower()
    if 'breaker' in text or 'demolition' in text or 'kırıcı' in text or 'yıkım' in text or 'pk' in name.lower() or 'px' in name.lower(): return 'breakers-demolition'
    if 'combi' in text or 'kombi' in text or 'p ' in name.lower() or 'rotary hammer' in text: return 'rotary-combi-hammers'
    if 'core' in text or 'karot' in text or 'dia' in name.lower() or 'elmas' in text: return 'diamond-core-drills'
    if 'drill' in text or 'matkap' in text or 'd ' in name.lower() or 'sb ' in name.lower() or 'b ' in name.lower(): return 'drills'
    return 'rotary-combi-hammers'

def get_victor_cat(name, desc):
    text = (name + " " + desc).lower()
    # Outfits & Kits
    if 'outfit' in text or 'kit' in text or 'medalist' in text or 'journeyman' in text or 'performer' in text or 'contender' in text or 'tote' in text: return 'outfits-kits'
    
    # Tips & Nozzles
    if 'tip' in text or 'nozzle' in text or 'uç' in text or 'memesi' in text: return 'tips-nozzles'
    
    # Regulators & Flowmeters
    if 'regulator' in text or 'regülatör' in text or 'flow' in text or 'metre' in text or 'gauge' in text: return 'regulators-flowmeters'
    
    # Valves & Arrestors
    if 'flashback' in text or 'arrestor' in text or 'valve' in text or 'emniyet' in text or 'valfi' in text: return 'valves-arrestors'
    
    # Torches & Handles
    if 'torch' in text or 'handle' in text or 'attachment' in text or 'hamlaç' in text or 'şalumo' in text or 'ca ' in name.lower() or 'wh ' in name.lower(): return 'torches'
    
    # Machines
    if 'machine' in text or 'manifold' in text or 'makine' in text or 'vcm100' in name.lower(): return 'machines-manifolds'
    
    return 'torches' # default for unmapped like CA 370 etc which is a cutting attachment

for p in products:
    brand = p.get('brand', '').lower()
    name = p.get('nameEn') or p.get('name', '')
    desc = p.get('descriptionEn') or p.get('description', '')
    
    if brand == 'duss':
        cat = get_duss_cat(name, desc)
        if cat:
            p['brandCategory'] = cat
    elif brand == 'victor':
        cat = get_victor_cat(name, desc)
        if cat:
            p['brandCategory'] = cat

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Categorization complete for Duss and Victor.")
