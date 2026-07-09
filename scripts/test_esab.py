from playwright.sync_api import sync_playwright

url = "https://esab.com/us/nam_en/products-solutions/search/?brand=victor"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    print("Navigating to ESAB...")
    page.goto(url, wait_until="domcontentloaded")
    
    print("Waiting for products to load...")
    try:
        page.wait_for_selector(".product-card", timeout=10000)
    except Exception as e:
        print("Timeout or element not found:", e)
        print("Page title:", page.title())
        print("Page HTML snippet:", page.content()[:500])
        browser.close()
        exit(1)
        
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
