import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

urls = {
    "duss-pk300.png": "https://www.duss.de/fileadmin/templates/images/produkte/PK300A_kl.png",
    "gce.png": "https://www.gcegroup.com/files/images/products/procontrol.png",
    "victor.png": "https://www.victortechnologies.com/wp-content/uploads/2019/12/0384-2045_journeyman.png"
}

for name, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as response, open(f"public/products/{name}", 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print(f"Downloaded {name} successfully.")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
