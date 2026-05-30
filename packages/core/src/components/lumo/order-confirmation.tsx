import * as React from "react"
import { CheckCircle2 } from "lucide-react"
import type { CartLine, Money } from "@/lib/lumo/types"
import { formatMoney } from "@/lib/lumo/money"

import { cn } from "@/lib/utils"

export interface OrderConfirmationProps extends React.HTMLAttributes<HTMLDivElement> {
  orderNumber: string
  email?: string
  lines?: CartLine[]
  total?: Money
  locale?: string
  onContinue?: () => void
  continueLabel?: string
}

const OrderConfirmation = React.forwardRef<HTMLDivElement, OrderConfirmationProps>(
  (
    { orderNumber, email, lines, total, locale, onContinue, continueLabel = "Continue shopping", className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-5 rounded-2xl border bg-card p-8 text-center", className)}
        {...props}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
        </span>

        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Order confirmed</h2>
          <p className="mt-1 text-muted-foreground">
            Thanks. Your order <span className="font-medium text-foreground">{orderNumber}</span> is on its way.
          </p>
          {email && <p className="mt-1 text-sm text-muted-foreground">A receipt was sent to {email}.</p>}
        </div>

        {lines && lines.length > 0 && (
          <ul className="w-full max-w-sm divide-y border-y">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center justify-between py-3 text-sm">
                <span className="truncate pr-3">
                  {line.product.title}
                  <span className="text-muted-foreground"> x {line.quantity}</span>
                </span>
                <span className="tabular-nums">{formatMoney(line.lineTotal, { locale })}</span>
              </li>
            ))}
          </ul>
        )}

        {total && <p className="text-lg font-semibold">Total {formatMoney(total, { locale })}</p>}

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {continueLabel}
          </button>
        )}
      </div>
    )
  }
)
OrderConfirmation.displayName = "OrderConfirmation"

export { OrderConfirmation }
