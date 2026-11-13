# VECOM Ficha Fácil — mídia preparada

As imagens em `public/assets/projects/vecom/` foram capturadas em 13/11/2026 a partir do frontend real do repositório local `Vecom_ficha_nine/apps/web`, no commit `6a9e0ec90f9b71483699fa75850e1cec02b4f9c1`, executado em modo `test` com a autenticação de demonstração já prevista pelo próprio projeto. Nenhuma API externa, conta real, banco ou registro de cliente foi acessado ou alterado.

- `interface-desktop.png`: tela interna `DashboardPage` real, em 1440×1377 (captura full-page, viewport 1440×1000), com fixtures sintéticas (`Solicitante A`, `Marina Souza`, etc.) e o CSS oficial do produto.
- `interface-mobile.png`: formulário público `ClientFormPage` real, em 390×1907 (captura full-page, viewport 390×844), rota de demonstração `/ficha/demo-vecom`, com valores vazios e indicação visual de demonstração.
- `interface-desktop-device.png` e `interface-mobile-device.png`: recortes de viewport capturados diretamente pelo navegador, sem edição de imagem, para uso em molduras de notebook/celular.
- `logo-ficha-facil.png` e `logo-symbol.png`: assets de marca já presentes em `apps/web/public/brand/vecom`.

Essas capturas representam a interface do produto e podem ser usadas dentro da composição 2.5D do case. A cópia deve permanecer identificada como interface preparada com dados sintéticos; não usar screenshots operacionais fornecidos pelo cliente.

## Regeneração local

1. Copiar somente `apps/web/src`, `apps/web/public` e `apps/web/index.html` para um diretório temporário dentro do workspace.
2. Usar uma configuração Vite mínima com `@vitejs/plugin-react` e alias `@vecom/domain/src` apontando para `packages/domain/src`.
3. Iniciar `vite --mode test --host 127.0.0.1 --port 4177`.
4. Com Playwright Chromium, abrir `/` para o dashboard interno e `/ficha/demo-vecom` para o formulário público. Capturar full-page e viewport nos tamanhos acima.

O modo `test` ativa exclusivamente o ator e fixtures sintéticos definidos no `AuthProvider` e nos testes do próprio frontend.
