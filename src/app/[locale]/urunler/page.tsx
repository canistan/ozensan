import React from 'react';
import { Metadata } from 'next';
import ProductCatalog from '@/components/products/ProductCatalog';
import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';
import solutionsData from '@/data/solutions.json';

export const metadata: Metadata = {
  title: 'Tüm Ürünler ve Makineler | Özensan',
  description: 'Ağır sanayi, yol yapım ve profesyonel delme/yıkım sektörlerine yönelik dünya devlerinin sunduğu makine ve ekipman kataloğumuz.',
};

import { getTranslations } from "next-intl/server";
export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "CatalogPage"});
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
              {t("heroTitle1")} <span className="text-[#C61A1A]">{t("heroTitle2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Catalog Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCatalog 
            initialProducts={productsData} 
            brands={brandsData} 
            solutions={solutionsData} 
          />
        </div>
      </section>
    </div>
  );
}
