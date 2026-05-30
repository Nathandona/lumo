import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { Money } from "@lumo-ui/utils"
import { formatMoney, discountPercent } from "@lumo-ui/utils"

import { cn } from "../lib/utils"

const priceVariants = cva("font-semibold text-foreground tabular-nums", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceVariants> {
  price: Money
  /** Original price; when higher than `price`, it renders struck through. */
  compareAtPrice?: Money
  locale?: string
  /** Show the saved percentage as a small badge. Defaults to true. */
  showDiscount?: boolean
}

const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    { className, price, compareAtPrice, locale, showDiscount = true, size, ...props },
    ref
  ) => {
    const hasDiscount =
      !!compareAtPrice &&
      compareAtPrice.currency === price.currency &&
      compareAtPrice.amount > price.amount
    const percent = hasDiscount ? discountPercent(compareAtPrice!, price) : 0

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <span className={cn(priceVariants({ size }))}>{formatMoney(price, { locale })}</span>
        {hasDiscount && (
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            {formatMoney(compareAtPrice!, { locale })}
          </span>
        )}
        {hasDiscount && showDiscount && percent > 0 && (
          <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
            -{percent}%
          </span>
        )}
      </div>
    )
  }
)
PriceDisplay.displayName = "PriceDisplay"

export { PriceDisplay, priceVariants }
