import requests
from bs4 import BeautifulSoup
import json
import os
from PIL import Image
import io

def scrape_cedima_product(url):
    print(f"Scraping product: {url}")
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("Failed to fetch product page.")
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Try to extract basic product info (this depends on Cedima's exact HTML structure)
    title_el = soup.find('h1')
    title = title_el.text.strip() if title_el else "Unknown Product"
    
    desc_el = soup.find('div', class_='description') or soup.find('div', itemprop='description')
    description = desc_el.text.strip() if desc_el else "No description available."
    
    # Find the main image
    img_el = soup.find('img', class_='product-image') or soup.find('img', itemprop='image')
    # fallback
    if not img_el:
        images = soup.find_all('img')
        for img in images:
            if 'product' in img.get('src', '').lower() or 'artikel' in img.get('src', '').lower():
                img_el = img
                break
                
    img_url = img_el.get('src') if img_el else None
    if img_url and not img_url.startswith('http'):
        img_url = "https://www.cedima.com" + img_url

    print(f"Found Title: {title}")
    print(f"Found Image URL: {img_url}")
    
    webp_path = None
    if img_url:
        webp_path = download_and_convert_to_webp(img_url, title)
        
    product_data = {
        "title": title,
        "description": description,
        "original_url": url,
        "brand": "Cedima",
        "local_image_path": webp_path
    }
    
    return product_data

def download_and_convert_to_webp(img_url, title):
    print(f"Downloading image from {img_url}")
    try:
        response = requests.get(img_url)
        if response.status_code == 200:
            img = Image.open(io.BytesIO(response.content))
            
            # Convert to RGB if RGBA to save as WebP without alpha if needed, but WebP supports alpha.
            
            safe_title = "".join([c for c in title if c.isalpha() or c.isdigit() or c==' ']).rstrip().replace(" ", "_").lower()
            if not safe_title:
                safe_title = "product"
                
            os.makedirs("data/images", exist_ok=True)
            filename = f"data/images/{safe_title}.webp"
            
            img.save(filename, "webp", optimize=True, quality=80)
            print(f"Image successfully optimized and saved as {filename}")
            return filename
    except Exception as e:
        print(f"Failed to process image: {e}")
    return None

if __name__ == "__main__":
    # Test with a known product category or page
    test_url = "https://www.cedima.com/en/applications/core-drilling/core-drilling-equipment.html"
    product = scrape_cedima_product(test_url)
    
    if product:
        os.makedirs("data", exist_ok=True)
        with open("data/sample_cedima_product.json", "w", encoding="utf-8") as f:
            json.dump(product, f, indent=4, ensure_ascii=False)
        print("Product data saved to data/sample_cedima_product.json")
