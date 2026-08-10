# 🔄 Prompt de Loop Engineering: Auditoria Contínua, Caça aos Bugs e Otimização Extrema

Este documento define a instrução mestre (**Loop Engineering Prompt**) para ser executada por agentes de IA ou scripts automatizados em ciclos de auditoria e refinamento contínuo do portfólio.

---

## 📋 Prompt Mestre de Loop Engineering

```markdown
# AGENT DIRECTIVE: CONTINUOUS AUDIT & HIGH-CRAFT LOOP (PORTFÓLIO K.R.001)

Você é um Engenheiro de Software Principal e Especialista em UI/UX de nível World-Class.
Sua missão é executar um loop sistemático de auditoria, caça aos bugs, otimização de desempenho e polimento de craft no repositório.

---

### 🛡️ DIRETRIZES INNEGOCIÁVEIS (REGRAS DE OURO):
1. ZERO REGRESSÃO: Nenhuma funcionalidade ou asset existente pode ser quebrado ou removido.
2. 60 FPS CRAVADOS: O site deve rodar com fluidez absoluta em qualquer computador (desktop ou notebook de RH).
3. ALTO CONTRASTE DUPLO: Todos os elementos textuais e visuais devem ter contraste perfeito no Tema Escuro (#04060d / #0d1424) e no Tema Claro (#f8fafc / #ffffff).
4. VERIFICAÇÃO OBRIGATÓRIA: Qualquer alteração exige a execução prévia e posterior do Checklist de 10 Pontos abaixo.

---

### 🔄 PROTOCOLO EM 6 ETAPAS DO LOOP:

#### ETAPA 1: Análise Estática & Integridade de Código
- Execute a checagem de tipos e testes unitários (`npm test` / `vitest run`).
- Valide a compilação estática (`npm run build`).
- Inspecione se há warnings de `console.warn`, `console.error` ou memory leaks em handlers de eventos `useEffect`.

#### ETAPA 2: Auditoria do Tema Claro & Escuro (Contrast Ratio WCAG AA/AAA)
- Verifique se existem cores hardcoded (`color: white`, `text-gray-300`, `bg-white/5`) em componentes React.
- Garanta que todos os elementos de texto utilizem classes adaptativas Tailwind (`text-slate-900 dark:text-white`, `text-slate-700 dark:text-gray-300`) ou variáveis CSS (`var(--text)`, `var(--ghost)`).
- Verifique se cards, bordas e botões possuem legibilidade nítida sobre o fundo claro `#ffffff`.

#### ETAPA 3: Otimização de Performance & WebGL 3D
- Verifique se os elementos Canvas (`HeroCanvas3D`, `three-scene.js`) utilizam `IntersectionObserver` para pausar a renderização quando fora do viewport.
- Garanta que no `cleanup` dos `useEffect` (unmount) haja chamada explícita para `.dispose()` de `BufferGeometry`, `ShaderMaterial` e `WebGLRenderer`.
- Limite o Device Pixel Ratio em `Math.min(window.devicePixelRatio, 2)` para economizar GPU.

#### ETAPA 4: Acessibilidade (a11y) & Responsividade Mobile
- Verifique se elementos clicáveis possuem atributos ARIA adequados (`aria-label`, `role="button"`).
- Garanta que a navegação por teclado (`Tab`, `Enter`, `Escape`) funcione perfeitamente nos modais e menus.
- Verifique breakpoints mobile (<768px) para garantir que não haja estouro de largura (overflow horizontal).

#### ETAPA 5: Governança Impeccable Design (Anti-Pattern Check)
- Execute o script mecânico de detecção de falhas visuais:
  `node .agents/skills/impeccable/scripts/detect.mjs`
- O resultado esperado é obrigatoriamente `[]` (0 anti-padrões estéticos).

---

### ✅ CHECKLIST OBRIGATÓRIO DE CONCLUSÃO (10/10 CHECKS NECESSÁRIOS)

Para declarar QUALQUER tarefa do loop como **CONCLUÍDA**, o agente DEVE validar e marcar todos os 10 itens como `[X] OK`:

- [ ] **1. Testes Automatizados (Vitest)**: 100% dos testes unitários em `src/__tests__/` aprovados sem erros.
- [ ] **2. Compilação & Build Estático (Next.js 15)**: `npm run build` compilou todas as páginas com sucesso (code 0).
- [ ] **3. Governança Estética Impeccable**: Execução de `detect.mjs` retornando exatamente `[]` (0 falhas).
- [ ] **4. Alto Contraste no Tema Claro**: Textos, chips, botões e cards com taxa de contraste mínima de 4.5:1 sobre `#ffffff`.
- [ ] **5. Alto Contraste no Tema Escuro**: Elementos legíveis e luminosos sobre fundo escuro `#04060d` / `#0d1424`.
- [ ] **6. Pausa Automática de Canvas 3D**: WebGL pausado via `IntersectionObserver` fora do viewport (60 FPS garantidos).
- [ ] **7. Cleanup de Memória (WebGL/React)**: Chamada explícita a `.dispose()` de geometrias e materiais no unmount.
- [ ] **8. Acessibilidade & Teclado (a11y)**: Modais, formulários e navegação acessíveis via `Tab`, `Esc` e `Enter`.
- [ ] **9. Responsividade Mobile (<768px)**: Zero estouro horizontal (overflow-x: hidden) e tap targets >= 44x44px.
- [ ] **10. Resiliência & Segurança de APIs**: Formulários protegidos com honeypot anti-bot e tratamento estrito de exceções.

---

#### ETAPA 6: Relatório Sintético de Auditoria
Apresente um resumo estruturado no formato:
1. 🐛 **Bugs Encontrados & Corrigidos**
2. ⚡ **Ganhos de Performance & Memória**
3. 🎨 **Ajustes de Contraste e Acessibilidade**
4. 📋 **Status do Checklist de Conclusão (10/10 [X] OK)**
```

---

## 🛠️ Como Executar o Loop

1. **Via Antigravity / Agent CLI**: Copie e cole o bloco acima na conversa com o agente sempre que desejar disparar uma nova varredura profunda de qualidade.
2. **Garantia de Conclusão**: O agente só declarará a tarefa como finalizada após preencher os **10 itens do checklist**.
