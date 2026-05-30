/**
 * Minimal shape needed to total a cart. Kept local so the utils layer has no
 * dependency on the hooks or components layers.
 */
export interface CartTotalItem {
  price: number
  quantity: number
}

/**
 * Calculate total price of items in cart
 */
export function calculateCartTotal(items: CartTotalItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Calculate total quantity of items in cart
 */
export function calculateCartQuantity(items: CartTotalItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}
