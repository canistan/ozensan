import json
from playwright.sync_api import sync_playwright

def collect_all_links():
    url = "https://esab.com/us/nam_en/products-solutions/search/?brand=victor"
    all_links = set()
    
    print("Launching headful browser...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(url, wait_until="domcontentloaded")
        
        # Try to accept cookies
        try:
            print("Looking for cookie banner...")
            page.wait_for_selector("#onetrust-accept-btn-handler", timeout=5000)
            page.click("#onetrust-accept-btn-handler")
            print("Accepted cookies!")
            page.wait_for_timeout(1000)
        except Exception:
            print("No cookie banner found or timed out.")
        
        for i in range(1, 7):
            print(f"Waiting for products on page {i}...")
            try:
                page.wait_for_selector(".product-card a", timeout=30000)
                page.wait_for_timeout(2000) 
            except Exception as e:
                print("Timeout or element not found:", e)
                break
                
            cards = page.query_selector_all(".product-card a")
            links_on_page = 0
            for c in cards:
                href = c.get_attribute("href")
                if href and "products-solutions/product/" in href:
                    full_url = "https://esab.com" + href if href.startswith("/") else href
                    all_links.add(full_url)
                    links_on_page += 1
            print(f"Found {links_on_page} products on page {i} (Total unique: {len(all_links)})")
            
            if i < 6:
                print(f"Clicking pagination button for page {i+1}...")
                try:
                    next_btn = page.locator(f".pagination button:has-text('{i+1}')").first
                    if next_btn.is_visible():
                        # force=True bypasses some overlay issues but let's just click normally now that cookies are gone
                        next_btn.click(force=True)
                        page.wait_for_timeout(3000) # wait for page transition
                    else:
                        print("Next button not visible!")
                        break
                except Exception as e:
                    print("Could not click next button:", e)
                    break
                    
        browser.close()
        
    links_list = list(all_links)
    with open("scripts/victor_all_links.json", "w") as f:
        json.dump(links_list, f, indent=2)
        
    print(f"Successfully collected {len(links_list)} links across 6 pages!")

if __name__ == "__main__":
    collect_all_links()
