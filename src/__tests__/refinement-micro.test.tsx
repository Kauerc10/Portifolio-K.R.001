import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProjetosSection from '@/components/sections/ProjetosSection';
import pt from '@/i18n/locales/pt-BR.json';

it('project showcase exposes the five current cases and a Foli fallback', () => {
  const { container } = render(<ProjetosSection dict={pt.projetos} />);
  expect(container.querySelectorAll('[data-panel]')).toHaveLength(5);
  expect(container.querySelector('#project-foli a')).toHaveAttribute('href', 'https://github.com/Kauerc10/foli');
});

it('contact validation returns keyboard focus to the first invalid field', async () => {
  const { default: Contact } = await import('@/components/sections/ContatoSection');
  render(<Contact dict={pt.contato} />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
  expect(document.activeElement).toBe(screen.getByRole('textbox', { name: /^Nome/ }));
});


it('keeps the stage arrows keyboard accessible', () => {
 render(<ProjetosSection dict={pt.projetos}/>);
 const next=screen.getByRole('button',{name:'Próximo projeto'});
 next.focus();
 expect(document.activeElement).toBe(next);
 fireEvent.keyDown(next,{key:'ArrowRight'});
 expect(document.querySelector('[data-stage-proof]')).toHaveAttribute('data-active','vecom');
});
