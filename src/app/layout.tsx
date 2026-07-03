import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ÖZENSAN SANAYİ VE MAKİNALARI | 50 Yılı Aşkın Tecrübe",
  description: "Endüstriyel elmas uçlar, makinalar ve sanayi çözümleri. Türkiye'nin köklü kuruluşu ÖZENSAN SANAYİ VE MAKİNALARI.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-brand-primary)]">
        {children}
      </body>
    </html>
  );
}
