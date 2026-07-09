import urllib.request
from urllib.error import HTTPError, URLError
import socket

urls = [
    "https://www.gce-industrial.com/en-gb",
    "https://www.cedima.com/en/index.html",
    "https://www.duss.com/en/",
    "https://victorofficial.com/",
    "https://www.ticabltd.com/"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for url in urls:
    req = urllib.request.Request(url, headers=headers)
    try:
        response = urllib.request.urlopen(req, timeout=10)
        status = response.status
        print(f"[OK] {url} -> Status {status} (Koruma YOK, bot ile rahatça çekilebilir)")
    except HTTPError as e:
        print(f"[BLOCKED] {url} -> HTTP Error {e.code} (Güvenlik Duvarı/Bot Koruması VAR)")
    except URLError as e:
        print(f"[ERROR] {url} -> Bağlantı Hatası: {e.reason}")
    except socket.timeout:
        print(f"[TIMEOUT] {url} -> Zaman aşımı (Sunucu yanıt vermedi)")
    except Exception as e:
        print(f"[ERROR] {url} -> Bilinmeyen Hata: {e}")

