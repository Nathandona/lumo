import { Header } from "@/components/header"
import { ComponentsBrowser } from "@/components/components-browser"

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

        <ComponentsBrowser />
      </div>
    </div>
  )
}
