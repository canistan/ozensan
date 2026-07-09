import urllib.request
from bs4 import BeautifulSoup
import urllib.parse

category_url = "https://www.cedima.com/en/applications/floor-sawing.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

req = urllib.request.Request(category_url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        links = soup.find_all('a', href=True)
        products = set()
        
        for a in links:
            href = a['href']
            # Only print links that are internal
            if href.startswith('/') or 'cedima.com' in href:
                products.add(href)
                
        print(f"Found {len(products)} internal links in Floor Sawing:")
        for p in sorted(products):
            print(p)

except Exception as e:
    print("Error:", e)
