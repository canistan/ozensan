import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from "@/i18n/routing";
import brandsData from '@/data/brands.json';
import productsData from '@/data/products.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = brandsData.find((b) => b.slug === resolvedParams.slug);
  
  if (!brand) {
    return { title: 'Marka Bulunamadı | Özensan' };
  }

  return {
    title: `${brand.name} Ürünleri ve Çözümleri | Özensan`,
    description: brand.description,
  };
}

// Generate static params for fast rendering
export async function generateStaticParams() {
  return brandsData.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const brand = brandsData.find((b) => b.slug === resolvedParams.slug);

  if (!brand) {
    notFound();
  }

  // Get products for this brand
  const brandProducts = productsData.filter((p) => p.brand.toLowerCase() === brand.slug.toLowerCase());

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Brand Hero / About Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-[#1A1E24] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={brand.coverImage} 
            alt={brand.name} 
            className="absolute inset-0 w-full h-full object-cover object-right opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-[#1A1E24]/90 to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <Link href="/markalar" className="inline-flex items-center text-[#8A95A5] hover:text-[#C61A1A] font-bold uppercase tracking-widest text-xs mb-8 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              TÜM MARKALAR
            </Link>
            
            <div className="h-24 min-w-[200px] max-w-[280px] bg-white rounded-xl px-4 py-2 flex items-center justify-center mb-8 shadow-2xl">
              <img 
                src={brand.logo} 
                alt={`${brand.name} Logo`} 
                className="h-full w-full object-contain scale-110"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              {brand.name} <span className="text-[#8A95A5]">Mühendisliği</span>
            </h1>
            <p className="text-[#8A95A5] text-lg leading-relaxed mb-8">
              {brand.description}
            </p>
          </div>
        </div>
      </section>

      {/* Brand Products Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-neutral-200 pb-6">
            <div>
              <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm block mb-2">{brand.name}</span>
              <h2 className="text-3xl font-black text-[#1A1E24] tracking-tight">Tüm Ürünler</h2>
            </div>
            <div className="text-[#8A95A5] font-medium">
              Toplam {brandProducts.length} ürün bulundu
            </div>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandProducts.map((prod) => (
                <Link href={`/urunler/${prod.slug}`} key={prod.slug} className="bg-white rounded-xl border border-neutral-200 overflow-hidden group hover:shadow-xl hover:border-[#C61A1A]/30 transition-all duration-300 flex flex-col">
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-white p-8">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow bg-[#F8F9FA] border-t border-neutral-100 group-hover:bg-white transition-colors">
                    <h3 className="text-xl font-black text-[#1A1E24] group-hover:text-[#C61A1A] transition-colors mb-3 line-clamp-2">{prod.name}</h3>
                    <p className="text-sm text-[#8A95A5] line-clamp-2 mb-6">{prod.description}</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-[#1A1E24] font-bold uppercase tracking-widest text-xs group-hover:text-[#C61A1A] transition-colors">
                      İncele ve Teklif Al
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <h3 className="text-xl font-bold text-[#1A1E24] mb-2">Ürün Bulunamadı</h3>
              <p className="text-[#8A95A5]">Bu markaya ait henüz ürün eklenmemiştir.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
