"use client";

import React, { useState, useMemo } from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from 'next/navigation';

type Product = {
  slug: string;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
  description: string;
  descriptionEn?: string;
  solutions?: string[];
  brandCategory?: string;
};

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
  ],
  gce: [
    { slug: 'nozzles', name: 'Kesme Uçları', nameEn: 'Nozzles' },
    { slug: 'combi-torches', name: 'Kombi Hamlaçlar', nameEn: 'Combi Torches' },
    { slug: 'welding-torches', name: 'Kaynak Hamlaçları', nameEn: 'Welding Torches' },
    { slug: 'injector-cutting-torches', name: 'Enjektörlü Kesme Hamlaçları', nameEn: 'Injector Cutting Torches' },
    { slug: 'nozzle-mix-cutting-torches', name: 'Lüle Karışımlı Kesme Hamlaçları', nameEn: 'Nozzle Mix Cutting Torches' },
    { slug: 'combi-torch-sets', name: 'Kombi Hamlaç Setleri', nameEn: 'Combi Torch Sets' },
    { slug: 'machine-cutting-nozzles', name: 'Makine Kesme Uçları', nameEn: 'Machine Cutting Nozzles' },
    { slug: 'automated-torches-systems', name: 'Otomatik Hamlaç ve Sistemler', nameEn: 'Automated Torches & Systems' },
    { slug: 'portable-cutting-machines', name: 'Portatif Kesme Makineleri', nameEn: 'Portable Cutting Machines' },
    { slug: 'machine-cutting-accessories', name: 'Makine Kesim Aksesuarları', nameEn: 'Machine Cutting Accessories' },
    { slug: 'cylinder-regulators', name: 'Tüp Regülatörleri', nameEn: 'Cylinder Regulators' },
    { slug: 'propane-regulators', name: 'Propan Regülatörleri', nameEn: 'Propane Regulators' },
    { slug: 'technical-grade-regulators', name: 'Teknik Derece Regülatörler', nameEn: 'Technical Grade Regulators' },
    { slug: 'standard-cylinder-valves', name: 'Standart Tüp Vanaları', nameEn: 'Standard Cylinder Valves' },
    { slug: 'industrial-vipr-combination-valves', name: 'Endüstriyel Kombinasyon Vanaları', nameEn: 'Industrial VIPR Combination Valves' },
    { slug: 'bundle-pack-valves', name: 'Çoklu Tüp Paket Vanaları', nameEn: 'Bundle Pack Valves' },
    { slug: 'flashback-arrestors', name: 'Alev Geri Tepme Emniyet Valfleri', nameEn: 'Flashback Arrestors' },
    { slug: 'hoses', name: 'Hortumlar', nameEn: 'Hoses' },
    { slug: 'torch-accessories', name: 'Hamlaç Aksesuarları', nameEn: 'Torch Accessories' },
    { slug: 'filling-adaptors', name: 'Dolum Adaptörleri', nameEn: 'Filling Adaptors' },
    { slug: 'safety-equipment-and-ppe', name: 'İş Güvenliği Ekipmanları (KKE)', nameEn: 'Safety Equipment and PPE' },
    { slug: 'air-propane-equipment', name: 'Hava ve Propan Ekipmanları', nameEn: 'Air & Propane Equipment' },
    { slug: 'arc-welding-and-cutting', name: 'Ark Kaynağı ve Kesimi', nameEn: 'Arc Welding & Cutting' },
    { slug: 'nitrogen-generators', name: 'Azot (Nitrojen) Jeneratörleri', nameEn: 'Nitrogen Generators' },
    { slug: 'accessories', name: 'Genel Aksesuarlar', nameEn: 'Accessories' }
  ]
};


type Brand = {
  slug: string;
  name: string;
};

type Solution = {
  slug: string;
  name: string;
  nameEn?: string;
};

interface ProductCatalogProps {
  initialProducts: Product[];
  brands: Brand[];
  solutions: Solution[];
}

