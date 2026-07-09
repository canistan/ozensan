"use client";

import React, { useState, useMemo } from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

type Product = {
  slug: string;
  brand: string;
  name: string;
  nameEn?: string;
  image: string;
  description: string;
  descriptionEn?: string;
  solutions: string[];
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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBrand = (slug: string) => {
    setSelectedBrands(prev => 
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
  };

  const toggleSolution = (slug: string) => {
    setSelectedSolutions(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      // Solution filter
      if (selectedSolutions.length > 0 && !product.solutions.some(s => selectedSolutions.includes(s))) {
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
          {(selectedBrands.length > 0 || selectedSolutions.length > 0 || searchQuery) && (
            <button 
              onClick={() => { setSelectedBrands([]); setSelectedSolutions([]); setSearchQuery(''); }}
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
