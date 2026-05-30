# Lumo UI - Product Specification

> shadcn/ui for e-commerce: own-the-code, headless, accessible commerce blocks you install with one command.

Status: draft for review. Authored 2026-05-30. No code changes accompany this document; it is the agreed blueprint before implementation.

---

## 1. Audience and positioning

**Primary audience: frontend developers building headless commerce.**
They already use React, Tailwind, and shadcn/ui. They already have a backend (Shopify Storefront API, Medusa, commercetools, Saleor, or a custom API). They do not want a locked template or a runtime dependency. They want a polished, accessible UI layer they own and can edit.

**Secondary audience: agencies and freelancers.**
They build client storefronts repeatedly and value reusable, rethemeable blocks plus clean code handoff. The copy-paste registry model fits client handoff because the client receives plain owned source, not a vendor dependency.

**Explicitly not optimizing for:** no-code indie founders (they want a batteries-included starter kit, which is the wrong form factor here) and pure design-system teams (too niche).

**One-line positioning:** the e-commerce equivalent of shadcn/ui. You run one command, the component source lands in your repo, you own and customize it, and it works with any backend.

---

## 2. Goals and non-goals

### Goals
- Provide accessible, typed, production-grade commerce UI blocks that users copy into their own repositories.
- Stay backend-agnostic. Components accept normalized data via props and emit events via callbacks.
- Ship a complete buy-flow demonstration in v1 (browse, product, cart, checkout, confirmation).
- Be trivially rethemeable through CSS variables and Tailwind v4 tokens.
- Keep the project open source under MIT with no monetization in v1.

### Non-goals (v1)
- No npm-installed runtime library. Distribution is copy-paste registry only.
- No baked-in payment provider SDK. Payment is wired by the user; a Stripe reference example is documented separately.
- No backend, no server, no hosted service.
- No tax, shipping-rate, or inventory engines. Totals that require business logic are provided by the user.
- No custom CLI in v1. We use the existing shadcn CLI against our registry.

---

## 3. Form factor and distribution

**Form factor:** shadcn-style registry. Component source is copied into the user's repository. The user owns and edits it. There is no runtime dependency on a Lumo package.

**Install mechanism:** the standard shadcn CLI pointed at Lumo registry JSON.

```bash
npx shadcn@latest add https://lumo.dev/r/product-card.json
npx shadcn@latest add https://lumo.dev/r/cart-drawer.json
```

Each registry item declares:
- `dependencies`: npm packages it needs (for example `class-variance-authority`, `lucide-react`, `react-hook-form`, `zod`).
- `registryDependencies`: other Lumo blocks and shared lib it composes (for example the `lib` utilities and `price-display`).
- `files`: the component source, with target paths under the user's configured components directory.

No custom `lumo` CLI is built for v1. A branded wrapper CLI is a post-traction consideration, not a v1 deliverable.

---

## 4. Architecture

The existing pnpm and Turborepo monorepo is reused. The packages remain the authored source of truth and are fully tested. A build step compiles them into registry JSON. Nothing is published to npm.

```
lumo/
├── packages/
│   ├── core/      # component source, authored + unit tested
│   ├── hooks/     # optional headless state + commerce hooks
│   └── utils/     # framework-agnostic helpers (money, validation, calc)
├── apps/
│   └── www/       # Next.js docs site; also hosts the registry at /public/r/*.json
├── registry.json  # shadcn registry manifest referencing package source
└── SPEC.md
```

**Source of truth:** `packages/*`. Components are written, type-checked, and tested here with the full toolchain (tsup, vitest, Testing Library, ESLint).

**Registry build:** `registry.json` maps each block to its source files and dependencies. Running `npx shadcn build` compiles it into static JSON under `apps/www/public/r/`. The docs site serves these files, so the registry host and the docs host are the same deployment.

**Hosting:** `apps/www` (Next.js) is deployed (for example to Vercel) at `lumo.dev`. The registry is available at `https://lumo.dev/r/<block>.json`.

The `apps/storybook` workspace remains available as a component playground during development.

> Migration note: the repo currently uses Tailwind v3. Moving to Tailwind v4 (Section 8) is a prerequisite build task.

---

## 5. Rendering model

Components are client components (`"use client"`) and run in any React 18 setup: Next.js App Router and Pages Router, Vite, Remix, and Astro islands. The user fetches data on the server or client however they like and passes it in as props.

Server Components are not required to use Lumo. The docs include recommended Next.js App Router patterns (fetch in a server component, render Lumo display blocks, hydrate interactive islands such as add-to-cart and the cart drawer), but the components themselves do not depend on RSC.

---

## 6. Data model

Components consume a normalized commerce model. This is the contract users map their backend onto. Mapping guides for Shopify and Medusa are documented; the types ship as a registry `lib` block so they are copied alongside components.

Money is represented in integer minor units to avoid floating-point errors, paired with an ISO 4217 currency code. A `formatMoney` helper converts to a localized display string via `Intl.NumberFormat`.

