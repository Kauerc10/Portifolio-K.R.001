import { describe, it, expect } from 'vitest';
import { experienceModeForRoute, experienceModeForProject } from '@/lib/experience-mode';

describe('Estratégia Responsiva por Audiência (ExperienceMode)', () => {
  it('deve mapear rotas corretamente para seus respectivos modos de experiência', () => {
    expect(experienceModeForRoute('home')).toBe('hybrid');
    expect(experienceModeForRoute('services')).toBe('commercial');
    expect(experienceModeForRoute('career')).toBe('career');
  });

  it('deve mapear a audiência de projetos corretamente para seus modos', () => {
    expect(experienceModeForProject('business')).toBe('commercial');
    expect(experienceModeForProject('engineering')).toBe('career');
    expect(experienceModeForProject('both')).toBe('hybrid');
  });
});
