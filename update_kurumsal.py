import re

with open("src/app/[locale]/kurumsal/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add useTranslations
content = content.replace("export default function CorporatePage() {\n  const locale = useLocale();", 
                          "import { useTranslations } from 'next-intl';\n\nexport default function CorporatePage() {\n  const locale = useLocale();\n  const t = useTranslations('CorporatePage');")

# Hero
content = content.replace("Endüstrinin <span", "{t('Hero.title1')} <span")
content = content.replace("Güçlü</span> Yüzü.", "{t('Hero.title2')}</span> {t('Hero.title3')}")
content = content.replace("Yarım asrı aşan tecrübemizle, ağır sanayi ve altyapı projelerinizde dünyanın en güçlü markalarının güvencesini sunuyoruz.", "{t('Hero.desc')}")

# Management
content = content.replace("YÖNETİMİMİZ", "{t('Management.tag')}")
content = content.replace("Gücümüzü Tecrübeden Alıyoruz", "{t('Management.title')}")
content = content.replace("Onursal Yönetim Kurulu Başkanı", "{t('Management.p1_role')}")
content = content.replace("Özensan'ın temellerini atarak vizyonuyla yarım asırlık bu endüstriyel devin doğmasını sağlayan kurucumuz.", "{t('Management.p1_desc')}")
content = content.replace("Yönetim Kurulu Başkanı", "{t('Management.p2_role')}")
content = content.replace("Yenilikçi yönetim anlayışı ve global vizyonuyla Özensan'ı geleceğe taşıyan, modern dönüşümün lideri.", "{t('Management.p2_desc')}")

# About
content = content.replace("HAKKIMIZDA", "{t('About.tag')}")
content = content.replace("Geleceği İnşa Eden Projelerin Görünmez Gücü", "{t('About.title')}")
content = content.replace("1970'li yıllarda başlayan serüvenimiz, bugün Türkiye'nin ve bölgenin en büyük endüstriyel çözüm ortaklarından biri olmamızla devam ediyor. Özensan olarak, başından beri kalite ve güvenilirlikten asla ödün vermedik.", "{t('About.desc1')}")
content = content.replace("Cedima, DUSS, Ticab, Victor ve GCE gibi alanında dünya lideri markaların Türkiye resmi distribütörü olarak, sektördeki en ileri teknolojileri yerel projelerle buluşturuyoruz. Sadece ürün tedariği değil, aynı zamanda satış sonrası mühendislik ve yedek parça hizmetleriyle de 360 derece çözümler üretiyoruz.", "{t('About.desc2')}")
content = content.replace("Yıllık Tecrübe", "{t('About.stat1')}")
content = content.replace("Tamamlanan Proje", "{t('About.stat2')}")
content = content.replace("Yenilikçi Çözümler", "{t('About.img_title')}")
content = content.replace("Sürekli gelişen teknoloji altyapısı", "{t('About.img_desc')}")

# Mission & Vision
content = content.replace("Misyonumuz", "{t('MissionVision.m_title')}")
content = content.replace("Müşterilerimizin operasyonel verimliliklerini en üst seviyeye çıkarmak için dünya standartlarında sanayi makine ve malzemelerini, kusursuz bir servis anlayışıyla sunmak. Sürdürülebilirlik, iş güvenliği ve inovasyonu tüm iş süreçlerimizin merkezinde tutarak değer yaratmak.", "{t('MissionVision.m_desc')}")
content = content.replace("Vizyonumuz", "{t('MissionVision.v_title')}")
content = content.replace("Sürekli değişen endüstriyel dinamiklere yön veren, Türkiye'de ve global pazarda güvenilirliği ve yenilikçi çözümleri ile akla ilk gelen endüstriyel teknoloji sağlayıcısı olmak. Teknoloji ile insan potansiyelini birleştirerek sektöre liderlik etmek.", "{t('MissionVision.v_desc')}")

# Values
content = content.replace("KÜLTÜRÜMÜZ", "{t('Values.tag')}")
content = content.replace("Temel Değerlerimiz", "{t('Values.title')}")
content = content.replace("Kalite Odaklılık", "{t('Values.v1_title')}")
content = content.replace("Sunduğumuz her üründe ve hizmette, tavizsiz bir kalite anlayışıyla hareket ederiz.", "{t('Values.v1_desc')}")
content = content.replace("Güvenilirlik", "{t('Values.v2_title')}")
content = content.replace("Verdiğimiz sözleri tutar, iş ortaklarımızla şeffaf ve dürüst ilişkiler kurarız.", "{t('Values.v2_desc')}")
content = content.replace("İnovasyon", "{t('Values.v3_title')}")
content = content.replace("Endüstrideki teknolojik gelişmeleri yakından takip eder ve müşterilerimize uyarlarız.", "{t('Values.v3_desc')}")

# FAQ
content = content.replace("BİLGİ MERKEZİ", "{t('FAQ.tag')}")
content = content.replace("Sıkça Sorulan Sorular", "{t('FAQ.title')}")

with open("src/app/[locale]/kurumsal/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

