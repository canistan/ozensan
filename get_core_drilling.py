import urllib.request
from bs4 import BeautifulSoup
import urllib.parse

url = "https://www.cedima.com/en/applications/core-drilling.html"
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
            text = a.get_text(strip=True)
            if 'core-drilling' in href and len(text) > 2:
                full_url = urllib.parse.urljoin("https://www.cedima.com", href)
                products.add((text, full_url))
                
        print(f"Found internal links in Core Drilling:")
        for text, href in sorted(products, key=lambda x: x[1]):
            print(f"{text}: {href}")

except Exception as e:
    print("Error:", e)
