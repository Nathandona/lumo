import * as React from "react"
import type { Product } from "@lumo-ui/utils"

import { cn } from "../lib/utils"
import { ProductCard, type ProductCardProps } from "./product-card"

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
  loading?: boolean
  loadingCount?: number
  columns?: 2 | 3 | 4
  emptyState?: React.ReactNode
  onAddToCart?: ProductCardProps["onAddToCart"]
  onQuickView?: ProductCardProps["onQuickView"]
  onToggleWishlist?: ProductCardProps["onToggleWishlist"]
  isInWishlist?: (product: Product) => boolean
  locale?: string
}

const columnClass: Record<NonNullable<ProductGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-6 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      className,
      products,
      loading = false,
      loadingCount = 8,
      columns = 4,
      emptyState,
      onAddToCart,
      onQuickView,
      onToggleWishlist,
      isInWishlist,
      locale,
      ...props
    },
    ref
  ) => {
    const gridClass = cn("grid grid-cols-1 gap-6", columnClass[columns], className)

    if (loading) {
      return (
        <div ref={ref} className={gridClass} {...props}>
          {Array.from({ length: loadingCount }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )
    }

    if (products.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center py-16", className)}
          {...props}
        >
          {emptyState ?? (
            <p className="text-center text-sm text-muted-foreground">No products found.</p>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={gridClass} {...props}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={isInWishlist?.(product)}
            locale={locale}
          />
        ))}
      </div>
    )
  }
)
ProductGrid.displayName = "ProductGrid"

export { ProductGrid }
