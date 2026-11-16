# H01 — primeira fatia para teste de Kauê

Implementação local de #89 e piloto visual de Competências. A base de ondas SVG pode ser reutilizada nas próximas fatias, mas somente Competências a utiliza nesta entrega. Nenhuma alteração no rodapé, hero, introdução, vitrine ou páginas dos cases. H02 continua dependente de teste/aceite de Kauê; a continuidade animada de todas as seções ainda não está entregue. Sem publicação em produção.

Referência: `../por-secao/competencias-direcao-escolhida.png`. A hierarquia conserva os grupos e dados atuais; ícones em pequenas placas, ferramentas ao lado da aplicação em desktop, ordem explicação/evidência/ferramentas no celular. Antes da correção, a primeira descrição começava em y263,7 e suas ferramentas em y419,1 no mesmo desktop. Depois, ambas em y135,8. A linha decorativa agora tem posição absoluta e não ocupa célula de conteúdo.

As duas ondas são quatro paths vetoriais, sem download de imagem, blur, listener de mouse, motor novo ou loop permanente. A rolagem controla suavemente planos separados durante a passagem pela seção. Grupos têm entrada curta própria; texto não é ocultado. Reutiliza o escopo existente: fora da viewport, aba oculta, mudança de preferência, desmontagem e troca de idioma cancelam efeitos. Mobile reduz a amplitude. Nas bordas, a máscara dissipa as ondas na superfície atual para evitar uma linha dura de seção. As seções vizinhas permanecem no estágio anterior.

Também corrigidos metadados/compartilhamento/JSON-LD com a apresentação confirmada e nomes acessíveis de navegação/tema no idioma ativo. Sem cargos formais, vínculos presumidos ou premiação tratada como formação.

## Evidência e condições

Chrome instalado, automação headless no Windows, emulação de viewport (não celular físico), servidor local Next em desenvolvimento, 16/11/2026.

- `matrix.json`: 390/768/1440/1920 × PT/EN × claro/escuro. Sem overflow horizontal; explicação e ferramentas na mesma linha desktop e ordem vertical íntegra mobile. JSON-LD renderizado sem vínculo/alumni inventado.
- `competencias-1440.png` e `competencias-390.png`: confirmação final após corrigir a visibilidade da curva superior direita. Imagem mobile com movimento reduzido.
- `competencias-scroll.webm`: rolagem da página real e transição para composição de repouso, depois redução de movimento e viewport mobile. Não é uma encenação de imagem isolada.
- `motion.json`: transformações distintas durante scroll; 0 callbacks RAF da aplicação em 700ms parado após assentamento; 0 animações ativas em Competências após reduced motion. Testes existentes cobrem cancelamento, pausa e retomada do escopo.
- 37 testes pertinentes passaram, incluindo a regressão de navegação/SEO adicionada em red/green. TypeScript e build Next passaram; 23 páginas geradas. O teste no navegador do grid reproduziu o defeito antes da correção.

## Desempenho: amostra, não garantia

`performance-sample.json`: comparação serial com a base local na porta3070 e candidato na3072, mesmo Chrome/viewport1440×1000, CPU4x, percurso normalizado de 3,5s pela seção, sem gravar vídeo simultaneamente. Base:200 frames,1 intervalo>34ms,p95 de16,8ms,1 tarefa longa de62ms. Candidato:199 frames,1 intervalo>34ms,p95 de33,1ms,0 tarefas longas. Ambos com CLS0 durante a amostra. Contagens próximas, mas p95 pior no candidato; não há ganho de desempenho demonstrado. Uma primeira amostra concorrente com gravação foi descartada por contenção. Uma amostra de desenvolvimento e CPU simulada não homologam fluidez em hardware físico ou Core Web Vitals. Confirmar sensação de movimento no preview e reduzir efeitos se necessário antes do aceite.

Preview local enquanto o servidor estiver ativo: `http://localhost:3072/pt-BR#skills` e `/en-US#skills`. Preview remoto, SHA de deploy e aceite de Kauê permanecem etapas de integração; estas evidências não os substituem.
