"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or rejected cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing the popup slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    // Here you would initialize Google Analytics
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-8 md:right-auto md:max-w-md bg-white border border-[#8A95A5]/20 shadow-2xl p-6 z-50 rounded-sm">
      <div className="flex items-start gap-4">
        <div className="bg-[#F8F9FA] p-3 rounded-full hidden sm:block">
          <svg className="w-6 h-6 text-[#1A1E24]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <div>
          <h3 className="text-[#1A1E24] font-black tracking-tight text-lg mb-2">Gizliliğinize Önem Veriyoruz</h3>
          <p className="text-[#8A95A5] text-sm leading-relaxed mb-4">
            Size en iyi web deneyimini sunabilmek ve site trafiğimizi analiz etmek (Google Analytics) için çerezleri kullanıyoruz. Daha fazla bilgi için <Link href="/cerez-politikasi" className="text-[#C61A1A] underline font-medium">Çerez Politikamızı</Link> inceleyebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={acceptCookies}
              className="bg-[#1A1E24] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#C61A1A] transition-colors w-full sm:w-auto"
            >
              Tümünü Kabul Et
            </button>
            <button 
              onClick={declineCookies}
              className="bg-transparent border border-[#8A95A5]/50 text-[#8A95A5] px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#F8F9FA] hover:text-[#1A1E24] transition-colors w-full sm:w-auto"
            >
              Reddet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
