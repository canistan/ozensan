import os
import json
import time
import requests
import re
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
from deep_translator import GoogleTranslator

# Categories mapping
URLS = [
    # Yol Yapım ve Bakım (yol-yapim-ve-bakim)
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-2000", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000-sp", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500-pro", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-200", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/bcm-120", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/crack-sealing-machines/bpm-500", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/crack-sealing-machines/bpm-100", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/crack-sealing-machines/bpm-120", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/crack-sealing-machines/hl-1", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/asphalt-heaters/mira-1", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/asphalt-heaters/mira-3", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/asphalt-heaters/mira-4", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/recyclers/ra-800", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/hot-boxes/hb-1", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/hot-boxes/hb-2", "yol-yapim-ve-bakim"),
    ("https://www.ticabltd.com/asphalt-pavers/mp-1100", "yol-yapim-ve-bakim"),
    
    # Çevre ve Belediye Ekipmanları (cevre-ve-belediye-ekipmanlari)
    ("https://www.ticabltd.com/sand-salt-spreaders/rps-9000", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/sand-salt-spreaders/rps-6000", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/sand-salt-spreaders/rps-1500", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/accessories/sb-3000", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/loaders/ti-car-125", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/loaders/ti-car-225", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/accessories/ti-car", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/street-vacuum-cleaners/city-ant", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/street-vacuum-cleaners/city-beetle", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/street-vacuum-cleaners/um-130", "cevre-ve-belediye-ekipmanlari"),
    ("https://www.ticabltd.com/accessories/rbu-2000", "cevre-ve-belediye-ekipmanlari")
]

IMAGE_DIR = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/public/brands/ticab"
os.makedirs(IMAGE_DIR, exist_ok=True)

translator = GoogleTranslator(source='auto', target='tr')

def extract_product_data(url, solution_slug):
    print(f"Scraping {url}...", flush=True)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=30000, wait_until="domcontentloaded")
            page.wait_for_timeout(3000) # wait a bit for images and content to render
            
            # Name
            title_text = page.title()
            if '|' in title_text:
                name_en = title_text.split('|')[0].strip()
            else:
                name_en = title_text.strip()
                
            # If the name is something like "Bitumen Spraying Machine ABS-8000", maybe extract just the model, 
            # but we can just use the whole name.
            name_en = name_en.replace("TICAB LTD", "").replace("- Road Maintenance Equipment", "").strip(" -|")
            
            # Slug
            url_parts = url.strip('/').split('/')
            slug = url_parts[-1].lower().replace(" ", "-")
            
            # Description
            description_en = page.evaluate("() => { const meta = document.querySelector('meta[property=\"og:description\"]'); return meta ? meta.content : ''; }")
            if not description_en:
                description_en = name_en + " manufactured by TICAB."
                
            # Translate
            try:
                name_tr = translator.translate(name_en)
                description_tr = translator.translate(description_en)
            except:
                name_tr = name_en
                description_tr = description_en
                
            # Extract Technical Specs
            # Look for elements containing "SPECIFICATIONS" or "TECHNICAL SPECIFICATIONS"
            tech_data = []
            text_content = page.evaluate("document.body.innerText")
            
            lines = [line.strip() for line in text_content.split('\n') if line.strip()]
            in_specs = False
            for line in lines:
                if "SPECIFICATION" in line.upper() or "TECHNICAL" in line.upper():
                    in_specs = True
                    continue
                if in_specs:
                    # if we hit something that looks like a footer or next section, stop
                    if "GET A QUOTE" in line.upper() or "SUBSCRIBE" in line.upper() or "CONTACT" in line.upper():
                        break
                    
                    if ':' in line or '-' in line:
                        parts = []
                        if ':' in line:
                            parts = line.split(':', 1)
                        else:
                            parts = line.split('-', 1)
                            
                        if len(parts) == 2:
                            param = parts[0].strip()
                            val = parts[1].strip()
                            if len(param) > 2 and len(val) > 0 and len(param) < 50:
                                try:
                                    param_tr = translator.translate(param)
                                    val_tr = translator.translate(val) # values like "8000 L" translate fine
                                except:
                                    param_tr = param
                                    val_tr = val
                                tech_data.append({
                                    "parameter": param_tr,
                                    "value": val_tr
                                })
                    
                    if len(tech_data) > 15: # usually not more than 15 specs
                        break
                        
            # Images
            images = page.evaluate('''() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs.map(img => img.src).filter(src => src && !src.includes('svg') && !src.includes('logo') && !src.includes('icon'));
            }''')
            
            image_url = None
            for img in images:
                if 'static.wixstatic.com/media' in img:
                    image_url = img
                    break
                    
            browser.close()
            
            data = {
                "slug": slug,
                "brand": "ticab",
                "solutions": [solution_slug],
                "name": name_tr,
                "nameEn": name_en,
                "description": description_tr,
                "descriptionEn": description_en,
                "image": f"/brands/ticab/{slug}.webp",
                "technicalData": tech_data
            }
            
            # Download image
            if image_url:
                try:
                    img_response = requests.get(image_url, timeout=10)
                    if img_response.status_code == 200:
                        img_path = os.path.join(IMAGE_DIR, f"{slug}.webp")
                        with open(img_path, 'wb') as f:
                            f.write(img_response.content)
                        print(f"  -> Downloaded image for {slug}", flush=True)
                except Exception as e:
                    print(f"  -> Failed to download image: {e}", flush=True)
            
            return data
            
    except Exception as e:
        print(f"Failed processing {url}: {e}", flush=True)
        return None

def main():
    results = []
    for url, solution in URLS:
        data = extract_product_data(url, solution)
        if data:
            results.append(data)
        time.sleep(1)
        
    out_file = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/ticab_products.json"
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"Scraped {len(results)} products to {out_file}", flush=True)

if __name__ == "__main__":
    main()
