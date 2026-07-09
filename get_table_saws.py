import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json

url = "https://www.cedima.com/en/applications/table-saws.html"
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
            # Find subcategories or direct product links
            if 'table-saws' in href and len(a.get_text(strip=True)) > 2:
                full_url = urllib.parse.urljoin("https://www.cedima.com", href)
                products.add((a.get_text(strip=True), full_url))
                
        print(f"Found internal links in Table Saws:")
        for text, href in sorted(products, key=lambda x: x[1]):
            print(f"{text}: {href}")

except Exception as e:
    print("Error:", e)
