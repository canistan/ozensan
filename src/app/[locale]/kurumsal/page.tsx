import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from "@/i18n/routing";
import FAQAccordion from "@/components/ui/FAQAccordion";
import FAQSchema from "@/components/seo/FAQSchema";




export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "CorporateSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/kurumsal',
    pathnameEn: '/corporate',
  });
}

import { useLocale } from 'next-intl';

import { useTranslations } from 'next-intl';

export default function CorporatePage() {
  const locale = useLocale();
  const t = useTranslations('CorporatePage');
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-[#1A1E24] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-transparent to-transparent z-10" />
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              {t('Hero.title1')} <span className="text-[#C61A1A]">{t('Hero.title2')}</span> {t('Hero.title3')}
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] font-medium leading-relaxed max-w-2xl">
              {t('Hero.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Yönetimimiz Section */}
      <section className="py-20 md:py-32 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full mb-6">
              {t('Management.tag')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
              {t('Management.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Engin Çelik */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-neutral-200 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/EnginCelik.jpg" 
                  alt="Engin Çelik" 
                  fill 
                  className="object-cover scale-[1.3] object-top"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-2">Engin Çelik</h3>
              <p className="text-[#C61A1A] font-medium tracking-wide uppercase text-sm mb-4">{t('Management.p1_role')}</p>
              <p className="text-[#8A95A5] leading-relaxed max-w-sm">
                {t('Management.p1_desc')}
              </p>
            </div>

            {/* Pelin Çelik */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-neutral-200 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/PelinCelik.png" 
                  alt="Pelin Çelik" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-2">Pelin Çelik</h3>
              <p className="text-[#C61A1A] font-medium tracking-wide uppercase text-sm mb-4">{t('Management.p2_role')}</p>
              <p className="text-[#8A95A5] leading-relaxed max-w-sm">
                {t('Management.p2_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full">
                {t('About.tag')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
                {t('About.title')}
              </h2>
              <div className="space-y-6 text-[#1A1E24]/70 text-lg leading-relaxed">
                <p>
                  {t('About.desc1')}
                </p>
                <p>
                  {t('About.desc2')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                <div>
                  <div className="text-4xl font-black text-[#C61A1A] mb-2">50+</div>
                  <div className="text-sm font-bold text-[#1A1E24] tracking-wide uppercase">{t('About.stat1')}</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#C61A1A] mb-2">10K+</div>
                  <div className="text-sm font-bold text-[#1A1E24] tracking-wide uppercase">{t('About.stat2')}</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#C61A1A] translate-x-4 translate-y-4 rounded-xl opacity-20"></div>
              <div className="relative bg-[#1A1E24] p-1 rounded-xl h-full min-h-[400px] overflow-hidden group">
                <Image 
                  src="/endustriyel-gorsel.png" 
                  alt="Özensan Endüstriyel Çözümler" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="text-white font-bold text-xl tracking-wide">{t('About.img_title')}</div>
                  <div className="text-[#8A95A5] text-sm mt-1">{t('About.img_desc')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vizyon & Misyon Section */}
      <section className="py-20 md:py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Misyon */}
            <div className="bg-white p-10 md:p-14 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#C61A1A]/10 text-[#C61A1A] rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-4">{t('MissionVision.m_title')}</h3>
              <p className="text-[#1A1E24]/70 leading-relaxed text-lg">
                {t('MissionVision.m_desc')}
              </p>
            </div>

            {/* Vizyon */}
            <div className="bg-[#1A1E24] p-10 md:p-14 rounded-2xl shadow-xl text-white">
              <div className="w-16 h-16 bg-white/10 text-white rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('MissionVision.v_title')}</h3>
              <p className="text-[#8A95A5] leading-relaxed text-lg">
                {t('MissionVision.v_desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 md:py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full mb-6">
            {t('Values.tag')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight mb-16">
            {t('Values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t('Values.v1_title'),
                desc: t('Values.v1_desc')
              },
              {
                title: t('Values.v2_title'),
                desc: t('Values.v2_desc')
              },
              {
                title: t('Values.v3_title'),
                desc: t('Values.v3_desc')
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-neutral-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#1A1E24] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold text-[#1A1E24] mb-3">{value.title}</h4>
                <p className="text-[#1A1E24]/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS (FAQ) Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full mb-6">
              {t('FAQ.tag')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
              {t('FAQ.title')}
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <FAQSchema locale={locale} />
    </div>
  );
}
