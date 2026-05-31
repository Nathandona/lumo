"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Crumb {
  label: string
  /** Omit on the current page. */
  href?: string
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[]
  /** Separator between crumbs. Defaults to a chevron. */
  separator?: React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator, ...props }, ref) => {
    const sep = separator ?? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden />

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn("text-sm", className)} {...props}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={cn(isLast ? "font-medium text-foreground" : "text-muted-foreground")} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && sep}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumbs.displayName = "Breadcrumbs"

export { Breadcrumbs }
