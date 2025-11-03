import * as React from 'react'

export interface FilterOption {
  id: string
  label: string
  value: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'radio' | 'range'
  options: FilterOption[]
}

export interface ProductFilters {
  categories: string[]
  priceRange: [number, number]
  colors: string[]
  sizes: string[]
  brands: string[]
  rating: number
  inStock: boolean
}

export interface FilterActions {
  setCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setColors: (colors: string[]) => void
  setSizes: (sizes: string[]) => void
  setBrands: (brands: string[]) => void
  setRating: (rating: number) => void
  setInStock: (inStock: boolean) => void
  clearFilters: () => void
  hasActiveFilters: () => boolean
  getFilterCount: () => number
}

const defaultFilters: ProductFilters = {
  categories: [],
  priceRange: [0, 1000],
  colors: [],
  sizes: [],
  brands: [],
  rating: 0,
  inStock: true,
}

export function useProductFilters() {
  const [filters, setFilters] = React.useState<ProductFilters>(defaultFilters)

  const setCategories = React.useCallback((categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }))
  }, [])

  const setPriceRange = React.useCallback((priceRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange }))
  }, [])

  const setColors = React.useCallback((colors: string[]) => {
    setFilters((prev) => ({ ...prev, colors }))
  }, [])

  const setSizes = React.useCallback((sizes: string[]) => {
    setFilters((prev) => ({ ...prev, sizes }))
  }, [])

  const setBrands = React.useCallback((brands: string[]) => {
    setFilters((prev) => ({ ...prev, brands }))
  }, [])

  const setRating = React.useCallback((rating: number) => {
    setFilters((prev) => ({ ...prev, rating }))
  }, [])

  const setInStock = React.useCallback((inStock: boolean) => {
    setFilters((prev) => ({ ...prev, inStock }))
  }, [])

  const clearFilters = React.useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  const hasActiveFilters = React.useCallback(() => {
    return (
      filters.categories.length > 0 ||
      filters.priceRange[0] > defaultFilters.priceRange[0] ||
      filters.priceRange[1] < defaultFilters.priceRange[1] ||
      filters.colors.length > 0 ||
      filters.sizes.length > 0 ||
      filters.brands.length > 0 ||
      filters.rating > 0 ||
      filters.inStock !== defaultFilters.inStock
    )
  }, [filters])

  const getFilterCount = React.useCallback(() => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.priceRange[0] > defaultFilters.priceRange[0] || filters.priceRange[1] < defaultFilters.priceRange[1]) count++
    if (filters.colors.length > 0) count++
    if (filters.sizes.length > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.inStock !== defaultFilters.inStock) count++
    return count
  }, [filters])

  return {
    filters,
    setCategories,
    setPriceRange,
    setColors,
    setSizes,
    setBrands,
    setRating,
    setInStock,
    clearFilters,
    hasActiveFilters,
    getFilterCount,
  }
}