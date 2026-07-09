import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json

urls = [
    "https://www.cedima.com/en/applications/special-machines/concrete-slurry-separator.html",
    "https://www.cedima.com/en/applications/special-machines/hydraulic-power-packs.html",
    "https://www.cedima.com/en/applications/special-machines/mini-crane.html",
    "https://www.cedima.com/en/applications/special-machines/processing-of-joints.html",
    "https://www.cedima.com/en/applications/special-machines/surface-milling-technology.html"
]
headers = {'User-Agent': 'Mozilla/5.0'}
products = set()

for url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read()
            soup = BeautifulSoup(html, 'html.parser')
            for a in soup.find_all('a', href=True):
                if '/products/details/' in a['href']:
                    full_url = urllib.parse.urljoin("https://www.cedima.com", a['href'])
                    products.add(full_url)
    except Exception as e:
        print("Error on", url, e)

print(f"Found {len(products)} special machines to scrape.")
with open("special_saws_urls.json", "w") as f:
    json.dump(list(products), f)
