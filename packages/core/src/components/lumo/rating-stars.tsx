import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rating value, 0 to `max`. */
  value: number
  max?: number
  /** Number of reviews, shown in parentheses when provided. */
  count?: number
  size?: "sm" | "md"
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
}

const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  ({ className, value, max = 5, count, size = "sm", ...props }, ref) => {
    const rounded = Math.round(value)
    const label =
      count !== undefined
        ? `Rated ${value} out of ${max}, ${count} reviews`
        : `Rated ${value} out of ${max}`

    return (
      <div
        ref={ref}
        role="img"
        aria-label={label}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <div className="flex" aria-hidden="true">
          {Array.from({ length: max }, (_, i) => (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                i < rounded
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted-foreground/40"
              )}
            />
          ))}
        </div>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground" aria-hidden="true">
            ({count})
          </span>
        )}
      </div>
    )
  }
)
RatingStars.displayName = "RatingStars"

export { RatingStars }
