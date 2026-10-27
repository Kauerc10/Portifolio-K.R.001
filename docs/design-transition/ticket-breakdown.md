# Proposta de tickets — transição de design

**Estado:** divisão em revisão; nenhum ticket publicado no GitHub. IDs T01–T11 são referências locais provisórias, não números de issue.

Tracker confirmado: `Kauerc10/Portifolio-K.R.001`. Após aprovação, publicar cada ticket em ordem de dependência com label `ready-for-agent` e bloqueios nativos. Não existe issue-pai fornecida; não criar ou modificar uma por inferência.

A proposta refina P0–P7: separa projetos/trajetória, incorpora PDFs ao contato e separa idioma/tema, assistente e consolidação. Cada entrega tem caminho verificável de interface até comportamento e prova, sem tickets horizontais de apenas instalar biblioteca ou editar CSS.

## Divisão para revisão

1. **T01 — Validar uma paisagem fiel em desktop e celular**
   - **Bloqueado por:** nenhum.
   - **Entrega:** Demonstrar um trecho da paisagem branca e violeta que preserve a composição aprovada e permita decidir entre geometria procedural e asset autorado antes de expandir a reformulação.
   - [Critérios completos](ticket-drafts/t01-scene-proof.md) · plano: P0.

2. **T02 — Entregar abertura responsiva e navegação antes do 3D**
   - **Bloqueado por:** T01.
   - **Entrega:** Permitir que o visitante leia a apresentação, navegue pelo portfólio e abra o currículo imediatamente, com a composição aprovada sobre um poster e sem esperar animações.
   - [Critérios completos](ticket-drafts/t02-usable-shell.md) · plano: P1.

3. **T03 — Carregar a paisagem interativa com pausa e recuperação**
   - **Bloqueado por:** T02.
   - **Entrega:** Carregar a paisagem no hero sem bloquear conteúdo e preservar a navegação quando GPU, rede ou carregamento falharem.
   - [Critérios completos](ticket-drafts/t03-resilient-world.md) · plano: P2.

4. **T04 — Explorar os três caminhos por mouse, teclado e toque**
   - **Bloqueado por:** T03.
   - **Entrega:** Fazer cada pavilhão conduzir ao conteúdo profissional correto, com respostas visuais contidas que preservam leitura, foco e rolagem.
   - [Critérios completos](ticket-drafts/t04-interactive-paths.md) · plano: P3.

5. **T05 — Apresentar projetos com evidências e estados corretos**
   - **Bloqueado por:** T02.
   - **Entrega:** Permitir avaliar os projetos pelo problema, contribuição, solução, tecnologias e evidências reais, em português e inglês.
   - [Critérios completos](ticket-drafts/t05-projects.md) · plano: P4 — projetos.

6. **T06 — Conectar trajetória, competências e formação ao perfil atual**
   - **Bloqueado por:** T02.
   - **Entrega:** Mostrar como desenvolvimento, automação e suporte se conectam à experiência de Kauê, com formação e reconhecimentos sustentados pelos currículos.
   - [Critérios completos](ticket-drafts/t06-trajectory.md) · plano: P4 — trajetória.

7. **T07 — Concluir contato e acesso aos currículos com estados reais**
   - **Bloqueado por:** T02.
   - **Entrega:** Permitir abrir os currículos atualizados, copiar ou usar o e-mail e enviar uma mensagem com confirmação real, preservando o texto em caso de falha.
   - [Critérios completos](ticket-drafts/t07-contact-resumes.md) · plano: P5 e PDFs do P4.

8. **T08 — Preservar idioma, tema e enquadramento nos modos disponíveis**
   - **Bloqueado por:** T03.
   - **Entrega:** Permitir alternar idioma e tema sem perder contexto de navegação, duplicar recursos ou comprometer a identidade visual da paisagem.
   - [Critérios completos](ticket-drafts/t08-locale-theme.md) · plano: P6 — tema e idioma.

