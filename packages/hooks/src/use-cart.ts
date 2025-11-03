import * as React from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export function useCart(): CartState & CartActions {
  const [state, setState] = React.useState<CartState>({
    items: [],
    isOpen: false,
  })

  const addItem = React.useCallback((
    item: Omit<CartItem, 'quantity'> & { quantity?: number }
  ) => {
    setState((prevState) => {
      const existingItem = prevState.items.find(
        (cartItem) => cartItem.id === item.id && cartItem.variant === item.variant
      )

      if (existingItem) {
        return {
          ...prevState,
          items: prevState.items.map((cartItem) =>
            cartItem.id === item.id && cartItem.variant === item.variant
              ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
              : cartItem
          ),
        }
      }

      return {
        ...prevState,
        items: [...prevState.items, { ...item, quantity: item.quantity || 1 }],
      }
    })
  }, [])

  const removeItem = React.useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== id),
    }))
  }, [])

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }))
  }, [removeItem])

  const clearCart = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, items: [] }))
  }, [])

  const openCart = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: true }))
  }, [])

  const closeCart = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }))
  }, [])

  const toggleCart = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
  }, [])

  const getTotalItems = React.useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }, [state.items])

  const getTotalPrice = React.useCallback(() => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [state.items])

  return {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    getTotalItems,
    getTotalPrice,
  }
}