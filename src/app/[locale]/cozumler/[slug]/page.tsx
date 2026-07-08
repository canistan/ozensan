import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from "@/i18n/routing";
import solutionsData from '@/data/solutions.json';
import productsData from '@/data/products.json';

import { generateSEOMetadata } from '@/utils/seo';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const solution = solutionsData.find((s) => s.slug === slug || (s as any).slugEn === slug);
  
  if (!solution) {
    return { title: locale === 'en' ? 'Solution Not Found | Özensan' : 'Çözüm Bulunamadı | Özensan' };
  }

  const isEn = locale === 'en';
  const name = isEn && (solution as any).nameEn ? (solution as any).nameEn : solution.name;
  const description = isEn && (solution as any).descriptionEn ? (solution as any).descriptionEn : solution.description;

  return generateSEOMetadata({
    title: isEn ? `${name} Solutions | Özensan` : `${name} Çözümleri | Özensan`,
    description: description,
    locale,
    pathnameTr: `/cozumler/${slug}`,
    pathnameEn: `/solutions/${slug}`,
    image: solution.image,
  });
}

export async function generateStaticParams() {
  const params: { locale: string, slug: string }[] = [];
  solutionsData.forEach((solution) => {
    params.push({ locale: 'tr', slug: solution.slug });
    if ((solution as any).slugEn) {
      params.push({ locale: 'en', slug: (solution as any).slugEn });
    }
  });
  return params;
}

import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function SolutionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const locale = (resolvedParams as any).locale;
  const isEn = locale === 'en';
  const tn = await getTranslations({locale, namespace: "Navigation"});
  const solution = solutionsData.find((s) => s.slug === resolvedParams.slug || (s as any).slugEn === resolvedParams.slug);

  if (!solution) {
    notFound();
  }

  // Get products that are tagged with this solution
  const solutionProducts = productsData.filter((p) => p.solutions.includes(solution.slug));

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Solution Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[450px] flex items-center bg-[#1A1E24] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={solution.image} 
            alt={solution.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-[#1A1E24]/80 to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="mb-8">
              <Breadcrumb items={[
                { label: tn("solutions"), href: "/cozumler" },
                { label: isEn ? solution.nameEn : solution.name }
              ]} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              {solution.name}
            </h1>
            <p className="text-[#8A95A5] text-lg leading-relaxed max-w-2xl">
              {solution.description}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Products Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-neutral-200 pb-6">
            <div>
              <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm block mb-2">{isEn ? solution.nameEn : solution.name}</span>
              <h2 className="text-3xl font-black text-[#1A1E24] tracking-tight">{isEn ? 'Recommended Products' : 'Önerilen Ürünler'}</h2>
            </div>
            <div className="text-[#8A95A5] font-medium">
              {isEn ? `Total ${solutionProducts.length} equipment found` : `Toplam ${solutionProducts.length} ekipman bulundu`}
            </div>
          </div>

          {solutionProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutionProducts.map((prod) => (
                <Link href={{ pathname: "/urunler/[slug]", "params": { "slug": prod.slug } }} key={prod.slug} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group hover:shadow-xl hover:border-[#C61A1A]/30 transition-all duration-300 flex flex-col relative">
                  {/* Brand Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#1A1E24] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm shadow-md">
                    {prod.brand}
                  </div>
                  
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-white p-8">
                    <img src={prod.image} alt={isEn && (prod as any).nameEn ? (prod as any).nameEn : prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow bg-[#F8F9FA] border-t border-neutral-100 group-hover:bg-white transition-colors">
                    <h3 className="text-xl font-black text-[#1A1E24] group-hover:text-[#C61A1A] transition-colors mb-3 line-clamp-2">{isEn && (prod as any).nameEn ? (prod as any).nameEn : prod.name}</h3>
                    <p className="text-sm text-[#8A95A5] line-clamp-2 mb-6">{isEn && (prod as any).descriptionEn ? (prod as any).descriptionEn : prod.description}</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-[#1A1E24] font-bold uppercase tracking-widest text-xs group-hover:text-[#C61A1A] transition-colors">
                      {isEn ? 'View Product' : 'Ürünü İncele'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <h3 className="text-xl font-bold text-[#1A1E24] mb-2">{isEn ? 'No Equipment Found' : 'Ekipman Bulunamadı'}</h3>
              <p className="text-[#8A95A5]">{isEn ? 'Product records for this solution area are being updated.' : 'Bu çözüm alanına ait ürün kayıtları güncellenmektedir.'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
