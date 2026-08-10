# Diretrizes de Contribuição (Contributing Guidelines)

Obrigado pelo interesse em contribuir com o desenvolvimento do portfólio e ecossistema do **Kauê Ruon Cardoso**!

## 🌿 Estratégia de Branches

- `main`: Branch estável de produção.
- `dev`: Branch de integração de desenvolvimento.
- `feat/nome-da-feature`: Para desenvolvimento de novas funcionalidades.
- `fix/nome-do-bug`: Para correções pontuais de erros.

## 💬 Convenção de Commits (Conventional Commits)

Utilize mensagens de commit claras e padronizadas no formato:
`<tipo>(escopo): descrição curta no imperativo`

**Exemplos:**
* `feat(aevo): adiciona suporte a streaming de LLM no agente ÆVO`
* `fix(3d): corrige vazamento de memória no canvas WebGL ao redimensionar`
* `test(vitest): inclui caso de teste para o fallback RAG local`

## 🧪 Validação Local Antes de Criar Pull Request

Antes de enviar seu PR, certifique-se de executar e aprovar os seguintes comandos localmente:

```bash
# 1. Checagem de Tipos estrita
npx tsc --noEmit

# 2. Execução da suíte de testes Vitest
npm run test

# 3. Compilação do bundle de produção
npm run build
```
