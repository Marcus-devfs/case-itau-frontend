# Case Técnico — Itaú · Produtos Financeiros

[![CI](https://github.com/marcussilva/case-itau/actions/workflows/ci.yml/badge.svg)](https://github.com/marcussilva/case-itau/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://case-itau.vercel.app)

Aplicação frontend para área logada de banco digital, desenvolvida como parte do processo seletivo Itaú.

---

## Uso de IA no desenvolvimento

Este projeto foi desenvolvido com o suporte do **Claude Code** (Anthropic) como ferramenta de produtividade — de forma intencional, transparente e com controle técnico total em cada etapa.

### Como a IA foi utilizada

O processo seguiu um fluxo de **arquitetura primeiro, implementação depois**:

1. **Definição prévia da arquitetura** — Antes de qualquer geração de código, foram tomadas as decisões de design do sistema: separação em camadas (`types → services → hooks → components`), escolha das tecnologias (Next.js 16 App Router, Tailwind v4, Jest + Testing Library), padrões de acessibilidade (ARIA roles, WCAG AA), estratégia de performance (`useMemo`, SSR/ISR, Server Components) e design visual orientado a webview.

2. **Criação de prompts estruturados** — Os prompts foram elaborados com especificidade técnica, descrevendo exatamente o que cada camada deveria fazer, quais padrões seguir e quais trade-offs considerar. Claude Code foi instruído a seguir a arquitetura definida, não a inventar uma.

3. **Geração acelerada de código** — Com a arquitetura e os contratos TypeScript definidos, o Claude Code foi usado para acelerar a implementação de componentes, testes e documentação — tarefas que consomem tempo mas seguem padrões previsíveis.

4. **Revisão e validação manual** — Todo código gerado foi revisado, testado localmente (`npm run dev`, `npm test`, `npm run build`) e ajustado onde necessário. Exemplos de correções feitas: remoção de propriedade inválida no `jest.config.ts`, correção de acessibilidade no `Input.tsx` (`aria-hidden` bloqueava o botão de limpar busca), restauração de funcionalidades removidas por linter automático.

5. **Testes e documentação** — Os testes unitários foram gerados com Claude Code e validados manualmente para garantir que cobrem os cenários corretos (comportamento do usuário, não implementação interna). O README foi escrito com IA e revisado para refletir fielmente as decisões tomadas.

### Por que declarar isso?

Transparência é parte da boa engenharia. O uso de ferramentas de IA como **multiplicador de produtividade** — e não como substituto do raciocínio técnico — é uma habilidade cada vez mais valorizada no mercado. A qualidade da saída depende diretamente da qualidade das decisões de quem usa a ferramenta.

---

## Como rodar o projeto

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build de produção
npm run build
npm start

# Testes unitários
npm test

# Testes com coverage
npm run test:coverage
```

**Requisitos:** Node.js 18+

---

## Tecnologias

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSR, ISR e roteamento sem config extra |
| Linguagem | TypeScript strict | Contrato entre camadas, refatoração segura |
| Estilização | Tailwind CSS v4 | Design tokens nativos, zero runtime CSS |
| Testes | Jest + Testing Library | Padrão do mercado React, foco em comportamento |
| Runtime | React 19 | Concurrent features, Server Components |

---

## Decisões de Arquitetura

### 1. Como você decidiu separar os componentes? E por quê?

A separação seguiu o princípio de **responsabilidade única por camada**, dividida em quatro níveis:

```
types/            → Contratos TypeScript. Sem lógica, só interfaces.
services/         → Sabe fazer HTTP. Não conhece React, não tem estado.
hooks/            → Estado + regra de negócio. Só sabe sobre dados e lógica.
components/       → Só sabe renderizar o que recebe via props.
```

Dentro de `components/`, há duas subcamadas:

- **`components/ui/`** — Design System agnóstico de domínio. São reutilizáveis em qualquer feature futura.

- **`components/products/`** — Feature específica de produtos, consomem o DS e encapsulam as regras visuais da feature.

- **`components/layout/`** — Estrutura de tela.
  `Header`, `BottomNav` e `ComingSoonPage` definem o shell do app.

**Por quê essa separação?**

Ao chamar a página `/produtos` no contexto de webview, o componente `ProductsContainer` é o único ponto que une hook (dados) com UI. Se amanhã a API mudar, só `services/products.ts` precisa mudar. Se a regra de filtro mudar, só o hook. Se o visual do card mudar, só `ProductCard`. Nenhuma mudança propaga em cascata.

---

### 2. Como organizou as chamadas de API e tratamentos de erros?

**Serviço (`services/products.ts`)**

Cada função é uma responsabilidade única:
- `fetchProducts()` — GET na coleção
- `toggleProductStatus(id)` — PATCH num recurso

O serviço lança `Error` com mensagem clara em caso de `!res.ok`. Não lida com loading, não tem estado — apenas promises.

**Hook (`hooks/useProducts.ts`)**

O hook gerencia o ciclo de vida assíncrono.

- `loading: true` no início e em cada retry — garante que o skeleton aparece enquanto há latência
- `error: string | null` — mensagem humanizada, não o erro técnico bruto
- `loadProducts` exposto pelo hook, o botão "Tentar novamente" chama a mesma função, sem código duplicado

**Optimistic update no toggle de status**

```ts
// 1. Atualiza UI imediatamente (sem esperar a API)
setState(prev => ({ products: prev.products.map(p =>
  p.id === id ? { ...p, status: flip(p.status) } : p
)}))

// 2. Chama a API em background
try {
  await toggleProductStatus(id)
} catch {
  // 3. Reverte automaticamente se a API falhar
  setState(prev => ({ products: prev.products.map(p =>
    p.id === id ? { ...p, status: flip(p.status) } : p
  )}))
}
```

Isso garante resposta imediata ao usuário (< 16ms percebido) mesmo com latência de rede.

**Mock API (`app/api/produtos/route.ts`)**

A API mock simula latência real (400ms no GET, 250ms no PATCH) para validar os estados de loading durante desenvolvimento. Em produção, bastaria substituir a URL base em `services/products.ts`.

---

### 3. Como você tratou os carregamentos, usabilidade e acessibilidade?

**Loading states**

- `ProductListSkeleton` — 5 placeholders animados com `animate-pulse` substituem a lista durante o fetch. Usa `aria-label="Carregando produtos"` para leitores de tela.
- Não há flash de conteúdo vazio: o skeleton tem a mesma geometria do card real (ícone 48px + duas linhas de texto + badge).

**Error states**

- `ErrorState` com `role="alert"` — anunciado automaticamente por leitores de tela.
- Mensagem em linguagem natural ("Não foi possível carregar..."), não código HTTP.
- Botão "Tentar novamente" chama `loadProducts` diretamente — usuário não precisa recarregar a página.

**Responsividade estilo webview**

O `viewport` no `layout.tsx` usa `viewportFit: 'cover'` e as classes `pt-safe-top` / `pb-safe-bottom` (mapeadas para `env(safe-area-inset-*)`) para que o layout funcione corretamente no iPhone com notch e Android com gestures bar — exatamente como uma webview dentro do app Itaú.

O `Drawer` funciona como **bottom sheet em mobile** e **side panel em desktop** (`md:right-0 md:w-[420px]`), usando uma única implementação.

**Acessibilidade (WCAG 2.1 AA)**

| Elemento | Técnica |
|---|---|
| `ProductCard` | `<button>` nativo com `aria-label` descritivo |
| `ProductSearch` | `role="searchbox"` + `aria-live="polite"` no contador |
| `Switch` | `role="switch"` + `aria-checked` booleano |
| `Drawer` | `role="dialog"` + `aria-modal` + foco capturado + `Escape` fecha |
| Ícones decorativos | `aria-hidden="true"` em todos os SVGs puramente visuais |
| Lista de produtos | `<ul role="list">` + `<li role="listitem">` semântico |
| Navegação inferior | `<nav aria-label="Navegação principal">` + `aria-current="page"` |

---

### 4. Quais técnicas de performance aplicou e por quê?

**`useMemo` no filtro de produtos**

Sem `useMemo`, o filtro re-executaria em todo re-render do componente pai (ex: abertura do Drawer). Com `useMemo`, só recalcula quando `products` ou `searchQuery` mudam, crítico em listas grandes ou em dispositivos mobile com CPU limitada.

**SSR + ISR na página de produtos**

```ts
// app/produtos/page.tsx
export const revalidate = 60
```

A página é gerada estaticamente no build e regenerada a cada 60 segundos. O primeiro byte chega como HTML pré-renderizado, sem spinner na primeira carga, e o SEO enxerga conteúdo real.

**Server Components por padrão**

Toda página e componente que não precisa de estado ou evento do browser é Server Component. Apenas `ProductsContainer`, `BottomNav`, `Switch` e `Drawer` são `'use client'`. Isso reduz o JavaScript enviado ao browser (menor bundle, menor TTI).

**`useCallback` em funções estáveis**

`loadProducts` e `toggleStatus` são envolvidos em `useCallback` para não quebrar a memoização de componentes filhos que os recebem como props.

**Design tokens em CSS custom properties (Tailwind v4)**

Cores como `text-itau-orange` são resolvidas em build-time para classes atômicas, com zero custo de runtime, zero JS para temas.

---

### 5. Quais testes aplicaria para validar a aplicação?

**Testes implementados (26 casos, todos passando)**

| Suite | O que valida |
|---|---|
| `ProductCard.test.tsx` | Renderização, click handler, badge inativo, aria-label |
| `ProductSearch.test.tsx` | Input controlado, onChange, contador de resultados, botão limpar |
| `ProductList.test.tsx` | Renderização da lista, empty state (sem query), empty state (com query), semântica ARIA |
| `Switch.test.tsx` | `aria-checked`, disparo de `onChange`, comportamento disabled |
| `useProducts.test.ts` | Estado inicial, carregamento com sucesso, tratamento de erro, filtro por nome/tipo, optimistic update |

**Estratégia de testes adotada**

Todos os testes seguem a filosofia da Testing Library: **testar comportamento, não implementação**. Nunca consultamos classes CSS ou estado interno — sempre o que o usuário vê e interage.

**Testes adicionais que seriam implementados em produção**

| Tipo | O que cobriria |
|---|---|
| Unitário — `ProductDetail` | Formatação de taxa de juros, data, toggle de status no painel |
| Unitário — `Drawer` | Abertura/fechamento, trap de foco, tecla Escape, overlay click |
| Unitário — `Badge` | Variante correta por tipo e status |
| Integração — `ProductsContainer` | Fluxo completo: carrega lista → busca → abre drawer → toggle status → reflete na lista |
| E2E (Playwright) | Navegação entre abas, persistência do estado após reload, responsividade mobile |
| Visual (Storybook + Chromatic) | Regressão visual dos tokens do DS e dos componentes de UI |
| Acessibilidade (jest-axe) | `axe-core` em todos os componentes para garantir WCAG AA automaticamente |

---

## Estrutura do projeto

```
case-frontend/
├── app/
│   ├── api/produtos/route.ts     # Mock API (GET + PATCH)
│   ├── extrato/page.tsx          # Em breve — placeholder
│   ├── perfil/page.tsx           # Em breve — placeholder
│   ├── produtos/page.tsx         # SSR + ISR (revalidate 60s)
│   ├── layout.tsx                # Root layout + metadata webview
│   ├── page.tsx                  # Dashboard inicial
│   └── globals.css               # Tokens de marca Itaú (Tailwind v4)
├── components/
│   ├── ui/                       # Design System reutilizável
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Drawer.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Input.tsx
│   │   ├── Skeleton.tsx
│   │   └── Switch.tsx
│   ├── products/                 # Feature de produtos financeiros
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductSearch.tsx
│   │   ├── ProductTypeIcon.tsx
│   │   └── ProductsContainer.tsx
│   └── layout/                   # Shell do app
│       ├── BottomNav.tsx
│       ├── ComingSoonPage.tsx
│       └── Header.tsx
├── hooks/
│   └── useProducts.ts            # Estado + filtro (useMemo) + optimistic update
├── services/
│   └── products.ts               # Chamadas HTTP isoladas
├── types/
│   └── product.ts                # Interfaces TypeScript
├── lib/
│   └── utils.ts                  # cn(), formatDate(), formatInterestRate()
└── __tests__/
    ├── components/
    │   ├── ProductCard.test.tsx
    │   ├── ProductList.test.tsx
    │   ├── ProductSearch.test.tsx
    │   └── Switch.test.tsx
    └── hooks/
        └── useProducts.test.ts
```

---

## Fluxo de dados

```
app/produtos/page.tsx  (Server Component, SSR/ISR)
└── ProductsContainer  (Client Component — orquestra)
    ├── useProducts(searchQuery)
    │   ├── fetchProducts()       ← services/products.ts → /api/produtos
    │   ├── useMemo(filter)       ← deriva lista filtrada sem re-compute
    │   └── toggleStatus(id)     ← optimistic update + PATCH
    ├── ProductSearch             → controla searchQuery
    ├── ProductList               → recebe produtos já filtrados
    │   └── ProductCard[]         → cada card é um botão acessível
    └── Drawer                    → bottom sheet / side panel
        └── ProductDetail         → exibe detalhes + Switch de status
```
