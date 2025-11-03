import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ShoppingCart, Heart, Eye } from "lucide-react"

import { cn } from "../lib/utils"

// Product interface for type safety
export interface Product {
  id: string
  name: string
  price: number
  image: string
  badge?: 'sale' | 'new' | 'limited'
  originalPrice?: number
  rating?: number
  reviewCount?: number
  description?: string
}

const productCardVariants = cva(
  "group relative bg-card border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "aspect-[3/4]",
        compact: "aspect-[4/3]",
        featured: "aspect-square lg:aspect-[16/9]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  product: Product
  onAddToCart?: (product: Product) => void
  onQuickView?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isInWishlist?: boolean
  showQuickActions?: boolean
  currency?: string
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    className,
    variant,
    product,
    onAddToCart,
    onQuickView,
    onToggleWishlist,
    isInWishlist = false,
    showQuickActions = true,
    currency = "$",
    ...props
  }, ref) => {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price
    const discountPercentage = hasDiscount && product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

    return (
      <div
        ref={ref}
        className={cn(productCardVariants({ variant, className }))}
        {...props}
      >
        {/* Product Image Container */}
        <div className="relative h-2/3 overflow-hidden bg-muted/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge Overlay */}
          {(product.badge || hasDiscount) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badge && (
                <span
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded",
                    product.badge === 'sale' && "bg-red-500 text-white",
                    product.badge === 'new' && "bg-green-500 text-white",
                    product.badge === 'limited' && "bg-yellow-500 text-black"
                  )}
                >
                  {product.badge === 'sale' && 'Sale'}
                  {product.badge === 'new' && 'New'}
                  {product.badge === 'limited' && 'Limited'}
                </span>
              )}
              {hasDiscount && (
                <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={() => onToggleWishlist?.(product)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
              </button>
              <button
                type="button"
                onClick={() => onQuickView?.(product)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="p-4 h-1/3 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-sm text-card-foreground line-clamp-2 mb-1">
              {product.name}
            </h3>

            {product.description && variant === 'featured' && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {product.description}
              </p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-xs",
                        i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-card-foreground">
                {currency}{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {currency}{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {onAddToCart && (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
ProductCard.displayName = "ProductCard"

export { ProductCard, productCardVariants }