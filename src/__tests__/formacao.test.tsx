import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import type { ComponentProps } from 'react';
import FormacaoSection from '@/components/sections/FormacaoSection';
import ptBR from '@/i18n/locales/pt-BR.json';

it('shows six courses first and keeps the remaining institutions reachable without JavaScript', () => {
  const dict: ComponentProps<typeof FormacaoSection>['dict'] = structuredClone(ptBR.formacao);
  const courses = dict.groups.find(group => group.id === 'complementary')!;
  courses.items = Array.from({ length: 8 }, (_, index) => ({
    id: `course-${index}`,
    title: `Curso ${index + 1}`,
    ...(index === 7 ? { institution: 'Outra instituição' } : {}),
  }));

  render(<FormacaoSection dict={dict} />);

  const group = screen.getByRole('region', { name: 'Cursos complementares' });
  const summary = within(group).getByText('Ver todos os cursos (8)');
  expect(within(group).getByText('Curso 6')).toBeVisible();
  expect(within(group).getByText('Curso 7')).not.toBeVisible();
  fireEvent.click(summary);
  expect(summary.closest('details')).toHaveAttribute('open');
  expect(within(group).getByText('Curso 8')).toBeVisible();
  expect(within(group).getByText('Outra instituição')).toBeVisible();
});
