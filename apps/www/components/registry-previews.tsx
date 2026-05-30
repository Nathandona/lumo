"use client"

import * as React from "react"
import {
  ProductCard,
  CartDrawer,
  VariantSelector,
  PriceDisplay,
  RatingStars,
  QuantityStepper,
  AddressForm,
  OrderSummary,
  OrderConfirmation,
  type Product,
  type Variant,
  type SelectedOption,
  type CartLine,
} from "@lumo-ui/core"

const lamp: Product = {
  id: "1",
  handle: "aurora-lamp",
  title: "Aurora Lamp",
  images: [
    {
      url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop",
      alt: "Aurora lamp",
    },
  ],
  options: [],
  badges: ["new"],
  rating: { value: 4.8, count: 96 },
  variants: [
    {
      id: "v1",
      price: { amount: 12900, currency: "USD" },
      compareAtPrice: { amount: 17900, currency: "USD" },
      selectedOptions: [],
      available: true,
    },
  ],
}

const vsOptions = [{ name: "Size", values: ["S", "M", "L"] }]
const vsVariants: Variant[] = [
  { id: "s", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "S" }], available: true },
  { id: "m", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "M" }], available: true },
  { id: "l", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "L" }], available: false },
]

const sampleLines: CartLine[] = [
  {
    id: "v1",
    variant: lamp.variants[0],
    product: { id: lamp.id, handle: lamp.handle, title: lamp.title, images: lamp.images },
    quantity: 1,
    lineTotal: { amount: 12900, currency: "USD" },
  },
]
const sampleSubtotal = { amount: 12900, currency: "USD" }
const sampleTotal = { amount: 13932, currency: "USD" }

function VariantPreview() {
  const [value, setValue] = React.useState<SelectedOption[]>([{ name: "Size", value: "M" }])
  return <VariantSelector options={vsOptions} variants={vsVariants} value={value} onValueChange={setValue} />
}

function QuantityPreview() {
  const [qty, setQty] = React.useState(2)
  return <QuantityStepper value={qty} onValueChange={setQty} min={1} max={9} />
}

function CartDrawerPreview() {
  const [open, setOpen] = React.useState(false)
  const line: CartLine = {
    id: "v1",
    variant: lamp.variants[0],
    product: { id: lamp.id, handle: lamp.handle, title: lamp.title, images: lamp.images },
    quantity: 1,
    lineTotal: { amount: 12900, currency: "USD" },
  }
  return (
    <CartDrawer
      open={open}
      onOpenChange={setOpen}
      lines={[line]}
      subtotal={{ amount: 12900, currency: "USD" }}
      onCheckout={() => setOpen(false)}
      trigger={
        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95">
          Open cart drawer
        </button>
      }
    />
  )
}

export function RegistryPreview({ id }: { id: string }) {
  switch (id) {
    case "product-card":
      return (
        <div className="w-full max-w-[230px]">
          <ProductCard product={lamp} />
        </div>
      )
    case "cart-drawer":
      return <CartDrawerPreview />
    case "variant-selector":
      return <VariantPreview />
    case "price-display":
      return (
        <PriceDisplay
          size="lg"
          price={{ amount: 12900, currency: "USD" }}
          compareAtPrice={{ amount: 17900, currency: "USD" }}
        />
      )
    case "rating":
      return <RatingStars value={4.5} count={128} size="md" />
    case "quantity-selector":
      return <QuantityPreview />
    case "address-form":
      return (
        <div className="w-full max-w-xs">
          <AddressForm onSubmit={() => {}} submitLabel="Save address" />
        </div>
      )
    case "order-summary":
      return (
        <div className="w-full max-w-xs">
          <OrderSummary lines={sampleLines} subtotal={sampleSubtotal} total={sampleTotal} />
        </div>
      )
    case "checkout-form":
      return (
        <div className="flex w-full max-w-xs flex-col gap-3">
          <OrderSummary lines={sampleLines} subtotal={sampleSubtotal} total={sampleTotal} title="Checkout" />
          <button className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            Place order
          </button>
        </div>
      )
    case "order-confirmation":
      return (
        <div className="w-full max-w-xs">
          <OrderConfirmation orderNumber="LUMO-40271" lines={sampleLines} total={sampleTotal} />
        </div>
      )
    default:
      return null
  }
}
