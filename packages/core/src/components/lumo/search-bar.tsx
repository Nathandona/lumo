"use client"

import * as React from "react"
import { Search, X, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SearchBarProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  value: string
  onValueChange: (value: string) => void
  /** Fired when the user submits (Enter). Useful for query-on-submit search. */
  onSubmit?: (value: string) => void
  placeholder?: string
  /** Show a spinner in place of the clear button while results load. */
  loading?: boolean
  /** Accessible label for the input. Defaults to "Search". */
  label?: string
  size?: "sm" | "md"
}

const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (
    { className, value, onValueChange, onSubmit, placeholder = "Search", loading = false, label = "Search", size = "md", ...props },
    ref
  ) => {
    const height = size === "sm" ? "h-9" : "h-11"

    return (
      <form
        ref={ref}
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit?.(value)
        }}
        className={cn(
          "group relative flex items-center rounded-full border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
          height,
          className
        )}
        {...props}
      >
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          aria-label={label}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onValueChange(event.target.value)}
          className="h-full w-full rounded-full bg-transparent pl-11 pr-11 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {loading ? (
          <Loader2 className="absolute right-4 h-4 w-4 animate-spin text-muted-foreground" aria-hidden />
        ) : (
          value && (
            <button
              type="button"
              onClick={() => onValueChange("")}
              aria-label="Clear search"
              className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] hover:bg-accent hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          )
        )}
      </form>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
