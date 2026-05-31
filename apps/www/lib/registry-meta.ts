// Single source of truth for the component registry surfaced on the site.
// The component browser, the detail/docs pages, and the live previews all read
// from this list. Slugs here MUST match the `name` of each item in registry.json
// so the install command resolves to the right block.

export const REGISTRY_BASE_URL = "https://lumo-www.vercel.app/r"

export type Category = "Primitives" | "Product" | "Discovery" | "Cart" | "Checkout"

export const CATEGORY_ORDER: Array<"All" | Category> = [
  "All",
  "Primitives",
  "Product",
  "Discovery",
  "Cart",
  "Checkout",
]

export interface PropDef {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

export interface RegistryEntry {
  slug: string
  title: string
  /** Short summary used on cards. */
  description: string
  /** Longer copy used on the detail page header. */
  detail: string
  category: Category
  tags: string[]
  /** npm packages shadcn installs alongside the block. */
  dependencies: string[]
  /** Other Lumo blocks this one pulls in (slugs). */
  registryDependencies: string[]
  importCode: string
  usageCode: string
  props: PropDef[]
}

/** Full shadcn install command for a block. */
export function installCommand(slug: string): string {
  return `npx shadcn@latest add ${REGISTRY_BASE_URL}/${slug}.json`
}

export const REGISTRY: RegistryEntry[] = [
  // ---- Primitives ---------------------------------------------------------
  {
    slug: "price-display",
    title: "Price Display",
    description: "Formatted price with compare-at and discount support.",
    detail:
      "Renders a Money value with locale-aware formatting, an optional struck-through compare-at price, and an automatic discount badge.",
    category: "Primitives",
    tags: ["money", "currency", "discount"],
    dependencies: ["class-variance-authority"],
    registryDependencies: ["lib"],
    importCode: `import { PriceDisplay } from "@/components/lumo/price-display"`,
    usageCode: `<PriceDisplay
  price={{ amount: 12900, currency: "USD" }}
  compareAtPrice={{ amount: 17900, currency: "USD" }}
  size="lg"
/>`,
    props: [
      { name: "price", type: "Money", required: true, description: "The current price, in integer minor units." },
      { name: "compareAtPrice", type: "Money", description: "Original price; shown struck through when higher." },
      { name: "showDiscount", type: "boolean", default: "true", description: "Render the discount percentage badge." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Type scale." },
      { name: "locale", type: "string", description: "BCP-47 locale for number formatting." },
    ],
  },
  {
    slug: "rating-stars",
    title: "Rating Stars",
    description: "Accessible star rating with an optional review count.",
    detail:
      "An accessible rating display. Exposes the score through an aria-label and renders a partial star for fractional values.",
    category: "Primitives",
    tags: ["accessible", "rating", "compact"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { RatingStars } from "@/components/lumo/rating-stars"`,
    usageCode: `<RatingStars value={4.5} count={128} />`,
    props: [
      { name: "value", type: "number", required: true, description: "Rating from 0 to max." },
      { name: "max", type: "number", default: "5", description: "Maximum number of stars." },
      { name: "count", type: "number", description: "Review count rendered next to the stars." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Star size." },
    ],
  },
  {
    slug: "quantity-stepper",
    title: "Quantity Stepper",
    description: "Accessible increment and decrement control with clamping.",
    detail:
      "A controlled quantity input with accessible increment and decrement buttons that clamp to min and max.",
    category: "Primitives",
    tags: ["input", "controls", "accessible"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { QuantityStepper } from "@/components/lumo/quantity-stepper"`,
    usageCode: `const [qty, setQty] = useState(1)

<QuantityStepper value={qty} onValueChange={setQty} min={1} max={9} />`,
    props: [
      { name: "value", type: "number", required: true, description: "Current quantity (controlled)." },
      { name: "onValueChange", type: "(value: number) => void", required: true, description: "Fired with the clamped next value." },
      { name: "min", type: "number", default: "1", description: "Lower bound; disables decrement at the floor." },
      { name: "max", type: "number", description: "Upper bound; disables increment at the ceiling." },
      { name: "disabled", type: "boolean", description: "Disable both controls." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Control size." },
      { name: "label", type: "string", description: "Accessible label for the group." },
    ],
  },

  // ---- Product ------------------------------------------------------------
  {
    slug: "variant-selector",
    title: "Variant Selector",
    description: "Option picker that detects available variant combinations.",
    detail:
      "Renders one group of buttons per product option and disables combinations that map to an unavailable variant.",
    category: "Product",
    tags: ["variants", "options", "interactive"],
    dependencies: [],
    registryDependencies: ["lib"],
    importCode: `import { VariantSelector } from "@/components/lumo/variant-selector"`,
    usageCode: `const [selected, setSelected] = useState([{ name: "Size", value: "M" }])

<VariantSelector
  options={[{ name: "Size", values: ["S", "M", "L"] }]}
  variants={variants}
  value={selected}
  onValueChange={setSelected}
/>`,
    props: [
      { name: "options", type: "ProductOption[]", required: true, description: "Option names and their possible values." },
      { name: "variants", type: "Variant[]", required: true, description: "Used to compute availability per combination." },
      { name: "value", type: "SelectedOption[]", required: true, description: "Currently selected options (controlled)." },
      { name: "onValueChange", type: "(value: SelectedOption[]) => void", required: true, description: "Fired with the next selection." },
    ],
  },
  {
    slug: "product-card",
    title: "Product Card",
    description: "Responsive product card with badges, rating, price, and actions.",
    detail:
      "A responsive product card with image, badges, rating, price, and quick actions for add-to-cart, quick view, and wishlist.",
    category: "Product",
    tags: ["responsive", "badge", "interactive"],
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["lib", "price-display", "rating-stars"],
    importCode: `import { ProductCard } from "@/components/lumo/product-card"`,
    usageCode: `<ProductCard
  product={product}
  onAddToCart={(product, variant) => addLine(product, variant)}
/>`,
    props: [
      { name: "product", type: "Product", required: true, description: "Normalized product to render." },
      { name: "onAddToCart", type: "(product, variant) => void", description: "Fired with the first available variant." },
      { name: "onQuickView", type: "(product) => void", description: "Open a quick-view modal." },
      { name: "onToggleWishlist", type: "(product) => void", description: "Toggle wishlist membership." },
      { name: "isInWishlist", type: "boolean", description: "Controls the wishlist icon state." },
      { name: "showQuickActions", type: "boolean", default: "true", description: "Render the hover quick-action buttons." },
      { name: "layout", type: '"default" | "compact" | "featured"', default: '"default"', description: "Card layout variant." },
      { name: "locale", type: "string", description: "BCP-47 locale for price formatting." },
    ],
  },
  {
    slug: "product-grid",
    title: "Product Grid",
    description: "Responsive product grid with loading skeletons and empty state.",
    detail:
      "A responsive grid of product cards with built-in loading skeletons and a customizable empty state.",
    category: "Product",
    tags: ["grid", "responsive", "loading"],
    dependencies: [],
    registryDependencies: ["lib", "product-card"],
    importCode: `import { ProductGrid } from "@/components/lumo/product-grid"`,
    usageCode: `<ProductGrid
  products={products}
  columns={3}
  onAddToCart={(product, variant) => addLine(product, variant)}
/>`,
    props: [
      { name: "products", type: "Product[]", required: true, description: "Products to render." },
      { name: "loading", type: "boolean", description: "Show skeletons instead of products." },
      { name: "loadingCount", type: "number", description: "Number of skeletons while loading." },
      { name: "columns", type: "2 | 3 | 4", default: "4", description: "Column count at the largest breakpoint." },
      { name: "emptyState", type: "ReactNode", description: "Rendered when products is empty." },
      { name: "onAddToCart", type: "(product, variant) => void", description: "Forwarded to each card." },
      { name: "isInWishlist", type: "(product) => boolean", description: "Per-product wishlist state." },
      { name: "locale", type: "string", description: "BCP-47 locale for price formatting." },
    ],
  },

  // ---- Discovery ----------------------------------------------------------
  {
    slug: "search-bar",
    title: "Search Bar",
    description: "Accessible search input with a clear button and loading state.",
    detail:
      "A controlled search input with a leading icon, a clear button, and an optional loading spinner. Submit on Enter for query-on-submit search.",
    category: "Discovery",
    tags: ["search", "input", "accessible"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { SearchBar } from "@/components/lumo/search-bar"`,
    usageCode: `const [query, setQuery] = useState("")

<SearchBar
  value={query}
  onValueChange={setQuery}
  onSubmit={(q) => router.push(\`/search?q=\${q}\`)}
  placeholder="Search products"
/>`,
    props: [
      { name: "value", type: "string", required: true, description: "Current query (controlled)." },
      { name: "onValueChange", type: "(value: string) => void", required: true, description: "Fired on every keystroke." },
      { name: "onSubmit", type: "(value: string) => void", description: "Fired on Enter; for query-on-submit search." },
      { name: "placeholder", type: "string", default: '"Search"', description: "Input placeholder." },
      { name: "loading", type: "boolean", description: "Swap the clear button for a spinner." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Control size." },
    ],
  },
  {
    slug: "sort-select",
    title: "Sort Select",
    description: "Sort-order dropdown with sensible default options.",
    detail:
      "A sort-order dropdown built on a native select for full accessibility. Ships with a default set of e-commerce options; pass your own items to customize.",
    category: "Discovery",
    tags: ["sort", "select", "accessible"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { SortSelect, defaultSortItems } from "@/components/lumo/sort-select"`,
    usageCode: `const [sort, setSort] = useState("featured")

<SortSelect value={sort} onValueChange={setSort} />`,
    props: [
      { name: "value", type: "string", required: true, description: "Selected sort value (controlled)." },
      { name: "onValueChange", type: "(value: string) => void", required: true, description: "Fired when the selection changes." },
      { name: "items", type: "SortItem[]", default: "defaultSortItems", description: "Override the available options." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Control size." },
    ],
  },
  {
    slug: "filter-panel",
    title: "Filter Panel",
    description: "Faceted checkbox filters with counts and clear-all.",
    detail:
      "A faceted filter panel: groups of checkboxes with optional result counts, an active-filter count badge, and a clear-all control. Fully controlled by a value keyed on group id.",
    category: "Discovery",
    tags: ["filter", "facets", "checkbox"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { FilterPanel } from "@/components/lumo/filter-panel"`,
    usageCode: `const [filters, setFilters] = useState({})

<FilterPanel
  groups={[
    { id: "size", label: "Size", options: [
      { value: "s", label: "Small", count: 12 },
      { value: "m", label: "Medium", count: 8 },
    ] },
  ]}
  value={filters}
  onValueChange={setFilters}
/>`,
    props: [
      { name: "groups", type: "FilterGroup[]", required: true, description: "Facet groups with their options." },
      { name: "value", type: "Record<string, string[]>", required: true, description: "Selected values keyed by group id." },
      { name: "onValueChange", type: "(value) => void", required: true, description: "Fired with the next selection." },
      { name: "title", type: "string", default: '"Filters"', description: "Panel heading." },
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    description: "Accessible page navigation with a truncated range.",
    detail:
      "Accessible page navigation with previous and next controls and a truncated page range with ellipses. Renders nothing for a single page.",
    category: "Discovery",
    tags: ["pagination", "navigation", "accessible"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { Pagination } from "@/components/lumo/pagination"`,
    usageCode: `const [page, setPage] = useState(1)

<Pagination page={page} pageCount={12} onPageChange={setPage} />`,
    props: [
      { name: "page", type: "number", required: true, description: "Current page (1-based)." },
      { name: "pageCount", type: "number", required: true, description: "Total number of pages." },
      { name: "onPageChange", type: "(page: number) => void", required: true, description: "Fired with the requested page." },
      { name: "siblingCount", type: "number", default: "1", description: "Pages shown on each side of the current page." },
    ],
  },
  {
    slug: "breadcrumbs",
    title: "Breadcrumbs",
    description: "Accessible breadcrumb trail with a current-page marker.",
    detail:
      "An accessible breadcrumb trail. The last crumb is marked as the current page; pass href on the rest to make them links. Swap the separator with any node.",
    category: "Discovery",
    tags: ["navigation", "breadcrumb", "accessible"],
    dependencies: ["lucide-react"],
    registryDependencies: [],
    importCode: `import { Breadcrumbs } from "@/components/lumo/breadcrumbs"`,
    usageCode: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Lighting", href: "/lighting" },
    { label: "Aurora Lamp" },
  ]}
/>`,
    props: [
      { name: "items", type: "Crumb[]", required: true, description: "Ordered crumbs; the last is the current page." },
      { name: "separator", type: "ReactNode", description: "Custom separator between crumbs." },
    ],
  },

  // ---- Cart ---------------------------------------------------------------
  {
    slug: "cart-line-item",
    title: "Cart Line Item",
    description: "A single cart line with image, quantity stepper, and total.",
    detail:
      "One cart row: image, title and variant, a quantity stepper, the line total, and a remove control.",
    category: "Cart",
    tags: ["cart", "quantity", "remove"],
    dependencies: ["lucide-react"],
    registryDependencies: ["lib", "price-display", "quantity-stepper"],
    importCode: `import { CartLineItem } from "@/components/lumo/cart-line-item"`,
    usageCode: `<CartLineItem
  line={line}
  onQuantityChange={(lineId, qty) => updateQuantity(lineId, qty)}
  onRemove={(lineId) => removeLine(lineId)}
/>`,
    props: [
      { name: "line", type: "CartLine", required: true, description: "The cart line to render." },
      { name: "onQuantityChange", type: "(lineId, quantity) => void", description: "Fired by the quantity stepper." },
      { name: "onRemove", type: "(lineId) => void", description: "Fired by the remove control." },
      { name: "locale", type: "string", description: "BCP-47 locale for price formatting." },
    ],
  },
  {
    slug: "cart-summary",
    title: "Cart Summary",
    description: "Subtotal, totals, a tax note, and a checkout button.",
    detail:
      "A cart totals panel: subtotal, an optional total, a taxes-and-shipping note, and a checkout button.",
    category: "Cart",
    tags: ["money", "totals", "checkout"],
    dependencies: [],
    registryDependencies: ["lib"],
    importCode: `import { CartSummary } from "@/components/lumo/cart-summary"`,
    usageCode: `<CartSummary
  subtotal={{ amount: 12900, currency: "USD" }}
  onCheckout={() => router.push("/checkout")}
/>`,
    props: [
      { name: "subtotal", type: "Money", required: true, description: "Cart subtotal." },
      { name: "total", type: "Money", description: "Optional grand total, when known." },
      { name: "onCheckout", type: "() => void", description: "Fired by the checkout button." },
      { name: "checkoutLabel", type: "string", default: '"Checkout"', description: "Checkout button label." },
      { name: "disabled", type: "boolean", description: "Disable the checkout button." },
      { name: "note", type: "ReactNode", description: "Override the taxes-and-shipping note." },
      { name: "locale", type: "string", description: "BCP-47 locale for price formatting." },
    ],
  },
  {
    slug: "cart-drawer",
    title: "Cart Drawer",
    description: "Accessible slide-over cart with line items and a summary.",
    detail:
      "An accessible slide-over cart built on Radix Dialog: line items, a summary, an empty state, and a slide-in animation.",
    category: "Cart",
    tags: ["dialog", "cart", "accessible"],
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "tw-animate-css"],
    registryDependencies: ["lib", "cart-line-item", "cart-summary"],
    importCode: `import { CartDrawer } from "@/components/lumo/cart-drawer"`,
    usageCode: `<CartDrawer
  open={open}
  onOpenChange={setOpen}
  lines={lines}
  subtotal={subtotal}
  onCheckout={() => router.push("/checkout")}
  trigger={<button>Cart ({totalQuantity})</button>}
/>`,
    props: [
      { name: "lines", type: "CartLine[]", required: true, description: "Cart lines to render." },
      { name: "subtotal", type: "Money", required: true, description: "Cart subtotal." },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open) => void", description: "Fired when the drawer opens or closes." },
      { name: "total", type: "Money", description: "Optional grand total." },
      { name: "onQuantityChange", type: "(lineId, quantity) => void", description: "Forwarded to each line." },
      { name: "onRemove", type: "(lineId) => void", description: "Forwarded to each line." },
      { name: "onCheckout", type: "() => void", description: "Fired by the summary checkout button." },
      { name: "trigger", type: "ReactNode", description: "Element that opens the drawer." },
      { name: "title", type: "string", default: '"Your cart"', description: "Drawer heading." },
      { name: "emptyState", type: "ReactNode", description: "Rendered when the cart is empty." },
    ],
  },
  {
    slug: "cart-provider",
    title: "Cart Provider",
    description: "Optional, backend-agnostic client-side cart state.",
    detail:
      "A CartProvider context and useCart hook for client-side cart state: add lines, merge duplicate variants, update quantities, clear, and compute the subtotal. Sync to your backend through onLinesChange. Lumo components stay presentational; opt into this only when you want managed state.",
    category: "Cart",
    tags: ["state", "context", "hook"],
    dependencies: [],
    registryDependencies: ["lib"],
    importCode: `import { CartProvider, useCart } from "@/components/lumo/cart-provider"`,
    usageCode: `<CartProvider currency="USD" onLinesChange={save}>
  <App />
</CartProvider>

// anywhere inside the tree:
const { lines, subtotal, totalQuantity, addLine, removeLine, updateQuantity, clear } = useCart()`,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Subtree that can read the cart." },
      { name: "currency", type: "string", default: '"USD"', description: "Currency used while the cart is empty." },
      { name: "initialLines", type: "CartLine[]", default: "[]", description: "Hydrate from storage or a backend." },
      { name: "onLinesChange", type: "(lines) => void", description: "Fired whenever lines change, for syncing." },
    ],
  },

  // ---- Checkout -----------------------------------------------------------
  {
    slug: "address-form",
    title: "Address Form",
    description: "Validated address form that emits a normalized Address.",
    detail:
      "A validated shipping or billing address form built on react-hook-form and zod. Emits a normalized Address on submit.",
    category: "Checkout",
    tags: ["form", "validation", "address"],
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    registryDependencies: ["lib"],
    importCode: `import { AddressForm } from "@/components/lumo/address-form"`,
    usageCode: `<AddressForm
  onSubmit={(address) => saveAddress(address)}
  submitLabel="Save address"
/>`,
    props: [
      { name: "defaultValues", type: "Partial<Address>", description: "Prefill the form." },
      { name: "onSubmit", type: "(address: Address) => void", description: "Fired with the validated address." },
      { name: "submitLabel", type: "string", default: '"Continue"', description: "Submit button label." },
      { name: "className", type: "string", description: "Extra classes on the form element." },
    ],
  },
  {
    slug: "order-summary",
    title: "Order Summary",
    description: "Read-only order review with line items and totals.",
    detail:
      "A read-only order review with line items, subtotal, shipping, tax, and total.",
    category: "Checkout",
    tags: ["money", "review", "totals"],
    dependencies: [],
    registryDependencies: ["lib"],
    importCode: `import { OrderSummary } from "@/components/lumo/order-summary"`,
    usageCode: `<OrderSummary
  lines={lines}
  subtotal={subtotal}
  shipping={{ amount: 0, currency: "USD" }}
  tax={tax}
  total={total}
/>`,
    props: [
      { name: "lines", type: "CartLine[]", required: true, description: "Lines to review." },
      { name: "subtotal", type: "Money", required: true, description: "Order subtotal." },
      { name: "shipping", type: "Money", description: "Shipping cost." },
      { name: "tax", type: "Money", description: "Tax amount." },
      { name: "total", type: "Money", description: "Grand total." },
      { name: "title", type: "string", default: '"Order summary"', description: "Panel heading." },
      { name: "locale", type: "string", description: "BCP-47 locale for price formatting." },
    ],
  },
  {
    slug: "checkout-form",
    title: "Checkout Form",
    description: "Payment-agnostic checkout with validation and a payment slot.",
    detail:
      "A payment-agnostic checkout: contact and shipping fields with validation, a slot for your payment provider UI, an order summary, and submit states. Wire your own PSP.",
    category: "Checkout",
    tags: ["form", "validation", "accessible"],
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    registryDependencies: ["lib", "order-summary"],
    importCode: `import { CheckoutForm } from "@/components/lumo/checkout-form"`,
    usageCode: `<CheckoutForm
  lines={lines}
  subtotal={subtotal}
  total={total}
  paymentSlot={<StripeElements />}
  onSubmit={async (values) => createOrder(values)}
/>`,
    props: [
      { name: "lines", type: "CartLine[]", required: true, description: "Lines shown in the summary." },
      { name: "subtotal", type: "Money", required: true, description: "Order subtotal." },
      { name: "shipping", type: "Money", description: "Shipping cost." },
      { name: "tax", type: "Money", description: "Tax amount." },
      { name: "total", type: "Money", description: "Grand total." },
      { name: "paymentSlot", type: "ReactNode", description: "Your payment provider UI, e.g. Stripe Elements." },
      { name: "onSubmit", type: "(values: CheckoutValues) => void | Promise<void>", description: "Fired on valid submit." },
      { name: "submitLabel", type: "string", default: '"Place order"', description: "Submit button label." },
    ],
  },
  {
    slug: "order-confirmation",
    title: "Order Confirmation",
    description: "Post-purchase confirmation with order number and receipt.",
    detail:
      "A post-purchase confirmation with order number, receipt email, an item summary, and the total.",
    category: "Checkout",
    tags: ["success", "receipt", "state"],
    dependencies: ["lucide-react"],
    registryDependencies: ["lib"],
    importCode: `import { OrderConfirmation } from "@/components/lumo/order-confirmation"`,
    usageCode: `<OrderConfirmation
  orderNumber="LUMO-40271"
  email="you@example.com"
  lines={lines}
  total={total}
/>`,
    props: [
      { name: "orderNumber", type: "string", required: true, description: "Human-readable order number." },
      { name: "email", type: "string", description: "Receipt email address." },
      { name: "lines", type: "CartLine[]", description: "Purchased items to summarize." },
      { name: "total", type: "Money", description: "Order total." },
      { name: "onContinue", type: "() => void", description: "Fired by the continue button." },
      { name: "continueLabel", type: "string", default: '"Continue shopping"', description: "Continue button label." },
    ],
  },
]

export function getEntry(slug: string): RegistryEntry | undefined {
  return REGISTRY.find((entry) => entry.slug === slug)
}

const titleBySlug = new Map(REGISTRY.map((entry) => [entry.slug, entry.title]))

/** Human title for a block slug (for rendering registry-dependency links). */
export function titleForSlug(slug: string): string {
  return titleBySlug.get(slug) ?? slug
}
