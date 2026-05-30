import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import type { Product, Variant } from "@lumo-ui/utils"

import { cn } from "../lib/utils"
import { PriceDisplay } from "./price-display"
import { RatingStars } from "./rating-stars"

const productCardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-200 hover:shadow-lg",
  {
    variants: {
      layout: {
        default: "",
        compact: "",
        featured: "sm:flex-row",
      },
    },
    defaultVariants: {
      layout: "default",
    },
  }
)

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof productCardVariants> {
  product: Product
  onAddToCart?: (product: Product, variant: Variant) => void
  onQuickView?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isInWishlist?: boolean
  showQuickActions?: boolean
  locale?: string
}

/** Pick the variant a card shows: the default, else the first available, else the first. */
function resolveVariant(product: Product): Variant | undefined {
  if (product.defaultVariantId) {
    const match = product.variants.find((variant) => variant.id === product.defaultVariantId)
    if (match) return match
  }
  return product.variants.find((variant) => variant.available) ?? product.variants[0]
}

function badgeClass(badge: string): string {
  switch (badge.toLowerCase()) {
    case "sale":
      return "bg-destructive text-destructive-foreground"
    case "new":
      return "bg-emerald-500 text-white"
    case "limited":
      return "bg-amber-500 text-black"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      layout,
      product,
      onAddToCart,
      onQuickView,
      onToggleWishlist,
      isInWishlist = false,
      showQuickActions = true,
      locale,
      ...props
    },
    ref
  ) => {
    const variant = resolveVariant(product)
    const image = product.images[0] ?? variant?.image
    const soldOut = !variant?.available

    return (
      <div ref={ref} className={cn(productCardVariants({ layout, className }))} {...props}>
        <div
          className={cn(
            "relative overflow-hidden bg-muted/20",
            layout === "featured" ? "sm:w-1/2" : "aspect-square"
          )}
        >
          {image && (
            <img
              src={image.url}
              alt={image.alt ?? product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {(product.badges?.length || soldOut) && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {soldOut && (
                <span className="rounded bg-foreground px-2 py-1 text-xs font-medium text-background">
                  Sold out
                </span>
              )}
              {product.badges?.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    "rounded px-2 py-1 text-xs font-medium capitalize",
                    badgeClass(badge)
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {showQuickActions && (
            <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className="rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isInWishlist}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isInWishlist ? "fill-destructive text-destructive" : "text-foreground"
                    )}
                  />
                </button>
              )}
              {onQuickView && (
                <button
                  type="button"
                  onClick={() => onQuickView(product)}
                  className="rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Quick view ${product.title}`}
                >
                  <Eye className="h-4 w-4 text-foreground" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>

          {product.description && layout === "featured" && (
            <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
          )}

          {product.rating && (
            <RatingStars value={product.rating.value} count={product.rating.count} />
          )}

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            {variant && (
              <PriceDisplay
                price={variant.price}
                compareAtPrice={variant.compareAtPrice}
                locale={locale}
              />
            )}

            {onAddToCart && variant && (
              <button
                type="button"
                onClick={() => onAddToCart(product, variant)}
                disabled={soldOut}
                className="rounded-md bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Add ${product.title} to cart`}
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
