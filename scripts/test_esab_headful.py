from playwright.sync_api import sync_playwright

url = "https://esab.com/us/nam_en/products-solutions/search/?brand=victor"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    print("Navigating to ESAB with headful browser...")
    page.goto(url, wait_until="domcontentloaded")
    
    print("Waiting for products to load (up to 30s)...")
    try:
        page.wait_for_selector(".product-card a", timeout=30000)
    except Exception as e:
        print("Timeout or element not found:", e)
        
    cards = page.query_selector_all(".product-card a")
    links = set()
    for card in cards:
        href = card.get_attribute("href")
        if href:
            links.add(href)
            
    print(f"Found {len(links)} unique product links on page 1:")
    for link in links:
        print(link)
        
    browser.close()
