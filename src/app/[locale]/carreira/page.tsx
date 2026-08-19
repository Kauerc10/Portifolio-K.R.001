import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import GlobalHeader from '@/components/layout/GlobalHeader';
import CareerHero from '@/components/career/CareerHero';
import EngineeringPositioning from '@/components/career/EngineeringPositioning';
import TechStackMatrix from '@/components/career/TechStackMatrix';
import CareerTimeline from '@/components/career/CareerTimeline';
import GithubLiveStats from '@/components/widgets/GithubLiveStats';
import ResumeDownloadCard from '@/components/career/ResumeDownloadCard';
import CareerContact from '@/components/career/CareerContact';
import Footer from '@/components/sections/Footer';

interface CareerPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    return {};
  }
  const locale = rawLocale as Locale;
  const isEn = locale === 'en-US';

  const title = isEn
    ? 'Engineering Career & Tech Profile | Kauê Ruon Cardoso'
    : 'Carreira & Perfil Técnico de Engenharia | Kauê Ruon Cardoso';

  const description = isEn
    ? 'Software engineering profile of Kauê Ruon Cardoso: Full-Stack Developer, AI Engineering, Math Olympiad Medalist (OBMEP/IMPA), and production systems.'
    : 'Perfil de engenharia de software de Kauê Ruon Cardoso: Desenvolvedor Full-Stack, Engenharia de IA, Medalhista OBMEP/IMPA e sistemas em produção.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://kaueruon.dev/${locale}/carreira`,
      languages: {
        'pt-BR': 'https://kaueruon.dev/pt-BR/carreira',
        'en-US': 'https://kaueruon.dev/en-US/carreira',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kaueruon.dev/${locale}/carreira`,
      siteName: 'Kauê Ruon Cardoso — Portfolio',
      locale,
      type: 'profile',
    },
  };
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <GlobalHeader locale={locale} dict={dict.nav} />

      <main id="main-content" className="flex-1">
        <CareerHero dict={dict.careerPage.hero} />
        <EngineeringPositioning dict={dict.careerPage} />
        <TechStackMatrix dict={dict.careerPage} />
        <CareerTimeline dict={dict.careerPage} />

        {/* GitHub Live Stats no Perfil Técnico */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GithubLiveStats />
        </section>

        <ResumeDownloadCard dict={dict.careerPage} />
        <CareerContact dictContato={dict.contato} />
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
