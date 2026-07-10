import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata } from '@/utils/seo';
import Image from 'next/image';
import { Link } from "@/i18n/routing";
import blogsData from '@/data/blogs.json';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  
  const blog = blogsData.find((b) => b.slug === slug);
  if (!blog) return {};

  return generateSEOMetadata({
    title: (locale === 'en' ? blog.titleEn : blog.title) + " | Özensan Blog",
    description: locale === 'en' ? blog.descriptionEn : blog.description,
    locale,
    pathnameTr: `/blog/${blog.slug}`,
    pathnameEn: `/blog/${blog.slug}`,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const t = await getTranslations({locale, namespace: "BlogPage"});

  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const title = locale === "en" ? blog.titleEn : blog.title;
  const content = locale === "en" ? blog.contentEn : blog.content;
  const tldr = locale === "en" ? blog.tldrEn : blog.tldr;
  const readTime = locale === "en" ? blog.readTimeEn : blog.readTime;
  const authorName = locale === "en" ? blog.authorEn : blog.author;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": `https://www.ozensanas.com${blog.image}`,
    "datePublished": blog.date,
    "dateModified": blog.date,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Özensan Sanayi Makine ve Malzemeleri A.Ş.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ozensanas.com/logoseffaf.webp"
      }
    },
    "description": locale === "en" ? blog.descriptionEn : blog.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ozensanas.com/${locale}/blog/${blog.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="bg-[#F8F9FA] min-h-screen">
      {/* Article Header */}
      <section className="bg-[#1A1E24] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={blog.image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="bg-[#C61A1A] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-tight">
              {title}
            </h1>
            <p className="text-[#8A95A5] font-medium tracking-widest text-sm uppercase">
               {new Date(blog.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
               <span className="mx-2">•</span> {authorName} <span className="mx-2">•</span> {readTime}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-14 border border-neutral-100">
            {/* Image Banner within content */}
            <div className="w-full h-auto mb-12 rounded-xl overflow-hidden shadow-lg">
               <img src={blog.image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* TL;DR Box */}
            <div className="bg-[#1A1E24]/5 border-l-4 border-[#C61A1A] p-6 mb-10 rounded-r-xl">
              <h3 className="text-[#1A1E24] font-bold text-lg mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C61A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                TL;DR (Özet)
              </h3>
              <p className="text-[#4A5568] italic">
                {tldr}
              </p>
            </div>

            {/* Typography Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-[#1A1E24] prose-p:text-[#4A5568] prose-p:leading-relaxed prose-a:text-[#C61A1A] hover:prose-a:text-[#9D1414] prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: content }} 
            />

            <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
              <Link href="/blog" className="inline-block bg-[#1A1E24] hover:bg-[#C61A1A] text-white font-bold py-4 px-8 rounded-sm transition-all tracking-widest text-sm uppercase">
                {t("backToBlog")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
