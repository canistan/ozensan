import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Özensan',
  description: 'Özensan Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni',
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
              Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
            </h1>

            <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
              <p>
                <strong>Özensan</strong> ("Şirket") olarak, müşterilerimiz, tedarikçilerimiz ve web sitemizi ziyaret eden kullanıcılarımızın kişisel verilerinin Türkiye Cumhuriyeti Anayasası, insan haklarına ilişkin ülkemizin taraf olduğu uluslararası sözleşmeler ile 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") başta olmak üzere ilgili mevzuata uygun olarak işlenmesine ve korunmasına büyük önem vermekteyiz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Veri Sorumlusunun Kimliği</h2>
              <p>
                6698 sayılı KVKK uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Özensan tarafından aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işlenebilecek, kaydedilebilecek, saklanabilecek, sınıflandırılabilecek, güncellenebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere aktarılabilecektir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
              <p>
                Toplanan kişisel verileriniz, Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dâhilinde;
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Şirketimiz tarafından sunulan ürün ve hizmetlerin belirlenen yasal çerçevede sunulabilmesi,</li>
                <li>Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması,</li>
                <li>Müşteri ilişkileri yönetimi süreçlerinin yürütülmesi,</li>
                <li>Talep ve şikayetlerin takibi ile ilgililere geri dönüş sağlanması,</li>
                <li>İş ilişkisi içerisinde olduğumuz kişilerin hukuki, teknik ve ticari-iş güvenliğinin temini,</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
              </ul>
              <p>
                amaçlarıyla işlenmektedir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Kişisel Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, Şirketimizin tedarikçilerine, iş ortaklarına, kanunen yetkili kamu kurumlarına ve özel kişi veya kuruluşlara Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
              <p>
                Kişisel verileriniz, web sitemiz, iletişim formlarımız, e-posta, telefon ve fiziki ortam dahil olmak üzere çeşitli kanallar aracılığıyla toplanmaktadır. Bu veriler, Kanun'un 5. maddesinde belirtilen "sözleşmenin kurulması veya ifası", "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" ve "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması" hukuki sebeplerine dayanılarak toplanmakta ve işlenmektedir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. İlgili Kişinin Hakları</h2>
              <p>
                KVKK'nın 11. maddesi uyarınca kişisel veri sahipleri;
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
                <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                <li>KVKK ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
              </ul>
              <p>
                haklarına sahiptir. Bu haklarınızı kullanmak ile ilgili taleplerinizi yazılı olarak veya Kişisel Verileri Koruma Kurulu tarafından belirlenen diğer yöntemlerle Şirketimize iletebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
