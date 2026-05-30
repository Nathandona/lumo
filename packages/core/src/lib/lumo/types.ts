// In the monorepo this re-exports the canonical model from @lumo-ui/utils.
// In the shadcn registry, this path is provided by the "lib" block, which
// ships the real type definitions to the consumer's repo at lib/lumo/types.ts.
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
} from "@lumo-ui/utils"
