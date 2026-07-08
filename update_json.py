import json

tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

corporate_tr = {
    "Hero": {
        "title1": "Endüstrinin ",
        "title2": "Güçlü",
        "title3": " Yüzü.",
        "desc": "Yarım asrı aşan tecrübemizle, ağır sanayi ve altyapı projelerinizde dünyanın en güçlü markalarının güvencesini sunuyoruz."
    },
    "Management": {
        "tag": "YÖNETİMİMİZ",
        "title": "Gücümüzü Tecrübeden Alıyoruz",
        "p1_role": "Onursal Yönetim Kurulu Başkanı",
        "p1_desc": "Özensan'ın temellerini atarak vizyonuyla yarım asırlık bu endüstriyel devin doğmasını sağlayan kurucumuz.",
        "p2_role": "Yönetim Kurulu Başkanı",
        "p2_desc": "Yenilikçi yönetim anlayışı ve global vizyonuyla Özensan'ı geleceğe taşıyan, modern dönüşümün lideri."
    },
    "About": {
        "tag": "HAKKIMIZDA",
        "title": "Geleceği İnşa Eden Projelerin Görünmez Gücü",
        "desc1": "1970'li yıllarda başlayan serüvenimiz, bugün Türkiye'nin ve bölgenin en büyük endüstriyel çözüm ortaklarından biri olmamızla devam ediyor. Özensan olarak, başından beri kalite ve güvenilirlikten asla ödün vermedik.",
        "desc2": "Cedima, DUSS, Ticab, Victor ve GCE gibi alanında dünya lideri markaların Türkiye resmi distribütörü olarak, sektördeki en ileri teknolojileri yerel projelerle buluşturuyoruz. Sadece ürün tedariği değil, aynı zamanda satış sonrası mühendislik ve yedek parça hizmetleriyle de 360 derece çözümler üretiyoruz.",
        "stat1": "Yıllık Tecrübe",
        "stat2": "Tamamlanan Proje",
        "img_title": "Yenilikçi Çözümler",
        "img_desc": "Sürekli gelişen teknoloji altyapısı"
    },
    "MissionVision": {
        "m_title": "Misyonumuz",
        "m_desc": "Müşterilerimizin operasyonel verimliliklerini en üst seviyeye çıkarmak için dünya standartlarında sanayi makine ve malzemelerini, kusursuz bir servis anlayışıyla sunmak. Sürdürülebilirlik, iş güvenliği ve inovasyonu tüm iş süreçlerimizin merkezinde tutarak değer yaratmak.",
        "v_title": "Vizyonumuz",
        "v_desc": "Sürekli değişen endüstriyel dinamiklere yön veren, Türkiye'de ve global pazarda güvenilirliği ve yenilikçi çözümleri ile akla ilk gelen endüstriyel teknoloji sağlayıcısı olmak. Teknoloji ile insan potansiyelini birleştirerek sektöre liderlik etmek."
    },
    "Values": {
        "tag": "KÜLTÜRÜMÜZ",
        "title": "Temel Değerlerimiz",
        "v1_title": "Kalite Odaklılık",
        "v1_desc": "Sunduğumuz her üründe ve hizmette, tavizsiz bir kalite anlayışıyla hareket ederiz.",
        "v2_title": "Güvenilirlik",
        "v2_desc": "Verdiğimiz sözleri tutar, iş ortaklarımızla şeffaf ve dürüst ilişkiler kurarız.",
        "v3_title": "İnovasyon",
        "v3_desc": "Endüstrideki teknolojik gelişmeleri yakından takip eder ve müşterilerimize uyarlarız."
    },
    "FAQ": {
        "tag": "BİLGİ MERKEZİ",
        "title": "Sıkça Sorulan Sorular"
    }
}

corporate_en = {
    "Hero": {
        "title1": "The ",
        "title2": "Strong",
        "title3": " Face of the Industry.",
        "desc": "With over half a century of experience, we provide the assurance of the world's strongest brands in your heavy industry and infrastructure projects."
    },
    "Management": {
        "tag": "OUR MANAGEMENT",
        "title": "Our Strength Comes From Experience",
        "p1_role": "Honorary Chairman of the Board",
        "p1_desc": "Our founder who laid the foundations of Özensan and enabled the birth of this industrial giant with his vision.",
        "p2_role": "Chairman of the Board",
        "p2_desc": "The leader of modern transformation carrying Özensan to the future with her innovative management approach and global vision."
    },
    "About": {
        "tag": "ABOUT US",
        "title": "The Invisible Power of Projects Building the Future",
        "desc1": "Our journey, which began in the 1970s, continues today as one of the largest industrial solution partners in Turkey and the region. At Özensan, we have never compromised on quality and reliability since the beginning.",
        "desc2": "As the official distributor of world-leading brands such as Cedima, DUSS, Ticab, Victor, and GCE in Turkey, we bring the most advanced technologies in the sector to local projects. We provide 360-degree solutions not only with product supply but also with after-sales engineering and spare parts services.",
        "stat1": "Years of Experience",
        "stat2": "Completed Projects",
        "img_title": "Innovative Solutions",
        "img_desc": "Constantly evolving technological infrastructure"
    },
    "MissionVision": {
        "m_title": "Our Mission",
        "m_desc": "To provide world-class industrial machinery and materials with flawless service to maximize the operational efficiency of our customers. To create value by keeping sustainability, occupational safety, and innovation at the center of all our business processes.",
        "v_title": "Our Vision",
        "v_desc": "To be the first industrial technology provider that comes to mind with its reliability and innovative solutions in the Turkish and global markets, shaping the constantly changing industrial dynamics. To lead the sector by combining technology and human potential."
    },
    "Values": {
        "tag": "OUR CULTURE",
        "title": "Our Core Values",
        "v1_title": "Quality Focus",
        "v1_desc": "We act with an uncompromising understanding of quality in every product and service we offer.",
        "v2_title": "Reliability",
        "v2_desc": "We keep our promises and establish transparent and honest relationships with our business partners.",
        "v3_title": "Innovation",
        "v3_desc": "We closely follow technological developments in the industry and adapt them for our customers."
    },
    "FAQ": {
        "tag": "INFORMATION CENTER",
        "title": "Frequently Asked Questions"
    }
}

tr["CorporatePage"] = corporate_tr
en["CorporatePage"] = corporate_en

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

