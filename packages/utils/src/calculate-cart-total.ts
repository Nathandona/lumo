import type { CartItem } from '@lumo-ui/hooks'

/**
 * Calculate total price of items in cart
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Calculate total quantity of items in cart
 */
export function calculateCartQuantity(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}