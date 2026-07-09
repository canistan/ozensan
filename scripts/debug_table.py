from playwright.sync_api import sync_playwright
import json

url = "https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(url, wait_until="load", timeout=60000)
    page.wait_for_timeout(3000)
    
    data = page.evaluate('''() => {
        // Find the "Technical Specifications" accordion header
        const headers = Array.from(document.querySelectorAll('h2, h3, div')).filter(el => 
            el.textContent.includes('Technical Specifications') || el.textContent.includes('SPECIFICATIONS')
        );
        
        if (headers.length === 0) return { error: "No tech specs header found" };
        
        let container = headers[0].parentElement;
        for(let i=0; i<3; i++) {
            if(container) container = container.parentElement;
        }
        
        // Find all p and span elements that might be cells
        const elements = Array.from(document.querySelectorAll('p, span, h4, li')).map(e => e.innerText.trim()).filter(t => t.length > 0);
        
        // Let's just find the index of "Engine power" or similar
        const idx = elements.findIndex(t => t.includes('Engine power') || t.includes('Emulsion tank'));
        if (idx === -1) return { error: "Could not find start of specs", elements: elements.slice(0, 50) };
        
        return {
           specs: elements.slice(idx, idx + 20)
        }
    }''')
    
    print(json.dumps(data, indent=2))
    browser.close()
