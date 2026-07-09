import re

# 1. Fix ProductCatalog.tsx
with open('src/components/products/ProductCatalog.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('  solutions: string[];', '  solutions?: string[];')
content = content.replace(
    '!product.solutions.some(s => selectedSolutions.includes(s))',
    '(!product.solutions || !product.solutions.some(s => selectedSolutions.includes(s)))'
)

with open('src/components/products/ProductCatalog.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Fix cozumler/[slug]/page.tsx
with open('src/app/[locale]/cozumler/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    cozum_content = f.read()

cozum_content = cozum_content.replace(
    'p.solutions.includes(resolvedParams.slug)',
    '(p.solutions && p.solutions.includes(resolvedParams.slug))'
)

with open('src/app/[locale]/cozumler/[slug]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(cozum_content)

print("Fixed TypeScript errors.")
