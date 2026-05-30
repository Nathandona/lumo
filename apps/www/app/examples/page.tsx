import { Header } from "@/components/header"
import { ProductShowcase } from "@/components/product-showcase"
import { CheckoutDemo } from "@/components/checkout-demo"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <header data-reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">Examples</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            A storefront, fully lit.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A live demo composed entirely from Lumo blocks. Browse the grid, add to the cart, and review,
            all headless and accessible.
          </p>
        </header>

        <div data-reveal className="glass mt-10 rounded-3xl p-8 md:p-10">
          <ProductShowcase />
        </div>

        <div data-reveal className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Checkout, end to end</h2>
          <p className="mt-2 text-muted-foreground">
            Validated and payment-agnostic. Fill it in and place the order to see the confirmation.
          </p>
          <div className="glass mt-6 rounded-3xl p-6 md:p-8">
            <CheckoutDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
