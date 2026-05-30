import { Header } from "@/components/header"
import { ComponentCard } from "@/components/component-card"
import { SearchBar } from "@/components/search-bar"

const components = [
  { id: "product-card", name: "Product Card", description: "Responsive product cards with variants, badges, and quick actions.", category: "E-commerce", tags: ["responsive", "badge", "interactive"], preview: "" },
  { id: "cart-drawer", name: "Cart Drawer", description: "Accessible slide-over cart with line items and a summary.", category: "E-commerce", tags: ["dialog", "cart", "accessible"], preview: "" },
  { id: "variant-selector", name: "Variant Selector", description: "Option picker that detects which variant combinations are available.", category: "E-commerce", tags: ["variants", "options", "interactive"], preview: "" },
  { id: "price-display", name: "Price Display", description: "Formatted price with compare-at and discount support.", category: "E-commerce", tags: ["money", "currency", "discount"], preview: "" },
  { id: "rating", name: "Rating Stars", description: "Accessible star rating with an optional review count.", category: "Feedback", tags: ["accessible", "rating", "compact"], preview: "" },
  { id: "quantity-selector", name: "Quantity Stepper", description: "Accessible quantity input with increment and decrement controls.", category: "Forms", tags: ["input", "controls", "accessible"], preview: "" },
]

const categories = [
  { name: "All", count: 6 },
  { name: "E-commerce", count: 4 },
  { name: "Forms", count: 1 },
  { name: "Feedback", count: 1 },
  { name: "Media", count: 0 },
  { name: "Navigation", count: 0 },
]

export default function ComponentsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="reveal d1 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">Registry</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Components</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Accessible, headless e-commerce blocks. Install any one with the shadcn CLI and own the code.
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          {/* Category rail */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Categories</p>
              <ul className="space-y-1 border-l border-border">
                {categories.map((c, i) => (
                  <li key={c.name}>
                    <button
                      className={`-ml-px flex w-full items-center justify-between border-l-2 py-1.5 pl-4 pr-2 text-sm transition-colors ${
                        i === 0
                          ? "border-primary font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:border-primary/60 hover:text-foreground"
                      }`}
                    >
                      {c.name}
                      <span className="font-mono text-xs text-muted-foreground/60">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Grid */}
          <div className="min-w-0">
            <SearchBar placeholder="Search components..." />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {components.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              6 components, more landing soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
