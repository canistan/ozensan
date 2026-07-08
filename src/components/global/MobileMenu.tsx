"use client";

import React, { useState } from 'react';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigation");

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden flex items-center">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="p-2 text-[#1A1E24] hover:text-[#C61A1A] transition-colors focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 overflow-y-auto min-h-screen">
          <nav className="flex flex-col gap-6 text-xl font-bold text-[#1A1E24]">
            <Link href="/" onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors">{t("home") || "Anasayfa"}</Link>
            
            {/* Solutions */}
            <div className="flex flex-col gap-3">
              <span className="text-[#8A95A5] uppercase text-sm tracking-widest">{t("solutions")}</span>
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#C61A1A]/20">
                <Link href={{ pathname: '/cozumler/[slug]', params: { slug: 'asfalt-beton' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("asphalt")}</Link>
                <Link href={{ pathname: '/cozumler/[slug]', params: { slug: 'yol-yapim' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("road")}</Link>
                <Link href={{ pathname: '/cozumler/[slug]', params: { slug: 'delme-karot' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("drilling")}</Link>
                <Link href={{ pathname: '/cozumler/[slug]', params: { slug: 'gaz-kontrol' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("gas")}</Link>
              </div>
            </div>

            {/* Brands */}
            <div className="flex flex-col gap-3">
              <span className="text-[#8A95A5] uppercase text-sm tracking-widest">{t("brands")}</span>
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#C61A1A]/20">
                <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'cedima' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">CEDIMA</Link>
                <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'duss' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">DUSS</Link>
                <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'ticab' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">TICAB</Link>
                <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'victor' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">VICTOR</Link>
                <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'gce' } }} onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">GCE</Link>
              </div>
            </div>

            {/* Corporate */}
            <div className="flex flex-col gap-3">
              <span className="text-[#8A95A5] uppercase text-sm tracking-widest">{t("corporate")}</span>
              <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#C61A1A]/20">
                <Link href="/kurumsal/yonetim" onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("management")}</Link>
                <Link href="/hakkimizda" onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors text-lg">{t("about")}</Link>
              </div>
            </div>

            <Link href="/iletisim" onClick={closeMenu} className="hover:text-[#C61A1A] transition-colors">{t("contact")}</Link>

            <Link href="/teklif-al" onClick={closeMenu} className="bg-[#C61A1A] text-white text-center py-4 rounded-lg mt-4 hover:bg-[#a51515] transition-colors">
              {t("getQuote")}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
