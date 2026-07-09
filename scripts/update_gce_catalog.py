import re

with open('src/components/products/ProductCatalog.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_map_end = """    { slug: 'machines-manifolds', name: 'Makineler ve Sistemler', nameEn: 'Machines & Manifolds' }
  ]
};"""

new_map_end = """    { slug: 'machines-manifolds', name: 'Makineler ve Sistemler', nameEn: 'Machines & Manifolds' }
  ],
  gce: [
    { slug: 'tips-nozzles', name: 'Hamlaçlar ve Kesme Uçları', nameEn: 'Torches & Nozzles' },
    { slug: 'regulators', name: 'Regülatörler', nameEn: 'Regulators' },
    { slug: 'valves-arrestors', name: 'Valfler ve Vanalar', nameEn: 'Valves' },
    { slug: 'automated-cutting', name: 'Otomatik Kesim', nameEn: 'Automated Cutting' },
    { slug: 'gas-generators', name: 'Gaz Jeneratörleri', nameEn: 'Gas Generators' }
  ]
};"""

content = content.replace(old_map_end, new_map_end)

with open('src/components/products/ProductCatalog.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added GCE to brandCategoriesMap")
