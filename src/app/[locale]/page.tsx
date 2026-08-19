import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { parseVisitorIntent } from '@/lib/intent';
import GlobalHeader from '@/components/layout/GlobalHeader';
import DualAudienceHero from '@/components/home/DualAudienceHero';
import AudienceRouter from '@/components/home/AudienceRouter';
import FeaturedWork from '@/components/home/FeaturedWork';
import SobreSection from '@/components/sections/SobreSection';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ConquistasSection from '@/components/sections/ConquistasSection';
import FormacaoSection from '@/components/sections/FormacaoSection';
import ContactHub from '@/components/contact/ContactHub';
import KonamiModal from '@/components/sections/KonamiModal';
import Footer from '@/components/sections/Footer';

interface HomePageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ intent?: string }>;
}

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const intent = parseVisitorIntent(resolvedSearchParams.intent);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <GlobalHeader locale={locale} dict={dict.nav} />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Dual-Audience */}
        <DualAudienceHero locale={locale} dict={dict.dualHero} />

        {/* 2. Roteador de Caminhos Explícito */}
        <AudienceRouter locale={locale} dict={dict.audienceRouter} intent={intent} />

        {/* 3. Trabalhos Reais com Prova Visual */}
        <FeaturedWork locale={locale} />

        {/* 4. História, Competências e Trajetória Editorial */}
        <SobreSection dict={dict.sobre} />
        <ExperienciaSection dict={dict.experiencia} />
        <SkillsSection dict={dict.skills} />
        <ConquistasSection dict={dict.conquistas} />
        <FormacaoSection dict={dict.formacao} />

        {/* 5. Central de Contato Unificada */}
        <ContactHub dict={dict.contato} />
      </main>

      <KonamiModal dict={dict.modals} />
      <Footer dict={dict.footer} />
    </div>
  );
}
