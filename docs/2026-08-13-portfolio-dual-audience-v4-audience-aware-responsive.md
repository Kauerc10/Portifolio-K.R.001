# Portfólio Dual-Audience V4 — Comercial + Carreira com Responsive Strategy por Audiência

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir `kaueruon.dev` para um portfólio dual-audience que converta clientes de freelas e, ao mesmo tempo, continue servindo como prova técnica forte para recrutadores e Tech Leads, sem perder as funções atuais. A estratégia responsiva deve variar por superfície: comercial mobile-first, carreira desktop-first e home híbrida/adaptativa, mantendo todas as experiências funcionais, dinâmicas, acessíveis e coerentes em qualquer dispositivo.

**Architecture:** Manter uma única aplicação Next.js com identidade, dados, cases e infraestrutura compartilhados, mas aplicar uma estratégia responsiva consciente do público. A home (`/[locale]`) funciona como superfície híbrida/adaptativa; a área comercial (`/[locale]/servicos`) é mobile-first e otimizada para toque, velocidade e conversão; a área profissional (`/[locale]/carreira`) é desktop-first e otimizada para exploração técnica, densidade e avaliação. Os cases usam a mesma base de dados, mas podem adotar apresentação `commercial`, `engineering` ou `hybrid` conforme o projeto. Interações pesadas, 3D e ÆVO permanecem como progressive enhancement e nunca bloqueiam conteúdo ou ações críticas.

**Tech Stack:** Next.js 15.x App Router, React 19, TypeScript 5.7, Tailwind CSS 3.4, CSS existente, Vitest, React Testing Library, Three.js, GSAP, Framer Motion, i18n `pt-BR` / `en-US`, APIs existentes do portfólio e Vercel.

---

## Global Constraints

- Preservar o domínio principal `https://kaueruon.dev`.
- Não transformar o projeto em dois sites separados.
- Não remover ÆVO, tema claro/escuro, i18n, currículo, formulário, GitHub Live Stats, easter eggs ou identidade visual sem substituição funcional equivalente.
- Não executar upgrade de Next.js/React junto desta reformulação. O `package.json` atual usa Next.js `^15.1.7` e React `^19.0.0`; qualquer upgrade deve ser PR separado.
- Atualizar documentação que hoje declara Next.js 16 para refletir a versão real antes de qualquer futura migração.
- `pt-BR` e `en-US` devem permanecer equivalentes estruturalmente. `src/i18n/types.ts` já força o dicionário inglês a satisfazer a estrutura do português.
- **Responsive Strategy por audiência, não uma regra global única.**
  - `home`: híbrida/adaptativa, equilibrando riqueza de desktop com leitura e ação rápidas no mobile;
  - `servicos`: **mobile-first**, porque visitantes de cartão, WhatsApp, Instagram, indicação e busca local tendem a chegar pelo celular;
  - `carreira`: **desktop-first**, porque recruiters e Tech Leads tendem a avaliar com maior profundidade em notebook/desktop;
  - cases `business`: mobile-first responsive;
  - cases `engineering`: desktop-first responsive;
  - cases `both`: híbridos/adaptativos.
  Em todas as superfícies, nenhuma função essencial pode depender exclusivamente de hover, cursor customizado, WebGL ou tela larga.
- Todo CTA deve funcionar com teclado, toque e ponteiro.
- Respeitar `prefers-reduced-motion`.
- Conteúdo essencial deve existir no HTML inicial e continuar utilizável mesmo se scripts de animação falharem.
- Nenhuma claim comercial deve inventar resultados, clientes, métricas ou depoimentos.
- Diferenciar claramente “projeto pessoal/open source”, “cliente/empresa”, “em produção” e “case técnico”.
- Não apresentar “K-HUB Soluções” como pessoa jurídica ou entidade formal no site enquanto a marca/jurídico não estiver definido; usar a marca pessoal de Kauê como publisher padrão.
- Manter URLs existentes sempre que possível e adicionar redirects quando uma URL pública mudar.
- Imagens de projeto devem ter dimensões estáveis, `alt` útil e `next/image` quando aplicável.
- Conteúdo comercial deve falar primeiro em problema, resultado e processo; stack entra como evidência secundária.
- Conteúdo de carreira deve priorizar escopo, decisões de engenharia, arquitetura, testes, segurança, integrações e código verificável.
- Não reescrever tudo em um único PR. Cada fase abaixo deve terminar em software funcional, revisável e deployável.

---

## Responsive Strategy definitiva

Este documento substitui qualquer diretriz anterior que tratava o projeto inteiro como `mobile-first` ou `desktop-first`.

A regra oficial da V4 é:

```text
HOME       → HYBRID / ADAPTIVE
SERVIÇOS   → MOBILE-FIRST
CARREIRA   → DESKTOP-FIRST
CASE B2B   → MOBILE-FIRST RESPONSIVE
CASE TECH  → DESKTOP-FIRST RESPONSIVE
CASE BOTH  → HYBRID / ADAPTIVE
ÆVO        → CONTEXT-AWARE
```

Essa matriz deve prevalecer em caso de conflito com trechos antigos do plano.

---

# 1. Estado atual verificado

## 1.1 Estrutura da home

A home atual monta, nesta ordem:

1. Navbar
2. Hero
3. Sobre
4. Experiência
5. Skills
6. Conquistas
7. Formação
8. Projetos
9. Contato
10. Konami modal
11. Footer

Essa ordem favorece autobiografia antes de prova. A nova ordem deve favorecer **entendimento → prova → solução → profundidade**.

## 1.2 Hero atual

O hero hoje tem:
- greeting técnico;
- nome em três linhas;
- typewriter;
- CTA “Ver projetos”;
- CTA “Currículo”.

Isso funciona para recrutamento, mas não explica com rapidez suficiente a proposta comercial.

## 1.3 Projetos atuais

Os cases já possuem a estrutura conceitual correta:
- problema;
- solução/impacto;
- stack;
- status;
- demo/repositório quando disponível.

Os principais cases atuais são:
- DocFácil;
- Atlas Notarial;
- CKF Manutenção;
- Foli.

O problema é principalmente de apresentação: os cards são textuais e não possuem hierarquia visual suficiente para público comercial.

## 1.4 Contato atual

O formulário usa linguagem notarial (“Requerente”, “Exposição dos fatos”, “Protocolar Solicitação”). A personalidade é boa como detalhe, mas deve deixar de competir com a ação principal.

## 1.5 Performance/interações atuais

O layout carrega:
- loader visual;
- Three.js;
- GSAP;
- ScrollTrigger;
- Lenis;
- custom cursor;
- cursor trail;
- scripts próprios;
- ÆVO.

A nova arquitetura deve preservar a experiência, mas reduzir dependência de `beforeInteractive` e impedir que efeitos bloqueiem leitura/CTA.

---

# 2. Resultado desejado

## 2.1 Três entradas, uma marca

### `/[locale]`
Home híbrida.

Objetivo:
- explicar em poucos segundos o que Kauê constrói;
- provar com trabalhos reais;
- permitir que visitante se identifique como cliente ou avaliador técnico;
- encaminhar para `/servicos`, `/carreira` ou cases.

