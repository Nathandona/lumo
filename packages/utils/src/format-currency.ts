/**
 * Format a number as currency
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
  } = {}
): string {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  }).format(amount)
}

/**
 * Format currency with custom symbol (for cases where Intl isn't needed)
 */
export function formatCurrencySimple(
  amount: number,
  symbol = '$',
  decimals = 2
): string {
  return `${symbol}${amount.toFixed(decimals)}`
}