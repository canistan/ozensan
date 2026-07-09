import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://www.cedima.com/en/index.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Find all links inside the header or navigation
        links = soup.find_all('a', href=True)
        categories = {}
        
        for a in links:
            text = a.get_text(strip=True)
            href = a['href']
            # We want links that look like product categories
            if text and len(text) > 3:
                categories[text] = href
                
        print("Possible Categories found in Navigation:")
        for text, href in categories.items():
            if 'http' not in href and not href.startswith('#') and 'contact' not in href.lower():
                print(f" - {text}: {href}")

except Exception as e:
    print("Error:", e)
