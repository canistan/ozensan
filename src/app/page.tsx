import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe2, ShieldCheck, Zap, Hexagon, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ÖZENSAN SANAYİ VE MAKİNALARI | 50 Yılı Aşkın Tecrübe',
  description: 'Türkiye\'nin köklü kuruluşu ÖZENSAN SANAYİ VE MAKİNALARI ile yüksek performanslı endüstriyel çözümler, elmas uçlar ve ağır sanayi makinaları.',
  keywords: 'özen sanayi, endüstriyel makina, elmas uç, cnc kesim, duss, cedima, gce, victor, ticab, sanayi makinaları, istanbul',
  openGraph: {
    title: 'ÖZENSAN SANAYİ VE MAKİNALARI',
    description: 'Yüksek performanslı endüstriyel çözümler ve sanayi makinaları.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      
      {/* HEADER - Tech Grid Style */}
      <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 h-full border-r border-slate-200 pr-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-64 h-16 group-hover:opacity-80 transition-opacity">
                <Image 
                  src="/logo.png" 
                  alt="ÖZENSAN SANAYİ VE MAKİNALARI" 
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 px-6 items-center h-full">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-red-600 tracking-wide transition-colors">ANASAYFA</Link>
            <Link href="/kurumsal" className="text-sm font-bold text-slate-600 hover:text-red-600 tracking-wide transition-colors">KURUMSAL</Link>
            <Link href="/markalar" className="text-sm font-bold text-slate-600 hover:text-red-600 tracking-wide transition-colors">TEMSİLCİLİKLER</Link>
            <Link href="/urunler" className="text-sm font-bold text-slate-600 hover:text-red-600 tracking-wide transition-colors">ÜRÜNLER</Link>
            <Link href="/iletisim" className="text-sm font-bold text-slate-600 hover:text-red-600 tracking-wide transition-colors">İLETİŞİM</Link>
          </nav>
          <div className="hidden md:flex h-full items-center border-l border-slate-200 pl-8">
            <Link href="/iletisim" className="bg-slate-900 text-white px-6 py-2.5 font-bold text-sm tracking-wider hover:bg-red-600 transition-colors shadow-[4px_4px_0px_0px_rgba(203,213,225,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
              BİZE ULAŞIN
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION - Dramatic Dark Structure on Light */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-50 border-b border-slate-200">
         {/* Tech Grid Background (Light Mode) */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-16 py-20">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 shadow-sm text-xs font-mono text-slate-600 tracking-widest">
                  <span className="w-2 h-2 bg-red-600 animate-pulse"></span>
                  ENDÜSTRİ 4.0 & AĞIR SANAYİ
               </div>
               
               <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
                  Endüstriyel<br/>
                  <span className="text-red-600">Güç.</span>
               </h1>
               
               <p className="text-xl text-slate-600 max-w-xl font-medium border-l-4 border-red-600 pl-6 py-2">
                 1960'lardan bugüne, ağır sanayi ve inşaat sektörüne yön veren dünya devlerinin Türkiye'deki güvenilir köprüsü.
               </p>
               
               <div className="flex gap-4 pt-6">
                  <Link href="/urunler" className="group inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 font-bold tracking-wide hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                    ÜRÜNLERİ İNCELE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/kurumsal" className="inline-flex items-center justify-center bg-white text-slate-900 border border-slate-300 px-8 py-4 font-bold tracking-wide hover:bg-slate-100 transition-colors shadow-[4px_4px_0px_0px_rgba(203,213,225,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                    HİKAYEMİZ
                  </Link>
               </div>
            </div>
            
            {/* Tech Visual Element (Replacing standard image with structured tech box) */}
            <div className="flex-1 w-full flex justify-center md:justify-end">
               <div className="relative w-full max-w-[450px] aspect-square border-2 border-slate-900 bg-white p-8 flex flex-col justify-between shadow-[16px_16px_0px_0px_rgba(15,23,42,0.05)] group">
                  {/* Köşe Vurguları */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-600"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600"></div>
                  
                  <div className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden">
                     <Hexagon size={140} className="text-slate-200 group-hover:text-red-100 transition-colors duration-700" strokeWidth={1} />
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                     
                     <div className="absolute bottom-8 text-center space-y-2">
                        <span className="block text-slate-400 font-mono text-xs tracking-widest border border-slate-200 px-3 py-1 bg-white">
                           SİSTEM HAZIR
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* GLOBAL REACH / MAP SECTION (Tech Structural Layout) */}
      <section className="w-full py-24 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-2 border-slate-900 pb-8 gap-8">
            <div className="space-y-4 max-w-2xl">
               <div className="flex items-center gap-2 text-red-600 font-mono text-sm tracking-widest">
                  <Globe2 size={16} />
                  <span>KÜRESEL AĞ</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Küresel Etki, <br/>Yerel Güvence.</h2>
            </div>
            <p className="text-slate-600 text-lg font-medium max-w-md border-l-2 border-slate-200 pl-4">
              Dünyanın en iyi markalarını Türkiye'ye getiriyor, Türkiye'deki üretim gücümüzü ise kıtalar ötesine taşıyoruz.
            </p>
          </div>
          
          <div className="relative w-full h-[500px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl group">
            {/* Dark Map Background inside Light Theme Section */}
            <div className="absolute inset-0 opacity-20" 
                 style={{
                   backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 1) 1px, transparent 0)',
                   backgroundSize: '32px 32px'
                 }}>
            </div>
            
            {/* Sembolik Lokasyon Noktaları */}
            <div className="absolute top-1/3 left-1/4">
               <span className="relative flex h-4 w-4 group-hover:scale-150 transition-transform duration-700">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
               </span>
            </div>
            
            <div className="absolute top-1/2 right-1/3">
               <span className="relative flex h-5 w-5 group-hover:scale-125 transition-transform duration-500">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-5 w-5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"></span>
               </span>
            </div>
            
            <div className="absolute bottom-1/3 right-1/4">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></span>
               </span>
            </div>
            
            <div className="absolute bottom-0 left-0 bg-white p-8 border-t-2 border-r-2 border-slate-900">
              <h3 className="text-5xl font-black text-slate-900 mb-1">15+</h3>
              <p className="text-xs font-mono tracking-widest text-slate-500">İHRACAT YAPILAN ÜLKE</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS / SOLUTIONS SECTION (SCROLLING MARQUEE - Sharp Style) */}
      <section className="w-full py-12 bg-slate-900 overflow-hidden border-t-4 border-red-600">
        <div className="relative flex overflow-x-hidden group">
          <div className="py-4 animate-marquee animate-marquee-hover flex items-center whitespace-nowrap">
            {/* İlk set */}
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>CEDIMA</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TICAB</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>VICTOR</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GCE</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DUSS</span>
            
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>CEDIMA</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TICAB</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>VICTOR</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GCE</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DUSS</span>
          </div>
          
          <div className="absolute top-0 py-4 animate-marquee animate-marquee-hover flex items-center whitespace-nowrap" aria-hidden="true">
            {/* Kopyası */}
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>CEDIMA</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TICAB</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>VICTOR</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GCE</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DUSS</span>
            
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>CEDIMA</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TICAB</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>VICTOR</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>GCE</span>
            <span className="mx-16 text-4xl font-black text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DUSS</span>
          </div>
        </div>
      </section>

    </main>
  );
}
