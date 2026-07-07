import Image from "next/image";
import Link from "next/link";
import WorldMap from "@/components/home/WorldMap";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";

export default function Home() {
  const pillars = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Yetkili Servis Ağı",
      desc: "Türkiye'nin her noktasına ulaşan sertifikalı teknisyenlerimizle, makineleriniz için 7/24 orijinal yedek parça ve bakım garantisi.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Maksimum İş Güvenliği",
      desc: "Temsilcisi olduğumuz tüm global markalar, en ağır endüstriyel koşullarda bile operatör güvenliğini garanti eden Avrupa mühendisliği standartlarına sahiptir.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Kesintisiz Lojistik",
      desc: "Geniş stok ağımız sayesinde sahada yaşanabilecek duruş sürelerini minimize ediyor, sarf malzemelerini en hızlı şekilde şantiyenize ulaştırıyoruz.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Marka Güvencesi",
      desc: "Temsil ettiğimiz markaların üretim gücünü ve inovasyon yeteneğini, Türkiye'deki projelerinize orijinal garanti standartlarıyla taşıyoruz.",
    }
  ];

  // Get featured products dynamically
  const featuredProducts = productsData.filter(p => p.isFeatured).slice(0, 6);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[750px] flex items-center bg-[#1A1E24] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center bg-no-repeat opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-[#1A1E24]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent z-10" />
        </div>
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#C61A1A]"></div>
              <span className="text-[#8A95A5] font-black tracking-widest uppercase text-sm">YETKİLİ TÜRKİYE DİSTRİBÜTÖRÜ</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Dünya Devlerinin Gücü, <br />
              <span className="text-[#8A95A5]">Türkiye'nin Altyapısında.</span>
            </h1>
            <p className="text-[#8A95A5] text-xl md:text-2xl leading-relaxed max-w-2xl mb-12 font-medium">
              Cedima, DUSS, Ticab, Victor ve GCE markalarının resmi distribütörü olarak ağır sanayi, yol yapım ve profesyonel delme süreçlerinize kesintisiz mühendislik ve yedek parça çözümleri sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/urunler" className="bg-[#C61A1A] hover:bg-[#9D1414] text-white text-base font-black px-10 py-5 uppercase tracking-widest rounded-sm transition-all shadow-[0_10px_30px_rgba(198,26,26,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3">
                Ürünlerimizi İnceleyin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link href="/teklif-al" className="bg-transparent border-2 border-[#8A95A5] text-[#8A95A5] hover:bg-[#8A95A5] hover:text-[#1A1E24] text-base font-black px-10 py-5 uppercase tracking-widest rounded-sm transition-all flex items-center justify-center">
                Teklif Alın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BRAND CARDS (PORTRAIT) */}
      <section className="py-24 bg-white relative z-30">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1E24] tracking-tight">Temsil Ettiğimiz Global Devler</h2>
            </div>
            <Link href="/markalar" className="text-[#8A95A5] hover:text-[#1A1E24] font-bold uppercase tracking-widest text-sm flex items-center gap-2 transition-colors">
              TÜM MARKALAR
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {brandsData.map((brand) => (
              <Link href={`/markalar/${brand.slug}`} key={brand.slug} className="group relative aspect-[3/4] md:aspect-[2/3] w-full overflow-hidden block">
                {/* Background Cover Image */}
                <img 
                  src={brand.coverImage} 
                  alt={`${brand.name} Uygulama`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Gradient Overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                
                {/* Logo Area */}
                <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center">
                  <div className="h-12 w-full max-w-[120px] flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300" 
                    />
                  </div>
                </div>
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
              <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm">PREMIUM SEÇKİ</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1E24] tracking-tight mt-2">Öne Çıkan Ürünler</h2>
            </div>
            <Link href="/urunler" className="text-[#1A1E24] font-black uppercase tracking-widest text-sm border-b-2 border-[#C61A1A] pb-1 hover:text-[#C61A1A] transition-colors">
              Tüm Ürünleri Gör
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod, idx) => (
              <Link href={`/urunler/${prod.slug}`} key={idx} className="bg-white rounded-sm border border-[#8A95A5]/20 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#F8F9FA] p-6">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#1A1E24] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                    {prod.brand.toUpperCase()}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-[#1A1E24] group-hover:text-[#C61A1A] transition-colors line-clamp-2">{prod.name}</h3>
                  <p className="text-sm text-[#8A95A5] mt-3 line-clamp-2">{prod.description}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[#8A95A5] font-bold uppercase tracking-widest text-xs group-hover:text-[#C61A1A] transition-colors">
                    İncele
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
            <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm mb-4 block">Operasyonel Mükemmellik</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1E24] tracking-tight leading-tight">Mühendislikte<br/>Sıfır Taviz.</h2>
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
            <span className="text-[#C61A1A] font-bold tracking-widest uppercase text-sm block mb-4">Uluslararası Ticaret Ağı</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Sınır Tanımayan Mühendislik</h2>
            <p className="text-[#8A95A5] text-lg mt-6 font-medium">
              Türkiye merkezli lojistik ağımızla Polonya, Ukrayna, Irak, Libya, Suriye, Afganistan ve Mısır başta olmak üzere 
              geniş bir coğrafyaya endüstriyel makine ve yedek parça ihraç ediyoruz.
            </p>
          </div>
          
          {/* React Simple Maps component */}
          <WorldMap />

        </div>
      </section>

    </>
  );
}
