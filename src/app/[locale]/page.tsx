import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SobreSection from '@/components/sections/SobreSection';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ConquistasSection from '@/components/sections/ConquistasSection';
import FormacaoSection from '@/components/sections/FormacaoSection';
import ProjetosSection from '@/components/sections/ProjetosSection';
import ContatoSection from '@/components/sections/ContatoSection';
import KonamiModal from '@/components/sections/KonamiModal';
import Footer from '@/components/sections/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Navbar dict={dict.nav} />
      <main>
        <HeroSection dict={dict.hero} />
        <ProjetosSection dict={dict.projetos} locale={locale} />
        <SobreSection dict={dict.sobre} />
        <ExperienciaSection dict={dict.experiencia} />
        <SkillsSection dict={dict.skills} />
        <FormacaoSection dict={dict.formacao} />
        <ConquistasSection dict={dict.conquistas} />
        <ContatoSection dict={dict.contato} />
      </main>
      <KonamiModal dict={dict.modals} />
      <Footer dict={dict.footer} />
    </>
  );
}
