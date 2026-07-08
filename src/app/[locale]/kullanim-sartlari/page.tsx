import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "TermsSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/kullanim-sartlari',
    pathnameEn: '/terms-of-use',
  });
}

export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const isEn = locale === 'en';
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              {isEn ? 'Terms of Use' : 'Kullanım Şartları'}
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
{isEn ? (
              <>
                <p>
                  By using this website, you are deemed to have accepted the following terms of use. Please read these terms carefully before using the site.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. General Conditions</h2>
                <p>
                  All content, information, documents, and materials on the Özensan Industrial Machinery and Materials Inc. ("Özensan") website are for informational purposes. Özensan reserves the right to change or remove this content without prior notice.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
                <p>
                  The intellectual property rights of all logos, text, images, designs, and other materials on this site belong to Özensan. They cannot be copied, reproduced, or used for commercial purposes without permission. The logos and images of the global brands we distribute (Cedima, DUSS, Ticab, etc.) are the property of their respective brands.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Disclaimer of Liability</h2>
                <p>
                  Özensan makes reasonable efforts regarding the accuracy and currency of the information on the site but does not guarantee the absolute accuracy of this information. Özensan cannot be held responsible for direct or indirect material/moral damages that may arise from the use of the site.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Product Information and Technical Details</h2>
                <p>
                  The product technical specifications and images displayed on the site are representative. Manufacturing companies reserve the right to change technical specifications. You must contact our sales representatives for up-to-date technical information and confirmation before ordering.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. Third-Party Links</h2>
                <p>
                  Our site may contain links to other websites. Özensan is not responsible for the content or privacy policies of these external sites.
                </p>
              </>
        ) : (
              <>
                <p>
                  Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Lütfen siteyi kullanmadan önce bu şartları dikkatlice okuyunuz.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Genel Koşullar</h2>
                <p>
                  Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") web sitesinde yer alan tüm içerik, bilgi, belge ve materyaller bilgilendirme amaçlıdır. Özensan, bu içerikleri önceden haber vermeksizin değiştirme veya kaldırma hakkını saklı tutar.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
                <p>
                  Bu sitede yer alan logo, metin, görsel, tasarım ve diğer tüm materyallerin fikri mülkiyet hakları Özensan'a aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçlarla kullanılamaz. Distribütörü olduğumuz global markaların (Cedima, DUSS, Ticab vb.) logoları ve görselleri ilgili markaların kendi mülkiyetindedir.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Sorumluluk Reddi</h2>
                <p>
                  Özensan, sitedeki bilgilerin doğruluğu ve güncelliği konusunda makul çabayı gösterir ancak bu bilgilerin kesin doğruluğunu garanti etmez. Site kullanımından doğabilecek doğrudan veya dolaylı maddi/manevi zararlardan Özensan sorumlu tutulamaz.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Ürün Bilgileri ve Teknik Detaylar</h2>
                <p>
                  Sitede sergilenen ürün teknik özellikleri ve görselleri temsilidir. Üretici firmalar teknik özellikleri değiştirme hakkını saklı tutar. Sipariş öncesi güncel teknik bilgi ve teyit için satış temsilcilerimizle iletişime geçilmesi gerekmektedir.
                </p>

                <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. Üçüncü Taraf Bağlantıları</h2>
                <p>
                  Sitemiz, başka web sitelerine bağlantılar (linkler) içerebilir. Özensan, bu harici sitelerin içeriğinden veya gizlilik politikalarından sorumlu değildir.
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
