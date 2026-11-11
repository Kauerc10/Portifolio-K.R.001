import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ptBR from '@/i18n/locales/pt-BR.json';
import enUS from '@/i18n/locales/en-US.json';

vi.mock('@/i18n/dictionaries', () => ({
  getDictionary: vi.fn(async (locale: string) => (locale === 'en-US' ? enUS : ptBR)),
}));

import HomePage from '@/app/[locale]/page';
import HeroSection from '@/components/sections/HeroSection';
import ProjetosSection from '@/components/sections/ProjetosSection';
import SobreSection from '@/components/sections/SobreSection';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import SkillsSection from '@/components/sections/SkillsSection';
import FormacaoSection from '@/components/sections/FormacaoSection';
import ConquistasSection from '@/components/sections/ConquistasSection';
import ContatoSection from '@/components/sections/ContatoSection';
import Footer from '@/components/sections/Footer';

function mockMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: reducedMotion && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe('Spec #52 — Jornada completa do portfólio (Abertura, Seções e Microinterações)', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.replaceState(null, '', '/pt-BR');
    vi.restoreAllMocks();

    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
    window.scrollTo = vi.fn();
  });

  describe('P08 (#60) — Abertura e encaixe no hero', () => {
    it('abre na primeira visita da sessão com um único título acessível, aguarda Continuar e transfere foco para o H1 do hero', () => {
      vi.useFakeTimers();
      mockMatchMedia(false);

      render(<HeroSection dict={ptBR.hero} />);

      expect(screen.getAllByRole('heading')).toHaveLength(1);
      const continueBtn = screen.getByRole('button', { name: /Continuar/i });
      expect(continueBtn).toBeDisabled();
      fireEvent.click(continueBtn);
      expect(window.sessionStorage.getItem('portfolio-intro-complete')).toBeNull();
      act(() => vi.advanceTimersByTime(1850));
      expect(continueBtn).toBeEnabled();
      expect(screen.getByText(/Eu sou o Kauê\. Aqui está um pouco do que eu construo\./i)).toBeInTheDocument();

      fireEvent.click(continueBtn);

      expect(window.sessionStorage.getItem('portfolio-intro-complete')).toBe('true');
      const heroH1 = screen.getByRole('heading', { level: 1 });
      expect(document.activeElement).toBe(heroH1);
      vi.useRealTimers();
    });

    it('não reabre na mesma sessão nem quando há âncora direta ou preferência por movimento reduzido', () => {
      mockMatchMedia(false);
      window.sessionStorage.setItem('portfolio-intro-complete', 'true');
      const { unmount } = render(<HeroSection dict={ptBR.hero} />);
      expect(screen.queryByRole('button', { name: /Continuar/i })).not.toBeInTheDocument();
      unmount();

      window.sessionStorage.clear();
      window.history.replaceState(null, '', '/pt-BR#projetos');
      const { unmount: unmountHash } = render(<HeroSection dict={ptBR.hero} />);
      expect(screen.queryByRole('button', { name: /Continuar/i })).not.toBeInTheDocument();
      unmountHash();

      window.history.replaceState(null, '', '/pt-BR');
      mockMatchMedia(true);
      render(<HeroSection dict={ptBR.hero} />);
      expect(screen.queryByRole('button', { name: /Continuar/i })).not.toBeInTheDocument();
    });
  });

  describe('P02 (#54) — Projetos selecionados, índice lateral e links profundos', () => {
    it('abre Atlas Notarial por padrão com papel de Kauê e fluxo ilustrado em 3 etapas, alternando mantendo o foco no controle', () => {
      const { container } = render(<ProjetosSection dict={ptBR.projetos} />);

      const atlasArticle = container.querySelector('#project-atlas') as HTMLElement;
      const ckfArticle = container.querySelector('#project-ckf') as HTMLElement;
      expect(atlasArticle).not.toHaveAttribute('hidden');
      expect(ckfArticle).toHaveAttribute('hidden');

      expect(within(atlasArticle).getByText(/Concepção, desenvolvimento e integração notarial/i)).toBeInTheDocument();
      expect(within(atlasArticle).getByText('Consulta')).toBeInTheDocument();
      expect(within(atlasArticle).getByText('Dados do veículo')).toBeInTheDocument();
      expect(within(atlasArticle).getByText('Procuração')).toBeInTheDocument();

      const ckfLink = screen.getByRole('link', { name: /CKF Manutenção/i });
      ckfLink.focus();
      fireEvent.click(ckfLink);

      expect(ckfLink).toHaveAttribute('aria-current', 'true');
      expect(ckfArticle).not.toHaveAttribute('hidden');
      expect(atlasArticle).toHaveAttribute('hidden');
      expect(document.activeElement).toBe(ckfLink);
      expect(window.location.hash).toBe('#project-ckf');
    });

    it('seleciona o projeto correspondente ao abrir com hash direto', () => {
      window.history.replaceState(null, '', '/pt-BR#project-docfacil');
      const { container } = render(<ProjetosSection dict={enUS.projetos} />);

      expect(container.querySelector('#project-docfacil')).not.toHaveAttribute('hidden');
      expect(container.querySelector('#project-atlas')).toHaveAttribute('hidden');
    });
  });

  describe('P01 (#53), P03 (#55), P04 (#56), P05 (#57), P06 (#58) — Seções editoriais e evidências', () => {
    it('renderiza Sobre sem repetição com 3 áreas, Experiência em linha de trajetória e Competências com currículo e links', () => {
      render(
        <>
          <SobreSection dict={ptBR.sobre} />
          <ExperienciaSection dict={ptBR.experiencia} />
          <SkillsSection dict={ptBR.skills} />
        </>
      );

      expect(screen.getByRole('heading', { name: /Tecnologia para resolver problemas de forma prática\./i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Experiência' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Cartório Gaya' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'iPhoneria' })).toBeInTheDocument();

      const resumeLink = screen.getByRole('link', { name: /Ver meu currículo/i });
      expect(resumeLink).toHaveAttribute('href', '/curriculo_kaue.pdf');
      expect(screen.getByRole('link', { name: /Atlas Notarial/i })).toHaveAttribute('href', '#project-atlas');
    });

    it('renderiza Formação atual sem botão de expansão quando há até 6 cursos e suporta metadados opcionais em en-US', () => {
      render(<FormacaoSection dict={enUS.formacao} />);
      expect(screen.getByRole('heading', { name: /Education and courses/i })).toBeInTheDocument();
      expect(screen.getByText('Systems Analysis and Development')).toBeInTheDocument();
      expect(screen.getByText('VisualMídia')).toBeInTheDocument();
      expect(screen.queryByText(/View all courses/i)).not.toBeInTheDocument();
    });

    it('vincula Conquistas às listas oficiais da OBMEP e usa ilustrações decorativas independentes', () => {
      const { container } = render(<ConquistasSection dict={ptBR.conquistas} />);

      const decorativeImages = container.querySelectorAll('img[alt=""]');
      expect(decorativeImages.length).toBe(3);

      const links = screen.getAllByRole('link', { name: /Ver certificado/i });
      expect(links).toHaveLength(4);
      for (const link of links) {
        expect(link.getAttribute('href')).toMatch(/^https:\/\/premiacao\.obmep\.org\.br\//);
      }
    });
  });

  describe('P07 (#59) — Contato com transporte simulado e Rodapé', () => {
    it('indica erro junto ao campo na validação, preserva texto em erro recuperável, bloqueia envio concorrente e limpa após sucesso', async () => {
      let resolveFetch!: (value: Response) => void;
      const fetchMock = vi.fn().mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            resolveFetch = resolve;
          })
      );
      vi.stubGlobal('fetch', fetchMock);

      render(<ContatoSection dict={ptBR.contato} />);

      const nameInput = screen.getByLabelText('Nome') as HTMLInputElement;
      const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement;
      const subjectInput = screen.getByLabelText('Assunto') as HTMLInputElement;
      const messageInput = screen.getByLabelText('Mensagem') as HTMLTextAreaElement;
      const submitBtn = screen.getByRole('button', { name: /Enviar mensagem/i });
      const form = submitBtn.closest('form')!;

      fireEvent.submit(form);
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(fetchMock).not.toHaveBeenCalled();

      fireEvent.focus(nameInput);
      fireEvent.change(nameInput, { target: { value: 'Maria Silva' } });
      expect(nameInput).not.toHaveAttribute('aria-invalid');
      fireEvent.change(emailInput, { target: { value: 'maria@exemplo.com' } });
      fireEvent.change(subjectInput, { target: { value: 'Proposta' } });
      fireEvent.change(messageInput, { target: { value: 'Olá Kauê, gostaria de conversar.' } });

      fireEvent.submit(form);
      fireEvent.submit(form);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(submitBtn).toBeDisabled();

      resolveFetch({
        ok: false,
        json: async () => ({ error: 'SERVICE_UNAVAILABLE' }),
      } as Response);

      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(ptBR.contato.messages.SERVICE_UNAVAILABLE);
        expect(status).toHaveAttribute('data-state', 'error');
      });
      expect(messageInput.value).toBe('Olá Kauê, gostaria de conversar.');

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      fireEvent.submit(form);
      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(ptBR.contato.messages.SUCCESS);
        expect(status).toHaveAttribute('data-state', 'success');
      });
      expect(messageInput.value).toBe('');
    });

    it('reposiciona o foco no H1 do hero ao acionar Voltar ao topo sem reabrir a introdução', () => {
      mockMatchMedia(true);

      render(
        <>
          <HeroSection dict={ptBR.hero} />
          <Footer dict={ptBR.footer} />
        </>
      );

      const topLink = screen.getByRole('link', { name: /Voltar ao topo/i });
      fireEvent.click(topLink);

      expect(document.activeElement).toBe(screen.getByRole('heading', { level: 1 }));
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    });
  });

  describe('P09 (#61) & P10 (#62) — Ordem das seções na página pública e pausa do ÆVO', () => {
    it('renderiza as seções na ordem especificada e não monta o widget público do ÆVO', async () => {
      mockMatchMedia(true);

      const page = await HomePage({ params: Promise.resolve({ locale: 'pt-BR' }) });
      const { container } = render(page);

      const sectionIds = [...container.querySelectorAll('main > section')].map((el) => el.id);
      expect(sectionIds).toEqual([
        'hero',
        'projetos',
        'sobre',
        'experiencia',
        'skills',
        'formacao',
        'conquistas',
        'contato',
      ]);

      expect(screen.queryByRole('button', { name: /ÆVO/i })).not.toBeInTheDocument();
    });
  });
});
