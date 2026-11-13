# Planejamento visual dos cinco cases — v1

12/11/2026. [Especificação completa](spec.md). Novas alterações na interface ficam pausadas até revisar o conjunto visual e detalhar os storyboards escolhidos.

Publicada como [issue #75](https://github.com/Kauerc10/Portifolio-K.R.001/issues/75), com ready-for-agent. As imagens estão organizadas localmente neste pacote; não foram anexadas ao GitHub.

## Índice e legendas

**Conjunto aprovado:** Kauê aprovou VECOM e Atlas v3, somando-se a VioDigital, DocFácil e CKF. Vídeo, 2.5D ou combinação serão avaliados posteriormente na prova de movimento, sem alterar a direção visual aceita.

**Direção mais recente:** [revisão v3](../v3/README.md) — VECOM recupera notebook/celular/pasta da primeira versão, com referência da captura oficial. Atlas recupera documentos, camadas e evolução dos recortes selecionados, sem o tablet/fundo comercial dominante. V2 fica como histórico.

**Revisão do usuário:** VioDigital, DocFácil e CKF aprovados. VECOM aceita com pedido de polimento na home; Atlas mantém documentos/Formatador e pede novo ambiente mais cartorário. Consulte a [revisão v2](../v2/README.md). As novas imagens v2 aguardam avaliação; os estados iniciais da tabela abaixo são históricos.

| Case | Imagem | Legenda e estado |
|---|---|---|
| VioDigital | [Documento e continuidade](imagens/01-viodigital.png) | Home → expansão do documento → abertura do case. Estética aprovada anteriormente. [Quatro pranchas completas](../../storyboards/viodigital/v1/README.md). |
| VECOM Ficha Fácil | [Pasta e fichas](imagens/02-vecom.png) | 1: prévia com fichas entrando na pasta; 2: abertura com painel e jornada pública; 3: cadastro/conferência/atendimento e versão compacta. Proposta aguardando revisão. |
| Atlas Notarial | [Bancada e evolução](imagens/03-atlas.png) | 1: documento e bancada; 2: página própria; 3: rotina → primeira ferramenta → produto e celular. Proposta aguardando revisão. |
| DocFácil | [Corujinha e documento](imagens/04-docfacil.png) | 1: pergunta/documento/mascote; 2: experiência guiada no case; 3: escolha/resposta/revisão e celular. Proposta aguardando revisão. |
| CKF Manutenção | [Site e sistema](imagens/05-ckf.png) | 1: prévia das duas frentes; 2: case com entregas equilibradas; 3: narrativas independentes e celular em sequência. Proposta aguardando revisão. |

As três cenas em cada nova prancha representam enquadramentos complementares. O detalhamento de movimento de cada direção escolhida virá antes da implementação. As legendas externas pertencem ao material de planejamento.

## Pontos para a revisão visual

- Avaliar a personalidade de cada objeto e o equilíbrio do conjunto: evitar repetir plintos e folhas grandes em excesso.
- No VECOM, preservar contraste entre a pasta azul e o painel sem depender de hardware de notebook/celular.
- No Atlas, tornar evidente que o produto surgiu do problema das procurações e do Formatador de Veículos. A evolução é história confirmada, sem números inventados.
- No DocFácil, validar a pose da coruja com o asset original; a versão gerada é referência de gesto e enquadramento. Não substituir a marca real pela tipografia recriada pelo gerador.
- Na CKF, a linha entre site e sistema é composição gráfica; não afirma integração funcional. Os textos de impacto nas imagens devem virar descrição factual na versão final.
- As interfaces destas pranchas são reconstruções ilustrativas. Depois substituí-las por capturas reais preparadas. Não usar selos, números ou textos recriados como comprovação.
- Fundos e apresentação interna podem receber vídeo; texto, ações e continuidade do objeto permanecem independentes. Nenhum vídeo final foi produzido nesta fase.

## Organização e procedência

- imagens/: cinco pranchas reunidas; Vio é cópia de referência já produzida.
- prompts/: instruções integrais das quatro novas gerações.
- manifesto.json: ferramenta, origem, dimensões, hashes e estado de revisão.
- Referências de produto: [índice dos originais locais](../../referencias-estilo-projetos/README.md). Originais operacionais permanecem fora do Git.
- Referência pessoal comum: [storyboard Vio aprovado](../../storyboards/viodigital/v1/README.md).

## Continuação

Revisar estas imagens → detalhar estados e roteiros aprovados → dividir em tickets com dependências → implementar fundação e cases em fatias. A prova local do Vio fica preservada como aprendizado; não representa o case final.
