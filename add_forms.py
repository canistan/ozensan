import json
import re

tr_path = 'src/messages/tr.json'
en_path = 'src/messages/en.json'

with open(tr_path, 'r', encoding='utf-8') as f:
    tr_data = json.load(f)
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

tr_data['Forms'] = {
    "name": "Ad Soyad",
    "email": "E-posta",
    "phone": "Telefon Numarası",
    "subject": "Konu",
    "message": "Mesajınız",
    "submit": "Gönder",
    "sending": "Gönderiliyor...",
    "kvkk": "KVKK Aydınlatma Metni",
    "kvkk_read": "ni okudum ve kabul ediyorum.",
    "select_subject": "Konu Seçiniz",
    "general": "Genel Bilgi/Soru",
    "technical": "Teknik Destek",
    "sales": "Satış/Teklif",
    "other": "Diğer",
    
    "company": "Firma Adı",
    "machine": "Makine/Ürün",
    "select_machine": "Makine/Ürün Seçiniz",
    "project_details": "Proje Detayları ve Talep",
    "get_quote": "Teklif İste",
    
    "position": "Başvurulan Pozisyon",
    "cv": "Özgeçmiş (CV) Linki veya Metni",
    "cover_letter": "Önyazı",
    "apply": "Başvuruyu Tamamla",
    
    "errors": {
        "required": "Lütfen tüm zorunlu alanları doldurunuz.",
        "email": "Lütfen geçerli bir e-posta adresi giriniz.",
        "kvkk": "Devam etmek için KVKK Aydınlatma Metni'ni onaylamalısınız.",
        "general_error": "Bir hata oluştu, lütfen daha sonra tekrar deneyin."
    },
    "success": {
        "contact": "Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız.",
        "quote": "Teklif talebiniz başarıyla alındı. Satış mühendislerimiz sizinle iletişime geçecektir.",
        "career": "Başvurunuz başarıyla alınmıştır. Değerlendirme süreci sonrasında sizinle iletişime geçilecektir."
    }
}

en_data['Forms'] = {
    "name": "Full Name",
    "email": "Email",
    "phone": "Phone Number",
    "subject": "Subject",
    "message": "Your Message",
    "submit": "Submit",
    "sending": "Sending...",
    "kvkk": "KVKK Clarification Text",
    "kvkk_read": "I have read and accept.",
    "select_subject": "Select Subject",
    "general": "General Inquiry",
    "technical": "Technical Support",
    "sales": "Sales/Quote",
    "other": "Other",
    
    "company": "Company Name",
    "machine": "Machine/Product",
    "select_machine": "Select Machine/Product",
    "project_details": "Project Details & Request",
    "get_quote": "Get Quote",
    
    "position": "Applied Position",
    "cv": "CV Link or Text",
    "cover_letter": "Cover Letter",
    "apply": "Submit Application",
    
    "errors": {
        "required": "Please fill in all required fields.",
        "email": "Please enter a valid email address.",
        "kvkk": "You must accept the KVKK Clarification Text to continue.",
        "general_error": "An error occurred, please try again later."
    },
    "success": {
        "contact": "Your message has been sent successfully. We will get back to you shortly.",
        "quote": "Your quote request has been received successfully. Our sales engineers will contact you.",
        "career": "Your application has been received successfully. We will contact you after the evaluation process."
    }
}

with open(tr_path, 'w', encoding='utf-8') as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)
