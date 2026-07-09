import urllib.request

url = "https://www.cedima.com/en/applications/floor-sawing/floor-saws.html"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    html = response.read().decode('utf-8')
    with open("cedima_floor.html", "w") as f:
        f.write(html)
print("Saved HTML to cedima_floor.html")
