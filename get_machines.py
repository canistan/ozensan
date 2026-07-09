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
            if '/floor-saws/' in href and '.html' in href:
                products.add(urllib.parse.urljoin("https://www.cedima.com", href))
                
        print(f"Found {len(products)} floor saws:")
        for p in sorted(products):
            print(p)

except Exception as e:
    print("Error:", e)
