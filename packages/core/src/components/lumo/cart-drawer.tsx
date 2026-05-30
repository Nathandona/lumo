"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ShoppingBag, X } from "lucide-react"
import type { CartLine, Money } from "@/lib/lumo/types"

import { cn } from "@/lib/utils"
import { CartLineItem } from "@/components/lumo/cart-line-item"
import { CartSummary } from "@/components/lumo/cart-summary"

export interface CartDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  lines: CartLine[]
  subtotal: Money
  total?: Money
  onQuantityChange?: (lineId: string, quantity: number) => void
  onRemove?: (lineId: string) => void
  onCheckout?: () => void
  locale?: string
  title?: string
  /** Element that opens the drawer, rendered as the dialog trigger. */
  trigger?: React.ReactNode
  emptyState?: React.ReactNode
  className?: string
}

function CartDrawer({
  open,
  onOpenChange,
  lines,
  subtotal,
  total,
  onQuantityChange,
  onRemove,
  onCheckout,
  locale,
  title = "Your cart",
  trigger,
  emptyState,
  className,
}: CartDrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl focus:outline-none",
            className
          )}
        >
          <div className="flex items-center justify-between border-b p-4">
            <DialogPrimitive.Title className="flex items-center gap-2 text-lg font-semibold">
              <ShoppingBag className="h-5 w-5" />
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <DialogPrimitive.Description className="sr-only">
            Items in your shopping cart
          </DialogPrimitive.Description>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              {emptyState ?? (
                <>
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                </>
              )}
            </div>
          ) : (
            <div className="flex-1 divide-y overflow-y-auto px-4">
              {lines.map((line) => (
                <CartLineItem
                  key={line.id}
                  line={line}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                  locale={locale}
                />
              ))}
            </div>
          )}

          {lines.length > 0 && (
            <div className="border-t p-4">
              <CartSummary
                subtotal={subtotal}
                total={total}
                locale={locale}
                onCheckout={onCheckout}
              />
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
CartDrawer.displayName = "CartDrawer"

export { CartDrawer }
