import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';

import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';





export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "ContactSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/iletisim',
    pathnameEn: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "ContactPage"});
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* Header Section */}
      <section className="bg-[#1A1E24] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              {t("title1")} <span className="text-[#C61A1A]">{t("title2")}</span>
            </h1>
            <p className="text-[#8A95A5] text-lg font-medium">
              {t("desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 relative z-10 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
              
              {/* Contact Info (Left Side) */}
              <div className="lg:col-span-2 bg-[#1A1E24] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="contact-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-grid)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8">{t("info")}</h3>
                  <div className="space-y-8">
                    
                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-[#2A303A] group-hover:bg-[#C61A1A] transition-colors rounded-xl flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h4 className="text-sm font-bold text-[#8A95A5] uppercase tracking-wider mb-1">{t("hq")}</h4>
                        <p className="text-lg font-medium leading-relaxed">
                          Arap Cami, Bereketzade Medresesi Sk.<br />
                          No:12/A, 34421 Karaköy<br />
                          Beyoğlu / İstanbul
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-[#2A303A] group-hover:bg-[#C61A1A] transition-colors rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h4 className="text-sm font-bold text-[#8A95A5] uppercase tracking-wider mb-1">{t("phone")}</h4>
                        <p className="text-lg font-medium">+90 212 244 13 50</p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-12 h-12 bg-[#2A303A] group-hover:bg-[#C61A1A] transition-colors rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-5">
                        <h4 className="text-sm font-bold text-[#8A95A5] uppercase tracking-wider mb-1">{t("email")}</h4>
                        <p className="text-lg font-medium">info@ozensanas.com</p>
                      </div>
                    </div>

                  </div>
                </div>
                
                <div className="relative z-10 mt-16 pt-8 border-t border-[#8A95A5]/20">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t("hours")}</h4>
                  <div className="flex justify-between text-[#8A95A5] text-sm">
                    <span>{t("weekdays")}</span>
                    <span className="font-medium text-white">08:30 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-[#8A95A5] text-sm mt-2">
                    <span>{t("weekends")}</span>
                    <span className="font-medium text-white">{t("closed")}</span>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right Side) */}
              <div className="lg:col-span-3 p-10 md:p-14 bg-white">
                <h3 className="text-2xl font-bold text-[#1A1E24] mb-8">{t("sendMessage")}</h3>
                <ContactForm />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-neutral-200 relative">
        <iframe 
          src="https://maps.google.com/maps?q=Arap+Cami,+Bereketzade+Medresesi+Sk.+No:12/A,+34421+Karaköy+Beyoğlu/İstanbul&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          className="absolute inset-0 w-full h-full border-0 shadow-inner" 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Özensan Harita"
        ></iframe>
      </section>

    </div>
  );
}
