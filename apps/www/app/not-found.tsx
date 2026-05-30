import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,201,77,0.45),transparent_70%)] blur-2xl" />
          <span className="float inline-flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-[radial-gradient(circle_at_35%_35%,#FFE9A8,hsl(var(--primary)))] shadow-[0_30px_70px_-20px_rgba(255,176,32,0.7)]">
            <span className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_38%_34%,#fff,#FFD874)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
          </span>
        </div>

        <p className="font-mono text-sm uppercase tracking-[0.28em] text-honey">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
          This page slipped out of the light.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          The page you are looking for moved, or never existed. Let us guide you back.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/components">Browse components</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
