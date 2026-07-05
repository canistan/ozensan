import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  // Mock veri - Geliştirme sonrası Payload'dan çekilecek
  const product = {
    title: "CEDIMA CF-22.1 Dizel Derz Kesme Makinesi",
    brand: "CEDIMA",
    sku: "CF-22.1-D",
    description: "Zorlu şantiye koşullarında yüksek performans gösteren, dayanıklı ve ergonomik tasarıma sahip profesyonel asfalt ve beton kesme makinesi. Özel şasi yapısı titreşimi minimize ederken, operatör yorgunluğunu en aza indirir.",
    features: [
      "Hidrostatik sürüş sistemi",
      "Elektrikli su pompası",
      "Ergonomik kullanım paneli",
      "Yüksek kesme derinliği"
    ],
    technicalData: [
      { param: "Maksimum Kesme Derinliği", value: "300 mm", accessory: "Cedima Elmas Disk Ø 800 mm" },
      { param: "Motor Gücü / Kaynak", value: "11 kW (Dizel)", accessory: "Yetkili Servis Bakım Seti" },
      { param: "İlerleme Tipi", value: "Hidrostatik Otomatik İlerleme", accessory: "Yedek Parça Kodu: HYD-P5000" },
      { param: "Su Tankı Kapasitesi", value: "35 Litre", accessory: "Harici Su Pompası Uyumu" },
      { param: "Ağırlık", value: "340 kg", accessory: "-" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-32">
      <div className="container mx-auto px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#8A95A5] uppercase tracking-widest mb-12">
          <Link href="/" className="hover:text-[#C61A1A] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-[#C61A1A] transition-colors">Ürünler</Link>
          <span>/</span>
          <span className="text-[#1A1E24]">{product.brand}</span>
          <span>/</span>
          <span className="text-[#C61A1A]">{product.sku}</span>
        </div>

        {/* Hero Section: Left Gallery, Right Summary */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Left Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-white rounded-sm border border-[#8A95A5]/20 aspect-[4/3] w-full flex items-center justify-center overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1581092334245-d419bd3e1cd2?q=80&w=1200&auto=format&fit=crop" 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#C61A1A] text-white text-xs font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                Stokta Var
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-sm border border-[#8A95A5]/20 aspect-square flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#C61A1A] transition-colors">
                   <img 
                    src={`https://images.unsplash.com/photo-1581092334245-d419bd3e1cd2?q=80&w=300&auto=format&fit=crop`} 
                    alt={`Thumbnail ${i}`} 
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-sm font-bold text-[#8A95A5] uppercase tracking-widest">{product.brand} • {product.sku}</span>
              <h1 className="text-4xl lg:text-5xl font-black text-[#1A1E24] mt-2 tracking-tight leading-tight">{product.title}</h1>
            </div>
            
            <p className="text-[#8A95A5] text-lg leading-relaxed mb-8 border-l-4 border-[#C61A1A] pl-6 font-medium">
              {product.description}
            </p>

            <div className="mb-10">
              <h3 className="text-[#1A1E24] font-black uppercase tracking-widest text-sm mb-4">Öne Çıkan Özellikler</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#1A1E24] font-medium">
                    <svg className="w-5 h-5 text-[#C61A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-[#C61A1A] text-white font-black uppercase tracking-widest py-5 rounded-sm hover:bg-[#1A1E24] transition-colors flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,26,26,0.2)]">
                Fiyat Teklifi Al
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              <button className="bg-white border-2 border-[#1A1E24] text-[#1A1E24] font-black uppercase tracking-widest px-8 py-5 rounded-sm hover:bg-[#F8F9FA] transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Technical Data Table (Brand Guide Spec) */}
        <section className="mb-24">
          <div className="border-b-2 border-[#1A1E24] pb-4 mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black text-[#1A1E24] tracking-tight">Teknik Veriler</h2>
            <span className="text-[#8A95A5] font-bold uppercase tracking-widest text-sm hidden md:block">B2B Endüstriyel Şablon</span>
          </div>

          <div className="bg-white rounded-sm border border-[#8A95A5]/20 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-[#1A1E24] text-white p-6 font-black uppercase tracking-widest text-sm">
              <div>Teknik Parametre</div>
              <div>Fabrika Verisi / Değer</div>
              <div>Uyumlu Ataşman & Sarf</div>
            </div>
            <div className="flex flex-col">
              {product.technicalData.map((data, idx) => (
                <div key={idx} className={`grid grid-cols-3 p-6 font-medium border-b border-[#8A95A5]/10 hover:bg-[#F8F9FA] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]/50'}`}>
                  <div className="text-[#1A1E24] font-bold">{data.param}</div>
                  <div className="text-[#C61A1A] font-black">{data.value}</div>
                  <div className="text-[#8A95A5] flex items-center gap-2">
                    {data.accessory !== "-" && <svg className="w-4 h-4 text-[#C61A1A] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>}
                    {data.accessory}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
