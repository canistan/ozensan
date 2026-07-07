import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import solutionsData from '@/data/solutions.json';

export const metadata: Metadata = {
  title: 'Çözümlerimiz & Uygulama Alanları | Özensan',
  description: 'Yol yapım, ağır sanayi ve profesyonel delme/yıkım sektörlerine yönelik uzman endüstriyel çözümlerimiz.',
};

export default function SolutionsPage() {
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
              Sektörünüze Özel <span className="text-[#C61A1A]">Çözümler</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              Farklı endüstrilerin zorlu taleplerini karşılayan, yüksek verimlilik ve iş güvenliği sağlayan entegre mühendislik çözümleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutionsData.map((solution) => (
              <Link 
                href={`/cozumler/${solution.slug}`} 
                key={solution.slug} 
                className="group flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Area */}
                <div className="h-64 w-full relative overflow-hidden bg-neutral-900">
                  <img 
                    src={solution.image} 
                    alt={solution.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Title overlay */}
                  <h2 className="absolute bottom-6 left-6 text-2xl font-black text-white group-hover:text-[#C61A1A] transition-colors">
                    {solution.name}
                  </h2>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-[#8A95A5] text-sm leading-relaxed mb-8 flex-grow">
                    {solution.description}
                  </p>
                  
                  <div className="flex items-center text-[#C61A1A] font-bold text-sm tracking-widest uppercase mt-auto">
                    Çözümleri İncele
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
