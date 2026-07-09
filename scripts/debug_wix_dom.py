from playwright.sync_api import sync_playwright

url = "https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(url, wait_until="load", timeout=60000)
    page.wait_for_timeout(3000)
    
    # Try to extract the accordion headers and contents
    data = page.evaluate('''() => {
        const sections = Array.from(document.querySelectorAll('h2, h3, div')).filter(el => 
            el.textContent === 'Technical Specifications' || el.textContent === 'SPECIFICATIONS' ||
            el.textContent === 'Properties' || el.textContent === 'Application'
        );
        
        // Let's get the text of the container that holds the specs table
        // We look for "Engine power"
        const cells = Array.from(document.querySelectorAll('span, p')).filter(el => el.textContent.includes('Engine power'));
        
        let container = cells.length > 0 ? cells[0].parentElement.parentElement.parentElement : null;
        let text = container ? container.innerText : "Not found";
        
        return {
           headers: sections.map(s => s.textContent),
           engineText: text
        }
    }''')
    
    print("EXTRACTED DATA:")
    print("-------------------------")
    print(data)
    browser.close()
