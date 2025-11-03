import * as React from 'react'

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface SortConfig {
  option: SortOption
  label: string
  field: string
  direction: 'asc' | 'desc'
}

export const sortOptions: SortConfig[] = [
  { option: 'name-asc', label: 'Name: A to Z', field: 'name', direction: 'asc' },
  { option: 'name-desc', label: 'Name: Z to A', field: 'name', direction: 'desc' },
  { option: 'price-asc', label: 'Price: Low to High', field: 'price', direction: 'asc' },
  { option: 'price-desc', label: 'Price: High to Low', field: 'price', direction: 'desc' },
  { option: 'rating', label: 'Highest Rated', field: 'rating', direction: 'desc' },
  { option: 'newest', label: 'Newest First', field: 'createdAt', direction: 'desc' },
]

export interface ProductSortActions {
  setSort: (option: SortOption) => void
  sortProducts: <T>(products: T[]) => T[]
  getCurrentSortConfig: () => SortConfig
}

export function useProductSort(initialSort: SortOption = 'name-asc') {
  const [currentSort, setCurrentSort] = React.useState<SortOption>(initialSort)

  const setSort = React.useCallback((option: SortOption) => {
    setCurrentSort(option)
  }, [])

  const getCurrentSortConfig = React.useCallback((): SortConfig => {
    return sortOptions.find((config) => config.option === currentSort) || sortOptions[0]
  }, [currentSort])

  const sortProducts = React.useCallback(
    <T,>(products: T[]): T[] => {
      const config = getCurrentSortConfig()

      return [...products].sort((a, b) => {
        const aValue = (a as any)[config.field]
        const bValue = (b as any)[config.field]

        if (aValue === undefined || aValue === null) return 1
        if (bValue === undefined || bValue === null) return -1

        let comparison = 0

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime()
        } else {
          // Fallback to string comparison
          comparison = String(aValue).localeCompare(String(bValue))
        }

        return config.direction === 'desc' ? -comparison : comparison
      })
    },
    [getCurrentSortConfig]
  )

  return {
    currentSort,
    setSort,
    sortProducts,
    getCurrentSortConfig,
  }
}