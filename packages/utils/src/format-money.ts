import type { Money } from './types'

/**
 * Number of minor-unit digits for a currency, derived from Intl.
 * USD -> 2, JPY -> 0, BHD -> 3. Falls back to 2 if the runtime lacks the data.
 */
export function getCurrencyFractionDigits(currency: string): number {
  try {
    const resolved = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).resolvedOptions()
    return resolved.maximumFractionDigits ?? 2
  } catch {
    return 2
  }
}

/** Convert a Money amount from minor units to a major-unit decimal number. */
export function toMajorUnits(money: Money): number {
  const digits = getCurrencyFractionDigits(money.currency)
  return money.amount / 10 ** digits
}

/** Convert a major-unit decimal number to integer minor units. */
export function toMinorUnits(amount: number, currency: string): number {
  const digits = getCurrencyFractionDigits(currency)
  return Math.round(amount * 10 ** digits)
}

/**
 * Format a Money value as a localized currency string.
 *
 * @example formatMoney({ amount: 1999, currency: 'USD' }) // "$19.99"
 * @example formatMoney({ amount: 500, currency: 'JPY' }, { locale: 'ja-JP' }) // "￥500"
 */
export function formatMoney(
  money: Money,
  options: { locale?: string } & Omit<
    Intl.NumberFormatOptions,
    'style' | 'currency'
  > = {}
): string {
  const { locale, ...numberFormatOptions } = options
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    ...numberFormatOptions,
  }).format(toMajorUnits(money))
}

/** Create a zero-value Money in the given currency. */
export function zeroMoney(currency: string): Money {
  return { amount: 0, currency }
}

/**
 * Add Money values. All inputs must share a currency, otherwise it throws,
 * because silently mixing currencies is a correctness bug.
 */
export function addMoney(...values: Money[]): Money {
  if (values.length === 0) {
    throw new Error('addMoney requires at least one value')
  }
  const [first] = values
  const { currency } = first
  let amount = 0
  for (const value of values) {
    if (value.currency !== currency) {
      throw new Error(
        `Cannot add Money of different currencies: ${currency} and ${value.currency}`
      )
    }
    amount += value.amount
  }
  return { amount, currency }
}

/** Multiply a Money value by an integer quantity (e.g. a line total). */
export function multiplyMoney(money: Money, quantity: number): Money {
  return { amount: Math.round(money.amount * quantity), currency: money.currency }
}

/** Discount percentage between an original and current price, 0 to 100. */
export function discountPercent(original: Money, current: Money): number {
  if (original.currency !== current.currency) {
    throw new Error(
      `Cannot compare Money of different currencies: ${original.currency} and ${current.currency}`
    )
  }
  if (original.amount <= 0 || current.amount >= original.amount) {
    return 0
  }
  return Math.round(((original.amount - current.amount) / original.amount) * 100)
}
