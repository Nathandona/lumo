import { Header } from "@/components/header"
import { ProductShowcase } from "@/components/product-showcase"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">Examples</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            A storefront, fully lit.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A live demo composed entirely from Lumo blocks. Browse the grid, add to the cart, and review,
            all headless and accessible.
          </p>
        </header>

        <div className="glass mt-10 rounded-3xl p-8 md:p-10">
          <ProductShowcase />
        </div>
      </div>
    </div>
  )
}