### `/[locale]/servicos`
Superfície comercial.

Objetivo:
- transformar visitantes vindos de cartão, WhatsApp, indicação e prospecção em conversa qualificada;
- explicar soluções, processo, tipos de projeto e evidências;
- CTA principal: WhatsApp / conversa;
- sem tabela de preços pública nesta fase.

### `/[locale]/carreira`
Superfície profissional.

Objetivo:
- reduzir tempo de avaliação para recruiter/Tech Lead;
- expor experiência, projetos, stack, decisões, GitHub, currículo e ÆVO;
- CTA principal: currículo / LinkedIn / GitHub / contato profissional.

### `/[locale]/projetos`
Índice completo de projetos.

### `/[locale]/projetos/[slug]`
Case study detalhado, reutilizável pelos dois públicos.


## 2.2 Experience modes

Definir uma linguagem de implementação explícita para impedir que o agente aplique a mesma estratégia responsiva em toda a aplicação:

```ts
export type ExperienceMode = 'hybrid' | 'commercial' | 'career';
```

Mapeamento padrão:

```ts
export const routeExperienceMode = {
  home: 'hybrid',
  services: 'commercial',
  career: 'career',
} as const;
```

Para cases:

```ts
export function getProjectExperienceMode(
  audience: ProjectAudience,
): ExperienceMode {
  if (audience === 'business') return 'commercial';
  if (audience === 'engineering') return 'career';
  return 'hybrid';
}
```

O `ExperienceMode` não deve criar dois temas ou dois sites. Ele serve para orientar:
- densidade;
- tipo de navegação;
- carga visual;
- prioridade touch vs pointer/keyboard;
- comportamento de motion;
- posição e persistência de CTAs;
- quantidade de informação simultânea;
- estratégia de carregamento de efeitos.


---

# 3. Princípios de UX

## 3.0 Estratégia responsiva por audiência

### Home: `hybrid`

A home deve funcionar muito bem nos dois contextos:
- no desktop, preservar impacto visual, atmosfera, 3D e exploração;
- no mobile, priorizar entendimento, prova e navegação sem demora;
- não deve parecer nem uma landing comercial genérica nem um currículo técnico puro.

### Serviços: `commercial`

A área comercial é **mobile-first**.

Prioridades:
1. velocidade de compreensão;
2. toque;
3. prova visual;
4. CTA de WhatsApp;
5. leitura curta;
6. conversão;
7. performance em rede móvel.

Desktop deve enriquecer a composição com mais espaço, imagens maiores e motion mais elegante, sem alterar a lógica comercial.

### Carreira: `career`

A área de carreira é **desktop-first**.

Prioridades:
1. densidade técnica organizada;
2. exploração de cases;
3. GitHub/currículo;
4. arquitetura;
5. timeline/experiência;
6. navegação por teclado/pointer;
7. microinterações e efeitos mais ricos.

No mobile, todas as informações e ações continuam disponíveis, porém reorganizadas em fluxo linear, expansões/accordions quando fizer sentido e navegação touch-friendly.

### Regra fundamental

**Prioridade diferente não significa qualidade diferente.**
- Comercial no desktop continua premium.
- Carreira no mobile continua completa.
- O que muda é a ordem das decisões de design e performance.


## 3.1 Primeira viewport

Em até uma viewport o usuário deve conseguir responder:

1. Quem é?
2. O que faz?
3. O que já construiu?
4. Qual caminho devo seguir?
5. Como entro em contato?

Não colocar:
- stack extensa;
- badges demais;
- métricas decorativas;
- texto autobiográfico longo;
- loader bloqueante.

## 3.2 Progressive disclosure

A página deve oferecer camadas:

**Camada 1:** proposta e prova rápida.  
**Camada 2:** projetos e soluções.  
**Camada 3:** detalhes técnicos.  
**Camada 4:** carreira, arquitetura, GitHub, currículo.

Assim um empresário não precisa ler engenharia de providers, mas um Tech Lead consegue chegar nela em poucos cliques.

## 3.3 Preservar identidade

Manter:
- dark-first;
- tipografia Syne/Inter/JetBrains Mono;
- linguagem visual notarial/cyber;
- dourado/acento existente;
- textura/noise;
- elementos 3D;
- easter eggs.

Reduzir o “cartório” em labels operacionais. Exemplo:

**Antes:** `DAS EVIDÊNCIAS DE PROJETO`  
**Depois:** `Projetos` com “Anexo II” como detalhe visual secundário.

## 3.4 Sem armadilhas de navegação

- Logo sempre leva ao topo da superfície atual.
- Links de navegação devem ser URLs reais quando representam páginas reais.
- Anchors só para seções na mesma página.
- Mobile menu fecha ao navegar.
- Estado ativo deve ser derivado de pathname e, apenas na home, IntersectionObserver para seções.
- Back/forward do navegador deve funcionar naturalmente.
- Não manipular histórico manualmente sem necessidade.

---

# 4. Arquitetura de conteúdo

## 4.1 Home nova

Ordem recomendada:

1. `GlobalHeader`
2. `DualAudienceHero`
3. `AudienceRouter`
4. `ProofStrip`
5. `FeaturedWork`
6. `SolutionsPreview`
7. `EngineeringPreview`
8. `ProcessPreview`
9. `AboutCompact`
10. `AevoInvitation`
11. `ContactCTA`
12. Footer

### Hero proposto

**H1 pt-BR:**  
`Do problema ao software em produção.`

**Supporting:**  
`Sites, sistemas e automações para empresas. Produtos full-stack, integrações e IA para resolver processos reais.`

**CTA 1:** `Conversar sobre um projeto`  
**CTA 2:** `Ver trabalhos`

**Context line:**  
`Desenvolvedor Full-Stack · Blumenau/SC · Projetos e oportunidades profissionais`

Não usar “AI Engineer” como mensagem principal da home. IA permanece como capacidade/diferencial.

## 4.2 Audience Router

Dois caminhos:

### Tenho um projeto ou negócio
Texto:
`Sites, sistemas, automações e soluções digitais pensadas a partir do problema.`

CTA:
`Conhecer soluções`

Destino:
`/[locale]/servicos`

### Estou avaliando seu perfil técnico
Texto:
`Projetos, arquitetura, experiência, GitHub, stack e currículo.`

CTA:
`Ver perfil profissional`

Destino:
`/[locale]/carreira`

Não usar modal. Não exigir seleção. É um atalho, não um gate.

## 4.3 Proof Strip

Usar apenas fatos verificáveis, por exemplo:
- `Sistemas em produção`
- `Projetos para empresas`
- `Open source`
- `APIs & automação`

Evitar contadores inventados.

## 4.4 Comercial

### Soluções
Três pilares:

#### Sites & presença digital
- site institucional;
- landing page;
- portfólio/catálogo;
- SEO local básico;
- conversão para WhatsApp.

#### Sistemas sob medida
- painéis internos;
- gestão de clientes/orçamentos;
- fluxos operacionais;
- autenticação e permissões;
- relatórios/exportações.

