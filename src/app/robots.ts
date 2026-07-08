import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // During subdomain development phase, we might want to disallow all.
  // But for the final production build, this is the correct configuration.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://www.ozensanas.com/sitemap.xml',
  };
}
