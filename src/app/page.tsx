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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SobreSection />
        <ExperienciaSection />
        <SkillsSection />
        <ConquistasSection />
        <FormacaoSection />
        <ProjetosSection />
        <ContatoSection />
      </main>
      <KonamiModal />
      <Footer />
    </>
  );
}
