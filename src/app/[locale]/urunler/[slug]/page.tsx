import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from "@/i18n/routing";
import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';

import { generateSEOMetadata } from '@/utils/seo';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const product = productsData.find((p) => p.slug === slug);
  
  if (!product) {
    return { title: locale === 'en' ? 'Product Not Found | Özensan' : 'Ürün Bulunamadı | Özensan' };
  }

  const isEn = locale === 'en';
  const name = isEn && (product as any).nameEn ? (product as any).nameEn : product.name;
  const description = isEn && (product as any).descriptionEn ? (product as any).descriptionEn : product.description;

  return generateSEOMetadata({
    title: `${name} - ${product.brand.toUpperCase()} | Özensan`,
    description: description,
    locale,
    pathnameTr: `/urunler/${slug}`,
    pathnameEn: `/products/${slug}`,
    image: product.image,
  });
}



import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const locale = (resolvedParams as any).locale;
  const t = await getTranslations({locale, namespace: "Product"});
  const tn = await getTranslations({locale, namespace: "Navigation"});
  const product = productsData.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const brandInfo = brandsData.find(b => b.slug.toLowerCase() === product.brand.toLowerCase());

  const isEn = locale === 'en';
  const productName = isEn && (product as any).nameEn ? (product as any).nameEn : product.name;
  const productDesc = isEn && (product as any).descriptionEn ? (product as any).descriptionEn : product.description;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": product.image.startsWith('http') ? product.image : `https://www.ozensanas.com${product.image}`,
    "description": productDesc,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.ozensanas.com/${locale}/urunler/${product.slug}`,
      "priceCurrency": "TRY",
      "price": "0.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Özensan Sanayi Makine ve Malzemeleri A.Ş."
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb items={[
            { label: tn("products"), href: "/urunler" },
            { label: product.brand, href: `/markalar/${brandInfo?.slug || product.brand.toLowerCase()}` },
            { label: product.name }
          ]} />
          
          <Link href={`/markalar/${brandInfo?.slug || product.brand.toLowerCase()}` as any} className="hidden sm:flex items-center text-sm font-bold text-[#8A95A5] hover:text-[#C61A1A] transition-colors uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            {locale === "en" ? `BACK TO ${product.brand.toUpperCase()}` : `${product.brand.toUpperCase()} ÜRÜNLERİNE DÖN`}
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm flex flex-col lg:flex-row">
          
          {/* Product Image Area */}
          <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-100 relative">
            <div className="absolute top-8 left-8">
              {brandInfo?.logo ? (
                <img src={brandInfo.logo} alt={brandInfo.name} className="h-8 object-contain opacity-50" />
              ) : (
                <span className="font-black text-[#1A1E24] opacity-50 uppercase tracking-widest">{product.brand}</span>
              )}
            </div>
            <img 
              src={product.image} 
              alt={locale === "en" && product.nameEn ? product.nameEn : product.name} 
              className="w-full max-w-md h-auto object-contain hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Product Details Area */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#1A1E24] text-white text-[10px] font-black uppercase tracking-widest rounded-sm mb-4">
                {product.brand}
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-[#1A1E24] tracking-tight leading-tight mb-6">
                {locale === "en" && (product as any).nameEn ? (product as any).nameEn : product.name}
              </h1>
              {/* Description */}
              {(locale === "en" ? (product as any).descriptionEn : product.description) && (
                <div className="prose prose-lg prose-neutral max-w-none text-[#8A95A5]">
                  <p className="leading-relaxed">
                    {locale === "en" ? (product as any).descriptionEn : product.description}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features */}
            {((locale === "en" ? (product as any).featuresEn : product.features) || product.features) && ((locale === "en" ? (product as any).featuresEn : product.features) || product.features).length > 0 && (
              <div className="mt-8 mb-8">
                <h3 className="text-sm font-bold text-[#1A1E24] uppercase tracking-widest mb-4">{t("features")}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {((locale === "en" ? (product as any).featuresEn : product.features) || product.features).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-[#8A95A5] text-sm">
                      <svg className="w-5 h-5 text-[#C61A1A] mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto pt-8 border-t border-neutral-100 flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/teklif-al?product=${product.name}` as any} 
                className="bg-[#C61A1A] hover:bg-[#9D1414] text-white text-sm font-black px-8 py-4 uppercase tracking-widest rounded-sm transition-all shadow-[0_10px_30px_rgba(198,26,26,0.2)] hover:-translate-y-1 flex items-center justify-center flex-1 text-center"
              >
                {t("getQuote")}
              </Link>
              <Link 
                href={`/markalar/${product.brand.toLowerCase()}` as any} 
                className="bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-neutral-200 text-[#1A1E24] text-sm font-black px-8 py-4 uppercase tracking-widest rounded-sm transition-all flex items-center justify-center"
              >
                {t("viewBrand")}
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Data Table and Videos Section */}
        {((product.technicalData?.length ?? 0) > 0 || ((product as any).videos?.length ?? 0) > 0) && (
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Technical Data Table */}
            {((locale === "en" ? (product as any).technicalDataEn : product.technicalData) || product.technicalData) && ((locale === "en" ? (product as any).technicalDataEn : product.technicalData) || product.technicalData).length > 0 && (
              <div className={`lg:col-span-${(product as any).videos && (product as any).videos.length > 0 ? '2' : '3'}`}>
                <h2 className="text-2xl font-black text-[#1A1E24] mb-8">
                  {product.brand.toLowerCase() === 'victor' 
                    ? (locale === 'en' ? 'Industries / Applications' : 'Endüstriler / Kullanım Alanları') 
                    : t("techSpecs")}
                </h2>
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-neutral-200">
                        <th className="py-4 px-6 font-bold text-[#1A1E24] text-sm uppercase tracking-wider">
                          {product.brand.toLowerCase() === 'victor' 
                            ? (locale === 'en' ? 'Industry / Application' : 'Kullanım Alanı') 
                            : (t("parameter") || 'Parametre')}
                        </th>
                        <th className="py-4 px-6 font-bold text-[#1A1E24] text-sm uppercase tracking-wider">{t("value") || 'Değer'}</th>

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {((locale === "en" ? (product as any).technicalDataEn : product.technicalData) || product.technicalData).map((data: any, idx: number) => (
                        <tr key={idx} className="hover:bg-[#F8F9FA]/50 transition-colors">
                          <td className="py-4 px-6 text-[#8A95A5] font-medium">{data.param}</td>
                          <td className="py-4 px-6 text-[#1A1E24] font-bold">{data.value}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Videos Gallery */}
            {(product as any).videos && (product as any).videos.length > 0 && (
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-black text-[#1A1E24] mb-8">{t("videos")}</h2>
                <div className="flex flex-col gap-6">
                  {(product as any).videos.map((vid: string, idx: number) => (
                    <div key={idx} className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-100 bg-neutral-900">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={vid} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}

      </div>
    </div>
  </>
);
}
