"use client"

import * as React from "react"
import { CheckoutForm, OrderConfirmation, type CartLine } from "@lumo-ui/core"

const lines: CartLine[] = [
  {
    id: "h",
    variant: { id: "h", price: { amount: 19999, currency: "USD" }, selectedOptions: [], available: true },
    product: {
      id: "1",
      handle: "headphones",
      title: "Premium Wireless Headphones",
      images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", alt: "Headphones" }],
    },
    quantity: 1,
    lineTotal: { amount: 19999, currency: "USD" },
  },
  {
    id: "w",
    variant: { id: "w", price: { amount: 8999, currency: "USD" }, selectedOptions: [], available: true },
    product: {
      id: "2",
      handle: "watch",
      title: "Minimalist Watch",
      images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop", alt: "Watch" }],
    },
    quantity: 1,
    lineTotal: { amount: 8999, currency: "USD" },
  },
]

const subtotal = { amount: 28998, currency: "USD" }
const tax = { amount: 2320, currency: "USD" }
const total = { amount: 31318, currency: "USD" }

export function CheckoutDemo() {
  const [order, setOrder] = React.useState<string | null>(null)

  if (order) {
    return (
      <OrderConfirmation
        orderNumber={order}
        email="ada@lumo.dev"
        lines={lines}
        total={total}
        onContinue={() => setOrder(null)}
      />
    )
  }

  return (
    <CheckoutForm
      lines={lines}
      subtotal={subtotal}
      tax={tax}
      total={total}
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 700))
        setOrder("LUMO-" + Math.floor(10000 + Math.random() * 89999))
      }}
    />
  )
}
