import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from "@/i18n/routing";
import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.slug === resolvedParams.slug);
  
  if (!product) {
    return { title: 'Ürün Bulunamadı | Özensan' };
  }

  return {
    title: `${product.name} - ${product.brand.toUpperCase()} | Özensan`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const brandInfo = brandsData.find(b => b.slug.toLowerCase() === product.brand.toLowerCase());

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#8A95A5] mb-8 font-medium">
          <Link href="/" className="hover:text-[#C61A1A] transition-colors">Anasayfa</Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-[#C61A1A] transition-colors">Ürünler</Link>
          <span>/</span>
          <Link href={`/markalar/${product.brand}`} className="hover:text-[#C61A1A] transition-colors uppercase">{product.brand}</Link>
          <span>/</span>
          <span className="text-[#1A1E24] truncate">{product.name}</span>
        </nav>

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
              alt={product.name} 
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
                {product.name}
              </h1>
              <p className="text-[#8A95A5] text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8 mb-8">
                <h3 className="text-sm font-bold text-[#1A1E24] uppercase tracking-widest mb-4">Öne Çıkan Özellikler</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
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
                href={`/teklif-al?product=${product.name}`} 
                className="bg-[#C61A1A] hover:bg-[#9D1414] text-white text-sm font-black px-8 py-4 uppercase tracking-widest rounded-sm transition-all shadow-[0_10px_30px_rgba(198,26,26,0.2)] hover:-translate-y-1 flex items-center justify-center flex-1 text-center"
              >
                Hemen Teklif İste
              </Link>
              <Link 
                href={`/markalar/${product.brand}`} 
                className="bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-neutral-200 text-[#1A1E24] text-sm font-black px-8 py-4 uppercase tracking-widest rounded-sm transition-all flex items-center justify-center"
              >
                Markaya Git
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Data Table */}
        {product.technicalData && product.technicalData.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-black text-[#1A1E24] mb-8">Teknik Spesifikasyonlar</h2>
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-neutral-200">
                    <th className="py-4 px-6 font-bold text-[#1A1E24] text-sm uppercase tracking-wider">Parametre</th>
                    <th className="py-4 px-6 font-bold text-[#1A1E24] text-sm uppercase tracking-wider">Değer</th>
                    <th className="py-4 px-6 font-bold text-[#1A1E24] text-sm uppercase tracking-wider">Önerilen Aksesuar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {product.technicalData.map((data, idx) => (
                    <tr key={idx} className="hover:bg-[#F8F9FA]/50 transition-colors">
                      <td className="py-4 px-6 text-[#8A95A5] font-medium">{data.param}</td>
                      <td className="py-4 px-6 text-[#1A1E24] font-bold">{data.value}</td>
                      <td className="py-4 px-6 text-[#8A95A5]">{data.accessory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