```ts
type CurrencyCode = string // ISO 4217, e.g. 'USD', 'EUR'

interface Money {
  amount: number // integer, minor units (e.g. cents). 1999 = 19.99 USD
  currency: CurrencyCode
}

interface Image {
  url: string
  alt?: string
  width?: number
  height?: number
}

interface ProductOption {
  name: string // e.g. 'Size'
  values: string[] // e.g. ['S', 'M', 'L']
}

interface SelectedOption {
  name: string
  value: string
}

interface Variant {
  id: string
  sku?: string
  title?: string
  price: Money
  compareAtPrice?: Money // original price, drives discount display
  selectedOptions: SelectedOption[]
  available: boolean
  inventoryQuantity?: number
  image?: Image
}

interface Product {
  id: string
  handle: string // url slug
  title: string
  description?: string
  images: Image[]
  options: ProductOption[]
  variants: Variant[]
  defaultVariantId?: string
  rating?: { value: number; count: number }
  badges?: string[] // 'sale' | 'new' | 'limited' | custom
  tags?: string[]
  vendor?: string
}

interface CartLine {
  id: string
  variant: Variant
  product: Pick<Product, 'id' | 'handle' | 'title' | 'images'>
  quantity: number
  lineTotal: Money
}

interface Cart {
  id?: string
  lines: CartLine[]
  currency: CurrencyCode
  subtotal: Money
  // tax, shipping, discounts, and grand total are provided by the user
  // when they require business logic the components do not own.
  total?: Money
}

interface Address {
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  region?: string // state / province
  postalCode: string
  country: string // ISO 3166-1 alpha-2
  phone?: string
}
```

The current flat `Product` type (single `price: number`, single `image`) is replaced by this model. Existing components are updated accordingly during implementation.

---

## 7. State model

Default behavior is presentational. Every component takes data via props and emits events via callbacks. The user owns state.

On top of that, Lumo ships optional headless state primitives as separate registry blocks. They are backend-agnostic: they manage client-side cart and wishlist state and expose hooks, and the user syncs to their backend through callbacks. Users opt in only if they want the batteries.

```tsx
// Presentational by default
<ProductCard product={product} onAddToCart={handleAdd} />

// Or opt into headless state
<CartProvider onChange={syncToBackend}>
  <CartDrawer /> {/* reads useCart() internally */}
</CartProvider>
```

State blocks and hooks (sourced from the existing `packages/hooks`):
- `cart-provider`: `CartProvider`, `useCart` (add, remove, update quantity, clear, totals).
- `wishlist-provider`: `WishlistProvider`, `useWishlist` (toggle, has, list).
- `use-product-filters`, `use-product-sort`: client-side discovery helpers.
- `use-checkout`: checkout step and submission state.

These are independent of the presentational components and never required to render a block.

---

## 8. Theming and styling

- **Tailwind v4** is the styling system. This is a migration from the current v3 setup and is a prerequisite task. Tokens are defined with the v4 `@theme` approach.
- **Neutral default look.** The default theme is unbranded and quiet so users retheme with minimal friction. Lumo does not impose a strong visual identity by default.
- **Theming via CSS variables** (HSL), compatible with shadcn/ui tokens (`--primary`, `--background`, `--ring`, `--radius`, and so on). Dark mode is supported through the same variables.
- **Preset themes.** Ship two or three example themes that the docs site can switch between live, to demonstrate retheming.

---

## 9. Commerce correctness conventions

All four were selected and are in scope.

- **Forms: react-hook-form + zod.** All forms (checkout, address) use react-hook-form for state and zod for schema validation, with accessible, typed error handling. This matches the shadcn form convention.
- **Money: Intl-based, multi-currency.** Prices are `Money` objects (Section 6). Display uses `Intl.NumberFormat` with locale and currency, never a hardcoded `$`. Minor-unit handling is correct per currency.
- **i18n-ready strings.** No hardcoded UI text inside components. All labels are overridable via props or a messages object. English defaults ship.
- **RTL and locale a11y.** Layouts work in right-to-left languages and respect locale-aware formatting. Logical CSS properties are used where layout direction matters.

Accessibility baseline remains WCAG 2.1 AA: ARIA roles and labels, full keyboard navigation, managed focus, screen-reader-friendly markup, semantic HTML.

---

## 10. Component catalog

v1 strategy is a thin end-to-end golden path across all four surfaces: a complete, working buy flow, plus a few support blocks per surface. Depth per surface comes in v1.x.

### Golden path (v1 core)
The connected buy flow: ProductGrid to ProductCard to VariantSelector to CartDrawer to CheckoutForm to OrderConfirmation.

**Primitives (shared lib + small blocks)**
- `lib`: `cn`, `formatMoney`, validation and calculation helpers, the data-model types.
- `price-display`: renders `Money`, including compare-at and discount.
- `rating-stars`, `badge`, `quantity-stepper`.

**Product display**
- `product-card` (hero block, supports variants, badge, rating, quick actions)
- `product-grid`
- `variant-selector`

**Cart**
- `cart-drawer` (hero block)
- `cart-line-item`
- `cart-summary`
- `empty-cart`

