import Link from "next/link"
import { Header } from "@/components/header"
import { ComponentCode } from "@/components/component-code"
import { CopyCommand } from "@/components/copy-command"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Boxes, Sun, FileCode2, Feather, Sparkles } from "lucide-react"
import { GithubIcon } from "@/components/icons"

const nav = [
  {
    group: "Get started",
    items: [
      { label: "Installation", href: "#installation" },
      { label: "Configuration", href: "#configuration" },
      { label: "Basic usage", href: "#usage" },
    ],
  },
  {
    group: "Reference",
    items: [{ label: "Why Lumo", href: "#why" }],
  },
]

const features = [
  { icon: FileCode2, title: "TypeScript first", body: "Full type safety and editor IntelliSense." },
  { icon: ShieldCheck, title: "Accessible", body: "WCAG 2.1 AA, keyboard and ARIA built in." },
  { icon: Sun, title: "Light by design", body: "A warm theme driven by CSS variables." },
  { icon: Sparkles, title: "Customizable", body: "Theme every token, edit the source freely." },
  { icon: Feather, title: "Tree-shakeable", body: "Ship only the blocks you install." },
  { icon: Boxes, title: "Headless", body: "Bring any backend, one normalized model." },
]

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center gap-2 border-b bg-[var(--glass)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="overflow-x-auto p-5">
        <ComponentCode code={code} />
      </div>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-7">
            {nav.map((section) => (
              <div key={section.group}>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
                  {section.group}
                </p>
                <ul className="space-y-1 border-l border-border">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 max-w-3xl">
          <header>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">Docs</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Build in the light.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Lumo is a copy-paste registry of e-commerce components. Install a block, own the code, theme the glow.
            </p>
          </header>

          {/* Installation */}
          <section id="installation" className="mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl font-bold tracking-tight">Installation</h2>
            <p className="mt-2 text-muted-foreground">
              Add any block straight into your repo with the shadcn CLI. Dependencies come with it.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <CopyCommand command="npx shadcn add https://lumo-www.vercel.app/r/product-card.json">
                npx shadcn add <span className="text-honey">product-card</span>
              </CopyCommand>
              <CopyCommand command="npx shadcn add https://lumo-www.vercel.app/r/cart-drawer.json">
                npx shadcn add <span className="text-honey">cart-drawer</span>
              </CopyCommand>
            </div>

            <ol className="mt-8 space-y-5 border-l border-border pl-6">
              {[
                ["Run shadcn init", "Set up components.json and the cn utility in your project."],
                ["Add a Lumo block", "The source and its dependencies land in your repo."],
                ["Wire your data", "Map your backend onto the normalized model and ship."],
              ].map(([t, d], i) => (
                <li key={t} className="relative">
                  <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="font-medium">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </li>
              ))}
            </ol>
          </section>

          {/* Configuration */}
          <section id="configuration" className="mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl font-bold tracking-tight">Configuration</h2>
            <p className="mt-2 text-muted-foreground">Point Tailwind at the source, then tune the theme tokens.</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <CodePanel
                title="tailwind.config.ts"
                code={`export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
}`}
              />
              <CodePanel
                title="globals.css"
                code={`:root {
  --background: 48 100% 98%;
  --foreground: 44 29% 18%;
  --primary: 39 100% 56%;
  --radius: 1rem;
}`}
              />
            </div>
          </section>

          {/* Usage */}
          <section id="usage" className="mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl font-bold tracking-tight">Basic usage</h2>
            <p className="mt-2 text-muted-foreground">Import the block you installed and compose it.</p>
            <div className="mt-5">
              <CodePanel
                title="app/page.tsx"
                code={`import { ProductCard } from '@/components/lumo/product-card'

export function App({ product }) {
  return (
    <ProductCard
      product={product}
      onAddToCart={(p, variant) => addLine(p, variant)}
    />
  )
}`}
              />
            </div>
          </section>

          {/* Why Lumo */}
          <section id="why" className="mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl font-bold tracking-tight">Why Lumo</h2>
            <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(150deg,var(--amberglow),var(--honey-2))] text-[hsl(var(--primary-foreground))]">
                    <f.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(150deg,var(--amberglow),var(--honey)_55%,var(--honey-2))] px-8 py-12 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[hsl(var(--primary-foreground))]">
              Drop your first component.
            </h2>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-[hsl(var(--primary-foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--primary-foreground))]/90">
                <Link href="/components">Browse components</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-[hsl(var(--primary-foreground))]/25 bg-transparent text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground))]/10">
                <a href="https://github.com/Nathandona/lumo" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