#### Automação & IA
- tarefas repetitivas;
- integrações de APIs;
- geração/organização de documentos;
- assistentes e LLMs quando agregarem valor;
- automações orientadas a processo.

### Processo comercial
1. Entender
2. Planejar
3. Construir
4. Validar
5. Entregar
6. Evoluir

Mensagem:
`Antes de falar em tecnologia ou preço, eu prefiro entender o problema e o fluxo atual.`

## 4.5 Carreira

Ordem recomendada:

1. Hero profissional
2. Highlights técnicos
3. Projetos em destaque
4. Experiência
5. Stack/competências
6. Open source
7. Formação/conquistas
8. GitHub live stats
9. ÆVO
10. Currículo / contato

### Hero carreira

**H1:** `Full-Stack Developer com foco em produtos, automação e IA aplicada.`

Texto:
`Construo e integro aplicações web, APIs, bancos de dados e fluxos com IA, com foco em problemas reais, qualidade e entrega.`

CTAs:
- `Baixar currículo`
- `Ver GitHub`
- `Ver projetos`

## 4.6 Sobre

Remover formulação:
`Não escrevo código do zero linha por linha...`

Substituir por:
`Uso IA generativa como parte do meu processo de engenharia para acelerar pesquisa, prototipagem, implementação e revisão. Meu foco está em decompor problemas, definir arquitetura, validar decisões, integrar as partes e garantir que o produto funcione como sistema completo.`

A IA deve aparecer como multiplicador de engenharia, não como substituto de capacidade.

---

# 5. Arquitetura de projetos/cases

## 5.1 Fonte única de dados

Criar:

`src/content/projects.ts`

Interface:

```ts
export type ProjectAudience = 'business' | 'engineering' | 'both';
export type ProjectKind = 'client' | 'internal' | 'product' | 'open-source';

export interface ProjectMetric {
  label: string;
  value: string;
  source?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  type: 'demo' | 'repo' | 'case' | 'external';
}

export interface PortfolioProject {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  audience: ProjectAudience;
  kind: ProjectKind;
  status: string;
  client?: string;
  stack: string[];
  capabilities: string[];
  metrics: ProjectMetric[];
  screenshots: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  links: ProjectLink[];
  featured: boolean;
  order: number;
}
```

Não duplicar informações de projetos dentro de componentes e JSONs de idioma.

Para conteúdo localizado, criar estrutura equivalente em:

`src/content/projects/pt-BR.ts`  
`src/content/projects/en-US.ts`

e manter dados não textuais compartilhados em `src/content/projects/data.ts`.

## 5.2 Taxonomia

### Trabalhos / negócio
Priorizar:
- CKF sistema de orçamentos;
- CKF institucional, se pronto e publicável;
- Staloch Media, se autorizado/publicável;
- Atlas como automação real, sem expor conteúdo privado.

### Engenharia/produto
- DocFácil;
- Foli;
- Mermaid Lint;
- Atlas case study;
- demais projetos fortes quando maduros.

## 5.3 Card visual

Todo card de destaque deve ter:

- screenshot;
- título;
- uma frase de impacto;
- problema;
- resultado/solução;
- tipo/status;
- 3–5 capacidades;
- CTA `Ver case`;
- CTA demo/repo apenas se aplicável.

Stack deve ser secundária visualmente.

## 5.4 Página de case

Rota:

`src/app/[locale]/projetos/[slug]/page.tsx`

Estrutura:

1. Breadcrumb
2. Hero do case
3. Screenshot principal
4. Contexto
5. Problema
6. Objetivo
7. Meu papel
8. Solução
9. Arquitetura/decisões
10. Segurança e qualidade, quando relevante
11. Galeria
12. Resultado
13. Stack
14. Links
15. Próximo case
16. CTA adaptado:
   - client/both → `Tem um problema parecido? Vamos conversar.`
   - engineering → `Ver mais projetos / GitHub`

## 5.5 Privacidade

Cases de cliente/interno não devem:
- mostrar dados pessoais;
- mostrar credenciais;
- expor informações comerciais sensíveis;
- exibir prints com dados reais sem sanitização;
- publicar código privado.

---

# 6. Navegação

## 6.1 Desktop

Nova navbar:

`KRC | Trabalhos | Soluções | Sobre | Carreira | Contato | [CTA]`

CTA:
`Vamos conversar`

Regras:
- `Trabalhos` → `/[locale]/projetos`
- `Soluções` → `/[locale]/servicos`
- `Sobre` → `/#sobre` ou página futura, sem criar nova rota agora se não necessário
- `Carreira` → `/[locale]/carreira`
- `Contato` → `/#contato`
- CTA → `/[locale]/servicos#contato` ou WhatsApp conforme contexto

Tema e idioma continuam presentes, mas não podem competir com CTA.

## 6.2 Mobile

Criar menu drawer/sheet próprio, sem depender do script legado de burger. O mesmo componente base pode ser compartilhado, mas a hierarquia de links/CTA pode variar por `ExperienceMode`.

Comportamento:
- botão com `aria-expanded`;
- `aria-controls`;
- foco entra no menu;
- Escape fecha;
- foco retorna ao trigger;
- scroll do body bloqueado enquanto aberto;
- links com hit target mínimo de ~44px;
- seletor de idioma e tema no final;
- CTA comercial destacado;
- menu fecha ao mudar pathname.

Não implementar drawer com biblioteca nova se CSS/React simples resolver.

## 6.3 Sticky behavior

Navbar pode ficar sticky, porém:
- reduzir altura após scroll;
- sem blur exagerado;
- evitar layout shift;
- não cobrir headings ao navegar por anchor;
- definir `scroll-margin-top` nas seções.

---

# 7. Intenção comercial sem “personalização creepy”

Aceitar query opcional:

`?intent=business`  
`?intent=career`

Helper:

`src/lib/intent.ts`

```ts
export type VisitorIntent = 'business' | 'career' | null;

export function parseVisitorIntent(value: string | string[] | undefined): VisitorIntent {
  if (value === 'business' || value === 'career') return value;
  return null;
}
```

Uso:
- ajustar CTA secundário;
- priorizar bloco relevante;
- nunca esconder conteúdo;
- nunca redirecionar automaticamente;
- não persistir além da sessão nesta primeira versão.

Cartão pode futuramente apontar para:

`kaueruon.dev/pt-BR?intent=business&utm_source=business_card&utm_medium=offline`

Isso permite medir cartão sem criar site separado.

---

# 8. WhatsApp e conversão

## 8.1 CTA

Criar utilitário:

`src/lib/contact.ts`

