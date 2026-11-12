# Fluxo de refinamento orientado por ask-matt

Base: plano-movimento-acabamento.md, especificação da #52 e feedback posterior. Os tickets existentes permanecem abertos. Nenhum novo ticket foi publicado nesta etapa.

## Decisão de fluxo

A direção e a sequência já foram descritas pelo usuário. A incerteza que depende de execução é o ritmo visual da abertura e sua passagem para o hero. Usar prova executável da sequência como primeiro marco da implementação, conferida por vídeo desde a primeira pintura. Não gerar novas direções visuais nem trocar stack. Antes de codificar, consolidar os critérios abaixo como complemento da especificação existente; distribuir as fatias propostas após revisão da divisão, conforme to-tickets.

## Fatias propostas

1. **Abertura sem flash, com sequência e encaixe completos.** Sem bloqueadores novos; refina #60. Entrega branco breve, linha1, linha2, apoio, botão por último, espera pela ação e encaixe contínuo. Inclui controle pré-pintura, sessão/hash/movimento reduzido/sem JS, foco e cancelamento. Prova visual com filmstrip desktop/mobile e teste funcional de fases. Toda a jornada fica utilizável neste marco.
2. **Seção piloto com escala e materialidade refinadas.** Sem dependência de1; refina #53/#55. Aplicar faixa/dunas aprovadas em uma seção representativa, ajustar elementos secundários, rever nos dois temas e mobile; reduzir textura realista, não integrar terraços/medalhas. Entrega seção completa, não pacote abstrato de assets.
3. **Microinterações úteis nas seções.** Depende2 para linguagem visual, não de1. Refina #54–#59. Seleção de projetos, cursos, links, certificados e formulário com resposta coerente, cancelamento e foco. Cada interação deve preservar funcionalidade existente, sem animações contínuas nem entradas iguais em todos os textos.
4. **Jornada integrada e evidências de revisão.** Depende1 e3; refina #62. Combina abertura, encaixe, seções e assets, testa PT/EN, temas,390/768/1440/1920, teclado/toque, redução de movimento e falhas. Build, testes, medições e capturas; revisão Standards+Spec contra a base anterior ao refinamento. Não fecha automaticamente outras issues.

## Contrato de validação

Manter o ponto já confirmado: página pública completa e comportamento observável. Testar primeira pintura e sequenciamento no navegador; no DOM, estados de acesso, foco, seleção, cancelamento e saídas. Não criar testes de coordenadas artísticas nem depender de tempo exato para julgar beleza. Documentar limitações de aparelhos/navegadores disponíveis.

## Escopo futuro preservado

- Composição 2.5D/SVG das medalhas e menções sobre os terraços estilizados.
- Caminhos que se expandem pelas seções conforme scroll.
- Conclusão das máscaras/realces do hero da #49 como frente própria, sem misturar implementação não commitada de outro worktree.

## Encerramento

Commits e push por marcos na branch de integração. Code review após integração. Não publicar produção nem encerrar tickets antes de validar seus critérios e registrar evidências. A revisão da divisão acima é o ponto humano de to-tickets; não é nova aprovação de ferramentas ou permissão para tarefas reversíveis.
