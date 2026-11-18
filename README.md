# Kauê Ruon Cardoso

**Desenvolvimento de Software | IA Aplicada | Automação** · Blumenau/SC

Crio aplicações, automatizo rotinas e ajudo pessoas a usar tecnologia.

[Portfólio](https://www.kaueruon.dev) · [LinkedIn](https://www.linkedin.com/in/kauerc/) · [GitHub](https://github.com/Kauerc10) · [Contato](mailto:kaue@ruon.dev)

## Como trabalho

Parto do problema de quem vai usar a solução e organizo requisitos e especificações. Uso agentes de IA como apoio na implementação, reviso o código gerado e valido as entregas com testes. Mantenho responsabilidade pelas decisões técnicas, pelas integrações e pela conferência do resultado.

Minha experiência no Cartório Gaya, em Blumenau, inspira ferramentas para consulta, organização e preparação de documentos. Essas ferramentas apoiam o trabalho da equipe e exigem conferência profissional; não garantem precisão jurídica.

## Projetos apresentados

| Projeto | Natureza e proposta |
|---|---|
| [VioDigital](https://www.kaueruon.dev/pt-BR/projetos/viodigital) | Projeto próprio compartilhado: conferência de documentos no navegador. |
| [Atlas Notarial](https://www.kaueruon.dev/pt-BR/projetos/atlas-notarial) | Produto próprio nascido no cartório. Dados de veículos preparados para procurações e ferramentas de rotina. |
| [VECOM Ficha Fácil](https://www.kaueruon.dev/pt-BR/projetos/vecom) | Desenvolvimento sob demanda para a VECOM, de Blumenau: cadastro e acompanhamento de fichas. |
| [DocFácil](https://www.kaueruon.dev/pt-BR/projetos/docfacil) | Produto próprio da RUON: criação guiada de documentos, revisão e PDF. |
| [CKF Manutenção](https://www.kaueruon.dev/pt-BR/projetos/ckf) | Duas entregas sob demanda para a CKF, de Itajaí: site institucional e sistema interno de orçamentos. |

As páginas distinguem demonstração visual, dados fictícios e acesso ao produto. O uso de IA para desenvolver software é diferente de uma funcionalidade de IA dentro do produto.

## Formação e reconhecimentos

- Análise e Desenvolvimento de Sistemas — Universidade Cruzeiro do Sul, em andamento.
- Scrum Fundamentals Certified (SFC), emitido em novembro de 2026.
- Prata regional, bronze nacional e menções honrosas na OBMEP.

## Aplicação deste repositório

Next.js App Router (versão definida no manifesto de dependências), React e TypeScript. Home e cases em PT/EN, hero com imagem 2.5D, vitrine editorial e animações com alternativa de movimento reduzido. A interface atual usa tema claro.

O widget público ÆVO está pausado. O código experimental seleciona trechos locais por palavras-chave e pode incluí-los no prompt de um provedor de IA. Esse mecanismo não demonstra indexação vetorial, treinamento de modelos ou precisão garantida. As ações da interface usam ferramentas tipadas e validação no servidor.

## Verificação local

- Instalação: npm ci
- Desenvolvimento: npm run dev
- Testes: npm test
- Tipos: npx tsc --noEmit
- Build: npm run build

Resultados de testes e medições pertencem ao commit e ao ambiente verificados; não garantem ausência permanente de erros.

## Configuração do ÆVO na Vercel

Em **Vercel → Project Settings → Environment Variables**, configure a ordem dos provedores e ao menos uma chave externa. O ÆVO ignora provedores sem chave ou indisponíveis e tenta o próximo automaticamente.

```env
AEVO_PROVIDER_ORDER=gemini,groq

GEMINI_API_KEY=...
AEVO_GEMINI_MODEL=gemini-3.6-flash

OPENAI_API_KEY=...
AEVO_OPENAI_MODEL=gpt-4.1-mini

GROQ_API_KEY=...
AEVO_GROQ_MODEL=openai/gpt-oss-120b
GROQ_BASE_URL=https://api.groq.com/openai/v1
```

A ordem é livre, por exemplo `gemini,groq,openai`. Chaves e modelos podem ser configurados separadamente. Se todos os serviços externos estiverem sem chave ou indisponíveis, a **base de conhecimento local bilíngue** responde automaticamente sem exigir variável adicional.

Use `.env.example` como referência completa. Nunca prefixe essas chaves com `NEXT_PUBLIC_`, pois elas devem permanecer somente no servidor.
