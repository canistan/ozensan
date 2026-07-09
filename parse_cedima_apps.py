import urllib.request
from bs4 import BeautifulSoup

url = "https://www.cedima.com/en/applications.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        links = soup.find_all('a', href=True)
        apps = {}
        for a in links:
            text = a.get_text(strip=True)
            href = a['href']
            if 'applications/' in href and text:
                apps[text] = href
                
        print("Cedima Product Categories:")
        for text, href in apps.items():
            print(f" - {text}: {href}")

except Exception as e:
    print("Error:", e)
