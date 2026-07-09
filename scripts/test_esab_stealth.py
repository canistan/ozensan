from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth

url = "https://esab.com/us/nam_en/products-solutions/search/?brand=victor"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Apply stealth
    stealth = Stealth()
    stealth.apply_stealth_sync(page)
    
    print("Navigating to ESAB with stealth...")
    page.goto(url, wait_until="domcontentloaded")
    
    print("Waiting for products to load...")
    try:
        page.wait_for_selector(".product-card", timeout=15000)
    except Exception as e:
        print("Timeout or element not found:", e)
        print("Page title:", page.title())
        browser.close()
        exit(1)
        
    cards = page.query_selector_all(".product-card a")
    links = set()
    for card in cards:
        href = card.get_attribute("href")
        if href:
            links.add(href)
            
    print(f"Found {len(links)} unique product links on page 1:")
    for link in list(links)[:3]:
        print(link)
        
    browser.close()
