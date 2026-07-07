'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Navigate to the current pathname using the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-4 text-xs font-bold tracking-widest border-l border-[#8A95A5]/30 pl-8">
      <span 
        onClick={() => switchLocale('tr')}
        className={`cursor-pointer transition-colors ${locale === 'tr' ? 'text-white' : 'text-[#8A95A5] hover:text-white'}`}
      >
        TR
      </span>
      <span 
        onClick={() => switchLocale('en')}
        className={`cursor-pointer transition-colors ${locale === 'en' ? 'text-white' : 'text-[#8A95A5] hover:text-white'}`}
      >
        EN
      </span>
    </div>
  );
}
