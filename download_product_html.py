import urllib.request
url = "https://www.cedima.com/products/details/fugenschneider-50008154.html"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as response:
    html = response.read().decode('utf-8')
    with open("cedima_product.html", "w") as f:
        f.write(html)
print("Saved HTML to cedima_product.html")
