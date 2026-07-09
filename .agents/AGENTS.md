# Güvenlik Kuralları (Security Rules)

- **KESİNLİKLE ŞİFRE YAZMA (NEVER HARDCODE SECRETS):** Yazılacak hiçbir Python, Node.js veya Bash betiğinde, ortam değişkenleri (API Key, Token, Password vb.) düz metin olarak koda yazılmayacaktır. Daima `os.environ.get()` veya `process.env` gibi güvenli yöntemlerle okunacaktır.
- **GEÇİCİ DOSYA GÜVENLİĞİ:** Oluşturulan geçici bot dosyaları `.gitignore` dosyasında yoksa sisteme kaydedilmemelidir ya da anında silinmelidir.
- Bu kurallar, tüm oturumlarda mutlak surette geçerlidir.
