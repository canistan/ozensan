import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';
import { Link } from "@/i18n/routing";
import brandsData from '@/data/brands.json';





export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "BrandsSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/markalar',
    pathnameEn: '/brands',
  });
}

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "BrandsPage"});
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1A1E24] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
               backgroundSize: '150px'
             }}>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              {t("hero1")} <span className="text-[#C61A1A]">{t("hero2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brandsData.map((brand) => (
              <Link 
                href={{ pathname: "/markalar/[slug]", "params": { "slug": brand.slug } }} 
                key={brand.slug} 
                className="group flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Logo Area (Clean Light Background for Original Logos) */}
                <div className="h-48 w-full relative overflow-hidden bg-[#F8F9FA] border-b border-neutral-100 flex items-center justify-center p-8">
                  {/* Original Logo without filter */}
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-black text-[#1A1E24] mb-4 group-hover:text-[#C61A1A] transition-colors">{brand.name}</h2>
                  <p className="text-[#8A95A5] text-sm leading-relaxed mb-8 flex-grow">
                    {brand.description}
                  </p>
                  
                  <div className="flex items-center text-[#C61A1A] font-bold text-sm tracking-widest uppercase mt-auto">
                    {t("viewBrand")}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Former Representations Section */}
      <section className="py-16 md:py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#1A1E24] mb-4">{t("formerTitle")}</h2>
            <p className="text-[#8A95A5]">{t("formerDesc")}</p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-sm flex flex-col bg-[#F8F9FA] border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 grayscale hover:grayscale-0">
              <div className="h-40 w-full relative overflow-hidden bg-white flex items-center justify-center p-8 border-b border-neutral-200">
                <img 
                  src="/fein.svg" 
                  alt="FEIN Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#1A1E24] mb-2">FEIN</h3>
                <p className="text-[#8A95A5] text-sm">{t("formerBadge")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
