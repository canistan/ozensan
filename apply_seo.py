import json
import re
import os

tr_path = 'src/messages/tr.json'
en_path = 'src/messages/en.json'

with open(tr_path, 'r', encoding='utf-8') as f:
    tr_data = json.load(f)
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Define static pages config
pages = [
    {
        "file": "src/app/[locale]/cerez-politikasi/page.tsx",
        "ns": "CookieSEO",
        "tr_title": "Çerez Politikası | Özensan",
        "tr_desc": "Özensan Sanayi Makine ve Malzemeleri A.Ş. Çerez (Cookie) Politikası ve aydınlatma metni.",
        "en_title": "Cookie Policy | Özensan",
        "en_desc": "Özensan Industrial Machinery and Materials Inc. Cookie Policy and clarification text.",
        "path_tr": "/cerez-politikasi",
        "path_en": "/cookie-policy"
    },
    {
        "file": "src/app/[locale]/cozumler/page.tsx",
        "ns": "SolutionsSEO",
        "tr_title": "Çözümler ve Uygulamalar | Özensan",
        "tr_desc": "Endüstriyel delme, yol yapım, gaz kontrol ve metal işleme sektörlerine yönelik sunduğumuz global mühendislik çözümleri.",
        "en_title": "Solutions & Applications | Özensan",
        "en_desc": "Our global engineering solutions for industrial drilling, road construction, gas control, and metalworking sectors.",
        "path_tr": "/cozumler",
        "path_en": "/solutions"
    },
    {
        "file": "src/app/[locale]/gizlilik-politikasi/page.tsx",
        "ns": "PrivacySEO",
        "tr_title": "Gizlilik Politikası | Özensan",
        "tr_desc": "Özensan Web Sitesi Gizlilik Politikası",
        "en_title": "Privacy Policy | Özensan",
        "en_desc": "Özensan Website Privacy Policy",
        "path_tr": "/gizlilik-politikasi",
        "path_en": "/privacy-policy"
    },
    {
        "file": "src/app/[locale]/iletisim/page.tsx",
        "ns": "ContactSEO",
        "tr_title": "İletişim | Özensan",
        "tr_desc": "Özensan Sanayi Makine ve Malzemeleri A.Ş. ile iletişime geçin.",
        "en_title": "Contact | Özensan",
        "en_desc": "Contact Özensan Industrial Machinery and Materials Inc.",
        "path_tr": "/iletisim",
        "path_en": "/contact"
    },
    {
        "file": "src/app/[locale]/kariyer/page.tsx",
        "ns": "CareerSEO",
        "tr_title": "Kariyer | Özensan",
        "tr_desc": "Özensan ailesine katılın, kariyerinize yön verin.",
        "en_title": "Careers | Özensan",
        "en_desc": "Join the Özensan family and shape your career.",
        "path_tr": "/kariyer",
        "path_en": "/careers"
    },
    {
        "file": "src/app/[locale]/kurumsal/page.tsx",
        "ns": "CorporateSEO",
        "tr_title": "Kurumsal | Özensan",
        "tr_desc": "Özensan Sanayi Makine ve Malzemeleri A.Ş. hakkında, vizyonumuz, misyonumuz ve tarihimiz.",
        "en_title": "Corporate | Özensan",
        "en_desc": "About Özensan Industrial Machinery and Materials Inc., our vision, mission, and history.",
        "path_tr": "/kurumsal",
        "path_en": "/corporate"
    },
    {
        "file": "src/app/[locale]/kvkk/page.tsx",
        "ns": "KVKKSEO",
        "tr_title": "KVKK Aydınlatma Metni | Özensan",
        "tr_desc": "Özensan Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni",
        "en_title": "KVKK Clarification Text | Özensan",
        "en_desc": "Özensan Personal Data Protection Law (KVKK) Clarification Text",
        "path_tr": "/kvkk",
        "path_en": "/kvkk"
    },
    {
        "file": "src/app/[locale]/markalar/page.tsx",
        "ns": "BrandsSEO",
        "tr_title": "Markalarımız | Özensan",
        "tr_desc": "Özensan'ın Türkiye tek yetkili distribütörü olduğu, dünyanın önde gelen endüstriyel makine ve ekipman üreticileri.",
        "en_title": "Our Brands | Özensan",
        "en_desc": "World-leading industrial machinery and equipment manufacturers for which Özensan is the sole authorized distributor in Turkey.",
        "path_tr": "/markalar",
        "path_en": "/brands"
    },
    {
        "file": "src/app/[locale]/sikca-sorulan-sorular/page.tsx",
        "ns": "FAQSEO",
        "tr_title": "Sıkça Sorulan Sorular | Özensan",
        "tr_desc": "Özensan ürünleri, hizmetleri ve satış sonrası destek süreçleri hakkında en çok merak edilen soruların cevapları.",
        "en_title": "FAQ | Özensan",
        "en_desc": "Answers to the most frequently asked questions about Özensan products, services, and after-sales support processes.",
        "path_tr": "/sikca-sorulan-sorular",
        "path_en": "/faq"
    },
    {
        "file": "src/app/[locale]/teklif-al/page.tsx",
        "ns": "QuoteSEO",
        "tr_title": "Teklif Al | Özensan",
        "tr_desc": "Projeniz için ihtiyaç duyduğunuz makineler ve yedek parçalar için hemen fiyat teklifi alın.",
        "en_title": "Get a Quote | Özensan",
        "en_desc": "Get a price quote instantly for the machines and spare parts you need for your project.",
        "path_tr": "/teklif-al",
        "path_en": "/get-quote"
    },
    {
        "file": "src/app/[locale]/urunler/page.tsx",
        "ns": "ProductsSEO",
        "tr_title": "Tüm Ürünler ve Makineler | Özensan",
        "tr_desc": "Ağır sanayi, yol yapım ve profesyonel delme/yıkım sektörlerine yönelik dünya devlerinin sunduğu makine ve ekipman kataloğumuz.",
        "en_title": "All Products and Machinery | Özensan",
        "en_desc": "Our catalog of machinery and equipment offered by global giants for heavy industry, road construction, and professional drilling/demolition sectors.",
        "path_tr": "/urunler",
        "path_en": "/products"
    }
]

