import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import json

urls = [
    "https://www.cedima.com/en/applications/hand-heldet-tools/diamond-grinding-dics.html",
    "https://www.cedima.com/en/applications/hand-heldet-tools/diamond-drill-bits.html",
    "https://www.cedima.com/en/applications/hand-heldet-tools/diamond-cutting-discs.html"
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

print(f"Found {len(products)} products in hand-held tools.")
for p in products:
    print(p)