```ts
export function buildWhatsAppUrl(message: string): string {
  const phone = '5547991370418';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

Mensagens contextuais:

Home:
`Olá, Kauê! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.`

Serviços:
`Olá, Kauê! Vi seus serviços e gostaria de explicar uma necessidade da minha empresa.`

Case:
`Olá, Kauê! Vi o case {nome} e tenho um problema parecido. Podemos conversar?`

## 8.2 Não substituir o formulário

Manter `/api/contato`.

Simplificar labels visíveis:
- Nome
- E-mail
- Assunto
- Mensagem

Manter referências notariais apenas como microcopy opcional.

## 8.3 CTA hierarchy

Comercial:
1. WhatsApp
2. Formulário
3. E-mail

Carreira:
1. Currículo
2. LinkedIn/GitHub
3. E-mail
4. Formulário

---

# 9. ÆVO

## 9.1 Preservar arquitetura existente

Não reescrever providers durante esta iniciativa.

## 9.2 Novo onboarding

Primeira interação com quatro atalhos:

- `Quero conversar sobre um projeto`
- `Quero conhecer o perfil técnico`
- `Explique um projeto`
- `Abrir currículo`

## 9.3 Intents

Adicionar ao modelo interno:

```ts
export type AevoVisitorMode = 'business' | 'career' | 'project' | 'general';
```

Business:
- linguagem acessível;
- perguntar problema/processo;
- não inventar orçamento;
- direcionar a conversa.

Career:
- falar arquitetura;
- stack;
- testes;
- decisões;
- links verificáveis.

## 9.4 Tool use

Preservar tools existentes e adicionar apenas se necessário:
- `navigate_to_route`
- `open_whatsapp`
- `open_project_case`

Todas com allow-list.

Nenhuma tool deve aceitar URL arbitrária fornecida pelo modelo.

---

# 10. Performance

## 10.1 Regra principal

**O conteúdo não pode esperar o espetáculo.**

## 10.2 Loader

Remover loader bloqueante da rota crítica.

Alternativa:
- conteúdo SSR aparece imediatamente;
- efeitos entram depois de hydration;
- se desejar manter assinatura visual, usar transição curta não bloqueante e sem `display:none` no conteúdo.

## 10.3 Third-party scripts

Revisar `layout.tsx`.

Hoje Three.js, GSAP, ScrollTrigger e Lenis são carregados globalmente.

Plano:
- mover libs para imports npm quando já instaladas;
- carregar cena 3D via componente client lazy/dynamic;
- importar apenas em superfícies que usam;
- adiar analytics e efeitos não críticos;
- evitar CDN + pacote npm duplicado.

Criar:

`src/components/effects/VisualEffects.tsx`

com dynamic imports controlados.

## 10.4 Performance por ExperienceMode

### `commercial`

Mobile é a referência de performance.

- não carregar cursor customizado;
- não carregar cursor trail;
- reduzir ou adiar WebGL se ele não contribuir diretamente para conversão;
- limitar partículas/DPR;
- priorizar imagem/prova/CTA;
- sticky CTA mobile permitido se não cobrir conteúdo;
- evitar efeitos que atrasem primeiro input;
- screenshots e hero assets devem ser otimizados agressivamente;
- WhatsApp deve estar disponível sem depender de hydration complexa.

No desktop, reintroduzir riqueza visual progressivamente, sem comprometer a lógica de conversão.

### `career`

Desktop é a referência visual.

- permitir cena 3D mais rica;
- permitir cursor customizado;
- permitir microinterações pointer/keyboard;
- permitir maior densidade;
- lazy-load painéis técnicos e módulos pesados;
- nunca impedir leitura inicial do hero/cases.

No mobile:
- remover apenas efeitos sem equivalente touch;
- reorganizar painéis e diagramas;
- manter conteúdo e ações;
- reduzir WebGL/DPR quando necessário;
- ÆVO, currículo, GitHub, cases e navegação permanecem integrais.

### `hybrid`

- conteúdo e CTAs antes de efeitos;
- desktop recebe riqueza visual adicional;
- mobile mantém atmosfera e dinamismo com carga menor;
- não privilegiar uma única estratégia em detrimento do outro contexto.

## 10.5 Motion preference

Hook:

`src/hooks/useReducedMotionPreference.ts`

ou usar `useReducedMotion` do Framer Motion quando já disponível.

Todos os efeitos devem respeitar.

## 10.6 Metas de experiência

Usar como budgets:

- LCP ≤ 2.5s no 75º percentil;
- INP ≤ 200ms;
- CLS ≤ 0.1;
- nenhum long task introduzido por efeitos decorativos no carregamento inicial;
- sem scroll jank perceptível em mobile.

Não exigir “nota Lighthouse 100” como critério rígido. Priorizar experiência e Core Web Vitals.

---

# 11. Responsividade orientada à audiência

Não existe uma única regra “mobile-first” ou “desktop-first” para todo o projeto.

## 11.1 Home / hybrid

Baseline de QA:
- desktop: validar impacto visual, equilíbrio, 3D e continuidade;
- mobile: validar entendimento em poucos segundos, CTA, projetos e navegação;
- nenhum dos dois deve parecer adaptação negligenciada.

## 11.2 Serviços / commercial

**Mobile-first.**

Breakpoints prioritários de concepção:
- 360 × 800
- 390 × 844
- 412 × 915

Depois expandir para:
- 768 × 1024
- 1366 × 768
- 1440 × 900
- 1920 × 1080

Regras:
- H1 curto;
- CTA principal visível cedo;
- WhatsApp touch-first;
- campos ≥ 16px;
- zero hover-only;
- conteúdo em fluxo vertical natural;
- screenshots grandes o suficiente para provar qualidade;
- texto escaneável;
- sticky CTA permitido, desde que discreto e não obstrutivo;
- desktop amplia composição sem “reprojetar” o funil.

## 11.3 Carreira / career

**Desktop-first.**

Breakpoints prioritários de concepção:
- 1366 × 768
- 1440 × 900
- 1920 × 1080

Depois adaptar para:
- 1024 × 768
- 768 × 1024
- 412 × 915
- 390 × 844
- 360 × 800

Regras desktop:
- pode usar layout editorial/painéis;
- timeline pode ser horizontal/vertical conforme conceito;
- arquitetura e GitHub podem ter maior densidade;
- pointer/keyboard enhancements são bem-vindos;
- atalhos e microinterações podem existir;
- hover nunca pode ser única forma de acesso.

Regras mobile:
- preservar todo conteúdo;
- transformar múltiplas colunas em sequência legível;
- diagrams devem ter versão responsiva/zoomável ou explicação textual;
- tabs devem aceitar swipe/touch apenas como extra, nunca como único controle;
- sidebars viram navegação inline/drawer;
- painéis densos podem usar disclosure acessível;
- currículo/GitHub/contato continuam fáceis de encontrar.

## 11.4 Cases

### `business`
Seguir `commercial`.

### `engineering`
Seguir `career`.

### `both`
Seguir `hybrid`.

## 11.5 Matriz completa de QA

Todos os modos precisam ser testados em:

- 320 × 568
- 360 × 800
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1366 × 768
- 1440 × 900
- 1920 × 1080

A diferença é a **ordem de projeto e fidelidade**, não a cobertura.

## 11.6 Regras universais

- H1 não pode cortar palavras essenciais.
- Nenhum conteúdo crítico abaixo de 14px.
- Inputs ≥ 16px em mobile.
- Nenhum hover-only reveal.
- `position: fixed` auditado com teclado mobile.
- ÆVO não pode cobrir CTA/inputs.
- respeitar safe areas com `env(safe-area-inset-*)`.
- nenhuma superfície pode gerar overflow horizontal acidental.
- informação essencial nunca pode desaparecer apenas para simplificar mobile.
- efeitos decorativos podem ser adaptados ou removidos por dispositivo.
- função, conteúdo e navegação não podem ser removidos.

---

# 12. Acessibilidade

## Requisitos

- um H1 por página;
- landmarks `header`, `nav`, `main`, `section`, `footer`;
- skip link;
- foco visível;
- contraste WCAG AA para texto funcional;
- ordem de tab lógica;
- ícones decorativos com `aria-hidden`;
- botões com nome acessível;
- menu mobile operável por teclado;
- modais/dialogs com foco controlado;
- formulários com `<label htmlFor>`;
- feedback de envio com `aria-live`;
- animações reduzidas com `prefers-reduced-motion`;
- não usar cor como único indicador;
- links externos identificáveis sem depender somente de ícone.

Criar testes RTL para navegação e menu.

---

# 13. SEO / GEO / metadados

## 13.1 Corrigir inconsistências

A base atual mistura Next.js 15 e 16 em documentação/metadados.

Não declarar versão do framework em description de SEO, pois envelhece rápido.

## 13.2 Títulos

Home pt-BR:
`Kauê Ruon Cardoso | Desenvolvedor Full-Stack em Blumenau`

Home en-US:
`Kauê Ruon Cardoso | Full-Stack Developer`

Serviços:
`Sites, Sistemas e Automação | Kauê Ruon Cardoso`

Carreira:
`Kauê Ruon Cardoso | Full-Stack Developer & AI Engineering`

## 13.3 JSON-LD

Home:
- `Person`
- `WebSite`

Carreira:
- `ProfilePage` com `mainEntity` Person.

Serviços:
- não inventar `LocalBusiness` sem estrutura empresarial compatível;
- Person pode oferecer `makesOffer`/`Offer` apenas se semanticamente correto e sem dados fictícios.

Projects:
- `CreativeWork` ou `SoftwareApplication` apenas quando conteúdo da página suportar.

## 13.4 Publisher

Usar `Kauê Ruon Cardoso` enquanto a marca comercial não tiver definição jurídica/marcária final.

## 13.5 Open Graph

Criar assets próprios:

`public/og/home-pt-BR.png`  
`public/og/home-en-US.png`  
`public/og/carreira-pt-BR.png`  
`public/og/servicos-pt-BR.png`

Não usar avatar do GitHub como OG principal.

## 13.6 Sitemap

Atualizar `src/app/sitemap.ts` para incluir:
- locale roots;
- serviços;
- carreira;
- projetos;
- cases públicos.

Teste deve validar quantidade e canonical.

---

# 14. Analytics e mensuração

Não adicionar vendor no primeiro PR se não existir solução aprovada.

Criar camada interna:

`src/lib/analytics/events.ts`

```ts
export type PortfolioEvent =
  | { name: 'audience_select'; audience: 'business' | 'career' }
  | { name: 'cta_whatsapp'; source: string }
  | { name: 'cta_resume'; source: string }
  | { name: 'project_open'; slug: string; source: string }
  | { name: 'project_demo'; slug: string }
  | { name: 'github_open'; source: string }
  | { name: 'contact_submit'; subject: string };
