import React from 'react';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';
import { Link } from "@/i18n/routing";
import blogsData from '@/data/blogs.json';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "BlogSEO"});
  return generateSEOMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    pathnameTr: '/blog',
    pathnameEn: '/blog',
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({locale, namespace: "BlogPage"});

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1A1E24] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
               backgroundSize: '150px'
             }}>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              {t("hero1")} <span className="text-[#C61A1A]">{t("hero2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A95A5] leading-relaxed max-w-2xl font-light">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map((blog) => (
              <Link 
                href={{ pathname: "/blog/[slug]", "params": { "slug": blog.slug } } as any} 
                key={blog.id} 
                className="group flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Area */}
                <div className="h-64 w-full relative overflow-hidden bg-neutral-900">
                  <img 
                    src={blog.image} 
                    alt={locale === "en" ? blog.titleEn : blog.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Category/Tags overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-[#C61A1A] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title overlay */}
                  <h2 className="absolute bottom-6 left-6 pr-4 text-xl font-black text-white group-hover:text-[#C61A1A] transition-colors leading-snug">
                    {locale === "en" ? blog.titleEn : blog.title}
                  </h2>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-[#8A95A5] text-sm leading-relaxed mb-8 flex-grow">
                    {locale === "en" ? blog.descriptionEn : blog.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-[#8A95A5] font-medium">{new Date(blog.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <div className="flex items-center text-[#C61A1A] font-bold text-sm tracking-widest uppercase">
                      {t("readMore")}
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
