import requests
import json
import urllib.parse
from bs4 import BeautifulSoup
import re

queries = [
    ("Cedima CF-6032", "https://www.cedima.com"),
    ("DUSS PK 160 A", "https://www.duss.de"),
    ("Ticab BSE", "https://ticab.eu"),
    ("Victor EDGE 2.0", "https://esab.com"),
    ("GCE ProControl", "https://esab.com")
]

results = []

for q, domain in queries:
    print(f"Searching {q} on {domain}...")
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(q + ' site:' + domain)}"
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')
    a_tag = soup.find('a', class_='result__url')
    if a_tag:
        link = a_tag.get('href')
        # fetch link to get image
        if link.startswith('//'): link = 'https:' + link
        print(f"Found link: {link}")
        
        try:
            page = requests.get(link, headers=headers)
            psoup = BeautifulSoup(page.text, 'html.parser')
            # find first big image
            imgs = psoup.find_all('img')
            img_src = ""
            for img in imgs:
                src = img.get('src') or img.get('data-src')
                if src and ('product' in src.lower() or 'article' in src.lower() or 'upload' in src.lower() or 'media' in src.lower() or 'csm_' in src.lower()):
                    if not src.startswith('http'):
                        if src.startswith('/'):
                            src = domain + src
                        else:
                            src = domain + '/' + src
                    if '.jpg' in src.lower() or '.png' in src.lower() or '.webp' in src.lower():
                        img_src = src
                        break
            
            if img_src:
                results.append({"name": q, "image": img_src, "url": link})
                print(f"Found image: {img_src}")
            else:
                print("No image found on page")
        except Exception as e:
            print("Error parsing page:", e)
    else:
        print("No link found")

print(json.dumps(results, indent=2))
