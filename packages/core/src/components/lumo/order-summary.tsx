import * as React from "react"
import type { CartLine, Money } from "@/lib/lumo/types"
import { formatMoney } from "@/lib/lumo/money"

import { cn } from "@/lib/utils"

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: CartLine[]
  subtotal: Money
  shipping?: Money
  tax?: Money
  total?: Money
  locale?: string
  title?: string
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between", strong ? "text-base font-semibold" : "text-sm")}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ lines, subtotal, shipping, tax, total, locale, title = "Order summary", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-4 rounded-2xl border bg-card p-6", className)} {...props}>
        <h3 className="font-semibold">{title}</h3>

        <ul className="flex flex-col gap-3">
          {lines.map((line) => {
            const image = line.product.images[0] ?? line.variant.image
            return (
              <li key={line.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted/20">
                  {image && (
                    <img src={image.url} alt={image.alt ?? line.product.title} className="h-full w-full object-cover" />
                  )}
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                    {line.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{line.product.title}</p>
                  {line.variant.title && <p className="text-xs text-muted-foreground">{line.variant.title}</p>}
                </div>
                <span className="text-sm tabular-nums">{formatMoney(line.lineTotal, { locale })}</span>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col gap-2 border-t pt-4">
          <Row label="Subtotal" value={formatMoney(subtotal, { locale })} />
          {shipping && <Row label="Shipping" value={formatMoney(shipping, { locale })} />}
          {tax && <Row label="Tax" value={formatMoney(tax, { locale })} />}
        </div>

        {total && (
          <div className="border-t pt-4">
            <Row label="Total" value={formatMoney(total, { locale })} strong />
          </div>
        )}
      </div>
    )
  }
)
OrderSummary.displayName = "OrderSummary"

export { OrderSummary }
