import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import pt from '@/i18n/locales/pt-BR.json';
import SobreSection from '@/components/sections/SobreSection';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import FormacaoSection from '@/components/sections/FormacaoSection';
import ConquistasSection from '@/components/sections/ConquistasSection';

it('keeps editorial motion ornaments separate from readable content', () => {
  const { container } = render(<SobreSection dict={pt.sobre} />);
  expect(container.querySelector('[data-motion-art]')).toBeTruthy();
  expect(container.querySelectorAll('[data-motion-pillar-accent]')).toHaveLength(3);
  expect(screen.getByRole('heading', { level: 2 })).toBeVisible();
});

it('exposes a segment and period for each experience marker', () => {
  const { container } = render(<ExperienciaSection dict={pt.experiencia} />);
  expect(container.querySelectorAll('[data-motion-segment]')).toHaveLength(pt.experiencia.roles.length);
  expect(container.querySelectorAll('[data-motion-period]')).toHaveLength(pt.experiencia.roles.length);
});

it('keeps formation expansion native while providing a visual edge', () => {
  const groups = [{ ...pt.formacao.groups.find(group => group.id === 'complementary')!, items: [...pt.formacao.groups.find(group => group.id === 'complementary')!.items, ...pt.formacao.groups.find(group => group.id === 'complementary')!.items] }];
  const { container } = render(<FormacaoSection dict={{ ...pt.formacao, groups }} />);
  expect(container.querySelector('details.formacao-editorial__more')).toBeTruthy();
  expect(container.querySelector('[data-motion-details-content]')).toBeTruthy();
  expect(container.querySelector('.formacao-editorial__expansion-edge')).toBeTruthy();
});

it('keeps medal highlight decorative and evidence links accessible', () => {
  const { container } = render(<ConquistasSection dict={pt.conquistas} />);
  expect(container.querySelectorAll('[data-motion-medal-sweep]')).toHaveLength(2);
  expect(container.querySelectorAll('a[target="_blank"]')).toHaveLength(4);
});
