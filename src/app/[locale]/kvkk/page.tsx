import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';




export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "KVKKSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/kvkk',
    pathnameEn: '/kvkk',
  });
}

export default async function KVKKPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const isEn = locale === 'en';
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
{isEn ? (
              <>
                <p>
                  As Özensan Industrial Machinery and Materials Inc. ("Özensan"), we show maximum sensitivity to the security of your personal data. With this awareness, we attach great importance to the processing and preservation of all kinds of personal data belonging to all individuals associated with our company in accordance with the Law on the Protection of Personal Data No. 6698 ("KVKK").
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Collection and Processing of Personal Data</h2>
                <p>
                  Your personal data may vary depending on the commercial activities and services provided by Özensan; it can be collected verbally, in writing or electronically by automatic or non-automatic methods, through offices, website, social media channels, mobile applications and similar means.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Purposes of Processing Personal Data</h2>
                <p>
                  Your collected personal data will be processed within the personal data processing conditions and purposes specified in Articles 5 and 6 of the KVKK Law for the purposes of carrying out the necessary work by our business units to benefit you from the products and services offered by our company, ensuring the legal and commercial security of our company and those who have a business relationship with our company, determining and implementing our company's commercial and business strategies, and ensuring the execution of our human resources policies.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. To Whom and For What Purpose the Processed Personal Data Can Be Transferred</h2>
                <p>
                  Your collected personal data may be transferred to our business partners, suppliers, legally authorized public institutions and private individuals within the framework of the personal data processing conditions and purposes specified in Articles 8 and 9 of the KVKK Law.
                </p>
              </>
        ) : (
              <>
                <p>
                  Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, şirketimizle ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVK Kanunu")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Kişisel Verilerin Toplanması ve İşlenmesi</h2>
                <p>
                  Kişisel verileriniz, Özensan tarafından sağlanan ticari faaliyetlere ve sunulan hizmetlere bağlı olarak değişkenlik gösterebilmekle birlikte; otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Kişisel Verilerin İşlenme Amaçları</h2>
                <p>
                  Toplanan kişisel verileriniz, şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, şirketimizin ve şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini, şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla KVK Kanunu'nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
                <p>
                  Toplanan kişisel verileriniz; iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere KVK Kanunu'nun 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
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
