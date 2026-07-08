import urllib.request
import json

url = "https://www.gce-industrial.com/en-gb/categories"
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Just check if we got HTML and print length
        print(f"Success! Fetched {len(html)} bytes of HTML.")
        # Try to count something simple if we have HTML
        count = html.count('href="/en-gb/categories/')
        print(f"Found approximately {count} category links.")
except Exception as e:
    print("Error:", e)
