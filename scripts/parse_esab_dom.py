from bs4 import BeautifulSoup

with open("scripts/esab_sample.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")
    
# Find Highlights and Industries
panels = soup.select(".custom-panel")
for p in panels:
    header = p.select_one(".custom-panel-header")
    if header:
        title = header.text.strip()
        print("Panel Title:", title)
        
        # The content might be in the next sibling or inside the panel
        body = p.select_one(".custom-panel-body") or p.select_one(".panel-content") or p
        
        lis = body.select("li")
        print("Items:")
        for li in lis:
            print(" -", li.text.strip())
            
print("--- IMAGES ---")
imgs = soup.select(".product-image img")
for img in imgs:
    print(img.get("src"))
    
# If .product-image is not found, what is the image selector?
if not imgs:
    # Let's search for the image
    for img in soup.select("img"):
        src = img.get("src", "")
        if "mut" in src and "assets.esab.com" in src:
            print("Found asset image:", src)
            
