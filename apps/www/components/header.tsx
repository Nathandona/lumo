"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: "Components", href: "/components" },
  { name: "Docs", href: "/docs" },
  { name: "Examples", href: "/examples" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 py-4">
      <div className="glass flex h-14 w-full max-w-5xl items-center justify-between rounded-full pl-5 pr-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFE9A8,hsl(var(--primary)))] shadow-[0_0_12px_hsl(var(--primary))]" />
          <span className="font-display text-xl font-bold tracking-tight">Lumo</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="https://github.com/Nathandona/lumo" target="_blank" rel="noopener noreferrer" className="gap-2">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l">
              <nav className="mt-10 flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-4 rounded-full">
                  <a href="https://github.com/Nathandona/lumo" target="_blank" rel="noopener noreferrer" className="gap-2">
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
