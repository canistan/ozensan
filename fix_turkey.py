import json
import re

with open("src/messages/en.json", "r", encoding="utf-8") as f:
    text = f.read()

# Replace "Turkey" with "Türkiye" globally (case-sensitive)
text = re.sub(r'\bTurkey\b', 'Türkiye', text)

en = json.loads(text)

# Also fix the Map description for English which was missed earlier
en["HomePage"]["Map"]["desc"] = "With our Türkiye-based logistics network, we export industrial machinery and spare parts to a wide geography, particularly Iraq, Afghanistan, Libya, Djibouti, and Indonesia."

with open("src/messages/en.json", "w", encoding="utf-8") as f:
    json.dump(en, f, ensure_ascii=False, indent=2)
