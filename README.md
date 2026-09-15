# DECALQ — Storefront (front-end)

Loja streetwear da **DECALQ®**. Front-end completo em **React + Vite**, sem back-end:
carrinho, busca e navegação rodam 100% no cliente com dados fictícios.

Estética: minimalismo premium + editorial de moda. Base preto / branco / cinza +
**rosa da marca** (`#e01a78`, o mesmo da estampa) como cor de destaque — botões
principais, foco, tag "Novo", seleção de texto. Tipografia grande, muito espaço
negativo. O "street" aparece na direção de arte, no texto e nas microinterações —
não em ruído visual.

---

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Build de produção:

```bash
npm run build && npm run preview
```

Requer Node 18+.

---

## Stack

| Camada | Escolha |
|---|---|
| Build | Vite 5 |
| UI | React 18 + React Router 6 |
| Animação | Framer Motion (transições, hero, reveals) |
| Scroll suave | Lenis (desligado automaticamente com `prefers-reduced-motion`) |
| Ícones | lucide-react |
| Estado | Zustand (carrinho persistido em `localStorage`, overlays de UI) |
| Estilo | CSS Modules + design tokens em `src/styles/tokens.css` |
| Fonte | Inter (variável, auto-hospedada via `@fontsource-variable/inter`) |

---

## Estrutura

```
public/images/            → todas as imagens (placeholders — troque à vontade)
src/
  data/
    site.js               → hero, editorial, manifesto, feed do Instagram, textos
    products.js            → catálogo mockado + filtros/busca
    navigation.js          → menus e links do rodapé
  store/
    useCartStore.js        → carrinho (add/remove/qtd, subtotal, persistência)
    useUIStore.js          → menu mobile / busca / carrinho (abrir/fechar)
  hooks/                   → reduced-motion, media query, scroll lock, header scrolled
  lib/lenis.js             → instância única do Lenis + scrollTo
  components/
    layout/                → Layout, SmoothScroll, PageTransition, ScrollManager
    header/                → Header, MobileMenu
    hero/                   → HeroSlider  ← slide + motion blur
    product/               → ProductCard, ProductGrid, SizePicker
    sections/              → EditorialBanner, Categories, Marquee, Manifesto,
                             InstagramGrid, Newsletter
    cart/CartDrawer.jsx
    search/SearchOverlay.jsx
    footer/Footer.jsx
    ui/                    → Button, Reveal, SectionHeading, QuantityStepper
  pages/                   → Home, Shop, Product, About, Account, NotFound
```

---

## Trocar as imagens

Todas as imagens ficam em `public/images/` e são referenciadas por caminho nos
arquivos de dados. Basta substituir os arquivos mantendo o nome (ou editar o caminho).

| Onde aparece | Arquivo(s) | Definido em |
|---|---|---|
| Hero (2 slides) | `hero-01.jpg`, `hero-02.jpg` | `src/data/site.js` → `heroSlides` |
| Campanha editorial | `editorial-01.jpg` | `src/data/site.js` → `editorial` |
| Categorias | `category-camisetas.jpg`, `category-acessorios.jpg`, `category-latest.jpg` | `src/data/products.js` → `categories` |
| Produtos (frente / hover) | `product-01-a.jpg` / `product-01-b.jpg` … `product-10-*` | `src/data/products.js` → `products[].images` |
| Instagram | `instagram-01.jpg` … `instagram-06.jpg` | `src/data/site.js` → `instagramFeed` |
| Sobre | reusa `editorial-01.jpg` | `src/pages/About.jsx` |

Proporções usadas: **hero ≈ 2,6:1** (faixa de campanha, tipo banner largo — os
placeholders são 2600×1000), produtos 4:5, categorias 3:4, Instagram 1:1,
editorial 16:9. Todas com `object-fit: cover`, então qualquer proporção funciona —
essas só evitam corte estranho.

A proporção do hero é a variável `--hero-ratio` em
`src/components/hero/HeroSlider.module.css` (padrão `13 / 5`); em telas ≤ 900px ele
vira um bloco mais alto automaticamente. A cor de destaque é `--c-accent` em
`src/styles/tokens.css`.

Os placeholders atuais foram gerados em tom de cinza para não competir com o layout.

---

## Os 4 pontos que receberam atenção especial

1. **Direção de arte / layout** — grid rígido, hairlines, zero cantos arredondados,
   tipografia em caixa-alta com tracking negativo, muito respiro vertical.
2. **Tipografia** — uma família só (Inter), hierarquia por peso e tamanho fluido
   (`clamp()`), medida de linha controlada.
3. **Smooth scroll** — Lenis com curva expo-out: a roda responde na hora, há uma
   suavização curta e o movimento desacelera. Respeita `prefers-reduced-motion`.
4. **Transição do hero** — `HeroSlider.jsx`: a foto atual desliza para fora enquanto
   a próxima entra pelo lado oposto (`framer-motion`), com `filter: blur()` horizontal
   que sobe durante o deslocamento e zera no fim — curva `cubic-bezier(0.76,0,0.24,1)`.
   Autoplay 6,2s, navegação por clique nos indicadores `01 — 02` e swipe no mobile.

---

## Acessibilidade

- `prefers-reduced-motion` desliga Lenis, blur do hero, parallax e reveals.
- Foco visível em tudo que é interativo; `skip link`; `aria-label` nos botões só-ícone.
- Alvos de toque ≥ 44px; contraste de texto ≥ 4.5:1.
- Overlays (menu, busca, carrinho) fecham no `Esc`, travam o scroll e devolvem o foco.

---

## Limitações (por ser só front-end)

- Checkout, pagamento, login e newsletter são visuais — não há requisição de rede.
- O catálogo é fixo em `src/data/products.js`.
- `_legacy/` guarda o site antigo que estava nesta pasta; pode apagar.
