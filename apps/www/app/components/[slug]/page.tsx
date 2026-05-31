import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Package } from "lucide-react"

import { Header } from "@/components/header"
import { CopyCommand } from "@/components/copy-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentProps } from "@/components/component-props"
import { RegistryPreview } from "@/components/registry-previews"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/icons"
import { REGISTRY, getEntry, installCommand, titleForSlug } from "@/lib/registry-meta"

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return REGISTRY.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) return {}
  return {
    title: `${entry.title} - Lumo UI`,
    description: entry.description,
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const entry = getEntry(slug)

  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/components"
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to components
        </Link>

        {/* Header */}
        <div className="mt-8 max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">{entry.category}</p>
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{entry.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{entry.detail}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Preview */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Preview</h2>
          <div className="mt-5 flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border bg-[var(--glass)] p-8">
            <RegistryPreview id={entry.slug} />
          </div>
        </section>

        {/* Installation */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Installation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Run the shadcn CLI. Dependencies and the shared{" "}
            <Link href="/docs" className="text-honey hover:underline">
              lib
            </Link>{" "}
            block come with it.
          </p>
          <div className="mt-5">
            <CopyCommand command={installCommand(entry.slug)}>
              npx shadcn add <span className="text-honey">{entry.slug}</span>
            </CopyCommand>
          </div>
        </section>

        {/* Usage */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Usage</h2>
          <div className="mt-5 space-y-4">
            <CodeBlock label="Import" code={entry.importCode} />
            <CodeBlock label="Example" code={entry.usageCode} />
          </div>
        </section>

        {/* Props */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Props</h2>
          <div className="mt-5">
            <ComponentProps props={entry.props} />
          </div>
        </section>

        {/* Dependencies */}
        {(entry.dependencies.length > 0 || entry.registryDependencies.length > 0) && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Dependencies</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {entry.registryDependencies.length > 0 && (
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">Lumo blocks</p>
                  <ul className="space-y-2">
                    {entry.registryDependencies.map((dep) => {
                      const hasPage = getEntry(dep)
                      return (
                        <li key={dep}>
                          {hasPage ? (
                            <Link
                              href={`/components/${dep}`}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-honey transition-all hover:gap-2.5"
                            >
                              {titleForSlug(dep)}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                              <Package className="h-3.5 w-3.5 text-muted-foreground" />
                              {dep}
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {entry.dependencies.length > 0 && (
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">npm packages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.dependencies.map((dep) => (
                      <code
                        key={dep}
                        className="rounded-md border border-[var(--stroke)] bg-[var(--glass)] px-2 py-1 font-mono text-xs"
                      >
                        {dep}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-2xl border bg-[var(--glass)] p-8 text-center">
          <h3 className="font-display text-xl font-semibold tracking-tight">Own every line</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Lumo blocks copy into your repo. No runtime dependency, no lock-in. Edit the code to fit your product.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full" asChild>
              <a href="https://github.com/Nathandona/lumo" target="_blank" rel="noopener noreferrer" className="gap-2">
                <GithubIcon className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
