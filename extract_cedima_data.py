import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json
import time
import os

base_url = "https://www.cedima.com"
raw_products = []

with open("cedima_floor.html", "r") as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

links = soup.find_all('a', href=True)
product_urls = set()
for a in links:
    href = a['href']
    if '/products/details/' in href:
        product_urls.add(urllib.parse.urljoin(base_url, href))

print(f"Found {len(product_urls)} products to scrape.")

for url in list(product_urls): # limiting to all for now
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read()
            p_soup = BeautifulSoup(html, 'html.parser')
            
            # Title
            h2 = p_soup.find('h2', class_='ce_headline')
            title = h2.get_text(strip=True) if h2 else "Unknown"
            
            # Description
            text_divs = p_soup.find_all('div', class_='text')
            desc = ""
            if text_divs:
                desc = text_divs[0].get_text(" ", strip=True)
                
            # Image
            slider = p_soup.find('ul', id='slider')
            img_url = ""
            if slider:
                first_img = slider.find('a', href=True)
                if first_img:
                    img_url = urllib.parse.urljoin(base_url, first_img['href'])
            
            # Features
            features = []
            if len(text_divs) > 1:
                ul = text_divs[1].find('ul')
                if ul:
                    for li in ul.find_all('li'):
                        features.append(li.get_text(strip=True))
                        
            # Specs
            specs_list = []
            specs_div = p_soup.find('div', class_='specs')
            if specs_div:
                for li in specs_div.find_all('li'):
                    h6 = li.find('h6')
                    p = li.find('p')
                    if h6 and p:
                        specs_list.append({
                            "param": h6.get_text(strip=True).replace(":", ""),
                            "value": p.get_text(strip=True),
                            "accessory": "-"
                        })
                        
            raw_products.append({
                "slug": "cedima-" + title.lower().replace(" ", "-").replace(".", "-").replace("/", ""),
                "brand": "cedima",
                "nameEn": title,
                "descriptionEn": desc,
                "featuresEn": features,
                "technicalDataEn": specs_list,
                "image": img_url
            })
            print(f"Scraped: {title}")
            time.sleep(0.5)
            
    except Exception as e:
        print(f"Error scraping {url}: {e}")

with open("raw_floor_saws.json", "w", encoding="utf-8") as f:
    json.dump(raw_products, f, ensure_ascii=False, indent=2)
print("Finished scraping to raw_floor_saws.json")
