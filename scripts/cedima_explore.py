import requests
from bs4 import BeautifulSoup
import json

def explore_cedima():
    url = "https://www.cedima.com/en/products"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    print(f"Fetching {url}...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to fetch. Status: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Try to find product categories or products
    links = soup.find_all('a', href=True)
    product_links = []
    
    for link in links:
        href = link['href']
        text = link.get_text(strip=True)
        if 'product' in href.lower() or 'maschinen' in href.lower() or 'werkzeuge' in href.lower():
            if href not in [p['url'] for p in product_links]:
                product_links.append({'text': text, 'url': href})
                
    print(json.dumps(product_links[:20], indent=2))

if __name__ == "__main__":
    explore_cedima()
