import cloudscraper
from bs4 import BeautifulSoup

url = "https://esab.com/us/nam_en/products-solutions/product/gas-equipment/outfits/journeyman-outfit/"
scraper = cloudscraper.create_scraper()
response = scraper.get(url)
soup = BeautifulSoup(response.text, "html.parser")

title = soup.find("h1").text.strip() if soup.find("h1") else "No title"
print("Title:", title)

img = soup.select_one(".product-image img")
print("Image:", img["src"] if img else "No image")

desc = soup.select_one(".product-description")
print("Description:", desc.text.strip() if desc else "No description")

highlights = soup.select_one(".product-highlights")
print("Highlights:", highlights.text.strip() if highlights else "No highlights")

