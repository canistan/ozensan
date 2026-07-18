import { redirect } from '@/i18n/routing';
import { Metadata } from 'next';

const baseUrl = 'https://www.ozensanas.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}/kurumsal`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function AboutRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  redirect({ href: '/kurumsal', locale: resolvedParams.locale as any });
}
