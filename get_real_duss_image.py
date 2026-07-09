import requests
from bs4 import BeautifulSoup

url = "https://www.duss.com/en/products/chiselling/breakers/detail/PK45A-breaker"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

images = soup.find_all('img')
for img in images:
    src = img.get('src')
    if src and 'files/public' in src:
        print(src)
