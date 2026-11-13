# VioDigital — storyboard v1

Estado atualizado: estética do card e página dedicada aprovada pelo usuário; autorizada a prova de movimento local. Quatro pranchas geradas com imagegen, visualizadas e organizadas. Não são assets finais. Consulte a [prova de movimento](prova-de-movimento.md) para implementação, validação e limites. Sem publicação nesta rodada.

## Pranchas e legendas

| Imagem | Leitura |
|---|---|
| [01 — Home](imagens/01-home-scroll.png) | Chegada → leitura → composição final. Documento ilustrativo e QR dão personalidade ao projeto; título, resumo e acesso ao case permanecem legíveis. |
| [02 — Passagem ao case](imagens/02-transicao-case.png) | O mesmo documento conecta a prévia à abertura da página dedicada, crescendo e mudando de posição. |
| [03 — Celular](imagens/03-mobile.png) | Prévia, passagem e case em coluna única, com percurso compacto e CTA visível. |
| [04 — Capítulos](imagens/04-case-capitulos.png) | Contexto → leitura/organização dos dados → projeto aberto à comunidade e galeria. |

As molduras e legendas externas pertencem ao storyboard, não à interface. O nome VioDigital representa a mudança de nome planejada; VIOWEB dentro da representação da interface é a marca atual/histórica. Isso não renomeia o repositório.

## Coreografia proposta

Na home, a entrada do bloco apresenta o documento sobre uma base mineral discreta. A rolagem destaca o QR, organiza seus módulos e revela faixas de dados. O repouso final reúne documento, informação e link. O roxo mantém a conexão com o portfólio; verde/vermelho ficam em detalhes próprios do produto.

Proposta inicial para a prova: 0–25% estabelece a composição; 25–65% conduz leitura e organização; 65–100% assenta a composição final. São faixas de progresso, não segundos. Calibrar distâncias no navegador. O conteúdo fixa temporariamente somente durante esse percurso; ao terminar, a página continua. Parar a rolagem pausa o movimento e rolar para cima reverte o percurso. Nenhuma espera obrigatória.

No celular, reduzir a sequência para chegada → leitura/composição final. Cada gesto deve produzir mudança perceptível. Evitar longos trechos presos, cortes de texto ou CTA fora do alcance. Se a altura disponível não comportar o conjunto, usar fluxo normal.

O clique em Conhecer o projeto inicia a expansão do documento compartilhado até o hero do case. A navegação deve funcionar por teclado, histórico, acesso direto e abertura em nova aba. Voltar restaura a posição na home sem repetir a introdução. Com movimento reduzido, mostrar conteúdo estável e usar passagem discreta. A animação nunca é condição para acessar informações.

O case continua com capítulos editoriais: contexto, solução visual e evidências. Texto não deve desaparecer antes da leitura; galerias e links continuam acessíveis independentemente do progresso da animação.

## Contrato visual para implementação posterior

O agente deve abrir e visualizar estas quatro pranchas e as referências aprovadas antes de codar. Preservar um único documento e um único desenho de QR entre estados: pequenas diferenças geradas entre quadros não são instrução para trocar o objeto. Manter título e CTA ancorados, sem os deslocamentos incidentais dos mockups.

Produzir depois camadas separadas: documento EXEMPLO, módulos de QR ilustrativo, placa posterior, realce de leitura, faixas de dados, base mineral, marcas decorativas e recortes reais da interface. A composição pode usar camadas 2.5D; não exige reconstrução WebGL/3D completa. Formato e tecnologia serão definidos na prova de movimento.

Estas imagens são conceitos, não assets finais nem evidência de funcionamento. QR não deve validar documentos. Não solicitar arquivos, câmera ou dados pessoais nesta encenação. Substituir as interfaces recriadas pelo gerador por screenshots reais revisados antes da versão final. Não reutilizar alegações de conformidade ou selos presentes na representação gerada como afirmações do portfólio.

Revisar texto factual antes de integrar: contribuição de Kauê, origem profissional, licença e créditos da base comunitária. A imagem não comprova manutenção colaborativa, resultados mensurados ou autoria exclusiva. Não inventar métricas. Apresentar o projeto open source com seus créditos upstream.

## Referências e procedência

- Referência real: ../../../referencias-estilo-projetos/originais/viodigital/01-verificador-documentos.png (uso local; não publicar original operacional).
- Estética aprovada: ../../../imagens-selecionadas/03-projetos.png.
- Atmosfera da home: ../../../imagens-selecionadas/02-introducao-encaixe-hero.png. Hero existente preservado.
- Prompts completos em prompts/; procedência, dimensões e hashes em manifesto.json.

## Próxima etapa

Revisar esta direção visual com o usuário. Depois, construir a prova de movimento home → case → retorno usando assets provisórios, validar desktop/celular, pausa, reversão e movimento reduzido. Produzir assets finais somente após validar essa continuidade. Os outros quatro cases seguem a arquitetura aprovada, com identidade própria.
