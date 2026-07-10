import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import WorldMap from "@/components/home/WorldMap";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "HomeSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/',
    pathnameEn: '/',
  });
}

export default function Home() {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Countries");
  const locale = useLocale();
  const pillars = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: t("Pillars.p1_title"),
      desc: t("Pillars.p1_desc"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t("Pillars.p2_title"),
      desc: t("Pillars.p2_desc"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t("Pillars.p3_title"),
      desc: t("Pillars.p3_desc"),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("Pillars.p4_title"),
      desc: t("Pillars.p4_desc"),
    }
  ];

  // Get featured products dynamically
  const featuredProducts = productsData.filter(p => p.isFeatured).slice(0, 6);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Özensan Sanayi Makine ve Malzemeleri A.Ş.",
    "url": "https://www.ozensanas.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.ozensanas.com/urunler?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[850px] lg:h-[85vh] lg:min-h-[750px] flex items-center bg-[#1A1E24] overflow-hidden pt-32 pb-16 lg:pt-0 lg:pb-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center bg-no-repeat opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-[#1A1E24]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent z-10" />
        </div>
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#C61A1A]"></div>
              <span className="text-[#8A95A5] font-black tracking-widest uppercase text-sm">{t("Hero.badge")}</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              {t("Hero.title1")} <br />
              <span className="text-[#8A95A5]">{t("Hero.title2")}</span>
            </h1>
            <p className="text-[#8A95A5] text-xl md:text-2xl leading-relaxed max-w-2xl mb-12 font-medium">
              {t("Hero.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/urunler" className="bg-[#C61A1A] hover:bg-[#9D1414] text-white text-base font-black px-10 py-5 uppercase tracking-widest rounded-sm transition-all shadow-[0_10px_30px_rgba(198,26,26,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3">
                {t("Hero.btnProducts")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link href="/teklif-al" className="bg-transparent border-2 border-[#8A95A5] text-[#8A95A5] hover:bg-[#8A95A5] hover:text-[#1A1E24] text-base font-black px-10 py-5 uppercase tracking-widest rounded-sm transition-all flex items-center justify-center">
                {t("Hero.btnQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND TICKER (INFINITE MARQUEE) */}
      <section className="py-16 bg-white border-y border-[#8A95A5]/20 overflow-hidden relative z-30">
        <div className="container mx-auto px-4 mb-8 text-center">
          <Link href="/markalar" className="inline-flex items-center gap-2 text-sm font-bold text-[#8A95A5] hover:text-[#C61A1A] uppercase tracking-widest transition-colors">
            {t("Brands.title")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>
        
        <div className="flex w-full overflow-hidden relative group">
          {/* Fading edges for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex animate-marquee whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {/* First set of logos */}
            {brandsData.map((brand, idx) => (
              <Link href={{ pathname: "/markalar/[slug]", "params": { "slug": brand.slug } }} key={`brand-1-${brand.slug}`} className="mx-12 md:mx-16 flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 w-28 md:w-40 flex flex-col items-center justify-center gap-3 group/brand">
                <div className="w-full h-10 md:h-14 relative">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" sizes="(max-width: 768px) 112px, 160px" />
                </div>
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-[#8A95A5] group-hover/brand:text-[#C61A1A] transition-colors">{brand.name}</span>
              </Link>
            ))}
            {/* Duplicate set for infinite effect */}
            {brandsData.map((brand, idx) => (
              <Link href={{ pathname: "/markalar/[slug]", "params": { "slug": brand.slug } }} key={`brand-2-${brand.slug}`} className="mx-12 md:mx-16 flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 w-28 md:w-40 flex flex-col items-center justify-center gap-3 group/brand">
                <div className="w-full h-10 md:h-14 relative">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" sizes="(max-width: 768px) 112px, 160px" />
                </div>
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-[#8A95A5] group-hover/brand:text-[#C61A1A] transition-colors">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ÖNE ÇIKAN ÜRÜNLER (FEATURED PRODUCTS) */}
      <section className="py-24 bg-[#F8F9FA] relative">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm">{t("Featured.badge")}</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1E24] tracking-tight mt-2">{t("Featured.title")}</h2>
            </div>
            <Link href="/urunler" className="text-[#1A1E24] font-black uppercase tracking-widest text-sm border-b-2 border-[#C61A1A] pb-1 hover:text-[#C61A1A] transition-colors">
              {t("Featured.viewAll")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod, idx) => (
              <Link href={{ pathname: "/urunler/[slug]", "params": { "slug": prod.slug } }} key={idx} className="bg-white rounded-sm border border-[#8A95A5]/20 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#F8F9FA] p-6">
                  {/* Using next/image for automatic WebP optimization */}
                  <Image src={prod.image} alt={locale === "en" && prod.nameEn ? prod.nameEn : prod.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute top-4 left-4 bg-[#1A1E24] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm z-10">
                    {prod.brand.toUpperCase()}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-[#1A1E24] group-hover:text-[#C61A1A] transition-colors line-clamp-2">{locale === "en" && prod.nameEn ? prod.nameEn : prod.name}</h3>
                  <p className="text-sm text-[#8A95A5] mt-3 line-clamp-2">{locale === "en" && prod.descriptionEn ? prod.descriptionEn : prod.description}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[#8A95A5] font-bold uppercase tracking-widest text-xs group-hover:text-[#C61A1A] transition-colors">
                    {t("Featured.inspect")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEĞER KARTLARI (MÜHENDİSLİKTE SIFIR TAVİZ) */}
      <section className="py-24 bg-white border-y border-[#8A95A5]/20">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mb-20">
            <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm mb-4 block">{t("Pillars.badge")}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1E24] tracking-tight leading-tight"><span dangerouslySetInnerHTML={{ __html: t("Pillars.title") }} /></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-[#F8F9FA] p-10 rounded-sm border border-[#8A95A5]/20 shadow-sm hover:shadow-xl hover:border-[#C61A1A]/30 transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center text-[#C61A1A] mb-8 group-hover:scale-110 transition-all duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-[#1A1E24] mb-4">{pillar.title}</h3>
                <p className="text-[#8A95A5] leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL İHRACAT HARİTASI */}
      <section className="py-24 bg-[#1A1E24] text-white relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm block mb-4">{t("Map.badge")}</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("Map.title")}</h2>
            <p className="text-[#8A95A5] text-lg mt-6 font-medium">
              {t("Map.desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-10" aria-label="Export Countries">
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("turkey")}>🇹🇷</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("turkey")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("iraq")}>🇮🇶</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("iraq")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("afghanistan")}>🇦🇫</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("afghanistan")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("libya")}>🇱🇾</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("libya")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("djibouti")}>🇩🇯</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("djibouti")}</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
                <span className="text-3xl" title={tc("indonesia")}>🇮🇩</span>
                <span className="text-sm font-semibold text-neutral-300">{tc("indonesia")}</span>
              </div>
            </div>
          </div>
          
          {/* React Simple Maps component */}
          <WorldMap />

        </div>
      </section>

    </>
  );
}
