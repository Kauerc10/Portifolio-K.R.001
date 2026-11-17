import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
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
