import requests
from bs4 import BeautifulSoup

def explore_duss():
    url = "https://www.duss.com/en/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
    }
    try:
        res = requests.get(url, headers=headers, timeout=15)
        print("Status:", res.status_code)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        links = soup.find_all('a', href=True)
        products = set()
        for a in links:
            if 'product' in a['href'].lower() or 'maschinen' in a['href'].lower():
                products.add((a.get_text(strip=True), a['href']))
                
        print("Found possible product links:")
        for t, l in products:
            print(f"{t}: {l}")
            
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    explore_duss()
