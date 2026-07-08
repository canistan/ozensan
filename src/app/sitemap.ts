import { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';
import solutionsData from '@/data/solutions.json';
import { routing } from '@/i18n/routing';

const baseUrl = 'https://www.ozensanas.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // Helper function to generate entries with alternates
  const addEntry = (pathTr: string, pathEn: string) => {
    sitemapEntries.push({
      url: `${baseUrl}/tr${pathTr === '/' ? '' : pathTr}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: pathTr === '/' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'tr': `${baseUrl}/tr${pathTr === '/' ? '' : pathTr}`,
          'en': `${baseUrl}/en${pathEn === '/' ? '' : pathEn}`,
        },
      },
    });
    // Add EN entry as well for completeness, pointing to TR
    sitemapEntries.push({
      url: `${baseUrl}/en${pathEn === '/' ? '' : pathEn}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: pathEn === '/' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'tr': `${baseUrl}/tr${pathTr === '/' ? '' : pathTr}`,
          'en': `${baseUrl}/en${pathEn === '/' ? '' : pathEn}`,
        },
      },
    });
  };

  // 1. Static Pages
  const staticPages = [
    { tr: '/', en: '/' },
    { tr: '/kurumsal', en: '/corporate' },
    { tr: '/hakkimizda', en: '/about' },
    { tr: '/urunler', en: '/products' },
    { tr: '/markalar', en: '/brands' },
    { tr: '/iletisim', en: '/contact' },
    { tr: '/kariyer', en: '/careers' },
    { tr: '/vizyon-misyon', en: '/vision-mission' },
    { tr: '/cozumler', en: '/solutions' },
    { tr: '/yedek-parca', en: '/spare-parts' },
    { tr: '/sikca-sorulan-sorular', en: '/faq' },
    { tr: '/teklif-al', en: '/get-quote' },
    { tr: '/cerez-politikasi', en: '/cookie-policy' },
    { tr: '/gizlilik-politikasi', en: '/privacy-policy' },
    { tr: '/kvkk', en: '/kvkk' },
    { tr: '/kullanim-sartlari', en: '/terms-of-use' },
  ];

  staticPages.forEach(page => addEntry(page.tr, page.en));

  // 2. Dynamic Products
  productsData.forEach((product) => {
    addEntry(`/urunler/${product.slug}`, `/products/${product.slug}`);
  });

  // 3. Dynamic Brands
  brandsData.forEach((brand) => {
    addEntry(`/markalar/${brand.slug}`, `/brands/${brand.slug}`);
  });

  // 4. Dynamic Solutions
  solutionsData.forEach((solution) => {
    addEntry(`/cozumler/${solution.slug}`, `/solutions/${solution.slug}`);
  });

  return sitemapEntries;
}
