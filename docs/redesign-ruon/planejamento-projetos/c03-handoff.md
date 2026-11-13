# C03 — VioDigital pronto para teste final desta fatia

Integrado na PR #86 em 268d6014ee0205b6c25b91c20abdbca97e1eb833. C02 aprovado e encerrado; manter #78 aberto enquanto aguarda revisão manual de Kauê. Nenhum outro case foi iniciado.

## Fechamento

- Preservados história, contribuição e créditos já aprovados, distinguindo Vio/SERPRO e VioDigital.
- Documento EXEMPLO, QR decorativo e camadas nativas identificados em manifesto versionado. Mantida a composição 2.5D e o objeto compartilhado na passagem para o case.
- Decisão de mídia registrada: as camadas atendem à sequência reversível aprovada; vídeo pode complementar futuramente, sem alegar produção ou comparação de vídeos inexistentes.
- Galeria trata falhas mesmo quando o erro ocorre antes da hidratação React; dimensões e legendas continuam disponíveis. Há acesso direto às capturas sem JavaScript.
- Canonical, hreflang e Open Graph próprios para o case; sitemap inclui VioDigital PT/EN, sem publicar rotas vazias de outros projetos.

## Evidências

- 74 testes em 18 arquivos passando; TypeScript e build de produção aprovados.
- Navegador: metadados nas duas línguas, sitemap, composição desktop/celular, pausa e reversão no desktop, ausência de overflow e erros de página.
- Imagens bloqueadas em PT/EN: mensagem de indisponibilidade, quadro preservado e ausência de elementos interativos aninhados.
- Falha de imagem dentro do modal: fechamento por Escape devolve foco a um controle da galeria.
- JavaScript desativado: links para abrir capturas diretamente.
- Jornada complementar: retorno pelo link e histórico, nova aba, inglês, storage bloqueado, movimento reduzido e persistência do tema escuro.
- Relatórios, capturas e gravações em [evidence/c03-viodigital](../evidence/c03-viodigital/results.json). A primeira falha detectada na prova de mídia foi corrigida antes desta entrega.

## Testar

1. Abrir http://localhost:3064/pt-BR#project-viodigital e entrar no projeto.
2. Conferir a história e percorrer a animação.
3. Abrir/fechar as capturas e testar os links da aplicação e código.
4. Voltar para a home, também pelo histórico.

A aparência principal deve continuar como aprovada. Esta fatia fecha o Vio usando as camadas atuais; não produz um vídeo novo nem muda a direção dos demais cases. Aguardar o retorno de Kauê antes de seguir para VECOM.
