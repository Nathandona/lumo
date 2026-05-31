"use client"

import * as React from "react"
import type { CartLine, Money, Product, Variant } from "@/lib/lumo/types"
import { addMoney, multiplyMoney, zeroMoney } from "@/lib/lumo/money"

/** The product fields a cart line needs to display itself. */
export type CartProductRef = Pick<Product, "id" | "handle" | "title" | "images">

export interface CartContextValue {
  lines: CartLine[]
  subtotal: Money
  totalQuantity: number
  currency: string
  isOpen: boolean
  addLine: (product: CartProductRef, variant: Variant, quantity?: number) => void
  removeLine: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
  clear: () => void
  setOpen: (open: boolean) => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

function lineTotalFor(variant: Variant, quantity: number): Money {
  return multiplyMoney(variant.price, quantity)
}

function computeSubtotal(lines: CartLine[], currency: string): Money {
  if (lines.length === 0) {
    return zeroMoney(currency)
  }
  return addMoney(...lines.map((line) => line.lineTotal))
}

export interface CartProviderProps {
  children: React.ReactNode
  /** Currency used while the cart is empty. Defaults to 'USD'. */
  currency?: string
  /** Initial lines, for hydrating from storage or a backend. */
  initialLines?: CartLine[]
  /** Fired whenever the lines change, for syncing to your backend. */
  onLinesChange?: (lines: CartLine[]) => void
}

/**
 * Optional, backend-agnostic cart state. Lumo components are presentational by
 * default; opt into this provider when you want client-side cart state and sync
 * changes to your backend through `onLinesChange`.
 */
export function CartProvider({
  children,
  currency = "USD",
  initialLines = [],
  onLinesChange,
}: CartProviderProps) {
  const [lines, setLines] = React.useState<CartLine[]>(initialLines)
  const [isOpen, setIsOpen] = React.useState(false)

  const isFirstRender = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onLinesChange?.(lines)
  }, [lines, onLinesChange])

  const addLine = React.useCallback(
    (product: CartProductRef, variant: Variant, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((line) => line.variant.id === variant.id)
        if (existing) {
          return prev.map((line) =>
            line.variant.id === variant.id
              ? {
                  ...line,
                  quantity: line.quantity + quantity,
                  lineTotal: lineTotalFor(variant, line.quantity + quantity),
                }
              : line
          )
        }
        return [
          ...prev,
          {
            id: variant.id,
            variant,
            product,
            quantity,
            lineTotal: lineTotalFor(variant, quantity),
          },
        ]
      })
    },
    []
  )

  const removeLine = React.useCallback((lineId: string) => {
    setLines((prev) => prev.filter((line) => line.id !== lineId))
  }, [])

  const updateQuantity = React.useCallback((lineId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.id !== lineId)
      }
      return prev.map((line) =>
        line.id === lineId
          ? { ...line, quantity, lineTotal: lineTotalFor(line.variant, quantity) }
          : line
      )
    })
  }, [])

  const clear = React.useCallback(() => setLines([]), [])
  const openCart = React.useCallback(() => setIsOpen(true), [])
  const closeCart = React.useCallback(() => setIsOpen(false), [])

  const value = React.useMemo<CartContextValue>(() => {
    const activeCurrency = lines[0]?.variant.price.currency ?? currency
    return {
      lines,
      subtotal: computeSubtotal(lines, activeCurrency),
      totalQuantity: lines.reduce((total, line) => total + line.quantity, 0),
      currency: activeCurrency,
      isOpen,
      addLine,
      removeLine,
      updateQuantity,
      clear,
      setOpen: setIsOpen,
      openCart,
      closeCart,
    }
  }, [lines, currency, isOpen, addLine, removeLine, updateQuantity, clear, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** Read the cart state. Must be used within a `CartProvider`. */
export function useCart(): CartContextValue {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>")
  }
  return context
}
