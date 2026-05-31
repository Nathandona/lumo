import * as React from 'react'
import { act, renderHook } from '@testing-library/react'
import type { Variant } from '@lumo-ui/utils'
import { CartProvider, useCart, type CartProductRef } from '../src/use-cart'

const product: CartProductRef = {
  id: '1',
  handle: 'lamp',
  title: 'Aurora Lamp',
  images: [{ url: 'lamp.jpg' }],
}

const variant: Variant = {
  id: 'v1',
  price: { amount: 1999, currency: 'USD' },
  selectedOptions: [],
  available: true,
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('useCart', () => {
  it('throws outside a provider', () => {
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/)
  })

  it('adds a line and computes totals', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addLine(product, variant))

    expect(result.current.lines).toHaveLength(1)
    expect(result.current.totalQuantity).toBe(1)
    expect(result.current.subtotal).toEqual({ amount: 1999, currency: 'USD' })
  })

  it('merges quantity when adding the same variant', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addLine(product, variant))
    act(() => result.current.addLine(product, variant))

    expect(result.current.lines).toHaveLength(1)
    expect(result.current.totalQuantity).toBe(2)
    expect(result.current.subtotal.amount).toBe(3998)
  })

  it('updates quantity and recomputes the line total', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addLine(product, variant))
    act(() => result.current.updateQuantity('v1', 3))

    expect(result.current.totalQuantity).toBe(3)
    expect(result.current.subtotal.amount).toBe(5997)
    expect(result.current.lines[0].lineTotal.amount).toBe(5997)
  })

  it('removes a line when quantity drops to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addLine(product, variant))
    act(() => result.current.updateQuantity('v1', 0))

    expect(result.current.lines).toHaveLength(0)
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addLine(product, variant))
    act(() => result.current.clear())

    expect(result.current.lines).toHaveLength(0)
    expect(result.current.totalQuantity).toBe(0)
  })
})
