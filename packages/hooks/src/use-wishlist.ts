import * as React from 'react'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image?: string
  variant?: string
  addedAt: Date
}

export interface WishlistState {
  items: WishlistItem[]
  isOpen: boolean
}

export interface WishlistActions {
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
  toggleWishlist: () => void
  isInWishlist: (id: string) => boolean
  getItemCount: () => number
}

export function useWishlist(): WishlistState & WishlistActions {
  const [state, setState] = React.useState<WishlistState>({
    items: [],
    isOpen: false,
  })

  const addItem = React.useCallback((
    item: Omit<WishlistItem, 'addedAt'>
  ) => {
    setState((prevState) => {
      const existingItem = prevState.items.find(
        (wishlistItem) => wishlistItem.id === item.id && wishlistItem.variant === item.variant
      )

      if (existingItem) {
        return prevState // Already in wishlist
      }

      return {
        ...prevState,
        items: [...prevState.items, { ...item, addedAt: new Date() }],
      }
    })
  }, [])

  const removeItem = React.useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== id),
    }))
  }, [])

  const clearWishlist = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, items: [] }))
  }, [])

  const openWishlist = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: true }))
  }, [])

  const closeWishlist = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }))
  }, [])

  const toggleWishlist = React.useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
  }, [])

  const isInWishlist = React.useCallback((id: string) => {
    return state.items.some((item) => item.id === id)
  }, [state.items])

  const getItemCount = React.useCallback(() => {
    return state.items.length
  }, [state.items])

  return {
    ...state,
    addItem,
    removeItem,
    clearWishlist,
    openWishlist,
    closeWishlist,
    toggleWishlist,
    isInWishlist,
    getItemCount,
  }
}