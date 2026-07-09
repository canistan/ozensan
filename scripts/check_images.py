from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000", wait_until="domcontentloaded")
    page.wait_for_timeout(3000)
    
    # get all images and their dimensions/alt texts
    images = page.evaluate('''() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
            class: img.className
        }));
    }''')
    
    for i, img in enumerate(images):
        print(f"[{i}] {img['width']}x{img['height']} | Alt: {img['alt'][:30]} | Class: {img['class']} | SRC: {img['src'][:80]}...")
    
    browser.close()
