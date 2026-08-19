# Inventário de Comportamento e Contratos — Portfólio Atual (V3 Baseline)

Este documento registra todas as funcionalidades, contratos e comportamentos existentes no portfólio `kaueruon.dev` antes da expansão para a arquitetura Dual-Audience V4. Nenhuma das funções abaixo pode ser removida ou ter sua integridade comprometida sem substituição funcional equivalente.

---

## 1. Funcionalidades Essenciais

### 1.1 Internacionalização Nativa (i18n)
- **Rotas**: `/[locale]` (`/pt-BR` e `/en-US`) suportadas via Next.js 15 App Router.
- **Detecção & Sincronização**: `src/middleware.ts` com cadeia de prioridade (URL explícita > Cookie `portfolio_lang` > `Accept-Language` > Fallback `pt-BR`).
- **Dicionários Server-Side**: `src/i18n/locales/pt-BR.json` e `src/i18n/locales/en-US.json` com validação compile-time estrita em `src/i18n/types.ts`.
- **Alternador de Idioma**: `src/components/ui/LanguageToggle.tsx` com preservação de query parameters, hash de seção e bypass imediato do loader.

### 1.2 Tema Claro / Escuro
- **Componente**: `src/components/ui/ThemeToggle.tsx` (estilo Cyberdeck com deslize de thumb, rotação 3D e View Transitions API).
- **Provedor**: `src/components/theme/ThemeProvider.tsx` baseado em classe `dark` no elemento raiz `<html>`.

### 1.3 Agente de IA Residente (ÆVO)
- **Componentes**: `src/components/ai/AevoWidget.tsx`, `AevoMascot.tsx`, `AevoEffects.tsx`.
- **Provedores Suportados**: Google Gemini (1.5/3.6 Flash), OpenAI GPT-4o-mini e Engine de Fallback Local RAG bilíngue determinístico (`src/lib/aevo/provider-factory.ts`).
- **Tool Calling Nativo**: Execução de ações no cliente como `scroll_to_section`, `highlight_project`, `open_resume`, `trigger_cinematic_mode`.
- **Isolamento de Scroll**: O scroll da conversa do chat é isolado dentro do widget para não propagar para a página.

### 1.4 Currículo
- **Arquivo**: `/curriculo_kaue.pdf` disponível para download direto e via botão de ação no Hero / Navbar / ÆVO tool.

### 1.5 Formulário de Contato
- **Endpoint**: `src/app/api/contato/route.ts`.
- **Segurança & Anti-Spam**: Honeypot silencioso (`botcheck`), tempo mínimo de preenchimento (`fillTime`), filtro de palavras de spam e rate limit por IP (3 requisições / 10 min).
- **Integração**: Web3Forms via variável de ambiente `WEB3FORMS_ACCESS_KEY`.

### 1.6 Projetos em Destaque
- **Cases Atuais**:
  - `DocFácil`: Automação Notarial com IA generativa (Next.js / Prisma).
  - `Atlas Notarial`: Gestão Jurisprudencial e automação de minutas no Cartório Gaya.
  - `CKF Manutenção`: Sistema de controle operacional e orçamentos em produção.
  - `Foli`: Biblioteca open-source TypeScript de efeitos e layout engine.

### 1.7 GitHub Live Stats
- **Componente**: `src/components/widgets/GithubLiveStats.tsx`.
- **Endpoint**: `src/app/api/github/route.ts` consumindo dados públicos de `@Kauerc10`.

### 1.8 Cena 3D & Efeitos Visuais
- **WebGL**: `src/components/3d/HeroCanvas3D.tsx` com Three.js, partículas, icosaedro wireframe e shaders GLSL.
- **Loader**: Animação de introdução em `public/js/loader.js` com bypass de 0ms em navegações subsequentes (`sessionStorage.getItem('loader_seen')`).

### 1.9 Easter Eggs & Modais
- **Konami Code**: Modal secreto ativado via sequência clássica do teclado (`src/components/sections/KonamiModal.tsx`).
- **Protocolo de Violação (Breach)**: Interface cibernética ativada via comando/easter egg (`src/components/ui/BreachModal.tsx`).

---

## 2. Contratos de SEO & Metadados
- **Sitemap Dinâmico**: `src/app/sitemap.ts` servindo entradas para `/pt-BR` e `/en-US` com links alternativos `hreflang`.
- **Robots**: `src/app/robots.ts` com permissões para crawlers de busca e de IA (GPTBot, ClaudeBot, PerplexityBot).
- **JSON-LD Schema.org**: `src/components/seo/json-ld.tsx` com schemas de `Person` e `WebSite` bilíngues.
