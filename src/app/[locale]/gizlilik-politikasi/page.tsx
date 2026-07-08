import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';




export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "PrivacySEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/gizlilik-politikasi',
    pathnameEn: '/privacy-policy',
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const isEn = locale === 'en';
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              {isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
{isEn ? (
              <>
                <p>
                  This Privacy Policy explains how Özensan Industrial Machinery and Materials Inc. ("Özensan") collects, uses, protects, and shares the personal information of our users.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Information Collection</h2>
                <p>
                  We may collect personal information such as your name, surname, e-mail address, and phone number when you visit our site, fill out contact forms, or use our services.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Use of Information</h2>
                <p>
                  The collected information is used to provide you with better service, respond to your requests, provide technical support, and inform you about innovations related to our company.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Information Security</h2>
                <p>
                  The security of your personal information is important to us. We take industry-standard security measures to protect your information against unauthorized access, use, alteration, and disclosure.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Sharing with Third Parties</h2>
                <p>
                  Özensan does not share users' personal information with third parties unless there is a legal obligation or explicit user consent.
                </p>
              </>
        ) : (
              <>
                <p>
                  Bu Gizlilik Politikası, Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak, kullanıcılarımızın kişisel bilgilerini nasıl topladığımızı, kullandığımızı, koruduğumuzu ve paylaştığımızı açıklamaktadır.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Bilgi Toplama</h2>
                <p>
                  Sitemizi ziyaret ettiğinizde, iletişim formlarını doldurduğunuzda veya hizmetlerimizden faydalandığınızda ad, soyad, e-posta adresi, telefon numarası gibi kişisel bilgilerinizi toplayabiliriz.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
                <p>
                  Toplanan bilgiler, sizlere daha iyi hizmet sunmak, taleplerinize yanıt vermek, teknik destek sağlamak ve şirketimizle ilgili yeniliklerden sizi haberdar etmek amacıyla kullanılır.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Bilgi Güvenliği</h2>
                <p>
                  Kişisel bilgilerinizin güvenliği bizim için önemlidir. Bilgilerinizi yetkisiz erişime, kullanıma, değiştirmeye ve ifşaya karşı korumak için endüstri standardı güvenlik önlemleri almaktayız.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Üçüncü Taraflarla Paylaşım</h2>
                <p>
                  Özensan, kullanıcıların kişisel bilgilerini yasal bir zorunluluk olmadıkça veya kullanıcının açık rızası bulunmadıkça üçüncü şahıslarla paylaşmaz.
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
