import requests
from bs4 import BeautifulSoup
import urllib.parse
import os

def download_logo(url, name):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # find img with 'logo' in class, id, src, or alt
        for img in soup.find_all('img'):
            src = img.get('src', '')
            class_str = " ".join(img.get('class', []))
            id_str = img.get('id', '')
            alt_str = img.get('alt', '')
            
            if 'logo' in src.lower() or 'logo' in class_str.lower() or 'logo' in id_str.lower() or 'logo' in alt_str.lower():
                img_url = urllib.parse.urljoin(url, src)
                print(f"Found {name} logo: {img_url}")
                img_data = requests.get(img_url, headers=headers).content
                ext = img_url.split('.')[-1].split('?')[0]
                if ext not in ['png', 'svg', 'jpg', 'jpeg']:
                    ext = 'png'
                with open(f"public/brands/{name}.{ext}", 'wb') as f:
                    f.write(img_data)
                return True
        print(f"Could not find logo for {name}")
    except Exception as e:
        print(f"Error for {name}: {e}")

download_logo('https://www.cedima.com/en/index.html', 'cedima')
download_logo('https://www.duss.com/en/', 'duss')
download_logo('https://www.ticabltd.com/', 'ticab')
download_logo('https://victorhardware.biz/', 'victor')
download_logo('https://www.gcegroup.com/', 'gce')
