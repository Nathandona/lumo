"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navigation = [
    { name: "Components", href: "/components" },
    { name: "Documentation", href: "/docs" },
    { name: "Examples", href: "/examples" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-gradient">
              Lumo UI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileHeader navigation={navigation} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="h-9 w-full justify-start text-sm md:w-64 lg:w-96">
              <Search className="mr-2 h-4 w-4" />
              <span className="text-muted-foreground">Search components...</span>
            </Button>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild size="sm" variant="ghost">
              <a
                href="https://github.com/lumo-ui/lumo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

function MobileHeader({ navigation }: { navigation: Array<{ name: string; href: string }> }) {
  return (
    <div className="flex flex-col space-y-4">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-gradient">Lumo UI</span>
      </Link>
      <nav className="flex flex-col space-y-3 text-sm font-medium">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col space-y-3 border-t pt-4">
        <Button asChild variant="outline" className="justify-start">
          <a
            href="https://github.com/lumo-ui/lumo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </Button>
      </div>
    </div>
  )
}