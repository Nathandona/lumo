/**
 * Format discount percentage for display
 */
export function formatDiscount(percentage: number): string {
  return `${Math.round(percentage)}% OFF`
}

/**
 * Format discount amount with currency
 */
export function formatDiscountAmount(
  amount: number,
  currency = '$',
  decimals = 2
): string {
  return `${currency}${amount.toFixed(decimals)} OFF`
}