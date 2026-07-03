import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe2, ShieldCheck, Zap, ChevronRight, Settings, Diamond, Cpu, Factory } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ÖZENSAN SANAYİ VE MAKİNALARI | Ağır Sanayi ve Endüstriyel Çözümler',
  description: '1960\'tan bugüne ağır sanayi ve inşaat sektörüne yön veren dünya devlerinin Türkiye\'deki güvenilir köprüsü.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-slate-300 font-sans selection:bg-red-900 selection:text-white">
      {/* HEADER - Premium Dark */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 h-full border-r border-white/10 pr-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-64 h-16 group-hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="ÖZENSAN SANAYİ VE MAKİNALARI" 
                  className="w-full h-full object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/" className="text-xs font-bold tracking-widest text-white hover:text-red-500 transition-colors uppercase">Çözümler</Link>
            <Link href="/urunler" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">Ürünler</Link>
            <Link href="/temsilcilikler" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">Sektörler</Link>
            <Link href="/kurumsal" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">Hakkımızda</Link>
            <Link href="/iletisim" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">İletişim</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link 
              href="/iletisim" 
              className="hidden md:flex items-center justify-center px-6 py-3 bg-white/10 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all"
            >
              TEKLİF İSTE
            </Link>
          </div>
        </div>
      </header>

      {/* FULL-WIDTH HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
            <img 
              src="/dark-hero.png" 
              alt="Industrial CNC and Diamond Saw" 
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlays for readability and drama */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-3xl space-y-6">
               <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                  ENDÜSTRİYEL MÜHENDİSLİK.<br/>
                  TAVİZSİZ <span className="text-red-500">PERFORMANS.</span>
               </h1>
               
               <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
                 Global sanayi için geliştirilmiş, ileri teknoloji kesim makineleri ve premium elmas testere çözümleri.
               </p>
               
               <div className="flex flex-wrap gap-4 pt-8">
                  <Link href="/cozumler" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all border border-white/20 hover:border-white">
                    ÇÖZÜMLERİ KEŞFET
                  </Link>
                  <Link href="/urunler" className="inline-flex items-center justify-center text-white px-8 py-4 text-sm font-bold tracking-widest hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500">
                    ÜRÜNLERİ İNCELE
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* MAIN CONTENT WRAPPER - Split Layout (Left: Content, Right: Global Impact) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN - 70% Width */}
        <div className="flex-1 w-full lg:w-2/3 space-y-24">
          
          {/* OUR SOLUTIONS GRID */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-10 tracking-wide uppercase">Çözümlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Solution 1 */}
              <div className="group space-y-4">
                <Settings className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">CNC İŞLEME</h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                  Hassas kesim makineleri ve endüstriyel CNC üretim hatları.
                </p>
                <Link href="#" className="inline-flex items-center text-xs text-slate-300 hover:text-white transition-colors">
                  İncele <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
              
              {/* Solution 2 */}
              <div className="group space-y-4">
                <Diamond className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">ELMAS UÇLAR</h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                  En zorlu materyaller için geliştirilmiş premium elmas testere çözümleri.
                </p>
                <Link href="#" className="inline-flex items-center text-xs text-slate-300 hover:text-white transition-colors">
                  İncele <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>

              {/* Solution 3 */}
              <div className="group space-y-4">
                <Cpu className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">OTOMASYON</h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                  Fabrika otomasyon sistemleri ve akıllı üretim bantları.
                </p>
                <Link href="#" className="inline-flex items-center text-xs text-slate-300 hover:text-white transition-colors">
                  İncele <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>

              {/* Solution 4 */}
              <div className="group space-y-4">
                <Factory className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">AĞIR SANAYİ</h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                  Maden, inşaat ve ağır sanayi için tasarlanmış devasa mühendislik ürünleri.
                </p>
                <Link href="#" className="inline-flex items-center text-xs text-slate-300 hover:text-white transition-colors">
                  İncele <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
            {/* Elegant Divider */}
            <div className="w-full h-[1px] bg-white/10 mt-16"></div>
          </section>

          {/* FEATURED PRODUCTS */}
          <section>
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Öne Çıkan Ürünler</h2>
               <div className="flex gap-2">
                  <button className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight size={16} className="rotate-180" /></button>
                  <button className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight size={16} /></button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Product Card 1 */}
               <div className="group border border-white/10 bg-[#0f0f0f] hover:border-white/30 transition-colors flex flex-col h-full">
                  <div className="w-full aspect-[4/3] bg-white/5 p-6 flex items-center justify-center">
                     <img src="https://www.cedima.com/fileadmin/user_upload/Produkte/Fugenschneider/CF-13_3-B/CF-13_3_B.png" alt="Cedima" className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-2xl" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <h3 className="text-sm font-bold text-white mb-2">CF-13 B SERİSİ</h3>
                     <p className="text-xs text-slate-400 mb-1">Kompakt Derz Kesici</p>
                     <p className="text-xs text-slate-500 mb-6 font-mono">Max Derinlik: 170 mm</p>
                     <Link href="#" className="mt-auto text-xs text-white border-b border-white/30 self-start pb-1 hover:border-white transition-colors">Detayları Gör</Link>
                  </div>
               </div>

               {/* Product Card 2 */}
               <div className="group border border-white/10 bg-[#0f0f0f] hover:border-white/30 transition-colors flex flex-col h-full">
                  <div className="w-full aspect-[4/3] bg-white/5 p-6 flex items-center justify-center">
                     <img src="https://www.cedima.com/fileadmin/user_upload/Produkte/Diamantwerkzeuge/Trennscheiben/Fugenschneider/AR-ARL/AR.png" alt="Cedima Blade" className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 hover:rotate-90 drop-shadow-2xl" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <h3 className="text-sm font-bold text-white mb-2">AR-ARL SERİSİ</h3>
                     <p className="text-xs text-slate-400 mb-1">Premium Elmas Testere</p>
                     <p className="text-xs text-slate-500 mb-6 font-mono">Çap: 350-1200 mm</p>
                     <Link href="#" className="mt-auto text-xs text-white border-b border-white/30 self-start pb-1 hover:border-white transition-colors">Detayları Gör</Link>
                  </div>
               </div>

               {/* Product Card 3 */}
               <div className="group border border-white/10 bg-[#0f0f0f] hover:border-white/30 transition-colors flex flex-col h-full">
                  <div className="w-full aspect-[4/3] bg-white/5 p-6 flex items-center justify-center">
                     <img src="https://www.cedima.com/fileadmin/user_upload/Produkte/Kernbohrtechnik/Bohrmotoren/DK-32/DK-32_1.png" alt="Karot" className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-2xl" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <h3 className="text-sm font-bold text-white mb-2">DK-32 MOTOR</h3>
                     <p className="text-xs text-slate-400 mb-1">Ağır Tip Karot Motoru</p>
                     <p className="text-xs text-slate-500 mb-6 font-mono">Güç: 3200 W</p>
                     <Link href="#" className="mt-auto text-xs text-white border-b border-white/30 self-start pb-1 hover:border-white transition-colors">Detayları Gör</Link>
                  </div>
               </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN - GLOBAL IMPACT (30% Width) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
           <h2 className="text-sm font-bold text-white tracking-wide uppercase">Küresel Etki</h2>
           
           {/* Stats Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] border border-white/5 p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                 <span className="text-4xl font-light text-white mb-2">15<span className="text-red-500">+</span></span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">KÜRESEL MARKA</span>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                 <span className="text-4xl font-light text-white mb-2">60<span className="text-red-500">+</span></span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">YILLIK TECRÜBE</span>
              </div>
           </div>

           {/* World Map Area */}
           <div className="w-full bg-[#111] border border-white/5 p-6 relative overflow-hidden group">
              {/* Abstract dotted world map generated with SVG */}
              <svg viewBox="0 0 800 400" className="w-full h-auto opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                <path fill="#ffffff" d="M150,120 h4 v4 h-4 z M156,122 h4 v4 h-4 z M162,118 h4 v4 h-4 z M144,124 h4 v4 h-4 z M138,126 h4 v4 h-4 z M132,130 h4 v4 h-4 z M126,128 h4 v4 h-4 z M120,132 h4 v4 h-4 z M130,136 h4 v4 h-4 z M136,134 h4 v4 h-4 z M142,132 h4 v4 h-4 z M148,130 h4 v4 h-4 z M154,128 h4 v4 h-4 z M160,126 h4 v4 h-4 z M166,124 h4 v4 h-4 z M172,122 h4 v4 h-4 z M178,120 h4 v4 h-4 z M184,118 h4 v4 h-4 z M190,116 h4 v4 h-4 z M196,114 h4 v4 h-4 z M202,112 h4 v4 h-4 z M208,110 h4 v4 h-4 z M214,108 h4 v4 h-4 z M220,106 h4 v4 h-4 z M226,104 h4 v4 h-4 z M232,102 h4 v4 h-4 z M238,100 h4 v4 h-4 z M244,98 h4 v4 h-4 z M250,96 h4 v4 h-4 z M300,150 h4 v4 h-4 z M306,148 h4 v4 h-4 z M312,146 h4 v4 h-4 z M318,144 h4 v4 h-4 z M324,142 h4 v4 h-4 z M330,140 h4 v4 h-4 z M336,138 h4 v4 h-4 z M342,136 h4 v4 h-4 z M348,134 h4 v4 h-4 z M354,132 h4 v4 h-4 z M360,130 h4 v4 h-4 z M366,128 h4 v4 h-4 z M372,126 h4 v4 h-4 z M378,124 h4 v4 h-4 z M384,122 h4 v4 h-4 z M390,120 h4 v4 h-4 z M396,118 h4 v4 h-4 z M402,116 h4 v4 h-4 z M408,114 h4 v4 h-4 z M414,112 h4 v4 h-4 z M420,110 h4 v4 h-4 z M426,108 h4 v4 h-4 z M432,106 h4 v4 h-4 z M438,104 h4 v4 h-4 z M444,102 h4 v4 h-4 z M450,100 h4 v4 h-4 z M456,98 h4 v4 h-4 z M462,96 h4 v4 h-4 z M468,94 h4 v4 h-4 z M474,92 h4 v4 h-4 z M480,90 h4 v4 h-4 z M486,88 h4 v4 h-4 z M492,86 h4 v4 h-4 z M498,84 h4 v4 h-4 z M504,82 h4 v4 h-4 z M510,80 h4 v4 h-4 z M516,78 h4 v4 h-4 z M522,76 h4 v4 h-4 z M528,74 h4 v4 h-4 z M534,72 h4 v4 h-4 z M540,70 h4 v4 h-4 z M546,68 h4 v4 h-4 z M552,66 h4 v4 h-4 z M558,64 h4 v4 h-4 z M564,62 h4 v4 h-4 z M570,60 h4 v4 h-4 z M576,58 h4 v4 h-4 z M582,56 h4 v4 h-4 z M588,54 h4 v4 h-4 z M594,52 h4 v4 h-4 z M600,50 h4 v4 h-4 z M606,48 h4 v4 h-4 z M612,46 h4 v4 h-4 z M618,44 h4 v4 h-4 z M624,42 h4 v4 h-4 z M630,40 h4 v4 h-4 z M636,38 h4 v4 h-4 z M642,36 h4 v4 h-4 z M648,34 h4 v4 h-4 z M654,32 h4 v4 h-4 z M660,30 h4 v4 h-4 z M666,28 h4 v4 h-4 z M672,26 h4 v4 h-4 z M678,24 h4 v4 h-4 z M684,22 h4 v4 h-4 z M690,20 h4 v4 h-4 z M696,18 h4 v4 h-4 z M702,16 h4 v4 h-4 z M708,14 h4 v4 h-4 z M714,12 h4 v4 h-4 z M720,10 h4 v4 h-4 z"/>
                
                {/* Random dots for Europe/Asia/Americas to create map feel */}
                <circle cx="180" cy="120" r="1.5" fill="#fff" />
                <circle cx="210" cy="160" r="1.5" fill="#fff" />
                <circle cx="260" cy="240" r="1.5" fill="#fff" />
                <circle cx="380" cy="140" r="1.5" fill="#fff" />
                <circle cx="410" cy="130" r="1.5" fill="#fff" />
                <circle cx="430" cy="110" r="1.5" fill="#fff" />
                <circle cx="480" cy="180" r="1.5" fill="#fff" />
                <circle cx="550" cy="150" r="1.5" fill="#fff" />
                <circle cx="600" cy="220" r="1.5" fill="#fff" />
                <circle cx="680" cy="190" r="1.5" fill="#fff" />
                
                {/* Highlights (Red Dots for offices) */}
                <circle cx="430" cy="110" r="3" fill="#ef4444" className="animate-pulse" /> {/* Turkey/Europe */}
                <circle cx="450" cy="100" r="3" fill="#ef4444" className="animate-pulse" style={{animationDelay: '1s'}} />
                <circle cx="210" cy="160" r="3" fill="#ef4444" className="animate-pulse" style={{animationDelay: '0.5s'}} /> {/* US */}
                <circle cx="580" cy="160" r="3" fill="#ef4444" className="animate-pulse" style={{animationDelay: '1.5s'}} /> {/* Asia */}
              </svg>
           </div>
        </div>
      </div>
      
      {/* Footer minimal */}
      <footer className="w-full border-t border-white/5 py-8 mt-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-500 font-mono">
            <div>© {new Date().getFullYear()} Özensan A.Ş.</div>
            <div className="flex gap-6">
               <Link href="#" className="hover:text-white transition-colors">Yasal Uyarı</Link>
               <Link href="#" className="hover:text-white transition-colors">Gizlilik</Link>
               <Link href="#" className="hover:text-white transition-colors">İletişim</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
