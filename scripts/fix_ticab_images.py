import os
import time
import requests
from playwright.sync_api import sync_playwright

URLS = [
    # Yol Yapım ve Bakım (yol-yapim-ve-bakim)
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-2000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000-sp",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500-pro",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-200",
    "https://www.ticabltd.com/bcm-120",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-500",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-100",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-120",
    "https://www.ticabltd.com/crack-sealing-machines/hl-1",
    "https://www.ticabltd.com/asphalt-heaters/mira-1",
    "https://www.ticabltd.com/asphalt-heaters/mira-3",
    "https://www.ticabltd.com/asphalt-heaters/mira-4",
    "https://www.ticabltd.com/recyclers/ra-800",
    "https://www.ticabltd.com/hot-boxes/hb-1",
    "https://www.ticabltd.com/hot-boxes/hb-2",
    "https://www.ticabltd.com/asphalt-pavers/mp-1100",
    
    # Çevre ve Belediye Ekipmanları (cevre-ve-belediye-ekipmanlari)
    "https://www.ticabltd.com/sand-salt-spreaders/rps-9000",
    "https://www.ticabltd.com/sand-salt-spreaders/rps-6000",
    "https://www.ticabltd.com/sand-salt-spreaders/rps-1500",
    "https://www.ticabltd.com/accessories/sb-3000",
    "https://www.ticabltd.com/loaders/ti-car-125",
    "https://www.ticabltd.com/loaders/ti-car-225",
    "https://www.ticabltd.com/accessories/ti-car",
    "https://www.ticabltd.com/street-vacuum-cleaners/city-ant",
    "https://www.ticabltd.com/street-vacuum-cleaners/city-beetle",
    "https://www.ticabltd.com/street-vacuum-cleaners/um-130",
    "https://www.ticabltd.com/accessories/rbu-2000"
]

IMAGE_DIR = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/public/brands/ticab"

def fix_images():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        for url in URLS:
            slug = url.strip('/').split('/')[-1].lower().replace(" ", "-")
            print(f"Fixing image for {slug}...")
            
            try:
                page.goto(url, timeout=30000, wait_until="domcontentloaded")
                page.wait_for_timeout(3000)
                
                # Try to get gallery image specifically, otherwise fall back to next static image
                images = page.evaluate('''() => {
                    const imgs = Array.from(document.querySelectorAll('img'));
                    // Prefer gallery images
                    const gallery = imgs.filter(img => img.className && img.className.includes('gallery'));
                    if(gallery.length > 0) {
                        return gallery.map(i => i.src);
                    }
                    
                    // Fallback to static image that is not the hero banner (usually banner has 1280 width)
                    const contentImgs = imgs.map(img => img.src).filter(src => src && src.includes('static.wixstatic.com/media') && !src.includes('svg') && !src.includes('logo') && !src.includes('icon'));
                    
                    if (contentImgs.length > 1) {
                        return [contentImgs[1]]; // skip the first one which is usually the blue wave
                    }
                    return contentImgs;
                }''')
                
                image_url = None
                if images and len(images) > 0:
                    image_url = images[0]
                        
                if image_url:
                    try:
                        img_response = requests.get(image_url, timeout=10)
                        if img_response.status_code == 200:
                            img_path = os.path.join(IMAGE_DIR, f"{slug}.webp")
                            with open(img_path, 'wb') as f:
                                f.write(img_response.content)
                            print(f"  -> Replaced image for {slug}", flush=True)
                    except Exception as e:
                        print(f"  -> Failed to download image: {e}", flush=True)
                else:
                    print(f"  -> No valid image found for {slug}", flush=True)
                    
            except Exception as e:
                print(f"Failed processing {url}: {e}", flush=True)
                
        browser.close()

if __name__ == "__main__":
    fix_images()
