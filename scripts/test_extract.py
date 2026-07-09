from playwright.sync_api import sync_playwright
import json
from deep_translator import GoogleTranslator

url = "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000"

def clean_text(t):
    return " ".join(t.split()).strip()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(url, wait_until="load", timeout=60000)
    page.wait_for_timeout(3000)
    
    data = page.evaluate('''() => {
        const result = { description: "", tech_specs: [] };
        
        // Find description - look for a paragraph near the top that's not a header
        // Wix often puts product descriptions in p or span with a reasonable length
        const paragraphs = Array.from(document.querySelectorAll('p, span'))
            .map(el => el.innerText.trim())
            .filter(t => t.length > 80 && !t.includes('Technical Specifications') && !t.includes('All rights reserved'));
            
        if (paragraphs.length > 0) {
            // Find the most prominent paragraph that describes the product
            result.description = paragraphs[0];
            
            // Try to avoid the OG description or find the longest
            const longest = paragraphs.reduce((a, b) => a.length > b.length ? a : b, "");
            result.description = longest;
        }
        
        // Find tech specs
        const headers = Array.from(document.querySelectorAll('h2, h3, div')).filter(el => 
            el.textContent === 'Technical Specifications' || el.textContent === 'SPECIFICATIONS'
        );
        
        if (headers.length > 0) {
            let container = headers[0].parentElement;
            for(let i=0; i<3; i++) {
                if(container) container = container.parentElement;
            }
            if (container) {
                // Find all p and span elements inside this section
                let cells = Array.from(container.querySelectorAll('p, span'))
                    .map(e => e.innerText.trim())
                    .filter(t => t.length > 0);
                    
                // Eliminate duplicates and navigation items
                let uniqueCells = [];
                cells.forEach(c => {
                    if (uniqueCells.length === 0 || uniqueCells[uniqueCells.length - 1] !== c) {
                        uniqueCells.push(c);
                    }
                });
                
                result.tech_specs = uniqueCells;
            }
        }
        return result;
    }''')
    
    print(json.dumps(data, indent=2, ensure_ascii=False))
    browser.close()
