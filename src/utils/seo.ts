import { Metadata } from 'next';

type SEOProps = {
  title: string;
  description: string;
  locale: string;
  pathnameTr: string;
  pathnameEn: string;
  image?: string;
};

const baseUrl = 'https://www.ozensanas.com';

export function generateSEOMetadata({
  title,
  description,
  locale,
  pathnameTr,
  pathnameEn,
  image = '/hero-bg.webp',
}: SEOProps): Metadata {
  const isTr = locale === 'tr';
  const currentPath = isTr ? pathnameTr.split('?')[0] : pathnameEn.split('?')[0];
  const cleanPathTr = pathnameTr.split('?')[0];
  const cleanPathEn = pathnameEn.split('?')[0];
  const canonicalUrl = `${baseUrl}/${locale}${currentPath === '/' ? '' : currentPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr${cleanPathTr === '/' ? '' : cleanPathTr}`,
        en: `${baseUrl}/en${cleanPathEn === '/' ? '' : cleanPathEn}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Özensan Sanayi Makine ve Malzemeleri A.Ş.',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isTr ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