9. **T09 — Integrar o ÆVO à nova jornada e aos fatos atualizados**
   - **Bloqueado por:** T04, T05, T06, T07.
   - **Entrega:** Manter o assistente útil para encontrar projetos, experiência e currículo e preparar contato, com respostas alinhadas ao perfil atual e sem efeitos que deformem a página.
   - [Critérios completos](ticket-drafts/t09-aevo.md) · plano: P6 — assistente.

10. **T10 — Consolidar a transição e retirar os consumidores legados**
   - **Bloqueado por:** T08, T09.
   - **Entrega:** Integrar a experiência completa com um único sistema visual e motor, mantendo rotas e contratos e tornando metadados e documentação coerentes com o perfil.
   - [Critérios completos](ticket-drafts/t10-consolidation.md) · plano: P6 — consolidação.

11. **T11 — Validar a experiência completa e preparar entrega revisável**
   - **Bloqueado por:** T10.
   - **Entrega:** Entregar uma prévia comparável ao alvo, com demonstração dos fluxos, medições de desempenho e limitações explícitas, pronta para a revisão guiada antes de publicação separada.
   - [Critérios completos](ticket-drafts/t11-verification.md) · plano: P7.

## Grafo de dependências

```mermaid
flowchart TD
  T01["T01 Prova da paisagem"] --> T02["T02 Abertura utilizável"]
  T02 --> T03["T03 Cena resiliente"]
  T03 --> T04["T04 Caminhos funcionais"]
  T02 --> T05["T05 Projetos"]
  T02 --> T06["T06 Trajetória"]
  T02 --> T07["T07 Contato / PDFs"]
  T03 --> T08["T08 Idioma / tema"]
  T04 --> T09["T09 Assistente"]
  T05 --> T09
  T06 --> T09
  T07 --> T09
  T08 --> T10["T10 Consolidação"]
  T09 --> T10
  T10 --> T11["T11 Verificação / entrega"]
```

## Por que esses bloqueios existem

- T01 fecha fidelidade e poster; T02 pode iniciar exploração de estrutura antes, mas sua conclusão visual depende dessa prova. Não anunciar uma abertura concluída com poster temporário.
- T03 precisa da abertura independente do legado e da geometria já validada. T04 usa seu contrato de picking, projeção e ciclo de vida.
- T05, T06 e T07 só dependem do shell: não esperar o acabamento 3D para organizar conteúdo e contato.
- T08 depende da cena para provar materiais/poster por tema; não depende de conteúdo completo nem dos três caminhos para iniciar.
- T09 testa ações do assistente sobre os destinos, projetos, trajetória e formulário efetivos; por isso depende dessas quatro entregas.
- T10 faz a retirada definitiva e coerência pública quando os consumidores já migraram; T11 verifica a experiência integrada sem transformar publicação em ação automática.

## Critérios de independência

Depois de T02, conteúdo/contato podem avançar enquanto a cena evolui; depois de T03, tema/idioma pode avançar enquanto a navegação é finalizada. Isso define prontidão, não autorização para agentes alterarem os mesmos arquivos ao mesmo tempo. Definir proprietário por arquivo ou integrar sequencialmente quando houver sobreposição de dicionário, layout ou CSS.

## Antes de publicar

Confirmar se o tamanho dos tickets está adequado, se todos os bloqueios são necessários e se algum ticket deve ser unido ou dividido. A aprovação da imagem e do plano anterior não é tratada como aprovação automática desta nova divisão.

Os rascunhos são copiáveis para o GitHub; os IDs provisórios serão resolvidos para números reais e relações nativas depois da aprovação. O arquivo `ticket-proposal.json` permite verificar o grafo e preparar publicação idempotente; não executar criação em lote sem antes conferir duplicatas e persistir cada número retornado.

## Material para o executor

- [Imagem aprovada](assets/approved-desktop.png)
- [Diagrama por ID e instruções](reference-map.md)
- [Mapa de posições e destinos em JSON](reference-map.json)
- [Especificação de interação e comportamento](specification.md)
- [Plano técnico com interfaces, arquivos e testes](../superpowers/plans/2026-10-27-interactive-portfolio.md)