# Homepage specific
home_page = {
    "file": "src/app/[locale]/page.tsx",
    "ns": "HomeSEO",
    "tr_title": "Özensan Sanayi Makine ve Malzemeleri A.Ş. | Resmi Distribütör",
    "tr_desc": "Cedima, DUSS, Ticab, Victor ve GCE markalarının Türkiye resmi distribütörü. Ağır sanayi, yol yapım ve profesyonel delme süreçlerinize kesintisiz mühendislik ve yedek parça çözümleri sunuyoruz.",
    "en_title": "Özensan Industrial Machinery and Materials Inc. | Official Distributor",
    "en_desc": "Official Turkey distributor for Cedima, DUSS, Ticab, Victor, and GCE brands. We provide uninterrupted engineering and spare part solutions for your heavy industry, road construction, and professional drilling processes.",
    "path_tr": "/",
    "path_en": "/"
}

all_pages = pages + [home_page]

for p in all_pages:
    # Update dicts
    tr_data[p["ns"]] = {
        "title": p["tr_title"],
        "description": p["tr_desc"]
    }
    en_data[p["ns"]] = {
        "title": p["en_title"],
        "description": p["en_desc"]
    }
    
    # Process the file
    with open(p["file"], 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove existing static metadata
    metadata_pattern = r'export const metadata: Metadata = \{.*?\};'
    content = re.sub(metadata_pattern, '', content, flags=re.DOTALL)
    
    # Add new generateMetadata block
    imports_to_add = "import { getTranslations } from \"next-intl/server\";\nimport { generateSEOMetadata } from '@/utils/seo';\n"
    
    generate_block = f"""
export async function generateMetadata({{ params }}: {{ params: Promise<{{ locale: string }}> }}) {{
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({{locale, namespace: "{p['ns']}"}});
  return generateSEOMetadata({{
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '{p['path_tr']}',
    pathnameEn: '{p['path_en']}',
  }});
}}
"""
    
    # Put imports at top if not there
    if "generateSEOMetadata" not in content:
        # replace first import statement 
        content = re.sub(r'(import .*?;)', r'\1\n' + imports_to_add, content, count=1)
        
    # Append block
    # Before the default export
    content = re.sub(r'(export default (async )?function)', generate_block + r'\n\1', content)
    
    # Clean up double imports of getTranslations if they exist
    if content.count('import { getTranslations } from "next-intl/server";') > 1:
        parts = content.split('import { getTranslations } from "next-intl/server";', 1)
        content = parts[0] + 'import { getTranslations } from "next-intl/server";' + parts[1].replace('import { getTranslations } from "next-intl/server";\n', '')
    
    with open(p["file"], 'w', encoding='utf-8') as f:
        f.write(content)

with open(tr_path, 'w', encoding='utf-8') as f:
    json.dump(tr_data, f, ensure_ascii=False, indent=2)
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print("Applied generateMetadata to static pages successfully.")
