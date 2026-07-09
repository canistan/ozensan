import requests
from bs4 import BeautifulSoup
import urllib.parse

url = "https://ticabltd.com/"
try:
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
    print(f"Status Code: {r.status_code}")
    soup = BeautifulSoup(r.text, 'html.parser')
    
    # Try to find navigation or product links
    links = soup.find_all('a')
    categories = []
    for link in links:
        href = link.get('href')
        text = link.get_text(strip=True)
        if href and ('product' in href or 'category' in href or 'equipment' in href):
            if (text, href) not in categories:
                categories.append((text, href))
                
    print(f"\nFound {len(categories)} potential category/product links:")
    for text, href in categories[:20]:
        print(f"- {text}: {href}")
        
except Exception as e:
    print(f"Error: {e}")
