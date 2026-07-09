import requests
from bs4 import BeautifulSoup
import json
import re
import urllib.parse
import time
import os
from deep_translator import GoogleTranslator

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

# GCE'nin tüm ana kategorileri
CATEGORIES = [
    ('nozzles', 'https://www.gce-industrial.com/en-gb/categories/nozzles?brands=gce&limit=48'),
    ('combi-torches', 'https://www.gce-industrial.com/en-gb/categories/combi-torches?brands=gce&limit=48'),
    ('welding-torches', 'https://www.gce-industrial.com/en-gb/categories/welding-torches?brands=gce&limit=48'),
    ('cylinder-regulators', 'https://www.gce-industrial.com/en-gb/categories/cylinder-regulators?brands=gce&limit=48'),
    ('propane-regulators', 'https://www.gce-industrial.com/en-gb/categories/propane-regulators?brands=gce&limit=48'),
    ('flashback-arrestors', 'https://www.gce-industrial.com/en-gb/categories/flashback-arrestors?brands=gce&limit=48'),
    ('standard-cylinder-valves', 'https://www.gce-industrial.com/en-gb/categories/standard-cylinder-valves?brands=gce&limit=48'),
    ('automated-torches-systems', 'https://www.gce-industrial.com/en-gb/categories/automated-torches-systems?brands=gce&limit=48'),
    ('machine-cutting-nozzles', 'https://www.gce-industrial.com/en-gb/categories/machine-cutting-nozzles?brands=gce&limit=48'),
    ('hoses', 'https://www.gce-industrial.com/en-gb/categories/hoses?brands=gce&limit=48'),
]

# Çeviri sonrası Türkçe metni profesyonel endüstriyel jargona düzeltme sözlüğü
POST_TRANSLATION_DICT = {
    r'\bkesme memesi\b': 'Kesme Ucu',
    r'\bkesme ağızlığı\b': 'Kesme Ucu',
    r'\bkaynak torcu\b': 'Kaynak Hamlacı',
    r'\bkesme torcu\b': 'Kesme Hamlacı',
    r'\balev tutucu\b': 'Alev Geri Tepme Emniyet Valfi',
    r'\bgeri tepme valfi\b': 'Alev Geri Tepme Emniyet Valfi',
    r'\bsilindir regülatörü\b': 'Tüp Regülatörü',
    r'\bsilindir valfi\b': 'Tüp Vanası',
    r'\bkatı bakır\b': 'Som Bakır',
    r'\bmasif bakır\b': 'Som Bakır',
    r'\bağır görev\b': 'Ağır Hizmet Tipi',
    r'\byoğun hizmet\b': 'Ağır Hizmet Tipi',
}

BANNED_TEXTS = [
    'Gas control solutions for general and steel fabrication',
    'Looking for relevant accessories',
    'You can have confidence in our global network',
    'Copyright',
    'Visit ESAB site'
]

BANNER_ALTS = [
    'torches and nozzles', 'fabrication', 'regulators', 'valves', 
    'automated cutting', 'gas generators', 'logo', 'gce', 'esab'
]

def translate_to_turkish(english_text):
    if not english_text: return english_text
    try:
        # Gerçek cümle çevirisi (Yapay Zeka / Google Translate)
        tr_text = GoogleTranslator(source='en', target='tr').translate(english_text)
        
        # Çeviri sonrası amatör terimleri profesyonel sanayi terimleriyle değiştir
        for wrong_pattern, correct_term in POST_TRANSLATION_DICT.items():
            tr_text = re.sub(wrong_pattern, correct_term, tr_text, flags=re.IGNORECASE)
            
        return tr_text
    except Exception as e:
        print(f"Çeviri hatası: {e}")
        return english_text

def get_product_links(category_url):
    print(f"[*] Taranıyor: {category_url}")
    r = requests.get(category_url, headers=headers)
    if r.status_code != 200:
        return []
    soup = BeautifulSoup(r.text, 'html.parser')
    links = set()
    for a in soup.find_all('a', href=True):
        if '/en-gb/products/' in a['href']:
            links.add('https://www.gce-industrial.com' + a['href'])
    return list(links)

def scrape_product(url, category):
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        return None
    soup = BeautifulSoup(r.text, 'html.parser')
    
    h1 = soup.find('h1')
    name = h1.text.strip() if h1 else 'Bilinmeyen Ürün'
    
    image_url = ""
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '').lower().strip()
        if 'cdn.sanity.io' in src and not any(b in alt for b in BANNER_ALTS):
            if src.startswith('/_next/image?url='):
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(src).query)
                if 'url' in parsed:
                    image_url = parsed['url'][0]
                    break
    
    description_en = ""
    for p in soup.find_all('p'):
        text = p.text.strip()
        if len(text) > 30 and not any(b.lower() in text.lower() for b in BANNED_TEXTS):
            description_en = text
            break 
            
    if not description_en:
        description_en = name
        
    technicalData = []
    tables = soup.find_all('table')
    for table in tables:
        for row in table.find_all('tr'):
            cols = [c.text.strip() for c in row.find_all(['th', 'td'])]
            if len(cols) == 2 and cols[0] != '':
                technicalData.append({
                    'param': cols[0],
                    'value': cols[1],
                    'accessory': ''
                })
    
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return {
        'id': f'gce-{slug}',
        'slug': slug,
        'brand': 'gce',
        'nameEn': name,
        'name': translate_to_turkish(name),
        'descriptionEn': description_en,
        'description': translate_to_turkish(description_en),
        'image': image_url,
        'featuresEn': [],
        'features': [],
        'technicalDataEn': technicalData,
        'technicalData': [{'param': translate_to_turkish(td['param']), 'value': translate_to_turkish(td['value']), 'accessory': ''} for td in technicalData],
        'solutions': ['metal-isleme'],
        'brandCategory': category
    }

if __name__ == '__main__':
    print("=== GCE YAPI KONTROL VE GERÇEK ÇEVİRİ BAŞLIYOR (10 ADET) ===")
    all_new_products = []
    seen_urls = set()
    
    count = 0
    for cat_slug, cat_url in CATEGORIES:
        links = get_product_links(cat_url)
        
        for link in links:
            if link in seen_urls:
                continue
            seen_urls.add(link)
            print(f"  -> Ürün Çekiliyor & Çevriliyor: {link}")
            product_data = scrape_product(link, cat_slug)
            if product_data:
                all_new_products.append(product_data)
                count += 1
                time.sleep(0.5)
            
    db_path = 'src/data/products.json'
    with open(db_path, 'r', encoding='utf-8') as f:
        existing_db = json.load(f)
        
    filtered_db = [p for p in existing_db if p.get('brand') != 'gce']
    filtered_db.extend(all_new_products)
    
    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(filtered_db, f, indent=2, ensure_ascii=False)
        
    print("[+] Test veritabanı başarıyla güncellendi!")
