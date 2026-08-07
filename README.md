<div align="center">

# Kauê Ruon Cardoso
### AI Engineer · Blumenau / SC

*Construo software guiando IA generativa — de protótipos com LLM a back-end e front-end.*

<br>

<img src="https://img.shields.io/badge/Foco-AI_Engineer-2563eb?style=for-the-badge&labelColor=04060d" />
<img src="https://img.shields.io/badge/Disponibilidade-Remoto-22c55e?style=for-the-badge&labelColor=04060d" />
<img src="https://img.shields.io/badge/Localização-Blumenau_SC-d4a017?style=for-the-badge&labelColor=04060d" />

<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-kaueruon-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/kaueruon)
[![GitHub](https://img.shields.io/badge/GitHub-Kauerc10-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Kauerc10)
[![Email](https://img.shields.io/badge/Email-kaue.ruon@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:kaue.ruon@gmail.com)

</div>

---

## Sobre

Sou cartorário no [Cartório Gaya](https://www.cartoriogaya.com.br) desde agosto de 2023, em Blumenau/SC. Lido com procurações, inventários e documentos jurídicos — trabalho que exige tolerância zero a erros e me ensinou a enxergar processos onde outros veem apenas tarefas.

Minha relação com tecnologia vem desde cedo, e a verdade é que construo software **guiando IA generativa** (Claude, GPT) como ferramenta primária. Não escrevo código do zero, linha por linha, como um desenvolvedor tradicional. Meu trabalho é **decomor o problema, estruturar a instrução técnica e conectar as peças** até o fluxo inteiro funcionar em produção.

Isso não é uma fraqueza que eu esconda — é exatamente o que quero fazer como AI Engineer: colocar IA generativa pra resolver problemas reais, com mentoria e desafios de produção.

> Base de raciocínio lógico forjada em matemática competitiva (OBMEP/IMPA): Prata Regional e Bronze Nacional, além de duas Menções Honrosas.

---

## Projetos

### DocFácil — IA generativa aplicada a documentos legais
**Stack:** `Next.js 16` · `TypeScript` · `Prisma` · `IA Generativa`

Plataforma que gera documentos legais (contratos, declarações, procurações) através de um chat guiado com o usuário. A peça central é uma **camada de IA agnóstica de provedor**:

- Interface `AIProvider` com factory por variável de ambiente — trocar de LLM não exige mudar o front-end
- API route server-side (`/api/ai/generate`) que mantém a chave de API secreta no servidor
- Streaming de respostas e tratamento de erro tipado (`AIError`)
- Providers reais plugáveis: OpenAI, Anthropic, Gemini

> 🔗 **Demo:** [docfacil-indol.vercel.app](https://docfacil-indol.vercel.app) · **Repo:** [github.com/khub-solucoes/docfacil](https://github.com/khub-solucoes/docfacil)

### CKF Manutenção — Sistema de Orçamentos
**Stack:** `React` · `TypeScript` · `Supabase` · `TailwindCSS`

Sistema interno em **produção** para uma empresa de manutenção mecânica. Criação, gestão, filtros e exportação de orçamentos (CSV/XLSX). Inclui **testes unitários** cobrindo repositório, validações e exports.

> 🔗 **Demo:** [ckf-manutencao-orcamentos.vercel.app](https://ckf-manutencao-orcamentos.vercel.app) · **Repo:** [github.com/Kauerc10/ckf-manutencao-orcamentos](https://github.com/Kauerc10/ckf-manutencao-orcamentos)

### Atlas Notarial — Automação de procurações de veículos
**Stack:** `Node.js` · `APIs REST` · `Automação`

Automação que consome a API do Detran-RS para gerar procurações de veículos automaticamente. **Em produção no Cartório Gaya** — uma tarefa manual que tomava minutos virou poucos cliques. Código privado (dados sensíveis).

### Foli — Biblioteca TypeScript para PDF
**Stack:** `TypeScript` · `Layout Engine`

Biblioteca open source para geração de PDF em Node.js e navegador, com Fluent Builder API, motor de layout com garantia de zero overflow e suporte Unicode (pt-BR).

> 🔗 **Repo:** [github.com/Kauerc10/foli](https://github.com/Kauerc10/foli)

---

## Este portfólio

O próprio site deste portfólio é um projeto de engenharia visual. Construído com IA generativa como ferramenta, ele combina:

- **Three.js** — Cena WebGL com icosaedro wireframe, 350 partículas e 120 fragmentos com física interativa ao mouse
- **GSAP + ScrollTrigger** — Animações de scroll, parallax e timing
- **Lenis** — Smooth scroll
- **Shaders GLSL customizados** — Aberração cromática baseada na velocidade de scroll
- **Acessibilidade** — `prefers-reduced-motion`, semantic HTML, performance otimizada

> 🔗 **Ao vivo:** [portifolio-k-r-001.vercel.app](https://portifolio-k-r-001.vercel.app)

<details>
<summary><b>Easter eggs</b></summary>

Quem explora o site encontra quatro surpresas:

1. **Konami Code** (↑↑↓↓←→←→BA) → Modal de "acesso root"
2. **5 cliques no nome** → Glitch com erro HTTP 418
3. **Console do DevTools** → Arte ASCII com contato direto
4. **3s de hover na ficha técnica** → Carimbo de "AUTENTICADO"

</details>

---

## Experiência

| Período | Função | Onde |
|---|---|---|
| Jul 2026 → Atual | Founder & Builder — DocFácil | K-HUB Soluções |
| 2023 → Atual | Cartorário / Depto. de Procurações | Cartório Gaya · Blumenau/SC |
| Nov 2021 → Mar 2023 | Técnico em Manutenção Apple | iPhoneria · Blumenau/SC |

---

## Formação

- **Ensino Médio Completo** — EEB Cel. Pedro Christiano Feddersen
- **Téc. Gestão Administrativa** (156h) — VisualMídia · 2020
- **Operador de Tecnologia** (92h) — VisualMídia · 2017
- **Programador de Games** (40h) / **3Ds Max** (32h) — VisualMídia · 2017-2018

---

## Stack

**IA Generativa:** Integração de LLMs · Arquitetura de providers (OpenAI/Anthropic/Gemini) · Streaming · Prompt engineering

**Construindo com:** JavaScript/TypeScript · React/Next.js · Supabase/Prisma · Node.js

**Praticando:** APIs REST · Automação de processos · Testes unitários · Git · Deploy (Vercel)

---

<div align="center">

*Construído com IA generativa como ferramenta de engenharia.*

**Contato:** kaue.ruon@gmail.com · [LinkedIn](https://linkedin.com/in/kaueruon) · [GitHub](https://github.com/Kauerc10)

</div>
