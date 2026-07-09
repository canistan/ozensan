import cloudscraper

url = "https://esab.com/us/nam_en/products-solutions/product/gas-equipment/outfits/journeyman-outfit/"
scraper = cloudscraper.create_scraper()
response = scraper.get(url)

with open("scripts/esab_sample.html", "w", encoding="utf-8") as f:
    f.write(response.text)
    
print("Saved to esab_sample.html")
