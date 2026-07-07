import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/hakkimizda': {
      tr: '/hakkimizda',
      en: '/about'
    },
    '/urunler': {
      tr: '/urunler',
      en: '/products'
    },
    '/urunler/[slug]': {
      tr: '/urunler/[slug]',
      en: '/products/[slug]'
    },
    '/markalar': {
      tr: '/markalar',
      en: '/brands'
    },
    '/markalar/[slug]': {
      tr: '/markalar/[slug]',
      en: '/brands/[slug]'
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact'
    },
    '/kariyer': {
      tr: '/kariyer',
      en: '/careers'
    },
    '/vizyon-misyon': {
      tr: '/vizyon-misyon',
      en: '/vision-mission'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
