import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json
import os
from deep_translator import GoogleTranslator
from PIL import Image

def translate_text(text):
    if not text: return ""
    try:
        return GoogleTranslator(source='en', target='tr').translate(text)
    except:
        return text

def optimize_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        if img.mode in ('RGBA', 'LA'):
            background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
            background.paste(img, img.split()[-1])
            img = background
        max_width = 800
        if img.width > max_width:
            ratio = max_width / float(img.width)
            new_height = int((float(img.height) * float(ratio)))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        img.save(output_path, "WEBP", quality=80)
        return True
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")
        return False

with open("duss_chiselling_urls.json", "r") as f:
    urls = json.load(f)

temp_dir = "public/temp_duss_chiselling"
os.makedirs(temp_dir, exist_ok=True)

raw_products = []
print(f"Starting to scrape {len(urls)} DUSS Chiselling machines...")

for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            
            # Title
            h1 = soup.find('h1')
            title_en = h1.get_text(strip=True) if h1 else "Unknown DUSS Machine"
            title_tr = translate_text(title_en)
            print(f"[{i+1}/{len(urls)}] Scraping: {title_en}")
            
            slug = "duss-" + title_en.lower().replace(" ", "-").replace(".", "-").replace("/", "")
            
            # Specs
            specs_en = []
            specs_tr = []
            table = soup.find('table')
            if table:
                for row in table.find_all('tr'):
                    cols = row.find_all(['th', 'td'])
                    if len(cols) >= 2:
                        param_en = cols[0].get_text(strip=True)
                        val = cols[1].get_text(strip=True)
                        specs_en.append({"param": param_en, "value": val})
                        specs_tr.append({"param": translate_text(param_en), "value": val})
            
            # Description & Features
            desc_en = ""
            features_en = []
            features_tr = []
            
            for text_div in soup.find_all('div', class_='text'):
                p = text_div.find('p')
                if p and len(p.get_text(strip=True)) > 20:
                    if not desc_en:
                        desc_en = p.get_text(" ", strip=True)
                
                ul = text_div.find('ul')
                if ul:
                    for li in ul.find_all('li'):
                        feat = li.get_text(strip=True)
                        if feat:
                            features_en.append(feat)
                            features_tr.append(translate_text(feat))
            
            desc_tr = translate_text(desc_en) if desc_en else ""
            
            # Image
            img_url = ""
            local_image_path = ""
            for img in soup.find_all('img'):
                src = img.get('src', '')
                if 'products/_hero' in src or '_hero' in src:
                    img_url = urllib.parse.urljoin("https://www.duss.com/", src)
                    break
            
            if img_url:
                parsed = urllib.parse.urlsplit(img_url)
                encoded_path = urllib.parse.quote(parsed.path)
                fixed_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, encoded_path, parsed.query, parsed.fragment))
                
                temp_img = os.path.join(temp_dir, f"{slug}_original.png")
                final_img = os.path.join(temp_dir, f"{slug}.webp")
                
                img_req = urllib.request.Request(fixed_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                    with open(temp_img, "wb") as f_img:
                        f_img.write(img_resp.read())
                        
                if optimize_image(temp_img, final_img):
                    local_image_path = final_img
                os.remove(temp_img)
            
            raw_products.append({
                "slug": slug,
                "brand": "duss",
                "name": title_tr,
                "nameEn": title_en,
                "image": local_image_path,
                "description": desc_tr,
                "descriptionEn": desc_en,
                "features": features_tr,
                "featuresEn": features_en,
                "technicalData": specs_tr,
                "technicalDataEn": specs_en,
                "solutions": ["profesyonel-delme-yikim"], 
                "isFeatured": False
            })
            
    except Exception as e:
        print(f"Error scraping {url}: {e}")

with open("raw_duss_chiselling.json", "w", encoding="utf-8") as f:
    json.dump(raw_products, f, ensure_ascii=False, indent=2)

print("Scraping and translation completed to raw_duss_chiselling.json")
