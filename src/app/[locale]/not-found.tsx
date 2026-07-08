"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  // We can safely guess the locale from the pathname for the fallback not-found
  const isEn = pathname.startsWith('/en');
  
  return (
    <div className="bg-[#F8F9FA] flex-grow flex flex-col items-center justify-center py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Animated 404 text */}
        <div className="relative inline-block mb-6 md:mb-8">
          <h1 className="text-[100px] md:text-[180px] font-black text-[#1A1E24] leading-none tracking-tighter select-none drop-shadow-sm">
            404
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1E24] mb-4">
          {isEn ? "Page Not Found" : "Sayfa Bulunamadı"}
        </h2>
        
        <p className="text-lg text-[#8A95A5] mb-10 max-w-xl mx-auto leading-relaxed">
          {isEn 
            ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            : "Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir."
          }
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto bg-[#C61A1A] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#9D1414] transition-all hover:shadow-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {isEn ? "Back to Home" : "Anasayfaya Dön"}
          </Link>
          <Link 
            href="/urunler" 
            className="w-full sm:w-auto bg-white text-[#1A1E24] border border-neutral-200 font-bold py-4 px-8 rounded-lg hover:bg-[#F8F9FA] transition-all flex items-center justify-center"
          >
            {isEn ? "View Products" : "Ürünleri İncele"}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
