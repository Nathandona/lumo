import type { CartItem } from '@lumo-ui/hooks'

/**
 * Calculate tax for cart items
 */
export function calculateCartTax(
  items: CartItem[],
  taxRate = 0.08 // 8% default tax rate
): number {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  return subtotal * taxRate
}

/**
 * Calculate total including tax
 */
export function calculateTotalWithTax(
  items: CartItem[],
  taxRate = 0.08
): number {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  return subtotal + (subtotal * taxRate)
}