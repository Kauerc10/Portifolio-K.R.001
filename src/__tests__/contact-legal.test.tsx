import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Contact from '@/components/sections/ContatoSection';
import Footer from '@/components/sections/Footer';
import pt from '@/i18n/locales/pt-BR.json';
import en from '@/i18n/locales/en-US.json';

it('keeps direct channels only in the footer and exposes the privacy notice', () => {
  const { container } = render(<><Contact dict={pt.contato} /><Footer dict={pt.footer} /></>);
  const contact = container.querySelector('#contato')! as HTMLElement;
  expect(within(contact).queryByRole('link', { name: 'LinkedIn' })).toBeNull();
  expect(within(contact).getByRole('link', { name: pt.contato.privacyLink })).toHaveAttribute('href', '/pt-BR/privacidade');
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: pt.footer.terms })).toHaveAttribute('href', '/pt-BR/termos');
});
it('keeps English legal links in the active locale', () => {
  render(<><Contact dict={en.contato} locale="en-US" /><Footer dict={en.footer} locale="en-US" /></>);
  expect(screen.getByRole('link', { name: en.contato.privacyLink })).toHaveAttribute('href', '/en-US/privacidade');
  expect(screen.getByRole('link', { name: en.footer.terms })).toHaveAttribute('href', '/en-US/termos');
});

for (const accepted of [true, false]) {
  it(`shows success only after browser provider acceptance: ${accepted}`, async () => {
    const fetch = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ submission: { access_key: 'public-form-id', name: 'Pessoa', email: 'person@example.com', message: 'Oi' } })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ success: accepted })));
    vi.stubGlobal('fetch', fetch);
    try {
      render(<Contact dict={pt.contato} />);
      for (const [label, value] of [[/^Nome/, 'Pessoa'], [/^E-mail/, 'person@example.com'], [/^Assunto/, 'Projeto'], [/^Mensagem/, 'Olá'] ] as const) {
        fireEvent.change(screen.getByRole('textbox', { name: label }), { target: { value } });
      }
      fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem/ }));
      await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(accepted ? pt.contato.messages.SUCCESS : pt.contato.messages.SERVICE_UNAVAILABLE));
      expect(fetch.mock.calls[0][0]).toBe('/api/contato');
      expect(fetch.mock.calls[1][0]).toBe('https://api.web3forms.com/submit');
      expect(fetch.mock.calls[1][1].signal).toBeInstanceOf(AbortSignal);
      expect(screen.getByRole('textbox', { name: /^Nome/ })).toHaveValue(accepted ? '' : 'Pessoa');
    } finally { vi.unstubAllGlobals(); }
  });
}
