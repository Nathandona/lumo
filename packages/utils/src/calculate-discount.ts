/**
 * Calculate discount percentage
 */
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0 || currentPrice <= 0) {
    return 0
  }

  return ((originalPrice - currentPrice) / originalPrice) * 100
}

/**
 * Calculate discounted price
 */
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return originalPrice * (1 - discountPercentage / 100)
}