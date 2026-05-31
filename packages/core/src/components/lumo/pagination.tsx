"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** 1-based current page. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** Pages shown on each side of the current page. Defaults to 1. */
  siblingCount?: number
}

const DOTS = "dots"

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function paginationRange(page: number, pageCount: number, siblingCount: number): Array<number | typeof DOTS> {
  const totalPageNumbers = siblingCount + 5
  if (totalPageNumbers >= pageCount) {
    return range(1, pageCount)
  }

  const leftSibling = Math.max(page - siblingCount, 1)
  const rightSibling = Math.min(page + siblingCount, pageCount)
  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < pageCount - 2

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + 2 * siblingCount), DOTS, pageCount]
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(pageCount - (2 + 2 * siblingCount), pageCount)]
  }
  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, pageCount]
}

const itemClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-[color,background-color,transform] hover:bg-accent active:scale-95 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, pageCount, onPageChange, siblingCount = 1, ...props }, ref) => {
    if (pageCount <= 1) return null

    const pages = paginationRange(page, pageCount, siblingCount)

    return (
      <nav ref={ref} aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props}>
        <button
          type="button"
          className={itemClass}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((item, index) =>
          item === DOTS ? (
            <span key={`dots-${index}`} className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-muted-foreground" aria-hidden>
              &#8230;
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              className={cn(
                itemClass,
                item === page && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          className={itemClass}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
