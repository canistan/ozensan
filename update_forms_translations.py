import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

tr["Forms"]["success"]["quote"] = "Teklif talebiniz başarıyla alındı. İlgili ekibimiz en kısa sürede size dönüş yapacaktır."
en["Forms"]["success"]["quote"] = "Your quote request has been received successfully. Our relevant team will get back to you as soon as possible."

tr["Forms"]["success"]["career"] = "Başvurunuz başarıyla alındı. İnsan Kaynakları departmanımız en kısa sürede size dönüş yapacaktır."
en["Forms"]["success"]["career"] = "Your application has been received successfully. Our Human Resources department will get back to you as soon as possible."

tr["Forms"]["errors"]["contactError"] = "Mesaj gönderilirken bir hata oluştu."
en["Forms"]["errors"]["contactError"] = "An error occurred while sending the message."

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
