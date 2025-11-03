"use client"

import * as React from "react"
import { ProductShowcase } from "@/components/product-showcase"

export function ComponentPreview() {
  return (
    <div className="flex justify-center">
      <ProductShowcase />
    </div>
  )
}