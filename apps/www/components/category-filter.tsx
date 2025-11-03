"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory = "All", onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = React.useState(selectedCategory)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category)}
          className="transition-all"
        >
          {category}
          {category === "All" && (
            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
              6
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}