/**
 * Lumo UI canonical commerce data model.
 *
 * Components are headless-agnostic: they consume these normalized shapes via
 * props. Map your backend (Shopify, Medusa, commercetools, custom) onto these
 * types once, and every Lumo block works against it.
 *
 * Money is stored in integer minor units (for example cents) to avoid
 * floating-point rounding errors. Use `formatMoney` to render it.
 */

/** ISO 4217 currency code, e.g. 'USD', 'EUR', 'JPY'. */
export type CurrencyCode = string

/**
 * A monetary amount in integer minor units plus its currency.
 *
 * @example { amount: 1999, currency: 'USD' } // represents $19.99
 * @example { amount: 500, currency: 'JPY' }  // represents ¥500 (JPY has 0 minor units)
 */
export interface Money {
  /** Integer amount in the currency's minor units (e.g. cents). */
  amount: number
  currency: CurrencyCode
}

export interface Image {
  url: string
  alt?: string
  width?: number
  height?: number
}

/** A configurable axis of a product, e.g. { name: 'Size', values: ['S','M','L'] }. */
export interface ProductOption {
  name: string
  values: string[]
}

/** A concrete option choice on a variant, e.g. { name: 'Size', value: 'M' }. */
export interface SelectedOption {
  name: string
  value: string
}

/** A purchasable variant of a product (a specific SKU / option combination). */
export interface Variant {
  id: string
  sku?: string
  title?: string
  price: Money
  /** Original price before discount; drives sale and compare-at display. */
  compareAtPrice?: Money
  selectedOptions: SelectedOption[]
  available: boolean
  inventoryQuantity?: number
  image?: Image
}

export interface ProductRating {
  /** Average rating value, typically 0 to 5. */
  value: number
  /** Number of reviews behind the rating. */
  count: number
}

export interface Product {
  id: string
  /** URL-friendly slug. */
  handle: string
  title: string
  description?: string
  images: Image[]
  options: ProductOption[]
  variants: Variant[]
  /** Id of the variant selected by default; falls back to the first available. */
  defaultVariantId?: string
  rating?: ProductRating
  /** Display badges, e.g. 'sale', 'new', 'limited', or custom labels. */
  badges?: string[]
  tags?: string[]
  vendor?: string
}

/** A line in the cart: a variant, its parent product summary, and a quantity. */
export interface CartLine {
  id: string
  variant: Variant
  product: Pick<Product, 'id' | 'handle' | 'title' | 'images'>
  quantity: number
  lineTotal: Money
}

export interface Cart {
  id?: string
  lines: CartLine[]
  currency: CurrencyCode
  subtotal: Money
  /**
   * Grand total. Optional because tax, shipping, and discount logic is owned
   * by your backend, not by Lumo components.
   */
  total?: Money
}

export interface Address {
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  /** State or province. */
  region?: string
  postalCode: string
  /** ISO 3166-1 alpha-2 country code, e.g. 'US', 'FR'. */
  country: string
  phone?: string
}
