import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from "@/i18n/routing";
import FAQAccordion from "@/components/ui/FAQAccordion";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: 'Kurumsal | Özensan',
  description: 'Özensan Sanayi Makine ve Malzemeleri A.Ş. hakkında, vizyonumuz, misyonumuz ve tarihimiz.',
};

export default function CorporatePage() {
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
              Endüstrinin <span className="text-[#C61A1A]">Güçlü</span> Yüzü.
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] font-medium leading-relaxed max-w-2xl">
              Yarım asrı aşan tecrübemizle, ağır sanayi ve altyapı projelerinizde dünyanın en güçlü markalarının güvencesini sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full">
                HAKKIMIZDA
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
                Geleceği İnşa Eden Projelerin Görünmez Gücü
              </h2>
              <div className="space-y-6 text-[#1A1E24]/70 text-lg leading-relaxed">
                <p>
                  1970'li yıllarda başlayan serüvenimiz, bugün Türkiye'nin ve bölgenin en büyük endüstriyel çözüm ortaklarından biri olmamızla devam ediyor. Özensan olarak, başından beri kalite ve güvenilirlikten asla ödün vermedik.
                </p>
                <p>
                  Cedima, DUSS, Ticab, Victor ve GCE gibi alanında dünya lideri markaların Türkiye resmi distribütörü olarak, sektördeki en ileri teknolojileri yerel projelerle buluşturuyoruz. Sadece ürün tedariği değil, aynı zamanda satış sonrası mühendislik ve yedek parça hizmetleriyle de 360 derece çözümler üretiyoruz.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                <div>
                  <div className="text-4xl font-black text-[#C61A1A] mb-2">50+</div>
                  <div className="text-sm font-bold text-[#1A1E24] tracking-wide uppercase">Yıllık Tecrübe</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#C61A1A] mb-2">10K+</div>
                  <div className="text-sm font-bold text-[#1A1E24] tracking-wide uppercase">Tamamlanan Proje</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#C61A1A] translate-x-4 translate-y-4 rounded-xl opacity-20"></div>
              <div className="relative bg-[#1A1E24] p-1 rounded-xl h-full min-h-[400px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                {/* Placeholder for an actual company/industrial image */}
                <div className="w-full h-full bg-neutral-800 absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-500 font-medium">Endüstriyel Görsel Alanı</span>
                </div>
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="text-white font-bold text-xl tracking-wide">Yenilikçi Çözümler</div>
                  <div className="text-[#8A95A5] text-sm mt-1">Sürekli gelişen teknoloji altyapısı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yönetimimiz Section */}
      <section className="py-20 md:py-32 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full mb-6">
              YÖNETİMİMİZ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
              Gücümüzü Tecrübeden Alıyoruz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Engin Çelik */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-neutral-200 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-2">Engin Çelik</h3>
              <p className="text-[#C61A1A] font-medium tracking-wide uppercase text-sm mb-4">Onursal Yönetim Kurulu Başkanı</p>
              <p className="text-[#8A95A5] leading-relaxed max-w-sm">
                Özensan'ın temellerini atarak vizyonuyla yarım asırlık bu endüstriyel devin doğmasını sağlayan kurucumuz.
              </p>
            </div>

            {/* Pelin Çelik */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 bg-neutral-200 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-2">Pelin Çelik</h3>
              <p className="text-[#C61A1A] font-medium tracking-wide uppercase text-sm mb-4">Yönetim Kurulu Başkanı</p>
              <p className="text-[#8A95A5] leading-relaxed max-w-sm">
                Yenilikçi yönetim anlayışı ve global vizyonuyla Özensan'ı geleceğe taşıyan, modern dönüşümün lideri.
              </p>
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
              <h3 className="text-2xl font-bold text-[#1A1E24] mb-4">Misyonumuz</h3>
              <p className="text-[#1A1E24]/70 leading-relaxed text-lg">
                Müşterilerimizin operasyonel verimliliklerini en üst seviyeye çıkarmak için dünya standartlarında sanayi makine ve malzemelerini, kusursuz bir servis anlayışıyla sunmak. Sürdürülebilirlik, iş güvenliği ve inovasyonu tüm iş süreçlerimizin merkezinde tutarak değer yaratmak.
              </p>
            </div>

            {/* Vizyon */}
            <div className="bg-[#1A1E24] p-10 md:p-14 rounded-2xl shadow-xl text-white">
              <div className="w-16 h-16 bg-white/10 text-white rounded-xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
              <p className="text-[#8A95A5] leading-relaxed text-lg">
                Sürekli değişen endüstriyel dinamiklere yön veren, Türkiye'de ve global pazarda güvenilirliği ve yenilikçi çözümleri ile akla ilk gelen endüstriyel teknoloji sağlayıcısı olmak. Teknoloji ile insan potansiyelini birleştirerek sektöre liderlik etmek.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 md:py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#C61A1A]/10 text-[#C61A1A] font-bold tracking-wider text-sm rounded-full mb-6">
            KÜLTÜRÜMÜZ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight mb-16">
            Temel Değerlerimiz
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Kalite Odaklılık',
                desc: 'Sunduğumuz her üründe ve hizmette, tavizsiz bir kalite anlayışıyla hareket ederiz.'
              },
              {
                title: 'Güvenilirlik',
                desc: 'Verdiğimiz sözleri tutar, iş ortaklarımızla şeffaf ve dürüst ilişkiler kurarız.'
              },
              {
                title: 'İnovasyon',
                desc: 'Endüstrideki teknolojik gelişmeleri yakından takip eder ve müşterilerimize uyarlarız.'
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
              BİLGİ MERKEZİ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] tracking-tight">
              Sıkça Sorulan Sorular
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <FAQSchema />
    </div>
  );
}
