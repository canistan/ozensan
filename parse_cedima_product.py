import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json

url = "https://www.cedima.com/products/details/fugenschneider-50008154.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Get Title
        h1 = soup.find('h1')
        title = h1.get_text(strip=True) if h1 else "Unknown"
        
        # Get Description (Usually in an intro paragraph)
        intro = soup.find('div', class_='intro')
        if not intro:
            intro = soup.find('div', class_='content')
        desc = intro.get_text(" ", strip=True) if intro else ""
        
        # Get Image
        img_container = soup.find('div', class_='image') or soup.find('img')
        img_url = ""
        if img_container and img_container.name == 'img':
            img_url = img_container.get('src', '')
        elif img_container and 'background-image' in img_container.get('style', ''):
            style = img_container['style']
            import re
            m = re.search(r"url\(['\"]?([^'\")]+)", style)
            if m:
                img_url = m.group(1)
        if img_url:
            img_url = urllib.parse.urljoin(url, img_url)

        # Get Tech Data
        tech_data = []
        table = soup.find('table')
        if table:
            rows = table.find_all('tr')
            for r in rows:
                cols = r.find_all(['td', 'th'])
                if len(cols) >= 2:
                    k = cols[0].get_text(strip=True)
                    v = cols[1].get_text(strip=True)
                    if k and v:
                        tech_data.append(f"{k}: {v}")

        print(f"Title: {title}")
        print(f"Image: {img_url}")
        print(f"Desc: {desc[:200]}...")
        print("Tech Data:")
        for t in tech_data[:5]:
            print("  ", t)

except Exception as e:
    print("Error:", e)
