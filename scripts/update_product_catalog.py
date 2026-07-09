import re

with open('src/components/products/ProductCatalog.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add brandCategoriesMap
brand_categories_map = """
const brandCategoriesMap: Record<string, { slug: string; name: string; nameEn?: string; }[]> = {
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
  ]
};
"""

# 1. Add brandCategory to Product type
content = content.replace(
    '  solutions: string[];\n};',
    '  solutions: string[];\n  brandCategory?: string;\n};\n' + brand_categories_map
)

# 2. Add state and logic for toggleBrand, toggleBrandCategory
old_toggle_brand = """  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev => 
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
  };"""

new_toggle_brand = """  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBrandCategories, setSelectedBrandCategories] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(slug)) {
        if (brandCategoriesMap[slug]) {
          const subSlugs = brandCategoriesMap[slug].map(c => c.slug);
          setSelectedBrandCategories(cats => cats.filter(c => !subSlugs.includes(c)));
        }
        return prev.filter(b => b !== slug);
      }
      return [...prev, slug];
    });
  };

  const toggleBrandCategory = (slug: string) => {
    setSelectedBrandCategories(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };

  const brandHasSelectedCategories = (brandSlug: string) => {
    const cats = brandCategoriesMap[brandSlug] || [];
    return cats.some(c => selectedBrandCategories.includes(c.slug));
  };"""
content = content.replace(old_toggle_brand, new_toggle_brand)


# 3. Update filteredProducts
old_filter = """      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Solution filter"""
new_filter = """      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Brand Category filter
      if (brandHasSelectedCategories(product.brand)) {
        if (!product.brandCategory || !selectedBrandCategories.includes(product.brandCategory)) {
          return false;
        }
      }
      
      // Solution filter"""
content = content.replace(old_filter, new_filter)

# 4. Update clearFilters button
old_clear = """          {(selectedBrands.length > 0 || selectedSolutions.length > 0 || searchQuery) && (
            <button 
              onClick={() => { setSelectedBrands([]); setSelectedSolutions([]); setSearchQuery(''); }}"""
new_clear = """          {(selectedBrands.length > 0 || selectedBrandCategories.length > 0 || selectedSolutions.length > 0 || searchQuery) && (
            <button 
              onClick={() => { setSelectedBrands([]); setSelectedBrandCategories([]); setSelectedSolutions([]); setSearchQuery(''); }}"""
content = content.replace(old_clear, new_clear)

# 5. Update JSX for Brands
old_brand_jsx = """            {brands.map(brand => (
              <label key={brand.slug} className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border-2 border-neutral-300 rounded hover:border-[#C61A1A] checked:bg-[#C61A1A] checked:border-[#C61A1A] transition-colors cursor-pointer"
                    checked={selectedBrands.includes(brand.slug)}
                    onChange={() => toggleBrand(brand.slug)}
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[#8A95A5] group-hover:text-[#1A1E24] transition-colors">{brand.name}</span>
              </label>
            ))}"""
new_brand_jsx = """            {brands.map(brand => (
              <div key={brand.slug} className="flex flex-col">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-5 h-5 border-2 border-neutral-300 rounded hover:border-[#C61A1A] checked:bg-[#C61A1A] checked:border-[#C61A1A] transition-colors cursor-pointer"
                      checked={selectedBrands.includes(brand.slug)}
                      onChange={() => toggleBrand(brand.slug)}
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[#8A95A5] group-hover:text-[#1A1E24] transition-colors">{brand.name}</span>
                </label>
                
                {selectedBrands.includes(brand.slug) && brandCategoriesMap[brand.slug] && (
                  <div className="ml-8 mt-3 mb-1 space-y-3 border-l-2 border-neutral-100 pl-3">
                    {brandCategoriesMap[brand.slug].map(cat => (
                      <label key={cat.slug} className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center justify-center w-4 h-4 mr-3">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-4 h-4 border-2 border-neutral-300 rounded hover:border-[#C61A1A] checked:bg-[#C61A1A] checked:border-[#C61A1A] transition-colors cursor-pointer"
                            checked={selectedBrandCategories.includes(cat.slug)}
                            onChange={() => toggleBrandCategory(cat.slug)}
                          />
                          <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-[#8A95A5] group-hover:text-[#1A1E24] transition-colors text-sm">
                          {locale === 'en' && cat.nameEn ? cat.nameEn : cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}"""
content = content.replace(old_brand_jsx, new_brand_jsx)

with open('src/components/products/ProductCatalog.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ProductCatalog.tsx successfully")
