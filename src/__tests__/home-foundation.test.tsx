import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import JsonLd from '@/components/seo/json-ld';
import Navbar from '@/components/sections/Navbar';
import en from '@/i18n/locales/en-US.json';

it('publishes the confirmed professional presentation without invented employers or alumni', () => {
  const { container } = render(<JsonLd locale="en-US" />);
  const person = JSON.parse(container.querySelector('script')!.textContent!);
  expect(person.description).toContain('applications');
  expect(person).not.toHaveProperty('alumniOf');
  expect(person).not.toHaveProperty('worksFor');
  expect(person.jobTitle).toBeUndefined();
});

it('names the English navigation landmark in English', () => {
  render(<Navbar dict={en.nav} />);
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
});
