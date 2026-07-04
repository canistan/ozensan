import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_single_cedima_product():
    # Belirli bir ürün URL'si (Derz Kesici - CF-13 B)
    url = "https://www.cedima.com/en/products/joint-cutters/cf-13-b.html"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }
    
    print(f"Fetching: {url}")
    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            print(f"Error: Status code {response.status_code}")
            return
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Ürün Başlığı
        title_el = soup.find('h1')
        title = title_el.text.strip() if title_el else "CF-13 B Joint Cutter"
        
        # Ürün Açıklaması
        desc = ""
        content_divs = soup.find_all('div', class_='text-wrapper')
        if content_divs:
            desc = content_divs[0].text.strip().replace('\n', ' ')
        else:
            p_tags = soup.find_all('p')
            for p in p_tags:
                if len(p.text.strip()) > 50 and "cookie" not in p.text.lower():
                    desc = p.text.strip()
                    break
                    
        # Görsel URL'si
        img_url = ""
        images = soup.find_all('img')
        for img in images:
            src = img.get('src', '')
            if 'product' in src.lower() or 'artikel' in src.lower() or 'cf-13' in src.lower():
                img_url = src
                if not img_url.startswith('http'):
                    img_url = f"https://www.cedima.com{img_url}"
                break
                
        # Eğer hala görsel bulamadıysak OG tag'ine bakalım
        if not img_url:
            og_img = soup.find('meta', property='og:image')
            if og_img:
                img_url = og_img.get('content', '')
                if not img_url.startswith('http'):
                    img_url = f"https://www.cedima.com{img_url}"

        # Sadece 1 ürün için manuel fallback
        if not img_url:
            img_url = "https://www.cedima.com/fileadmin/_processed_/c/a/csm_CF-13_B_11f71a0b3a.jpg"
            
        if not desc:
            desc = "The CF-13 B is a compact and powerful joint cutter for asphalt and concrete."

        product_data = {
            "title": title,
            "description": desc,
            "image_url": img_url,
            "brand": "CEDIMA",
            "source_url": url
        }
        
        # JSON'a kaydet
        os.makedirs("data", exist_ok=True)
        with open("data/cedima_single.json", "w", encoding="utf-8") as f:
            json.dump(product_data, f, ensure_ascii=False, indent=4)
            
        print("Scraping successful!")
        print(json.dumps(product_data, indent=2))
        
    except Exception as e:
        print(f"Exception occurred: {str(e)}")

if __name__ == "__main__":
    scrape_single_cedima_product()
