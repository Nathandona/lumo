"use client"

import { useState } from "react"
import { ProductCard, type Product } from "@lumo-ui/core"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Heart, Eye } from "lucide-react"

// Sample product data for demonstration
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "sale",
    rating: 4.5,
    reviewCount: 128,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality."
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "new",
    rating: 4.8,
    reviewCount: 45,
    description: "Elegant minimalist watch with leather strap and precision movement."
  },
  {
    id: "3",
    name: "Leather Messenger Bag",
    price: 149.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    badge: "limited",
    rating: 4.2,
    reviewCount: 89,
    description: "Genuine leather messenger bag perfect for work or travel."
  }
]

export function ProductShowcase() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [cart, setCart] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: Product) => {
    setCart(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(product.id)) {
        newSet.delete(product.id)
      } else {
        newSet.add(product.id)
      }
      return newSet
    })
  }

  const handleQuickView = (product: Product) => {
    // In a real app, this would open a modal or navigate to product page
    console.log("Quick view:", product.name)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Product Card Component</h3>
        <p className="text-muted-foreground mb-6">
          Responsive product cards with variants, badges, and quick actions.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="default"
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleQuickView}
            isInWishlist={wishlist.has(product.id)}
            showQuickActions={true}
          />
        ))}
      </div>

      {/* Component Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart Integration
            </CardTitle>
            <CardDescription>
              Add products to cart with instant feedback and smooth animations.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Wishlist Support
            </CardTitle>
            <CardDescription>
              Toggle wishlist status with persistent state management.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Quick View Actions
            </CardTitle>
            <CardDescription>
              Quick action buttons appear on hover for enhanced UX.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Multiple Variants
            </CardTitle>
            <CardDescription>
              Available in default, compact, and featured layout variants.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Usage Example */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
          <CardDescription>
            Copy and paste this code into your React application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { ProductCard } from '@lumo-ui/core'

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductCard
        product={{
          id: "1",
          name: "Premium Headphones",
          price: 199.99,
          originalPrice: 299.99,
          image: "/headphones.jpg",
          badge: "sale"
        }}
        onAddToCart={(product) => console.log('Added:', product)}
        onToggleWishlist={(product) => console.log('Wishlist:', product)}
      />
    </div>
  )
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}