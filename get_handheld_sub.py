import urllib.request
from bs4 import BeautifulSoup
import urllib.parse

url = "https://www.cedima.com/en/applications/hand-heldet-tools.html"
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        links = soup.find_all('a', href=True)
        categories = set()
        
        for a in links:
            href = a['href']
            if 'hand-heldet-tools/' in href:
                full_url = urllib.parse.urljoin("https://www.cedima.com", href)
                categories.add(full_url)
                
        for c in categories:
            print("Category:", c)
            
except Exception as e:
    print("Error:", e)
