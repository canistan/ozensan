import requests
from bs4 import BeautifulSoup
import json
import re
import urllib.parse
from pathlib import Path

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def get_product_links(category_url):
    print(f"Fetching category: {category_url}")
    r = requests.get(category_url, headers=headers)
    if r.status_code != 200:
        print(f"Error fetching category: {r.status_code}")
        return []
    soup = BeautifulSoup(r.text, 'html.parser')
    links = set()
    for a in soup.select('a[href^="/en-gb/products/"]'):
        links.add('https://www.gce-industrial.com' + a['href'])
    return list(links)

def scrape_product(url, category):
    print(f"Scraping {url}")
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        return None
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Name
    name_el = soup.find('h1')
    name = name_el.text.strip() if name_el else 'Unknown'
    
    # Image
    image = ""
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if 'cdn.sanity.io' in src and 'jpg' in src or 'png' in src:
            # Parse NextJS image URL
            if src.startswith('/_next/image?url='):
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(src).query)
                if 'url' in parsed:
                    image = parsed['url'][0]
                    break
    
    # Description
    paragraphs = [p.text.strip() for p in soup.find_all('p') if len(p.text.strip()) > 50]
    description = paragraphs[0] if paragraphs else ''
    
    # Tables -> Features / Tech Specs
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
    
    # Generate a slug
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    
    return {
        'id': f'gce-{slug}',
        'slug': slug,
        'brand': 'GCE',
        'nameEn': name,
        'name': name, # Will translate later
        'descriptionEn': description,
        'description': description, # Will translate later
        'image': image,
        'featuresEn': features,
        'features': features,
        'technicalDataEn': technicalData,
        'technicalData': technicalData,
        'solutions': ['metal-isleme'],
        'brandCategory': category
    }

if __name__ == '__main__':
    # Just testing with Nozzles
    urls = [
        ('tips-nozzles', 'https://www.gce-industrial.com/en-gb/categories/nozzles?brands=gce&limit=100')
    ]
    
    all_products = []
    for cat_id, cat_url in urls:
        links = get_product_links(cat_url)
        print(f"Found {len(links)} links in {cat_id}")
        # To avoid rate limit or long run, let's just do first 5 for now as a PoC
        for link in links[:5]:
            prod = scrape_product(link, cat_id)
            if prod:
                all_products.append(prod)
                
    with open('gce_raw_test.json', 'w', encoding='utf-8') as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(all_products)} products to gce_raw_test.json")
