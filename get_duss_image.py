import requests
from bs4 import BeautifulSoup

url = "https://www.duss.com/en/products/chiselling/all-products"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

for item in soup.select('div.tx-duss-products .product-item'):
    title_el = item.select_one('h3')
    if title_el and "PK 45 A" in title_el.text:
        img_el = item.select_one('img')
        if img_el:
            print(img_el.get('src'))
            break
