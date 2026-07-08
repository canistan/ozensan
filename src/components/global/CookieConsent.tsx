"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
          setIsVisible(true);
        }
      } catch (e) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(checkConsent, 1000);

    const handleOpenConsent = () => setIsVisible(true);
    window.addEventListener('openCookieConsent', handleOpenConsent);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('openCookieConsent', handleOpenConsent);
    };
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch(e) {}
    setIsVisible(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem("cookieConsent", "declined");
    } catch(e) {}
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-full duration-700 ease-out">
      
      {/* Decorative Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C61A1A] to-[#1A1E24]"></div>
      
      <div className="container mx-auto px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Text and Icon */}
        <div className="flex items-center gap-5 flex-1">
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#C61A1A]/10 hidden sm:flex items-center justify-center text-[#C61A1A]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center justify-between lg:justify-start gap-4 mb-1">
              <h3 className="text-[#1A1E24] font-black tracking-tight text-base">{t("title")}</h3>
              {/* Mobile Close Button */}
              <button onClick={declineCookies} className="lg:hidden text-[#8A95A5] hover:text-[#C61A1A] p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <p className="text-[#5A6575] text-[13px] leading-relaxed font-medium">
              {t.rich("text", {
                link: (chunks) => <Link href="/cerez-politikasi" className="text-[#C61A1A] font-bold hover:underline decoration-2 underline-offset-2">{chunks}</Link>
              })}
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
          <button 
            onClick={declineCookies}
            className="flex-1 lg:flex-none whitespace-nowrap bg-transparent border-2 border-[#E5E7EB] text-[#5A6575] hover:border-[#8A95A5] hover:text-[#1A1E24] px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
          >
            {t("decline")}
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 lg:flex-none whitespace-nowrap bg-[#1A1E24] hover:bg-[#C61A1A] text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md transform hover:-translate-y-0.5"
          >
            {t("accept")}
          </button>
          
          {/* Desktop Close Button */}
          <button onClick={declineCookies} className="hidden lg:flex text-[#8A95A5] hover:text-[#C61A1A] transition-colors p-2 ml-2 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
      </div>
    </div>
  );
}
