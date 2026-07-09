import requests
from bs4 import BeautifulSoup

url = "https://www.duss.com/en/products/drilling/drill-drivers/detail/b-13-b-drill-driver"
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(r.text, 'html.parser')

desc_element = soup.select_one('div.product-description p')
if not desc_element:
    desc_element = soup.select_one('div.tx-duss-products p')

print("Found Description:")
if desc_element:
    print(desc_element.text.strip())
else:
    print("None")
    
# Let's see all p tags to see where the real description is
print("\nAll P tags:")
for p in soup.select('p'):
    t = p.text.strip()
    if len(t) > 20:
        print("---")
        print(t)
