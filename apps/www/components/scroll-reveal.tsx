"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Reveals elements marked with [data-reveal] as they scroll into view.
 * Uses IntersectionObserver (no scroll listeners), transform + opacity only.
 * Honors prefers-reduced-motion by showing everything immediately.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"))
    if (els.length === 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
