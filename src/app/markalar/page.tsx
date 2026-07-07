import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import brandsData from '@/data/brands.json';

export const metadata: Metadata = {
  title: 'Markalarımız | Özensan',
  description: 'Özensan\'ın Türkiye tek yetkili distribütörü olduğu, dünyanın önde gelen endüstriyel makine ve ekipman üreticileri.',
};

export default function BrandsPage() {
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
              Temsil Ettiğimiz <span className="text-[#C61A1A]">Global Devler</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              Endüstri standartlarını belirleyen, teknoloji ve dayanıklılıkta öncü uluslararası markaların Türkiye'deki yetkili mühendislik ve tedarik noktasıyız.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandsData.map((brand) => (
              <Link 
                href={`/markalar/${brand.slug}`} 
                key={brand.slug} 
                className="group flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cover Image Area */}
                <div className="h-48 w-full relative overflow-hidden bg-neutral-900">
                  <img 
                    src={brand.coverImage} 
                    alt={brand.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                  />
                  {/* Floating Logo */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} Logo`} 
                      className="max-h-full max-w-full object-contain filter brightness-0 invert drop-shadow-md"
                    />
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-black text-[#1A1E24] mb-4 group-hover:text-[#C61A1A] transition-colors">{brand.name}</h2>
                  <p className="text-[#8A95A5] text-sm leading-relaxed mb-8 flex-grow">
                    {brand.description}
                  </p>
                  
                  <div className="flex items-center text-[#C61A1A] font-bold text-sm tracking-widest uppercase mt-auto">
                    Markayı İncele
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
