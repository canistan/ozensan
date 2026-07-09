from bs4 import BeautifulSoup

with open('b13b.html', 'r') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

for p in soup.find_all('p'):
    text = p.text.strip()
    if "Handy and versatile" in text:
        print(p.parent.prettify())
        break
