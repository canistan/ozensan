import React from 'react';
import { Metadata } from 'next';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Teklif Al | Özensan',
  description: 'Özensan ürünleri ve çözümleri için detaylı teklif talebinde bulunun.',
};

export default function QuotePage() {
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
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Projeniz İçin <span className="text-[#C61A1A]">Hemen Teklif</span> Alın
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              İhtiyaç duyduğunuz ürün veya çözümleri bize iletin, satış ekibimiz en kısa sürede size özel fiyatlandırma ve detaylı bilgi ile dönüş yapsın.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-14 border border-neutral-100">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-2">Teklif Talep Formu</h2>
              <p className="text-[#8A95A5] mb-10">Lütfen aşağıdaki alanları eksiksiz doldurarak talebinizi bize iletin.</p>
              
              <QuoteForm />
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
