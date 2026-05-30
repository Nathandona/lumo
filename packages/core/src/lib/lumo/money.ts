// In the monorepo this re-exports the money utilities from @lumo-ui/utils.
// In the shadcn registry, this path is provided by the "lib" block, which
// ships the real implementation to the consumer's repo at lib/lumo/money.ts.
export {
  formatMoney,
  toMajorUnits,
  toMinorUnits,
  getCurrencyFractionDigits,
  zeroMoney,
  addMoney,
  multiplyMoney,
  discountPercent,
} from "@lumo-ui/utils"
