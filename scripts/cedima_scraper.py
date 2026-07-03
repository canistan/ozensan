import requests
from bs4 import BeautifulSoup
import json
import os

def get_cedima_sitemap():
    url = "https://www.cedima.com/sitemap.xml"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'xml')
    urls = [loc.text for loc in soup.find_all('loc')]
    
    product_categories = [u for u in urls if '/en/applications/' in u and '.html' in u]
    print(f"Found {len(product_categories)} product category/application pages.")
    
    # Example logic to be expanded
    return product_categories

if __name__ == "__main__":
    os.makedirs("data", exist_ok=True)
    get_cedima_sitemap()
