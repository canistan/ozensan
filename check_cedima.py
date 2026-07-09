import urllib.request
import re

url = "https://www.cedima.com/en/products/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8')
        
        # Look for typical product/category links
        links = re.findall(r'href="([^"]+)"', html)
        categories = [l for l in set(links) if '/products/' in l and len(l) > 10]
        
        print(f"Fetched page successfully. Length: {len(html)}")
        print("Found possible product category links:")
        for c in sorted(categories)[:10]:
            print("  -", c)
except Exception as e:
    print("Error:", e)