**Checkout** (Section 11)
- `checkout-form` (hero block)
- `address-form`
- `order-summary`
- `order-confirmation`

**Discovery**
- `search-bar`
- `sort-select`
- `pagination`
- `breadcrumbs`

**Optional state**
- `cart-provider`, `wishlist-provider`, and the hooks listed in Section 7.

### Deferred to v1.x and beyond
Product gallery and zoom, quick-view dialog, faceted filter panel, reviews block, account and order-history blocks, mega-menu and navigation, and official backend adapter documentation packages (Shopify, Medusa).

---

## 11. Checkout and payments

Checkout ships as UI plus validation, payment-provider-agnostic.

- `checkout-form`, `address-form`, `order-summary`, and `order-confirmation` handle layout, fields, validation (react-hook-form + zod), and all states (idle, submitting, error, success).
- No payment SDK is baked in. The form emits a validated payload via `onSubmit`; the user wires their processor.
- A **Stripe reference example** is provided in the docs and as an example app section, showing Stripe Elements wired to the checkout components. It is documentation and example code, not a maintained Lumo block, so the headless promise stays intact.

Out of scope: tax calculation, shipping rates, and payment capture. These are the user's backend responsibility; components display totals the user supplies.

---

## 12. Docs site

`apps/www` becomes a full documentation site in the spirit of ui.shadcn.com. It is both the marketing surface and the registry host.

Features:
- Live, interactive component previews.
- Per-block install command with copy button (`npx shadcn add https://lumo.dev/r/<block>.json`).
- Props and types tables.
- Theme switcher demonstrating the preset themes (Section 8).
- A live golden-path demo storefront that exercises the full buy flow.
- Hosts the compiled registry JSON at `/r/*.json`.

---

## 13. Tooling and quality gates

- **Build:** tsup per package for authored source; `shadcn build` to compile the registry.
- **Tests:** vitest + Testing Library (already present). Add axe-based accessibility assertions for interactive blocks.
- **Static checks:** TypeScript strict (no `any`), ESLint, Prettier.
- **CI:** add a GitHub Actions workflow running lint, type-check, test, and registry build on pull requests (not currently present).
- **Versioning:** since nothing publishes to npm, registry blocks are versioned through git and a CHANGELOG. Changesets can be dropped or repurposed for human-readable release notes.

---

## 14. Roadmap

- **M0 - Foundation.** This spec, Tailwind v4 migration, registry plumbing (`registry.json` + `shadcn build`), normalized data model and `lib` utilities, CI workflow.
- **M1 - Product and cart.** Golden-path product display and cart blocks, optional cart state, docs site skeleton with live previews for shipped blocks.
- **M2 - Checkout.** Checkout surface, validation, and the Stripe reference example.
- **M3 - Discovery.** Search, sort, pagination, breadcrumbs, and the live demo storefront tying the full path together.
- **M4 - Polish.** Preset themes, RTL pass, i18n message extraction, and added product-display depth (gallery, quick view).
- **Post-v1.** Faceted filters, reviews, account blocks, and backend adapter guides for Shopify and Medusa.

---

## 15. Open questions and risks

- **Money mapping.** Backends differ (Shopify uses decimal strings, Stripe uses integer cents). The minor-units contract needs clear per-backend mapping guidance to avoid rounding bugs.
- **Variant option UX.** Products with many options and large variant matrices need a defined selection and availability strategy.
- **Totals ownership.** The line between what components compute (subtotal, line totals) and what the user provides (tax, shipping, discounts) must be unambiguous in every cart and checkout block.
- **Registry granularity.** Balancing small composable blocks against deep `registryDependencies` chains so installs stay simple.
- **Tailwind v4 maturity.** Confirm plugin and ecosystem compatibility during the migration.
- **i18n delivery.** Decide between a messages-prop approach and a context-based approach for overridable strings.

---

## 16. Decision log

These decisions were settled during the scoping interview and drive the spec above.

| Area | Decision |
| --- | --- |
| Primary audience | Frontend devs building headless commerce; agencies secondary |
| Form factor | shadcn-style registry, copy-paste, user owns the code |
| Backend | Headless-agnostic, data via props |
| Business model | Fully open source, MIT, no v1 monetization |
| v1 scope | All four surfaces, thin end-to-end golden path, deepen later |
| State | Presentational default plus optional headless state primitives |
| Rendering | Client components that run anywhere; Next patterns documented |
| Distribution | shadcn registry and CLI, no custom CLI in v1 |
| Checkout | UI plus validation, PSP-agnostic, Stripe reference in docs |
| Theming | Tailwind v4, neutral default, CSS-variable themes, preset themes |
| Correctness | react-hook-form + zod, Intl money and multi-currency, i18n-ready strings, RTL and locale a11y |
| Data model | Normalized: Product, Variant, Money, CartLine, Address, inventory |
| Packages role | Source of truth, generate registry JSON, no npm publish |
| Docs site | Full ui.shadcn.com-style site that also hosts the registry |
