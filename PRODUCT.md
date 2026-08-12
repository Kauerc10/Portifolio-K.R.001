# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O portfólio atende principalmente recrutadores seniores, founders, CTOs e potenciais parceiros que avaliam Kauê Ruon Cardoso para engenharia de software, arquitetura de sistemas e projetos de IA. Eles precisam compreender rapidamente a experiência, verificar evidências técnicas e acessar projetos, repositórios e currículo.

## Product Purpose

`kaueruon.dev` apresenta a trajetória, as competências e o trabalho de Kauê Ruon Cardoso. O produto deve transformar uma visita curta em uma avaliação segura de capacidade técnica, oferecendo projetos verificáveis, contexto de atuação, formação e canais de contato.

## Positioning

Kauê combina engenharia de IA generativa e arquitetura de software com experiência cartorária de tolerância a erros, automação de processos reais e raciocínio lógico reconhecido pela OBMEP. O portfólio prioriza evidências de sistemas em produção em vez de afirmações genéricas de competência.

## Operating Context

- A avaliação acontece principalmente por navegação vertical em desktop ou mobile.
- Visitantes percorrem apresentação, experiência, competências, conquistas, formação, projetos e contato.
- Projetos públicos oferecem demonstrações e repositórios; projetos internos identificam claramente sua indisponibilidade pública.
- O conteúdo é bilíngue em português do Brasil e inglês dos Estados Unidos.
- Tema claro e escuro, currículo em PDF e links externos fazem parte da experiência.

## Capabilities and Constraints

- Aplicação web construída com Next.js, React e TypeScript.
- Conteúdo localizado em `pt-BR` e `en-US`.
- Integração com estatísticas do GitHub e o assistente ÆVO.
- Animações devem ser discretas, fluidas e funcionais; não podem causar sobreposição, travamentos perceptíveis ou competir pela mesma propriedade visual.
- A experiência deve respeitar `prefers-reduced-motion`.
- Elementos essenciais permanecem legíveis e utilizáveis caso animações ou scripts não sejam executados.
- A navegação e os reveals devem funcionar bem também em dispositivos com menor capacidade gráfica.

## Brand Commitments

- Nome público: Kauê Ruon Cardoso.
- Posicionamento: Software Architect, AI Engineer e Founder da K-HUB Soluções.
- A linguagem combina precisão técnica com referências notariais, como artigos, anexos, ficha técnica, selos e autenticação.
- A voz deve ser direta, verificável e profissional, sem fabricar resultados, clientes ou disponibilidade pública.
- A identidade existente e os ativos de marca do repositório devem ser preservados.

## Evidence on Hand

- **DocFácil:** SaaS de geração de documentos com IA generativa, demonstração e repositório públicos.
- **Atlas Notarial:** automação interna integrada à API do Detran-RS, com redução registrada de um processo de aproximadamente cinco minutos para vinte segundos; o repositório é privado.
- **CKF Manutenção:** sistema corporativo com demonstração e repositório públicos, testes com Vitest e geração de relatórios XLSX.
- **Foli Lib:** engine TypeScript para composição de PDFs com controle de overflow e repositório público.
- Certificados e medalhas estão disponíveis em `assets/` e `public/assets/`.
- O currículo está disponível em `curriculo_kaue.pdf` e `public/curriculo_kaue.pdf`.
- Não há depoimentos, imprensa ou métricas adicionais confirmadas; trabalhos futuros não devem inventá-los.

## Product Principles

1. **Evidência antes de promessa:** facilitar a verificação por demos, repositórios, resultados e documentos reais.
2. **Precisão sem ruído:** apresentar informação técnica com hierarquia clara e microinterações intencionais.
3. **Performance percebida é funcionalidade:** rolagem, reveals e interações devem permanecer suaves em diferentes dispositivos.
4. **Tolerância zero a regressões:** preservar acessibilidade, conteúdo, localização e fluxo do documento ao evoluir os efeitos visuais.
5. **Transparência de acesso:** distinguir claramente projetos públicos, privados e internos.

## Accessibility & Inclusion

- Respeitar a preferência do sistema por movimento reduzido.
- Manter navegação por teclado, foco visível e contraste legível nos temas claro e escuro.
- Não depender apenas de cor ou animação para comunicar estado ou disponibilidade.
- Disponibilizar o conteúdo principal nos dois idiomas suportados.
