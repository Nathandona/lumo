"use client"

import * as React from "react"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SortItem {
  value: string
  label: string
}

/** A sensible default set of e-commerce sort options. */
export const defaultSortItems: SortItem[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest rated" },
  { value: "name-asc", label: "Name: A to Z" },
]

export interface SortSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string
  onValueChange: (value: string) => void
  items?: SortItem[]
  /** Accessible label. Defaults to "Sort by". */
  label?: string
  size?: "sm" | "md"
}

const SortSelect = React.forwardRef<HTMLDivElement, SortSelectProps>(
  ({ className, value, onValueChange, items = defaultSortItems, label = "Sort by", size = "md", ...props }, ref) => {
    const height = size === "sm" ? "h-9" : "h-11"

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center rounded-full border border-input bg-background text-sm transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
          height,
          className
        )}
        {...props}
      >
        <ArrowUpDown className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
        <select
          aria-label={label}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className="h-full cursor-pointer appearance-none rounded-full bg-transparent pl-11 pr-10 font-medium focus-visible:outline-none"
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-muted-foreground" />
      </div>
    )
  }
)
SortSelect.displayName = "SortSelect"

export { SortSelect }
