import json

tr_path = 'src/messages/tr.json'
en_path = 'src/messages/en.json'

with open(tr_path, 'r', encoding='utf-8') as f:
    tr_data = json.load(f)
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

tr_data['HomePage']['Hero']['desc'] = "Cedima, DUSS, Ticab, Victor ve GCE markalarının resmi distribütörü olarak ağır sanayi, yol yapım ve profesyonel delme süreçlerinize kesintisiz mühendislik ve yedek parça çözümleri sunuyoruz."
en_data['HomePage']['Hero']['desc'] = "As the official distributor of Cedima, DUSS, Ticab, Victor, and GCE brands, we offer uninterrupted engineering and spare part solutions for your heavy industry, road construction, and professional drilling processes."

with open(tr_path, 'w', encoding='utf-8') as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
