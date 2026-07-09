import urllib.request
from bs4 import BeautifulSoup

url = "https://www.cedima.com/en/applications.html"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        soup = BeautifulSoup(response.read(), 'html.parser')
        for a in soup.find_all('a', href=True):
            if '/applications/' in a['href']:
                print(a.get_text(strip=True), a['href'])
except Exception as e:
    print("Error:", e)