```

Interface:

```ts
export function trackEvent(event: PortfolioEvent): void {
  window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: event }));
}
```

Depois um adapter pode enviar para Vercel Analytics, GA4 ou outro vendor sem espalhar chamadas pelo site.

UTMs do cartão:
- `utm_source=business_card`
- `utm_medium=offline`
- `utm_campaign=local_prospecting`

---

# 15. Estrutura de arquivos proposta

```text
src/
  app/
    [locale]/
      page.tsx
      servicos/
        page.tsx
      carreira/
        page.tsx
      projetos/
        page.tsx
        [slug]/
          page.tsx
  components/
    layout/
      GlobalHeader.tsx
      MobileNavigation.tsx
      SkipLink.tsx
    home/
      DualAudienceHero.tsx
      AudienceRouter.tsx
      ProofStrip.tsx
      FeaturedWork.tsx
      SolutionsPreview.tsx
      EngineeringPreview.tsx
      ProcessPreview.tsx
      AboutCompact.tsx
      ContactCTA.tsx
    services/
      ServicesHero.tsx
      ServicePillars.tsx
      BusinessProof.tsx
      WorkProcess.tsx
      ServicesFAQ.tsx
      ServicesContact.tsx
    career/
      CareerHero.tsx
      CareerHighlights.tsx
      CareerExperience.tsx
      CareerSkills.tsx
      CareerOpenSource.tsx
      CareerEducation.tsx
      CareerContact.tsx
    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectHero.tsx
      ProjectGallery.tsx
      ProjectCaseBody.tsx
      ProjectCaseCTA.tsx
    effects/
      VisualEffects.tsx
      DesktopCursor.tsx
    ai/
      ...existing
  content/
    projects/
      data.ts
      pt-BR.ts
      en-US.ts
      index.ts
  lib/
    analytics/
      events.ts
    contact.ts
    intent.ts
    experience-mode.ts
  hooks/
    useReducedMotionPreference.ts
  __tests__/
    experience-mode.test.ts
    navigation.test.tsx
    home.test.tsx
    services.test.tsx
    career.test.tsx
    projects.test.tsx
    project-route.test.tsx
    contact.test.tsx
    seo.test.ts
```

Não mover componentes legados sem necessidade. Fazer migração progressiva.

---

# 16. Fases de implementação

## Task 1: Baseline, contratos e inventário regressivo

**Files:**
- Create: `docs/portfolio-v3/current-behavior.md`
- Create: `src/__tests__/portfolio-contract.test.tsx`
- Modify: `README.md`

**Produces:** baseline verificável do que não pode sumir.

- [ ] Registrar no documento todas as funções existentes: i18n, tema, ÆVO, currículo, formulário, projetos, stats, loader/effects, easter eggs.
- [ ] Escrever teste de contrato que confirme que a home continua contendo links/elementos fundamentais.
- [ ] Corrigir README para não afirmar Next.js 16 enquanto `package.json` usa 15.x.
- [ ] Rodar `npm test -- --run`.
- [ ] Rodar `npm run build`.
- [ ] Commit:
```bash
git add docs/portfolio-v3/current-behavior.md src/__tests__/portfolio-contract.test.tsx README.md
git commit -m "test: registrar contratos do portfolio atual"
```

## Task 2: Centralizar dados dos projetos

**Files:**
- Create: `src/content/projects/data.ts`
- Create: `src/content/projects/pt-BR.ts`
- Create: `src/content/projects/en-US.ts`
- Create: `src/content/projects/index.ts`
- Create: `src/__tests__/projects-data.test.ts`
- Modify: `src/components/sections/ProjetosSection.tsx`

**Produces:** `getProjects(locale)` e `getProjectBySlug(locale, slug)`.

Interfaces:

```ts
export function getProjects(locale: Locale): PortfolioProject[];
export function getProjectBySlug(locale: Locale, slug: string): PortfolioProject | undefined;
```

- [ ] Escrever testes de slugs únicos, links seguros e equivalência pt/en.
- [ ] Rodar testes e confirmar falha.
- [ ] Implementar tipos e dados.
- [ ] Migrar `ProjetosSection` para consumir fonte única sem alterar visual ainda.
- [ ] Rodar testes.
- [ ] Build.
- [ ] Commit:
```bash
git commit -am "refactor: centralizar dados dos projetos"
```

## Task 2B: ExperienceMode e contratos responsivos

**Files:**
- Create: `src/lib/experience-mode.ts`
- Create: `src/__tests__/experience-mode.test.ts`

**Produces:**

```ts
export type ExperienceMode = 'hybrid' | 'commercial' | 'career';

