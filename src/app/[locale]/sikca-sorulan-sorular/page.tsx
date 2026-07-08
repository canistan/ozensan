import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';
import FAQAccordion from '@/components/ui/FAQAccordion';
import FAQSchema from '@/components/seo/FAQSchema';
import { Link } from "@/i18n/routing";





export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "FAQSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/sikca-sorulan-sorular',
    pathnameEn: '/faq',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "FAQPage"});
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

      {/* FAQ Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion />
          
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <p className="text-[#8A95A5] mb-6">
              {t("notfound")}
            </p>
            <Link href="/iletisim" className="inline-flex items-center justify-center gap-2 bg-[#1A1E24] hover:bg-[#C61A1A] text-white font-bold py-3 px-8 rounded-sm transition-colors uppercase tracking-widest text-sm">
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>

      <FAQSchema locale={locale} />
    </div>
  );
}
