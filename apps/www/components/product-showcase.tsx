"use client"

import { useState } from "react"
import {
  ProductGrid,
  CartDrawer,
  type Product,
  type Variant,
} from "@lumo-ui/core"
import { CartProvider, useCart } from "@lumo-ui/hooks"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

// Sample catalog using the normalized commerce model. Prices are in minor
// units (cents); map your own backend onto these shapes once.
const sampleProducts: Product[] = [
  {
    id: "1",
    handle: "premium-wireless-headphones",
    title: "Premium Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with premium sound.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        alt: "Premium wireless headphones",
      },
    ],
    options: [{ name: "Color", values: ["Black", "Silver"] }],
    badges: ["sale"],
    rating: { value: 4.5, count: 128 },
    defaultVariantId: "1-black",
    variants: [
      {
        id: "1-black",
        sku: "WH-BLACK",
        price: { amount: 19999, currency: "USD" },
        compareAtPrice: { amount: 29999, currency: "USD" },
        selectedOptions: [{ name: "Color", value: "Black" }],
        available: true,
      },
      {
        id: "1-silver",
        sku: "WH-SILVER",
        price: { amount: 19999, currency: "USD" },
        compareAtPrice: { amount: 29999, currency: "USD" },
        selectedOptions: [{ name: "Color", value: "Silver" }],
        available: true,
      },
    ],
  },
  {
    id: "2",
    handle: "minimalist-watch",
    title: "Minimalist Watch",
    description: "Elegant watch with a leather strap and precision movement.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        alt: "Minimalist watch",
      },
    ],
    options: [],
    badges: ["new"],
    rating: { value: 4.8, count: 45 },
    variants: [
      {
        id: "2-default",
        sku: "MW-1",
        price: { amount: 8999, currency: "USD" },
        selectedOptions: [],
        available: true,
      },
    ],
  },
  {
    id: "3",
    handle: "leather-messenger-bag",
    title: "Leather Messenger Bag",
    description: "Genuine leather messenger bag for work or travel.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
        alt: "Leather messenger bag",
      },
    ],
    options: [],
    badges: ["limited"],
    rating: { value: 4.2, count: 89 },
    variants: [
      {
        id: "3-default",
        sku: "LMB-1",
        price: { amount: 14999, currency: "USD" },
        compareAtPrice: { amount: 18999, currency: "USD" },
        selectedOptions: [],
        available: true,
      },
    ],
  },
]

function Showcase() {
  const cart = useCart()
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: Product, variant: Variant) => {
    cart.addLine(
      { id: product.id, handle: product.handle, title: product.title, images: product.images },
      variant
    )
    cart.openCart()
  }

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(product.id)) {
        next.delete(product.id)
      } else {
        next.add(product.id)
      }
      return next
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Product cards and cart</h3>
          <p className="text-muted-foreground">
            The golden path: browse, add to cart, review. Headless and accessible.
          </p>
        </div>
        <Button variant="outline" onClick={cart.openCart} className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Cart
          {cart.totalQuantity > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {cart.totalQuantity}
            </span>
          )}
        </Button>
      </div>

      <ProductGrid
        products={sampleProducts}
        columns={3}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={(product) => wishlist.has(product.id)}
      />

      <CartDrawer
        open={cart.isOpen}
        onOpenChange={cart.setOpen}
        lines={cart.lines}
        subtotal={cart.subtotal}
        onQuantityChange={cart.updateQuantity}
        onRemove={cart.removeLine}
        onCheckout={() => cart.setOpen(false)}
      />
    </div>
  )
}

export function ProductShowcase() {
  return (
    <CartProvider currency="USD">
      <Showcase />
    </CartProvider>
  )
}
