import urllib.request
from bs4 import BeautifulSoup
import urllib.parse

url = "https://www.cedima.com/en/applications/floor-sawing/floor-saws.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        links = soup.find_all('a', href=True)
        products = set()
        
        for a in links:
            href = a['href']
            text = a.get_text(strip=True)
            if 'cf-' in href.lower() or 'floor-sawing' in href:
                products.add((text, href))
                
        for text, href in sorted(products, key=lambda x: x[1]):
            print(f"{text}: {href}")

except Exception as e:
    print("Error:", e)
