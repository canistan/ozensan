import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Özensan',
  description: 'Özensan Web Sitesi Çerez (Cookie) Politikası',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              Çerez (Cookie) Politikası
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
              <p>
                <strong>Özensan</strong> olarak web sitemizi ziyaretiniz sırasında deneyiminizi geliştirmek, sitemizin düzgün çalışmasını sağlamak ve hizmetlerimizi kişiselleştirmek amacıyla çerezler (cookies) kullanmaktayız. Bu Çerez Politikası, web sitemizde hangi tür çerezlerin kullanıldığını ve bu çerezleri nasıl kontrol edebileceğinizi açıklamaktadır.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Çerez (Cookie) Nedir?</h2>
              <p>
                Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin daha verimli çalışmasını sağlamanın yanı sıra, ziyaretinizle ilgili bilgileri hatırlayarak size daha uygun ve hızlı bir deneyim sunulmasına yardımcı olur.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Hangi Tür Çerezleri Kullanıyoruz?</h2>
              <p>
                Web sitemizde kullanım amaçlarına göre farklı türde çerezler kullanılmaktadır:
              </p>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Zorunlu Çerezler</h3>
                  <p>Bu çerezler, web sitemizin temel işlevlerinin yerine getirilmesi için kesinlikle gereklidir. Örneğin, oturum açma, form doldurma ve güvenlik özelliklerinin çalışması bu çerezlere bağlıdır. Bu çerezler kapatılamaz.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Performans ve Analiz Çerezleri</h3>
                  <p>Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığını anlamamıza yardımcı olur. Ziyaret edilen sayfalar, sitede geçirilen süre ve alınan hata mesajları gibi bilgileri anonim olarak toplayarak sitemizin performansını artırmamızı sağlar. (Örn: Google Analytics)</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">İşlevsellik Çerezleri</h3>
                  <p>Bu çerezler, sitemizi tekrar ziyaret ettiğinizde tercihlerinizi (dil seçimi, bölge vb.) hatırlamamızı sağlayarak size daha kişiselleştirilmiş bir deneyim sunar.</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Çerezlerin Kullanım Amaçları</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Web sitesinin temel fonksiyonlarını gerçekleştirmek.</li>
                <li>Ziyaretçilerin site kullanım alışkanlıklarını analiz ederek performansı artırmak.</li>
                <li>Web sitesinin işlevselliğini artırmak ve kullanım kolaylığı sağlamak.</li>
                <li>Güvenlik süreçlerini iyileştirmek.</li>
              </ul>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p>
                Tarayıcılarınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çoğu web tarayıcısı, çerezleri otomatik olarak kabul edecek şekilde ayarlanmıştır, ancak bu ayarları değiştirerek çerezleri reddedebilir veya bir çerez gönderildiğinde uyarı alabilirsiniz.
              </p>
              <p>
                Çerezleri devre dışı bırakmanız halinde, web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini veya kullanıcı deneyiminizin olumsuz etkilenebileceğini lütfen unutmayınız.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. İletişim</h2>
              <p>
                Çerez Politikamız ile ilgili tüm soru ve görüşleriniz için iletişim sayfamız üzerinden veya info@ozensanas.com e-posta adresi aracılığıyla bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
