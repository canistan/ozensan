"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/ToastContext";
import { subscribeNewsletter } from "@/app/actions/submitForm";
import CTABanner from "@/components/global/CTABanner";

export default function Footer() {
  const t = useTranslations("Footer");
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const openCookies = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openCookieConsent"));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast(t("emailError"), "error");
      return;
    }
    
    setLoading(true);
    const result = await subscribeNewsletter(email);
    setLoading(false);

    if (result.success) {
      addToast(t("subSuccess"), "success");
      setEmail("");
    } else {
      addToast(result.errorKey ? t(result.errorKey) : t("subError"), "error");
    }
  };

  return (
    <>
      <CTABanner />
      <footer className="bg-[#101317] text-white pt-20 pb-10 border-t-4 border-[#C61A1A]">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Newsletter */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-block bg-white p-3 px-4 rounded-md w-fit">
                <Image
                  src="/logoseffaf.webp"
                  alt="Özensan Logo"
                  width={240}
                  height={65}
                  className="h-12 w-auto"
                />
              </Link>
            <p className="text-[#8A95A5] text-sm leading-relaxed">
              {t("desc")}
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-3">{t("newsletter")}</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")} 
                  className="bg-[#2A303A] text-white px-4 py-3 rounded-l-sm focus:outline-none focus:ring-1 focus:ring-[#C61A1A] w-full text-sm"
                />
                <button type="submit" className="bg-[#C61A1A] px-6 py-3 rounded-r-sm hover:bg-[#9D1414] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </form>
              <div className="mt-2 text-right">
                <Link href="/abonelikten-cik" className="text-[#8A95A5] text-xs hover:text-[#C61A1A] transition-colors underline decoration-[#8A95A5]/30 underline-offset-4">
                  {t("unsubscribeLink")}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: {t("quickLinks")} */}
          <div>
            <h4 className="text-[#8A95A5] text-sm font-bold uppercase tracking-widest mb-6">{t("quickLinks")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/urunler" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("allProducts")}</Link></li>
              <li><Link href="/markalar" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("agencies")}</Link></li>
              <li><Link href="/cozumler" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("afterSales")}</Link></li>
              <li><Link href="/iletisim" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("contactUs")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Kurumsal & SEO */}
          <div>
            <h4 className="text-[#8A95A5] text-sm font-bold uppercase tracking-widest mb-6">{t("corporate")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/kurumsal" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("about")}</Link></li>
              <li><Link href="/vizyon-misyon" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("visionMission")}</Link></li>
              <li><Link href="/blog" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("blog")}</Link></li>
              <li><Link href="/sikca-sorulan-sorular" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("faq")}</Link></li>
              <li><Link href="/kariyer" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("career")}</Link></li>
            </ul>
          </div>

          {/* Column 4: Yasal */}
          <div>
            <h4 className="text-[#8A95A5] text-sm font-bold uppercase tracking-widest mb-6">{t("legal")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/kvkk" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("kvkk")}</Link></li>
              <li><Link href="/gizlilik-politikasi" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("privacy")}</Link></li>
              <li><Link href="/cerez-politikasi" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("cookie")}</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-[#C61A1A] transition-colors text-sm font-medium">{t("terms")}</Link></li>
              <li>
                <button onClick={openCookies} className="hover:text-[#C61A1A] transition-colors text-sm font-medium text-left">
                  {t("cookieSettings")}
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#8A95A5]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8A95A5] text-xs font-medium">
            © {new Date().getFullYear()} Özensan Sanayi Makine ve Malzemeleri A.Ş. {t("allRights")}
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <a href="https://www.instagram.com/ozensan.as/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#2A303A] flex items-center justify-center text-[#8A95A5] hover:bg-[#C61A1A] hover:text-white transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/ozensan-a-s/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-[#2A303A] flex items-center justify-center text-[#8A95A5] hover:bg-[#C61A1A] hover:text-white transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}
