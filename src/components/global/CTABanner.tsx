"use client";

import React from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CTABanner() {
  const t = useTranslations("CTA");

  return (
    <section className="bg-[#1A1E24] py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
             backgroundSize: '150px'
           }}>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-[#8A95A5] text-lg md:text-xl mb-10 max-w-2xl font-medium">
            {t("desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link 
              href="/teklif-al" 
              className="bg-[#C61A1A] hover:bg-[#a51515] text-white text-base font-bold px-10 py-5 rounded transition-all shadow-[0_8px_20px_rgba(198,26,26,0.25)] hover:shadow-[0_8px_25px_rgba(198,26,26,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {t("btnQuote")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/iletisim" 
              className="bg-transparent border-2 border-[#8A95A5] text-[#8A95A5] hover:bg-[#8A95A5] hover:text-[#1A1E24] text-base font-bold px-10 py-5 rounded transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {t("btnContact")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
