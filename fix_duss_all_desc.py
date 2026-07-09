import json
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator
import time

def translate_text(text):
    if not text: return ""
    try:
        return GoogleTranslator(source='en', target='tr').translate(text)
    except:
        return text

def extract_desc(soup):
    for h2 in soup.find_all('h2', class_='headline'):
        title = h2.text.strip().lower()
        if title in ['action', 'description', 'application', 'overview', '']:
            p = h2.find_next_sibling('p')
            if p:
                return p.text.strip()
    
    for p in soup.find_all('p'):
        text = p.text.strip()
        if len(text) > 30 and 'info@duss.de' not in text and 'DUSS is a modern' not in text and 'callback form' not in text and 'obligatory' not in text and 'broken' not in text:
            return text
    return ""

url_files = [
    'duss_accessories_urls.json',
    'duss_chiselling_urls.json',
    'duss_combi_urls.json',
    'duss_core_urls.json',
    'duss_drilling_urls.json'
]

urls = []
for f in url_files:
    try:
        with open(f, 'r') as file:
            urls.extend(json.load(file))
    except:
        pass

# Remove duplicates
urls = list(set(urls))

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Loaded {len(urls)} URLs. Starting update...")

updated_count = 0
for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            
            h1 = soup.find('h1')
            if not h1:
                continue
            title_en = h1.get_text(strip=True)
            slug = "duss-" + title_en.lower().replace(" ", "-").replace(".", "-").replace("/", "")
            
            desc_en = extract_desc(soup)
            if desc_en:
                desc_tr = translate_text(desc_en)
                
                # Find product in products.json and update
                for p in products:
                    if p['slug'] == slug:
                        p['descriptionEn'] = desc_en
                        p['description'] = desc_tr
                        updated_count += 1
                        print(f"Updated [{updated_count}]: {title_en} -> {desc_en[:50]}...")
                        break
    except Exception as e:
        print(f"Error on {url}: {e}")
        
    # sleep slightly to avoid rate limit
    time.sleep(0.5)

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"\nDone! Updated descriptions for {updated_count} DUSS products.")
