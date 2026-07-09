import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import "../globals.css";
import Footer from "@/components/global/Footer";
import CookieConsent from "@/components/global/CookieConsent";
import { ToastProvider } from "@/components/ui/ToastContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import LanguageSwitcher from "@/components/global/LanguageSwitcher";
import MobileMenu from "@/components/global/MobileMenu";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ozensanas.com'),
  title: "Özensan Sanayi Makine ve Malzemeleri A.Ş. | Resmi Distribütör",
  description: "Cedima, DUSS, Ticab, Victor ve GCE markalarının Türkiye resmi distribütörü. Ağır sanayi, yol yapım ve profesyonel delme süreçlerinize kesintisiz mühendislik ve yedek parça çözümleri sunuyoruz.",
  icons: {
    icon: "/faviconseffaf.webp",
  },
  robots: {
    index: false, // Intentionally kept false for subdomain development phase
    follow: false,
  },
};

import OrganizationSchema from "@/components/seo/OrganizationSchema";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({locale, namespace: "Navigation"});

  return (
    <html lang={locale} className={`${inter.className} h-full antialiased scroll-smooth`}>
      {/* Genel site zemini: Yapısal Açık Gri (#F8F9FA), Tipografi: Endüstriyel Antrasit (#1A1E24) */}
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-[#1A1E24]">
        <OrganizationSchema />
        <NextIntlClientProvider messages={messages}>
        {/* TOP CONTACT BAR */}
        <div className="hidden lg:flex w-full bg-[#1A1E24] text-[#8A95A5] py-2.5 text-xs font-medium tracking-wide border-b border-[#8A95A5]/20">
          <div className="container mx-auto px-8 flex justify-between items-center">
            <div className="flex gap-8">
              <span className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#C61A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +90 312 385 23 45
              </span>
              <span className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <svg className="w-3.5 h-3.5 text-[#C61A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                info@ozensanas.com
              </span>
            </div>
            <div className="flex gap-8 items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#8A95A5]/20 shadow-sm">
          <div className="container mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group z-50 relative">
              <div className="relative h-16 w-64 sm:h-20 sm:w-80 transition-transform group-hover:scale-[1.02]">
                <Image 
                  src="/logoseffaf.webp" 
                  alt="Özensan Logo" 
                  fill 
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10 text-[15px] font-bold text-[#1A1E24] tracking-tight">
              
              {/* Path A: Uygulama Alanları */}
              <div className="group relative py-9 cursor-pointer">
                <Link href="/urunler" className="flex items-center gap-1.5 hover:text-[#C61A1A] transition-colors">
                  {t("solutions")}
                  <svg className="w-4 h-4 text-[#8A95A5] group-hover:text-[#C61A1A] transition-colors group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-[#8A95A5]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 rounded-b-xl overflow-hidden">
                  <div className="p-3 flex flex-col gap-1">
                    <Link href={{ pathname: '/cozumler/[slug]', params: { slug: locale === 'en' ? 'road-construction-and-maintenance' : 'yol-yapim-ve-bakim' } }} className="px-5 py-3.5 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-semibold flex items-center justify-between group/link">
                      {t("solution_road")}
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                    <Link href={{ pathname: '/cozumler/[slug]', params: { slug: locale === 'en' ? 'heavy-industry-and-metalworking' : 'agir-sanayi-ve-metal' } }} className="px-5 py-3.5 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-semibold flex items-center justify-between group/link">
                      {t("solution_heavy")}
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                    <Link href={{ pathname: '/cozumler/[slug]', params: { slug: locale === 'en' ? 'professional-drilling-and-demolition' : 'profesyonel-delme-yikim' } }} className="px-5 py-3.5 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-semibold flex items-center justify-between group/link">
                      {t("solution_drilling")}
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Path B: {t("brands")} */}
              <div className="group relative py-9 cursor-pointer">
                <Link href="/markalar" className="flex items-center gap-1.5 hover:text-[#C61A1A] transition-colors">
                  {t("brands")}
                  <svg className="w-4 h-4 text-[#8A95A5] group-hover:text-[#C61A1A] transition-colors group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white border border-[#8A95A5]/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 rounded-b-xl overflow-hidden">
                  <div className="p-3 flex flex-col gap-1">
                    <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'cedima' } }} className="px-5 py-3 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-bold tracking-wide">CEDIMA</Link>
                    <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'duss' } }} className="px-5 py-3 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-bold tracking-wide">DUSS</Link>
                    <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'ticab' } }} className="px-5 py-3 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-bold tracking-wide">TICAB</Link>
                    <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'victor' } }} className="px-5 py-3 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-bold tracking-wide">VICTOR</Link>
                    <Link href={{ pathname: '/markalar/[slug]', params: { slug: 'gce' } }} className="px-5 py-3 hover:bg-[#F8F9FA] hover:text-[#C61A1A] rounded-lg transition-all font-bold tracking-wide">GCE</Link>
                  </div>
                </div>
              </div>

              
              <Link href="/kurumsal" className="hover:text-[#C61A1A] transition-colors">{t("corporate")}</Link>

              <Link href="/iletisim" className="hover:text-[#C61A1A] transition-colors">{t("contact")}</Link>
            </nav>

            {/* CTAs and Mobile Menu */}
            <div className="flex items-center gap-3 sm:gap-5 z-50 relative">
              <div className="hidden lg:block">
                <Link href="/teklif-al" className="bg-[#C61A1A] hover:bg-[#a51515] text-white px-8 py-3.5 rounded text-sm font-bold transition-all shadow-[0_8px_20px_rgba(198,26,26,0.25)] hover:shadow-[0_8px_25px_rgba(198,26,26,0.4)] hover:-translate-y-0.5 flex items-center gap-2">
                  {t("getQuote")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
              <div className="lg:hidden flex items-center gap-3">
                <LanguageSwitcher />
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <ToastProvider>
          <main className="flex-grow flex flex-col">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
          
          {/* Global Cookie Consent Popup */}
          <CookieConsent />
        </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
