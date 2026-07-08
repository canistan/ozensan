import re

def process_contact_form():
    path = "src/components/forms/ContactForm.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add import
    if "import { useTranslations }" not in content:
        content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { useTranslations } from "next-intl";')

    # Add const t
    if "const t = useTranslations(\"Forms\");" not in content:
        content = content.replace("export default function ContactForm() {", "export default function ContactForm() {\n  const t = useTranslations(\"Forms\");")

    # Replace texts
    replacements = [
        ('"Lütfen tüm zorunlu alanları doldurunuz."', 't("errors.required")'),
        ('"Lütfen geçerli bir e-posta adresi giriniz."', 't("errors.email")'),
        ('"Devam etmek için KVKK Aydınlatma Metni\'ni onaylamalısınız."', 't("errors.kvkk")'),
        ('"Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız."', 't("success.contact")'),
        ('addToast(result.error || "Bir hata oluştu.", "error");', 'addToast(result.error || t("errors.general_error"), "error");'),
        ('"Bağlantı hatası oluştu. Lütfen tekrar deneyin."', 't("errors.general_error")'),
        ('Ad Soyad / Firma Adı *', '{t("name")} *'),
        ('placeholder="Adınızı giriniz"', 'placeholder={t("name")}'),
        ('E-Posta Adresi *', '{t("email")} *'),
        ('placeholder="ornek@firma.com"', 'placeholder="ornek@firma.com"'),
        ('Telefon Numarası *', '{t("phone")} *'),
        ('placeholder="0555 555 55 55"', 'placeholder="0555 555 55 55"'),
        ('Konu *', '{t("subject")} *'),
        ('placeholder="Mesajınızın konusu"', 'placeholder={t("subject")}'),
        ('Mesajınız *', '{t("message")} *'),
        ('placeholder="Size nasıl yardımcı olabiliriz?"', 'placeholder={t("message")}'),
        ('\'ni okudum ve kabul ediyorum.', '{t("kvkk_read")}'),
        ('>KVKK Aydınlatma Metni<', '>{t("kvkk")}<'),
        ("'Gönderiliyor...'", "t('sending')"),
        ("'Mesajı Gönder'", "t('submit')")
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def process_quote_form():
    path = "src/components/forms/QuoteForm.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add import
    if "import { useTranslations }" not in content:
        content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { useTranslations } from "next-intl";')

    # Add const t
    if "const t = useTranslations(\"Forms\");" not in content:
        content = content.replace("export default function QuoteForm() {", "export default function QuoteForm() {\n  const t = useTranslations(\"Forms\");")

    # Replace texts
    replacements = [
        ('"Lütfen tüm zorunlu alanları doldurunuz."', 't("errors.required")'),
        ('"Lütfen geçerli bir e-posta adresi giriniz."', 't("errors.email")'),
        ('"Devam etmek için KVKK Aydınlatma Metni\'ni onaylamalısınız."', 't("errors.kvkk")'),
        ('"Teklif talebiniz başarıyla alındı. Satış mühendislerimiz sizinle iletişime geçecektir."', 't("success.quote")'),
        ('addToast(result.error || "Bir hata oluştu.", "error");', 'addToast(result.error || t("errors.general_error"), "error");'),
        ('"Bağlantı hatası oluştu. Lütfen tekrar deneyin."', 't("errors.general_error")'),
        ('Ad Soyad *', '{t("name")} *'),
        ('placeholder="Adınızı giriniz"', 'placeholder={t("name")}'),
        ('Firma Adı *', '{t("company")} *'),
        ('placeholder="Firmanızın adı"', 'placeholder={t("company")}'),
        ('E-Posta Adresi *', '{t("email")} *'),
        ('Telefon Numarası *', '{t("phone")} *'),
        ('Makine / Ürün Modeli *', '{t("machine")} *'),
        ('placeholder="İlgilendiğiniz makine veya ürün"', 'placeholder={t("machine")}'),
        ('Proje Detayları ve Talepleriniz *', '{t("project_details")} *'),
        ('placeholder="Lütfen projenizden ve makineyi hangi amaçla kullanacağınızdan kısaca bahsedin..."', 'placeholder={t("project_details")}'),
        ('\'ni okudum ve kabul ediyorum.', '{t("kvkk_read")}'),
        ('>KVKK Aydınlatma Metni<', '>{t("kvkk")}<'),
        ("'Gönderiliyor...'", "t('sending')"),
        ("'Teklif İste'", "t('get_quote')")
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def process_career_form():
    path = "src/components/forms/CareerForm.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add import
    if "import { useTranslations }" not in content:
        content = content.replace('import React, { useState } from \'react\';', 'import React, { useState } from \'react\';\nimport { useTranslations } from "next-intl";')

    # Add const t
    if "const t = useTranslations(\"Forms\");" not in content:
        content = content.replace("export default function CareerForm() {", "export default function CareerForm() {\n  const t = useTranslations(\"Forms\");")

    # Replace texts
    replacements = [
        ('"Lütfen tüm zorunlu alanları doldurunuz."', 't("errors.required")'),
        ('"Lütfen geçerli bir e-posta adresi giriniz."', 't("errors.email")'),
        ('"Devam etmek için KVKK Aydınlatma Metni\'ni onaylamalısınız."', 't("errors.kvkk")'),
        ('"Başvurunuz başarıyla alınmıştır. Değerlendirme süreci sonrasında sizinle iletişime geçilecektir."', 't("success.career")'),
        ('addToast(result.error || "Bir hata oluştu.", "error");', 'addToast(result.error || t("errors.general_error"), "error");'),
        ('"Bağlantı hatası oluştu. Lütfen tekrar deneyin."', 't("errors.general_error")'),
        ('Ad Soyad *', '{t("name")} *'),
        ('placeholder="Adınızı giriniz"', 'placeholder={t("name")}'),
        ('E-Posta Adresi *', '{t("email")} *'),
        ('Telefon Numarası *', '{t("phone")} *'),
        ('Başvurulan Pozisyon *', '{t("position")} *'),
        ('placeholder="Örn: Satış Mühendisi"', 'placeholder={t("position")}'),
        ('Özgeçmiş (CV) Linki veya Metni *', '{t("cv")} *'),
        ('placeholder="LinkedIn profil linkiniz, Drive CV linkiniz veya kısa özgeçmiş metniniz..."', 'placeholder={t("cv")}'),
        ('Önyazı', '{t("cover_letter")}'),
        ('placeholder="Neden Özensan ekibine katılmak istiyorsunuz?"', 'placeholder={t("cover_letter")}'),
        ('\'ni okudum ve kabul ediyorum.', '{t("kvkk_read")}'),
        ('>KVKK Aydınlatma Metni<', '>{t("kvkk")}<'),
        ("'Gönderiliyor...'", "t('sending')"),
        ("'Başvuruyu Tamamla'", "t('apply')")
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

process_contact_form()
process_quote_form()
process_career_form()
