from bs4 import BeautifulSoup
import re

with open('b13b.html', 'r') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

def extract_desc(soup):
    # Method 1: Look for h2 with class headline
    for h2 in soup.find_all('h2', class_='headline'):
        title = h2.text.strip().lower()
        if title in ['action', 'description', 'application', 'overview', '']:
            # The next sibling or next element that is a p
            p = h2.find_next_sibling('p')
            if p:
                return p.text.strip()
    
    # Method 2: Fallback to the first non-generic paragraph
    for p in soup.find_all('p'):
        text = p.text.strip()
        if len(text) > 30 and 'info@duss.de' not in text and 'DUSS is a modern' not in text and 'callback form' not in text and 'obligatory' not in text and 'broken' not in text:
            return text
            
    return ""

print("Description:", extract_desc(soup))
