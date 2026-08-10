import { describe, it, expect, beforeEach } from 'vitest';
import { getVariant } from '@/lib/ab-testing';

describe('Framework de A/B Testing (ab-testing.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve atribuir variante A ou B e manter consistência via localStorage', () => {
    const v1 = getVariant('test_exp');
    expect(['A', 'B']).toContain(v1);

    // Segunda chamada deve retornar exatamente a mesma variante armazenada
    const v2 = getVariant('test_exp');
    expect(v2).toBe(v1);
  });
});
