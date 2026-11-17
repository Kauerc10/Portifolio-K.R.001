import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const canonicalDomain = 'https://www.kaueruon.dev';
const legacyDomain = 'https://kaueruon.dev';

const publicDomainSources = [
  'src/lib/aevo/rag-knowledge.ts',
  'README.md',
  '.github/ISSUE_TEMPLATE/bug_report.yml',
];

describe('consistência do domínio canônico', () => {
  it('mantém ÆVO e referências públicas alinhados ao domínio com www', () => {
    for (const relativePath of publicDomainSources) {
      const source = readFileSync(path.join(process.cwd(), relativePath), 'utf8');

      expect(source, relativePath).toContain(canonicalDomain);
      expect(source, relativePath).not.toContain(legacyDomain);
    }
  });
});
