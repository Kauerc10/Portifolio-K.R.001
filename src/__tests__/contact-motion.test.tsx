import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Contact from '@/components/sections/ContatoSection';
import Footer from '@/components/sections/Footer';
import pt from '@/i18n/locales/pt-BR.json';

it('marks the focused contact field without delaying the form', () => {
  const { container } = render(<Contact dict={pt.contato} />);
  const input = screen.getByRole('textbox', { name: /^Nome/ });
  const label = input.closest('label') as HTMLElement;
  Object.defineProperties(label, {
    offsetTop: { configurable: true, value: 38 },
    offsetHeight: { configurable: true, value: 74 },
  });
  fireEvent.focus(input);
  expect(container.querySelector('form')).toHaveAttribute('data-active-field', 'nome');
  expect(container.querySelector('.contact-editorial__focus-marker')).toHaveStyle({ transform: 'translateY(38px)', height: '74px' });
  fireEvent.blur(input);
  expect(container.querySelector('form')).not.toHaveAttribute('data-active-field');
});

it('cancels the arrow motion when the document is covered by a navigation transition', async () => {
  let resolve: (value: Response) => void = () => undefined;
  vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(r => { resolve = r; })));
  try {
    const { container } = render(<Contact dict={pt.contato} />);
    fireEvent.change(screen.getByRole('textbox', { name: /^Nome/ }), { target: { value: 'Kauê' } });
    fireEvent.change(screen.getByRole('textbox', { name: /E-mail/i }), { target: { value: 'kaue@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Assunto/i }), { target: { value: 'Oi' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Mensagem/i }), { target: { value: 'Olá' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
    await act(async () => { document.documentElement.dataset.languagePhase = 'cover'; });
    await waitFor(() => expect(container.querySelector('form')).not.toHaveAttribute('data-submitting'));
    await act(async () => { resolve(new Response(JSON.stringify({ success: true }), { status: 200 })); });
  } finally {
    delete document.documentElement.dataset.languagePhase;
    vi.unstubAllGlobals();
  }
});

it('keeps contact text and focuses the first invalid field', () => {
  render(<Contact dict={pt.contato} />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
  expect(document.activeElement).toBe(screen.getByRole('textbox', { name: /^Nome/ }));
  expect(screen.getByRole('status')).toHaveTextContent(pt.contato.messages.VALIDATION_ERROR);
});

it('animates the submit state only while the request is in flight', async () => {
  let resolve: (value: Response) => void = () => undefined;
  vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(r => { resolve = r; })));
  try {
    render(<Contact dict={pt.contato} />);
    fireEvent.change(screen.getByRole('textbox', { name: /^Nome/ }), { target: { value: 'Kauê' } });
    fireEvent.change(screen.getByRole('textbox', { name: /E-mail/i }), { target: { value: 'kaue@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Assunto/i }), { target: { value: 'Oi' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Mensagem/i }), { target: { value: 'Olá' } });
    fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/i }));
    expect(screen.getByRole('button').closest('form')).toHaveAttribute('data-submitting', 'true');
    resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    await waitFor(() => expect(screen.getByRole('button').closest('form')).not.toHaveAttribute('data-submitting'));
  } finally {
    vi.unstubAllGlobals();
  }
});

it('only focuses the hero after a reduced-motion return reaches the top', async () => {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  const focus = vi.spyOn(HTMLElement.prototype, 'focus');
  render(<><section id="hero"><h1>Hero</h1></section><Footer dict={pt.footer} /></>);
  fireEvent.click(screen.getByRole('link', { name: /Voltar ao topo/i }));
  await waitFor(() => expect(focus).toHaveBeenCalled());
  focus.mockRestore();
  vi.mocked(window.scrollTo).mockRestore();
  vi.unstubAllGlobals();
});
