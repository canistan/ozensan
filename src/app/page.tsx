import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const brands = [
    { name: "CEDIMA", type: "Beton & Asfalt Kesme", logo: null },
    { name: "DUSS", type: "Karot & Delme Sistemleri", logo: "/brands/duss.svg" },
    { name: "TICAB", type: "Yol Bakım Ekipmanları", logo: null },
    { name: "VICTOR", type: "Gaz Kesme Sistemleri", logo: "/brands/victor.png" },
    { name: "GCE", type: "Endüstriyel Gaz Kontrol", logo: "/brands/gce.png" },
  ];

  const pillars = [
    {
      title: "Maksimum İş Güvenliği",
      description: "Temsilcisi olduğumuz tüm global markalar, en ağır endüstriyel koşullarda bile operatör güvenliğini garanti eden Alman ve Avrupa mühendisliği standartlarına sahiptir.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      )
    },
    {
      title: "Kesintisiz Lojistik",
      description: "Geniş stok ağımız sayesinde sahada yaşanabilecek duruş sürelerini minimize ediyor, ihtiyaç duyduğunuz sarf malzemelerini en hızlı şekilde şantiyenize ulaştırıyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      )
    },
    {
      title: "Global Marka Güvencesi",
      description: "Temsil ettiğimiz markaların üretim gücünü ve inovasyon yeteneğini, Türkiye'deki projelerinize orijinal garanti standartlarıyla taşıyoruz.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    }
  ];

  return (
    <>
      {/* ELITE WIDESCREEN HERO (Cinematic Heavy Machinery) */}
      <section className="relative w-full h-[85vh] min-h-[750px] flex items-center bg-[#1A1E24] overflow-hidden">
        {/* Background Image: Cinematic concrete cutting/heavy machinery (matching guide's vibe) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-50" />
          {/* Deep Anthracite Gradient from the left to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E24] via-[#1A1E24]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent z-10" />
        </div>
        
        <div className="container relative z-20 mx-auto px-8 md:px-12 flex">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              {/* Özensan Kırmızı Ayırıcı */}
              <span className="w-12 h-1.5 bg-[#C61A1A] rounded-sm"></span>
              <span className="text-[#8A95A5] font-bold tracking-[0.2em] text-sm uppercase">Yetkili Türkiye Distribütörü</span>
            </div>
            
            {/* Guide Text: "Dünya Devlerinin Gücü, Türkiye'nin Altyapısında." */}
            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-black tracking-tighter text-white mb-8 leading-[1.05] drop-shadow-lg">
              Dünya Devlerinin Gücü,<br/>
              <span className="text-[#8A95A5]">Türkiye'nin Altyapısında.</span>
            </h1>
            
            {/* Exact Guide Subtext */}
            <p className="text-xl text-[#8A95A5] mb-12 max-w-3xl leading-relaxed font-medium">
              Cedima, DUSS, Ticab, Victor ve GCE markalarının resmi distribütörü olarak ağır sanayi, yol yapım ve profesyonel delme süreçlerinize kesintisiz mühendislik ve yedek parça çözümleri sunuyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Red CTA (Guide exact) */}
              <Link href="/cozumler" className="bg-[#C61A1A] hover:bg-[#A01515] text-white px-9 py-4 rounded-sm font-bold text-lg transition-all shadow-[0_10px_30px_rgba(198,26,26,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3">
                Ürünlerimizi İnceleyin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              {/* Anthracite CTA (Guide exact: "Teklif Alın") */}
              <Link href="/teklif-al" className="bg-[#1A1E24] hover:bg-[#272C36] text-white border border-[#8A95A5]/30 px-9 py-4 rounded-sm font-bold text-lg transition-all text-center">
                Teklif Alın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE BRAND SHOWCASE STRIP */}
      <section className="bg-white border-b border-[#8A95A5]/20 py-10 relative z-30 overflow-hidden flex items-center h-40">
        <div className="container mx-auto px-8 relative flex h-full">
          {/* Static Title Box that sits ON TOP of the scrolling marquee */}
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white via-white to-transparent w-80 z-20 flex items-center">
            <div className="border-r border-[#8A95A5]/30 pr-8">
              <h3 className="text-lg font-black text-[#1A1E24] leading-tight uppercase tracking-tight">Temsil Ettiğimiz<br/><span className="text-[#8A95A5]">Global Devler</span></h3>
            </div>
          </div>
          
          {/* Right side fade mask */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Wrapper */}
          <div className="w-full h-full flex items-center overflow-hidden ml-64 relative z-10">
            <div className="flex animate-marquee whitespace-nowrap min-w-[200%] opacity-80 hover:opacity-100 transition-opacity duration-500 items-center">
              
              {/* Group 1 */}
              <div className="flex justify-around items-center w-full px-8 gap-24">
                {brands.map((brand) => (
                  <div key={`${brand.name}-1`} className="flex flex-col items-center justify-center group cursor-pointer grayscale hover:grayscale-0 transition-all duration-300">
                    <div className="relative h-14 w-40 flex items-center justify-center">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-3xl lg:text-4xl font-black text-[#1A1E24] tracking-tighter group-hover:text-[#C61A1A] transition-colors">{brand.name}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-[#8A95A5] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{brand.type}</span>
                  </div>
                ))}
              </div>

              {/* Group 2 (Duplicate for infinite flow) */}
              <div className="flex justify-around items-center w-full px-8 gap-24">
                {brands.map((brand) => (
                  <div key={`${brand.name}-2`} className="flex flex-col items-center justify-center group cursor-pointer grayscale hover:grayscale-0 transition-all duration-300">
                    <div className="relative h-14 w-40 flex items-center justify-center">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-3xl lg:text-4xl font-black text-[#1A1E24] tracking-tighter group-hover:text-[#C61A1A] transition-colors">{brand.name}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-[#8A95A5] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{brand.type}</span>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      {/* Background is Yapısal Açık Gri: #F8F9FA */}
      <section className="py-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <span className="text-[#C61A1A] font-bold tracking-widest text-sm uppercase mb-4 block">Operasyonel Mükemmellik</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#1A1E24] leading-[1.1] mb-8">
                  Mühendislikte<br/>Sıfır Taviz.
                </h2>
                <p className="text-lg text-[#8A95A5] leading-relaxed font-medium mb-10">
                  Yarım asrı aşkın tecrübemizle, sadece bir tedarikçi değil, projelerinizin en zorlu aşamalarında güvenebileceğiniz stratejik bir çözüm ortağıyız.
                </p>
                <Link href="/kurumsal" className="inline-flex items-center gap-2 text-[#1A1E24] font-bold hover:text-[#C61A1A] transition-colors border-b-2 border-[#C61A1A] pb-1">
                  Kurumsal Profilimiz
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
              {pillars.map((pillar, index) => (
                <div key={index} className="bg-white p-10 rounded-sm border border-[#8A95A5]/20 shadow-sm hover:shadow-xl hover:border-[#C61A1A]/30 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-[#F8F9FA] rounded-sm flex items-center justify-center text-[#C61A1A] mb-8 group-hover:scale-110 transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#1A1E24] mb-4">{pillar.title}</h3>
                  <p className="text-[#8A95A5] leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              ))}
              
              {/* Extra Lead Gen Hook Box inside Pillars grid */}
              <div className="bg-[#C61A1A] p-10 rounded-sm text-white shadow-[0_20px_40px_rgba(198,26,26,0.2)] flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">Özel Projeniz İçin<br/>Teknik Destek</h3>
                  <p className="text-white/80 font-medium leading-relaxed mb-8">Uzman mühendislerimiz uygulamanıza en uygun makine ve sarf malzemesi seçiminde size yardımcı olsun.</p>
                </div>
                <Link href="/teklif-al" className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all">
                  Danışmanlık Talep Et
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
