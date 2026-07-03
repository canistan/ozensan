import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Özen Sanayi Makinaları | 50 Yılı Aşkın Tecrübe',
  description: 'Türkiye\'nin köklü kuruluşu Özen Sanayi Makinaları ile yüksek performanslı endüstriyel çözümler, elmas uçlar ve ağır sanayi makinaları.',
  keywords: 'özen sanayi, endüstriyel makina, elmas uç, cnc kesim, duss, cedima, gce, victor, ticab, sanayi makinaları, istanbul',
  openGraph: {
    title: 'Özen Sanayi Makinaları',
    description: 'Yüksek performanslı endüstriyel çözümler ve sanayi makinaları.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* HEADER / NAVIGATION */}
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Orijinal Logo Yeri */}
            <span className="font-bold text-xl text-[var(--color-brand-primary)] tracking-tight">ÖZENSAN SANAYİ VE MAKİNALARI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Anasayfa</Link>
            <Link href="/kurumsal" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Kurumsal</Link>
            <Link href="/markalar" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Temsilcilikler</Link>
            <Link href="/urunler" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">Ürünler</Link>
            <Link href="/iletisim" className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-primary)] font-medium transition-colors">İletişim</Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/iletisim" className="bg-[var(--color-brand-primary)] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[var(--color-brand-accent)] transition-colors">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full bg-[var(--color-brand-surface)] pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-brand-primary)] leading-tight tracking-tight">
              Endüstriyel Güç.<br/>
              <span className="text-[var(--color-brand-accent)]">Kusursuz Performans.</span>
            </h1>
            <p className="text-lg text-[var(--color-brand-text)] max-w-2xl leading-relaxed">
              1960'lardan bugüne, ağır sanayi ve inşaat sektörüne yön veren dünya devlerinin Türkiye'deki güvenilir köprüsü. Cedima, Ticab, Victor, GCE ve Duss ile sınırları zorlayın.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/urunler" className="bg-[var(--color-brand-primary)] text-white px-8 py-3 rounded-md font-medium hover:bg-[var(--color-brand-accent)] transition-colors shadow-lg shadow-slate-200">
                Ürünleri İncele
              </Link>
              <Link href="/kurumsal" className="bg-white text-[var(--color-brand-primary)] border border-gray-200 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
                Hikayemiz
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full h-[500px] bg-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-100 shadow-xl">
             {/* Buraya makine görseli gelecek, şimdilik placeholder */}
             <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50"></div>
             <span className="relative text-slate-400 font-medium text-lg">Yüksek Çözünürlüklü Makine Görseli</span>
          </div>
        </div>
      </section>

      {/* BRANDS / SOLUTIONS SECTION (SCROLLING MARQUEE) */}
      <section className="w-full py-16 bg-white overflow-hidden flex flex-col border-y border-gray-100">
        <div className="text-center w-full mb-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Küresel Temsilciliklerimiz</p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="py-4 animate-marquee animate-marquee-hover flex items-center whitespace-nowrap">
            {/* İlk set */}
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">CEDIMA</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">TICAB</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">VICTOR</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">GCE</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">DUSS</span>
            {/* Kesintisiz akış için kopyası */}
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">CEDIMA</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">TICAB</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">VICTOR</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">GCE</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">DUSS</span>
          </div>
          
          <div className="absolute top-0 py-4 animate-marquee animate-marquee-hover flex items-center whitespace-nowrap" aria-hidden="true">
            {/* Sonsuz döngü için clone */}
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">CEDIMA</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">TICAB</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">VICTOR</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">GCE</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">DUSS</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">CEDIMA</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">TICAB</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">VICTOR</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">GCE</span>
            <span className="mx-12 text-3xl font-extrabold text-[var(--color-brand-primary)] opacity-70 hover:opacity-100 transition-opacity">DUSS</span>
          </div>
        </div>
      </section>

    </main>
  );
}
