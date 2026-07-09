import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json

url = "https://www.cedima.com/en/applications/hand-heldet-tools.html"
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        links = soup.find_all('a', href=True)
        products = set()
        
        for a in links:
            href = a['href']
            # Hand-held tools page has multiple subcategories: core drilling motors, ring saws, etc.
            # They all lead to /products/details/
            if '/products/details/' in href:
                full_url = urllib.parse.urljoin("https://www.cedima.com", href)
                products.add(full_url)
                
        print(f"Found {len(products)} hand-held tools to scrape.")
        with open("handheld_urls.json", "w") as f:
            json.dump(list(products), f)
            
except Exception as e:
    print("Error:", e)
