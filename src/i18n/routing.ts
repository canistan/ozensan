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
    },
    '/kurumsal': {
      tr: '/kurumsal',
      en: '/corporate'
    },
    '/kurumsal/yonetim': {
      tr: '/kurumsal/yonetim',
      en: '/corporate/management'
    },
    '/cozumler': {
      tr: '/cozumler',
      en: '/solutions'
    },
    '/cozumler/[slug]': {
      tr: '/cozumler/[slug]',
      en: '/solutions/[slug]'
    },
    '/yedek-parca': {
      tr: '/yedek-parca',
      en: '/spare-parts'
    },
    '/sikca-sorulan-sorular': {
      tr: '/sikca-sorulan-sorular',
      en: '/faq'
    },
    '/teklif-al': {
      tr: '/teklif-al',
      en: '/get-quote'
    },
    '/cerez-politikasi': {
      tr: '/cerez-politikasi',
      en: '/cookie-policy'
    },
    '/gizlilik-politikasi': {
      tr: '/gizlilik-politikasi',
      en: '/privacy-policy'
    },
    '/kvkk': {
      tr: '/kvkk',
      en: '/clarification-text'
    },
    '/kullanim-sartlari': {
      tr: '/kullanim-sartlari',
      en: '/terms-of-use'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
