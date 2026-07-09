import re

with open('src/components/products/ProductCatalog.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_map_start = "const brandCategoriesMap: Record<string, { slug: string; name: string; nameEn?: string; }[]> = {"
old_map_end = """    { slug: 'mini-loaders', name: 'Mini Yükleyiciler', nameEn: 'Mini-Loaders' },
    { slug: 'salt-sand-spreaders', name: 'Tuz ve Kum Serpme Makineleri', nameEn: 'Salt & Sand Spreaders' }
  ]
};"""

new_map = """const brandCategoriesMap: Record<string, { slug: string; name: string; nameEn?: string; }[]> = {
  cedima: [
    { slug: 'hand-held-tools', name: 'El Aletleri', nameEn: 'Hand-held tools' },
    { slug: 'table-sawing', name: 'Masa Kesme', nameEn: 'Table sawing' },
    { slug: 'floor-sawing', name: 'Zemin Kesme', nameEn: 'Floor sawing' },
    { slug: 'core-drilling', name: 'Karot Delme', nameEn: 'Core drilling' },
    { slug: 'wall-sawing', name: 'Duvar Kesme', nameEn: 'Wall sawing' },
    { slug: 'wire-sawing', name: 'Tel Kesme', nameEn: 'Wire sawing' },
    { slug: 'special-machines', name: 'Özel Makineler', nameEn: 'Special machines' }
  ],
  ticab: [
    { slug: 'bitumen-emulsion-sprayers', name: 'Bitüm Emülsiyon Püskürtücüler', nameEn: 'Bitumen Emulsion Sprayers' },
    { slug: 'crack-sealing-machine', name: 'Çatlak Kapatma Makinesi', nameEn: 'Crack Sealing Machine' },
    { slug: 'asphalt-recycling-machines', name: 'Asfalt Geri Dönüşüm Makineleri', nameEn: 'Asphalt Recycling Machines' },
    { slug: 'hotboxes', name: 'Isıtıcı Kutular', nameEn: 'Hotboxes' },
    { slug: 'asphalt-heaters', name: 'Asfalt Isıtıcılar', nameEn: 'Asphalt Heaters' },
    { slug: 'street-vacuum-cleaner', name: 'Sokak Vakum Süpürgesi', nameEn: 'Street Vacuum Cleaner' },
    { slug: 'asphalt-paver', name: 'Asfalt Serici', nameEn: 'Asphalt Paver' },
    { slug: 'mini-loaders', name: 'Mini Yükleyiciler', nameEn: 'Mini-Loaders' },
    { slug: 'salt-sand-spreaders', name: 'Tuz ve Kum Serpme Makineleri', nameEn: 'Salt & Sand Spreaders' }
  ],
  duss: [
    { slug: 'breakers-demolition', name: 'Kırıcılar ve Yıkım', nameEn: 'Breakers & Demolition' },
    { slug: 'rotary-combi-hammers', name: 'Kırıcı Deliciler', nameEn: 'Rotary & Combi Hammers' },
    { slug: 'drills', name: 'Matkaplar', nameEn: 'Drills' },
    { slug: 'diamond-core-drills', name: 'Elmas Karot Deliciler', nameEn: 'Diamond Core Drills' }
  ],
  victor: [
    { slug: 'outfits-kits', name: 'Kesme ve Kaynak Setleri', nameEn: 'Outfits & Kits' },
    { slug: 'torches', name: 'Hamlaçlar ve Şalumolar', nameEn: 'Torches & Handles' },
    { slug: 'tips-nozzles', name: 'Kesme ve Kaynak Uçları', nameEn: 'Tips & Nozzles' },
    { slug: 'regulators-flowmeters', name: 'Regülatörler ve Debimetreler', nameEn: 'Regulators & Flowmeters' },
    { slug: 'valves-arrestors', name: 'Emniyet Valfleri', nameEn: 'Flashback Arrestors & Valves' },
    { slug: 'machines-manifolds', name: 'Makineler ve Sistemler', nameEn: 'Machines & Manifolds' }
  ]
};"""

# A simple string replacement based on start and end
start_idx = content.find(old_map_start)
end_idx = content.find(old_map_end) + len(old_map_end)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_map + content[end_idx:]
    with open('src/components/products/ProductCatalog.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated ProductCatalog.tsx successfully with DUSS and VICTOR.")
else:
    print("Could not find the map to replace.")

