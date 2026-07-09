import urllib.request
from bs4 import BeautifulSoup
import re
import urllib.parse

base_url = "https://www.cedima.com"
category_url = "https://www.cedima.com/en/applications/floor-sawing.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

req = urllib.request.Request(category_url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Products are usually in a grid or list. Let's find all links that look like products.
        links = soup.find_all('a', href=True)
        products = set()
        
        for a in links:
            href = a['href']
            # Cedima product pages usually look like /en/products/floor-sawing/cf-13.html
            if '/products/' in href and '.html' in href:
                full_url = urllib.parse.urljoin(base_url, href)
                products.add(full_url)
                
        print(f"Found {len(products)} potential product links in Floor Sawing:")
        for p in sorted(products):
            print(p)

except Exception as e:
    print("Error:", e)
