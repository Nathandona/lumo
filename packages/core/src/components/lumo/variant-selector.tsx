import * as React from "react"
import type { ProductOption, SelectedOption, Variant } from "@/lib/lumo/types"

import { cn } from "@/lib/utils"

export interface VariantSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  options: ProductOption[]
  variants: Variant[]
  /** Currently selected option values. */
  value: SelectedOption[]
  onValueChange: (value: SelectedOption[]) => void
}

/**
 * Returns true if choosing `value` for `optionName` leads to at least one
 * available variant, given the other currently selected options.
 */
function isValueAvailable(
  optionName: string,
  value: string,
  variants: Variant[],
  selected: SelectedOption[]
): boolean {
  const others = selected.filter((option) => option.name !== optionName)
  return variants.some((variant) => {
    if (!variant.available) return false
    const matchesThis = variant.selectedOptions.some(
      (option) => option.name === optionName && option.value === value
    )
    if (!matchesThis) return false
    return others.every((option) =>
      variant.selectedOptions.some(
        (variantOption) =>
          variantOption.name === option.name && variantOption.value === option.value
      )
    )
  })
}

const VariantSelector = React.forwardRef<HTMLDivElement, VariantSelectorProps>(
  ({ className, options, variants, value, onValueChange, ...props }, ref) => {
    const select = (optionName: string, optionValue: string) => {
      const next = value.filter((option) => option.name !== optionName)
      next.push({ name: optionName, value: optionValue })
      onValueChange(next)
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
        {options.map((option) => {
          const selectedValue = value.find((o) => o.name === option.name)?.value
          return (
            <fieldset key={option.name} className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-foreground">
                {option.name}
                {selectedValue && (
                  <span className="ml-1 text-muted-foreground">{selectedValue}</span>
                )}
              </legend>
              <div className="flex flex-wrap gap-2">
                {option.values.map((optionValue) => {
                  const isSelected = selectedValue === optionValue
                  const available = isValueAvailable(
                    option.name,
                    optionValue,
                    variants,
                    value
                  )
                  return (
                    <button
                      key={optionValue}
                      type="button"
                      aria-pressed={isSelected}
                      disabled={!available}
                      onClick={() => select(option.name, optionValue)}
                      className={cn(
                        "min-w-9 rounded-md border px-3 py-1.5 text-sm font-medium transition-[color,background-color,border-color,transform] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background text-foreground hover:bg-accent",
                        !available &&
                          "cursor-not-allowed text-muted-foreground/50 line-through hover:bg-background"
                      )}
                    >
                      {optionValue}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )
        })}
      </div>
    )
  }
)
VariantSelector.displayName = "VariantSelector"

export { VariantSelector }
