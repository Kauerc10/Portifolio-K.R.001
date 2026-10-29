import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from '@/components/sections/HeroSection';
import Navbar from '@/components/sections/Navbar';
import ptBR from '@/i18n/locales/pt-BR.json';

describe('T02 — Usable Shell & Navigation (Before 3D)', () => {
  describe('HeroSection — renders_work_resume_and_world_links_before_renderer_ready', () => {
    it('deve renderizar apresentação, CTAs e destinos da paisagem sem depender de renderer 3D', () => {
      render(<HeroSection dict={ptBR.hero} />);

      // Cumprimento H1 acessível
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/Olá, que bom ter/i);
      expect(heading).toHaveTextContent(/você por aqui/i);

      // Apresentação pessoal
      expect(screen.getByText(/Sou Kauê Ruon Cardoso/i)).toBeInTheDocument();
      expect(screen.getByText(/Crio aplicações, automatizo rotinas/i)).toBeInTheDocument();

      // CTA principal -> #projetos
      const ctaExplore = screen.getByRole('link', { name: /Explorar meu trabalho/i });
      expect(ctaExplore).toHaveAttribute('href', '#projetos');

      // CTA secundário / Currículo -> /curriculo_kaue.pdf
      const ctaResume = screen.getAllByRole('link', { name: /Currículo/i }).find(
        (el) => el.getAttribute('href') === '/curriculo_kaue.pdf'
      );
      expect(ctaResume).toBeDefined();

      // Destinos dos 3 pavilhões da paisagem (Links semânticos U10, U11, U12 para desktop e touch mobile)
      const linksDev = screen.getAllByRole('link', { name: /Desenvolvimento/i });
      expect(linksDev.length).toBeGreaterThanOrEqual(1);
      expect(linksDev[0]).toHaveAttribute('href', '#projetos');

      const linksAuto = screen.getAllByRole('link', { name: /Automação/i });
      expect(linksAuto.length).toBeGreaterThanOrEqual(1);
      expect(linksAuto[0]).toHaveAttribute('href', '#project-atlas');

      const linksSupport = screen.getAllByRole('link', { name: /Suporte/i });
      expect(linksSupport.length).toBeGreaterThanOrEqual(1);
      expect(linksSupport[0]).toHaveAttribute('href', '#experiencia');

      // Poster com fetchpriority="high" e asset limpo
      const poster = screen.getByRole('img', {
        name: /Paisagem conceitual mineral/i,
      });
      expect(poster.getAttribute('src')).toContain('hero-clean.webp');
      expect(poster).toHaveAttribute('fetchpriority', 'high');
    });
  });

  describe('Navbar — mobile_menu_opens_closes_and_restores_focus', () => {
    it('deve navegar por Projetos, Trajetória, Contato e Currículo com links reais', () => {
      render(<Navbar dict={ptBR.nav} />);

      // Links do cabeçalho
      expect(screen.getByRole('link', { name: /Projetos/i })).toHaveAttribute('href', '#projetos');
      expect(screen.getByRole('link', { name: /Trajetória/i })).toHaveAttribute('href', '#experiencia');
      expect(screen.getByRole('link', { name: /Contato/i })).toHaveAttribute('href', '#contato');
      expect(screen.getByRole('link', { name: /Currículo/i })).toHaveAttribute('href', '/curriculo_kaue.pdf');
    });

    it('deve abrir menu mobile, expor aria-expanded, fechar com Escape e restaurar foco', () => {
      render(<Navbar dict={ptBR.nav} />);

      const burger = screen.getByRole('button', { name: /menu/i });
      expect(burger).toHaveAttribute('aria-expanded', 'false');

      // Foca no botão e clica para abrir
      burger.focus();
      fireEvent.click(burger);
      expect(burger).toHaveAttribute('aria-expanded', 'true');

      // Pressiona Escape para fechar
      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
      expect(burger).toHaveAttribute('aria-expanded', 'false');
      expect(document.activeElement).toBe(burger);
    });

    it('deve fechar menu mobile ao clicar em um link interno', () => {
      render(<Navbar dict={ptBR.nav} />);

      const burger = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(burger);
      expect(burger).toHaveAttribute('aria-expanded', 'true');

      // Clica em um link dentro do menu móvel
      const navLinks = screen.getAllByRole('link', { name: /Projetos/i });
      fireEvent.click(navLinks[navLinks.length - 1]);
      expect(burger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
