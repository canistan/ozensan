"use client";

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Global');

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-2xl w-full text-center bg-white p-12 rounded-2xl border border-neutral-200 shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C61A1A] via-[#1A1E24] to-[#C61A1A]"></div>
        
        <div className="w-24 h-24 mx-auto mb-8 bg-red-50 rounded-full flex items-center justify-center text-[#C61A1A]">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1E24] mb-6 tracking-tight">
          Oops! Beklenmedik Bir Hata Oluştu.
        </h1>
        
        <p className="text-[#8A95A5] text-lg mb-10 max-w-xl mx-auto">
          Sunucu kaynaklı geçici bir sorunla karşılaştık. Ekibimiz bu durum hakkında bilgilendirildi. Lütfen sayfayı yenilemeyi deneyin veya anasayfaya dönün.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#1A1E24] hover:bg-black text-white px-8 py-4 rounded font-bold uppercase tracking-widest transition-all shadow-md hover:-translate-y-0.5"
          >
            Tekrar Dene
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#C61A1A] hover:bg-[#9D1414] text-white px-8 py-4 rounded font-bold uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(198,26,26,0.2)] hover:-translate-y-0.5"
          >
            {t('home') || 'Anasayfa'}
          </Link>
        </div>
      </div>
    </div>
  );
}
