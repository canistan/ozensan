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

  return (
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
  );
}
