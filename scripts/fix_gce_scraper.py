import json
import requests
from bs4 import BeautifulSoup
import re
import urllib.parse
import time

headers = {'User-Agent': 'Mozilla/5.0'}

# Load current products
with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

gce_products = [p for p in products if p.get('brand') == 'gce']
print(f"Found {len(gce_products)} GCE products to fix.")

EN_TO_TR = {
    'cutting nozzle': 'Kesme Ucu',
    'welding torch': 'Kaynak Hamlacı',
    'regulator': 'Regülatörü',
    'cylinder': 'Tüp',
    'valve': 'Valf',
    'propane': 'Propan',
    'acetylene': 'Asetilen',
    'oxygen': 'Oksijen',
    'arrestor': 'Emniyet Valfi',
    'flashback': 'Alev Geri Tepme',
    'machine': 'Makinesi',
    'portable': 'Taşınabilir',
}

def translate(text):
    if not text: return text
    res = text
    for eng, tr in EN_TO_TR.items():
        res = re.sub(re.escape(eng), tr, res, flags=re.IGNORECASE)
    return res

for p in gce_products:
    slug = p['slug']
    url = f"https://www.gce-industrial.com/en-gb/products/{slug}"
    print(f"Fixing {url}...")
    
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        print(f"Failed to fetch {url}")
        continue
        
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Fix Image
    # Exclude known banner alts
    exclude_alts = ['torches and nozzles', 'fabrication', 'regulators', 'valves', 'automated cutting', 'gas generators']
    correct_img = None
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '').lower()
        if 'cdn.sanity.io' in src and alt not in exclude_alts:
            if src.startswith('/_next/image?url='):
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(src).query)
                if 'url' in parsed:
                    correct_img = parsed['url'][0]
                    break
                    
    if correct_img:
        p['image'] = correct_img
        print("  - Fixed image:", correct_img[:50] + "...")
        
    # Fix Description
    valid_paragraphs = []
    for para in soup.find_all('p'):
        text = para.text.strip()
        if len(text) > 50 and 'Gas control solutions for general and steel' not in text and 'Looking for relevant' not in text:
            valid_paragraphs.append(text)
            
    if valid_paragraphs:
        # The first valid paragraph is usually the short desc, the second is the long one. 
        # Let's take the longest one or combine them
        best_desc = " ".join(valid_paragraphs[:2])
        p['descriptionEn'] = best_desc
        p['description'] = translate(best_desc)
        print("  - Fixed description:", p['description'][:50] + "...")

    time.sleep(0.5)

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Finished fixing GCE products.")
