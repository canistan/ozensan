import { redirect } from '@/i18n/routing';

export default async function ManagementRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  redirect({ href: '/kurumsal', locale: resolvedParams.locale as any });
}
