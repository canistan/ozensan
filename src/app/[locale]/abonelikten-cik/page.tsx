import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';
import { Metadata } from 'next';
import UnsubscribeForm from '@/components/forms/UnsubscribeForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "Unsubscribe"});
  return generateSEOMetadata({
    title: t("title") + " | Özensan",
    description: t("desc"),
    locale,
    pathnameTr: '/abonelikten-cik',
    pathnameEn: '/unsubscribe',
  });
}

export default async function UnsubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "Unsubscribe"});
  
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
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-neutral-100">
              <p className="text-[#8A95A5] mb-8 text-center">{t("desc")}</p>
              <UnsubscribeForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
