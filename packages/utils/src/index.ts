// Canonical commerce data model
export type {
  CurrencyCode,
  Money,
  Image,
  ProductOption,
  SelectedOption,
  Variant,
  ProductRating,
  Product,
  CartLine,
  Cart,
  Address,
} from './types'

// Money utilities (minor-unit aware, multi-currency)
export {
  formatMoney,
  toMajorUnits,
  toMinorUnits,
  getCurrencyFractionDigits,
  zeroMoney,
  addMoney,
  multiplyMoney,
  discountPercent,
} from './format-money'

// Formatting utilities
export { formatCurrency } from './format-currency'
export { formatDiscount } from './format-discount'

// Validation utilities
export { validateEmail } from './validate-email'
export { validatePhone } from './validate-phone'

// Product utilities
export { calculateDiscount } from './calculate-discount'
export { generateProductSlug } from './generate-product-slug'

// Cart utilities
export { calculateCartTotal } from './calculate-cart-total'
export { calculateCartTax } from './calculate-cart-tax'