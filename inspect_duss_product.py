import requests
from bs4 import BeautifulSoup
import json

url = "https://www.duss.com/en/products/drilling/rotary-hammers/detail/P26SDS-rotary-hammer"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, 'html.parser')

# Title
title_elem = soup.find('h1')
print("Title:", title_elem.get_text(strip=True) if title_elem else "Not found")

# Description
desc_elem = soup.find('div', class_='description') or soup.find('div', class_='text')
print("Description:", desc_elem.get_text(strip=True)[:100] if desc_elem else "Not found")

# Specifications
specs = []
table = soup.find('table')
if table:
    for row in table.find_all('tr'):
        cols = row.find_all(['th', 'td'])
        if len(cols) == 2:
            specs.append({
                "param": cols[0].get_text(strip=True),
                "value": cols[1].get_text(strip=True)
            })
print("Specs:", json.dumps(specs, indent=2))

# Features
features = []
for ul in soup.find_all('ul'):
    # try to find ul with features
    for li in ul.find_all('li'):
        features.append(li.get_text(strip=True))
print("Features:", features[:5])

# Image
img = soup.find('img')
if img:
    print("Main Image src:", img.get('src'))

