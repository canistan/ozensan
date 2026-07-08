"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  // We can safely guess the locale from the pathname for the fallback not-found
  const isEn = pathname.startsWith('/en');
  
  return (
    <div className="bg-[#F8F9FA] min-h-[80vh] flex flex-col items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Animated 404 text */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black text-[#1A1E24] leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          {/* Decorative gear/industrial element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-[spin_30s_linear_infinite] opacity-5 pointer-events-none z-[-1]">
            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 85 C30.7 85 15 69.3 15 50 C15 30.7 30.7 15 50 15 C69.3 15 85 30.7 85 50 C85 69.3 69.3 85 50 85 Z"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(0 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(45 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(90 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(135 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(180 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(225 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(270 50 50)"/>
              <path d="M45 5 H55 V20 H45 Z" transform="rotate(315 50 50)"/>
            </svg>
          </div>
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
