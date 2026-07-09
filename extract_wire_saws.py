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

with open("wire_saws_urls.json", "r") as f:
    urls = json.load(f)

temp_dir = "public/temp_wire_saws"
os.makedirs(temp_dir, exist_ok=True)

raw_products = []

print(f"Starting to scrape {len(urls)} wire saws...")
for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            
            # Title
            h2 = soup.find('h2', class_='ce_headline')
            title_en = h2.get_text(strip=True) if h2 else "Unknown"
            title_tr = translate_text(title_en)
            print(f"[{i+1}/{len(urls)}] Scraping: {title_en}")
            
            # Slug
            slug = "cedima-" + title_en.lower().replace(" ", "-").replace(".", "-").replace("/", "")
            
            # Description
            text_divs = soup.find_all('div', class_='text')
            desc_en = text_divs[0].get_text(" ", strip=True) if text_divs else ""
            desc_tr = translate_text(desc_en)
            
            # Features
            features_en = []
            features_tr = []
            if len(text_divs) > 1:
                ul = text_divs[1].find('ul')
                if ul:
                    for li in ul.find_all('li'):
                        f_en = li.get_text(strip=True)
                        features_en.append(f_en)
                        features_tr.append(translate_text(f_en))
                        
            # Specs
            specs_en = []
            specs_tr = []
            specs_div = soup.find('div', class_='specs')
            if specs_div:
                for li in specs_div.find_all('li'):
                    h6 = li.find('h6')
                    p = li.find('p')
                    if h6 and p:
                        param_en = h6.get_text(strip=True).replace(":", "")
                        val = p.get_text(strip=True)
                        specs_en.append({"param": param_en, "value": val})
                        specs_tr.append({"param": translate_text(param_en), "value": val})
                        
            # Image
            slider = soup.find('ul', id='slider')
            img_url = ""
            local_image_path = ""
            if slider:
                first_img = slider.find('a', href=True)
                if first_img:
                    img_url = urllib.parse.urljoin("https://www.cedima.com", first_img['href'])
                    
                    # Fix URL encoding
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
                "brand": "cedima",
                "name": title_tr,
                "nameEn": title_en,
                "image": local_image_path,
                "description": desc_tr,
                "descriptionEn": desc_en,
                "features": features_tr,
                "featuresEn": features_en,
                "technicalData": specs_tr,
                "technicalDataEn": specs_en,
                "solutions": ["halatli-kesme"],
                "isFeatured": False
            })
            
    except Exception as e:
        print(f"Error scraping {url}: {e}")

with open("raw_wire_saws.json", "w", encoding="utf-8") as f:
    json.dump(raw_products, f, ensure_ascii=False, indent=2)

print("Scraping and translation completed to raw_wire_saws.json")
