import json

tr_path = 'src/messages/tr.json'
en_path = 'src/messages/en.json'

with open(tr_path, 'r', encoding='utf-8') as f:
    tr_data = json.load(f)
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

tr_data['CTA'] = {
    "title": "Projeniz İçin En İdeal Çözümü Birlikte Bulalım",
    "desc": "Uzman satış mühendislerimizden projenize özel teklif almak veya makinelerimiz hakkında detaylı bilgi edinmek için bizimle iletişime geçin.",
    "btnQuote": "Hemen Teklif Alın",
    "btnContact": "İletişime Geçin"
}

en_data['CTA'] = {
    "title": "Let's Find the Ideal Solution for Your Project Together",
    "desc": "Contact us to get a project-specific quote from our expert sales engineers or to get detailed information about our machines.",
    "btnQuote": "Get a Quote Now",
    "btnContact": "Contact Us"
}

with open(tr_path, 'w', encoding='utf-8') as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
