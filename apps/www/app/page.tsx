import Link from "next/link"
import { ArrowRight, ShieldCheck, Boxes, Infinity as InfinityIcon } from "lucide-react"
import { ProductCard, type Product } from "@lumo-ui/core"
import { Button } from "@/components/ui/button"
import { CopyCommand } from "@/components/copy-command"
import { Header } from "@/components/header"
import { ProductShowcase } from "@/components/product-showcase"

const heroProduct: Product = {
  id: "hero",
  handle: "aurora-pendant",
  title: "Aurora Pendant Lamp",
  images: [
    {
      url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop",
      alt: "Aurora pendant lamp casting warm light",
    },
  ],
  options: [],
  badges: ["new"],
  rating: { value: 4.8, count: 96 },
  variants: [
    {
      id: "hero-1",
      price: { amount: 12900, currency: "USD" },
      compareAtPrice: { amount: 17900, currency: "USD" },
      selectedOptions: [],
      available: true,
    },
  ],
}

const features = [
  {
    icon: ShieldCheck,
    title: "Accessible",
    body: "Every block ships WCAG-aware: focus management, keyboard paths, and semantic markup, not bolted on later.",
  },
  {
    icon: Boxes,
    title: "Headless",
    body: "Bring any backend. Components consume one normalized model and never lock you into a platform.",
  },
  {
    icon: InfinityIcon,
    title: "Yours forever",
    body: "Copy-paste with the shadcn CLI. The source lands in your repo so you can read it and edit it freely.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero — asymmetric split, real ProductCard as the preview */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-7">
          <h1 className="reveal d1 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Storefronts that feel like <span className="text-honey">sunlight.</span>
          </h1>

          <p className="reveal d3 mt-6 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
            An accessible, headless registry of e-commerce components. Copy them into your project, theme the glow, ship something beautiful.
          </p>

          <div className="reveal d4 mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full text-base">
              <Link href="/components" className="gap-2">
                Browse components
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <CopyCommand command="npx shadcn add lumo/product-card">
              npx shadcn add <span className="text-honey">lumo/product-card</span>
            </CopyCommand>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="absolute -left-6 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFE9A8,hsl(var(--primary)))] shadow-[0_20px_50px_-10px_rgba(255,176,32,0.6)] float" />
          <div className="absolute -right-3 bottom-8 h-10 w-10 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFF2C8,#FFC94D)] shadow-[0_20px_50px_-10px_rgba(255,176,32,0.6)] float-slow" />
          <div className="glass float mx-auto max-w-sm rounded-3xl p-4">
            <ProductCard product={heroProduct} />
          </div>
        </div>
      </section>

      {/* Features — divided columns, no boxed cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-[18ch] font-display text-3xl font-bold tracking-tight md:text-4xl">
          Components built for builders, lit for the light.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {features.map((f, i) => (
            <div key={f.title} className={i > 0 ? "md:border-l md:border-border md:pl-10" : "md:pr-10"}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(150deg,var(--amberglow),var(--honey-2))] text-[hsl(var(--primary-foreground))]">
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live component demo (real @lumo-ui/core blocks) */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="glass rounded-3xl p-8 md:p-10">
          <ProductShowcase />
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,var(--amberglow),var(--honey)_55%,var(--honey-2))] px-8 py-16 text-center shadow-[0_40px_90px_-40px_rgba(255,176,32,0.7)]">
          <h2 className="mx-auto max-w-[20ch] font-display text-4xl font-bold leading-tight tracking-tight text-[hsl(var(--primary-foreground))] md:text-5xl">
            Start building in the light.
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-[hsl(var(--primary-foreground))]/80">
            One command drops accessible, headless commerce blocks into your repo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-[hsl(var(--primary-foreground))] text-base text-[hsl(var(--background))] hover:bg-[hsl(var(--primary-foreground))]/90">
              <Link href="/components">Browse components</Link>
            </Button>
            <code className="rounded-full border border-[hsl(var(--primary-foreground))]/20 px-5 py-3 font-mono text-sm text-[hsl(var(--primary-foreground))]">
              npx shadcn add lumo/cart-drawer
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <span className="font-display text-base font-bold text-foreground">Lumo UI</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/components" className="transition-colors hover:text-foreground">Components</Link>
            <Link href="/docs" className="transition-colors hover:text-foreground">Docs</Link>
            <a href="https://github.com/Nathandona/lumo" className="transition-colors hover:text-foreground">GitHub</a>
          </nav>
          <span>MIT, radiating warmth.</span>
        </div>
      </footer>
    </div>
  )
}