export function experienceModeForRoute(
  route: 'home' | 'services' | 'career',
): ExperienceMode;

export function experienceModeForProject(
  audience: ProjectAudience,
): ExperienceMode;
```

- [ ] Escrever testes para os três modos.
- [ ] Confirmar `business → commercial`.
- [ ] Confirmar `engineering → career`.
- [ ] Confirmar `both → hybrid`.
- [ ] Implementar sem React/context global.
- [ ] Não persistir modo em localStorage.
- [ ] Rodar testes.
- [ ] Commit:
```bash
git add src/lib/experience-mode.ts src/__tests__/experience-mode.test.ts
git commit -m "feat: definir estrategia responsiva por audiencia"
```

---

## Task 3: Nova navegação e mobile menu acessível

**Files:**
- Create: `src/components/layout/GlobalHeader.tsx`
- Create: `src/components/layout/MobileNavigation.tsx`
- Create: `src/components/layout/SkipLink.tsx`
- Create: `src/__tests__/navigation.test.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/i18n/locales/en-US.json`

**Produces:** navegação compartilhada por home/serviços/carreira/projetos, com variantes `hybrid`, `commercial` e `career` sem duplicar o sistema.

- [ ] Testar links principais.
- [ ] Testar `aria-expanded`.
- [ ] Testar abertura/fechamento por click.
- [ ] Testar fechamento por Escape.
- [ ] Testar labels pt/en.
- [ ] Implementar.
- [ ] Garantir fallback sem JS: links essenciais continuam presentes.
- [ ] QA em 320px, 390px e desktop.
- [ ] Commit:
```bash
git commit -am "feat: adicionar navegacao dual-audience responsiva"
```

## Task 4: Hero dual-audience e Audience Router

**Files:**
- Create: `src/components/home/DualAudienceHero.tsx`
- Create: `src/components/home/AudienceRouter.tsx`
- Create: `src/lib/intent.ts`
- Create: `src/__tests__/home.test.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: dicionários i18n.

**Produces:** hero híbrido/adaptativo, com desktop visualmente rico e mobile rápido para compreensão e ação.

- [ ] Testar H1 e CTAs.
- [ ] Testar parser de `intent`.
- [ ] Testar que nenhum intent esconde conteúdo.
- [ ] Implementar UI.
- [ ] Manter currículo acessível em navegação/carreira, mas não como CTA primário da home.
- [ ] QA mobile.
- [ ] Commit:
```bash
git commit -am "feat: reposicionar hero para clientes e carreira"
```

## Task 5: Featured Work visual

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/home/FeaturedWork.tsx`
- Create: assets sanitizados em `public/projects/...`
- Modify: `src/app/[locale]/page.tsx`

**Produces:** projetos visuais logo após proposta/prova.

- [ ] Selecionar 3–4 cases.
- [ ] Sanitizar screenshots.
- [ ] Criar testes de alt, links e status.
- [ ] Implementar cards responsivos.
- [ ] Garantir `next/image`.
- [ ] Não colocar stack como primeiro elemento.
- [ ] QA sem hover.
- [ ] Commit:
```bash
git commit -am "feat: destacar trabalhos reais com prova visual"
```

## Task 6: Área comercial `/servicos`

**Files:**
- Create: `src/app/[locale]/servicos/page.tsx`
- Create: components em `src/components/services/`
- Create: `src/lib/contact.ts`
- Create: `src/__tests__/services.test.tsx`
- Modify: i18n.

**Produces:** landing comercial completa com estratégia mobile-first e expansão premium para desktop.

- [ ] Testar H1 único.
- [ ] Testar 3 pilares.
- [ ] Testar CTA WhatsApp com mensagem encoded.
- [ ] Testar links para cases.
- [ ] Implementar processo de 6 passos.
- [ ] Implementar FAQ curto, sem preço.
- [ ] CTA final.
- [ ] QA mobile-first em 360/390/412 antes do QA desktop.
- [ ] Confirmar que desktop expande a experiência sem alterar o funil.
- [ ] Commit:
```bash
git commit -am "feat: criar area comercial mobile-first"
```

## Task 7: Área carreira `/carreira`

**Files:**
- Create: `src/app/[locale]/carreira/page.tsx`
- Create: components em `src/components/career/`
- Create: `src/__tests__/career.test.tsx`
- Modify: i18n.

**Produces:** perfil técnico focado em contratação, concebido desktop-first e adaptado integralmente para mobile.

- [ ] Testar currículo, GitHub, LinkedIn e projetos.
- [ ] Implementar hero profissional.
- [ ] Reaproveitar experiência existente.
- [ ] Reaproveitar conquistas e formação, mais abaixo.
- [ ] Mover GitHubLiveStats para contexto de carreira/projetos.
- [ ] Evitar duplicar fonte de dados.
- [ ] QA desktop-first em 1366/1440/1920 antes da adaptação mobile.
- [ ] Confirmar paridade funcional em 390/412.
- [ ] Commit:
```bash
git commit -am "feat: criar carreira desktop-first responsiva"
```

## Task 8: Índice e páginas individuais de projetos

**Files:**
- Create: `src/app/[locale]/projetos/page.tsx`
- Create: `src/app/[locale]/projetos/[slug]/page.tsx`
- Create: components em `src/components/projects/`
- Create: `src/__tests__/project-route.test.tsx`

**Produces:** cases compartilháveis.

- [ ] Testar `generateStaticParams`.
- [ ] Testar 404 de slug inválido.
- [ ] Implementar metadata por case.
- [ ] Implementar layout completo.
- [ ] Implementar galeria.
- [ ] Implementar `ExperienceMode` de cada case a partir de `audience` e adaptar CTA/layout/performance sem duplicar conteúdo.
- [ ] Adicionar next/previous case.
- [ ] Commit:
```bash
git commit -am "feat: adicionar case studies individuais"
```

## Task 9: Sobre e mensagem de IA

**Files:**
- Modify: `src/components/sections/SobreSection.tsx` ou novo `AboutCompact.tsx`
- Modify: pt/en dictionaries.
- Modify: README.

- [ ] Criar teste contra a antiga formulação “não escrevo código”.
- [ ] Implementar nova narrativa.
- [ ] Garantir coerência entre site e README.
- [ ] Commit:
```bash
git commit -am "content: reposicionar uso de IA como engenharia assistida"
```

## Task 10: Contato orientado a intenção

**Files:**
- Refactor: `src/components/sections/ContatoSection.tsx`
- Create: `src/components/home/ContactCTA.tsx`
- Modify: `src/app/api/contato/route.ts` apenas se contrato exigir.
- Create: `src/__tests__/contact.test.tsx`

- [ ] Preservar anti-spam atual.
- [ ] Usar `<label htmlFor>`.
- [ ] Adicionar `aria-live`.
- [ ] Simplificar copy.
- [ ] Adicionar WhatsApp comercial.
- [ ] Manter contato profissional.
- [ ] Commit:
```bash
git commit -am "feat: simplificar contato e adicionar whatsapp contextual"
```

## Task 11: ÆVO dual-audience

**Files:**
- Modify: `src/components/ai/AevoWidget.tsx`
- Modify: `src/lib/aevo/rag-knowledge.ts`
- Modify: types/tools relacionados ao ÆVO.
- Create/modify tests existentes.

- [ ] Escrever testes dos quatro atalhos.
- [ ] Adicionar `AevoVisitorMode`.
- [ ] Preservar providers.
- [ ] Adicionar navegação allow-listed se necessária.
- [ ] Nunca permitir URL arbitrária de tool.
- [ ] Testar pt/en.
- [ ] Testar mobile com teclado aberto.
- [ ] Commit:
```bash
git commit -am "feat: adaptar aevo para clientes e recrutadores"
```

## Task 12: Performance e progressive enhancement

**Files:**
- Create: `src/components/effects/VisualEffects.tsx`
- Create: `src/components/effects/DesktopCursor.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: scripts/CSS relacionados.
- Add tests where deterministic.

