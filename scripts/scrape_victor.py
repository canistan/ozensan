import os
import json
import argparse
import cloudscraper
import uuid
import re
import time
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator

def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text.strip())

def generate_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\-]+', '-', slug)
    return slug.strip('-')

def scrape_all():
    print(f"--- Starting Bulk Scrape ---")
    
    with open("scripts/victor_all_links.json", "r") as f:
        links = json.load(f)
        
    print(f"Loaded {len(links)} products to process.")

    scraper = cloudscraper.create_scraper()
    db_path = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/products.json"
    with open(db_path, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    existing_slugs = [p["slug"] for p in products]
    
    for i, url in enumerate(links):
        print(f"\n[{i+1}/{len(links)}] Scraping {url}")
        try:
            prod_res = scraper.get(url)
            prod_soup = BeautifulSoup(prod_res.text, "html.parser")
            
            h1 = prod_soup.find("h1")
            title = h1.text.strip() if h1 else None
            if not title:
                print("No title found, skipping.")
                continue
                
            slug = generate_slug(title)
            if slug in existing_slugs:
                print(f"Slug {slug} already exists, skipping.")
                continue
                
            desc_el = prod_soup.select_one(".product-description")
            desc = clean_text(desc_el.text) if desc_el else ""
            
            # Images
            img_src = None
            for img in prod_soup.select("img"):
                src = img.get("src", "")
                if "mut" in src and "assets.esab.com" in src:
                    img_src = src
                    break
                    
            if img_src and img_src.startswith("//"):
                img_src = "https:" + img_src
                
            # Panels
            highlights = []
            industries = []
            panels = prod_soup.select(".custom-panel")
            for p in panels:
                header = p.select_one(".custom-panel-header")
                if header:
                    htext = header.text.strip().lower()
                    body = p.select_one(".custom-panel-body") or p.select_one(".panel-content") or p
                    lis = [clean_text(li.text) for li in body.select("li")]
                    if "highlights" in htext:
                        highlights = lis
                    elif "industries" in htext:
                        industries = lis
                        
            # Translation
            translator = GoogleTranslator(source='en', target='tr')
            try:
                title_tr = translator.translate(title)
                desc_tr = translator.translate(desc) if desc else ""
                
                features_en = highlights
                features_tr = [translator.translate(f) for f in highlights] if highlights else []
                
                tech_data_en = [{"param": ind, "value": "Standard", "accessory": "-"} for ind in industries]
                tech_data_tr = [{"param": translator.translate(ind), "value": "Standart", "accessory": "-"} for ind in industries]
            except Exception as e:
                print("Translation error:", e)
                continue
                
            # Image download
            image_path = ""
            if img_src:
                try:
                    img_res = scraper.get(img_src)
                    if img_res.status_code == 200:
                        img_filename = f"{slug}.jpg"
                        with open(f"public/brands/victor/{img_filename}", "wb") as fimg:
                            fimg.write(img_res.content)
                        image_path = f"/brands/victor/{img_filename}"
                except Exception as e:
                    print("Failed to download image:", e)
            
            new_prod = {
                "id": str(uuid.uuid4()),
                "slug": slug,
                "name": title_tr,
                "nameEn": title,
                "categoryId": "other",  
                "brand": "victor",
                "image": image_path,
                "description": desc_tr,
                "descriptionEn": desc,
                "features": features_tr,
                "featuresEn": features_en,
                "technicalData": tech_data_tr,
                "technicalDataEn": tech_data_en
            }
            
            products.append(new_prod)
            existing_slugs.append(slug)
            print(f"Successfully added {title}!")
            
            # Save incrementally just in case
            with open(db_path, "w", encoding="utf-8") as f:
                json.dump(products, f, ensure_ascii=False, indent=2)
                
            time.sleep(1) # Be nice to their server
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            
    print(f"\nFinished processing all links. DB updated.")

if __name__ == "__main__":
    scrape_all()
