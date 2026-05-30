import * as React from "react"
import type { Money } from "@/lib/lumo/types"
import { formatMoney } from "@/lib/lumo/money"

import { cn } from "@/lib/utils"

export interface CartSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  subtotal: Money
  /** Grand total, when your backend has computed taxes and shipping. */
  total?: Money
  locale?: string
  onCheckout?: () => void
  checkoutLabel?: string
  disabled?: boolean
  /** Note under the rows. Defaults to a taxes-and-shipping disclaimer. */
  note?: React.ReactNode
}

const CartSummary = React.forwardRef<HTMLDivElement, CartSummaryProps>(
  (
    {
      className,
      subtotal,
      total,
      locale,
      onCheckout,
      checkoutLabel = "Checkout",
      disabled = false,
      note,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium tabular-nums">{formatMoney(subtotal, { locale })}</span>
        </div>

        {children}

        {total && (
          <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatMoney(total, { locale })}</span>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {note ?? "Taxes and shipping calculated at checkout."}
        </p>

        {onCheckout && (
          <button
            type="button"
            onClick={onCheckout}
            disabled={disabled}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-[color,background-color,transform] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {checkoutLabel}
          </button>
        )}
      </div>
    )
  }
)
CartSummary.displayName = "CartSummary"

export { CartSummary }