export default function ProductCatalog({ initialProducts, brands, solutions }: ProductCatalogProps) {
  const t = useTranslations("CatalogPage");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
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
  };

  const toggleSolution = (slug: string) => {
    setSelectedSolutions(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.toLowerCase())) {
        return false;
      }
      
      // Brand Category filter
      if (brandHasSelectedCategories(product.brand.toLowerCase())) {
        if (!product.brandCategory || !selectedBrandCategories.includes(product.brandCategory)) {
          return false;
        }
      }
      
      // Solution filter
      if (selectedSolutions.length > 0 && (!product.solutions || !product.solutions.some(s => selectedSolutions.includes(s)))) {
        return false;
      }
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const prodName = locale === 'en' && product.nameEn ? product.nameEn.toLowerCase() : product.name.toLowerCase();
        const prodDesc = locale === 'en' && product.descriptionEn ? product.descriptionEn.toLowerCase() : product.description.toLowerCase();
        return prodName.includes(query) || prodDesc.includes(query);
      }
      
      return true;
    });
  }, [initialProducts, selectedBrands, selectedSolutions, searchQuery, locale]);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4 flex-shrink-0 space-y-8">
        
        {/* Search */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="font-bold text-[#1A1E24] mb-4 uppercase tracking-widest text-sm">{t("search")}</h3>
          <input 
            type="text" 
            placeholder={t("searchPlaceholder")} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
          />
        </div>

        {/* Brand Filter */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="font-bold text-[#1A1E24] mb-4 uppercase tracking-widest text-sm">{t("brands")}</h3>
          <div className="space-y-3">
            {brands.map(brand => (
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
            ))}
          </div>
        </div>

        {/* Solutions Filter */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="font-bold text-[#1A1E24] mb-4 uppercase tracking-widest text-sm">{t("solutions")}</h3>
          <div className="space-y-3">
            {solutions.map(solution => (
              <label key={solution.slug} className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border-2 border-neutral-300 rounded hover:border-[#C61A1A] checked:bg-[#C61A1A] checked:border-[#C61A1A] transition-colors cursor-pointer"
                    checked={selectedSolutions.includes(solution.slug)}
                    onChange={() => toggleSolution(solution.slug)}
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[#8A95A5] group-hover:text-[#1A1E24] transition-colors leading-tight">
                  {locale === 'en' && solution.nameEn ? solution.nameEn : solution.name}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Product Grid */}
      <div className="w-full lg:w-3/4">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-[#8A95A5] font-medium">
            {t("productsListed", { count: filteredProducts.length })}
          </span>
          {(selectedBrands.length > 0 || selectedBrandCategories.length > 0 || selectedSolutions.length > 0 || searchQuery) && (
            <button 
              onClick={() => { setSelectedBrands([]); setSelectedBrandCategories([]); setSelectedSolutions([]); setSearchQuery(''); }}
              className="text-[#C61A1A] text-sm font-bold hover:underline"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <Link href={{ pathname: "/urunler/[slug]", "params": { "slug": prod.slug } }} key={prod.slug} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group hover:shadow-xl hover:border-[#C61A1A]/30 transition-all duration-300 flex flex-col relative">
                <div className="absolute top-4 left-4 z-10 bg-[#1A1E24] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm shadow-md">
                  {prod.brand}
                </div>
                
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-white p-6">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow bg-[#F8F9FA] border-t border-neutral-100 group-hover:bg-white transition-colors">
                  <h3 className="text-xl font-black text-[#1A1E24] group-hover:text-[#C61A1A] transition-colors mb-3 line-clamp-2">
                    {locale === 'en' && prod.nameEn ? prod.nameEn : prod.name}
                  </h3>
                  <p className="text-sm text-[#8A95A5] line-clamp-2 mb-6">
                    {locale === 'en' && prod.descriptionEn ? prod.descriptionEn : prod.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[#1A1E24] font-bold uppercase tracking-widest text-xs group-hover:text-[#C61A1A] transition-colors">
                    {t("viewProduct")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <h3 className="text-xl font-bold text-[#1A1E24] mb-2">{t("noProductsFoundTitle")}</h3>
            <p className="text-[#8A95A5]">{t("noProductsFoundDesc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
