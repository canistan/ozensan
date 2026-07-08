import json

tr_path = 'src/messages/tr.json'
en_path = 'src/messages/en.json'

with open(tr_path, 'r', encoding='utf-8') as f:
    tr_data = json.load(f)
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

tr_data['TermsSEO'] = {
    "title": "Kullanım Şartları | Özensan",
    "description": "Özensan Sanayi Makine ve Malzemeleri A.Ş. web sitesi kullanım şartları ve koşulları."
}

en_data['TermsSEO'] = {
    "title": "Terms of Use | Özensan",
    "description": "Özensan Industrial Machinery and Materials Inc. website terms and conditions of use."
}

with open(tr_path, 'w', encoding='utf-8') as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
