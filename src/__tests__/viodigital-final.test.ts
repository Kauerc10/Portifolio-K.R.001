import { describe, expect, it } from 'vitest';
import { getVioMetadata } from '@/components/projects/viodigital-metadata';
import { vioCopy } from '@/components/projects/viodigital-copy';

describe('C03 — VioDigital final media and SEO contract', () => {
  it('keeps the dedicated PT/EN canonical pair on the case route', () => {
    const metadata = getVioMetadata('pt-BR');
    expect(metadata.alternates?.canonical).toBe('https://www.kaueruon.dev/pt-BR/projetos/viodigital');
    expect(metadata.alternates?.languages?.['en-US']).toBe('https://www.kaueruon.dev/en-US/projetos/viodigital');
    expect(getVioMetadata('en-US').alternates?.canonical).toBe('https://www.kaueruon.dev/en-US/projetos/viodigital');
  });

  it('keeps friendly fallback labels localized with the approved story', () => {
    expect(vioCopy('pt-BR').mediaUnavailable).toMatch(/captura/i);
    expect(vioCopy('en-US').openOriginal).toMatch(/original/i);
    expect(vioCopy('pt-BR').resultText).toMatch(/liberar o VioDigital gratuitamente/i);
  });
});
