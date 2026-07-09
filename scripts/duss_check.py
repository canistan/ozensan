import requests
from bs4 import BeautifulSoup
import urllib.parse

def check_duss_category():
    url = "https://www.duss.com/en/products/drilling/all-drills"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')
    
    products = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/detail/' in href:
            products.add(urllib.parse.urljoin("https://www.duss.com/", href))
            
    print(f"Found {len(products)} products in Drilling.")
    for p in products:
        print(p)

if __name__ == "__main__":
    check_duss_category()
