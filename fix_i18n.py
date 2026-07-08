import re
import os
import json

# Fix Breadcrumb
breadcrumb_path = "src/components/ui/Breadcrumb.tsx"
with open(breadcrumb_path, "r", encoding="utf-8") as f:
    bc_content = f.read()

bc_content = bc_content.replace("import { Link } from '@/i18n/routing';", "import { Link } from '@/i18n/routing';\nimport { useTranslations } from 'next-intl';")
bc_content = bc_content.replace("export default function Breadcrumb({ items }: BreadcrumbProps) {", "export default function Breadcrumb({ items }: BreadcrumbProps) {\n  const t = useTranslations('Global');")
bc_content = bc_content.replace("Anasayfa", "{t('home')}")

with open(breadcrumb_path, "w", encoding="utf-8") as f:
    f.write(bc_content)

# Fix brand page description
brand_page_path = "src/app/[locale]/markalar/[slug]/page.tsx"
with open(brand_page_path, "r", encoding="utf-8") as f:
    bp_content = f.read()

bp_content = bp_content.replace("{brand.description}", "{locale === 'en' && brand.descriptionEn ? brand.descriptionEn : brand.description}")

with open(brand_page_path, "w", encoding="utf-8") as f:
    f.write(bp_content)

# Update en.json and tr.json for Global.home
tr = json.load(open("src/messages/tr.json", "r", encoding="utf-8"))
en = json.load(open("src/messages/en.json", "r", encoding="utf-8"))

if "Global" not in tr: tr["Global"] = {}
if "Global" not in en: en["Global"] = {}

tr["Global"]["home"] = "Anasayfa"
en["Global"]["home"] = "Home"

json.dump(tr, open("src/messages/tr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
json.dump(en, open("src/messages/en.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)

