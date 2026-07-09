import requests
from bs4 import BeautifulSoup
import json
import re
import urllib.parse
import time

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

categories = [
    ('tips-nozzles', 'https://www.gce-industrial.com/en-gb/categories/nozzles?brands=gce&limit=20'),
    ('regulators', 'https://www.gce-industrial.com/en-gb/categories/regulators?brands=gce&limit=20'),
    ('valves-arrestors', 'https://www.gce-industrial.com/en-gb/categories/valves?brands=gce&limit=20'),
    ('automated-cutting', 'https://www.gce-industrial.com/en-gb/categories/automated-cutting?brands=gce&limit=20'),
    ('gas-generators', 'https://www.gce-industrial.com/en-gb/categories/gas-generators?brands=gce&limit=20')
]

# Simple dictionary for common terms to translate Names & Descriptions
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
    'gas control solutions for general and steel fabrication': 'Genel ve çelik üretimi için gaz kontrol çözümleri',
    'from portable kits to full workshop gas supply systems.': 'taşınabilir setlerden tam donanımlı atölye gaz tedarik sistemlerine kadar.'
}

def translate(text):
    if not text: return text
    res = text
    for eng, tr in EN_TO_TR.items():
        res = re.sub(re.escape(eng), tr, res, flags=re.IGNORECASE)
    return res

def get_product_links(category_url):
    print(f"Fetching category: {category_url}")
    r = requests.get(category_url, headers=headers)
    if r.status_code != 200:
        return []
    soup = BeautifulSoup(r.text, 'html.parser')
    links = set()
    for a in soup.select('a[href^="/en-gb/products/"]'):
        links.add('https://www.gce-industrial.com' + a['href'])
    return list(links)

def scrape_product(url, category):
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        return None
    soup = BeautifulSoup(r.text, 'html.parser')
    
    name_el = soup.find('h1')
    name = name_el.text.strip() if name_el else 'Unknown'
    
    image = ""
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if 'cdn.sanity.io' in src and ('jpg' in src or 'png' in src):
            if src.startswith('/_next/image?url='):
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(src).query)
                if 'url' in parsed:
                    image = parsed['url'][0]
                    break
    
    paragraphs = [p.text.strip() for p in soup.find_all('p') if len(p.text.strip()) > 50]
    description = paragraphs[0] if paragraphs else 'High quality gas equipment from GCE.'
    
    features = []
    technicalData = []
    tables = soup.find_all('table')
    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cols = [col.text.strip() for col in row.find_all(['th', 'td'])]
            if len(cols) == 2:
                if 'Feature' in cols[0] or 'Benefit' in cols[0]:
                    features.append(cols[1])
                else:
                    technicalData.append({'param': cols[0], 'value': cols[1], 'accessory': ''})
    
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    
    return {
        'id': f'gce-{slug}',
        'slug': slug,
        'brand': 'GCE',
        'nameEn': name,
        'name': translate(name),
        'descriptionEn': description,
        'description': translate(description),
        'image': image,
        'featuresEn': features,
        'features': [translate(f) for f in features],
        'technicalDataEn': technicalData,
        'technicalData': [{'param': translate(td['param']), 'value': translate(td['value']), 'accessory': ''} for td in technicalData],
        'solutions': ['metal-isleme'],
        'brandCategory': category
    }

if __name__ == '__main__':
    all_products = []
    
    for cat_id, cat_url in categories:
        links = get_product_links(cat_url)
        print(f"Found {len(links)} links in {cat_id}")
        
        # Scrape top 10 products per category to be safe and quick
        for link in links[:10]:
            print(f"Scraping: {link}")
            prod = scrape_product(link, cat_id)
            if prod:
                all_products.append(prod)
            time.sleep(0.5) # Anti rate-limit
            
    # Load existing products
    with open('src/data/products.json', 'r', encoding='utf-8') as f:
        existing_products = json.load(f)
        
    # Append new GCE products (avoid duplicates)
    existing_slugs = set([p['slug'] for p in existing_products])
    added = 0
    for p in all_products:
        if p['slug'] not in existing_slugs:
            existing_products.append(p)
            existing_slugs.add(p['slug'])
            added += 1
            
    with open('src/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(existing_products, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully added {added} GCE products to the database.")