- [ ] Medir baseline antes.
- [ ] Remover loader bloqueante.
- [ ] Remover CDN redundante onde pacote npm já existe.
- [ ] Lazy-load efeitos pesados.
- [ ] Aplicar políticas de efeito por `ExperienceMode`: comercial privilegia mobile/performance; carreira privilegia desktop/riqueza; híbrido equilibra.
- [ ] Respeitar reduced motion.
- [ ] Verificar que sem WebGL a página continua funcional.
- [ ] Verificar que sem JS crítico os links SSR aparecem.
- [ ] Build.
- [ ] Commit:
```bash
git commit -am "perf: carregar efeitos visuais progressivamente"
```

## Task 13: SEO, OG e structured data

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/components/seo/json-ld.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/__tests__/seo.test.ts`
- Add: `public/og/*`

- [ ] Atualizar títulos.
- [ ] Remover versões de framework da description.
- [ ] Adicionar metadata específico para carreira/serviços/cases.
- [ ] Usar Person como publisher.
- [ ] Implementar ProfilePage na carreira.
- [ ] Atualizar sitemap.
- [ ] Criar OG próprio.
- [ ] Testar canonical/hreflang.
- [ ] Commit:
```bash
git commit -am "feat: alinhar seo ao portfolio dual-audience"
```

## Task 14: Analytics abstraction

**Files:**
- Create: `src/lib/analytics/events.ts`
- Create: `src/__tests__/analytics.test.ts`
- Modify: CTAs principais.

- [ ] Testar payloads.
- [ ] Instrumentar audience selection.
- [ ] Instrumentar WhatsApp.
- [ ] Instrumentar currículo.
- [ ] Instrumentar abertura de case/demo/GitHub.
- [ ] Não instalar vendor ainda.
- [ ] Commit:
```bash
git commit -am "feat: adicionar eventos de conversao desacoplados"
```

## Task 15: Auditoria mobile, acessibilidade e regressão

**Files:**
- Modify: CSS/componentes conforme achados.
- Create: `docs/portfolio-v3/qa-checklist.md`.

### Test matrix

- [ ] 320 × 568
- [ ] 360 × 800
- [ ] 390 × 844
- [ ] 412 × 915
- [ ] 768 × 1024
- [ ] 1024 × 768
- [ ] 1366 × 768
- [ ] 1440 × 900
- [ ] 1920 × 1080

### Fluxos

**Critério de prioridade por superfície:**
- `/servicos` e cases comerciais: validar primeiro mobile 360/390/412, depois expansão desktop;
- `/carreira` e cases técnicos: validar primeiro desktop 1366/1440/1920, depois paridade funcional mobile;
- `/`: validar desktop e mobile como duas apresentações igualmente importantes da mesma home híbrida.

- [ ] cartão → home → serviços → WhatsApp
- [ ] LinkedIn → carreira → currículo
- [ ] recruiter → projeto → GitHub
- [ ] home → case → voltar
- [ ] mobile menu
- [ ] idioma
- [ ] tema
- [ ] ÆVO
- [ ] formulário
- [ ] reduced motion
- [ ] teclado
- [ ] sem hover
- [ ] conexão lenta / throttling

### Comandos

```bash
npm test -- --run
npx tsc --noEmit
npm run build
```

Se `npm run lint` continuar usando `next lint` e falhar por incompatibilidade da versão do Next, tratar atualização do script de lint em PR separado, a menos que seja bloqueador atual confirmado.

Commit:

```bash
git commit -am "test: validar portfolio v3 em mobile e acessibilidade"
```

---

# 17. Estratégia de branches e PRs

Não fazer tudo em uma branch gigante.

Sugestão:

### PR 1 — foundation
`feat/portfolio-v3-foundation`
- baseline;
- project data;
- navigation;
- intent;
- testes.

### PR 2 — commercial
`feat/portfolio-v3-commercial`
- hero;
- audience router;
- featured work;
- `/servicos`;
- WhatsApp;
- contato.

### PR 3 — career
`feat/portfolio-v3-career`
- `/carreira`;
- about;
- experiências;
- GitHub;
- currículo.

### PR 4 — case-studies
`feat/portfolio-v3-case-studies`
- índice;
- slugs;
- screenshots;
- SEO por case.

### PR 5 — aevo
`feat/portfolio-v3-aevo-intents`

### PR 6 — performance
`perf/portfolio-v3-progressive-effects`

### PR 7 — seo-analytics-qa
`feat/portfolio-v3-discovery-measurement`

Cada PR:
- branch a partir da `main` atualizada;
- commits pequenos;
- sem mudanças não relacionadas;
- build e testes antes de abrir;
- screenshots desktop/mobile na descrição;
- checklist de regressão;
- merge preferencial via squash se esse for o padrão do repo.

---

# 18. Critérios de aceite finais

## Produto

- [ ] Cliente entende em menos de uma viewport que Kauê cria sites, sistemas e automações.
- [ ] Recruiter encontra `/carreira` sem procurar.
- [ ] Tech Lead alcança projeto detalhado em no máximo 2 cliques.
- [ ] Cartão pode apontar para home e ainda ter CTA comercial claro.
- [ ] Home não parece agência genérica.
- [ ] Home não parece exclusivamente currículo.

## Visual

- [ ] Identidade atual reconhecível.
- [ ] Projetos têm screenshots reais/sanitizados.
- [ ] `/servicos` parece concebido para mobile e expandido com elegância no desktop.
- [ ] `/carreira` parece concebido para desktop e adaptado com intenção para mobile.
- [ ] A home parece híbrida, sem favorecer de forma desproporcional um único dispositivo.
- [ ] Não há cards genéricos em excesso.
- [ ] Motion tem função e não impede leitura.

## Funcional

- [ ] Tema funciona.
- [ ] i18n funciona.
- [ ] ÆVO funciona.
- [ ] Currículo funciona.
- [ ] Formulário funciona.
- [ ] WhatsApp funciona.
- [ ] GitHub links funcionam.
- [ ] Cases funcionam.
- [ ] Menu mobile funciona.
- [ ] Back/forward funciona.
- [ ] 404 de case funciona.

## Qualidade

- [ ] `npm test -- --run` passa.
- [ ] `npx tsc --noEmit` passa.
- [ ] `npm run build` passa.
- [ ] Sem erro de console relevante.
- [ ] Sem hydration mismatch.
- [ ] Sem imagens quebradas.
- [ ] Sem overflow horizontal em 320px.
- [ ] Sem conteúdo crítico escondido por animação.
- [ ] Sem dados sensíveis em screenshots/cases.

## Performance

- [ ] Conteúdo renderiza antes de efeitos.
- [ ] 3D não bloqueia CTA.
- [ ] custom cursor somente onde faz sentido.
- [ ] reduced motion respeitado.
- [ ] experiência aceitável em conexão móvel.

## SEO

- [ ] canonical por locale.
- [ ] hreflang.
- [ ] sitemap com novas rotas.
- [ ] metadata por superfície.
- [ ] OG próprio.
- [ ] JSON-LD coerente com conteúdo.
- [ ] nenhuma claim de framework desatualizada em metadata.

---

# 19. O que NÃO fazer

- Não criar “modo cliente” e “modo recruiter” escondendo metade do site.
- Não interpretar `ExperienceMode` como feature flag de conteúdo; ele orienta apresentação, densidade, interação e performance.
- Não aplicar mobile-first globalmente só porque `/servicos` é mobile-first.
- Não aplicar desktop-first globalmente só porque `/carreira` é desktop-first.
- Não pedir ao usuário qual perfil ele é em modal obrigatório.
- Não transformar a home em tabela de planos/preços.
- Não publicar preço antes da estratégia comercial amadurecer.
- Não colocar “IA” em todo título.
- Não remover a personalidade notarial/cyber.
- Não manter jargão notarial em campos que prejudicam conversão.
- Não adicionar mais bibliotecas de animação.
- Não reescrever o ÆVO junto com a navegação.
- Não atualizar Next.js no mesmo conjunto de PRs.
- Não criar CMS agora.
- Não criar login/admin para editar portfólio.
- Não criar testimonials falsos.
- Não usar GitHub stats como principal prova comercial.
- Não depender de animação para informação.
- Não sacrificar usabilidade em 320–390px para preservar um efeito puramente decorativo do desktop; adaptar o efeito sem remover funções.
- Não transformar toda seção em grid de cards.

---

# 20. Backlog posterior, fora do escopo V3

Somente depois da V3 estável:

- CMS leve para cases;
- depoimentos reais;
- página de diagnóstico comercial;
- agendamento de conversa;
- integração real de analytics;
- experimentos A/B de hero;
- páginas SEO específicas para serviços;
- página local “desenvolvedor em Blumenau” se houver estratégia de conteúdo real;
- lead magnets;
- newsletter;
- evolução da marca comercial;
- schema avançado após validação;
- PWA/offline, somente se houver caso de uso.

---

# 21. Ordem recomendada de execução pelo Codex

O agente deve seguir esta sequência:

```text
baseline
  ↓
project data
  ↓
navigation
  ↓
hero + audience router
  ↓
featured work
  ↓
services
  ↓
career
  ↓
project cases
  ↓
about/contact
  ↓
ÆVO
  ↓
performance
  ↓
SEO
  ↓
analytics abstraction
  ↓
full QA
```

Não iniciar tarefa posterior se os testes/aceite da anterior estiverem vermelhos.

---

# 22. Definition of Done por tarefa

Antes de marcar qualquer task como pronta:

1. testes específicos escritos;
2. teste falhou antes da implementação quando aplicável;
3. implementação mínima concluída;
4. testes específicos verdes;
5. suíte completa verde;
6. TypeScript verde;
7. build verde;
8. QA visual desktop;
9. QA visual mobile;
10. acessibilidade básica verificada;
11. sem regressão conhecida;
12. commit pequeno e descritivo.

---

# 23. Prompt de execução para um agente Codex

Use este bloco ao iniciar a execução:

```text
Execute o plano `docs/superpowers/plans/2026-08-13-portfolio-dual-audience-v4-audience-aware-responsive.md`.

Regras:
1. Leia o plano inteiro antes de alterar arquivos.
2. Trabalhe tarefa por tarefa, na ordem definida.
3. Antes de cada tarefa, inspecione os arquivos reais citados no plano.
4. Não assuma que documentação está atualizada: package.json e código são a fonte de verdade.
5. Use TDD onde o comportamento for testável.
6. Não faça upgrade de dependências/framework salvo se um bloqueador real exigir e isso for explicitamente aprovado.
7. Preserve i18n pt-BR/en-US, tema, ÆVO, currículo, formulário, easter eggs e recursos atuais.
8. Respeite o `ExperienceMode`: `/servicos` é mobile-first, `/carreira` é desktop-first, home é híbrida; todos os modos precisam manter paridade funcional entre dispositivos.
9. Não invente copy, números de resultado, clientes, depoimentos ou métricas.
10. Não exponha dados privados nos cases.
11. Após cada tarefa, rode os testes relevantes.
12. Antes de cada PR, rode:
    - npm test -- --run
    - npx tsc --noEmit
    - npm run build
13. Verifique visualmente desktop e mobile.
14. Se o plano entrar em conflito com o estado atual do repositório, não improvise silenciosamente: documente o conflito, proponha a menor adaptação segura e mantenha a intenção arquitetural do plano.
15. Não execute tarefas posteriores enquanto houver regressão introduzida pela tarefa atual.
```

---

# 24. Resultado esperado após a V3

O mesmo domínio deve sustentar dois discursos sem virar duas identidades:

### Para um cliente
> “Esse desenvolvedor entende problemas de negócio, já fez coisas reais, trabalha com clareza e consigo falar com ele agora.”

### Para um recruiter
> “Consigo avaliar rapidamente experiência, projetos, stack e currículo.”

### Para um Tech Lead
> “Consigo entrar nos cases, entender decisões, arquitetura, qualidade, testes e abrir código público.”

Essa é a métrica principal da reformulação: **clareza e experiência diferentes para públicos diferentes, sustentadas pelas mesmas evidências reais e pela mesma identidade.**
