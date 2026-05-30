import * as React from "react"
import { X } from "lucide-react"
import type { CartLine } from "@/lib/lumo/types"

import { cn } from "@/lib/utils"
import { PriceDisplay } from "@/components/lumo/price-display"
import { QuantityStepper } from "@/components/lumo/quantity-stepper"

export interface CartLineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  line: CartLine
  onQuantityChange?: (lineId: string, quantity: number) => void
  onRemove?: (lineId: string) => void
  locale?: string
}

function variantLabel(line: CartLine): string | undefined {
  if (line.variant.title) return line.variant.title
  if (line.variant.selectedOptions.length > 0) {
    return line.variant.selectedOptions.map((option) => option.value).join(" / ")
  }
  return undefined
}

const CartLineItem = React.forwardRef<HTMLDivElement, CartLineItemProps>(
  ({ className, line, onQuantityChange, onRemove, locale, ...props }, ref) => {
    const image = line.product.images[0] ?? line.variant.image
    const label = variantLabel(line)

    return (
      <div ref={ref} className={cn("flex gap-3 py-4", className)} {...props}>
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted/20">
          {image && (
            <img
              src={image.url}
              alt={image.alt ?? line.product.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{line.product.title}</p>
              {label && <p className="text-xs text-muted-foreground">{label}</p>}
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(line.id)}
                className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Remove ${line.product.title} from cart`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2">
            <QuantityStepper
              size="sm"
              value={line.quantity}
              min={1}
              onValueChange={(quantity) => onQuantityChange?.(line.id, quantity)}
              label={`Quantity of ${line.product.title}`}
            />
            <PriceDisplay price={line.lineTotal} locale={locale} size="sm" />
          </div>
        </div>
      </div>
    )
  }
)
CartLineItem.displayName = "CartLineItem"

export { CartLineItem }
