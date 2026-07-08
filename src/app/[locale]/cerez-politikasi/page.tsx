import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';




export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "CookieSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/cerez-politikasi',
    pathnameEn: '/cookie-policy',
  });
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const isEn = locale === 'en';
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              Çerez (Cookie) Politikası
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
{isEn ? (
              <>
                <p>
                  As Özensan Industrial Machinery and Materials Inc. ("Özensan"), we use Cookies so that you can benefit from our website in the most efficient way and to improve your user experience.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. What is a Cookie?</h2>
                <p>
                  Cookies are small text files saved to your computer or mobile device through your browser when you visit a website.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Why Do We Use Cookies?</h2>
                <p>
                  - To perform essential functions required for the website to work properly.<br/>
                  - To analyze the website and improve its performance.<br/>
                  - To increase the functionality of the site and provide ease of use.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Cookie Management</h2>
                <p>
                  You have the opportunity to customize your preferences regarding cookies by changing your browser settings. If you disable cookies, you may not be able to use some features of our site.
                </p>
              </>
        ) : (
              <>
                <p>
                  Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Çerez (Cookie) kullanmaktayız.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Çerez Nedir?</h2>
                <p>
                  Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Çerezleri Neden Kullanıyoruz?</h2>
                <p>
                  - Web sitesinin düzgün çalışması için gerekli temel fonksiyonları gerçekleştirmek.<br/>
                  - Web sitesini analiz etmek ve performansını artırmak.<br/>
                  - Sitenin işlevselliğini artırmak ve kullanım kolaylığı sağlamak.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Çerez Yönetimi</h2>
                <p>
                  Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri devre dışı bırakmanız halinde sitemizin bazı özelliklerinden faydalanamayabilirsiniz.
                </p>
              </>
        )}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
