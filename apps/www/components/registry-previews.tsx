"use client"

import * as React from "react"
import {
  ProductCard,
  ProductGrid,
  CartDrawer,
  CartLineItem,
  CartSummary,
  CartProvider,
  useCart,
  VariantSelector,
  SearchBar,
  SortSelect,
  FilterPanel,
  Pagination,
  Breadcrumbs,
  type FilterValue,
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

const chair: Product = {
  id: "2",
  handle: "halo-chair",
  title: "Halo Chair",
  images: [
    {
      url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop",
      alt: "Halo chair",
    },
  ],
  options: [],
  rating: { value: 4.6, count: 54 },
  variants: [
    { id: "c1", price: { amount: 24900, currency: "USD" }, selectedOptions: [], available: true },
  ],
}

const vsOptions = [{ name: "Size", values: ["S", "M", "L"] }]
const vsVariants: Variant[] = [
  { id: "s", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "S" }], available: true },
  { id: "m", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "M" }], available: true },
  { id: "l", price: { amount: 5000, currency: "USD" }, selectedOptions: [{ name: "Size", value: "L" }], available: false },
]

const lampRef = { id: lamp.id, handle: lamp.handle, title: lamp.title, images: lamp.images }

const sampleLine: CartLine = {
  id: "v1",
  variant: lamp.variants[0],
  product: lampRef,
  quantity: 1,
  lineTotal: { amount: 12900, currency: "USD" },
}
const sampleLines: CartLine[] = [sampleLine]
const sampleSubtotal = { amount: 12900, currency: "USD" }
const sampleTotal = { amount: 13932, currency: "USD" }

function money(amount: number, currency = "USD") {
  return (amount / 100).toLocaleString("en-US", { style: "currency", currency })
}

function VariantPreview() {
  const [value, setValue] = React.useState<SelectedOption[]>([{ name: "Size", value: "M" }])
  return <VariantSelector options={vsOptions} variants={vsVariants} value={value} onValueChange={setValue} />
}

function QuantityPreview() {
  const [qty, setQty] = React.useState(2)
  return <QuantityStepper value={qty} onValueChange={setQty} min={1} max={9} />
}

function CartLineItemPreview() {
  const [line, setLine] = React.useState<CartLine>(sampleLine)
  if (!line) return null
  return (
    <div className="w-full max-w-sm">
      <CartLineItem
        line={line}
        onQuantityChange={(_, quantity) =>
          setLine((prev) => ({ ...prev, quantity, lineTotal: { ...prev.lineTotal, amount: prev.variant.price.amount * quantity } }))
        }
      />
    </div>
  )
}

function CartSummaryPreview() {
  return (
    <div className="w-full max-w-xs">
      <CartSummary subtotal={sampleSubtotal} total={sampleTotal} onCheckout={() => {}} />
    </div>
  )
}

function CartDrawerPreview() {
  const [open, setOpen] = React.useState(false)
  return (
    <CartDrawer
      open={open}
      onOpenChange={setOpen}
      lines={sampleLines}
      subtotal={sampleSubtotal}
      onCheckout={() => setOpen(false)}
      trigger={
        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95">
          Open cart drawer
        </button>
      }
    />
  )
}

function CartProviderDemo() {
  const { lines, totalQuantity, subtotal, addLine, clear } = useCart()
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <div className="text-center">
        <p className="font-display text-2xl font-semibold tracking-tight">{money(subtotal.amount, subtotal.currency)}</p>
        <p className="text-sm text-muted-foreground">
          {totalQuantity} item{totalQuantity === 1 ? "" : "s"} in cart
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => addLine(lampRef, lamp.variants[0])}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
        >
          Add Aurora Lamp
        </button>
        <button
          onClick={clear}
          disabled={lines.length === 0}
          className="rounded-full border border-[var(--stroke)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

function CartProviderPreview() {
  return (
    <CartProvider>
      <CartProviderDemo />
    </CartProvider>
  )
}

function SearchBarPreview() {
  const [query, setQuery] = React.useState("aurora lamp")
  return (
    <div className="w-full max-w-sm">
      <SearchBar value={query} onValueChange={setQuery} placeholder="Search products" />
    </div>
  )
}

function SortSelectPreview() {
  const [sort, setSort] = React.useState("featured")
  return <SortSelect value={sort} onValueChange={setSort} />
}

function FilterPanelPreview() {
  const [value, setValue] = React.useState<FilterValue>({ size: ["m"] })
  return (
    <div className="w-full max-w-[220px]">
      <FilterPanel
        groups={[
          {
            id: "size",
            label: "Size",
            options: [
              { value: "s", label: "Small", count: 12 },
              { value: "m", label: "Medium", count: 8 },
              { value: "l", label: "Large", count: 5 },
            ],
          },
          {
            id: "availability",
            label: "Availability",
            options: [{ value: "in-stock", label: "In stock", count: 21 }],
          },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

function PaginationPreview() {
  const [page, setPage] = React.useState(3)
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />
}

export function RegistryPreview({ id }: { id: string }) {
  switch (id) {
    case "price-display":
      return (
        <PriceDisplay
          size="lg"
          price={{ amount: 12900, currency: "USD" }}
          compareAtPrice={{ amount: 17900, currency: "USD" }}
        />
      )
    case "rating-stars":
      return <RatingStars value={4.5} count={128} size="md" />
    case "quantity-stepper":
      return <QuantityPreview />
    case "variant-selector":
      return <VariantPreview />
    case "product-card":
      return (
        <div className="w-full max-w-[230px]">
          <ProductCard product={lamp} />
        </div>
      )
    case "product-grid":
      return (
        <div className="w-full max-w-md">
          <ProductGrid products={[lamp, chair]} columns={2} />
        </div>
      )
    case "search-bar":
      return <SearchBarPreview />
    case "sort-select":
      return <SortSelectPreview />
    case "filter-panel":
      return <FilterPanelPreview />
    case "pagination":
      return <PaginationPreview />
    case "breadcrumbs":
      return (
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: "Lighting", href: "#" },
            { label: "Aurora Lamp" },
          ]}
        />
      )
    case "cart-line-item":
      return <CartLineItemPreview />
    case "cart-summary":
      return <CartSummaryPreview />
    case "cart-drawer":
      return <CartDrawerPreview />
    case "cart-provider":
      return <CartProviderPreview />
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
