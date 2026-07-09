import requests
from bs4 import BeautifulSoup
import urllib.parse
import json

def get_drilling_links():
    url = "https://www.duss.com/en/products/drilling/all-drills"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    try:
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        products = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            # Duss products have '/detail/' in their URL
            if '/detail/' in href:
                products.add(urllib.parse.urljoin("https://www.duss.com/", href))
                
        products_list = list(products)
        print(f"Found {len(products_list)} products in Drilling.")
        
        with open("duss_drilling_urls.json", "w") as f:
            json.dump(products_list, f)
            
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    get_drilling_links()
