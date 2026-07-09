import urllib.request
import re

url = "https://www.cedima.com/en/index.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8')
        
        links = re.findall(r'href="([^"]+)"', html)
        print("All unique links:")
        for c in sorted(set(links)):
            if '/en/' in c or c.startswith('/'):
                print("  -", c)
except Exception as e:
    print("Error:", e)
