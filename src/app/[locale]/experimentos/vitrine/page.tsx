import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import StageProof from '@/components/projects/stage-proof/StageProof';
export const metadata = { title: 'Prova de movimento — vitrine', robots: { index: false, follow: false } };
export default async function StageExperiment({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <StageProof locale={locale} />;
}
