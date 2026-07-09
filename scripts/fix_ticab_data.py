import os
import json
import time
from playwright.sync_api import sync_playwright
from deep_translator import GoogleTranslator

URLS = [
    # Yol Yapım ve Bakım
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/abs-8000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-2000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-1000-sp",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-500-pro",
    "https://www.ticabltd.com/bitumen-emulsion-sprayers/bs-200",
    "https://www.ticabltd.com/bcm-120",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-500",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-100",
    "https://www.ticabltd.com/crack-sealing-machines/bpm-120",
    "https://www.ticabltd.com/crack-sealing-machines/hl-1",
    "https://www.ticabltd.com/asphalt-heaters/mira-1",
    "https://www.ticabltd.com/asphalt-heaters/mira-3",
    "https://www.ticabltd.com/asphalt-heaters/mira-4",
    "https://www.ticabltd.com/recyclers/ra-800",
    "https://www.ticabltd.com/hot-boxes/hb-1",
    "https://www.ticabltd.com/hot-boxes/hb-2",
    "https://www.ticabltd.com/asphalt-pavers/mp-1100",
    
    # Çevre ve Belediye
    "https://www.ticabltd.com/sand-salt-spreaders/rps-9000",
    "https://www.ticabltd.com/sand-salt-spreaders/rps-6000",
    "https://www.ticabltd.com/sand-salt-spreaders/rps-1500",
    "https://www.ticabltd.com/accessories/sb-3000",
    "https://www.ticabltd.com/loaders/ti-car-125",
    "https://www.ticabltd.com/loaders/ti-car-225",
    "https://www.ticabltd.com/accessories/ti-car",
    "https://www.ticabltd.com/street-vacuum-cleaners/city-ant",
    "https://www.ticabltd.com/street-vacuum-cleaners/city-beetle",
    "https://www.ticabltd.com/street-vacuum-cleaners/um-130",
    "https://www.ticabltd.com/accessories/rbu-2000"
]

def translate_tr(text):
    if not text: return ""
    try:
        return GoogleTranslator(source='en', target='tr').translate(text)
    except:
        return text

def parse_specs(specs_list):
    parsed_en = []
    i = 0
    while i < len(specs_list):
        param = specs_list[i]
        if "Technical Specifications" in param or "SPECIFICATIONS" in param:
            i += 1
            continue
            
        if i + 1 < len(specs_list):
            next_str = specs_list[i+1]
            if any(c.isdigit() for c in next_str) or next_str[0].islower() or len(next_str) < 15:
                parsed_en.append({"param": param, "value": next_str, "accessory": "-"})
                i += 2
            else:
                parsed_en.append({"param": param, "value": "Standard", "accessory": "-"})
                i += 1
        else:
            parsed_en.append({"param": param, "value": "Standard", "accessory": "-"})
            i += 1
            
    # Copy for Turkish
    parsed_tr = []
    for p in parsed_en:
        tr_param = translate_tr(p["param"])
        tr_val = p["value"]
        if tr_val == "Standard":
            tr_val = "Standart"
        elif not tr_val.replace('.', '').replace(',', '').replace(' ', '').isdigit():
            tr_val = translate_tr(p["value"])
        parsed_tr.append({"param": tr_param, "value": tr_val, "accessory": "-"})
        
    return parsed_tr, parsed_en

def main():
    db_path = "/Users/canalbayrak/Desktop/c/Siteler/Ozensan/ozensan-app/src/data/products.json"
    
    with open(db_path, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    slug_to_idx = {p["slug"]: i for i, p in enumerate(products) if p.get("brand") == "ticab"}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        for url in URLS:
            slug = url.strip('/').split('/')[-1].lower().replace(" ", "-")
            if slug not in slug_to_idx:
                print(f"Skipping {slug}, not in DB", flush=True)
                continue
                
            print(f"Extracting accurate data for {slug}...", flush=True)
            try:
                page.goto(url, wait_until="load", timeout=45000)
                page.wait_for_timeout(3000)
                
                data = page.evaluate('''() => {
                    const result = { description: "", tech_specs: [] };
                    
                    const paragraphs = Array.from(document.querySelectorAll('p, span'))
                        .map(el => el.innerText.trim())
                        .filter(t => t.length > 80 && !t.includes('Technical Specifications') && !t.includes('All rights reserved'));
                        
                    if (paragraphs.length > 0) {
                        const longest = paragraphs.reduce((a, b) => a.length > b.length ? a : b, "");
                        result.description = longest;
                    }
                    
                    const headers = Array.from(document.querySelectorAll('h2, h3, div')).filter(el => 
                        el.textContent === 'Technical Specifications' || el.textContent === 'SPECIFICATIONS'
                    );
                    
                    if (headers.length > 0) {
                        let container = headers[0].parentElement;
                        for(let i=0; i<3; i++) {
                            if(container) container = container.parentElement;
                        }
                        if (container) {
                            let cells = Array.from(container.querySelectorAll('p, span'))
                                .map(e => e.innerText.trim())
                                .filter(t => t.length > 0 && !t.includes('Technical Specifications'));
                                
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
                
                if data["description"]:
                    tr_desc = translate_tr(data["description"])
                    products[slug_to_idx[slug]]["descriptionEn"] = data["description"]
                    products[slug_to_idx[slug]]["description"] = tr_desc
                    
                if data["tech_specs"]:
                    parsed_tr, parsed_en = parse_specs(data["tech_specs"])
                    products[slug_to_idx[slug]]["technicalData"] = parsed_tr
                    products[slug_to_idx[slug]]["technicalDataEn"] = parsed_en
                else:
                    products[slug_to_idx[slug]]["technicalData"] = []
                    products[slug_to_idx[slug]]["technicalDataEn"] = []
                    
                print(f"  -> Success: {len(data['tech_specs'])} raw spec items parsed.", flush=True)
                
            except Exception as e:
                print(f"  -> Failed: {e}", flush=True)
                
        browser.close()
        
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print("products.json has been updated with accurate TICAB descriptions and specifications.", flush=True)

if __name__ == "__main__":
    main()
