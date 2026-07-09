import requests
from bs4 import BeautifulSoup

url = "https://www.duss.com/en/products/drilling/rotary-hammers/detail/P26SDS-rotary-hammer"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, 'html.parser')

print("--- Images ---")
for img in soup.find_all('img'):
    src = img.get('src', '')
    if 'products' in src or 'upload' in src or 'file' in src:
        print(src)
        
print("--- Features ---")
for ul in soup.find_all('ul', class_='bullet-list') or soup.find_all('ul'):
    if ul.get('class') and 'list' in str(ul.get('class')):
        for li in ul.find_all('li'):
            print(li.get_text(strip=True)[:50])

print("--- Descriptions ---")
for div in soup.find_all('div', class_='ce_text'):
    print(div.get_text(strip=True)[:100])
