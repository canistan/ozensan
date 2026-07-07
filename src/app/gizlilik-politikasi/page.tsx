import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Özensan',
  description: 'Özensan Web Sitesi Gizlilik Politikası',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              Gizlilik Politikası
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
              <p>
                <strong>Özensan</strong> ("Şirket") olarak, web sitemizi ziyaret eden tüm kullanıcıların gizliliğine ve güvenliğine saygı duymaktayız. Bu Gizlilik Politikası, web sitemiz üzerinden toplanan bilgilerin nasıl kullanıldığını, korunduğunu ve paylaşıldığını açıklamak amacıyla hazırlanmıştır.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Toplanan Bilgiler</h2>
              <p>
                Web sitemizi ziyaretiniz sırasında, hizmetlerimizi daha iyi sunabilmek amacıyla bazı bilgiler toplanabilir. Bu bilgiler genel olarak iki kategoriye ayrılır:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kişisel Bilgiler:</strong> İletişim formları, talep formları veya e-posta yoluyla bizimle paylaştığınız ad, soyad, e-posta adresi, telefon numarası gibi sizi doğrudan tanımlayabilen bilgilerdir.</li>
                <li><strong>Kişisel Olmayan Bilgiler:</strong> Tarayıcı türü, IP adresi, site ziyaret süreleri, incelenen sayfalar gibi istatistiksel verilerdir. Bu veriler, site performansını analiz etmek ve geliştirmek için kullanılır.</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Bilgilerin Kullanım Amacı</h2>
              <p>
                Toplanan bilgiler aşağıdaki amaçlar doğrultusunda kullanılabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Size talep ettiğiniz hizmet ve ürünleri sunmak,</li>
                <li>İletişim taleplerinize, sorularınıza ve geri bildirimlerinize yanıt vermek,</li>
                <li>Web sitesinin genel kullanımını analiz ederek kullanıcı deneyimini iyileştirmek,</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Bilgilerin Paylaşımı</h2>
              <p>
                Özensan, kullanıcılarına ait kişisel bilgileri, yasal zorunluluklar haricinde, kullanıcı onayı olmaksızın üçüncü şahıslarla paylaşmaz, satmaz veya kiralamaz. Yasal bir talep (mahkeme kararı vb.) gelmesi durumunda, yürürlükteki mevzuat çerçevesinde yetkili mercilerle bilgi paylaşımı yapılabilir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Veri Güvenliği</h2>
              <p>
                Kişisel verilerinizin güvenliğini sağlamak amacıyla endüstri standartlarında uygun fiziksel, elektronik ve yönetimsel prosedürler uygulanmaktadır. Ancak, internet üzerinden yapılan veri aktarımlarının %100 güvenli olacağının garantisi verilemez; bu nedenle bilgilerinizi paylaşırken kendi güvenliğinize de dikkat etmeniz önerilir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. Üçüncü Taraf Bağlantıları</h2>
              <p>
                Web sitemiz zaman zaman üçüncü taraf web sitelerine veya hizmetlere bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından veya içeriklerinden Özensan sorumlu değildir. Başka bir siteye yönlendirildiğinizde, o sitenin kendi gizlilik politikasını okumanızı tavsiye ederiz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">6. Politika Güncellemeleri</h2>
              <p>
                Özensan, hizmet şartlarındaki değişiklikler veya yasal zorunluluklar nedeniyle bu Gizlilik Politikası'nı önceden haber vermeksizin güncelleme hakkını saklı tutar. Güncellenen politika, web sitemizde yayınlandığı andan itibaren geçerli olur.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">7. İletişim</h2>
              <p>
                Gizlilik Politikamız ile ilgili her türlü soru, görüş veya talebiniz için lütfen iletişim sayfamızdan veya doğrudan e-posta adresimiz üzerinden bizimle irtibata geçiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
