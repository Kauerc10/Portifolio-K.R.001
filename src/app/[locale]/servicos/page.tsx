import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import GlobalHeader from '@/components/layout/GlobalHeader';
import ServicesHero from '@/components/services/ServicesHero';
import ServicePillars from '@/components/services/ServicePillars';
import BusinessProof from '@/components/services/BusinessProof';
import WorkProcess from '@/components/services/WorkProcess';
import ServicesFAQ from '@/components/services/ServicesFAQ';
import ServicesContact from '@/components/services/ServicesContact';
import Footer from '@/components/sections/Footer';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) {
    return {};
  }
  const locale = rawLocale as Locale;
  const isEn = locale === 'en-US';

  const title = isEn
    ? 'Software Development & Automation Services | Kauê Ruon Cardoso'
    : 'Serviços de Desenvolvimento e Automação Web | Kauê Ruon Cardoso';

  const description = isEn
    ? 'High-conversion websites, tailored operational systems, and AI automation for businesses. Blumenau/SC, Brazil.'
    : 'Sites de alta conversão, sistemas operacionais sob medida e automações de processos com IA para empresas em Blumenau/SC e remoto.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://kaueruon.dev/${locale}/servicos`,
      languages: {
        'pt-BR': 'https://kaueruon.dev/pt-BR/servicos',
        'en-US': 'https://kaueruon.dev/en-US/servicos',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kaueruon.dev/${locale}/servicos`,
      siteName: 'Kauê Ruon Cardoso — Portfolio',
      locale,
      type: 'website',
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <GlobalHeader locale={locale} dict={dict.nav} />

      <main id="main-content" className="flex-1">
        <ServicesHero dict={dict.services.hero} />
        <ServicePillars dict={dict.services} />
        <BusinessProof locale={locale} />
        <WorkProcess dict={dict.services} />
        <ServicesFAQ dict={dict.services} />
        <ServicesContact dictServices={dict.services} dictContato={dict.contato} />
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
