from playwright.sync_api import sync_playwright

def get_page_links(page_num):
    url = f"https://esab.com/us/nam_en/products-solutions/search/?brand=victor&page={page_num}"
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(url, wait_until="domcontentloaded")
        page.wait_for_selector(".product-card a", timeout=30000)
        
        cards = page.query_selector_all(".product-card a")
        links = [c.get_attribute("href") for c in cards]
        print(f"Page {page_num} first 3 links: {links[:3]}")
        browser.close()

get_page_links(1)
get_page_links(2)
