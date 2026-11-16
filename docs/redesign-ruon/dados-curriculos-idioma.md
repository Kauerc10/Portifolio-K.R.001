# Dados dos currículos e transição de idioma

11/11/2026. Fontes fornecidas por Kauê: currículo Suporte/DataInfo em primeira pessoa, currículo Product Owner/TranspoTech e CV S(2). Extração de texto e anotações de links com pypdf.

## Dados incorporados

- Currículo principal em PDF passa a ser o de Product Owner/TranspoTech, preservando o endereço público já usado pelos links. O documento original foi copiado integralmente.
- ADS, Universidade Cruzeiro do Sul, cursando desde agosto de 2026.
- Scrum Fundamentals Certified (SFC), SCRUMstudy, emissão em 05/11/2026, credencial 1205645. O link leva ao perfil LinkedIn indicado nos próprios currículos. Um endereço específico de verificação da credencial pode ser incorporado quando fornecido.
- Documentoscopia, Grafotécnica e Prevenção de Fraudes Digitais, 8 h, 2026. Instituição ainda ausente nos documentos.
- Início da experiência no cartório em agosto de 2023, atendimento, conferência documental e implantação do Vikunja na Oracle Cloud.
- A redução aproximada de uma etapa operacional de 5 minutos para 20 segundos é autodeclarada nos três currículos e aparece somente no contexto dessa experiência.

Os currículos trazem as 164 h de Tecnologia e Programação como agregado. Os três cursos já listados somam 92 + 40 + 32 h, portanto o agregado não foi adicionado como um curso extra.

## Próxima atualização de conteúdo

A seleção e o detalhamento dos projetos continuam para uma rodada própria, conforme pedido. Os currículos apresentam Atlas e CKF em produção, VECOM em desenvolvimento e DocFácil em desenvolvimento. Atlas aparece com Next.js, TypeScript e Firebase. DocFácil menciona Firebase, LangGraph e piloto de IA com revisão humana. Esses dados orientam a próxima revisão dos projetos.

## Direção do movimento de idioma

Uma superfície violeta passa na diagonal, com uma borda mineral clara alguns milissegundos atrás. Ao completar a cobertura, ocorre a navegação. A página traduzida se revela na mesma direção. O movimento se inverte na volta EN → PT.

A experiência preserva a URL, query, hash, preferência de idioma e posição relativa da seção. A introdução já concluída fica registrada na sessão. Com movimento reduzido, a navegação é direta. Um limite de tempo remove a cobertura se a hidratação ou a navegação falhar.

Referência de composição e ritmo: transições em camadas e máscaras da coleção Codrops. Implementação própria em CSS, integrada à navegação existente.

- [Codrops · Image Layer Animations with Clip-Path](https://tympanus.net/codrops/2023/10/31/image-layer-animations-with-clip-path/)
- [Codrops · Coleção de transições](https://tympanus.net/codrops/tag/page-transition/)
- [MDN · Movimento reduzido](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## Validação

Build Next.js de produção e TypeScript aprovados. Suíte com 52 testes aprovada; após o ajuste do agrupamento de cursos, a rodada focada de Formação e i18n passou com 9 testes.

Chromium em produção local, 390 e 1440 px: ida e volta PT/EN, query/hash, ausência de reabertura da introdução, PDF principal de 74.198 bytes e ausência de erros JavaScript passaram. Movimento reduzido e armazenamento bloqueado mantêm a navegação funcional. Em uma troca feita no meio de Formação, a diferença de posição relativa antes/depois foi inferior a 1 px.

As evidências locais ficam na pasta de visualizações da sessão, em language-cv-production. A validação usa navegador Chromium e toque emulado.
