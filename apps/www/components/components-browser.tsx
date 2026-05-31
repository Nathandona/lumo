"use client"

import * as React from "react"
import { ComponentCard } from "@/components/component-card"
import { SearchBar } from "@/components/search-bar"
import { REGISTRY, CATEGORY_ORDER } from "@/lib/registry-meta"

const cards = REGISTRY.map((entry) => ({
  id: entry.slug,
  name: entry.title,
  description: entry.description,
  category: entry.category as string,
  tags: entry.tags,
  preview: "",
}))

export function ComponentsBrowser() {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>("All")

  const counts = React.useMemo(() => {
    const map: Record<string, number> = { All: cards.length }
    for (const c of cards) map[c.category] = (map[c.category] ?? 0) + 1
    return map
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return cards.filter((c) => {
      const inCategory = category === "All" || c.category === category
      const inQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      return inCategory && inQuery
    })
  }, [query, category])

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <nav className="sticky top-28">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Categories</p>
          <ul className="space-y-1 border-l border-border">
            {CATEGORY_ORDER.map((name) => {
              const active = category === name
              return (
                <li key={name}>
                  <button
                    onClick={() => setCategory(name)}
                    className={`-ml-px flex w-full items-center justify-between border-l-2 py-1.5 pl-4 pr-2 text-sm transition-colors ${
                      active
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-primary/60 hover:text-foreground"
                    }`}
                  >
                    {name}
                    <span className="font-mono text-xs text-muted-foreground/60">{counts[name] ?? 0}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        <SearchBar placeholder="Search components..." onSearch={setQuery} />

        {filtered.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filtered.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {filtered.length} of {cards.length} components
            </p>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center">
            <p className="font-display text-xl font-semibold">No components found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Nothing matches that search yet. Try another term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
