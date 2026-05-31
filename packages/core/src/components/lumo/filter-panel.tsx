"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FilterOption {
  value: string
  label: string
  /** Optional result count shown next to the option. */
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
}

/** Selected values keyed by group id. */
export type FilterValue = Record<string, string[]>

export interface FilterPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  groups: FilterGroup[]
  value: FilterValue
  onValueChange: (value: FilterValue) => void
  title?: string
}

function countActive(value: FilterValue): number {
  return Object.values(value).reduce((total, values) => total + values.length, 0)
}

const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  ({ className, groups, value, onValueChange, title = "Filters", ...props }, ref) => {
    const active = countActive(value)

    const toggle = (groupId: string, optionValue: string) => {
      const current = value[groupId] ?? []
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue]
      onValueChange({ ...value, [groupId]: next })
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold">
            {title}
            {active > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                {active}
              </span>
            )}
          </h3>
          {active > 0 && (
            <button
              type="button"
              onClick={() => onValueChange({})}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>

        {groups.map((group) => (
          <fieldset key={group.id} className="flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
              {group.label}
            </legend>
            {group.options.map((option) => {
              const checked = (value[group.id] ?? []).includes(option.value)
              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2.5 text-sm transition-colors hover:text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(group.id, option.value)}
                    className="h-4 w-4 shrink-0 cursor-pointer rounded border-input accent-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <span className={cn("flex-1", checked ? "text-foreground" : "text-muted-foreground")}>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">{option.count}</span>
                  )}
                </label>
              )
            })}
          </fieldset>
        ))}
      </div>
    )
  }
)
FilterPanel.displayName = "FilterPanel"

export { FilterPanel }
